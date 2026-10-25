#!/usr/bin/env python3
"""Build plain-language publisher documents from their reviewable Markdown sources."""
from pathlib import Path
import re,html,json
from build_us_articles import render
ROOT=Path(__file__).resolve().parents[1]
CONFIG={name:name for name in ['about','editorial-policy','corrections-policy','privacy-policy','cookie-policy','data-deletion-policy','contact','affiliate-disclosure','methodology','terms-and-conditions','disclaimer','data-sources','mortgage-faq']}
CONFIG['authors/abdul-raheem']='authors-abdul-raheem'
def build():
 for slug,source in CONFIG.items():
  p=ROOT/(slug+'.html');s=p.read_text();md=(ROOT/f'contents/Site/{source}.md').read_text();title=re.search(r'^# (.+)',md)[1];desc=re.search(r'^\*\*Meta description:\*\* (.+)',md,re.M)[1]
  s=re.sub(r'<title>[\s\S]*?</title>',lambda _:'<title>'+html.escape(title)+' | MortgagePro Global</title>',s,count=1)
  for attr,key,value in [('name','description',desc),('property','og:title',title),('property','og:description',desc),('name','twitter:title',title),('name','twitter:description',desc)]:
   pat=r'<meta\b(?=[^>]*\b'+attr+r'=[\"\x27]'+re.escape(key)+r'[\"\x27])[^>]*>'
   s=re.sub(pat,lambda _:f'<meta {attr}="{key}" content="{html.escape(value,quote=True)}">',s,count=1)
  main=re.search(r'<main\b[\s\S]*?</main>',s);assert main,slug
  before=s[:main.start()];has_hero=bool(re.search(r'<h1\b',before))
  before=re.sub(r'<h1[^>]*>[\s\S]*?</h1>',lambda _:'<h1>'+html.escape(title)+'</h1>',before,count=1)
  before=re.sub(r'<p class="subtitle">[\s\S]*?</p>',lambda _:'<p class="subtitle">'+html.escape(desc)+'</p>',before,count=1)
  if 'POLICY_RATE_TABLE' in md:
   d=json.loads((ROOT/'data/rates.json').read_text());rows=['| Jurisdiction | Policy reference | Effective | Checked | Source |','|---|---|---|---|---|']
   for country,key in [('usa','fed'),('canada','boc'),('uk','boe'),('australia','rba'),('newzealand','ocr'),('india','repo'),('europe','ecb')]:
    a=d['rates'][country][key];rows.append('| '+country+' | '+a['formatted']+' | '+a['effectiveDate']+' | '+a['lastVerified']+' | [Official source]('+a['sourceUrl']+') |')
   md=md.replace('POLICY_RATE_TABLE','\n'.join(rows))
  body=render(md,slug)
  if slug=='mortgage-faq':
   body=body.replace('<h2>Can an Indian or European repayment estimate calculate my tax benefit?</h2>','<h2 id="india-faq">Can an Indian or European repayment estimate calculate my tax benefit?</h2>').replace('<h2>How does credit affect the offer?</h2>','<h2 id="credit-score">How does credit affect the offer?</h2>')
  if slug=='privacy-policy':body=body.replace('<h2>Privacy controls</h2>','<h2 id="privacy-controls">Privacy controls</h2>')
  content='<main id="main-content"><article class="site-document content-article">'+('' if has_hero else '<h1>'+html.escape(title)+'</h1>')+'<p class="document-date">Updated October 25, 2026 · Publisher: REO Technologies</p>'+body+'</article></main>'
  s=before+content+s[main.end():]
  s=re.sub(r'<script\b[^>]*type=["\x27]application/ld\+json["\x27][^>]*>[\s\S]*?</script>','',s)
  schema={'@context':'https://schema.org','@type':'ProfilePage' if slug.startswith('authors/') else 'WebPage','name':title,'description':desc,'url':'https://mortgageproglobal.com/'+slug,'dateModified':'2026-10-25','publisher':{'@type':'Organization','name':'REO Technologies','url':'https://mortgageproglobal.com/about'}}
  if slug.startswith('authors/'):schema['mainEntity']={'@type':'Person','name':'Abdul Raheem'}
  s=s.replace('</head>','<script type="application/ld+json">'+json.dumps(schema,ensure_ascii=False)+'</script>\n</head>')
  if '/css/site-documents.css' not in s:s=s.replace('</head>','<link rel="stylesheet" href="/css/site-documents.css">\n</head>')
  s=re.sub(r'\n{3,}','\n\n',s);p.write_text(s)
 sm=ROOT/'sitemap.xml';text=sm.read_text()
 for slug in ['',*CONFIG]:
  text=re.sub(r'(<url>\s*<loc>https://mortgageproglobal\.com/'+re.escape(slug)+r'</loc>[\s\S]*?<lastmod>)[^<]*(</lastmod>)',lambda m:m[1]+'2026-10-25'+m[2],text)
 sm.write_text(text)
 print('Built 14 publisher, privacy and methodology documents.')
if __name__=='__main__':build()
