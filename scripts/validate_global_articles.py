#!/usr/bin/env python3
"""Validate all 35 non-US articles and the complete 43-article inventory."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlparse
import html, json, re, collections
from build_global_articles import CONFIG
ROOT=Path(__file__).resolve().parents[1]
class Page(HTMLParser):
    def __init__(self):
        super().__init__(); self.ids=[];self.links=[];self.metas={};self.canonical=None;self.labels=[];self.fields=[];self.scripts=[];self.script=None;self.h1=[];self.title=[];self.current=None;self.widgets=[]
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
        if 'data-global-calculator' in a:self.widgets.append(a)
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

index=(ROOT/'blog/index.html').read_text();sitemap=(ROOT/'sitemap.xml').read_text()
authorities={'cmhc-schl.gc.ca','canada.ca','osfi-bsif.gc.ca','gov.uk','gov.wales','bankofengland.co.uk','moneyhelper.org.uk','apra.gov.au','moneysmart.gov.au','firsthomebuyers.gov.au','qro.qld.gov.au','sro.vic.gov.au','nsw.gov.au','rbnz.govt.nz','ird.govt.nz','kaingaora.govt.nz','sorted.org.nz','consumerfinance.gov'}
count=0;widgets=0;countries=collections.Counter()
for slug,c in CONFIG.items():
    path=ROOT/f'blog/{slug}.html';raw=path.read_text();page=Page();page.feed(raw)
    source=(ROOT/c['source']).read_text();countries[Path(c['source']).parts[1]]+=1
    heading=re.search(r'^# (.+)',source)[1];desc=re.search(r'^\*\*Meta description:\*\* (.+)',source,re.M)[1]
    assert ''.join(page.h1)==heading,(slug,'h1')
    assert ''.join(page.title)==heading+' | MortgagePro Global',(slug,'title')
    for key,value in [('description',desc),('og:title',heading),('og:description',desc),('twitter:title',heading),('twitter:description',desc)]:assert page.metas[key]==value,(slug,key)
    assert page.canonical=='https://mortgageproglobal.com/blog/'+slug,(slug,'canonical')
    schemas=[s for s in page.scripts if s.get('@type')=='Article'];assert len(schemas)==1
    a=schemas[0]
    assert a['headline']==heading and a['description']==desc and a['dateModified']=='2026-10-25',(slug,'Article schema')
    assert a['datePublished']<'2026-10-25',(slug,'original date')
    assert a['author']=={'@type':'Organization','name':'REO Technologies','url':'https://mortgageproglobal.com/about'},slug
    assert len(page.ids)==len(set(page.ids)),(slug,'duplicate IDs')
    assert len(page.widgets)==bool(c['model']),(slug,'widget count')
    if c['model']:
        w=page.widgets[0];assert w['data-global-calculator']==c['model'] and w['data-currency']==c['currency'],slug
        assert '/js/global-blog-calculators.js' in raw;widgets+=1
    for f in page.fields:assert f['id'] in page.labels,(slug,'unlabeled input',f)
    for link in page.links:
        if link.startswith('/') and not link.startswith('//'):assert target_exists(link),(slug,'missing target',link)
        if link.startswith('#') and link!='#':assert link[1:] in page.ids,(slug,'missing fragment',link)
    article=raw[raw.index('<article'):raw.index('</article>')]
    assert any(urlparse(link).hostname and urlparse(link).hostname.removeprefix('www.') in authorities for link in re.findall(r'href="(https://[^"]+)"',article)),(slug,'no public/primary authority')
    assert 'No independent licensed financial review is claimed.' in article
    assert not re.search(r'<!-- calculator -->|\{\{|Lead Financial Systems Engineer|Math\.pow|data-rate-',article),(slug,'stale body')
    assert raw.index("gtag('consent', 'default'")<raw.index('src="https://pagead2.googlesyndication.com'),(slug,'consent order')
    card=re.search(r'<a href="/blog/'+slug+r'" class="blog-card"[\s\S]*?</a>',index)[0]
    assert html.escape(heading) in card and html.escape(desc) in card and 'Updated October 2026' in card,(slug,'index card')
    assert sitemap.count('https://mortgageproglobal.com/blog/'+slug+'<')==1,(slug,'sitemap')
    count+=1
assert countries=={'Canada':9,'UK':9,'Australia':8,'New Zealand':8,'General':1},countries
assert count==35 and widgets==30,(count,widgets)
slugs={p.stem for p in (ROOT/'blog').glob('*.html') if p.stem!='index'}
assert slugs==set(CONFIG)|{p.stem for p in (ROOT/'blog').glob('usa-*.html')} and len(slugs)==43
assert len(re.findall(r'class="blog-card"',index))==43
print('PASS: 35 non-US articles, 30 widgets; complete 43-article inventory, sources, metadata, links, labels and consent order.')
