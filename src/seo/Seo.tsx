// Per-route <head> at runtime. Reads the same seo.routes.json that the
// build-time injector (scripts/prerender-seo.mjs) uses, so client navigation
// and the prerendered static HTML never drift. Routes absent from the config
// (e.g. /gollazo) simply fall back to the defaults in index.html.
import { Helmet } from "react-helmet-async";
import seo from "./seo.routes.json";

interface SeoProps {
  route: string;
}

const Seo = ({ route }: SeoProps) => {
  const entry = (seo.routes as Record<string, { title: string; description: string; ogImage?: string }>)[route];
  if (!entry) return null;

  const url = seo.siteUrl + (route === "/" ? "/" : route);
  const image = entry.ogImage || seo.defaultOgImage;

  return (
    <Helmet>
      <title>{entry.title}</title>
      <meta name="title" content={entry.title} />
      <meta name="description" content={entry.description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={entry.title} />
      <meta property="og:description" content={entry.description} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={entry.title} />
      <meta name="twitter:description" content={entry.description} />
      <meta name="twitter:image" content={image} />
      {/* Structured data (SoftwareApplication @graph) lives in index.html and is
          copied into every prerendered page — no per-route JSON-LD needed here. */}
    </Helmet>
  );
};

export default Seo;
