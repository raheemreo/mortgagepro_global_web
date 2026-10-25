# Website readiness implementation — 25 October 2026

Baseline: production commit `7ac918ed18f9875a41816c9b45f6242069fadd20`. This work addresses the remaining public-website findings after the 43-article review. It repairs existing calculator pages; it does not add the separate new calculator pages the owner plans to specify later.

## Findings and implemented resolution

| Finding | Implementation | Remaining limit |
|---|---|---|
| Outdated Fed, RBA, RBI and ECB policy references | Corrected dated references; refreshed verification metadata for checked policy sources | A policy reference is not a lender offer; recorded review dates still need maintenance |
| Divergent embedded browser/Worker fallbacks | Canonical `data/rates.json`, generated browser fallback and static labels; Worker reads the deployed snapshot | Upstream services can fail; retained values keep their original verification dates |
| Page-load timestamp implied source verification | Separate `servedAt` from snapshot generation and per-series verification | No claim of continuous verification of all references |
| Old market figures presented as current | Historical figures are marked historical/review due; unsupported quote slots say “Lender quote” | No fabricated current bank prices |
| Public credential fallback in the updater | Removed embedded credential and unrelated-project secret scanning; environment-only credential use | Owner must rotate the previously exposed key if active; history was not rewritten |
| Financial input in analytics payloads | Removed financial payload fields and disabled usage-event dispatch | Browser result/export memory remains local by design |
| GA4/Clarity and unverified consent behavior | Removed publisher-controlled GA4/Clarity loaders/configuration; no optional session replay | Hosting/provider-side settings require account verification |
| Ad loader before consent/default duplication | Exactly one global denied-default block before vendor loading; at most one AdSense loader; no ads on listed legal/contact pages | Defaults do not publish or certify an account CMP |
| Broken/ambiguous privacy controls | Supported Google API callback registration, EU revocation/US opt-out integration and a real policy-link fallback | The provider interface requires an applicable published message/configuration |
| Privacy/cookie statements exceeded evidence | Rewrote website privacy, cookies and deletion guidance around actual calculator behavior, hosting requests, advertising and correspondence | Provider retention and regional runtime behavior were not invented or certified |
| Unverified expert/reviewer/SLA assertions | Rewrote About, author, Editorial, Corrections and Contact; replaced inflated root-page review panels | No licensed-review, staffing or credential claim is introduced |
| Canada root insured calculations | Uses tested CMHC tiers, explicit confirmed 30-year eligibility and surcharge; qualifying illustration is not a pass/fail badge | Traditional owner-occupied 1–2 unit purchase scope; premium taxes/closing charges separate |
| UK root relief label mismatch | Uses tested SDLT standard/first-time model and correct GBP 500,000 relief ceiling | Root tool excludes additional-property/non-resident surcharges; linked article tool covers supported scenarios |
| Australian flat duty and invented insurer tariffs | Verified QLD/VIC general duty; other/concession cases accept an official entered assessment; LMI percentage is an explicit input assumption | A blank unsupported assessment displays “Not estimated”, not zero |
| NZ hard-cap/margin promises and KiwiSaver treatment | Removed personal-cap language and invented margin range; provider-confirmed funds used only up to the modeled deposit | Does not grant membership/withdrawal or bank eligibility |
| EU invented tax/notary precision | Replaced country tariff assumptions with an editable buying-cost allowance and local assessment checklist | Not a country tax return or fee quote |
| Invalid/zero inputs and stale results | Zero-rate support, cleared stale result/export state, zero-PMI input respected | Actual product rounding/daily accrual still differ |
| Other root/Home explanations | Rewrote seven root guides and general FAQ; corrected homepage PMI/DTI claims and unsupported numerical marketing statistics | No universal affordability rule or guaranteed saving |
| Mobile overflow | Responsive result cards and scrollable data tables; narrow homepage statistics layout | Actual Auto ads placements are separate from ad-blocked layout QA |

## Policy references and checked rates

- Fed target range: **3.75%–4.00%**, effective **17 September 2026**: [implementation note](https://www.federalreserve.gov/newsevents/pressreleases/monetary20260916a1.htm).
- RBA cash target: **4.60%**, effective **30 September 2026**: [official rate table](https://www.rba.gov.au/statistics/cash-rate/).
- RBI policy repo: **5.50%**, effective **7 October 2026**: [RBI current rates](https://www.rbi.org.in/).
- ECB main refinancing operations: **2.65%**, effective **16 September 2026**: [official key rates](https://www.ecb.europa.eu/stats/policy_and_exchange_rates/key_ecb_interest_rates/html/index.en.html).
- BoE Bank Rate: **3.75%**, checked against the [current decision page](https://www.bankofengland.co.uk/monetary-policy/the-interest-rate-bank-rate). Its older rate-change date is distinct from the recent unchanged decision/source check.
- RBNZ OCR: **2.75%**, effective **2 September 2026**: [official OCR page](https://www.rbnz.govt.nz/monetary-policy/about-monetary-policy/the-official-cash-rate).

References were checked on October 25. The registry flags review-due policy references; an automated observation refresh does not pretend to re-read every policy decision. Historical retail-rate figures do not become current through a new page load.

Google references: [Publisher Policies](https://support.google.com/publisherpolicies/answer/10502938?hl=en), [site readiness](https://support.google.com/adsense/answer/7299563?hl=en), [certified CMP requirements](https://support.google.com/adsense/answer/13554116?hl=en), [create a European regulations message](https://support.google.com/adsense/answer/10960768?hl=en), [Privacy & Messaging API](https://developers.google.com/funding-choices/fc-api-docs), [Google partner-site data processing](https://policies.google.com/technologies/partner-sites). Google messages can be deployed by the existing AdSense tag once published in the account. No fake custom “certified” banner was substituted.

## Verification

- 53 automated financial/rate/Worker cases passed: the previous 41 plus 12 observation, reference, failure, cache and fallback cases.
- Both article validators passed for all 43 articles. The new site validator passed for 67 full HTML pages: one H1, unique IDs, local paths/fragments, consent order, no optional analytics/config or financial event payloads, and source-backed rate labels.
- All six build stages reproduce their generated output without drift. JavaScript inline syntax and whitespace checks passed.
- Article browser regression: 105 international viewport checks plus 35 no-JS pages; 24 US viewport checks plus eight no-JS pages. External requests, including advertising, were blocked.
- Site browser regression: **69 page/viewport checks passed** across 23 pages at 1280, 390 and 320 pixels, including dark mode. Seven root calculators passed invalid-input, zero-rate, stale-export and country-specific scenarios; privacy links/provider callbacks were exercised.
- Representative desktop/mobile screenshots were inspected for the publisher, privacy, source-table and Australian calculator pages. Narrow tables scroll; unsupported Australian duty displays “Not estimated”. External ad requests were blocked, so this does not establish real serving layout.

## Owner/account evidence still needed

The following are operational/account facts, not further permissions to edit website code:

1. **AdSense Sites status and Policy Center:** the domain's actual review/eligibility state and any account notices. A public source audit cannot establish account approval or valid traffic.
2. **Privacy & Messaging:** confirm the European regulations message is published for `mortgageproglobal.com`, with appropriate choices and Consent Mode integration, and confirm applicable US-state settings. Test accept, reject, revisit and revoke in the relevant regions. Legal pages do not load ads; their fallback links explain provider/browser controls. Do not claim that a source default alone certifies the CMP.
3. **Actual serving layout:** after ads are eligible to serve, verify mobile/desktop Auto ads density, overlays and separation from calculator controls. These automated tests intentionally do not load or click live ads.
4. **Contact identity and delivery:** confirm the existing public publisher name and `support@mortgageproglobal.com` mailbox. No verification email was sent and no professional qualification or registered-business address was invented.
5. **Credential rotation:** if the removed public FRED key is active, revoke/rotate it at the provider and set `FRED_API_KEY` in GitHub Actions and the Worker environment where used. Do not paste credentials into an issue or chat.

No AdSense application was submitted by this change. No approval percentage, detector score, independent licensed financial review, or full legal/accessibility certification is asserted. The Android app policy body and unrelated app code were not rewritten.
