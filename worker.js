// Routing in front of the static assets: clean URLs and legacy redirects.
// /minor and /minor-checker are served from minor.html / minor-checker.html
// by the assets layer's automatic HTML handling.
const REDIRECTS = {
  "/": "/minor",
  "/index.html": "/minor",
  "/minor.html": "/minor",
  "/checker": "/minor-checker",
  "/checker.html": "/minor-checker",
  "/minor-checker.html": "/minor-checker",
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === "nusu.town" || url.hostname === "www.nusu.town") {
      return Response.redirect("https://uci.nus.edu.sg/resources/faqs/campus-services-utown/", 301);
    }
    const target = REDIRECTS[url.pathname];
    if (target) {
      return Response.redirect(url.origin + target + url.search, 301);
    }
    return env.ASSETS.fetch(request);
  },
};
