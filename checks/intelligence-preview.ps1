param([int]$Port = 9242, [string]$Route = 'costera-intelligence', [string]$CardSelector = '.intelligence-ref-capability', [int]$ExpectedCards = 4)
$ErrorActionPreference = 'Stop'
$chrome = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
$profile = Join-Path $env:TEMP ('costera-intelligence-' + [guid]::NewGuid().ToString('N'))
$browser = Start-Process -FilePath $chrome -ArgumentList @('--headless','--disable-gpu','--no-first-run','--remote-allow-origins=*',"--remote-debugging-port=$Port", "--user-data-dir=`"$profile`"", 'about:blank') -WindowStyle Hidden -PassThru
$socket = [Net.WebSockets.ClientWebSocket]::new()
$script:sequence = 0
try {
  for ($attempt = 0; $attempt -lt 50; $attempt++) {
    try { $targets = Invoke-RestMethod "http://127.0.0.1:$Port/json" -TimeoutSec 2; break } catch { Start-Sleep -Milliseconds 100 }
  }
  if (!$targets) { throw 'Chrome debugging endpoint unavailable.' }
  $target = $targets | Where-Object type -eq 'page' | Select-Object -First 1
  $socket.ConnectAsync([Uri]$target.webSocketDebuggerUrl, [Threading.CancellationToken]::None).GetAwaiter().GetResult()
  function Send-CDP([string]$method, $parameters = @{}) {
    $script:sequence++
    $id = $script:sequence
    $bytes = [Text.Encoding]::UTF8.GetBytes((@{id=$id;method=$method;params=$parameters} | ConvertTo-Json -Depth 20 -Compress))
    $timeout = [Threading.CancellationTokenSource]::new()
    $timeout.CancelAfter(20000)
    try {
      $socket.SendAsync([ArraySegment[byte]]::new($bytes), [Net.WebSockets.WebSocketMessageType]::Text, $true, $timeout.Token).GetAwaiter().GetResult()
      while ($true) {
        $stream = [IO.MemoryStream]::new()
        try {
          do {
            $buffer = [byte[]]::new(65536)
            $part = $socket.ReceiveAsync([ArraySegment[byte]]::new($buffer), $timeout.Token).GetAwaiter().GetResult()
            $stream.Write($buffer, 0, $part.Count)
          } while (!$part.EndOfMessage)
          $reply = [Text.Encoding]::UTF8.GetString($stream.ToArray()) | ConvertFrom-Json
        } finally { $stream.Dispose() }
        if ($reply.id -eq $id) {
          if ($reply.error) { throw ($reply.error | ConvertTo-Json -Compress) }
          return $reply.result
        }
      }
    } finally { $timeout.Dispose() }
  }
  function Eval([string]$expression) {
    $result = Send-CDP 'Runtime.evaluate' @{expression=$expression;awaitPromise=$true;returnByValue=$true}
    if ($result.exceptionDetails) { throw ($result.exceptionDetails | ConvertTo-Json -Depth 10) }
    return $result.result.value
  }
  Send-CDP 'Page.enable' | Out-Null
  Send-CDP 'Runtime.enable' | Out-Null
  foreach ($viewport in @(@{name='desktop';width=1440;height=900;mobile=$false},@{name='mobile';width=390;height=844;mobile=$true})) {
    Send-CDP 'Emulation.setDeviceMetricsOverride' @{width=$viewport.width;height=$viewport.height;deviceScaleFactor=1;mobile=$viewport.mobile} | Out-Null
    Send-CDP 'Page.navigate' @{url=('http://127.0.0.1:5174/' + $Route)} | Out-Null
    Eval 'new Promise(r=>{if(document.readyState==="complete")r();else addEventListener("load",r,{once:true})}).then(()=>document.fonts.ready).then(()=>Promise.all([...document.images].map(i=>i.decode().catch(()=>{}))))' | Out-Null
    $checks = Eval ('({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,height:document.documentElement.scrollHeight,images:[...document.images].every(i=>i.complete&&i.naturalWidth>0),cards:document.querySelectorAll("' + $CardSelector + '").length,links:[...document.querySelectorAll("main a")].every(a=>a.getAttribute("href"))})')
    $capture = Send-CDP 'Page.captureScreenshot' @{format='png';captureBeyondViewport=$true;fromSurface=$true;clip=@{x=0;y=0;width=$viewport.width;height=$checks.height;scale=1}}
    $path = Join-Path $env:TEMP ('costera-' + $Route + '-' + $viewport.name + '-full.png')
    [IO.File]::WriteAllBytes($path,[Convert]::FromBase64String($capture.data))
    Write-Output "$($viewport.name): $($checks | ConvertTo-Json -Compress) screenshot=$path"
    if ($checks.scrollWidth -gt $checks.width -or !$checks.images -or $checks.cards -ne $ExpectedCards -or !$checks.links) { throw "$($viewport.name) checks failed." }
    if ($Route -eq 'industries' -and $viewport.mobile) {
      $carousel = Eval 'new Promise(resolve=>{const track=document.querySelector(".industries-ref-grid");const before=track.scrollLeft;document.querySelectorAll(".industries-ref-carousel-controls button")[1].click();setTimeout(()=>resolve({before,after:track.scrollLeft}),500)})'
      Write-Output "carousel: $($carousel | ConvertTo-Json -Compress)"
      if ($carousel.after -le $carousel.before) { throw 'Mobile carousel did not advance.' }
    }
    if ($Route -eq 'resources' -and $viewport.mobile) {
      $functionality = Eval '(async()=>{const pause=()=>new Promise(r=>setTimeout(r,40));const topics=document.querySelectorAll(".resources-ref-topic");topics[4].click();await pause();const filtered=document.querySelectorAll(".resources-ref-article").length;topics[5].click();await pause();const faq=document.querySelectorAll(".resources-ref-faq details").length;document.querySelector(".resources-ref-section-head button").click();await pause();const all=document.querySelectorAll(".resources-ref-article").length;const input=document.querySelector("#resource-query");Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"value").set.call(input,"facturation");input.dispatchEvent(new Event("input",{bubbles:true}));await pause();const searched=document.querySelectorAll(".resources-ref-article").length;return {filtered,faq,all,searched,topicButtons:topics.length,emailType:document.querySelector("#resources-email").type}})()'
      Write-Output "resources: $($functionality | ConvertTo-Json -Compress)"
      if ($functionality.filtered -ne 1 -or $functionality.faq -ne 3 -or $functionality.all -ne 3 -or $functionality.searched -ne 2 -or $functionality.topicButtons -ne 6 -or $functionality.emailType -ne 'email') { throw 'Resources controls failed.' }
    }
    if ($Route -eq 'contact' -and $viewport.mobile) {
      $form = Eval '({required:[...document.querySelectorAll(".contact-form [required]")].map(i=>i.name),email:document.querySelector(".contact-form [name=email]").type,subject:document.querySelector(".contact-form [name=subject]").value,validEmpty:document.querySelector(".contact-form").checkValidity(),demo:document.querySelector(".contact-ref-demo a").getAttribute("href"),diagnostic:document.querySelector(".contact-ref-diagnostic a").getAttribute("href")})'
      Write-Output "form: $($form | ConvertTo-Json -Compress)"
      if ($form.validEmpty -or $form.email -ne 'email' -or !$form.demo.Contains('subject=demo') -or !$form.diagnostic.Contains('subject=diagnostic')) { throw 'Contact form checks failed.' }
      $topics = Eval '(async()=>{const pause=()=>new Promise(r=>setTimeout(r,50));document.querySelector(".contact-ref-demo a").click();await pause();const demo=document.querySelector(".contact-form [name=subject]").value;document.querySelector(".contact-ref-diagnostic a").click();await pause();return {demo,diagnostic:document.querySelector(".contact-form [name=subject]").value}})()'
      Write-Output "topics: $($topics | ConvertTo-Json -Compress)"
      if ($topics.demo -ne 'demo' -or $topics.diagnostic -ne 'diagnostic') { throw 'Contact topic links failed.' }
    }
  }
} finally {
  if ($socket.State -eq 'Open') { $socket.CloseAsync([Net.WebSockets.WebSocketCloseStatus]::NormalClosure, 'Done', [Threading.CancellationToken]::None).GetAwaiter().GetResult() }
  $socket.Dispose()
  if (!$browser.HasExited) { Stop-Process -Id $browser.Id -Force }
}
