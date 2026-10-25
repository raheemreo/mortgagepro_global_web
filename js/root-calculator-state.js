/* Edited inputs invalidate the old result and any export snapshot. */
(function(){'use strict';
const entries=[['us','us','_usResultBlob'],['canada','canada','_canadaResultBlob'],['uk','uk','_ukResultBlob'],['au','au','_auResultBlob'],['nz','nz','_nzResultBlob'],['india','india','_indiaResultBlob'],['eu','eu','_euResultBlob']];
function init(){document.querySelectorAll('main table').forEach(table=>{if(table.parentElement.classList.contains('mpg-table-scroll'))return;const wrap=document.createElement('div');wrap.className='mpg-table-scroll';wrap.tabIndex=0;wrap.setAttribute('role','region');wrap.setAttribute('aria-label','Scrollable data table');table.before(wrap);wrap.append(table);});for(const[formKey,resultKey,cache]of entries){const form=document.getElementById(formKey+'-calc-form');if(!form)continue;const clear=()=>{document.getElementById('toast')?.classList.remove('show');document.getElementById(resultKey+'-results')?.classList.remove('visible');window[cache]=null;};form.addEventListener('input',clear);form.addEventListener('change',clear);}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
