# A03 financial verification — 31 October 2026

Status: PARTIAL pending browser/release gates and remaining evidence below. No claim of licensed human financial review or Google approval.

## Maintained model/reference review

| Market | Evidence checked | Result and limits |
| --- | --- | --- |
| USA | VA funding-fee purchase tiers; HUD 2023-05 MIP schedule; FHFA 2026 one-unit baseline; USDA FY2027 fee notice | Maintained values agree. FHA periodic MIP is explicitly an approximation; transaction eligibility and county limits are not inferred. Current HUD handbook supersession was not comprehensively checked in this pass. |
| Canada | CMHC, OSFI, CRA and provincial schedules documented in preceding register entries | NB whole-dollar tax rounding corrected; insurance and straight-switch scope clarified. Unsupported cases remain actual-assessment inputs. |
| UK | HMRC, Revenue Scotland, Welsh Revenue rate tables and relief scopes in preceding entry | Supported ordinary residential scenarios agree; excluded transactions remain excluded. |
| Australia | NSW 2026/27, QLD, VIC, WA, SA, TAS, ACT and NT published schedules; APRA DTI policy | General duty formulas match the inspected schedules. Home-use/first-home and foreign concessions require confirmed inputs. NT low-value formula corroborated by historical statutory text; full current consolidated legislation not inspected. APRA is a lender-flow restriction, not personal approval. |
| New Zealand | IRD current first-home withdrawal, KiwiSaver changes and government contribution; IRD tax/ACC tables; rental-interest guidance | 3.5% contribution baseline, 260.72 government maximum, 1000 retention, resident tax bands and 2026/27 ACC values agree. Provider confirmation, partial-year contributions and special tax cases remain outside scope. |
| India | Official consolidated Income-tax Act 2025 amended by Finance Act 2026 downloaded and read at sections 156/202; PMAY-U 2.0 FAQ | Maintained ordinary resident slabs and rebate/marginal-relief structure agree. The model takes prepared taxable income, excludes special-rate income/surcharge and never awards scheme eligibility. Full case-specific deduction/TDS/PPF legal review is not claimed. |
| Europe | EU mortgage framework and quote-only model source inspection | No universal country tax, LTV or bank offer is invented. Local taxes, fees and eligibility require actual quotes/assessments. This is not a review of every European country's law. |

## Official evidence URLs newly retrieved

- https://www.va.gov/housing-assistance/home-loans/funding-fee-and-closing-costs/
- https://www.hud.gov/sites/dfiles/OCHCO/documents/2023-05hsgml.pdf
- https://www.fhfa.gov/news/news-release/fhfa-announces-conforming-loan-limit-values-for-2026
- https://content.govdelivery.com/accounts/USDARD/bulletins/42b1054
- https://www.apra.gov.au/system/files/2025-11/Implementation%20Details%20-%20DTI%20limit.pdf
- Australia duty sources: URLs in js/australia-tools-catalog.js; NT current high-value tiers: https://treasury.nt.gov.au/dtf/territory-revenue-office/stamp-duty/frequently-asked-questions-stamp-duty
- https://www.ird.govt.nz/kiwisaver-changes
- https://www.ird.govt.nz/kiwisaver/kiwisaver-individuals/growing-my-kiwisaver-account/getting-the-kiwisaver-government-contribution
- https://www.ird.govt.nz/kiwisaver/kiwisaver-individuals/getting-my-kiwisaver-funds-early/getting-my-kiwisaver-for-my-first-home
- https://www.ird.govt.nz/income-tax/income-tax-for-individuals/tax-codes-and-tax-rates-for-individuals/tax-rates-for-individuals
- https://www.ird.govt.nz/income-tax/income-tax-for-individuals/acc-clients-and-carers/acc-earners-levy-rates
- https://www.ird.govt.nz/pages/campaigns/understand-the-property-rules
- https://www.incometaxindia.gov.in/documents/d/guest/income_tax_act_2025_as_amended_by_fa_act_2026-pdf
- https://pmaymis.gov.in/pmaymis2_2024/PmayFAQ.aspx
- https://eur-lex.europa.eu/eli/dir/2014/17/oj/eng

## Policy observations

BoE 3.75%, RBA 4.60%, RBNZ 2.75%, RBI 5.50%, ECB MRO 2.65% corroborated from the official decision pages linked in data/rates.json. Only actual source-check dates/links and review status changed. Effective dates and numerical values retained. Manual next-review target is 4 November, not a promised automatic source verification. Daily US/Canada observations from latest main retained.

## Verification and release

Initial refreshed candidate failed a date-coupled test. After isolating its historical fixture, local model suite: 628 pass. Canonical publication and site/publication validators pass. Local browser execution blocked by missing Chromium and failed archive download. A pinned GitHub browser job was added to exercise all surviving tools and primary pages before promotion. Preview, exact production revision and rollback verification remain separate gates. No production deployment is claimed by this report.
