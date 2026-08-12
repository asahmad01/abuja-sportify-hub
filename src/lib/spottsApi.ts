/**
 * Spotts API client — the website's only route to the backend.
 *
 * GOLLAZO_PLAN.md Phase 5. Before this, the site had no API client at all and
 * its forms posted to Formspree, which sends an email and takes no money.
 *
 * Two rules this file exists to enforce:
 *
 *  1. NO PRICING MATHS HERE. The backend publishes {list_price, gateway_fee,
 *     total} on the card payload — render those. The gateway fee formula has
 *     already drifted into three copies across this codebase; a fourth living
 *     in the browser, where it can silently disagree with what the customer is
 *     actually charged, would be the worst one.
 *
 *  2. The access token returned by registerGuest is a capability for exactly
 *     one registration. Keep it in memory for the checkout flow; it is not a
 *     login and must never be treated as one.
 */

const API_BASE =
  (import.meta.env.VITE_SPOTTS_API as string | undefined)?.replace(/\/$/, "") ??
  "https://api.spottsapp.com/api";

export interface CardPricing {
  list_price: number;
  gateway_fee: number;
  total: number;
  fee_passed_on: boolean;
}

export interface VendorOption {
  key: string;
  label: string;
  /** LIST price. Never quote this — quote `pricing.total`, which is charged. */
  price: number;
  pricing: CardPricing;
}

export interface EventVenue {
  id: number | null;
  name: string;
  address?: string | null;
}

export interface EventCard {
  id: number;
  type: "tournament" | "event" | "vendor" | "promo" | "advert";
  title: string;
  subtitle?: string | null;
  price: number;
  pricing: CardPricing;
  vendor_options: VendorOption[];
  max_participants?: number | null;
  current_participants?: number | null;
  is_registration_open?: boolean;
  remaining_slots?: number | null;
  /** "YYYY-MM-DD" — null until the organiser fills it in. */
  event_date?: string | null;
  /** "HH:MM:SS" from the backend's TIME column. */
  event_time?: string | null;
  venue?: EventVenue | null;
}

export interface GuestRegistration {
  registration_reference: string;
  access_token: string;
  amount: number;
  formatted_amount: string;
  payment_required: boolean;
  status: string;
}

/** Field-level validation errors from a 422, keyed by field name. */
export class ApiValidationError extends Error {
  constructor(
    message: string,
    public readonly errors: Record<string, string[]>,
  ) {
    super(message);
    this.name = "ApiValidationError";
  }

  /** First error for a field, if any. */
  first(field: string): string | undefined {
    return this.errors[field]?.[0];
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let res: Response;

  try {
    res = await fetch(`${API_BASE}${path}`, {
      ...init,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(init?.headers ?? {}),
      },
    });
  } catch {
    // Network/CORS failure — never surface the raw error to a buyer.
    throw new Error("Could not reach Spotts. Check your connection and try again.");
  }

  let body: any = null;
  try {
    body = await res.json();
  } catch {
    /* empty or non-JSON body */
  }

  if (res.status === 422) {
    throw new ApiValidationError(
      body?.message ?? "Please check the form and try again.",
      body?.errors ?? {},
    );
  }

  if (!res.ok || body?.success === false) {
    throw new Error(body?.message ?? "Something went wrong. Please try again.");
  }

  return body?.data as T;
}

/**
 * The sellable cards in an event group.
 *
 * Lets a page say "sell the gollazo group" instead of embedding card IDs, so
 * recreating a card in super-admin doesn't require a site re-deploy.
 */
export async function getEventGroup(group: string): Promise<EventCard[]> {
  const data = await request<{ group: string; cards: EventCard[] }>(`/v1/event-groups/${group}`);
  return data.cards;
}

/** Public card details, including the price breakdown to display. */
export function getEventCard(cardId: number): Promise<EventCard> {
  return request<EventCard>(`/v1/featured-cards/${cardId}`);
}

export interface GuestRegistrationInput {
  participant_name: string;
  participant_email: string;
  participant_phone?: string;
  team_name?: string;
  brand?: string;
  vendor_notes?: string;
  vendor_option_key?: string;
}

/** Register without a Spotts account. Returns the one-time access token. */
export function registerGuest(
  cardId: number,
  input: GuestRegistrationInput,
): Promise<GuestRegistration> {
  return request<GuestRegistration>(`/v1/featured-cards/${cardId}/register-guest`, {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export interface PaymentInit {
  authorization_url: string;
  reference: string;
  amount: number;
  formatted_amount: string;
}

/**
 * Start payment for a registration.
 *
 * The token goes in a header rather than the body or query string so it stays
 * out of access logs and browser history.
 */
export function initializePayment(
  registrationReference: string,
  accessToken: string,
  returnPath?: string,
): Promise<PaymentInit> {
  return request<PaymentInit>(`/v1/featured-cards/registrations/${registrationReference}/pay`, {
    method: "POST",
    headers: { "X-Registration-Token": accessToken },
    // A PATH only. The backend prepends its own configured host, so this can
    // never become an open redirect even if tampered with.
    body: JSON.stringify({ return_path: returnPath ?? "/" }),
  });
}

/** Confirm payment after returning from the gateway. */
export function verifyPayment(
  registrationReference: string,
  accessToken: string,
): Promise<{ status: string; registration_reference: string }> {
  return request(`/v1/featured-cards/registrations/${registrationReference}/verify`, {
    method: "POST",
    headers: { "X-Registration-Token": accessToken },
  });
}

/**
 * Register then immediately send the buyer to the gateway.
 *
 * The reference and token are stashed in sessionStorage first: Paystack takes
 * the buyer off-site, so without that the return trip has no way to identify
 * which registration just got paid.
 */
export async function registerAndPay(
  cardId: number,
  returnPath: string,
  input: GuestRegistrationInput,
): Promise<void> {
  const registration = await registerGuest(cardId, input);

  if (!registration.payment_required) {
    sessionStorage.setItem(PENDING_KEY, JSON.stringify({
      reference: registration.registration_reference,
      token: registration.access_token,
      free: true,
    }));
    window.location.assign(`${window.location.pathname}?spotts_return=1`);
    return;
  }

  const payment = await initializePayment(
    registration.registration_reference,
    registration.access_token,
    returnPath,
  );

  sessionStorage.setItem(PENDING_KEY, JSON.stringify({
    reference: registration.registration_reference,
    token: registration.access_token,
  }));

  window.location.assign(payment.authorization_url);
}

const PENDING_KEY = "spotts_pending_registration";

export interface PendingRegistration {
  reference: string;
  token: string;
  free?: boolean;
}

export function readPendingRegistration(): PendingRegistration | null {
  try {
    const raw = sessionStorage.getItem(PENDING_KEY);
    return raw ? (JSON.parse(raw) as PendingRegistration) : null;
  } catch {
    return null;
  }
}

export function clearPendingRegistration(): void {
  sessionStorage.removeItem(PENDING_KEY);
}

/** Naira, no kobo — matches how the backend formats money for buyers. */
export function formatNaira(amount: number): string {
  return `₦${Math.round(amount).toLocaleString("en-NG")}`;
}

/**
 * "2026-12-19" -> "Sat, 19 Dec".
 *
 * Formatted in UTC deliberately: a bare date string parses as UTC midnight, so
 * rendering it in a negative-offset local zone would show the previous day.
 */
export function formatEventDate(date?: string | null): string | null {
  if (!date) return null;
  const parsed = new Date(`${date}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toLocaleDateString("en-GB", {
    weekday: "short", day: "numeric", month: "short", timeZone: "UTC",
  });
}

/** "12:00:00" -> "12:00 PM". */
export function formatEventTime(time?: string | null): string | null {
  if (!time) return null;
  const [h, m] = time.split(":");
  const hour = Number(h);
  if (!Number.isFinite(hour) || m === undefined) return null;
  const suffix = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${hour12}:${m} ${suffix}`;
}
