'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const C=require('../js/us-tools-catalog'),M=require('../js/us-tools-models');
const run=(id,overrides={})=>M.calculate(id,C.validate(id,{...C.defaults(id),...overrides}));
const near=(a,b,tol=1e-7)=>assert.ok(Math.abs(a-b)<=tol,`${a} != ${b}`);
// Fixed numeric reference examples, hand-evaluated from the cited Dart formulas.
// The reference was inspected as source; these are not claimed to execute Flutter.
const references=[
 ['mortgage','pi',2194.9467738842436],['piti','total',2719.4467738842436],
 ['amortization','pi',2194.9467738842436],['prepayment','pi',2194.9467738842436],['extra-payments','pi',2194.9467738842436],
 ['term-comparison','interestSaved',252637.62088114023],
 ['dti','back',3220/8500*100],['affordability','price',354951.6595435621],['down-payment','downCash',84000],
 ['auto-loan','loan',32800],['refinance','old',2216.973533392378],['fha','upfront',7092.75],['va','fee',9030],['usda','fee',4200],['jumbo','loan',336000],
 ['arm','initial',2025.303485519316],['construction','buildInterest',14620],['piggyback','second',42000],['down-payment-assistance','cash',12600],
 ['pmi','monthly',0],['property-tax','annual',4494],['closing-costs','gross',7894],['hoa','total',2719.4467738842436],
 ['homeowner-insurance','annual',1710],['ho1','annual',1240],['ho3','annual',1710],['ho5','annual',2050],['ho6','annual',600],['hurricane','annual',2400],['wildfire','annual',1170],['flood','annual',1160],
 ['credit-score','rate',6.72],['debt-payoff','months',42],['heloc','capacity',175000],['home-equity','capacity',175000],['student-dti','housing',2719.4467738842436],
 ['rent-vs-buy','buyMonthly',2894.4467738842436],['moving','total',1901],['tax-deduction','interest',24000],['rental-yield','noi',23170],['cash-on-cash','cashflow',4200],['fix-flip','profit',48000],['exchange-1031','gain',530000]
];
for(const [id,key,expected] of references)test(`${id}: reference calculation`,()=>near(run(id,id==='tax-deduction'?{standard:16100,saltLimit:40400}:{}).values[key],expected,1e-6));
test('all 40 app calculator source paths are represented once, plus three amortization/term views',()=>{
 assert.equal(C.catalog.length,43);assert.equal(new Set(C.catalog.map(c=>c.source)).size,40);assert.equal(new Set(C.catalog.map(c=>c.id)).size,43);
 const manifest=JSON.parse(fs.readFileSync(__dirname+'/../docs/reviews/us-tools-source-manifest.json'));
 const tools=manifest.files.filter(f=>f.path.includes('/usa/tools/')).map(f=>f.path).sort();assert.deepEqual([...new Set(C.catalog.map(c=>c.source))].sort(),tools);
 for(const c of C.catalog){assert.ok(c.method.length>80);assert.ok(c.notes.length>=2);assert.ok(c.refs.length>=1);}
});
test('standard payment: independent textbook $100k 6% 30-year example and principal conservation',()=>{
 near(M.payment(100000,6,360),599.5505251527569);const rows=M.schedule(100000,6,360);assert.equal(rows.length,360);assert.equal(rows.at(-1).balance,0);near(rows.reduce((s,r)=>s+r.principal,0),100000,1e-6);near(rows.reduce((s,r)=>s+r.payment,0)-100000,rows.at(-1).totalInterest,1e-6);
});
test('zero rate, all-cash purchases and partial final payment remain finite',()=>{
 assert.equal(M.payment(12000,0,12),1000);assert.equal(run('mortgage',{down:100}).values.pi,0);
 const r=M.schedule(12000,0,12,500);assert.equal(r.length,8);assert.equal(r.at(-1).payment,1500);
 const r2=M.schedule(10000,0,12,500);assert.equal(r2.length,8);near(r2.at(-1).payment,666.6666666666661,1e-6);near(r2.at(-1).totalInterest,0);
});
test('extra-payment interest savings use full schedules and stop the final payment at balance',()=>{
 const base=run('amortization'),r=run('extra-payments',{extra:200});assert.ok(r.values.months<base.values.months);assert.ok(r.values.saved>0);assert.equal(r.schedule.at(-1).balance,0);near(r.schedule.reduce((s,v)=>s+v.principal,0),336000,1e-6);assert.ok(r.schedule.at(-1).payment<=r.values.pi+200+1e-6);
});
test('affordability debt constraint binds and includes PMI inside the selected budget',()=>{
 const r=run('affordability',{income:120000,debts:3000,down:5,front:28,back:36});near(r.values.housing,600);near(r.values.back,36);assert.ok(r.values.pmi>0);near(r.values.pi+r.values.pmi+525,r.values.housing);
 assert.equal(run('affordability',{debts:10000}).values.loan,0);assert.throws(()=>run('affordability',{down:100}));
});
test('DTI distinguishes front/back and applies an explicit share to other income',()=>{
 const r=run('dti',{income:5000,coIncome:1000,otherIncome:2000,incomeFactor:75,pi:1500,taxMonthly:200,insMonthly:100,pmiMonthly:50,hoa:150,debts:500});near(r.values.qualifyingIncome,7500);near(r.values.front,2000/7500*100);near(r.values.back,2500/7500*100);
 assert.throws(()=>run('dti',{income:0}));
});
test('FHA uses base LTV, base-loan MIP, high-balance tiers and cash/financed fee choice',()=>{
 const r=run('fha',{price:400000,down:10,years:15});near(r.values.base,360000);near(r.values.mipRate,.15);near(r.values.mip,45);assert.equal(r.values.mipYears,11);
 assert.equal(run('fha',{price:1000000,down:3.5,years:30}).values.mipRate,.75);
 const cash=run('fha',{finance:'no'});assert.equal(cash.values.loan,cash.values.base);assert.ok(run('fha').values.loan>cash.values.loan);
});
test('VA current common purchase tiers cover first/reuse, 5%/10% boundaries and exemption',()=>{
 for(const [use,down,fee]of [['first',0,2.15],['subsequent',0,3.3],['first',5,1.5],['subsequent',10,1.25],['exempt',0,0]])near(run('va',{use,down}).values.feeRate,fee);
 assert.equal(run('va',{finance:'no'}).values.loan,420000);assert.equal(run('va',{use:'exempt'}).values.fee,0);
});
test('USDA annual fee decreases with scheduled average balance; upfront fee can be paid in cash',()=>{
 const r=run('usda');assert.equal(r.values.loan,424200);assert.ok(r.values.annualFee<424200*.0035/12);assert.ok(r.values.annualFee>0);
 assert.equal(run('usda',{finance:'no'}).values.loan,420000);assert.equal(run('usda',{annualFee:0}).values.annualFee,0);
});
test('ARM caps constrain the first reset and zero interest is allowed',()=>{
 const r=run('arm',{rate:4,adjusted:20,initialCap:2,lifeCap:1});assert.equal(r.values.resetRate,5);assert.ok(r.values.adjusted>r.values.initial);
 assert.equal(run('arm',{rate:0,adjusted:0}).values.initial,336000/360);
});
test('PMI uses LTV and credit bands, and no PMI at 20% down',()=>{
 assert.equal(run('pmi',{down:5,score:760}).values.annualRate,.55);assert.equal(run('pmi',{down:10,score:720}).values.annualRate,.58);assert.equal(run('pmi',{down:15,score:650}).values.annualRate,.65);assert.equal(run('pmi',{down:20,score:650}).values.months,0);
 assert.equal(run('pmi',{down:5,score:760,rate:0}).values.months,57);
});
test('refinancing deducts closing costs even when financed and reports no simple break-even with no savings',()=>{
 const r=run('refinance',{finance:'yes'});near(r.values.netSaving,r.values.oldInterest-r.values.newInterest-6000);assert.equal(run('refinance',{rate:20,years:25}).values.breakEven,null);
});
test('budget edge cases: no savings contribution, exemptions and credits exceeding costs',()=>{
 assert.equal(run('down-payment',{saved:0,saving:0}).values.months,null);assert.equal(run('down-payment',{saved:100000,saving:0}).values.months,0);
 assert.equal(run('property-tax',{exemption:1000000}).values.annual,0);
 const r=run('closing-costs',{credit:100000});assert.equal(r.values.costs,0);assert.equal(r.values.cash,84000);
});
test('debt planner reports unfinished non-amortizing debt rather than a false 600-month payoff',()=>{
 const r=run('debt-payoff',{balance1:100000,rate1:30,minimum1:1,balance2:0,balance3:0,extra:0});assert.equal(r.values.months,null);assert.ok(r.values.remaining>100000);assert.equal(r.values.saved,null);
 assert.throws(()=>run('debt-payoff',{minimum1:0}));assert.equal(run('debt-payoff',{balance1:0,balance2:0,balance3:0}).values.months,0);
});
test('HELOC caps actual draw and distinguishes interest-only from amortizing repayment',()=>{
 const r=run('heloc',{loan:300000});assert.equal(r.values.loan,175000);near(r.values.drawPayment,1312.5);assert.ok(r.values.pi>r.values.drawPayment);assert.ok(r.notices.length);
 const e=run('home-equity',{loan:300000});assert.equal(e.values.loan,300000);assert.ok(e.notices.length);
});
test('rent/buy stops repayment at loan maturity and uses a consistent single wealth series',()=>{
 const r=run('rent-vs-buy',{rate:0,years:1,hold:2,price:12000,down:0,tax:0,insurance:0,hoa:0,maintenance:0,buyCosts:0,sellCosts:0,appreciation:0,rent:0,rentersInsurance:0,rentGrowth:0,investment:0});assert.equal(r.values.buyWealth,12000);assert.equal(r.values.rentWealth,12000);assert.equal(r.values.difference,0);
 const negative=run('rent-vs-buy',{rent:100000});assert.ok(negative.values.rentWealth<0);
});
test('investment ratios preserve losses and distinguish undefined cash or debt denominators',()=>{
 const r=run('rental-yield',{down:100});assert.equal(r.values.dscr,null);assert.ok(r.values.cap>0);
 assert.equal(run('rental-yield',{down:0}).values.coc,null);assert.ok(run('fix-flip',{arv:200000}).values.profit<0);assert.ok(run('cash-on-cash',{expenses:100000}).values.return<0);
});
test('1031 scenario caps recognized gain and computes basis after deferred gain',()=>{
 const full=run('exchange-1031');assert.equal(full.values.recognized,0);assert.equal(full.values.newBasis,420000);
 const partial=run('exchange-1031',{replacement:100000});assert.equal(partial.values.recognized,530000);assert.equal(partial.values.deferred,0);assert.equal(partial.values.newBasis,100000);
 assert.throws(()=>run('exchange-1031',{depreciation:500000}));
});
test('tax deduction requires tax-year inputs; benefit compares itemizing with standard deduction',()=>{
 assert.throws(()=>run('tax-deduction'));
 const r=run('tax-deduction',{standard:16100,saltLimit:40400});assert.equal(r.values.itemized,38000);near(r.values.saving,4818);
 assert.equal(run('tax-deduction',{standard:100000,saltLimit:10000}).values.saving,0);
});
test('every numeric field rejects blank, nonfinite, out-of-range or fractional integer inputs',()=>{
 for(const c of C.catalog)for(const f of c.fields.filter(f=>f.type==='number')){
  const base={...C.defaults(c.id),...(c.id==='tax-deduction'?{standard:16100,saltLimit:40400}:{})};
  for(const value of ['',null,Infinity,NaN,f.max+1,f.min-1,...(f.step===1?[f.min+.5]:[])])assert.throws(()=>C.validate(c.id,{...base,[f.key]:value}),`${c.id} ${f.key} ${value}`);
 }
});
test('all default outputs and tables are finite and every model handles zero interest',()=>{
 for(const c of C.catalog){const input={...(c.id==='tax-deduction'?{standard:16100,saltLimit:40400}:{}),...Object.fromEntries(c.fields.filter(f=>f.key==='rate').map(f=>[f.key,0]))};const r=run(c.id,input);for(const metric of r.metrics)assert.ok(metric.value===null||Number.isFinite(metric.value),c.id);for(const t of r.tables)for(const row of t.rows)for(const v of row)assert.ok(v===null||typeof v==='string'||Number.isFinite(v),c.id);}
});
test('every generated tool canonical and directory URL is deployable through the edge worker',async()=>{
 const context={module:{exports:{}},URL,Request,Response,Headers};vm.runInNewContext(fs.readFileSync(__dirname+'/../_worker.js','utf8').replace('export default','module.exports='),context);const worker=context.module.exports;
 for(const c of C.catalog){const pathname='/tools/usa/'+c.id;let requested;const r=await worker.fetch(new Request('https://mortgageproglobal.com'+pathname),{ASSETS:{fetch:async req=>{requested=new URL(req.url).pathname;return new Response(fs.readFileSync(__dirname+'/..'+requested,'utf8'),{headers:{'Content-Type':'text/html'}});}}});assert.equal(r.status,200);assert.equal(requested,pathname+'.html');const html=await r.text();assert.ok(html.includes(`data-us-tool="${c.id}"`));assert.ok(html.includes(`href="https://mortgageproglobal.com${pathname}"`));}
});
