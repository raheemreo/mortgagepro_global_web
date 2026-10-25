/* Reproducibly render tool-specific forms and replace only the Canada tool directory.
 * Market feeds, other countries, root calculator and editorial sections are retained. */
'use strict';
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),{catalog}=require('../js/canada-tools-catalog.js');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const asset=file=>'/'+file+'?v='+crypto.createHash('sha256').update(fs.readFileSync(path.join(root,file))).digest('hex').slice(0,12);
const references=JSON.parse(fs.readFileSync(path.join(root,'data/canada-tool-reference.json'),'utf8'));
const url=id=>'/tools/canada/'+id;
const groupIDs={'Mortgage & qualification':'tools','Repayment & renewal':'repayment','Purchase costs & programs':'purchase'};
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
const dir=path.join(root,'tools/canada');fs.mkdirSync(dir,{recursive:true});
for(const c of catalog){
 const state='';
 const schema={'@context':'https://schema.org','@type':'WebApplication',name:c.title,url:'https://mortgageproglobal.com'+url(c.id),applicationCategory:'FinanceApplication',operatingSystem:'Web browser',description:c.description,author:{'@type':'Organization',name:'REO Technologies'},dateModified:'2026-10-25'};
 const related=catalog.filter(d=>d.group===c.group&&d.id!==c.id).slice(0,6);
 const html=`<!DOCTYPE html>
<html lang="en">
<head>
  ${consent}
  <script src="${asset('js/site-privacy.js')}" defer></script>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(c.title)} | MortgagePro Global</title>
  <meta name="description" content="${esc(c.description)}">
  <link rel="canonical" href="https://mortgageproglobal.com${url(c.id)}">
  <meta property="og:title" content="${esc(c.title)}">
  <meta property="og:description" content="${esc(c.description)}">
  <meta property="og:url" content="https://mortgageproglobal.com${url(c.id)}">
  <meta property="og:type" content="website">
  <link rel="icon" href="/favicon.ico">
  <link rel="stylesheet" href="${asset('css/us-tools.css')}">
  <script type="application/ld+json">${JSON.stringify(schema)}</script>
  <script src="${asset('js/canada-tools-models.js')}" defer></script>
  <script src="${asset('js/canada-tools-catalog.js')}" defer></script>
  <script src="${asset('js/canada-tools-ui.js')}" defer></script>
</head>
<body>
<a class="tool-skip" href="#main">Skip to calculator</a>
<header class="tool-header"><div class="tool-header-inner"><a class="tool-brand" href="/">MortgagePro Global</a><nav aria-label="Main"><a href="/canada-mortgage-calculator#tools">Canada tools</a><a href="/#calculators">Countries</a><a href="/blog">Guides</a></nav></div></header>
<main id="main" class="tool-main">
<nav class="tool-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/canada-mortgage-calculator#${groupIDs[c.group]}">Canada ${esc(c.group)}</a> / ${esc(c.title)}</nav>
<p class="tool-eyebrow">Canada · CAD · ${esc(c.group)}</p>
<h1>${esc(c.title)}</h1><p class="tool-intro">${esc(c.description)}</p>
<p class="tool-meta">Updated October 25, 2026 · Enter current figures from your documents and quotes. Budget settings are editable. Inputs stay in this tab and are not saved or sent by the calculator.</p>
<p class="tool-notice">Rules reviewed ${references.reviewedOn}: standard qualifying rate max(contract + 2 percentage points, 5.25%); purchase insurance cap below CAD 1.5 million; 30-year insured scenarios require confirmed eligibility. Enter current personal quotes; these rules do not establish approval. <a href="${references.cmhc}">CMHC source</a> · <a href="${references.osfi}">OSFI source</a>.</p>
<div data-ca-tool="${c.id}" class="tool-workspace">
<section class="tool-panel" aria-labelledby="inputs-heading"><h2 id="inputs-heading">Your inputs</h2>${state}<form novalidate autocomplete="off"><div class="tool-inputs">${c.fields.map(field).join('\n')}</div><div class="tool-actions"><button type="submit" class="tool-primary" hidden>Calculate estimate</button><button type="reset" class="tool-secondary">Reset example</button></div><p data-error class="tool-error" role="alert" tabindex="-1" hidden></p><p data-status class="tool-live-status" role="status" aria-live="polite"></p></form><noscript><p class="tool-notice">Enable JavaScript to calculate in your browser. The formulas and assumptions below remain available without JavaScript.</p></noscript></section>
<section class="tool-panel" data-result-panel hidden aria-labelledby="results-heading"><h2 id="results-heading">Your estimate</h2><div data-results tabindex="-1"><p class="tool-empty">Press Calculate estimate after entering your figures.</p></div><p class="tool-meta">Rounded display amounts may not add exactly. Calculations use unrounded intermediate values.</p></section>
</div>
<section class="tool-method" aria-labelledby="method-heading"><h2 id="method-heading">How this estimate works</h2><p>${esc(c.method)}</p><h2>Assumptions and limits</h2><ul>${c.notes.map(n=>'<li>'+esc(n)+'</li>').join('')}</ul><h2>References and further reading</h2><ul>${c.refs.map((u,i)=>`<li><a href="${esc(u)}" rel="noopener noreferrer">${esc(new URL(u).hostname.replace('www.',''))} — ${esc(referenceTitle(u))}</a></li>`).join('')}<li><a href="/methodology">Calculation methodology and rounding</a></li><li><a href="/corrections-policy">Report a calculation or content error</a></li></ul></section>
<section aria-labelledby="related-heading"><h2 id="related-heading">Related Canada tools</h2><nav aria-label="Related calculators" class="tool-related">${related.map(r=>`<a href="${url(r.id)}">${esc(r.title)}</a>`).join('')}<a href="/canada-mortgage-calculator#tools">All Canada calculators</a></nav></section>
</main>
${footer}
</body>
</html>
`;
 fs.writeFileSync(path.join(dir,c.id+'.html'),html);
}
function referenceTitle(u){if(u.includes('cmhc-schl'))return 'CMHC mortgage insurance and qualifying criteria';if(u.includes('osfi-bsif'))return 'Minimum qualifying rate and straight-switch scope';if(u.includes('first-home-savings'))return 'First Home Savings Account';if(u.includes('home-buyers-plan'))return 'RRSP Home Buyers’ Plan';if(u.includes('down-payment'))return 'Minimum down payment';if(u.includes('toronto.ca'))return 'Toronto municipal land transfer tax rates';if(u.includes('montreal.ca'))return 'Montreal 2026 transfer duty brackets';if(u.includes('alberta.ca'))return 'Alberta title fee schedule';return 'Official mortgage or property-transfer guidance';}
function card(c){return `<a href="${url(c.id)}" class="tc"><div class="tic" aria-hidden="true">🍁</div><div class="tn">${esc(c.title)}</div><div class="td">${esc(c.description)}</div><div class="ta" aria-hidden="true">›</div></a>`;}
let sections='    <!-- CORE TOOLS -->\n';
for(const group of Object.keys(groupIDs))sections+=`<section class="section" id="${groupIDs[group]}"><div class="sec-hdr"><h2>${esc(group)}</h2></div><p>Enter current figures and press Calculate estimate. Results stay hidden until you calculate; editing or resetting clears them.</p><div class="g2 canada-tools-directory">${catalog.filter(c=>c.group===group).map(card).join('\n')}</div></section>\n`;
const landing=path.join(root,'canada-mortgage-calculator.html');let s=fs.readFileSync(landing,'utf8');s=s.replace(/    <!-- CORE TOOLS -->[\s\S]*?(?=    <!-- RESOURCES -->)/,sections+'\n');s=s.replace(/<link[^>]+href="\/css\/canada-calculators\.css[^"]*"[^>]*>\s*/g,'');s=s.replace(/<script src="\/js\/canada-tools-models\.js[^"]*"><\/script>\s*/g,'');s=s.replace('</head>',`<script src="${asset('js/canada-tools-models.js')}"></script>\n<link rel="stylesheet" href="${asset('css/canada-calculators.css')}">\n</head>`);fs.writeFileSync(landing,s);
const sitemap=path.join(root,'sitemap.xml');let sm=fs.readFileSync(sitemap,'utf8').replace(/\s*<!-- CANADA TOOLS START -->[\s\S]*?<!-- CANADA TOOLS END -->/,'');sm=sm.replace('</urlset>','\n<!-- CANADA TOOLS START -->\n'+catalog.map(c=>`  <url><loc>https://mortgageproglobal.com${url(c.id)}</loc><lastmod>2026-10-25</lastmod></url>`).join('\n')+'\n<!-- CANADA TOOLS END -->\n</urlset>');fs.writeFileSync(sitemap,sm);
console.log(`Built ${catalog.length} Canada tool pages from ${new Set(catalog.map(c=>c.source)).size} app source calculators; updated Canada directory and sitemap.`);
