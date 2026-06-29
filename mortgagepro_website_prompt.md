# MortgagePro Global v2.1 — Master Build Prompt
### SEO · AdSense · AI-Search · Accessibility · Analytics · Phased Launch
**By REO TECH | Updated: June 2026**

---

## Changelog: v2 → v2.1

| Area | v2 | v2.1 |
|------|-----|-------|
| `<meta name="keywords">` | Included | **Removed** — Google ignores it |
| Analytics & tracking | Not specified | **GA4 + Search Console + Bing Webmaster + IndexNow** |
| Header/footer maintenance | Duplicated in every HTML file | **`components.js` fetch pattern** — edit once |
| Phase 3 | Not defined | **Localization (Hindi/Malayalam) + Comparison pages** |
| Comparison content | Not mentioned | **Dedicated strategy with 10 target pages** |

---

## Project Overview

Build **MortgagePro Global** — a multi-page, traditional desktop/mobile website by **REO TECH** providing free mortgage calculators, home loan tools, and financial resources for 7 countries: USA, Canada, UK, Australia, New Zealand, India, and Europe.

**Core goals:**
1. Rank on Google for country-specific mortgage calculator keywords
2. Pass Google AdSense approval on first application
3. Appear in Google AI Overviews, ChatGPT, and Perplexity answers
4. Meet WCAG 2.1 AA accessibility standards
5. Score 90+ on Google Lighthouse on all pages
6. Instrument with GA4 and Search Console from day one

---

## Phased Launch Plan

### Phase 1 — Launch (Build First)
Minimum viable site for AdSense approval and initial SEO indexing.

| Page | URL | Priority |
|------|-----|----------|
| Homepage | `/index.html` | Critical |
| India EMI Calculator | `/india-home-loan-emi-calculator.html` | High — largest user base |
| USA Mortgage Calculator | `/usa-mortgage-calculator.html` | High — highest search volume |
| Global FAQ | `/mortgage-faq.html` | High — AdSense + AI Overviews |
| About | `/about.html` | Required for AdSense |
| Contact | `/contact.html` | Required for AdSense |
| Privacy Policy | `/privacy-policy.html` | Required for AdSense |
| Disclaimer | `/disclaimer.html` | Required for YMYL |
| `sitemap.xml` | `/sitemap.xml` | Required for indexing |
| `robots.txt` | `/robots.txt` | Required for indexing |
| `indexnow-key.txt` | `/[key].txt` | IndexNow fast indexing |

**Target: AdSense application within 3–4 weeks of Phase 1 launch.**

### Phase 2 — Expansion (After AdSense Approval)
| Page | URL |
|------|-----|
| Canada Mortgage Calculator | `/canada-mortgage-calculator.html` |
| UK Mortgage Calculator | `/uk-mortgage-calculator.html` |
| Australia Mortgage Calculator | `/australia-mortgage-calculator.html` |
| New Zealand Calculator | `/new-zealand-mortgage-calculator.html` |
| Europe Mortgage Calculator | `/europe-mortgage-calculator.html` |
| Blog Index | `/blog/index.html` |
| Blog Post 1 | `/blog/how-to-use-mortgage-calculator.html` |
| Blog Post 2 | `/blog/cmhc-insurance-canada-guide.html` |
| Blog Post 3 | `/blog/uk-stamp-duty-guide.html` |

### Phase 3 — Growth (3–6 Months Post-Launch)
| Content Type | Details |
|--------------|---------|
| Localized pages | India EMI Calculator in Hindi + Malayalam |
| Comparison pages | 10 high-intent comparison articles (see Phase 3 section) |
| Additional blog posts | Monthly cadence, India + USA focused |
| More country blog posts | Stamp duty guides, first-home buyer guides per country |

---

## Analytics & Instrumentation Setup

Set up all four tools **before** publishing any page. They must be in place from the first day of indexing.

### 1. Google Analytics 4 (GA4)

Add the GA4 snippet to every page, inside `<head>`, before the closing tag. Use a placeholder measurement ID that gets replaced at launch.

```html
<!-- Google Analytics 4 — add to every page <head> -->
<!-- Replace G-XXXXXXXXXX with your actual Measurement ID from analytics.google.com -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX', {
    anonymize_ip: true,       // GDPR compliance
    cookie_flags: 'SameSite=None;Secure'
  });
</script>
```

**GA4 events to track (add to `calculators.js`):**
```javascript
// Fire when user clicks Calculate button
gtag('event', 'calculator_used', {
  event_category: 'Calculator',
  event_label: 'india_emi',   // change per country
  value: 1
});

// Fire when amortization schedule is expanded
gtag('event', 'amortization_expanded', {
  event_category: 'Engagement',
  event_label: 'india_emi'
});
```

**Key GA4 metrics to monitor:**
- Organic traffic by page (confirms which country pages rank)
- Calculator engagement rate (are users actually calculating?)
- Bounce rate per page (content quality signal)
- Average session duration (time-on-page for AdSense RPM)

### 2. Google Search Console

**Setup steps (do before launch):**
1. Go to `search.google.com/search-console`
2. Add property → URL prefix → `https://yourdomain.com`
3. Verify ownership via HTML tag method — add this to every page `<head>`:

```html
<!-- Google Search Console verification — homepage only or all pages -->
<!-- Replace content value with your actual verification code -->
<meta name="google-site-verification" content="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX">
```

4. After verifying: Submit sitemap at `https://yourdomain.com/sitemap.xml`
5. Request indexing for each Phase 1 page manually via URL Inspection tool

**What to monitor in Search Console weekly:**
- Coverage → Indexed pages (confirm all Phase 1 pages are indexed)
- Performance → Queries (find keywords you're ranking for)
- Performance → Pages (find which pages get impressions)
- Core Web Vitals report (fix any Poor URLs immediately)
- Manual Actions (critical — check for any policy violations)

### 3. Bing Webmaster Tools

Bing powers DuckDuckGo, Yahoo, and Edge browser search. Worth 10–15% of search traffic and takes 10 minutes to set up.

1. Go to `bing.com/webmasters`
2. Import from Google Search Console (easiest method — imports your sitemap and verified property automatically)
3. Submit sitemap: `https://yourdomain.com/sitemap.xml`

```html
<!-- Bing verification tag — add to every page <head> -->
<meta name="msvalidate.01" content="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX">
```

### 4. IndexNow — Fast Indexing for Bing & Yandex

IndexNow lets you notify Bing and Yandex about new or updated pages instantly instead of waiting for crawl. Critical for a new site with no domain authority.

**Setup (one-time):**

Step 1 — Generate a key (any random alphanumeric string, 8–128 chars):
```
Example key: a1b2c3d4e5f6789012345678901234ab
```

Step 2 — Create the key file at the root of your site:
```
File: /a1b2c3d4e5f6789012345678901234ab.txt
Content: a1b2c3d4e5f6789012345678901234ab
```

Step 3 — Add this to `<head>` of every page:
```html
<meta name="indexnow-key" content="a1b2c3d4e5f6789012345678901234ab">
```

Step 4 — Ping Bing's IndexNow endpoint when you publish or update a page:
```javascript
// js/indexnow.js — run this after publishing/updating pages
// Can be called manually or via a simple Node script

async function pingIndexNow(urls) {
  const payload = {
    host: "yourdomain.com",
    key: "a1b2c3d4e5f6789012345678901234ab",
    keyLocation: "https://yourdomain.com/a1b2c3d4e5f6789012345678901234ab.txt",
    urlList: urls  // array of full URLs
  };

  const response = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload)
  });

  console.log("IndexNow status:", response.status);
  // 200 = accepted, 202 = queued, 400/422 = error
}

// Example: ping after Phase 1 launch
pingIndexNow([
  "https://yourdomain.com/",
  "https://yourdomain.com/india-home-loan-emi-calculator.html",
  "https://yourdomain.com/usa-mortgage-calculator.html",
  "https://yourdomain.com/mortgage-faq.html"
]);
```

**Note:** IndexNow does not affect Google — Google has its own crawl system. But Bing indexes new pages within hours via IndexNow, versus weeks via natural crawl.

---

## Shared Component System — `components.js`

Instead of duplicating the header and footer HTML across every page, use a lightweight fetch-based component injection. This means editing the header or footer in one file propagates to all pages automatically.

### File Structure Addition
```
/
├── components/
│   ├── header.html     ← Single source for all header HTML
│   └── footer.html     ← Single source for all footer HTML
└── js/
    └── components.js   ← Fetches and injects header + footer
```

### `components/header.html`
```html
<!-- Full header HTML here — no <html>, <head>, or <body> tags -->
<header class="site-header" role="banner">
  <div class="container">
    <a href="/" class="logo" aria-label="MortgagePro Global homepage">
      <img src="/images/logo.svg" alt="MortgagePro Global by REO TECH"
           width="180" height="40">
    </a>
    <nav aria-label="Main navigation" id="main-nav">
      <button class="hamburger-btn" aria-expanded="false"
              aria-controls="nav-menu" aria-label="Open navigation menu">
        <span aria-hidden="true">☰</span>
      </button>
      <ul id="nav-menu" role="list" class="nav-list">
        <li><a href="/">Home</a></li>
        <li><a href="/usa-mortgage-calculator.html">🇺🇸 USA</a></li>
        <li><a href="/india-home-loan-emi-calculator.html">🇮🇳 India</a></li>
        <li><a href="/canada-mortgage-calculator.html">🇨🇦 Canada</a></li>
        <li><a href="/uk-mortgage-calculator.html">🇬🇧 UK</a></li>
        <li><a href="/australia-mortgage-calculator.html">🇦🇺 Australia</a></li>
        <li><a href="/new-zealand-mortgage-calculator.html">🇳🇿 NZ</a></li>
        <li><a href="/europe-mortgage-calculator.html">🇪🇺 Europe</a></li>
        <li><a href="/mortgage-faq.html">FAQ</a></li>
        <li><a href="/blog/">Blog</a></li>
      </ul>
    </nav>
  </div>
</header>
```

### `components/footer.html`
```html
<!-- Full footer HTML here -->
<footer class="site-footer" role="contentinfo">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-col">
        <h3>MortgagePro Global</h3>
        <p>Free mortgage calculators for home buyers in USA, Canada, UK,
           Australia, New Zealand, India, and Europe. Built by REO TECH.</p>
      </div>
      <div class="footer-col">
        <h3>Country Tools</h3>
        <ul role="list">
          <li><a href="/india-home-loan-emi-calculator.html">🇮🇳 India EMI Calculator</a></li>
          <li><a href="/usa-mortgage-calculator.html">🇺🇸 USA Calculator</a></li>
          <li><a href="/canada-mortgage-calculator.html">🇨🇦 Canada Calculator</a></li>
          <li><a href="/uk-mortgage-calculator.html">🇬🇧 UK Calculator</a></li>
          <li><a href="/australia-mortgage-calculator.html">🇦🇺 Australia Calculator</a></li>
          <li><a href="/new-zealand-mortgage-calculator.html">🇳🇿 New Zealand Calculator</a></li>
          <li><a href="/europe-mortgage-calculator.html">🇪🇺 Europe Calculator</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h3>Resources</h3>
        <ul role="list">
          <li><a href="/mortgage-faq.html">Mortgage FAQ</a></li>
          <li><a href="/blog/">Blog & Guides</a></li>
          <li><a href="/about.html">About REO TECH</a></li>
          <li><a href="/contact.html">Contact</a></li>
          <li><a href="/privacy-policy.html">Privacy Policy</a></li>
          <li><a href="/disclaimer.html">Disclaimer</a></li>
        </ul>
      </div>
      <div class="footer-col footer-disclaimer">
        <h3>Important Disclaimer</h3>
        <p>All calculations are estimates only and do not constitute financial
           advice. Mortgage rates change daily. Always consult a licensed
           mortgage broker or financial advisor before making any financial
           decisions.</p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© <span id="footer-year"></span> REO TECH. All rights reserved.</p>
    </div>
  </div>
</footer>
```

### `js/components.js`
```javascript
// components.js — Fetches and injects shared header and footer
// Include this script on every page with: <script src="/js/components.js" defer></script>

(async function() {
  // Highlight the active nav link based on current URL
  function setActiveNav() {
    const path = window.location.pathname;
    document.querySelectorAll('.nav-list a').forEach(link => {
      const linkPath = new URL(link.href).pathname;
      if (linkPath === path || (path === '/' && linkPath === '/')) {
        link.setAttribute('aria-current', 'page');
        link.classList.add('active');
      }
    });
  }

  // Hamburger menu toggle
  function initHamburger() {
    const btn = document.getElementById('hamburger');
    const menu = document.getElementById('nav-menu');
    if (!btn || !menu) return;
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      btn.setAttribute('aria-label', expanded ? 'Open navigation menu' : 'Close navigation menu');
      menu.classList.toggle('open', !expanded);
    });
    // Close menu on outside click
    document.addEventListener('click', (e) => {
      if (!btn.contains(e.target) && !menu.contains(e.target)) {
        btn.setAttribute('aria-expanded', 'false');
        btn.setAttribute('aria-label', 'Open navigation menu');
        menu.classList.remove('open');
      }
    });
    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('open')) {
        btn.setAttribute('aria-expanded', 'false');
        menu.classList.remove('open');
        btn.focus();
      }
    });
  }

  // Dynamic footer year
  function setFooterYear() {
    const yearEl = document.getElementById('footer-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  // Inject component HTML into placeholder elements
  async function injectComponent(selector, url) {
    const target = document.querySelector(selector);
    if (!target) return;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Failed to load ${url}`);
      target.innerHTML = await res.text();
    } catch (err) {
      console.warn('Component load failed:', err);
    }
  }

  // Load header and footer in parallel
  await Promise.all([
    injectComponent('[data-component="header"]', '/components/header.html'),
    injectComponent('[data-component="footer"]', '/components/footer.html')
  ]);

  // Initialize after injection
  setActiveNav();
  initHamburger();
  setFooterYear();
})();
```

### How to Use in Every HTML Page
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- head content -->
  <script src="/js/components.js" defer></script>
</head>
<body>
  <a class="skip-link" href="#main-content">Skip to main content</a>

  <!-- Header placeholder — components.js fills this -->
  <div data-component="header"></div>

  <!-- Page-specific content -->
  <main id="main-content">
    <!-- ... -->
  </main>

  <!-- Footer placeholder — components.js fills this -->
  <div data-component="footer"></div>
</body>
</html>
```

**Important:** The `fetch()` approach requires the site to be served over HTTP/S (any web server or localhost). It will not work when opening HTML files directly from the file system (`file://` protocol). Use a local server during development: `npx serve .` or VS Code Live Server extension.

---

## Technical SEO — HTML Head (Every Page)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Primary SEO — NO meta keywords (Google ignores them) -->
  <title>[Primary Keyword] | MortgagePro Global by REO TECH</title>
  <meta name="description" content="[Unique 150–160 char description. Primary keyword in first 60 chars.]">
  <link rel="canonical" href="https://yourdomain.com/[page-slug]">
  <meta name="author" content="REO TECH">
  <meta name="robots" content="index, follow">

  <!-- Open Graph -->
  <meta property="og:title" content="[Page Title]">
  <meta property="og:description" content="[OG Description]">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://yourdomain.com/[page-slug]">
  <meta property="og:image" content="https://yourdomain.com/images/og-[page].jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:site_name" content="MortgagePro Global">
  <meta property="og:locale" content="en_US">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="[Page Title]">
  <meta name="twitter:description" content="[Description]">
  <meta name="twitter:image" content="https://yourdomain.com/images/og-[page].jpg">

  <!-- Webmaster Verification -->
  <meta name="google-site-verification" content="REPLACE_WITH_GSC_CODE">
  <meta name="msvalidate.01" content="REPLACE_WITH_BING_CODE">
  <meta name="indexnow-key" content="REPLACE_WITH_INDEXNOW_KEY">

  <!-- Performance -->
  <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com">
  <link rel="dns-prefetch" href="https://www.googletagmanager.com">

  <!-- Google Analytics 4 -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){ dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX', { anonymize_ip: true });
  </script>

  <!-- Critical CSS — inlined for LCP -->
  <style>
    :root { --primary: #0B1D3A; --accent: #B91C1C; --bg: #F0F4FF; }
    body { margin: 0; font-family: 'Helvetica Neue', Arial, sans-serif;
           background: var(--bg); color: var(--primary);
           font-size: 16px; line-height: 1.6; }
    .skip-link { position: absolute; left: -9999px; top: 0; }
    .skip-link:focus { position: fixed; left: 0; top: 0; z-index: 99999;
                       background: #0B1D3A; color: #fff; padding: 12px 24px;
                       font-weight: 700; text-decoration: none; }
    [data-component] { min-height: 60px; } /* prevent CLS during component load */
  </style>

  <!-- Structured Data -->
  <script type="application/ld+json">{ ... }</script>

  <!-- Shared CSS -->
  <link rel="stylesheet" href="/css/style.css">
  <link rel="stylesheet" href="/css/accessibility.css">

  <!-- Components + Rates (defer — non-blocking) -->
  <script src="/js/components.js" defer></script>
  <script src="/js/rates.js" defer></script>
</head>
```

**Note on `<meta name="keywords">`:** This tag is completely removed in v2.1. Google officially stopped using it in 2009. Bing gives it negligible weight. Focus keyword effort on title tags, H1, first paragraph, and body content instead.

---

## Rate Data Management — `rates.js`

Single source of truth for all rate data. Update once monthly.

```javascript
// js/rates.js — Update this file monthly
// Last updated: June 2026

const RATES = {
  lastUpdated: "June 2026",
  lastUpdatedISO: "2026-06",

  usa: {
    fed: "5.25%",
    fixed30: "6.82%",
    fixed15: "6.11%",
    arm5: "6.45%",
    note: "Source: Freddie Mac Primary Mortgage Market Survey"
  },
  canada: {
    boc: "4.75%",
    fixed5: "4.99%",
    fixed3: "5.14%",
    variable: "5.95%",
    stressTest: "6.99%",
    note: "Source: Bank of Canada"
  },
  uk: {
    boe: "5.25%",
    fixed2: "4.75%",
    fixed5: "4.35%",
    tracker: "5.50%",
    note: "Source: Bank of England"
  },
  australia: {
    rba: "4.35%",
    variable: "6.09%",
    fixed2: "6.29%",
    fixed3: "6.15%",
    note: "Source: Reserve Bank of Australia"
  },
  newzealand: {
    ocr: "5.50%",
    floating: "8.64%",
    fixed1: "7.09%",
    fixed2: "6.75%",
    note: "Source: Reserve Bank of New Zealand"
  },
  india: {
    repo: "6.50%",
    homeLoanSbi: "8.50%",
    homeLoanHdfc: "8.70%",
    homeLoanIcici: "8.75%",
    note: "Source: Reserve Bank of India"
  },
  europe: {
    ecb: "4.00%",
    germany10yr: "3.85%",
    france20yr: "3.60%",
    spainVariable: "4.10%",
    note: "Source: European Central Bank"
  }
};

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-rate-updated]').forEach(el => {
    el.textContent = `Rates as of ${RATES.lastUpdated}. Verify with your lender.`;
  });
  document.querySelectorAll('[data-rate]').forEach(el => {
    const [country, key] = el.dataset.rate.split('.');
    if (RATES[country]?.[key]) el.textContent = RATES[country][key];
  });
});
```

**Usage in HTML:**
```html
<span class="rate-value" data-rate="india.repo">—</span>
<p class="rate-note" data-rate-updated></p>
```

---

## File & Folder Structure (Complete)

```
/
├── index.html
├── india-home-loan-emi-calculator.html       ← Phase 1
├── usa-mortgage-calculator.html              ← Phase 1
├── canada-mortgage-calculator.html           ← Phase 2
├── uk-mortgage-calculator.html               ← Phase 2
├── australia-mortgage-calculator.html        ← Phase 2
├── new-zealand-mortgage-calculator.html      ← Phase 2
├── europe-mortgage-calculator.html           ← Phase 2
├── mortgage-faq.html                         ← Phase 1
├── about.html                                ← Phase 1
├── contact.html                              ← Phase 1
├── privacy-policy.html                       ← Phase 1
├── disclaimer.html                           ← Phase 1
├── sitemap.xml                               ← Phase 1
├── robots.txt                                ← Phase 1
├── [indexnow-key].txt                        ← Phase 1
│
├── components/                               ← NEW in v2.1
│   ├── header.html
│   └── footer.html
│
├── css/
│   ├── style.css          (shared: reset, typography, header, footer, grid)
│   ├── calculators.css    (calculator widget styles)
│   └── accessibility.css  (focus states, skip link, high contrast)
│
├── js/
│   ├── components.js      (header/footer fetch + hamburger + active nav) ← NEW
│   ├── rates.js           (single source of truth for all rate data)
│   ├── calculators.js     (all calculator math + GA4 events)
│   ├── charts.js          (amortization chart — Canvas API, no library)
│   └── accessibility.js   (keyboard nav, focus trapping for modals)
│
├── blog/                                     ← Phase 2
│   ├── index.html
│   ├── how-to-use-mortgage-calculator.html
│   ├── cmhc-insurance-canada-guide.html
│   └── uk-stamp-duty-guide.html
│
├── compare/                                  ← Phase 3
│   ├── sbi-vs-hdfc-home-loan.html
│   ├── fixed-vs-floating-home-loan-india.html
│   ├── fha-vs-conventional-loan-usa.html
│   └── [other comparison pages]
│
└── images/
    ├── logo.svg
    ├── og-home.jpg         (1200×630px)
    ├── og-india.jpg
    ├── og-usa.jpg
    └── [og-[country].jpg per country]
```

---

## Structured Data — All 8 Schema Types

### 1. WebSite + SearchAction (Homepage only)
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "MortgagePro Global",
  "url": "https://yourdomain.com",
  "description": "Free mortgage calculators for USA, Canada, UK, Australia, New Zealand, India, and Europe.",
  "publisher": { "@type": "Organization", "name": "REO TECH" },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://yourdomain.com/mortgage-faq.html?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
```

### 2. Organization (Homepage + About)
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "REO TECH",
  "url": "https://yourdomain.com",
  "logo": "https://yourdomain.com/images/logo.svg",
  "description": "REO TECH builds free financial calculator tools for home buyers worldwide.",
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "contactreotechy@gmail.com",
    "contactType": "customer support"
  },
  "sameAs": []
}
```

### 3. WebApplication (Every calculator page)
```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "[Country] Mortgage Calculator",
  "url": "https://yourdomain.com/[slug]",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web",
  "browserRequirements": "Requires JavaScript",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "[ISO code]" },
  "creator": { "@type": "Organization", "name": "REO TECH" },
  "dateModified": "2026-06"
}
```

### 4. FAQPage (FAQ page + country page FAQ sections)
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "[Question text]",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "[Complete standalone answer — 2–3 sentences. No 'click here' or 'see above'.]"
    }
  }]
}
```

### 5. BreadcrumbList (All pages except homepage)
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://yourdomain.com" },
    { "@type": "ListItem", "position": 2, "name": "[Page Name]", "item": "https://yourdomain.com/[slug]" }
  ]
}
```

### 6. ItemList (Tool grid sections)
```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "[Country] Mortgage Tools",
  "numberOfItems": 10,
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "[Tool Name]", "url": "https://yourdomain.com/[slug]#[anchor]" }
  ]
}
```

### 7. Article (Blog posts)
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[Title]",
  "author": { "@type": "Organization", "name": "REO TECH Editorial Team" },
  "publisher": {
    "@type": "Organization",
    "name": "REO TECH",
    "logo": { "@type": "ImageObject", "url": "https://yourdomain.com/images/logo.svg" }
  },
  "datePublished": "2026-06-01",
  "dateModified": "2026-06-01",
  "mainEntityOfPage": { "@type": "WebPage", "@id": "https://yourdomain.com/blog/[slug]" }
}
```

### 8. HowTo (Calculator how-to sections)
```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Use the [Country] Mortgage Calculator",
  "step": [
    { "@type": "HowToStep", "position": 1, "name": "Enter home price", "text": "Type the property purchase price in the [Currency] field." },
    { "@type": "HowToStep", "position": 2, "name": "Set down payment", "text": "Enter your deposit as a percentage or amount." },
    { "@type": "HowToStep", "position": 3, "name": "Choose loan term", "text": "Select the mortgage term in years." },
    { "@type": "HowToStep", "position": 4, "name": "View results", "text": "Monthly payment, total interest, and [country output] appear instantly." }
  ]
}
```

---

## Accessibility Requirements (WCAG 2.1 AA)

### Skip Link
```html
<!-- First element inside <body> -->
<a class="skip-link" href="#main-content">Skip to main content</a>
```

```css
.skip-link { position: absolute; left: -9999px; width: 1px; height: 1px; overflow: hidden; }
.skip-link:focus {
  position: fixed; left: 0; top: 0; width: auto; height: auto;
  padding: 12px 24px; background: #0B1D3A; color: #fff;
  font-size: 16px; font-weight: 700; z-index: 99999;
  text-decoration: none; border-radius: 0 0 8px 0;
}
```

### Keyboard Navigation & Focus States
```css
:focus-visible { outline: 3px solid #005FCC; outline-offset: 3px; border-radius: 3px; }
*:focus:not(:focus-visible) { outline: none; }
/* Never: *:focus { outline: none; } — this breaks keyboard navigation */
```

### Calculator Input Pattern
```html
<div class="form-group">
  <label for="loan-amount">Loan Amount (₹)</label>
  <input type="number" id="loan-amount" name="loan-amount"
         min="100000" max="100000000" step="50000" value="5000000"
         aria-required="true" aria-describedby="loan-hint loan-error"
         autocomplete="off">
  <span id="loan-hint" class="field-hint">Enter the total home loan amount</span>
  <span id="loan-error" class="field-error" role="alert" aria-live="polite" hidden></span>
</div>
```

### Results Region (Screen Reader Announcement)
```html
<section id="calc-results" aria-label="Calculation results"
         aria-live="polite" aria-atomic="true">
  <!-- JS injects results here — screen readers announce changes -->
</section>
```

### Navigation ARIA (handled by components.js)
```html
<button class="hamburger-btn" aria-expanded="false"
        aria-controls="nav-menu" aria-label="Open navigation menu">
  <span aria-hidden="true">☰</span>
</button>
<ul id="nav-menu" role="list" class="nav-list">
  <li><a href="/" aria-current="page">Home</a></li>
  <!-- aria-current="page" set dynamically by components.js -->
</ul>
```

### Color Contrast Requirements
| Country | Verify These |
|---------|-------------|
| All | Body text on background: min 4.5:1 |
| India | White on #FF6B35 (saffron) — test before use |
| Europe | Dark text on #FFCC00 (EU gold) — test before use |
| All buttons | White on accent color — must pass 4.5:1 |

Use `webaim.org/resources/contrastchecker` to verify all combinations.

### Media Queries for Accessibility
```css
@media (prefers-color-scheme: dark) {
  :root { --bg: #0F172A; --text: #F1F5F9; --card-bg: #1E293B; --border: rgba(255,255,255,0.1); }
}
@media (forced-colors: active) {
  .card { border: 1px solid ButtonText; }
  .btn { forced-color-adjust: none; }
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
```

---

## AI-Search Optimization (Google AI Overviews, ChatGPT, Perplexity)

### Rule 1: "Quick Answer" Box at Top of Each Page
```html
<div class="quick-answer" role="note" aria-label="Quick Summary">
  <p class="qa-label">Quick Answer</p>
  <p>The <strong>India home loan EMI calculator</strong> helps you calculate your
     monthly EMI based on loan amount, interest rate, and tenure. For a ₹50 lakh
     loan at 8.50% for 20 years, the monthly EMI is approximately ₹43,391.</p>
</div>
```

### Rule 2: Definition Paragraph Under Every H2
```html
<h2>What is EMI in a Home Loan?</h2>
<p class="definition-para">
  <strong>EMI (Equated Monthly Instalment)</strong> is the fixed monthly payment
  a borrower makes to repay a home loan in India. Each EMI consists of a principal
  component and an interest component, calculated using the formula:
  EMI = P × r × (1+r)ⁿ / ((1+r)ⁿ - 1), where P is principal, r is monthly
  interest rate, and n is the number of months.
</p>
```

### Rule 3: Standalone FAQ Answers
Every answer must be a complete, self-contained paragraph — no pronouns referring to the question.
```html
<!-- Wrong -->
<p>It is currently 6.50% as set by RBI.</p>

<!-- Correct -->
<p>The Reserve Bank of India's (RBI) repo rate is currently 6.50% as of June 2026.
   This rate directly influences home loan interest rates offered by banks like SBI,
   HDFC, and ICICI, with most floating-rate home loans priced at repo rate + a spread.</p>
```

### Rule 4: Data Tables for Comparisons
```html
<table>
  <caption>Home Loan Interest Rates by Bank — India June 2026</caption>
  <thead>
    <tr><th scope="col">Bank</th><th scope="col">Rate (p.a.)</th><th scope="col">Type</th></tr>
  </thead>
  <tbody>
    <tr><td>State Bank of India (SBI)</td><td data-rate="india.homeLoanSbi">—</td><td>Floating (RLLR)</td></tr>
    <tr><td>HDFC Bank</td><td data-rate="india.homeLoanHdfc">—</td><td>Floating (RLLR)</td></tr>
    <tr><td>ICICI Bank</td><td data-rate="india.homeLoanIcici">—</td><td>Floating (RLLR)</td></tr>
  </tbody>
</table>
```

### Rule 5: Conversational H3 Headings in FAQs
```html
<!-- Matches voice search and AI query patterns -->
<h3>How much home loan can I get on a ₹50,000 salary in India?</h3>
<h3>What is the difference between fixed and floating home loan rates?</h3>
<h3>Is home loan interest tax-deductible in India?</h3>
```

### Rule 6: Cite Sources Explicitly
```html
<p class="source-note">
  Source: <a href="https://www.rbi.org.in" target="_blank" rel="noopener noreferrer">
  Reserve Bank of India</a> — <span data-rate-updated></span>
</p>
```

---

## Country Page Structure

### HTML Section Order (All 7 Countries)
```
1.  Breadcrumb nav
2.  H1 + subtitle + Quick Answer box
3.  Rate strip (rates.js powered)
4.  [AdSense Unit 1 — Leaderboard]
5.  Main calculator widget (WebApplication schema)
6.  [AdSense Unit 2 — Mid-content]
7.  Tool cards grid (ItemList schema)
8.  SEO content article (600+ words, HowTo schema)
9.  Data tables (rates, tiers, fees)
10. [AdSense Unit 3 — Mid-content]
11. FAQ section (FAQPage schema)
12. Official resource links
13. Related country pages (internal links)
14. [AdSense Unit 4 — Below content]
```

### H1 Per Country
```
India:       India Home Loan EMI Calculator 2026 — Free RBI-Based Tool
USA:         USA Mortgage Calculator 2026 — PITI, PMI, FHA, VA & USDA Loans
Canada:      Canada Mortgage Calculator 2026 — CMHC, Stress Test & Amortization
UK:          UK Mortgage Calculator 2026 — Stamp Duty, SDLT & Monthly Repayment
Australia:   Australia Mortgage Calculator 2026 — LMI, Offset Account & Stamp Duty
New Zealand: New Zealand Home Loan Calculator 2026 — LVR, KiwiSaver & OCR Rate
Europe:      Europe Mortgage Calculator 2026 — Germany, France, Spain & ECB Rate
```

### Country-Specific Calculator Defaults & Outputs

| Country | Min Down | Default Price | Max Term | Extra Output |
|---------|----------|---------------|----------|-------------|
| India | 10% | ₹50,00,000 | 30yr | EMI + tax benefit (Sec 24, 80C, 80EEA) |
| USA | 3.5% (FHA) | $400,000 | 30yr | PMI if LTV>80%, PITI breakdown |
| Canada | 5% | CA$650,000 | 25yr | CMHC premium, stress test pass/fail |
| UK | 5% | £380,000 | 35yr | SDLT breakdown with FTB relief |
| Australia | 5% | AU$750,000 | 30yr | LMI premium if deposit <20% |
| New Zealand | 5% | NZ$750,000 | 30yr | LVR warning if deposit <20% |
| Europe | 10% | €420,000 | 25yr | Country selector, notary fee estimate |

---

## AdSense Ad Placement

```html
<!-- Unit 1: Below H1, above calculator -->
<div class="ad-unit ad-leaderboard" aria-label="Advertisement" role="complementary">
  <!-- AdSense: Responsive — data-ad-slot="UNIT1" -->
</div>

<!-- Unit 2: After calculator, before tools -->
<div class="ad-unit ad-mid" aria-label="Advertisement" role="complementary">
  <!-- AdSense: Responsive — data-ad-slot="UNIT2" -->
</div>

<!-- Unit 3: Between content H2 sections (min 3 paragraphs above and below) -->
<div class="ad-unit ad-mid" aria-label="Advertisement" role="complementary">
  <!-- AdSense: Responsive — data-ad-slot="UNIT3" -->
</div>

<!-- Unit 4: Sticky sidebar — desktop 1024px+ only -->
<aside class="ad-sidebar" aria-label="Advertisement" role="complementary">
  <!-- AdSense: 300x600 — data-ad-slot="UNIT4" -->
</aside>

<!-- Unit 5: Below all content, before footer -->
<div class="ad-unit ad-below-content" aria-label="Advertisement" role="complementary">
  <!-- AdSense: Responsive — data-ad-slot="UNIT5" -->
</div>
```

```css
/* Placeholder styling pre-approval */
.ad-unit {
  background: #F8FAFC; border: 1px dashed #CBD5E1; border-radius: 8px;
  min-height: 90px; display: flex; align-items: center; justify-content: center;
  color: #94A3B8; font-size: 12px; margin: 24px 0;
}
.ad-unit::before { content: 'Advertisement'; }
.ad-sidebar { min-height: 250px; }
```

---

## Design System

### Country CSS Variables
```css
/* Set in <style> block in each page's <head> */
/* India */ :root { --page-primary:#0B2F3A; --page-accent:#FF6B35; --page-bg:#FFF8F0; }
/* USA */   :root { --page-primary:#0B1D3A; --page-accent:#B91C1C; --page-bg:#F0F4FF; }
/* Canada */ :root { --page-primary:#0A2E1A; --page-accent:#C8102E; --page-bg:#F0F7F4; }
/* UK */    :root { --page-primary:#0D0D2B; --page-accent:#C8102E; --page-bg:#F5F5F8; }
/* AU */    :root { --page-primary:#1A0A00; --page-accent:#002868; --page-bg:#FFF8F0; }
/* NZ */    :root { --page-primary:#003049; --page-accent:#00843D; --page-bg:#F0F8FF; }
/* EU */    :root { --page-primary:#003399; --page-accent:#FFCC00; --page-bg:#F7F3FF; }
```

### Responsive Breakpoints
```css
.container { max-width: 1280px; margin: 0 auto; padding: 0 20px; }
.tool-grid { display: grid; grid-template-columns: 1fr; gap: 16px; }
@media (min-width: 768px)  { .tool-grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) {
  .page-layout { display: grid; grid-template-columns: 1fr 300px; gap: 32px; }
  .tool-grid   { grid-template-columns: repeat(3, 1fr); }
}
```

### Typography
```css
h1,h2,h3,h4 { font-family: Georgia, 'Times New Roman', serif; }
body,input,select,button { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; }
body { font-size: 16px; line-height: 1.6; }
h1 { font-size: clamp(1.75rem, 4vw, 2.5rem); }
h2 { font-size: clamp(1.375rem, 3vw, 1.875rem); }
h3 { font-size: clamp(1.125rem, 2.5vw, 1.375rem); }
```

---

## Phase 3 — Localization Strategy

Build after Phase 2 is stable and generating organic traffic.


**Implementation notes:**
- Calculator logic stays in English (`calculators.js`) — only UI labels translate
- Use `<html lang="hi">` and `hreflang` tags
- Add `hreflang` alternate link on the English page pointing to Hindi:

```html
<!-- On /india-home-loan-emi-calculator.html -->
<link rel="alternate" hreflang="hi" href="https://yourdomain.com/hi/home-loan-emi-calculator.html">
<link rel="alternate" hreflang="en" href="https://yourdomain.com/india-home-loan-emi-calculator.html">

<!-- On /hi/home-loan-emi-calculator.html -->
<link rel="alternate" hreflang="en" href="https://yourdomain.com/india-home-loan-emi-calculator.html">
<link rel="alternate" hreflang="hi" href="https://yourdomain.com/hi/home-loan-emi-calculator.html">
```


**Practical note:** For Phase 3, translate only the UI labels (form labels, result labels, headings, FAQ questions). Keep all JavaScript logic in English. Use a simple `i18n.js` config:


---

## Phase 3 — Comparison Pages Strategy

Comparison pages capture high-intent mid-funnel searches that calculator pages miss. They also attract natural backlinks from finance blogs and news sites.

### Target Pages (`/compare/`)

| Page | URL | Target Keyword |
|------|-----|----------------|
| SBI vs HDFC Home Loan | `/compare/sbi-vs-hdfc-home-loan.html` | "SBI vs HDFC home loan" |
| Fixed vs Floating Rate India | `/compare/fixed-vs-floating-home-loan-india.html` | "fixed vs floating home loan India" |
| FHA vs Conventional Loan USA | `/compare/fha-vs-conventional-loan-usa.html` | "FHA vs conventional loan" |
| FHA vs VA Loan | `/compare/fha-vs-va-loan-usa.html` | "FHA vs VA loan" |
| Canada Fixed vs Variable | `/compare/canada-fixed-vs-variable-mortgage.html` | "Canada fixed vs variable mortgage" |
| CMHC vs No CMHC | `/compare/cmhc-vs-no-cmhc-mortgage-canada.html` | "CMHC insurance worth it Canada" |
| UK Repayment vs Interest Only | `/compare/uk-repayment-vs-interest-only-mortgage.html` | "repayment vs interest only mortgage UK" |
| Australia P&I vs Interest Only | `/compare/australia-principal-interest-vs-interest-only.html` | "P&I vs interest only Australia" |
| 20 vs 30 Year Mortgage USA | `/compare/20-year-vs-30-year-mortgage-usa.html` | "20 year vs 30 year mortgage" |
| Offset vs Redraw Australia | `/compare/offset-account-vs-redraw-facility-australia.html` | "offset account vs redraw facility" |

### Comparison Page Template Structure

```
H1: [Option A] vs [Option B]: Which is Better for [Country] Home Buyers? (2026)
Quick Answer box: 1-paragraph direct answer to "which is better"
[AdSense Unit 1]
H2: What is [Option A]?         ← Definition paragraph (AI Overview bait)
H2: What is [Option B]?         ← Definition paragraph
H2: [Option A] vs [Option B] — Key Differences
  [Comparison table with <caption>]
H2: When to Choose [Option A]   ← Bullet list with explanations
H2: When to Choose [Option B]   ← Bullet list with explanations
H2: [Option A] vs [Option B] — Real Example with Calculator
  [Embed the relevant calculator widget]
[AdSense Unit 2]
H2: Frequently Asked Questions
  [4–6 Q&As with FAQPage schema]
H2: Related Calculators          ← Internal links
[AdSense Unit 3]
```

**Why comparison pages outperform calculator pages for backlinks:**
- Finance bloggers, journalists, and real estate sites link to "X vs Y" articles when explaining options to readers
- They rank for longer, more specific queries with lower competition
- They naturally include calculator embeds, keeping users on-page longer (improves RPM)

---

## AdSense Pre-Application Checklist

### Content
- [ ] All Phase 1 pages: 500+ words of original content
- [ ] FAQ page: 30+ complete Q&A pairs
- [ ] No Lorem ipsum placeholder text anywhere
- [ ] No scraped, copied, or duplicate content
- [ ] Disclaimer on every page (or in footer)

### Policy Pages (Must be complete — not placeholder)
- [ ] `/privacy-policy.html` — Covers: data collection, cookies, GA4, AdSense
- [ ] `/disclaimer.html` — States: estimates only, not financial advice
- [ ] `/contact.html` — Working email: reodevelopers@gmail.com
- [ ] `/about.html` — Who REO Technologies is, what the site does

### Technical
- [ ] HTTPS enabled (check hosting panel)
- [ ] No broken links (use `broken-link-checker` npm package)
- [ ] All Phase 1 pages indexed (verify in Google Search Console)
- [ ] Sitemap submitted to Search Console
- [ ] IndexNow pinged for all Phase 1 URLs
- [ ] Mobile-friendly (test: search.google.com/test/mobile-friendly)
- [ ] Lighthouse score ≥ 90 performance on Phase 1 pages
- [ ] Ad placeholder divs present but empty

### AdSense-Specific
- [ ] Site live for minimum 2–4 weeks before applying
- [ ] At least 20–30 organic sessions/day (check GA4)
- [ ] No "click here", "visit our sponsor", or similar text near ad divs
- [ ] No ads inside nav menus or footers
- [ ] All ad containers have `aria-label="Advertisement"`
- [ ] Ads not stacked without content between them

---

## Performance & Core Web Vitals

| Metric | Target | Method |
|--------|--------|--------|
| LCP | < 2.5s | Inline critical CSS; no render-blocking JS |
| INP | < 200ms | Lightweight calculator logic; defer all non-critical JS |
| CLS | < 0.1 | Explicit `width`/`height` on images; `min-height` on ad units and `[data-component]` placeholders |
| Lighthouse Performance | ≥ 90 | All of the above |
| Lighthouse SEO | 100 | All meta tags, canonical, schema correct |
| Lighthouse Accessibility | ≥ 95 | All WCAG 2.1 AA requirements met |

```html
<!-- Explicit image dimensions — prevents CLS -->
<img src="/images/logo.svg" alt="MortgagePro Global" width="180" height="40">

<!-- Min-height on component placeholders — prevents CLS during fetch -->
<style>
  [data-component="header"] { min-height: 64px; }
  [data-component="footer"] { min-height: 200px; }
</style>

<!-- Ad unit min-height — prevents CLS when ads load -->
<div class="ad-unit" style="min-height: 90px;"></div>
```

---

## sitemap.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://yourdomain.com/</loc>
       <lastmod>2026-06-01</lastmod><changefreq>monthly</changefreq><priority>1.0</priority></url>
  <url><loc>https://yourdomain.com/india-home-loan-emi-calculator.html</loc>
       <lastmod>2026-06-01</lastmod><changefreq>monthly</changefreq><priority>0.9</priority></url>
  <url><loc>https://yourdomain.com/usa-mortgage-calculator.html</loc>
       <lastmod>2026-06-01</lastmod><changefreq>monthly</changefreq><priority>0.9</priority></url>
  <url><loc>https://yourdomain.com/mortgage-faq.html</loc>
       <lastmod>2026-06-01</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://yourdomain.com/about.html</loc>
       <lastmod>2026-06-01</lastmod><changefreq>yearly</changefreq><priority>0.5</priority></url>
  <url><loc>https://yourdomain.com/contact.html</loc>
       <lastmod>2026-06-01</lastmod><changefreq>yearly</changefreq><priority>0.5</priority></url>
  <url><loc>https://yourdomain.com/privacy-policy.html</loc>
       <lastmod>2026-06-01</lastmod><changefreq>yearly</changefreq><priority>0.3</priority></url>
  <url><loc>https://yourdomain.com/disclaimer.html</loc>
       <lastmod>2026-06-01</lastmod><changefreq>yearly</changefreq><priority>0.3</priority></url>
  <!-- Add Phase 2 and Phase 3 URLs as pages are published -->
</urlset>
```

---

## Important Build Notes

1. **No `<meta name="keywords">`** — Removed entirely. Google has ignored it since 2009. Put keyword effort into title, H1, first paragraph, and body content.

2. **No Flutter constraints** — Full 1280px desktop layout. No `max-width: 420px`.

3. **`rates.js` is the single source of truth** — Never hardcode rate values in HTML. Always use `data-rate` attributes.

4. **`components.js` requires a web server** — The `fetch()` approach does not work with `file://` URLs. Use `npx serve .` or VS Code Live Server for local development.

5. **Dynamic footer year** — Handled by `components.js` via `new Date().getFullYear()`. Never hardcode the year.

6. **GA4 from day one** — Add the GA4 snippet before publishing any page. You need traffic data before applying for AdSense and for monitoring which pages rank.

7. **IndexNow after every publish/update** — Run the ping script after publishing new pages or updating rates. Costs nothing, speeds up Bing indexing significantly.

8. **E-E-A-T signals on every page:**
   - "About This Calculator" section crediting REO TECH
   - Methodology note: "Uses standard compound interest formula"
   - Last updated date via `data-rate-updated`
   - Official central bank source links

9. **Internal linking rule** — Every country page links to ≥ 3 other country pages + ≥ 1 FAQ anchor. Every comparison page links to the relevant calculator page.

10. **India page is Priority 1** — Build `/india-home-loan-emi-calculator.html` first. Largest mobile-first audience, highest search volume in your primary market, direct overlap with existing app users, and lowest competition relative to search volume compared to the USA page.

11. **Never use `target="_blank"` without `rel="noopener noreferrer"`**

12. **Test accessibility before launch** — Run each Phase 1 page through `wave.webaim.org` and fix all errors before submitting for AdSense.
