/* Dated observations and references; never substitutes a policy rate for a loan quote. */
(function(){
'use strict';
const baseline=window.MPG_RATE_SNAPSHOT||{version:2,rates:{}};
function ageStatus(item){
 if(item.kind==='historical')return 'stale';
 if(item.kind==='policy')return Date.parse(item.reviewAfter||'')>=Date.now()?'reference':'stale';
 const days=(Date.now()-Date.parse(item.effectiveDate))/86400000;
 const limit=item.cadence==='weekly'||/Mortgage|5-Year/.test(item.instrument)?10:4;
 return Number.isFinite(days)&&days>=-1&&days<=limit?'live':'stale';
}
function render(data){
 window.RATES_DETAIL=data;window.RATES={lastUpdated:(data.generatedAt||'').slice(0,10)};
 for(const[c,items]of Object.entries(data.rates||{})){window.RATES[c]={};for(const[k,item]of Object.entries(items))window.RATES[c][k]=item.formatted;}
 document.querySelectorAll('[data-rate]').forEach(el=>{const[c,k]=el.dataset.rate.split('.'),item=data.rates[c]?.[k];if(item)el.textContent=item.formatted;});
 document.querySelectorAll('[data-rate-meta]').forEach(el=>{
  const[c,k]=el.dataset.rateMeta.split('.'),item=data.rates[c]?.[k];if(!item)return;
  const status=ageStatus(item),badge=document.createElement('span');badge.className='rate-badge rate-badge-'+(status==='live'?'live':status==='stale'?'stale':'ref');
  badge.textContent=(status==='stale'?'Historical / review due':status==='reference'?'Policy reference':'Latest observation')+' · '+item.source+' · '+item.effectiveDate;
  badge.title='Last checked '+item.lastVerified+'. '+(item.kind==='policy'?'Policy reference; not a mortgage quote.':'Dated source observation; not a personalized quote.');el.replaceChildren(badge);
 });
 document.querySelectorAll('[data-rate-updated]').forEach(el=>{el.textContent='Dated benchmarks and policy references. Check each source date; calculator rates are editable assumptions.';});
 document.dispatchEvent(new CustomEvent('ratesUpdated',{detail:{rates:window.RATES,detail:data}}));
}
async function hydrate(){for(const url of ['/api/rates','/data/rates.json']){try{const r=await fetch(url,{headers:{Accept:'application/json'}});if(!r.ok)continue;const d=await r.json();if(d.version!==2||!d.rates)continue;render(d);return;}catch{}}}
function init(){render(baseline);hydrate();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
