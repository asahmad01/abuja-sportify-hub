import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ShootingStars from "@/components/ShootingStars";

const Terms = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="pt-12 pb-6 md:pt-16 md:pb-8 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold">
                Spotts Terms & <span className="gradient-text">Conditions</span>
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
                      Welcome to Spotts. These Terms and Conditions ("Terms") govern your access to and use of the Spotts website, mobile application, and related services (collectively, the "Platform"). By accessing or using Spotts, you agree to be bound by these Terms.
                    </p>

                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">1. About Spotts</h2>
                      <p>
                        Spotts is a sports venue discovery and booking platform that helps users find, book, and pay for sports facilities such as football pitches, padel courts, basketball courts, gyms, and other recreational venues.
                      </p>
                      <ul className="list-disc pl-6 mt-4 space-y-2">
                        <li>Spotts is preparing for launch and may offer limited booking functionality during this initial phase. Features may be updated, modified, or expanded over time.</li>
                        <li>Spotts operates as a marketplace intermediary and does not own, manage, or operate any listed sports venue.</li>
                      </ul>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">2. Eligibility & Use of the Platform</h2>
                      <ul className="list-disc pl-6 mt-4 space-y-2">
                        <li><strong>Age Requirements:</strong> Users must be at least 13 years old to use Spotts. Users aged 13-17 must obtain permission from a parent or legal guardian before creating an account or making payments. By creating an account, minors confirm they have obtained the necessary parental consent.</li>
                        <li>You agree to provide accurate, current, and complete information when using the Platform.</li>
                        <li>You agree to use Spotts only for lawful purposes and in accordance with these Terms.</li>
                        <li>Spotts reserves the right to suspend or terminate user access in cases of abuse, fraud, misuse, or violation of these Terms.</li>
                      </ul>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">3. User Conduct</h2>
                      <p>Users agree not to:</p>
                      <ul className="list-disc pl-6 mt-4 space-y-2">
                        <li>Provide false or misleading information during registration or booking</li>
                        <li>Write fake, fraudulent, or abusive reviews about venues</li>
                        <li>Harass, threaten, or abuse venues, other users, or Spotts staff</li>
                        <li>Interfere with bookings or attempt to manipulate the Platform</li>
                        <li>Use the Platform for any illegal activities</li>
                      </ul>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">4. Role of Venues</h2>
                      <p>All venues listed on Spotts:</p>
                      <ul className="list-disc pl-6 mt-4 space-y-2">
                        <li>Control their pricing</li>
                        <li>Control their availability and booking calendar</li>
                        <li>Set their cancellation and refund policies</li>
                      </ul>
                      <p className="mt-4">
                        Spotts carefully vets and verifies all venues before listing them on the Platform, including physical inspections and quality checks. However, Spotts does not guarantee real-time venue availability, ongoing quality standards, safety conditions, or service delivery, as these are controlled by the venue. Users are encouraged to verify specific details directly with venues when needed.
                      </p>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">5. Bookings & Payments</h2>
                      <ul className="list-disc pl-6 mt-4 space-y-2">
                        <li>Spotts enables users to make bookings and payments through the Platform.</li>
                        <li>Payments are processed securely via third-party payment providers (Paystack).</li>
                        <li>Spotts does not store users' full card numbers, CVV, or sensitive payment details. For more information on how we handle payment data, please see our Privacy Policy.</li>
                        <li>Spotts collects payments on behalf of venues and facilitates settlement to venues in accordance with agreed arrangements.</li>
                        <li>Spotts may charge venues a commission or service fee. During promotional or pilot phases, such fees may be waived.</li>
                        <li>Users agree to resolve payment disputes with venues directly. Spotts may assist but is not liable for disputed charges.</li>
                      </ul>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">6. Sharing Your Information with Venues</h2>
                      <p>
                        When you make a booking, we share your name, email address, and phone number with the venue to enable them to fulfill your booking and communicate with you about booking-related matters (confirmations, changes, cancellations, or late-minute updates). This is necessary to complete your booking. Venues are responsible for handling your information in accordance with applicable data protection laws.
                      </p>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">7. Account Termination</h2>
                      <p>If your account is suspended or terminated:</p>
                      <ul className="list-disc pl-6 mt-4 space-y-2">
                        <li>Active bookings may be cancelled and refunded depending on the reason for termination</li>
                        <li>Bookings made in violation of these Terms may be cancelled without refund</li>
                        <li>For terminations due to security concerns, we will work with you on a case-by-case basis to handle existing bookings fairly</li>
                        <li>You may still contact support regarding bookings made prior to termination</li>
                      </ul>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">8. Cancellations & Refunds</h2>
                      <ul className="list-disc pl-6 mt-4 space-y-2">
                        <li>Cancellations and refunds are subject to the individual venue's cancellation policy, which is displayed at the time of booking.</li>
                        <li>Users may contact Spotts support (<a href="mailto:info@spottsapp.com" className="text-blue-400 hover:text-blue-300 hover:underline">info@spottsapp.com</a> or WhatsApp) for assistance with booking issues.</li>
                        <li>Some issues may require users to liaise directly with the venue.</li>
                        <li>Approved refunds will be processed back to the original payment method within 3-10 working days, depending on your bank or payment provider.</li>
                      </ul>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">9. Injuries, Safety & Liability</h2>
                      <p>Spotts is not responsible for:</p>
                      <ul className="list-disc pl-6 mt-4 space-y-2">
                        <li>Injuries, accidents, or damages occurring at any venue</li>
                        <li>Venue closures, operational issues, or no-shows</li>
                        <li>Disputes between users and venues</li>
                        <li>The condition, safety, or suitability of any venue or equipment</li>
                      </ul>
                      <p className="mt-4">
                        Users participate in sports activities at their own risk. We recommend users verify venue safety standards and bring appropriate safety gear when needed.
                      </p>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">10. Platform Availability</h2>
                      <p>
                        Spotts aims to provide reliable access to the Platform but does not guarantee uninterrupted or error-free service. Features may be added, removed, or modified without prior notice, especially during early launch phases.
                      </p>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">11. Intellectual Property</h2>
                      <p>
                        All content, branding, logos, and materials on the Spotts Platform are owned by or licensed to Spotts and may not be used without prior written permission.
                      </p>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">12. Dispute Resolution</h2>
                      <p>
                        In the event of any dispute arising from these Terms or use of the Platform, parties agree to first attempt resolution through good faith negotiation. If negotiation fails, disputes shall be resolved through mediation or arbitration in accordance with Nigerian law before pursuing litigation.
                      </p>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">13. Changes to These Terms</h2>
                      <p>
                        Spotts may update these Terms from time to time. Updated versions will be posted on the Platform with a revised effective date. Continued use of the Platform after changes are posted constitutes acceptance of the updated Terms.
                      </p>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">14. Privacy</h2>
                      <p>
                        Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your personal information. By using Spotts, you also agree to our Privacy Policy.
                      </p>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">15. Governing Law</h2>
                      <p>
                        These Terms are governed by and construed in accordance with the laws of the Federal Republic of Nigeria.
                      </p>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">16. Contact Information</h2>
                      <p>For questions, support, or concerns, please contact us:</p>
                      <p className="mt-4">
                        Email: <a href="mailto:info@spottsapp.com" className="text-blue-400 hover:text-blue-300 hover:underline">info@spottsapp.com</a><br />
                        WhatsApp: <a href="https://wa.me/2349160244454" className="text-blue-400 hover:text-blue-300 hover:underline">+234 916 024 4454</a>
                      </p>
                    </div>

                    <div className="pt-8 border-t border-white/20">
                      <p className="text-sm text-white/60">
                        Effective Date: January 20, 2026
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

export default Terms;
