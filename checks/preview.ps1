param([int]$Port = 9237)
$ErrorActionPreference = 'Stop'
$landingPath = Split-Path $PSScriptRoot -Parent
$chromePath = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
$profilePath = Join-Path $landingPath '.chrome-validation'
$browserArgs = @('--headless', '--disable-gpu', '--no-first-run', '--no-default-browser-check', '--remote-allow-origins=*', ('--remote-debugging-port=' + $Port), ('--user-data-dir="' + $profilePath + '"'), 'about:blank')
$browser = Start-Process -FilePath $chromePath -ArgumentList $browserArgs -WindowStyle Hidden -PassThru
$socket = New-Object System.Net.WebSockets.ClientWebSocket
$script:sequence = 0
$script:browserErrors = @()
try {
  $targets = $null
  for ($attempt = 0; $attempt -lt 50; $attempt++) {
    try { $targets = Invoke-RestMethod -Uri ('http://127.0.0.1:' + $Port + '/json') -TimeoutSec 2; break } catch { Start-Sleep -Milliseconds 100 }
  }
  if (!$targets) { throw 'The background browser did not expose its debugging endpoint.' }
  $target = $targets | Where-Object { $_.type -eq 'page' } | Select-Object -First 1
  $socket.ConnectAsync([Uri]$target.webSocketDebuggerUrl, [Threading.CancellationToken]::None).GetAwaiter().GetResult()
  function Send-BrowserCommand([string]$Method, $Parameters = @{}) {
    $script:sequence++
    $commandId = $script:sequence
    $payload = @{id=$commandId;method=$Method;params=$Parameters} | ConvertTo-Json -Depth 30 -Compress
    $bytes = [Text.Encoding]::UTF8.GetBytes($payload)
    $timeout = New-Object Threading.CancellationTokenSource
    $timeout.CancelAfter(20000)
    try {
      $socket.SendAsync([ArraySegment[byte]]::new($bytes), [Net.WebSockets.WebSocketMessageType]::Text, $true, $timeout.Token).GetAwaiter().GetResult()
      while ($true) {
        $stream = New-Object IO.MemoryStream
        try {
          do {
            $buffer = New-Object byte[] 65536
            $received = $socket.ReceiveAsync([ArraySegment[byte]]::new($buffer), $timeout.Token).GetAwaiter().GetResult()
            if ($received.MessageType -eq [Net.WebSockets.WebSocketMessageType]::Close) { throw 'Browser connection closed.' }
            $stream.Write($buffer, 0, $received.Count)
          } while (!$received.EndOfMessage)
          $response = [Text.Encoding]::UTF8.GetString($stream.ToArray()) | ConvertFrom-Json
        } finally { $stream.Dispose() }
        if ($response.method -eq 'Runtime.exceptionThrown') { $script:browserErrors += $response.params.exceptionDetails }
        if ($response.id -eq $commandId) {
          if ($response.error) { throw ($response.error | ConvertTo-Json -Compress) }
          return $response.result
        }
      }
    } finally { $timeout.Dispose() }
  }
  function Read-Browser([string]$Expression) {
    $result = Send-BrowserCommand 'Runtime.evaluate' @{expression=$Expression;awaitPromise=$true;returnByValue=$true}
    if ($result.exceptionDetails) { throw ($result.exceptionDetails | ConvertTo-Json -Depth 10) }
    return $result.result.value
  }
  $pageUri = ([Uri](Join-Path $landingPath 'index.html')).AbsoluteUri
  Send-BrowserCommand 'Page.enable' | Out-Null
  Send-BrowserCommand 'Runtime.enable' | Out-Null
  Send-BrowserCommand 'Emulation.setFocusEmulationEnabled' @{enabled=$true} | Out-Null
  foreach ($viewport in @(@{name='desktop';width=1024;height=1536;mobile=$false}, @{name='mobile';width=390;height=844;mobile=$true})) {
    Send-BrowserCommand 'Emulation.setDeviceMetricsOverride' @{width=$viewport.width;height=$viewport.height;deviceScaleFactor=1;mobile=$viewport.mobile} | Out-Null
    Send-BrowserCommand 'Page.navigate' @{url=$pageUri} | Out-Null
    Read-Browser 'new Promise(resolve => { if(document.readyState === "complete") resolve(); else window.addEventListener("load", resolve, {once:true}); }).then(async () => { await document.fonts.ready; await Promise.all([...document.images].map(image => { image.loading="eager"; return image.decode().catch(() => {}); })); return true; })' | Out-Null
    Read-Browser 'new Promise(resolve=>setTimeout(resolve,1700))' | Out-Null
    $dimensions = Read-Browser '({width:innerWidth,height:document.documentElement.scrollHeight,overflow:document.documentElement.scrollWidth>document.documentElement.clientWidth})'
    $capture = Send-BrowserCommand 'Page.captureScreenshot' @{format='png';captureBeyondViewport=$true;fromSurface=$true;clip=@{x=0;y=0;width=$viewport.width;height=$dimensions.height;scale=1}}
    [IO.File]::WriteAllBytes((Join-Path $landingPath ('preview-' + $viewport.name + '.png')), [Convert]::FromBase64String($capture.data))
    Write-Output ($viewport.name + ': ' + $dimensions.width + 'px wide, ' + $dimensions.height + 'px tall, overflow=' + $dimensions.overflow)
  }
  $checks = Read-Browser @'
(async () => {
  const results=[];const check=(name,passed)=>results.push({name,passed:!!passed});const pause=()=>new Promise(r=>setTimeout(r,80));
  check('All images load',[...document.images].every(i=>i.complete&&i.naturalWidth>0));
  check('Local font loads',document.fonts.check('800 16px Manrope')&&document.fonts.check('400 16px Manrope'));
  const menu=document.querySelector('.menu-toggle');menu.click();check('Mobile menu opens',menu.getAttribute('aria-expanded')==='true');document.querySelector('h1').click();check('Mobile menu closes',menu.getAttribute('aria-expanded')==='false');
  const dropdown=document.querySelector('.nav-trigger');dropdown.click();check('Dropdown opens',dropdown.getAttribute('aria-expanded')==='true'&&!document.querySelector('#solutions-menu').hidden);document.querySelector('h1').click();check('Dropdown closes',dropdown.getAttribute('aria-expanded')==='false');
  const modal=document.querySelector('dialog');for(const trigger of document.querySelectorAll('[data-feature]')){trigger.focus();trigger.click();check('Feature dialog '+trigger.dataset.feature,modal.open&&document.querySelectorAll('#dialog-details li').length===3);document.querySelector('.dialog-close').click();await pause();check('Focus restored '+trigger.dataset.feature,!modal.open&&document.activeElement===trigger);}
  document.querySelector('.hero-actions [data-modal="trial"]').click();check('Trial contact destination',modal.open&&document.querySelector('#dialog-action').href.includes('essai-14-jours'));modal.close();await pause();check('Scroll lock clears',!document.body.classList.contains('dialog-open'));
  check('All internal anchors resolve',[...document.querySelectorAll('a[href^="#"]')].every(a=>!a.hash||a.hash==='#'||document.getElementById(a.hash.slice(1))));
  return results;
})()
'@
  foreach ($width in @(320,390,600,768,1024,1440,1920)) {
    Send-BrowserCommand 'Emulation.setDeviceMetricsOverride' @{width=$width;height=900;deviceScaleFactor=1;mobile=$false} | Out-Null
    Read-Browser 'new Promise(resolve=>setTimeout(resolve,80))' | Out-Null
    $layout = Read-Browser '({overflow:document.documentElement.scrollWidth>document.documentElement.clientWidth,ctaFits:[...document.querySelectorAll(".hero-actions .button")].every(b=>{const r=b.getBoundingClientRect();return r.left>=0&&r.right<=innerWidth;})})'
    $checks += [PSCustomObject]@{name=('No horizontal overflow at '+$width+'px');passed=(!$layout.overflow)}
    $checks += [PSCustomObject]@{name=('Hero buttons fit at '+$width+'px');passed=$layout.ctaFits}
  }
  Send-BrowserCommand 'Emulation.setDeviceMetricsOverride' @{width=1440;height=900;deviceScaleFactor=1;mobile=$false} | Out-Null
  Send-BrowserCommand 'Emulation.setEmulatedMedia' @{features=@(@{name='prefers-reduced-motion';value='no-preference'})} | Out-Null
  Send-BrowserCommand 'Page.navigate' @{url=$pageUri} | Out-Null
  Read-Browser 'new Promise(resolve=>{if(document.readyState==="complete")resolve();else window.addEventListener("load",resolve,{once:true});}).then(()=>document.fonts.ready).then(()=>new Promise(resolve=>setTimeout(resolve,1700)))' | Out-Null
  $motionChecks = Read-Browser @'
(async () => {
  const results=[];const check=(name,passed)=>results.push({name,passed:!!passed});const pause=ms=>new Promise(r=>setTimeout(r,ms));
  check('Motion enhancement enabled',document.documentElement.classList.contains('motion-enabled'));
  check('Dashboard float runs',getComputedStyle(document.querySelector('.dashboard-image')).animationName==='dashboard-float');
  check('Hero glow runs',getComputedStyle(document.querySelector('.hero'),'::after').animationName==='aura-drift');
  const feature=document.querySelector('.feature-card');feature.scrollIntoView({behavior:'instant',block:'center'});await pause(100);
  check('Scroll reveals feature cards',feature.dataset.revealed==='true');
  check('Reveal animation runs',feature.getAnimations().some(a=>a.playState==='running'&&a.effect.getKeyframes().some(f=>Number(f.opacity)===0)));
  feature.focus();await pause(30);check('Keyboard focus finishes reveal',Number(getComputedStyle(feature).opacity)===1&&!feature.getAnimations().some(a=>a.playState==='running'&&a.effect.getKeyframes().some(f=>Number(f.opacity)===0)));
  if(!results[results.length-1].passed)results[results.length-1].debug={documentFocused:document.hasFocus(),activeElement:document.activeElement===feature,opacity:getComputedStyle(feature).opacity,animations:feature.getAnimations().map(a=>({state:a.playState,target:a.effect.target===feature,frames:a.effect.getKeyframes()}))};
  document.querySelector('.results-stack').scrollIntoView({behavior:'instant',block:'center'});await pause(1400);
  check('Counters finish at the supplied values',[...document.querySelectorAll('.result-card strong [aria-hidden]')].map(n=>n.textContent).join(',')==='+32%,60%,-50%');
  check('Counters have stable accessible values',[...document.querySelectorAll('.result-card strong .sr-only')].map(n=>n.textContent).join(',')==='+32%,60%,-50%');
  window.scrollTo({top:document.documentElement.scrollHeight,behavior:'instant'});await pause(100);
  check('Scroll progress reaches the end',document.querySelector('.scroll-progress').style.transform==='scaleX(1)');
  window.scrollTo({top:0,behavior:'instant'});await pause(100);
  check('Scroll progress resets at the top',document.querySelector('.scroll-progress').style.transform==='scaleX(0)');
  if(matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1000px)').matches){
    const hero=document.querySelector('.hero-inner');const bounds=hero.getBoundingClientRect();hero.dispatchEvent(new PointerEvent('pointermove',{clientX:bounds.right-20,clientY:bounds.top+20,pointerType:'mouse'}));await pause(80);
    check('Dashboard responds to cursor',document.querySelector('.hero-visual').style.getPropertyValue('--visual-tilt-y')!=='');
    hero.dispatchEvent(new PointerEvent('pointerleave',{pointerType:'mouse'}));check('Dashboard tilt resets',document.querySelector('.hero-visual').style.getPropertyValue('--visual-tilt-y')==='');
    feature.dispatchEvent(new PointerEvent('pointermove',{clientX:20,clientY:20,pointerType:'mouse'}));check('Card spotlight follows cursor',feature.classList.contains('pointer-active')&&feature.style.getPropertyValue('--pointer-x')!=='');
    feature.dispatchEvent(new PointerEvent('pointerleave',{pointerType:'mouse'}));check('Card spotlight clears',!feature.classList.contains('pointer-active'));
  }
  return results;
})()
'@
  $checks += $motionChecks
  Send-BrowserCommand 'Emulation.setEmulatedMedia' @{features=@(@{name='prefers-reduced-motion';value='reduce'})} | Out-Null
  Read-Browser 'new Promise(resolve=>setTimeout(resolve,500))' | Out-Null
  $reducedChecks = Read-Browser @'
(() => {
  const results=[];const check=(name,passed)=>results.push({name,passed:!!passed});
  check('Reduced motion disables enhancement',!document.documentElement.classList.contains('motion-enabled'));
  check('Reduced motion stops dashboard animation',getComputedStyle(document.querySelector('.dashboard-image')).animationName==='none');
  check('Reduced motion stops the hero glow',getComputedStyle(document.querySelector('.hero'),'::after').animationName==='none');
  check('Reduced motion cancels active animations',document.getAnimations().every(a=>a.playState!=='running'));
  check('Reduced motion preserves visible content',[...document.querySelectorAll('h1,h2,.feature-card,.result-card')].every(e=>Number(getComputedStyle(e).opacity)===1));
  check('Reduced motion hides the progress effect',getComputedStyle(document.querySelector('.scroll-progress')).display==='none');
  return results;
})()
'@
  $checks += $reducedChecks
  Send-BrowserCommand 'Emulation.setEmulatedMedia' @{features=@(@{name='prefers-reduced-motion';value='no-preference'})} | Out-Null
  Read-Browser 'new Promise(resolve=>setTimeout(resolve,500))' | Out-Null
  $checks += [PSCustomObject]@{name='Motion re-enables after preference change';passed=(Read-Browser 'document.documentElement.classList.contains("motion-enabled")')}
  $checks += [PSCustomObject]@{name='No browser runtime exceptions';passed=($script:browserErrors.Count -eq 0)}
  $summary = @{passed=@($checks | Where-Object {$_.passed}).Count;failed=@($checks | Where-Object {!$_.passed}).Count;checks=$checks;browserErrors=$script:browserErrors}
  $summary | ConvertTo-Json -Depth 10 | Set-Content -LiteralPath (Join-Path $PSScriptRoot 'results.json') -Encoding UTF8
  Write-Output ('Browser checks: '+$summary.passed+' passed, '+$summary.failed+' failed')
  Send-BrowserCommand 'Browser.close' | Out-Null
} finally {
  $socket.Dispose()
}
