// Golazo Fest — the live commerce page (GOLLAZO_PLAN.md Phase 5).
//
// The brand is "Golazo", one L. It shipped misspelled as "Gollazo"; the plan
// document, this filename and the event_group_id slug still carry the typo.
//
// Was a faithful port of the design export: mock table checkout, and a vendor
// form posting to an unset Formspree endpoint. Both are gone. Two real
// products now sell through the Spotts API:
//
//   Team entry   — tournament card
//   Vendor slot  — vendor card
//
// Tables were removed entirely (LD-A): the page advertised Platinum/Gold tiers
// that nothing could fulfil.
//
// Prices come from the API, never computed here. The backend publishes
// {list_price, gateway_fee, total} and the buyer pays `total` — the Paystack
// fee is added on top so Golazo receives the round number. Recomputing that
// formula in the browser is how it would drift from what is actually charged.
import { useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { DEMO_EVENT, EVENT_GROUP_SLUGS } from "@/lib/gollazo";
import { setupPremiumPage } from "./premium/setup";
import "./premium/premium.css";
import {
  ApiValidationError,
  clearPendingRegistration,
  formatEventDate,
  formatEventTime,
  checkDiscountCode,
  formatNaira,
  getEventGroup,
  readPendingRegistration,
  registerAndPay,
  verifyPayment,
  type EventCard,
} from "@/lib/spottsApi";


// The teams section background. The ticket's perforation notches are punched
// using this exact value — if they ever diverge the notches show as discs.
const SECTION_BG = "#071120";

// What a vendor slot actually buys. Every line here is a locked decision from
// GOLLAZO_PLAN.md §1 — the booth dimensions and tier prices this replaced were
// invented by the design mock and nothing in the system could honour them.
const VENDOR_FACTS = [
  "One slot per purchase — buy more than once if you need the space.",
  "Confirmed the moment your payment clears. Nothing to wait on, no approval step.",
  "Your vendor pass and QR code are emailed straight away.",
  "Slots are limited, and a sold slot doesn't come back.",
];

// Decorative QR block, copied from the /events ticket. 7x7, purely visual —
// the real scannable code is emailed after payment.
const QR_PATTERN = [
  1,1,1,0,1,1,1, 1,0,1,1,0,0,1, 1,1,0,1,1,0,1, 0,1,1,0,1,1,0,
  1,0,1,1,0,1,1, 1,1,0,1,1,0,1, 1,0,1,1,0,1,1,
].map(Boolean);
/** Which product the buyer is filling in — drives one shared form. */
type Product = "team" | "vendor";

const inputStyle: React.CSSProperties = {
  width: "100%", boxSizing: "border-box", fontFamily: "inherit", fontSize: 15,
  color: "#0A1220", background: "#fff", border: "1px solid rgba(10,18,32,.14)",
  borderRadius: 12, padding: "12px 14px", outline: "none",
  transition: "border-color .18s, box-shadow .18s",
};
const focusRing = "border-color: #007AFF; box-shadow: 0 0 0 3px rgba(0,122,255,.12);";
const labelCaption: React.CSSProperties = { fontSize: 12.5, fontWeight: 600, color: "#51607A", marginBottom: 7 };

const PremiumGollazo = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const [cards, setCards] = useState<EventCard[] | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [submitting, setSubmitting] = useState<Product | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [confirmed, setConfirmed] = useState<{ reference: string } | null>(null);
  // Typed live so the ticket on the right fills in as the captain types.
  const [teamNamePreview, setTeamNamePreview] = useState("");
  // Which booth option the vendor picked. Null when the card offers none.
  const [vendorOptionKey, setVendorOptionKey] = useState<string | null>(null);

  // Otech discount (OTECH_DISCOUNT_PLAN.md). A valid code swaps in a whole
  // different card that is simply cheaper — nothing is discounted here.
  const [codeInput, setCodeInput] = useState("");
  const [unlockedCard, setUnlockedCard] = useState<EventCard | null>(null);
  const [codeError, setCodeError] = useState<string | null>(null);
  const [checkingCode, setCheckingCode] = useState(false);
  // Controlled purely so a code check can say who is asking: a buyer whose own
  // checkout just failed is still holding their code and should see it as
  // valid rather than being told to wait for the hold to lapse.
  const [vendorEmail, setVendorEmail] = useState("");

  const teamCard = cards?.find((c) => c.type !== "vendor") ?? null;
  // A redeemed code replaces the public vendor card outright, so the price
  // shown, the card ID bought and the amount charged all follow from one swap.
  const vendorCard = unlockedCard ?? cards?.find((c) => c.type === "vendor") ?? null;

  // The price actually on offer: a chosen booth option's, else the card's.
  // Both come from the backend already grossed-up — see spottsApi.ts rule 1.
  const selectedVendorOption =
    vendorCard?.vendor_options.find((o) => o.key === vendorOptionKey) ?? null;
  const vendorPricing =
    selectedVendorOption?.pricing ??
    vendorCard?.pricing ??
    { list_price: 0, gateway_fee: 0, total: 0, fee_passed_on: false };

  // The public price, kept so a redeemed code can show what it struck out.
  // Read from the group rather than the swapped-in card, which no longer
  // knows the standard price.
  const publicPricing = cards?.find((c) => c.type === "vendor")?.pricing ?? null;

  useEffect(() => {
    document.title = "Golazo — by Spotts";
  }, []);

  // Cards resolve at runtime, so card IDs never need hardcoding, and the group
  // slug is tried against both spellings — see EVENT_GROUP_SLUGS.
  useEffect(() => {
    let cancelled = false;

    (async () => {
      for (const slug of EVENT_GROUP_SLUGS) {
        try {
          const found = await getEventGroup(slug);
          if (!cancelled) setCards(found);
          return;
        } catch {
          // Wrong slug, or the group does not exist under it. Try the next.
        }
      }
      if (!cancelled) setLoadError(true);
    })();

    return () => { cancelled = true; };
  }, []);

  // Pre-select the first booth option: the card requires a choice whenever it
  // has options, so an unselected picker is a guaranteed 422 on submit.
  useEffect(() => {
    const first = vendorCard?.vendor_options[0]?.key;
    if (first) setVendorOptionKey((current) => current ?? first);
  }, [vendorCard]);

  // Coming back from Paystack: confirm the payment we parked before leaving.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (!params.has("spotts_return") && !params.has("reference") && !params.has("trxref")) return;

    const pending = readPendingRegistration();
    if (!pending) return;

    verifyPayment(pending.reference, pending.token)
      .then(() => {
        setConfirmed({ reference: pending.reference });
        toast({ title: "Payment confirmed", description: "Your confirmation email is on the way." });
      })
      .catch((err) => {
        // Paystack may still be settling — the webhook will finish the job.
        toast({
          title: "We're confirming your payment",
          description: err instanceof Error ? err.message : "Check your email shortly.",
        });
      })
      .finally(() => {
        clearPendingRegistration();
        window.history.replaceState({}, "", window.location.pathname);
      });
  }, [toast]);

  useEffect(() => {
    if (!rootRef.current) return;
    return setupPremiumPage(rootRef.current);
  }, [cards, confirmed]);

  /**
   * One submit path for both products — the API takes the same shape either
   * way, so team entry and vendor slots differ only in which card is bought
   * and which extra fields are sent.
   */
  const submitPurchase = async (
    e: React.FormEvent<HTMLFormElement>,
    product: Product,
    card: EventCard | null,
  ) => {
    e.preventDefault();
    if (!card) return;

    // A typed-but-unapplied code must never fall through to full price. This
    // happened in testing: the code was entered, Apply was missed, and the
    // buyer was charged 121,929 instead of 97,564. Stopping here is the only
    // layer that cannot be missed, whatever the button looks like.
    if (product === "vendor" && codeInput.trim() && !unlockedCard) {
      toast({
        title: "Apply your discount code first",
        description: "Tap Apply so the partner rate is used — otherwise you'll be charged the full price.",
        variant: "destructive",
      });
      setCodeError("Tap Apply to use this code.");
      return;
    }

    const fd = new FormData(e.currentTarget);
    const get = (k: string) => (fd.get(k) || "").toString().trim();

    setSubmitting(product);
    setFieldErrors({});

    try {
      await registerAndPay(card.id, "/golazo/confirmed", {
        participant_name: get("name"),
        participant_email: get("email"),
        participant_phone: get("phone") || undefined,
        ...(product === "team"
          ? { team_name: get("team_name") || undefined }
          : {
              brand: get("brand") || undefined,
              vendor_notes: get("about") || undefined,
              vendor_option_key: vendorOptionKey ?? undefined,
              // Re-checked server-side inside the locked transaction: a code
              // that previewed fine may have been spent since.
              access_code: unlockedCard ? codeInput.trim() : undefined,
            }),
      });
      // registerAndPay navigates to Paystack; nothing runs after this.
    } catch (err) {
      if (err instanceof ApiValidationError) {
        const flat: Record<string, string> = {};
        Object.entries(err.errors).forEach(([k, v]) => { flat[k] = v[0]; });
        setFieldErrors(flat);
        toast({ title: "Check the form", description: err.message, variant: "destructive" });
      } else {
        toast({
          title: "Could not continue",
          description: err instanceof Error ? err.message : "Please try again.",
          variant: "destructive",
        });
      }
      setSubmitting(null);
    }
  };

  /**
   * Redeem a discount code.
   *
   * The response carries the unlocked card whole, pricing included, so the
   * discount is never computed in the browser. Advisory only: nothing is
   * reserved until the purchase is submitted and the server checks again.
   */
  const applyCode = async () => {
    const code = codeInput.trim();
    if (!code || checkingCode) return;

    setCheckingCode(true);
    setCodeError(null);

    try {
      const result = await checkDiscountCode(code, vendorEmail.trim() || undefined);
      setUnlockedCard(result.card);
      // The unlocked card is a different product — any booth option chosen
      // against the public card does not exist on it.
      setVendorOptionKey(null);
      toast({ title: "Discount applied", description: "Your partner rate is shown below." });
    } catch (err) {
      setUnlockedCard(null);
      setCodeError(err instanceof Error ? err.message : "That code is not valid.");
    } finally {
      setCheckingCode(false);
    }
  };

  const clearCode = () => {
    setUnlockedCard(null);
    setCodeInput("");
    setCodeError(null);
  };

  // Ticket facts: the card's real details once set, DEMO_EVENT until then.
  const ticketDetails = [
    { label: "Date", value: formatEventDate(teamCard?.event_date) ?? DEMO_EVENT.date },
    { label: "Kick-off", value: formatEventTime(teamCard?.event_time) ?? DEMO_EVENT.time },
    { label: "Venue", value: teamCard?.venue?.name ?? DEMO_EVENT.venue },
  ];



  return (
    <div ref={rootRef} className="premium-root" style={{ fontFamily: "'Inter Display', 'Helvetica Neue', sans-serif", color: "#0A1220", background: "#FAFBFD", overflowX: "clip" }}>
      {/* NAV */}
      <header style={{ position: "sticky", top: 0, zIndex: 60, background: "rgba(250,251,253,.88)", backdropFilter: "blur(14px)", borderBottom: "1px solid rgba(10,18,32,.07)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(20px,4vw,48px)", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <a href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
            <img src="/premium/logo-blue-black.svg" alt="Spotts" style={{ height: 26, display: "block" }} />
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "#51607A", border: "1px solid rgba(10,18,32,.14)", padding: "4px 10px", borderRadius: 999 }}>Golazo</span>
          </a>
          <nav data-mm="nav" style={{ display: "flex", alignItems: "center", gap: "clamp(12px,2vw,24px)", fontSize: 14.5, fontWeight: 500 }}>
            <a href="#teams" style-hover="color: #0A1220;" style={{ color: "#51607A", textDecoration: "none" }}>The festival</a>
            <a href="#vendors" style-hover="color: #0A1220;" style={{ color: "#51607A", textDecoration: "none" }}>Vendors</a>
          </nav>
          <a href="#teams" data-mm="cta" style-hover="background: #0069DE;" style={{ fontSize: 14, fontWeight: 600, color: "#fff", background: "#007AFF", textDecoration: "none", padding: "10px 18px", borderRadius: 999, whiteSpace: "nowrap" }}>Enter a team</a>
          <button type="button" data-mm="burger" aria-label="Open menu" style={{ display: "none", alignItems: "center", justifyContent: "center", width: 42, height: 42, border: "1px solid rgba(10,18,32,.14)", borderRadius: 12, background: "#fff", color: "#0A1220", fontSize: 20, lineHeight: 1, cursor: "pointer", padding: 0 }}>☰</button>
        </div>
        <div data-mm="panel" style={{ display: "none", borderTop: "1px solid rgba(10,18,32,.08)", background: "rgba(250,251,253,.98)", padding: "10px clamp(20px,4vw,48px) 22px" }}>
          <nav aria-label="Mobile" style={{ display: "flex", flexDirection: "column" }}>
            <a href="#teams" data-mm-close="1" style={{ color: "#0A1220", textDecoration: "none", fontSize: 16, fontWeight: 600, padding: "13px 0", borderBottom: "1px solid rgba(10,18,32,.07)" }}>The festival</a>
            <a href="#vendors" data-mm-close="1" style={{ color: "#0A1220", textDecoration: "none", fontSize: 16, fontWeight: 600, padding: "13px 0", borderBottom: "1px solid rgba(10,18,32,.07)" }}>Vendors</a>
            <a href="#teams" data-mm-close="1" style={{ textAlign: "center", fontSize: 15, fontWeight: 600, color: "#fff", background: "#007AFF", textDecoration: "none", padding: "14px 16px", borderRadius: 12, marginTop: 14 }}>Enter a team</a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section style={{ position: "relative", overflow: "clip", background: "#fff", borderBottom: "1px solid rgba(10,18,32,.07)" }}>
        <div aria-hidden style={{ position: "absolute", right: -50, bottom: -70, fontSize: "clamp(160px,24vw,340px)", fontWeight: 800, fontStyle: "italic", letterSpacing: "-0.06em", lineHeight: 1, color: "transparent", WebkitTextStroke: "2px rgba(0,122,255,.16)", userSelect: "none", pointerEvents: "none", transform: "rotate(-4deg)" }}>GO</div>
        <div aria-hidden style={{ position: "absolute", right: 60, top: 30, fontSize: "clamp(60px,8vw,110px)", fontWeight: 800, fontStyle: "italic", letterSpacing: "-0.05em", lineHeight: 1, color: "transparent", WebkitTextStroke: "1.5px rgba(31,168,85,.13)", userSelect: "none", pointerEvents: "none", transform: "rotate(-4deg)" }}>LAZO!</div>
        <svg aria-hidden viewBox="0 0 460 300" style={{ position: "absolute", left: -70, top: -40, width: "clamp(220px,26vw,420px)", pointerEvents: "none" }}>
          <g fill="none" stroke="#007AFF" strokeOpacity=".1" strokeWidth="2">
            <rect x="20" y="20" width="420" height="260" />
            <line x1="240" y1="20" x2="240" y2="280" />
            <circle cx="240" cy="150" r="60" />
            <rect x="20" y="90" width="70" height="120" />
            <rect x="370" y="90" width="70" height="120" />
          </g>
        </svg>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(64px,10vh,120px) clamp(20px,4vw,48px)", position: "relative" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 22 }}>
            <span style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#007AFF", border: "1px solid rgba(0,122,255,.3)", padding: "6px 14px", borderRadius: 999 }}>Football</span>
            <span style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#007AFF", border: "1px solid rgba(0,122,255,.3)", padding: "6px 14px", borderRadius: 999 }}>Padel</span>
            <span style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#1FA855", border: "1px solid rgba(31,168,85,.35)", padding: "6px 14px", borderRadius: 999 }}>Live music</span>
          </div>
          <h1 style={{ margin: "0 0 20px", fontSize: "clamp(52px,8.5vw,120px)", fontWeight: 800, fontStyle: "italic", letterSpacing: "-0.055em", lineHeight: .92, transform: "rotate(-2deg)", transformOrigin: "left bottom", display: "inline-block" }}>GOLAZO<span style={{ color: "#007AFF" }}>!</span></h1>
          <p style={{ margin: "0 0 14px", maxWidth: "56ch", fontSize: "clamp(17px,1.6vw,21px)", lineHeight: 1.55, color: "#51607A", textWrap: "pretty" }}>A sports tournament wrapped in a festival. Football and padel by day, <b style={{ color: "#0A1220" }}>Seyi Vibez live</b> by night — with food, vendors and tables for the people who want the best seat in the house.</p>
          <p style={{ margin: "0 0 34px", fontSize: 15, fontWeight: 600, color: "#0A1220" }}>Sat, Dec 19 2026 · Eagle Square Grounds, Abuja <span style={{ color: "#A6B0C0", fontWeight: 500 }}>(dummy — TBC)</span></p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center" }}>
            <a href="#teams" style-hover="background: #0069DE; transform: translateY(-1px);" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#007AFF", color: "#fff", textDecoration: "none", fontSize: 15.5, fontWeight: 600, padding: "15px 30px", borderRadius: 999, transition: "background .2s, transform .2s" }}>Enter a team</a>
            <a href="#vendors" style-hover="border-color: rgba(10,18,32,.4);" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#fff", color: "#0A1220", border: "1px solid rgba(10,18,32,.16)", textDecoration: "none", fontSize: 15.5, fontWeight: 600, padding: "14px 28px", borderRadius: 999, transition: "border-color .2s" }}>Sell at Golazo</a>
          </div>
        </div>
      </section>

      {/* THE FESTIVAL */}
      <section id="teams" style={{ background: SECTION_BG, color: "#fff", position: "relative", overflow: "clip" }}>
        <div aria-hidden style={{ position: "absolute", right: "-2%", bottom: "-4%", fontSize: "clamp(120px,18vw,260px)", fontWeight: 800, letterSpacing: "-0.05em", lineHeight: 1, color: "transparent", WebkitTextStroke: "1.5px rgba(255,255,255,.07)", pointerEvents: "none", userSelect: "none" }}>TEAMS</div>

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(56px,8vh,100px) clamp(20px,4vw,48px)", position: "relative" }}>
          <p style={{ margin: "0 0 14px", fontSize: 12.5, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "#5AA9FF" }}>The tournament</p>
          <h2 style={{ margin: "0 0 12px", maxWidth: "20ch", fontSize: "clamp(28px,3.4vw,44px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.08 }}>Enter your team</h2>
          <p style={{ margin: "0 0 44px", maxWidth: "52ch", fontSize: 16, lineHeight: 1.6, color: "rgba(255,255,255,.6)" }}>
            Pay online and your slot is confirmed the moment payment clears. Your QR entry lands in
            your inbox instantly — no printouts, no gate lists, no waiting.
          </p>

          {loadError && <p style={{ fontSize: 14, color: "#FCA5A5" }}>Entries are temporarily unavailable. Please try again shortly.</p>}
          {!loadError && !teamCard && <p style={{ fontSize: 14, color: "rgba(255,255,255,.5)" }}>Loading…</p>}

          {teamCard && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(28px,4vw,56px)", alignItems: "flex-start" }}>

              <div style={{ flex: "1 1 360px", minWidth: 0 }}>
                {!confirmed ? (
                  <form onSubmit={(e) => submitPurchase(e, "team", teamCard)} style={{ background: "#fff", color: "#0A1220", borderRadius: 22, padding: "clamp(24px,3vw,34px)", boxShadow: "0 40px 90px -40px rgba(0,0,0,.6)" }}>
                    <div style={{ display: "grid", gap: 15 }}>
                      <label style={{ display: "flex", flexDirection: "column" }}>
                        <span style={labelCaption}>Team name</span>
                        <input name="team_name" required placeholder="Samba FC" onChange={(e) => setTeamNamePreview(e.target.value)} style={inputStyle} style-focus={focusRing} />
                      </label>
                      <label style={{ display: "flex", flexDirection: "column" }}>
                        <span style={labelCaption}>Captain&rsquo;s name</span>
                        <input name="name" required style={inputStyle} style-focus={focusRing} />
                        {fieldErrors.participant_name && <span style={{ fontSize: 12, color: "#B42318", marginTop: 5 }}>{fieldErrors.participant_name}</span>}
                      </label>
                      <label style={{ display: "flex", flexDirection: "column" }}>
                        <span style={labelCaption}>Phone</span>
                        <input name="phone" placeholder="+234 800 000 0000" style={inputStyle} style-focus={focusRing} />
                      </label>
                      <label style={{ display: "flex", flexDirection: "column" }}>
                        <span style={labelCaption}>Email</span>
                        <input name="email" type="email" required placeholder="you@email.com" style={inputStyle} style-focus={focusRing} />
                        {fieldErrors.participant_email && <span style={{ fontSize: 12, color: "#B42318", marginTop: 5 }}>{fieldErrors.participant_email}</span>}
                        <span style={{ fontSize: 12, color: "#8794A8", marginTop: 6 }}>Your entry and QR code are sent here.</span>
                      </label>
                    </div>
                    <button type="submit" disabled={submitting !== null || teamCard.remaining_slots === 0} style-hover="background: #0069DE;" style={{ width: "100%", marginTop: 22, border: "none", cursor: submitting || teamCard.remaining_slots === 0 ? "default" : "pointer", opacity: submitting === "team" || teamCard.remaining_slots === 0 ? 0.6 : 1, fontFamily: "inherit", fontSize: 15, fontWeight: 600, color: "#fff", background: "#007AFF", padding: "15px 28px", borderRadius: 999, transition: "background .2s" }}>
                      {teamCard.remaining_slots === 0 ? "Sold out" : submitting === "team" ? "Taking you to payment…" : `Pay ${formatNaira(teamCard.pricing.total)} and enter`}
                    </button>
                    <p style={{ margin: "12px 0 0", textAlign: "center", fontSize: 12, color: "#8794A8" }}>Secure payment by Paystack</p>
                  </form>
                ) : (
                  <div style={{ background: "#fff", color: "#0A1220", borderRadius: 22, padding: "clamp(26px,3vw,36px)", boxShadow: "0 40px 90px -40px rgba(0,0,0,.6)", display: "flex", flexDirection: "column", gap: 14 }}>
                    <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#1FA855", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>✓</div>
                    <h3 style={{ margin: 0, fontSize: "clamp(21px,2.2vw,27px)", fontWeight: 800, letterSpacing: "-0.03em" }}>You&rsquo;re in.</h3>
                    <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "#51607A" }}>Payment confirmed. Your ticket is on its way to your inbox — show the QR code at the gate.</p>
                    <p style={{ margin: 0, fontSize: 12.5, fontFamily: "SFMono-Regular, Menlo, monospace", color: "#51607A", background: "#F1F5F9", padding: "8px 13px", borderRadius: 8, alignSelf: "flex-start" }}>{confirmed.reference}</p>
                    <a href="#vendors" style-hover="border-color: rgba(10,18,32,.4);" style={{ marginTop: 4, alignSelf: "flex-start", fontSize: 14, fontWeight: 600, color: "#0A1220", textDecoration: "none", border: "1px solid rgba(10,18,32,.16)", padding: "11px 22px", borderRadius: 999 }}>Also selling at Golazo?</a>
                  </div>
                )}
              </div>

              <div style={{ flex: "1 1 380px", minWidth: 0, display: "flex", justifyContent: "center" }}>
                <div style={{ position: "relative", width: "min(400px,100%)", background: "#0A1220", color: "#fff", borderRadius: 22, boxShadow: "0 40px 90px -34px rgba(0,0,0,.7)", border: "1px solid rgba(255,255,255,.08)" }}>
                  <div style={{ padding: "26px 28px 22px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 20 }}>
                      <img src="/premium/logo-blue-white.svg" alt="Spotts" style={{ height: 18 }} />
                      <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(255,255,255,.5)" }}>E-Ticket</span>
                    </div>
                    <div style={{ fontSize: 11.5, letterSpacing: ".14em", textTransform: "uppercase", color: "#5AA9FF", fontWeight: 700, marginBottom: 8 }}>Golazo · Team entry</div>
                    <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 16 }}>{teamNamePreview.trim() || teamCard.title}</div>
                    <div style={{ display: "flex", gap: 24, flexWrap: "wrap", fontSize: 13 }}>
                      {ticketDetails.map(({ label, value }) => (
                        <div key={label}>
                          <div style={{ color: "rgba(255,255,255,.45)", fontSize: 11, marginBottom: 3 }}>{label}</div>
                          <div style={{ fontWeight: 600 }}>{value}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ position: "relative", display: "flex", alignItems: "center", padding: "0 8px" }}>
                    <span aria-hidden style={{ position: "absolute", left: -11, width: 22, height: 22, borderRadius: "50%", background: "#fff" }} />
                    <span aria-hidden style={{ flex: 1, borderTop: "2px dashed rgba(255,255,255,.22)", margin: "0 16px" }} />
                    <span aria-hidden style={{ position: "absolute", right: -11, width: 22, height: 22, borderRadius: "50%", background: "#fff" }} />
                  </div>

                  <div style={{ padding: "22px 28px 26px", display: "flex", alignItems: "center", gap: 20 }}>
                    <div style={{ background: "#fff", borderRadius: 12, padding: 10 }}>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 8px)", gridAutoRows: "8px", gap: 3 }}>
                        {QR_PATTERN.map((on, i) => (<span key={i} style={{ background: on ? "#0A1220" : "rgba(10,18,32,.15)" }} />))}
                      </div>
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(255,255,255,.45)", fontWeight: 700, marginBottom: 5 }}>Admit one team</div>
                      <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: "-0.02em" }}>
                        {formatNaira(teamCard.pricing.total)}{confirmed && <span style={{ color: "#4ADE80" }}> · Paid ✓</span>}
                      </div>
                      {teamCard.pricing.fee_passed_on && teamCard.pricing.gateway_fee > 0 && !confirmed && (
                        <div style={{ fontSize: 11.5, color: "rgba(255,255,255,.45)", marginTop: 3 }}>incl. {formatNaira(teamCard.pricing.gateway_fee)} fees</div>
                      )}
                      {confirmed && <div style={{ fontSize: 12, color: "#4ADE80", marginTop: 3 }}>Delivered instantly</div>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* VENDORS — light ground on purpose. The teams section owns the one dark
          moment on this page; a second one would split its emphasis in half. */}
      <section id="vendors" style={{ position: "relative", overflow: "clip", background: "#F2F6FC", borderTop: "1px solid rgba(10,18,32,.07)" }}>
        <div aria-hidden style={{ position: "absolute", left: -40, bottom: -50, fontSize: "clamp(110px,16vw,220px)", fontWeight: 800, fontStyle: "italic", letterSpacing: "-0.05em", lineHeight: 1, color: "transparent", WebkitTextStroke: "1.8px rgba(0,122,255,.1)", userSelect: "none", pointerEvents: "none", transform: "rotate(-4deg)" }}>VENDORS</div>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(56px,8vh,100px) clamp(20px,4vw,48px)", position: "relative" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(28px,4vw,56px)", alignItems: "flex-start" }}>
            <div style={{ flex: "1 1 340px", minWidth: 0 }}>
              <p style={{ margin: "0 0 16px", fontSize: 12.5, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "#007AFF" }}>Vendor village</p>
              <h2 style={{ margin: "0 0 14px", maxWidth: "20ch", fontSize: "clamp(28px,3.4vw,44px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.05, textWrap: "balance" }}>Sell to a captive crowd.</h2>
              <p style={{ margin: "0 0 28px", maxWidth: "52ch", fontSize: 16, lineHeight: 1.6, color: "#51607A" }}>
                Players, fans and festival-goers on site from morning to midnight. Take a slot, tell us
                what you sell, and pay to lock it in.
              </p>
              {/* Facts we can actually stand behind. The three booth tiers that
                  used to sit here were invented prices nothing could fulfil. */}
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 13 }}>
                {VENDOR_FACTS.map((fact) => (
                  <li key={fact} style={{ display: "flex", gap: 12, alignItems: "flex-start", fontSize: 15, lineHeight: 1.5, color: "#51607A" }}>
                    <span aria-hidden style={{ flex: "none", width: 21, height: 21, borderRadius: "50%", background: "rgba(0,122,255,.1)", color: "#007AFF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, marginTop: 1 }}>✓</span>
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Vendor purchase — LD-D: a straight purchase, not an application */}
            <div style={{ flex: "1 1 380px", minWidth: 0 }}>
              {vendorCard && (
                <form onSubmit={(e) => submitPurchase(e, "vendor", vendorCard)} style={{ border: "1px solid rgba(10,18,32,.08)", borderRadius: 22, background: "#fff", padding: "clamp(24px,3vw,36px)", boxShadow: "0 30px 70px -40px rgba(10,18,32,.45)" }}>
                  <h3 style={{ margin: "0 0 6px", fontSize: "clamp(20px,2vw,25px)", fontWeight: 800, letterSpacing: "-0.03em" }}>Book your vendor slot</h3>
                  <p style={{ margin: "0 0 6px", fontSize: 14.5, lineHeight: 1.55, color: "#51607A" }}>Pay online and your pitch is confirmed instantly.</p>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 10, margin: "0 0 6px", flexWrap: "wrap" }}>
                    <span style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.03em" }}>{formatNaira(vendorPricing.total)}</span>
                    {publicPricing && unlockedCard && (
                      <span style={{ fontSize: 15, color: "#8794A8", textDecoration: "line-through" }}>{formatNaira(publicPricing.total)}</span>
                    )}
                    {vendorPricing.fee_passed_on && vendorPricing.gateway_fee > 0 && (
                      <span style={{ fontSize: 13, color: "#8794A8" }}>{formatNaira(vendorPricing.list_price)} + {formatNaira(vendorPricing.gateway_fee)} payment fees</span>
                    )}
                  </div>

                  {/* Discount code. Deliberately visible to everyone: a vendor
                      without one may ask Golazo how to get it, which is the
                      point of the Otech partnership. */}
                  <div style={{ margin: "0 0 22px" }}>
                    {unlockedCard ? (
                      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", background: "rgba(31,168,85,.08)", border: "1px solid rgba(31,168,85,.25)", borderRadius: 12, padding: "10px 14px" }}>
                        <span style={{ fontSize: 13.5, fontWeight: 700, color: "#1B7F45" }}>✓ Partner rate applied</span>
                        <span style={{ fontSize: 13, color: "#51607A", fontFamily: "SFMono-Regular, Menlo, monospace" }}>{codeInput.trim().toUpperCase()}</span>
                        <button type="button" onClick={clearCode} style={{ marginLeft: "auto", border: "none", background: "none", padding: 0, cursor: "pointer", fontFamily: "inherit", fontSize: 12.5, color: "#51607A", textDecoration: "underline" }}>Remove</button>
                      </div>
                    ) : (
                      <>
                        <span style={labelCaption}>
                          Discount code <span style={{ fontWeight: 400, color: "#8794A8" }}>(optional)</span>
                        </span>
                        <div style={{ display: "flex", gap: 8 }}>
                          <input
                            value={codeInput}
                            onChange={(e) => { setCodeInput(e.target.value); setCodeError(null); }}
                            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); applyCode(); } }}
                            onBlur={() => { if (codeInput.trim() && !unlockedCard) applyCode(); }}
                            placeholder="OTECH-XXXXXX"
                            autoCapitalize="characters"
                            spellCheck={false}
                            style={{ ...inputStyle, textTransform: "uppercase" }}
                            style-focus={focusRing}
                          />
                          <button
                            type="button"
                            onClick={applyCode}
                            disabled={!codeInput.trim() || checkingCode}
                            style={{ flex: "none", border: "none", background: codeInput.trim() ? "#0A1220" : "rgba(10,18,32,.12)", color: codeInput.trim() ? "#fff" : "#8794A8", borderRadius: 12, padding: "0 22px", cursor: !codeInput.trim() || checkingCode ? "default" : "pointer", fontFamily: "inherit", fontSize: 14.5, fontWeight: 700, letterSpacing: "-0.01em", transition: "background .18s, color .18s" }}
                          >
                            {checkingCode ? "Checking…" : "Apply"}
                          </button>
                        </div>
                        {codeError && <span style={{ display: "block", fontSize: 12.5, color: "#B42318", marginTop: 6 }}>{codeError}</span>}
                      </>
                    )}
                  </div>

                  {/* Only rendered when the organiser has configured booth
                      options. Without it, a card that has them 422s on every
                      submit ("Please choose an option") with nothing to click. */}
                  {vendorCard.vendor_options.length > 0 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
                      <span style={labelCaption}>Choose your slot</span>
                      {vendorCard.vendor_options.map((option) => {
                        const selected = option.key === vendorOptionKey;
                        return (
                          <label key={option.key} style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer", border: `1px solid ${selected ? "#007AFF" : "rgba(10,18,32,.12)"}`, boxShadow: selected ? "0 0 0 3px rgba(0,122,255,.12)" : "none", background: selected ? "rgba(0,122,255,.04)" : "#fff", borderRadius: 14, padding: "13px 16px", transition: "border-color .18s, box-shadow .18s, background .18s" }}>
                            <input type="radio" name="vendor_option_key" value={option.key} checked={selected} onChange={() => setVendorOptionKey(option.key)} style={{ accentColor: "#007AFF", width: 17, height: 17, flex: "none" }} />
                            <span style={{ flex: 1, minWidth: 0, fontSize: 15, fontWeight: 600 }}>{option.label}</span>
                            <span style={{ fontSize: 15, fontWeight: 800, letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>{formatNaira(option.pricing.total)}</span>
                          </label>
                        );
                      })}
                      {fieldErrors.vendor_option_key && <span style={{ fontSize: 12, color: "#B42318" }}>{fieldErrors.vendor_option_key}</span>}
                    </div>
                  )}

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,220px),1fr))", gap: 16 }}>
                    <label style={{ display: "flex", flexDirection: "column", gridColumn: "1 / -1" }}>
                      <span style={labelCaption}>Brand / business name</span>
                      <input name="brand" required style={inputStyle} style-focus={focusRing} />
                      {fieldErrors.brand && <span style={{ fontSize: 12, color: "#B42318", marginTop: 5 }}>{fieldErrors.brand}</span>}
                    </label>
                    <label style={{ display: "flex", flexDirection: "column" }}>
                      <span style={labelCaption}>Contact name</span>
                      <input name="name" required style={inputStyle} style-focus={focusRing} />
                      {fieldErrors.participant_name && <span style={{ fontSize: 12, color: "#B42318", marginTop: 5 }}>{fieldErrors.participant_name}</span>}
                    </label>
                    <label style={{ display: "flex", flexDirection: "column" }}>
                      <span style={labelCaption}>Phone</span>
                      <input name="phone" placeholder="+234 800 000 0000" style={inputStyle} style-focus={focusRing} />
                    </label>
                    <label style={{ display: "flex", flexDirection: "column", gridColumn: "1 / -1" }}>
                      <span style={labelCaption}>Email</span>
                      <input name="email" type="email" required placeholder="you@brand.com" value={vendorEmail} onChange={(e) => setVendorEmail(e.target.value)} style={inputStyle} style-focus={focusRing} />
                      {fieldErrors.participant_email && <span style={{ fontSize: 12, color: "#B42318", marginTop: 5 }}>{fieldErrors.participant_email}</span>}
                    </label>
                    <label style={{ display: "flex", flexDirection: "column", gridColumn: "1 / -1" }}>
                      <span style={labelCaption}>What do you sell?</span>
                      <textarea name="about" rows={3} placeholder="Menu, products, anything we should know…" style={{ ...inputStyle, lineHeight: 1.55, resize: "vertical" }} style-focus={focusRing} />
                    </label>
                  </div>
                  {/* Second chance, right where the money is committed. The
                      submit guard already blocks this, but seeing it here
                      beats being stopped after pressing pay. */}
                  {codeInput.trim() && !unlockedCard && (
                    <p style={{ margin: "18px 0 -6px", fontSize: 13, fontWeight: 600, color: "#B42318", textAlign: "center" }}>
                      You&rsquo;ve typed a code but haven&rsquo;t applied it — tap Apply to get the partner rate.
                    </p>
                  )}

                  <button type="submit" disabled={submitting !== null || vendorCard.remaining_slots === 0} style-hover="background: #0069DE;" style={{ width: "100%", marginTop: 22, border: "none", cursor: submitting || vendorCard.remaining_slots === 0 ? "default" : "pointer", opacity: submitting === "vendor" || vendorCard.remaining_slots === 0 ? 0.6 : 1, fontFamily: "inherit", fontSize: 15, fontWeight: 600, color: "#fff", background: "#007AFF", padding: "15px 28px", borderRadius: 999, transition: "background .2s" }}>
                    {vendorCard.remaining_slots === 0 ? "Sold out" : submitting === "vendor" ? "Taking you to payment…" : `Pay ${formatNaira(vendorPricing.total)} and book`}
                  </button>
                  <p style={{ margin: "12px 0 0", textAlign: "center", fontSize: 12, color: "#8794A8" }}>Secure payment by Paystack</p>
                </form>
              )}
              {!vendorCard && !loadError && <p style={{ fontSize: 14, color: "#8794A8" }}>Loading…</p>}
              {loadError && <p style={{ fontSize: 14, color: "#B42318" }}>Vendor slots are temporarily unavailable. Please try again shortly.</p>}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#071120", color: "#fff", borderTop: "1px solid rgba(255,255,255,.08)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(40px,6vh,64px) clamp(20px,4vw,48px) 36px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 32, justifyContent: "space-between", alignItems: "flex-start", paddingBottom: 32, borderBottom: "1px solid rgba(255,255,255,.1)" }}>
            <div style={{ maxWidth: 320 }}>
              <img src="/premium/logo-blue-white.svg" alt="Spotts" style={{ height: 26, display: "block", marginBottom: 16 }} />
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "rgba(255,255,255,.55)" }}>Golazo is powered by Spotts — tickets, tables and vendor slots, all handled in one place.</p>
            </div>
            <div style={{ display: "flex", gap: "clamp(32px,5vw,64px)", flexWrap: "wrap" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(255,255,255,.45)" }}>Golazo</span>
                <a href="#teams" style-hover="color: #fff;" style={{ fontSize: 14, color: "rgba(255,255,255,.75)", textDecoration: "none" }}>Enter a team</a>
                <a href="#vendors" style-hover="color: #fff;" style={{ fontSize: 14, color: "rgba(255,255,255,.75)", textDecoration: "none" }}>Vendor slots</a>
                <a href="/events" style-hover="color: #fff;" style={{ fontSize: 14, color: "rgba(255,255,255,.75)", textDecoration: "none" }}>Spotts Events</a>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(255,255,255,.45)" }}>Support</span>
                <a href="/support" style-hover="color: #fff;" style={{ fontSize: 14, color: "rgba(255,255,255,.75)", textDecoration: "none" }}>Help &amp; support</a>
                <a href="mailto:info@spottsapp.com" style-hover="color: #fff;" style={{ fontSize: 14, color: "rgba(255,255,255,.75)", textDecoration: "none" }}>info@spottsapp.com</a>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(255,255,255,.45)" }}>Legal</span>
                <a href="/terms" style-hover="color: #fff;" style={{ fontSize: 14, color: "rgba(255,255,255,.75)", textDecoration: "none" }}>Terms &amp; Conditions</a>
                <a href="/refund" style-hover="color: #fff;" style={{ fontSize: 14, color: "rgba(255,255,255,.75)", textDecoration: "none" }}>Refund Policy</a>
              </div>
            </div>
          </div>
          <div style={{ paddingTop: 22, display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "space-between", fontSize: 13, color: "rgba(255,255,255,.4)" }}>
            <span>© 2026 Spotts. Made in Abuja.</span>
            <span>Golazo — play hard, party harder.</span>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default PremiumGollazo;
