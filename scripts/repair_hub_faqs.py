from pathlib import Path
import re,json,html
ROOT=Path(__file__).resolve().parents[1]
FILES={'usa':'usa-mortgage-calculator','canada':'canada-mortgage-calculator','uk':'uk-mortgage-calculator','australia':'australia-mortgage-calculator','newzealand':'new-zealand-mortgage-calculator','india':'india-home-loan-emi-calculator','europe':'europe-mortgage-calculator'}
QUESTIONS={
 'uk':{2:'What does the LTV ratio tell me?',3:'What happens to principal under interest only?',5:'How should I compare a remortgage offer?'},
 'australia':{2:'How do regular and accelerated repayment plans differ?',5:'Does this payment determine lender serviceability?'},
 'newzealand':{5:'Is gross rental yield the same as cash profit?'},
 'india':{4:'Does a joint application automatically improve the loan or tax outcome?'},
 'europe':{0:'Does one EUR payment model describe every European mortgage product?'}
}
def build():
 data=json.loads((ROOT/'contents/Site/hub-faqs.json').read_text())
 for country,slug in FILES.items():
  p=ROOT/(slug+'.html');s=p.read_text();answers=iter(data[country]);count=0
  def replace(m):
   nonlocal count
   count+=1
   return m[1]+'<p>'+html.escape(next(answers))+'</p>'+m[3]
  s=re.sub(r'(<div class="faq-a"[^>]*>)([\s\S]*?)(</div>)',replace,s)
  assert count==len(data[country]),(country,count)
  i=0
  def question(m):
   nonlocal i
   text=QUESTIONS.get(country,{}).get(i);i+=1
   return m[1]+html.escape(text)+'<span class="faq-icon" aria-hidden="true">▾</span>'+m[3] if text else m[0]
  s=re.sub(r'(<button class="faq-q"[^>]*>)([\s\S]*?)(</button>)',question,s)
  p.write_text(s)
 print('Replaced unsourced hub FAQ ranges and overbroad legal/eligibility claims.')
if __name__=='__main__':build()
