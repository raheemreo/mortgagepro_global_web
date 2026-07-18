# MortgagePro Global — Verified Performance Optimization Plan

Scope: homepage (`index.html`), Lighthouse run 18 Jul 2026, Performance 61 / FCP 4.9s / LCP 8.1s / TBT 70ms / CLS 0.

Every claim below was checked directly against the repository — no generic Lighthouse advice, no assumptions carried over from earlier drafts of this analysis.

---

## 1. Diagnosis

**The LCP element is text, not an image.** `index.html` line ~248 renders:

```html
<h1>Make Smarter<br><span class="accent">Mortgage Decisions</span><br>Worldwide</h1>
```

styled by `css/style.css` line 521:

```css
.hero-v2 h1 {
  font-size: clamp(2rem, 4.5vw, 3.2rem);
  font-weight: 800;
  color: #fff;
}
```

There is no `<img>`, no CSS `background-image`, and no `hero.avif` anywhere in the repo. The hero section (`.hero-v2`) is pure HTML/CSS (divs, gradients, a fake calculator mockup). This means **the entire LCP problem is font-loading latency**, not image loading — every optimization should point at getting that H1 painted in its correct weight as fast as possible.

**Font request chain (the actual bottleneck):**
`index.html` → `fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800` (750ms) → `fonts.gstatic.com/.../inter.woff2` (295ms, chained *after* the first request resolves). Two sequential round trips before the H1 can render in the right weight.

**Render-blocking CSS on the homepage — confirmed by checking the actual `<link>` tags, not assumed:**
```html
<link rel="stylesheet" href="/css/style.css">        <!-- 51KB raw / 10.5KB transferred, 630ms -->
<link rel="stylesheet" href="/css/accessibility.css"> <!-- 808 bytes, 480ms -->
```
`calculators.css` is **not** loaded on the homepage at all (it's calculator-page-only), so it's out of scope here.

**JS is already handled correctly.** All first-party scripts on the homepage use `defer`:
```html
<script src="/js/components.js" defer></script>
<script src="/js/rates.js" defer></script>
<script src="/js/accessibility.js" defer></script>
```
This is exactly why TBT is a clean 70ms — there's no JS-blocking problem to fix.

**The real third-party issue isn't a missing `async`, it's placement.** Both ad/analytics scripts already have `async`:
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?..."></script>
<script async src="https://www.googletagmanager.com/gtag/js?id=G-1DEVWXRXJP"></script>
```
But they're the **first two lines in `<head>`**, ahead of `<meta charset>`, the viewport tag, and the CSS/font links. `async` prevents them from blocking HTML parsing, but they still compete for network priority and bandwidth during the exact window the browser should be racing to fetch CSS and fonts. Moving them later in the document (without changing `async`) removes that contention without touching how ads actually load.

**Funding Choices is not a controllable script tag — this matters for any "delay consent" plan.** There is no explicit Funding Choices `<script>` anywhere in this repo. `fundingchoicesmessages.google.com` only appears in the CSP allow-list (`netlify.toml`, `vercel.json`), confirming it's injected automatically as a side effect of the AdSense tag itself. **Practical consequence: you cannot defer AdSense while keeping the consent banner prompt — they're coupled in this implementation.** Any plan that treats "delay ads" and "keep consent immediate" as two independent switches is wrong for this codebase. The honest tradeoff is a short, bounded delay (e.g. `requestIdleCallback` with a ~1s timeout fallback), not an arbitrary "3 seconds," so EU/UK visitors still see the banner promptly relative to your existing `wait_for_update: 500` consent-mode setting.

**Cache headers currently do nothing.** No `_headers` file exists anywhere in the repo. `netlify.toml` and `vercel.json` both define security headers, but the live site is served from **Cloudflare Pages** (confirmed by the `static.cloudflareinsights.com` beacon in the Lighthouse trace) — where cache headers are configured via a root-level `_headers` file, not those two config files. They are currently dead weight for caching purposes.

**Font weights actually in use — verified by grep, not guessed:**

| Weight | Uses in `style.css` | Where |
|---|---|---|
| 300 | 2 | small accent text, "+" symbol |
| 400 | 1 | base body text |
| 500 | 3 | minor UI text |
| 600 | 14 | subheadings, labels |
| 700 | 18 | buttons, emphasis |
| 800 | 5 | **`.hero-v2 h1` (the LCP element)**, `.stat-value`, `.mockup-result-value`, `.rate-card-value`, `.logo-text` |

All six weights are live in the design. None is free to cut — trimming any of them forces the browser to synthesize (fake-bold/fake-thin) that text, which is a real if small visual regression. Weight 800 specifically **must** stay, since it's on the LCP element itself.

---

## 2. Corrected Priority Plan

### Priority 1 — Self-host Inter, preload weight 800

Download the six weight files, serve from `/fonts/`, and preload the one the LCP element needs:

```html
<link rel="preload" href="/fonts/inter-800.woff2" as="font" type="font/woff2" crossorigin>
```

```css
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: url('/fonts/inter-300.woff2') format('woff2');
}
/* repeat for 400, 500, 600, 700 */
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 800;
  font-display: swap;
  src: url('/fonts/inter-800.woff2') format('woff2');
}
```

Remove the `fonts.googleapis.com` `<link rel="stylesheet">` and the two `preconnect` hints for it — they become dead weight once self-hosted. Collapses two sequential cross-origin round trips into one same-origin fetch.

### Priority 2 — Merge `accessibility.css` into `style.css`

Homepage-scoped: only these two files are loaded here, and `accessibility.css` is 808 bytes — not worth its own blocking request. Append its contents to the end of `style.css` and remove its `<link>` tag.

### Priority 3 — Preload the merged stylesheet

```html
<link rel="preload" href="/css/style.css" as="style" onload="this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="/css/style.css"></noscript>
```

### Priority 4 — Add a Cloudflare Pages `_headers` file (correct paths for this repo)

```
/css/*
  Cache-Control: public, max-age=31536000, immutable

/js/*
  Cache-Control: public, max-age=31536000, immutable

/fonts/*
  Cache-Control: public, max-age=31536000, immutable

/images/*
  Cache-Control: public, max-age=31536000, immutable
```

### Priority 5 — Move ad/analytics scripts below CSS/font requests in `<head>`

Keep `async` as-is; just reorder so `<meta charset>`, viewport, and the CSS/font preloads come first, and `adsbygoogle.js` / `gtag.js` come after. Optionally wrap AdSense initiation in a short bounded delay — acceptable given the Funding Choices coupling above, but keep it under ~1s so the consent banner isn't meaningfully delayed for EU/UK visitors.

### Priority 6 — Minify `style.css`

~2KB of easy, no-risk savings once merged with `accessibility.css`.

---

## 3. What earlier drafts of this analysis got wrong

Kept here for the record, since the plan above only makes sense in contrast to these:

- One draft's top-ranked fix (⭐⭐⭐⭐⭐) was preloading a `hero.avif` image that doesn't exist anywhere in this repo.
- The same draft recommended trimming Google Fonts to weights 400/600/700 — which would cut weight 800 off the H1, the actual LCP element.
- A later draft's `_headers` example cached `/assets/*`, `/fonts/*`, and `/images/*`, but omitted `/css/*` and `/js/*` — the two directories actually responsible for the render-blocking requests in this report — while `/assets/*` doesn't exist in this repo at all.
- Both drafts treated "delay AdSense" and "keep Funding Choices prompt" as independently achievable, without checking that Funding Choices isn't an explicit script in this codebase — it's a side effect of the AdSense tag itself.

---

## 4. Realistic expected outcome

Based on the specific bottlenecks confirmed above (not a generic Lighthouse benchmark):

| Metric | Current | Realistic target |
|---|---|---|
| Performance | 61 | 85–92 |
| FCP | 4.9s | ~1.5–2.2s |
| LCP | 8.1s | ~2.2–3.0s |
| TBT | 70ms | unchanged (already good) |
| CLS | 0 | unchanged (already perfect) |

Note the original report ran under Lighthouse's lab conditions (emulated Moto G Power, Slow 4G) — worth confirming against Search Console's Core Web Vitals field data once this ships, since real-world numbers are typically better than the lab worst case.
