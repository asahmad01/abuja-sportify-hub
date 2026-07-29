// Ported from Gollazo.dc.html. Has a mock table-checkout flow (details ->
// payment placeholder -> done) and a vendor application form, so — like
// Venue Onboarding and Contact — it's hand-built as React. Inline styles
// are copied verbatim from the export. The "payment gateway placeholder"
// step is intentionally left as-is: the export never wired a real gateway
// here (it says so directly in the UI), so faithfully porting it means
// keeping that placeholder rather than inventing a payment integration.
import { useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { setupPremiumPage } from "./premium/setup";
import "./premium/premium.css";

// TODO: create a Formspree form for vendor applications and paste the
// endpoint here (formspree.io) — same "guard, don't fake a network call"
// pattern used elsewhere until a real endpoint exists.
const FORMSPREE_VENDOR_ENDPOINT = "";

type Table = "platinum" | "gold";
type Step = "details" | "pay" | "done";
interface Checkout {
  table: Table;
  step: Step;
  buyerName: string;
  ref: string;
}

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

  const [checkout, setCheckout] = useState<Checkout | null>(null);
  const [vendorSubmitted, setVendorSubmitted] = useState(false);
  const [vendorBrand, setVendorBrand] = useState("");
  const [vendorLoading, setVendorLoading] = useState(false);

  useEffect(() => {
    document.title = "Gollazo — by Spotts";
  }, []);

  useEffect(() => {
    if (!rootRef.current) return;
    return setupPremiumPage(rootRef.current);
  }, [checkout, vendorSubmitted]);

  const openCheckout = (table: Table) => setCheckout({ table, step: "details", buyerName: "", ref: "" });
  const closeCheckout = () => setCheckout(null);
  const backToDetails = () => setCheckout((c) => (c ? { ...c, step: "details" } : c));

  const submitDetails = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = (new FormData(e.currentTarget).get("name") || "").toString().trim();
    setCheckout((c) => (c ? { ...c, step: "pay", buyerName: name } : c));
  };

  const pay = () => {
    const ref = "GLZ-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    setCheckout((c) => (c ? { ...c, step: "done", ref } : c));
  };

  const submitVendor = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const brand = (fd.get("brand") || "").toString().trim();
    setVendorLoading(true);
    try {
      if (FORMSPREE_VENDOR_ENDPOINT) {
        const payload: Record<string, unknown> = { formType: "Gollazo vendor application" };
        fd.forEach((value, key) => { payload[key] = value; });
        const response = await fetch(FORMSPREE_VENDOR_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error("Submit failed");
      }
      setVendorBrand(brand);
      setVendorSubmitted(true);
    } catch {
      toast({
        title: "Error",
        description: "Something went wrong submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setVendorLoading(false);
    }
  };

  const isPlat = checkout?.table === "platinum";
  const tableName = isPlat ? "Platinum table" : "Gold table";
  const tablePrice = isPlat ? "₦10,000,000" : "₦5,000,000";

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
            <a href="#festival" style-hover="color: #0A1220;" style={{ color: "#51607A", textDecoration: "none" }}>The festival</a>
            <a href="#vendors" style-hover="color: #0A1220;" style={{ color: "#51607A", textDecoration: "none" }}>Vendors</a>
          </nav>
          <a href="#tables" data-mm="cta" style-hover="background: #0069DE;" style={{ fontSize: 14, fontWeight: 600, color: "#fff", background: "#007AFF", textDecoration: "none", padding: "10px 18px", borderRadius: 999, whiteSpace: "nowrap" }}>Book a table</a>
          <button type="button" data-mm="burger" aria-label="Open menu" style={{ display: "none", alignItems: "center", justifyContent: "center", width: 42, height: 42, border: "1px solid rgba(10,18,32,.14)", borderRadius: 12, background: "#fff", color: "#0A1220", fontSize: 20, lineHeight: 1, cursor: "pointer", padding: 0 }}>☰</button>
        </div>
        <div data-mm="panel" style={{ display: "none", borderTop: "1px solid rgba(10,18,32,.08)", background: "rgba(250,251,253,.98)", padding: "10px clamp(20px,4vw,48px) 22px" }}>
          <nav aria-label="Mobile" style={{ display: "flex", flexDirection: "column" }}>
            <a href="#festival" data-mm-close="1" style={{ color: "#0A1220", textDecoration: "none", fontSize: 16, fontWeight: 600, padding: "13px 0", borderBottom: "1px solid rgba(10,18,32,.07)" }}>The festival</a>
            <a href="#vendors" data-mm-close="1" style={{ color: "#0A1220", textDecoration: "none", fontSize: 16, fontWeight: 600, padding: "13px 0", borderBottom: "1px solid rgba(10,18,32,.07)" }}>Vendors</a>
            <a href="#tables" data-mm-close="1" style={{ textAlign: "center", fontSize: 15, fontWeight: 600, color: "#fff", background: "#007AFF", textDecoration: "none", padding: "14px 16px", borderRadius: 12, marginTop: 14 }}>Book a table</a>
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
            <a href="#tables" style-hover="background: #0069DE; transform: translateY(-1px);" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#007AFF", color: "#fff", textDecoration: "none", fontSize: 15.5, fontWeight: 600, padding: "15px 30px", borderRadius: 999, transition: "background .2s, transform .2s" }}>Book a table</a>
            <a href="#vendors" style-hover="border-color: rgba(10,18,32,.4);" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#fff", color: "#0A1220", border: "1px solid rgba(10,18,32,.16)", textDecoration: "none", fontSize: 15.5, fontWeight: 600, padding: "14px 28px", borderRadius: 999, transition: "border-color .2s" }}>Sell at Gollazo</a>
          </div>
        </div>
      </section>

      {/* THE FESTIVAL */}
      <section id="festival" style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(56px,8vh,100px) clamp(20px,4vw,48px)" }}>
        <p style={{ margin: "0 0 16px", fontSize: 12.5, fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase", color: "#007AFF" }}>One day. Three worlds.</p>
        <h2 style={{ margin: "0 0 40px", maxWidth: "22ch", fontSize: "clamp(28px,3.4vw,44px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.05, textWrap: "balance" }}>More than a tournament.</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,280px), 1fr))", gap: 18 }}>
          <div style={{ border: "1px solid rgba(10,18,32,.09)", borderRadius: 20, background: "#fff", padding: "clamp(24px,3vw,32px)", display: "flex", flexDirection: "column", gap: 12 }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "#007AFF" }}>By day</span>
            <h3 style={{ margin: 0, fontSize: "clamp(19px,1.9vw,24px)", fontWeight: 700, letterSpacing: "-0.025em" }}>The tournament</h3>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "#51607A" }}>Knockout football and padel brackets running side by side. Teams register on Spotts, fixtures and live scores run in the app.</p>
          </div>
          <div style={{ border: "1px solid rgba(31,168,85,.25)", borderRadius: 20, background: "#F3FBF5", padding: "clamp(24px,3vw,32px)", display: "flex", flexDirection: "column", gap: 12 }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "#1FA855" }}>By night</span>
            <h3 style={{ margin: 0, fontSize: "clamp(19px,1.9vw,24px)", fontWeight: 700, letterSpacing: "-0.025em" }}>Seyi Vibez, live</h3>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "#51607A" }}>When the finals wrap, the stage takes over. Headline performance under the lights — tables sit front and centre.</p>
          </div>
          <div style={{ border: "1px solid rgba(10,18,32,.09)", borderRadius: 20, background: "#fff", padding: "clamp(24px,3vw,32px)", display: "flex", flexDirection: "column", gap: 12 }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "#007AFF" }}>All day</span>
            <h3 style={{ margin: 0, fontSize: "clamp(19px,1.9vw,24px)", fontWeight: 700, letterSpacing: "-0.025em" }}>The village</h3>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "#51607A" }}>A vendor village of food, drinks and lifestyle stands wrapped around the pitches. Merch drop coming soon.</p>
          </div>
        </div>
      </section>

      {/* TABLES */}
      <section id="tables" style={{ background: "#fff", borderTop: "1px solid rgba(10,18,32,.07)", borderBottom: "1px solid rgba(10,18,32,.07)", position: "relative", overflow: "clip" }}>
        <div aria-hidden style={{ position: "absolute", left: -30, top: 20, fontSize: "clamp(100px,14vw,190px)", fontWeight: 800, letterSpacing: "-0.05em", lineHeight: 1, color: "transparent", WebkitTextStroke: "1.5px rgba(0,122,255,.08)", userSelect: "none", pointerEvents: "none" }}>VIP</div>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(56px,8vh,100px) clamp(20px,4vw,48px)", position: "relative" }}>
          <p style={{ margin: "0 0 16px", fontSize: 12.5, fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase", color: "#007AFF" }}>Tables</p>
          <h2 style={{ margin: "0 0 14px", maxWidth: "22ch", fontSize: "clamp(28px,3.4vw,44px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.05, textWrap: "balance" }}>The best seat at Gollazo.</h2>
          <p style={{ margin: "0 0 40px", maxWidth: "58ch", fontSize: 16, lineHeight: 1.6, color: "#51607A" }}>Pitchside by day, stage-front by night. Every table is served, secured and yours for the whole festival. Paid upfront — confirmed instantly.</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,320px), 1fr))", gap: 20, maxWidth: 860 }}>
            {/* PLATINUM */}
            <div style-hover="transform: translateY(-6px); box-shadow: 0 50px 100px -34px rgba(10,18,32,.65);" style={{ borderRadius: 22, background: "#0A1220", color: "#fff", display: "flex", flexDirection: "column", boxShadow: "0 40px 90px -34px rgba(10,18,32,.55)", transition: "transform .35s cubic-bezier(.2,.8,.2,1), box-shadow .35s" }}>
              <div style={{ padding: "clamp(24px,3vw,32px) clamp(24px,3vw,32px) 20px", display: "flex", flexDirection: "column", gap: 16, flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(255,255,255,.5)" }}>Gollazo · Table pass</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#0A1220", background: "#5AA9FF", padding: "5px 12px", borderRadius: 999, whiteSpace: "nowrap" }}>4 of 8 left</span>
                </div>
                <div>
                  <div style={{ fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", color: "#5AA9FF", fontWeight: 700, marginBottom: 6 }}>Platinum</div>
                  <div style={{ fontSize: "clamp(32px,3.2vw,42px)", fontWeight: 800, letterSpacing: "-0.04em" }}>₦10,000,000</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 11, fontSize: 14.5, lineHeight: 1.5, color: "rgba(255,255,255,.82)" }}>
                  <div style={{ display: "flex", gap: 10 }}><span style={{ color: "#5AA9FF", fontWeight: 700 }}>✓</span>Seats 10 guests, stage-front row</div>
                  <div style={{ display: "flex", gap: 10 }}><span style={{ color: "#5AA9FF", fontWeight: 700 }}>✓</span>Premium bottle service all day</div>
                  <div style={{ display: "flex", gap: 10 }}><span style={{ color: "#5AA9FF", fontWeight: 700 }}>✓</span>Dedicated host + private security</div>
                  <div style={{ display: "flex", gap: 10 }}><span style={{ color: "#5AA9FF", fontWeight: 700 }}>✓</span>Meet &amp; greet with the headliner</div>
                  <div style={{ display: "flex", gap: 10 }}><span style={{ color: "#5AA9FF", fontWeight: 700 }}>✓</span>3 VIP parking spots</div>
                </div>
              </div>
              <div style={{ position: "relative", display: "flex", alignItems: "center", padding: "0 8px" }}>
                <span aria-hidden style={{ position: "absolute", left: -11, width: 22, height: 22, borderRadius: "50%", background: "#fff" }} />
                <span aria-hidden style={{ flex: 1, borderTop: "2px dashed rgba(255,255,255,.22)", margin: "0 16px" }} />
                <span aria-hidden style={{ position: "absolute", right: -11, width: 22, height: 22, borderRadius: "50%", background: "#fff" }} />
              </div>
              <div style={{ padding: "18px clamp(24px,3vw,32px) clamp(22px,3vw,28px)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
                <div>
                  <div style={{ fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(255,255,255,.45)", marginBottom: 4 }}>Admits</div>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>10 guests · all day</div>
                </div>
                <button type="button" onClick={() => openCheckout("platinum")} style-hover="transform: translateY(-1px);" style={{ border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 600, color: "#0A1220", background: "#fff", padding: "13px 26px", borderRadius: 999, transition: "transform .2s" }}>Reserve Platinum</button>
              </div>
            </div>

            {/* GOLD */}
            <div style-hover="transform: translateY(-6px); box-shadow: 0 30px 60px -30px rgba(10,18,32,.3);" style={{ border: "1px solid rgba(10,18,32,.1)", borderRadius: 22, background: "#FAFBFD", display: "flex", flexDirection: "column", transition: "transform .35s cubic-bezier(.2,.8,.2,1), box-shadow .35s" }}>
              <div style={{ padding: "clamp(24px,3vw,32px) clamp(24px,3vw,32px) 20px", display: "flex", flexDirection: "column", gap: 16, flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: "#8794A8" }}>Gollazo · Table pass</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#007AFF", background: "rgba(0,122,255,.1)", padding: "5px 12px", borderRadius: 999, whiteSpace: "nowrap" }}>9 of 16 left</span>
                </div>
                <div>
                  <div style={{ fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", color: "#007AFF", fontWeight: 700, marginBottom: 6 }}>Gold</div>
                  <div style={{ fontSize: "clamp(32px,3.2vw,42px)", fontWeight: 800, letterSpacing: "-0.04em" }}>₦5,000,000</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 11, fontSize: 14.5, lineHeight: 1.5, color: "#51607A" }}>
                  <div style={{ display: "flex", gap: 10 }}><span style={{ color: "#007AFF", fontWeight: 700 }}>✓</span>Seats 8 guests, VIP zone</div>
                  <div style={{ display: "flex", gap: 10 }}><span style={{ color: "#007AFF", fontWeight: 700 }}>✓</span>Bottle service all day</div>
                  <div style={{ display: "flex", gap: 10 }}><span style={{ color: "#007AFF", fontWeight: 700 }}>✓</span>Dedicated waiter</div>
                  <div style={{ display: "flex", gap: 10 }}><span style={{ color: "#007AFF", fontWeight: 700 }}>✓</span>Fast-lane entry for all guests</div>
                  <div style={{ display: "flex", gap: 10 }}><span style={{ color: "#007AFF", fontWeight: 700 }}>✓</span>1 VIP parking spot</div>
                </div>
              </div>
              <div style={{ position: "relative", display: "flex", alignItems: "center", padding: "0 8px" }}>
                <span aria-hidden style={{ position: "absolute", left: -11, width: 22, height: 22, borderRadius: "50%", background: "#fff", border: "1px solid rgba(10,18,32,.1)", boxSizing: "border-box" }} />
                <span aria-hidden style={{ flex: 1, borderTop: "2px dashed rgba(10,18,32,.18)", margin: "0 16px" }} />
                <span aria-hidden style={{ position: "absolute", right: -11, width: 22, height: 22, borderRadius: "50%", background: "#fff", border: "1px solid rgba(10,18,32,.1)", boxSizing: "border-box" }} />
              </div>
              <div style={{ padding: "18px clamp(24px,3vw,32px) clamp(22px,3vw,28px)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
                <div>
                  <div style={{ fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: "#8794A8", marginBottom: 4 }}>Admits</div>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>8 guests · all day</div>
                </div>
                <button type="button" onClick={() => openCheckout("gold")} style-hover="background: #0069DE; transform: translateY(-1px);" style={{ border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 600, color: "#fff", background: "#007AFF", padding: "13px 26px", borderRadius: 999, transition: "background .2s, transform .2s" }}>Reserve Gold</button>
              </div>
            </div>
          </div>
          <p style={{ margin: "22px 0 0", fontSize: 13.5, color: "#8794A8" }}>All prices are placeholders. General admission tickets sell separately on the Spotts app.</p>
        </div>
      </section>

      {/* VENDORS */}
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

            {/* Vendor form */}
            <div style={{ flex: "1 1 380px", minWidth: 0 }}>
              {!vendorSubmitted && (
                <form onSubmit={submitVendor} style={{ border: "1px solid rgba(10,18,32,.09)", borderRadius: 22, background: "#fff", padding: "clamp(24px,3vw,36px)", boxShadow: "0 24px 54px -34px rgba(10,18,32,.3)" }}>
                  <h3 style={{ margin: "0 0 6px", fontSize: "clamp(20px,2vw,25px)", fontWeight: 700, letterSpacing: "-0.025em" }}>Apply for a vendor slot</h3>
                  <p style={{ margin: "0 0 24px", fontSize: 14.5, lineHeight: 1.55, color: "#51607A" }}>Tell us about your brand. We confirm slots and send a payment link within 48 hours.</p>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,200px), 1fr))", gap: 16 }}>
                    <label style={{ display: "flex", flexDirection: "column" }}><span style={labelCaption}>Brand / business name</span><input name="brand" type="text" required placeholder="Suya Republic" style={inputStyle} style-focus={focusRing} /></label>
                    <label style={{ display: "flex", flexDirection: "column" }}><span style={labelCaption}>Contact name</span><input name="name" type="text" required placeholder="Chidi Okafor" style={inputStyle} style-focus={focusRing} /></label>
                    <label style={{ display: "flex", flexDirection: "column" }}><span style={labelCaption}>Phone</span><input name="phone" type="tel" required placeholder="+234 800 000 0000" style={inputStyle} style-focus={focusRing} /></label>
                    <label style={{ display: "flex", flexDirection: "column" }}><span style={labelCaption}>Email</span><input name="email" type="email" required placeholder="you@brand.com" style={inputStyle} style-focus={focusRing} /></label>
                    <label style={{ display: "flex", flexDirection: "column", gridColumn: "1 / -1" }}>
                      <span style={labelCaption}>Slot type</span>
                      <select name="slot" style={{ ...inputStyle, cursor: "pointer" }}>
                        <option>Food stand — ₦350,000</option><option>Drinks stand — ₦400,000</option><option>Lifestyle / retail stand — ₦250,000</option>
                      </select>
                    </label>
                    <label style={{ display: "flex", flexDirection: "column", gridColumn: "1 / -1" }}><span style={labelCaption}>What do you sell?</span><textarea name="about" required rows={3} placeholder="Menu, products, anything we should know…" style={{ ...inputStyle, lineHeight: 1.55, resize: "vertical" }} style-focus={focusRing} /></label>
                  </div>
                  <button type="submit" disabled={vendorLoading} style-hover="background: #0069DE;" style={{ marginTop: 22, border: "none", cursor: vendorLoading ? "default" : "pointer", opacity: vendorLoading ? 0.7 : 1, fontFamily: "inherit", fontSize: 15, fontWeight: 600, color: "#fff", background: "#007AFF", padding: "14px 28px", borderRadius: 999, transition: "background .2s" }}>{vendorLoading ? "Submitting…" : "Apply for a slot"}</button>
                </form>
              )}
              {vendorSubmitted && (
                <div style={{ border: "1px solid rgba(31,168,85,.3)", borderRadius: 22, background: "#F3FBF5", padding: "clamp(30px,4vw,44px)", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#1FA855", color: "#fff", display: "grid", placeItems: "center", fontSize: 26 }}>✓</div>
                  <h3 style={{ margin: 0, fontSize: "clamp(21px,2.2vw,27px)", fontWeight: 800, letterSpacing: "-0.03em" }}>Application in{vendorBrand ? `, ${vendorBrand}` : ""}</h3>
                  <p style={{ margin: 0, maxWidth: "40ch", fontSize: 15, lineHeight: 1.6, color: "#51607A" }}>We'll review and send a payment link to your email within 48 hours. Your slot is locked once payment clears.</p>
                  <button type="button" onClick={() => setVendorSubmitted(false)} style-hover="border-color: rgba(10,18,32,.4);" style={{ border: "1px solid rgba(10,18,32,.16)", cursor: "pointer", fontFamily: "inherit", fontSize: 14, fontWeight: 600, color: "#0A1220", background: "#fff", padding: "11px 22px", borderRadius: 999, marginTop: 4, transition: "border-color .2s" }}>Submit another application</button>
                </div>
              )}
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
                <a href="#tables" style-hover="color: #fff;" style={{ fontSize: 14, color: "rgba(255,255,255,.75)", textDecoration: "none" }}>Book a table</a>
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

      {/* CHECKOUT MODAL */}
      {checkout && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(7,17,32,.55)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, overflowY: "auto" }}>
          <div style={{ background: "#fff", borderRadius: 24, width: "min(560px, 100%)", maxHeight: "90vh", overflowY: "auto", padding: "clamp(26px,4vw,40px)", boxShadow: "0 40px 90px -30px rgba(7,17,32,.6)", position: "relative" }}>
            <button type="button" aria-label="Close" onClick={closeCheckout} style-hover="color: #0A1220; border-color: rgba(10,18,32,.35);" style={{ position: "absolute", top: 18, right: 18, border: "1px solid rgba(10,18,32,.12)", background: "#fff", color: "#51607A", cursor: "pointer", width: 38, height: 38, borderRadius: "50%", fontSize: 15, transition: "color .2s, border-color .2s" }}>✕</button>

            {checkout.step === "details" && (
              <form onSubmit={submitDetails}>
                <p style={{ margin: "0 0 8px", fontSize: 12, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "#007AFF" }}>Step 1 of 2 — Your details</p>
                <h3 style={{ margin: "0 0 4px", fontSize: "clamp(21px,2.2vw,26px)", fontWeight: 800, letterSpacing: "-0.03em" }}>{tableName}</h3>
                <p style={{ margin: "0 0 24px", fontSize: 15, color: "#51607A" }}>{tablePrice} · Sat, Dec 19 2026 · Abuja</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,200px), 1fr))", gap: 16 }}>
                  <label style={{ display: "flex", flexDirection: "column" }}><span style={labelCaption}>Full name</span><input name="name" type="text" required placeholder="Aisha Bello" style={inputStyle} style-focus={focusRing} /></label>
                  <label style={{ display: "flex", flexDirection: "column" }}><span style={labelCaption}>Phone</span><input name="phone" type="tel" required placeholder="+234 800 000 0000" style={inputStyle} style-focus={focusRing} /></label>
                  <label style={{ display: "flex", flexDirection: "column", gridColumn: "1 / -1" }}><span style={labelCaption}>Email <span style={{ color: "#A6B0C0", fontWeight: 500 }}>— confirmation goes here</span></span><input name="email" type="email" required placeholder="you@email.com" style={inputStyle} style-focus={focusRing} /></label>
                  <label style={{ display: "flex", flexDirection: "column", gridColumn: "1 / -1" }}><span style={labelCaption}>Table name <span style={{ color: "#A6B0C0", fontWeight: 500 }}>(optional — shown on your table card)</span></span><input name="table_label" type="text" placeholder="e.g. Team Okafor" style={inputStyle} style-focus={focusRing} /></label>
                </div>
                <button type="submit" style-hover="background: #0069DE;" style={{ marginTop: 24, width: "100%", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15.5, fontWeight: 600, color: "#fff", background: "#007AFF", padding: "15px 28px", borderRadius: 999, transition: "background .2s" }}>Continue to payment</button>
              </form>
            )}

            {checkout.step === "pay" && (
              <div>
                <p style={{ margin: "0 0 8px", fontSize: 12, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "#007AFF" }}>Step 2 of 2 — Payment</p>
                <h3 style={{ margin: "0 0 24px", fontSize: "clamp(21px,2.2vw,26px)", fontWeight: 800, letterSpacing: "-0.03em" }}>Confirm &amp; pay</h3>
                <div style={{ border: "1px solid rgba(10,18,32,.1)", borderRadius: 16, background: "#FAFBFD", padding: "20px 22px", display: "flex", flexDirection: "column", gap: 10, marginBottom: 22, fontSize: 14.5 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}><span style={{ color: "#51607A" }}>Table</span><b>{tableName}</b></div>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}><span style={{ color: "#51607A" }}>Booked by</span><b>{checkout.buyerName || "—"}</b></div>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}><span style={{ color: "#51607A" }}>Event</span><b>Gollazo · Sat, Dec 19 2026</b></div>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12, borderTop: "1px solid rgba(10,18,32,.1)", paddingTop: 12, marginTop: 4, fontSize: 16 }}><span style={{ color: "#51607A" }}>Total</span><b style={{ letterSpacing: "-0.02em" }}>{tablePrice}</b></div>
                </div>
                <div style={{ border: "1px dashed rgba(0,122,255,.4)", borderRadius: 14, background: "rgba(0,122,255,.04)", padding: "14px 18px", fontSize: 13, lineHeight: 1.55, color: "#51607A", marginBottom: 22, fontFamily: "ui-monospace, monospace" }}>payment gateway placeholder — wire your backend / Paystack here</div>
                <button type="button" onClick={pay} style-hover="background: #178F47;" style={{ width: "100%", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15.5, fontWeight: 600, color: "#fff", background: "#1FA855", padding: "15px 28px", borderRadius: 999, transition: "background .2s" }}>Pay {tablePrice}</button>
                <button type="button" onClick={backToDetails} style-hover="border-color: rgba(10,18,32,.35);" style={{ marginTop: 12, width: "100%", border: "1px solid rgba(10,18,32,.14)", cursor: "pointer", fontFamily: "inherit", fontSize: 14, fontWeight: 600, color: "#51607A", background: "#fff", padding: "12px 28px", borderRadius: 999, transition: "border-color .2s" }}>← Back</button>
              </div>
            )}

            {checkout.step === "done" && (
              <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 14, padding: "10px 0" }}>
                <div style={{ width: 62, height: 62, borderRadius: "50%", background: "#1FA855", color: "#fff", display: "grid", placeItems: "center", fontSize: 30 }}>✓</div>
                <h3 style={{ margin: 0, fontSize: "clamp(22px,2.4vw,30px)", fontWeight: 800, letterSpacing: "-0.03em" }}>Table secured 🎉</h3>
                <p style={{ margin: 0, maxWidth: "38ch", fontSize: 15, lineHeight: 1.6, color: "#51607A" }}>Your <b style={{ color: "#0A1220" }}>{tableName}</b> is confirmed. A receipt and your table QR code are on their way to your email.</p>
                <div style={{ border: "1px solid rgba(10,18,32,.1)", borderRadius: 12, background: "#FAFBFD", padding: "10px 18px", fontSize: 13.5, fontFamily: "ui-monospace, monospace", color: "#51607A" }}>Ref: {checkout.ref}</div>
                <button type="button" onClick={closeCheckout} style={{ border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 14.5, fontWeight: 600, color: "#fff", background: "#0A1220", padding: "13px 28px", borderRadius: 999, marginTop: 6 }}>Done</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PremiumGollazo;
