# Phase 1 — financial display and feed corrections

Implemented 26 October 2026. Calculation engines were not changed.

- Homepage illustration is generated from `data/homepage-example.json` through the actual US mortgage model: principal USD 360,000, nominal annual assumption 6.66%, 360 monthly payments; monthly P&I USD 2,313.46 and unrounded-model total interest USD 472,844.50. An automated parity check detects drift in the published HTML.
- Canada bot and edge worker select the maximum valid observation date, independently of source ordering. Older responses cannot overwrite a newer stored observation. Regression cases cover both orderings, missing values, zero, invalid/future dates and upstream failures.
- The corrected bot retrieved Bank of Canada observations on the implementation date: conventional five-year 6.19% observed 21 October, prime 4.45% observed 21 October, overnight 2.25% observed 23 October. These are dated source observations, not personal offers.
- Removed six unsupported historical loan-rate/fixing records (UK two/five year, Australia variable, NZ floating, SBI home loan, Euribor). Generic source homepages did not establish those exact observations. No replacement loan rates were invented.
- Effective federal funds fallback now consistently uses daily DFF 3.88%, observation 22 October, with the correct Board of Governors/H.15 attribution. Source: https://fred.stlouisfed.org/series/DFF (checked 26 October).
- PMMS 7.32% / 6.68%, observation 22 October, confirmed at https://www.freddiemac.com/pmms. Fed target 3.75–4.00%, effective 17 September, confirmed at https://www.federalreserve.gov/newsevents/pressreleases/monetary20260916a1.htm.
- Rechecked RBA cash target, BoE decision, RBNZ OCR and ECB official table. RBI official search result for the 7 October statement establishes 5.50%; the exact statement link replaces the generic homepage. Direct RBI page opening was unavailable in this environment; that retrieval limitation remains recorded.
- Static benchmark provenance and browser rendering now include source link, observation/effective date and actual stored check date. Every country hub has a dated policy-reference section. Rebuilds do not set a new verification date.

Validation: 16 rate/edge/parity tests pass; rate schema validator passes. Final full-site/browser checks follow the remaining phases. This is not an AdSense compliance certificate.
