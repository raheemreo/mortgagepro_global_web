'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict');
const C=require('../js/india-tools-catalog');
const aliases=require('../data/tool-redirects.json').india;
const {render}=require('../scripts/india-tool-directory.cjs');
test('India directory retains every distinct tool once and all existing navigation targets',()=>{
 const html=render(C,c=>'<a class="tc" href="/tools/india/'+c.id+'">'+c.title+'</a>',s=>s);
 const links=[...html.matchAll(/href="\/tools\/india\/([^"]+)"/g)].map(m=>m[1]);
 const expected=C.catalog.filter(c=>!aliases[c.id]).map(c=>c.id);
 assert.deepEqual([...links].sort(),expected.sort());
 assert.equal(new Set(links).size,links.length);
 assert.equal((html.match(/class="tc"/g)||[]).length,10);
 for(const id of Object.values(C.groupIDs))assert.ok(html.includes('id="'+id+'"'),id);
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
 assert.equal(new Set(ids).size,ids.length);
});
