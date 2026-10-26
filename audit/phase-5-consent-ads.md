# Phase 5 — consent integration and advertising exclusions

Implemented 26 October 2026.

- Denied Consent Mode defaults and `pauseAdRequests=1` run before the AdSense bootstrap. Unknown, failed, loading or incomplete consent does not resume requests. For applicable GDPR traffic the conservative gate requires completed provider data, an actual TC string, storage permission and Google's vendor permission. AdSense interprets the actual TCF data; no consent grant, string or human decision is forged. Provider-confirmed inapplicability is distinct from unknown.
- Revocation/settings calls now run through Google's supported callback queue and pause ad requests first. The genuine Google message must still be published in the owner's account; code does not create a certified CMP or prove that the message is live.
- `/privacy-settings` is a noindex, permanently ad-request-paused consent-only entry point. It loads the existing publisher tag for published Google messages and contains no ad units. Footer links from ad-free documents can reach this page; unavailable provider controls have real policy/contact guidance. This is not a homemade consent banner.
- Removed all 47 empty ad placeholders and their empty ad sidebars. Article layout uses the content column without reserving a blank ad rail. No ad unit was added or relocated.
- Source `ads.txt` now matches the already-correct worker output: only the requested Google DIRECT line. Unconfirmed source-only InMobi/reseller rows were removed; native app mediation and app-ads.txt were not changed.
- Privacy/Cookie policies explain the pause gate, actual Cloudflare performance measurement and website/app separation. No account publication, EEA network test, third-party certification or ad-fill verification is claimed.

Validation: consent-state regression tests cover failed/pending/refused/accepted/inapplicable states, revocation, queued invocation and the permanently ad-free controls page. All 582 Node tests and site-readiness validation pass at this checkpoint. Controlled unit/browser stubs test integration behavior only; they are not evidence of the real Google dialog in a region.

Owner-only evidence still required: published domain-specific Google GDPR message; actual EEA/UK/Swiss accept/reject/reopen signals; AdSense account status and enabled Auto Ads formats/placements. Until valid provider data arrives, advertising stays paused. This may suppress revenue where a message is missing or unavailable; it is the explicit conservative behavior, not a hidden approval claim.
