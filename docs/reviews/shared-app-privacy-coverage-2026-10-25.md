# Shared mobile-app policy coverage — 25 October 2026

The existing website policy URL, `https://mortgageproglobal.com/app-privacy-policy`, now covers the seven exact Android package identifiers supplied by the owner. No additional policy pages or app repositories are created or modified.

| Edition | Exact package identifier |
|---|---|
| USA - PITI | `com.reotech.mortgage_calculator` |
| Global | `com.reotech.mortgagepro_global` |
| Australia | `com.reotech.mortgage_calculator_au` |
| Canada | `com.reotech.mortgage_calculator.canada` |
| India | `com.reotech.mortgage_calculator_in` |
| New Zealand | `com.reotech.mortgage_calculator_nz` |
| Europe / EU | `com.reotech.mortgage_calculator_eu` |

The owner described USA, Global, Australia and Canada as published. Other release-status wording was ambiguous, so the public policy makes no per-app production/release-status claims. Coverage does not announce a launch or guarantee store/country availability. The explicitly typed seven-ID list governs the scope; no UK package or differently spelled EU/Canada identifier was inferred.

The shared scope defines “the app” as the listed installed app. Existing AdMob-mediated Meta, Liftoff/Vungle and Unity, Gemini/Groq AI, Firebase, reporting, feedback, privacy controls and retention/deletion disclosures are retained. Feature- and partner-dependent processing applies only when included/enabled in that edition/version. Listing a provider does not certify that all seven builds contain it. No new build, SDK inventory or regional/account configuration was independently inspected in this change.

The coverage table, page description and WebPage JSON-LD identify all seven apps. An “Apps and package IDs” section button links to `#covered-apps`; prior section fragments remain available. The table wraps long package identifiers on narrow screens. Deletion instructions now identify the selected installed app and explain that one package's local reset does not erase a different package's storage. Support requests should include the app/package identifier.

The same URL can be used as the common notice, while actual app links, Play Console privacy URLs/Data Safety entries, in-app disclosures and native consent behavior still need to match each released build. This website update does not set Play Console fields, publish SDK consent messages or certify legal compliance. [Google Play's User Data policy](https://support.google.com/googleplay/android-developer/answer/10144311?hl=en) was checked for the requirement to identify the app/developer and match actual handling; this report does not infer approval from package-list coverage.

Validation includes the 67-page source/link/privacy checker, reproducible document builds and targeted responsive/browser checks for every section button, exact visible/structured package identifiers, no-JavaScript navigation, overflow, contrast and policy-page ad exclusion. Final browser and production results are recorded in the implementation PR. External ad traffic is blocked during browser QA.

This change is confined to the website's common mobile-app privacy page, its source, scoped styles, builder, tests and this review. The earlier AdSense-readiness findings in root calculator pages are outside this task and are not represented as resolved here.
