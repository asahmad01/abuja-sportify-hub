/**
 * Shared Gollazo page constants.
 *
 * DEMO_EVENT lived in both /gollazo and /gollazo/confirmed, and the two copies
 * had already drifted to different fake festivals (19 Dec at Eagle Square on
 * one, 20 Aug at SOHO on the other). One buyer could see both in a single
 * session, so it lives here now.
 */

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
