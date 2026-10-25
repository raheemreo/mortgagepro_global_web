# US calculator port — October 25, 2026

Website: `raheemreo/mortgagepro_global_web`.
Read-only reference: `raheemreo/mortgagepro_global`, commit `9f79ea943e27b6d8b0c1ca411c37fb4cae077f72`.

## Scope and architecture

The US directory formerly sent most cards to generic blog guides or the hero calculator. It now links to 43 dedicated, static calculator pages: 40 app tool sources plus separate recurring-prepayment, extra-payment and same-rate term-comparison views. Six state shortcuts open the property-tax calculator. The optional state selector contains the 27 state/DC reference examples present in the app; other locations use an entered local rate. No statewide average is represented as a current statutory local tax rate.

`js/us-tools-models.js` contains pure monthly-payment, amortization, debt and scenario functions. `js/us-tools-catalog.js` defines tool fields, units, bounds, formulas, caveats and primary references. `scripts/build_us_tools.cjs` reproducibly generates the pages, US directory and sitemap. Shared UI calculates entirely in the tab; it does not persist inputs, write financial figures into URLs, or make calculation API requests. Only a whitelisted state code is accepted from a URL. Schedules can be downloaded locally as CSV.

The app repository is not a working checkout and was not modified, committed or pushed. The reference snapshot was fetched at the pinned commit. All 44 reference files (40 tools, USA screen, navigation map and two shared math utilities) were verified against their Git blob hashes. Their paths and hashes are recorded in `us-tools-source-manifest.json`; private Dart UI is not published with the website. There is no runtime dependency on the private app repository.

Market widgets, rate feeds/APIs, other countries, articles, privacy documents and app code are outside this change. The hero calculator is retained; its existing regression tests run alongside the new tools. An unused state-card handler was removed because state cards now navigate to a dedicated tax tool.

## Reviewed changes from the app formulas

Exact duplication of demonstrably incorrect or outdated outputs would not satisfy working calculator validation. Shared PMT, principal/interest amortization and the tool-specific formulas were ported where sound. The following web-only corrections or intentionally narrower outputs are explicit:

| Model | Web behavior and reason |
| --- | --- |
| Payment and schedules | Stable PMT at tiny rates; zero-interest and zero-principal handling; nonnegative, finite bounded inputs; exact final-payment cap; no arbitrary historical start date. All totals use unrounded intermediates. |
| Affordability | Respects both housing and total-debt budgets, subtracts existing debt, and reserves PMI inside the payment budget. The source used only its front-end budget and added PMI afterward. Ratios are editable assumptions, not underwriting approval. |
| PITI / DTI | Separates PITI from PMI/HOA, labels income weighting explicitly, and removes unsupported eligibility/approval verdicts. No fake precision about PMI cancellation dates. |
| Term comparison | Holds the rate constant across terms rather than comparing hardcoded 30-/15-year quote dates. |
| FHA | Uses original base-loan LTV for tier selection, includes the high-base-loan MIP tiers, estimates initial MIP from base principal, supports upfront cash versus financed MIP, and displays duration. Does not repeat the source's old $498,257 price eligibility check. |
| VA | Uses the common purchase funding fee schedule for active duty and Guard/Reserve. Removes the outdated separate 2.40% first-use Reserve fee. Supports cash/financed fee and confirmed exemption. |
| USDA | Shows editable 1% upfront / 0.35% annual fee assumptions, supported by the FY 2027 notice. Year-one annual fee uses average scheduled opening unpaid principal rather than an unchanged initial balance. No household-income/address approval claim. |
| Jumbo | Uses an editable local conforming limit with the 2026 $832,750 one-unit baseline, replacing $766,550. Compares principal, not purchase price. Does not promise PMI availability or approval. |
| ARM | Actually applies the initial/lifetime caps to the first reset. Does not show the unused SOFR input as though it affected the payment. This is one reset plus a stress case, not a full periodic-reset simulator. |
| PMI | Uses the source credit/LTV illustrative table and an entered rate for the 80% balance milestone. Distinguishes request-at-80% from automatic termination generally at scheduled 78%, subject to conditions. |
| Closing costs | Exposes formerly fixed rate, points, prepaid days, escrow months, transfer tax and seller credit as inputs. Credits cannot finance the down payment or exceed modeled costs. Fixed fee allowances are disclosed. |
| Property tax | Editable local rate/exemption, explicit illustrative state reference labels, optional growth assumption. Annual tax rounds to $1; monthly budget is annual/12 rather than separately rounded to a whole dollar. |
| Refinance | Deducts closing costs from net interest savings even when financed. Labels payment-based break-even as a simple measure rather than an economic verdict. |
| Piggyback | Restricts cash down to the 0–20% structure; does not keep charging PMI for all 120 comparison months after modeled 80% LTV. Labels cash payments separately from full economic cost. |
| Debt payoff | Retains the app's reducing-minimum budget convention, stated visibly. Reports an unfinished plan if debt remains at 600 months rather than a false payoff date. |
| HELOC / equity | Exposes CLTV as a budget assumption, distinguishes capped HELOC draw from requested equity loan, and labels any capacity exceedance. No silent lender approval. |
| Student debt | Uses the lender-confirmed payment entered by the user. Does not repeat hardcoded income-driven repayment/poverty-line estimates or universal eligibility claims. |
| Rent/buy | Stops mortgage payments after maturity; uses one consistent owner/renter series for output, table and crossover; includes initial purchase costs in the renter's investment; applies negative as well as positive cash differences. Adds editable maintenance, insurance and transaction-cost assumptions. No tax or PMI model. |
| Tax deduction | A qualified-expense/itemization planner, not the source's outdated 2024 bracket/$10,000-SALT tax-return estimate. Requires explicit standard-deduction and applicable income-adjusted SALT-cap entries. Uses actual paid interest and an entered qualified debt cap. No bracket/AMT/credit/refund claim. |
| 1031 | Caps recognized gain at realized gain; calculates simplified replacement basis as cost less deferred gain; exposes tax rates, selling costs and debt boot. Removes claims that replacement cost alone proves full deferral. Qualified adviser/intermediary review remains necessary. |
| Down payment assistance | A budget for a confirmed assistance amount, not the source's unverified program matching/eligibility score. Does not publish potentially unavailable grant amounts as current offers. A repayable-assistance option includes P&I. |
| Insurance / moving / credit tiers | Retains the app's illustrative factors and rounding. Labels these as examples rather than current quotes, FEMA pricing, policy coverage promises or lender offers. Coverage/exclusion lists and market-average claims are not imported. |

## Source-to-page inventory

| Tool | Website path | App source under `lib/features/usa/tools/` |
| --- | --- | --- |
| Mortgage Calculator | `/tools/usa/mortgage` | `usa_mortgage_calc.dart` |
| PITI Calculator | `/tools/usa/piti` | `usa_piti_calc.dart` |
| Amortization Calculator | `/tools/usa/amortization` | `usa_amortization_calc.dart` |
| Prepayment Savings Calculator | `/tools/usa/prepayment` | `usa_amortization_calc.dart` |
| Extra Payments Calculator | `/tools/usa/extra-payments` | `usa_amortization_calc.dart` |
| Mortgage Term Comparison | `/tools/usa/term-comparison` | `usa_mortgage_calc.dart` |
| Debt-to-Income Calculator | `/tools/usa/dti` | `usa_dti_calc.dart` |
| Home Affordability Calculator | `/tools/usa/affordability` | `usa_affordability_calc.dart` |
| Down Payment Planner | `/tools/usa/down-payment` | `usa_down_payment_calc.dart` |
| Auto Loan Calculator | `/tools/usa/auto-loan` | `usa_auto_loan_calc.dart` |
| Refinance Calculator | `/tools/usa/refinance` | `usa_refinance_calc.dart` |
| FHA Loan Calculator | `/tools/usa/fha` | `usa_fha_loan_calc.dart` |
| VA Loan Calculator | `/tools/usa/va` | `usa_va_loan_calc.dart` |
| USDA Guaranteed Loan Calculator | `/tools/usa/usda` | `usa_usda_loan_calc.dart` |
| Jumbo Mortgage Calculator | `/tools/usa/jumbo` | `usa_jumbo_loan_calc.dart` |
| ARM Payment Scenario | `/tools/usa/arm` | `usa_arm_calc.dart` |
| Construction Loan Calculator | `/tools/usa/construction` | `usa_construction_loan_calc.dart` |
| Piggyback Loan Calculator | `/tools/usa/piggyback` | `usa_piggyback_loan_calc.dart` |
| Down Payment Assistance Budget | `/tools/usa/down-payment-assistance` | `usa_hud_dpa_programs.dart` |
| PMI Calculator | `/tools/usa/pmi` | `usa_pmi_calc.dart` |
| Property Tax Calculator | `/tools/usa/property-tax` | `usa_property_tax_calc.dart` |
| Closing Costs Calculator | `/tools/usa/closing-costs` | `usa_closing_costs_calc.dart` |
| HOA Fee Impact Calculator | `/tools/usa/hoa` | `usa_hoa_fee_impact_calc.dart` |
| Homeowner Insurance Estimate | `/tools/usa/homeowner-insurance` | `usa_homeowner_insurance_calc.dart` |
| HO-1 Insurance Estimate | `/tools/usa/ho1` | `usa_homeowner_insurance_ho1_calc.dart` |
| HO-3 Insurance Estimate | `/tools/usa/ho3` | `usa_homeowner_insurance_ho3_calc.dart` |
| HO-5 Insurance Estimate | `/tools/usa/ho5` | `usa_homeowner_insurance_ho5_calc.dart` |
| HO-6 Condo Insurance Estimate | `/tools/usa/ho6` | `usa_homeowner_insurance_ho6_calc.dart` |
| Hurricane / Wind Premium Scenario | `/tools/usa/hurricane` | `usa_homeowner_insurance_hurricane_calc.dart` |
| Wildfire Premium Scenario | `/tools/usa/wildfire` | `usa_homeowner_insurance_wildfire_calc.dart` |
| Flood Insurance Scenario | `/tools/usa/flood` | `usa_flood_insurance_calc.dart` |
| Credit Score Payment Sensitivity | `/tools/usa/credit-score` | `usa_credit_score_impact_calc.dart` |
| Debt Payoff Planner | `/tools/usa/debt-payoff` | `usa_debt_payoff_planner.dart` |
| HELOC Calculator | `/tools/usa/heloc` | `usa_heloc_calc.dart` |
| Home Equity Loan Calculator | `/tools/usa/home-equity` | `usa_home_equity_loan_calc.dart` |
| Student Loan DTI Impact | `/tools/usa/student-dti` | `usa_student_loan_dti_calc.dart` |
| Rent vs Buy Calculator | `/tools/usa/rent-vs-buy` | `usa_rent_vs_buy_calc.dart` |
| Moving Cost Budget | `/tools/usa/moving` | `usa_moving_cost_calc.dart` |
| Mortgage Tax Deduction Planner | `/tools/usa/tax-deduction` | `usa_tax_deduction_calc.dart` |
| Rental Yield & Cash Flow | `/tools/usa/rental-yield` | `usa_rental_yield_calc.dart` |
| Cash-on-Cash Return | `/tools/usa/cash-on-cash` | `usa_cash_on_cash_calc.dart` |
| Fix & Flip Calculator | `/tools/usa/fix-flip` | `usa_fix_flip_calc.dart` |
| 1031 Exchange Tax Scenario | `/tools/usa/exchange-1031` | `usa_1031_exchange_calc.dart` |

## Primary policy references reviewed

- FHA ordinary forward-purchase MIP structure: https://www.hud.gov/sites/dfiles/OCHCO/documents/2023-05hsgml.pdf and https://answers.hud.gov/FHA/s/article/What-is-the-FHA-Mortgage-Insurance-Premium-structure-for-forward-mortgage-loans
- VA purchase fee schedule: https://www.va.gov/housing-assistance/home-loans/funding-fee-and-closing-costs/ and https://www.benefits.va.gov/homeloans/purchaseco_loan_fee.asp
- USDA FY 2027 1% / 0.35%: https://content.govdelivery.com/accounts/USDARD/bulletins/42b1054; average scheduled balance explanation: https://www.rd.usda.gov/media/file/download/usda-rd-sfh-guarantee-loan-program-101-jan-2026.pdf
- 2026 one-unit baseline/local differences: https://www.fhfa.gov/news/news-release/fhfa-announces-conforming-loan-limit-values-for-2026
- PMI request and termination conditions: https://www.consumerfinance.gov/ask-cfpb/when-can-i-remove-private-mortgage-insurance-pmi-from-my-loan-en-202/
- Qualified mortgage interest/SALT/itemization: https://www.irs.gov/publications/p936 and https://www.irs.gov/instructions/i1040sca
- 1031 real-property constraints: https://www.irs.gov/businesses/small-businesses-self-employed/like-kind-exchanges-real-estate-tax-tips

## Verification

The reference tests name each checked component and do not assert full Flutter runtime parity. The app was source-reviewed, not built or executed. The web-specific corrections above intentionally differ. Independent PMT examples, principal conservation, final payment behavior, fee-tier boundaries, debt-constrained affordability, unpaid-debt detection, comparison horizons, undefined investment denominators, tax-cap inputs, routing and finite output bounds are covered.

Local validation:

- 118 model/rate regression tests passed (65 US-tool tests plus the existing 53).
- All 110 published HTML pages passed single-H1, unique-ID, internal-link/fragment, consent ordering and no-financial-telemetry validation. Existing 43 articles and rate snapshot validators passed.
- 129 US tool/viewport cases passed: all 43 at 1280px/light, 390px/light and 320px/dark. Invalid and restored inputs, zero interest, recalculation, reset, expandable tables, CSV, VA exemption and state/manual-rate behavior were exercised. Two initial entry-flow test selectors were corrected (a local-server root 403 and a hidden mobile-nav match); neither was a website defect.
- 69 existing page/viewport regression checks passed, including seven country calculator invalid/zero/scenario/privacy checks.
- Desktop and mobile screenshots of PITI, FHA, amortization, property tax and debt payoff were inspected. Tables stay inside keyboard-focusable scroll regions.

- Home → Start Calculating → country directory → US tool directory passed, as did all six state URLs and ignored/untrusted query parameters. All 43 pages retained formulas/references without JavaScript and hid the calculation submit action.
- A full rebuild of the existing article/document/root/rate/privacy pipeline plus the new tool builder produced no unstaged differences. Website CI now includes the 65 new model checks and the tool build; static validation includes the new tools directory.
- Production deployment and final live smoke-test proof are recorded in the pull request.
