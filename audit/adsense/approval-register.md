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
