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

    // 2. Pre-resolve extensionless clean URLs BEFORE touching env.ASSETS.
    //    env.ASSETS returns a self-referencing 307 for extensionless paths,
    //    causing ERR_TOO_MANY_REDIRECTS. We bypass that by fetching the
    //    .html file directly with a clean request (no copied headers).
    if (!pathname.includes(".") && pathname !== "/") {
      const slug = pathname.replace(/^\/+|\/+$/g, "");

      if (slug) {
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

        // .html not found — fall through to serve a proper 404
      }
    }

    // 3. Everything else: static files (.css, .js, images, /index.html, etc.)
    //    Let ASSETS handle it directly. The root "/" resolves to index.html
    //    natively in the Workers Assets runtime.
    return env.ASSETS.fetch(request);
  },
};
