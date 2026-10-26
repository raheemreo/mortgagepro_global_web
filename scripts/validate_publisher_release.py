"""Block known publication regressions without fetching or inventing source checks."""
from pathlib import Path
from html.parser import HTMLParser
from collections import defaultdict
from urllib.parse import urlsplit
import json,re,xml.etree.ElementTree as ET
ROOT=Path(__file__).resolve().parents[1]
class Page(HTMLParser):
 def __init__(self):super().__init__();self.meta={};self.canonical=[];self.hrefs=[];self.ads=[];self.placeholders=0
 def handle_starttag(self,t,attrs):
  a=dict(attrs)
  if t=='meta':self.meta[a.get('name','')]=a.get('content','')
  if t=='link'and a.get('rel')=='canonical':self.canonical.append(a.get('href'))
  if t=='a':self.hrefs.append(a.get('href',''))
  if t=='script'and'adsbygoogle.js'in a.get('src',''):self.ads.append(a['src'])
  if'ad-unit'in a.get('class','').split():self.placeholders+=1
def validate():
 aliases=json.loads((ROOT/'data/tool-redirects.json').read_text());redirects={'/tools/'+c+'/'+a:'/tools/'+c+'/'+b for c,v in aliases.items()for a,b in v.items()}
 paths=list(ROOT.glob('*.html'))+list((ROOT/'authors').glob('*.html'))+list((ROOT/'blog').glob('*.html'))+list((ROOT/'tools').rglob('*.html'));descs=defaultdict(list);indexed=set()
 for p in paths:
  name=p.relative_to(ROOT).as_posix();route='/'+name[:-5]if p.name!='index.html'else'/'+name[:-10];s=p.read_text();h=Page();h.feed(s)
  assert h.canonical==['https://mortgageproglobal.com'+redirects.get(route,route)],(name,'canonical')
  assert h.meta.get('description'),(name,'description');descs[h.meta['description']].append(name)
  assert not h.placeholders and'a1b2c3d4e5f6789012345678901234ab'not in s,(name,'placeholder')
  for href in h.hrefs:
   u=urlsplit(href);assert href!='#',(name,'empty anchor')
   if u.netloc in('','mortgageproglobal.com'):assert u.path not in redirects,(name,'alias link',href)
  noindex='noindex'in h.meta.get('robots','')
  if not noindex and route not in redirects:indexed.add('https://mortgageproglobal.com'+route)
  if noindex and name!='privacy-settings.html':assert not h.ads,(name,'ad exclusion')
  if name=='privacy-settings.html':assert noindex and h.meta.get('mpg-ad-eligible')=='false'and len(h.ads)==1
  if h.ads:assert s.index('pauseAdRequests = 1')<s.index('src="https://pagead2'),(name,'pause order')
  if name=='usa-mortgage-calculator.html':
   assert '5.25 – 5.50%'not in s and'Latest observation: August'not in s and'mrc-chg dn'not in s
   assert 'data-rate="usa.fed"'in s and not re.search(r'<div class="mrc-val">[0-9.]+%',s)
  if name.startswith('tools/'):
   assert '/authors/abdul-raheem'in s and'data-result-notice'in s,(name,'attribution/notice')
   assert 'Worked 'in s or'Use confirmed tax-year inputs'in s,(name,'example')
   if not noindex:assert s.count('<details>')>=3 and'tool-explanation'in s,(name,'editorial gate')
 assert not{d:p for d,p in descs.items()if len(p)>1},'Duplicate descriptions'
 urls=[e.text for e in ET.parse(ROOT/'sitemap.xml').findall('.//{*}loc')]
 assert len(urls)==len(set(urls))and set(urls)==indexed,('sitemap',set(urls)^indexed)
 assert(ROOT/'ads.txt').read_text().strip()=='google.com, pub-1114757923146718, DIRECT, f08c47fec0942fa0'
 key='90248fba878891f4c5576dcd43220182';assert(ROOT/(key+'.txt')).read_text().strip()==key
 assert not(ROOT/'a1b2c3d4e5f6789012345678901234ab.txt').exists()
 assert'User-agent: Mediapartners-Google\nAllow: /'in(ROOT/'robots.txt').read_text()
 print(f'PASS: {len(paths)} HTML pages, {len(urls)} canonical sitemap entries, {len(redirects)} aliases; unique descriptions, index/ad/consent gates, ads.txt and IndexNow.')
if __name__=='__main__':validate()
