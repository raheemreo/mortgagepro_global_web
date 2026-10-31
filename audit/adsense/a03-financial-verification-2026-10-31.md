# A03 financial verification — 31 October 2026

Status: PASS for the maintained financial models and references reviewed below; production promotion pending. The limits below remain explicit and are not a certification of every transaction or article. No claim of licensed human financial review or Google approval.

## Maintained model/reference review

| Market | Evidence checked | Result and limits |
| --- | --- | --- |
| USA | VA funding-fee purchase tiers; HUD 2023-05 MIP schedule; FHFA 2026 one-unit baseline; USDA FY2027 fee notice | Maintained values agree. FHA periodic MIP is explicitly an approximation; transaction eligibility and county limits are not inferred. HUD Handbook 4000.1 Update 18, Appendix 1.0 (revised 12 August 2026), was subsequently checked and corroborates the maintained upfront/annual MIP table. |
| Canada | CMHC, OSFI, CRA and provincial schedules documented in preceding register entries | NB whole-dollar tax rounding corrected; insurance and straight-switch scope clarified. Unsupported cases remain actual-assessment inputs. |
| UK | HMRC, Revenue Scotland, Welsh Revenue rate tables and relief scopes in preceding entry | Supported ordinary residential scenarios agree; excluded transactions remain excluded. |
| Australia | NSW 2026/27, QLD, VIC, WA, SA, TAS, ACT and NT published schedules; APRA DTI policy | General duty formulas match the inspected schedules. Home-use/first-home and foreign concessions require confirmed inputs. NT low-value formula corroborated by historical statutory text; full current consolidated legislation not inspected. APRA is a lender-flow restriction, not personal approval. |
| New Zealand | IRD current first-home withdrawal, KiwiSaver changes and government contribution; IRD tax/ACC tables; rental-interest guidance | 3.5% contribution baseline, 260.72 government maximum, 1000 retention, resident tax bands and 2026/27 ACC values agree. Provider confirmation, partial-year contributions and special tax cases remain outside scope. |
| India | Official consolidated Income-tax Act 2025 amended by Finance Act 2026 downloaded and read at sections 156/202; PMAY-U 2.0 FAQ | Maintained ordinary resident slabs and rebate/marginal-relief structure agree. The model takes prepared taxable income, excludes special-rate income/surcharge and never awards scheme eligibility. Full case-specific deduction/TDS/PPF legal review is not claimed. |
| Europe | EU mortgage framework, EMMI Euribor definition, ECB reference-FX disclaimer and quote-only model source inspection | No universal country tax, LTV or bank offer is invented. Local taxes, fees and eligibility require actual quotes/assessments. This is not a review of every European country's law. |

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

## Release gate follow-up — 1 November 2026 (Asia/Calcutta)

Candidate af2601798a3875bcf59ad83509e0a4cbb64e7281 passed both GitHub jobs in run 41197807181: content-and-calculations and browser-release-gates. Browser logs report 157 tool/viewport checks (all 143 tools at 320px), 69 page/viewport checks plus seven calculator scenario checks, and 70 country layout checks. These are local-server CI checks with external traffic blocked, not live-production tests.

Cloudflare preview version 5fab57ae-a16b-4138-8e6f-6bfbb951d735 succeeded. Direct preview interaction returned CA$1,235 for NB value 123450; Reset cleared the inputs/results. Additional evidence: https://www.hud.gov/sites/default/files/Housing/documents/40001-hsgh-Update-18.pdf ; https://www.emmi-benchmarks.eu/benchmarks/euribor/ ; https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html . These were retrieved during the preceding source-review session, not freshly verified on 1 November.

Repository branch-protection settings are inaccessible to the connector (403). Normal GitHub merge must enforce repository rules; no bypass is authorized. Terminal HTTP preview retrieval is currently blocked (403), so byte-level preview parity is NOT VERIFIED. Production status remains NOT DEPLOYED at this checkpoint.

## A03 production release — 1 November 2026 (Asia/Calcutta)

- Task: A03 Financial accuracy and trust; Priority: Critical; Status: PASS within the documented maintained-model/reference scope.
- Start commit: a69a986270810feb8e7200d614a437e723b633c8. Final reviewed commit: d941a0547ae7e37609a28b596d7c3f0b6ac5f29d. Production merge: 1332c0740fb9076b71028f17a6cb5a70d653c8c4, PR #26.
- Verified defects: NB transfer-tax statutory rounding, Canadian insurance/qualifying-rule scope, misleading feature/default descriptions and stale policy source-verification metadata; see preceding entries for precise changes and source evidence.
- Google relevance: accurate financial information and truthful claims; this is not AdSense approval or a full-site readiness certification.
- Files changed: 50 in PR #26, including generated assets, models/catalog, source metadata, workflow checks and registers. Existing index/ad exclusions retained.
- Tests passed: all final pre-merge checks (content-and-calculations, browser-release-gates, both existing Cloudflare build checks); 628 model tests; deterministic publication; 157 tool/viewport, 69 page/viewport plus seven calculator scenarios, 70 layout checks. Tests failed on final candidate: none.
- Preview: PASS, version a918223d-5052-4c34-9049-9b566ec6cbab; all seven hubs and source table inspected. NB boundary calculation/reset also inspected on preceding identical website assets.
- Production deployment required: YES. Deployment status: PASS — Cloudflare Git integration reported successful deployment for exact merge commit.
- Worker: mortgagepro-global. Build: 5aa3b15b-6a6c-47ac-a347-4c8b85169b93. Version: 73889802-6d25-4975-9889-9b458594e5b1. URL: https://mortgageproglobal.com/ .
- Live verification: new homepage default wording present; all seven hubs and correct canonicals present; updated rate-snapshot cache version ed5b64574388 and Canada model ee6d047aa7f4 loaded; source table shows reviewed policy dates. NB taxable value 123450 yields CA$1,235; Reset clears result. Main Canada scenario 650000 price, 20% deposit, 3.99%, 25 years produces displayed CA$2,732/month on CA$520,000, consistent with rounded 2732.49 example. www plus .html Canada URL redirects to canonical apex clean URL. robots.txt, ads.txt publisher row and XML sitemap load. Privacy settings retains paused/unavailable-provider explanation.
- Verification limits: terminal HTTP byte comparison blocked (403); no claim of byte-for-byte production parity or complete provider-CMP regional verification. Browser CI was run with external traffic blocked; live checks are representative. Dashboard active-traffic/rollback controls were not accessed. Browser extension metadata errors are not site errors.
- Rollback: not needed; no critical regression observed in checked scope. Baseline a69a986 / reported Cloudflare version cb91cafc-a13a-48b7-bf10-169ec6e4dd3f retained as recovery reference. No rollback execution claimed.
- Owner action required: none for this completed release. Normal repository security enforced by merge API; branch-protection inspection itself was unavailable (403).
- Remaining: documented financial model exclusions; full A04–A11 work; account-specific AdSense/CMP checks; review existing second Worker integration (mortgageproglobal) without assuming it serves the production domain. No second deployer was introduced by this release.
- Next task: A04 navigation and feature integrity, including current per-country tool-count claims. No AdSense review requested.
