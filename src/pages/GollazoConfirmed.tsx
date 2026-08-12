// Post-payment confirmation for Gollazo entries and vendor slots.
//
// Its own route rather than an inline state on /gollazo: the buyer arrives here
// straight from Paystack, so this page owns one job — verify, then hand them a
// ticket they can screenshot. It is also shareable and survives a refresh.
//
// The reference and access token are read from sessionStorage, parked by
// registerAndPay before the gateway redirect (see lib/spottsApi).
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  clearPendingRegistration,
  formatNaira,
  readPendingRegistration,
  verifyPayment,
} from "@/lib/spottsApi";

const SECTION_BG = "#071120";

// Decorative only — the scannable code is emailed.
const QR_PATTERN = [
  1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0,
  1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1,
].map(Boolean);

const EVENT_DATE = "Sat, 20 Aug";
const EVENT_TIME = "12:00 PM";
const EVENT_VENUE = "SOHO, Abuja";

type State = "checking" | "confirmed" | "pending" | "missing";

const GollazoConfirmed = () => {
  const [state, setState] = useState<State>("checking");
  const [reference, setReference] = useState("");
  const [amount, setAmount] = useState<number | null>(null);

  useEffect(() => {
    document.title = "You're in — Gollazo by Spotts";

    const pending = readPendingRegistration();
    if (!pending) {
      setState("missing");
      return;
    }

    setReference(pending.reference);

    verifyPayment(pending.reference, pending.token)
      .then((res: any) => {
        setAmount(typeof res?.amount === "number" ? res.amount : null);
        setState("confirmed");
        clearPendingRegistration();
      })
      .catch(() => {
        // Paystack may still be settling. The webhook finishes the job either
        // way, so this is "not yet", never "failed" — and we deliberately do
        // NOT clear the pending record, so a refresh can retry.
        setState("pending");
      });
  }, []);

  return (
    <div style={{ fontFamily: "'Inter Display', 'Helvetica Neue', sans-serif", background: SECTION_BG, color: "#fff", minHeight: "100vh", position: "relative", overflowX: "clip" }}>
      <div aria-hidden style={{ position: "absolute", right: "-2%", top: "-4%", fontSize: "clamp(120px,18vw,260px)", fontWeight: 800, letterSpacing: "-0.05em", lineHeight: 1, color: "transparent", WebkitTextStroke: "1.5px rgba(255,255,255,.07)", pointerEvents: "none", userSelect: "none" }}>GOLLAZO</div>

      <div style={{ position: "relative", maxWidth: 560, margin: "0 auto", padding: "clamp(48px,9vh,96px) clamp(20px,5vw,32px)", display: "flex", flexDirection: "column", alignItems: "center", gap: 26, textAlign: "center" }}>
        <img src="/premium/logo-blue-white.svg" alt="Spotts" style={{ height: 22 }} />

        {state === "checking" && (
          <p style={{ margin: 0, fontSize: 15, color: "rgba(255,255,255,.6)" }}>Confirming your payment…</p>
        )}

        {state === "missing" && (
          <>
            <h1 style={{ margin: 0, fontSize: "clamp(26px,3.4vw,36px)", fontWeight: 800, letterSpacing: "-0.03em" }}>Nothing to confirm</h1>
            <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.6, color: "rgba(255,255,255,.6)" }}>
              We couldn&rsquo;t find a recent entry in this browser. If you&rsquo;ve paid, your
              confirmation email has everything you need.
            </p>
          </>
        )}

        {state === "pending" && (
          <>
            <h1 style={{ margin: 0, fontSize: "clamp(26px,3.4vw,36px)", fontWeight: 800, letterSpacing: "-0.03em" }}>We&rsquo;re confirming your payment</h1>
            <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.6, color: "rgba(255,255,255,.6)" }}>
              This can take a moment. Your confirmation email will arrive as soon as it clears —
              no need to pay again.
            </p>
            {reference && (
              <p style={{ margin: 0, fontSize: 12.5, fontFamily: "SFMono-Regular, Menlo, monospace", color: "rgba(255,255,255,.55)", background: "rgba(255,255,255,.06)", padding: "8px 14px", borderRadius: 8 }}>{reference}</p>
            )}
          </>
        )}

        {state === "confirmed" && (
          <>
            <div style={{ width: 60, height: 60, borderRadius: "50%", background: "#1FA855", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30 }}>✓</div>
            <h1 style={{ margin: 0, fontSize: "clamp(28px,3.6vw,40px)", fontWeight: 800, letterSpacing: "-0.035em", lineHeight: 1.1 }}>You&rsquo;re in.</h1>
            <p style={{ margin: 0, maxWidth: "40ch", fontSize: 15.5, lineHeight: 1.6, color: "rgba(255,255,255,.65)" }}>
              Payment confirmed. Your confirmation email and QR entry are on their way — show the
              code at the gate on the day.
            </p>

            {/* Same ticket as /gollazo and /events, in its paid state */}
            <div style={{ width: "min(400px,100%)", background: "#0A1220", borderRadius: 22, boxShadow: "0 40px 90px -34px rgba(0,0,0,.7)", border: "1px solid rgba(255,255,255,.08)", textAlign: "left", marginTop: 6 }}>
              <div style={{ padding: "26px 28px 22px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 20 }}>
                  <img src="/premium/logo-blue-white.svg" alt="Spotts" style={{ height: 18 }} />
                  <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(255,255,255,.5)" }}>E-Ticket</span>
                </div>
                <div style={{ fontSize: 11.5, letterSpacing: ".14em", textTransform: "uppercase", color: "#5AA9FF", fontWeight: 700, marginBottom: 8 }}>Gollazo · Team entry</div>
                <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 16 }}>Confirmed</div>
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
                    {QR_PATTERN.slice(0, 49).map((on, i) => (
                      <span key={i} style={{ background: on ? "#0A1220" : "rgba(10,18,32,.15)" }} />
                    ))}
                  </div>
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(255,255,255,.45)", fontWeight: 700, marginBottom: 5 }}>Admit one team</div>
                  <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: "-0.02em" }}>
                    {amount ? formatNaira(amount) : "Paid"} <span style={{ color: "#4ADE80" }}>· Paid ✓</span>
                  </div>
                  <div style={{ fontSize: 12, color: "#4ADE80", marginTop: 3 }}>Delivered instantly</div>
                </div>
              </div>
            </div>

            {reference && (
              <p style={{ margin: 0, fontSize: 12.5, fontFamily: "SFMono-Regular, Menlo, monospace", color: "rgba(255,255,255,.55)", background: "rgba(255,255,255,.06)", padding: "8px 14px", borderRadius: 8 }}>{reference}</p>
            )}
          </>
        )}

        <Link to="/gollazo" style={{ marginTop: 4, fontSize: 14, fontWeight: 600, color: "#fff", textDecoration: "none", border: "1px solid rgba(255,255,255,.25)", padding: "12px 24px", borderRadius: 999 }}>
          Back to Gollazo
        </Link>
      </div>
    </div>
  );
};

export default GollazoConfirmed;
