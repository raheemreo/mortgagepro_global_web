'use strict';
const WINDOWS={daily:4,weekly:10,policy:14};
function validObservation(value,date,now=new Date()) {
 if(!['number','string'].includes(typeof value)||(typeof value==='string'&&!value.trim())||!/^\d{4}-\d{2}-\d{2}$/.test(date||''))return false;
 const n=Number(value),time=Date.parse(date);
 if(Number.isFinite(time)&&new Date(time).toISOString().slice(0,10)!==date)return false;
 return value!==null&&value!==''&&value!=='.'&&Number.isFinite(n)&&n>=0&&n<=50&&Number.isFinite(time)&&time<=now.getTime()+86400000;
}
function freshness(item,now=new Date()) {
 if(item.kind==='historical')return {status:'stale',isLive:false};
 if(item.kind==='policy')return {status:Date.parse(item.reviewAfter||'')>=now.getTime()? 'reference':'stale',isLive:false};
 const cadence=item.cadence||(/Mortgage|5-Year/.test(item.instrument)?'weekly':'daily');
 const age=(now-Date.parse(item.effectiveDate))/86400000;
 const fresh=Number.isFinite(age)&&age>=-1&&age<=(WINDOWS[cadence]||4);
 return {status:fresh?'live':'stale',isLive:fresh};
}
function applyObservation(item,value,date,now=new Date()) {
 if(!validObservation(value,date,now))return false;
 Object.assign(item,{rate:Number(value),formatted:Number(value).toFixed(2)+'%',effectiveDate:date,lastVerified:now.toISOString().slice(0,10),kind:'observation'});
 Object.assign(item,freshness(item,now));return true;
}
module.exports={validObservation,freshness,applyObservation};
