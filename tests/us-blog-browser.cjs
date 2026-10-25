/* Run with Playwright installed. Starts a local static server on port 8765 by default.
   Optional: CHROMIUM_PATH, QA_BASE_URL, QA_SCREENSHOT_DIR. External traffic is
   blocked: these checks never load or click live advertisements. */
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const http=require('node:http');
const {chromium}=require('playwright');
const slugs=fs.readdirSync(path.join(__dirname,'../blog')).filter(x=>/^usa-.*\.html$/.test(x));
const base=process.env.QA_BASE_URL || 'http://127.0.0.1:8765';
(async()=>{
 let server;
 if(!process.env.QA_BASE_URL) {
  const root=path.resolve(__dirname,'..');
  server=http.createServer((req,res)=>{
   let file=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,base).pathname));
   if(!file.startsWith(root+path.sep)) {res.writeHead(403).end();return;}
   if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');
   if(!fs.existsSync(file)){res.writeHead(404).end();return;}
   const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.woff2':'font/woff2'};
   res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');fs.createReadStream(file).pipe(res);
  });
  await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(8765,'127.0.0.1',resolve);});
 }
 const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{})});
 let pages=0;
 try {
  for(const width of [1280,390,320]) {
   const context=await browser.newContext({viewport:{width,height:900},colorScheme:width===320?'dark':'light'});
   await context.route('**/*',route=>new URL(route.request().url()).origin===new URL(base).origin?route.continue():route.abort());
   for(const slug of slugs) {
    const page=await context.newPage(); const errors=[];page.on('pageerror',e=>errors.push(e.message));
    await page.goto(`${base}/blog/${slug}`,{waitUntil:'networkidle'});
    const widget=page.locator('[data-us-calculator]'), results=widget.locator('[data-results]');
    await results.locator('dl').waitFor();
    assert.doesNotMatch(await results.innerText(),/NaN|Infinity|Enable JavaScript/);
    const before=await results.innerText();
    const first=widget.locator('input').first(), initial=await first.inputValue();
    await first.fill('');assert.match(await results.innerText(),/valid|must|positive|greater/i);assert.equal(await results.locator('dl').count(),0);
    await first.fill('-1');assert.equal(await results.locator('dl').count(),0);
    await first.fill(initial);assert.equal(await results.innerText(),before);
    const rate=widget.locator('input[name="rate"]');
    if(await rate.count()) {const old=await rate.inputValue();await rate.fill('0');assert.equal(await results.locator('dl').count(),1);assert.doesNotMatch(await results.innerText(),/NaN|Infinity/);await rate.fill(old);}
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
    assert.equal(overflow,false,`${slug} at ${width}px overflows page`);
    if(slug==='usa-amortization-calculator.html') {
      assert.equal(await widget.locator('[data-schedule] tbody tr').count(),360);
      await widget.locator('input[name="extra"]').fill('200');assert.equal(await widget.locator('[data-schedule] tbody tr').count(),286);
    }
    if(slug==='usa-piti-calculator.html') {
      const total=await results.innerText(); assert.match(total,/3,210\.85/);assert.match(total,/3,350\.07/);
      await widget.locator('[name="hoa"]').fill('200');assert.match(await results.innerText(),/3,550\.07/);assert.match(await results.innerText(),/3,210\.85/);
    }
    if(slug==='usa-va-loan-calculator.html') {
      await widget.locator('[name="exempt"]').selectOption('yes');assert.match(await results.innerText(),/Funding fee tier\n0\.00%/);
    }
    assert.deepEqual(errors,[],`${slug} JS errors`);
    if(process.env.QA_SCREENSHOT_DIR && width!==320 && ['usa-affordability-calculator.html','usa-piti-calculator.html','usa-mortgage-calculator.html','usa-fha-loan-calculator.html'].includes(slug)) {
      fs.mkdirSync(process.env.QA_SCREENSHOT_DIR,{recursive:true});
      await widget.screenshot({path:path.join(process.env.QA_SCREENSHOT_DIR,`${slug}-${width}.png`)});
      if(slug==='usa-mortgage-calculator.html') {await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await page.screenshot({path:path.join(process.env.QA_SCREENSHOT_DIR,`page-${width}.png`)});}
    }
    await page.close();pages++;
   }
   await context.close();
  }
  const c=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:900}});
  await c.route('**/*',r=>new URL(r.request().url()).origin===new URL(base).origin?r.continue():r.abort());
  for(const slug of slugs) {const p=await c.newPage();await p.goto(`${base}/blog/${slug}`);assert.ok((await p.locator('article').innerText()).length>3000);assert.ok(await p.locator('article a[href^="https:"]').count()>0);await p.close();}
  await c.close();
  console.log(`PASS: ${pages} browser page/viewport checks; 8 no-JavaScript pages; external ad/network traffic blocked.`);
 } finally {await browser.close();if(server)await new Promise(resolve=>server.close(resolve));}
})().catch(e=>{console.error(e);process.exit(1)});
