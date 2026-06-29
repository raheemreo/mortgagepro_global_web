// js/calculators.js — All calculator math + GA4 events
// REO TECH | MortgagePro Global v2.1 | June 2026

'use strict';

// ===== SHARED UTILITIES =====
const fmt = (n, currency = '₹', decimals = 0) => {
  if (isNaN(n)) return `${currency}0`;
  return currency + n.toLocaleString('en-IN', { maximumFractionDigits: decimals });
};
const fmtUSD = (n) => '$' + Math.round(n).toLocaleString('en-US');
const pct = (n) => n.toFixed(2) + '%';

// GA4 event helper (fires only if gtag is loaded)
function fireEvent(name, params = {}) {
  if (typeof gtag !== 'undefined') {
    gtag('event', name, params);
  }
}

// ===== EMI FORMULA (Standard Compound Interest) =====
// EMI = P × r × (1+r)^n / ((1+r)^n - 1)
function calcEMI(principal, annualRatePercent, tenureYears) {
  if (annualRatePercent === 0) return principal / (tenureYears * 12);
  const r = annualRatePercent / 100 / 12;
  const n = tenureYears * 12;
  const emi = principal * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
  return emi;
}

// ===== AMORTIZATION SCHEDULE =====
function buildAmortization(principal, annualRatePercent, tenureYears) {
  const r = annualRatePercent / 100 / 12;
  const n = tenureYears * 12;
  const emi = calcEMI(principal, annualRatePercent, tenureYears);
  const schedule = [];
  let balance = principal;

  for (let month = 1; month <= n; month++) {
    const interest = balance * r;
    const principalPaid = emi - interest;
    balance -= principalPaid;
    if (balance < 0) balance = 0;
    // Store yearly summaries only
    if (month % 12 === 0 || month === n) {
      const year = Math.ceil(month / 12);
      const existing = schedule.find(r => r.year === year);
      if (!existing) {
        schedule.push({ year, emi: Math.round(emi), interest: Math.round(interest * 12), principal: Math.round(principalPaid * 12), balance: Math.round(balance) });
      }
    }
  }
  return schedule;
}

// ===== INDIA EMI CALCULATOR =====
(function initIndiaCalc() {
  const form = document.getElementById('india-calc-form');
  if (!form) return;

  function calculate() {
    const loan = parseFloat(document.getElementById('ind-loan').value) || 5000000;
    const rate = parseFloat(document.getElementById('ind-rate').value) || 8.5;
    const tenure = parseInt(document.getElementById('ind-tenure').value) || 20;

    const emi = calcEMI(loan, rate, tenure);
    const totalPayment = emi * tenure * 12;
    const totalInterest = totalPayment - loan;

    // Display results
    document.getElementById('ind-emi').textContent = fmt(Math.round(emi));
    document.getElementById('ind-total-interest').textContent = fmt(Math.round(totalInterest));
    document.getElementById('ind-total-payment').textContent = fmt(Math.round(totalPayment));

    // Tax benefits (India Section 24b, 80C, 80EEA)
    const sec24 = Math.min(200000, totalInterest / (tenure));
    const sec80c = Math.min(150000, loan * 0.1); // principal approx
    document.getElementById('ind-sec24').textContent = fmt(Math.round(sec24));
    document.getElementById('ind-sec80c').textContent = fmt(Math.round(sec80c));

    // Chart
    if (typeof drawPieChart === 'function') {
      drawPieChart('ind-chart', Math.round(loan), Math.round(totalInterest));
    }

    document.getElementById('india-results').classList.add('visible');

    // Amortization
    const schedule = buildAmortization(loan, rate, tenure);
    renderAmortization('ind-amort-tbody', schedule, '₹');

    fireEvent('calculator_used', { event_category: 'Calculator', event_label: 'india_emi', value: 1 });
  }

  form.addEventListener('submit', (e) => { e.preventDefault(); calculate(); });
  // Auto-calculate on load
  calculate();
})();

// ===== USA MORTGAGE CALCULATOR =====
(function initUSACalc() {
  const form = document.getElementById('usa-calc-form');
  if (!form) return;

  function calculate() {
    const price = parseFloat(document.getElementById('usa-price').value) || 400000;
    const downPct = parseFloat(document.getElementById('usa-down').value) || 20;
    const rate = parseFloat(document.getElementById('usa-rate').value) || 6.82;
    const tenure = parseInt(document.getElementById('usa-tenure').value) || 30;
    const propTax = parseFloat(document.getElementById('usa-tax').value) || 1.2;
    const insurance = parseFloat(document.getElementById('usa-insurance').value) || 1200;

    const downAmount = price * downPct / 100;
    const loan = price - downAmount;
    const ltv = loan / price * 100;
    const pmi = ltv > 80 ? loan * 0.006 / 12 : 0; // ~0.6% annual PMI

    const pi = calcEMI(loan, rate, tenure);
    const taxMonthly = price * propTax / 100 / 12;
    const insMonthly = insurance / 12;
    const piti = pi + taxMonthly + insMonthly + pmi;

    const totalPayment = pi * tenure * 12;
    const totalInterest = totalPayment - loan;

    document.getElementById('usa-pi').textContent = fmtUSD(pi);
    document.getElementById('usa-tax-monthly').textContent = fmtUSD(taxMonthly);
    document.getElementById('usa-insurance-monthly').textContent = fmtUSD(insMonthly);
    document.getElementById('usa-pmi').textContent = pmi > 0 ? fmtUSD(pmi) : '$0 (not required)';
    document.getElementById('usa-piti').textContent = fmtUSD(piti);
    document.getElementById('usa-total-interest').textContent = fmtUSD(totalInterest);
    document.getElementById('usa-total-payment').textContent = fmtUSD(totalPayment);
    document.getElementById('usa-ltv').textContent = ltv.toFixed(1) + '%';
    document.getElementById('usa-loan-amount').textContent = fmtUSD(loan);

    if (typeof drawPieChart === 'function') {
      drawPieChart('usa-chart', Math.round(loan), Math.round(totalInterest));
    }

    document.getElementById('usa-results').classList.add('visible');

    const schedule = buildAmortization(loan, rate, tenure);
    renderAmortization('usa-amort-tbody', schedule, '$');

    fireEvent('calculator_used', { event_category: 'Calculator', event_label: 'usa_mortgage', value: 1 });
  }

  form.addEventListener('submit', (e) => { e.preventDefault(); calculate(); });
  calculate();
})();

// ===== AMORTIZATION TABLE RENDERER =====
function renderAmortization(tbodyId, schedule, currencySymbol) {
  const tbody = document.getElementById(tbodyId);
  if (!tbody) return;
  tbody.innerHTML = schedule.map(row => `
    <tr>
      <td>Year ${row.year}</td>
      <td>${currencySymbol}${row.emi.toLocaleString()}</td>
      <td>${currencySymbol}${row.principal.toLocaleString()}</td>
      <td>${currencySymbol}${row.interest.toLocaleString()}</td>
      <td>${currencySymbol}${row.balance.toLocaleString()}</td>
    </tr>
  `).join('');
}

// ===== AMORTIZATION TOGGLE =====
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.amortization-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const wrap = btn.nextElementSibling;
      const isOpen = wrap.classList.contains('open');
      wrap.classList.toggle('open', !isOpen);
      btn.setAttribute('aria-expanded', String(!isOpen));
      btn.textContent = isOpen ? '📊 Show Amortization Schedule' : '📊 Hide Amortization Schedule';

      if (!isOpen) {
        fireEvent('amortization_expanded', { event_category: 'Engagement' });
      }
    });
  });
});

// ===== CANADA MORTGAGE CALCULATOR =====
(function initCanadaCalc() {
  const form = document.getElementById('canada-calc-form');
  if (!form) return;

  function calculate() {
    const price = parseFloat(document.getElementById('can-price').value) || 650000;
    const downPct = parseFloat(document.getElementById('can-down').value) || 20;
    const rate = parseFloat(document.getElementById('can-rate').value) || 4.99;
    const tenure = parseInt(document.getElementById('can-tenure').value) || 25;
    const income = parseFloat(document.getElementById('can-income').value) || 120000;

    const downAmount = price * downPct / 100;
    const initialLoan = price - downAmount;
    const ltv = initialLoan / price * 100;

    // CMHC premium tier
    let cmhcRate = 0;
    if (ltv > 80) {
      if (ltv <= 85) cmhcRate = 0.028;
      else if (ltv <= 90) cmhcRate = 0.031;
      else if (ltv <= 95) cmhcRate = 0.040;
    }
    const cmhcPremium = initialLoan * cmhcRate;
    const loan = initialLoan + cmhcPremium;

    // Canadian compounding standard: semi-annual
    // r = (1 + R / 2)^(2/12) - 1
    const R = rate / 100;
    const r = Math.pow(1 + R / 2, 2 / 12) - 1;
    const n = tenure * 12;
    const monthlyPayment = loan * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);

    // Stress Test Qualifying Rate: contract rate + 2.0% (BoC baseline 6.99%)
    const stressRate = Math.max(rate + 2.0, 6.99);
    const rStress = Math.pow(1 + (stressRate / 100) / 2, 2 / 12) - 1;
    const stressPayment = loan * rStress * Math.pow(1 + rStress, n) / (Math.pow(1 + rStress, n) - 1);

    // GDS Pass/Fail check (GDS = (Payment + taxes $250 + heating $100) / gross monthly income <= 39%)
    const monthlyIncome = income / 12;
    const heating = 100;
    const taxes = 250;
    const gds = (stressPayment + taxes + heating) / monthlyIncome * 100;
    const stressPass = gds <= 39;

    const totalPayment = monthlyPayment * n;
    const totalInterest = totalPayment - loan;

    document.getElementById('can-monthly-payment').textContent = fmtUSD(monthlyPayment);
    document.getElementById('can-cmhc-premium').textContent = cmhcPremium > 0 ? fmtUSD(cmhcPremium) : '$0 (not required)';
    document.getElementById('can-loan-amount').textContent = fmtUSD(loan);
    document.getElementById('can-total-interest').textContent = fmtUSD(totalInterest);
    document.getElementById('can-total-payment').textContent = fmtUSD(totalPayment);
    document.getElementById('can-ltv').textContent = ltv.toFixed(1) + '%';

    const stressEl = document.getElementById('can-stress-status');
    if (stressEl) {
      stressEl.textContent = stressPass ? 'PASS (Stress test GDS: ' + gds.toFixed(1) + '%)' : 'FAIL (Stress test GDS: ' + gds.toFixed(1) + '%)';
      stressEl.className = stressPass ? 'status-pill status-pass' : 'status-pill status-fail';
    }

    // Amortization (using Canadian compounding)
    const schedule = [];
    let balance = loan;
    for (let month = 1; month <= n; month++) {
      const interest = balance * r;
      const principalPaid = monthlyPayment - interest;
      balance -= principalPaid;
      if (balance < 0) balance = 0;
      if (month % 12 === 0 || month === n) {
        const year = Math.ceil(month / 12);
        schedule.push({ year, emi: Math.round(monthlyPayment), interest: Math.round(interest * 12), principal: Math.round(principalPaid * 12), balance: Math.round(balance) });
      }
    }
    renderAmortization('can-amort-tbody', schedule, '$');

    if (typeof drawPieChart === 'function') {
      drawPieChart('can-chart', Math.round(loan), Math.round(totalInterest));
    }

    document.getElementById('canada-results').classList.add('visible');
    fireEvent('calculator_used', { event_category: 'Calculator', event_label: 'canada_mortgage', value: 1 });
  }

  form.addEventListener('submit', (e) => { e.preventDefault(); calculate(); });
  calculate();
})();

// ===== UK MORTGAGE CALCULATOR =====
(function initUKCalc() {
  const form = document.getElementById('uk-calc-form');
  if (!form) return;

  function calculate() {
    const price = parseFloat(document.getElementById('uk-price').value) || 380000;
    const downPct = parseFloat(document.getElementById('uk-down').value) || 10;
    const rate = parseFloat(document.getElementById('uk-rate').value) || 4.75;
    const tenure = parseInt(document.getElementById('uk-tenure').value) || 25;
    const isFirstTime = document.getElementById('uk-ftb').checked;

    const downAmount = price * downPct / 100;
    const loan = price - downAmount;

    // Standard compound interest (monthly compounding)
    const emi = calcEMI(loan, rate, tenure);
    const n = tenure * 12;
    const totalPayment = emi * n;
    const totalInterest = totalPayment - loan;

    // SDLT (Stamp Duty) Calculation
    let sdlt = 0;
    if (isFirstTime) {
      if (price <= 625000) {
        // Relief applies
        const taxable = Math.max(0, price - 425000);
        sdlt = taxable * 0.05;
      } else {
        // Standard rates apply
        sdlt = calcStandardSDLT(price);
      }
    } else {
      sdlt = calcStandardSDLT(price);
    }

    function calcStandardSDLT(val) {
      let tax = 0;
      if (val > 1500000) {
        tax += (val - 1500000) * 0.12;
        val = 1500000;
      }
      if (val > 925000) {
        tax += (val - 925000) * 0.10;
        val = 925000;
      }
      if (val > 250000) {
        tax += (val - 250000) * 0.05;
      }
      return tax;
    }

    document.getElementById('uk-monthly-payment').textContent = '£' + Math.round(emi).toLocaleString('en-GB');
    document.getElementById('uk-sdlt').textContent = '£' + Math.round(sdlt).toLocaleString('en-GB');
    document.getElementById('uk-loan-amount').textContent = '£' + Math.round(loan).toLocaleString('en-GB');
    document.getElementById('uk-total-interest').textContent = '£' + Math.round(totalInterest).toLocaleString('en-GB');
    document.getElementById('uk-total-payment').textContent = '£' + Math.round(totalPayment).toLocaleString('en-GB');

    const schedule = buildAmortization(loan, rate, tenure);
    renderAmortization('uk-amort-tbody', schedule, '£');

    if (typeof drawPieChart === 'function') {
      drawPieChart('uk-chart', Math.round(loan), Math.round(totalInterest));
    }

    document.getElementById('uk-results').classList.add('visible');
    fireEvent('calculator_used', { event_category: 'Calculator', event_label: 'uk_mortgage', value: 1 });
  }

  form.addEventListener('submit', (e) => { e.preventDefault(); calculate(); });
  calculate();
})();

// ===== AUSTRALIA MORTGAGE CALCULATOR =====
(function initAustraliaCalc() {
  const form = document.getElementById('au-calc-form');
  if (!form) return;

  function calculate() {
    const price = parseFloat(document.getElementById('au-price').value) || 750000;
    const downPct = parseFloat(document.getElementById('au-down').value) || 20;
    const rate = parseFloat(document.getElementById('au-rate').value) || 6.09;
    const tenure = parseInt(document.getElementById('au-tenure').value) || 30;
    const state = document.getElementById('au-state').value || 'NSW';
    const isFirstTime = document.getElementById('au-ftb').checked;

    const downAmount = price * downPct / 100;
    const loanWithoutLmi = price - downAmount;
    const ltv = loanWithoutLmi / price * 100;

    // LMI estimate if deposit < 20%
    let lmi = 0;
    if (ltv > 80) {
      if (ltv <= 85) lmi = loanWithoutLmi * 0.008;
      else if (ltv <= 90) lmi = loanWithoutLmi * 0.016;
      else if (ltv <= 95) lmi = loanWithoutLmi * 0.028;
    }
    const loan = loanWithoutLmi + lmi;

    const emi = calcEMI(loan, rate, tenure);
    const n = tenure * 12;
    const totalPayment = emi * n;
    const totalInterest = totalPayment - loan;

    // Stamp duty by State (NSW, VIC, QLD, WA, SA, TAS, ACT, NT)
    let stampDuty = 0;
    switch(state) {
      case 'NSW':
        if (isFirstTime && price <= 800000) stampDuty = 0;
        else stampDuty = price * 0.04;
        break;
      case 'VIC':
        if (isFirstTime && price <= 600000) stampDuty = 0;
        else stampDuty = price * 0.05;
        break;
      case 'QLD':
        if (isFirstTime && price <= 500000) stampDuty = 0;
        else stampDuty = price * 0.03;
        break;
      default:
        stampDuty = price * 0.04;
    }

    document.getElementById('au-monthly-payment').textContent = '$' + Math.round(emi).toLocaleString('en-AU');
    document.getElementById('au-lmi').textContent = lmi > 0 ? '$' + Math.round(lmi).toLocaleString('en-AU') : '$0 (not required)';
    document.getElementById('au-stamp-duty').textContent = '$' + Math.round(stampDuty).toLocaleString('en-AU');
    document.getElementById('au-loan-amount').textContent = '$' + Math.round(loan).toLocaleString('en-AU');
    document.getElementById('au-total-interest').textContent = '$' + Math.round(totalInterest).toLocaleString('en-AU');
    document.getElementById('au-total-payment').textContent = '$' + Math.round(totalPayment).toLocaleString('en-AU');

    const schedule = buildAmortization(loan, rate, tenure);
    renderAmortization('au-amort-tbody', schedule, '$');

    if (typeof drawPieChart === 'function') {
      drawPieChart('au-chart', Math.round(loan), Math.round(totalInterest));
    }

    document.getElementById('au-results').classList.add('visible');
    fireEvent('calculator_used', { event_category: 'Calculator', event_label: 'australia_mortgage', value: 1 });
  }

  form.addEventListener('submit', (e) => { e.preventDefault(); calculate(); });
  calculate();
})();

// ===== NEW ZEALAND MORTGAGE CALCULATOR =====
(function initNewZealandCalc() {
  const form = document.getElementById('nz-calc-form');
  if (!form) return;

  function calculate() {
    const price = parseFloat(document.getElementById('nz-price').value) || 750000;
    const downPct = parseFloat(document.getElementById('nz-down').value) || 20;
    const rate = parseFloat(document.getElementById('nz-rate').value) || 8.64;
    const tenure = parseInt(document.getElementById('nz-tenure').value) || 30;
    const kiwisaver = parseFloat(document.getElementById('nz-kiwisaver').value) || 0;

    // KiwiSaver reduces required cash down payment
    const rawDownRequired = price * downPct / 100;
    const outOfPocketDown = Math.max(0, rawDownRequired - kiwisaver);
    const actualDown = rawDownRequired;

    const loan = price - actualDown;
    const ltv = loan / price * 100;

    const emi = calcEMI(loan, rate, tenure);
    const n = tenure * 12;
    const totalPayment = emi * n;
    const totalInterest = totalPayment - loan;

    document.getElementById('nz-monthly-payment').textContent = '$' + Math.round(emi).toLocaleString('en-NZ');
    document.getElementById('nz-oop-down').textContent = '$' + Math.round(outOfPocketDown).toLocaleString('en-NZ');
    document.getElementById('nz-loan-amount').textContent = '$' + Math.round(loan).toLocaleString('en-NZ');
    document.getElementById('nz-total-interest').textContent = '$' + Math.round(totalInterest).toLocaleString('en-NZ');
    document.getElementById('nz-total-payment').textContent = '$' + Math.round(totalPayment).toLocaleString('en-NZ');

    const warningEl = document.getElementById('nz-lvr-warning');
    if (warningEl) {
      if (ltv > 80) {
        warningEl.textContent = '⚠️ LVR Warning: Your deposit is less than 20% (LTV: ' + ltv.toFixed(1) + '%). NZ banks have strict limits on low-deposit home loans. You may be charged a Low Equity Premium (LEP) or a rate margin of 0.25% - 0.75%.';
        warningEl.style.display = 'block';
      } else {
        warningEl.style.display = 'none';
      }
    }

    const schedule = buildAmortization(loan, rate, tenure);
    renderAmortization('nz-amort-tbody', schedule, '$');

    if (typeof drawPieChart === 'function') {
      drawPieChart('nz-chart', Math.round(loan), Math.round(totalInterest));
    }

    document.getElementById('nz-results').classList.add('visible');
    fireEvent('calculator_used', { event_category: 'Calculator', event_label: 'newzealand_mortgage', value: 1 });
  }

  form.addEventListener('submit', (e) => { e.preventDefault(); calculate(); });
  calculate();
})();

// ===== EUROPE MORTGAGE CALCULATOR =====
(function initEuropeCalc() {
  const form = document.getElementById('eu-calc-form');
  if (!form) return;

  function calculate() {
    const price = parseFloat(document.getElementById('eu-price').value) || 420000;
    const downPct = parseFloat(document.getElementById('eu-down').value) || 20;
    const rate = parseFloat(document.getElementById('eu-rate').value) || 4.00;
    const tenure = parseInt(document.getElementById('eu-tenure').value) || 25;
    const country = document.getElementById('eu-country').value || 'germany';

    const downAmount = price * downPct / 100;
    const loan = price - downAmount;

    const emi = calcEMI(loan, rate, tenure);
    const n = tenure * 12;
    const totalPayment = emi * n;
    const totalInterest = totalPayment - loan;

    // Europe Notary and Transfer tax estimates by country
    let notaryRate = 0.08;
    switch (country) {
      case 'germany': notaryRate = 0.11; break;
      case 'france': notaryRate = 0.075; break;
      case 'spain': notaryRate = 0.10; break;
      case 'italy': notaryRate = 0.09; break;
      case 'netherlands': notaryRate = 0.06; break;
    }
    const notaryFees = price * notaryRate;
    const totalCashNeeded = downAmount + notaryFees;

    document.getElementById('eu-monthly-payment').textContent = '€' + Math.round(emi).toLocaleString('de-DE');
    document.getElementById('eu-notary-fees').textContent = '€' + Math.round(notaryFees).toLocaleString('de-DE');
    document.getElementById('eu-cash-required').textContent = '€' + Math.round(totalCashNeeded).toLocaleString('de-DE');
    document.getElementById('eu-loan-amount').textContent = '€' + Math.round(loan).toLocaleString('de-DE');
    document.getElementById('eu-total-interest').textContent = '€' + Math.round(totalInterest).toLocaleString('de-DE');
    document.getElementById('eu-total-payment').textContent = '€' + Math.round(totalPayment).toLocaleString('de-DE');

    const schedule = buildAmortization(loan, rate, tenure);
    renderAmortization('eu-amort-tbody', schedule, '€');

    if (typeof drawPieChart === 'function') {
      drawPieChart('eu-chart', Math.round(loan), Math.round(totalInterest));
    }

    document.getElementById('eu-results').classList.add('visible');
    fireEvent('calculator_used', { event_category: 'Calculator', event_label: 'europe_mortgage', value: 1 });
  }

  form.addEventListener('submit', (e) => { e.preventDefault(); calculate(); });
  calculate();
})();
