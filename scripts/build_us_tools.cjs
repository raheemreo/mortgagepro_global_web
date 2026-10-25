/* Reproducibly render tool-specific forms and replace only the US tool directory.
 * Market feeds, other countries, root calculator and editorial sections are retained. */
'use strict';
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),{catalog,states}=require('../js/us-tools-catalog.js');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const asset=file=>'/'+file+'?v='+crypto.createHash('sha256').update(fs.readFileSync(path.join(root,file))).digest('hex').slice(0,12);
const url=id=>'/tools/usa/'+id;
const groupIDs={'Core Mortgage Tools':'tools','Loan Programs':'loans','Insurance & Tax':'insurance','Personal Finance':'personal','Real Estate Investment':'investment'};
const consent=`<script data-mpg-consent>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('consent', 'default', {
      'ad_storage': 'denied',
      'analytics_storage': 'denied',
      'ad_user_data': 'denied',
      'ad_personalization': 'denied',
      'wait_for_update': 500
    });
  </script>`;
function field(f){const id='input-'+f.key,help=f.help?`<small id="${id}-help">${esc(f.help)}</small>`:'',attrs=`id="${id}" name="${f.key}"${f.help?` aria-describedby="${id}-help"`:''} required`;
 const control=f.type==='select'?`<select ${attrs}>${f.options.map(([v,l])=>`<option value="${esc(v)}"${String(f.value)===v?' selected':''}>${esc(l)}</option>`).join('')}</select>`:`<input ${attrs} type="number" inputmode="decimal" value="${esc(f.value)}" min="${f.min}" max="${f.max}" step="${f.step}">`;
 return `<div class="tool-field"><label for="${id}">${esc(f.label)}</label>${control}${help}</div>`;
}
const footer=`<footer class="tool-footer"><div><p><strong>MortgagePro Global · REO Technologies</strong></p><nav aria-label="Footer"><a href="/about">About</a><a href="/methodology">Methodology</a><a href="/contact">Contact</a><a href="/privacy-policy">Privacy</a><a href="/cookie-policy">Cookies</a><a href="/terms-and-conditions">Terms</a><a href="/disclaimer">Disclaimer</a><a href="/privacy-policy#privacy-controls" onclick="return window.MPGPrivacy ? MPGPrivacy.open(event) : true;">Privacy choices</a></nav><p>Educational scenario estimates. Confirm lender, insurer, assessor and tax terms before making financial decisions.</p></div></footer>`;
const dir=path.join(root,'tools/usa');fs.mkdirSync(dir,{recursive:true});
for(const c of catalog){
 const state=c.id==='property-tax'?`<div class="tool-state"><label for="state-reference">State reference example (optional)</label><select id="state-reference" data-state class="tool-state-picker"><option value="">Enter my local rate</option>${Object.entries(states).sort((a,b)=>a[1].name.localeCompare(b[1].name)).map(([code,v])=>`<option value="${code}">${esc(v.name)} — ${v.rate.toFixed(2)}% example</option>`).join('')}</select><p data-state-note>Choose an illustrative reference, or enter your own local rate.</p></div>`:'';
 const schema={'@context':'https://schema.org','@type':'WebApplication',name:'US '+c.title,url:'https://mortgageproglobal.com'+url(c.id),applicationCategory:'FinanceApplication',operatingSystem:'Web browser',description:c.description,author:{'@type':'Organization',name:'REO Technologies'},dateModified:'2026-10-25'};
 const related=catalog.filter(d=>d.group===c.group&&d.id!==c.id).slice(0,6);
 const html=`<!DOCTYPE html>
<html lang="en">
<head>
  ${consent}
  <script src="${asset('js/site-privacy.js')}" defer></script>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>US ${esc(c.title)} | MortgagePro Global</title>
  <meta name="description" content="${esc(c.description)}">
  <link rel="canonical" href="https://mortgageproglobal.com${url(c.id)}">
  <meta property="og:title" content="US ${esc(c.title)}">
  <meta property="og:description" content="${esc(c.description)}">
  <meta property="og:url" content="https://mortgageproglobal.com${url(c.id)}">
  <meta property="og:type" content="website">
  <link rel="icon" href="/favicon.ico">
  <link rel="stylesheet" href="${asset('css/us-tools.css')}">
  <script type="application/ld+json">${JSON.stringify(schema)}</script>
  <script src="${asset('js/us-tools-models.js')}" defer></script>
  <script src="${asset('js/us-tools-catalog.js')}" defer></script>
  <script src="${asset('js/us-tools-ui.js')}" defer></script>
</head>
<body>
<a class="tool-skip" href="#main">Skip to calculator</a>
<header class="tool-header"><div class="tool-header-inner"><a class="tool-brand" href="/">MortgagePro Global</a><nav aria-label="Main"><a href="/usa-mortgage-calculator#tools">US tools</a><a href="/#calculators">Countries</a><a href="/blog">Guides</a></nav></div></header>
<main id="main" class="tool-main">
<nav class="tool-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/usa-mortgage-calculator#${groupIDs[c.group]}">US ${esc(c.group)}</a> / ${esc(c.title)}</nav>
<p class="tool-eyebrow">United States · USD · ${esc(c.group)}</p>
<h1>${esc(c.title)}</h1><p class="tool-intro">${esc(c.description)}</p>
<p class="tool-meta">Updated October 25, 2026 · Example assumptions, not live quotes. Inputs stay in this tab and are not saved or sent by the calculator.</p>
<div data-us-tool="${c.id}" class="tool-workspace">
<section class="tool-panel" aria-labelledby="inputs-heading"><h2 id="inputs-heading">Your inputs</h2>${state}<form novalidate autocomplete="off"><div class="tool-inputs">${c.fields.map(field).join('\n')}</div><div class="tool-actions"><button type="submit" class="tool-primary" hidden>Calculate estimate</button><button type="reset" class="tool-secondary">Reset example</button></div><p data-error class="tool-error" role="alert" tabindex="-1" hidden></p><p data-status class="tool-live-status" role="status" aria-live="polite"></p></form><noscript><p class="tool-notice">Enable JavaScript to calculate in your browser. The formulas and assumptions below remain available without JavaScript.</p></noscript></section>
<section class="tool-panel" aria-labelledby="results-heading"><h2 id="results-heading">Your estimate</h2><div data-results tabindex="-1"><p class="tool-empty">Enter your figures and enable JavaScript to calculate an estimate.</p></div><p class="tool-meta">Rounded display amounts may not add exactly. Calculations use unrounded intermediate values.</p></section>
</div>
<section class="tool-method" aria-labelledby="method-heading"><h2 id="method-heading">How this estimate works</h2><p>${esc(c.method)}</p><h2>Assumptions and limits</h2><ul>${c.notes.map(n=>'<li>'+esc(n)+'</li>').join('')}</ul><h2>References and further reading</h2><ul>${c.refs.map((u,i)=>`<li><a href="${esc(u)}" rel="noopener noreferrer">${esc(new URL(u).hostname.replace('www.',''))} — ${esc(referenceTitle(u))}</a></li>`).join('')}<li><a href="/methodology">Calculation methodology and rounding</a></li><li><a href="/corrections-policy">Report a calculation or content error</a></li></ul></section>
<section aria-labelledby="related-heading"><h2 id="related-heading">Related US tools</h2><nav aria-label="Related calculators" class="tool-related">${related.map(r=>`<a href="${url(r.id)}">${esc(r.title)}</a>`).join('')}<a href="/usa-mortgage-calculator#tools">All US calculators</a></nav></section>
</main>
${footer}
</body>
</html>
`;
 fs.writeFileSync(path.join(dir,c.id+'.html'),html);
}
function referenceTitle(u){if(u.includes('2023-05'))return 'FHA mortgage insurance premium schedule';if(u.includes('FHA-Mortgage'))return 'FHA premium structure';if(u.includes('funding-fee'))return 'VA purchase funding fees and exemptions';if(u.includes('42b1054'))return 'USDA FY 2027 guaranteed loan fee notice';if(u.includes('jan-2026'))return 'USDA guaranteed program fee calculation overview';if(u.includes('conforming-loan-limit'))return '2026 conforming loan limits';if(u.includes('private-mortgage'))return 'PMI cancellation and termination';if(u.includes('i1040sca'))return 'Schedule A instructions — check applicable tax year';if(u.includes('p936'))return 'Home mortgage interest deduction';if(u.includes('like-kind'))return 'Like-kind real-property exchange rules';if(u.includes('loan-estimate'))return 'Understand a Loan Estimate';if(u.includes('debt-to-income'))return 'Understanding debt-to-income ratios';if(u.includes('floodsmart'))return 'Flood insurance pricing';if(u.includes('state-taxes'))return 'State and local property tax information';if(u.includes('fmcsa'))return 'Protect your move';if(u.includes('naic'))return 'Consumer insurance resources';if(u.includes('insurance.ca'))return 'Insurance consumer information';if(u.includes('down-payment-assistance'))return 'Homebuyer assistance resources';return 'Consumer information';}
function card(c){return `<a href="${url(c.id)}" class="tc"><div class="ti" aria-hidden="true">${{'Core Mortgage Tools':'🧮','Loan Programs':'🏦','Insurance & Tax':'🛡️','Personal Finance':'📊','Real Estate Investment':'🏘️'}[c.group]}</div><div class="tn">${esc(c.title)}</div><div class="td">${esc(c.description)}</div><div class="ta" aria-hidden="true">›</div></a>`;}
let sections='    <!-- Core Mortgage Tools -->\n';
for(const group of Object.keys(groupIDs)){
 sections+=`    <div id="${groupIDs[group]}" class="section-header"><h2>${esc(group)}</h2></div>\n`;
 if(group==='Core Mortgage Tools')sections+='<p>Choose a calculator for its own inputs, estimates and calculation details. Example assumptions are editable; tools do not use live rate feeds.</p>\n';
 sections+='<div class="g2 us-tools-directory">'+catalog.filter(c=>c.group===group).map(card).join('\n')+'</div>\n';
 if(group==='Insurance & Tax'){
  sections+='    <div id="states" class="section-header"><h2>State-by-State Tools</h2></div>\n<p>Open a property-tax scenario with an illustrative state reference. Confirm your actual assessed value, exemption and local rate; these are not current tax quotations.</p>\n<div class="g3 us-tools-directory">';
  for(const code of ['CA','TX','NY','FL','IL','NJ'])sections+=`<a href="${url('property-tax')}?state=${code}" class="tc"><div class="ti" aria-hidden="true">🗺️</div><div class="tn">${esc(states[code].name)}</div><div class="td">Assessed value, exemption and editable tax rate</div><div class="ta" aria-hidden="true">›</div></a>`;
  sections+=`</div><p><a href="${url('property-tax')}">Other states / enter my local property-tax rate</a></p>\n`;
 }
}
const landing=path.join(root,'usa-mortgage-calculator.html');let s=fs.readFileSync(landing,'utf8');s=s.replace(/    <!-- Core Mortgage Tools -->[\s\S]*?(?=    <!-- Gov\. Programs -->)/,sections+'\n');s=s.replace(/<link[^>]+href="\/css\/us-tools-directory\.css[^"]*"[^>]*>\s*/g,'');s=s.replace('</head>',`<link rel="stylesheet" href="${asset('css/us-tools-directory.css')}">\n</head>`);fs.writeFileSync(landing,s);
const sitemap=path.join(root,'sitemap.xml');let sm=fs.readFileSync(sitemap,'utf8').replace(/\s*<!-- US TOOLS START -->[\s\S]*?<!-- US TOOLS END -->/,'');sm=sm.replace('</urlset>','\n<!-- US TOOLS START -->\n'+catalog.map(c=>`  <url><loc>https://mortgageproglobal.com${url(c.id)}</loc><lastmod>2026-10-25</lastmod></url>`).join('\n')+'\n<!-- US TOOLS END -->\n</urlset>');fs.writeFileSync(sitemap,sm);
console.log(`Built ${catalog.length} US tool pages from ${new Set(catalog.map(c=>c.source)).size} app source calculators; updated US directory and sitemap.`);
