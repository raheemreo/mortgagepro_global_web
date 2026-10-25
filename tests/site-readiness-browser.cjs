/* Controlled local QA. All external traffic, including live ads, is blocked. */
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..'),base='http://127.0.0.1:8875';
const calculators={
'usa-mortgage-calculator':['us','us','_usResultBlob'],
'canada-mortgage-calculator':['canada','can','_canadaResultBlob'],
'uk-mortgage-calculator':['uk','uk','_ukResultBlob'],
'australia-mortgage-calculator':['au','au','_auResultBlob'],
'new-zealand-mortgage-calculator':['nz','nz','_nzResultBlob'],
'india-home-loan-emi-calculator':['india','india','_indiaResultBlob'],
'europe-mortgage-calculator':['eu','eu','_euResultBlob']};
const docs=['about','authors/abdul-raheem','privacy-policy','cookie-policy','editorial-policy','corrections-policy','data-deletion-policy','methodology','contact','affiliate-disclosure','terms-and-conditions','disclaimer','data-sources','mortgage-faq'];
(async()=>{
 const server=http.createServer((req,res)=>{let f=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,base).pathname));if(!f.startsWith(root+'/')){res.writeHead(403).end();return;}if(fs.existsSync(f)&&fs.statSync(f).isDirectory())f=path.join(f,'index.html');if(!fs.existsSync(f)){res.writeHead(404).end();return;}res.setHeader('Content-Type',f.endsWith('.js')?'text/javascript':f.endsWith('.css')?'text/css':f.endsWith('.json')?'application/json':'text/html');fs.createReadStream(f).pipe(res);});await new Promise(r=>server.listen(8875,'127.0.0.1',r));
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH});let count=0;
 try{
 for(const width of [1280,390,320]){
  const context=await browser.newContext({viewport:{width,height:900},colorScheme:width===320?'dark':'light'});
  await context.route('**/*',r=>new URL(r.request().url()).origin===base?r.continue():r.abort());
  for(const slug of [...Object.keys(calculators),...docs,'index','blog/index']){
   const p=await context.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));await p.goto(base+'/'+slug+'.html',{waitUntil:'networkidle'});
   assert.equal(await p.locator('h1').count(),1,slug+' H1');
   if(calculators[slug]){
    const[id,field,cache]=calculators[slug];const form=p.locator('#'+id+'-calc-form');
    if(id==='us'){assert.equal(await p.evaluate(()=>window._usResultBlob||null),null);await form.locator('#us-price').fill('450000');await form.locator('#us-rate').fill('7.32');}
    await p.evaluate(()=>executeCalculation());assert.ok(await p.evaluate(k=>!!window[k],cache),slug+' initial result');
    const first=form.locator('input[type=number]').first(),initial=await first.inputValue();
    await first.fill('');assert.equal(await p.evaluate(k=>window[k],cache),null,slug+' stale export');
    await p.evaluate(()=>executeCalculation());assert.equal(await p.evaluate(k=>window[k],cache),null,slug+' invalid output');
    await first.fill(initial);
    const rate=p.locator('#'+field+'-rate'),old=await rate.inputValue();await rate.fill('0');await p.evaluate(()=>executeCalculation());
    assert.ok(await p.evaluate(k=>!!window[k],cache),slug+' zero-rate result');
    assert.doesNotMatch(await p.locator('main').innerText(),/NaN|Infinity/);await rate.fill(old);await p.evaluate(()=>executeCalculation());
    const events=await p.evaluate(()=>(window.dataLayer||[]).map(x=>Array.from(x)).filter(x=>x[0]==='event'));
    assert.deepEqual(events,[],slug+' analytics event');
    if(width===1280){
     if(id==='canada'){
      await p.locator('#can-price').fill('700000');await p.locator('#can-down').fill('10');await p.locator('#can-tenure').selectOption('30');await p.evaluate(()=>executeCalculation());assert.equal(await p.evaluate(k=>window[k],cache),null);
      await p.locator('#can-eligible30').selectOption('yes');await p.evaluate(()=>executeCalculation());assert.ok(Math.abs(await p.evaluate(k=>window[k].cmhcPremiumAmount,cache)-20790)<.001);assert.doesNotMatch(await p.locator('#can-stress-status').innerText(),/PASS|FAIL/);
     }
     if(id==='uk'){
      await p.locator('#uk-price').fill('500000');await p.locator('#uk-ftb').check();await p.evaluate(()=>executeCalculation());assert.equal(await p.evaluate(k=>window[k].stampDuty,cache),10000);
      await p.locator('#uk-price').fill('500001');await p.evaluate(()=>executeCalculation());assert.ok(Math.abs(await p.evaluate(k=>window[k].stampDuty,cache)-15000.05)<.001);
     }
     if(id==='au'){
      assert.equal(await p.evaluate(k=>window[k].stampDuty,cache),null);
      await p.locator('#au-price').fill('700000');await p.locator('#au-state').selectOption('QLD');await p.evaluate(()=>executeCalculation());assert.equal(await p.evaluate(k=>window[k].stampDuty,cache),24525);
      await p.locator('#au-state').selectOption('VIC');await p.evaluate(()=>executeCalculation());assert.equal(await p.evaluate(k=>window[k].stampDuty,cache),37070);
      await p.locator('#au-ftb').check();await p.evaluate(()=>executeCalculation());assert.equal(await p.evaluate(k=>window[k].stampDuty,cache),null);
      await p.locator('#au-duty-quote').fill('0');await p.locator('#au-down').fill('10');await p.evaluate(()=>executeCalculation());assert.equal(await p.evaluate(k=>window[k].stampDuty,cache),0);assert.equal(await p.evaluate(k=>window[k].lmiPremium,cache),12600);
     }
     if(id==='us'){await p.locator('#btn-toggle-adv').click();await p.locator('#us-down').fill('10');await p.locator('#us-pmi').fill('0');await p.evaluate(()=>executeCalculation());assert.equal(await p.evaluate(k=>window[k].monthlyPMI,cache),0);}
     if(id==='eu'){await p.locator('#eu-fee-rate').fill('15');await p.evaluate(()=>executeCalculation());const r=await p.evaluate(k=>window[k],cache);assert.equal(r.notaryFees,r.price*.15);}
     if(id==='nz'){await p.locator('#nz-kiwisaver').fill('1000000');await p.evaluate(()=>executeCalculation());assert.match(await p.locator('#deposit-kiwisaver-lbl').innerText(),/no excess cash assumed/);}
    }
   }
   assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,slug+' overflow '+width);
   assert.deepEqual(errors,[],slug+' JS errors');
   if(process.env.QA_SCREENSHOT_DIR&&width!==320&&['australia-mortgage-calculator','privacy-policy','data-sources','about'].includes(slug)){fs.mkdirSync(process.env.QA_SCREENSHOT_DIR,{recursive:true});await p.screenshot({path:path.join(process.env.QA_SCREENSHOT_DIR,slug+'-'+width+'.png'),fullPage:false});}
   await p.close();count++;
  }
  // Both real-provider APIs and the no-provider fallback remain usable.
  const p=await context.newPage();await p.goto(base+'/privacy-policy.html');
  assert.equal(await p.evaluate(()=>MPGPrivacy.open()),true);
  assert.equal(await p.evaluate(()=>{let called=0;googlefc.showRevocationMessage=()=>called++;const r=MPGPrivacy.open({preventDefault(){}});return !r&&called===1;}),true);await p.close();
  await context.close();
 }
 console.log('PASS: '+count+' page/viewport checks; seven calculator invalid/zero/scenario/telemetry checks; privacy controls. External traffic blocked.');
 }finally{await browser.close();await new Promise(r=>server.close(r));}
})().catch(e=>{console.error(e);process.exitCode=1});
