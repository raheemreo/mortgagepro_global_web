const { test } = require('node:test');
const assert = require('node:assert/strict');
const c = require('../js/us-blog-calculators.js');
const near = (actual, expected, tolerance = .005) => assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} != ${expected}`);

test('published 30-year and 15-year examples reproduce independent fixtures', () => {
  near(c.payment(371250, 7.32, 30), 2550.2299289647904);
  near(c.payment(371250, 6.68, 15), 3270.8352798120213);
  near(c.payment(371250, 6.82, 30), 2425.2202077515726);
});
test('zero-rate and fully paid purchase avoid divide by zero', () => {
  near(c.payment(360000, 0, 30), 1000);
  near(c.payment(0, 7.32, 30), 0);
});
test('invalid financial inputs are rejected rather than becoming NaN outputs', () => {
  for (const args of [[-1,7,30],[100000,-1,30],[100000,Infinity,30],[100000,7,0],[100000,7,30.5],[NaN,7,30]]) assert.throws(() => c.payment(...args));
  assert.throws(() => c.dti(0, 1000, 200));
  assert.throws(() => c.housing(100000, 110000, 7, 30, 1000, 1000, 0, 0));
});
test('published amortization rows are balances after payment', () => {
  const a = c.amortization(371250,7.32,30);
  assert.equal(a.months,360); assert.equal(a.crossover,248);
  for (const [month,balance,interest,principal] of [[1,370964.40,2264.625,285.604929],[60,350632.46,2141.352168,408.877760],[180,278162.44,1701.965278,848.264651],[300,127814.91,790.405876,1759.824053],[360,0,15.462084,2534.767845]]) {
    const row=a.rows[month-1];near(row.balance,balance);near(row.interest,interest);near(row.principal,principal);
  }
  near(a.totalInterest,546832.7744273245);
  near(a.rows.reduce((s,r)=>s+r.principal,0),371250);
});
test('extra principal saves months and adjusts the final payment', () => {
  const a=c.amortization(371250,7.32,30,200);
  assert.equal(a.months,286); near(a.totalInterest,412939.76836047316);
  assert.ok(a.rows.at(-1).payment<2750.23); assert.equal(a.rows.at(-1).balance,0);
  assert.equal(c.amortization(1200,0,1,1100).months,1);
});
test('published down payment rows include explicit scenario PMI', () => {
  for(const [pct,pmiRate,pi,pmi,total] of [[3,.93,2748.58,310.10,3058.68],[5,.8,2691.91,261.25,2953.16],[10,.45,2550.23,139.22,2689.45],[20,0,2266.87,0,2266.87]]) {
    const loan=412500*(1-pct/100), payment=c.payment(loan,7.32,30), premium=loan*pmiRate/1200;
    near(payment,pi);near(premium,pmi);near(payment+premium,total);
  }
});
const assumptions={income:100800,debts:500,down:41250,rate:7.32,years:30,tax:6000,insurance:1800,hoa:0,pmiRate:.5,front:28,back:36};
test('affordability includes tax, insurance, HOA and PMI in the same allowance', () => {
  const a=c.affordability(assumptions); const b=c.affordability({...assumptions,pmiRate:0});
  assert.ok(a.loan<b.loan);near(a.budget,2352);near(a.pi+a.pmi+650,2352);
  assert.ok(c.affordability({...assumptions,hoa:200}).price<a.price);
  assert.ok(c.affordability({...assumptions,debts:1500}).price<a.price);
});
test('affordability handles the discontinuity at exactly 20% down', () => {
  const a=c.affordability({...assumptions,down:60000,pmiRate:10});
  near(a.loan,240000);near(a.price,300000);near(a.pmi,0);
  assert.ok(a.pi+650<=a.budget);
  const b=c.affordability({...assumptions,down:200000});near(b.pmi,0);
});
test('exhausted budget has no approval-looking purchase price', () => {
  const a=c.affordability({...assumptions,debts:10000});assert.equal(a.fits,false);assert.equal(a.price,0);
  assert.throws(()=>c.affordability({...assumptions,income:0}));
});
test('DTI uses gross income, includes non-report debts, and has no qualification decision', () => {
  const a=c.dti(8400,2350,840);near(a.front,27.976190476);near(a.back,37.976190476);
  near(c.dti(8400,2350,640).back,35.595238095);
  assert.ok(c.dti(6000,2350,840).back>a.back);
  assert.equal('qualified' in a,false);
});
test('PITI and total housing keep MI and HOA separate', () => {
  const a=c.housing(412500,41250,7.32,30,6187.5,1740,139.21875,0);
  near(a.piti,3210.85492896479);near(a.total,3350.07367896479);
  const b=c.housing(412500,41250,7.32,30,6187.5,1740,139.21875,200);
  near(a.piti,b.piti);near(b.total-a.total,200);
});
test('FHA uses base-loan upfront MIP and labels the opening-balance approximation', () => {
  const a=c.fha(300000,3.5,true,6.5);
  near(a.base,289500);near(a.upfront,5066.25);near(a.loan,294566);near(a.cashUpfront,.25);near(a.monthlyMip,132.6875);near(a.annualRate,.55);
  near(c.fha(300000,3.5,false,6.5).loan,289500);
  assert.match(a.duration,/Loan term/);assert.match(c.fha(300000,10,true,6.5).duration,/11 years/);
});
test('FHA annual tiers distinguish 95% LTV and $726,200 premium threshold', () => {
  near(c.fha(300000,5,true,7).annualRate,.5);
  near(c.fha(1000000,3.5,true,7).annualRate,.75);
  near(c.fha(1000000,5,true,7).annualRate,.7);
  near(c.fha(726200/.95,5,true,7).annualRate,.5);
  near(c.fha((726200+1)/.95,5,true,7).annualRate,.7);
  assert.throws(()=>c.fha(300000,3,true,7));
});
test('VA first/subsequent use and 5/10% boundaries use fee on base loan', () => {
  const a=c.va(400000,0,false,false,true,7.32,30), b=c.va(400000,0,true,false,true,7.32,30);
  near(a.fee,8600);near(b.fee,13200);near(b.fee-a.fee,4600);near(a.loan,408600);near(a.pi,2806.7985157576);
  near(c.va(400000,5,true,false,true,7.32,30).fee,5700);
  near(c.va(400000,10,true,false,true,7.32,30).fee,4500);
  near(c.va(400000,4.999,true,false,true,7.32,30).feeRate,3.3);
  near(c.va(400000,9.999,true,false,true,7.32,30).feeRate,1.5);
});
test('VA exemption and cash fee affect financed principal without adding MI', () => {
  const a=c.va(400000,0,true,true,true,7.32,30);near(a.fee,0);near(a.loan,400000);
  const b=c.va(400000,0,false,false,false,7.32,30);near(b.cash,8600);near(b.loan,400000);near(b.pi,2747.7224823863);
});
