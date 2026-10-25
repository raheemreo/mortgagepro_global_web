# Mobile app privacy publication and handoff — 25 October 2026

## Website work

The existing `/app-privacy-policy` URL is retained. Its outdated September text has been replaced by a reviewable Markdown source, reproducible HTML and metadata. The policy identifies **Mortgage Calculator USA - PITI**, Android package `com.reotech.mortgage_calculator`, publisher **REO Technologies**, contact **Abdul Raheem**, and the owner-confirmed receiving/forwarding address **support@mortgageproglobal.com**. The unconfirmed `privacy@` address and unverified legal-team/zero-data assurances were removed.

The mobile-app privacy page now has nine section links. Each button opens a stable native HTML fragment on the same policy, without requiring JavaScript. The owner's clarified scope is this mobile-app privacy page only: website privacy text, homepage, shared footer, general deletion page, calculators and mediation accounts are unchanged. Reading a disclosure does not operate a mobile UMP form or change app consent.

| Section | Published route | Disclosure |
|---|---|---|
| App identity | `/app-privacy-policy#app-privacy` | App, package, publisher and contact |
| AdMob | `/app-privacy-policy#google-admob` | Mobile Ads processing; separate website AdSense scope |
| Meta | `/app-privacy-policy#meta-audience-network` | AdMob-mediated partner, data purposes and provider controls |
| Liftoff / Vungle | `/app-privacy-policy#liftoff-monetize` | AdMob-mediated partner and current provider privacy/opt-out links |
| Unity Ads | `/app-privacy-policy#unity-ads` | AdMob-mediated advertising; no claim that the app uses Unity Engine |
| Privacy choices | `/app-privacy-policy#privacy-choices` | In-app Consent Settings, regional availability and separate website controls |
| AI | `/app-privacy-policy#ai-assistant` | Gemini primary / Groq fallback, off-device question/history processing, provider-dependent retention/training |
| AI reporting | `/app-privacy-policy#ai-reporting` | Optional Google Forms report, reviewed excerpt, possible sensitive content and version limits |
| Deletion | `/app-privacy-policy#data-deletion` | Local saved data, exports/backups, AI requests, reports, correspondence and provider-held records |

Other anchored sections cover Firebase Analytics/Crashlytics/Remote Config/FCM, feedback, permissions/network metadata, children/provider eligibility, rights and policy changes. Partners remain under **AdMob mediation only**. No SDK, independent partner loader, mobile account mapping or native code was added by this website change. The existing `app-ads.txt` seller records were not replaced or inferred from placement IDs.

## Evidence and its limits

1. The current Library file **Pasted text(20261025-083602).txt** was read. Its M3-B08 report records that live web policy/AI disclosures were outstanding, identifies Draft v2.1 and describes Google Forms AI-reporting behavior. It also records that Play Console declarations, AdMob CMP/mediation/crawler dashboard evidence and app runtime tests are outstanding. This report is supplied evidence, not a new execution of those tests.
2. Earlier Mortgage app conversation context supplies the owner-confirmed Liftoff and Unity mediation configuration, package identity, and the rule that AdMob remains the sole mediation platform. No new identifiers were requested or published in the policy.
3. The accessible private app repository was read at commit `99e4142f23ea6a1cdd8034f01ee863275dd4f048` (1 August 2026), its only available branch `master`, version `4.0.3+15`. Files read: `pubspec.yaml`, `AndroidManifest.xml`, `main.dart`, `firebase_service.dart`, `gemini_service.dart`, `consent_manager.dart`, `feedback_screen.dart`, `ai_assistant_screen.dart`, `privacy_policy.dart`, `settings_screen.dart`, `saved_provider.dart`, `calculator_draft_provider.dart` and `notification_provider.dart`.
4. That snapshot supports Gemini/Groq question-and-history transmission over HTTPS, Google Forms feedback with optional email, local saved calculations, notifications/cache, Firebase usage/crash/configuration services and a native Consent Settings entry point. It is older than the reported local `phase-m3-migration` version `4.0.6+18`; that branch and Draft v2.1 file are not available in the connected repository. The website replacement therefore does not claim a byte-for-byte publication of an unseen draft, independent verification of the latest local code or runtime delivery of all partner formats. AI reporting is qualified by installed-version availability and the reviewed B08 evidence.
5. The owner confirmed support mail reaches their Gmail and reported completing **website AdSense** Privacy & Messaging. Receiving/forwarding is confirmed by the owner, not by an email sent in this task. Website setup is not evidence of **mobile AdMob** UMP message publication.

## Current official references checked

- [Google Play user-data/privacy-policy requirements](https://support.google.com/googleplay/android-developer/answer/10144311?hl=en).
- [Google Play AI-generated-content reporting policy](https://support.google.com/googleplay/android-developer/answer/13985936?hl=en).
- [Google Mobile Ads data disclosures](https://developers.google.com/admob/android/privacy/play-data-disclosure) and [Flutter UMP controls](https://developers.google.com/admob/flutter/privacy).
- [AdMob Meta integration](https://developers.google.com/admob/flutter/mediation/meta), [Liftoff privacy](https://liftoff.ai/privacy-policy/) and [Unity app-user privacy](https://unity.com/legal/game-player-and-app-user-privacy-policy). Meta's privacy URL was also checked but returned its login/rate-limit wall in the research environment; the policy links to its standard official URL without copying unavailable text.
- [Firebase privacy/security](https://firebase.google.com/support/privacy).
- [Gemini API terms](https://ai.google.dev/gemini-api/terms): paid/unpaid processing differs; regional and under-18 restrictions require separate app/configuration review. No paid-tier or no-training assertion was invented.
- [Groq data handling](https://console.groq.com/docs/your-data): default inference non-retention is qualified by reliability/abuse logs, optional features, legal exceptions and account controls. No ZDR account setting was assumed.

## App-side carry-forward

These identities retain their original meaning. Publication of website content does not close the composite app requirements or alter the app's 62/80 accepted master baseline.

| Existing ID | Website portion delivered | Still needs app/account evidence |
|---|---|---|
| CF-B01-01 / REQ-64 | Updated public app policy at the existing URL | Actual installed app link/text and Play Console privacy URL alignment; reconcile the original Draft v2.1 against the latest local app |
| CF-B01-02 / REQ-65 | AI processing and reporting disclosures on the same policy page | Latest in-app reporting control/runtime, relevant Play Generative AI declaration and previously deferred app tests |
| CF-B01-03 / REQ-66 | Data-flow descriptions available to support Data Safety answers | Actual Play Console Data Safety answers/submission matching the release build |
| CF-B01-04 / CF-B01-05 | Named AdMob mediation partners disclosed | Authenticated mediation/partner mapping and actual adapter/ad-delivery evidence |
| CF-B01-06 / REQ-74 | Native consent instructions and links explained | Correct AdMob-app GDPR/US-state messages published; accept/reject/revisit and partner-signal runtime evidence |
| CF-B01-08 / REQ-79 | Existing public app-ads.txt remains available | Authenticated AdMob crawler status; HTTP availability is not crawler acceptance |

The accessible old app snapshot still contains Blogspot legal links and abbreviated in-app text. The latest local app agent should compare its actual links against `https://mortgageproglobal.com/app-privacy-policy`, with optional fragments from the table above. Changing the website cannot rewrite an installed app's link. It should also verify AI provider tier/regions and age eligibility, data controls, retention settings and any analytics/privacy toggles against the actual release. Those controls are not established by adding a policy paragraph.

No Flutter/Dart/Gradle build, device/emulator run, app release, Play submission, mobile CMP publication, partner-console change or credential operation was performed. This is website publication and source/document review, not legal certification or a claim that mobile runtime gates have passed.

## Verification

The site validator passes for 67 HTML pages, both article validators pass for all 43 articles, and all six build stages reproduce their generated output without drift. Targeted app-policy browser checks cover nine section buttons at 1280, 390 and 320 pixels, with and without JavaScript, copied deep links, ad exclusion, request isolation, overflow, and heading/link contrast. Representative light/dark screenshots are inspected. Final browser/deployment results are recorded in the implementation PR. Browser checks block external requests and never load or click live ads.
