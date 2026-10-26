# MortgagePro Global — read-only baseline audit

Audit date: 26 October 2026. Publisher: REO Technologies. No website code, ads, calculator logic or deployment changed by this audit.

## Scope and version

GitHub snapshot: `raheemreo/mortgagepro_global_web@b632342b1de08d42004ed0e6565f681a2696b1ca`. The active working checkout remains clean. The audit snapshot is separate from the repository. The app repository was not modified. All 255 HTML files were enumerated: 246 public canonical documents, seven non-public design prototypes, two component partials. Live checks covered all 246 canonical pages plus seven technical/data endpoints (253 successful HTTP GETs). Design prototype URLs are not counted as live violations: the sampled design URL returns 404.

Live HTML and the newer bot commit differ mainly in the rate-snapshot asset query string on 20 pages; data-sources also has a Canada checked-date change. 226 of 246 matched after Cloudflare-beacon/whitespace normalization. This is recorded deployment/snapshot drift, not evidence that 20 public pages are broken. The public API and public fallback JSON were separately captured. The full crawled public content, endpoint hashes and response headers are in the evidence bundle.

## Measurement rules and limitations

Main/body words exclude script, style, nav, footer, aside and noscript. “Unique body” is not a count of unique vocabulary: repeated blocks within a page are deduplicated; a separate nonboilerplate count removes blocks recurring on at least ~10% of pages. Tables and dynamic results cannot be reduced perfectly to this prose metric. Tool-method words count explanatory methodology separately from input labels. Main counts can include result placeholders. Native title/meta tables are from the frozen source, whose live differences are documented. Ad loader means eligibility to request ads, not proof an ad was filled. Similarity uses five-word shingle Dice overlap; >70% is a review screen, not proof two functional intents are interchangeable.

The 1,901 line-based numeric candidates include CSS/JS/schema/input false positives. The DOM-only visible-figure inventory and separate data-JSON figure inventory supplement it. All unresolved entries explicitly remain unverified; the audit does not certify every statutory value or external lender condition. A link somewhere on a page does not verify every number on that page.

## Phase-by-phase status

| Phase | Requirement | Status | Evidence / remaining work |
| --- | --- | --- | --- |
| 0 | Every HTML/page inventory | COMPLETE | 255 files inventoried; 246 public documents GET 200; 7 design prototypes and 2 partials classified separately. |
| 0 | Every link and numeric occurrence | ENUMERATED / PARTIAL VERIFICATION | 7,939 hrefs; broad raw numeric scan plus DOM/data inventories. Not every tax/lender statement independently legally verified. |
| 0 | Duplicate content and contradictions | COMPLETE DETECTION / EDITORIAL REVIEW OPEN | 26 exact meta groups, 85 >70% text pairs; confirmed hero/count/feed contradictions. |
| 1.1 | Fed target / PMMS | ALREADY CORRECT | Fed 3.75–4.00%; PMMS 7.32/6.68 on 2026-10-22. Old prompt allegation is outdated. |
| 1.2 | Homepage illustration matches math | FAIL | Interest $250K vs $472,844.50. No shared-fixture parity guard found. |
| 1.3 | Other country policy benchmarks | VALUES VERIFIED / SOURCING PARTIAL | Core central-bank values match reviewed official sources; Canada observation selector is defective; six historical loan/fixing records unverified. |
| 1.3 | SDLT / CMHC | KEY RULES VERIFIED | Current main SDLT bands and CMHC high-ratio premium/surcharge match primary sources; all local/special cases not certified. |
| 1.4 | Central JSON / genuine check dates | PARTIAL | rates.json, per-record dates, status and failed-fetch preservation exist. Metadata is not consistently beside hub figures; legacy rule files/templates retain claimed review dates. |
| 1.5 | Guide/user/update claims | PARTIAL | 43 articles is true. 50+ FAQ claim and UK 20+ calculators unsupported. No evidenced large-user/download claim found in primary pages. |
| 2 | No filler/mismatched navigation | FAIL | 12 specific cards go to generic FAQ. Real USDA/Jumbo/ARM tools now exist; state-prefill variants are legitimate. |
| 2 | No broken internal routes/fragments | PASS WITHIN CRAWL | No missing source targets/fragments; 246 canonical live pages 200. Not a full external-link audit. |
| 3.1 | Distinct intent / merge aliases / redirects | NOT COMPLETE | 179 tools remain; alias-like methods and meta reuse need intent review. Do not delete distinct jurisdictional tools solely for similar text. |
| 3.2 | Substantial unique explanation/examples/FAQs | NOT COMPLETE AGAINST REQUESTED STANDARD | Tool-method sections 76–257 words; no three-question FAQ sets on 179 dedicated tools. Functional calculator value must also be evaluated. |
| 3.3 | noindex/sitemap/ad exclusions for weak pages | PARTIAL | All 179 tools are ad-free already, but all are indexable/in sitemap. 39 loader-enabled pages below owner 600-word screen need editorial assessment. |
| 3.4 | Unique titles/descriptions | FAIL | 26 duplicate description groups; one duplicate title shared by AU/Canada frequency tools. |
| 4 | Real author, qualifications, bylines | PARTIAL | Honest Abdul Raheem profile exists; 43 articles use organization publisher link. 179 tools lack direct person-author link. |
| 4 | Educational notice and trust links | PARTIAL | Disclaimer/methodology/corrections exist; footer/publisher notices present. Consistent near-result notice/link placement still needed. |
| 4 | Publisher/contact/claims | MOSTLY PRESENT | REO Technologies and support email shown; mailbox forwarding was owner-confirmed earlier, not re-tested. No address supplied; never invent it. Rewrite unsupported accuracy/typical-fee claims. |
| 5.1 | Live ads.txt | PASS | HTTP 200 text/plain; exact requested Google DIRECT line. Worker override differs from extra partner lines in source file. |
| 5.2 | Consent defaults before AdSense | PASS IN SOURCE | All four relevant defaults denied before loader. This does not prove a certified CMP or user choice flow. |
| 5.2 | Published CMP + EEA/UK/CH + revoke | UNVERIFIED / RELEASE BLOCKER | Debug preview did not initialize TCF or show a dialog; Privacy Settings fell back to policy. No controlled EEA network egress or dashboard proof. |
| 5.2 | Privacy/cookie policies match runtime | PARTIAL | Website/app separation and provider disclosures present; Cloudflare performance beacon observed and should be explained accurately. CMP claims need real runtime proof. |
| 5.3 | Actual ad density/placement/CLS with fill | UNVERIFIED | No filled ad placement tested; no visible overlap observed with fill blocked. Auto Ads settings and served creatives unavailable. |
| 5.3 | Policy/contact/tool exclusions | PASS IN SOURCE / SAMPLED RUNTIME | No loader on policy/contact and all dedicated tools. Publisher verification meta is not an ad unit. |
| 5.4 | No empty ad placeholders | FAIL | 47 empty ad-unit divs on 45 pages. Zero authored ins.adsbygoogle slots found. |
| 5.5 | No fake Calculate/download/ad incentives | NO SUCH PATTERN FOUND | Calculator controls are real; no ad-click encouragement found. Not a guarantee about every third-party creative. |
| 5.6 | Sitemap/canonicals/robots/error responses | PASS WITHIN CRAWL | 246 unique canonical 200 pages; all seven hubs; Mediapartners-Google allowed; sample fake route and design URL 404. |
| 5.6 | IndexNow key | PARTIAL | Real random key and verification file already work; 65 HTML pages/old file still advertise placeholder. IndexNow is not an AdSense requirement. |
| 5.7 | Mobile Lighthouse/CLS | SAMPLED PASS / HOME PROVISIONAL | 7 hubs 97–99, 7 tools 99; CLS below .1 in lab. Home 90 twice with timeout warning; not complete performance proof. |
| 6 | After-remediation crawl | DEFERRED BY OWNER | No implementation authorized. Do not invent before/after improvements. |
| 6 | Zero open compliance items | NOT MET | CMP, ad fill, provenance, content and navigation items remain. No approval probability can be established. |

## Complete HTML inventory

Ads = AdSense loader. P = public document; D = design prototype; C = component partial. Main words and within-page deduplicated block/nonboilerplate counts use the definitions above. All public canonicals returned 200.

| Class | URL / file | Main words | Deduplicated block words | Nonboilerplate words | Links | Ads | Title | Meta description |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| D | https://mortgageproglobal.com/Designs/screen_australia_website · Designs/screen_australia_website.html | 90 | 0 | 0 | 17 | none | Australia Mortgage Tools | (none) |
| D | https://mortgageproglobal.com/Designs/screen_canada_website · Designs/screen_canada_website.html | 264 | 22 | 22 | 38 | none | Canada Mortgage Tools — MortgagePro | (none) |
| D | https://mortgageproglobal.com/Designs/screen_europe_website · Designs/screen_europe_website.html | 100 | 0 | 0 | 17 | none | Europe Mortgage Tools | (none) |
| D | https://mortgageproglobal.com/Designs/screen_india_website · Designs/screen_india_website.html | 521 | 0 | 0 | 17 | none | India Financial Tools – MortgagePro | (none) |
| D | https://mortgageproglobal.com/Designs/screen_newzealand_website · Designs/screen_newzealand_website.html | 433 | 0 | 0 | 17 | none | New Zealand Financial Tools | (none) |
| D | https://mortgageproglobal.com/Designs/screen_uk_website · Designs/screen_uk_website.html | 358 | 26 | 26 | 40 | none | UK Mortgage Tools — MortgagePro | (none) |
| D | https://mortgageproglobal.com/Designs/screen_usa_website · Designs/screen_usa_website.html | 453 | 36 | 36 | 43 | none | USA Financial Tools | (none) |
| P | https://mortgageproglobal.com/about · about.html | 348 | 349 | 349 | 48 | loader | About MortgagePro Global \| MortgagePro Global | Learn who publishes MortgagePro Global, how its mortgage estimates work, and where to find sources, limitations and corrections. |
| P | https://mortgageproglobal.com/affiliate-disclosure · affiliate-disclosure.html | 231 | 232 | 232 | 5 | none | Advertising and Commercial Disclosure \| MortgagePro Global | How advertising supports MortgagePro Global and why an advertisement is separate from a calculator result or lending recommendation. |
| P | https://mortgageproglobal.com/app-privacy-policy · app-privacy-policy.html | 2671 | 2635 | 2635 | 78 | none | Mobile App Privacy Policy \| MortgagePro Global | Shared privacy policy for REO Technologies mortgage calculator apps: USA, Global, Australia, Canada, India, New Zealand and Europe. Advertising, AI, data and choices. |
| P | https://mortgageproglobal.com/australia-mortgage-calculator · australia-mortgage-calculator.html | 1313 | 1235 | 1221 | 51 | loader | Australia Mortgage Calculator 2026 \| LMI & Stamp Duty | Estimate principal and interest, an entered LMI assumption and offset effects, with verified QLD/VIC general duty or your official assessment. |
| P | https://mortgageproglobal.com/authors/abdul-raheem · authors/abdul-raheem.html | 177 | 179 | 179 | 9 | loader | Abdul Raheem \| MortgagePro Global | Publisher information for MortgagePro Global, with links to the site's sources, methodology, public code and corrections process. |
| P | https://mortgageproglobal.com/blog/australia-affordability-calculator · blog/australia-affordability-calculator.html | 524 | 513 | 447 | 50 | loader | Australia Affordability: Understand the Serviceability Buffer \| MortgagePro Global | Explore an Australian monthly repayment allowance at an entered assessment rate, with a clearly scoped APRA three-point buffer reference. |
| P | https://mortgageproglobal.com/blog/australia-amortization-calculator · blog/australia-amortization-calculator.html | 494 | 483 | 417 | 49 | loader | Australia Fortnightly Repayments: Count the Extra Annual Payment \| MortgagePro Global | Compare Australian monthly and half-monthly fortnightly repayments with the extra annual cash commitment made explicit. |
| P | https://mortgageproglobal.com/blog/australia-dti-ratio-calculator · blog/australia-dti-ratio-calculator.html | 454 | 443 | 377 | 50 | loader | Australia DTI: The High-Debt Lending Limit in Force Since February 2026 \| MortgagePro Global | Calculate an Australian debt-to-income ratio and understand APRA's current lender-level limits for lending at six times income or more. |
| P | https://mortgageproglobal.com/blog/australia-lmi-calculator · blog/australia-lmi-calculator.html | 518 | 507 | 441 | 50 | loader | Australia LMI: Estimate a Quoted Premium and Check Guarantee Eligibility \| MortgagePro Global | Separate Australian LMI scenario arithmetic from insurer pricing and check the current 5% Deposit Scheme without assuming price caps disappeared. |
| P | https://mortgageproglobal.com/blog/australia-mortgage-calculator · blog/australia-mortgage-calculator.html | 461 | 450 | 384 | 51 | loader | Australia Mortgage Calculator: Repayments and Rate Changes \| MortgagePro Global | Estimate Australian principal-and-interest repayments with explicit rate assumptions and distinguish a monthly model from daily lender interest. |
| P | https://mortgageproglobal.com/blog/australia-offset-account-calculator · blog/australia-offset-account-calculator.html | 519 | 508 | 442 | 48 | loader | Australia Offset Accounts: Estimate Interest Reduction After Fees \| MortgagePro Global | Model a constant offset balance and partial-offset percentage, separate fees from interest reduction, and avoid unsupported lifetime or tax-return claims. |
| P | https://mortgageproglobal.com/blog/australia-refinance-tool · blog/australia-refinance-tool.html | 516 | 505 | 439 | 48 | loader | Australia Refinance: Compare the Rate, Fees and Any Cashback Conditions \| MortgagePro Global | Compare Australian refinancing cash flow on the same remaining term and distinguish borrower cashback conditions from broker commission clawback. |
| P | https://mortgageproglobal.com/blog/australia-stamp-duty-calculator · blog/australia-stamp-duty-calculator.html | 467 | 433 | 367 | 51 | loader | Australia Transfer Duty: Choose the State and the Right Buyer Category \| MortgagePro Global | Compare supported Queensland and Victoria general transfer-duty examples and find the right state assessment instead of using a national stamp-duty guess. |
| P | https://mortgageproglobal.com/blog/canada-affordability-calculator · blog/canada-affordability-calculator.html | 497 | 486 | 420 | 51 | loader | Canada Affordability: Test an Uninsured Purchase Budget \| MortgagePro Global | Explore a Canadian uninsured purchase budget using explicit housing costs, debt ratios, a qualifying rate and a separate 20% deposit constraint. |
| P | https://mortgageproglobal.com/blog/canada-amortization-calculator · blog/canada-amortization-calculator.html | 475 | 464 | 398 | 49 | loader | Canada Amortization: Monthly and Accelerated Biweekly Payments \| MortgagePro Global | Compare Canadian monthly and accelerated biweekly payments, including the extra annual cash required and the limits of a constant-rate model. |
| P | https://mortgageproglobal.com/blog/canada-cmhc-insurance-calculator · blog/canada-cmhc-insurance-calculator.html | 477 | 434 | 368 | 51 | loader | CMHC Premium Calculator: Base Loan, Surcharge and Cash Tax \| MortgagePro Global | Estimate a standard Canadian high-ratio purchase premium with verified CMHC tiers, a 30-year surcharge and explicit eligibility limits. |
| P | https://mortgageproglobal.com/blog/canada-gds-tds-calculator · blog/canada-gds-tds-calculator.html | 497 | 486 | 420 | 49 | loader | Canada GDS and TDS: Include Heat, Condo Fees and the Right Payment \| MortgagePro Global | Calculate Canadian housing and total-debt ratios with heat, condo fees and ground rent, using an entered qualifying mortgage payment. |
| P | https://mortgageproglobal.com/blog/canada-mortgage-calculator · blog/canada-mortgage-calculator.html | 464 | 453 | 387 | 52 | loader | Canada Mortgage Calculator: Payments, Compounding and Renewal \| MortgagePro Global | Estimate Canadian fixed-rate mortgage payments with semiannual compounding and distinguish the current contract term from the amortization period. |
| P | https://mortgageproglobal.com/blog/canada-prepayment-calculator · blog/canada-prepayment-calculator.html | 504 | 493 | 427 | 49 | loader | Canada Prepayments: Model a Lump Sum Without Guessing the Penalty \| MortgagePro Global | Calculate the effect of a permitted mortgage lump sum while keeping contractual prepayment limits, renewal rates and penalties separate. |
| P | https://mortgageproglobal.com/blog/canada-renewal-planner · blog/canada-renewal-planner.html | 497 | 486 | 420 | 49 | loader | Canada Renewal Planner: Recalculate the Balance and Remaining Term \| MortgagePro Global | Model a Canadian renewal payment from the amortized remaining balance and distinguish a straight switch from new borrowing. |
| P | https://mortgageproglobal.com/blog/canada-stress-test-calculator · blog/canada-stress-test-calculator.html | 466 | 435 | 369 | 49 | loader | Canada Mortgage Stress Test: Contract Rate Versus Qualifying Rate \| MortgagePro Global | Compare Canadian contract and qualifying payments using the standard 5.25% floor and two-point buffer, with clearly scoped renewal exceptions. |
| P | https://mortgageproglobal.com/blog/cmhc-insurance-canada-guide · blog/cmhc-insurance-canada-guide.html | 420 | 412 | 360 | 50 | loader | Canadian Mortgage Insurance: A Checklist Before You Commit \| MortgagePro Global | Understand what mortgage default insurance covers, which purchase costs stay in cash, and what to confirm with the lender before financing a premium. |
| P | https://mortgageproglobal.com/blog/how-to-use-mortgage-calculator · blog/how-to-use-mortgage-calculator.html | 503 | 495 | 443 | 56 | loader | How to Use a Mortgage Calculator Without Mistaking an Estimate for an Offer \| MortgagePro Global | Choose the right country, rate convention and repayment term, then add insurance, taxes, fees and a realistic budget to a mortgage estimate. |
| P | https://mortgageproglobal.com/blog/ · blog/index.html | 1637 | 1250 | 1250 | 85 | loader | Mortgage Blog & Guides \| MortgagePro Global | Expert mortgage guides, home buying tips and financial resources for USA, Canada, UK, Australia, NZ, India and Europe. By REO Technologies. |
| P | https://mortgageproglobal.com/blog/nz-car-loan-calculator · blog/nz-car-loan-calculator.html | 488 | 477 | 411 | 50 | loader | New Zealand Car Loans: Track the Outstanding Debt Before a Mortgage \| MortgagePro Global | Model a car-loan payment and remaining balance, then understand its separate effects on mortgage DTI, cash flow and deposit savings. |
| P | https://mortgageproglobal.com/blog/nz-dti-calculator · blog/nz-dti-calculator.html | 467 | 456 | 390 | 49 | loader | New Zealand DTI: A Debt Ratio, Not a Personal Borrowing Entitlement \| MortgagePro Global | Calculate New Zealand debt-to-income and distinguish RBNZ's six- and seven-times lender speed limits from a guaranteed individual mortgage maximum. |
| P | https://mortgageproglobal.com/blog/nz-first-home-buyer · blog/nz-first-home-buyer.html | 447 | 439 | 387 | 52 | loader | New Zealand First-Home Support: Separate the Loan, Withdrawal and Closed Grant \| MortgagePro Global | Check New Zealand First Home Loan and KiwiSaver withdrawal conditions without budgeting for the discontinued First Home Grant or obsolete price-cap assumptions. |
| P | https://mortgageproglobal.com/blog/nz-kiwisaver-calculator · blog/nz-kiwisaver-calculator.html | 505 | 494 | 428 | 48 | loader | KiwiSaver First-Home Withdrawal: Confirm Eligible Funds and Retention \| MortgagePro Global | Estimate eligible KiwiSaver savings after required retention while keeping membership, transferred funds and provider approval separate. |
| P | https://mortgageproglobal.com/blog/nz-lvr-calculator · blog/nz-lvr-calculator.html | 461 | 450 | 384 | 49 | loader | New Zealand LVR: Calculate Equity and Understand Bank Speed Limits \| MortgagePro Global | Calculate New Zealand LVR and a target deposit while distinguishing bank high-LVR speed limits from individual lending approval. |
| P | https://mortgageproglobal.com/blog/nz-mortgage-calculator · blog/nz-mortgage-calculator.html | 465 | 454 | 388 | 52 | loader | New Zealand Mortgage Calculator: Table-Loan Payments and Refixing \| MortgagePro Global | Estimate a New Zealand table-loan payment using an explicit rate assumption and plan for the remaining balance when a fixed period ends. |
| P | https://mortgageproglobal.com/blog/nz-rental-yield-calculator · blog/nz-rental-yield-calculator.html | 493 | 444 | 378 | 48 | loader | New Zealand Rental Yield: Include Vacancy and Separate Financing \| MortgagePro Global | Calculate gross and net operating rental yield with occupancy and management costs, without confusing it with after-tax leveraged return. |
| P | https://mortgageproglobal.com/blog/nz-repayment-calculator · blog/nz-repayment-calculator.html | 499 | 488 | 422 | 49 | loader | New Zealand Repayments: Table Loan and an Interest-Only Phase \| MortgagePro Global | Compare New Zealand table-loan and interest-only balances, then estimate the repayment needed after an interest-only period ends. |
| P | https://mortgageproglobal.com/blog/uk-affordability-calculator · blog/uk-affordability-calculator.html | 500 | 489 | 423 | 49 | loader | UK Affordability: Use a Budget, Not a Promised Income Multiple \| MortgagePro Global | Explore UK borrowing from an explicit monthly allowance and assessment-rate assumption, with income, spending and lender checks kept separate. |
| P | https://mortgageproglobal.com/blog/uk-amortization-calculator · blog/uk-amortization-calculator.html | 508 | 497 | 431 | 48 | loader | UK Repayment Versus Interest-Only: Compare the Balance as Well as the Bill \| MortgagePro Global | Compare UK repayment and interest-only scenarios, including the outstanding principal and a later switch to repayment at an assumed unchanged rate. |
| P | https://mortgageproglobal.com/blog/uk-buy-to-let-calculator · blog/uk-buy-to-let-calculator.html | 491 | 480 | 414 | 49 | loader | UK Buy-to-Let: Model Rental Coverage Without Assuming Approval \| MortgagePro Global | Calculate required rent and an interest-coverage loan scenario using editable ICR and stress-rate inputs, without treating company status as automatic eligibility. |
| P | https://mortgageproglobal.com/blog/uk-help-to-buy · blog/uk-help-to-buy.html | 441 | 433 | 381 | 52 | loader | UK First-Home Support: Help to Buy Status and Lifetime ISA Limits \| MortgagePro Global | Check England's closed Help to Buy equity loan, Wales's March 2027 application deadline and the separate Lifetime ISA conditions. |
| P | https://mortgageproglobal.com/blog/uk-ltv-calculator · blog/uk-ltv-calculator.html | 464 | 428 | 362 | 48 | loader | UK LTV Calculator: Deposit, Valuation and a Target Band \| MortgagePro Global | Calculate UK loan-to-value and the principal reduction needed to reach an assumed target, without promising a lender rate tier. |
| P | https://mortgageproglobal.com/blog/uk-mortgage-calculator · blog/uk-mortgage-calculator.html | 501 | 490 | 424 | 50 | loader | UK Mortgage Calculator: Repayments and the End of a Fixed Deal \| MortgagePro Global | Calculate a UK repayment mortgage with explicit rate assumptions and plan for the remaining balance when a fixed deal expires. |
| P | https://mortgageproglobal.com/blog/uk-remortgage-tool · blog/uk-remortgage-tool.html | 526 | 515 | 449 | 48 | loader | UK Remortgage Costs: Compare Fees, ERC and the Same Remaining Term \| MortgagePro Global | Compare a UK remortgage's monthly cash flow with upfront fees and early-repayment costs while keeping the repayment term consistent. |
| P | https://mortgageproglobal.com/blog/uk-stamp-duty-calculator · blog/uk-stamp-duty-calculator.html | 466 | 455 | 389 | 51 | loader | England and Northern Ireland SDLT Calculator: Bands and Surcharges \| MortgagePro Global | Estimate individual residential SDLT with standard bands, first-time relief and separate additional-property and non-resident assumptions. |
| P | https://mortgageproglobal.com/blog/uk-stamp-duty-guide · blog/uk-stamp-duty-guide.html | 481 | 473 | 421 | 50 | loader | SDLT Completion Checklist: Confirm the Facts Before Filing \| MortgagePro Global | Prepare the transaction details needed for an England or Northern Ireland SDLT return, including relief, residence and potential refund questions. |
| P | https://mortgageproglobal.com/blog/usa-affordability-calculator · blog/usa-affordability-calculator.html | 906 | 874 | 874 | 53 | loader | US Home Affordability Calculator: Include PMI, Taxes and Other Debts \| MortgagePro Global | Estimate a US home price from your housing budget with editable tax, insurance, HOA and PMI assumptions. Understand why an estimate is not preapproval. |
| P | https://mortgageproglobal.com/blog/usa-amortization-calculator · blog/usa-amortization-calculator.html | 855 | 795 | 795 | 51 | loader | US Mortgage Amortization: Track Principal, Interest and Extra Payments \| MortgagePro Global | Follow a US mortgage balance month by month with a checked amortization example, a full schedule and an extra-payment comparison. |
| P | https://mortgageproglobal.com/blog/usa-down-payment-calculator · blog/usa-down-payment-calculator.html | 810 | 736 | 736 | 55 | loader | US Down Payment Calculator: Compare Cash, PMI and Monthly Payments \| MortgagePro Global | Compare 3%, 5%, 10% and 20% down payments with explicit PMI assumptions, checked monthly payments and a separate cash-to-close budget. |
| P | https://mortgageproglobal.com/blog/usa-dti-calculator · blog/usa-dti-calculator.html | 819 | 775 | 775 | 52 | loader | US DTI Calculator: Measure Housing Costs and Total Monthly Debt \| MortgagePro Global | Calculate front-end and back-end debt-to-income ratios, understand the limits of the 28/36 guideline, and avoid outdated approval labels. |
| P | https://mortgageproglobal.com/blog/usa-fha-loan-calculator · blog/usa-fha-loan-calculator.html | 967 | 860 | 860 | 55 | loader | FHA Loan Costs: Down Payment, Upfront MIP and Monthly Insurance \| MortgagePro Global | Estimate a standard FHA purchase loan with upfront MIP, a labeled monthly MIP approximation, and clear limits on insurance duration and eligibility. |
| P | https://mortgageproglobal.com/blog/usa-mortgage-calculator · blog/usa-mortgage-calculator.html | 907 | 866 | 866 | 56 | loader | US Mortgage Calculator: Monthly Payments, Rates and the Full Budget \| MortgagePro Global | Calculate US mortgage principal and interest, compare 15- and 30-year examples, and separate a dated rate benchmark from your actual lender quote. |
| P | https://mortgageproglobal.com/blog/usa-piti-calculator · blog/usa-piti-calculator.html | 892 | 839 | 839 | 54 | loader | US PITI Calculator: Separate the Mortgage Payment from the Housing Budget \| MortgagePro Global | Calculate principal, interest, property tax and homeowners insurance, with PMI and HOA shown separately. Understand escrow changes and omitted costs. |
| P | https://mortgageproglobal.com/blog/usa-va-loan-calculator · blog/usa-va-loan-calculator.html | 912 | 828 | 828 | 54 | loader | VA Loan Funding Fee: Calculate Purchase Costs and Check Exemptions \| MortgagePro Global | Calculate VA purchase funding fees, financed balances and payments, with accurate first-use tiers and clear limits on exemption and eligibility estimates. |
| P | https://mortgageproglobal.com/canada-mortgage-calculator · canada-mortgage-calculator.html | 1398 | 1268 | 1268 | 49 | loader | Canada Mortgage Calculator 2026 \| CMHC & Stress Test | Estimate Canadian monthly payments and a scoped insurance scenario, with separate qualifying-rate and lender eligibility checks. |
| C | https://mortgageproglobal.com/components/footer · components/footer.html | 130 | 130 | 130 | 29 | none | (partial/no title) | (none) |
| C | https://mortgageproglobal.com/components/header · components/header.html | 4 | 0 | 0 | 16 | none | (partial/no title) | (none) |
| P | https://mortgageproglobal.com/contact · contact.html | 213 | 214 | 214 | 46 | none | Contact MortgagePro Global \| MortgagePro Global | Contact the publisher about calculator behavior, factual corrections, privacy questions or a problem using MortgagePro Global. |
| P | https://mortgageproglobal.com/cookie-policy · cookie-policy.html | 416 | 417 | 417 | 9 | none | Cookie and Browser Storage Policy \| MortgagePro Global | Understand browser preferences, hosting security and Google advertising technologies, and where to change privacy choices on MortgagePro Global. |
| P | https://mortgageproglobal.com/corrections-policy · corrections-policy.html | 336 | 337 | 337 | 44 | none | Corrections Policy \| MortgagePro Global | Report a calculation error, outdated financial rule or broken link and understand how MortgagePro Global reviews and corrects published information. |
| P | https://mortgageproglobal.com/data-deletion-policy · data-deletion-policy.html | 326 | 327 | 327 | 45 | none | Website Data and Deletion Requests \| MortgagePro Global | Clear browser preferences or request deletion of website correspondence, with separate guidance for hosting, advertising providers and the Android application. |
| P | https://mortgageproglobal.com/data-sources · data-sources.html | 398 | 374 | 374 | 63 | loader | Financial Data Sources \| MortgagePro Global | Find the primary sources behind MortgagePro Global's policy references and published observations, with dates and limits on how to use them. |
| P | https://mortgageproglobal.com/disclaimer · disclaimer.html | 365 | 366 | 366 | 45 | none | Financial Information Disclaimer \| MortgagePro Global | MortgagePro Global provides educational estimates, not loan offers, approval decisions or personal financial, legal or tax advice. |
| P | https://mortgageproglobal.com/editorial-policy · editorial-policy.html | 451 | 452 | 452 | 47 | none | Editorial Policy \| MortgagePro Global | How MortgagePro Global uses official sources, explains financial assumptions, checks calculations and handles updates without promising independent licensed review. |
| P | https://mortgageproglobal.com/europe-mortgage-calculator · europe-mortgage-calculator.html | 1217 | 1276 | 1262 | 38 | loader | European Mortgage Calculator — Selected Countries \| MortgagePro Global | Compare a monthly euro repayment and an entered buying-cost allowance while checking country-specific fees, taxes and lender terms separately. |
| P | https://mortgageproglobal.com/ · index.html | 1481 | 1239 | 1239 | 72 | loader | MortgagePro Global \| Free Mortgage Calculators | Free mortgage calculators for USA, Canada, UK, Australia, NZ, India & Europe. Instant monthly payments, EMI & amortization. |
| P | https://mortgageproglobal.com/india-home-loan-emi-calculator · india-home-loan-emi-calculator.html | 1805 | 1318 | 1304 | 72 | loader | India Home Loan EMI Calculator 2026 \| SBI, HDFC, ICICI | Estimate a monthly EMI and an entered processing-fee allowance without mistaking a policy reference or a tax deduction for your actual loan offer. |
| P | https://mortgageproglobal.com/methodology · methodology.html | 578 | 579 | 579 | 7 | none | Calculation Methodology and Limits \| MortgagePro Global | Understand repayment formulas, rate conventions, amortization balances and the limits of mortgage insurance, tax, offset and affordability estimates. |
| P | https://mortgageproglobal.com/mortgage-faq · mortgage-faq.html | 548 | 549 | 549 | 50 | loader | Mortgage Planning Questions \| MortgagePro Global | Understand payments, loan terms, mortgage insurance and country-specific rules before treating a mortgage calculation as a lending offer. |
| P | https://mortgageproglobal.com/new-zealand-mortgage-calculator · new-zealand-mortgage-calculator.html | 1684 | 1276 | 1262 | 76 | loader | NZ Home Loan Calculator 2026 \| LVR & KiwiSaver | Estimate a New Zealand monthly table-loan payment, a confirmed KiwiSaver contribution and the limits of an LVR illustration. |
| P | https://mortgageproglobal.com/privacy-policy · privacy-policy.html | 819 | 820 | 820 | 50 | none | Website Privacy Policy \| MortgagePro Global | How MortgagePro Global handles calculator inputs, browser preferences, advertising, hosting requests and messages you choose to send. |
| P | https://mortgageproglobal.com/terms-and-conditions · terms-and-conditions.html | 406 | 407 | 407 | 47 | none | Website Terms of Use \| MortgagePro Global | The scope of MortgagePro Global's website tools, acceptable use, third-party services and the limits of educational mortgage estimates. |
| P | https://mortgageproglobal.com/tools/australia/affordability · tools/australia/affordability.html | 384 | 321 | 279 | 22 | none | Australian Household Borrowing Budget \| MortgagePro Global | Use actual take-home income and commitments to test an entered quote plus assessment buffer. |
| P | https://mortgageproglobal.com/tools/australia/amortization · tools/australia/amortization.html | 379 | 308 | 266 | 23 | none | Australian Amortization Schedule \| MortgagePro Global | Calculate full principal/interest schedules and the effect of permitted extra repayments. |
| P | https://mortgageproglobal.com/tools/australia/construction · tools/australia/construction.html | 532 | 374 | 332 | 19 | none | Australian Construction Drawdown Budget \| MortgagePro Global | Calculate construction interest from actual land/stage drawdowns and later P&I on funded principal. |
| P | https://mortgageproglobal.com/tools/australia/dti · tools/australia/dti.html | 354 | 292 | 250 | 22 | none | Australia Debt-to-Income Scenario \| MortgagePro Global | Measure assessed debt against annual qualifying income and show quote/buffer payment scenarios. |
| P | https://mortgageproglobal.com/tools/australia/duty-by-state · tools/australia/duty-by-state.html | 468 | 410 | 368 | 30 | none | Transfer Duty by State and Territory \| MortgagePro Global | Calculate published general-duty scenarios for all eight states/territories and add confirmed adjustments. |
| P | https://mortgageproglobal.com/tools/australia/first-home · tools/australia/first-home.html | 383 | 319 | 277 | 24 | none | First-Home Purchase Funding Budget \| MortgagePro Global | Combine actual savings, confirmed grant/FHSS release and other available funds against a deposit target. |
| P | https://mortgageproglobal.com/tools/australia/frequency · tools/australia/frequency.html | 275 | 251 | 209 | 23 | none | Payment Frequency Comparison \| MortgagePro Global | Compare regular and accelerated monthly-equivalent repayment plans. |
| P | https://mortgageproglobal.com/tools/australia/interest-only · tools/australia/interest-only.html | 288 | 255 | 213 | 23 | none | Interest-Only Transition \| MortgagePro Global | Compare an interest-only period, remaining principal and the later repayment payment. |
| P | https://mortgageproglobal.com/tools/australia/lmi-rate · tools/australia/lmi-rate.html | 343 | 282 | 240 | 23 | none | LMI Premium-Rate Scenario \| MortgagePro Global | Use an entered premium-rate scenario and separately quoted additions without fabricating an insurer tariff. |
| P | https://mortgageproglobal.com/tools/australia/lmi · tools/australia/lmi.html | 344 | 294 | 252 | 24 | none | LMI Quote and Financing Budget \| MortgagePro Global | Budget an actual all-in lender LMI quote and its cash/financed payment impact. |
| P | https://mortgageproglobal.com/tools/australia/ltv · tools/australia/ltv.html | 266 | 241 | 199 | 21 | none | Australian Loan-to-Value Ratio \| MortgagePro Global | Calculate actual equity/LVR and the principal reduction to an entered target. |
| P | https://mortgageproglobal.com/tools/australia/mortgage · tools/australia/mortgage.html | 345 | 285 | 243 | 23 | none | Australian Mortgage Calculator \| MortgagePro Global | Estimate repayment or interest-only payments using actual price, deposit, rate and financed charges. |
| P | https://mortgageproglobal.com/tools/australia/offset · tools/australia/offset.html | 386 | 312 | 270 | 21 | none | Australian Offset Account Simulator \| MortgagePro Global | Keep mortgage repayments fixed while modeling a separate offset balance and monthly cash changes. |
| P | https://mortgageproglobal.com/tools/australia/overpayment · tools/australia/overpayment.html | 379 | 308 | 266 | 23 | none | Extra Repayment Savings \| MortgagePro Global | Calculate full principal/interest schedules and the effect of permitted extra repayments. |
| P | https://mortgageproglobal.com/tools/australia/rate-comparison · tools/australia/rate-comparison.html | 386 | 294 | 252 | 21 | none | Mortgage Quote Rate Impact \| MortgagePro Global | Compare actual rates, fees, interest and remaining balances over a shared horizon. |
| P | https://mortgageproglobal.com/tools/australia/refinance · tools/australia/refinance.html | 385 | 293 | 251 | 21 | none | Australian Refinance Comparison \| MortgagePro Global | Compare actual rates, fees, interest and remaining balances over a shared horizon. |
| P | https://mortgageproglobal.com/tools/australia/stamp-duty · tools/australia/stamp-duty.html | 466 | 408 | 366 | 30 | none | Australian Transfer Duty Budget \| MortgagePro Global | Calculate published general-duty scenarios for all eight states/territories and add confirmed adjustments. |
| P | https://mortgageproglobal.com/tools/canada/affordability · tools/canada/affordability.html | 493 | 367 | 325 | 27 | none | Canada Home Affordability \| MortgagePro Global | Solve a purchase budget using down payment, insurance, debt-service budgets and actual housing costs. |
| P | https://mortgageproglobal.com/tools/canada/amortization · tools/canada/amortization.html | 416 | 333 | 291 | 27 | none | Canadian Amortization Schedule \| MortgagePro Global | Review every repayment and annual principal/interest totals with the final payment capped. |
| P | https://mortgageproglobal.com/tools/canada/cmhc · tools/canada/cmhc.html | 373 | 319 | 277 | 27 | none | CMHC Insurance Calculator \| MortgagePro Global | Find the modeled minimum down payment, insurance tier, premium and cash premium tax. |
| P | https://mortgageproglobal.com/tools/canada/compounding · tools/canada/compounding.html | 245 | 223 | 181 | 27 | none | Canadian Compounding Comparison \| MortgagePro Global | Compare monthly repayments under semiannual and monthly nominal compounding conventions. |
| P | https://mortgageproglobal.com/tools/canada/credit-quote · tools/canada/credit-quote.html | 433 | 329 | 287 | 27 | none | Credit Score Quote Comparison \| MortgagePro Global | Compare two actual lender offers rather than guessing a rate from a credit score. |
| P | https://mortgageproglobal.com/tools/canada/first-home-buyer · tools/canada/first-home-buyer.html | 357 | 304 | 262 | 24 | none | First-Home Buyer Funding Budget \| MortgagePro Global | Combine confirmed FHSA/HBP withdrawals, savings and co-buyer funds against a target purchase. |
| P | https://mortgageproglobal.com/tools/canada/gds-tds · tools/canada/gds-tds.html | 320 | 256 | 214 | 26 | none | GDS / TDS Ratio Calculator \| MortgagePro Global | Calculate housing and total-debt ratios from actual qualifying payments and living costs. |
| P | https://mortgageproglobal.com/tools/canada/land-transfer-tax · tools/canada/land-transfer-tax.html | 490 | 409 | 367 | 29 | none | Land Transfer Tax & Title Costs \| MortgagePro Global | Budget supported transfer taxes or title levies and confirmed local additions/rebates. |
| P | https://mortgageproglobal.com/tools/canada/mortgage · tools/canada/mortgage.html | 473 | 391 | 349 | 27 | none | Canada Mortgage Calculator \| MortgagePro Global | Calculate a Canadian purchase payment with CMHC, cash/financed premiums and regular payment frequencies. |
| P | https://mortgageproglobal.com/tools/canada/payment-frequency · tools/canada/payment-frequency.html | 315 | 274 | 232 | 27 | none | Payment Frequency Comparison \| MortgagePro Global | Compare regular monthly, biweekly, weekly and accelerated repayment plans. |
| P | https://mortgageproglobal.com/tools/canada/prepayment · tools/canada/prepayment.html | 416 | 333 | 291 | 27 | none | Prepayment Savings Calculator \| MortgagePro Global | Compare permitted recurring, annual and one-time extra principal payments with the same baseline. |
| P | https://mortgageproglobal.com/tools/canada/rate-comparison · tools/canada/rate-comparison.html | 437 | 333 | 291 | 27 | none | Mortgage Rate Impact Comparison \| MortgagePro Global | Measure the payment impact of two actual mortgage rates without treating a policy rate as a loan quote. |
| P | https://mortgageproglobal.com/tools/canada/refinance · tools/canada/refinance.html | 432 | 328 | 286 | 27 | none | Mortgage Refinance Comparison \| MortgagePro Global | Compare an existing mortgage with a refinance offer after known fees, penalties and cashback. |
| P | https://mortgageproglobal.com/tools/canada/renewal · tools/canada/renewal.html | 431 | 327 | 285 | 27 | none | Mortgage Renewal Planner \| MortgagePro Global | Compare renewal offers over a common horizon, including payments, interest and remaining balances. |
| P | https://mortgageproglobal.com/tools/canada/stress-test · tools/canada/stress-test.html | 529 | 394 | 352 | 26 | none | Mortgage Stress Test \| MortgagePro Global | Compare contract-rate payments with a standard qualifying-rate scenario and GDS/TDS. |
| P | https://mortgageproglobal.com/tools/europe/affordability · tools/europe/affordability.html | 421 | 338 | 296 | 21 | none | European Household Borrowing Budget \| MortgagePro Global | Compare actual household cash capacity with an explicitly entered income-multiple scenario. |
| P | https://mortgageproglobal.com/tools/europe/amortization · tools/europe/amortization.html | 398 | 331 | 289 | 21 | none | European Amortization and CSV Schedule \| MortgagePro Global | Inspect full principal/interest schedules and the effect of permitted extra payments. |
| P | https://mortgageproglobal.com/tools/europe/country-comparison · tools/europe/country-comparison.html | 443 | 353 | 311 | 22 | none | Compare Actual European Mortgage Quotes \| MortgagePro Global | Compare two actual EUR quotes from your chosen countries/providers on one principal and horizon. |
| P | https://mortgageproglobal.com/tools/europe/currency · tools/europe/currency.html | 385 | 323 | 281 | 20 | none | Executable Currency Quote and Fee Budget \| MortgagePro Global | Convert a stated amount using your actual destination-per-source quote and separate fees. |
| P | https://mortgageproglobal.com/tools/europe/dti · tools/europe/dti.html | 419 | 334 | 292 | 21 | none | European Debt-Service to Income Ratio \| MortgagePro Global | Combine actual monthly obligations using the income definition and target you supply. |
| P | https://mortgageproglobal.com/tools/europe/euribor · tools/europe/euribor.html | 418 | 355 | 313 | 21 | none | Euribor Quote, Margin and Payment Scenario \| MortgagePro Global | Model a confirmed contractual benchmark fixing plus margin and optional actual all-in floor. |
| P | https://mortgageproglobal.com/tools/europe/mortgage · tools/europe/mortgage.html | 375 | 316 | 274 | 22 | none | European Mortgage Calculator \| MortgagePro Global | Calculate EUR purchase payments with actual deposit, fees and a stated mortgage quote. |
| P | https://mortgageproglobal.com/tools/europe/nonresident · tools/europe/nonresident.html | 408 | 328 | 286 | 21 | none | Non-Resident Mortgage Quote Budget \| MortgagePro Global | Check payment, cash shortfall and a lender-confirmed LTV scenario for a EUR purchase. |
| P | https://mortgageproglobal.com/tools/europe/notary-costs · tools/europe/notary-costs.html | 437 | 353 | 311 | 22 | none | Notary and Purchase Closing-Cost Quotes \| MortgagePro Global | Combine itemized tax-inclusive legal, registration and closing quotes with your actual deposit. |
| P | https://mortgageproglobal.com/tools/europe/overpayment · tools/europe/overpayment.html | 397 | 330 | 288 | 21 | none | European Extra Repayment Scenario \| MortgagePro Global | Inspect full principal/interest schedules and the effect of permitted extra payments. |
| P | https://mortgageproglobal.com/tools/europe/property-tax · tools/europe/property-tax.html | 422 | 349 | 307 | 22 | none | Confirmed Local Property-Tax Budget \| MortgagePro Global | Keep upfront transfer/VAT budgets separate from ongoing assessed-property charges. |
| P | https://mortgageproglobal.com/tools/india/amortization · tools/india/amortization.html | 391 | 323 | 170 | 25 | none | India Amortization and CSV Schedule \| MortgagePro Global | Inspect the full repayment schedule and the effect of permitted additional principal. |
| P | https://mortgageproglobal.com/tools/india/bank-comparison · tools/india/bank-comparison.html | 423 | 331 | 178 | 25 | none | Compare Two Actual Bank Quotes \| MortgagePro Global | Compare two actual quotes, upfront cash costs, interest and balances over the same horizon. |
| P | https://mortgageproglobal.com/tools/india/bank-hfc · tools/india/bank-hfc.html | 423 | 331 | 178 | 25 | none | Bank and HFC Quote Comparison \| MortgagePro Global | Compare two actual quotes, upfront cash costs, interest and balances over the same horizon. |
| P | https://mortgageproglobal.com/tools/india/capital-gains · tools/india/capital-gains.html | 386 | 321 | 168 | 24 | none | Property Sale Cash Gain and Tax Budget \| MortgagePro Global | Keep unindexed cash gain separate from adviser-confirmed taxable gain and settlement cash. |
| P | https://mortgageproglobal.com/tools/india/car-loan · tools/india/car-loan.html | 337 | 283 | 130 | 22 | none | India Car Loan EMI \| MortgagePro Global | Calculate vehicle financing with an actual cash down payment and charges. |
| P | https://mortgageproglobal.com/tools/india/city-price · tools/india/city-price.html | 307 | 283 | 130 | 20 | none | City Property Quote × Area Budget \| MortgagePro Global | Apply an actual locality/property quote to an area measured on the same basis. |
| P | https://mortgageproglobal.com/tools/india/construction · tools/india/construction.html | 534 | 376 | 223 | 22 | none | Under-Construction Draw and Pre-EMI Budget \| MortgagePro Global | Budget cash interest only on actual timed draws and later EMI on actual funded principal. |
| P | https://mortgageproglobal.com/tools/india/credit-quote · tools/india/credit-quote.html | 421 | 329 | 176 | 25 | none | Credit-Profile Quote Impact \| MortgagePro Global | Compare two actual quotes, upfront cash costs, interest and balances over the same horizon. |
| P | https://mortgageproglobal.com/tools/india/currency · tools/india/currency.html | 344 | 300 | 147 | 20 | none | Foreign Currency to INR Quote Budget \| MortgagePro Global | Convert foreign funds using your executable INR quote and explicit transfer charges. |
| P | https://mortgageproglobal.com/tools/india/duty-by-state · tools/india/duty-by-state.html | 404 | 329 | 176 | 24 | none | State / UT Duty Inputs and Closing Budget \| MortgagePro Global | Budget your actual state/UT transaction using confirmed assessment, effective rates and quoted extras. |
| P | https://mortgageproglobal.com/tools/india/education-loan · tools/india/education-loan.html | 357 | 296 | 143 | 22 | none | Education Loan Moratorium Budget \| MortgagePro Global | Separate moratorium interest paid in cash from interest capitalized once before EMI starts. |
| P | https://mortgageproglobal.com/tools/india/emi · tools/india/emi.html | 335 | 291 | 138 | 25 | none | India Loan EMI Calculator \| MortgagePro Global | Calculate reducing-balance instalments with financed charges and separate cash fees. |
| P | https://mortgageproglobal.com/tools/india/epf · tools/india/epf.html | 378 | 324 | 171 | 23 | none | EPF Actual-Credit Projection \| MortgagePro Global | Project actual employee and NET employer EPF credits without confusing EPS with EPF savings. |
| P | https://mortgageproglobal.com/tools/india/floating-fixed · tools/india/floating-fixed.html | 382 | 309 | 156 | 25 | none | Floating versus Fixed Rate Scenario \| MortgagePro Global | Compare a fixed quote with a floating loan that changes rate once at your selected time. |
| P | https://mortgageproglobal.com/tools/india/foir · tools/india/foir.html | 339 | 284 | 131 | 23 | none | Fixed Obligations to Income Ratio \| MortgagePro Global | Calculate a descriptive debt-service ratio and headroom against a target you supply. |
| P | https://mortgageproglobal.com/tools/india/gold-loan · tools/india/gold-loan.html | 365 | 304 | 151 | 22 | none | Gold Loan Valuation and Repayment \| MortgagePro Global | Use lender-confirmed net gold value and LTV to model P&I or monthly-interest principal-at-maturity. |
| P | https://mortgageproglobal.com/tools/india/gst-purchase · tools/india/gst-purchase.html | 326 | 296 | 143 | 24 | none | GST-Inclusive Purchase Cash Budget \| MortgagePro Global | Add or extract the confirmed effective GST and keep other closing costs separate. |
| P | https://mortgageproglobal.com/tools/india/gst · tools/india/gst.html | 326 | 296 | 143 | 24 | none | Property GST Add / Extract \| MortgagePro Global | Add or extract the confirmed effective GST and keep other closing costs separate. |
| P | https://mortgageproglobal.com/tools/india/income-tax · tools/india/income-tax.html | 381 | 350 | 197 | 24 | none | 2026–27 Ordinary Resident Income Tax \| MortgagePro Global | Compare separately prepared taxable incomes with current ordinary resident slabs, rebate and cess. |
| P | https://mortgageproglobal.com/tools/india/joint-loan · tools/india/joint-loan.html | 388 | 304 | 151 | 23 | none | Joint Home-Loan Budget \| MortgagePro Global | Combine separately accepted joint income and debts without inventing a credit-score discount. |
| P | https://mortgageproglobal.com/tools/india/lap · tools/india/lap.html | 316 | 272 | 119 | 23 | none | Loan Against Property Quote Budget \| MortgagePro Global | Calculate loan principal at an actual assessed-value ratio and repayment quote. |
| P | https://mortgageproglobal.com/tools/india/loan-eligibility · tools/india/loan-eligibility.html | 367 | 303 | 150 | 23 | none | Home-Loan Budget and FOIR Scenario \| MortgagePro Global | Estimate principal fitting both your entered FOIR target and actual household cash budget. |
| P | https://mortgageproglobal.com/tools/india/mortgage · tools/india/mortgage.html | 337 | 277 | 124 | 25 | none | India Home Purchase Mortgage \| MortgagePro Global | Build a purchase payment budget from price, cash deposit and actual financed charges. |
| P | https://mortgageproglobal.com/tools/india/nps · tools/india/nps.html | 389 | 319 | 166 | 23 | none | NPS Corpus and Annuity Quote Scenario \| MortgagePro Global | Project contributions and separate a chosen annuity allocation from remaining corpus before withdrawal tax. |
| P | https://mortgageproglobal.com/tools/india/nre-nro · tools/india/nre-nro.html | 347 | 303 | 150 | 23 | none | NRE / NRO Deposit Quote Budget \| MortgagePro Global | Compute gross compounded deposit interest and a separately confirmed tax/withholding budget. |
| P | https://mortgageproglobal.com/tools/india/nri-loan · tools/india/nri-loan.html | 375 | 302 | 149 | 23 | none | NRI Home-Loan INR Budget \| MortgagePro Global | Convert actual foreign income and compare an INR mortgage quote. |
| P | https://mortgageproglobal.com/tools/india/overpayment · tools/india/overpayment.html | 389 | 321 | 168 | 25 | none | India Prepayment Savings \| MortgagePro Global | Inspect the full repayment schedule and the effect of permitted additional principal. |
| P | https://mortgageproglobal.com/tools/india/personal-loan · tools/india/personal-loan.html | 335 | 291 | 138 | 25 | none | Personal Loan Reducing-Balance EMI \| MortgagePro Global | Calculate reducing-balance instalments with financed charges and separate cash fees. |
| P | https://mortgageproglobal.com/tools/india/pmay-housing · tools/india/pmay-housing.html | 338 | 304 | 151 | 21 | none | PMAY Housing Loan Credit Budget \| MortgagePro Global | Model an actual subsidy credit already posted to principal, at an unchanged mortgage quote. |
| P | https://mortgageproglobal.com/tools/india/pmay-screen · tools/india/pmay-screen.html | 391 | 342 | 189 | 21 | none | PMAY-U 2.0 ISS Numerical Screen \| MortgagePro Global | Compare entered figures with five current published numeric screens; no subsidy is awarded. |
| P | https://mortgageproglobal.com/tools/india/pmay-subsidy · tools/india/pmay-subsidy.html | 339 | 305 | 152 | 21 | none | Actual PMAY Credit and EMI Recast \| MortgagePro Global | Model an actual subsidy credit already posted to principal, at an unchanged mortgage quote. |
| P | https://mortgageproglobal.com/tools/india/ppf · tools/india/ppf.html | 381 | 327 | 174 | 23 | none | PPF Deposit Timing Projection \| MortgagePro Global | Project fiscal-year PPF interest with explicit deposit timing and an entered rate scenario. |
| P | https://mortgageproglobal.com/tools/india/refinance · tools/india/refinance.html | 422 | 330 | 177 | 25 | none | Balance Transfer Cost Comparison \| MortgagePro Global | Compare two actual quotes, upfront cash costs, interest and balances over the same horizon. |
| P | https://mortgageproglobal.com/tools/india/section-24b · tools/india/section-24b.html | 362 | 323 | 170 | 23 | none | Confirmed Home-Loan Interest Deduction Scenario \| MortgagePro Global | Measure tax before/after an adviser-confirmed old-regime deduction, including rebate effects. |
| P | https://mortgageproglobal.com/tools/india/section-80c · tools/india/section-80c.html | 362 | 323 | 170 | 23 | none | Confirmed Savings / Principal Deduction Scenario \| MortgagePro Global | Measure tax before/after an adviser-confirmed old-regime deduction, including rebate effects. |
| P | https://mortgageproglobal.com/tools/india/sip · tools/india/sip.html | 350 | 301 | 148 | 23 | none | SIP / Lump-Sum Investment Projection \| MortgagePro Global | Project a starting balance and optionally stepped monthly contributions at a stated net-return assumption. |
| P | https://mortgageproglobal.com/tools/india/stamp-duty · tools/india/stamp-duty.html | 403 | 328 | 175 | 24 | none | Stamp Duty and Registration Quote Budget \| MortgagePro Global | Budget your actual state/UT transaction using confirmed assessment, effective rates and quoted extras. |
| P | https://mortgageproglobal.com/tools/india/tax-comparison · tools/india/tax-comparison.html | 380 | 349 | 196 | 24 | none | Home-Loan Deduction / Regime Tax Comparison \| MortgagePro Global | Compare separately prepared taxable incomes with current ordinary resident slabs, rebate and cess. |
| P | https://mortgageproglobal.com/tools/india/tds · tools/india/tds.html | 367 | 335 | 182 | 25 | none | Resident-Seller Property TDS Scenario \| MortgagePro Global | Screen the aggregate threshold for a limited ordinary resident-seller withholding scenario. |
| P | https://mortgageproglobal.com/tools/newzealand/affordability · tools/newzealand/affordability.html | 371 | 308 | 170 | 26 | none | New Zealand Household Borrowing Budget \| MortgagePro Global | Estimate a budget from actual take-home income, spending and an entered assessment-rate scenario. |
| P | https://mortgageproglobal.com/tools/newzealand/amortization · tools/newzealand/amortization.html | 368 | 297 | 159 | 24 | none | New Zealand Amortization Schedule \| MortgagePro Global | Generate full schedules/CSV and compare permitted recurring or lump-sum extra principal. |
| P | https://mortgageproglobal.com/tools/newzealand/budget · tools/newzealand/budget.html | 375 | 290 | 152 | 25 | none | Monthly Household Budget \| MortgagePro Global | Add actual take-home income and spending to show a monthly surplus or deficit. |
| P | https://mortgageproglobal.com/tools/newzealand/car-loan · tools/newzealand/car-loan.html | 373 | 300 | 162 | 24 | none | Car Loan Payment and Balance \| MortgagePro Global | Calculate a reducing-balance car quote including actual fees, a final balloon and elapsed payments. |
| P | https://mortgageproglobal.com/tools/newzealand/closing-costs · tools/newzealand/closing-costs.html | 347 | 282 | 144 | 21 | none | Solicitor and Purchase Closing Costs \| MortgagePro Global | Total actual tax-inclusive professional, inspection, title, lender and moving quotes. |
| P | https://mortgageproglobal.com/tools/newzealand/confirmed-support · tools/newzealand/confirmed-support.html | 358 | 296 | 158 | 27 | none | Confirmed Home-Purchase Support Budget \| MortgagePro Global | Combine separate confirmed savings/withdrawals/assistance against a deposit target. |
| P | https://mortgageproglobal.com/tools/newzealand/consolidation · tools/newzealand/consolidation.html | 520 | 371 | 233 | 24 | none | Debt Consolidation Cost Comparison \| MortgagePro Global | Compare a mortgage plus three actual debts with a consolidated mortgage, including balances and interest. |
| P | https://mortgageproglobal.com/tools/newzealand/construction · tools/newzealand/construction.html | 520 | 362 | 224 | 21 | none | New Zealand Construction Drawdowns \| MortgagePro Global | Budget interest on actual land/stage funding and later P&I on principal actually drawn. |
| P | https://mortgageproglobal.com/tools/newzealand/deposit-builder · tools/newzealand/deposit-builder.html | 372 | 298 | 160 | 25 | none | Deposit Builder Scenario \| MortgagePro Global | Project a stated cash-saving pattern toward an entered deposit and closing reserve. |
| P | https://mortgageproglobal.com/tools/newzealand/deposit · tools/newzealand/deposit.html | 374 | 300 | 162 | 25 | none | Deposit Target and Saving Time \| MortgagePro Global | Project a stated cash-saving pattern toward an entered deposit and closing reserve. |
| P | https://mortgageproglobal.com/tools/newzealand/dti · tools/newzealand/dti.html | 324 | 280 | 142 | 25 | none | New Zealand Debt-to-Income Ratio \| MortgagePro Global | Calculate debt / qualifying income without turning a bank speed limit into a personal cap. |
| P | https://mortgageproglobal.com/tools/newzealand/employer · tools/newzealand/employer.html | 313 | 270 | 132 | 26 | none | KiwiSaver Employee and Employer Contributions \| MortgagePro Global | Separate employee deductions, gross employer contributions and employer ESCT. |
| P | https://mortgageproglobal.com/tools/newzealand/first-home-loan · tools/newzealand/first-home-loan.html | 371 | 312 | 174 | 25 | none | First Home Loan Quote Budget \| MortgagePro Global | Calculate a purchase repayment or interest-only budget using actual quotes and financed costs. |
| P | https://mortgageproglobal.com/tools/newzealand/first-home · tools/newzealand/first-home.html | 357 | 295 | 157 | 27 | none | First-Home Purchase Funds \| MortgagePro Global | Combine separate confirmed savings/withdrawals/assistance against a deposit target. |
| P | https://mortgageproglobal.com/tools/newzealand/government-contribution · tools/newzealand/government-contribution.html | 306 | 285 | 147 | 25 | none | KiwiSaver Government Contribution Budget \| MortgagePro Global | Estimate the current full-year matching contribution only after eligibility is confirmed. |
| P | https://mortgageproglobal.com/tools/newzealand/healthy-home · tools/newzealand/healthy-home.html | 336 | 281 | 143 | 21 | none | Healthy Homes Work Budget \| MortgagePro Global | Budget actual quotes for assessed heating, insulation, ventilation, moisture and draught work. |
| P | https://mortgageproglobal.com/tools/newzealand/income-tax · tools/newzealand/income-tax.html | 370 | 318 | 180 | 26 | none | NZ Resident Salary Budget — 2026/27 \| MortgagePro Global | Calculate ordinary resident income tax and explicit ACC/KiwiSaver/cash deductions for this tax year. |
| P | https://mortgageproglobal.com/tools/newzealand/interest-deduction · tools/newzealand/interest-deduction.html | 301 | 268 | 130 | 26 | none | Rental Interest Deduction Scenario \| MortgagePro Global | Separate paid interest, eligible rental use and tax-effect arithmetic. |
| P | https://mortgageproglobal.com/tools/newzealand/investment-tax · tools/newzealand/investment-tax.html | 327 | 284 | 146 | 26 | none | Investment Tax and Cash-Return Budget \| MortgagePro Global | Use provider/adviser-confirmed taxable income, tax rate and usable credits without inventing FIF eligibility. |
| P | https://mortgageproglobal.com/tools/newzealand/investment · tools/newzealand/investment.html | 362 | 289 | 151 | 25 | none | Investment-Property Operating Budget \| MortgagePro Global | Distinguish operating yield from interest-only/repayment cash flow before tax. |
| P | https://mortgageproglobal.com/tools/newzealand/kiwisaver-growth · tools/newzealand/kiwisaver-growth.html | 410 | 318 | 180 | 26 | none | KiwiSaver Balance Projection \| MortgagePro Global | Project separately entered contributions at a clearly labeled net investment-return assumption. |
| P | https://mortgageproglobal.com/tools/newzealand/kiwisaver-home · tools/newzealand/kiwisaver-home.html | 296 | 273 | 135 | 25 | none | KiwiSaver Home-Purchase Funds Check \| MortgagePro Global | Show a conditional first-home withdrawal after the required retention from confirmed eligible funds. |
| P | https://mortgageproglobal.com/tools/newzealand/kiwisaver-withdrawal · tools/newzealand/kiwisaver-withdrawal.html | 296 | 273 | 135 | 25 | none | KiwiSaver First-Home Withdrawal Budget \| MortgagePro Global | Show a conditional first-home withdrawal after the required retention from confirmed eligible funds. |
| P | https://mortgageproglobal.com/tools/newzealand/lender-comparison · tools/newzealand/lender-comparison.html | 388 | 296 | 158 | 24 | none | Actual Lender Quote Comparison \| MortgagePro Global | Compare actual rates, cash fees, interest and balances over the same horizon. |
| P | https://mortgageproglobal.com/tools/newzealand/low-equity · tools/newzealand/low-equity.html | 342 | 289 | 151 | 25 | none | Low Equity Margin Quote Impact \| MortgagePro Global | Measure the payment/interest effect of an actual quoted margin and fee. |
| P | https://mortgageproglobal.com/tools/newzealand/ltv · tools/newzealand/ltv.html | 293 | 268 | 130 | 25 | none | New Zealand LVR Calculator \| MortgagePro Global | Calculate LVR, equity and principal reduction to a chosen target using assessed property value. |
| P | https://mortgageproglobal.com/tools/newzealand/lvr-band · tools/newzealand/lvr-band.html | 294 | 269 | 131 | 25 | none | LVR Target and Equity Budget \| MortgagePro Global | Calculate LVR, equity and principal reduction to a chosen target using assessed property value. |
| P | https://mortgageproglobal.com/tools/newzealand/mortgage · tools/newzealand/mortgage.html | 362 | 302 | 164 | 24 | none | New Zealand Mortgage Calculator \| MortgagePro Global | Calculate a purchase repayment or interest-only budget using actual quotes and financed costs. |
| P | https://mortgageproglobal.com/tools/newzealand/overpayment · tools/newzealand/overpayment.html | 368 | 297 | 159 | 24 | none | New Zealand Extra Repayments \| MortgagePro Global | Generate full schedules/CSV and compare permitted recurring or lump-sum extra principal. |
| P | https://mortgageproglobal.com/tools/newzealand/preapproval-budget · tools/newzealand/preapproval-budget.html | 369 | 306 | 168 | 26 | none | Pre-Approval Budget Scenario \| MortgagePro Global | Estimate a budget from actual take-home income, spending and an entered assessment-rate scenario. |
| P | https://mortgageproglobal.com/tools/newzealand/property-sale · tools/newzealand/property-sale.html | 339 | 294 | 156 | 25 | none | Property Sale Proceeds and Tax Budget \| MortgagePro Global | Budget selling proceeds using actual selling costs, debt settlement and an adviser-confirmed tax amount. |
| P | https://mortgageproglobal.com/tools/newzealand/purchase-budget · tools/newzealand/purchase-budget.html | 363 | 303 | 165 | 24 | none | New Zealand Purchase Payment Budget \| MortgagePro Global | Calculate a purchase repayment or interest-only budget using actual quotes and financed costs. |
| P | https://mortgageproglobal.com/tools/newzealand/refinance · tools/newzealand/refinance.html | 388 | 296 | 158 | 24 | none | New Zealand Refinance Comparison \| MortgagePro Global | Compare actual rates, cash fees, interest and balances over the same horizon. |
| P | https://mortgageproglobal.com/tools/newzealand/refix · tools/newzealand/refix.html | 325 | 281 | 143 | 24 | none | Split-Loan Refix Quote Budget \| MortgagePro Global | Split an existing mortgage between two actual rate quotes and compare the initial combined payment. |
| P | https://mortgageproglobal.com/tools/newzealand/rental-yield · tools/newzealand/rental-yield.html | 364 | 291 | 153 | 25 | none | Rental Yield and Cash Flow \| MortgagePro Global | Distinguish operating yield from interest-only/repayment cash flow before tax. |
| P | https://mortgageproglobal.com/tools/newzealand/repayment · tools/newzealand/repayment.html | 290 | 257 | 119 | 24 | none | Interest-Only and Repayment Transition \| MortgagePro Global | Compare interest-only principal, repayment from outset and a later P&I transition. |
| P | https://mortgageproglobal.com/tools/newzealand/revolving · tools/newzealand/revolving.html | 340 | 286 | 148 | 24 | none | Revolving Credit Cash-Flow Scenario \| MortgagePro Global | Model actual drawn debt and monthly cash surplus against a confirmed revolving-credit limit. |
| P | https://mortgageproglobal.com/tools/newzealand/ring-fencing · tools/newzealand/ring-fencing.html | 336 | 283 | 145 | 26 | none | Residential Rental Ring-Fencing Budget \| MortgagePro Global | Track an entered rental profit/loss and prior carried deductions without offsetting salary. |
| P | https://mortgageproglobal.com/tools/uk/affordability · tools/uk/affordability.html | 367 | 304 | 262 | 26 | none | UK Household Mortgage Budget \| MortgagePro Global | Use actual take-home income, living costs and debt payments to estimate a repayment budget. |
| P | https://mortgageproglobal.com/tools/uk/amortization · tools/uk/amortization.html | 365 | 294 | 252 | 25 | none | UK Amortization Schedule \| MortgagePro Global | Calculate every repayment and principal/interest totals, including permitted extra principal. |
| P | https://mortgageproglobal.com/tools/uk/buy-to-let · tools/uk/buy-to-let.html | 411 | 319 | 277 | 21 | none | Buy-to-Let Mortgage and Cash Flow \| MortgagePro Global | Compare rental income, occupancy, operating costs, financing and lender stress assumptions. |
| P | https://mortgageproglobal.com/tools/uk/help-to-buy · tools/uk/help-to-buy.html | 343 | 298 | 256 | 23 | none | Existing Help to Buy Equity Loan \| MortgagePro Global | Estimate an existing equity-loan redemption and current interest fee from the actual agreement. |
| P | https://mortgageproglobal.com/tools/uk/income-multiples · tools/uk/income-multiples.html | 331 | 287 | 245 | 25 | none | Income Multiple Scenario \| MortgagePro Global | Compare a target loan with a chosen income-multiple scenario using qualifying income figures. |
| P | https://mortgageproglobal.com/tools/uk/interest-only · tools/uk/interest-only.html | 295 | 262 | 220 | 25 | none | Interest-Only and Repayment Comparison \| MortgagePro Global | Compare an interest-only phase with repayment from the outset and the later P&I payment. |
| P | https://mortgageproglobal.com/tools/uk/lbtt · tools/uk/lbtt.html | 322 | 297 | 255 | 24 | none | Scotland LBTT and ADS \| MortgagePro Global | Calculate the appropriate jurisdiction’s standard residential purchase-tax bands under confirmed buyer assumptions. |
| P | https://mortgageproglobal.com/tools/uk/ltt · tools/uk/ltt.html | 312 | 297 | 255 | 23 | none | Wales Land Transaction Tax \| MortgagePro Global | Calculate the appropriate jurisdiction’s standard residential purchase-tax bands under confirmed buyer assumptions. |
| P | https://mortgageproglobal.com/tools/uk/ltv · tools/uk/ltv.html | 272 | 247 | 205 | 25 | none | UK Loan-to-Value Calculator \| MortgagePro Global | Calculate equity, LTV and the principal reduction needed for an entered target ratio. |
| P | https://mortgageproglobal.com/tools/uk/mortgage · tools/uk/mortgage.html | 332 | 272 | 230 | 25 | none | UK Mortgage Calculator \| MortgagePro Global | Calculate repayment or interest-only monthly payments from the property price, deposit and actual rate. |
| P | https://mortgageproglobal.com/tools/uk/overpayment · tools/uk/overpayment.html | 365 | 294 | 252 | 25 | none | Mortgage Overpayment Savings \| MortgagePro Global | Calculate every repayment and principal/interest totals, including permitted extra principal. |
| P | https://mortgageproglobal.com/tools/uk/rate-comparison · tools/uk/rate-comparison.html | 391 | 299 | 257 | 20 | none | Mortgage Quote Rate Comparison \| MortgagePro Global | Compare actual mortgage quotes, fees, remaining balances and interest over a common horizon. |
| P | https://mortgageproglobal.com/tools/uk/remortgage · tools/uk/remortgage.html | 390 | 298 | 256 | 20 | none | UK Remortgage Comparison \| MortgagePro Global | Compare actual mortgage quotes, fees, remaining balances and interest over a common horizon. |
| P | https://mortgageproglobal.com/tools/uk/rental-yield · tools/uk/rental-yield.html | 411 | 319 | 277 | 21 | none | Rental Yield and Operating Budget \| MortgagePro Global | Compare rental income, occupancy, operating costs, financing and lender stress assumptions. |
| P | https://mortgageproglobal.com/tools/uk/sdlt · tools/uk/sdlt.html | 321 | 297 | 255 | 24 | none | England / Northern Ireland SDLT \| MortgagePro Global | Calculate the appropriate jurisdiction’s standard residential purchase-tax bands under confirmed buyer assumptions. |
| P | https://mortgageproglobal.com/tools/uk/shared-ownership · tools/uk/shared-ownership.html | 388 | 304 | 262 | 23 | none | Shared Ownership Budget \| MortgagePro Global | Budget the mortgage on a purchased share, rent on the unsold share and actual charges. |
| P | https://mortgageproglobal.com/tools/usa/affordability · tools/usa/affordability.html | 355 | 259 | 188 | 26 | none | US Home Affordability Calculator \| MortgagePro Global | Build a purchase budget that respects both housing and total-debt limits. |
| P | https://mortgageproglobal.com/tools/usa/amortization · tools/usa/amortization.html | 308 | 246 | 175 | 26 | none | US Amortization Calculator \| MortgagePro Global | Inspect every monthly payment and the annual principal, interest and balance totals. |
| P | https://mortgageproglobal.com/tools/usa/arm · tools/usa/arm.html | 321 | 239 | 168 | 26 | none | US ARM Payment Scenario \| MortgagePro Global | Compare an initial adjustable-rate payment, the first reset and a lifetime-cap stress case. |
| P | https://mortgageproglobal.com/tools/usa/auto-loan · tools/usa/auto-loan.html | 307 | 199 | 157 | 25 | none | US Auto Loan Calculator \| MortgagePro Global | Budget a vehicle loan with a cash down payment, trade-in, rebates, taxes and fees. |
| P | https://mortgageproglobal.com/tools/usa/cash-on-cash · tools/usa/cash-on-cash.html | 285 | 192 | 150 | 22 | none | US Cash-on-Cash Return \| MortgagePro Global | Estimate annual rental cash return and an appreciation scenario over a holding period. |
| P | https://mortgageproglobal.com/tools/usa/closing-costs · tools/usa/closing-costs.html | 481 | 268 | 197 | 26 | none | US Closing Costs Calculator \| MortgagePro Global | Build an itemized purchase closing-cost budget and calculate cash to close. |
| P | https://mortgageproglobal.com/tools/usa/construction · tools/usa/construction.html | 299 | 217 | 146 | 26 | none | US Construction Loan Calculator \| MortgagePro Global | Budget land, building work, contingency, construction interest and the permanent loan payment. |
| P | https://mortgageproglobal.com/tools/usa/credit-score · tools/usa/credit-score.html | 267 | 218 | 147 | 26 | none | US Credit Score Quote Comparison \| MortgagePro Global | Compare two actual lender rate quotes for the same loan and term. |
| P | https://mortgageproglobal.com/tools/usa/debt-payoff · tools/usa/debt-payoff.html | 357 | 227 | 185 | 25 | none | US Debt Payoff Planner \| MortgagePro Global | Compare avalanche and snowball repayment for up to three debts. |
| P | https://mortgageproglobal.com/tools/usa/down-payment-assistance · tools/usa/down-payment-assistance.html | 262 | 195 | 153 | 25 | none | US Down Payment Assistance Budget \| MortgagePro Global | Apply a confirmed assistance amount to your down payment and closing-cost budget. |
| P | https://mortgageproglobal.com/tools/usa/down-payment · tools/usa/down-payment.html | 343 | 242 | 171 | 26 | none | US Down Payment Planner \| MortgagePro Global | Compare down payment amounts, initial PMI and time needed to save. |
| P | https://mortgageproglobal.com/tools/usa/dti · tools/usa/dti.html | 319 | 191 | 149 | 25 | none | US Debt-to-Income Calculator \| MortgagePro Global | Compare housing and total debt payments with your modeled qualifying monthly income. |
| P | https://mortgageproglobal.com/tools/usa/exchange-1031 · tools/usa/exchange-1031.html | 366 | 241 | 199 | 22 | none | US 1031 Exchange Tax Scenario \| MortgagePro Global | Illustrate realized gain, partial deferral and tax under rates you enter. |
| P | https://mortgageproglobal.com/tools/usa/extra-payments · tools/usa/extra-payments.html | 308 | 246 | 175 | 26 | none | US Extra Payments Calculator \| MortgagePro Global | Find how a fixed extra monthly payment changes the payoff period. |
| P | https://mortgageproglobal.com/tools/usa/fha · tools/usa/fha.html | 334 | 260 | 189 | 27 | none | US FHA Loan Calculator \| MortgagePro Global | Estimate an FHA purchase payment with upfront and annual mortgage insurance. |
| P | https://mortgageproglobal.com/tools/usa/fix-flip · tools/usa/fix-flip.html | 361 | 242 | 171 | 23 | none | US Fix & Flip Calculator \| MortgagePro Global | Budget renovation, carrying and selling costs before estimating a resale profit. |
| P | https://mortgageproglobal.com/tools/usa/flood · tools/usa/flood.html | 239 | 192 | 150 | 25 | none | US Flood Insurance Budget \| MortgagePro Global | Convert your current insurance quote into a monthly budget and show the policy deductible. |
| P | https://mortgageproglobal.com/tools/usa/heloc · tools/usa/heloc.html | 300 | 232 | 161 | 26 | none | US HELOC Calculator \| MortgagePro Global | Compare interest-only draw payments and amortizing repayment for an assumed fixed HELOC balance. |
| P | https://mortgageproglobal.com/tools/usa/ho1 · tools/usa/ho1.html | 225 | 191 | 149 | 25 | none | US HO-1 Insurance Budget \| MortgagePro Global | Convert your current insurance quote into a monthly budget and show the policy deductible. |
| P | https://mortgageproglobal.com/tools/usa/ho3 · tools/usa/ho3.html | 225 | 191 | 149 | 25 | none | US HO-3 Insurance Budget \| MortgagePro Global | Convert your current insurance quote into a monthly budget and show the policy deductible. |
| P | https://mortgageproglobal.com/tools/usa/ho5 · tools/usa/ho5.html | 225 | 191 | 149 | 25 | none | US HO-5 Insurance Budget \| MortgagePro Global | Convert your current insurance quote into a monthly budget and show the policy deductible. |
| P | https://mortgageproglobal.com/tools/usa/ho6 · tools/usa/ho6.html | 241 | 194 | 152 | 25 | none | US HO-6 Condo Insurance Budget \| MortgagePro Global | Convert your current insurance quote into a monthly budget and show the policy deductible. |
| P | https://mortgageproglobal.com/tools/usa/hoa · tools/usa/hoa.html | 334 | 217 | 146 | 26 | none | US HOA Fee Impact Calculator \| MortgagePro Global | See how monthly dues change a housing budget, DTI and modeled purchasing power. |
| P | https://mortgageproglobal.com/tools/usa/home-equity · tools/usa/home-equity.html | 289 | 228 | 157 | 26 | none | US Home Equity Loan Calculator \| MortgagePro Global | Estimate an equity-loan payment and compare borrowing with a combined-LTV budget. |
| P | https://mortgageproglobal.com/tools/usa/homeowner-insurance · tools/usa/homeowner-insurance.html | 225 | 191 | 149 | 25 | none | US Homeowner Insurance Budget \| MortgagePro Global | Convert your current insurance quote into a monthly budget and show the policy deductible. |
| P | https://mortgageproglobal.com/tools/usa/hurricane · tools/usa/hurricane.html | 228 | 194 | 152 | 25 | none | US Hurricane / Wind Insurance Budget \| MortgagePro Global | Convert your current insurance quote into a monthly budget and show the policy deductible. |
| P | https://mortgageproglobal.com/tools/usa/jumbo · tools/usa/jumbo.html | 342 | 239 | 168 | 26 | none | US Jumbo Mortgage Calculator \| MortgagePro Global | Budget a larger home loan and compare the balance with your entered local conforming limit. |
| P | https://mortgageproglobal.com/tools/usa/mortgage · tools/usa/mortgage.html | 253 | 210 | 139 | 26 | none | US Mortgage Calculator \| MortgagePro Global | Estimate principal and interest for a fixed-rate US home loan. |
| P | https://mortgageproglobal.com/tools/usa/moving · tools/usa/moving.html | 301 | 195 | 153 | 25 | none | US Moving Cost Budget \| MortgagePro Global | Add current mover quotes and your actual packing, travel and storage costs. |
| P | https://mortgageproglobal.com/tools/usa/piggyback · tools/usa/piggyback.html | 297 | 235 | 164 | 26 | none | US Piggyback Loan Calculator \| MortgagePro Global | Compare an 80% first mortgage plus a second loan with a single mortgage and PMI. |
| P | https://mortgageproglobal.com/tools/usa/piti · tools/usa/piti.html | 365 | 248 | 177 | 26 | none | US PITI Calculator \| MortgagePro Global | See principal, interest, tax and insurance, with PMI and HOA shown separately. |
| P | https://mortgageproglobal.com/tools/usa/pmi · tools/usa/pmi.html | 292 | 236 | 165 | 26 | none | US PMI Calculator \| MortgagePro Global | Estimate private mortgage insurance and the scheduled balance milestone for a cancellation request. |
| P | https://mortgageproglobal.com/tools/usa/prepayment · tools/usa/prepayment.html | 306 | 244 | 173 | 26 | none | US Prepayment Savings Calculator \| MortgagePro Global | Compare scheduled interest with a recurring extra principal payment. |
| P | https://mortgageproglobal.com/tools/usa/property-tax · tools/usa/property-tax.html | 272 | 207 | 165 | 25 | none | US Property Tax Calculator \| MortgagePro Global | Estimate a tax budget using assessed value, an exemption and the applicable local rate. |
| P | https://mortgageproglobal.com/tools/usa/refinance · tools/usa/refinance.html | 297 | 222 | 151 | 26 | none | US Refinance Calculator \| MortgagePro Global | Compare remaining mortgage payments, new payments, closing costs and lifetime interest. |
| P | https://mortgageproglobal.com/tools/usa/rent-vs-buy · tools/usa/rent-vs-buy.html | 484 | 283 | 212 | 26 | none | US Rent vs Buy Calculator \| MortgagePro Global | Compare modeled owner equity and renter investments over an entered holding period. |
| P | https://mortgageproglobal.com/tools/usa/rental-yield · tools/usa/rental-yield.html | 362 | 235 | 164 | 23 | none | US Rental Yield & Cash Flow \| MortgagePro Global | Separate rental operating return from debt service and cash-on-cash return. |
| P | https://mortgageproglobal.com/tools/usa/student-dti · tools/usa/student-dti.html | 350 | 233 | 162 | 26 | none | US Student Loan DTI Impact \| MortgagePro Global | Measure how an entered student-loan payment changes DTI and a mortgage purchase budget. |
| P | https://mortgageproglobal.com/tools/usa/tax-deduction · tools/usa/tax-deduction.html | 417 | 272 | 230 | 26 | none | US Mortgage Tax Deduction Planner \| MortgagePro Global | Compare qualified itemized expenses with the standard deduction you enter. |
| P | https://mortgageproglobal.com/tools/usa/term-comparison · tools/usa/term-comparison.html | 232 | 196 | 125 | 26 | none | US Mortgage Term Comparison \| MortgagePro Global | Compare 10-, 15-, 20- and 30-year payments on the same loan and interest rate. |
| P | https://mortgageproglobal.com/tools/usa/usda · tools/usa/usda.html | 312 | 236 | 165 | 27 | none | US USDA Guaranteed Loan Calculator \| MortgagePro Global | Estimate a zero-down USDA guaranteed purchase loan with guarantee fees. |
| P | https://mortgageproglobal.com/tools/usa/va · tools/usa/va.html | 321 | 241 | 170 | 26 | none | US VA Loan Calculator \| MortgagePro Global | Estimate a VA purchase payment with first-use, subsequent-use or exempt funding-fee treatment. |
| P | https://mortgageproglobal.com/tools/usa/wildfire · tools/usa/wildfire.html | 225 | 191 | 149 | 25 | none | US Wildfire Insurance Budget \| MortgagePro Global | Convert your current insurance quote into a monthly budget and show the policy deductible. |
| P | https://mortgageproglobal.com/uk-mortgage-calculator · uk-mortgage-calculator.html | 1408 | 1260 | 1246 | 53 | loader | UK Mortgage Calculator 2026 \| Stamp Duty & SDLT | Estimate repayment and supported England/Northern Ireland SDLT scenarios while keeping lender eligibility and purchase-tax relief separate. |
| P | https://mortgageproglobal.com/usa-mortgage-calculator · usa-mortgage-calculator.html | 1857 | 1254 | 1254 | 97 | loader | USA Mortgage Calculator 2026 \| PITI, PMI, FHA & VA | Build a US principal-and-interest estimate and separate tax, homeowners insurance and assumed PMI from actual loan approval and lifetime costs. |

## Internal link candidates: full raw list

296 candidates match the requested #, #calculator or generic FAQ patterns. This includes prototypes, ordinary menu/skip/FAQ links, and legitimate jumps to an actual calculator. Only the 12 specific promise/destination mismatches listed in the main report are confirmed review findings. Do not remove legitimate anchors by regex.

| Page | Label | Href | Card? | Disposition |
| --- | --- | --- | --- | --- |
| Designs/screen_australia_website.html | Calculator | # | no | Non-public template |
| Designs/screen_australia_website.html | Rates | # | no | Non-public template |
| Designs/screen_australia_website.html | Advisor | # | no | Non-public template |
| Designs/screen_australia_website.html | Mortgage Calculator | # | no | Non-public template |
| Designs/screen_australia_website.html | LMI Calculator | # | no | Non-public template |
| Designs/screen_australia_website.html | Offset Account | # | no | Non-public template |
| Designs/screen_australia_website.html | Stamp Duty | # | no | Non-public template |
| Designs/screen_australia_website.html | NSW | # | no | Non-public template |
| Designs/screen_australia_website.html | VIC | # | no | Non-public template |
| Designs/screen_australia_website.html | QLD | # | no | Non-public template |
| Designs/screen_australia_website.html | WA | # | no | Non-public template |
| Designs/screen_australia_website.html | About | # | no | Non-public template |
| Designs/screen_australia_website.html | AI Advisor | # | no | Non-public template |
| Designs/screen_australia_website.html | Support | # | no | Non-public template |
| Designs/screen_australia_website.html | Privacy | # | no | Non-public template |
| Designs/screen_canada_website.html | 🍁 CanadaPro CAD · BoC Rate · CMHC | # | no | Non-public template |
| Designs/screen_canada_website.html | Calculator | #calculator | no | Non-public template |
| Designs/screen_canada_website.html | 🍁 Get Rate | # | no | Non-public template |
| Designs/screen_canada_website.html | Advanced Calculator → | # | no | Non-public template |
| Designs/screen_canada_website.html | Rate History → | # | no | Non-public template |
| Designs/screen_canada_website.html | BoC Live | # | no | Non-public template |
| Designs/screen_canada_website.html | Learn More → | # | no | Non-public template |
| Designs/screen_canada_website.html | Test Now | # | no | Non-public template |
| Designs/screen_canada_website.html | All Tools → | # | no | Non-public template |
| Designs/screen_canada_website.html | All Provinces → | # | no | Non-public template |
| Designs/screen_canada_website.html | 🏙️ Ontario | # | no | Non-public template |
| Designs/screen_canada_website.html | 🌄 British Columbia | # | no | Non-public template |
| Designs/screen_canada_website.html | 🌾 Alberta | # | no | Non-public template |
| Designs/screen_canada_website.html | ⚜️ Quebec | # | no | Non-public template |
| Designs/screen_canada_website.html | 🌊 Manitoba | # | no | Non-public template |
| Designs/screen_canada_website.html | 🌻 Saskatchewan | # | no | Non-public template |
| Designs/screen_canada_website.html | 🦞 Nova Scotia | # | no | Non-public template |
| Designs/screen_canada_website.html | 🍁 All Provinces | # | no | Non-public template |
| Designs/screen_canada_website.html | All → | # | no | Non-public template |
| Designs/screen_canada_website.html | 🏛️Land Transfer TaxBy Province: ON, BC, AB, QC, MB…› | # | yes | Non-public template |
| Designs/screen_canada_website.html | 🏡First-Home Buyer IncentiveFHBI · RRSP Home Buyers' Plan› | # | yes | Non-public template |
| Designs/screen_canada_website.html | 📉BoC Rate HistoryLive Bank of Canada rate tracker› | # | yes | Non-public template |
| Designs/screen_canada_website.html | 🛡️CMHC Eligibility GuideRules, caps & premium tables› | # | yes | Non-public template |
| Designs/screen_canada_website.html | 📋OSFI B-20 GuidelineStress test rules & lender requirements› | # | yes | Non-public template |
| Designs/screen_canada_website.html | 🏠First Home Savings Account (FHSA)Tax-free savings for first home purchase› | # | yes | Non-public template |
| Designs/screen_canada_website.html | 📊Canada House Price IndexCREA · CMHC national & city data› | # | yes | Non-public template |
| Designs/screen_canada_website.html | 🤖Canada AI AdvisorCMHC rules · stress test guidance› | # | yes | Non-public template |
| Designs/screen_canada_website.html | Calculator | #calculator | no | Non-public template |
| Designs/screen_canada_website.html | Privacy Policy | # | no | Non-public template |
| Designs/screen_canada_website.html | Terms of Service | # | no | Non-public template |
| Designs/screen_europe_website.html | Calculator | # | no | Non-public template |
| Designs/screen_europe_website.html | Rates | # | no | Non-public template |
| Designs/screen_europe_website.html | Advisor | # | no | Non-public template |
| Designs/screen_europe_website.html | Mortgage Calculator | # | no | Non-public template |
| Designs/screen_europe_website.html | Affordability | # | no | Non-public template |
| Designs/screen_europe_website.html | Amortization | # | no | Non-public template |
| Designs/screen_europe_website.html | Euribor Tracker | # | no | Non-public template |
| Designs/screen_europe_website.html | Germany | # | no | Non-public template |
| Designs/screen_europe_website.html | France | # | no | Non-public template |
| Designs/screen_europe_website.html | Spain | # | no | Non-public template |
| Designs/screen_europe_website.html | Italy | # | no | Non-public template |
| Designs/screen_europe_website.html | About | # | no | Non-public template |
| Designs/screen_europe_website.html | AI Advisor | # | no | Non-public template |
| Designs/screen_europe_website.html | Support | # | no | Non-public template |
| Designs/screen_europe_website.html | Privacy | # | no | Non-public template |
| Designs/screen_india_website.html | EMI Calculator | # | no | Non-public template |
| Designs/screen_india_website.html | EMI Calculator | # | no | Non-public template |
| Designs/screen_india_website.html | Stamp Duty Calc | # | no | Non-public template |
| Designs/screen_india_website.html | PMAY Subsidy | # | no | Non-public template |
| Designs/screen_india_website.html | CIBIL Score Impact | # | no | Non-public template |
| Designs/screen_india_website.html | Mumbai | # | no | Non-public template |
| Designs/screen_india_website.html | Delhi NCR | # | no | Non-public template |
| Designs/screen_india_website.html | Bengaluru | # | no | Non-public template |
| Designs/screen_india_website.html | Chennai | # | no | Non-public template |
| Designs/screen_india_website.html | About | # | no | Non-public template |
| Designs/screen_india_website.html | AI Advisor | # | no | Non-public template |
| Designs/screen_india_website.html | Support | # | no | Non-public template |
| Designs/screen_india_website.html | Privacy | # | no | Non-public template |
| Designs/screen_newzealand_website.html | Calculator | # | no | Non-public template |
| Designs/screen_newzealand_website.html | Mortgage Calculator | # | no | Non-public template |
| Designs/screen_newzealand_website.html | LVR Calculator | # | no | Non-public template |
| Designs/screen_newzealand_website.html | KiwiSaver Calc | # | no | Non-public template |
| Designs/screen_newzealand_website.html | Rental Yield Calc | # | no | Non-public template |
| Designs/screen_newzealand_website.html | Auckland | # | no | Non-public template |
| Designs/screen_newzealand_website.html | Wellington | # | no | Non-public template |
| Designs/screen_newzealand_website.html | Christchurch | # | no | Non-public template |
| Designs/screen_newzealand_website.html | Hamilton | # | no | Non-public template |
| Designs/screen_newzealand_website.html | About | # | no | Non-public template |
| Designs/screen_newzealand_website.html | AI Advisor | # | no | Non-public template |
| Designs/screen_newzealand_website.html | Support | # | no | Non-public template |
| Designs/screen_newzealand_website.html | Privacy | # | no | Non-public template |
| Designs/screen_uk_website.html | 👑 UKPro GBP · BoE Rate · SDLT | # | no | Non-public template |
| Designs/screen_uk_website.html | Calculator | #calculator | no | Non-public template |
| Designs/screen_uk_website.html | 👑 Get Rate | # | no | Non-public template |
| Designs/screen_uk_website.html | Advanced Calculator → | # | no | Non-public template |
| Designs/screen_uk_website.html | Rate History → | # | no | Non-public template |
| Designs/screen_uk_website.html | BoE Live | # | no | Non-public template |
| Designs/screen_uk_website.html | Full SDLT Guide → | # | no | Non-public template |
| Designs/screen_uk_website.html | Calculate SDLT | # | no | Non-public template |
| Designs/screen_uk_website.html | All Tools → | # | no | Non-public template |
| Designs/screen_uk_website.html | All Regions → | # | no | Non-public template |
| Designs/screen_uk_website.html | 🏴󠁧󠁢󠁥󠁮󠁧󠁿 England | # | no | Non-public template |
| Designs/screen_uk_website.html | 🏴󠁧󠁢󠁳󠁣󠁴󠁿 Scotland | # | no | Non-public template |
| Designs/screen_uk_website.html | 🏴󠁧󠁢󠁷󠁬󠁳󠁿 Wales | # | no | Non-public template |
| Designs/screen_uk_website.html | 🇮🇪 Northern Ireland | # | no | Non-public template |
| Designs/screen_uk_website.html | 🏙️ London | # | no | Non-public template |
| Designs/screen_uk_website.html | 🌆 Manchester | # | no | Non-public template |
| Designs/screen_uk_website.html | 🏛️ Edinburgh | # | no | Non-public template |
| Designs/screen_uk_website.html | All → | # | no | Non-public template |
| Designs/screen_uk_website.html | All → | # | no | Non-public template |
| Designs/screen_uk_website.html | 📉BoE Base Rate TrackerLive Bank of England rate history› | # | yes | Non-public template |
| Designs/screen_uk_website.html | 🏡UK House Price IndexHM Land Registry · regional data› | # | yes | Non-public template |
| Designs/screen_uk_website.html | 🤝Shared Ownership CalcPart-buy part-rent scheme› | # | yes | Non-public template |
| Designs/screen_uk_website.html | 🏛️HMRC SDLT GuidanceOfficial stamp duty rules & reliefs› | # | yes | Non-public template |
| Designs/screen_uk_website.html | 🔒FCA Mortgage RegisterCheck lender & broker authorisation› | # | yes | Non-public template |
| Designs/screen_uk_website.html | 📊Rightmove / Zoopla DataLive property listings & price trends› | # | yes | Non-public template |
| Designs/screen_uk_website.html | 🏠First Homes Scheme30–50% discount for key workers & FTBs› | # | yes | Non-public template |
| Designs/screen_uk_website.html | 🤖UK AI Mortgage AdvisorFCA-aware guidance · SDLT help› | # | yes | Non-public template |
| Designs/screen_uk_website.html | Calculator | #calculator | no | Non-public template |
| Designs/screen_uk_website.html | Privacy Policy | # | no | Non-public template |
| Designs/screen_uk_website.html | Terms of Service | # | no | Non-public template |
| Designs/screen_usa_website.html | 🇺🇸 USA Financial Tools USD · FRED · Fed Rate · All 50 States | # | no | Non-public template |
| Designs/screen_usa_website.html | Advanced → | # | no | Non-public template |
| Designs/screen_usa_website.html | FOMC Calendar → | # | no | Non-public template |
| Designs/screen_usa_website.html | FRED Live | # | no | Non-public template |
| Designs/screen_usa_website.html | Full Dashboard → | # | no | Non-public template |
| Designs/screen_usa_website.html | Rate Trends → | # | no | Non-public template |
| Designs/screen_usa_website.html | All → | # | no | Non-public template |
| Designs/screen_usa_website.html | Compare → | # | no | Non-public template |
| Designs/screen_usa_website.html | All → | # | no | Non-public template |
| Designs/screen_usa_website.html | All 50 States → | # | no | Non-public template |
| Designs/screen_usa_website.html | All States | # | no | Non-public template |
| Designs/screen_usa_website.html | All → | # | no | Non-public template |
| Designs/screen_usa_website.html | All → | # | no | Non-public template |
| Designs/screen_usa_website.html | All → | # | no | Non-public template |
| Designs/screen_usa_website.html | 🏠First-Time Homebuyer ProgramsHUD · State DPA · $25K grant programs› | # | yes | Non-public template |
| Designs/screen_usa_website.html | 🪖VA Benefits & Home LoansEntitlement · COE · funding fee waiver› | # | yes | Non-public template |
| Designs/screen_usa_website.html | 📈401(k) / IRA Home Withdrawal10% penalty exemptions · first-time buyer› | # | yes | Non-public template |
| Designs/screen_usa_website.html | 🌾USDA Rural Development502 Direct · 502 Guaranteed loan› | # | yes | Non-public template |
| Designs/screen_usa_website.html | 🏛️FHA 203(k) Rehab LoanPurchase + renovation in one loan› | # | yes | Non-public template |
| Designs/screen_usa_website.html | 🤖USA AI Mortgage AdvisorFRED rates · FHA/VA/USDA guidance› | # | yes | Non-public template |
| Designs/screen_usa_website.html | Dashboard → | # | no | Non-public template |
| Designs/screen_usa_website.html | 📉FRED Rate HistoryFederal Reserve Economic Data live› | # | yes | Non-public template |
| Designs/screen_usa_website.html | 🏡US Home Price Index (HPI)S&P/Case-Shiller · FHFA index› | # | yes | Non-public template |
| Designs/screen_usa_website.html | 📊Median Home Prices by StateNAR · Zillow · Redfin data› | # | yes | Non-public template |
| Designs/screen_usa_website.html | 🏦Top US Mortgage LendersRocket · UWM · Chase · Wells Fargo› | # | yes | Non-public template |
| Designs/screen_usa_website.html | 📋Mortgage Prequalification GuidePre-qual vs Pre-approval steps› | # | yes | Non-public template |
| Designs/screen_usa_website.html | Home | # | no | Non-public template |
| about.html | FAQs | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| about.html | Mortgage FAQ | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| app-privacy-policy.html | FAQs | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| app-privacy-policy.html | Mortgage FAQ | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| australia-mortgage-calculator.html | Calculator | #calculator | no | Contextual navigation/anchor; not automatically deceptive |
| australia-mortgage-calculator.html | 🦘 Calculate My Mortgage | #calculator | no | Contextual navigation/anchor; not automatically deceptive |
| australia-mortgage-calculator.html | Mortgage Calculator | #calculator | no | Contextual navigation/anchor; not automatically deceptive |
| blog/australia-affordability-calculator.html | FAQs | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/australia-affordability-calculator.html | Mortgage FAQ | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/australia-amortization-calculator.html | FAQs | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/australia-amortization-calculator.html | Mortgage FAQ | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/australia-dti-ratio-calculator.html | FAQs | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/australia-dti-ratio-calculator.html | Mortgage FAQ | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/australia-lmi-calculator.html | FAQs | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/australia-lmi-calculator.html | Mortgage FAQ | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/australia-mortgage-calculator.html | FAQs | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/australia-mortgage-calculator.html | Mortgage FAQ | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/australia-offset-account-calculator.html | FAQs | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/australia-offset-account-calculator.html | Mortgage FAQ | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/australia-refinance-tool.html | FAQs | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/australia-refinance-tool.html | Mortgage FAQ | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/australia-stamp-duty-calculator.html | FAQs | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/australia-stamp-duty-calculator.html | Mortgage FAQ | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/canada-affordability-calculator.html | FAQs | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/canada-affordability-calculator.html | Mortgage FAQ | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/canada-amortization-calculator.html | FAQs | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/canada-amortization-calculator.html | Mortgage FAQ | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/canada-cmhc-insurance-calculator.html | FAQs | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/canada-cmhc-insurance-calculator.html | Mortgage FAQ | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/canada-gds-tds-calculator.html | FAQs | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/canada-gds-tds-calculator.html | Mortgage FAQ | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/canada-mortgage-calculator.html | FAQs | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/canada-mortgage-calculator.html | Mortgage FAQ | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/canada-prepayment-calculator.html | FAQs | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/canada-prepayment-calculator.html | Mortgage FAQ | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/canada-renewal-planner.html | FAQs | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/canada-renewal-planner.html | Mortgage FAQ | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/canada-stress-test-calculator.html | FAQs | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/canada-stress-test-calculator.html | Mortgage FAQ | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/cmhc-insurance-canada-guide.html | FAQs | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/cmhc-insurance-canada-guide.html | Mortgage FAQ | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/how-to-use-mortgage-calculator.html | FAQs | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/how-to-use-mortgage-calculator.html | Mortgage FAQ | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/index.html | FAQs | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/index.html | Mortgage FAQ | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/nz-car-loan-calculator.html | FAQs | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/nz-car-loan-calculator.html | Mortgage FAQ | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/nz-dti-calculator.html | FAQs | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/nz-dti-calculator.html | Mortgage FAQ | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/nz-first-home-buyer.html | FAQs | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/nz-first-home-buyer.html | Mortgage FAQ | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/nz-kiwisaver-calculator.html | FAQs | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/nz-kiwisaver-calculator.html | Mortgage FAQ | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/nz-lvr-calculator.html | FAQs | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/nz-lvr-calculator.html | Mortgage FAQ | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/nz-mortgage-calculator.html | FAQs | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/nz-mortgage-calculator.html | Mortgage FAQ | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/nz-rental-yield-calculator.html | FAQs | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/nz-rental-yield-calculator.html | Mortgage FAQ | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/nz-repayment-calculator.html | FAQs | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/nz-repayment-calculator.html | Mortgage FAQ | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/uk-affordability-calculator.html | FAQs | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/uk-affordability-calculator.html | Mortgage FAQ | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/uk-amortization-calculator.html | FAQs | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/uk-amortization-calculator.html | Mortgage FAQ | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/uk-buy-to-let-calculator.html | FAQs | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/uk-buy-to-let-calculator.html | Mortgage FAQ | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/uk-help-to-buy.html | FAQs | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/uk-help-to-buy.html | Mortgage FAQ | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/uk-ltv-calculator.html | FAQs | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/uk-ltv-calculator.html | Mortgage FAQ | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/uk-mortgage-calculator.html | FAQs | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/uk-mortgage-calculator.html | Mortgage FAQ | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/uk-remortgage-tool.html | FAQs | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/uk-remortgage-tool.html | Mortgage FAQ | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/uk-stamp-duty-calculator.html | FAQs | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/uk-stamp-duty-calculator.html | Mortgage FAQ | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/uk-stamp-duty-guide.html | FAQs | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/uk-stamp-duty-guide.html | Mortgage FAQ | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/usa-affordability-calculator.html | FAQs | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/usa-affordability-calculator.html | Mortgage FAQ | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/usa-amortization-calculator.html | FAQs | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/usa-amortization-calculator.html | Mortgage FAQ | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/usa-down-payment-calculator.html | FAQs | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/usa-down-payment-calculator.html | Mortgage FAQ | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/usa-dti-calculator.html | FAQs | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/usa-dti-calculator.html | Mortgage FAQ | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/usa-fha-loan-calculator.html | FAQs | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/usa-fha-loan-calculator.html | Mortgage FAQ | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/usa-mortgage-calculator.html | FAQs | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/usa-mortgage-calculator.html | Mortgage FAQ | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/usa-piti-calculator.html | FAQs | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/usa-piti-calculator.html | Mortgage FAQ | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/usa-va-loan-calculator.html | FAQs | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| blog/usa-va-loan-calculator.html | Mortgage FAQ | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| canada-mortgage-calculator.html | Calculator | #calculator | no | Contextual navigation/anchor; not automatically deceptive |
| canada-mortgage-calculator.html | Compare scenario | #calculator | no | Contextual navigation/anchor; not automatically deceptive |
| components/footer.html | Mortgage FAQ | /mortgage-faq | no | Non-public template |
| components/header.html | FAQs | /mortgage-faq | no | Non-public template |
| contact.html | FAQs | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| contact.html | Mortgage FAQ | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| corrections-policy.html | FAQs | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| corrections-policy.html | Mortgage FAQ | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| data-deletion-policy.html | FAQs | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| data-deletion-policy.html | Mortgage FAQ | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| data-sources.html | FAQs | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| data-sources.html | Mortgage FAQ | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| disclaimer.html | FAQs | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| disclaimer.html | Mortgage FAQ | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| editorial-policy.html | FAQs | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| editorial-policy.html | Mortgage FAQ | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| europe-mortgage-calculator.html | Calculator | #calculator | no | Contextual navigation/anchor; not automatically deceptive |
| europe-mortgage-calculator.html | ⭐ Calculate European Mortgage | #calculator | no | Contextual navigation/anchor; not automatically deceptive |
| europe-mortgage-calculator.html | Mortgage Calculator | #calculator | no | Contextual navigation/anchor; not automatically deceptive |
| europe-mortgage-calculator.html | Affordability | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| europe-mortgage-calculator.html | Amortization | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| europe-mortgage-calculator.html | Euribor Tracker | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| index.html | FAQs | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| index.html | View Full Mortgage FAQ & Glossary → | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| index.html | ❓ Mortgage Knowledgebase 50+ in-depth answers covering mortgage types, compounding, debt service ratios, and down payments. Explore FAQ → | /mortgage-faq | yes | Contextual navigation/anchor; not automatically deceptive |
| index.html | More mortgage planning questions → | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| index.html | Mortgage FAQ | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| india-home-loan-emi-calculator.html | EMI Calculator | #calculator | no | Contextual navigation/anchor; not automatically deceptive |
| india-home-loan-emi-calculator.html | ☸ Calculate Home Loan EMI | #calculator | no | Contextual navigation/anchor; not automatically deceptive |
| india-home-loan-emi-calculator.html | 🏠 PMAY – Housing for All Current urban ISS rules · separate eligibility checks › | /mortgage-faq | yes | Specific promise goes to generic FAQ |
| india-home-loan-emi-calculator.html | 📋 Section 80C / 24(b) Guide Income tax deductions on home loan › | /mortgage-faq | yes | Specific promise goes to generic FAQ |
| india-home-loan-emi-calculator.html | EMI Calculator | #calculator | no | Contextual navigation/anchor; not automatically deceptive |
| india-home-loan-emi-calculator.html | Stamp Duty Guide | /mortgage-faq#india-faq | no | Contextual navigation/anchor; not automatically deceptive |
| india-home-loan-emi-calculator.html | PMAY Subsidy Guide | /mortgage-faq#india-faq | no | Contextual navigation/anchor; not automatically deceptive |
| india-home-loan-emi-calculator.html | CIBIL Score Guide | /mortgage-faq#credit-score | no | Contextual navigation/anchor; not automatically deceptive |
| mortgage-faq.html | Skip to main content | #main-content | no | Contextual navigation/anchor; not automatically deceptive |
| mortgage-faq.html | FAQs | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| mortgage-faq.html | Mortgage FAQ | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| new-zealand-mortgage-calculator.html | Calculator | #calculator | no | Contextual navigation/anchor; not automatically deceptive |
| new-zealand-mortgage-calculator.html | 🌿 Calculate My repayments | #calculator | no | Contextual navigation/anchor; not automatically deceptive |
| new-zealand-mortgage-calculator.html | Mortgage Calculator | #calculator | no | Contextual navigation/anchor; not automatically deceptive |
| privacy-policy.html | FAQs | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| privacy-policy.html | Mortgage FAQ | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| terms-and-conditions.html | FAQs | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| terms-and-conditions.html | Mortgage FAQ | /mortgage-faq | no | Contextual navigation/anchor; not automatically deceptive |
| uk-mortgage-calculator.html | Calculator | #calculator | no | Contextual navigation/anchor; not automatically deceptive |
| uk-mortgage-calculator.html | Calculate SDLT | #calculator | no | Contextual navigation/anchor; not automatically deceptive |
| uk-mortgage-calculator.html | Calculator | #calculator | no | Contextual navigation/anchor; not automatically deceptive |
| usa-mortgage-calculator.html | 🪖 VA Benefits & Home Loans Entitlement · COE · funding fee waiver › | /mortgage-faq | yes | Specific promise goes to generic FAQ |
| usa-mortgage-calculator.html | 📈 401(k) / IRA Home Withdrawal 10% penalty exemptions · first-time buyer › | /mortgage-faq | yes | Specific promise goes to generic FAQ |
| usa-mortgage-calculator.html | 🌾 USDA Rural Development 502 Direct · 502 Guaranteed loan › | /mortgage-faq | yes | Specific promise goes to generic FAQ |
| usa-mortgage-calculator.html | 🏛️ FHA 203(k) Rehab Loan Purchase + renovation in one loan › | /mortgage-faq | yes | Specific promise goes to generic FAQ |
| usa-mortgage-calculator.html | 🤖 USA AI Mortgage Advisor FRED rates · FHA/VA/USDA guidance › | /mortgage-faq | yes | Specific promise goes to generic FAQ |
| usa-mortgage-calculator.html | 📉 FRED Rate History Federal Reserve Economic Data live › | /mortgage-faq | yes | Specific promise goes to generic FAQ |
| usa-mortgage-calculator.html | 🏡 US Home Price Index (HPI) S&P/Case-Shiller · FHFA index › | /mortgage-faq | yes | Specific promise goes to generic FAQ |
| usa-mortgage-calculator.html | 📊 Median Home Prices by State NAR · Zillow · Redfin data › | /mortgage-faq | yes | Specific promise goes to generic FAQ |
| usa-mortgage-calculator.html | 🏦 Top US Mortgage Lenders Rocket · UWM · Chase · Wells Fargo › | /mortgage-faq | yes | Specific promise goes to generic FAQ |
| usa-mortgage-calculator.html | 📋 Mortgage Prequalification Guide Pre-qual vs Pre-approval steps › | /mortgage-faq | yes | Specific promise goes to generic FAQ |

## Exact duplicate meta descriptions

| Description | Pages |
| --- | --- |
| Calculate full principal/interest schedules and the effect of permitted extra repayments. | tools/australia/amortization.html; tools/australia/overpayment.html |
| Calculate published general-duty scenarios for all eight states/territories and add confirmed adjustments. | tools/australia/duty-by-state.html; tools/australia/stamp-duty.html |
| Compare actual rates, fees, interest and remaining balances over a shared horizon. | tools/australia/rate-comparison.html; tools/australia/refinance.html |
| Inspect full principal/interest schedules and the effect of permitted extra payments. | tools/europe/amortization.html; tools/europe/overpayment.html |
| Inspect the full repayment schedule and the effect of permitted additional principal. | tools/india/amortization.html; tools/india/overpayment.html |
| Compare two actual quotes, upfront cash costs, interest and balances over the same horizon. | tools/india/bank-comparison.html; tools/india/bank-hfc.html; tools/india/credit-quote.html; tools/india/refinance.html |
| Budget your actual state/UT transaction using confirmed assessment, effective rates and quoted extras. | tools/india/duty-by-state.html; tools/india/stamp-duty.html |
| Calculate reducing-balance instalments with financed charges and separate cash fees. | tools/india/emi.html; tools/india/personal-loan.html |
| Add or extract the confirmed effective GST and keep other closing costs separate. | tools/india/gst-purchase.html; tools/india/gst.html |
| Compare separately prepared taxable incomes with current ordinary resident slabs, rebate and cess. | tools/india/income-tax.html; tools/india/tax-comparison.html |
| Model an actual subsidy credit already posted to principal, at an unchanged mortgage quote. | tools/india/pmay-housing.html; tools/india/pmay-subsidy.html |
| Measure tax before/after an adviser-confirmed old-regime deduction, including rebate effects. | tools/india/section-24b.html; tools/india/section-80c.html |
| Estimate a budget from actual take-home income, spending and an entered assessment-rate scenario. | tools/newzealand/affordability.html; tools/newzealand/preapproval-budget.html |
| Generate full schedules/CSV and compare permitted recurring or lump-sum extra principal. | tools/newzealand/amortization.html; tools/newzealand/overpayment.html |
| Combine separate confirmed savings/withdrawals/assistance against a deposit target. | tools/newzealand/confirmed-support.html; tools/newzealand/first-home.html |
| Project a stated cash-saving pattern toward an entered deposit and closing reserve. | tools/newzealand/deposit-builder.html; tools/newzealand/deposit.html |
| Calculate a purchase repayment or interest-only budget using actual quotes and financed costs. | tools/newzealand/first-home-loan.html; tools/newzealand/mortgage.html; tools/newzealand/purchase-budget.html |
| Distinguish operating yield from interest-only/repayment cash flow before tax. | tools/newzealand/investment.html; tools/newzealand/rental-yield.html |
| Show a conditional first-home withdrawal after the required retention from confirmed eligible funds. | tools/newzealand/kiwisaver-home.html; tools/newzealand/kiwisaver-withdrawal.html |
| Compare actual rates, cash fees, interest and balances over the same horizon. | tools/newzealand/lender-comparison.html; tools/newzealand/refinance.html |
| Calculate LVR, equity and principal reduction to a chosen target using assessed property value. | tools/newzealand/ltv.html; tools/newzealand/lvr-band.html |
| Calculate every repayment and principal/interest totals, including permitted extra principal. | tools/uk/amortization.html; tools/uk/overpayment.html |
| Compare rental income, occupancy, operating costs, financing and lender stress assumptions. | tools/uk/buy-to-let.html; tools/uk/rental-yield.html |
| Calculate the appropriate jurisdiction’s standard residential purchase-tax bands under confirmed buyer assumptions. | tools/uk/lbtt.html; tools/uk/ltt.html; tools/uk/sdlt.html |
| Compare actual mortgage quotes, fees, remaining balances and interest over a common horizon. | tools/uk/rate-comparison.html; tools/uk/remortgage.html |
| Convert your current insurance quote into a monthly budget and show the policy deductible. | tools/usa/flood.html; tools/usa/ho1.html; tools/usa/ho3.html; tools/usa/ho5.html; tools/usa/ho6.html; tools/usa/homeowner-insurance.html; tools/usa/hurricane.html; tools/usa/wildfire.html |

## Near-duplicate body/method text above 70%

85 pairs, 87 pages. All pairs have main similarity >70%; 75 also have editorial-method similarity >70%. Input/output differences and statutory jurisdiction must be reviewed before merging.

| First page | Second page | Main similarity | Method similarity |
| --- | --- | --- | --- |
| tools/australia/amortization.html | tools/australia/overpayment.html | 97.95% | 100.0% |
| tools/australia/duty-by-state.html | tools/australia/stamp-duty.html | 97.86% | 100.0% |
| tools/australia/frequency.html | tools/australia/interest-only.html | 75.46% | 62.6% |
| tools/australia/lmi-rate.html | tools/australia/lmi.html | 71.54% | 59.23% |
| tools/australia/rate-comparison.html | tools/australia/refinance.html | 97.7% | 100.0% |
| tools/canada/amortization.html | tools/canada/prepayment.html | 95.04% | 100.0% |
| tools/canada/credit-quote.html | tools/canada/rate-comparison.html | 93.96% | 100.0% |
| tools/canada/credit-quote.html | tools/canada/refinance.html | 94.58% | 100.0% |
| tools/canada/credit-quote.html | tools/canada/renewal.html | 94.71% | 100.0% |
| tools/canada/rate-comparison.html | tools/canada/refinance.html | 94.35% | 100.0% |
| tools/canada/rate-comparison.html | tools/canada/renewal.html | 94.47% | 100.0% |
| tools/canada/refinance.html | tools/canada/renewal.html | 95.1% | 100.0% |
| tools/europe/amortization.html | tools/europe/overpayment.html | 97.93% | 100.0% |
| tools/europe/mortgage.html | tools/europe/nonresident.html | 73.22% | 60.45% |
| tools/india/amortization.html | tools/india/overpayment.html | 98.02% | 100.0% |
| tools/india/bank-comparison.html | tools/india/bank-hfc.html | 97.53% | 100.0% |
| tools/india/bank-comparison.html | tools/india/credit-quote.html | 97.8% | 100.0% |
| tools/india/bank-comparison.html | tools/india/refinance.html | 97.67% | 100.0% |
| tools/india/bank-hfc.html | tools/india/credit-quote.html | 97.8% | 100.0% |
| tools/india/bank-hfc.html | tools/india/refinance.html | 97.94% | 100.0% |
| tools/india/car-loan.html | tools/india/lap.html | 71.91% | 69.53% |
| tools/india/car-loan.html | tools/india/mortgage.html | 73.53% | 70.68% |
| tools/india/car-loan.html | tools/india/nri-loan.html | 71.16% | 65.43% |
| tools/india/credit-quote.html | tools/india/refinance.html | 97.94% | 100.0% |
| tools/india/duty-by-state.html | tools/india/stamp-duty.html | 97.27% | 100.0% |
| tools/india/emi.html | tools/india/lap.html | 70.76% | 64.23% |
| tools/india/emi.html | tools/india/personal-loan.html | 97.42% | 100.0% |
| tools/india/gst-purchase.html | tools/india/gst.html | 97.41% | 100.0% |
| tools/india/income-tax.html | tools/india/tax-comparison.html | 97.34% | 100.0% |
| tools/india/joint-loan.html | tools/india/loan-eligibility.html | 75.0% | 64.23% |
| tools/india/lap.html | tools/india/mortgage.html | 70.23% | 70.68% |
| tools/india/lap.html | tools/india/personal-loan.html | 70.76% | 64.23% |
| tools/india/mortgage.html | tools/india/nri-loan.html | 71.47% | 67.18% |
| tools/india/pmay-housing.html | tools/india/pmay-subsidy.html | 97.04% | 100.0% |
| tools/india/section-24b.html | tools/india/section-80c.html | 98.24% | 100.0% |
| tools/newzealand/affordability.html | tools/newzealand/preapproval-budget.html | 97.58% | 100.0% |
| tools/newzealand/amortization.html | tools/newzealand/overpayment.html | 98.18% | 100.0% |
| tools/newzealand/confirmed-support.html | tools/newzealand/first-home.html | 97.56% | 100.0% |
| tools/newzealand/deposit-builder.html | tools/newzealand/deposit.html | 97.87% | 100.0% |
| tools/newzealand/first-home-loan.html | tools/newzealand/mortgage.html | 95.07% | 94.7% |
| tools/newzealand/first-home-loan.html | tools/newzealand/purchase-budget.html | 95.22% | 94.7% |
| tools/newzealand/investment.html | tools/newzealand/rental-yield.html | 97.51% | 100.0% |
| tools/newzealand/kiwisaver-home.html | tools/newzealand/kiwisaver-withdrawal.html | 97.56% | 100.0% |
| tools/newzealand/lender-comparison.html | tools/newzealand/refinance.html | 97.87% | 100.0% |
| tools/newzealand/ltv.html | tools/newzealand/lvr-band.html | 96.93% | 100.0% |
| tools/newzealand/mortgage.html | tools/newzealand/purchase-budget.html | 98.04% | 100.0% |
| tools/newzealand/refix.html | tools/newzealand/repayment.html | 70.61% | 61.42% |
| tools/uk/amortization.html | tools/uk/overpayment.html | 97.87% | 100.0% |
| tools/uk/buy-to-let.html | tools/uk/rental-yield.html | 97.46% | 100.0% |
| tools/uk/lbtt.html | tools/uk/ltt.html | 91.35% | 91.89% |
| tools/uk/lbtt.html | tools/uk/sdlt.html | 89.06% | 89.94% |
| tools/uk/ltt.html | tools/uk/sdlt.html | 88.28% | 91.89% |
| tools/uk/rate-comparison.html | tools/uk/remortgage.html | 98.03% | 100.0% |
| tools/usa/amortization.html | tools/usa/extra-payments.html | 93.86% | 100.0% |
| tools/usa/amortization.html | tools/usa/prepayment.html | 94.2% | 100.0% |
| tools/usa/extra-payments.html | tools/usa/prepayment.html | 94.2% | 100.0% |
| tools/usa/flood.html | tools/usa/ho1.html | 91.71% | 90.05% |
| tools/usa/flood.html | tools/usa/ho3.html | 91.71% | 90.05% |
| tools/usa/flood.html | tools/usa/ho5.html | 91.71% | 90.05% |
| tools/usa/flood.html | tools/usa/ho6.html | 89.9% | 90.05% |
| tools/usa/flood.html | tools/usa/homeowner-insurance.html | 91.71% | 90.05% |
| tools/usa/flood.html | tools/usa/hurricane.html | 88.14% | 90.05% |
| tools/usa/flood.html | tools/usa/wildfire.html | 91.71% | 90.05% |
| tools/usa/heloc.html | tools/usa/home-equity.html | 91.68% | 100.0% |
| tools/usa/ho1.html | tools/usa/ho3.html | 97.54% | 100.0% |
| tools/usa/ho1.html | tools/usa/ho5.html | 97.54% | 100.0% |
| tools/usa/ho1.html | tools/usa/ho6.html | 93.2% | 100.0% |
| tools/usa/ho1.html | tools/usa/homeowner-insurance.html | 97.54% | 100.0% |
| tools/usa/ho1.html | tools/usa/hurricane.html | 93.89% | 100.0% |
| tools/usa/ho1.html | tools/usa/wildfire.html | 97.54% | 100.0% |
| tools/usa/ho3.html | tools/usa/ho5.html | 97.54% | 100.0% |
| tools/usa/ho3.html | tools/usa/ho6.html | 93.2% | 100.0% |
| tools/usa/ho3.html | tools/usa/homeowner-insurance.html | 97.54% | 100.0% |
| tools/usa/ho3.html | tools/usa/hurricane.html | 93.89% | 100.0% |
| tools/usa/ho3.html | tools/usa/wildfire.html | 97.54% | 100.0% |
| tools/usa/ho5.html | tools/usa/ho6.html | 93.2% | 100.0% |
| tools/usa/ho5.html | tools/usa/homeowner-insurance.html | 97.54% | 100.0% |
| tools/usa/ho5.html | tools/usa/hurricane.html | 93.89% | 100.0% |
| tools/usa/ho5.html | tools/usa/wildfire.html | 97.54% | 100.0% |
| tools/usa/ho6.html | tools/usa/homeowner-insurance.html | 93.2% | 100.0% |
| tools/usa/ho6.html | tools/usa/hurricane.html | 89.64% | 100.0% |
| tools/usa/ho6.html | tools/usa/wildfire.html | 93.2% | 100.0% |
| tools/usa/homeowner-insurance.html | tools/usa/hurricane.html | 93.89% | 100.0% |
| tools/usa/homeowner-insurance.html | tools/usa/wildfire.html | 97.54% | 100.0% |
| tools/usa/hurricane.html | tools/usa/wildfire.html | 93.89% | 100.0% |

## Benchmark register

| Country/key | Repository value · date | Live API value · date | Audit verdict | Primary verification / claimed source |
| --- | --- | --- | --- | --- |
| usa/fixed30 | 7.32% · 2026-10-22 | 7.32% · 2026-10-22 | Verified: 7.32%; PMMS observation 2026-10-22 | https://www.freddiemac.com/pmms |
| usa/fixed15 | 6.68% · 2026-10-22 | 6.68% · 2026-10-22 | Verified: 6.68%; PMMS observation 2026-10-22 | https://www.freddiemac.com/pmms |
| usa/prime | 7.00% · 2026-10-21 | 7.00% · 2026-10-21 | Verified dated observation: 7.00%; latest captured FRED observation 2026-10-21; do not label a personal offer | https://fred.stlouisfed.org/series/DPRIME |
| usa/fedEffective | 3.75% · 2026-09-01 | 3.88% · 2026-10-22 | Snapshot/API inconsistency; attribution error: Fallback has monthly FEDFUNDS 3.75% dated 2026-09-01; live API DFF 3.88% dated 2026-10-22. DFF source is Board of Governors/H.15, not NY Fed. Choose the intended series and keep fallback consistent. | https://fred.stlouisfed.org/series/DFF |
| usa/fed | 3.75% – 4.00% · 2026-09-17 | 3.75% – 4.00% · 2026-09-17 | Verified: Target range 3.75–4.00%; statement 2026-09-16, effective 2026-09-17 | https://www.federalreserve.gov/newsevents/pressreleases/monetary20260916a.htm |
| canada/boc | 2.25% · 2026-10-16 | 2.25% · 2026-10-16 | Value verified; selected observation stale: 2.25%; latest returned observation 2026-10-22, site selects 2026-10-16 | https://www.bankofcanada.ca/valet/observations/V39079/json?recent=5 |
| canada/fixed5 | 6.09% · 2026-09-23 | 6.09% · 2026-09-23 | Confirmed stale figure: Latest returned 6.19% dated 2026-10-21; site selects 6.09% dated 2026-09-23 | https://www.bankofcanada.ca/valet/observations/V80691335/json?recent=5 |
| canada/prime | 4.45% · 2026-09-23 | 4.45% · 2026-09-23 | Value verified; selected observation stale: 4.45%; latest returned observation 2026-10-21, site selects 2026-09-23 | https://www.bankofcanada.ca/valet/observations/V80691311/json?recent=5 |
| uk/boe | 3.75% · 2025-12-18 | 3.75% · 2025-12-18 | Verified: 3.75%; unchanged September 2026. 2025-12-18 is the rate-change date, not an erroneous verification date. | https://www.bankofengland.co.uk/monetary-policy-summary-and-minutes/2026/september-2026 |
| uk/fixed2 | 4.75% · 2026-08-01 | 4.75% · 2026-08-01 | Not independently verified: 4.75% claimed 2026-08-01; generic database URL lacks exact series and dated release | https://www.bankofengland.co.uk/boeapps/database/ (exact observation unverified) |
| uk/fixed5 | 4.35% · 2026-08-01 | 4.35% · 2026-08-01 | Not independently verified: 4.35% claimed 2026-08-01; generic database URL lacks exact series and dated release | https://www.bankofengland.co.uk/boeapps/database/ (exact observation unverified) |
| australia/rba | 4.60% · 2026-09-30 | 4.60% · 2026-09-30 | Verified: Cash-rate target 4.60%; effective 2026-09-30 | https://www.rba.gov.au/statistics/cash-rate/ |
| australia/variable | 6.09% · 2026-08-01 | 6.09% · 2026-08-01 | Not independently verified: 6.09% claimed 2026-08-01; generic Table F5 directory does not establish product/series/observation | https://www.rba.gov.au/statistics/tables/ (exact observation unverified) |
| newzealand/ocr | 2.75% · 2026-09-02 | 2.75% · 2026-09-02 | Verified: OCR 2.75%; decision/effective reference 2026-09-02 | https://www.rbnz.govt.nz/monetary-policy/about-monetary-policy/the-official-cash-rate |
| newzealand/floating | 8.64% · 2026-08-01 | 8.64% · 2026-08-01 | Not independently verified: 8.64% claimed 2026-08-01; generic statistics-table URL does not establish exact series | https://www.rbnz.govt.nz/statistics/tables (exact observation unverified) |
| india/repo | 5.50% · 2026-10-07 | 5.50% · 2026-10-07 | Verified: Policy repo 5.50%; official decision 2026-10-07; use exact release instead of RBI homepage | https://rbi.org.in/scripts/BS_PressReleaseDisplay.aspx?prid=63744 |
| india/homeLoanSbi | 8.50% · 2026-08-15 | 8.50% · 2026-08-15 | Not independently verified: 8.50% claimed 2026-08-15; SBI homepage is not proof of a specific dated tariff | https://sbi.co.in (exact observation unverified) |
| europe/ecb | 2.65% · 2026-09-16 | 2.65% · 2026-09-16 | Verified: MRO 2.65%; effective 2026-09-16. ECB deposit rate is a different instrument (2.50%). | https://www.ecb.europa.eu/stats/policy_and_exchange_rates/key_ecb_interest_rates/html/index.en.html |
| europe/euribor12m | 3.17% · 2026-09-01 | 3.17% · 2026-09-01 | Not independently verified: 3.17% claimed 2026-09-01; EMMI overview does not establish this dated fixing | https://www.emmi-benchmarks.eu/benchmarks/euribor/ (exact observation unverified) |

## Other figures, dates and statistics

The exhaustive extracted occurrence tables are `audit/numeric-occurrences.csv` (broad raw lines), `audit/visible-figure-inventory.csv` (DOM-only visible numeric candidates and stated/default inputs), and `audit/data-figure-inventory.csv` (numeric/date assertions in JSON outside rates). Each retains source/file/line or JSON path, context, claimed citations where present and verification status. The rate register above distinguishes source observation/effective dates from the site’s own claimed last-verification date. The main report contains the manually adjudicated statutory/count examples. Unverified inventory rows are open work, not silently passed.

## Confirmed contradictions

| Claim / location | Evidence | Disposition |
| --- | --- | --- |
| Homepage $250K total interest | 360,000 principal; 6.66% nominal; 360 months → $472,844.50 using the US model convention. $2,313 monthly rounded to whole dollars is consistent. | Wrong hero interest; shared illustrative fixture/test required after approval. |
| Canada current feed vs official feed | Site 6.09% (2026-09-23) vs newest official 6.19% (2026-10-21). Reverse/find selects oldest. | Proven data-selection defect in bot and worker. |
| Effective Fed fallback vs API | Repository/fallback monthly FEDFUNDS 3.75% September; live API daily DFF 3.88% October 22. | Different series/frequencies under one label; fix source and fallback. |
| Homepage 50+ FAQ answers | mortgage-faq main page has 11 H2 question headings. | Unsupported count; remove or use counted total. |
| UK 20+ calculators | 16 dedicated tools plus root estimate do not substantiate 20+. | Remove/recompute claim. |
| Homepage 43 guides | 43 blog article HTML files, blog index excluded. | True; retain if build-counted. |
| NZ legacy rules JSON vs current RBNZ | JSON retains owner 20%/investor 5% LVR speed limits; August 2026 RBNZ says 25%/10%. | Confirmed stale reference data; not proven to be consumed by current tool engine. |
| NZ FAQ vs new low-equity tool | FAQ quotes typical 0.75–1.50% fee/0.25–0.75pp margin and implies removal at 80% LTV; new tool correctly requires actual lender quote/no automatic removal. | Unsourced market range and overbroad removal claim; rewrite. |
| India FAQ vs quote-based tool | FAQ claims typical processing fee 0.25–1.00%; tool correctly asks actual all-in fee. | Unsourced range; remove or verify exact dated source. |

## Baseline counts for the later after-audit

| Metric | Baseline | After |
| --- | --- | --- |
| Broken source internal targets / fragments | 0 / 0 | Not applicable: no remediation authorized |
| Specific mismatched resource cards | 12 | Not applicable |
| Exact duplicate meta-description groups | 26 | Not applicable |
| Near-duplicate pairs / participants | 85 / 87 | Not applicable |
| Dedicated tool-method sections below owner 600-word target | 179 | Not applicable; quality judgment required |
| Loader-enabled pages below owner 600 main-word screen | 39 | Not applicable; not automatic policy violations |
| Historical benchmark records not verified | 6 | Not applicable |
| Canada benchmark figure demonstrably stale | 1 | Not applicable |
| Empty ad placeholder divs / pages | 47 / 45 | Not applicable |
| CMP and actual ad fill | Unverified | Not applicable |

## Audit-only boundary

No after-remediation compliance claim is made. A dated after report must be produced only after approved changes, deployment and a fresh crawl. The definition of done is not met. Do not call unresolved facts verified or invent “zero open items”.
