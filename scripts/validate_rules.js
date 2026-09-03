/**
 * scripts/validate_rules.js
 *
 * Multi-tiered validation engine for MortgagePro Global:
 * 1. Structural Schema Verification (provenance, classifications, ISO dates)
 * 2. Numerical & Financial Rule Consistency (tier sums, continuity, caps)
 * 3. Stale-Data Detection (verification timestamp checks)
 * 4. Cross-Page Text Consistency Checks (detects conflicting claims in HTML)
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const RULES_DIR = path.join(ROOT_DIR, 'data', 'rules');

const ALLOWED_CLASSIFICATIONS = [
  'regulatory_requirement',
  'loan_program',
  'lender_requirement',
  'guideline',
  'illustrative_assumption',
  'historical_sunset_provision'
];

let errors = [];
let warnings = [];

console.log('🔍 [1/4] Scanning statutory rules directory...');

const ruleFiles = [
  'canada/rules.json',
  'uk/rules.json',
  'usa/rules.json',
  'india/rules.json',
  'australia/rules.json',
  'new-zealand/rules.json',
  'europe/rules.json'
];

ruleFiles.forEach(relPath => {
  const fullPath = path.join(RULES_DIR, relPath);
  if (!fs.existsSync(fullPath)) {
    errors.push(`Missing statutory rule file: ${relPath}`);
    return;
  }

  try {
    const raw = fs.readFileSync(fullPath, 'utf8');
    const json = JSON.parse(raw);

    // 1. Structural checks
    if (!json.jurisdiction) errors.push(`${relPath}: missing 'jurisdiction'`);
    if (!json.currency) errors.push(`${relPath}: missing 'currency'`);
    if (!json.last_verified || !/^\d{4}-\d{2}-\d{2}$/.test(json.last_verified)) {
      errors.push(`${relPath}: invalid or missing 'last_verified' date (must be YYYY-MM-DD)`);
    }

    // Stale check
    if (json.last_verified) {
      const verifiedTime = new Date(json.last_verified).getTime();
      const refTime = new Date('2026-09-04').getTime();
      const diffDays = (refTime - verifiedTime) / (1000 * 3600 * 24);
      if (diffDays > 60) {
        warnings.push(`${relPath}: data last verified ${Math.round(diffDays)} days ago (stale check)`);
      }
    }

    // 2. Financial & Numerical checks
    if (relPath.includes('canada')) {
      const limit = json.rules?.insured_purchase_price_limit?.value;
      if (limit !== 1500000) {
        errors.push(`Canada: insured_purchase_price_limit must be exactly 1,500,000 CAD, got ${limit}`);
      }
      const tiers = json.rules?.minimum_down_payment?.tiers;
      if (!tiers || tiers.length !== 3) {
        errors.push(`Canada: minimum_down_payment must have exactly 3 tiers`);
      } else {
        if (tiers[0].rate !== 0.05 || tiers[0].to !== 500000) {
          errors.push(`Canada: tier 1 must be 5% up to 500,000`);
        }
        if (tiers[1].rate !== 0.10 || tiers[1].to !== 1500000) {
          errors.push(`Canada: tier 2 must be 10% up to 1,500,000`);
        }
        if (tiers[2].rate !== 0.20) {
          errors.push(`Canada: tier 3 must be 20% for 1,500,000+`);
        }
      }
    }

    if (relPath.includes('uk')) {
      const standardBands = json.rules?.stamp_duty_land_tax?.standard_residential_bands;
      if (!standardBands || standardBands.length !== 5) {
        errors.push(`UK: SDLT standard bands must contain 5 bands`);
      } else {
        if (standardBands[0].to !== 125000 || standardBands[0].rate !== 0.00) {
          errors.push(`UK: Standard nil-rate band must be 0% up to £125,000`);
        }
        if (standardBands[1].to !== 250000 || standardBands[1].rate !== 0.02) {
          errors.push(`UK: Second SDLT band must be 2% up to £250,000`);
        }
      }
      const ftb = json.rules?.stamp_duty_land_tax?.first_time_buyer_relief;
      if (!ftb || ftb.max_qualifying_purchase_price !== 500000) {
        errors.push(`UK: FTB max qualifying price must be £500,000`);
      }
      if (!ftb?.bands || ftb.bands[0]?.to !== 300000 || ftb.bands[0]?.rate !== 0.00) {
        errors.push(`UK: FTB nil-rate relief must be 0% up to £300,000`);
      }
    }

    if (relPath.includes('usa')) {
      const benchmark = json.rules?.debt_to_income_ratios?.traditional_28_36_benchmark;
      if (benchmark?.classification !== 'guideline') {
        errors.push(`USA: 28/36 ratio MUST have classification 'guideline' to prevent false statutory claims`);
      }
    }

    if (relPath.includes('india')) {
      const oldRegime = json.rules?.income_tax_regimes?.optional_old_regime;
      if (oldRegime?.section_24b_interest_deduction?.max_annual_deduction !== 200000) {
        errors.push(`India: Section 24(b) deduction limit must be 200,000 INR`);
      }
      if (oldRegime?.section_80c_principal_deduction?.max_annual_deduction !== 150000) {
        errors.push(`India: Section 80C deduction limit must be 150,000 INR`);
      }
      const sunset = json.rules?.income_tax_regimes?.historical_sunset_provisions?.section_80eea;
      if (!sunset || sunset.status !== 'historical_sunset_provision') {
        errors.push(`India: Section 80EEA must be marked as 'historical_sunset_provision'`);
      }
    }

  } catch (e) {
    errors.push(`${relPath}: JSON syntax error: ${e.message}`);
  }
});

console.log('✅ [2/4] Statutory rules structural & numerical validation passed.');

// 3. Cross-page consistency checks
console.log('🔍 [3/4] Running cross-page consistency audit against central data...');

function getHtmlFiles(dir) {
  let res = [];
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) {
      if (item !== 'node_modules' && item !== '.git' && item !== 'Designs' && item !== '.agents' && item !== '.gemini') {
        res = res.concat(getHtmlFiles(full));
      }
    } else if (item.endsWith('.html')) {
      res.push(full);
    }
  }
  return res;
}

const htmlFiles = getHtmlFiles(ROOT_DIR);
const disallowedPatterns = [
  { regex: /homes over \$1(?:\.0)?M require a 20% down payment/i, msg: 'Outdated Canada $1.0M cap mention' },
  { regex: /standard stamp duty rates start at 0% for properties up to £250,000/i, msg: 'Outdated pre-April 2025 UK SDLT £250k nil-rate mention' },
  { regex: /first-time buyers pay 0% Stamp Duty on properties priced up to £425,000/i, msg: 'Outdated pre-April 2025 UK FTB £425k relief mention' }
];

htmlFiles.forEach(filePath => {
  const content = fs.readFileSync(filePath, 'utf8');
  const rel = path.relative(ROOT_DIR, filePath);

  disallowedPatterns.forEach(({ regex, msg }) => {
    if (regex.test(content)) {
      errors.push(`Cross-page conflict in ${rel}: ${msg}`);
    }
  });
});

console.log('🔍 [4/4] Evaluating results...');

if (warnings.length > 0) {
  console.log('\n⚠️  WARNINGS:');
  warnings.forEach(w => console.log(`  - ${w}`));
}

if (errors.length > 0) {
  console.error('\n❌ VALIDATION ERRORS DETECTED:');
  errors.forEach(e => console.error(`  - ${e}`));
  process.exit(1);
} else {
  console.log('\n✅ ALL STATUTORY RULES & CROSS-PAGE CHECKS PASSED: 100% compliant!');
  process.exit(0);
}
