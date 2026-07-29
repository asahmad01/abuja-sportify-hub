# Spotts Website SEO Plan (spottsapp.com)

*Created: 2026-07-11 · Repo: `abuja-sportify-hub` (Vite + React 18.3 + react-router 6.30 → GitHub Pages)*
*Status: PLAN — to be executed in one batch, then pushed (auto-deploys to spottsapp.com).*

---

## 1. Goal

Make the new Spotts Premium site rank and, just as important, **preview correctly when links are shared** (WhatsApp, X, Facebook) — because Spotts pushes links through WhatsApp bots and to partners like Gollazo. Cover the pages that didn't exist before (events, gollazo, partner-api, contact, venue-onboarding).

## 2. Current state (after the Jul 11 quick-win push)

✅ Already fixed: `sitemap.xml` rewritten to live routes; `404.html` + restore snippet so deep links resolve.
✅ Good baseline: `index.html` has a solid static title/description/OG/Twitter/canonical/geo block.

❌ **The remaining gaps this plan closes:**
1. **No per-page meta.** Pages only set `document.title` client-side. Social/WhatsApp scrapers **don't run JS**, so every shared link (`/gollazo`, `/events`, …) shows the *homepage* preview. Non-Google crawlers see the same.
2. **No structured data** (JSON-LD) — no Organization, no Event schema for events/gollazo.
3. **No per-page OG share images** — only `hero-sports.jpg` exists.
4. Google Search Console not yet told about the new sitemap/pages.

## 3. The core decision — how we render per-page SEO on a static host

GitHub Pages can't do server-side rendering, so per-route `<head>` must be baked in at **build time**. Two ways:

- **Approach A — full prerender (headless Chrome).** A build step (puppeteer via `@prerenderer/rollup-plugin`) visits each route and writes real static HTML *bodies + head* to `dist/<route>/index.html`. Best-possible SEO (real body content for every page, incl. Gollazo). **Cost/risk:** puppeteer/Chromium in GitHub Actions — heavier, occasionally flaky, needs extra CI apt libs.
- **Approach B — build-time meta injection (no browser). ← RECOMMENDED.** A tiny Node post-build script injects each route's `<title>/description/OG/Twitter/canonical/JSON-LD` into a per-route `dist/<route>/index.html`. Bodies still render via JS (Googlebot executes JS; WhatsApp/social only read the head anyway). **100% reliable in CI, no browser, fast.** Solves goals #1–#3 fully for previews + Google.

**Recommendation: Approach B.** It delivers the whole point (correct per-page previews + head SEO + structured data) with zero CI risk. It shares one source-of-truth meta config with the runtime (react-helmet-async), so client-side navigation also updates the head. Approach A stays documented as a future upgrade if we later want static *body* HTML for non-JS crawlers (Bing) on the content pages.

> Single source of truth: one `src/seo/seoConfig.ts` map (route → title/description/ogImage/jsonLd). react-helmet-async reads it at runtime; the post-build script reads the same map for the static HTML. No drift.

## 4. Work plan (one batch)

### Phase 1 — Per-page meta at runtime (react-helmet-async)
- Add `react-helmet-async`; wrap `src/main.tsx` app in `<HelmetProvider>`.
- Add `src/seo/seoConfig.ts` — the per-route meta map (see §5 table).
- Add `src/seo/Seo.tsx` — a `<Seo route="/gollazo" />` component that renders the `<Helmet>` (title, description, canonical, OG, Twitter, JSON-LD) from the config. Each `Premium*` page renders it; `PremiumStaticPage` takes a `route` prop and renders `<Seo>` too (replaces its current `document.title` line).
- Result: correct head during client navigation + a JS-rendered head Googlebot sees.

### Phase 2 — Build-time meta injection (the crawler/WhatsApp fix)
- Add `scripts/prerender-seo.mjs`: after `vite build`, for each route in `seoConfig` write `dist/<route>/index.html` = the built `index.html` with its **title/description/canonical/OG/Twitter replaced** (not appended — must dedupe the static defaults) and the route's JSON-LD injected.
- Update `package.json`: `"build": "vite build && node scripts/prerender-seo.mjs"`.
- Keep root `index.html` defaults as the homepage/fallback values.
- Verify: `dist/gollazo/index.html` has Gollazo's own OG title/description/image.

### Phase 3 — Structured data (JSON-LD)
- Site-wide **Organization** (name, url, logo, sameAs: socials) via the base config.
- **Event** schema on `/gollazo` and `/events` (name, startDate, location, offers/price, organizer) — needs real event details (see §7 inputs).
- Optional **BreadcrumbList** on sub-pages.

### Phase 4 — Share images (OG)
- Add 1200×630 images under `public/og/`: `og-default.jpg` (site fallback), `og-gollazo.jpg`, `og-events.jpg`. Others fall back to `og-default`. (Asset dependency — §7.)

### Phase 5 — Housekeeping
- `robots.txt`: confirm nothing new is blocked (current `Disallow: /api` does **not** match `/partner-api` — safe; consider dropping the stale `/api` line since that page is gone). Keep the sitemap ref.
- Confirm the retired routes (`/features`, `/about`, …) still soft-redirect and are **absent** from the sitemap (done).
- `index.html` homepage copy refresh to reflect events/tournaments (optional polish).

### Phase 6 — Verify & submit (post-deploy, some manual)
- Build locally, inspect `dist/<route>/index.html` heads.
- After deploy: test WhatsApp/FB preview via the **Facebook Sharing Debugger** and X **Card Validator** on `/`, `/gollazo`, `/events`.
- **Google Search Console** (manual, needs your account): submit `sitemap.xml`, use URL Inspection → Request Indexing on the new pages. (I'll give exact click-path; I can't access your GSC.)

## 5. Per-route meta — DRAFT copy (confirm/tweak in §7)

| Route | Title (≤~60 chars) | Description (≤~155 chars) | OG image |
|---|---|---|---|
| `/` | Spotts — Book Sports Venues & Gyms in Abuja, Instantly | Book football pitches, padel & tennis courts, basketball & gyms across Abuja in seconds. Join tournaments. iOS & Android. | hero-sports.jpg |
| `/events` | Sports Events & Tournaments in Abuja \| Spotts | Discover and join padel, football and sports tournaments across Abuja. Secure your spot and pay in seconds on Spotts. | og-events |
| `/gollazo` | Gollazo — Padel & Football Event, Powered by Spotts | Join Gollazo: team tournament tickets, tables and vendor slots. Fast, secure payment powered by Spotts. | og-gollazo |
| `/partner-api` | Spotts Partner API — Venue Calendar Sync | Integrate your venue's availability and bookings with Spotts. Real-time calendar sync for partners. | og-default |
| `/venue-onboarding` | List Your Venue on Spotts \| Grow Bookings in Abuja | Put your facility or gym in front of thousands of players in Abuja. Manage bookings, payments and payouts in one place. | og-default |
| `/contact` | Contact Spotts \| Get in Touch | Questions, venue listings or event partnerships — reach the Spotts team. | og-default |
| `/support` | Spotts Support & Help Centre | Get help with bookings, payments, memberships and your Spotts account. | og-default |
| `/privacy` | Privacy Policy \| Spotts | How Spotts collects, uses and protects your data. | og-default |
| `/terms` | Terms & Conditions \| Spotts | The terms governing your use of Spotts. | og-default |
| `/refund` | Refund & Cancellation Policy \| Spotts | How refunds and cancellations work on Spotts. | og-default |

## 6. Files touched (Approach B)
- **New:** `src/seo/seoConfig.ts`, `src/seo/Seo.tsx`, `scripts/prerender-seo.mjs`, `public/og/*.jpg`.
- **Edited:** `src/main.tsx` (HelmetProvider), each `src/pages/Premium*.tsx` + `src/pages/premium/PremiumStaticPage.tsx` (render `<Seo>`), `package.json` (dep + build script), maybe `public/robots.txt`.
- **Dep added:** `react-helmet-async` (tiny, well-maintained). No puppeteer.

## 7. Inputs needed from you (blockers to a clean one-go)
1. **Confirm/tweak the §5 copy** (titles + descriptions) — or approve the drafts as-is.
2. **Share images** — provide `og-gollazo.jpg` and `og-events.jpg` (1200×630), and a general `og-default.jpg`; or say "use hero-sports.jpg for all" as a stopgap.
3. **Gollazo/event details** for the Event JSON-LD — event name, date(s), venue/address, ticket price(s), organizer. (Can ship without and add later.)
4. **Social handles** for Organization `sameAs` (Instagram/X/etc.) — have `@spottsapp` for Twitter already.
5. **Google Search Console** — you run the submit step (I'll hand you the exact clicks).

## 8. Risks & mitigations
- **Duplicate meta tags** (static index.html defaults vs injected) → the inject script *replaces* title/description/canonical/OG/Twitter, doesn't append; react-helmet-async dedupes at runtime.
- **CI reliability** → Approach B has no browser, so no puppeteer/Chromium risk. Build stays `vite build && node …`.
- **Large JS bundle (822 KB)** hurts Core Web Vitals (a ranking factor) → out of scope here; note as a follow-up (route-level code-splitting).
- **Soft redirects** on retired URLs (client-side `<Navigate>`, not 301) → acceptable on GH Pages; sitemap already excludes them; Google converts JS redirects to 301-equivalents over time.

## 9. Rollback
Every change ships in one commit to `main`; revert + push re-deploys the prior state. The meta injection only writes extra `dist/<route>/index.html` files — it can't break the existing root build.
