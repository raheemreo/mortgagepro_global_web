/* Local or deployed country regression; explicit test-only fixtures, external ads blocked. */
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),http=require('node:http'),{chromium}=require('playwright');
const country=process.env.QA_COUNTRY||'uk',C=require('../js/'+country+'-tools-catalog'),fixtures=require('./fixtures/country-tools-inputs.json')[country],blogInputs=Object.fromEntries(Object.entries(require('./fixtures/country-blog-inputs.json')).filter(([s])=>s.startsWith(country==='newzealand'?'nz-':country+'-')));
const base=process.env.QA_BASE_URL||'http://127.0.0.1:8881',root=path.resolve(__dirname,'..');
const remote=base.startsWith('https:'),ua='Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36';
(async()=>{
 let server;
 if(!remote){server=http.createServer((req,res)=>{let f=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,base).pathname));if(f!==root&&!f.startsWith(root+path.sep)){res.writeHead(403).end();return;}if(fs.existsSync(f)&&fs.statSync(f).isDirectory())f=path.join(f,'index.html');if(!fs.existsSync(f)&&!path.extname(f))f+='.html';if(!fs.existsSync(f)){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json'})[path.extname(f)]||'application/octet-stream');fs.createReadStream(f).pipe(res);});await new Promise(resolve=>server.listen(8881,'127.0.0.1',resolve));}
 let proxy;if(remote&&process.env.HTTPS_PROXY){const u=new URL(process.env.HTTPS_PROXY);proxy={server:u.origin,...u.username?{username:decodeURIComponent(u.username),password:decodeURIComponent(u.password)}:{}};}
 const browser=await chromium.launch({headless:true,...proxy?{proxy}:{},...process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}});let tools=0,blogs=0,heroes=0;
 const contextFor=async(width,extra={})=>{const c=await browser.newContext({viewport:{width,height:900},userAgent:ua,ignoreHTTPSErrors:true,colorScheme:width===320?'dark':'light',reducedMotion:'reduce',...extra});await c.route('**/*',r=>{const u=new URL(r.request().url());assert.equal(r.request().method(),'GET','unexpected outbound write');return u.origin===new URL(base).origin?r.continue():r.abort();});return c;};
 try{
 for(const width of [1280,390,320].filter(w=>!process.env.QA_WIDTH||w===Number(process.env.QA_WIDTH))){
  const context=await contextFor(width);
  for(const c of C.catalog){
   const p=await context.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));const response=await p.goto(base+'/tools/'+country+'/'+c.id);assert.equal(response.status(),200,c.id);
   const w=p.locator('[data-country-tool]'),form=w.locator('form'),panel=w.locator('[data-result-panel]'),out=w.locator('[data-results]');
   await form.locator('[type=submit]').waitFor({state:'visible'});assert.equal(await panel.isVisible(),false,c.id+' initial');
   await p.evaluate(()=>{window.__calls=0;const f=CountryMortgageTools.calculate;CountryMortgageTools.calculate=(...a)=>{window.__calls++;return f(...a);};});
   await form.locator('[type=submit]').click();assert.equal(await panel.isVisible(),false);assert.equal(await p.evaluate(()=>__calls),0);
   for(const f of c.fields){const e=form.locator('[name='+f.key+']');if(f.type==='select')await e.selectOption(String(fixtures[c.id][f.key]));else await e.fill(String(fixtures[c.id][f.key]));}
   assert.equal(await p.evaluate(()=>__calls),0);assert.equal(await panel.isVisible(),false);
   const submit=async()=>{await form.locator('[type=submit]').click();await out.locator('dl').waitFor();assert.equal(await panel.isVisible(),true);assert.doesNotMatch(await out.innerText(),/NaN|Infinity/);};
   await submit();assert.equal(await p.evaluate(()=>__calls),1);assert.ok(await out.evaluate(e=>e===document.activeElement));
   const e=form.locator('input').first(),old=await e.inputValue();await e.fill('');assert.equal(await panel.isVisible(),false);await form.locator('[type=submit]').click();assert.equal(await panel.isVisible(),false);assert.equal(await p.evaluate(()=>__calls),1);await e.fill(old);await submit();
   const rate=form.locator('[name=rate]');if(await rate.count()){const old=await rate.inputValue(),n=await p.evaluate(()=>__calls);await rate.fill('0');assert.equal(await panel.isVisible(),false);assert.equal(await p.evaluate(()=>__calls),n);await submit();await rate.fill(old);await submit();}
   if(c.id==='amortization'&&width===390){await form.locator('[name=frequency]').selectOption('52');assert.equal(await panel.isVisible(),false);await submit();assert.equal(await out.locator('tbody').last().locator('tr').count(),1300);await out.locator('summary').last().click();const [d]=await Promise.all([p.waitForEvent('download'),out.locator('button').click()]);assert.equal(d.suggestedFilename(),country+'-amortization-schedule.csv');const file=await d.path();assert.equal(fs.readFileSync(file,'utf8').trim().split(/\r?\n/).length,1301);}
   for(const details of await out.locator('details').all())await details.evaluate(e=>e.open=true);
   assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,c.id+' overflow '+width);
   if(process.env.QA_SCREENSHOT_DIR&&width!==320&&['mortgage','land-transfer-tax','amortization'].includes(c.id)){fs.mkdirSync(process.env.QA_SCREENSHOT_DIR,{recursive:true});await p.screenshot({path:path.join(process.env.QA_SCREENSHOT_DIR,c.id+'-'+width+'.png'),fullPage:false});}
   const n=await p.evaluate(()=>__calls);await form.locator('[type=reset]').click();await p.waitForFunction(()=>document.querySelector('[data-result-panel]').hidden);assert.equal(await p.evaluate(()=>__calls),n);assert.equal(await out.locator('dl').count(),0);
   for(const f of c.fields)assert.equal(await form.locator('[name='+f.key+']').inputValue(),String(C.defaults(c.id)[f.key]));assert.deepEqual(errors,[],c.id);await p.close();tools++;
  }
  for(const [slug,values]of Object.entries(blogInputs)){
   const p=await context.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));await p.goto(base+'/blog/'+slug);const w=p.locator('[data-global-calculator]'),form=w.locator('form'),out=w.locator('[data-results]');await form.locator('[type=submit]').waitFor({state:'visible'});assert.equal(await out.isVisible(),false);
   for(const[key,value]of Object.entries(values)){const e=form.locator('[name='+key+']');if(await e.evaluate(e=>e.tagName==='SELECT'))await e.selectOption(String(value));else await e.fill(String(value));}
   assert.equal(await out.isVisible(),false);await form.locator('[type=submit]').click();await out.locator('dl').waitFor();const e=form.locator('input').first(),old=await e.inputValue();await e.fill('');assert.equal(await out.isVisible(),false);await form.locator('[type=submit]').click();assert.equal(await out.locator('dl').count(),0);await e.fill(old);assert.equal(await out.isVisible(),false);await form.locator('[type=submit]').click();await out.locator('dl').waitFor();await form.locator('[type=reset]').click();await p.waitForFunction(()=>document.querySelector('[data-global-calculator] [data-results]').hidden);assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,slug+' overflow');assert.deepEqual(errors,[],slug);await p.close();blogs++;
  }
  const p=await context.newPage();await p.goto(base+'/'+C.landing);assert.equal(await p.locator('.country-tools-directory a').count(),C.catalog.length);
  const roots={uk:{id:'uk',prefix:'uk',values:{price:380000,down:15,rate:4.75}},australia:{id:'au',prefix:'au',values:{price:700000,down:20,rate:6.19}},newzealand:{id:'nz',prefix:'nz',values:{price:700000,deposit:140000,rate:5.99}},india:{id:'india',prefix:'india',values:{loan:5000000,rate:8.5}},europe:{id:'eu',prefix:'eu',values:{price:350000,down:20,rate:4}}},rt=roots[country];
  if(rt){const form=p.locator('#'+rt.id+'-calc-form'),out=p.locator('#'+rt.id+'-results');assert.equal(await out.isVisible(),false);for(const[k,v]of Object.entries(rt.values))await form.locator('#'+rt.prefix+'-'+k).fill(String(v));assert.equal(await out.isVisible(),false);await form.locator('[type=submit]').click();await p.waitForFunction(k=>!!window[k],'_'+rt.id+'ResultBlob');await form.locator('#'+rt.prefix+'-rate').fill('0');assert.equal(await out.isVisible(),false);await form.locator('[type=submit]').click();await p.waitForFunction(k=>!!window[k],'_'+rt.id+'ResultBlob');assert.ok(Math.abs(await p.evaluate(k=>window[k].totalInterest,'_'+rt.id+'ResultBlob'))<.01);await form.locator('#'+rt.id+'-calc-reset').click();assert.equal(await out.isVisible(),false);assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,'root overflow');heroes++;}
  console.log('Passed '+country+' viewport '+width);await p.close();await context.close();
 }
 const nojs=await contextFor(390,{javaScriptEnabled:false});for(const x of C.catalog){const p=await nojs.newPage();await p.goto(base+'/tools/'+country+'/'+x.id);assert.ok((await p.locator('.tool-method').innerText()).length>500);assert.equal(await p.locator('[type=submit]').isVisible(),false);await p.close();}await nojs.close();
 console.log(`PASS: ${tools} country tool viewport checks, ${blogs} country article widget checks, ${heroes} root calculator checks; CSV, reset, validation, no typing calculation, ${C.catalog.length} no-JavaScript pages.`);
 }finally{await browser.close();if(server)await new Promise(resolve=>server.close(resolve));}
})().catch(e=>{console.error(e);process.exitCode=1;});
