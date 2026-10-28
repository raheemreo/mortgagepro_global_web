/* Check deployed static assets, not /api/rates, which can enrich observations. */
'use strict';
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const {isDeepStrictEqual}=require('node:util');
async function verify(snapshot,script,fetcher=fetch){
 const hash=crypto.createHash('sha256').update(script).digest('hex').slice(0,12);
 const base='https://mortgageproglobal.com';
 async function read(route){const r=await fetcher(base+route,{cache:'no-store',signal:AbortSignal.timeout(15000)});if(!r.ok)throw Error(route+': HTTP '+r.status);return r.text();}
 const [data,asset,home]=await Promise.all([read('/data/rates.json'),read('/js/rate-snapshot.js?v='+hash),read('/')]);
 if(!isDeepStrictEqual(JSON.parse(data),snapshot))throw Error('Deployed rate JSON does not match the committed snapshot');
 if(asset!==script)throw Error('Deployed browser snapshot does not match the committed asset');
 if(!home.includes('/js/rate-snapshot.js?v='+hash))throw Error('Homepage still references a different snapshot version');
}
async function main(){
 const root=path.resolve(__dirname,'..'),snapshot=JSON.parse(fs.readFileSync(path.join(root,'data/rates.json'),'utf8')),script=fs.readFileSync(path.join(root,'js/rate-snapshot.js'),'utf8');
 for(let attempt=1;attempt<=20;attempt++){
  try{await verify(snapshot,script);console.log('Production rate JSON, browser asset and homepage reference match the committed snapshot.');return;}
  catch(e){console.error('Publication check '+attempt+'/20: '+e.message);if(attempt===20)throw Error('Production publication unconfirmed. Check Cloudflare production branch, build triggers and deployment logs; a successful git push is not a deployment.');await new Promise(r=>setTimeout(r,30000));}
 }
}
if(require.main===module)main().catch(e=>{console.error(e.message);process.exitCode=1;});
module.exports={verify};
