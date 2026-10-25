/* US planning models, ported from mortgagepro_global lib/features/usa at
 * 9f79ea943e27b6d8b0c1ca411c37fb4cae077f72. See docs/reviews/us-tools-port.md.
 * Pure functions: no network, persistence, advertising or analytics. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.USMortgageTools=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';
const max=Math.max,min=Math.min,pow=Math.pow;
function payment(principal,rate,months){
 if(![principal,rate,months].every(Number.isFinite)||principal<0||rate<0||months<1||!Number.isInteger(months))throw new Error('Enter a non-negative balance and rate, and a whole number of payment months.');
 if(!principal)return 0;if(!rate)return principal/months;
 const r=rate/1200;return principal*r/(-Math.expm1(-months*Math.log1p(r)));
}
function schedule(principal,rate,months,extra=0){
 const p=payment(principal,rate,months);if(!Number.isFinite(extra)||extra<0)throw new Error('Extra payment must be zero or greater.');
 const rows=[];let balance=principal,totalInterest=0;
 for(let month=1;month<=months&&balance>1e-7;month++){
  const interest=balance*rate/1200,principalPaid=min(balance,p+extra-interest);
  balance=max(0,balance-principalPaid);if(balance<1e-7)balance=0;totalInterest+=interest;
  rows.push({month,payment:interest+principalPaid,principal:principalPaid,interest,balance,totalInterest});
 }
 return rows;
}
function pv(monthly,rate,months){return monthly/payment(1,rate,months);}
function result(entries,tables=[],notices=[]){return {values:Object.fromEntries(entries.map(e=>[e[0],e[2]])),metrics:entries.map(([key,label,value,unit='money'])=>({key,label,value,unit})),tables,notices};}
const m=(key,label,value,unit)=>[key,label,value,unit];
const table=(title,headers,rows,units)=>({title,headers,rows,units});
const mortgage=x=>x.price*(1-x.down/100);
const loanMetrics=(loan,rate,years)=>{const pi=payment(loan,rate,years*12);return [m('loan','Loan amount',loan),m('pi','Monthly principal & interest',pi),m('interest','Total scheduled interest',max(0,pi*years*12-loan))];};
const pmiTable={95:{low:1.25,mid:.78,high:.55},90:{low:.85,mid:.58,high:.38},85:{low:.65,mid:.40,high:.24}};
function pmiRate(down,score){const ltv=100-down;if(ltv<=80)return 0;return pmiTable[ltv>90?95:ltv>85?90:85][score<680?'low':score>=760?'high':'mid'];}
function monthsToLtv(loan,price,rate,years,threshold=.8){if(loan<=price*threshold)return 0;const rows=schedule(loan,rate,years*12);return (rows.find(r=>r.balance<=price*threshold)||rows.at(-1))?.month||0;}
function annualSummary(rows){const years=[];for(const r of rows){const y=Math.floor((r.month-1)/12);if(!years[y])years[y]=[y+1,0,0,0];years[y][1]+=r.principal;years[y][2]+=r.interest;years[y][3]=r.balance;}return table('Annual repayment summary',['Year','Principal','Interest','Ending balance'],years,['number','money','money','money']);}
function payoff(debts,extra,strategy){
 const ds=debts.filter(d=>d.balance>0).map(d=>({...d}));ds.sort(strategy==='snowball'?(a,b)=>a.balance-b.balance:(a,b)=>b.rate-a.rate);
 let interest=0,months=0;const rows=[];
 while(ds.some(d=>d.balance>1e-7)&&months<600){months++;let available=extra+ds.filter(d=>d.balance>1e-7).reduce((s,d)=>s+d.minimum,0);
  for(const d of ds){if(d.balance<=1e-7)continue;const i=d.balance*d.rate/1200;interest+=i;const paid=min(d.minimum,d.balance+i);d.balance+=i-paid;available-=paid;}
  for(const d of ds){const paid=min(max(0,available),d.balance);d.balance-=paid;available-=paid;}
  rows.push([months,ds.reduce((s,d)=>s+d.balance,0),interest]);
 }
 return {months:ds.some(d=>d.balance>1e-7)?null:months,interest,remaining:ds.reduce((s,d)=>s+d.balance,0),rows};
}
function calculate(id,x){
 switch(id){
 case 'auto-loan':{
  const tax=max(0,x.price-x.rebate)*x.tax/100,fees=x.fees+x.registration,net=x.price-x.downCash-x.trade-x.rebate,loan=net+(x.finance==='yes'?tax+fees:0);
  if(net<0)throw new Error('Down payment, trade-in and rebate together cannot exceed the vehicle price.');
  const pi=payment(loan,x.rate,x.months),interest=pi*x.months-loan;
  return result([m('loan','Amount financed',loan),m('payment','Monthly loan payment',pi),m('tax','Modeled sales tax',tax),m('fees','Dealer and registration fees',fees),m('interest','Total scheduled interest',interest),m('allIn','Total paid including trade-in value',pi*x.months+x.downCash+x.trade+(x.finance==='yes'?0:tax+fees))],[annualSummary(schedule(loan,x.rate,x.months))],['Tax assumes price minus rebate is taxable and does not deduct trade-in value. State tax treatment may differ. Trade-in is assumed to be net of any outstanding vehicle loan.']);}
 case 'refinance':{
  const old=payment(x.balance,x.oldRate,x.oldYears*12),loan=x.balance+(x.finance==='yes'?x.costs:0),next=payment(loan,x.rate,x.years*12),saving=old-next,oldInterest=old*x.oldYears*12-x.balance,newInterest=next*x.years*12-loan,netSaving=oldInterest-newInterest-x.costs;
  return result([m('old','Current scheduled P&I',old),m('loan','New financed balance',loan),m('new','New monthly P&I',next),m('saving','Monthly P&I reduction',saving),m('breakEven','Simple fee / payment-reduction months',saving>0?Math.ceil(x.costs/saving):null,'integer'),m('oldInterest','Remaining interest on current schedule',oldInterest),m('newInterest','Interest on new schedule',newInterest),m('netSaving','Interest reduction after all closing costs',netSaving)],[annualSummary(schedule(loan,x.rate,x.years*12))],['Simple payment break-even is not an economic break-even, especially when fees are financed or the term changes. Net interest savings subtract closing costs even when financed. Taxes, insurance, PMI and cash-out are excluded.']);}
 case 'mortgage':return result(loanMetrics(mortgage(x),x.rate,x.years));
 case 'piti':{
  const loan=mortgage(x),pi=payment(loan,x.rate,x.years*12),tax=x.price*x.tax/1200,insurance=x.insurance/12,pmi=x.down<20?loan*x.pmi/1200:0;
  return result([m('total','Total monthly housing budget',pi+tax+insurance+pmi+x.hoa),m('piti','PITI (before PMI and HOA)',pi+tax+insurance),m('pi','Principal & interest',pi),m('tax','Monthly property tax',tax),m('insurance','Monthly homeowner insurance',insurance),m('pmi','Monthly PMI estimate',pmi),m('hoa','Monthly HOA dues',x.hoa),m('housingRatio','Housing / gross income',100*(pi+tax+insurance+pmi+x.hoa)/x.income,'percent')]);}
 case 'amortization':case 'extra-payments':case 'prepayment':{
  const loan=x.price-x.downCash,rows=schedule(loan,x.rate,x.years*12,x.extra),base=schedule(loan,x.rate,x.years*12),interest=rows.at(-1)?.totalInterest||0;
  const r=result([m('pi','Scheduled monthly P&I',payment(loan,x.rate,x.years*12)),m('extra','Extra principal each month',x.extra),m('months','Months to repay',rows.length,'integer'),m('interest','Total interest with extra',interest),m('saved','Interest saved',max(0,(base.at(-1)?.totalInterest||0)-interest)),m('monthsSaved','Months saved',base.length-rows.length,'integer')],[annualSummary(rows),table('Monthly amortization schedule',['Month','Payment','Principal','Interest','Balance'],rows.map(r=>[r.month,r.payment,r.principal,r.interest,r.balance]),['integer','money','money','money','money'])]);r.schedule=rows;return r;}
 case 'term-comparison':{
  const loan=mortgage(x),rows=[10,15,20,30].map(y=>[y,payment(loan,x.rate,y*12),payment(loan,x.rate,y*12)*y*12-loan]);
  return result([m('loan','Loan amount',loan),m('monthlyDifference','30-year to 15-year payment increase',rows[1][1]-rows[3][1]),m('interestSaved','Interest saved with 15 years',rows[3][2]-rows[1][2])],[table('Same rate, different terms',['Years','Monthly P&I','Total interest'],rows,['integer','money','money'])]);}
 case 'dti':{
  const income=x.income+x.coIncome+x.otherIncome*x.incomeFactor/100,housing=x.pi+x.taxMonthly+x.insMonthly+x.pmiMonthly+x.hoa;
  if(income<=0)throw new Error('Combined qualifying monthly income must be greater than zero.');
  return result([m('qualifyingIncome','Modeled gross monthly income',income),m('housing','Monthly housing obligations',housing),m('otherDebts','Other monthly debt payments',x.debts),m('front','Front-end housing ratio',housing/income*100,'percent'),m('back','Back-end debt-to-income ratio',(housing+x.debts)/income*100,'percent')]);}
 case 'affordability':{
  const income=x.income/12,pmiFactor=x.down<20?x.pmi/1200:0;
  // Web correction: honor BOTH entered housing/debt budgets and reserve PMI inside the budget.
  const housing=max(0,min(income*x.front/100,income*x.back/100-x.debts)),available=max(0,housing-x.taxIns),loan=available/(payment(1,x.rate,x.years*12)+pmiFactor),price=loan/(1-x.down/100),pi=payment(loan,x.rate,x.years*12),pmi=loan*pmiFactor;
  return result([m('price','Modeled maximum purchase price',price),m('loan','Modeled loan budget',loan),m('downCash','Down payment needed',price*x.down/100),m('housing','Monthly housing budget',housing),m('pi','Monthly principal & interest',pi),m('pmi','Monthly PMI estimate',pmi),m('front','Resulting housing ratio',(pi+pmi+x.taxIns)/income*100,'percent'),m('back','Resulting total DTI',(pi+pmi+x.taxIns+x.debts)/income*100,'percent')],[],housing<=x.taxIns?['Entered taxes and insurance consume the housing budget. No loan payment fits these assumptions.']:[]);}
 case 'down-payment':{
  const rows=[3,5,10,20].map(d=>{const loan=x.price*(1-d/100),pmi=d<20?loan*(d<5?.0085:d<10?.0065:.005)/12:0,needed=max(0,x.price*d/100-x.saved);return [d,x.price*d/100,payment(loan,x.rate,360),pmi,needed===0?0:x.saving>0?Math.ceil(needed/x.saving):null];});
  const cash=x.price*x.down/100,needed=max(0,cash-x.saved);
  return result([m('downCash','Selected down payment',cash),m('loan','Loan amount',mortgage(x)),m('needed','Additional savings needed',needed),m('months','Months to selected savings goal',needed===0?0:x.saving>0?Math.ceil(needed/x.saving):null,'integer')],[table('Down payment scenarios (30 years)',['Down %','Cash down','Monthly P&I','PMI estimate / month','Months to save'],rows,['percent','money','money','money','integer'])],needed>0&&x.saving===0?['The savings goal cannot be reached with a zero monthly contribution. Closing costs and reserves are additional.']:[]);}
 case 'fha':{
  const base=mortgage(x),upfront=base*.0175,loan=base+(x.finance==='yes'?upfront:0),ltv=100-x.down;
  const annual=x.years>15?(base<=726200?(ltv>95?.55:.50):(ltv>95?.75:.70)):(base<=726200?(ltv>90?.40:.15):(ltv>90?.65:ltv>78?.40:.15));
  const pi=payment(loan,x.rate,x.years*12),mip=base*annual/1200;
  return result([m('base','Base loan before upfront MIP',base),m('upfront','Upfront MIP (1.75%)',upfront),m('loan','Financed loan amount',loan),m('pi','Monthly P&I',pi),m('mipRate','Annual MIP rate',annual,'percent'),m('mip','Initial monthly MIP estimate',mip),m('total','Initial monthly housing estimate',pi+mip+x.insurance/12+x.annualTax/12),m('mipYears','MIP duration (years)',min(x.years,ltv<=90?11:x.years),'integer')],[],['MIP is an initial estimate on the base balance; servicing premiums change with scheduled balance. County limits, credit, property and lender requirements must be checked separately.']);}
 case 'va':{
  const base=mortgage(x),feeRate=x.use==='exempt'?0:x.down>=10?1.25:x.down>=5?1.5:x.use==='subsequent'?3.3:2.15,fee=base*feeRate/100,loan=base+(x.finance==='yes'?fee:0),pi=payment(loan,x.rate,x.years*12);
  return result([m('base','Base loan amount',base),m('feeRate','Funding fee rate',feeRate,'percent'),m('fee','VA funding fee',fee),m('loan','Financed loan',loan),m('pi','Monthly P&I',pi),m('total','Monthly housing estimate',pi+x.annualTax/12+x.insurance/12),m('cashFee','Funding fee paid at closing',x.finance==='yes'?0:fee)]);}
 case 'usda':{
  const fee=x.price*x.upfront/100,loan=x.price+(x.finance==='yes'?fee:0),pi=payment(loan,x.rate,360),rows=schedule(loan,x.rate,360);
  let beginning=loan,average=0;for(const row of rows.slice(0,12)){average+=beginning;beginning=row.balance;}average/=12;
  const monthlyFee=average*x.annualFee/1200;
  return result([m('fee','Upfront guarantee fee',fee),m('loan','Financed loan amount',loan),m('pi','Monthly P&I',pi),m('annualFee','First-year annual fee estimate / month',monthlyFee),m('total','First-year monthly housing estimate',pi+monthlyFee+x.annualTax/12+x.insurance/12)],[],['Annual fee uses average scheduled beginning-of-month unpaid principal in year one; lender billing and rounding may differ. Rural address, household income and program eligibility are not evaluated.']);}
 case 'jumbo':{
  const loan=mortgage(x),pi=payment(loan,x.rate,x.years*12),pmi=x.down<20?loan*x.pmi/1200:0,total=pi+pmi+x.annualTax/12+x.insurance/12;
  return result([m('loan','Loan amount',loan),m('aboveLimit','Amount above entered local loan limit',max(0,loan-x.limit)),m('pi','Monthly P&I',pi),m('pmi','Monthly PMI assumption',pmi),m('total','Monthly housing estimate',total),m('housingRatio','Housing / gross monthly income',total/(x.income/12)*100,'percent')]);}
 case 'arm':{
  const loan=mortgage(x),fixedMonths=x.fixedYears*12,pi=payment(loan,x.rate,360),s=schedule(loan,x.rate,360),balance=s[fixedMonths-1]?.balance||0,remaining=360-fixedMonths;
  const low=max(0,x.rate-x.initialCap),high=min(x.rate+x.initialCap,x.rate+x.lifeCap),resetRate=max(low,min(x.adjusted,high)),adjusted=payment(balance,resetRate,remaining),worst=payment(balance,x.rate+x.lifeCap,remaining);
  return result([m('initial','Initial monthly P&I',pi),m('balance','Balance at first reset',balance),m('resetRate','First-reset rate after initial/lifetime caps',resetRate,'percent'),m('adjusted','First-reset monthly P&I',adjusted),m('jump','Monthly payment change',adjusted-pi),m('worst','Lifetime-cap stress payment at reset balance',worst)],[],['One-reset scenario. The stress payment is a comparison, not a full future reset schedule. Actual index, margin, floor, periodic caps and reset frequency come from the loan note.']);}
 case 'construction':{
  const contingency=x.build*x.contingency/100,project=x.land+x.build+contingency,loan=project*(1-x.down/100),io=loan*.5*x.rate/1200;
  return result([m('project','Total project budget',project),m('contingency','Construction contingency',contingency),m('downCash','Cash down',project*x.down/100),m('loan','Construction loan',loan),m('interestOnly','Average interest-only payment (50% drawn)',io),m('buildInterest','Estimated construction interest',io*x.buildMonths),m('permanent','Permanent monthly P&I (30 years)',payment(loan,x.permRate,360))],[table('Draw balance sensitivity',['Drawn %','Monthly interest'],[25,50,75,100].map(d=>[d,loan*d/100*x.rate/1200]),['percent','money'])]);}
 case 'piggyback':{
  const first=x.price*.8,second=x.price*(.2-x.down/100),one=payment(first,x.rate,360),two=payment(second,x.secondRate,120),single=mortgage(x),pmi=single*pmiRate(x.down,x.score)/1200,months=monthsToLtv(single,x.price,x.rate,30),singlePI=payment(single,x.rate,360);
  const cost10=singlePI*120+pmi*min(months,120)-(one+two)*120;
  return result([m('first','First mortgage (80%)',first),m('second','Second mortgage',second),m('firstPayment','First mortgage payment (30 years)',one),m('secondPayment','Second mortgage payment (10 years)',two),m('combined','Combined monthly P&I',one+two),m('single','Single-loan initial P&I plus PMI',singlePI+pmi),m('difference','Single-loan minus piggyback cash payments, first 10 years',cost10)],[],['Cash payment comparison excludes different remaining loan balances, taxes, closing costs and tax effects. PMI is assumed to end at the modeled 80% balance date, subject to servicer approval.']);}
 case 'pmi':{
  const loan=mortgage(x),annual=pmiRate(x.down,x.score),monthly=loan*annual/1200,months=monthsToLtv(loan,x.price,x.rate,x.years);
  return result([m('ltv','Original loan-to-value',100-x.down,'percent'),m('annualRate','Annual PMI model rate',annual,'percent'),m('monthly','Estimated monthly PMI',monthly),m('equity','Principal reduction to 80% original value',max(0,loan-x.price*.8)),m('months','Modeled months to 80% balance',months,'integer'),m('paid','PMI paid through modeled date',monthly*months)],[],['The app rate table is an illustrative estimate, not an insurer quote. Reaching 80% original value can support a cancellation request; it is not automatic termination. Contact your servicer for conditions.']);}
 case 'property-tax':{
  const taxable=max(0,x.value-x.exemption),annual=Math.round(taxable*x.tax/100),full=Math.round(x.value*x.tax/100);
  return result([m('taxable','Taxable assessed value',taxable),m('annual','Estimated annual property tax',annual),m('monthly','Monthly tax budget (annual / 12)',annual/12),m('saved','Annual exemption effect',full-annual)],[table('Assessment-growth scenario',['Year','Annual tax'],[1,2,3,4,5].map(y=>[y,Math.round(max(0,x.value*pow(1+x.growth/100,y)-x.exemption)*x.tax/100)]),['integer','money'])]);}
 case 'closing-costs':{
  const loan=mortgage(x),orig=Math.round(loan*x.origination/100),points=Math.round(loan*x.points/100),owner=Math.round(x.price*.003),lender=Math.round(loan*.0018),transfer=Math.round(x.price*x.transfer/100),interest=Math.round(loan*x.rate/100/365*x.days),escrow=Math.round(x.price*x.tax/1200*x.escrowMonths);
  const gross=orig+points+630+owner+lender+1000+transfer+200+interest+x.insurance+escrow,credit=min(x.credit,gross),net=gross-credit;
  return result([m('gross','Costs before seller credit',gross),m('credit','Seller credit applied to costs',credit),m('costs','Net closing cost budget',net),m('downCash','Down payment',x.price*x.down/100),m('cash','Estimated cash to close',x.price*x.down/100+net)],[table('Closing budget breakdown',['Item','Amount'],[['Origination',orig],['Points',points],['Appraisal and credit report',630],['Owner title',owner],['Lender title',lender],['Settlement',1000],['Transfer tax',transfer],['Recording',200],['Prepaid interest',interest],['Insurance prepaid',x.insurance],['Tax escrow',escrow],['Seller credit',-credit]],['text','money'])]);}
 case 'hoa':{
  const loan=mortgage(x),pi=payment(loan,x.rate,360),tax=x.price*x.tax/1200,ins=x.insurance/12,base=pi+tax+ins,total=base+x.hoa,budget=x.income*x.back/100-x.debts,fac=(1-x.down/100)*payment(1,x.rate,360)+x.tax/1200,without=max(0,(budget-ins)/fac),withHoa=max(0,(budget-ins-x.hoa)/fac);
  return result([m('without','Monthly housing before HOA',base),m('total','Monthly housing including HOA',total),m('dtiWithout','DTI before HOA',(base+x.debts)/x.income*100,'percent'),m('dti','DTI including HOA',(total+x.debts)/x.income*100,'percent'),m('priceLoss','Modeled purchase-budget reduction',without-withHoa)],[],['This HOA comparison excludes PMI and special assessments. Add those to your housing budget when applicable.']);}
 case 'credit-score':{
  const bands=[[760,6.48],[720,6.72],[700,6.96],[680,7.14],[660,7.38],[640,7.74],[620,8.22]],rate=(bands.find(b=>x.score>=b[0])||bands.at(-1))[1]+x.shift,base=6.48+x.shift;
  if(base<0)throw new Error('The rate adjustment makes an example rate negative.');const pi=payment(x.loan,rate,360),best=payment(x.loan,base,360);
  return result([m('rate','Selected illustrative rate',rate,'percent'),m('pi','Monthly P&I at example tier',pi),m('best','Monthly P&I at top example tier',best),m('difference','Monthly difference',pi-best),m('life','30-year interest difference',(pi-best)*360)],[table('Illustrative app rate tiers (not lender offers)',['Minimum score','Example rate','Monthly P&I'],bands.map(([score,r])=>[score,r+x.shift,payment(x.loan,r+x.shift,360)]),['integer','percent','money'])]);}
 case 'debt-payoff':{
  const ds=[1,2,3].map(i=>({balance:x['balance'+i],rate:x['rate'+i],minimum:x['minimum'+i]}));
  for(const d of ds)if(d.balance>0&&d.minimum<=0)throw new Error('Each active debt needs a minimum payment greater than zero.');
  const av=payoff(ds,x.extra,'avalanche'),sn=payoff(ds,x.extra,'snowball'),base=payoff(ds,0,'avalanche'),cur=x.strategy==='avalanche'?av:sn;
  return result([m('months','Months to repay chosen strategy',cur.months,'integer'),m('interest','Interest through modeled period',cur.interest),m('remaining','Balance after modeled period',cur.remaining),m('saved','Interest saved vs minimum-only',base.months===null||cur.months===null?null:base.interest-cur.interest)],[table('Strategy comparison (600-month maximum)',['Strategy','Payoff months','Interest','Remaining'],[['Avalanche',av.months,av.interest,av.remaining],['Snowball',sn.months,sn.interest,sn.remaining],['Minimums only',base.months,base.interest,base.remaining]],['text','integer','money','money'])],cur.months===null?['The chosen payment plan does not clear the debts within 600 months. This is not a payoff date.']:[]);}
 case 'heloc':case 'home-equity':{
  const capacity=max(0,x.value*x.cltv/100-x.balance),loan=id==='heloc'?min(x.loan,capacity):x.loan,pi=payment(loan,x.rate,x.years*12),io=loan*x.rate/1200;
  const entries=[m('capacity','Available under entered CLTV assumption',capacity),m('loan',id==='heloc'?'Modeled draw (capped at available line)':'Requested equity loan',loan),m('cltv','Combined loan-to-value',(x.balance+loan)/x.value*100,'percent'),m('pi','Repayment monthly P&I',pi),m('interest','Repayment-period interest',pi*x.years*12-loan)];
  if(id==='heloc')entries.push(m('drawPayment','Interest-only draw-period payment',io),m('drawInterest','Draw-period interest',io*x.drawYears*12),m('totalInterest','Total modeled interest',io*x.drawYears*12+pi*x.years*12-loan));
  return result(entries,[annualSummary(schedule(loan,x.rate,x.years*12))],x.loan>capacity?['Requested borrowing exceeds the entered CLTV-based capacity. This is a planning threshold, not a lender decision.']:[]);}
 case 'student-dti':{
  const loan=mortgage(x),pi=payment(loan,x.rate,360),housing=pi+x.price*x.tax/1200+x.insurance/12,all=housing+x.debts+x.student;
  const fac=(1-x.down/100)*payment(1,x.rate,360)+x.tax/1200,maxPrice=s=>max(0,(x.income*x.back/100-x.debts-s-x.insurance/12)/fac);
  return result([m('housing','Monthly housing estimate',housing),m('without','DTI excluding student payment',(housing+x.debts)/x.income*100,'percent'),m('with','DTI including entered student payment',all/x.income*100,'percent'),m('budgetLoss','Modeled purchase-budget reduction',maxPrice(0)-maxPrice(x.student)),m('incomeNeeded','Gross monthly income at entered DTI budget',all/(x.back/100))],[],['Uses the student payment you enter. Deferred and income-driven payments can be treated differently by each mortgage program; confirm the qualifying amount with your lender.']);}
 case 'rent-vs-buy':{
  const loan=mortgage(x),down=x.price*x.down/100,pi=payment(loan,x.rate,x.years*12),base=pi+x.price*x.tax/1200+x.insurance/12+x.hoa+x.maintenance/12,rows=schedule(loan,x.rate,x.years*12),closing=x.price*x.buyCosts/100;
  let investment=down+closing,breakEven=null;const comparisons=[];
  for(let y=1;y<=30;y++){
   const hv=x.price*pow(1+x.appreciation/100,y),bal=rows[min(y*12,rows.length)-1]?.balance||0,buyNW=hv*(1-x.sellCosts/100)-bal;
   const rent=x.rent*pow(1+x.rentGrowth/100,y-1)+x.rentersInsurance;
   const owning=(y>x.years?base-pi:base); // mortgage payments stop at term
   investment=investment*(1+x.investment/100)+(owning-rent)*12*(1+x.investment/200);
   if(breakEven===null&&buyNW>=investment)breakEven=y;
   comparisons.push([y,buyNW,investment,buyNW-investment]);
  }
  const row=comparisons[x.hold-1];
  return result([m('buyMonthly','Initial monthly ownership budget',base),m('rentMonthly','Initial rent plus renters insurance',x.rent+x.rentersInsurance),m('buyWealth','Net sale equity at selected year',row[1]),m('rentWealth','Modeled renter investment at selected year',row[2]),m('difference','Buying minus renting modeled wealth',row[3]),m('breakEven','First modeled buying crossover year',breakEven,'integer')],[table('Net wealth scenario by year',['Year','Owner net sale equity','Renter investment','Buying minus renting'],comparisons,['integer','money','money','money'])],['Both positive and negative monthly cash differences affect the renter investment; a negative value means the modeled rental budget requires additional funds. Taxes, PMI, changing maintenance and investment volatility are excluded. A crossover may reverse in later years.']);}
 case 'moving':{
  const matrix={local:{studio:950,'2br':1250,'4br':1900,office:2200},long:{studio:2800,'2br':4200,'4br':6800,office:9000},cross:{studio:4500,'2br':7200,'4br':11500,office:14000}},base=matrix[x.distance][x.size]*(x.season==='peak'?1.2:1),fuel={local:80,long:320,cross:580}[x.distance],insurance=Math.round(base*.03),materials={self:180,partial:450,full:900}[x.packing],packing={self:0,partial:350,full:900}[x.packing],storage={no:0,'1mo':180,'3mo':540,'6mo':1080}[x.storage],travel={local:80,long:350,cross:650}[x.distance],subtotal=base+fuel+insurance+materials+packing+storage+travel+100,buffer=Math.round(subtotal*.1);
  return result([m('total','Moving budget including buffer',subtotal+buffer),m('subtotal','Budget before buffer',subtotal),m('buffer','10% contingency',buffer)],[table('Illustrative app cost breakdown',['Item','Amount'],[['Base move',base],['Fuel',fuel],['Insurance allowance',insurance],['Materials',materials],['Packing service',packing],['Storage',storage],['Travel',travel],['Tips allowance',100]],['text','money'])]);}
 case 'rental-yield':{
  const loan=mortgage(x),annualDebt=payment(loan,x.rate,360)*12,gross=x.rent*12,vacancy=gross*x.vacancy/100,egi=gross-vacancy,mgmt=egi*x.management/100,opex=x.annualTax+x.insurance+mgmt+x.maintenance+x.other,noi=egi-opex,cf=noi-annualDebt,down=x.price*x.down/100;
  return result([m('noi','Net operating income / year',noi),m('cashflow','Annual cash flow after debt',cf),m('monthly','Monthly cash flow',cf/12),m('cap','Cap rate',noi/x.price*100,'percent'),m('grossYield','Gross rental yield',gross/x.price*100,'percent'),m('coc','Cash-on-cash (down payment only)',down>0?cf/down*100:null,'percent'),m('dscr','Debt service coverage ratio',annualDebt>0?noi/annualDebt:null,'number')],[table('Annual income and expenses',['Item','Amount'],[['Gross rent',gross],['Vacancy allowance',-vacancy],['Operating expenses',-opex],['NOI',noi],['Debt service',-annualDebt],['Cash flow',cf]],['text','money'])]);}
 case 'cash-on-cash':{
  const egi=x.gross*(1-x.vacancy/100),cf=egi-x.expenses-x.debtService,gain=x.price*(pow(1+x.appreciation/100,x.hold)-1),cash=cf*x.hold,profit=cash+gain;
  return result([m('cashflow','Annual cash flow',cf),m('return','Annual cash-on-cash return',cf/x.cash*100,'percent'),m('gain','Modeled appreciation gain',gain),m('profit','Hold-period cash flow plus appreciation',profit),m('multiple','Equity multiple before sale costs and tax',(x.cash+profit)/x.cash,'number')]);}
 case 'fix-flip':{
  const loan=x.purchase*x.ltv/100,financing=loan*x.rate/100*x.months/12,buy=x.purchase*x.buyCosts/100,sell=x.arv*x.sellCosts/100,holding=x.holding*x.months,total=x.purchase+x.rehab+financing+buy+sell+holding+x.other,cash=x.purchase-loan+x.rehab+buy+x.other,profit=x.arv-total;
  return result([m('cost','Total project cost',total),m('profit','Net profit before tax',profit),m('financing','Interest-only financing cost',financing),m('cash','Initial cash investment assumption',cash),m('roi','Return on modeled initial cash',cash>0?profit/cash*100:null,'percent'),m('annualized','Simple annualized ROI',cash>0?profit/cash*100*12/x.months:null,'percent'),m('rule70','70% rule offer benchmark',x.arv*.7-x.rehab)]);}
 case 'exchange-1031':{
  const basis=x.basis-x.depreciation,gain=max(0,x.sale-x.sellingCosts-basis),recapture=min(x.depreciation,gain),capital=max(0,gain-recapture),boot=max(0,x.sale-x.sellingCosts-x.replacement)+x.debtBoot,recognized=min(gain,boot),recognizedRecapture=min(recapture,recognized),without=capital*(x.capitalRate+x.niit)/100+recapture*x.recaptureRate/100+gain*x.stateRate/100,withTax=(recognized-recognizedRecapture)*(x.capitalRate+x.niit)/100+recognizedRecapture*x.recaptureRate/100+recognized*x.stateRate/100,deferred=gain-recognized;
  return result([m('basis','Adjusted basis',basis),m('gain','Realized gain',gain),m('boot','Modeled cash and debt boot',boot),m('recognized','Recognized gain (capped at realized gain)',recognized),m('deferred','Deferred gain',deferred),m('newBasis','Simplified replacement basis',max(0,x.replacement-deferred)),m('without','Tax scenario without deferral',without),m('with','Tax scenario with partial deferral',withTax),m('deferredTax','Tax deferred under entered assumptions',without-withTax)],[],['Simplified investment/business real-property exchange scenario. Recapture allocation, liabilities, transaction costs and NIIT applicability require a qualified tax adviser and intermediary. A computed deferral is not an eligibility determination.']);}
 case 'tax-deduction':{
  const eligibleInterest=x.interest*min(1,x.debtLimit/x.balance),salt=min(x.propertyTax+x.stateTax,x.saltLimit),medical=max(0,x.medical-x.income*.075),itemized=eligibleInterest+salt+x.charity+medical+x.other,chosen=max(itemized,x.standard),increment=max(0,itemized-x.standard);
  return result([m('interest','Modeled eligible mortgage interest',eligibleInterest),m('salt','SALT allowed under entered cap',salt),m('medical','Medical above 7.5% of entered AGI',medical),m('itemized','Modeled itemized deductions',itemized),m('chosen','Larger of itemized and entered standard deduction',chosen),m('increment','Extra deduction above standard',increment),m('saving','Incremental tax benefit at entered marginal rate',increment*x.marginal/100)],[],['Enter the standard deduction, applicable debt limit and income-adjusted SALT cap for your tax year and filing status. This model does not calculate brackets, credits, AMT, taxable income or a tax return. Only otherwise deductible qualified expenses should be entered.']);}
 case 'down-payment-assistance':{
  const down=x.price*x.down/100,usable=min(x.assistance,down+x.closing),cash=max(0,down+x.closing-usable);
  return result([m('downCash','Required down payment budget',down),m('closing','Closing cost budget',x.closing),m('assistance','Assistance applied to budget',usable),m('cash','Cash remaining to fund',cash),m('secondPayment','Assistance-loan monthly P&I',x.type==='loan'?payment(usable,x.rate,x.years*12):0)],[],['Budget illustration using a program amount you have independently confirmed. This does not search available grants or verify first-time-buyer, income, credit, property or funding eligibility. Forgivable assistance may become repayable.']);}
 case 'flood':{
  const rates={V:{'-2':3800,0:2800,1:2200,3:1600},AE:{'-2':2400,0:1620,1:888,3:580},A:{'-2':1800,0:1200,1:720,3:450},X:{'-2':600,0:450,1:350,3:280}},base=rates[x.zone][x.elevation],building=Math.round(base*x.building/250000/10)*10,contents=Math.round(base*.3*x.contents/100000/10)*10;
  return result([m('annual','Illustrative annual flood premium',building+contents),m('monthly','Rounded monthly budget',Math.round((building+contents)/12)),m('building','Building premium component',building),m('contents','Contents premium component',contents)],[],['Uses a simplified zone/elevation table from the app. It does not implement FEMA Risk Rating 2.0 or quote NFIP/private coverage. Enter actual premiums in your mortgage budget when available.']);}
 case 'homeowner-insurance':case 'ho1':case 'ho3':case 'ho5':case 'ho6':case 'hurricane':case 'wildfire':{
  let annual=0,deductible=Number(x.deductible),coverage=x.value;
  if(id==='hurricane'){
   const base={FL:.008,TX:.0066,LA:.0072,NC:.0052}[x.state],location={coast:1.35,near:1,inland:.62}[x.location],ded={1:.1,2:0,3:-.08,5:-.18}[x.deductible],construction={wood:0,masonry:-.1,fortified:-.28}[x.construction];annual=x.value*base*location*(1+ded)*(1+construction);deductible=x.value*Number(x.deductible)/100;
  }else if(id==='wildfire'){
   const rate={low:.0028,ca_std:.0039,ca_sra:.0072,extreme:.013}[x.risk],age=x.age>40?1.2:x.age>20?1.1:1,disc={1000:0,2500:-.08,5000:-.15,10000:-.22}[x.deductible]+{none:0,partial:-.08,full:-.18}[x.mitigation];annual=x.value*rate*age*(1+disc);
  }else if(id==='ho6'){
   coverage=x.value+x.contents;annual=coverage*.004*{low:.7,medium:1,high:1.4,fl:1.8}[x.risk]*(1+{500:.04,1000:0,2500:-.08,5000:-.15}[x.deductible]);
  }else{
   const factor=id==='ho1'?.7:id==='ho5'?1.2:1,age=x.age>50?1.35:x.age>30?1.18:x.age>15?1.08:1,risk={low:.75,medium:1,high:1.45,extreme:1.95}[x.risk];
   const discount=id==='ho1'?{500:.04,1000:0,2000:-.08,5000:-.16}:id==='ho5'?{1000:0,2500:-.08,5000:-.15,10000:-.22}:{500:0,1000:-.05,2000:-.12,5000:-.2};annual=x.value*.0057*factor*age*risk*(1+discount[x.deductible]);
  }
  annual=Math.round(annual/10)*10;if(id==='ho6')annual=max(150,annual);
  return result([m('annual','Illustrative annual premium',annual),m('monthly','Rounded monthly premium',Math.round(annual/12)),m('coverage','Entered coverage basis',coverage),m('deductible','Selected deductible amount',deductible)],[],['Illustrative app pricing model, not an insurer quote or assurance of coverage. State, catastrophe risk, underwriting and policy wording can materially change price and exclusions.']);}
 default:throw new Error('Unknown US calculator.');
 }
}
return {payment,schedule,pv,pmiRate,monthsToLtv,payoff,calculate};
});
