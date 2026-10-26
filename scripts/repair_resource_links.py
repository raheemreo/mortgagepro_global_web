"""Keep resource labels honest; generated calculator directories are untouched."""
from pathlib import Path
import re, html
ROOT=Path(__file__).resolve().parents[1]
CHANGES={
 'usa-mortgage-calculator.html':{
  'First-Time Homebuyer Programs':None,
  'VA Benefits & Home Loans':('https://www.va.gov/housing-assistance/home-loans/eligibility/','VA Home-Loan Eligibility','Official service eligibility and Certificate of Eligibility guidance'),
  '401(k) / IRA Home Withdrawal':('https://www.irs.gov/publications/p590b','IRA Distribution Rules','IRS Publication 590-B · confirm your applicable tax year'),
  'USDA Rural Development':('https://www.rd.usda.gov/programs-services/single-family-housing-programs','USDA Single-Family Housing Programs','Official direct, guaranteed and repair-program information'),
  'FHA 203(k) Rehab Loan':('https://www.hud.gov/hud-partners/single-family-203k','FHA Rehabilitation Program Types','HUD information on Limited and Standard 203(k)'),
  'USA AI Mortgage Advisor':None,
  'FRED Rate History':('https://fred.stlouisfed.org/series/MORTGAGE30US','US Mortgage Rate History','Freddie Mac weekly survey series published through FRED'),
  'US Home Price Index (HPI)':('https://www.fhfa.gov/reports/house-price-index','FHFA House Price Index Reports','Official index publications and methodology'),
  'Median Home Prices by State':None,
  'Top US Mortgage Lenders':None,
  'Mortgage Prequalification Guide':('https://www.consumerfinance.gov/ask-cfpb/whats-the-difference-between-a-prequalification-letter-and-a-preapproval-letter-en-127/','Prequalification and Preapproval','CFPB explanation of what a lender letter does and does not establish'),
 },
 'india-home-loan-emi-calculator.html':{
  'RBI Repo Rate History':('https://www.rbi.org.in/scripts/annualpolicy.aspx','RBI Monetary Policy Publications','Official decisions, statements and meeting minutes'),
  'PMAY – Housing for All':('/tools/india/pmay-screen','PMAY-U 2.0 ISS Numerical Screen','Enter the scheme figures; eligibility is not an award decision'),
  'Section 80C / 24(b) Guide':('/tools/india/section-24b','Confirmed Interest Deduction Scenario','Model a deduction amount already confirmed for your applicable tax regime'),
  'CIBIL / Experian Score Check':('https://www.cibil.com','TransUnion CIBIL','Credit-information provider website; no score is checked by this site'),
  'NHB Residex — Property Index':('https://nhb.org.in','National Housing Bank','Visit the institution’s own website and publications'),
 },
 'uk-mortgage-calculator.html':{
  'BoE Base Rate Tracker':('https://www.bankofengland.co.uk/monetary-policy/the-interest-rate-bank-rate','Bank of England Bank Rate','Official policy-rate information and decisions'),
  'UK House Price Index':('https://www.gov.uk/government/organisations/land-registry','HM Land Registry','Official land-registration information and publications'),
 },
 'canada-mortgage-calculator.html':{
  'BoC Rate History':('https://www.bankofcanada.ca/valet/observations/V39079/json','Bank of Canada Overnight Observations','Official dated overnight-rate data in JSON format'),
  'CMHC Eligibility Guide':('https://www.cmhc-schl.gc.ca/professionals/project-funding-and-mortgage-financing/mortgage-loan-insurance/mortgage-loan-insurance-homeownership-programs/premium-information-for-homeowner-and-small-rental-loans','CMHC Insurance Premium Schedule','Official premiums, surcharges and scope'),
  'OSFI B-20 Guideline':('https://www.osfi-bsif.gc.ca/en/supervision/financial-institutions/banks/minimum-qualifying-rate-uninsured-mortgages','OSFI Minimum Qualifying Rate','Uninsured mortgage assessment and straight-switch scope'),
  'First Home Savings Account (FHSA)':None,
  'Canada House Price Index':('https://www.crea.ca','Canadian Real Estate Association','Visit the industry association’s own publications'),
 },
 'new-zealand-mortgage-calculator.html':{
  'RBNZ OCR Rate History':('https://www.rbnz.govt.nz/monetary-policy/about-monetary-policy/the-official-cash-rate','RBNZ Official Cash Rate','Official policy decisions and historical-rate links'),
  'Kāinga Ora (Housing NZ)':('https://kaingaora.govt.nz','Kāinga Ora','Official housing agency website and home-ownership information'),
  'REINZ House Price Index':('https://reinz.co.nz','Real Estate Institute of New Zealand','Visit the institute’s own publications'),
  'MoneyHub NZ Mortgage Guide':None,
  'NZ Property Market Report':None,
 }
}
def build():
 for name,changes in CHANGES.items():
  p=ROOT/name;s=p.read_text()
  def card(m):
   block=m[0];label=re.search(r'<div class="in">([\s\S]*?)</div>',block)
   if not label:return block
   key=html.unescape(label[1]).strip()
   if key not in changes:return block
   change=changes[key]
   if change is None:return ''
   url,title,description=change
   block=re.sub(r'href="[^"]*"','href="'+html.escape(url,quote=True)+'"',block,count=1)
   block=block.replace(label[0],'<div class="in">'+html.escape(title)+'</div>')
   return re.sub(r'<div class="is">[\s\S]*?</div>',lambda _:'<div class="is">'+html.escape(description)+'</div>',block,count=1)
  s=re.sub(r'<a\b[^>]*class="ic"[^>]*>[\s\S]*?</a>',card,s)
  p.write_text(s)
 p=ROOT/'index.html';s=p.read_text().replace('50+ in-depth answers covering mortgage types, compounding, debt service ratios, and down payments.','Plain-language answers about mortgage types, compounding, debt ratios and down payments.').replace('Accurate Calculations','Calculations with Stated Assumptions');p.write_text(s)
 p=ROOT/'uk-mortgage-calculator.html';s=p.read_text();s=re.sub(r'Shared Ownership · 20\+\s*Calculators','Shared Ownership · Mortgage Planning Tools',s,flags=re.I);p.write_text(s)
 print('Repaired specific resource promises, removed nonexistent offers and unsupported counts.')
if __name__=='__main__':build()
