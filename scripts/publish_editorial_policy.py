"""Apply explicit editorial gates, honest attribution and sitemap exclusions."""
from pathlib import Path
import re,json,html
ROOT=Path(__file__).resolve().parents[1]
REVIEWED_BLOGS={'usa-mortgage-calculator','usa-piti-calculator','usa-amortization-calculator','usa-down-payment-calculator','usa-dti-calculator','usa-affordability-calculator','usa-fha-loan-calculator','usa-va-loan-calculator'}
AD_FREE_DOCS={'about.html','data-sources.html','mortgage-faq.html','abdul-raheem.html'}
PERSON='<span class="publisher-contact">Publisher contact: <a href="/authors/abdul-raheem">Abdul Raheem</a></span>'
def build():
 for p in list((ROOT/'blog').glob('*.html')):
  s=p.read_text();is_index=p.name=='index.html'
  if not is_index:
   if 'class="publisher-contact"' not in s:s=s.replace('<div class="article-meta">','<div class="article-meta">'+PERSON)
   s=re.sub(r'<span><strong>Originally published:</strong>[\s\S]*?</span>','',s)
   def schema(m):
    d=json.loads(m[1])
    if d.get('@type')=='Article':
     d.pop('datePublished',None)
     d['author']={'@type':'Organization','name':'REO Technologies','url':'https://mortgageproglobal.com/about'}
     d['accountablePerson']={'@type':'Person','name':'Abdul Raheem','url':'https://mortgageproglobal.com/authors/abdul-raheem'}
    return '<script type="application/ld+json">'+json.dumps(d,ensure_ascii=False)+'</script>'
   s=re.sub(r'<script[^>]+type="application/ld\+json"[^>]*>([\s\S]*?)</script>',schema,s)
   s=re.sub(r'Linked primary/public-authority references checked [^.]*\.', 'References below describe the relevant framework; confirm the source date and the rules for your own transaction.',s)
   if p.stem not in REVIEWED_BLOGS:
    s=re.sub(r'<meta name="robots" content="[^"]*">\s*','',s)
    s=s.replace('</head>','<meta name="robots" content="noindex,follow">\n</head>')
    s=re.sub(r'<script[^>]+src="https://pagead2\.googlesyndication\.com/[^\"]*"[^>]*></script>\s*','',s)
   else:
    s=re.sub(r'<meta name="robots" content="noindex,follow">\s*','',s)
   # Notice follows an interactive output, regardless of whether it is expanded.
   s=re.sub(r'<p class="result-education">[\s\S]*?</p>','',s)
   s=re.sub(r'(<div[^>]*data-results[^>]*>[\s\S]*?</div>)',r'\1<p class="result-education">Educational estimate, not financial advice. <a href="/disclaimer">Disclaimer</a> · <a href="/methodology">Methodology</a> · <a href="/corrections-policy">Corrections</a>.</p>',s,count=1)
  p.write_text(s)
 for p in list(ROOT.glob('*.html'))+list((ROOT/'authors').glob('*.html')):
  s=p.read_text()
  if p.name in AD_FREE_DOCS:s=re.sub(r'<script[^>]+src="https://pagead2\.googlesyndication\.com/[^\"]*"[^>]*></script>\s*','',s)
  if p.name.endswith('calculator.html'):
   if 'class="publisher-contact"' not in s:s=s.replace('<div class="trust-section" role="note">','<div class="trust-section" role="note"><p>'+PERSON+'</p>')
   s=re.sub(r'<p class="root-result-education">[\s\S]*?</p>','',s)
   # Stay visible beside the input/result area without triggering a calculation.
   notice='<p class="root-result-education">Educational estimate, not financial advice. <a href="/disclaimer">Disclaimer</a> · <a href="/methodology">Methodology</a> · <a href="/corrections-policy">Corrections</a>.</p>'
   s=re.sub(r'(<section\b[^>]*id="(?:us|canada|uk|au|nz|india|eu)-results"[^>]*>)',lambda m:m[1]+notice,s,count=1)
  p.write_text(s)
 p=ROOT/'sitemap.xml';s=p.read_text()
 def sitemap(m):
  url=m[1];slug=url.removeprefix('https://mortgageproglobal.com/');f=ROOT/(slug+'index.html'if slug.endswith('/')else slug+'.html'if slug else'index.html')
  return ''if f.is_file()and re.search(r'<meta name="robots" content="noindex,follow">',f.read_text())else m[0]
 s=re.sub(r'\s*<url>\s*<loc>([^<]+)</loc>[\s\S]*?</url>',sitemap,s);p.write_text(s)
 print('Applied source-linked publisher attribution and explicit index/ad exclusions to unreviewed content.')
if __name__=='__main__':build()
