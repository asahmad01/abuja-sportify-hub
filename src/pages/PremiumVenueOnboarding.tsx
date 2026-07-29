// Ported from Venue Onboarding.dc.html. Unlike the static legal pages, this
// one has real dynamic state (add/remove sports & courts, per-day hours,
// submit -> thank-you), so it's hand-built as a real React component instead
// of injected HTML — the inline styles below are copied verbatim from the
// export. Submits to the same Formspree endpoint the current live
// VenueOnboardingForm.tsx already uses.
import { useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { setupPremiumPage } from "./premium/setup";
import "./premium/premium.css";

const FORMSPREE_VENUE_ONBOARDING_ENDPOINT = "https://formspree.io/f/mjgeynko";

interface Court {
  name: string;
  price: string;
  env: "Indoor" | "Outdoor";
  divisible: boolean;
  multi: boolean;
}
interface Sport {
  name: string;
  courts: Court[];
}
interface DayHours {
  label: string;
  open: string;
  close: string;
  closed: boolean;
}

const newCourt = (): Court => ({ name: "", price: "", env: "Indoor", divisible: false, multi: false });
const newSport = (): Sport => ({ name: "", courts: [newCourt()] });
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const inputStyle: React.CSSProperties = {
  width: "100%", boxSizing: "border-box", fontFamily: "inherit", fontSize: 15,
  color: "#0A1220", background: "#fff", border: "1px solid rgba(10,18,32,.14)",
  borderRadius: 12, padding: "13px 15px", outline: "none",
  transition: "border-color .18s, box-shadow .18s",
};
const smallInputStyle: React.CSSProperties = { ...inputStyle, padding: "12px 14px" };
const labelCaption: React.CSSProperties = { fontSize: 12.5, fontWeight: 600, color: "#51607A", marginBottom: 7 };
const removeBtnStyle: React.CSSProperties = {
  border: "1px solid rgba(10,18,32,.14)", background: "#fff", color: "#8794A8", cursor: "pointer",
  width: 46, height: 46, borderRadius: 12, fontSize: 17, flex: "none",
  transition: "color .2s, border-color .2s",
};

const PremiumVenueOnboarding = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const [sports, setSports] = useState<Sport[]>([newSport()]);
  const [memberships, setMemberships] = useState(false);
  const [hours, setHours] = useState<DayHours[]>(
    DAYS.map((d) => ({ label: d, open: "08:00", close: "22:00", closed: false }))
  );
  const [submitted, setSubmitted] = useState(false);
  const [venueName, setVenueName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Spotts — Venue Onboarding";
  }, []);

  useEffect(() => {
    if (!rootRef.current) return;
    return setupPremiumPage(rootRef.current);
  }, [submitted, sports, memberships, hours]);

  const updateSport = (i: number, patch: Partial<Sport>) =>
    setSports((s) => s.map((sp, k) => (k === i ? { ...sp, ...patch } : sp)));
  const updateCourt = (i: number, j: number, patch: Partial<Court>) =>
    setSports((s) =>
      s.map((sp, k) => (k !== i ? sp : { ...sp, courts: sp.courts.map((c, m) => (m === j ? { ...c, ...patch } : c)) }))
    );
  const updateDay = (i: number, patch: Partial<DayHours>) =>
    setHours((h) => h.map((d, k) => (k === i ? { ...d, ...patch } : d)));

  const buildPayload = (form: HTMLFormElement) => {
    const fd = new FormData(form);
    const vName = (fd.get("venue_name") || "").toString().trim();
    const phone = (fd.get("phone") || "").toString().trim();
    const address = (fd.get("address") || "").toString().trim();
    const email = (fd.get("email") || "").toString().trim();
    const notes = (fd.get("notes") || "").toString().trim();
    const membershipDetails = (fd.get("membership_details") || "").toString().trim();

    const lines: string[] = ["=== SPORTS, COURTS & FIELDS ==="];
    sports.forEach((sp) => {
      lines.push(`${sp.name || "(unnamed sport)"}:`);
      sp.courts.forEach((c) => {
        lines.push(
          `  - ${c.name || "(unnamed court)"} · ₦${c.price || "—"}/hr · ${c.env}` +
            `${c.divisible ? " · divisible" : ""}${c.multi ? " · multi-sport" : ""}`
        );
      });
    });
    lines.push("", "=== MEMBERSHIPS ===");
    lines.push(memberships ? membershipDetails || "Yes, details not provided" : "No");
    lines.push("", "=== OPERATING HOURS ===");
    hours.forEach((d) => {
      lines.push(`  ${d.label}: ${d.closed ? "Closed" : `${d.open} – ${d.close}`}`);
    });
    if (notes) {
      lines.push("", "=== ADDITIONAL NOTES ===", notes);
    }

    return {
      venueName: vName,
      payload: {
        _subject: `SPOTTS Venue Onboarding: ${vName}`,
        "Venue Name": vName,
        Email: email,
        Phone: phone,
        Address: address,
        message: lines.join("\n"),
      },
    };
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const { venueName: vName, payload } = buildPayload(e.currentTarget);
    try {
      const response = await fetch(FORMSPREE_VENUE_ONBOARDING_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Submit failed");
      setVenueName(vName);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      toast({
        title: "Error",
        description: "Something went wrong submitting your venue details. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div ref={rootRef} className="premium-root" style={{ fontFamily: "'Inter Display', 'Helvetica Neue', sans-serif", color: "#0A1220", background: "#FAFBFD", overflowX: "clip" }}>
      {/* NAV */}
      <header style={{ position: "sticky", top: 0, zIndex: 60, background: "rgba(250,251,253,.88)", backdropFilter: "blur(14px)", borderBottom: "1px solid rgba(10,18,32,.07)" }}>
        <div style={{ maxWidth: 980, margin: "0 auto", padding: "0 clamp(20px,4vw,48px)", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <a href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
            <img src="/premium/logo-blue-black.svg" alt="Spotts" style={{ height: 26, display: "block" }} />
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "#51607A", border: "1px solid rgba(10,18,32,.14)", padding: "4px 10px", borderRadius: 999 }}>Venue onboarding</span>
          </a>
          <a href="/contact" style-hover="color: #0A1220; border-color: rgba(10,18,32,.35);" style={{ fontSize: 14, fontWeight: 600, color: "#51607A", textDecoration: "none", border: "1px solid rgba(10,18,32,.14)", padding: "9px 18px", borderRadius: 999, whiteSpace: "nowrap" }}>Contact us</a>
        </div>
      </header>

      {!submitted && (
        <>
          {/* HERO */}
          <section style={{ position: "relative", overflow: "clip", background: "#fff", borderBottom: "1px solid rgba(10,18,32,.07)" }}>
            <div aria-hidden style={{ position: "absolute", right: -30, bottom: -46, fontSize: "clamp(100px,15vw,200px)", fontWeight: 800, letterSpacing: "-0.05em", lineHeight: 1, color: "transparent", WebkitTextStroke: "1.5px rgba(0,122,255,.09)", userSelect: "none", pointerEvents: "none" }}>VENUES</div>
            <svg aria-hidden viewBox="0 0 460 300" style={{ position: "absolute", left: -70, top: -40, width: "clamp(220px,26vw,420px)", pointerEvents: "none" }}>
              <g fill="none" stroke="#007AFF" strokeOpacity=".1" strokeWidth="2">
                <rect x="20" y="20" width="420" height="260" />
                <line x1="240" y1="20" x2="240" y2="280" />
                <circle cx="240" cy="150" r="60" />
                <rect x="20" y="90" width="70" height="120" />
                <rect x="370" y="90" width="70" height="120" />
              </g>
            </svg>
            <div style={{ maxWidth: 980, margin: "0 auto", padding: "clamp(44px,6vh,72px) clamp(20px,4vw,48px)", position: "relative" }}>
              <p style={{ margin: "0 0 16px", fontSize: 12.5, fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase", color: "#007AFF" }}>For venues</p>
              <h1 style={{ margin: "0 0 16px", maxWidth: "20ch", fontSize: "clamp(34px,4.6vw,58px)", fontWeight: 800, letterSpacing: "-0.045em", lineHeight: 1, textWrap: "balance" }}>Venue onboarding form</h1>
              <p style={{ margin: 0, maxWidth: "58ch", fontSize: "clamp(15.5px,1.3vw,18px)", lineHeight: 1.6, color: "#51607A", textWrap: "pretty" }}>Welcome to Spotts! Please fill in what applies to your venue. This is everything we need to get your courts live and taking paid bookings.</p>
            </div>
          </section>

          {/* FORM */}
          <form onSubmit={handleSubmit} style={{ maxWidth: 980, margin: "0 auto", padding: "clamp(40px,6vh,64px) clamp(20px,4vw,48px) clamp(56px,8vh,88px)", display: "flex", flexDirection: "column", gap: "clamp(36px,5vh,52px)" }}>
            {/* 1. BASIC INFO */}
            <section style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 14, borderBottom: "1px solid rgba(10,18,32,.1)", paddingBottom: 14 }}>
                <span style={{ fontSize: 15, fontWeight: 800, color: "#007AFF" }}>1</span>
                <h2 style={{ margin: 0, fontSize: "clamp(21px,2.2vw,26px)", fontWeight: 700, letterSpacing: "-0.025em" }}>Basic information</h2>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,260px), 1fr))", gap: 18 }}>
                <label style={{ display: "flex", flexDirection: "column" }}>
                  <span style={labelCaption}>Venue name <span style={{ color: "#E14D45" }}>*</span></span>
                  <input name="venue_name" type="text" required placeholder="Smokey Kickzone" style={inputStyle} style-focus="border-color: #007AFF; box-shadow: 0 0 0 3px rgba(0,122,255,.12);" />
                </label>
                <label style={{ display: "flex", flexDirection: "column" }}>
                  <span style={labelCaption}>Phone number <span style={{ color: "#E14D45" }}>*</span></span>
                  <input name="phone" type="tel" required placeholder="+234 800 000 0000" style={inputStyle} style-focus="border-color: #007AFF; box-shadow: 0 0 0 3px rgba(0,122,255,.12);" />
                </label>
                <label style={{ display: "flex", flexDirection: "column", gridColumn: "1 / -1" }}>
                  <span style={labelCaption}>Address <span style={{ color: "#E14D45" }}>*</span></span>
                  <input name="address" type="text" required placeholder="Plot 12, Aminu Kano Crescent, Wuse 2, Abuja" style={inputStyle} style-focus="border-color: #007AFF; box-shadow: 0 0 0 3px rgba(0,122,255,.12);" />
                </label>
                <label style={{ display: "flex", flexDirection: "column", gridColumn: "1 / -1" }}>
                  <span style={labelCaption}>Email <span style={{ color: "#E14D45" }}>*</span> <span style={{ color: "#A6B0C0", fontWeight: 500 }}>— booking notifications will be sent here</span></span>
                  <input name="email" type="email" required placeholder="bookings@yourvenue.com" style={inputStyle} style-focus="border-color: #007AFF; box-shadow: 0 0 0 3px rgba(0,122,255,.12);" />
                </label>
              </div>
            </section>

            {/* 2. SPORTS AND COURTS */}
            <section style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 14, borderBottom: "1px solid rgba(10,18,32,.1)", paddingBottom: 14 }}>
                <span style={{ fontSize: 15, fontWeight: 800, color: "#007AFF" }}>2</span>
                <h2 style={{ margin: 0, fontSize: "clamp(21px,2.2vw,26px)", fontWeight: 700, letterSpacing: "-0.025em" }}>Sports, courts &amp; fields</h2>
              </div>
              <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: "#51607A", maxWidth: "64ch" }}>Add each sport you offer, then list all courts or fields under it. You can mark any court as divisible or multi-sport below.</p>

              {sports.map((sport, i) => (
                <div key={i} style={{ border: "1px solid rgba(10,18,32,.1)", borderRadius: 20, background: "#fff", padding: "clamp(18px,2.5vw,28px)", boxShadow: "0 14px 34px -26px rgba(10,18,32,.3)", display: "flex", flexDirection: "column", gap: 18 }}>
                  <div style={{ display: "flex", alignItems: "flex-end", gap: 12 }}>
                    <label style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0 }}>
                      <span style={labelCaption}>Sport</span>
                      <input type="text" required placeholder="e.g. Football" value={sport.name} onChange={(e) => updateSport(i, { name: e.target.value })} style={inputStyle} style-focus="border-color: #007AFF; box-shadow: 0 0 0 3px rgba(0,122,255,.12);" />
                    </label>
                    {sports.length > 1 && (
                      <button type="button" aria-label="Remove sport" title="Remove sport" onClick={() => setSports((s) => s.filter((_, k) => k !== i))} style={removeBtnStyle} style-hover="color: #E14D45; border-color: rgba(225,77,69,.4);">✕</button>
                    )}
                  </div>

                  <div style={{ borderLeft: "3px solid rgba(0,122,255,.25)", paddingLeft: "clamp(12px,2vw,20px)", display: "flex", flexDirection: "column", gap: 14 }}>
                    {sport.courts.map((court, j) => (
                      <div key={j} style={{ border: "1px solid rgba(10,18,32,.09)", borderRadius: 16, background: "#FAFBFD", padding: "clamp(14px,2vw,20px)", display: "flex", flexDirection: "column", gap: 14 }}>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,180px), 1fr))", gap: 14, alignItems: "end" }}>
                          <label style={{ display: "flex", flexDirection: "column" }}>
                            <span style={labelCaption}>Court / field name</span>
                            <input type="text" required placeholder="e.g. Court A" value={court.name} onChange={(e) => updateCourt(i, j, { name: e.target.value })} style={smallInputStyle} style-focus="border-color: #007AFF; box-shadow: 0 0 0 3px rgba(0,122,255,.12);" />
                          </label>
                          <label style={{ display: "flex", flexDirection: "column" }}>
                            <span style={labelCaption}>Price per hour (₦)</span>
                            <input type="number" min={0} step={500} placeholder="5000" value={court.price} onChange={(e) => updateCourt(i, j, { price: e.target.value })} style={smallInputStyle} style-focus="border-color: #007AFF; box-shadow: 0 0 0 3px rgba(0,122,255,.12);" />
                          </label>
                          <div style={{ display: "flex", gap: 10, alignItems: "end" }}>
                            <label style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                              <span style={labelCaption}>Indoor or outdoor</span>
                              <select value={court.env} onChange={(e) => updateCourt(i, j, { env: e.target.value as Court["env"] })} style={{ ...smallInputStyle, cursor: "pointer" }}>
                                <option>Indoor</option>
                                <option>Outdoor</option>
                              </select>
                            </label>
                            {sport.courts.length > 1 && (
                              <button type="button" aria-label="Remove court" title="Remove court" onClick={() => updateSport(i, { courts: sport.courts.filter((_, m) => m !== j) })} style={{ ...removeBtnStyle, width: 44, height: 44, fontSize: 16 }} style-hover="color: #E14D45; border-color: rgba(225,77,69,.4);">✕</button>
                            )}
                          </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                          <label style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, lineHeight: 1.5, color: "#33415A", cursor: "pointer" }}>
                            <input type="checkbox" checked={court.divisible} onChange={(e) => updateCourt(i, j, { divisible: e.target.checked })} style={{ marginTop: 1 }} />
                            Can this field be divided into smaller fields? <span style={{ color: "#8794A8" }}>&nbsp;(e.g. 10-a-side into 2× 5-a-side)</span>
                          </label>
                          <label style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, lineHeight: 1.5, color: "#33415A", cursor: "pointer" }}>
                            <input type="checkbox" checked={court.multi} onChange={(e) => updateCourt(i, j, { multi: e.target.checked })} style={{ marginTop: 1 }} />
                            Is this a multi-sport court? <span style={{ color: "#8794A8" }}>&nbsp;(e.g. a hall used for both basketball and badminton)</span>
                          </label>
                        </div>
                      </div>
                    ))}
                    <button type="button" onClick={() => updateSport(i, { courts: [...sport.courts, newCourt()] })} style={{ alignSelf: "flex-start", border: "1px dashed rgba(0,122,255,.45)", background: "rgba(0,122,255,.05)", color: "#007AFF", cursor: "pointer", fontFamily: "inherit", fontSize: 14, fontWeight: 600, padding: "11px 20px", borderRadius: 999, transition: "background .2s" }} style-hover="background: rgba(0,122,255,.12);">+ Add court/field</button>
                  </div>
                </div>
              ))}

              <button type="button" onClick={() => setSports((s) => [...s, newSport()])} style={{ alignSelf: "flex-start", border: "1px solid rgba(10,18,32,.16)", background: "#fff", color: "#0A1220", cursor: "pointer", fontFamily: "inherit", fontSize: 14.5, fontWeight: 600, padding: "13px 24px", borderRadius: 999, transition: "border-color .2s, transform .2s" }} style-hover="border-color: rgba(10,18,32,.4); transform: translateY(-1px);">+ Add another sport</button>
            </section>

            {/* 3. MEMBERSHIPS */}
            <section style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 14, borderBottom: "1px solid rgba(10,18,32,.1)", paddingBottom: 14 }}>
                <span style={{ fontSize: 15, fontWeight: 800, color: "#007AFF" }}>3</span>
                <h2 style={{ margin: 0, fontSize: "clamp(21px,2.2vw,26px)", fontWeight: 700, letterSpacing: "-0.025em" }}>Memberships</h2>
              </div>
              <label style={{ display: "flex", alignItems: "flex-start", gap: 12, fontSize: 15, lineHeight: 1.5, color: "#33415A", cursor: "pointer", border: "1px solid rgba(10,18,32,.1)", borderRadius: 16, background: "#fff", padding: "18px 20px" }}>
                <input type="checkbox" checked={memberships} onChange={(e) => setMemberships(e.target.checked)} style={{ marginTop: 1 }} />
                Does your venue offer memberships? <span style={{ color: "#8794A8" }}>&nbsp;(e.g. monthly gym pass, annual membership)</span>
              </label>
              {memberships && (
                <label style={{ display: "flex", flexDirection: "column" }}>
                  <span style={labelCaption}>Tell us about your memberships</span>
                  <textarea name="membership_details" rows={3} placeholder="e.g. Monthly gym pass ₦25,000 · Annual membership ₦250,000 with 2 free guest passes per month" style={{ ...inputStyle, lineHeight: 1.55, resize: "vertical" }} style-focus="border-color: #007AFF; box-shadow: 0 0 0 3px rgba(0,122,255,.12);" />
                </label>
              )}
            </section>

            {/* 4. OPERATING HOURS */}
            <section style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 14, borderBottom: "1px solid rgba(10,18,32,.1)", paddingBottom: 14 }}>
                <span style={{ fontSize: 15, fontWeight: 800, color: "#007AFF" }}>4</span>
                <h2 style={{ margin: 0, fontSize: "clamp(21px,2.2vw,26px)", fontWeight: 700, letterSpacing: "-0.025em" }}>Operating hours</h2>
              </div>
              <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: "#51607A" }}>Set your opening and closing times, or mark the day as closed.</p>
              <div style={{ border: "1px solid rgba(10,18,32,.1)", borderRadius: 20, background: "#fff", overflow: "clip" }}>
                <div style={{ display: "grid", gridTemplateColumns: "minmax(90px,1.2fr) 1fr 1fr minmax(84px,.7fr)", gap: 12, alignItems: "center", padding: "13px clamp(14px,2.5vw,24px)", background: "#FAFBFD", borderBottom: "1px solid rgba(10,18,32,.08)", fontSize: 12, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#8794A8" }}>
                  <span>Day</span><span>Opens</span><span>Closes</span><span>Closed?</span>
                </div>
                {hours.map((day, i) => (
                  <div key={day.label} style={{ display: "grid", gridTemplateColumns: "minmax(90px,1.2fr) 1fr 1fr minmax(84px,.7fr)", gap: 12, alignItems: "center", padding: "11px clamp(14px,2.5vw,24px)", borderBottom: "1px solid rgba(10,18,32,.06)" }}>
                    <span style={{ fontSize: 14.5, fontWeight: 600, color: day.closed ? "#A6B0C0" : "#0A1220" }}>{day.label}</span>
                    <input type="time" value={day.open} onChange={(e) => updateDay(i, { open: e.target.value })} disabled={day.closed} style={{ ...smallInputStyle, fontSize: 14, padding: "9px 11px", borderRadius: 10, opacity: day.closed ? 0.4 : 1 }} style-focus="border-color: #007AFF;" />
                    <input type="time" value={day.close} onChange={(e) => updateDay(i, { close: e.target.value })} disabled={day.closed} style={{ ...smallInputStyle, fontSize: 14, padding: "9px 11px", borderRadius: 10, opacity: day.closed ? 0.4 : 1 }} style-focus="border-color: #007AFF;" />
                    <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 13.5, color: "#51607A" }}>
                      <input type="checkbox" checked={day.closed} onChange={(e) => updateDay(i, { closed: e.target.checked })} />
                      Closed
                    </label>
                  </div>
                ))}
              </div>
            </section>

            {/* 5. ANYTHING ELSE */}
            <section style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 14, borderBottom: "1px solid rgba(10,18,32,.1)", paddingBottom: 14 }}>
                <span style={{ fontSize: 15, fontWeight: 800, color: "#007AFF" }}>5</span>
                <h2 style={{ margin: 0, fontSize: "clamp(21px,2.2vw,26px)", fontWeight: 700, letterSpacing: "-0.025em" }}>Anything else?</h2>
              </div>
              <label style={{ display: "flex", flexDirection: "column" }}>
                <span style={labelCaption}>If there's anything this form hasn't covered that you'd like us to know, add it here <span style={{ color: "#A6B0C0", fontWeight: 500 }}>(optional)</span></span>
                <textarea name="notes" rows={4} placeholder="Parking, floodlights, equipment rental, changing rooms, anything at all…" style={{ ...inputStyle, lineHeight: 1.55, resize: "vertical" }} style-focus="border-color: #007AFF; box-shadow: 0 0 0 3px rgba(0,122,255,.12);" />
              </label>
            </section>

            {/* SUBMIT */}
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 16, borderTop: "1px solid rgba(10,18,32,.1)", paddingTop: 28 }}>
              <button type="submit" disabled={loading} style={{ border: "none", cursor: loading ? "default" : "pointer", opacity: loading ? 0.7 : 1, fontFamily: "inherit", fontSize: 15.5, fontWeight: 600, color: "#fff", background: "#007AFF", padding: "15px 32px", borderRadius: 999, transition: "background .2s, transform .2s" }} style-hover="background: #0069DE; transform: translateY(-1px);">
                {loading ? "Submitting…" : "Submit venue details"}
              </button>
              <span style={{ fontSize: 13.5, color: "#8794A8" }}>We'll review and get your venue live within a few days.</span>
            </div>
          </form>
        </>
      )}

      {submitted && (
        <section style={{ maxWidth: 980, margin: "0 auto", padding: "clamp(64px,10vh,120px) clamp(20px,4vw,48px)" }}>
          <div style={{ border: "1px solid rgba(31,168,85,.3)", borderRadius: 22, background: "#F3FBF5", padding: "clamp(36px,5vw,60px)", boxShadow: "0 24px 54px -34px rgba(31,168,85,.35)", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
            <div style={{ width: 62, height: 62, borderRadius: "50%", background: "#1FA855", color: "#fff", display: "grid", placeItems: "center", fontSize: 30 }}>✓</div>
            <h2 style={{ margin: 0, fontSize: "clamp(26px,3vw,38px)", fontWeight: 800, letterSpacing: "-0.03em" }}>Welcome to Spotts{venueName ? `, ${venueName}` : ""}</h2>
            <p style={{ margin: 0, maxWidth: "46ch", fontSize: 16, lineHeight: 1.6, color: "#51607A" }}>We've got your venue details. Our onboarding team will review everything and reach out on the phone number you gave — most venues go live within a few days.</p>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setSports([newSport()]);
                setMemberships(false);
                setHours(DAYS.map((d) => ({ label: d, open: "08:00", close: "22:00", closed: false })));
              }}
              style={{ border: "1px solid rgba(10,18,32,.16)", cursor: "pointer", fontFamily: "inherit", fontSize: 14.5, fontWeight: 600, color: "#0A1220", background: "#fff", padding: "12px 24px", borderRadius: 999, marginTop: 6, transition: "border-color .2s" }}
              style-hover="border-color: rgba(10,18,32,.4);"
            >
              Submit another venue
            </button>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer style={{ background: "#071120", color: "#fff", borderTop: "1px solid rgba(255,255,255,.08)" }}>
        <div style={{ maxWidth: 980, margin: "0 auto", padding: "clamp(40px,6vh,64px) clamp(20px,4vw,48px) 36px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 32, justifyContent: "space-between", alignItems: "flex-start", paddingBottom: 32, borderBottom: "1px solid rgba(255,255,255,.1)" }}>
            <div style={{ maxWidth: 320 }}>
              <img src="/premium/logo-blue-white.svg" alt="Spotts" style={{ height: 26, display: "block", marginBottom: 16 }} />
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "rgba(255,255,255,.55)" }}>Sports venues, gyms and event tickets, booked in seconds. Live in Abuja on iOS, Android and WhatsApp.</p>
            </div>
            <div style={{ display: "flex", gap: "clamp(32px,5vw,64px)", flexWrap: "wrap" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(255,255,255,.45)" }}>Venues</span>
                <a href="/#venues" style-hover="color: #fff;" style={{ fontSize: 14, color: "rgba(255,255,255,.75)", textDecoration: "none" }}>Why list on Spotts</a>
                <a href="/contact#venue" style-hover="color: #fff;" style={{ fontSize: 14, color: "rgba(255,255,255,.75)", textDecoration: "none" }}>Talk to partnerships</a>
                <a href="/partner-api" style-hover="color: #fff;" style={{ fontSize: 14, color: "rgba(255,255,255,.75)", textDecoration: "none" }}>Partner API</a>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(255,255,255,.45)" }}>Support</span>
                <a href="/support" style-hover="color: #fff;" style={{ fontSize: 14, color: "rgba(255,255,255,.75)", textDecoration: "none" }}>Help &amp; support</a>
                <a href="mailto:info@spottsapp.com" style-hover="color: #fff;" style={{ fontSize: 14, color: "rgba(255,255,255,.75)", textDecoration: "none" }}>info@spottsapp.com</a>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(255,255,255,.45)" }}>Legal</span>
                <a href="/terms" style-hover="color: #fff;" style={{ fontSize: 14, color: "rgba(255,255,255,.75)", textDecoration: "none" }}>Terms &amp; Conditions</a>
                <a href="/privacy" style-hover="color: #fff;" style={{ fontSize: 14, color: "rgba(255,255,255,.75)", textDecoration: "none" }}>Privacy Policy</a>
              </div>
            </div>
          </div>
          <div style={{ paddingTop: 22, display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "space-between", fontSize: 13, color: "rgba(255,255,255,.4)" }}>
            <span>© 2026 Spotts. Made in Abuja.</span>
            <span>Football · Padel · Tennis · Gyms · Events — booked in seconds.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PremiumVenueOnboarding;
