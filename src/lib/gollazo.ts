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
