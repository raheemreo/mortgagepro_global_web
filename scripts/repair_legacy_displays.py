"""Remove disconnected legacy marketing figures; preserve calculation engines."""
from pathlib import Path
import re,html
ROOT=Path(__file__).resolve().parents[1]
def build():
 p=ROOT/'usa-mortgage-calculator.html';s=p.read_text()
 s=re.sub(r'<div class="fb-val"[^>]*>[^<]*</div>','<div class="fb-val" data-rate="usa.fed"></div>',s).replace('>FRED Source ↗</a>','>Federal Reserve source ↗</a>')
 s=re.sub(r'<p[^>]*>Source: Freddie Mac Primary Mortgage Market Survey \(PMMS\)[\s\S]*?</p>','<p>Dated Freddie Mac survey observations are shown with their own source and observation date. These are not lender offers; ARM, jumbo, VA and USDA pricing requires an actual quote.</p>',s)
 start=s.index('    <!-- Benchmark Mortgage Rates -->');end=s.index('    <!-- Core Mortgage Tools -->',start);block=s[start:end]
 block=re.sub(r'<div class="mrc-chg[^\"]*">[^<]*</div>','',block)
 block=re.sub(r'<div class="mrc"><span[\s\S]*?(?=\s*<div class="mrc"><span|\s*</div>\s*$)',lambda m:m[0]if'data-rate="usa.fixed'in m[0]else'',block)
 s=s[:start]+block+s[end:];s=s.replace('Property Tax ($413) + Insurance ($100)','Entered property tax + insurance').replace('80.0% LTV (No PMI required)','Calculated LTV and entered PMI cost')
 start=s.index('<section',s.index('id="us-calc-form"'));end=s.index('    <!-- Federal Reserve -->',start);s=s[:start]+re.sub(r'(>)[£$€₹][\d,.]+(<)',r'\1—\2',s[start:end])+s[end:];p.write_text(s)
 for p in ROOT.glob('*calculator.html'):
  s=p.read_text();s=re.sub(r'<span>(?:ECB main refinancing rate|RBA cash target|RBI policy repo|RBNZ official cash rate):[^<]*</span>','<span><a href="/data-sources">Dated policy benchmarks and source observations</a>; not personal mortgage quotes.</span>',s)
  s=s.replace('0.50% setup charge','Entered setup charge').replace('80.0% LTV ratio','Calculated LTV ratio').replace('85.0% LTV ratio','Calculated LTV ratio')
  s=re.sub(r'<a\b[^>]*href="https://(?:www\.)?(?:federalreserve.gov|bankofengland.co.uk)"[^>]*>\s*</a>','',s)
  if p.name=='uk-mortgage-calculator.html':
   s=s.replace('Second Home / BTL (+5%)','Additional property (+5pp)').replace('Non-Resident (+2%)','Non-resident only (+2pp)').replace('href="#calculator" class="sdlt-btn"','href="/tools/uk/sdlt" class="sdlt-btn"')
   s=re.sub(r'<p class="sdlt-scope-note">[\s\S]*?</p>','',s)
   note='<p class="sdlt-scope-note">England and Northern Ireland residential purchases only. First-time relief is unavailable for the entire purchase above £500,000; use standard rates on every band in that case. Non-residence can combine with additional-property rates. A buy-to-let label alone does not establish the surcharge. Companies, linked purchases, reliefs and lease rent need separate assessment. Source: <a href="https://www.gov.uk/stamp-duty-land-tax/residential-property-rates">HMRC residential rates</a>, observed 2026-10-26.</p>'
   s=s.replace('<!-- SDLT Rates Table (Post-April 1, 2025 Statutory Regime) -->',note+'\n<!-- SDLT Rates Table (Post-April 1, 2025 Statutory Regime) -->')
  if p.name=='canada-mortgage-calculator.html':
   s=re.sub(r'<p class="canada-rule-source">[\s\S]*?</p>','',s)
   note='<p class="canada-rule-source">Rule references observed 2026-10-26: <a href="https://www.osfi-bsif.gc.ca/en/supervision/financial-institutions/banks/minimum-qualifying-rate-uninsured-mortgages">OSFI uninsured minimum qualifying rate</a> and <a href="https://www.cmhc-schl.gc.ca/professionals/project-funding-and-mortgage-financing/mortgage-loan-insurance/mortgage-loan-insurance-homeownership-programs/premium-information-for-homeowner-and-small-rental-loans">CMHC insurance premium schedule</a>. An eligible uninsured straight switch without an increased loan or amortization has a distinct OSFI scope.</p>'
   s=s.replace('    <!-- CORE TOOLS -->',note+'\n    <!-- CORE TOOLS -->')
  p.write_text(s)
 p=ROOT/'index.html';s=p.read_text().replace('Germany, France, Spain, Euribor tracking','Germany, France, Spain, contractual rate scenarios').replace('Euribor tracking, notary fee estimates','Contractual rate scenarios, entered fee budgets');p.write_text(s)
 fixes={'Affordability':('/tools/europe/affordability','Affordability'),'Amortization':('/tools/europe/amortization','Amortization'),'Euribor Tracker':('/tools/europe/euribor','Index and margin scenario'),'Stamp Duty Guide':('/tools/india/stamp-duty','Stamp duty budget'),'PMAY Subsidy Guide':('/tools/india/pmay-screen','PMAY numerical screen'),'CIBIL Score Guide':('/mortgage-faq#credit-score','Credit and mortgage questions')}
 for p in ROOT.glob('*calculator.html'):
  def link(m):
   x=fixes.get(html.unescape(m[1]));return '<a href="'+x[0]+'">'+html.escape(x[1])+'</a>'if x else m[0]
  p.write_text(re.sub(r'<a href="/mortgage-faq(?:#[^\"]*)?">([^<]*)</a>',link,p.read_text()))
 print('Legacy rates/deltas, result subtitles, dated rule references and six footer promises repaired.')
if __name__=='__main__':build()
