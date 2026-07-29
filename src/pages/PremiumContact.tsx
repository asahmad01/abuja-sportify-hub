// Ported from Contact.dc.html. Has real tab-switching state (general / venue /
// event, synced to the URL hash) and three distinct forms, so — like Venue
// Onboarding — it's hand-built as React rather than injected HTML. Inline
// styles are copied verbatim from the export.
import { useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { setupPremiumPage } from "./premium/setup";
import "./premium/premium.css";

// All three contact forms post to one Formspree inbox; each submission carries
// a `formType` field ("General enquiry" / "List your venue" / "Host an event")
// so they stay distinguishable in the one inbox.
const FORMSPREE_CONTACT_ENDPOINT = "https://formspree.io/f/mojgbpeb";
const FORMSPREE_GENERAL_ENDPOINT = FORMSPREE_CONTACT_ENDPOINT;
const FORMSPREE_VENUE_ENDPOINT = FORMSPREE_CONTACT_ENDPOINT;
const FORMSPREE_EVENT_ENDPOINT = FORMSPREE_CONTACT_ENDPOINT;

type Tab = "general" | "venue" | "event";

const inputStyle: React.CSSProperties = {
  width: "100%", boxSizing: "border-box", fontFamily: "inherit", fontSize: 15,
  color: "#0A1220", background: "#fff", border: "1px solid rgba(10,18,32,.14)",
  borderRadius: 12, padding: "13px 15px", outline: "none",
  transition: "border-color .18s, box-shadow .18s",
};
const focusRing = "border-color: #007AFF; box-shadow: 0 0 0 3px rgba(0,122,255,.12);";
const labelCaption: React.CSSProperties = { fontSize: 12.5, fontWeight: 600, color: "#51607A", marginBottom: 7 };
const fieldsGrid: React.CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,220px), 1fr))", gap: 18 };
const formCardStyle: React.CSSProperties = { border: "1px solid rgba(10,18,32,.09)", borderRadius: 22, background: "#fff", padding: "clamp(24px,3vw,38px)", boxShadow: "0 24px 54px -34px rgba(10,18,32,.3)" };
const submitBtnStyle: React.CSSProperties = { border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 600, color: "#fff", background: "#007AFF", padding: "14px 28px", borderRadius: 999, transition: "background .2s" };

const PremiumContact = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [tab, setTabState] = useState<Tab>("general");
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Spotts — Get in touch";
    const applyHash = () => {
      const h = (location.hash || "").replace("#", "").toLowerCase();
      if (h === "venue" || h === "event" || h === "general") {
        setTabState(h as Tab);
        setSubmitted(false);
      }
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  useEffect(() => {
    if (!rootRef.current) return;
    return setupPremiumPage(rootRef.current);
  }, [tab, submitted]);

  const setTab = (t: Tab) => {
    setTabState(t);
    setSubmitted(false);
    if (history.replaceState) history.replaceState(null, "", "#" + t);
  };

  const tabBtnStyle = (active: boolean): React.CSSProperties => ({
    border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 14, fontWeight: 600,
    padding: "10px 20px", borderRadius: 999, whiteSpace: "nowrap", transition: "background .2s, color .2s",
    background: active ? "#0A1220" : "transparent", color: active ? "#fff" : "#51607A",
  });

  const submit = async (e: React.FormEvent<HTMLFormElement>, endpoint: string, formType: string) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const submittedName = (fd.get("name") || "").toString().trim().split(" ")[0];
    setLoading(true);
    try {
      if (endpoint) {
        const payload: Record<string, unknown> = { formType };
        fd.forEach((value, key) => { payload[key] = value; });
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error("Submit failed");
      }
      setName(submittedName);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      toast({
        title: "Error",
        description: "Something went wrong sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const showForm = !submitted;

  return (
    <div ref={rootRef} className="premium-root" style={{ fontFamily: "'Inter Display', 'Helvetica Neue', sans-serif", color: "#0A1220", background: "#FAFBFD", overflowX: "clip" }}>
      {/* NAV */}
      <header style={{ position: "sticky", top: 0, zIndex: 60, background: "rgba(250,251,253,.88)", backdropFilter: "blur(14px)", borderBottom: "1px solid rgba(10,18,32,.07)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(20px,4vw,48px)", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <a href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
            <img src="/premium/logo-blue-black.svg" alt="Spotts" style={{ height: 26, display: "block" }} />
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "#51607A", border: "1px solid rgba(10,18,32,.14)", padding: "4px 10px", borderRadius: 999 }}>Contact</span>
          </a>
          <a href="/#cta" style-hover="background: #0069DE;" style={{ fontSize: 14, fontWeight: 600, color: "#fff", background: "#007AFF", textDecoration: "none", padding: "10px 18px", borderRadius: 999, whiteSpace: "nowrap" }}>Get the app</a>
        </div>
      </header>

      {/* HERO */}
      <section style={{ position: "relative", overflow: "clip", background: "#fff", borderBottom: "1px solid rgba(10,18,32,.07)" }}>
        <div aria-hidden style={{ position: "absolute", right: -30, bottom: -50, fontSize: "clamp(110px,16vw,220px)", fontWeight: 800, letterSpacing: "-0.05em", lineHeight: 1, color: "transparent", WebkitTextStroke: "1.5px rgba(0,122,255,.09)", userSelect: "none", pointerEvents: "none" }}>HELLO</div>
        <svg aria-hidden viewBox="0 0 460 300" style={{ position: "absolute", left: -70, top: -40, width: "clamp(220px,26vw,420px)", pointerEvents: "none" }}>
          <g fill="none" stroke="#007AFF" strokeOpacity=".1" strokeWidth="2">
            <rect x="20" y="20" width="420" height="260" />
            <line x1="240" y1="20" x2="240" y2="280" />
            <circle cx="240" cy="150" r="60" />
            <rect x="20" y="90" width="70" height="120" />
            <rect x="370" y="90" width="70" height="120" />
          </g>
        </svg>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(56px,8vh,100px) clamp(20px,4vw,48px)", position: "relative" }}>
          <p style={{ margin: "0 0 18px", fontSize: 12.5, fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase", color: "#007AFF" }}>Get in touch</p>
          <h1 style={{ margin: "0 0 20px", maxWidth: "15ch", fontSize: "clamp(40px,5.6vw,76px)", fontWeight: 800, letterSpacing: "-0.05em", lineHeight: .98, textWrap: "balance" }}>Let's talk.</h1>
          <p style={{ margin: 0, maxWidth: "54ch", fontSize: "clamp(16px,1.4vw,19px)", lineHeight: 1.6, color: "#51607A", textWrap: "pretty" }}>Booking a game, listing your venue, or running an event — pick what you need below and we'll get right back to you. Most messages get a reply within one business day.</p>
        </div>
      </section>

      {/* FORMS */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(48px,7vh,88px) clamp(20px,4vw,48px)" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(28px,4vw,56px)", alignItems: "flex-start" }}>
          <div style={{ flex: "999 1 480px", minWidth: 0 }}>
            {showForm && (
              <div style={{ display: "inline-flex", background: "#fff", border: "1px solid rgba(10,18,32,.1)", borderRadius: 999, padding: 5, gap: 4, flexWrap: "wrap", marginBottom: 28, boxShadow: "0 2px 8px rgba(10,18,32,.04)" }}>
                <button type="button" onClick={() => setTab("general")} style={tabBtnStyle(tab === "general")}>General enquiry</button>
                <button type="button" onClick={() => setTab("venue")} style={tabBtnStyle(tab === "venue")}>List your venue</button>
                <button type="button" onClick={() => setTab("event")} style={tabBtnStyle(tab === "event")}>Host an event</button>
              </div>
            )}

            {showForm && tab === "general" && (
              <form onSubmit={(e) => submit(e, FORMSPREE_GENERAL_ENDPOINT, "General enquiry")} style={formCardStyle}>
                <h2 style={{ margin: "0 0 6px", fontSize: "clamp(22px,2.4vw,28px)", fontWeight: 700, letterSpacing: "-0.025em" }}>Send us a message</h2>
                <p style={{ margin: "0 0 26px", fontSize: 15, lineHeight: 1.55, color: "#51607A" }}>Questions about bookings, refunds, payments or anything else — we're listening.</p>
                <div style={fieldsGrid}>
                  <label style={{ display: "flex", flexDirection: "column" }}><span style={labelCaption}>Full name</span><input name="name" type="text" required placeholder="Chidi Okafor" style={inputStyle} style-focus={focusRing} /></label>
                  <label style={{ display: "flex", flexDirection: "column" }}><span style={labelCaption}>Email</span><input name="email" type="email" required placeholder="you@email.com" style={inputStyle} style-focus={focusRing} /></label>
                  <label style={{ display: "flex", flexDirection: "column" }}><span style={labelCaption}>Phone <span style={{ color: "#A6B0C0", fontWeight: 500 }}>(optional)</span></span><input name="phone" type="tel" placeholder="+234 800 000 0000" style={inputStyle} style-focus={focusRing} /></label>
                  <label style={{ display: "flex", flexDirection: "column" }}>
                    <span style={labelCaption}>Topic</span>
                    <select name="topic" style={{ ...inputStyle, cursor: "pointer" }} style-focus={focusRing}>
                      <option>General question</option><option>Booking issue</option><option>Refund</option><option>Payments</option><option>Press &amp; media</option><option>Something else</option>
                    </select>
                  </label>
                  <label style={{ display: "flex", flexDirection: "column", gridColumn: "1 / -1" }}><span style={labelCaption}>Message</span><textarea name="message" required rows={5} placeholder="How can we help?" style={{ ...inputStyle, lineHeight: 1.55, resize: "vertical" }} style-focus={focusRing} /></label>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 16, marginTop: 24 }}>
                  <button type="submit" disabled={loading} style={{ ...submitBtnStyle, opacity: loading ? 0.7 : 1 }} style-hover="background: #0069DE;">{loading ? "Sending…" : "Send message"}</button>
                  <span style={{ fontSize: 13, color: "#8794A8" }}>We reply within 1 business day.</span>
                </div>
              </form>
            )}

            {showForm && tab === "venue" && (
              <form onSubmit={(e) => submit(e, FORMSPREE_VENUE_ENDPOINT, "List your venue")} style={formCardStyle}>
                <h2 style={{ margin: "0 0 6px", fontSize: "clamp(22px,2.4vw,28px)", fontWeight: 700, letterSpacing: "-0.025em" }}>Put your venue on Spotts</h2>
                <p style={{ margin: "0 0 26px", fontSize: 15, lineHeight: 1.55, color: "#51607A" }}>Bookings paid upfront, a live dashboard, and a team bot that ends double-bookings. Tell us about your place and we'll set you up.</p>
                <div style={fieldsGrid}>
                  <label style={{ display: "flex", flexDirection: "column" }}><span style={labelCaption}>Your name</span><input name="name" type="text" required placeholder="Aisha Bello" style={inputStyle} style-focus={focusRing} /></label>
                  <label style={{ display: "flex", flexDirection: "column" }}><span style={labelCaption}>Venue name</span><input name="venue" type="text" required placeholder="Smokey Kickzone" style={inputStyle} style-focus={focusRing} /></label>
                  <label style={{ display: "flex", flexDirection: "column" }}>
                    <span style={labelCaption}>Venue type</span>
                    <select name="venue_type" style={{ ...inputStyle, cursor: "pointer" }} style-focus={focusRing}>
                      <option>Football pitch</option><option>Padel court</option><option>Tennis court</option><option>Basketball court</option><option>Gym</option><option>Multi-sport</option>
                    </select>
                  </label>
                  <label style={{ display: "flex", flexDirection: "column" }}><span style={labelCaption}>Area / location</span><input name="area" type="text" required placeholder="Wuse 2, Abuja" style={inputStyle} style-focus={focusRing} /></label>
                  <label style={{ display: "flex", flexDirection: "column" }}><span style={labelCaption}>Courts / pitches</span><input name="courts" type="number" min={1} placeholder="e.g. 3" style={inputStyle} style-focus={focusRing} /></label>
                  <label style={{ display: "flex", flexDirection: "column" }}><span style={labelCaption}>Phone</span><input name="phone" type="tel" required placeholder="+234 800 000 0000" style={inputStyle} style-focus={focusRing} /></label>
                  <label style={{ display: "flex", flexDirection: "column", gridColumn: "1 / -1" }}><span style={labelCaption}>Email</span><input name="email" type="email" required placeholder="you@venue.com" style={inputStyle} style-focus={focusRing} /></label>
                  <label style={{ display: "flex", flexDirection: "column", gridColumn: "1 / -1" }}><span style={labelCaption}>Anything else? <span style={{ color: "#A6B0C0", fontWeight: 500 }}>(optional)</span></span><textarea name="message" rows={4} placeholder="Opening hours, current booking setup, sports offered…" style={{ ...inputStyle, lineHeight: 1.55, resize: "vertical" }} style-focus={focusRing} /></label>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 16, marginTop: 24 }}>
                  <button type="submit" disabled={loading} style={{ ...submitBtnStyle, opacity: loading ? 0.7 : 1 }} style-hover="background: #0069DE;">{loading ? "Sending…" : "Request onboarding"}</button>
                  <span style={{ fontSize: 13, color: "#8794A8" }}>A partnerships lead will reach out. Ready with full details? <a href="/venue-onboarding" style={{ fontWeight: 600 }}>Fill the onboarding form →</a></span>
                </div>
              </form>
            )}

            {showForm && tab === "event" && (
              <form onSubmit={(e) => submit(e, FORMSPREE_EVENT_ENDPOINT, "Host an event")} style={formCardStyle}>
                <h2 style={{ margin: "0 0 6px", fontSize: "clamp(22px,2.4vw,28px)", fontWeight: 700, letterSpacing: "-0.025em" }}>Run your event on Spotts</h2>
                <p style={{ margin: "0 0 26px", fontSize: 15, lineHeight: 1.55, color: "#51607A" }}>Tournaments, leagues and game nights — ticketed with instant QR codes and a live sales dashboard. Tell us what you're planning.</p>
                <div style={fieldsGrid}>
                  <label style={{ display: "flex", flexDirection: "column" }}><span style={labelCaption}>Your name</span><input name="name" type="text" required placeholder="Tunde Adeyemi" style={inputStyle} style-focus={focusRing} /></label>
                  <label style={{ display: "flex", flexDirection: "column" }}><span style={labelCaption}>Event name</span><input name="event" type="text" required placeholder="Abuja Padel Open" style={inputStyle} style-focus={focusRing} /></label>
                  <label style={{ display: "flex", flexDirection: "column" }}>
                    <span style={labelCaption}>Event type</span>
                    <select name="event_type" style={{ ...inputStyle, cursor: "pointer" }} style-focus={focusRing}>
                      <option>Tournament</option><option>League</option><option>Game night</option><option>Open day</option><option>Something else</option>
                    </select>
                  </label>
                  <label style={{ display: "flex", flexDirection: "column" }}><span style={labelCaption}>Preferred date</span><input name="date" type="date" style={inputStyle} style-focus={focusRing} /></label>
                  <label style={{ display: "flex", flexDirection: "column" }}><span style={labelCaption}>Expected attendance</span><input name="attendance" type="number" min={1} placeholder="e.g. 120" style={inputStyle} style-focus={focusRing} /></label>
                  <label style={{ display: "flex", flexDirection: "column" }}><span style={labelCaption}>Email</span><input name="email" type="email" required placeholder="you@email.com" style={inputStyle} style-focus={focusRing} /></label>
                  <label style={{ display: "flex", flexDirection: "column", gridColumn: "1 / -1" }}><span style={labelCaption}>Tell us about the event</span><textarea name="message" required rows={4} placeholder="Format, venue, ticket price ideas, sponsors…" style={{ ...inputStyle, lineHeight: 1.55, resize: "vertical" }} style-focus={focusRing} /></label>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 16, marginTop: 24 }}>
                  <button type="submit" disabled={loading} style={{ ...submitBtnStyle, opacity: loading ? 0.7 : 1 }} style-hover="background: #0069DE;">{loading ? "Sending…" : "Pitch your event"}</button>
                  <span style={{ fontSize: 13, color: "#8794A8" }}>The events team will be in touch.</span>
                </div>
              </form>
            )}

            {submitted && (
              <div style={{ border: "1px solid rgba(31,168,85,.3)", borderRadius: 22, background: "#F3FBF5", padding: "clamp(32px,4vw,52px)", boxShadow: "0 24px 54px -34px rgba(31,168,85,.35)", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
                <div style={{ width: 62, height: 62, borderRadius: "50%", background: "#1FA855", color: "#fff", display: "grid", placeItems: "center", fontSize: 30 }}>✓</div>
                <h2 style={{ margin: 0, fontSize: "clamp(24px,2.8vw,34px)", fontWeight: 800, letterSpacing: "-0.03em" }}>Message sent{name ? `, ${name}` : ""}</h2>
                <p style={{ margin: 0, maxWidth: "44ch", fontSize: 16, lineHeight: 1.6, color: "#51607A" }}>Thanks for reaching out. We've got your message and someone from the team will reply within one business day.</p>
                <button type="button" onClick={() => setSubmitted(false)} style={{ border: "1px solid rgba(10,18,32,.16)", cursor: "pointer", fontFamily: "inherit", fontSize: 14.5, fontWeight: 600, color: "#0A1220", background: "#fff", padding: "12px 24px", borderRadius: 999, marginTop: 6, transition: "border-color .2s" }} style-hover="border-color: rgba(10,18,32,.4);">Send another message</button>
              </div>
            )}
          </div>

          {/* Right: channels */}
          <aside style={{ flex: "1 1 300px", minWidth: 0, display: "flex", flexDirection: "column", gap: 16 }}>
            <a href="mailto:info@spottsapp.com" style-hover="transform: translateY(-4px); box-shadow: 0 20px 44px -24px rgba(10,18,32,.28);" style={{ textDecoration: "none", color: "#0A1220", border: "1px solid rgba(10,18,32,.09)", borderRadius: 18, background: "#fff", padding: 24, display: "flex", flexDirection: "column", gap: 8, transition: "transform .3s cubic-bezier(.2,.8,.2,1), box-shadow .3s" }}>
              <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "#007AFF" }}>Email us</span>
              <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em" }}>info@spottsapp.com</span>
              <span style={{ fontSize: 13.5, lineHeight: 1.55, color: "#51607A" }}>Prefer email? Write to us directly any time.</span>
            </a>
            <a href="https://wa.me/2347058888348" target="_blank" rel="noopener noreferrer" style-hover="transform: translateY(-4px); box-shadow: 0 20px 44px -24px rgba(31,168,85,.3);" style={{ textDecoration: "none", color: "inherit", border: "1px solid rgba(31,168,85,.25)", borderRadius: 18, background: "#F3FBF5", padding: 24, display: "flex", flexDirection: "column", gap: 8, transition: "transform .3s cubic-bezier(.2,.8,.2,1), box-shadow .3s" }}>
              <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "#1FA855" }}>On WhatsApp</span>
              <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em" }}>Chat with the bot</span>
              <span style={{ fontSize: 13.5, lineHeight: 1.55, color: "#51607A" }}>Book, cancel or ask a question in chat — any hour of the day.</span>
              <span style={{ marginTop: 4, fontSize: 13, color: "#1FA855", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 7 }}><span style={{ width: 6, height: 6, borderRadius: "50%", background: "#1FA855", animation: "spotts-pulse 2s ease-in-out infinite" }} />Always online</span>
            </a>
            <div style={{ border: "1px solid rgba(10,18,32,.09)", borderRadius: 18, background: "#0A1220", color: "#fff", padding: 24, display: "flex", flexDirection: "column", gap: 10 }}>
              <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(255,255,255,.5)" }}>Need help with a booking?</span>
              <span style={{ fontSize: 15, lineHeight: 1.55, color: "rgba(255,255,255,.8)" }}>Cancellations, refunds and account questions are answered on the support page.</span>
              <a href="/support" style-hover="color: #fff;" style={{ marginTop: 4, fontSize: 14, fontWeight: 700, color: "#5AA9FF", textDecoration: "none" }}>Visit support →</a>
            </div>
          </aside>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#071120", color: "#fff", borderTop: "1px solid rgba(255,255,255,.08)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(48px,7vh,80px) clamp(20px,4vw,48px) 40px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 40, justifyContent: "space-between", alignItems: "flex-start", paddingBottom: 40, borderBottom: "1px solid rgba(255,255,255,.1)" }}>
            <div style={{ maxWidth: 320 }}>
              <img src="/premium/logo-blue-white.svg" alt="Spotts" style={{ height: 26, display: "block", marginBottom: 16 }} />
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "rgba(255,255,255,.55)" }}>Sports venues, gyms and event tickets, booked in seconds. Live in Abuja on iOS, Android and WhatsApp.</p>
            </div>
            <div style={{ display: "flex", gap: "clamp(32px,5vw,64px)", flexWrap: "wrap" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(255,255,255,.45)" }}>Product</span>
                <a href="/#bot" style-hover="color: #fff;" style={{ fontSize: 14, color: "rgba(255,255,255,.75)", textDecoration: "none" }}>WhatsApp bot</a>
                <a href="/#app" style-hover="color: #fff;" style={{ fontSize: 14, color: "rgba(255,255,255,.75)", textDecoration: "none" }}>The app</a>
                <a href="/#venues" style-hover="color: #fff;" style={{ fontSize: 14, color: "rgba(255,255,255,.75)", textDecoration: "none" }}>For venues</a>
                <a href="/events" style-hover="color: #fff;" style={{ fontSize: 14, color: "rgba(255,255,255,.75)", textDecoration: "none" }}>Spotts Events</a>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(255,255,255,.45)" }}>Contact</span>
                <a href="/contact" style-hover="color: #fff;" style={{ fontSize: 14, color: "rgba(255,255,255,.75)", textDecoration: "none" }}>General enquiry</a>
                <a href="/contact#venue" style-hover="color: #fff;" style={{ fontSize: 14, color: "rgba(255,255,255,.75)", textDecoration: "none" }}>List your venue</a>
                <a href="/contact#event" style-hover="color: #fff;" style={{ fontSize: 14, color: "rgba(255,255,255,.75)", textDecoration: "none" }}>Host an event</a>
                <a href="/support" style-hover="color: #fff;" style={{ fontSize: 14, color: "rgba(255,255,255,.75)", textDecoration: "none" }}>Help &amp; support</a>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(255,255,255,.45)" }}>Legal</span>
                <a href="/terms" style-hover="color: #fff;" style={{ fontSize: 14, color: "rgba(255,255,255,.75)", textDecoration: "none" }}>Terms &amp; Conditions</a>
                <a href="/privacy" style-hover="color: #fff;" style={{ fontSize: 14, color: "rgba(255,255,255,.75)", textDecoration: "none" }}>Privacy Policy</a>
                <a href="/refund" style-hover="color: #fff;" style={{ fontSize: 14, color: "rgba(255,255,255,.75)", textDecoration: "none" }}>Refund Policy</a>
              </div>
            </div>
          </div>
          <div style={{ paddingTop: 24, display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "space-between", fontSize: 13, color: "rgba(255,255,255,.4)" }}>
            <span>© 2026 Spotts. Made in Abuja.</span>
            <span>Football · Padel · Tennis · Gyms · Events — booked in seconds.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PremiumContact;
