export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // 1. Redirect www.mortgageproglobal.com to non-www
    if (url.hostname === "www.mortgageproglobal.com") {
      return Response.redirect(
        "https://mortgageproglobal.com" + url.pathname + url.search,
        301
      );
    }

    // 2. Fetch the asset directly
    let response = await env.ASSETS.fetch(request);

    // 3. If ASSETS returned 307 redirect pointing to the same clean URL,
    // intercept it, fetch the .html file, and return the content with HTTP 200 OK
    if (response.status === 307 || response.status === 308) {
      const loc = response.headers.get("Location");
      if (loc === url.pathname || loc === url.href || loc === url.pathname + "/") {
        let pathname = url.pathname.replace(/^\/+|\/+$/g, "");
        if (!pathname) pathname = "index";
        const htmlUrl = new URL(`/${pathname}.html`, request.url);
        const htmlRes = await env.ASSETS.fetch(new Request(htmlUrl, request));
        if (htmlRes.ok || htmlRes.status === 304) {
          const headers = new Headers(htmlRes.headers);
          headers.delete("Location");
          return new Response(htmlRes.body, {
            status: 200,
            statusText: "OK",
            headers
          });
        }
      }
    }

    // 4. If asset not found directly (e.g. extensionless clean URL),
    // attempt to serve the corresponding .html file with 200 OK
    if (response.status === 404) {
      let pathname = url.pathname.replace(/^\/+|\/+$/g, "");
      if (pathname && !pathname.includes(".")) {
        const htmlUrl = new URL(`/${pathname}.html`, request.url);
        const htmlRes = await env.ASSETS.fetch(new Request(htmlUrl, request));
        if (htmlRes.ok || htmlRes.status === 304) {
          const headers = new Headers(htmlRes.headers);
          headers.delete("Location");
          return new Response(htmlRes.body, {
            status: 200,
            statusText: "OK",
            headers
          });
        }
      }
    }

    return response;
  }
};
