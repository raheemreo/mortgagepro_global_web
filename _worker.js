export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Redirect www.mortgageproglobal.com to mortgageproglobal.com
    if (url.hostname === "www.mortgageproglobal.com") {
      return Response.redirect(
        "https://mortgageproglobal.com" + url.pathname + url.search,
        301
      );
    }

    const pages = [
      "about",
      "contact",
      "privacy-policy",
      "terms-and-conditions",
      "disclaimer",
      "editorial-policy",
      "corrections-policy",
      "data-sources",
      "data-deletion-policy",
      "mortgage-faq"
    ];

    let pathname = url.pathname.replace(/^\/+|\/+$/g, "");
    if (pathname.endsWith(".html")) {
      pathname = pathname.slice(0, -5);
    }

    if (pages.includes(pathname)) {
      const pageUrl = new URL(`/${pathname}.html`, request.url);
      return env.ASSETS.fetch(new Request(pageUrl, request));
    }

    // Fallback to serving static assets
    return env.ASSETS.fetch(request);
  }
};
