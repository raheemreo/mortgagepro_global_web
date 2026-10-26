/* Google Privacy & messaging remains the CMP. Unknown/failed consent keeps ads paused.
 * https://developers.google.com/funding-choices/fc-api-docs
 * https://support.google.com/adsense/answer/7670312 */
(function(){
'use strict';
const googlefc=window.googlefc=window.googlefc||{};
googlefc.callbackQueue=googlefc.callbackQueue||[];
const ads=window.adsbygoogle=window.adsbygoogle||[];
ads.pauseAdRequests=1;
const eligible=document.querySelector('meta[name="mpg-ad-eligible"]')?.content!=='false';
let gdprApplies,providerReady=false,listening=false,autoOpened=false;
function status(text){const el=document.querySelector('[data-privacy-status]');if(el)el.textContent=text;}
function acceptState(data,success){
 ads.pauseAdRequests=1;
 if(!success||!data)return;
 gdprApplies=data.gdprApplies;
 const completed=data.cmpStatus==='loaded'&&['tcloaded','useractioncomplete'].includes(data.eventStatus);
 // Conservative storage/vendor gate. AdSense evaluates the actual TCF permissions.
 // Never fabricate granted signals or a TC string.
 const permitted=gdprApplies===false||(gdprApplies===true&&completed&&!!data.tcString&&data.purpose?.consents?.[1]===true&&data.vendor?.consents?.[755]===true);
 if(eligible&&permitted)ads.pauseAdRequests=0;
 status(permitted?'Google privacy choices are available. You can change them below.':'Advertising remains paused while the provider determines the applicable choices, or while the required permission is absent.');
 if(location.pathname==='/privacy-settings'&&!autoOpened&&providerReady&&typeof gdprApplies==='boolean'){autoOpened=true;openProvider();}
}
function connect(){providerReady=true;if(!listening&&typeof window.__tcfapi==='function'){listening=true;window.__tcfapi('addEventListener',2,acceptState);}}
googlefc.callbackQueue.push({CONSENT_API_READY:connect});
googlefc.callbackQueue.push({CONSENT_DATA_READY:connect});
function openProvider(){
 ads.pauseAdRequests=1;
 if(gdprApplies===false&&typeof googlefc.usstatesoptout?.openConfirmationDialog==='function'){
  googlefc.callbackQueue.push({INITIAL_US_STATES_OPT_OUT_DATA_READY:function(){googlefc.usstatesoptout.openConfirmationDialog(function(shown){if(!shown)status('No applicable provider dialog is available. Read the privacy guidance linked below.');});}});return true;
 }
 if(typeof googlefc.showRevocationMessage==='function'){
  googlefc.callbackQueue.push({CONSENT_API_READY:function(){googlefc.showRevocationMessage();}});return true;
 }
 return false;
}
window.MPGPrivacy={open:function(event){if(!providerReady)return true;if(openProvider()){event?.preventDefault();return false;}return true;},state:function(){return{providerReady,gdprApplies,adsPaused:ads.pauseAdRequests===1,adEligible:eligible};}};
})();
