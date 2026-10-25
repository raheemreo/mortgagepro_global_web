/* Website privacy navigation QA; no mobile SDK execution and no live ads. */
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..'),base='http://127.0.0.1:8876';
const anchors=['app-privacy','covered-apps','google-admob','meta-audience-network','liftoff-monetize','unity-ads','privacy-choices','ai-assistant','ai-reporting','data-deletion'];
const packages=['com.reotech.mortgage_calculator','com.reotech.mortgagepro_global','com.reotech.mortgage_calculator_au','com.reotech.mortgage_calculator.canada','com.reotech.mortgage_calculator_in','com.reotech.mortgage_calculator_nz','com.reotech.mortgage_calculator_eu'];
(async()=>{
 const server=http.createServer((req,res)=>{
  const pathname=decodeURIComponent(new URL(req.url,base).pathname);
  let file=path.resolve(root,'.'+pathname);
  if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}
  if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');
  if(!fs.existsSync(file)&&!path.extname(file)&&fs.existsSync(file+'.html'))file+='.html';
  if(!fs.existsSync(file)){res.writeHead(404).end();return;}
  res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':'text/html');
  fs.createReadStream(file).pipe(res);
 });
 await new Promise(resolve=>server.listen(8876,'127.0.0.1',resolve));
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH});
 let checks=0;
 try{
  for(const width of [1280,390,320])for(const javaScriptEnabled of [true,false]){
   const context=await browser.newContext({viewport:{width,height:900},javaScriptEnabled,colorScheme:width===320?'dark':'light'});
   const requests=[],errors=[];
   await context.route('**/*',route=>{const url=new URL(route.request().url());if(url.origin!==base)return route.abort();requests.push(url.pathname);return route.continue();});
   const page=await context.newPage();page.on('pageerror',error=>errors.push(error.message));
   for(const anchor of anchors){
    await page.goto(base+'/app-privacy-policy',{waitUntil:'networkidle'});
    await Promise.all([page.waitForURL(base+'/app-privacy-policy#'+anchor),page.locator('nav.privacy-jump-links a[href="/app-privacy-policy#'+anchor+'"]').click()]);
    const target=page.locator('#'+anchor);await target.waitFor();
    await page.waitForFunction(id=>{const r=document.getElementById(id)?.getBoundingClientRect();return r&&r.top>=0&&r.top<600;},anchor,{timeout:5000}).catch(async error=>{throw new Error(`${width}/${javaScriptEnabled}/${anchor}: `+JSON.stringify(await page.evaluate(id=>({url:location.href,scrollY,rect:document.getElementById(id)?.getBoundingClientRect().toJSON(),margin:getComputedStyle(document.getElementById(id)).scrollMarginTop}),anchor)));});
    const box=await target.boundingBox();assert.ok(box&&box.y>=0&&box.y<600,`${width}/${javaScriptEnabled}/${anchor}: target visible below header`);
    assert.equal(await page.locator('h1').count(),1);
    assert.equal(await page.locator('script[src*="adsbygoogle"]').count(),0,'no ad loader on app policy');
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,'mobile overflow');
    checks++;
   }
   // A copied link must also work on a fresh load, including when JavaScript is disabled.
   await page.goto(base+'/app-privacy-policy#unity-ads',{waitUntil:'networkidle'});
   assert.ok((await page.locator('#unity-ads').boundingBox()).y<600);
   const contrast=await page.evaluate(()=>{
    const rgb=s=>(s.match(/[\d.]+/g)||[]).map(Number);
    function background(el){while(el){const c=rgb(getComputedStyle(el).backgroundColor);if(c.length===3||c[3]===1)return c;el=el.parentElement;}return [255,255,255];}
    function luminance(c){return c.slice(0,3).map(v=>v/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0);}
    function ratio(el){const a=luminance(rgb(getComputedStyle(el).color)),b=luminance(background(el));return(Math.max(a,b)+.05)/(Math.min(a,b)+.05);}
    const heading=document.getElementById('unity-ads');return {heading:ratio(heading),link:ratio(heading.nextElementSibling.nextElementSibling.querySelector('a'))};
   });
   assert.ok(contrast.heading>=3&&contrast.link>=4.5,'readable heading/link contrast: '+JSON.stringify(contrast));
   const listed=await page.locator('main table tbody tr td:last-child code').allTextContents();
   assert.deepEqual(listed,packages,'all seven exact package identifiers, preserving Canada dot');
   assert.equal(await page.locator('main table td').evaluateAll(cells=>cells.some(cell=>cell.scrollWidth>cell.clientWidth+1)),false,'package identifiers fit their cells without clipping');
   const schema=await page.locator('script[type="application/ld+json"]').allTextContents();
   const policy=schema.map(s=>JSON.parse(s)).find(s=>s['@type']==='WebPage');
   assert.deepEqual(policy.about.map(app=>app.identifier),packages,'structured data matches the visible covered-app list');
   assert.match(await page.locator('main').innerText(),/Each listed package has its own app storage/);
   assert.match(await page.locator('main').innerText(),/does not announce a launch/);
   assert.match(await page.locator('#ai-reporting + p').innerText(),/Google Forms/);
   assert.equal(await page.locator('a[href="mailto:privacy@mortgageproglobal.com"]').count(),0,'only confirmed privacy contact');
   assert.deepEqual(errors,[]);
   assert.ok(!requests.some(u=>/api\/|formResponse/.test(u)),'reading policy sends no app/feedback request');
   if(process.env.QA_SCREENSHOT_DIR&&javaScriptEnabled){
    fs.mkdirSync(process.env.QA_SCREENSHOT_DIR,{recursive:true});
    await page.screenshot({path:path.join(process.env.QA_SCREENSHOT_DIR,'app-privacy-unity-'+width+'.png')});
    await page.goto(base+'/app-privacy-policy',{waitUntil:'networkidle'});
    await page.screenshot({path:path.join(process.env.QA_SCREENSHOT_DIR,'app-privacy-overview-'+width+'.png')});
   }
   await context.close();
  }
  console.log(`PASS: ${checks} section-link journeys at 1280/390/320px, with and without JavaScript; copied deep links, privacy-page ad exclusion, overflow and contact checks. External traffic blocked.`);
 }finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
})().catch(error=>{console.error(error);process.exitCode=1;});
