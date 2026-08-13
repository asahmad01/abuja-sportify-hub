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
 * Placeholder event details, front-end only.
 *
 * These are FALLBACKS, not hardcoding: they render only while the card has no
 * event_date / event_time / venue set. Filling those in via super-admin makes
 * the backend values win automatically, with no code change and no deploy.
 */
export const DEMO_EVENT = {
  date: "Sat, 19 Dec",
  time: "12:00 PM",
  venue: "Eagle Square, Abuja",
};
