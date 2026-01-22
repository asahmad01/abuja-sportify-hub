import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ShootingStars from "@/components/ShootingStars";

const Refund = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="pt-12 pb-6 md:pt-16 md:pb-8 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold">
                Spotts Refund <span className="gradient-text">Policy</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Effective Date: January 20, 2026
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="pt-0 pb-16 md:pb-24 overflow-hidden bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-[48px] bg-black overflow-hidden">
              {/* Stars Animation */}
              <ShootingStars />

              {/* Blue Glow Effect */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-blue-600/50 rounded-full blur-[100px] pointer-events-none z-0"></div>
              <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-blue-600/5 via-transparent to-transparent pointer-events-none z-0"></div>

              <div className="relative z-10 p-8 md:p-16">
                <div className="max-w-4xl mx-auto prose prose-lg">
                  <div className="space-y-8 text-white/80">
                    <p>
                      This Refund Policy explains how cancellations and refunds are handled on the Spotts platform.
                    </p>

                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">1. Overview</h2>
                      <p>
                        Spotts is a sports venue discovery and booking platform. Spotts does not own or operate the venues listed on the Platform. Refunds and cancellations are governed by the individual venue's cancellation policy and are processed automatically through the Spotts app.
                      </p>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">2. Mandatory Acceptance of Venue Policies</h2>
                      <ul className="list-disc pl-6 mt-4 space-y-2">
                        <li>Before completing a booking, users are required to review and accept the venue's cancellation and refund policy.</li>
                        <li>Bookings cannot be completed without this acceptance.</li>
                        <li>Each venue's specific cancellation timeframes and refund terms (including any refund tiers) are displayed clearly during the booking process.</li>
                        <li>Users also acknowledge that payment processing fees are non-refundable for user-initiated cancellations (see Section 3 below).</li>
                      </ul>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">3. User-Initiated Cancellations</h2>
                      <p>
                        Users can cancel bookings directly through the Spotts app. Refunds are automatically processed based on the venue's cancellation policy.
                      </p>

                      <h3 className="text-xl font-bold text-white mt-4 mb-2">How Venue Refund Policies Work</h3>
                      <p>Venues may set different refund tiers based on when you cancel:</p>
                      <p className="mt-2 text-white/90">Examples:</p>
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li><strong>Full refund:</strong> Cancel 24+ hours before booking</li>
                        <li><strong>50% refund:</strong> Cancel 2-24 hours before booking</li>
                        <li><strong>No refund:</strong> Cancel less than 2 hours before booking or for same-day bookings</li>
                      </ul>
                      <p className="mt-2">The specific refund tier applicable to your booking is shown clearly before you confirm your booking and when you initiate a cancellation.</p>

                      <h3 className="text-xl font-bold text-white mt-4 mb-2">Payment Processing Fees</h3>
                      <p>Where a refund is approved for a user-initiated cancellation:</p>
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Payment processing fees charged by our third-party payment provider (Paystack) are non-refundable</li>
                        <li>These fees are calculated as 1.5% of the transaction amount + ₦100 (capped at ₦2,000 per transaction)</li>
                        <li>Spotts does not control or retain these third-party fees; they are charged directly by Paystack</li>
                        <li>The refund amount will be the applicable refund percentage (based on the venue's policy) minus the payment processing fee</li>
                        <li>Payment processing fees are clearly displayed during the booking process before payment confirmation</li>
                      </ul>

                      <p className="mt-4 font-bold text-white">Example:</p>
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Booking total: ₦10,000</li>
                        <li>Processing fee: (₦10,000 × 1.5%) + ₦100 = ₦250</li>
                        <li>Venue policy: 50% refund if cancelled 2 hours before booking</li>
                        <li>If you cancel within this tier, you will receive: (₦10,000 × 50%) - ₦250 = ₦4,750</li>
                      </ul>

                      <h3 className="text-xl font-bold text-white mt-4 mb-2">Automatic Processing</h3>
                      <p>Once you cancel through the app:</p>
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>The system automatically checks the venue's cancellation policy</li>
                        <li>If a refund is approved (full or partial), it is processed immediately through Paystack</li>
                        <li>You will receive a confirmation notification with the refund amount and expected timeline</li>
                      </ul>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">4. Venue-Initiated Cancellations</h2>
                      <p>If a venue cancels a confirmed booking through their vendor dashboard:</p>
                      <ul className="list-disc pl-6 mt-4 space-y-2">
                        <li>The user is entitled to a full 100% refund, including the payment processing fees</li>
                        <li>The refund is automatically processed through the Spotts platform via Paystack</li>
                        <li>You will receive your complete payment back, regardless of how close to the booking time the cancellation occurs</li>
                      </ul>
                      <p className="mt-4 font-bold text-white">Example:</p>
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Booking total: ₦10,000</li>
                        <li>Processing fee: ₦250</li>
                        <li>If the venue cancels, you will receive a full refund of ₦10,000 (the venue absorbs the processing fee)</li>
                      </ul>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">5. Off-Platform Arrangements</h2>
                      <p>If you and a venue agree to handle a refund or cancellation outside of the Spotts platform (for example, directly between yourselves):</p>
                      <ul className="list-disc pl-6 mt-4 space-y-2">
                        <li>Spotts is not involved in processing such refunds</li>
                        <li>These arrangements are entirely between you and the venue</li>
                        <li>Spotts cannot provide support, mediation, or guarantees for off-platform transactions</li>
                        <li>We strongly recommend using the in-app cancellation system to ensure protection and proper refund processing</li>
                      </ul>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">6. No-Show Policy</h2>
                      <p>
                        If a user fails to show up for a confirmed booking without prior cancellation through the app, no refund will be issued unless the venue's policy explicitly allows otherwise.
                      </p>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">7. Refund Processing Timeline</h2>
                      <ul className="list-disc pl-6 mt-4 space-y-2">
                        <li>Refunds are processed automatically back to the original payment method via Paystack</li>
                        <li>Processing timelines typically take 3-10 business days to reflect in your account, depending on your bank or card provider</li>
                        <li>You will receive a confirmation notification once the refund has been initiated</li>
                        <li>If you don't see your refund within 10 business days, please contact your bank or card provider first, then reach out to Spotts support if needed</li>
                      </ul>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">8. Service Fees & Commissions</h2>
                      <ul className="list-disc pl-6 mt-4 space-y-2">
                        <li>Spotts may charge commissions or service fees to venues</li>
                        <li>During promotional or pilot phases, such fees may be waived</li>
                        <li>Where applicable, Spotts-related commissions or service fees are refunded when a booking is refunded</li>
                      </ul>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">9. Venue Issues & Liability</h2>
                      <p>Spotts is not responsible for:</p>
                      <ul className="list-disc pl-6 mt-4 space-y-2">
                        <li>Venue operational issues</li>
                        <li>Venue closures</li>
                        <li>Weather-related disruptions</li>
                        <li>Injuries or incidents at venues</li>
                        <li>Quality or condition of facilities</li>
                      </ul>
                      <p className="mt-4">
                        Spotts facilitates refunds through our automated system based on venue policies but does not guarantee refunds outside the venue's stated policy.
                      </p>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">10. How to Request Refund Assistance</h2>
                      <p><strong>For In-App Cancellations:</strong></p>
                      <ol className="list-decimal pl-6 mt-2 space-y-1">
                        <li>Navigate to your booking in the Spotts app</li>
                        <li>Select "Cancel Booking"</li>
                        <li>Review the refund amount (if applicable based on venue policy)</li>
                        <li>Confirm cancellation</li>
                        <li>Refund is processed automatically</li>
                      </ol>

                      <p className="mt-4"><strong>For Issues or Questions:</strong></p>
                      <p>
                        If you experience any difficulty with the automated refund process, contact Spotts support via:
                      </p>
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Email: <a href="mailto:info@spottsapp.com" className="text-blue-400 hover:text-blue-300 hover:underline">info@spottsapp.com</a></li>
                        <li>WhatsApp: <a href="https://wa.me/2349160244454" className="text-blue-400 hover:text-blue-300 hover:underline">+234 916 024 4454</a></li>
                      </ul>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">11. Dispute Resolution</h2>
                      <p>If you believe a refund was incorrectly processed or denied:</p>
                      <ul className="list-disc pl-6 mt-4 space-y-2">
                        <li>Contact Spotts support at <a href="mailto:info@spottsapp.com" className="text-blue-400 hover:text-blue-300 hover:underline">info@spottsapp.com</a> with your booking reference number</li>
                        <li>We will investigate the automated refund processing and work with the venue to resolve the issue</li>
                        <li>Final decisions on refund eligibility rest with the venue's cancellation policy as accepted at the time of booking</li>
                        <li>For venue-initiated cancellations, we ensure you receive a full refund including processing fees</li>
                      </ul>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">12. Changes to This Refund Policy</h2>
                      <p>
                        Spotts may update this Refund Policy from time to time. Updates will be posted on the Platform with a revised effective date. Continued use of the Platform constitutes acceptance of the updated policy.
                      </p>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">13. Contact Information</h2>
                      <p>For refund assistance or questions, please contact us:</p>
                      <p className="mt-4">
                        Email: <a href="mailto:info@spottsapp.com" className="text-blue-400 hover:text-blue-300 hover:underline">info@spottsapp.com</a><br />
                        WhatsApp: <a href="https://wa.me/2349160244454" className="text-blue-400 hover:text-blue-300 hover:underline">+234 916 024 4454</a>
                      </p>
                    </div>

                    <div className="pt-8 border-t border-white/20">
                      <p className="text-sm text-white/60">
                        Last Updated: January 20, 2026
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Refund;
