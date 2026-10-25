/* US article calculators. USD; monthly fixed-rate models; no input telemetry/storage. */
(function (root) {
  'use strict';
  const money = x => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(x);
  function check(value, label, min = 0, max = 1e12) {
    if (!Number.isFinite(value) || value < min || value > max) throw new Error(`${label} must be between ${min} and ${max}.`);
    return value;
  }
  function payment(principal, rate, years) {
    check(principal, 'Principal'); check(rate, 'Annual rate', 0, 30); check(years, 'Term', 1, 40);
    if (!Number.isInteger(years)) throw new Error('Enter a whole number of years.');
    const n = years * 12, r = rate / 1200;
    return r === 0 ? principal / n : principal * r / -Math.expm1(-n * Math.log1p(r));
  }
  function amortization(principal, rate, years, extra = 0) {
    const scheduled = payment(principal, rate, years); check(extra, 'Extra principal');
    let balance = principal, totalInterest = 0, crossover = null;
    const rows = [];
    for (let month = 1; month <= years * 12 && balance > 1e-7; month++) {
      const interest = balance * rate / 1200;
      const paid = Math.min(balance + interest, scheduled + extra);
      const principalPaid = paid - interest;
      balance = Math.max(0, balance - principalPaid);
      if (balance < 1e-7) balance = 0;
      totalInterest += interest;
      if (crossover === null && principalPaid > interest) crossover = month;
      rows.push({ month, payment: paid, principal: principalPaid, interest, balance });
    }
    return { scheduled, months: rows.length, totalInterest, totalPaid: principal + totalInterest, crossover, rows };
  }
  function dti(income, housing, debts) {
    check(income, 'Monthly income', 0.01); check(housing, 'Housing'); check(debts, 'Other debts');
    return { front: housing / income * 100, back: (housing + debts) / income * 100, total: housing + debts };
  }
  function housing(price, down, rate, years, tax, insurance, pmi, hoa) {
    [price, down, tax, insurance, pmi, hoa].forEach(x => check(x, 'Amount'));
    if (price <= 0 || down > price) throw new Error('Price must be positive and down payment cannot exceed price.');
    const loan = price - down, pi = payment(loan, rate, years), piti = pi + tax / 12 + insurance / 12;
    return { loan, pi, piti, total: piti + pmi + hoa, monthlyTax: tax / 12, monthlyInsurance: insurance / 12 };
  }
  function affordability(v) {
    check(v.income, 'Annual income', 0.01);
    ['debts', 'down', 'tax', 'insurance', 'hoa'].forEach(k => check(v[k], k));
    check(v.front, 'Housing ratio', 1, 100); check(v.back, 'Total debt ratio', 1, 100); check(v.pmiRate, 'PMI rate', 0, 10);
    const budget = Math.min(v.income / 12 * v.front / 100, v.income / 12 * v.back / 100 - v.debts);
    const available = budget - v.tax / 12 - v.insurance / 12 - v.hoa;
    // Calling payment also validates rate/term when the budget is exhausted.
    const factor = payment(1, v.rate, v.years);
    if (available <= 0) return { fits: false, budget, loan: 0, price: 0, pmi: 0 };
    const noPmiLoan = available / factor;
    const loan = noPmiLoan <= 4 * v.down || v.pmiRate === 0 ? noPmiLoan : Math.max(4 * v.down, available / (factor + v.pmiRate / 1200));
    const pmi = loan > 4 * v.down + 1e-7 ? loan * v.pmiRate / 1200 : 0;
    return { fits: true, budget, loan, price: loan + v.down, pmi, pi: loan * factor };
  }
  function va(price, downPercent, subsequent, exempt, finance, rate, years) {
    check(price, 'Price', 0.01); check(downPercent, 'Down payment percentage', 0, 99.99);
    const down = price * downPercent / 100, base = price - down;
    const feeRate = exempt ? 0 : downPercent >= 10 ? 1.25 : downPercent >= 5 ? 1.5 : subsequent ? 3.3 : 2.15;
    const fee = base * feeRate / 100, loan = base + (finance ? fee : 0);
    return { down, base, feeRate, fee, loan, pi: payment(loan, rate, years), cash: down + (finance ? 0 : fee) };
  }
  function fha(price, downPercent, finance, rate) {
    check(price, 'Price', 0.01); check(downPercent, 'Down payment percentage', 3.5, 99.99);
    // Standard FHA mortgage amounts are rounded down to whole dollars.
    const base = Math.floor(price * (1 - downPercent / 100));
    const down = price - base, ltv = base / price * 100;
    const upfront = Math.round(base * 0.0175 * 100) / 100;
    const loan = Math.floor(base + (finance ? upfront : 0));
    const cashUpfront = finance ? Math.round((base + upfront - loan) * 100) / 100 : upfront;
    const annualRate = base <= 726200 ? (ltv <= 95 ? 0.5 : 0.55) : (ltv <= 95 ? 0.7 : 0.75);
    const monthlyMip = base * annualRate / 1200;
    const pi = payment(loan, rate, 30);
    return { down, base, upfront, loan, cashUpfront, annualRate, monthlyMip, pi, subtotal: pi + monthlyMip, duration: ltv <= 90 ? '11 years (or earlier payoff)' : 'Loan term (or earlier payoff)' };
  }
  const api = { payment, amortization, dti, housing, affordability, va, fha };
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.USBlogCalculators = api;
  if (typeof document === 'undefined') return;
  function init() {
    document.querySelectorAll('[data-us-calculator]').forEach(widget => {
      const output = widget.querySelector('[data-results]');
      const schedule = widget.querySelector('[data-schedule]');
      const get = key => {
        const el = widget.querySelector(`[name="${key}"]`);
        if (!el || el.value.trim() === '' || !el.checkValidity()) throw new Error('Complete all fields with valid numbers within the displayed limits.');
        return el.tagName === 'SELECT' ? el.value : Number(el.value);
      };
      const num = key => Number(get(key));
      const row = (label, value) => `<div class="us-result"><dt>${label}</dt><dd>${value}</dd></div>`;
      const moneyRow = (label, value) => row(label, money(value));
      function calculate() {
        try {
          let html = '', note = '';
          switch (widget.dataset.usCalculator) {
            case 'mortgage': {
              const loan = num('price') - num('down');
              if (num('price') <= 0 || loan < 0) throw new Error('Enter a positive price and a down payment no greater than the price.');
              const pi = payment(loan, num('rate'), num('years'));
              html = moneyRow('Principal', loan) + moneyRow('Monthly principal & interest', pi) + moneyRow('Total interest, no extra payments', pi * num('years') * 12 - loan);
              note = 'Excludes taxes, insurance, mortgage insurance, HOA and fees.'; break;
            }
            case 'affordability': {
              const v = Object.fromEntries(['income','debts','down','rate','years','tax','insurance','hoa','pmiRate','front','back'].map(k => [k, num(k)]));
              const x = affordability(v);
              if (!x.fits) { html = row('Result', 'No loan fits these planning assumptions.'); note = 'Housing costs or other debts use the available allowance. This is not a credit decision.'; break; }
              html = moneyRow('Modeled purchase price', x.price) + moneyRow('Modeled principal', x.loan) + moneyRow('Housing allowance', x.budget) + moneyRow('Monthly P&I', x.pi) + moneyRow('Assumed monthly PMI', x.pmi);
              note = 'Fixed dollar tax/insurance assumptions; PMI omitted at 20% down. No approval, safety rating or market PMI pricing is implied.'; break;
            }
            case 'amortization': {
              const loan = num('loan'), rate = num('rate'), years = num('years'), extra = num('extra');
              if (loan <= 0) throw new Error('Loan amount must be greater than zero.');
              const x = amortization(loan, rate, years, extra), baseline = amortization(loan, rate, years);
              html = moneyRow('Scheduled monthly P&I', x.scheduled) + row('Payoff with entered extra principal', `${x.months} months`) + moneyRow('Interest with entered extra', x.totalInterest) + moneyRow('Interest saved versus no extra', Math.max(0, baseline.totalInterest - x.totalInterest)) + row('Months saved', baseline.months - x.months);
              schedule.innerHTML = '<table><caption>Monthly schedule; balance after payment, USD</caption><thead><tr><th scope="col">Month</th><th scope="col">Payment</th><th scope="col">Principal</th><th scope="col">Interest</th><th scope="col">Balance</th></tr></thead><tbody>' + x.rows.map(r => `<tr><th scope="row">${r.month}</th><td>${money(r.payment)}</td><td>${money(r.principal)}</td><td>${money(r.interest)}</td><td>${money(r.balance)}</td></tr>`).join('') + '</tbody></table>';
              note = 'Monthly fixed-rate model with a smaller final payment; excludes escrow, fees and servicer-specific rounding.'; break;
            }
            case 'down': {
              const price = num('price'), percent = num('percent'), down = price * percent / 100;
              const loan = price - down, pi = payment(loan, num('rate'), num('years'));
              const pmi = percent >= 20 ? 0 : loan * num('pmiRate') / 1200;
              // Validate PMI even if the 20% threshold removes it.
              num('pmiRate');
              html = moneyRow('Cash down payment', down) + moneyRow('Principal', loan) + moneyRow('Monthly P&I', pi) + moneyRow('Assumed monthly PMI', pmi) + moneyRow('P&I + PMI', pi + pmi);
              note = 'Conventional monthly-PMI scenario only. Excludes closing costs, tax, property insurance and HOA; PMI rate is your assumption.'; break;
            }
            case 'dti': {
              const debts = num('auto') + num('student') + num('cards') + num('other');
              const x = dti(num('income'), num('housing'), debts);
              html = row('Housing ratio', x.front.toFixed(2) + '%') + row('Total DTI', x.back.toFixed(2) + '%') + moneyRow('Total monthly obligations', x.total);
              note = 'Ratios only; not a qualification decision or a universal 28/36 or 43% limit.'; break;
            }
            case 'fha': {
              const x = fha(num('price'), num('percent'), get('finance') === 'yes', num('rate'));
              html = moneyRow('Base loan', x.base) + moneyRow('Upfront MIP', x.upfront) + moneyRow('Principal after whole-dollar rounding', x.loan) + moneyRow('Upfront MIP payable in cash', x.cashUpfront) + row('Annual MIP tier', x.annualRate.toFixed(2) + '%') + moneyRow('Opening-balance monthly MIP approximation', x.monthlyMip) + moneyRow('Monthly P&I', x.pi) + moneyRow('Approximate P&I + MIP', x.subtotal) + row('Annual MIP duration', x.duration);
              note = 'Standard 30-year purchase model only. Monthly MIP is an approximation, not HUD annual-average-balance billing. Excludes tax/insurance/HOA; no loan-limit or credit eligibility check.'; break;
            }
            case 'piti': {
              const x = housing(...['price','down','rate','years','tax','insurance','pmi','hoa'].map(num));
              html = moneyRow('Principal', x.loan) + moneyRow('Monthly P&I', x.pi) + moneyRow('Monthly property tax', x.monthlyTax) + moneyRow('Monthly homeowners insurance', x.monthlyInsurance) + moneyRow('PITI subtotal', x.piti) + moneyRow('Mortgage insurance, separate', num('pmi')) + moneyRow('HOA, separate', num('hoa')) + moneyRow('Housing total', x.total);
              note = 'Not every charge is escrowed. Excludes maintenance, utilities, closing costs and future bill changes.'; break;
            }
            case 'va': {
              const x = va(num('price'), num('percent'), get('use') === 'subsequent', get('exempt') === 'yes', get('finance') === 'yes', num('rate'), num('years'));
              html = moneyRow('Base loan after down payment', x.base) + row('Funding fee tier', x.feeRate.toFixed(2) + '%') + moneyRow('Funding fee', x.fee) + moneyRow('Principal including financed fee', x.loan) + moneyRow('Monthly P&I', x.pi) + moneyRow('Down payment + cash-paid funding fee', x.cash);
              note = 'Purchase only. Exemption is your assumption, not verified. Other closing costs, tax/insurance/HOA, entitlement and appraisal are not modeled.'; break;
            }
          }
          output.innerHTML = `<dl>${html}</dl><p>${note}</p>`;
          output.classList.remove('us-error');
        } catch (error) {
          output.textContent = error.message;
          output.classList.add('us-error');
          if (schedule) schedule.replaceChildren();
        }
      }
      widget.addEventListener('input', calculate);
      widget.addEventListener('change', calculate);
      calculate();
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})(typeof globalThis !== 'undefined' ? globalThis : this);
