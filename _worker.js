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

    // Fallback to serving static assets
    return env.ASSETS.fetch(request);
  }
};
