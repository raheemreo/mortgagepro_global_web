# US blog audit — 25 October 2026

Repository: raheemreo/mortgagepro_global_web. Baseline main commit: 7c8adee26736a3f1a9d49840c15e515edb0bb93c.

Scope: eight blog/usa-*.html articles, their contents/USA/*.md sources, their index cards, calculation behavior, metadata and internal links. The root USA calculator and other countries are outside this change. This report records findings before implementation; resolution and verification are below.

## Findings before editing

| Article | Evidence and issue | Priority / classification |
|---|---|---|
| Mortgage | 6.43% called a current national average without an observation date; inconsistent 6.47% examples elsewhere. Incorrect 15-year payment and interest-saving claims; principal-and-interest stability confused with total payment stability. Meta promises a PITI calculator and Fed benchmarks while article supplies neither. APR presented as sufficient for comparison. | High: financial accuracy and misleading expectations |
| Affordability | Widget assigns 18% of payment to tax/insurance and ignores PMI despite the article's central promise; no initial calculation. Unsupported PMI market averages and 5–8% price uplift. Appreciation treated as automatic statutory PMI eligibility. 'Maximum safe' and qualification labels imply approval. | High: calculator/content mismatch |
| Amortization | Year-5/15/25 balance table does not match stated loan/rate; midpoint and crossover descriptions inconsistent; static results differ from input defaults and are not calculated on load. Overgeneralized extra-payment and equity claims. | High: numerical accuracy |
| Down payment | Estimated PMI presented as average pricing without evidence; payment totals are inconsistent. Treats 3%-down programs as first-time-only and appreciation as an automatic cancellation trigger. | High: numerical and eligibility accuracy |
| DTI | Net-pay denominator described as understating DTI (it increases it). Widget calls 43% a QM cap and results 'Safe'/'Qualified'. Says debts count only if on credit report, wrongly generalizes retirement-plan debts, and implies spouse debt can never matter on individual applications. No initial calculation. | High: outdated qualification and debt rules |
| FHA | MIP estimated on financed balance, then held flat for 30 years to claim $48,600; annual assessment changes with scheduled balance. Uses closing/origination date instead of case-number assignment date for rules. Old cancellation rules overgeneralized. 580 score described as sufficient approval. | High: insurance cost and eligibility accuracy |
| PITI | Headline says two-fifths, unsupported by its numbers. PITI includes PMI/HOA in some places but excludes them elsewhere; widget merges HOA and PMI and labels combined amount taxes/insurance. Blanket VA escrow requirement, unconditional reassessment claims. No initial calculation. | High: cost categorization and numerical accuracy |
| VA | $400,000 × (3.30% − 2.15%) = $4,600, not $5,150. Funding fee called insurance cost; broad 'any disability rating' exemption and confusing entitlement restoration. Unverified blanket 2026 tax deduction. Financing fee doesn't display resulting balance/payment. | High: fee, exemption and tax accuracy |
| All eight | No direct external official source links in article main content. Unsupported author job title carried into byline/schema; no evidence of a licensed reviewer. Dates and social metadata not synchronized with meaningful changes. Repetitive formulaic wording and unsourced broad market claims. | Medium/high: trust and editorial quality; not automatic proof of an AdSense violation |
| Four existing widgets | Stale static output until a user changes a value; empty/invalid values can leave stale results; financial status labels imply approval. | High: usability and reliability |

## Policy interpretation

Google Publisher Policies prohibit misleading representation, low-value/replicated inventory without added value, intrusive ads and more advertising than publisher content. AdSense Program policies also prohibit incentivized/invalid clicks and disruptive navigation. Ordinary mortgage education is not inherently prohibited. These articles' factual errors are not automatically a finding under Google's 'unreliable and harmful claims' subsection, whose specific examples concern elections, health and climate. Missing citations or an author credential are not standalone blanket AdSense bans.

Google Search's people-first/YMYL guidance is relevant to financial trust and ranking; it is distinct from AdSense approval rules. There is no verified 'human detector score', mandatory word count or mandatory article count that guarantees approval. No invented personal experience, licensed-review claims, client stories, or detector-evasion tactics should be added.

## Sources checked

Access date: 2026-10-25. These are primary sources, not lender marketing averages.

- Freddie Mac PMMS: https://www.freddiemac.com/pmms — observation 2026-10-22: 30-year 7.32%, 15-year 6.68%. Dated reference, not a personalized quote or perpetual live rate.
- CFPB Loan Estimate: https://www.consumerfinance.gov/owning-a-home/loan-estimate/
- CFPB rate/APR: https://www.consumerfinance.gov/ask-cfpb/what-is-the-difference-between-a-mortgage-interest-rate-and-an-apr-en-135/
- CFPB PMI cancellation: https://www.consumerfinance.gov/ask-cfpb/when-can-i-remove-private-mortgage-insurance-pmi-from-my-loan-en-202/
- Fannie Mae DTI, B3-6-02: https://selling-guide.fanniemae.com/sel/b3-6-02/debt-income-ratios
- Fannie Mae debts, B3-6-05 (2026-08-05): https://selling-guide.fanniemae.com/sel/b3-6-05/monthly-debt-obligations
- Fannie Mae low-down-payment options: https://yourhome.fanniemae.com/buy/homebuyer-down-payment
- HUD MIP: https://www.hud.gov/hud-partners/housing-mip
- HUD monthly MIP method: https://www.hud.gov/hud-partners/housing-premium-calculation — historical rate examples on this page are not current premium tables.
- HUD Mortgagee Letter 2023-05: https://www.hud.gov/sites/dfiles/OCHCO/documents/2023-05hsgml.pdf — direct retrieval returned 403. The current August 12, 2026 Handbook PDF was subsequently downloaded and its premium appendix, credit-score framework and whole-dollar rounding rule checked directly.
- HUD MIP duration: https://entp.hud.gov/sfohlp/f17updbal.cfm
- HUD current handbook PDF: https://www.hud.gov/sites/default/files/Housing/documents/40001-hsgh-Update-18.pdf — issued 2026-08-12; Appendix 1.0 printed p.1749 (PDF p.1774), II.A.2.e.i(A) printed p.182 (PDF p.207), and credit-score table printed p.179. The premium-table page was rendered and visually checked. The full 1,872-page handbook was not read.
- HUD handbook portal: https://www.hud.gov/hud-partners/single-family-handbook-4000-1
- VA fee schedule/exemptions (updated 2026-10-05): https://www.va.gov/housing-assistance/home-loans/funding-fee-and-closing-costs/
- VA purchase: https://www.va.gov/housing-assistance/home-loans/loan-types/purchase-loan/
- VA entitlement: https://www.va.gov/housing-assistance/home-loans/loan-limits/
- IRS Publication 936: https://www.irs.gov/publications/p936 — tax-year-specific advice is excluded from the calculators; no universal deduction asserted.
- Google Publisher Policies: https://support.google.com/adsense/answer/10502938?hl=en
- AdSense Program policies: https://support.google.com/adsense/answer/48182?hl=en
- Certified CMP requirements: https://support.google.com/adsense/answer/13554116?hl=en
- Google Search people-first content: https://developers.google.com/search/docs/fundamentals/creating-helpful-content

## Account-wide and production checks still required

- No certified CMP loader/configuration was established by the checked article source or shared header/components. The footer references googlefc, and the privacy/cookie policies claim consent operation. Google may inject its CMP via configured AdSense messages; repository absence alone does not prove noncompliance. Verify the actual published message, region behavior, rejection and withdrawal in AdSense Privacy & Messaging. Consent Mode defaults alone are not a certified CMP.
- Verify Auto ads after approval on mobile and desktop: separation from calculator controls, no overlap, no excess ad density or accidental-click layout. Empty ad placeholders in source do not verify actual ad delivery.
- Verify privacy/cookie statements against hosting logs, analytics, any Clarity use, actual cookies and retention. No claim that the entire site's privacy implementation is audited or compliant.
- Verify factual author biography and any professional credentials; no independently licensed financial review was performed or invented here.
- Account eligibility, ownership, traffic validity, other 35 articles and site-wide approval remain outside the eight-article audit. No approval percentage or guarantee is assigned.

## Implementation and verification

The findings above were recorded before implementation. The completed changes and actual local verification are recorded below.

### Changes implemented

- Rewrote all eight articles and synchronized their Markdown sources. Each has a distinct reader task, explicit assumptions, worked arithmetic, limitations, primary-source links and a dated update.
- Replaced unsupported individual expert bylines/job titles on these pages with the actual publisher organization in visible metadata and Article schema. This does not assert human authorship or licensed financial review.
- Added a working local calculator to the four articles that previously had no on-page calculator; replaced the four inconsistent inline widgets with one scoped, tested model module. No form submission, telemetry or storage was added for entered numbers.
- Affordability now budgets explicit tax, insurance, HOA and PMI instead of an unexplained 18% allowance. It handles the exact 20%-down discontinuity and does not call a result safe or approved.
- Amortization includes the full expandable monthly schedule, an extra-principal comparison and an adjusted final payment.
- FHA uses the verified standard 30-year premium tiers, base-loan upfront premium, whole-dollar mortgage rounding and an explicitly approximate monthly MIP. It makes no false flat lifetime MIP projection.
- VA uses the correct purchase fee tiers, exemption assumption, financed/cash fee distinction and $4,600 example difference. The unsupported universal deduction statement was removed.
- PITI, mortgage insurance and HOA are separate amounts. DTI no longer displays a 43% QM cap or a qualified/safe result.
- Updated the eight index cards and sitemap modification dates; preserved existing original publication dates and URLs. Synchronized title, description, social metadata and JSON-LD.
- Queued existing regional Consent Mode defaults before the AdSense loader on these eight pages. Removed the unnecessary shared live-rate hydration script from these dated-example articles. This is not a CMP deployment or certification claim.
- Added a stdlib-only reproducible article builder, structural validator, numerical regression fixtures and browser checks. CI runs the dependency-free calculation, metadata/link and rebuild checks.

### Verification performed

- `node --test tests/us-blog-calculators.test.cjs`: 15 test cases pass. Covers independently calculated payment/schedule fixtures, principal conservation, zero interest, invalid inputs, PMI budgeting and threshold behavior, DTI, PITI, FHA tiers/rounding and VA fee boundaries/exemption/financing.
- `python scripts/validate_us_articles.py`: all eight pass source/body/metadata/index synchronization, JSON-LD parsing, preserved original dates, primary references, labels, unique IDs, local targets and consent ordering.
- Article rebuild run twice and generated-file hashes compared: idempotent.
- `git diff --check`: pass after whitespace cleanup.
- Local Chromium 134 via Playwright: 24 page/viewport cases pass (8 pages × 1280px light / 390px light / 320px dark). Each checks initial results, clearing/negative inputs, recovery, zero rates where applicable, no page overflow and no JS errors. Additional checks cover schedule length/extra principal, separate PITI/HOA and VA exemption selection.
- Eight additional browser loads with JavaScript disabled: readable articles, examples and external source links remain available.
- Representative mobile/desktop widget screenshots inspected for mortgage, affordability, PITI and FHA. These are local preview checks, not screenshots of a deployed change.
- All third-party requests were blocked in browser tests. No live ads were loaded or clicked. Actual Auto ads behavior, consent delivery and AdSense approval status were not verified by these tests.

### Reproduce

1. `python scripts/build_us_articles.py`
2. `python scripts/validate_us_articles.py`
3. `node --test tests/us-blog-calculators.test.cjs`
4. Optional browser checks: install Playwright and a compatible Chromium, then run `node tests/us-blog-browser.cjs`. The script starts a local server; set `QA_BASE_URL` to use an existing preview. `CHROMIUM_PATH` can specify an installed binary. `QA_SCREENSHOT_DIR` is optional and should point outside the repository.

The new GitHub Actions workflow has been authored but was not claimed to have run remotely at the time of writing this report. Passing local tests does not certify site-wide AdSense compliance or guarantee approval.
