/* Google-published messages handle advertising consent. No analytics/session replay loader. */
(function(){
'use strict';
window.googlefc=window.googlefc||{};
googlefc.callbackQueue=googlefc.callbackQueue||[];
let gdprApplies;
googlefc.callbackQueue.push({CONSENT_API_READY:function(){
 if(typeof window.__tcfapi==='function')window.__tcfapi('addEventListener',2,function(data,success){if(success&&data)gdprApplies=data.gdprApplies;});
}});
function fallback(){window.location.assign('/privacy-policy#privacy-controls');}
window.MPGPrivacy={open:function(event){
 const g=window.googlefc||{},us=g.usstatesoptout;
 if(gdprApplies!==true&&typeof us?.openConfirmationDialog==='function'){
  event?.preventDefault();us.openConfirmationDialog(function(shown){if(!shown)fallback();});return false;
 }
 if(typeof g.showRevocationMessage==='function'){
  event?.preventDefault();g.showRevocationMessage();return false;
 }
 // A real policy link remains usable before the provider API is available.
 return true;
}};
})();
