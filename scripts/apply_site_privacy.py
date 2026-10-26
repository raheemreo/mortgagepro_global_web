#!/usr/bin/env python3
"""Normalize publisher-controlled tags; does not publish an AdSense account message."""
from pathlib import Path
import re,hashlib
ROOT=Path(__file__).resolve().parents[1]
BOOTSTRAP='''<script data-mpg-consent>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('consent', 'default', {
      'ad_storage': 'denied',
      'analytics_storage': 'denied',
      'ad_user_data': 'denied',
      'ad_personalization': 'denied',
      'wait_for_update': 500
    });
  </script>'''
POLICY={'privacy-policy.html','cookie-policy.html','terms-and-conditions.html','disclaimer.html','data-deletion-policy.html','app-privacy-policy.html','contact.html','404.html','editorial-policy.html','corrections-policy.html','affiliate-disclosure.html'}
def build():
 digest=hashlib.sha256((ROOT/'js/site-privacy.js').read_bytes()).hexdigest()[:12]
 for path in list(ROOT.glob('*.html'))+list((ROOT/'blog').glob('*.html'))+list((ROOT/'authors').glob('*.html'))+list((ROOT/'tools').rglob('*.html')):
  s=path.read_text(encoding='utf-8-sig')
  if '<head' not in s:continue
  def clean(m):
   tag=m[0]
   if 'application/ld+json' in tag:return tag
   if 'window.dataLayer' in tag or 'initThirdPartyScripts' in tag:return ''
   if re.search(r'src=["\x27]https://(?:www\.googletagmanager\.com|(?:www\.)?clarity\.ms)',tag):return ''
   return tag
  s=re.sub(r'<script\b[^>]*>[\s\S]*?</script>',clean,s,flags=re.I)
  s=re.sub(r'<script[^>]+src="/js/site-privacy\.js[^\"]*"[^>]*></script>\s*','',s)
  s=re.sub(r'<script[^>]+src="https://pagead2\.googlesyndication\.com/[^\"]*"[^>]*></script>\s*',lambda m:'' if path.name in POLICY else m[0],s)
  s=re.sub(r'<link\b[^>]*href="https://(?:scripts\.clarity\.ms|www\.googletagmanager\.com)"[^>]*>\s*','',s)
  # Exactly one default block, before every vendor script.
  s=re.sub(r'(<head\b[^>]*>)',lambda m:m[1]+'\n  '+BOOTSTRAP+'\n  <script src="/js/site-privacy.js?v='+digest+'" defer></script>',s,count=1)
  s=re.sub(r",\s*value:\s*Math\.round\((?:price|loanAmount)\)", '',s)
  s=re.sub(r"function logEvent\(name, params\)\s*\{[\s\S]*?\n    \}","function logEvent() { /* Usage analytics is not loaded by this release. */ }",s)
  def privacy_link(m):
   tag=re.sub(r'onclick="[^"]*"','onclick="return window.MPGPrivacy ? MPGPrivacy.open(event) : true;"',m[0])
   return re.sub(r'href="[^"]*"','href="/privacy-policy#privacy-controls"',tag,count=1)
  s=re.sub(r'<a\b[^>]*onclick="[^"]*googlefc[^\"]*"[^>]*>',privacy_link,s,flags=re.S)
  for asset in ['js/root-calculator-state.js','css/root-calculators.css','css/site-documents.css']:
   version=hashlib.sha256((ROOT/asset).read_bytes()).hexdigest()[:12]
   s=re.sub(r'((?:src|href)="/'+re.escape(asset)+r')(?:\?[^"]*)?"',lambda m:m[1]+'?v='+version+'"',s)
  if path.name in {'usa-mortgage-calculator.html','canada-mortgage-calculator.html','uk-mortgage-calculator.html','australia-mortgage-calculator.html','new-zealand-mortgage-calculator.html','india-home-loan-emi-calculator.html','europe-mortgage-calculator.html'}:
   v=hashlib.sha256((ROOT/'css/tool-cards.css').read_bytes()).hexdigest()[:12]
   s=re.sub(r'<link[^>]+href="/css/tool-cards\.css[^"]*"[^>]*>\s*','',s)
   s=s.replace('</head>','<link rel="stylesheet" href="/css/tool-cards.css?v='+v+'">\n</head>')
  s=re.sub(r'(?m)^[ \t]+$','',s)
  s=re.sub(r'\n{3,}','\n\n',s)
  path.write_text(s)
 # Shared footer for pages which inject it rather than including the static copy.
 p=ROOT/'components/footer.html'
 if p.exists():
  s=p.read_text();s=re.sub(r'<a\b[^>]*onclick="[^"]*googlefc[^\"]*"[^>]*>',privacy_link,s,flags=re.S);p.write_text(s)
 print('Normalized consent ordering, privacy links and optional tracking across published HTML.')
if __name__=='__main__':build()
