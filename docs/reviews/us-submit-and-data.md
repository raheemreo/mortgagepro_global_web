# US calculators: explicit calculation and current-input review

Updated October 26, 2026 (India). Website only: `raheemreo/mortgagepro_global_web`. The app reference remains read-only at `9f79ea943e27b6d8b0c1ca411c37fb4cae077f72`.

## Interaction contract

All 43 dedicated US tools, eight US article widgets and the US landing calculator now require an explicit Calculate action. Opening a page, entering input, changing a selector/state or resetting does not execute a calculation. Dedicated tools initially hide the entire output panel. After a valid submission, results are rendered and focused/scrolled into view; reduced-motion preferences are respected. Editing clears the previous results, tables and CSV controls. Reset restores declared initial input settings and clears output without recalculating. Invalid submission reports validation feedback and leaves valid financial results hidden. The page itself is not reloaded.

The US main calculator no longer performs its former DOMContentLoaded calculation or starts with a visible result. Its sample purchase/rate values are blank, advanced costs explicitly default to zero/excluded, and result placeholders are neutral. US article widgets now have submit/reset controls, clear results on edits and do not calculate on load. Their published worked examples remain educational content, separate from personal input data. Updated article JS/CSS and dedicated-tool assets use content hashes to invalidate cached versions.

## Data and model changes

Personal monetary values, quoted rates, tax figures and investment forecasts begin blank. Term/down-payment and debt-budget settings remain editable planning choices, not statements about a current market price. Explicit zero-cost inputs mean the cost is excluded; they are not purported quotations. Tax-year standard deduction and applicable SALT cap still require user entry.

Unverified pricing is no longer inferred from the app's illustrative tables:

| Tool | Current behavior |
| --- | --- |
| PMI, down-payment scenarios, piggyback | Enter current PMI quote(s). No score-to-premium table is used; PMI is zero when the modeled down payment is at least 20%. |
| Homeowner, HO-1/3/5/6, flood, hurricane and wildfire | Enter an insurer quote/renewal premium. Monthly budget is annual premium / 12 without artificial whole-dollar pricing. Coverage and actual dollar/percentage deductibles are shown. These are quote-budget tools, not insurer underwriting engines. |
| Credit-score impact | Compare two actual rate offers on the same principal/term. No fictional current score-tier rate sheet or rate prediction. Points, fees and credit eligibility are not inferred. |
| Moving | Add itemized current mover quotes and entered costs with an explicit contingency budget. No fixed distance/room-size matrix or seasonal markup. |
| Closing costs | Appraisal, credit report, title, settlement and recording are actual entered amounts. Fixed allowances were removed. Origination, points, prepaid interest and escrow retain their disclosed arithmetic. |
| State property tax | State links select a location only. The old state-average percentages were removed; the applicable assessed value, exemption and local rate must be entered. |

`data/us-tool-reference.json` records the policy/benchmark facts checked October 25, 2026, with primary URLs and dates. The October 22 Freddie Mac PMMS conventional averages (30-year 7.32%, 15-year 6.68%) are shown as dated contextual references on relevant mortgage tools; they never silently populate a personal quoted rate or get represented as an APR/live quote. USDA FY 2027 1%/0.35%, VA purchase tiers, FHA MIP structure and the 2026 $832,750 one-unit conforming baseline were checked against the linked primary publications. No automatic future refresh is claimed. Local assessment, lender/insurance/mover quotes and borrower circumstances cannot be determined from a national average.

The pure mortgage/amortization math and corrected statutory-fee scenarios retain their existing boundary and conservation checks. Quote-budget arithmetic now uses the amounts actually supplied. Regression fixtures are explicit test-only examples under `tests/fixtures/`; those files are excluded from published assets. Other countries and rate feed/API behavior are outside this update.

## Verification

- 121 model/rate tests passed (68 dedicated-tool checks plus the prior 53).
- All 110 HTML pages passed structural/link/consent validation; 43 article and rate snapshot validators passed.
- 129 dedicated-tool/viewport cases passed (43 tools × desktop/light, mobile/light and narrow/dark). Instrumented tests count calls to the actual calculation entry point: zero on initialization/typing/selectors/reset, one after the first valid submit. Invalid submits, fresh calculations after edits, zero interest, focus/scroll, reset values, CSV and six state URLs were exercised.
- All 43 dedicated pages retained formulas/references without JavaScript, with calculation action and result panel hidden. The homepage/country/US-directory flow passed.
- US article widgets: 24 page/viewport cases and eight no-JavaScript article checks passed, including explicit submit, edit clearing, zero rate, reset and program-specific outputs.
- Existing site regression: 69 page/viewport checks passed, including the seven country calculators; the US landing test now supplies personal figures after asserting no initial result.
- Mobile PITI and desktop property-tax screenshots were inspected. Deployment proof is recorded in the PR.
