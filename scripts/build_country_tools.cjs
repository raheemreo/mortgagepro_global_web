/* Reproducibly render reviewed country tools and replace their country directories.
 * Market feeds, other countries, root calculator and editorial sections are retained. */
'use strict';
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..');
for(const country of JSON.parse(fs.readFileSync(path.join(root,'data/country-tools-config.json'))).enabled){
const C=require('../js/'+country+'-tools-catalog.js'),{catalog}=C;
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const asset=file=>'/'+file+'?v='+crypto.createHash('sha256').update(fs.readFileSync(path.join(root,file))).digest('hex').slice(0,12);
const references={reviewedOn:C.reviewedOn};
const url=id=>'/tools/'+C.country+'/'+id;
const groupIDs=Object.fromEntries([...new Set(catalog.map(c=>c.group))].map((g,i)=>[g,['tools','repayment','regions','investment','programs','taxes'][i]||'group-'+i]));
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
const dir=path.join(root,'tools',C.country);fs.mkdirSync(dir,{recursive:true});
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
  <script src="${asset('js/mortgage-tools-core.js')}"></script>
  <script src="${asset('js/'+C.country+'-tools-models.js')}" defer></script>
  <script src="${asset('js/'+C.country+'-tools-catalog.js')}" defer></script>
  <script src="${asset('js/country-tools-ui.js')}" defer></script>
</head>
<body>
<a class="tool-skip" href="#main">Skip to calculator</a>
<header class="tool-header"><div class="tool-header-inner"><a class="tool-brand" href="/">MortgagePro Global</a><nav aria-label="Main"><a href="/${C.landing}#tools">${C.label} tools</a><a href="/#calculators">Countries</a><a href="/blog">Guides</a></nav></div></header>
<main id="main" class="tool-main">
<nav class="tool-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/${C.landing}#${groupIDs[c.group]}">${C.label} ${esc(c.group)}</a> / ${esc(c.title)}</nav>
<p class="tool-eyebrow">${C.label} · ${C.currency} · ${esc(c.group)}</p>
<h1>${esc(c.title)}</h1><p class="tool-intro">${esc(c.description)}</p>
<p class="tool-meta">Updated October 25, 2026 · Enter current figures from your documents and quotes. Budget settings are editable. Inputs stay in this tab and are not saved or sent by the calculator.</p>
<p class="tool-notice">Rules reviewed ${C.reviewedOn}. ${esc(C.rules)}</p>
<div data-country-tool="${c.id}" class="tool-workspace">
<section class="tool-panel" aria-labelledby="inputs-heading"><h2 id="inputs-heading">Your inputs</h2>${state}<form novalidate autocomplete="off"><div class="tool-inputs">${c.fields.map(field).join('\n')}</div><div class="tool-actions"><button type="submit" class="tool-primary" hidden>Calculate estimate</button><button type="reset" class="tool-secondary">Reset example</button></div><p data-error class="tool-error" role="alert" tabindex="-1" hidden></p><p data-status class="tool-live-status" role="status" aria-live="polite"></p></form><noscript><p class="tool-notice">Enable JavaScript to calculate in your browser. The formulas and assumptions below remain available without JavaScript.</p></noscript></section>
<section class="tool-panel" data-result-panel hidden aria-labelledby="results-heading"><h2 id="results-heading">Your estimate</h2><div data-results tabindex="-1"><p class="tool-empty">Press Calculate estimate after entering your figures.</p></div><p class="tool-meta">Rounded display amounts may not add exactly. Calculations use unrounded intermediate values.</p></section>
</div>
<section class="tool-method" aria-labelledby="method-heading"><h2 id="method-heading">How this estimate works</h2><p>${esc(c.method)}</p><h2>Assumptions and limits</h2><ul>${c.notes.map(n=>'<li>'+esc(n)+'</li>').join('')}</ul><h2>References and further reading</h2><ul>${c.refs.map((u,i)=>`<li><a href="${esc(u)}" rel="noopener noreferrer">${esc(new URL(u).hostname.replace('www.',''))} — ${esc(referenceTitle(u))}</a></li>`).join('')}<li><a href="/methodology">Calculation methodology and rounding</a></li><li><a href="/corrections-policy">Report a calculation or content error</a></li></ul></section>
<section aria-labelledby="related-heading"><h2 id="related-heading">Related ${C.label} tools</h2><nav aria-label="Related calculators" class="tool-related">${related.map(r=>`<a href="${url(r.id)}">${esc(r.title)}</a>`).join('')}<a href="/${C.landing}#tools">All ${C.label} calculators</a></nav></section>
</main>
${footer}
</body>
</html>
`;
 fs.writeFileSync(path.join(dir,c.id+'.html'),html);
}
function referenceTitle(u){if(u.includes('bankofengland'))return 'Lending policy — check scope and effective date';if(u.includes('revenue.scot'))return 'Scottish purchase tax and relief rules';if(u.includes('gov.wales'))return 'Welsh purchase tax rates and rules';if(u.includes('moneyhelper'))return 'Mortgage guidance from MoneyHelper';return 'Official rules, rates and eligibility guidance';}
function card(c){return `<a href="${url(c.id)}" class="tc"><div class="tic" aria-hidden="true">🌐</div><div class="tn">${esc(c.title)}</div><div class="td">${esc(c.description)}</div><div class="ta" aria-hidden="true">›</div></a>`;}
let sections='<!-- COUNTRY TOOLS START -->\n';
for(const group of Object.keys(groupIDs))sections+=`<section class="section" id="${groupIDs[group]}"><div class="sec-hdr"><h2>${esc(group)}</h2></div><p>Enter current figures and press Calculate estimate. Editing or resetting clears the previous result.</p><div class="g2 country-tools-directory">${catalog.filter(c=>c.group===group).map(card).join('\n')}</div></section>\n`;
sections+='<!-- COUNTRY TOOLS END -->\n';
const landing=path.join(root,C.landing+'.html');let s=fs.readFileSync(landing,'utf8');
if(s.includes('<!-- COUNTRY TOOLS START -->'))s=s.replace(/<!-- COUNTRY TOOLS START -->[\s\S]*?<!-- COUNTRY TOOLS END -->\s*/,sections);
else if(country==='uk')s=s.replace(/    <!-- Core Mortgage Tools -->[\s\S]*?(?=    <!-- Resources -->)/,sections+'\n');
else if(C.directoryStart&&C.directoryEnd){const a=s.indexOf(C.directoryStart),b=s.indexOf(C.directoryEnd,a);if(a<0||b<a)throw Error('Missing country directory markers: '+country);s=s.slice(0,a)+sections+s.slice(b);}
else throw Error('No directory boundaries for '+country);
s=s.replace(/<link[^>]+href="\/css\/country-tools\.css[^"]*"[^>]*>\s*/g,'');
s=s.replace(/<script[^>]+src="\/js\/(?:mortgage-tools-core|[a-z]+-tools-models)\.js[^"]*"[^>]*><\/script>\s*/g,'');
s=s.replace('</head>',`<script src="${asset('js/mortgage-tools-core.js')}"></script>\n<script src="${asset('js/'+C.country+'-tools-models.js')}"></script>\n<link rel="stylesheet" href="${asset('css/country-tools.css')}">\n</head>`);fs.writeFileSync(landing,s);
const sitemap=path.join(root,'sitemap.xml'),marker=country.toUpperCase()+' TOOLS';let sm=fs.readFileSync(sitemap,'utf8').replace(new RegExp('\\s*<!-- '+marker+' START -->[\\s\\S]*?<!-- '+marker+' END -->'),'');
sm=sm.replace('</urlset>','\n<!-- '+marker+' START -->\n'+catalog.map(c=>`  <url><loc>https://mortgageproglobal.com${url(c.id)}</loc><lastmod>${C.reviewedOn}</lastmod></url>`).join('\n')+'\n<!-- '+marker+' END -->\n</urlset>');fs.writeFileSync(sitemap,sm);
console.log(`Built ${catalog.length} ${C.label} tool pages from ${new Set(catalog.map(c=>c.source)).size} app sources.`);
}
