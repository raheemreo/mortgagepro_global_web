#!/usr/bin/env python3
"""Rebuild explanatory sections while retaining existing calculator controls/layout."""
from pathlib import Path
import re,json,html
from build_us_articles import render
ROOT=Path(__file__).resolve().parents[1]
FILES={'usa':'usa-mortgage-calculator','canada':'canada-mortgage-calculator','uk':'uk-mortgage-calculator','australia':'australia-mortgage-calculator','newzealand':'new-zealand-mortgage-calculator','india':'india-home-loan-emi-calculator','europe':'europe-mortgage-calculator'}
def div_end(s,start):
 depth=0
 for m in re.finditer(r'</?div\b[^>]*>',s[start:]):
  depth+=-1 if m[0].startswith('</') else 1
  if depth==0:return start+m.end()
 raise ValueError('Unbalanced div')
def build():
 revisions=json.loads((ROOT/'data/document-revisions.json').read_text())
 for country,slug in FILES.items():
  revision=revisions.get(slug,revisions['default']);p=ROOT/(slug+'.html');s=p.read_text();md=(ROOT/f'contents/Site/root-{country}.md').read_text();desc=re.search(r'^\*\*Meta description:\*\* (.+)',md,re.M)[1]
  for attr,key in [('name','description'),('property','og:description'),('name','twitter:description')]:
   pat=r'<meta\b(?=[^>]*\b'+attr+r'=[\"\x27]'+key+r'[\"\x27])[^>]*>'
   s=re.sub(pat,lambda _:f'<meta {attr}="{key}" content="{html.escape(desc,quote=True)}">',s,count=1)
  m=re.search(r'<section\b[^>]*class="content-article"[^>]*>[\s\S]*?</section>',s);assert m,slug
  opening=m[0].split('>')[0]+'>';heading_id=re.search(r'aria-labelledby="([^"]+)"',opening)
  title=re.search(r'^# (.+)',md)[1];heading='<h2'+(' id="'+heading_id[1]+'"' if heading_id else '')+'>'+title+'</h2>'
  replacement=opening+heading+'<p>Page revision '+revision+' · Scenario estimates; confirm actual lender and transaction terms.</p>'+render(md,slug)+'</section>'
  s=s[:m.start()]+replacement+s[m.end():]
  m=re.search(r'<div class="trust-section"[^>]*>',s)
  if m:
   end=div_end(s,m.start());note='<div class="trust-section" role="note"><h2>Sources and limits</h2><p>Published by <a href="/about">REO Technologies</a>. This page provides educational estimates under stated assumptions. No independent licensed financial review is claimed. Read our <a href="/methodology">methodology</a>, <a href="/editorial-policy">editorial policy</a> and <a href="/corrections-policy">corrections process</a>.</p></div>'
   s=s[:m.start()]+note+s[end:]
  def schema(m):
   d=json.loads(m[1]);typ=d.get('@type')
   if typ=='FAQPage':return ''
   if typ in ['WebApplication','SoftwareApplication']:
    d['description']=desc;d['dateModified']=revision;d['author']={'@type':'Organization','name':'REO Technologies'};d.pop('review',None);d.pop('aggregateRating',None)
   return '<script type="application/ld+json">'+json.dumps(d,ensure_ascii=False)+'</script>'
  s=re.sub(r'<script\b[^>]*type=["\x27]application/ld\+json["\x27][^>]*>([\s\S]*?)</script>',schema,s)
  s=s.replace('6x Cap','DTI thresholds').replace('7x Cap','DTI thresholds')
  s=re.sub(r'\n{3,}','\n\n',s);p.write_text(s)
 sm=ROOT/'sitemap.xml';text=sm.read_text()
 for slug in FILES.values():
  text=re.sub(r'(<url>\s*<loc>https://mortgageproglobal\.com/'+re.escape(slug)+r'</loc>[\s\S]*?<lastmod>)[^<]*(</lastmod>)',lambda m:m[1]+revisions.get(slug,revisions['default'])+m[2],text)
 sm.write_text(text)
 print('Built seven existing country calculator explanations and publisher disclosures.')
if __name__=='__main__':build()
