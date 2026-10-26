#!/usr/bin/env python3
"""Build the 35 non-US articles. Run alongside build_us_articles.py; stdlib only."""
from pathlib import Path
import re, html, json, hashlib
import build_us_articles as shared
ROOT=Path(__file__).resolve().parents[1]
DATE='2026-10-25'; DISPLAY='October 25, 2026'; BASE='https://mortgageproglobal.com'
def n(key,label,value,low=0,high=100000000,step='any'):return(key,label,value,low,high,step)
def choice(key,label,items):return(key,label,items)
RATE=n('rate','Annual rate (%) — assumed, not a quote',3.99,0,30)
YEARS=n('years','Remaining repayment years',25,1,40,1)
LOAN=n('loan','Starting principal',520000,.01)
COST=n('fees','Other upfront costs',1500)
MONTHLY_FIELDS=[LOAN,RATE,YEARS]
MODEL_FIELDS={
'payment':MONTHLY_FIELDS,
'amort':MONTHLY_FIELDS+[n('extra','Extra principal each month',0)],
'frequency':MONTHLY_FIELDS,
'cmhc':[n('price','Property price (CAD)',700000,1),n('down','Cash down payment (CAD)',70000),choice('years','Amortization',[(25,'25 years'),(30,'30 years — confirm insured eligibility')]),choice('eligible','30-year first-buyer/new-build eligibility confirmed?', [('no','No / not assumed'),('yes','Yes — model a confirmed case')]),n('taxRate','Assumed provincial premium tax (%) — verify',0,0,30)],
'ca-stress':MONTHLY_FIELDS,
'ca-budget':[n('income','Annual gross qualifying income (CAD)',150000,.01),n('debts','Other monthly debts (CAD)',0),n('down','Cash down payment excluding closing reserve (CAD)',175000),RATE,YEARS,n('tax','Annual property tax (CAD)',3600),n('heat','Monthly heating (CAD)',100),n('condo','Full monthly condo fee (CAD)',0)],
'ca-ratios':[n('income','Monthly qualifying income (CAD)',12500,.01),n('mortgage','Monthly qualifying mortgage payment incl. financed premium (CAD)',3323.90),n('tax','Monthly property tax (CAD)',220),n('heat','Monthly heat (CAD)',120),n('condo','Full monthly condo fee (CAD)',300),n('ground','Monthly site / ground rent (CAD)',0),n('debts','Other monthly debt payments (CAD)',630)],
'prepay':MONTHLY_FIELDS+[n('lump','Permitted lump sum',30000),n('month','Apply alongside payment month',36,1,480,1)],
'renewal':[n('loan','Original principal (CAD)',500000,.01),n('oldRate','Original annual rate assumption (%)',1.89,0,30),n('rate','Renewal annual rate assumption (%)',3.99,0,30),n('years','Original amortization years',25,2,40,1),n('elapsed','Whole years already paid',5,0,39,1)],
'budget':[n('budget','Monthly mortgage allowance after living costs',2000),n('debts','Monthly debt commitments not already deducted',350),RATE,n('buffer','Extra assessment-rate assumption (percentage points)',0,0,10),YEARS],
'io':MONTHLY_FIELDS+[n('ioYears','Interest-only years before repayment',5,1,39,1)],
'ltv':[n('value','Assessed property value',350000,.01),n('loan','Mortgage principal including financed fees',262500),n('target','Target LTV / LVR (%) — planning assumption',75,.01,100)],
'btl':[n('loan','Proposed loan (GBP)',300000,.01),n('stress','Lender stress-rate assumption (%)',5.5,.01,30),n('icr','Required ICR assumption (%)',145,1,1000),n('rent','Gross monthly rent (GBP)',1800)],
'refinance':[LOAN,n('oldRate','Existing annual rate assumption (%)',6.19,0,30),n('rate','New annual rate assumption (%)',5.85,0,30),YEARS,COST,n('penalty','Known early-repayment / break charge',0),n('cashback','New cashback you qualify to keep',0),n('repayCashback','Known borrower cashback repayment',0),n('horizon','Comparison horizon (whole months)',36,1,480,1)],
'sdlt':[n('price','Dutiable price (GBP)',500000,0),choice('buyer','Buyer scenario — confirm eligibility',[('standard','Standard rates'),('first','Eligible first-time relief scenario'),('additional','Higher additional-property rates scenario')]),choice('nonresident','SDLT non-UK-resident surcharge applies?', [('no','No'),('yes','Yes — assumed confirmed')])],
'duty':[n('price','Dutiable value (AUD)',700000,0),choice('state','Supported general rates only',[('qld','Queensland — no concession'),('vic','Victoria — no concession')])],
'dti':[n('income','Annual qualifying gross income',150000,.01),n('loan','Proposed assessed mortgage debt',520000),n('other','Other assessed debt / limits as applicable',0)],
'lmi':[n('price','Property price (AUD)',700000,.01),n('down','Cash deposit (AUD)',70000),n('premiumRate','LMI premium assumption (%) — replace with quote',2,0,20)],
'offset':[LOAN,n('offset','Constant offset balance assumption (AUD)',40000),n('percent','Offset benefit percentage (%)',100,0,100),RATE,n('fees','Extra annual product costs (AUD)',395)],
'kiwi':[n('eligibleBalance','Provider-confirmed eligible savings BEFORE retention (NZD)',62000),n('membership','Recognized membership years — other eligibility unverified',3,0,100)],
'car':[n('loan','Original car principal (NZD)',35000,.01),n('rate','Annual car rate assumption (%)',9,0,30),n('years','Car-loan years',5,1,20,1),n('elapsed','Payments already made (whole months)',24,0,240,1)],
'yield':[n('value','Property value / price denominator (NZD)',650000,.01),n('rent','Weekly rent (NZD)',650),n('weeks','Occupied paid weeks per year',52,0,52),n('costs','Other annual operating costs excluding management (NZD)',7000),n('management','Management fee assumption (% of collected rent)',8,0,100)]
}
MANUAL_COUNTRIES={'Canada'}
COUNTRY_KEYS={'UK':'uk','Australia':'australia','New Zealand':'newzealand'}
for key in json.loads((ROOT/'data/country-tools-config.json').read_text())['enabled']:
 MANUAL_COUNTRIES.update(name for name,value in COUNTRY_KEYS.items()if value==key)
CONFIG={}
def add(country,currency,slug,model=None,defaults=None):
 folder={'Canada':'Canada','UK':'UK','Australia':'Australia','New Zealand':'New Zealand','General':'General'}[country]
 CONFIG[slug]={'country':country,'currency':currency,'source':f'contents/{folder}/{slug}.md','model':model,'defaults':defaults or {},'comp':'semiannual' if country=='Canada' else 'monthly'}
for suffix,model in [('mortgage-calculator','payment'),('affordability-calculator','ca-budget'),('amortization-calculator','frequency'),('cmhc-insurance-calculator','cmhc'),('gds-tds-calculator','ca-ratios'),('prepayment-calculator','prepay'),('renewal-planner','renewal'),('stress-test-calculator','ca-stress')]:add('Canada','CAD','canada-'+suffix,model)
add('Canada','CAD','cmhc-insurance-canada-guide')
for suffix,model in [('mortgage-calculator','payment'),('affordability-calculator','budget'),('amortization-calculator','io'),('buy-to-let-calculator','btl'),('ltv-calculator','ltv'),('remortgage-tool','refinance'),('stamp-duty-calculator','sdlt'),('stamp-duty-guide',None),('help-to-buy',None)]:add('UK','GBP','uk-'+suffix,model,{'loan':300000 if model=='btl' else 262500,'rate':4 if model=='refinance' else 4.48,'oldRate':4.48,'years':20 if model=='refinance' else 25})
for suffix,model in [('mortgage-calculator','payment'),('affordability-calculator','budget'),('amortization-calculator','frequency'),('dti-ratio-calculator','dti'),('lmi-calculator','lmi'),('offset-account-calculator','offset'),('refinance-tool','refinance'),('stamp-duty-calculator','duty')]:add('Australia','AUD','australia-'+suffix,model,{'rate':5.85 if model=='refinance' else 6.19,'oldRate':6.19,'buffer':3,'income':95000,'budget':5000,'debts':0,'loan':520000,'years':25})
for suffix,model in [('mortgage-calculator','payment'),('dti-calculator','dti'),('car-loan-calculator','car'),('first-home-buyer',None),('kiwisaver-calculator','kiwi'),('lvr-calculator','ltv'),('rental-yield-calculator','yield'),('repayment-calculator','io')]:add('New Zealand','NZD','nz-'+suffix,model,{'rate':9 if model=='car' else 5.99,'years':5 if model=='car' else 30,'value':650000 if model=='yield' else 700000,'loan':35000 if model=='car' else 630000 if model=='ltv' else 520000,'target':80})
add('General','USD','how-to-use-mortgage-calculator')

def fields(slug):
 c=CONFIG[slug];result=[]
 for f in MODEL_FIELDS.get(c['model'],[]):
  f=list(f)
  if len(f)>3 and f[0] in c['defaults']:f[2]=c['defaults'][f[0]]
  result.append(f)
 return result

def widget(slug):
 c=CONFIG[slug];kind=c['model'];out=[f'<section class="us-calc" data-global-calculator="{kind}" data-currency="{c["currency"]}" data-compounding="{c["comp"]}" aria-labelledby="global-calc-title">', '<h2 id="global-calc-title">Try the assumptions</h2>',f'<p>Amounts are in {c["currency"]}. Change the inputs to recalculate locally. No loan, tax or scheme approval is established by the result.</p>','<div class="us-fields">']
 if c['country'] in MANUAL_COUNTRIES:
  attr='data-canada-form'if c['country']=='Canada'else'data-manual-form'
  out[-1]=f'<form {attr} novalidate><div class="us-fields">';out[2]=f'<p>Amounts are {c["currency"]}. Enter your current figures, then press Calculate estimate. The tool does not establish approval.</p>'
 for f in fields(slug):
  name,label=f[:2];out.append(f'<label for="global-{name}">{html.escape(label)}')
  if len(f)==3:out.append(f'<select id="global-{name}" name="{name}">'+''.join(f'<option value="{v}">{html.escape(t)}</option>' for v,t in f[2])+'</select>')
  else:
   _,_,value,low,high,step=f
   if c['country'] in MANUAL_COUNTRIES and name not in {'years','ioYears'} and value!=0:value=''
   out.append(f'<input id="global-{name}" name="{name}" type="number" required value="{value}" min="{low}" max="{high}" step="{step}">')
  out.append('</label>')
 out+=['</div>','<div data-results role="status" aria-live="polite" aria-atomic="true"><p>Enable JavaScript for the interactive estimate. The worked explanations and sources remain available below.</p></div>']
 if c['country'] in MANUAL_COUNTRIES:
  out.insert(-1,'<div class="us-actions"><button type="submit" hidden>Calculate estimate</button><button type="reset">Reset example</button></div></form>');out[-1]=out[-1].replace('<div data-results','<div hidden tabindex="-1" data-results')
 if kind=='amort':out.append('<details><summary>Show monthly model schedule</summary><div data-schedule class="us-table-scroll" tabindex="0" role="region" aria-label="Scrollable monthly schedule"></div></details>')
 out+=['<noscript><p>The interactive estimate requires JavaScript. Read the worked examples and sources below.</p></noscript>','</section>']
 return '\n'.join(out)

def build():
 shared.widget=widget
 index_path=ROOT/'blog/index.html';index=index_path.read_text(encoding='utf-8-sig')
 for slug,c in CONFIG.items():
  source=(ROOT/c['source']).read_text();title=re.search(r'^# (.+)',source)[1];desc=re.search(r'^\*\*Meta description:\*\* (.+)',source,re.M)[1]
  assert source.count('<!-- calculator -->')==(1 if c['model'] else 0),slug
  p=ROOT/f'blog/{slug}.html';page=p.read_text(encoding='utf-8-sig')
  schemas=re.findall(r'<script[^>]+type=[\"\x27]application/ld\+json[\"\x27][^>]*>([\s\S]*?)</script>',page)
  original=next(json.loads(s).get('datePublished','') for s in schemas if json.loads(s).get('@type')=='Article')
  def schema_replace(m):
   d=json.loads(m[1]);typ=d.get('@type')
   if typ=='HowTo':return '' # Old steps no longer describe the rewritten multi-country workflow.
   if typ=='Article':d.update(headline=title,description=desc,dateModified=DATE,author={'@type':'Organization','name':'REO Technologies','url':BASE+'/about'})
   elif typ=='BreadcrumbList':d['itemListElement'][-1]['name']=title
   return '<script type="application/ld+json">\n'+json.dumps(d,ensure_ascii=False,indent=2)+'\n</script>'
  page=re.sub(r'<script[^>]+type=[\"\x27]application/ld\+json[\"\x27][^>]*>([\s\S]*?)</script>',schema_replace,page)
  page=re.sub(r'<title>[\s\S]*?</title>',lambda _:'<title>'+html.escape(title)+' | MortgagePro Global</title>',page,count=1)
  for attr,key,value in [('name','description',desc),('property','og:title',title),('property','og:description',desc),('name','twitter:title',title),('name','twitter:description',desc)]:
   pattern=r'<meta\b(?=[^>]*\b'+attr+r'=[\"\x27]'+re.escape(key)+r'[\"\x27])[^>]*>'
   page,count=re.subn(pattern,lambda _:f'<meta {attr}="{key}" content="{html.escape(value,quote=True)}">',page,count=1)
   if count!=1:raise ValueError('Missing '+key+' '+slug)
  page=re.sub(r'<h1>[\s\S]*?</h1>',lambda _:'<h1>'+html.escape(title)+'</h1>',page,count=1)
  page=re.sub(r'<p\b(?=[^>]*\bclass="subtitle")[^>]*>[\s\S]*?</p>',lambda _:'<p class="subtitle">'+html.escape(desc)+'</p>',page,count=1)
  article=f'<article class="article-container">\n<header><div class="article-meta"><span><strong>Publisher:</strong> <a href="/about">REO Technologies</a></span><span><strong>Originally published:</strong> <time datetime="{original}">{original}</time></span><span><strong>Updated:</strong> <time datetime="{DATE}">{DISPLAY}</time></span></div></header>\n<div class="article-content">\n'+shared.render(source,slug)+f'\n<p class="disclaimer-text"><strong>Sources and scope:</strong> Linked primary/public-authority references checked {DISPLAY}. Rates, prices, costs and future scenarios are assumptions unless explicitly attributed. This is educational information, not a loan offer, approval, personal financial or tax advice. No independent licensed financial review is claimed. Read our <a href="/editorial-policy">editorial policy</a>, <a href="/corrections-policy">corrections policy</a> and <a href="/privacy-policy">privacy policy</a>.</p>\n</div>\n</article>'
  page,count=re.subn(r'<article\b[\s\S]*?</article>',lambda _:article,page,count=1);assert count==1,slug
  if '/css/us-blog.css' not in page:page=page.replace('</head>','<link rel="stylesheet" href="/css/us-blog.css">\n</head>')
  if c['model'] and '/js/global-blog-calculators.js' not in page:page=page.replace('</head>','<script src="/js/global-blog-calculators.js" defer></script>\n</head>')
  page=re.sub(r'<script[^>]*src="/js/rates\.js"[^>]*></script>\s*','',page)
  ad=re.search(r'<script[^>]*src="https://pagead2\.googlesyndication\.com/[^>]*></script>',page);consent=re.search(r'<script>\s*window\.dataLayer[\s\S]*?</script>',page)
  if ad and consent and ad.start()<consent.start():
   tag=ad[0];page=page[:ad.start()]+page[ad.end():];consent=re.search(r'<script>\s*window\.dataLayer[\s\S]*?</script>',page);page=page[:consent.end()]+'\n'+tag+page[consent.end():]
  if c['country'] in MANUAL_COUNTRIES:
   style='canada-calculators'if c['country']=='Canada'else'country-tools'
   page=re.sub(r'<link[^>]*href="/css/'+style+r'\.css[^"]*"[^>]*>\s*','',page)
   css_hash=hashlib.sha256((ROOT/('css/'+style+'.css')).read_bytes()).hexdigest()[:12]
   page=page.replace('</head>',f'<link rel="stylesheet" href="/css/{style}.css?v={css_hash}">\n</head>')
   for asset in ['js/global-blog-calculators.js','css/us-blog.css']:
    version=hashlib.sha256((ROOT/asset).read_bytes()).hexdigest()[:12];page=re.sub(r'((?:src|href)="/'+re.escape(asset)+r')(?:\?[^"]*)?"',lambda m:m[1]+'?v='+version+'"',page)
  page=re.sub(r'(?m)^[\t ]+$','',page);p.write_text(page)
  def card_replace(m):
   card=m[0];card=re.sub(r'aria-label="[^"]*"',lambda _:'aria-label="Read: '+html.escape(title,quote=True)+'"',card,count=1)
   card=re.sub(r'<h2>[\s\S]*?</h2>',lambda _:'<h2>'+html.escape(title)+'</h2>',card,count=1);card=re.sub(r'<p>[\s\S]*?</p>',lambda _:'<p>'+html.escape(desc)+'</p>',card,count=1)
   card=re.sub(r'<span>[^<]*2026</span>','<span>Updated October 2026</span>',card,count=1);minutes=max(1,round(len(source.split())/200));card=re.sub(r'<span>(?:About )?\d+ Min Read</span>',f'<span>About {minutes} Min Read</span>',card,count=1);return card
  pattern=r'<a href="/blog/'+re.escape(slug)+r'" class="blog-card"[\s\S]*?</a>';index,count=re.subn(pattern,card_replace,index,count=1);assert count==1,slug
 index_path.write_text(index)
 smpath=ROOT/'sitemap.xml';sm=smpath.read_text()
 for slug in CONFIG:
  pattern=r'(<url>\s*<loc>'+re.escape(BASE+'/blog/'+slug)+r'</loc>[\s\S]*?<lastmod>)[^<]*(</lastmod>)';sm,count=re.subn(pattern,lambda m:m[1]+DATE+m[2],sm,count=1);assert count==1 or 'noindex,follow' in p.read_text(),slug
 smpath.write_text(sm)
 print('Built 35 non-US articles: Canada 9, UK 9, Australia 8, New Zealand 8, general 1.')
if __name__=='__main__':
 build()
 from publish_editorial_policy import build as apply_publication
 apply_publication()
