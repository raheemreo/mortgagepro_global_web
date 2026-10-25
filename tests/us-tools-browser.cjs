/* Local/production browser regression. External traffic and ads are blocked. */
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),http=require('node:http'),{chromium}=require('playwright');
const {catalog}=require('../js/us-tools-catalog');
const base=process.env.QA_BASE_URL||'http://127.0.0.1:8878';
(async()=>{
 let server;const root=path.resolve(__dirname,'..');
 if(!process.env.QA_BASE_URL){server=http.createServer((req,res)=>{let file=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,base).pathname));if(file!==root&&!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');if(!fs.existsSync(file)&&!path.extname(file))file+='.html';if(!fs.existsSync(file)){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.json':'application/json','.ico':'image/x-icon'})[path.extname(file)]||'application/octet-stream');fs.createReadStream(file).pipe(res);});await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(8878,'127.0.0.1',resolve);});}
 const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{})});let pages=0;
 try{
 for(const [width,scheme]of (process.env.QA_FLOW_ONLY==='1'?[]:[[1280,'light'],[390,'light'],[320,'dark']])){
  const context=await browser.newContext({viewport:{width,height:900},colorScheme:scheme});
  const network=[];await context.route('**/*',r=>{const u=new URL(r.request().url());if(u.origin!==new URL(base).origin)return r.abort();if(r.request().method()!=='GET')network.push(r.request().method()+' '+u.pathname);return r.continue();});
  for(const c of catalog){
   const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));const response=await page.goto(base+'/tools/usa/'+c.id,{waitUntil:'networkidle'});assert.equal(response.status(),200,c.id);
   const widget=page.locator('[data-us-tool]'),form=widget.locator('form'),results=widget.locator('[data-results]');
   if(c.id==='tax-deduction'){assert.equal(await results.locator('dl').count(),0);await form.locator('[name=standard]').fill('16100');await form.locator('[name=saltLimit]').fill('40400');}
   await results.locator('dl').waitFor();assert.doesNotMatch(await results.innerText(),/NaN|Infinity/);
   const field=form.locator('input').first();
   if(await field.count()){
    const initial=await field.inputValue(),before=await results.innerText();await field.fill('');assert.equal(await results.locator('dl').count(),0,c.id+' stale output');assert.equal(await widget.locator('[data-error]').isVisible(),true);await field.fill('-999999999');assert.equal(await results.locator('dl').count(),0);await field.fill(initial);assert.equal(await results.innerText(),before,c.id+' restore');
   }
   const rate=form.locator('[name=rate]');if(await rate.count()){const previous=await rate.inputValue();await rate.fill('0');assert.equal(await results.locator('dl').count(),1,c.id+' zero rate');assert.doesNotMatch(await results.innerText(),/NaN|Infinity/);await rate.fill(previous);}
   await form.locator('[type=submit]').click();assert.equal(await results.locator('dl').count(),1);
   for(const details of await results.locator('details').all())await details.locator('summary').click();
   const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);assert.equal(overflow,false,c.id+' overflow '+width);
   assert.ok(await page.locator('main h1').count()===1);
   if(c.id==='extra-payments'){
    await form.locator('[name=extra]').fill('200');assert.ok(await results.locator('[data-metric=months] dd').innerText()!=='360');
    await results.locator('summary').last().click();const [d]=await Promise.all([page.waitForEvent('download'),results.locator('button').click()]);assert.equal(d.suggestedFilename(),'us-extra-payments-schedule.csv');
   }
   if(c.id==='pmi'){await form.locator('[name=down]').fill('5');assert.match(await results.locator('[data-metric=annualRate]').innerText(),/0.78%/);}
   if(c.id==='va'){await form.locator('[name=use]').selectOption('exempt');assert.match(await results.locator('[data-metric=fee] dd').innerText(),/\$0.00/);}
   if(c.id==='property-tax'){
    await widget.locator('[data-state]').selectOption('TX');assert.equal(await form.locator('[name=tax]').inputValue(),'1.6');assert.match(await widget.locator('[data-state-note]').innerText(),/Texas/);
    await form.locator('[name=tax]').fill('2');assert.equal(await widget.locator('[data-state]').inputValue(),'');assert.match(await results.locator('[data-metric=annual] dd').innerText(),/8,400/);
   }
   if(process.env.QA_SCREENSHOT_DIR&&['piti','amortization','property-tax','debt-payoff','fha'].includes(c.id)&&width!==320){fs.mkdirSync(process.env.QA_SCREENSHOT_DIR,{recursive:true});await page.screenshot({path:path.join(process.env.QA_SCREENSHOT_DIR,c.id+'-'+width+'.png'),fullPage:true});}
   await form.locator('[type=reset]').click();if(c.id==='tax-deduction'){await page.waitForFunction(()=>!document.querySelector('[data-error]').hidden);}else await results.locator('dl').waitFor();
   assert.deepEqual(errors,[],c.id+' JS errors');await page.close();pages++;
  }
  assert.deepEqual(network,[],'calculator inputs caused outbound writes');console.log(`Checked ${catalog.length} tools at ${width}px (${scheme}).`);await context.close();
 }
 // The complete entry flow, every directory card and every state shortcut.
 const context=await browser.newContext({viewport:{width:390,height:900}});await context.route('**/*',r=>new URL(r.request().url()).origin===new URL(base).origin?r.continue():r.abort());const p=await context.newPage();await p.goto(base+'/',{waitUntil:'networkidle'});
 const start=p.getByRole('link',{name:/Start Calculating/i}).first();await start.click();assert.match(p.url(),/#calculators/);
 const usa=p.locator('#calculators a[href*="usa-mortgage-calculator"]').first();await usa.click();await p.waitForURL(/usa-mortgage-calculator/);assert.equal(await p.locator('.us-tools-directory a[href^="/tools/usa/"]').count(),49);if(process.env.QA_SCREENSHOT_DIR){await p.locator('#tools').scrollIntoViewIfNeeded();await p.screenshot({path:path.join(process.env.QA_SCREENSHOT_DIR,'directory-390.png')});}
 const links=await p.locator('.us-tools-directory a').evaluateAll(as=>as.map(a=>a.getAttribute('href')));assert.equal(links.filter(u=>u.includes('/blog/')||u==='#calculator').length,0);
 for(const code of ['CA','TX','NY','FL','IL','NJ']){await p.goto(base+'/tools/usa/property-tax?state='+code);assert.equal(await p.locator('[data-state]').inputValue(),code);assert.equal(await p.locator('[data-results] dl').count(),1);}
 await p.goto(base+'/tools/usa/property-tax?state=%3Cscript%3E&value=999999');assert.equal(await p.locator('[name=value]').inputValue(),'420000');assert.equal(await p.locator('[data-state]').inputValue(),'');await context.close();
 const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:900}});await nojs.route('**/*',r=>new URL(r.request().url()).origin===new URL(base).origin?r.continue():r.abort());
 for(const c of catalog){const p=await nojs.newPage();await p.goto(base+'/tools/usa/'+c.id);assert.ok((await p.locator('.tool-method').innerText()).length>500);assert.equal(await p.locator('noscript').count(),1);assert.equal(await p.locator('[type=submit]').isVisible(),false);assert.ok(await p.locator('.tool-method a[href^="https:"]').count()>0);await p.close();}await nojs.close();
 console.log(`PASS: ${pages ? pages+" tool/viewport checks (invalid/zero/reset/recalculation, CSV and privacy); " : "Entry-flow-only run; "}43 no-JavaScript pages; home → country → tools flow; 6 state presets. External traffic blocked.`);
 }finally{await browser.close();if(server)await new Promise(resolve=>server.close(resolve));}
})().catch(error=>{console.error(error);process.exitCode=1;});
