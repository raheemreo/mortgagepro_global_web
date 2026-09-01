export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // 1. Canonical hostname: www → non-www (301 once, no loop)
    if (url.hostname === "www.mortgageproglobal.com") {
      const canonicalUrl = new URL(request.url);
      canonicalUrl.hostname = "mortgageproglobal.com";
      return Response.redirect(canonicalUrl.toString(), 301);
    }

    const pathname = url.pathname;

    // 2. Pre-resolve clean extensionless URLs → serve .html directly
    // This runs BEFORE ASSETS.fetch() to avoid any ASSETS redirect loops.
    if (!pathname.includes(".") && pathname !== "/") {
      // Strip leading/trailing slashes to get the clean slug
      const slug = pathname.replace(/^\/+|\/+$/g, "");

      if (slug) {
        const htmlUrl = new URL(`/${slug}.html`, url);
        const htmlRes = await env.ASSETS.fetch(new Request(htmlUrl, request));

        if (htmlRes.ok || htmlRes.status === 304) {
          const headers = new Headers(htmlRes.headers);
          headers.delete("Location");
          return new Response(htmlRes.body, {
            status: 200,
            statusText: "OK",
            headers,
          });
        }
        // If .html doesn't exist, fall through to ASSETS for a proper 404
      }
    }

    // 3. Serve root index
    if (pathname === "/" || pathname === "") {
      const indexRes = await env.ASSETS.fetch(
        new Request(new URL("/index.html", url), request)
      );
      if (indexRes.ok || indexRes.status === 304) {
        const headers = new Headers(indexRes.headers);
        headers.delete("Location");
        return new Response(indexRes.body, {
          status: 200,
          statusText: "OK",
          headers,
        });
      }
    }

    // 4. Fetch the asset normally (handles .html, .css, .js, images, etc.)
    const response = await env.ASSETS.fetch(request);

    // 5. If ASSETS still returns a redirect for some reason, intercept it
    // to prevent browser-visible redirect loops.
    if (response.status === 307 || response.status === 308) {
      const location = response.headers.get("Location");
      if (location) {
        const redirectUrl = new URL(location, url);
        const sameHost = redirectUrl.hostname === url.hostname;
        const samePath =
          redirectUrl.pathname === url.pathname ||
          redirectUrl.pathname === url.pathname + "/";

        // Only intercept redirects that point back to the same path
        // (trailing-slash normalization). Fetch the .html version directly.
        if (sameHost && samePath && !url.pathname.includes(".")) {
          const slug = url.pathname.replace(/^\/+|\/+$/g, "") || "index";
          const htmlUrl = new URL(`/${slug}.html`, url);
          const htmlRes = await env.ASSETS.fetch(new Request(htmlUrl, request));

          if (htmlRes.ok || htmlRes.status === 304) {
            const headers = new Headers(htmlRes.headers);
            headers.delete("Location");
            return new Response(htmlRes.body, {
              status: 200,
              statusText: "OK",
              headers,
            });
          }
        }
      }
    }

    // 6. Return whatever ASSETS gave us (200, 404, etc.)
    return response;
  },
};