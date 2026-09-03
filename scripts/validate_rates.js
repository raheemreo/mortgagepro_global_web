/**
 * scripts/validate_rates.js
 * 
 * Verifies that data/rates.json satisfies all production requirements:
 *   - Schema validity (v2)
 *   - Numeric rates & non-empty strings
 *   - Valid ISO dates
 *   - Valid source URLs
 *   - No NaN or negative numbers
 *   - Proper status taxonomy ('live', 'reference', 'stale')
 */

const fs = require('fs');
const path = require('path');

const ratesPath = path.resolve(__dirname, '..', 'data', 'rates.json');
if (!fs.existsSync(ratesPath)) {
  console.error('❌ data/rates.json does not exist!');
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(ratesPath, 'utf8'));

if (data.version !== 2) {
  console.error('❌ Expected version: 2, got:', data.version);
  process.exit(1);
}

const requiredJurisdictions = ['usa', 'canada', 'uk', 'australia', 'newzealand', 'india', 'europe'];
const errors = [];

requiredJurisdictions.forEach(j => {
  if (!data.rates[j]) {
    errors.push(`Missing jurisdiction: ${j}`);
    return;
  }
  const instruments = Object.keys(data.rates[j]);
  if (instruments.length === 0) {
    errors.push(`No instruments configured for: ${j}`);
  }

  instruments.forEach(inst => {
    const item = data.rates[j][inst];
    const key = `${j}.${inst}`;

    // Rate validation
    if (typeof item.rate === 'number') {
      if (isNaN(item.rate) || !isFinite(item.rate) || item.rate <= 0) {
        errors.push(`${key}: invalid numeric rate (${item.rate})`);
      }
    } else if (typeof item.rate !== 'string' || item.rate.trim() === '') {
      errors.push(`${key}: invalid rate format`);
    }

    // Source & URL
    if (!item.source || item.source.trim() === '') errors.push(`${key}: missing source`);
    if (!item.sourceUrl || !item.sourceUrl.startsWith('http')) errors.push(`${key}: invalid sourceUrl (${item.sourceUrl})`);

    // Dates
    if (!item.effectiveDate || isNaN(new Date(item.effectiveDate).getTime())) errors.push(`${key}: invalid effectiveDate (${item.effectiveDate})`);
    if (!item.lastVerified || isNaN(new Date(item.lastVerified).getTime())) errors.push(`${key}: invalid lastVerified (${item.lastVerified})`);

    // Status
    if (!['live', 'reference', 'stale'].includes(item.status)) errors.push(`${key}: invalid status (${item.status})`);
    if (typeof item.isLive !== 'boolean') errors.push(`${key}: isLive must be boolean`);

    // Truth in labeling: reference items must not be marked isLive = true
    if (item.status === 'reference' && item.isLive === true) {
      errors.push(`${key}: reference rate cannot be marked isLive = true!`);
    }
  });
});

if (errors.length > 0) {
  console.error('❌ Validation failed with errors:');
  errors.forEach(e => console.error('  -', e));
  process.exit(1);
} else {
  console.log('✅ ALL VALIDATION CHECKS PASSED: data/rates.json is 100% compliant!');
}
