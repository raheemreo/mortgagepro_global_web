# Remaining mortgage blog audit — 25 October 2026

Baseline: US-reviewed commit 164f3b85675225d91a3f384b0f93006cc355139c. Scope: Canada 9, UK 9, Australia 8, New Zealand 8, general guide 1 = 35 articles. Together with the existing US audit, all 43 article URLs are covered. India and Europe have root calculators but no existing dedicated blog articles; no new country coverage is invented.

## Findings recorded before implementation

| Article | Findings requiring correction or qualification |
|---|---|
| canada-mortgage-calculator | Rounded payment example not reconciled to the stated convention; semiannual conversion direction reversed; quoted 3.99% misattributed to BoC; absolute legal/term claims. |
| canada-affordability-calculator | Approximate unsolved loan example; GDS-only chain omits TDS/insurance; unsupported 15–25% impact; estimate called lender approval. |
| canada-amortization-calculator | Claims acceleration needs no extra annual money although 13 vs 12 payments increases spending 8.33%; base payment needs a reproducible convention; renewal treated as always five years. |
| canada-cmhc-insurance-calculator | Insurer prices said identical; rigid legal blanket; unverified eligibility and boundary handling; premium financing and cash taxes need separation. |
| cmhc-insurance-canada-guide | Overlaps calculator article; conventional <=80% LTV conflated with no possible insurance premium; surcharge/eligibility omissions; no full cash-to-close distinction. |
| canada-gds-tds-calculator | CMHC 39/44 described as universal OSFI limits; wrong qualifying payment; ground rent and financed premium need explanation. |
| canada-prepayment-calculator | Unsupported savings range; universal anniversary/reset assumptions and IRD formula; no contractual allowance tracking. |
| canada-renewal-planner | Remaining balance and payments not amortized consistently; forecast presented as current outcome; uninsured straight-switch exception overgeneralized. |
| canada-stress-test-calculator | Every mortgage supposedly B-20; misleading absolute renewal exemption; wrong monthly payments; test framed as completely unrelated to credit. |
| uk-mortgage-calculator | 4.48% misattributed to BoE; payment/refix figures unverified; denies existence of full-term fixes; lender pricing generalized. |
| uk-affordability-calculator | Invented 65,000 deduction and debt-to-capacity rule; every lender supposedly 15% high-LTI capped; current transition/new October 2026 policy needs dates. |
| uk-amortization-calculator | Broad international/BTL claims; no evidence of qualifying repayment vehicle; repayment and IO balances need explicit assumptions. |
| uk-buy-to-let-calculator | Salary/credit minimized; ICR thresholds tied automatically to company status; tax/company recommendation unsupported; lender stress rates vary. |
| uk-ltv-calculator | Lower LTV supposedly always best rate; 60/75 sweet spots unsupported as universal; valuation and capitalized fees need clear arithmetic. |
| uk-remortgage-tool | Year-three example says two years elapsed but 24 months remain on five-year fix; ERC expiry/allowance conclusions blanket; break-even excludes balances and fees. |
| uk-stamp-duty-calculator | Relief/surcharge scope and boundary tests needed; refund deadline incomplete; non-resident and first-time combination needs explicit support. |
| uk-stamp-duty-guide | Duplicate topic instead of completion checklist; first-time status alone described as enough; surcharge threshold phrased above rather than at 40,000. |
| uk-help-to-buy | Stale Wales September 2026 end date; wrong LISA limit/bonus wording; search/survey claims unsourced; announced future scheme must not be presented as open. |
| australia-mortgage-calculator | Rounded payment and incorrect rate-sensitivity example; policy rate equated with retail context; monthly model described as actual daily-accrual system. |
| australia-affordability-calculator | APRA rules said apply to every lender with no exceptions; wrong payments; buffer confused with actual rate or guaranteed approval. |
| australia-amortization-calculator | Accelerated fortnightly described as free; false claim ordinary fortnightly has no timing effect; baseline needs a reproducible convention. |
| australia-dti-ratio-calculator | APRA high-DTI limits effective February 2026 absent; New Zealand incorrectly called hard individual cap. |
| australia-lmi-calculator | Scheme supposedly removes property price caps (it does not); invented premium averages/survey; no LMI refund possibility; tax conclusions need narrower scope. |
| australia-offset-account-calculator | Unverified six-figure lifetime saving; says always better/tax-free across purposes; daily balance, partial offset, fees and access restrictions understated. |
| australia-refinance-tool | Cashback repayment confused with broker commission clawback; all/most offer claims unsourced; estimated saving wrong and extended-term effect omitted. |
| australia-stamp-duty-calculator | Queensland apples-to-oranges duty amounts; obsolete NSW annual-property-tax option; state/territory concessions and foreign surcharges overgeneralized. |
| nz-mortgage-calculator | Rounded payment needs a reproducible convention; short rate fix contrasted incorrectly with Canada; monthly model not exact daily-interest statement; no remaining-balance refix example. |
| nz-dti-calculator | Portfolio speed limit presented as personal maximum; threshold subtraction presented as approval; exemptions universalized. |
| nz-car-loan-calculator | Contradiction: original vs outstanding car balance; arbitrary year-two balance; DTI arithmetic called exact mortgage capacity. |
| nz-first-home-buyer | Obsolete First Home Loan price caps and incomplete income categories; KiwiSaver excess assumed available for costs; unsupported promises grant never returns. |
| nz-kiwisaver-calculator | Membership vs contribution start conflated; kick-start wrongly excluded separately; 1,000 described as never withdrawable for any reason; Australian transfers omitted. |
| nz-lvr-calculator | Speed limits broadly correct but new-build/refinance eligibility overgeneralized; no deposit/valuation validation; 'easier approval' implication. |
| nz-rental-yield-calculator | Approximate management fee arithmetic; vacancy omitted in headline; net operating yield vs leveraged cash flow/tax distinctions need clearer labeling. |
| nz-repayment-calculator | Wrong five-year remaining balance; IO not only other NZ structure; investor tax strategy implied; future amortization rate assumed. |
| how-to-use-mortgage-calculator | Universal US term/escrow/PMI assumptions; percent-to-decimal omission; central bank rate treated as mortgage quote; 'exact/comfortable' output promises. |

Common to remaining pages: old author expertise claims without verification, sparse direct primary references, stale date/social metadata, overly absolute FAQ answers, and several calculator-titled pages with no working in-page calculation. Distinguish factual/editorial issues from adjudicated Google policy violations; none is automatically proof of an account violation.

## Work and evidence

### Coverage completed

| Section | Existing articles reviewed and updated in this continuation | Interactive article tools |
|---|---:|---:|
| Canada | 9 | 8 |
| UK | 9 | 7 |
| Australia | 8 | 8 |
| New Zealand | 8 | 7 |
| General cross-country guide | 1 | 0 |
| Total continuation | 35 | 30 |

The eight previously completed US articles bring the combined PR to all 43 existing article URLs and 38 article tools. The US report remains a record of that earlier eight-article stage; this report extends its coverage.

### Resolution

- Rewrote all 35 sources and generated pages around distinct reader tasks, worked arithmetic, product limitations and public-authority references. Added editable Markdown sources for the three previously HTML-only guides. No fictional client experience, individual credentials, professional review or human-authorship claim was added.
- Canada: fixed the semiannual rate conversion direction; calculated payment, qualifying-payment and renewal balances consistently; modeled CMHC high-ratio tiers, insured eligibility, strict price boundary and optional cash premium tax separately. Budget examples explicitly restrict the deposit calculation to an uninsured 20%-down scenario. GDS/TDS and straight-switch exceptions have their proper scope.
- UK: replaced invented income-to-capacity deductions with an entered-budget scenario; separated repayment/IO balances and lender-input ICR assumptions. SDLT covers individual England/NI standard, relief and surcharge scenarios with tested boundaries. The complementary guide is a completion checklist. Lifetime ISA and Wales deadlines are corrected. The October 28 high-LTI change is explicitly future-dated relative to this October 25 review; the announced Your First Home scheme is not presented as accepting applications.
- Australia: distinguished APRA assessment settings and lender-flow DTI limits from personal approval; retained the 5% Deposit Scheme's location price caps. LMI is a user-entered premium scenario rather than invented insurer pricing. Offset estimates are annual constant-balance comparisons after entered fees. Duty supports QLD and VIC general non-concession schedules only, with no unverified all-state calculation. NSW's closed new-entrant tax option is identified as historical.
- New Zealand: corrected the five-year table-loan balance, kept outstanding car debt separate from original principal, distinguished DTI/LVR speed limits from personal caps and updated first-home support. KiwiSaver uses provider-confirmed eligible funds before retention; membership is not complete eligibility. Yield includes occupancy and precise management fees, with financing and tax excluded explicitly.
- Rates of 3.99%, 4.48%, 6.19% and 5.99% in these country examples are editable hypothetical assumptions, not current market offers or central-bank mortgage quotes. Current regulatory and scheme facts are dated and attributed separately.
- Synchronized title, description, hero, social metadata, Article/Breadcrumb schema, all index cards and sitemap dates; preserved original publication dates and URL slugs. Publisher organization replaces unsupported individual expert credentials. Removed the obsolete general HowTo schema.
- Added 30 local interactive article tools. Invalid inputs clear results; zero-rate payments work; no approval badges are generated. The new module sends or stores no entered values. Shared analytics/ad behavior outside this module was not certified by that observation.
- Existing regional Consent Mode defaults now precede the AdSense loader on the 35 pages, as in the US stage. This is a source-order correction, not deployment of a certified CMP.
- Added the reproducible global builder, content validator, numerical tests and browser checks. Extended the existing GitHub workflow to validate both sets of articles.

### Verification performed

- `node --test tests/us-blog-calculators.test.cjs tests/global-blog-calculators.test.cjs`: **41 passed**, comprising 15 US and 26 international numerical/edge-case checks. Fixtures cover independent payment/balance calculations, zero/invalid inputs, CMHC tiers and eligibility, qualifying-rate branches, GDS/TDS, prepayments, SDLT boundaries and combined surcharges, QLD hundred-or-part rounding, all VIC bands, offset fees, refinance horizon, KiwiSaver retention, car balances and vacancy/management costs.
- `python scripts/validate_us_articles.py` and `python scripts/validate_global_articles.py`: **43 articles passed**. Checks cover the complete index inventory, source/HTML/title/social/schema synchronization, original/updated dates, unique IDs, labeled fields, public-authority references, internal paths/fragments and consent-loader ordering. External reference availability is a research-time observation, not a perpetual availability guarantee.
- Both builders reproduce all 43 pages, index and sitemap byte-for-byte. JavaScript syntax and `git diff --check` passed.
- `tests/global-blog-browser.cjs`, Chrome 134 headless with Playwright: **105 page/viewport checks passed** (35 pages at 1280px/light, 390px/light and 320px/dark); **35 JavaScript-disabled pages passed**. Interactive pages initialized, rejected blanks/negative values, recovered and handled applicable zero rates. Additional DOM scenarios exercised CMHC 30-year eligibility/tax, SDLT relief and both surcharges, QLD/VIC switching, KiwiSaver membership, car payoff and invalid refinance horizons. No page-level overflow or JavaScript errors were found in these checks.
- Reviewed rendered mobile/desktop screenshots of the Canada CMHC page/tool, UK SDLT and Australian duty tools. Browser tests blocked all external traffic, including ads; no live advertisements were loaded or clicked. This intentionally does not establish live ad placement behavior.
- The previous eight US browser pages were unchanged; their earlier 24 viewport plus eight no-JS results are recorded in the US audit. Combined recorded coverage is 129 viewport checks and 43 no-JS article checks.

### Primary source record

References were checked on October 25, 2026 and are linked at the relevant claims inside each article. Key policy sources include:

- Canada: [CMHC Purchase](https://www.cmhc-schl.gc.ca/professionals/project-funding-and-mortgage-financing/mortgage-loan-insurance/mortgage-loan-insurance-homeownership-programs/purchase), [premium schedule](https://www.cmhc-schl.gc.ca/professionals/project-funding-and-mortgage-financing/mortgage-loan-insurance/mortgage-loan-insurance-homeownership-programs/premium-information-for-homeowner-and-small-rental-loans), [Home Start](https://www.cmhc-schl.gc.ca/professionals/project-funding-and-mortgage-financing/mortgage-loan-insurance/mortgage-loan-insurance-homeownership-programs/home-start), [GDS/TDS](https://www.cmhc-schl.gc.ca/professionals/project-funding-and-mortgage-financing/mortgage-loan-insurance/calculating-gds-tds), [OSFI MQR](https://www.osfi-bsif.gc.ca/en/supervision/financial-institutions/banks/minimum-qualifying-rate-uninsured-mortgages) and FCAC's calculator, renewal and prepayment guidance.
- UK: [HMRC residential SDLT](https://www.gov.uk/stamp-duty-land-tax/residential-property-rates), [additional-property rules](https://www.gov.uk/guidance/stamp-duty-land-tax-buying-an-additional-residential-property), [non-resident rules](https://www.gov.uk/guidance/rates-of-stamp-duty-land-tax-for-non-uk-residents), [Lifetime ISA](https://www.gov.uk/lifetime-isa), [Help to Buy–Wales](https://www.gov.wales/help-buy-wales), [October 2026 high-LTI statement](https://www.bankofengland.co.uk/prudential-regulation/publication/2026/october/high-loan-to-income-lending-policy-statement) and [announced Your First Home scheme](https://www.gov.uk/government/news/new-first-time-buyer-scheme-to-be-confirmed-at-budget). MoneyHelper supplies public guidance on repayment, BTL and switching.
- Australia: APRA's [2026 DTI implementation](https://www.apra.gov.au/news-and-publications/activation-debt-income-limits-macroprudential-policy-tool), [May 2026 policy settings](https://www.apra.gov.au/news-and-publications/apra-maintains-current-macroprudential-policy-settings-highly-uncertain), the [5% Deposit Scheme](https://firsthomebuyers.gov.au/australian-government-5-percent-deposit-scheme) and its separate [property price caps](https://firsthomebuyers.gov.au/australian-government-5-percent-deposit-scheme/property-price-caps), [QLD duty](https://qro.qld.gov.au/duties/transfer-duty/calculate/rates/), [VIC duty](https://www.sro.vic.gov.au/about-us/rates-and-statistics/current-rates/land-transfer-duty-non-principal-place-residence-current-rates), Revenue NSW and ASIC Moneysmart.
- New Zealand: [RBNZ DTI](https://www.rbnz.govt.nz/education/explainers/dti), [LVR framework](https://www.rbnz.govt.nz/regulation-and-supervision/oversight-of-banks/standards-and-requirements-for-banks/macroprudential-policy/loan-to-value-ratio-restrictions), [IRD KiwiSaver](https://www.ird.govt.nz/kiwisaver/kiwisaver-individuals/getting-my-kiwisaver-funds-early/getting-my-kiwisaver-for-my-first-home), [Kāinga Ora First Home Loan](https://kaingaora.govt.nz/home-ownership/first-home-loan/), its current and historical support records, IRD rental guidance and Sorted's calculators/guides.
- Google: [Publisher Policies](https://support.google.com/publisherpolicies/answer/10502938?hl=en), [AdSense Program policies](https://support.google.com/adsense/answer/48182?hl=en), [CMP requirements](https://support.google.com/adsense/answer/13554116?hl=en) and [people-first content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content).

### Policy interpretation and remaining checks

The relevant publisher concerns include misrepresentation, low-value/replicated inventory, ads interfering with controls, excessive advertising, privacy disclosures, consent and invalid traffic. These findings prompted content and usability improvements; they are not an adjudication of an AdSense account violation. Search financial-content trust guidance is useful but distinct from AdSense eligibility. A detector score, a word count or an article count does not establish approval.

Account CMP configuration, real Auto ads behavior, publisher eligibility, ownership, traffic validity and privacy statements versus actual data flows still need production/account verification, as described in the US report. Consent Mode ordering alone does not establish certified CMP compliance. Root country calculators and other site pages were not rewritten or financially certified by this article-focused change. The 35 article tools use their own models.

All changes are submitted through the existing review branch/PR #3; no merge or production deployment was performed. No independent licensed financial review, detector result, or AdSense approval guarantee is claimed.
