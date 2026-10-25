#!/usr/bin/env python3
"""Check generated US article structure, sources, metadata and internal targets."""
from pathlib import Path
from html.parser import HTMLParser
import html, json, re, sys
ROOT=Path(__file__).resolve().parents[1]
class Page(HTMLParser):
    def __init__(self):
        super().__init__(); self.ids=[];self.links=[];self.metas={};self.canonical=None;self.labels=[];self.fields=[];self.scripts=[];self.script=None;self.h1=[];self.title=[];self.current=None;self.calc=0
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if 'id' in a:self.ids.append(a['id'])
        if tag=='a':self.links.append(a.get('href',''))
        if tag=='meta':self.metas[a.get('name',a.get('property',''))]=a.get('content','')
        if tag=='link' and a.get('rel')=='canonical':self.canonical=a['href']
        if tag=='label':self.labels.append(a.get('for'))
        if tag in ('input','select'):self.fields.append(a)
        if tag=='script' and a.get('type')=='application/ld+json':self.script=''
        if tag in ('h1','title'):self.current=tag
        if 'data-us-calculator' in a:self.calc+=1
    def handle_data(self,data):
        if self.script is not None:self.script+=data
        if self.current=='h1':self.h1.append(data)
        if self.current=='title':self.title.append(data)
    def handle_endtag(self,tag):
        if tag=='script' and self.script is not None:self.scripts.append(json.loads(self.script));self.script=None
        if tag==self.current:self.current=None

def target_exists(url):
    path=url.split('#')[0].split('?')[0].lstrip('/')
    return not path or any(p.is_file() for p in [ROOT/path,ROOT/(path+'.html'),ROOT/path/'index.html'])

count=0
for path in sorted((ROOT/'blog').glob('usa-*.html')):
    raw=path.read_text();page=Page();page.feed(raw)
    source=(ROOT/'contents/USA'/path.with_suffix('.md').name).read_text()
    heading=re.search(r'^# (.+)',source)[1]
    desc=re.search(r'^\*\*Meta description:\*\* (.+)',source,re.M)[1]
    assert ''.join(page.h1)==heading,(path,'h1')
    assert ''.join(page.title)==heading+' | MortgagePro Global',(path,'title')
    for key,value in [('description',desc),('og:title',heading),('og:description',desc),('twitter:title',heading),('twitter:description',desc)]:assert page.metas[key]==value,(path,key)
    assert page.canonical=='https://mortgageproglobal.com/blog/'+path.stem
    a=next(s for s in page.scripts if s.get('@type')=='Article')
    assert a['headline']==heading and a['description']==desc and a['dateModified']=='2026-10-25'
    assert a['datePublished']<'2026-10-25'
    assert a['author']=={'@type':'Organization','name':'REO Technologies','url':'https://mortgageproglobal.com/about'}
    assert len(page.ids)==len(set(page.ids)),(path,'duplicate IDs')
    assert page.calc==1
    for f in page.fields:assert f['id'] in page.labels,(path,'unlabeled input',f)
    for link in page.links:
        if link.startswith('/') and not link.startswith('//'):assert target_exists(link),(path,'missing target',link)
        if link.startswith('#') and link!='#':assert link[1:] in page.ids,(path,'missing fragment',link)
    article=raw[raw.index('<article'):raw.index('</article>')]
    assert re.search(r'href="https://(?:www\.)?(?:consumerfinance\.gov|hud\.gov|va\.gov|selling-guide\.fanniemae\.com|yourhome\.fanniemae\.com|freddiemac\.com)',article),(path,'no primary source')
    assert 'no independent licensed financial review is claimed' in article.lower()
    assert not re.search(r'\{\{|maximum safe|Qualified Cap|43% QM|Lead Financial Systems Engineer|Math\.pow',article),(path,'stale content/widget')
    assert raw.index("gtag('consent', 'default'")<raw.index('src="https://pagead2.googlesyndication.com')
    index=(ROOT/'blog/index.html').read_text()
    card=re.search(r'<a href="/blog/'+path.stem+r'" class="blog-card"[\s\S]*?</a>',index)[0]
    assert html.escape(heading) in card and html.escape(desc) in card
    assert 'Updated October 2026' in card
    assert (ROOT/'sitemap.xml').read_text().count('https://mortgageproglobal.com/blog/'+path.stem+'<')==1
    count+=1
assert count==8
print('PASS: 8 articles; source/body/metadata/index synchronization, JSON-LD, labels, unique IDs, local links, consent ordering.')
