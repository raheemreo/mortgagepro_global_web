# MortgagePro Global — implementation audit

Work began 26 October 2026; release verification continues 27 October (India time). Baseline commit: `b632342b1de08d42004ed0e6565f681a2696b1ca`. Website repository only; the native application repository was not modified.

Known repository defects have been addressed, with explicit exclusions where substantial editorial work is still needed. **This is not a zero-open-items or AdSense-approval certificate.** Real Google message publication, regional consent and filled Auto Ads placement require account/runtime evidence unavailable from a source audit.

See [baseline](baseline.md), [full after page inventory](after-crawl/pages.csv), [links](after-crawl/link-inventory.csv), [numeric occurrence inventory](after-crawl/numeric-occurrences.csv), [duplicate pairs](after-crawl/duplicate-pairs.csv) and the phase notes.

## Before / after

| Check | Before | After | Interpretation |
|---|---:|---:|---|
| Public HTML source pages | 246 | 247 | One consent-only page added; 36 source routes now redirect, leaving 211 distinct page destinations. |
| Broken internal targets / fragments | 0 / 0 | 0 / 0 | Full source crawl; production HTTP evidence follows release. |
| Known misleading resource cards | 12 | 0 | Real destinations repaired; nonexistent offers removed. Six additional misleading footer promises repaired. |
| Exact duplicate description groups | 26 | 0 | Across the full HTML inventory. |
| Near-duplicate text pairs above 70% | 85 | 79 | Shared method text remains on excluded tools; **zero pairs have both pages indexable**. |
| Equivalent tool URLs consolidated | 0 | 36 | Permanent redirects; output-equality tests verify the alias pairs. |
| Distinct usable tool routes | 179 | 143 | Equations preserved; aliases lead to the same useful calculation intent. |
| Principal tools with extended editorial content, examples and 3 FAQs | 0 | 7 | One per country; approximately 960–1,207 main-text words including controls/examples. |
| Other distinct specialist tools excluded from indexing and ads | 0 | 136 | Functionality preserved pending deeper editorial/legal review. |
| Short non-US articles excluded from indexing and ads | 0 | 35 | All 43 articles remain readable; eight longer US articles remain indexed. |
| Canonical sitemap entries | 246 | 39 | Only source-indexable URLs; no aliases or noindex pages. |
| Pages loading the AdSense bootstrap | 56 | 18 | 17 content pages plus one permanently ad-request-paused consent-only entry point. |
| Empty ad placeholders | 47 | 0 | No new manual ad units were added or relocated. |
| Ad-eligible pages below the project's 600-word screen | 39 loader pages | 0 | Consent-only page excluded; word count alone does not establish quality. |
| Unsupported historical benchmark records | 6 | 0 | Removed without invented replacements. Three additional unsupported product quotes and stale deltas removed from the US hub. |
| Canada observation-order defect | Present | Fixed | Selects the maximum valid observation date; older responses cannot downgrade newer data. |
| Homepage interest illustration | $250K | $472,844.50 | Computed by the US model for $360,000 at an assumed 6.66% over 30 years; parity test prevents drift. |
| Placeholder IndexNow metadata | 65 files | 0 | Uses the already-existing real key; obsolete placeholder verification file removed. |

## Accuracy and financial scope

The maintained benchmark register has 13 attributed records with source name, URL, observation/effective date and actual check date. Builds do not advance verification dates. The old unbound US Fed banner now reads the same dated record as the main reference section. Unsupported ARM/Jumbo/VA/USDA market-rate presentations, six stale delta arrows and the August PMMS schedule were removed. Separately hardcoded footer benchmark dates were replaced with a link to the source register.

Homepage results come from `data/homepage-example.json` through the existing US mortgage model. Worked examples on tools show their input assumptions and computed outputs, explicitly labeled as hypothetical arithmetic rather than current offers. No personal financial figures were invented or prefilled. An article sentence incorrectly saying the mortgage rate field started at a benchmark was corrected: the field starts blank.

Official benchmark checks are documented in [phase-1-accuracy.md](phase-1-accuracy.md). HMRC residential SDLT bands, OSFI qualifying-rate scope and CMHC premium tiers were checked on 26 October against their primary pages. The UK table now distinguishes additional-property and non-residence conditions, explains that first-time relief is unavailable on the entire purchase above its ceiling, and links to the dedicated SDLT tool. VA purchase fee tiers, CFPB PMI cancellation conditions and Fannie Mae down-payment programme scope were also checked against their official pages during final verification. This does not certify every specialist tax/eligibility figure.

The RBI exact statement could not be retrieved directly in this environment; an official indexed statement supported the recorded repo observation. The exact source and this limitation are retained. Large HUD handbook retrieval through the web reader exceeded its size limit; the dated handbook citation remains, rather than inventing a new check date.

The numeric inventory is a discovery list, not a declaration that every number is a current legal rule. It includes code fragments, dates, examples and policy observations. Full independent current-law review of all specialist pages is an explicit editorial backlog; those pages are noindex and ad-free. Shared descriptions of mathematical conventions are not automatically misleading duplication.

## Navigation, editorial quality and trust

Removed nonexistent advice/data offers and unsupported programme claims; useful cards now reach matching tools or official resources. Six footer links that promised specific tools/guides now have honest destinations or labels. Functional calculator anchors, FAQ links and state query presets remain because they actually provide the promised function.

Every calculator and article links to the publisher contact profile and identifies REO Technologies without inventing licences, qualifications or independent human review. Unsupported original-publication dates were removed. Educational notices near results link to Disclaimer, Methodology and Corrections. Contact/About retain the real publisher and email. The owner previously confirmed support-mail forwarding; this implementation sent no test email.

Seven principal tool pages have substantial explanations, assumptions, calculator-derived examples and distinct FAQs. The 136 other tools and 35 short articles were not padded or falsely described as finished rewrites. Some countries retain more than 15 browsable specialist tools, but only one principal tool per country is in the indexed set. A 600-word target is this project's editorial screen, not a Google minimum or approval guarantee.

## Verification checklist

| Requirement | Status | Evidence / boundary |
|---|---|---|
| Dated maintained benchmarks and correct observation selection | PASS | Rate schema, source register, order/downgrade regression tests; RBI retrieval caveat noted. |
| Homepage/calculator parity | PASS | Generated illustration and model parity test. |
| Known filler/mismatched resource links | PASS | Repaired cards and six footer promises; zero missing local targets/fragments. |
| Equivalent tool consolidation | PASS | 36 equality cases; 108 redirect variants preserve query strings and terminate at real destinations. |
| Unique meta descriptions / no indexed near-duplicate pair | PASS | After crawl: 0 / 0. Remaining 79 source pairs are not both indexed. |
| Editorial gate and ad exclusions | PASS | 136 distinct specialist tools and 35 articles excluded; ordinary policy/contact pages ad-free. |
| Submit-only calculation / reset / mobile | PASS | 157 tool/viewport checks, all 143 survivors at 320px; seven also at 390/1280px. Another 69 hub/document checks pass. |
| Consent integration and defaults | PASS in controlled tests | Unknown, incomplete, failed and refused states keep requests paused; acceptance/inapplicability and later revocation tested. |
| Real certified CMP message for EEA/UK/Switzerland | **OPEN: owner/runtime evidence** | Locale/geolocation simulation is not proof of regional network behavior or account publication. |
| ads.txt, crawler access, canonicals, IndexNow | PASS in source/edge tests | Exact Google DIRECT row; text/plain edge response; crawler allowed; real key. Live checks follow release. |
| Ads absent from excluded content | PASS in source/configuration | No loaders on excluded editorial/policy pages. The noindex consent-only page loads the message bootstrap but permanently pauses ad requests. |
| Actual Auto Ads area/placement/obstruction | **OPEN: account/filled-ad evidence** | No manual slots remain; real ad fill/account preview not certified. |
| Complete current-law review of every specialist figure | **OPEN: gated editorial backlog** | Known bad claims removed; distinct working tools retained under noindex/ad-free gates. |
| Lighthouse mobile / CLS | Pending release measurement | Baseline results are not claimed as measurements of this changed release. Filled-ad performance is separate. |
| AdSense approval / Search Console processing | **External decision / owner action** | No approval percentage or guarantee. |

Validation evidence in [verification](verification/): **619 Node tests pass**, validators cover all 247 public HTML source pages and 43 articles, 157 tool/viewport checks and 69 hub/document checks pass, and full builds reproduce identical files. Browser QA blocks external traffic; it cannot establish actual Google ad fill or certification.

## Manual steps and remaining risks

1. In AdSense Privacy & messaging, verify the existing GDPR message is published to this exact domain and correctly covers EEA, UK and Switzerland. This is a verification request, not an assertion that the owner's earlier setup was absent.
2. On actual regional networks with fresh profiles, test refusal, acceptance and Privacy settings reopening; inspect real provider signals. Unknown/refused signals keep ad requests paused, which can suppress revenue when a message is missing or unavailable. The settings page never resumes ads.
3. Inspect Auto Ads formats/exclusions and genuinely filled pages: no ads in navigation/controls/results, no content obstruction or excess ad area, and no ads on excluded documents/errors. Confirm layout stability with real ads.
4. Submit `https://mortgageproglobal.com/sitemap.xml` in Search Console; inspect hubs, principal tools, representative articles, redirects and intentional noindex pages. Request AdSense review when the account/runtime checks are satisfied.
5. Expand and verify the 136 specialist tools and 35 short articles before lifting their exclusions. Recheck dated financial references when their review windows expire; never use a page build date as a financial observation date.

**Completion boundary:** the verified repository corrections are implemented. A universal zero-open-items/full-compliance claim is not justified; the explicit runtime/account/editorial items above require further evidence.
