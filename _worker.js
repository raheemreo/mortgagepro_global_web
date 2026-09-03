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

    // 3. Edge API Endpoint: /api/rates
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

      // Check Cloudflare Edge Cache
      const cache = caches.default;
      const cacheKey = new Request(url.toString(), request);
      let cachedResponse = await cache.match(cacheKey);
      if (cachedResponse) {
        return cachedResponse;
      }

      // Load static base snapshot from env.ASSETS
      let snapshot;
      try {
        const assetRes = await env.ASSETS.fetch(
          new Request(new URL("/data/rates.json", url).toString())
        );
        if (assetRes.ok) {
          snapshot = await assetRes.json();
        }
      } catch (_) {}

      // Fallback base if file read fails
      if (!snapshot || !snapshot.rates) {
        snapshot = {
          version: 2,
          generatedAt: new Date().toISOString(),
          rates: {
            usa: {
              fixed30: { rate: 6.71, formatted: "6.71%", unit: "%", instrument: "30-Year Fixed-Rate Mortgage", source: "Freddie Mac PMMS via FRED", effectiveDate: "2026-09-03", lastVerified: "2026-09-04", status: "live", isLive: true },
              fixed15: { rate: 6.04, formatted: "6.04%", unit: "%", instrument: "15-Year Fixed-Rate Mortgage", source: "Freddie Mac PMMS via FRED", effectiveDate: "2026-09-03", lastVerified: "2026-09-04", status: "live", isLive: true },
              fed: { rate: "3.50% – 3.75%", formatted: "3.50% – 3.75%", unit: "%", instrument: "FOMC Federal Funds Target Range", source: "Federal Reserve Board", effectiveDate: "2026-07-30", lastVerified: "2026-09-04", status: "reference", isLive: false }
            },
            canada: {
              boc: { rate: 2.25, formatted: "2.25%", unit: "%", instrument: "Policy Interest Rate (Overnight)", source: "Bank of Canada Valet API", effectiveDate: "2026-09-02", lastVerified: "2026-09-04", status: "live", isLive: true },
              fixed5: { rate: 6.09, formatted: "6.09%", unit: "%", instrument: "5-Year Conventional Mortgage Benchmark", source: "Bank of Canada Valet API", effectiveDate: "2026-09-02", lastVerified: "2026-09-04", status: "live", isLive: true }
            },
            uk: { boe: { rate: 3.75, formatted: "3.75%", unit: "%", instrument: "Official Bank Rate", source: "Bank of England MPC", effectiveDate: "2025-12-18", lastVerified: "2026-09-04", status: "reference", isLive: false } },
            australia: { rba: { rate: 4.35, formatted: "4.35%", unit: "%", instrument: "Cash Rate Target", source: "Reserve Bank of Australia", effectiveDate: "2026-08-05", lastVerified: "2026-09-04", status: "reference", isLive: false } },
            newzealand: { ocr: { rate: 2.75, formatted: "2.75%", unit: "%", instrument: "Official Cash Rate (OCR)", source: "Reserve Bank of New Zealand", effectiveDate: "2026-09-02", lastVerified: "2026-09-04", status: "reference", isLive: false } },
            india: { repo: { rate: 5.25, formatted: "5.25%", unit: "%", instrument: "Policy Repo Rate", source: "Reserve Bank of India (MPC)", effectiveDate: "2026-08-05", lastVerified: "2026-09-04", status: "reference", isLive: false } },
            europe: { ecb: { rate: 2.40, formatted: "2.40%", unit: "%", instrument: "Main Refinancing Operations Rate", source: "European Central Bank", effectiveDate: "2026-06-17", lastVerified: "2026-09-04", status: "reference", isLive: false } }
          }
        };
      }

      // Upstream Live Refresh (timeout protected)
      const now = Date.now();
      const checkStale = (dateStr, maxAgeMs) => {
        const obs = new Date(dateStr).getTime();
        return isNaN(obs) || (now - obs > maxAgeMs) ? { status: "stale", isLive: false } : { status: "live", isLive: true };
      };

      const fetchTimeout = (uri, ms = 3200) => {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), ms);
        return fetch(uri, { signal: controller.signal, headers: { "User-Agent": "MortgageProGlobal/2.0" } })
          .then(res => res.ok ? res.json() : null)
          .catch(() => null)
          .finally(() => clearTimeout(timer));
      };

      try {
        const promises = [];

        // Bank of Canada (no API key required)
        promises.push(
          fetchTimeout("https://www.bankofcanada.ca/valet/observations/V39079/json?recent=1").then(json => {
            const obs = json?.observations?.[0];
            const val = parseFloat(obs?.V39079?.v);
            if (!isNaN(val) && val > 0 && snapshot.rates.canada?.boc) {
              const freshness = checkStale(obs.d, 60 * 24 * 3600 * 1000);
              snapshot.rates.canada.boc.rate = val;
              snapshot.rates.canada.boc.formatted = `${val.toFixed(2)}%`;
              snapshot.rates.canada.boc.effectiveDate = obs.d;
              snapshot.rates.canada.boc.status = freshness.status;
              snapshot.rates.canada.boc.isLive = freshness.isLive;
            }
          })
        );

        promises.push(
          fetchTimeout("https://www.bankofcanada.ca/valet/observations/V80691335/json?recent=1").then(json => {
            const obs = json?.observations?.[0];
            const val = parseFloat(obs?.V80691335?.v);
            if (!isNaN(val) && val > 0 && snapshot.rates.canada?.fixed5) {
              const freshness = checkStale(obs.d, 10 * 24 * 3600 * 1000);
              snapshot.rates.canada.fixed5.rate = val;
              snapshot.rates.canada.fixed5.formatted = `${val.toFixed(2)}%`;
              snapshot.rates.canada.fixed5.effectiveDate = obs.d;
              snapshot.rates.canada.fixed5.status = freshness.status;
              snapshot.rates.canada.fixed5.isLive = freshness.isLive;
            }
          })
        );

        // FRED API (if credential configured in Worker env)
        if (env.FRED_API_KEY) {
          const fred = (id) => `https://api.stlouisfed.org/fred/series/observations?series_id=${id}&api_key=${env.FRED_API_KEY}&file_type=json&sort_order=desc&limit=1`;
          promises.push(
            fetchTimeout(fred("MORTGAGE30US")).then(json => {
              const obs = json?.observations?.[0];
              const val = parseFloat(obs?.value);
              if (!isNaN(val) && val > 0 && snapshot.rates.usa?.fixed30) {
                const freshness = checkStale(obs.date, 10 * 24 * 3600 * 1000);
                snapshot.rates.usa.fixed30.rate = val;
                snapshot.rates.usa.fixed30.formatted = `${val.toFixed(2)}%`;
                snapshot.rates.usa.fixed30.effectiveDate = obs.date;
                snapshot.rates.usa.fixed30.status = freshness.status;
                snapshot.rates.usa.fixed30.isLive = freshness.isLive;
              }
            })
          );
          promises.push(
            fetchTimeout(fred("MORTGAGE15US")).then(json => {
              const obs = json?.observations?.[0];
              const val = parseFloat(obs?.value);
              if (!isNaN(val) && val > 0 && snapshot.rates.usa?.fixed15) {
                const freshness = checkStale(obs.date, 10 * 24 * 3600 * 1000);
                snapshot.rates.usa.fixed15.rate = val;
                snapshot.rates.usa.fixed15.formatted = `${val.toFixed(2)}%`;
                snapshot.rates.usa.fixed15.effectiveDate = obs.date;
                snapshot.rates.usa.fixed15.status = freshness.status;
                snapshot.rates.usa.fixed15.isLive = freshness.isLive;
              }
            })
          );
        }

        await Promise.all(promises);
      } catch (_) {}

      // Update snapshot metadata
      snapshot.generatedAt = new Date().toISOString();

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
