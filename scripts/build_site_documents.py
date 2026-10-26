#!/usr/bin/env python3
"""Build plain-language publisher documents from their reviewable Markdown sources."""
from pathlib import Path
import re,html,json,hashlib
from build_us_articles import render
ROOT=Path(__file__).resolve().parents[1]
CONFIG={name:name for name in ['about','editorial-policy','corrections-policy','privacy-policy','cookie-policy','data-deletion-policy','contact','affiliate-disclosure','methodology','terms-and-conditions','disclaimer','data-sources','mortgage-faq']}
CONFIG['authors/abdul-raheem']='authors-abdul-raheem'
CONFIG['app-privacy-policy']='app-privacy-policy'
APP_SECTIONS={
 'About these apps':'app-privacy',
 'Covered apps and package identifiers':'covered-apps',
 'Calculator inputs, saved results and exports':'local-data',
 'Advertising through Google AdMob mediation':'advertising',
 'Google AdMob':'google-admob',
 'Meta Audience Network':'meta-audience-network',
 'Liftoff Monetize (Vungle)':'liftoff-monetize',
 'Unity Ads':'unity-ads',
 'Advertising choices and consent':'privacy-choices',
 'Firebase services and notifications':'firebase-services',
 'AI assistant: Gemini and Groq':'ai-assistant',
 'Reporting an AI response':'ai-reporting',
 'Feedback and support messages':'feedback',
 'Permissions, network requests and external links':'permissions',
 'Retention and deletion':'data-deletion',
 'Children and eligibility':'children',
 'Your rights, international processing and contact':'contact',
 'Policy changes':'policy-changes',
}
def mobile_links():
 links=[('app-privacy','Full app policy'),('covered-apps','Apps and package IDs'),('google-admob','Google AdMob'),('meta-audience-network','Meta'),('liftoff-monetize','Liftoff / Vungle'),('unity-ads','Unity Ads'),('privacy-choices','App privacy choices'),('ai-assistant','AI assistant'),('ai-reporting','AI reporting'),('data-deletion','App data deletion')]
 return '<nav class="privacy-jump-links" aria-label="Mobile app privacy sections">'+''.join('<a href="/app-privacy-policy#'+key+'">'+label+'</a>' for key,label in links)+'</nav>'
def build():
 revisions=json.loads((ROOT/'data/document-revisions.json').read_text())
 for slug,source in CONFIG.items():
  revision=revisions.get(slug,revisions['default'])
  p=ROOT/(slug+'.html');s=p.read_text();md=(ROOT/f'contents/Site/{source}.md').read_text();title=re.search(r'^# (.+)',md)[1];desc=re.search(r'^\*\*Meta description:\*\* (.+)',md,re.M)[1]
  s=re.sub(r'<title>[\s\S]*?</title>',lambda _:'<title>'+html.escape(title)+' | MortgagePro Global</title>',s,count=1)
  for attr,key,value in [('name','description',desc),('property','og:title',title),('property','og:description',desc),('name','twitter:title',title),('name','twitter:description',desc)]:
   pat=r'<meta\b(?=[^>]*\b'+attr+r'=[\"\x27]'+re.escape(key)+r'[\"\x27])[^>]*>'
   s=re.sub(pat,lambda _:f'<meta {attr}="{key}" content="{html.escape(value,quote=True)}">',s,count=1)
  main=re.search(r'<main\b[\s\S]*?</main>',s);assert main,slug
  before=s[:main.start()];has_hero=bool(re.search(r'<h1\b',before))
  before=re.sub(r'<h1[^>]*>[\s\S]*?</h1>',lambda _:'<h1>'+html.escape(title)+'</h1>',before,count=1)
  before=re.sub(r'<p class="subtitle">[\s\S]*?</p>',lambda _:'<p class="subtitle">'+html.escape(desc)+'</p>',before,count=1)
  if slug=='app-privacy-policy':
   before=before.replace('<li>Privacy Policy</li>','<li><a href="/privacy-policy">Website Privacy</a></li><li>Mobile App Privacy</li>')
  if 'POLICY_RATE_TABLE' in md:
   d=json.loads((ROOT/'data/rates.json').read_text());rows=['| Jurisdiction | Policy reference | Effective / observed | Source checked | Source |','|---|---|---|---|---|']
   for country,key in [('usa','fed'),('canada','boc'),('uk','boe'),('australia','rba'),('newzealand','ocr'),('india','repo'),('europe','ecb')]:
    a=d['rates'][country][key];rows.append('| '+country+' | '+a['formatted']+' | '+a['effectiveDate']+' | '+a['lastVerified']+' | [Official source]('+a['sourceUrl']+') |')
   md=md.replace('POLICY_RATE_TABLE','\n'.join(rows))
  body=render(md,slug)
  body=body.replace('<p>MOBILE_PRIVACY_LINKS</p>',mobile_links())
  if slug=='mortgage-faq':
   body=body.replace('<h2>Can an Indian or European repayment estimate calculate my tax benefit?</h2>','<h2 id="india-faq">Can an Indian or European repayment estimate calculate my tax benefit?</h2>').replace('<h2>How does credit affect the offer?</h2>','<h2 id="credit-score">How does credit affect the offer?</h2>')
  if slug=='privacy-policy':body=body.replace('<h2>Privacy controls</h2>','<h2 id="privacy-controls">Privacy controls</h2>')
  if slug=='app-privacy-policy':
   for heading,anchor in APP_SECTIONS.items():
    original='<h2>'+html.escape(heading,quote=False)+'</h2>'
    assert original in body,heading
    body=body.replace(original,'<h2 id="'+anchor+'" tabindex="-1">'+html.escape(heading,quote=False)+'</h2>')
  content='<main id="main-content"><article class="site-document content-article">'+('' if has_hero else '<h1>'+html.escape(title)+'</h1>')+'<p class="document-date">Document revision '+revision+' · Publisher: REO Technologies. Source observations have their own dates.</p>'+body+'</article></main>'
  s=before+content+s[main.end():]
  if slug=='app-privacy-policy':
   # This legal page has no rate display; avoid an unrelated API request.
   s=re.sub(r'<script\b[^>]*src="/js/(?:rates|rate-snapshot)\.js(?:\?[^\"]*)?"[^>]*></script>\s*','',s)
   def add_app_link(m):
    footer=m[0]
    if 'href="/app-privacy-policy#app-privacy"' not in footer:
     footer=footer.replace('<li><a href="/privacy-policy">Privacy Policy</a></li>','<li><a href="/privacy-policy">Privacy Policy</a></li>\n          <li><a href="/app-privacy-policy#app-privacy">Mobile App Privacy</a></li>')
    return footer
   s=re.sub(r'<footer\b[\s\S]*?</footer>',add_app_link,s)
  s=re.sub(r'<script\b[^>]*type=["\x27]application/ld\+json["\x27][^>]*>[\s\S]*?</script>','',s)
  schema={'@context':'https://schema.org','@type':'ProfilePage' if slug.startswith('authors/') else 'WebPage','name':title,'description':desc,'url':'https://mortgageproglobal.com/'+slug,'dateModified':revision,'publisher':{'@type':'Organization','name':'REO Technologies','url':'https://mortgageproglobal.com/about'}}
  if slug.startswith('authors/'):schema['mainEntity']={'@type':'Person','name':'Abdul Raheem'}
  if slug=='app-privacy-policy':
   apps=re.findall(r'^\|\s*(.*?)\s*\|\s*`(com\.reotech\.[^`]+)`\s*\|$',md,re.M)
   assert len(apps)==7 and len({package for _,package in apps})==7,'Expected seven distinct covered app packages'
   schema['about']=[{'@type':'SoftwareApplication','name':name,'identifier':package,'operatingSystem':'Android'} for name,package in apps]
  s=s.replace('</head>','<script type="application/ld+json">'+json.dumps(schema,ensure_ascii=False)+'</script>\n</head>')
  if '/css/site-documents.css' not in s:s=s.replace('</head>','<link rel="stylesheet" href="/css/site-documents.css">\n</head>')
  if slug=='app-privacy-policy':
   version=hashlib.sha256((ROOT/'css/app-privacy.css').read_bytes()).hexdigest()[:12]
   s=re.sub(r'<link[^>]+href="/css/app-privacy\.css[^"]*"[^>]*>\s*','',s)
   s=s.replace('</head>','<link rel="stylesheet" href="/css/app-privacy.css?v='+version+'">\n</head>')
  s=re.sub(r'\n{3,}','\n\n',s);p.write_text(s)
 sm=ROOT/'sitemap.xml';text=sm.read_text()
 for slug in ['',*CONFIG]:
  text=re.sub(r'(<url>\s*<loc>https://mortgageproglobal\.com/'+re.escape(slug)+r'</loc>[\s\S]*?<lastmod>)[^<]*(</lastmod>)',lambda m:m[1]+revisions.get(slug,revisions['default'])+m[2],text)
 sm.write_text(text)
 print(f'Built {len(CONFIG)} publisher, privacy and methodology documents.')
if __name__=='__main__':build()
