const{test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const code=fs.readFileSync(__dirname+'/../_worker.js','utf8').replace('export default','globalThis.worker ='),context=vm.createContext({URL,Request,Response,console});vm.runInContext(code,context);
const aliases=require('../data/tool-redirects.json'),env={ASSETS:{fetch:async()=>new Response('asset',{status:200})}};
for(const[country,map]of Object.entries(aliases))for(const[from,to]of Object.entries(map))test(`Permanent redirect preserves query: ${country}/${from}`,async()=>{
 for(const suffix of['','.html','/']){const r=await context.worker.fetch(new Request(`https://mortgageproglobal.com/tools/${country}/${from}${suffix}?state=TX`),env);assert.equal(r.status,301);assert.equal(r.headers.get('location'),`https://mortgageproglobal.com/tools/${country}/${to}?state=TX`);}
 assert.equal((await context.worker.fetch(new Request(`https://mortgageproglobal.com/tools/${country}/${to}`),env)).status,200);
});
test('Canonical protocol/host and advertising control files',async()=>{
 for(const url of['http://mortgageproglobal.com/about','http://www.mortgageproglobal.com/about','https://www.mortgageproglobal.com/about']){const r=await context.worker.fetch(new Request(url+'?a=1'),env);assert.equal(r.status,301);assert.equal(r.headers.get('location'),'https://mortgageproglobal.com/about?a=1');}
 const r=await context.worker.fetch(new Request('https://mortgageproglobal.com/ads.txt'),env);assert.equal(r.status,200);assert.match(r.headers.get('content-type'),/^text\/plain/);assert.equal((await r.text()).trim(),fs.readFileSync(__dirname+'/../ads.txt','utf8').trim());
 const robots=await context.worker.fetch(new Request('https://mortgageproglobal.com/robots.txt'),env);assert.match(await robots.text(),/User-agent: Mediapartners-Google\nAllow: \//);
});
