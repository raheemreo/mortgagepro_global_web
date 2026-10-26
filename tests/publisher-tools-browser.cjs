/* Local release QA with external traffic blocked and explicit test-only fixtures. */
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),http=require('node:http'),{chromium}=require('playwright');
const aliases=require('../data/tool-redirects.json'),root=path.resolve(__dirname,'..'),base='http://127.0.0.1:8893';
const fixtures={usa:require('./fixtures/us-tools-inputs.json'),canada:require('./fixtures/canada-tools-inputs.json'),...require('./fixtures/country-tools-inputs.json')};
const countries={usa:['us','USMortgageTools'],canada:['canada','CanadaMortgageTools'],uk:['uk','CountryMortgageTools'],australia:['australia','CountryMortgageTools'],newzealand:['newzealand','CountryMortgageTools'],india:['india','CountryMortgageTools'],europe:['europe','CountryMortgageTools']};
(async()=>{
 const server=http.createServer((req,res)=>{let u=new URL(req.url,base),f=path.resolve(root,'.'+decodeURIComponent(u.pathname));if(f!==root&&!f.startsWith(root+'/'))return res.writeHead(403).end();if(fs.existsSync(f)&&fs.statSync(f).isDirectory())f=path.join(f,'index.html');if(!fs.existsSync(f)&&!path.extname(f))f+='.html';if(!fs.existsSync(f))return res.writeHead(404).end();res.setHeader('Content-Type',({'.js':'text/javascript','.css':'text/css','.json':'application/json','.html':'text/html','.svg':'image/svg+xml'})[path.extname(f)]||'application/octet-stream');fs.createReadStream(f).pipe(res);});await new Promise(r=>server.listen(8893,'127.0.0.1',r));
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH});let count=0;
 try{for(const width of[320,390,1280]){
  const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});await context.route('**/*',r=>{assert.equal(r.request().method(),'GET');return new URL(r.request().url()).origin===base?r.continue():r.abort();});
  for(const[country,[file,model]]of Object.entries(countries)){
   const C=require('../js/'+file+'-tools-catalog');for(const c of C.catalog.filter(x=>!aliases[country]?.[x.id]&&(width===320||x.id==='mortgage'))){
    const p=await context.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));await p.goto(base+'/tools/'+country+'/'+c.id,{waitUntil:'domcontentloaded'});await p.addStyleTag({content:'*{scroll-behavior:auto!important;transition:none!important;animation:none!important}'});
    const form=p.locator('main form'),panel=p.locator('[data-result-panel]'),out=p.locator('[data-results]');await form.locator('[type=submit]').waitFor();assert.equal(await panel.isVisible(),false);
    await p.evaluate(m=>{window.__calls=0;const f=window[m].calculate;window[m].calculate=(...args)=>{window.__calls++;return f(...args);};},model);
    const values={...fixtures[country][c.id],...(country==='usa'&&c.id==='tax-deduction'?{standard:16100,saltLimit:40400}:{})};
    for(const f of c.fields){const e=form.locator('[name="'+f.key+'"]');if(f.type==='select')await e.selectOption(String(values[f.key]));else await e.fill(String(values[f.key]));}
    assert.equal(await panel.isVisible(),false);assert.equal(await p.evaluate(()=>__calls),0,'typing calculation');await form.locator('[type=submit]').click();await out.locator('dl').waitFor();assert.equal(await p.evaluate(()=>__calls),1);assert.doesNotMatch(await out.innerText(),/NaN|Infinity/);
    for(const d of await out.locator('details').all())await d.evaluate(e=>e.open=true);assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,country+'/'+c.id+' overflow '+width);
    await form.locator('input').first().fill('');assert.equal(await panel.isVisible(),false);await form.locator('[type=submit]').click();assert.equal(await p.evaluate(()=>__calls),1);assert.equal(await panel.isVisible(),false);
    await form.locator('[type=reset]').click();assert.equal(await panel.isVisible(),false);assert.equal(await out.locator('dl').count(),0);for(const f of c.fields)assert.equal(await form.locator('[name="'+f.key+'"]').inputValue(),String(C.defaults(c.id)[f.key]));assert.deepEqual(errors,[],country+'/'+c.id);await p.close();count++;
   }console.log('Passed '+country+' at '+width+'px; cumulative '+count);
  }
  const p=await context.newPage();await p.goto(base+'/privacy-settings');assert.equal(await p.evaluate(()=>adsbygoogle.pauseAdRequests),1);assert.equal(await p.locator('meta[name=mpg-ad-eligible]').getAttribute('content'),'false');assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);await p.close();await context.close();
 }console.log('PASS: '+count+' tool/viewport checks; all 143 surviving tools at 320px and seven principal tools also at 390px/1280px; submit-only, invalidation/reset, no overflow/JS errors; permanently paused privacy settings. External network blocked.');}finally{await browser.close();await new Promise(r=>server.close(r));}
})().catch(e=>{console.error(e);process.exitCode=1});
