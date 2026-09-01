export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Redirect www.mortgageproglobal.com to non-www
    if (url.hostname === "www.mortgageproglobal.com") {
      return Response.redirect(
        "https://mortgageproglobal.com" + url.pathname + url.search,
        301
      );
    }

    // Serve static assets directly via Cloudflare Pages / Static Assets
    return env.ASSETS.fetch(request);
  }
};
