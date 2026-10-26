#!/usr/bin/env python3
"""Rebuild the eight US article bodies and synchronized metadata; Python stdlib only.

Markdown subset: paragraphs, ##/### headings, - lists, pipe tables, **bold**,
inline code and links. This is deliberately restricted to the editorial source
files in contents/USA; unsupported markdown should be added here before use.
"""
from pathlib import Path
import re, html, json, hashlib
ROOT = Path(__file__).resolve().parents[1]
DATE = '2026-10-26'
DISPLAY_DATE = 'October 26, 2026'
BASE = 'https://mortgageproglobal.com'

# (name, label, default, minimum, maximum, step); select defaults are explicit.
def number(name, label, value, minimum=0, maximum=100000000, step='any'):
    return (name, label, value, minimum, maximum, step)

def select(name, label, choices):
    return (name, label, choices)

RATE = number('rate', 'Annual note rate (%) — editable assumption', 7.32, 0, 30)
YEARS = number('years', 'Term (whole years)', 30, 1, 40, 1)
PRICE = number('price', 'Purchase price (USD)', 412500, 0.01)
DOWN = number('down', 'Cash down payment (USD)', 41250)
PMI_RATE = number('pmiRate', 'Assumed annual PMI rate (%) — not a quote', .45, 0, 10)
FINANCE = select('finance', 'Finance the upfront fee/premium?', [('yes','Yes'),('no','No — pay in cash')])
CONFIG = {
'usa-mortgage-calculator': ('mortgage', 'Try the fixed-rate payment calculation', [PRICE, DOWN, RATE, YEARS]),
'usa-affordability-calculator': ('affordability', 'Try your affordability assumptions', [number('income','Annual gross qualifying income (USD)',100800,.01), number('debts','Other monthly debt payments (USD)',500), DOWN, RATE, YEARS, number('tax','Annual property tax estimate (USD)',6000), number('insurance','Annual homeowners insurance (USD)',1800), number('hoa','Monthly HOA dues (USD)',0), number('pmiRate','Assumed annual PMI rate (%) — not a quote',.5,0,10), number('front','Housing planning ratio (%)',28,1,100), number('back','Total debt planning ratio (%)',36,1,100)]),
'usa-amortization-calculator': ('amortization','Explore the payment schedule',[number('loan','Starting loan principal (USD)',371250,.01),RATE,YEARS,number('extra','Extra principal every month (USD)',0)]),
'usa-down-payment-calculator': ('down','Try a down-payment scenario',[PRICE,number('percent','Down payment (%)',10,0,100),RATE,YEARS,PMI_RATE]),
'usa-dti-calculator': ('dti','Calculate your two debt ratios',[number('income','Gross monthly qualifying income (USD)',8400,.01),number('housing','Total monthly housing incl. MI and HOA (USD)',2350),number('auto','Monthly auto/lease payments (USD)',410),number('student','Qualifying monthly student loan payment (USD)',280),number('cards','Monthly credit-card minimums (USD)',150),number('other','Other counted monthly obligations (USD)',0)]),
'usa-fha-loan-calculator': ('fha','Estimate a standard 30-year FHA purchase',[number('price','Purchase price (USD)',300000,.01),number('percent','Down payment (%) — eligibility not checked',3.5,3.5,99.99),number('rate','Assumed annual note rate (%) — not a quote',6.5,0,30),FINANCE]),
'usa-piti-calculator': ('piti','Build a monthly housing budget',[PRICE,DOWN,RATE,YEARS,number('tax','Annual property tax estimate (USD)',6187.5),number('insurance','Annual homeowners insurance (USD)',1740),number('pmi','Monthly mortgage insurance (USD)',139.22),number('hoa','Monthly HOA dues (USD)',0)]),
'usa-va-loan-calculator': ('va','Estimate a VA purchase funding fee',[number('price','Purchase price (USD)',400000,.01),number('percent','Down payment (%)',0,0,99.99),select('use','Prior VA loan use',[('first','First use'),('subsequent','Subsequent use')]),select('exempt','Funding-fee exemption confirmed?', [('no','No / not assumed'),('yes','Yes — model a confirmed exemption')]),FINANCE,RATE,YEARS]),
}

def widget(slug):
    kind, title, fields = CONFIG[slug]
    out = [f'<section class="us-calc" data-us-calculator="{kind}" aria-labelledby="us-calculator-title">',f'<h2 id="us-calculator-title">{title}</h2>', '<p>Enter your current figures, then press Calculate estimate. These inputs are processed locally by this calculator and are not submitted by it. Estimates are not loan offers or approval decisions.</p>', '<form data-us-form novalidate><div class="us-fields">']
    for f in fields:
        name, label = f[:2]
        field_id = f'us-{name}'
        out.append(f'<label for="{field_id}">{html.escape(label)}')
        if len(f) == 3:
            options = ''.join(f'<option value="{v}">{html.escape(t)}</option>' for v,t in f[2])
            out.append(f'<select id="{field_id}" name="{name}">{options}</select>')
        else:
            _, _, value, minimum, maximum, step = f
            if name not in {'years','percent','front','back'} and value != 0:value = ''
            out.append(f'<input id="{field_id}" name="{name}" type="number" required value="{value}" min="{minimum}" max="{maximum}" step="{step}">')
        out.append('</label>')
    out += ['</div><div class="us-actions"><button type="submit" hidden>Calculate estimate</button><button type="reset">Reset example</button></div></form>', '<div hidden tabindex="-1" data-results role="status" aria-live="polite" aria-atomic="true"><p>Enable JavaScript to calculate. The worked example below remains available without it.</p></div>']
    if kind == 'amortization':
        out.append('<details hidden><summary>Show all monthly payments</summary><div data-schedule class="us-table-scroll" tabindex="0" role="region" aria-label="Scrollable monthly schedule"></div></details>')
    out += ['<noscript><p>The interactive tool needs JavaScript. You can still read the assumptions, tables and sources below.</p></noscript>', '</section>']
    return '\n'.join(out)


def inline(s):
    s = html.escape(s, quote=False)
    s = re.sub(r'\[([^\]]+)\]\(([^\s)]+)\)', lambda m: '<a href="'+html.escape(html.unescape(m[2]),quote=True)+'">'+m[1]+'</a>', s)
    s = re.sub(r'\*\*(.+?)\*\*',r'<strong>\1</strong>',s)
    s = re.sub(r'`([^`]+)`',r'<code>\1</code>',s)
    return s


def render(source, slug):
    lines = source.splitlines(); out=[]; i=0
    while i < len(lines):
        l = lines[i].strip()
        if not l or l.startswith('# ') or l.startswith('**Meta description:**'):
            i+=1; continue
        if l == '<!-- calculator -->':
            out.append(widget(slug));i+=1;continue
        if l.startswith('## '): out.append('<h2>'+inline(l[3:])+'</h2>');i+=1;continue
        if l.startswith('### '): out.append('<h3>'+inline(l[4:])+'</h3>');i+=1;continue
        if l.startswith('|'):
            rows=[]
            while i<len(lines) and lines[i].strip().startswith('|'):
                rows.append([c.strip() for c in lines[i].strip().strip('|').split('|')]);i+=1
            if len(rows)<2 or not all(re.fullmatch(r':?-+:?',x) for x in rows[1]): raise ValueError('Invalid table')
            if any(len(row)!=len(rows[0]) for row in rows[2:]): raise ValueError('Uneven table')
            headers=''.join('<th scope="col">'+inline(c)+'</th>' for c in rows[0])
            body=''.join('<tr>'+''.join('<td>'+inline(c)+'</td>' for c in row)+'</tr>' for row in rows[2:])
            out.append('<div class="us-table-scroll" tabindex="0" role="region" aria-label="Scrollable example table"><table><thead><tr>'+headers+'</tr></thead><tbody>'+body+'</tbody></table></div>');continue
        if l.startswith('- '):
            items=[]
            while i<len(lines) and lines[i].strip().startswith('- '):items.append('<li>'+inline(lines[i].strip()[2:])+'</li>');i+=1
            out.append('<ul>'+''.join(items)+'</ul>');continue
        para=[l];i+=1
        while i<len(lines) and lines[i].strip():para.append(lines[i].strip());i+=1
        out.append('<p>'+inline(' '.join(para))+'</p>')
    return '\n'.join(out)


def build():
    index_path = ROOT/'blog/index.html'; index=index_path.read_text(encoding='utf-8-sig')
    for slug in CONFIG:
        source_path = ROOT/f'contents/USA/{slug}.md'
        source = source_path.read_text()
        title=re.search(r'^# (.+)$',source,re.M)[1]
        desc=re.search(r'^\*\*Meta description:\*\* (.+)$',source,re.M)[1]
        path=ROOT/f'blog/{slug}.html'; page=path.read_text(encoding='utf-8-sig')
        schemas=re.findall(r'<script[^>]+type=[\"\x27]application/ld\+json[\"\x27][^>]*>([\s\S]*?)</script>',page)
        article_schema=next(json.loads(s) for s in schemas if json.loads(s).get('@type')=='Article')
        original_date=article_schema.get('datePublished','')
        def schema_replace(m):
            value=json.loads(m[1])
            if value.get('@type')=='Article':
                value.update(headline=title, description=desc, dateModified=DATE, author={'@type':'Organization','name':'REO Technologies','url':BASE+'/about'})
            elif value.get('@type')=='BreadcrumbList':value['itemListElement'][-1]['name']=title
            return '<script type="application/ld+json">\n'+json.dumps(value,ensure_ascii=False,indent=2)+'\n</script>'
        page=re.sub(r'<script[^>]+type=[\"\x27]application/ld\+json[\"\x27][^>]*>([\s\S]*?)</script>',schema_replace,page)
        page=re.sub(r'<title>[\s\S]*?</title>', '<title>'+html.escape(title)+' | MortgagePro Global</title>',page,count=1)
        for attr,key,value in [('name','description',desc),('property','og:title',title),('property','og:description',desc),('name','twitter:title',title),('name','twitter:description',desc)]:
            pattern=r'<meta\b(?=[^>]*\b'+attr+r'=[\"\x27]'+re.escape(key)+r'[\"\x27])[^>]*>'
            page,count=re.subn(pattern,f'<meta {attr}="{key}" content="{html.escape(value,quote=True)}">',page,count=1)
            if count != 1: raise ValueError('Missing meta '+key+' in '+slug)
        page=re.sub(r'<h1>[\s\S]*?</h1>','<h1>'+html.escape(title)+'</h1>',page,count=1)
        # Match class via lookahead to handle aria/class ordering without reserializing the document.
        page=re.sub(r'<p\b(?=[^>]*\bclass="subtitle")[^>]*>[\s\S]*?</p>','<p class="subtitle">'+html.escape(desc)+'</p>',page,count=1)
        article='<article class="article-container">\n<header><div class="article-meta">'+f'<span><strong>Publisher:</strong> <a href="/about">REO Technologies</a></span><span><strong>Originally published:</strong> <time datetime="{original_date}">{original_date}</time></span><span><strong>Updated:</strong> <time datetime="{DATE}">{DISPLAY_DATE}</time></span>'+ '</div></header>\n<div class="article-content">\n'+render(source,slug)+f'\n<p class="disclaimer-text"><strong>Sources and scope:</strong> Linked official references checked {DISPLAY_DATE}. Purchase prices, taxes, insurance and PMI examples are assumptions unless explicitly attributed. This educational guide is not a lender quote, approval, or personal financial or tax advice. No independent licensed financial review is claimed. Read our <a href="/editorial-policy">editorial policy</a>, <a href="/corrections-policy">corrections policy</a> and <a href="/privacy-policy">privacy policy</a>.</p>\n</div>\n</article>'
        page,count=re.subn(r'<article\b[\s\S]*?</article>',lambda _:article,page,count=1)
        if count!=1:raise ValueError('Missing article '+slug)
        if '/css/us-blog.css' not in page:page=page.replace('</head>','<link rel="stylesheet" href="/css/us-blog.css">\n<script src="/js/us-blog-calculators.js" defer></script>\n</head>')
        # Consent defaults must be queued before the AdSense loader, not after it.
        ad=re.search(r'<script[^>]*src="https://pagead2\.googlesyndication\.com/[^>]*></script>',page)
        consent=re.search(r'<script>\s*window\.dataLayer[\s\S]*?</script>',page)
        if ad and consent and ad.start()<consent.start():
            tag=ad[0];page=page[:ad.start()]+page[ad.end():]
            consent=re.search(r'<script>\s*window\.dataLayer[\s\S]*?</script>',page)
            page=page[:consent.end()]+'\n'+tag+page[consent.end():]
        # These articles use explicit dated assumptions, not the shared rate hydration feed.
        page=re.sub(r'<script[^>]*src="/js/rates\.js"[^>]*></script>\s*','',page)
        page=re.sub(r"(?m)^[\t ]+$", "", page)
        for asset in ['js/us-blog-calculators.js','css/us-blog.css']:
            version=hashlib.sha256((ROOT/asset).read_bytes()).hexdigest()[:12]
            page=re.sub(r'((?:src|href)="/'+re.escape(asset)+r')(?:\?[^"]*)?"',lambda m:m[1]+'?v='+version+'"',page)
        path.write_text(page)
        card_re=r'<a href="/blog/'+re.escape(slug)+r'" class="blog-card"[\s\S]*?</a>'
        def card_replace(m):
            card=m[0]
            card=re.sub(r'aria-label="[^"]*"',lambda _:'aria-label="Read: '+html.escape(title,quote=True)+'"',card,count=1)
            card=re.sub(r'<h2>[\s\S]*?</h2>',lambda _:'<h2>'+html.escape(title)+'</h2>',card,count=1)
            card=re.sub(r'<p>[\s\S]*?</p>',lambda _:'<p>'+html.escape(desc)+'</p>',card,count=1)
            card=re.sub(r'<span>[^<]*2026</span>','<span>Updated October 2026</span>',card,count=1)
            # Replace old unmeasured reading times with an estimate from the actual source.
            minutes=max(1,round(len(source.split())/200))
            card=re.sub(r'<span>\d+ Min Read</span>',f'<span>About {minutes} Min Read</span>',card,count=1)
            return card
        index,count=re.subn(card_re,card_replace,index,count=1)
        if count!=1:raise ValueError('Missing index card '+slug)
    index_path.write_text(index)
    smpath=ROOT/'sitemap.xml';sm=smpath.read_text()
    for slug in CONFIG:
        pattern=r'(<url>\s*<loc>'+re.escape(BASE+'/blog/'+slug)+r'</loc>[\s\S]*?<lastmod>)[^<]*(</lastmod>)'
        sm,count=re.subn(pattern,lambda m:m[1]+DATE+m[2],sm,count=1)
        if count!=1 and slug in CONFIG and not (ROOT/f'blog/{slug}.html').exists():raise ValueError('Missing article '+slug)
    smpath.write_text(sm)
    print('Built 8 US articles, index cards and sitemap entries.')

if __name__=='__main__':
    build()
    from publish_editorial_policy import build as apply_publication
    apply_publication()
