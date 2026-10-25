# Calculation Methodology and Limits

**Meta description:** Understand repayment formulas, rate conventions, amortization balances and the limits of mortgage insurance, tax, offset and affordability estimates.

A formula is useful only when its assumptions match the question. This page explains the models used for planning and the details you should compare with a lender's own schedule.

## Principal, rate and payment count

For a simple monthly repayment model, principal is the financed balance, the periodic decimal rate is annual percentage divided by 1200, and the payment count is repayment years multiplied by twelve. At zero interest, payment is principal divided by the payment count.

At a nonzero periodic rate r and n payments, the level payment is principal × r ÷ (1 − (1 + r)^−n). A financed fee or insurance premium belongs in principal; a cash closing cost does not. The result is principal and interest unless other costs are explicitly added.

## Rate conventions

The Canadian fixed-rate illustrations use a nominal semiannual quote converted to a monthly rate: (1 + annual percentage ÷ 200)^(1/6) − 1. Not every Canadian product uses the same convention. Other monthly models are approximations for products that may accrue interest daily.

A current fix can end before the debt's final repayment date. Constant-rate lifetime totals are scenarios, not predictions of renewal or variable rates. Central-bank policy rates, published mortgage observations and personalized lender offers should not be substituted for one another.

## Balances and extra payments

An amortization model charges interest on the opening balance, applies the payment and reports the balance after that payment. Extra principal reduces subsequent interest under the entered rate path. The final payment is adjusted to avoid overpaying the remaining balance.

Paying half a monthly amount every two weeks schedules thirteen monthly equivalents per year. It requires more annual cash than twelve monthly payments. Calendar dates, rounding and lender accrual rules can affect the actual result.

## Ownership costs and insurance

Tax, property insurance, mortgage insurance, association charges and maintenance are separate from principal and interest. Where a tool includes them, its labels identify them. Insurance premiums and tax relief can depend on eligibility, loan structure and the transaction date.

A hypothetical LMI or PMI rate is not an insurer quote. Mortgage insurance can change or end under applicable rules; a constant-cost illustration should not be read as an actual lifetime insurance bill. Read the relevant [US](/blog/usa-down-payment-calculator) or [Canadian insurance guide](/blog/cmhc-insurance-canada-guide).

## Tax and transfer-duty scope

The UK standard residential model concerns England and Northern Ireland; Scotland and Wales use other taxes. First-time relief and surcharges require transaction-specific confirmation. Our [SDLT guide](/blog/uk-stamp-duty-calculator) states the supported categories.

Australian duty varies by state, date, use and buyer category. The [Australian article tool](/blog/australia-stamp-duty-calculator) supports QLD/VIC general non-concession schedules. Other categories require an official assessment or a conveyancer's figure. No national flat percentage establishes an exact tax bill.

## Offset and affordability scenarios

An offset estimate depends on actual daily balances, product terms, fees and future rates. A constant-balance comparison isolates one assumption and does not establish tax treatment or lifetime savings.

Affordability and debt-ratio tools use entered assumptions. They do not verify credit, documented income, lender expense floors, property eligibility or an institution's available high-DTI/high-LVR allowance. A result is not an approval badge.

## Verification and independent checks

The public repository contains numerical regression fixtures and browser checks for the models they cover. Automated checks help identify regressions; they do not constitute a complete legal, accessibility or professional financial certification of the website.

Use the linked primary sources, the relevant article's limitations and the lender's written disclosure when comparing results. Report a reproducible issue through the [corrections policy](/corrections-policy).
