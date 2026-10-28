const {test}=require('node:test'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const {verify}=require('../scripts/verify_rate_publication.cjs');
const snapshot={version:2,generatedAt:'2026-10-27T11:00:00Z',rates:{example:{rate:2}}},script='window.MPG_RATE_SNAPSHOT = '+JSON.stringify(snapshot)+';';
const hash=crypto.createHash('sha256').update(script).digest('hex').slice(0,12);
function fetcher(overrides={}){const bodies={'/data/rates.json':JSON.stringify(snapshot),['/js/rate-snapshot.js?v='+hash]:script,'/':'<script src="/js/rate-snapshot.js?v='+hash+'"></script>',...overrides};return async url=>new Response(bodies[new URL(url).pathname+new URL(url).search]||'',{status:200});}
test('matching deployed snapshot and referenced asset pass',()=>verify(snapshot,script,fetcher()));
test('old deployed JSON fails even when the browser asset is current',()=>assert.rejects(verify(snapshot,script,fetcher({'/data/rates.json':JSON.stringify({...snapshot,generatedAt:'old'})})),/JSON does not match/));
test('changed values cannot hide behind matching generation time',()=>assert.rejects(verify(snapshot,script,fetcher({'/data/rates.json':JSON.stringify({...snapshot,rates:{}})})),/JSON does not match/));
test('old browser asset fails',()=>assert.rejects(verify(snapshot,script,fetcher({['/js/rate-snapshot.js?v='+hash]:'old'})),/browser snapshot/));
test('old homepage reference fails',()=>assert.rejects(verify(snapshot,script,fetcher({'/':'<script src="/js/rate-snapshot.js?v=old"></script>'})),/Homepage/));
test('HTTP failure cannot report successful publication',()=>assert.rejects(verify(snapshot,script,async()=>new Response('',{status:503})),/HTTP 503/));
