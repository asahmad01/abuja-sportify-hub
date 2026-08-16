/**
 * Shared Golazo page constants.
 *
 * DEMO_EVENT lived in both /golazo and /golazo/confirmed, and the two copies
 * had already drifted to different fake festivals (19 Dec at Eagle Square on
 * one, 20 Aug at SOHO on the other). One buyer could see both in a single
 * session, so it lives here now.
 */

/**
 * Event group slugs to try, in order, until one returns cards.
 *
 * The brand is "Golazo" but the cards were created under `gollazo`, back when
 * the name was misspelled. Renaming the group in super-admin would otherwise
 * take the live page down the instant it was saved — the site asks for one
 * exact slug and 404s on anything else.
 *
 * Trying both means the rename can happen whenever, in either order, with no
 * deploy to match it. Drop `gollazo` once the group has been renamed.
 */
export const EVENT_GROUP_SLUGS = ["golazo", "gollazo"];

/**
 * Event details shown on the ticket until the card carries its own.
 *
 * Still a FALLBACK: set event_date / event_time / venue on the card in
 * super-admin and those win automatically. Keeping the real details here too
 * means the ticket is right either way.
 *
 * These are FALLBACKS, not hardcoding: they render only while the card has no
 * event_date / event_time / venue set. Filling those in via super-admin makes
 * the backend values win automatically, with no code change and no deploy.
 */
export const DEMO_EVENT = {
  date: "Sat, 29 Aug",
  time: "1:00 PM",
  venue: "Harrow Park",
};

/**
 * Send checkout to one canonical origin.
 *
 * spottsapp.com and www.spottsapp.com both serve the site independently, with
 * no redirect between them — so they are two origins with two separate
 * sessionStorages. Checkout parks the payment reference in sessionStorage
 * before handing the buyer to Paystack, and the backend returns them to
 * FRONTEND_URL, which is the apex. Start on www and you come back to an origin
 * that has never heard of your payment: the page says "nothing to confirm"
 * while the money is gone and the email is already sent.
 *
 * Normalising before anything is stored is what actually prevents that. Runs
 * before checkout, so the return trip lands where the reference lives.
 *
 * Returns true when a redirect was started, so callers can stop work.
 */
export function ensureCanonicalOrigin(): boolean {
  if (typeof window === "undefined") return false;

  const { hostname, protocol, pathname, search, hash } = window.location;
  if (!hostname.startsWith("www.")) return false;

  window.location.replace(
    `${protocol}//${hostname.slice(4)}${pathname}${search}${hash}`,
  );
  return true;
}
