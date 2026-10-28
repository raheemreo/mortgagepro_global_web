'use strict';
const aliases=require('../data/tool-redirects.json').uk;
const specialist=new Set(['income-multiples','buy-to-let','help-to-buy']);
const descriptions={
 mortgage:'Start with the property price, deposit and mortgage quote to estimate repayment or interest-only payments.',
 amortization:'Follow the balance through each payment and compare extra repayments permitted by your lender.',
 'interest-only':'See the balance left after an interest-only period and estimate the payment when repayment begins.',
 affordability:'Work out a monthly repayment budget from take-home income, living costs and existing debts.',
 ltv:'Check your loan-to-value ratio and how much the balance would need to fall to reach a target you enter.',
 remortgage:'Compare two mortgage quotes over the same period, including fees, interest and the balance still owed.',
 sdlt:'Buying in England or Northern Ireland? Estimate residential Stamp Duty Land Tax using the price and buyer category you confirm.',
 lbtt:'Buying in Scotland? Estimate residential Land and Buildings Transaction Tax and the additional-dwelling scenario where applicable.',
 ltt:'Buying in Wales? Estimate residential Land Transaction Tax using the standard or higher-rate buyer scenario.',
 'shared-ownership':'Budget the mortgage on your purchased share alongside rent on the remaining share and quoted charges.',
 'income-multiples':'Compare a proposed loan with an income multiple you choose. This scenario does not establish lender approval.',
 'buy-to-let':'Explore a rental-property budget using rent, occupancy, operating costs and financing assumptions.',
 'help-to-buy':'Already have an equity loan? Estimate redemption and current fees from your agreement and approved valuation.'
};
const introductions={
 'Core mortgage tools':'Begin with the payment you can budget for, then explore the balance, repayment type and deposit.',
 'Repayment and switching':'Keep the comparison period consistent and include the fees shown in each mortgage offer.',
 'Purchase tax and ownership':'Choose the tax calculator for the property’s location. Confirm buyer status and transaction details with your conveyancer.',
 'Investment scenarios':'Use this separate scenario when you are budgeting for a rental property.'
};
function render(C,groupIDs,card,esc){
 const survivors=C.catalog.filter(c=>!aliases[c.id]);
 let html='';
 for(const[group,id]of Object.entries(groupIDs)){
  const primary=survivors.filter(c=>c.group===group&&!specialist.has(c.id));
  const secondary=survivors.filter(c=>c.group===group&&specialist.has(c.id));
  html+='<section class="section country-tools-section" id="'+id+'"><div class="sec-hdr"><h2>'+esc(group)+'</h2></div><p>'+esc(introductions[group])+'</p>';
  if(primary.length)html+='<div class="g2 country-tools-directory">'+primary.map(c=>card({...c,description:descriptions[c.id]})).join('\n')+'</div>';
  if(secondary.length)html+='<h3>For specific situations</h3><ul>'+secondary.map(c=>'<li><a href="/tools/uk/'+c.id+'">'+esc(c.title)+'</a><p>'+esc(descriptions[c.id])+'</p></li>').join('')+'</ul>';
  html+='</section>\n';
 }
 return html;
}
module.exports={render};
