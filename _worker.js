// TOOL REDIRECTS START
const TOOL_REDIRECTS = {
  "/tools/usa/prepayment": "/tools/usa/amortization",
  "/tools/usa/extra-payments": "/tools/usa/amortization",
  "/tools/usa/ho1": "/tools/usa/homeowner-insurance",
  "/tools/usa/ho3": "/tools/usa/homeowner-insurance",
  "/tools/usa/ho5": "/tools/usa/homeowner-insurance",
  "/tools/usa/wildfire": "/tools/usa/homeowner-insurance",
  "/tools/canada/prepayment": "/tools/canada/amortization",
  "/tools/canada/refinance": "/tools/canada/renewal",
  "/tools/canada/credit-quote": "/tools/canada/renewal",
  "/tools/canada/rate-comparison": "/tools/canada/renewal",
  "/tools/uk/overpayment": "/tools/uk/amortization",
  "/tools/uk/rate-comparison": "/tools/uk/remortgage",
  "/tools/uk/rental-yield": "/tools/uk/buy-to-let",
  "/tools/australia/overpayment": "/tools/australia/amortization",
  "/tools/australia/duty-by-state": "/tools/australia/stamp-duty",
  "/tools/australia/rate-comparison": "/tools/australia/refinance",
  "/tools/newzealand/purchase-budget": "/tools/newzealand/mortgage",
  "/tools/newzealand/first-home-loan": "/tools/newzealand/mortgage",
  "/tools/newzealand/overpayment": "/tools/newzealand/amortization",
  "/tools/newzealand/preapproval-budget": "/tools/newzealand/affordability",
  "/tools/newzealand/lvr-band": "/tools/newzealand/ltv",
  "/tools/newzealand/confirmed-support": "/tools/newzealand/first-home",
  "/tools/newzealand/deposit-builder": "/tools/newzealand/deposit",
  "/tools/newzealand/kiwisaver-home": "/tools/newzealand/kiwisaver-withdrawal",
  "/tools/newzealand/investment": "/tools/newzealand/rental-yield",
  "/tools/newzealand/lender-comparison": "/tools/newzealand/refinance",
  "/tools/india/personal-loan": "/tools/india/emi",
  "/tools/india/overpayment": "/tools/india/amortization",
  "/tools/india/bank-comparison": "/tools/india/refinance",
  "/tools/india/bank-hfc": "/tools/india/refinance",
  "/tools/india/credit-quote": "/tools/india/refinance",
  "/tools/india/duty-by-state": "/tools/india/stamp-duty",
  "/tools/india/gst-purchase": "/tools/india/gst",
  "/tools/india/tax-comparison": "/tools/india/income-tax",
  "/tools/india/pmay-housing": "/tools/india/pmay-subsidy",
  "/tools/europe/overpayment": "/tools/europe/amortization"
};
// TOOL REDIRECTS END
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // 1. Canonical hostname: www → non-www (301, no loop possible)
    if (url.hostname === "www.mortgageproglobal.com") {
      const canonical = new URL(request.url);
      canonical.hostname = "mortgageproglobal.com";
      return Response.redirect(canonical.toString(), 301);
    }

    const { pathname } = url;
    const toolPath = pathname.replace(/\.html$/, '').replace(/\/$/, '');
    if (TOOL_REDIRECTS[toolPath]) {
      const target = new URL(TOOL_REDIRECTS[toolPath], url);
      target.search = url.search;
      return Response.redirect(target.toString(), 301);
    }

    // 2. Direct Edge Handler: /robots.txt (Guaranteed 200 OK, instant response, full CORS)
    if (pathname === "/robots.txt") {
      if (request.method === "OPTIONS") {
        return new Response(null, {
          status: 204,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
            "Access-Control-Max-Age": "86400",
          },
        });
      }
      const robotsContent = `User-agent: *
Allow: /
Disallow: /Designs/

User-agent: Mediapartners-Google
Allow: /
Disallow: /Designs/

User-agent: Googlebot
Allow: /
Disallow: /Designs/

Sitemap: https://mortgageproglobal.com/sitemap.xml
`;
      return new Response(request.method === "HEAD" ? null : robotsContent, {
        status: 200,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "public, max-age=86400, s-maxage=86400",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
          "X-Content-Type-Options": "nosniff",
        },
      });
    }

    // 3. Direct Edge Handler: /ads.txt (Guaranteed 200 OK, Google AdSense verification, full CORS)
    if (pathname === "/ads.txt") {
      if (request.method === "OPTIONS") {
        return new Response(null, {
          status: 204,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
            "Access-Control-Max-Age": "86400",
          },
        });
      }
      const adsContent = "google.com, pub-1114757923146718, DIRECT, f08c47fec0942fa0\n";
      return new Response(request.method === "HEAD" ? null : adsContent, {
        status: 200,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "public, max-age=86400, s-maxage=86400",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
          "X-Content-Type-Options": "nosniff",
        },
      });
    }

    // 4. Preflight handling for /sitemap.xml
    if (pathname === "/sitemap.xml" && request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
          "Access-Control-Max-Age": "86400",
        },
      });
    }

    // 5. Edge API Endpoint: /api/rates
    if (pathname === "/api/rates") {
      if (request.method === "OPTIONS") {
        return new Response(null, {
          status: 204,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Max-Age": "86400",
          },
        });
      }

      // Read the deployed snapshot before selecting its versioned edge cache.
      let snapshot;
      try {
        const res = await env.ASSETS.fetch(new Request(new URL('/data/rates.json', url)));
        if (res.ok) snapshot = await res.json();
      } catch (_) {}
      if (!snapshot || snapshot.version !== 2 || !snapshot.rates) {
        return new Response(JSON.stringify({error: 'Rates temporarily unavailable'}), {
          status: 503, headers: {'Content-Type': 'application/json', 'Cache-Control': 'no-store'}
        });
      }
      const cache = caches.default;
      const cacheUrl = new URL('/api/rates', url);
      cacheUrl.searchParams.set('snapshot', snapshot.generatedAt);
      const cacheKey = new Request(cacheUrl);
      const cachedResponse = await cache.match(cacheKey);
      if (cachedResponse) return cachedResponse;
      // Reassess stored observations even when an upstream service is unavailable.
      for (const items of Object.values(snapshot.rates)) for (const item of Object.values(items)) {
        if (item.kind === 'historical') { item.status = 'stale'; item.isLive = false; }
        else if (item.kind === 'policy') { item.status = Date.parse(item.reviewAfter) >= Date.now() ? 'reference' : 'stale'; item.isLive = false; }
        else {
          const days = (Date.now() - Date.parse(item.effectiveDate)) / 86400000;
          const limit = item.cadence === 'weekly' || /Mortgage|5-Year/.test(item.instrument) ? 10 : 4;
          item.isLive = Number.isFinite(days) && days >= -1 && days <= limit;
          item.status = item.isLive ? 'live' : 'stale';
        }
      }

      // Public-source refresh. Never expose credentials in JSON or logs.
      const now = Date.now();
      const today = new Date(now).toISOString().slice(0, 10);
      const valid = (value, date) => {
        if (!['string', 'number'].includes(typeof value) || String(value).trim() === '' || !/^\d{4}-\d{2}-\d{2}$/.test(date || '')) return false;
        const number = Number(value), time = Date.parse(date);
        return Number.isFinite(number) && number >= 0 && number <= 50 && Number.isFinite(time)
          && new Date(time).toISOString().slice(0, 10) === date && time <= now + 86400000;
      };
      const specs = [
        {country: 'canada', name: 'boc', series: 'V39079', cadence: 'daily'},
        {country: 'canada', name: 'fixed5', series: 'V80691335', cadence: 'weekly'},
        {country: 'canada', name: 'prime', series: 'V80691311', cadence: 'weekly'}
      ];
      if (env.FRED_API_KEY) {
        for (const [series, name, cadence] of [['MORTGAGE30US', 'fixed30', 'weekly'], ['MORTGAGE15US', 'fixed15', 'weekly'], ['DPRIME', 'prime', 'daily'], ['DFF', 'fedEffective', 'daily']]) specs.push({country: 'usa', series, name, cadence});
      }
      await Promise.all(specs.map(async spec => {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 3200);
        try {
          let sourceUrl, upstream;
          if (spec.country === 'usa') {
            sourceUrl = 'https://fred.stlouisfed.org/series/' + spec.series;
            upstream = new URL('https://api.stlouisfed.org/fred/series/observations');
            for (const [key, value] of Object.entries({series_id: spec.series, api_key: env.FRED_API_KEY, file_type: 'json', sort_order: 'desc', limit: '5'})) upstream.searchParams.set(key, value);
          } else {
            sourceUrl = 'https://www.bankofcanada.ca/valet/observations/' + spec.series + '/json';
            upstream = sourceUrl + '?recent=5';
          }
          const response = await fetch(upstream, {signal: controller.signal});
          if (!response.ok) return;
          const json = await response.json();
          const obs = (json.observations || [])
            .filter(o => valid(spec.country === 'usa' ? o.value : o[spec.series]?.v, o.date || o.d))
            .reduce((latest, o) => !latest || (o.date || o.d) > (latest.date || latest.d) ? o : latest, null);
          if (!obs || !snapshot.rates[spec.country]?.[spec.name]) return;
          const rate = Number(spec.country === 'usa' ? obs.value : obs[spec.series].v), date = obs.date || obs.d;
          const item = snapshot.rates[spec.country][spec.name];
          if (item.effectiveDate && date < item.effectiveDate) return;
          const days = (now - Date.parse(date)) / 86400000, fresh = days <= (spec.cadence === 'weekly' ? 10 : 4);
          Object.assign(item, {rate, formatted: rate.toFixed(2) + '%', effectiveDate: date, lastVerified: today, sourceUrl, source: spec.country === 'usa' ? (spec.name.startsWith('fixed') ? 'Freddie Mac PMMS via FRED' : 'Federal Reserve Board H.15 via FRED') : 'Bank of Canada Valet API', kind: 'observation', cadence: spec.cadence, status: fresh ? 'live' : 'stale', isLive: fresh});
        } catch (_) {
          // Keep the original value and its actual last-verified date on failure.
        } finally { clearTimeout(timer); }
      }));

      // Update snapshot metadata
      snapshot.servedAt = new Date().toISOString();

      const apiResponse = new Response(JSON.stringify(snapshot), {
        status: 200,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Cache-Control": "public, max-age=21600, s-maxage=21600",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
        },
      });

      // Cache at edge for 6 hours
      try {
        await cache.put(cacheKey, apiResponse.clone());
      } catch (_) {}

      return apiResponse;
    }

    // 3. Pre-resolve extensionless clean URLs BEFORE touching env.ASSETS.
    //    env.ASSETS returns a self-referencing 307 for extensionless paths,
    //    causing ERR_TOO_MANY_REDIRECTS. We bypass that by fetching the
    //    .html file directly with a clean request (no copied headers).
    if (!pathname.includes(".") && pathname !== "/") {
      const slug = pathname.replace(/^\/+|\/+$/g, "");

      if (slug) {
        try {
          const htmlRes = await env.ASSETS.fetch(
            new Request(new URL(`/${slug}.html`, url).toString())
          );

          if (htmlRes.status === 200 || htmlRes.status === 304) {
            // Strip any Location header to prevent the browser from redirecting
            const headers = new Headers(htmlRes.headers);
            headers.delete("Location");
            return new Response(htmlRes.body, {
              status: 200,
              statusText: "OK",
              headers,
            });
          }
        } catch (e) {
          // Fall through to general asset handler
        }
      }
    }

    // 3. Everything else: static files (.css, .js, .txt, images, /index.html, etc.)
    try {
      const assetRes = await env.ASSETS.fetch(request);
      return assetRes;
    } catch (e) {
      return new Response("Not Found", { status: 404, headers: { "Content-Type": "text/plain; charset=utf-8" } });
    }
  },
};
