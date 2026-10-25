# UK website tools — 2026-10-25

Read-only app reference: raheemreo/mortgagepro_global at 9f79ea943e27b6d8b0c1ca411c37fb4cae077f72. The adjacent manifest records 16 files verified against their Git blob SHA. The app repository was not changed or compiled. Thirteen mathematical source paths map to 16 working website tools; overlapping SDLT implementations are consolidated into correct nation-specific tax models. AI/backend and market-history feeds are outside this calculator change; existing official resource links remain.

The directory now opens mortgage, amortization, overpayment, interest-only transition, household budget, income multiple, LTV, remortgage, rate comparison, SDLT, LBTT/ADS, Welsh LTT, buy-to-let cash flow, rental yield, shared ownership and existing Help to Buy equity-loan tools. Each form starts without fabricated personal amounts/rates and runs only on Calculate. Editing/reset clears results and exports; schedules include an adjusted final payment and CSV. The root calculator and seven UK article widgets follow the same submit-only flow. Existing US/Canada behavior is preserved.

## Corrections from the app

- England/NI: April 2025 bands, £300,000 first-buyer nil threshold and strict £500,000 relief ceiling; 5% additional-property and 2% non-resident SDLT scenarios. Scottish LBTT uses its own bands and £175,000 first-buyer nil threshold, plus 8% ADS where confirmed. Wales uses distinct higher-rate brackets from 11 December 2024 and no first-buyer relief; ordinary purchases below £40,000 do not incur the modeled higher rate. No universal surcharge or obsolete £425k/£625k relief is applied.
- Household budget uses actual take-home pay and living/debt costs. Removes the app’s assumed 28% tax, 60% other-income weighting, fixed 8% stress rate and blanket 4.5× approval implication. Income multiples are explicit entered scenarios. The current BoE publication includes rules effective 28 October 2026; no forward-effective individual lending entitlement is asserted.
- Remortgage compares entered quotes, remaining balances and interest as well as fees/cash flows, with a horizon within both remaining terms. No policy-rate mortgage quote or credit-score pricing is inferred.
- Shared ownership uses an entered share, actual rent rate, full charges and conveyancer-confirmed tax. Removes automatic SDLT-on-share relief, hard-coded legal/survey fees and unsupported scheme eligibility decisions.
- Help to Buy is an existing-loan budget, not an application promise. Current interest is charged on the original equity loan; redemption follows the approved current valuation and original equity percentage. No invented future inflation is assumed.
- Rental models distinguish operating yield, interest and repayment cash flow. Section 24/income tax, capital gains and licensing are excluded rather than treated as a flat personal tax percentage.

Primary sources are published per tool: GOV.UK/HMRC, Revenue Scotland, Welsh Revenue Authority, Bank of England/PRA and MoneyHelper (MaPS). Dated reference facts are in data/uk-tool-reference.json. Standard individual residential purchase scope; corporate/trust, linked/mixed use, lease-rent NPV, replacement-home refunds and transitional cases require a conveyancer. Monthly/weekly equivalent-period models are not lender daily-accrual statements. Actual terms, fees, eligibility and future rates can differ.

## Validation

The full model regression suite has 233 tests, including 56 new UK/core tests. Independent fixtures include England £295,000 → £4,750, Scotland £235,000 → £1,800 and £875,000 → £63,350, and Welsh higher-rate £260,000 → £15,950. Tests also cover relief cliffs, £40k boundaries, zero interest, principal/interest conservation, long weekly schedules, fees/balances, missing values and the quote-plus-buffer upper boundary.

Browser QA covers all 16 tools, seven article widgets and the root at 1280/390/320 px, including dark mode, missing/invalid/zero values, no calculation while typing, reset, full schedule CSV and no-JavaScript references. External ads/financial-input writes are blocked during QA. Generated clean routes, sitemap, metadata, privacy ordering, local links and reproducible builds are validated before publishing.
