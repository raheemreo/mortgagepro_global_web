# Canada Mortgage Calculator: Why Your Rate Compounds Differently Than You Think

**Meta description:** See how a Canadian mortgage calculator handles semi-annual compounding, the 5-year term vs. 25-year amortization split, and what that means for your real monthly payment.

Take a $650,000 home, 20% down ($130,000), and a 5-year fixed rate of 3.99% — a rate MortgagePro Global pulls from the Bank of Canada context. Run that through a Canadian mortgage calculator and the $520,000 loan comes out to roughly $2,730 a month on a 25-year amortization. That number relies on a quirk almost no other country's mortgage math uses: Canadian law requires fixed-rate mortgages to compound semi-annually, not monthly.

## Two numbers, not one: term vs. amortization

The first thing that trips up anyone new to Canadian mortgages is that "how long is my mortgage" has two different answers. The **term** — typically 5 years — is how long your current rate is locked in. The **amortization** — typically 25 years, sometimes 30 for first-time buyers or new builds — is how long it actually takes to pay off the loan at that payment schedule. You don't sign one mortgage for 25 years; you sign a series of 5-year terms, renewing (or switching lenders) each time, against a shrinking balance on a fixed overall payoff clock.

## Why semi-annual compounding matters

By law, Canadian fixed-rate mortgages compound semi-annually. A quoted "3.99% annual rate" isn't simply divided by 12 to get a monthly rate the way it would be in the US. It's first converted to a 6-month periodic rate, then converted again into the equivalent monthly rate:

**Monthly rate = (1 + annual rate ÷ 2)^(1/6) − 1**

That produces a slightly different — very slightly higher — effective rate than simple monthly compounding would. It's a small difference on paper but it's baked into every Canadian mortgage calculator, and it's why plugging Canadian numbers into a generic US-style calculator gives you a payment that's a few dollars off.

## Worked example

| Input | Value |
|---|---|
| Home price | $650,000 |
| Down payment (20%) | $130,000 |
| Loan amount | $520,000 |
| Rate | 3.99% (5-yr fixed, semi-annual compounding) |
| Amortization | 25 years |
| **Monthly payment** | **≈ $2,730** |

> **Quick check:** Switch to an accelerated bi-weekly schedule (half the monthly payment, paid every two weeks — 26 payments a year instead of 12 monthly ones) and you're effectively making 13 monthly payments a year instead of 12. On this loan, that alone can cut roughly 3-4 years off a 25-year amortization.

## Common mistakes

Buyers frequently confuse their 5-year term rate with their full loan term, and are surprised when the rate — and payment — can change entirely at renewal. This isn't a US-style "set it and forget it" 30-year fixed; it's a rate you'll likely revisit five or six times before the mortgage is paid off.

Buyers also underestimate how much a rate move affects the *renewal* payment, not just a new purchase. Someone who locked 3.99% five years ago renewing into today's rate environment can see a real payment jump — this is covered in depth in our Renewal Planner tool.

A third mistake: assuming this monthly number is the whole housing cost. If the down payment is under 20%, CMHC mortgage default insurance adds a premium on top — covered separately in our CMHC Insurance Calculator.

## Where this calculator has limits

It assumes a fixed rate for the full term — variable-rate mortgages fluctuate with the Bank of Canada's policy rate and this math doesn't apply the same way. It also doesn't build in the mandatory mortgage stress test, which determines whether you *qualify* for this payment in the first place, not just what the payment is.

## FAQ

**Why is Canadian mortgage math different from what I see on US calculators?**
Mainly the semi-annual compounding rule — a legal requirement in Canada for fixed-rate mortgages that doesn't exist in the US market.

**What's the difference between term and amortization again?**
Term is how long your rate is locked (commonly 5 years); amortization is the total payoff timeline (commonly 25-30 years). You renew your term multiple times over one amortization period.

**Does a 30-year amortization save money?**
It lowers the monthly payment but increases total interest paid over the life of the loan compared to a 25-year amortization at the same rate.

**Is my rate ever guaranteed for the full amortization?**
No — only for the current term. At renewal, you get whatever rate is available at that time, from your current lender or a new one.

**Does this calculator include CMHC insurance?**
No — this example assumes 20% down with no insurance required. Use the CMHC Insurance Calculator for scenarios under 20% down.

## Related tools

CMHC Insurance Calculator · Stress Test Calculator · Amortization Calculator · Renewal Planner

---

*Educational content, not financial advice. Rates and figures are illustrative and change regularly — confirm current numbers with a licensed Canadian mortgage lender or broker. Written by the MortgagePro Global team.*
