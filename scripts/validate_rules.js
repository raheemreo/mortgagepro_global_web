/* Metadata integrity checks. This is not a certification of statutory accuracy. */
'use strict';
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
let count=0;
for(const country of ['usa','canada','uk','australia','new-zealand','india','europe']){
 const old=JSON.parse(fs.readFileSync(path.join(root,'data/rules',country,'rules.json')));
 if(old.status!=='retired_reference'||old.verification_status==='verified'||old.rules)throw Error('Legacy layer must not assert current verified rules: '+country);
 if(!fs.existsSync(path.join(root,old.current_calculator_reference)))throw Error('Missing active reference: '+country);
 count++;
}
for(const country of ['us','canada','uk','australia','newzealand','india','europe']){
 const current=JSON.parse(fs.readFileSync(path.join(root,'data',country+'-tool-reference.json')));
 if(!/^\d{4}-\d{2}-\d{2}$/.test(current.reviewedOn||''))throw Error('Missing documented reference date: '+country);
}
console.log('PASS: '+count+' legacy reference layers retired; active metadata present. Source/legal review is a separate requirement.');
