// Gollazo Fest — the live commerce page (GOLLAZO_PLAN.md Phase 5).
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
// fee is added on top so Gollazo receives the round number. Recomputing that
// formula in the browser is how it would drift from what is actually charged.
import { useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { setupPremiumPage } from "./premium/setup";
import "./premium/premium.css";
import {
  ApiValidationError,
  clearPendingRegistration,
  formatNaira,
  getEventGroup,
  readPendingRegistration,
  registerAndPay,
  verifyPayment,
  type EventCard,
} from "@/lib/spottsApi";

// Which event group this page sells. Resolved to live cards at runtime so card
// IDs never need hardcoding or a re-deploy when a card is recreated.
const GOLLAZO_GROUP = "gollazo";

// The teams section background. The ticket's perforation notches are punched
// using this exact value — if they ever diverge the notches show as discs.
const SECTION_BG = "#071120";

// Event details shown on the ticket. Placeholders until the card carries real
// event_date / event_time / venue — swap these for teamCard fields then.
const EVENT_DATE = "Sat, 20 Aug";
const EVENT_TIME = "12:00 PM";
const EVENT_VENUE = "SOHO, Abuja";

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

  // Cards are resolved from the event group at runtime (see GOLLAZO_GROUP).
  const [cards, setCards] = useState<EventCard[] | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [submitting, setSubmitting] = useState<Product | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [confirmed, setConfirmed] = useState<{ reference: string } | null>(null);
  // Typed live so the ticket on the right fills in as the captain types.
  const [teamNamePreview, setTeamNamePreview] = useState("");

  const teamCard = cards?.find((c) => c.type !== "vendor") ?? null;
  const vendorCard = cards?.find((c) => c.type === "vendor") ?? null;

  useEffect(() => {
    document.title = "Gollazo — by Spotts";
  }, []);

  useEffect(() => {
    getEventGroup(GOLLAZO_GROUP)
      .then(setCards)
      .catch(() => setLoadError(true));
  }, []);

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

    const fd = new FormData(e.currentTarget);
    const get = (k: string) => (fd.get(k) || "").toString().trim();

    setSubmitting(product);
    setFieldErrors({});

    try {
      await registerAndPay(card.id, "/gollazo/confirmed", {
        participant_name: get("name"),
        participant_email: get("email"),
        participant_phone: get("phone") || undefined,
        ...(product === "team"
          ? { team_name: get("team_name") || undefined }
          : { brand: get("brand") || undefined, vendor_notes: get("about") || undefined }),
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

  /** "₦100,000 + ₦1,625 fees" — straight from the API, never recomputed. */
  const priceLine = (card: EventCard | null) => {
    if (!card) return "";
    const p = card.pricing;
    return p.fee_passed_on && p.gateway_fee > 0
      ? `${formatNaira(p.list_price)} + ${formatNaira(p.gateway_fee)} fees = ${formatNaira(p.total)}`
      : formatNaira(p.total);
  };



  return (
    <div ref={rootRef} className="premium-root" style={{ fontFamily: "'Inter Display', 'Helvetica Neue', sans-serif", color: "#0A1220", background: "#FAFBFD", overflowX: "clip" }}>
      {/* NAV */}
      <header style={{ position: "sticky", top: 0, zIndex: 60, background: "rgba(250,251,253,.88)", backdropFilter: "blur(14px)", borderBottom: "1px solid rgba(10,18,32,.07)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(20px,4vw,48px)", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <a href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
            <img src="/premium/logo-blue-black.svg" alt="Spotts" style={{ height: 26, display: "block" }} />
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "#51607A", border: "1px solid rgba(10,18,32,.14)", padding: "4px 10px", borderRadius: 999 }}>Gollazo</span>
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
        <div aria-hidden style={{ position: "absolute", right: -50, bottom: -70, fontSize: "clamp(160px,24vw,340px)", fontWeight: 800, fontStyle: "italic", letterSpacing: "-0.06em", lineHeight: 1, color: "transparent", WebkitTextStroke: "2px rgba(0,122,255,.16)", userSelect: "none", pointerEvents: "none", transform: "rotate(-4deg)" }}>GOL</div>
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
          <h1 style={{ margin: "0 0 20px", fontSize: "clamp(52px,8.5vw,120px)", fontWeight: 800, fontStyle: "italic", letterSpacing: "-0.055em", lineHeight: .92, transform: "rotate(-2deg)", transformOrigin: "left bottom", display: "inline-block" }}>GOLLAZO<span style={{ color: "#007AFF" }}>!</span></h1>
          <p style={{ margin: "0 0 14px", maxWidth: "56ch", fontSize: "clamp(17px,1.6vw,21px)", lineHeight: 1.55, color: "#51607A", textWrap: "pretty" }}>A sports tournament wrapped in a festival. Football and padel by day, <b style={{ color: "#0A1220" }}>Seyi Vibez live</b> by night — with food, vendors and tables for the people who want the best seat in the house.</p>
          <p style={{ margin: "0 0 34px", fontSize: 15, fontWeight: 600, color: "#0A1220" }}>Sat, Dec 19 2026 · Eagle Square Grounds, Abuja <span style={{ color: "#A6B0C0", fontWeight: 500 }}>(dummy — TBC)</span></p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center" }}>
            <a href="#teams" style-hover="background: #0069DE; transform: translateY(-1px);" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#007AFF", color: "#fff", textDecoration: "none", fontSize: 15.5, fontWeight: 600, padding: "15px 30px", borderRadius: 999, transition: "background .2s, transform .2s" }}>Enter a team</a>
            <a href="#vendors" style-hover="border-color: rgba(10,18,32,.4);" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#fff", color: "#0A1220", border: "1px solid rgba(10,18,32,.16)", textDecoration: "none", fontSize: 15.5, fontWeight: 600, padding: "14px 28px", borderRadius: 999, transition: "border-color .2s" }}>Sell at Gollazo</a>
          </div>
        </div>
      </section>

      {/* THE FESTIVAL */}
      <section id="teams" style={{ background: SECTION_BG, color: "#fff", position: "relative", overflow: "clip" }}>
        <div aria-hidden style={{ position: "absolute", right: "-2%", top: "-4%", fontSize: "clamp(120px,18vw,260px)", fontWeight: 800, letterSpacing: "-0.05em", lineHeight: 1, color: "transparent", WebkitTextStroke: "1.5px rgba(255,255,255,.07)", pointerEvents: "none", userSelect: "none" }}>TEAMS</div>

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
                        <input name="name" required placeholder="Chidi Okafor" style={inputStyle} style-focus={focusRing} />
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
                    <a href="#vendors" style-hover="border-color: rgba(10,18,32,.4);" style={{ marginTop: 4, alignSelf: "flex-start", fontSize: 14, fontWeight: 600, color: "#0A1220", textDecoration: "none", border: "1px solid rgba(10,18,32,.16)", padding: "11px 22px", borderRadius: 999 }}>Also selling at Gollazo?</a>
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
                    <div style={{ fontSize: 11.5, letterSpacing: ".14em", textTransform: "uppercase", color: "#5AA9FF", fontWeight: 700, marginBottom: 8 }}>Gollazo · Team entry</div>
                    <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 16 }}>{teamNamePreview.trim() || teamCard.title}</div>
                    <div style={{ display: "flex", gap: 24, flexWrap: "wrap", fontSize: 13 }}>
                      <div>
                        <div style={{ color: "rgba(255,255,255,.45)", fontSize: 11, marginBottom: 3 }}>Date</div>
                        <div style={{ fontWeight: 600 }}>{EVENT_DATE}</div>
                      </div>
                      <div>
                        <div style={{ color: "rgba(255,255,255,.45)", fontSize: 11, marginBottom: 3 }}>Kick-off</div>
                        <div style={{ fontWeight: 600 }}>{EVENT_TIME}</div>
                      </div>
                      <div>
                        <div style={{ color: "rgba(255,255,255,.45)", fontSize: 11, marginBottom: 3 }}>Venue</div>
                        <div style={{ fontWeight: 600 }}>{EVENT_VENUE}</div>
                      </div>
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

      <section id="vendors" style={{ position: "relative", overflow: "clip" }}>
        <div aria-hidden style={{ position: "absolute", left: -40, bottom: -50, fontSize: "clamp(110px,16vw,220px)", fontWeight: 800, fontStyle: "italic", letterSpacing: "-0.05em", lineHeight: 1, color: "transparent", WebkitTextStroke: "1.8px rgba(0,122,255,.1)", userSelect: "none", pointerEvents: "none", transform: "rotate(-4deg)" }}>VENDORS</div>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(56px,8vh,100px) clamp(20px,4vw,48px)", position: "relative" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(28px,4vw,56px)", alignItems: "flex-start" }}>
            <div style={{ flex: "1 1 340px", minWidth: 0 }}>
              <p style={{ margin: "0 0 16px", fontSize: 12.5, fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase", color: "#007AFF" }}>Vendor village</p>
              <h2 style={{ margin: "0 0 14px", maxWidth: "20ch", fontSize: "clamp(28px,3.4vw,44px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.05, textWrap: "balance" }}>Sell to a captive crowd.</h2>
              <p style={{ margin: "0 0 28px", maxWidth: "52ch", fontSize: 16, lineHeight: 1.6, color: "#51607A" }}>Thousands of players, fans and festival-goers on site from morning to midnight. Pick a slot, tell us what you sell, and pay to lock it in.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style-hover="transform: translateY(-3px); box-shadow: 0 18px 40px -24px rgba(10,18,32,.3);" style={{ border: "1px solid rgba(10,18,32,.09)", borderRadius: 16, background: "#fff", padding: "18px 22px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 14, flexWrap: "wrap", transition: "transform .3s cubic-bezier(.2,.8,.2,1), box-shadow .3s" }}>
                  <div><div style={{ fontSize: 15.5, fontWeight: 700 }}>Food stand</div><div style={{ fontSize: 13.5, color: "#8794A8" }}>3m × 3m booth · power · 2 vendor passes</div></div>
                  <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: "-0.02em" }}>₦350,000</span>
                </div>
                <div style-hover="transform: translateY(-3px); box-shadow: 0 18px 40px -24px rgba(10,18,32,.3);" style={{ border: "1px solid rgba(10,18,32,.09)", borderRadius: 16, background: "#fff", padding: "18px 22px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 14, flexWrap: "wrap", transition: "transform .3s cubic-bezier(.2,.8,.2,1), box-shadow .3s" }}>
                  <div><div style={{ fontSize: 15.5, fontWeight: 700 }}>Drinks stand</div><div style={{ fontSize: 13.5, color: "#8794A8" }}>3m × 3m booth · power + chiller point · 2 vendor passes</div></div>
                  <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: "-0.02em" }}>₦400,000</span>
                </div>
                <div style-hover="transform: translateY(-3px); box-shadow: 0 18px 40px -24px rgba(10,18,32,.3);" style={{ border: "1px solid rgba(10,18,32,.09)", borderRadius: 16, background: "#fff", padding: "18px 22px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 14, flexWrap: "wrap", transition: "transform .3s cubic-bezier(.2,.8,.2,1), box-shadow .3s" }}>
                  <div><div style={{ fontSize: 15.5, fontWeight: 700 }}>Lifestyle / retail stand</div><div style={{ fontSize: 13.5, color: "#8794A8" }}>2m × 2m booth · 2 vendor passes</div></div>
                  <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: "-0.02em" }}>₦250,000</span>
                </div>
              </div>
              <p style={{ margin: "18px 0 0", fontSize: 13.5, color: "#8794A8" }}>Placeholder pricing. Slots are limited and confirmed on payment.</p>
            </div>

            {/* Vendor purchase — LD-D: a straight purchase, not an application */}
            <div style={{ flex: "1 1 380px", minWidth: 0 }}>
              {vendorCard && (
                <form onSubmit={(e) => submitPurchase(e, "vendor", vendorCard)} style={{ border: "1px solid rgba(10,18,32,.09)", borderRadius: 22, background: "#fff", padding: "clamp(24px,3vw,36px)", boxShadow: "0 24px 54px -34px rgba(10,18,32,.3)" }}>
                  <h3 style={{ margin: "0 0 6px", fontSize: "clamp(20px,2vw,25px)", fontWeight: 700, letterSpacing: "-0.03em" }}>Book your vendor slot</h3>
                  <p style={{ margin: "0 0 6px", fontSize: 14.5, lineHeight: 1.55, color: "#51607A" }}>Pay online and your pitch is confirmed instantly.</p>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 10, margin: "0 0 22px", flexWrap: "wrap" }}>
                    <span style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.03em" }}>{formatNaira(vendorCard.pricing.total)}</span>
                    {vendorCard.pricing.fee_passed_on && vendorCard.pricing.gateway_fee > 0 && (
                      <span style={{ fontSize: 13, color: "#8794A8" }}>{formatNaira(vendorCard.pricing.list_price)} + {formatNaira(vendorCard.pricing.gateway_fee)} payment fees</span>
                    )}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,220px),1fr))", gap: 16 }}>
                    <label style={{ display: "flex", flexDirection: "column", gridColumn: "1 / -1" }}>
                      <span style={labelCaption}>Brand / business name</span>
                      <input name="brand" required placeholder="Suya Republic" style={inputStyle} style-focus={focusRing} />
                      {fieldErrors.brand && <span style={{ fontSize: 12, color: "#B42318", marginTop: 5 }}>{fieldErrors.brand}</span>}
                    </label>
                    <label style={{ display: "flex", flexDirection: "column" }}>
                      <span style={labelCaption}>Contact name</span>
                      <input name="name" required placeholder="Aisha Bello" style={inputStyle} style-focus={focusRing} />
                      {fieldErrors.participant_name && <span style={{ fontSize: 12, color: "#B42318", marginTop: 5 }}>{fieldErrors.participant_name}</span>}
                    </label>
                    <label style={{ display: "flex", flexDirection: "column" }}>
                      <span style={labelCaption}>Phone</span>
                      <input name="phone" placeholder="+234 800 000 0000" style={inputStyle} style-focus={focusRing} />
                    </label>
                    <label style={{ display: "flex", flexDirection: "column", gridColumn: "1 / -1" }}>
                      <span style={labelCaption}>Email</span>
                      <input name="email" type="email" required placeholder="you@brand.com" style={inputStyle} style-focus={focusRing} />
                      {fieldErrors.participant_email && <span style={{ fontSize: 12, color: "#B42318", marginTop: 5 }}>{fieldErrors.participant_email}</span>}
                    </label>
                    <label style={{ display: "flex", flexDirection: "column", gridColumn: "1 / -1" }}>
                      <span style={labelCaption}>What do you sell?</span>
                      <textarea name="about" rows={3} placeholder="Menu, products, anything we should know…" style={{ ...inputStyle, lineHeight: 1.55, resize: "vertical" }} style-focus={focusRing} />
                    </label>
                  </div>
                  <button type="submit" disabled={submitting !== null} style-hover="background: #0069DE;" style={{ marginTop: 22, border: "none", cursor: submitting ? "default" : "pointer", opacity: submitting === "vendor" ? 0.7 : 1, fontFamily: "inherit", fontSize: 15, fontWeight: 600, color: "#fff", background: "#007AFF", padding: "14px 28px", borderRadius: 999, transition: "background .2s" }}>
                    {submitting === "vendor" ? "Taking you to payment…" : `Pay ${formatNaira(vendorCard.pricing.total)} and book`}
                  </button>
                </form>
              )}
              {!vendorCard && !loadError && <p style={{ fontSize: 14, color: "#8794A8" }}>Loading…</p>}
              {loadError && <p style={{ fontSize: 14, color: "#B42318" }}>Vendor slots are temporarily unavailable. Please try again shortly.</p>}
            </div>
          </div>
        </div>
      </section>

      {/* MERCH TEASER */}
      <section style={{ background: "#071120", color: "#fff", position: "relative", overflow: "clip" }}>
        <div aria-hidden style={{ position: "absolute", right: -30, top: -20, fontSize: "clamp(90px,13vw,170px)", fontWeight: 800, letterSpacing: "-0.05em", lineHeight: 1, color: "transparent", WebkitTextStroke: "1.5px rgba(255,255,255,.07)", userSelect: "none", pointerEvents: "none" }}>SOON</div>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(48px,7vh,80px) clamp(20px,4vw,48px)", position: "relative", display: "flex", flexWrap: "wrap", gap: 24, alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ margin: "0 0 10px", fontSize: 12.5, fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase", color: "#5AA9FF" }}>Merch</p>
            <h2 style={{ margin: "0 0 10px", fontSize: "clamp(24px,2.8vw,36px)", fontWeight: 800, letterSpacing: "-0.035em" }}>The Gollazo drop is coming.</h2>
            <p style={{ margin: 0, maxWidth: "46ch", fontSize: 15, lineHeight: 1.6, color: "rgba(255,255,255,.6)" }}>Jerseys, tees and caps land closer to the festival. Get the app to be first in line when they drop.</p>
          </div>
          <a href="/#cta" style-hover="transform: translateY(-1px);" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#fff", color: "#0A1220", textDecoration: "none", fontSize: 15, fontWeight: 600, padding: "14px 28px", borderRadius: 999, whiteSpace: "nowrap", transition: "transform .2s" }}>Get the app</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#071120", color: "#fff", borderTop: "1px solid rgba(255,255,255,.08)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(40px,6vh,64px) clamp(20px,4vw,48px) 36px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 32, justifyContent: "space-between", alignItems: "flex-start", paddingBottom: 32, borderBottom: "1px solid rgba(255,255,255,.1)" }}>
            <div style={{ maxWidth: 320 }}>
              <img src="/premium/logo-blue-white.svg" alt="Spotts" style={{ height: 26, display: "block", marginBottom: 16 }} />
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "rgba(255,255,255,.55)" }}>Gollazo is powered by Spotts — tickets, tables and vendor slots, all handled in one place.</p>
            </div>
            <div style={{ display: "flex", gap: "clamp(32px,5vw,64px)", flexWrap: "wrap" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(255,255,255,.45)" }}>Gollazo</span>
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
            <span>Gollazo — play hard, party harder.</span>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default PremiumGollazo;
