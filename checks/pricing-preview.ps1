param([int]$Port = 9241)
$ErrorActionPreference = 'Stop'
$landingPath = Split-Path $PSScriptRoot -Parent
$chromePath = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
$tempRoot = [IO.Path]::GetFullPath([IO.Path]::GetTempPath())
$profilePath = [IO.Path]::GetFullPath((Join-Path $tempRoot ('costera-browser-audit-' + [guid]::NewGuid().ToString('N'))))
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

  $pageUri = 'http://127.0.0.1:5173/pricing'
  Send-BrowserCommand 'Page.enable' | Out-Null
  Send-BrowserCommand 'Runtime.enable' | Out-Null

  $checks = @()
  foreach ($viewport in @(
    @{name='desktop';width=1440;height=900;mobile=$false},
    @{name='mobile';width=390;height=844;mobile=$true}
  )) {
    Send-BrowserCommand 'Emulation.setDeviceMetricsOverride' @{width=$viewport.width;height=$viewport.height;deviceScaleFactor=1;mobile=$viewport.mobile} | Out-Null
    Send-BrowserCommand 'Page.navigate' @{url=$pageUri} | Out-Null
    Read-Browser 'new Promise(resolve=>{if(document.readyState==="complete")resolve();else addEventListener("load",resolve,{once:true});}).then(()=>document.fonts.ready).then(()=>Promise.all([...document.images].map(i=>i.decode().catch(()=>{})))).then(()=>new Promise(r=>setTimeout(r,300)))' | Out-Null
    $dimensions = Read-Browser '({height:document.documentElement.scrollHeight,overflow:document.documentElement.scrollWidth>document.documentElement.clientWidth})'
    $capture = Send-BrowserCommand 'Page.captureScreenshot' @{format='png';captureBeyondViewport=$true;fromSurface=$true;clip=@{x=0;y=0;width=$viewport.width;height=$dimensions.height;scale=1}}
    [IO.File]::WriteAllBytes((Join-Path $landingPath ('pricing-preview-' + $viewport.name + '.png')), [Convert]::FromBase64String($capture.data))
    $checks += [PSCustomObject]@{name=('No overflow in '+$viewport.name);passed=(!$dimensions.overflow)}
  }

  $functional = Read-Browser @'
(async () => {
  const results=[];const check=(name,passed)=>results.push({name,passed:!!passed});
  check('All images load',[...document.images].every(i=>i.complete&&i.naturalWidth>0));
  check('Local Manrope loads',document.fonts.check('700 16px Manrope'));
  check('Three pricing cards',document.querySelectorAll('.pricing-card').length===3);
  check('All 29 supplied features',document.querySelectorAll('.plan-features li').length===29);
  const annual=document.querySelector('[data-billing="annual"]');annual.click();await new Promise(r=>setTimeout(r,50));
  check('Annual prices activate',annual.getAttribute('aria-pressed')==='true'&&document.querySelector('.plan-price strong').textContent.trim()==='4 900'&&[...document.querySelectorAll('.price-period')].every(p=>p.textContent==='an'));
  const monthly=document.querySelector('[data-billing="monthly"]');monthly.click();await new Promise(r=>setTimeout(r,50));
  check('Monthly prices restore',monthly.getAttribute('aria-pressed')==='true'&&document.querySelector('.plan-price strong').textContent.trim()==='490');
  const menu=document.querySelector('.menu-toggle');menu.click();await new Promise(r=>setTimeout(r,50));
  check('Mobile menu opens',menu.getAttribute('aria-expanded')==='true'&&document.querySelector('#navigation').classList.contains('is-open'));
  menu.click();await new Promise(r=>setTimeout(r,50));check('Mobile menu closes',menu.getAttribute('aria-expanded')==='false');
  check('Pricing navigation active',document.querySelector('[aria-current="page"]').textContent.trim()==='Tarifs');
  check('React home route linked',document.querySelector('.brand').getAttribute('href')==='/');
  check('React pricing route linked',!!document.querySelector('.nav-link[href="/pricing"]'));
  check('CTA links supplied',[...document.querySelectorAll('.plan-action')].every(a=>a.href.includes('costerasuite.com')));
  document.querySelector('.brand').click();await new Promise(r=>setTimeout(r,100));
  check('React route navigation works',location.pathname==='/'&&!!document.querySelector('.hero'));
  return results;
})()
'@
  $checks += $functional

  Send-BrowserCommand 'Emulation.setDeviceMetricsOverride' @{width=1440;height=900;deviceScaleFactor=1;mobile=$false} | Out-Null
  $routes = @('/costera-suite','/platform','/solutions','/solutions/growth-cloud','/solutions/sales-cloud','/solutions/revenue-performance','/costera-intelligence','/industries','/resources','/resources/demarrer-digitalisation','/resources/automatiser-facturation','/resources/choisir-gestion-commerciale','/contact')
  foreach ($route in $routes) {
    Send-BrowserCommand 'Page.navigate' @{url=('http://127.0.0.1:5173' + $route)} | Out-Null
    Read-Browser 'new Promise(resolve=>{if(document.readyState==="complete")resolve();else addEventListener("load",resolve,{once:true});}).then(()=>document.fonts.ready).then(()=>new Promise(resolve=>{let n=0;const ready=()=>document.querySelector("main#main h1")&&document.querySelector(".site-footer")?resolve():n++>50?resolve():setTimeout(ready,50);ready()}))' | Out-Null
    $routeCheck = Read-Browser '({main:!!document.querySelector("main#main"),heading:!!document.querySelector("h1"),header:!!document.querySelector(".site-header"),footer:!!document.querySelector(".site-footer"),images:[...document.images].every(i=>i.complete&&i.naturalWidth>0),overflow:document.documentElement.scrollWidth>document.documentElement.clientWidth})'
    $checks += [PSCustomObject]@{name=('Route renders '+$route);passed=($routeCheck.main -and $routeCheck.heading -and $routeCheck.header -and $routeCheck.footer)}
    $checks += [PSCustomObject]@{name=('Assets load '+$route);passed=$routeCheck.images}
    $checks += [PSCustomObject]@{name=('No desktop overflow '+$route);passed=(!$routeCheck.overflow)}
    if ($route -eq '/costera-suite') {
      $solutions = Read-Browser '(()=>{const faq=document.querySelector(".solution-ref-faq details");faq.querySelector("summary").click();return {clouds:document.querySelectorAll(".solution-ref-cloud").length,stories:document.querySelectorAll(".solution-ref-story").length,steps:document.querySelectorAll(".solution-ref-step-grid article").length,faq:document.querySelectorAll(".solution-ref-faq details").length,faqOpens:faq.open,links:[...document.querySelectorAll(".solution-ref-cloud")].every(a=>a.getAttribute("href"))}})()'
      $checks += [PSCustomObject]@{name='Solutions reference sections and links';passed=($solutions.clouds -eq 7 -and $solutions.stories -eq 3 -and $solutions.steps -eq 3 -and $solutions.faq -eq 4 -and $solutions.faqOpens -and $solutions.links)}
      $platform = Read-Browser '({pillars:document.querySelectorAll(".platform-ref-pillar").length,architecture:document.querySelectorAll(".platform-ref-architecture-grid article").length,intelligence:document.querySelectorAll(".platform-ref-intelligence-grid>a").length,reasons:document.querySelectorAll(".platform-ref-reasons>div").length})'
      $checks += [PSCustomObject]@{name='Costera Suite platform sections';passed=($platform.pillars -eq 5 -and $platform.architecture -eq 3 -and $platform.intelligence -eq 4 -and $platform.reasons -eq 4)}
      $height = Read-Browser 'document.documentElement.scrollHeight'
      $shot = Send-BrowserCommand 'Page.captureScreenshot' @{format='png';captureBeyondViewport=$true;fromSurface=$true;clip=@{x=0;y=0;width=1440;height=$height;scale=1}}
      [IO.File]::WriteAllBytes((Join-Path $landingPath 'suite-costera-desktop.png'), [Convert]::FromBase64String($shot.data))
    }
    if ($route -eq '/solutions/growth-cloud') {
      $growth = Read-Browser '({metrics:document.querySelectorAll(".growth-ref-metrics article").length,features:document.querySelectorAll(".growth-ref-feature-grid article").length,steps:document.querySelectorAll(".growth-ref-flow-step").length,cta:!!document.querySelector(".growth-ref-cta")})'
      $checks += [PSCustomObject]@{name='Growth Cloud reference sections';passed=($growth.metrics -eq 4 -and $growth.features -eq 6 -and $growth.steps -eq 5 -and $growth.cta)}
      $height = Read-Browser 'document.documentElement.scrollHeight'
      $shot = Send-BrowserCommand 'Page.captureScreenshot' @{format='png';captureBeyondViewport=$true;fromSurface=$true;clip=@{x=0;y=0;width=1440;height=$height;scale=1}}
      [IO.File]::WriteAllBytes((Join-Path $landingPath 'suite-growth-desktop.png'), [Convert]::FromBase64String($shot.data))
    }
    if ($route -eq '/solutions/sales-cloud') {
      $sales = Read-Browser '({features:document.querySelectorAll(".sales-ref-features article").length,results:document.querySelectorAll(".sales-ref-result-grid article").length,testimonial:!!document.querySelector(".sales-ref-testimonial-card"),cta:!!document.querySelector(".sales-ref-cta"),referenceImages:[...document.querySelectorAll(".sales-ref-crop img")].every(i=>i.complete&&i.naturalWidth>0)})'
      $checks += [PSCustomObject]@{name='Sales Cloud reference sections';passed=($sales.features -eq 4 -and $sales.results -eq 4 -and $sales.testimonial -and $sales.cta -and $sales.referenceImages)}
      $height = Read-Browser 'document.documentElement.scrollHeight'
      $shot = Send-BrowserCommand 'Page.captureScreenshot' @{format='png';captureBeyondViewport=$true;fromSurface=$true;clip=@{x=0;y=0;width=1440;height=$height;scale=1}}
      [IO.File]::WriteAllBytes((Join-Path $landingPath 'suite-sales-desktop.png'), [Convert]::FromBase64String($shot.data))
    }
    if ($route -eq '/solutions/revenue-performance') {
      $revenue = Read-Browser '({features:document.querySelectorAll(".revenue-ref-feature-grid article").length,results:document.querySelectorAll(".revenue-ref-result-grid article").length,testimonial:!!document.querySelector(".revenue-ref-hero-quote"),cta:!!document.querySelector(".revenue-ref-cta"),dashboard:document.querySelector(".revenue-ref-dashboard>img")?.complete&&document.querySelector(".revenue-ref-dashboard>img")?.naturalWidth>0})'
      $checks += [PSCustomObject]@{name='Revenue Performance reference sections';passed=($revenue.features -eq 4 -and $revenue.results -eq 4 -and $revenue.testimonial -and $revenue.cta -and $revenue.dashboard)}
      $height = Read-Browser 'document.documentElement.scrollHeight'
      $shot = Send-BrowserCommand 'Page.captureScreenshot' @{format='png';captureBeyondViewport=$true;fromSurface=$true;clip=@{x=0;y=0;width=1440;height=$height;scale=1}}
      [IO.File]::WriteAllBytes((Join-Path $landingPath 'suite-revenue-desktop.png'), [Convert]::FromBase64String($shot.data))
    }
    Send-BrowserCommand 'Emulation.setDeviceMetricsOverride' @{width=390;height=844;deviceScaleFactor=1;mobile=$true} | Out-Null
    Read-Browser 'new Promise(r=>setTimeout(r,50))' | Out-Null
    $mobileOverflow = Read-Browser 'document.documentElement.scrollWidth>document.documentElement.clientWidth'
    $checks += [PSCustomObject]@{name=('No mobile overflow '+$route);passed=(!$mobileOverflow)}
    if ($route -eq '/costera-suite') {
      $height = Read-Browser 'document.documentElement.scrollHeight'
      $shot = Send-BrowserCommand 'Page.captureScreenshot' @{format='png';captureBeyondViewport=$true;fromSurface=$true;clip=@{x=0;y=0;width=390;height=$height;scale=1}}
      [IO.File]::WriteAllBytes((Join-Path $landingPath 'suite-costera-mobile.png'), [Convert]::FromBase64String($shot.data))
    }
    if ($route -eq '/solutions/growth-cloud') {
      $height = Read-Browser 'document.documentElement.scrollHeight'
      $shot = Send-BrowserCommand 'Page.captureScreenshot' @{format='png';captureBeyondViewport=$true;fromSurface=$true;clip=@{x=0;y=0;width=390;height=$height;scale=1}}
      [IO.File]::WriteAllBytes((Join-Path $landingPath 'suite-growth-mobile.png'), [Convert]::FromBase64String($shot.data))
    }
    if ($route -eq '/solutions/sales-cloud') {
      $height = Read-Browser 'document.documentElement.scrollHeight'
      $shot = Send-BrowserCommand 'Page.captureScreenshot' @{format='png';captureBeyondViewport=$true;fromSurface=$true;clip=@{x=0;y=0;width=390;height=$height;scale=1}}
      [IO.File]::WriteAllBytes((Join-Path $landingPath 'suite-sales-mobile.png'), [Convert]::FromBase64String($shot.data))
    }
    if ($route -eq '/solutions/revenue-performance') {
      $height = Read-Browser 'document.documentElement.scrollHeight'
      $shot = Send-BrowserCommand 'Page.captureScreenshot' @{format='png';captureBeyondViewport=$true;fromSurface=$true;clip=@{x=0;y=0;width=390;height=$height;scale=1}}
      [IO.File]::WriteAllBytes((Join-Path $landingPath 'suite-revenue-mobile.png'), [Convert]::FromBase64String($shot.data))
    }
    if ($route -eq '/contact') {
      $height = Read-Browser 'document.documentElement.scrollHeight'
      $shot = Send-BrowserCommand 'Page.captureScreenshot' @{format='png';captureBeyondViewport=$true;fromSurface=$true;clip=@{x=0;y=0;width=390;height=$height;scale=1}}
      [IO.File]::WriteAllBytes((Join-Path $landingPath 'suite-contact-mobile.png'), [Convert]::FromBase64String($shot.data))
    }
    if ($route -eq '/resources') {
      $height = Read-Browser 'document.documentElement.scrollHeight'
      $shot = Send-BrowserCommand 'Page.captureScreenshot' @{format='png';captureBeyondViewport=$true;fromSurface=$true;clip=@{x=0;y=0;width=390;height=$height;scale=1}}
      [IO.File]::WriteAllBytes((Join-Path $landingPath 'suite-resources-mobile.png'), [Convert]::FromBase64String($shot.data))
    }
    Send-BrowserCommand 'Emulation.setDeviceMetricsOverride' @{width=1440;height=900;deviceScaleFactor=1;mobile=$false} | Out-Null
  }

  Send-BrowserCommand 'Page.navigate' @{url='http://127.0.0.1:5173/resources'} | Out-Null
  Read-Browser 'new Promise(r=>setTimeout(r,120))' | Out-Null
  $resourceCheck = Read-Browser '(()=>{const input=document.querySelector(".resource-search input");const setter=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"value").set;setter.call(input,"facturation");input.dispatchEvent(new Event("input",{bubbles:true}));return new Promise(r=>setTimeout(()=>r(document.querySelectorAll(".resource-card").length===1),80));})()'
  $checks += [PSCustomObject]@{name='Resource search filters articles';passed=$resourceCheck}

  $articleLink = Read-Browser 'document.querySelector(".resource-card")?.getAttribute("href")'
  $checks += [PSCustomObject]@{name='Resource card opens article';passed=($articleLink -eq '/resources/automatiser-facturation')}

  $categoryCheck = Read-Browser '(()=>{const input=document.querySelector(".resource-search input");const setter=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"value").set;setter.call(input,"");input.dispatchEvent(new Event("input",{bubbles:true}));document.querySelector(".resource-tabs button:nth-child(2)").click();return new Promise(r=>setTimeout(()=>r(document.querySelectorAll(".resource-card").length===1&&document.querySelector(".resource-tabs button:nth-child(2)").getAttribute("aria-pressed")==="true"),80));})()'
  $checks += [PSCustomObject]@{name='Resource category filters articles';passed=$categoryCheck}

  Send-BrowserCommand 'Page.navigate' @{url='http://127.0.0.1:5173/contact'} | Out-Null
  Read-Browser 'new Promise(r=>{let n=0;const ready=()=>document.querySelector(".contact-form input[name=email]")||n++>30?r(true):setTimeout(ready,50);ready()})' | Out-Null
  $contactCheck = Read-Browser '({form:!!document.querySelector(".contact-form input[name=email]"),note:!!document.querySelector(".contact-delivery-note"),fakeSuccess:!!document.querySelector(".form-success")})'
  $checks += [PSCustomObject]@{name='Contact fallback prepares email';passed=($contactCheck.form -and $contactCheck.note)}
  $checks += [PSCustomObject]@{name='Contact fallback does not claim submission';passed=(!$contactCheck.fakeSuccess)}

  foreach ($width in @(320,390,600,768,1024,1440,1920)) {
    Send-BrowserCommand 'Emulation.setDeviceMetricsOverride' @{width=$width;height=900;deviceScaleFactor=1;mobile=$false} | Out-Null
    Read-Browser 'new Promise(r=>setTimeout(r,80))' | Out-Null
    $layout = Read-Browser '({overflow:document.documentElement.scrollWidth>document.documentElement.clientWidth,buttonsFit:[...document.querySelectorAll(".button")].every(b=>{const r=b.getBoundingClientRect();return r.left>=-1&&r.right<=innerWidth+1;}),headerFits:innerWidth<1000||document.querySelector(".nav-links").getBoundingClientRect().right<=document.querySelector(".nav-actions").getBoundingClientRect().left+1})'
    $checks += [PSCustomObject]@{name=('No horizontal overflow at '+$width+'px');passed=(!$layout.overflow)}
    $checks += [PSCustomObject]@{name=('Buttons fit at '+$width+'px');passed=$layout.buttonsFit}
    $checks += [PSCustomObject]@{name=('Header items do not overlap at '+$width+'px');passed=$layout.headerFits}
  }

  $checks += [PSCustomObject]@{name='No browser runtime exceptions';passed=($script:browserErrors.Count -eq 0)}
  $summary = @{passed=@($checks | Where-Object {$_.passed}).Count;failed=@($checks | Where-Object {!$_.passed}).Count;checks=$checks;browserErrors=$script:browserErrors}
  Write-Output ('Pricing browser checks: '+$summary.passed+' passed, '+$summary.failed+' failed')
  $checks | Where-Object {!$_.passed} | ForEach-Object { Write-Output ('FAILED: '+$_.name) }
  Send-BrowserCommand 'Browser.close' | Out-Null
} finally {
  $socket.Dispose()
  if (!$browser.HasExited) { Stop-Process -Id $browser.Id -Force -ErrorAction SilentlyContinue }
  Start-Sleep -Milliseconds 250
  if (-not $profilePath.StartsWith($tempRoot,[StringComparison]::OrdinalIgnoreCase)) { throw "Refusing cleanup outside temp: $profilePath" }
  if (Test-Path -LiteralPath $profilePath) { Remove-Item -LiteralPath $profilePath -Recurse -Force -ErrorAction SilentlyContinue }
}
