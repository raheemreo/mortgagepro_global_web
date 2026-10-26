const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const {validObservation,freshness,applyObservation,latestObservation}=require('../lib/rate-data.cjs');
const snapshot=JSON.parse(fs.readFileSync(__dirname+'/../data/rates.json','utf8'));
const now=new Date('2026-10-25T12:00:00Z');
test('dated October policy reference fixtures and primary links',()=>{
 for(const[c,k,expected,date]of [['usa','fed','3.75% – 4.00%','2026-09-17'],['australia','rba',4.6,'2026-09-30'],['india','repo',5.5,'2026-10-07'],['europe','ecb',2.65,'2026-09-16'],['uk','boe',3.75,'2025-12-18'],['newzealand','ocr',2.75,'2026-09-02']]){const a=snapshot.rates[c][k];assert.equal(a.rate,expected);assert.equal(a.effectiveDate,date);assert.match(a.lastVerified,/^\d{4}-\d{2}-\d{2}$/);assert.match(a.sourceUrl,/^https:\/\//);assert.equal(a.kind,'policy');assert.equal(a.isLive,false);}
});
test('observation validation rejects placeholders, malformed dates, infinity and future observations',()=>{
 for(const v of [null,'',' ','.','null',Infinity,NaN,-1,99,[],{}])assert.equal(validObservation(v,'2026-10-22',now),false,String(v));
 for(const date of ['2026-02-31','invalid','2027-01-01'])assert.equal(validObservation(4,date,now),false);
 assert.equal(validObservation('0.00','2026-10-22',now),true);assert.equal(validObservation('7.32','2026-10-22',now),true);
});
test('an unchanged policy uses review date rather than an old effective date',()=>{
 const a=snapshot.rates.uk.boe;assert.equal(freshness(a,now).status,'reference');assert.equal(freshness(a,new Date('2026-10-29')).status,'stale');
});
test('historical marketing inputs cannot become live from a new page load',()=>{assert.deepEqual(freshness({kind:'historical',effectiveDate:'2026-10-25'},now),{status:'stale',isLive:false});});
test('weekly and daily publication windows differ',()=>{assert.equal(freshness({kind:'observation',cadence:'weekly',effectiveDate:'2026-10-20'},now).isLive,true);assert.equal(freshness({kind:'observation',cadence:'daily',effectiveDate:'2026-10-20'},now).isLive,false);});
test('unsuccessful observations leave actual value and verification date intact',()=>{const a={rate:7.32,lastVerified:'2026-10-24'};assert.equal(applyObservation(a,'.','2026-10-25',now),false);assert.deepEqual(a,{rate:7.32,lastVerified:'2026-10-24'});});
test('a real observation updates its own verified date and allows a zero rate',()=>{const a={instrument:'Policy observation',cadence:'daily'};assert.equal(applyObservation(a,'0','2026-10-24',now),true);assert.equal(a.rate,0);assert.equal(a.lastVerified,'2026-10-25');});
test('select newest valid dated observation regardless of response order',()=>{
 const rows=[{d:'2026-10-21',v:'6.19'},{d:'2026-09-23',v:'6.09'},{d:'2026-10-24',v:'.'},{d:'2026-02-31',v:'7.00'},{d:'2027-01-01',v:'9'}];
 for(const list of [rows,[...rows].reverse(),[rows[1],rows[3],rows[0],rows[4],rows[2]]])assert.equal(latestObservation(list,o=>o.v,o=>o.d,now).v,'6.19');
 assert.equal(latestObservation([{d:'2026-10-21',v:'0'}],o=>o.v,o=>o.d,now).v,'0');
 const item={rate:6.19,effectiveDate:'2026-10-21',lastVerified:'2026-10-24'};assert.equal(applyObservation(item,'6.09','2026-09-23',now),false);assert.equal(item.rate,6.19);
});
test('homepage illustration uses the exact US model and explicitly labels the assumption',()=>{
 const example=require('../data/homepage-example.json'),r=require('../js/us-tools-models').calculate('mortgage',example).values;
 const html=fs.readFileSync(__dirname+'/../index.html','utf8');
 const currency=x=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(x);
 for(const[key,value]of[['payment',r.pi],['interest',r.interest]])assert.ok(html.includes('data-home-example="'+key+'">'+currency(value)+'<'));
 assert.ok(Math.abs(r.interest-472844.5017319715)<.0001);assert.match(html,/fixed assumption/);
});
test('unverified historical benchmark records are not published as figures',()=>{for(const records of Object.values(snapshot.rates))for(const item of Object.values(records))assert.notEqual(item.kind,'historical');assert.equal(snapshot.rates.usa.fedEffective.sourceUrl,'https://fred.stlouisfed.org/series/DFF');});
function worker(upstream,cache){const module={exports:{}};const context={module,Response,Request,URL,Headers,AbortController,setTimeout,clearTimeout,Date,caches:{default:cache||{match:async()=>null,put:async()=>{}}},fetch:upstream||(async()=>new Response('',{status:503}))};vm.runInNewContext(fs.readFileSync(__dirname+'/../_worker.js','utf8').replace('export default','module.exports ='),context);return module.exports;}
test('missing snapshot gives 503 instead of inventing current fallback rates',async()=>{
 const w=worker(),r=await w.fetch(new Request('https://example.com/api/rates'),{ASSETS:{fetch:async()=>new Response('',{status:503})}});assert.equal(r.status,503);assert.equal((await r.json()).error,'Rates temporarily unavailable');
});
test('upstream outage preserves snapshot generation and verification dates',async()=>{
 const data=structuredClone(snapshot);data.rates.usa.fixed30.lastVerified='2026-01-01';data.rates.usa.fixed30.effectiveDate='2026-01-01';
 const r=await worker().fetch(new Request('https://example.com/api/rates'),{ASSETS:{fetch:async()=>Response.json(data)}}),d=await r.json();assert.equal(d.generatedAt,snapshot.generatedAt);assert.equal(d.rates.usa.fixed30.lastVerified,'2026-01-01');assert.equal(d.rates.usa.fixed30.status,'stale');assert.equal(d.rates.usa.fed.rate,'3.75% – 4.00%');assert.ok(d.servedAt);
});
test('edge cache identity contains the deployed snapshot generation',async()=>{
 let key;const w=worker(undefined,{match:async r=>{key=r.url;return null;},put:async()=>{}});await w.fetch(new Request('https://example.com/api/rates'),{ASSETS:{fetch:async()=>Response.json(snapshot)}});assert.equal(new URL(key).searchParams.get('snapshot'),snapshot.generatedAt);
});
test('browser fallback exactly matches canonical data',()=>{const context={window:{}};vm.runInNewContext(fs.readFileSync(__dirname+'/../js/rate-snapshot.js','utf8'),context);assert.deepEqual(JSON.parse(JSON.stringify(context.window.MPG_RATE_SNAPSHOT)),snapshot);});
test('worker rejects malformed observations and permits real zero observations',async()=>{
 const upstream=async uri=>{const u=new URL(uri),series=u.pathname.includes('V39079')?'V39079':u.pathname.includes('V80691335')?'V80691335':'V80691311';return Response.json({observations:[{d:new Date().toISOString().slice(0,10),[series]:{v:series==='V39079'?'bad':series==='V80691335'?'0':'null'}}]});};
 const r=await worker(upstream).fetch(new Request('https://example.com/api/rates'),{ASSETS:{fetch:async()=>Response.json(snapshot)}}),d=await r.json();assert.equal(d.rates.canada.boc.rate,snapshot.rates.canada.boc.rate);assert.equal(d.rates.canada.fixed5.rate,0);assert.equal(d.rates.canada.prime.rate,snapshot.rates.canada.prime.rate);
});
test('edge selects newest Canadian value from either observation ordering',async()=>{
 for(const reverse of[false,true]){
  const upstream=async uri=>{const series=new URL(uri).pathname.split('/observations/')[1].split('/')[0];let rows=[{d:'2026-10-21',[series]:{v:'6.19'}},{d:'2026-09-23',[series]:{v:'6.09'}}];if(reverse)rows.reverse();return Response.json({observations:rows});};
  const r=await worker(upstream).fetch(new Request('https://example.com/api/rates'),{ASSETS:{fetch:async()=>Response.json(snapshot)}});assert.equal((await r.json()).rates.canada.fixed5.rate,6.19);
 }
});
