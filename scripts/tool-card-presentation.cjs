/* Decorative, local SVGs: calculator names remain the accessible link text. */
'use strict';
const paths={
 home:'M3 11 12 3l9 8M5 10v11h14V10M9 21v-7h6v7',
 chart:'M4 3v17h17M8 16v-4m5 4V8m5 8V5',
 calendar:'M5 5h14v16H5zM8 3v4m8-4v4M5 10h14M9 14h1m4 0h1m-6 3h1',
 wallet:'M4 7V5h14v3M4 8h17v12H4zM16 12h5v4h-5z',
 shield:'m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6zM8 12l3 3 5-6',
 compare:'M4 7h16m-4-4 4 4-4 4M20 17H4m4-4-4 4 4 4',
 growth:'M4 20V4m0 16h17M7 15l5-5 4 2 5-7m-5 0h5v5',
 percent:'m6 18 12-12M8 7a2 2 0 1 1-4 0 2 2 0 0 1 4 0m12 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0',
 document:'M6 3h8l4 4v14H6zM14 3v5h4M9 12h6m-6 4h6',
 bank:'m3 8 9-5 9 5H3m2 3v7m5-7v7m4-7v7m5-7v7M3 21h18',
 globe:'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0M3 12h18M12 3c-5 5-5 13 0 18 5-5 5-13 0-18',
 car:'m4 10 2-5h12l2 5M3 10h18v8H3zM6 18v3m12-3v3M6 14h1m10 0h1',
 calculator:'M6 3h12v18H6zM9 6h6M9 10h1m4 0h1m-6 4h1m4 0h1m-6 4h1m4 0h1'
};
function presentation(c){const t=(c.id+' '+c.title).toLowerCase();let key=/car|vehicle/.test(t)?'car':/tax|duty|closing|cost|grant|support/.test(t)?'document':/insurance|pmi|fha|va-loan|usda|healthy/.test(t)?'shield':/amorti|schedule|term/.test(t)?'calendar':/refin|refix|comparison|compare|switch|frequency|currency/.test(t)?'compare':/saving|extra|overpay|prepay|growth|investment/.test(t)?'growth':/deposit|down-payment|afford|budget|withdraw|contribut|wallet/.test(t)?'wallet':/dti|lvr|ltv|ratio|interest|margin/.test(t)?'percent':/mortgage|purchase|first-home|rent|property/.test(t)?'home':/loan|lender|credit/.test(t)?'bank':'chart';
 const tones={home:'emerald',chart:'blue',calendar:'violet',wallet:'amber',shield:'blue',compare:'teal',growth:'emerald',percent:'violet',document:'amber',bank:'blue',globe:'teal',car:'coral'};
 return{tone:tones[key]||'blue',icon:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="${paths[key]}"/></svg>`};}
module.exports=presentation;
