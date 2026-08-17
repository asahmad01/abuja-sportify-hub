// Golazo Festival 2026 — vendor terms and conditions.
//
// Its own route rather than a modal on the checkout form: a vendor should be
// able to read this before deciding, send the link to a partner, or come back
// to it after paying. The form links here and records acceptance separately.
//
// The paper version ends with a signature block (business name, vendor name,
// phone, signature, date). Online those are the checkout fields plus the
// server-stamped terms_accepted_at, so nothing is re-asked here.
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ensureCanonicalOrigin } from "@/lib/gollazo";

const SECTION_BG = "#071120";

/**
 * [heading, paragraphs] — bullets are lines starting "• ", and **text** is
 * emphasised. The water clause is the one vendors most often miss, so it needs
 * to survive being skim-read.
 */
const CLAUSES: Array<[string, string[]]> = [
  ["1. Arrival and Setup", [
    "All vendors must arrive and complete setup before 1:00 PM on the day of the event.",
    "Vendor entry after 1:00 PM will not be permitted under any circumstances.",
  ]],
  ["2. Vendor Access", [
    "Each vendor is entitled to three (3) complimentary entry passes.",
    "Only three representatives of each registered vendor will be allowed entry under the vendor registration.",
  ]],
  ["3. Vehicle Access for Drop-Off", [
    "Vendors bringing goods by vehicle may use the vehicle strictly for loading and unloading.",
    "Only the driver will be permitted to enter the venue with the vehicle.",
    "The driver must complete unloading within 15 minutes and immediately exit the venue after dropping off the goods.",
    "No vehicle will be permitted to remain inside the venue during the event.",
  ]],
  ["4. Designated Vendor Space", [
    "Vendors must operate strictly within the designated space allocated to them by the organizers.",
    "Occupying or extending into unauthorized spaces is prohibited.",
  ]],
  ["5. Product Pricing", [
    "Vendors are free to determine the prices of their products and services.",
    "Golazo Festival and Inspire Youth Development Foundation (IYDF) will not interfere with vendors’ pricing decisions.",
  ]],
  ["6. Vendor Stall Provision", [
    "The organizers will provide each registered vendor with:",
    "• One (1) canopy",
    "• One (1) table",
    "• Three (3) chairs",
    "• Access to electricity throughout the event",
    "Vendors are responsible for providing all other items required for the operation of their business, including but not limited to extension cables, display shelves, decorations, point-of-sale (POS) devices, lighting, generators (if required), packaging materials, and any additional equipment or furniture.",
    "Vendors are responsible for ensuring that all equipment they bring is safe, properly maintained, and suitable for use during the event.",
  ]],
  ["7. Prohibited Items", [
    "The sale of the following items is strictly prohibited:",
    "• **Water — water may not be sold by any vendor, in any form.**",
    "• Alcoholic beverages",
    "• Illegal drugs or narcotics",
    "• Illegal substances",
    "• Any item prohibited under the laws of the Federal Republic of Nigeria",
    "This policy is strictly enforced due to the presence of children, families, and underage attendees.",
  ]],
  ["8. Legal Compliance", [
    "Any vendor found selling illegal substances, drugs, or engaging in unlawful activities will:",
    "• Be removed immediately from the festival.",
    "• Be referred to the Golazo Festival Committee for investigation.",
    "• Be handed over to the appropriate law enforcement authorities to face any applicable legal consequences.",
  ]],
  ["9. Vehicle Access After the Event", [
    "Vehicles will only be permitted into the venue after the conclusion of the event for the evacuation of large materials or equipment.",
    "Vehicle access during the event remains restricted except for approved drop-offs.",
  ]],
  ["10. Business Logo Submission", [
    "Vendors are encouraged to submit their business logo after registration.",
    "The logo may be used by the organizers to create promotional materials highlighting participating vendors.",
    "These promotional materials may be published on Golazo Festival and IYDF social media platforms before the event.",
  ]],
  ["11. Payment and Reservation", [
    "Vendors must first indicate their acceptance of these Terms and Conditions.",
    "Upon acceptance, the official payment details will be provided.",
    "A vendor space is only confirmed after full payment has been received and acknowledged by the organizers.",
  ]],
  ["12. No Refund Policy", [
    "All payments made for vendor registration are strictly non-refundable.",
    "No refunds will be issued in the event of absence or withdrawal by the vendor.",
  ]],
  ["13. Compliance", [
    "By accepting this Agreement, the vendor confirms that they have read, understood, and agreed to comply with all rules, regulations, and operational guidelines of Golazo Festival 2026.",
    "Failure to comply with these Terms and Conditions may result in:",
    "• Immediate removal from the event without refund.",
    "• Revocation of vendor privileges.",
    "• Legal action where applicable.",
  ]],
  ["14. Amendment of Terms", [
    "Golazo Festival and Inspire Youth Development Foundation (IYDF) reserve the right to amend, modify, or update these Terms and Conditions where necessary. Vendors will be notified of any significant changes.",
  ]],
  // Appended rather than slotted in beside the product clauses: renumbering
  // would leave vendors who already accepted holding a differently numbered
  // agreement. The consequence is emphasised instead, so position costs it
  // nothing.
  ["15. Vendor Agreement Note", [
    "Please note that vendors are expected to bring the specific item(s) listed in their confirmed signup.",
    "**If a different item is brought on the day of the event, we reserve the right to terminate the agreement. In such cases, no refund will be issued.**",
    "We appreciate your understanding and cooperation in helping us maintain the quality and consistency of the event.",
  ]],
];

/** Renders **bold** spans without pulling in a markdown dependency. */
const emphasise = (line: string) =>
  line.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} style={{ color: "#0A1220", fontWeight: 700 }}>{part.slice(2, -2)}</strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  );

const GolazoVendorTerms = () => {
  useEffect(() => {
    if (ensureCanonicalOrigin()) return;
    document.title = "Vendor Terms — Golazo Festival 2026";
  }, []);

  return (
    <div style={{ fontFamily: "'Inter Display', 'Helvetica Neue', sans-serif", background: "#FAFBFD", color: "#0A1220", minHeight: "100vh" }}>
      <header style={{ background: SECTION_BG, color: "#fff" }}>
        <div style={{ maxWidth: 780, margin: "0 auto", padding: "clamp(36px,7vh,68px) clamp(20px,5vw,32px)" }}>
          <Link to="/golazo" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13.5, fontWeight: 600, color: "rgba(255,255,255,.7)", textDecoration: "none", marginBottom: 22 }}>
            ← Back to Golazo
          </Link>
          <p style={{ margin: "0 0 10px", fontSize: 12.5, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "#5AA9FF" }}>Golazo Festival 2026</p>
          <h1 style={{ margin: 0, fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, letterSpacing: "-0.035em", lineHeight: 1.1 }}>
            Vendor Terms &amp; Conditions
          </h1>
          <p style={{ margin: "16px 0 0", maxWidth: "60ch", fontSize: 15.5, lineHeight: 1.65, color: "rgba(255,255,255,.62)" }}>
            These terms govern participation as a vendor at Golazo Festival 2026, organised by
            Inspire Youth Development Foundation (IYDF). Please read and accept them before paying
            to secure a vendor space.
          </p>
        </div>
      </header>

      <main style={{ maxWidth: 780, margin: "0 auto", padding: "clamp(36px,6vh,60px) clamp(20px,5vw,32px) 80px" }}>
        {CLAUSES.map(([heading, paragraphs]) => (
          <section key={heading} style={{ marginBottom: 34 }}>
            <h2 style={{ margin: "0 0 12px", fontSize: 17.5, fontWeight: 800, letterSpacing: "-0.02em" }}>{heading}</h2>
            {paragraphs.map((line, i) =>
              line.startsWith("• ") ? (
                <p key={i} style={{ margin: "0 0 6px", paddingLeft: 18, fontSize: 15.5, lineHeight: 1.65, color: "#51607A" }}>
                  <span style={{ color: "#8794A8", marginRight: 8 }}>•</span>{emphasise(line.slice(2))}
                </p>
              ) : (
                <p key={i} style={{ margin: "0 0 10px", fontSize: 15.5, lineHeight: 1.65, color: "#51607A" }}>{emphasise(line)}</p>
              ),
            )}
          </section>
        ))}

        <section style={{ marginTop: 44, padding: "clamp(22px,3vw,30px)", background: "#fff", border: "1px solid rgba(10,18,32,.09)", borderRadius: 18 }}>
          <h2 style={{ margin: "0 0 12px", fontSize: 17.5, fontWeight: 800, letterSpacing: "-0.02em" }}>Vendor Declaration</h2>
          <p style={{ margin: "0 0 14px", fontSize: 15.5, lineHeight: 1.65, color: "#51607A" }}>
            I hereby confirm that I have carefully read, understood, and agree to abide by the
            Golazo Festival 2026 Vendor Terms and Conditions. I understand that my registration is
            subject to these conditions and that failure to comply may result in my removal from
            the event without refund.
          </p>
          {/* No signature field: the checkout form captures business name,
              vendor name, phone and email, and the acceptance is timestamped
              server-side when the box is ticked. That record is the signature. */}
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "#8794A8" }}>
            You accept these terms by ticking the box on the booking form. Your business name,
            contact name, phone number and the date and time of acceptance are recorded with your
            booking.
          </p>
          <Link
            to="/golazo#vendors"
            style={{ display: "inline-block", marginTop: 20, fontSize: 15, fontWeight: 600, color: "#fff", background: "#007AFF", textDecoration: "none", padding: "13px 26px", borderRadius: 999 }}
          >
            Back to booking
          </Link>
        </section>
      </main>
    </div>
  );
};

export default GolazoVendorTerms;
