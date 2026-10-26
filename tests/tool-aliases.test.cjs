'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict');
const map=require('../data/tool-redirects.json');
const fixtures={usa:require('./fixtures/us-tools-inputs.json'),canada:require('./fixtures/canada-tools-inputs.json'),...require('./fixtures/country-tools-inputs.json')};
for(const[country,aliases]of Object.entries(map)){
 const file=country==='usa'?'us':country,C=require('../js/'+file+'-tools-catalog'),M=require('../js/'+file+'-tools-models');
 for(const[from,to]of Object.entries(aliases))test(country+'/'+from+' is genuinely equivalent to '+to,()=>{
  assert.notEqual(from,to);assert.equal(aliases[to],undefined,'No redirect chains');
  for(const source of[from,to]){
   const x=structuredClone(fixtures[country][source]);
   const a=M.calculate(from,C.validate(from,x)),b=M.calculate(to,C.validate(to,x));
   assert.deepEqual(a.values,b.values);assert.deepEqual(a.tables,b.tables);
  }
 });
}
