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
