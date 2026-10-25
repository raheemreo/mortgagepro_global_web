/* Tool inputs stay in this tab. No financial input is stored or sent to a server. */
(function(){
'use strict';
const host=document.querySelector('[data-country-tool]');if(!host)return;
const id=host.dataset.countryTool,C=window.CountryToolCatalog,M=window.CountryMortgageTools,config=C.catalog.find(c=>c.id===id),form=host.querySelector('form'),summary=host.querySelector('[data-error]'),results=host.querySelector('[data-results]'),status=host.querySelector('[data-status]'),panel=host.querySelector('[data-result-panel]');
if(!config)return;
const format=(v,unit='money')=>v===null?'Not reached / not applicable':typeof v==='string'?v:new Intl.NumberFormat('en-US',{...(unit==='money'?{style:'currency',currency:C.currency}:{}),minimumFractionDigits:unit==='integer'?0:unit==='money'?2:2,maximumFractionDigits:unit==='integer'?0:2}).format(v)+(unit==='percent'?'%':'');
const node=(tag,text,className)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(className)n.className=className;return n;};

function render(){
 clear();
 for(const input of form.querySelectorAll('[aria-invalid]'))input.removeAttribute('aria-invalid');
 const values=Object.fromEntries(new FormData(form));
 try{
  const x=C.validate(id,values),r=M.calculate(id,x);
  const dl=node('dl',undefined,'tool-metrics');
  for(const metric of r.metrics){const box=node('div',undefined,'tool-metric');box.dataset.metric=metric.key;box.append(node('dt',metric.label),node('dd',format(metric.value,metric.unit)));dl.append(box);}
  results.append(dl);
  for(const text of r.notices||[])results.append(node('p',text,'tool-notice'));
  for(const t of r.tables||[]){
   const details=node('details');details.append(node('summary',t.title+` (${t.rows.length} rows)`));
   const wrap=node('div',undefined,'tool-table-scroll');wrap.tabIndex=0;wrap.setAttribute('role','region');wrap.setAttribute('aria-label',t.title);const table=node('table');table.append(node('caption',t.title));
   const head=node('thead'),tr=node('tr');for(const label of t.headers){const th=node('th',label);th.scope='col';tr.append(th);}head.append(tr);table.append(head);const body=node('tbody');for(const row of t.rows){const tr=node('tr');row.forEach((value,i)=>tr.append(node('td',format(value,t.units[i]))));body.append(tr);}table.append(body);wrap.append(table);details.append(wrap);
   if(t.title==='Full payment schedule'){
    const button=node('button','Download payment schedule (CSV)','tool-secondary');button.type='button';button.addEventListener('click',()=>{
     const csv=[t.headers.join(','),...t.rows.map(row=>row.map(v=>typeof v==='number'?v.toFixed(8):String(v).replaceAll(',',' ')).join(','))].join('\r\n');
     const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8;'})),a=node('a');a.href=url;a.download=C.country+'-'+id+'-schedule.csv';a.hidden=true;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
    });details.append(button);
   }
   results.append(details);
  }
  panel.hidden=false;status.textContent='Estimate calculated. Changing inputs will clear this result.';
 }catch(error){
  summary.textContent=error.message;summary.hidden=false;
  for(const field of config.fields){const input=form.elements.namedItem(field.key);if(input&&(!input.checkValidity()||String(input.value).trim()===''))input.setAttribute('aria-invalid','true');}
  status.textContent='Check the inputs, then press Calculate estimate.';
 }
}
function clear(message='Enter your figures, then press Calculate estimate.'){
 panel.hidden=true;results.replaceChildren();summary.hidden=true;summary.textContent='';status.textContent=message;
 for(const input of form.querySelectorAll('[aria-invalid]'))input.removeAttribute('aria-invalid');
}
form.querySelector('[type=submit]').hidden=false;
form.addEventListener('submit',event=>{
 event.preventDefault();render();
 if(!summary.hidden)summary.focus();else{
  results.focus({preventScroll:true});
  panel.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});
 }
});
function clearOnEdit(){clear('Inputs changed. Press Calculate estimate to see the new result.');}
form.addEventListener('input',clearOnEdit);form.addEventListener('change',clearOnEdit);
form.addEventListener('reset',()=>setTimeout(()=>clear('Inputs reset. Enter your figures, then press Calculate estimate.'),0));
clear();
})();
