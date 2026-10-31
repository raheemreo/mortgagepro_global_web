# Deployment register — A02 correction batch

- Status: NOT DEPLOYED
- Start revision: 7212df6f675e9f7487b8b51fc132b2836a901bfb
- Branch: fix/a02-feature-claims
- Changes: honest feature descriptions and country-navigation labels; no calculator-model changes.
- Local gates: 627 tests pass; canonical publication build and both site/publication validators pass; whitespace check passes.
- Preview: NOT VERIFIED.
- Production promotion: deferred per the owner's instruction to finish website corrections and testing first.
- Production version, active traffic and rollback target: NOT VERIFIED for this batch; confirm before any promotion.
- Required release checks: reconcile current main and scheduled rate updates; enforce applicable CI; verify preview behavior; use the designated deployment mechanism; check exact revision and live calculator, route, rate and privacy behavior.
- No deployment, rollback or AdSense review was initiated for this batch.

## A03 — CMHC glossary

- Branch: fix/a03-cmhc-glossary (based on local A02 changes).
- Status: NOT DEPLOYED. No production promotion or rollback initiated.
- Preview/live verification: NOT VERIFIED.
- Scope: homepage explanatory text and primary-source attribution only.

## A03 — Canada qualifying-rule clarification

- Same draft correction branch; no production promotion.
- 627 tests and both validators pass. Canonical build refreshes catalog content hashes in Canada tool pages.
- Preview / live revision: NOT VERIFIED. Rollback: not initiated.

## A03 — Canadian transfer-tax correction

- Status: NOT DEPLOYED; same draft Canada correction branch.
- Intended output change: NB rounds base transfer tax to whole dollars, half-up, as required by statute. New boundary regression test passes.
- Gates: 628/628 tests, canonical build, site/publication validators and whitespace check pass.
- Preview / live verification: NOT VERIFIED; no rollback or production promotion initiated.

## A03 — UK residential purchase-tax audit

- Audit-only: no website or model changes, no production deployment required.
- 386 focused-file tests passed; both validators passed. See approval register for exact source-review scope.
- No preview, production promotion, live revision verification or rollback initiated.

## A03 release candidate — 2026-10-31

- Owner authorized production release after completing A03.
- Authoritative deployer: existing Cloudflare Git integration for mortgagepro-global. No second deployment system introduced.
- Baseline main: a69a986270810feb8e7200d614a437e723b633c8. GitHub Cloudflare check reports version cb91cafc-a13a-48b7-bf10-169ec6e4dd3f; active traffic and rollback execution not independently verified.
- Candidate includes prior A02, Canada A03 and UK audit work, reconciled with scheduled data update.
- Local automated checks passed; browser CI added because local browser binary download failed.
- Preview, live verification and promotion: PENDING. Do not interpret a successful build as active production traffic.

## A03 verified release gates — 1 November 2026

- Status: PASS for reviewed maintained financial scope; see detailed A03 report for excluded cases.
- Candidate: af2601798a3875bcf59ad83509e0a4cbb64e7281; PR #26.
- Tests passed: 628 model tests, content/publication validation, deterministic build; browser CI 157 tool/viewport, 69 page/viewport, seven calculator scenarios and 70 layout checks. Failed: none on this candidate.
- Preview: PASS for Cloudflare build 377a409a-79e0-4403-beca-71070eb0ded0, version 5fab57ae-a16b-4138-8e6f-6bfbb951d735, directly checked NB result and Reset. Byte-level parity NOT VERIFIED due terminal HTTP 403.
- Production deployment required: YES. Deployment status: NOT DEPLOYED at this entry; live verification pending.
- Rollback baseline: main a69a986, reported Cloudflare version cb91cafc-a13a-48b7-bf10-169ec6e4dd3f. No rollback initiated or claimed.
- Owner action: none for ordinary authorized merge; any repository approval requirement must be honored. Branch-protection inspection returns 403.
- Next: normal controlled merge only after current commit checks pass, followed by Cloudflare and live-site verification.

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
