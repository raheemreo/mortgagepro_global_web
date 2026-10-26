/* Editorial publication layer; models and form behavior are deliberately unchanged. */
'use strict';
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),redirects=require('../data/tool-redirects.json'),editorial=require('../contents/Tools/mortgage-editorial.json');
const fixture={usa:require('../tests/fixtures/us-tools-inputs.json'),canada:require('../tests/fixtures/canada-tools-inputs.json'),...require('../tests/fixtures/country-tools-inputs.json')};
const countries={usa:['us','United States','USD'],canada:['canada','Canada','CAD'],uk:['uk','United Kingdom','GBP'],australia:['australia','Australia','AUD'],newzealand:['newzealand','New Zealand','NZD'],india:['india','India','INR'],europe:['europe','Europe','EUR']};
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function examples(country,c){
 const [file,label,currency]=countries[country],C=require('../js/'+file+'-tools-catalog'),M=require('../js/'+file+'-tools-models');
 const input=fixture[country][c.id];
 if(c.fields.some(f=>input[f.key]===''||input[f.key]===undefined))return '<section class="worked-example"><h2>Use confirmed tax-year inputs</h2><p>No static tax example is published here because a deduction and applicable tax-year limits must first be confirmed. The working calculator accepts your own documented amounts. This page is excluded from indexing and advertising pending that editorial review.</p></section>';
 const result=M.calculate(c.id,C.validate(c.id,input));
 const value=(v,type)=>typeof v!=='number'?esc(v):type==='money'?new Intl.NumberFormat('en-US',{style:'currency',currency,maximumFractionDigits:2}).format(v):new Intl.NumberFormat('en-US',{maximumFractionDigits:6}).format(v)+(type==='percent'?'%':'');
 const entries=c.fields.map(f=>`<tr><th scope="row">${esc(f.label)}</th><td>${f.type==='select'?esc((f.options.find(o=>o[0]===String(input[f.key]))||[])[1]||input[f.key]):value(input[f.key])}</td></tr>`).join('');
 const metrics=result.metrics.slice(0,6).map(m=>`<tr><th scope="row">${esc(m.label)}</th><td>${m.value===null?'Not defined for this scenario':value(m.value,m.unit)}</td></tr>`).join('');
 return `<section class="worked-example" aria-labelledby="example-heading"><h2 id="example-heading">Worked ${esc(label)} example: ${esc(c.title)}</h2><p>This is a hypothetical arithmetic example in ${currency}, not a current lender quote, market observation or borrower record. The same calculator model produces the figures below. Its input assumptions are shown so that you can reproduce or change the scenario.</p><div class="tool-table-scroll" tabindex="0" role="region" aria-label="Illustrative input assumptions"><table><thead><tr><th scope="col">Assumed input</th><th scope="col">Illustration value</th></tr></thead><tbody>${entries}</tbody></table></div><div class="tool-table-scroll" tabindex="0" role="region" aria-label="Worked calculator output"><table><thead><tr><th scope="col">Calculated measure</th><th scope="col">Result</th></tr></thead><tbody>${metrics}</tbody></table></div><p>Amounts use unrounded intermediate arithmetic and are rounded only for display. Selecting different costs, rates, payment dates or terms changes the result; no illustration value is prefilled into your personal financial fields.</p></section>`;
}
function build(options={}){
 for(const[country,[file,label]]of Object.entries(countries)){
  if(options.country&&options.country!==country)continue;
  const C=require('../js/'+file+'-tools-catalog');
  for(const c of C.catalog){
   const p=path.join(root,'tools',country,c.id+'.html');if(!fs.existsSync(p))continue;
   let s=fs.readFileSync(p,'utf8');
   s=s.replace(/<!-- EDITORIAL CONTENT -->[\s\S]*?<!-- END EDITORIAL CONTENT -->\s*/g,'').replace(/<p class="tool-byline">[\s\S]*?<\/p>\s*/g,'');
   s=s.replace(/<p class="tool-notice"(?: data-result-notice)?>Educational estimate, not financial advice\.[\s\S]*?<\/p>/g,'');
   const alias=redirects[country]?.[c.id],reviewed=c.id==='mortgage'&&!alias;
   s=s.replace(/<meta name="robots" content="[^"]*">\s*/g,'');
   if(!reviewed)s=s.replace('</head>','<meta name="robots" content="noindex,follow">\n</head>');
   s=s.replace(/(<link rel="canonical" href=")[^"]*(">)/,(_,a,b)=>a+'https://mortgageproglobal.com/tools/'+country+'/'+(alias||c.id)+b);
   const description=label+' — '+c.title+'. '+c.description;
   s=s.replace(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,(all,json)=>{const d=JSON.parse(json);if(d['@type']==='WebApplication'){d.description=description;d.dateModified=editorial.reviewedOn;}return '<script type="application/ld+json">'+JSON.stringify(d)+'</script>';});
   s=s.replace(/(<meta (?:name="description"|property="og:description") content=")[^"]*(">)/g,(_,a,b)=>a+esc(description)+b);
   s=s.replace(/(<title>)[\s\S]*?(<\/title>)/,(_,a,b)=>a+esc(label+' '+c.title)+' | MortgagePro Global'+b);
   const byline=`<p class="tool-byline">Published by <a href="/about">REO Technologies</a> · Publisher contact: <a href="/authors/abdul-raheem">Abdul Raheem</a>. Explanation and example arithmetic revised ${editorial.reviewedOn}; source-specific dates are stated separately. No licensed financial review is claimed.</p>`;
   s=s.replace(/(<h1>[\s\S]*?<\/h1>)/,'$1\n'+byline);
   s=s.replace(/Rules reviewed /g,'Reference scope documented ').replace(/Updated October 25, 2026 · /g,'');
   s=s.replace(/(<p class="tool-meta">)Rounded display amounts/,`<p class="tool-notice" data-result-notice>Educational estimate, not financial advice. <a href="/disclaimer">Disclaimer</a> · <a href="/methodology">Methodology</a> · <a href="/corrections-policy">Corrections</a>.</p>$1Rounded display amounts`);
   const written=reviewed?editorial[country].sections.map(([h,t])=>'<h2>'+esc(h)+'</h2><p>'+esc(t)+'</p>').join(''):'';
   const faq=reviewed?'<section aria-labelledby="tool-faq-heading"><h2 id="tool-faq-heading">Questions about this '+esc(label)+' mortgage estimate</h2>'+editorial[country].faqs.map(([q,a])=>'<details><summary>'+esc(q)+'</summary><p>'+esc(a)+'</p></details>').join('')+'</section>':'';
   const content='<!-- EDITORIAL CONTENT -->'+(reviewed?'<section class="tool-explanation">'+written+'</section>':'')+examples(country,c)+faq+'<!-- END EDITORIAL CONTENT -->\n';
   s=s.replace(/(?=<section aria-labelledby="related-heading">)/,content);
   fs.writeFileSync(p,s);
  }
 }
 const flat={};for(const[c,aliases]of Object.entries(redirects))for(const[from,to]of Object.entries(aliases))flat['/tools/'+c+'/'+from]='/tools/'+c+'/'+to;
 const files=[];function visit(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){if(['.git','Designs','node_modules','audit'].includes(e.name))continue;const p=path.join(dir,e.name);if(e.isDirectory())visit(p);else if(e.name.endsWith('.html'))files.push(p);}}visit(root);
 for(const p of files){let s=fs.readFileSync(p,'utf8');
  s=s.replace(/<a\b[^>]*href="(\/tools\/[^"?#]+)"[^>]*class="tc"[^>]*>[\s\S]*?<\/a>/g,(all,url)=>flat[url]?'':all);
  s=s.replace(/href="(\/tools\/[^"?#]+)([?#][^"]*)?"/g,(all,url,tail)=>flat[url]?'href="'+flat[url]+(tail||'')+'"':all);
  // Related lists can otherwise repeat the same survivor after alias resolution.
  s=s.replace(/<nav aria-label="Related calculators"[\s\S]*?<\/nav>/g,nav=>{const seen=new Set();return nav.replace(/<a\b[^>]*href="([^"]+)"[^>]*>[\s\S]*?<\/a>/g,(a,u)=>seen.has(u)?'':(seen.add(u),a));});
  fs.writeFileSync(p,s);
 }
 const worker=path.join(root,'_worker.js');let w=fs.readFileSync(worker,'utf8');
 const block='// TOOL REDIRECTS START\nconst TOOL_REDIRECTS = '+JSON.stringify(flat,null,2)+';\n// TOOL REDIRECTS END\n';
 w=/\/\/ TOOL REDIRECTS START/.test(w)?w.replace(/\/\/ TOOL REDIRECTS START[\s\S]*?\/\/ TOOL REDIRECTS END\n/,block):block+w;fs.writeFileSync(worker,w);
 const sitemap=path.join(root,'sitemap.xml');let sm=fs.readFileSync(sitemap,'utf8');
 sm=sm.replace(/\s*<url>\s*<loc>([^<]+)<\/loc>[\s\S]*?<\/url>/g,(all,url)=>{const u=new URL(url),relative=u.pathname.replace(/^\//,'');const p=path.join(root,relative?(relative.endsWith('/')?relative+'index.html':relative+'.html'):'index.html');if(flat[u.pathname])return '';if(fs.existsSync(p)&&/name="robots" content="noindex,follow"/.test(fs.readFileSync(p,'utf8')))return '';return all;});
 sm=sm.replace(/(<url><loc>https:\/\/mortgageproglobal.com\/tools\/[^<]+<\/loc><lastmod>)[^<]+(<\/lastmod>)/g,(_,a,b)=>a+editorial.reviewedOn+b);
 fs.writeFileSync(sitemap,sm);
 console.log('Published reviewed mortgage explanations; retained other calculators with noindex,follow; consolidated '+Object.keys(flat).length+' proven aliases.');
}
if(require.main===module)build();module.exports={build,examples};
