# Canada calculator implementation

Reviewed 2026-10-25. Website changes only; the Flutter application repository was read, never edited. Source repository: `raheemreo/mortgagepro_global`, commit `9f79ea943e27b6d8b0c1ca411c37fb4cae077f72`. The adjacent source manifest records the 14 inspected files and verified Git blob hashes. No application source, credentials or SDK configuration is published with the site.

## Coverage

| App reference | Website implementation |
| --- | --- |
| ca_mortgage_calc.dart | Purchase payment, actual credit-quote comparison, compounding comparison |
| ca_cmhc_insurance.dart and shared cmhc_calculator.dart | Insurance tiers, financed/cash premium, entered provincial premium tax |
| ca_affordability.dart | Insured/uninsured purchase budget with entered housing costs and down payment |
| ca_gds_tds_ratio.dart | Monthly housing and total-debt ratios |
| ca_stress_test.dart | Standard qualifying-rate scenario and GDS/TDS |
| ca_amortization.dart | Full repayment schedule, frequency comparison, CSV |
| ca_prepayment.dart | Recurring, annual and one-time principal extras; accelerated weekly/biweekly |
| ca_renewal_planner.dart | Renewal and refinance quote comparisons, fees, balances and interest cost |
| ca_land_transfer_tax.dart | Supported statutory bands plus confirmed local taxes, fees and rebates |
| ca_first_home_buyer.dart | Confirmed FHSA/HBP/savings/co-buyer purchase funding budget |
| ca_boc_rate_history.dart | Mortgage quote-rate impact comparison; official rate-history link retained |

Fifteen dedicated tools cover the eleven mathematical app sources. Existing Canada root calculator and eight article widgets also use explicit submit, clearing stale results on edit and reset. Personal financial amounts/rates start blank. Zero optional costs explicitly exclude those items. Planning defaults (25 years, monthly schedule, semiannual compounding, 39/44 ratio budgets) are labeled, editable assumptions. No calculation or financial-input telemetry is sent to a server.

## Corrections made while porting

- Use `(1 + j/2)^(2/frequency) − 1`, not the effective annual rate divided by payment frequency. Monthly-contract compounding is separately selectable. Zero interest uses principal / scheduled periods.
- Compute complete 25-year weekly and biweekly schedules (1,300/650 periods), avoiding the app's 600-period prepayment truncation. Cap final payment at balance plus interest and conserve principal.
- Enforce graduated minimum down payment below CAD 1.5 million and 20% at or above it. High-ratio purchase premium uses base LTV (2.8/3.1/4%), with 0.20 percentage points for confirmed eligible amortization over 25 years, capped at 30 years. No unconditional 30-year eligibility assumption.
- Affordability includes financed insurance and actual tax/heating/half condo/full ground rent; it does not silently invent household costs or return an approval.
- Renewal/refinance compares actual quoted rates and fees, remaining balances and interest over a bounded common horizon. No invented credit-score pricing or policy-rate mortgage quote.
- Apply 2026 Toronto high-value bands, 2026 Montreal brackets, BC's extra residential tax above CAD 3 million, Manitoba's untaxed first CAD 30,000 and the current Alberta one-title levy. Quebec outside Montreal and Saskatchewan require a confirmed assessment; Nova Scotia requires the actual municipal rate. Additional/non-resident taxes and rebates require entered confirmed figures. No automatic exemption determination.
- First-buyer funds use current HBP CAD 60,000 per individual, avoid capping an actual FHSA withdrawal at the contribution limit, and use graduated deposit math rather than dividing every deposit by 5%. Remove the discontinued First-Time Home Buyer Incentive resource card.

## Sources and limits

The catalog publishes direct FCAC, CMHC, OSFI, CRA, provincial and municipal references beside each tool. `data/canada-tool-reference.json` records the dated policy values. Toronto rates apply from 2026-04-01; Montreal bands are for 2026; Alberta title schedule is effective 2026-10-01. No unattended policy refresh or current mortgage offer is claimed. Borrower rates and costs come from user documents/quotes.

Standard owner-occupied one/two-unit traditional-down purchase scope only. Interest is a constant-rate projection, not a promise across renewals. Daily-interest calendars, insurer underwriting, nontraditional deposits, investment properties, income qualification, future rates, IRD penalties, tax advice and special property transfers require lender/professional confirmation. The AI-advisor backend and rate/news feed integrations were not ported or changed; the website links to methods and official rate history instead of offering a simulated AI service. Flutter tests were not executed: parity was assessed by inspecting pinned source, independently checking formulas and testing web behavior.

## Verification

- 56 Canada model/catalog/provenance tests, including official Montreal CAD 700,000 → CAD 9,349 transfer-duty example, other province boundaries, CMHC tiers, payment/conservation, long schedules, fee comparisons, missing/invalid fields, zero interest and the full supported quote-rate boundary including the qualifying buffer.
- Full financial regression suite: 177 tests.
- Browser regression at desktop 1,280 px, mobile 390 px and narrow dark-mode 320 px: all 15 tools, eight widgets and root calculator, explicit submit only, edit/reset clearing, invalid values, zero rates, regional links and CSV export. No external ad requests or financial-input writes allowed.
- No-JavaScript formulas and references remain readable. Builds are reproducible; generated pages, clean routes, sitemap, metadata, navigation and privacy ordering are checked.
