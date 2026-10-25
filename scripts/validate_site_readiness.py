#!/usr/bin/env python3
"""Source-level checks for privacy, publisher claims, references and local navigation."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
import re,json,sys
ROOT=Path(__file__).resolve().parents[1]
class Page(HTMLParser):
 def __init__(self):super().__init__();self.ids=[];self.links=[];self.scripts=[];self.h1=0
 def handle_starttag(self,t,attrs):
  a=dict(attrs)
  if 'id' in a:self.ids.append(a['id'])
  if t=='a':self.links.append(a.get('href',''))
  if t=='script' and 'src' in a:self.scripts.append(a['src'])
  if t=='h1':self.h1+=1
paths=list(ROOT.glob('*.html'))+list((ROOT/'blog').glob('*.html'))+list((ROOT/'authors').glob('*.html'))
pages={p:Page() for p in paths}
for p,h in pages.items():h.feed(p.read_text())
issues=[]
rates=json.loads((ROOT/'data/rates.json').read_text())['rates']
for p,h in pages.items():
 s=p.read_text();name=str(p.relative_to(ROOT))
 for key in re.findall(r'data-rate="([^"]+)"',s):
  country,instrument=key.split('.')
  if instrument not in rates.get(country,{}):issues.append((name,'unverified rate label',key))
 if len(h.ids)!=len(set(h.ids)):issues.append((name,'duplicate IDs'))
 if h.h1!=1:issues.append((name,'expected one H1',h.h1))
 if s.count('data-mpg-consent')!=1:issues.append((name,'consent default count'))
 if "'region':" in s and "'ad_storage':" in s:issues.append((name,'regional-only default'))
 ads=[u for u in h.scripts if 'adsbygoogle.js' in u]
 if len(ads)>1:issues.append((name,'duplicate ad loader'))
 if ads and s.index("gtag('consent', 'default'")>s.index('src="https://pagead2'):issues.append((name,'ad before consent'))
 if re.search(r'gtag\(["\x27]config|clarity\.ms/(?:tag|script)|googletagmanager\.com/(?:gtag|gtm)',s):issues.append((name,'optional analytics loader/config'))
 if re.search(r"logEvent\([^\n]+value:",s):issues.append((name,'financial event payload'))
 if p.name!='app-privacy-policy.html' and re.search(r'Lead Financial Systems Engineer|Verified Lead Technical Reviewer|WCAG 2\.1 AA compliance|strict Service Level',s):issues.append((name,'unverified claim'))
 for link in h.links:
  u=urlsplit(link)
  if u.scheme and u.netloc!='mortgageproglobal.com':continue
  if link.startswith(('mailto:','tel:','javascript:')):continue
  if not u.path:target=p
  else:
   stem=unquote(u.path).lstrip('/') if u.path.startswith('/') else str(p.parent.relative_to(ROOT)/unquote(u.path))
   if u.path=='/':stem='index.html'
   candidates=[ROOT/stem,ROOT/(stem+'.html'),ROOT/stem/'index.html']
   target=next((x for x in candidates if x.is_file()),None)
   if target is None:issues.append((name,'missing local path',link));continue
  if u.fragment and u.fragment not in pages.get(target,Page()).ids:issues.append((name,'missing fragment',link))
# No checked-in credential fallback or unrelated project secret scan.
updater=(ROOT/'scripts/fetch_live_rates.js').read_text()
if re.search(r"fredApiKey\s*=\s*['\x22]|flutterEnvPath|secrets\.properties",updater):issues.append(('updater','credential fallback'))
if issues:
 for issue in issues:print(issue)
 sys.exit(1)
print(f'PASS: {len(paths)} HTML pages; single H1/unique IDs, links/fragments, consent ordering, no optional tracking or financial event fields.')
