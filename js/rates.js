// js/rates.js — Single source of truth for all mortgage rate data
// Update this file monthly. Last updated: June 2026
// REO TECH | MortgagePro Global v2.1

const RATES = {
  lastUpdated: "June 2026",
  lastUpdatedISO: "2026-06",

  usa: {
    fed: "5.25%",
    fixed30: "6.82%",
    fixed15: "6.11%",
    arm5: "6.45%",
    fhaMin: "3.5%",
    pmiThreshold: "80%",
    note: "Source: Freddie Mac Primary Mortgage Market Survey"
  },
  canada: {
    boc: "4.75%",
    fixed5: "4.99%",
    fixed3: "5.14%",
    variable: "5.95%",
    stressTest: "6.99%",
    cmhcMin: "5%",
    note: "Source: Bank of Canada"
  },
  uk: {
    boe: "5.25%",
    fixed2: "4.75%",
    fixed5: "4.35%",
    tracker: "5.50%",
    note: "Source: Bank of England"
  },
  australia: {
    rba: "4.35%",
    variable: "6.09%",
    fixed2: "6.29%",
    fixed3: "6.15%",
    lmiThreshold: "80%",
    note: "Source: Reserve Bank of Australia"
  },
  newzealand: {
    ocr: "5.50%",
    floating: "8.64%",
    fixed1: "7.09%",
    fixed2: "6.75%",
    lvrLimit: "80%",
    note: "Source: Reserve Bank of New Zealand"
  },
  india: {
    repo: "6.50%",
    homeLoanSbi: "8.50%",
    homeLoanHdfc: "8.70%",
    homeLoanIcici: "8.75%",
    note: "Source: Reserve Bank of India"
  },
  europe: {
    ecb: "4.00%",
    germany10yr: "3.85%",
    france20yr: "3.60%",
    spainVariable: "4.10%",
    note: "Source: European Central Bank"
  }
};

// Inject rates into [data-rate] elements and update [data-rate-updated] text
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-rate]').forEach(el => {
    const [country, key] = el.dataset.rate.split('.');
    if (RATES[country]?.[key]) el.textContent = RATES[country][key];
  });

  document.querySelectorAll('[data-rate-updated]').forEach(el => {
    el.textContent = `Rates as of ${RATES.lastUpdated}. Verify with your lender.`;
  });
});
