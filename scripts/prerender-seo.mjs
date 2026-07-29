// Post-build SEO injection (Approach B — no headless browser).
//
// GitHub Pages can't render per-route <head> server-side, and social/WhatsApp
// scrapers don't run JS — so every shared link would otherwise show the
// homepage preview. This script runs after `vite build` and writes a
// dist/<route>/index.html for each route in src/seo/seo.routes.json, with that
// route's own title / description / canonical / Open Graph / Twitter tags (and
// the Organization JSON-LD on the homepage) baked into the static HTML.
//
// It reads the SAME seo.routes.json the runtime <Seo> component uses, so the
// prerendered head and the client-navigation head never drift. The page body
// still renders via JS (Googlebot executes JS; scrapers only read the head).

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, join } from "node:path";

const ROOT = process.cwd();
const DIST = join(ROOT, "dist");

const seo = JSON.parse(readFileSync(resolve(ROOT, "src/seo/seo.routes.json"), "utf8"));
const template = readFileSync(join(DIST, "index.html"), "utf8");

const escAttr = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const escHtml = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function setTitle(html, title) {
  return html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escHtml(title)}</title>`);
}
function setMetaName(html, name, content) {
  const re = new RegExp(`(<meta\\s+name="${name}"\\s+content=")[^"]*(")`);
  return html.replace(re, `$1${escAttr(content)}$2`);
}
function setMetaProp(html, prop, content) {
  const re = new RegExp(`(<meta\\s+property="${prop}"\\s+content=")[^"]*(")`);
  return html.replace(re, `$1${escAttr(content)}$2`);
}
function setCanonical(html, url) {
  return html.replace(/(<link\s+rel="canonical"\s+href=")[^"]*(")/, `$1${escAttr(url)}$2`);
}
let count = 0;
for (const [route, entry] of Object.entries(seo.routes)) {
  const url = seo.siteUrl + (route === "/" ? "/" : route);
  const image = entry.ogImage || seo.defaultOgImage;

  let html = template;
  html = setTitle(html, entry.title);
  html = setMetaName(html, "title", entry.title);
  html = setMetaName(html, "description", entry.description);
  html = setCanonical(html, url);
  html = setMetaProp(html, "og:url", url);
  html = setMetaProp(html, "og:title", entry.title);
  html = setMetaProp(html, "og:description", entry.description);
  html = setMetaProp(html, "og:image", image);
  html = setMetaName(html, "twitter:url", url);
  html = setMetaName(html, "twitter:title", entry.title);
  html = setMetaName(html, "twitter:description", entry.description);
  html = setMetaName(html, "twitter:image", image);

  if (route === "/") {
    writeFileSync(join(DIST, "index.html"), html);
  } else {
    const dir = join(DIST, route.replace(/^\//, ""));
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, "index.html"), html);
  }
  count++;
}

console.log(`[prerender-seo] wrote per-route <head> for ${count} routes`);
