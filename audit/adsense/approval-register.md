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
