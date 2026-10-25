/* Run with Playwright installed. Starts a local static server on port 8765 by default.
   Optional: CHROMIUM_PATH, QA_BASE_URL, QA_SCREENSHOT_DIR. External traffic is
   blocked: these checks never load or click live advertisements. */
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const http=require('node:http');
const {chromium}=require('playwright');
const slugs=fs.readdirSync(path.join(__dirname,'../blog')).filter(x=>/\.html$/.test(x)&&x!=='index.html'&&!x.startsWith('usa-'));
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
    const widget=page.locator('[data-global-calculator]'), results=widget.locator('[data-results]');
    assert.ok((await page.locator('article').innerText()).length>1500,`${slug}: missing article`);
    assert.ok(await page.locator('article a[href^="https:"]').count()>0,`${slug}: missing sources`);
    if(await widget.count()) {
      if(await widget.locator('[data-canada-form]').count()){
        assert.equal(await results.isVisible(),false);
        const values=require('./fixtures/canada-blog-inputs.json')[slug.replace(/\.html$/,'')];
        for(const[key,value]of Object.entries(values)){const e=widget.locator('[name='+key+']');if(await e.evaluate(e=>e.tagName==='SELECT'))await e.selectOption(String(value));else await e.fill(String(value));}
        assert.equal(await results.isVisible(),false);await widget.locator('[type=submit]').click();await results.locator('dl').waitFor();
        assert.doesNotMatch(await results.innerText(),/NaN|Infinity/);
      }else{
      await results.locator('dl').waitFor();
      assert.doesNotMatch(await results.innerText(),/NaN|Infinity|Enable JavaScript/);
      const before=await results.innerText();
      const first=widget.locator('input').first(), initial=await first.inputValue();
      await first.fill('');assert.match(await results.innerText(),/valid|must|positive|greater/i);assert.equal(await results.locator('dl').count(),0);
      await first.fill('-1');assert.equal(await results.locator('dl').count(),0);
      await first.fill(initial);assert.equal(await results.innerText(),before);
      const rate=widget.locator('input[name="rate"]');
      if(await rate.count()) {const old=await rate.inputValue();await rate.fill('0');assert.equal(await results.locator('dl').count(),1);assert.doesNotMatch(await results.innerText(),/NaN|Infinity/);await rate.fill(old);}
      const model=await widget.getAttribute('data-global-calculator');
      if(model==='cmhc') {
        assert.match(await results.innerText(),/19,530/);
        await widget.locator('[name="years"]').selectOption('30');assert.equal(await results.locator('dl').count(),0);
        await widget.locator('[name="eligible"]').selectOption('yes');assert.match(await results.innerText(),/20,790/);
        await widget.locator('[name="taxRate"]').fill('8');assert.match(await results.innerText(),/1,663.20/);
      }
      if(model==='sdlt') {
        assert.match(await results.innerText(),/15,000/);
        await widget.locator('[name="buyer"]').selectOption('first');assert.match(await results.innerText(),/10,000/);
        await widget.locator('[name="buyer"]').selectOption('additional');assert.match(await results.innerText(),/40,000/);
        await widget.locator('[name="nonresident"]').selectOption('yes');assert.match(await results.innerText(),/50,000/);
      }
      if(model==='duty') {assert.match(await results.innerText(),/24,525/);await widget.locator('[name="state"]').selectOption('vic');assert.match(await results.innerText(),/37,070/);}
      if(model==='kiwi') {assert.match(await results.innerText(),/61,000/);await widget.locator('[name="membership"]').fill('2');assert.match(await results.innerText(),/Three-year input not met/);await widget.locator('[name="membership"]').fill('3');}
      if(model==='car') {await widget.locator('[name="elapsed"]').fill('60');assert.match(await results.innerText(),/outstanding balance\n[^\n]*0\.00/);await widget.locator('[name="elapsed"]').fill('24');}
      if(model==='refinance') {const h=widget.locator('[name="horizon"]'),old=await h.inputValue();await h.fill('480');assert.equal(await results.locator('dl').count(),0);await h.fill(old);assert.equal(await results.locator('dl').count(),1);}
    }
    }
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
    assert.equal(overflow,false,`${slug} at ${width}px overflows page`);
    assert.deepEqual(errors,[],`${slug} JS errors`);
    if(process.env.QA_SCREENSHOT_DIR && width!==320 && ['canada-cmhc-insurance-calculator.html','uk-stamp-duty-calculator.html','australia-stamp-duty-calculator.html','nz-kiwisaver-calculator.html','nz-lvr-calculator.html','nz-rental-yield-calculator.html'].includes(slug)) {
      fs.mkdirSync(process.env.QA_SCREENSHOT_DIR,{recursive:true});
      await widget.screenshot({path:path.join(process.env.QA_SCREENSHOT_DIR,`${slug}-${width}.png`)});
      if(slug==='canada-cmhc-insurance-calculator.html') {await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await page.screenshot({path:path.join(process.env.QA_SCREENSHOT_DIR,`page-${width}.png`)});}
    }
    await page.close();pages++;
   }
   await context.close();
  }
  const c=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:900}});
  await c.route('**/*',r=>new URL(r.request().url()).origin===new URL(base).origin?r.continue():r.abort());
  for(const slug of slugs) {const p=await c.newPage();await p.goto(`${base}/blog/${slug}`);assert.ok((await p.locator('article').innerText()).length>1500);assert.ok(await p.locator('article a[href^="https:"]').count()>0);await p.close();}
  await c.close();
  console.log(`PASS: ${pages} browser page/viewport checks; 35 no-JavaScript pages; external ad/network traffic blocked.`);
 } finally {await browser.close();if(server)await new Promise(resolve=>server.close(resolve));}
})().catch(e=>{console.error(e);process.exit(1)});
