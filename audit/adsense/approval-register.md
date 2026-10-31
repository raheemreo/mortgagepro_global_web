# AdSense readiness — technical work register

## A02 — primary-page feature claims and content review

- Priority: Critical
- Status: PARTIAL. This completed correction batch is not completion of the whole content program.
- Review date: 2026-10-30
- Start commit: 7212df6f675e9f7487b8b51fc132b2836a901bfb
- Final commit: the commit containing this register; see Git history.
- Verified defects: homepage implied bank-rate comparisons and market-average defaults; India metadata advertised comparisons beyond the quote-input tool; NZ hero implied processing KiwiSaver withdrawals; seven hub headings implied rate comparisons although they link to calculators; homepage DTI teaser overstated approval determination; two central-bank links used ambiguous Live labels.
- Files changed: index.html and the seven root country calculator HTML pages, plus these technical registers.
- Correction: describe actual scenario calculations, user-supplied quotes, provider-confirmed withdrawals and country navigation. Preserve financial models, sources, observation dates and indexing/ad exclusions.
- Content inspected: all eight indexable US articles (mortgage, PITI, affordability, DTI, down payment, VA, FHA and amortization); country planning explanations and targeted claims/navigation on all seven hubs. Articles have distinct worked examples, scope and limitations. This is an editorial source inspection, not fresh verification of every financial rule or browser interaction.
- Google relevance: accurate expectations, useful original content and clear navigation. See https://support.google.com/adsense/answer/7299563 and https://support.google.com/adsense/answer/12176698 (retrieved 2026-10-30). No word-count threshold or approval guarantee is asserted.
- Tests run/passed: node --test tests/*.test.cjs (627/627); canonical build scripts/build_publisher_release.py; validate_site_readiness.py; validate_publisher_release.py; git diff --check.
- Tests failed: none in the checks above. Browser/mobile QA is NOT VERIFIED in this batch.
- Inventory: validators report 247 HTML pages, 39 canonical sitemap entries and 36 aliases. Existing publication scope retains 143 distinct tools; 136 specialist tools and 35 non-US articles remain excluded pending individual review.
- Preview status: NOT VERIFIED.
- Production deployment required: yes, after the wider requested correction/QA work and release gates.
- Deployment status: NOT DEPLOYED.
- Deployment ID / URL: none for this batch.
- Live production verification: NOT VERIFIED for these changes.
- Rollback status: not applicable; production unchanged by this batch.
- AdSense risk resolved: specific misleading feature claims corrected in source only. Site approval and whole-site low-value remediation are not established.
- Owner action required: none for continued source review; Google review must be separately authorized.
- Remaining issues: individual review of excluded content; current primary-source financial verification (including homepage CMHC wording); interactive/mobile QA; production parity. Noindex is not proof that a site-level quality concern is resolved.
- Next task: continue individual content review and A03 financial verification without lifting exclusions or changing calculator models speculatively.

## Scope of this register

This public technical register contains code-review evidence only. It does not reproduce private account screenshots or deployment-account audit material. A01 account findings and A04–A11 completion must not be inferred from this batch.

## A03 — CMHC homepage glossary correction

- Priority: Critical
- Status: PARTIAL — one independently verified factual correction; not all-market verification.
- Start commit: ee4d7b6 (local A02 checkpoint; remote equivalent f1fe95e).
- Final commit: the commit containing this entry.
- Verified defect: the glossary asserted universal CMHC insurance below 20% down, an unqualified 0.6%–4% premium range, and automatic financing of the premium.
- Evidence: CMHC premium schedule retrieved 2026-10-30 includes 4.50% for the specified non-traditional-down-payment tier, a 0.20% surcharge beyond 25 years, and provincial premium tax that cannot be financed. URL is linked in the corrected glossary.
- Change: explain product/LTV/amortization scope, optional premium financing, separate provincial premium tax and lender confirmation. No changes to calculator formulas or date-stamped rate observations.
- Google policy relevance: avoid misleading financial information and unsupported universal claims.
- Files changed: index.html; technical approval/deployment registers.
- Tests: canonical build, both validators and 627 Node tests; see command results for this revision.
- Preview, production deployment and live verification: NOT VERIFIED / NOT DEPLOYED.
- Rollback: not applicable; no production promotion.
- Risk resolved: homepage glossary defect corrected in source; not a full Canadian financial audit.
- Owner action required: none for continued verification.
- Remaining issues / next task: verify the remaining country references and excluded-page content; complete browser/mobile QA before promotion.

## A03 — Canada qualifying-rule cross-check

- Date: 2026-10-30; status PARTIAL (scoped Canada review).
- Start commit: 9f0e063; final commit: containing this entry.
- Verified sources: CMHC Purchase, Calculating GDS/TDS; OSFI current minimum qualifying rate and detailed straight-switch letter; CRA HBP and FHSA qualifying-withdrawal guidance.
- Checks consistent with source: 5% first CAD 500,000 plus 10% remainder for the supported 1–2 unit insured purchase; purchase below CAD 1.5 million; max(contract + 2pp, 5.25%) standard assessment; half condo fees and full ground rent; 39/44 ratios clearly scoped; HBP CAD 60,000; confirmed FHSA withdrawal can exceed contribution limits.
- Verified defect: straight-switch text omitted the CAD 3,000 transaction-cost exception and stand-alone mortgage scope. Added the detailed OSFI source, no equity take-out, no amortization extension and continued lender assessment. Source: https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/osfi-exempts-uninsured-mortgage-straight-switches-prescribed-mqr-implements-portfolio-lti-limits .
- Files changed: Canada hub, Canada catalog, legacy-display generator, generated Canada tool pages (catalog content hash), technical registers. No financial-model formula changes.
- Google relevance / risk resolved: more accurate financial explanation in source; no claim of approval readiness.
- Tests passed: 627/627 Node tests, canonical build, both publication/site validators, git diff --check. Tests failed: none in this scope.
- Preview / live verification: NOT VERIFIED. Production required eventually, but NOT DEPLOYED. No rollback initiated. Owner action required: none for continuing source review.
- Remaining: provincial transfer-tax schedules, other countries, excluded-content review and browser/mobile QA. No reference-wide verification date was advanced.
- Next task: continue remaining financial references and page-specific content review.

## A03 — Canadian transfer-tax schedules and rounding

- Date: 2026-10-30; Priority: Critical; Status: PARTIAL (completed correction batch, not all-market completion).
- Start commit: 2c03848; Final commit: containing this entry.
- Verified defects: NB returned fractional dollars despite Real Property Transfer Tax Act section 2(3) requiring nearest-dollar rounding, with 50 cents rounded upward. Ontario/Toronto and BC selection labels did not make modeled property-class limits explicit.
- Correction: round NB base tax with Math.round(value / 100); label Ontario/Toronto as 1–2 single-family residences and BC as wholly residential. Direct unsupported property classes to a confirmed Other assessment. Replace NB tax-sale FAQ citation with the actual statute.
- Example: CAD 123,450 taxable value formerly returned CAD 1,234.50; now CAD 1,235. At CAD 123,449 it returns CAD 1,234. Other province calculations unchanged.
- Sources checked: Ontario Calculating Land Transfer Tax; Toronto MLTT Rates & Fees (April 2026 bands); Montreal 2026 transfer-duty table and CAD 700,000 worked example; Alberta October 2026 common-document fee schedule; Manitoba Land Transfer Tax; BC Property Transfer Tax; NB Real Property Transfer Tax Act 2(1.03), 2(3). Official URLs are in js/canada-tools-catalog.js. These checks support the modeled schedules; exemptions, transaction history, mixed property and nonresident surcharges need case-specific assessment.
- Google policy relevance: accurate financial estimates and transparent scope.
- Files changed: Canada model/catalog, regression test, regenerated Canada pages/hub, audit registers. Generated changes refresh model/catalog cache hashes.
- Tests passed: focused Canada suite; full 628/628 Node suite; canonical build; site-readiness and publisher validators (247 pages, 39 sitemap entries, 36 aliases); git diff --check.
- Tests failed: none. Preview/mobile/browser interaction: NOT VERIFIED in this batch.
- Production deployment required: yes after release gates; Deployment status: NOT DEPLOYED; Deployment ID: none; Live verification: NOT VERIFIED; Rollback: not initiated.
- AdSense risk resolved: a verified calculation defect fixed in source, not proof of Google readiness. Owner action required: none for continued audit.
- Remaining issues: NS municipal rate remains user-entered; other unsupported jurisdictions require confirmed assessments. No full provincial exemption audit claimed. Other countries and full browser/mobile QA remain.
- Next task: remaining country-specific financial references and excluded content.

## A03 — UK residential purchase-tax verification

- Date: 2026-10-30; Priority: Critical; Status: PASS for the stated rate/formula review only. Whole A03 remains PARTIAL.
- Start commit: 284870e; Final commit: containing this entry.
- Verified defects: none found in the supported ordinary individual purchase-tax scenarios reviewed. No calculator or published-page edits warranted.
- Sources retrieved: https://www.gov.uk/stamp-duty-land-tax/residential-property-rates ; https://www.gov.uk/guidance/stamp-duty-land-tax-relief-for-land-or-property-transactions ; https://revenue.scot/taxes/land-buildings-transaction-tax/residential-property ; https://revenue.scot/taxes/land-buildings-transaction-tax/additional-dwelling-supplement-ads ; https://www.gov.wales/land-transaction-tax-rates-and-bands ; https://www.gov.wales/higher-rates-land-transaction-tax-overview .
- England/NI: ordinary bands match HMRC; first-buyer relief uses 300k nil band and 500k price ceiling, with standard tax above ceiling; additional 5pp and nonresident 2pp scenarios retain separate conditions. HMRC 295k worked example yields 4,750.
- Scotland: standard 145k/250k/325k/750k bands, first-buyer 175k nil band and 8% ADS match sources. Revenue Scotland 875k standard example yields 63,350. Transitional cases remain explicitly excluded.
- Wales: standard 225k/400k/750k/1.5m bands and December 2024 higher bands match the source. Higher-rate 260k official example yields 15,950; 40k threshold is covered. No invented first-buyer rate.
- Source inspection: js/uk-tools-models.js, js/uk-tools-catalog.js, js/global-blog-calculators.js, root UK calcSDLT wrapper and existing tax fixtures. Root tool calls the shared UK model for standard/first-buyer England scenarios; expanded tools cover additional categories. Existing limitations exclude linked/mixed-use, corporate, trust, lease-rent, multiple-dwelling and transitional transactions.
- Tests run/passed: node --test tests/country-tools.test.cjs tests/global-blog-calculators.test.cjs (386/386, includes non-UK tests in those files); both site-readiness and publisher validators. Failed: none.
- Files changed: technical registers only. Google relevance: evidence-backed financial accuracy within disclosed scope, not approval certification.
- Preview: not required for audit-only documentation. Production deployment required: NO. Deployment status: audit-only; no deployment ID. Live production verification: NOT VERIFIED by this source audit. Rollback: not applicable.
- Owner action required: none for continued independent checks.
- Remaining: no transaction-specific legal opinion, complete UK editorial review, browser/mobile QA or whole-site readiness is claimed. Mortgage affordability/lending references, other markets and excluded pages remain in the wider review.
- Next task: continue remaining country financial references and individual content reviews.

## A03 — seven-market consolidation, 2026-10-31

- Priority: Critical; Status: PARTIAL. See a03-financial-verification-2026-10-31.md for exact evidence and limits.
- Start commit: main a69a986 plus the reviewed A02/Canada/UK branches; Final commit: containing this entry.
- Concurrent updates: latest main's scheduled rate publication merged without conflicts.
- Changes: five genuinely rechecked policy source dates/links; earlier reviewed financial/content fixes; browser CI release gate; exclude Wrangler temporary assets; rate reruns check out current main.
- Tests: 628 local tests pass; publication/site validators pass. Local browser run BLOCKED (Chromium absent; download failed). Browser CI PENDING. Preview/live verification NOT VERIFIED.
- Deployment required: yes, owner explicitly requested live release. Deployment status: NOT DEPLOYED pending mandatory gates; ID: none; rollback not initiated.
- Google relevance: financial accuracy and truthful source provenance. No AdSense application/review requested.
- Remaining: evidence limits in detailed report, browser/preview gates and exact live deployment verification. Next: resolve gates before promotion.

### Release-gate correction

Initial candidate c93d385 failed one freshness test: it used a mutable production snapshot with a fixed historical stale date. The fixture now explicitly fixes its own lastVerified/reviewAfter dates, preserving the stale/reference behavior assertions. Rerun: 628/628 PASS. The earlier 628-pass entry refers to the pre-refresh suite; it is not a pass for c93d385.

Preview 8b27969a: browser entered NB taxable value 123450 and observed CA$1,235.00. Also corrected Canada result/worked-example rounding prose to acknowledge statutory rounding. Local browser runtime remains unavailable; GitHub browser gate pending.
