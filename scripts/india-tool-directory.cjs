'use strict';
const aliases=require('../data/tool-redirects.json').india;
const featured=[
 ['mortgage','Start with the purchase price and deposit to estimate repayments, including charges added to the loan.'],
 ['amortization','See how each payment reduces your balance and compare extra repayments permitted by your lender.'],
 ['refinance','Compare your existing loan with a new quote, including switching costs and the balance left at your chosen date.'],
 ['floating-fixed','Explore one possible floating-rate reset alongside a fixed-rate quote. Choose when the reset happens.'],
 ['loan-eligibility','Find the loan amount that fits both your monthly household budget and a debt-payment limit you enter.'],
 ['joint-loan','Build a joint borrowing budget using the income a lender accepts and each applicant’s existing debts.'],
 ['foir','Check how much of your monthly income would go towards existing debts and a proposed EMI.'],
 ['stamp-duty','Set aside purchase costs using the state or territory rates and registration charges confirmed for your transaction.'],
 ['construction','Plan interest during construction from your expected draw dates, then estimate repayments on the amount borrowed.'],
 ['nri-loan','Compare an INR home-loan payment with foreign income converted using your own exchange-rate quote and transfer fees.']
];
const descriptions={
 'section-80c':'Compare tax before and after a confirmed savings or loan-principal deduction, using your remaining allowance.',
 'section-24b':'Estimate the tax effect of a confirmed home-loan interest deduction. Enter the qualifying amount and remaining limit for your case.'
};
const introductions={
 'Home-loan and repayment':'Already know the loan amount? Use the instalment calculator for a repayment estimate.',
 'Borrowing budgets':'For borrowing against a property you already own, start with the lender’s valuation and quote.',
 'Other loan budgets':'These calculators cover vehicle, education and gold-backed borrowing. Use the terms in your own loan offer.',
 'Property costs and tax':'Use confirmed transaction details and applicable tax inputs. These tools do not establish your tax liability.',
 'Income-tax scenarios':'Prepare the taxable income and qualifying deductions for your own situation before comparing scenarios.',
 'Savings and retirement':'Explore contribution and return assumptions. Projected balances are estimates, not promised investment outcomes.',
 'Prices and currency':'Bring a property or exchange-rate quote. These tools calculate from your figures rather than supplying market prices.',
 'Housing scheme scenarios':'Check a limited numerical scenario or model a subsidy already credited. Neither tool awards a subsidy.'
};
function render(C,card,esc){
 const survivors=C.catalog.filter(c=>!aliases[c.id]);
 const selected=new Set(featured.map(([id])=>id));
 const primary=featured.map(([id,description])=>{
  const c=survivors.find(c=>c.id===id);
  if(!c)throw Error('Missing featured India tool: '+id);
  return card({...c,description});
 }).join('\n');
 let html='<section class="section country-tools-section" id="tools"><div class="sec-hdr"><h2>Plan your home purchase and repayments</h2></div><p>Start with the question you need to answer. These 10 calculators cover purchase payments, borrowing budgets, loan comparisons and upfront costs. Enter figures from your own documents and select Calculate estimate.</p><div class="g2 country-tools-directory">'+primary+'</div></section>\n';
 html+='<section class="section" aria-labelledby="specialist-heading"><div class="sec-hdr"><h2 id="specialist-heading">More calculators for specific situations</h2></div><p>Use these when you need a separate loan, tax or savings estimate. Read the assumptions on each calculator before using its result.</p></section>\n';
 for(const[group,anchor]of Object.entries(C.groupIDs)){
  const items=survivors.filter(c=>c.group===group&&!selected.has(c.id));
  // Retain every existing navigation target, including groups featured above.
  html+='<section class="section india-specialist-tools" id="'+(anchor==='tools'?'instalments':anchor)+'"><div class="sec-hdr"><h2>'+esc(group)+'</h2></div><p>'+esc(introductions[group])+'</p><ul>'+items.map(c=>'<li><a href="/tools/india/'+c.id+'">'+esc(c.title)+'</a><p>'+esc(descriptions[c.id]||c.description)+'</p></li>').join('')+'</ul></section>\n';
 }
 return html;
}
module.exports={render,featured};
