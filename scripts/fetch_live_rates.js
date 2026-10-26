/* Refresh public observations. Policy references require a dated source review. */
'use strict';
const fs=require('node:fs'),path=require('node:path');
const {applyObservation,freshness,latestObservation}=require('../lib/rate-data.cjs');
async function fetchJson(url){try{const r=await fetch(url,{signal:AbortSignal.timeout(8000)});return r.ok?await r.json():null;}catch{return null;}}
async function run(){
 const file=path.resolve(__dirname,'../data/rates.json'),data=JSON.parse(fs.readFileSync(file,'utf8')),now=new Date();
 const key=process.env.FRED_API_KEY;
 if(key){
  for(const[series,name,cadence]of [['MORTGAGE30US','fixed30','weekly'],['MORTGAGE15US','fixed15','weekly'],['DPRIME','prime','daily'],['DFF','fedEffective','daily']]){
   const url=new URL('https://api.stlouisfed.org/fred/series/observations');
   for(const[k,v]of Object.entries({series_id:series,api_key:key,file_type:'json',sort_order:'desc',limit:'5'}))url.searchParams.set(k,v);
   const json=await fetchJson(url),obs=latestObservation(json?.observations,o=>o.value,o=>o.date,now);
   if(obs&&data.rates.usa[name]){const item=data.rates.usa[name];if(applyObservation(item,obs.value,obs.date,now)){item.cadence=cadence;item.sourceUrl='https://fred.stlouisfed.org/series/'+series;Object.assign(item,freshness(item,now));}}
  }
 }else console.warn('FRED_API_KEY is not configured; retaining dated US observations.');
 for(const[series,name,cadence]of [['V39079','boc','daily'],['V80691335','fixed5','weekly'],['V80691311','prime','weekly']]){
  const json=await fetchJson(`https://www.bankofcanada.ca/valet/observations/${series}/json?recent=5`);
  const obs=latestObservation(json?.observations,o=>o[series]?.v,o=>o.d,now);
  if(obs&&data.rates.canada[name]){data.rates.canada[name].cadence=cadence;applyObservation(data.rates.canada[name],obs[series].v,obs.d,now);}
 }
 for(const items of Object.values(data.rates))for(const item of Object.values(items))Object.assign(item,freshness(item,now));
 data.generatedAt=now.toISOString();fs.writeFileSync(file,JSON.stringify(data,null,2)+'\n');
 require('./build_rate_assets.cjs').build();
 console.log('Updated available observations; unsuccessful sources retain their actual verification dates.');
}
if(require.main===module)run().catch(()=>{console.error('Rate synchronization failed.');process.exitCode=1;});
module.exports={run,fetchJson};
