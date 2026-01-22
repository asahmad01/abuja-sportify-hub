import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ShootingStars from "@/components/ShootingStars";

const Privacy = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="pt-12 pb-6 md:pt-16 md:pb-8 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold">
                Spotts Privacy <span className="gradient-text">Policy</span>
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
                      Spotts ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, store, and protect your personal information when you use the Spotts mobile app, website, and related services (collectively, the "Platform"). By using Spotts, you agree to the practices described in this Privacy Policy.
                    </p>

                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>

                      <h3 className="text-xl font-bold text-white mt-4 mb-2">1.1 Personal Information</h3>
                      <p>When you create an account or make a booking, we collect:</p>
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Full name</li>
                        <li>Email address</li>
                        <li>Phone number (required for bookings to enable venues to contact you directly about booking-related matters such as last-minute changes, confirmations, or cancellations)</li>
                      </ul>
                      <p className="mt-2">Guest users can browse venues without creating an account but cannot make bookings.</p>

                      <h3 className="text-xl font-bold text-white mt-4 mb-2">1.2 Location Information</h3>
                      <p>With your permission, we access your device's location to show nearby venues in the "Near You" feature.</p>
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li><strong>How it works:</strong> We request foreground-only location permission (precise or approximate, depending on your device settings). Your location is used entirely on your device to calculate distances to venues using the Haversine formula. We fetch venue locations from our servers, but your location coordinates are never sent to our servers, stored in our database, logged, or shared with third parties.</li>
                        <li><strong>Optional feature:</strong> Location permission is requested only when you tap "Enable Location" in the app. If you deny permission, you can still browse all venues, search, filter, make bookings, and use all other app features normally.</li>
                        <li><strong>Control:</strong> You can enable or disable location access at any time in your device settings.</li>
                      </ul>

                      <h3 className="text-xl font-bold text-white mt-4 mb-2">1.3 Booking Information</h3>
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Selected venue and court</li>
                        <li>Booking date and time</li>
                        <li>Payment status and transaction reference numbers</li>
                      </ul>

                      <h3 className="text-xl font-bold text-white mt-4 mb-2">1.4 Device and App Data</h3>
                      <p>We automatically collect the following information:</p>
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Device type, OS version, and app version (for performance monitoring and compatibility)</li>
                        <li>IP address (used for security, fraud detection, and session management)</li>
                        <li>Crash reports via Firebase Crashlytics (may include user ID if you are logged in, to help diagnose account-specific issues)</li>
                        <li>Usage data: App interactions, screens viewed, features used (via Firebase Analytics)</li>
                        <li>Session information: Login times, session duration</li>
                      </ul>
                      <p className="mt-2 font-bold">IP Address Retention:</p>
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>IP addresses are stored for security, fraud prevention, and session management.</li>
                        <li>Session IPs are deleted after 120 minutes.</li>
                        <li>Security and audit logs retain IPs for up to 7 years, then are deleted or pseudonymized (replaced with a hashed identifier that cannot be reversed).</li>
                      </ul>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
                      <p>We use your information to:</p>
                      <ul className="list-disc pl-6 mt-4 space-y-2">
                        <li>Enable account creation and authentication</li>
                        <li>Process bookings and payments via Paystack</li>
                        <li>Communicate booking confirmations and updates to you and venues</li>
                        <li>Provide customer support</li>
                        <li>Monitor app performance and detect errors (Crashlytics, server logs)</li>
                        <li>Prevent fraud and abuse</li>
                        <li>Improve and operate the Platform</li>
                        <li>Send promotional communications if you opt in</li>
                      </ul>

                      <h3 className="text-xl font-bold text-white mt-4 mb-2">2.1 Your Consent</h3>
                      <p>By creating an account or using Spotts, you consent to the collection, use, and processing of your personal information as described in this Privacy Policy.</p>
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li><strong>Account creation:</strong> During signup, you will be prompted to review and accept this Privacy Policy.</li>
                        <li><strong>Location permission:</strong> We request your explicit consent before accessing your device location.</li>
                        <li><strong>Marketing communications:</strong> You can opt in to receive promotional emails during signup or in app Settings. You are not required to opt in to use Spotts.</li>
                        <li><strong>Withdrawing consent:</strong> You can withdraw consent at any time by:
                          <ul className="list-[circle] pl-6 mt-1 space-y-1">
                            <li>Deleting your account (Settings → Account → Delete Account)</li>
                            <li>Disabling location permissions in your device settings</li>
                            <li>Unsubscribing from marketing emails via the link in emails or in app Settings</li>
                          </ul>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">3. Payments</h2>
                      <ul className="list-disc pl-6 mt-4 space-y-2">
                        <li><strong>Card numbers, CVV, and full payment details are never stored by Spotts.</strong> Payments are securely processed via Paystack using a WebView/redirect integration. You complete payment on Paystack's secure hosted page.</li>
                        <li><strong>Data sent to Paystack:</strong> We send the following information to Paystack to process your payment:
                          <ul className="list-[circle] pl-6 mt-1 space-y-1">
                            <li>Email address</li>
                            <li>Payment amount</li>
                            <li>Booking reference (transaction ID)</li>
                            <li>Metadata: booking_id, user_id, venue_id, court_id, booking_date, start_time</li>
                            <li>We do NOT send your phone number, full name, or address to Paystack.</li>
                          </ul>
                        </li>
                        <li><strong>Data we store from Paystack:</strong> After payment, we store transaction references, payment status, and gateway responses (including card BIN/first 6 digits, last 4 digits, authorization code, card type) for refunds, auditing, fraud prevention, and financial reconciliation. Full webhook payloads from Paystack are stored in our database indefinitely and in application logs for 14 days.</li>
                        <li><strong>Sensitive data:</strong> We never store full card numbers or CVVs. Card authorization codes stored in gateway responses are used by Paystack for potential recurring payments (if applicable) and are securely encrypted.</li>
                      </ul>
                      <p className="mt-4">
                        For more information on how Paystack handles your payment data, see Paystack's Privacy Policy at <a href="https://paystack.com/privacy/merchant" className="text-blue-400 hover:text-blue-300 hover:underline">https://paystack.com/privacy/merchant</a>.
                      </p>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">4. Data Sharing</h2>
                      <p>We may share personal information with:</p>
                      <ul className="list-disc pl-6 mt-4 space-y-2">
                        <li>Partnered venues only to fulfill bookings</li>
                        <li>Cloud hosting providers for secure storage</li>
                        <li>Email service providers for transactional messages</li>
                        <li>Payment processors (Paystack) for transaction processing</li>
                        <li>Legal authorities when required by law</li>
                      </ul>
                      <p className="mt-4">
                        We do not sell personal information or share it for advertising purposes.
                      </p>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">5. User Rights</h2>
                      <p>You have the right to:</p>
                      <ul className="list-disc pl-6 mt-4 space-y-2">
                        <li>Access and correct your personal data</li>
                        <li>Request deletion of your data or account</li>
                        <li>Opt-out of marketing communications</li>
                        <li>Export your data in machine-readable format (JSON) by contacting <a href="mailto:info@spottsapp.com" className="text-blue-400 hover:text-blue-300 hover:underline">info@spottsapp.com</a></li>
                      </ul>

                      <h3 className="text-xl font-bold text-white mt-4 mb-2">Account Deletion:</h3>
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Account deletion is processed immediately upon request via the app settings.</li>
                        <li>Personal information (name, email, phone, preferences) is permanently deleted.</li>
                        <li>Data required for legal compliance, fraud prevention, or financial auditing (transaction records, audit logs, booking state logs) is anonymized (your name and email are replaced with "Deleted User [ID]") and retained according to our retention schedule (7 years for audit tables, 1 year for security logs).</li>
                        <li>You will receive a confirmation email once deletion is complete.</li>
                      </ul>

                      <h3 className="text-xl font-bold text-white mt-4 mb-2">Partial Deletion:</h3>
                      <p>
                        You can request deletion of specific data (e.g., old bookings, certain preferences) without deleting your entire account by contacting <a href="mailto:info@spottsapp.com" className="text-blue-400 hover:text-blue-300 hover:underline">info@spottsapp.com</a> or via WhatsApp. Requests are processed within 7 business days.
                      </p>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">6. Cookies & Tracking Technologies</h2>
                      <ul className="list-disc pl-6 mt-4 space-y-2">
                        <li>Spotts uses cookies and similar technologies to manage sessions and improve app performance.</li>
                        <li>We use Firebase Analytics and Firebase Crashlytics strictly for app performance monitoring, crash detection, and error diagnosis. We do NOT use Firebase Analytics for advertising purposes, and we do NOT share this data with advertising networks or use it for targeted ads. Google Ads integration is disabled in our Firebase configuration.</li>
                        <li>Firebase may collect app usage data (screens viewed, features used) and crash logs. This data helps us improve the app experience.</li>
                        <li>You can control cookies through your browser or device settings. For mobile apps, cookies are used for session management only.</li>
                      </ul>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">7. Age Requirements and Children's Privacy</h2>
                      <p>Spotts is a general sports booking platform. It is intended for users aged 13 and above. We do not knowingly collect personal information from children under 13.</p>
                      <ul className="list-disc pl-6 mt-4 space-y-2">
                        <li><strong>Users under 13:</strong> If you are under 13, you may not create an account or use Spotts. If we discover we have collected data from a child under 13, we will delete it immediately.</li>
                        <li><strong>Users aged 13-17:</strong> If you are between 13 and 17 years old, you may use Spotts to browse venues and make bookings. However, you must obtain permission from a parent or legal guardian before creating an account or making any payments. By creating an account, you confirm you have obtained the necessary parental consent.</li>
                        <li><strong>Verification:</strong> We may request proof of age or parental consent if we have reason to believe a user is underage.</li>
                      </ul>
                      <p className="mt-4">
                        Parents or guardians who believe their child has provided personal information to us without consent may contact us at <a href="mailto:info@spottsapp.com" className="text-blue-400 hover:text-blue-300 hover:underline">info@spottsapp.com</a> to request deletion.
                      </p>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">8. Data Retention</h2>
                      <p>Personal information is retained only as long as necessary to provide services or meet legal, operational, or regulatory requirements.</p>
                      <p className="mt-2 text-white/90 font-semibold">Specific retention periods:</p>
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Application logs: 14 days</li>
                        <li>Security logs: 1 year</li>
                        <li>Reconciliation logs: 90 days</li>
                        <li>Integrity logs: 180 days</li>
                        <li>Payout logs: 1 year</li>
                        <li>Audit tables (booking state logs, admin actions, transaction records): 7 years to comply with Nigerian financial record-keeping laws and fraud prevention requirements, then securely deleted</li>
                        <li>Session data (including IP addresses): 120 minutes (session lifetime)</li>
                        <li>Personal account data: Retained while your account is active, then deleted immediately upon account deletion (except for anonymized audit data retained per above schedule)</li>
                      </ul>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">9. Data Security</h2>
                      <ul className="list-disc pl-6 mt-4 space-y-2">
                        <li>All data in transit is encrypted via HTTPS or WSS (WebSockets).</li>
                        <li>User passwords are encrypted (bcrypt).</li>
                        <li>Sensitive payment data stored in the database is encrypted where required.</li>
                        <li>We implement technical and organizational measures to protect your information.</li>
                      </ul>
                      <p className="mt-4">
                        <strong>Data Breach Notification:</strong> We will notify affected users within 72 hours of discovering a data breach that may harm you, and will notify authorities in accordance with NDPR.
                      </p>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">10. Third Parties</h2>
                      <ul className="list-disc pl-6 mt-4 space-y-2">
                        <li>Firebase (Analytics & Crashlytics): collects app usage and crash data</li>
                        <li>Google Maps Flutter: may collect location interactions (user location not stored)</li>
                        <li>Paystack: collects transaction data for payment processing</li>
                        <li>Email providers: may collect delivery and open analytics</li>
                      </ul>
                      <p className="mt-2">All third-party services are governed by their respective privacy policies.</p>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">11. International Data Processing</h2>
                      <ul className="list-disc pl-6 mt-4 space-y-2">
                        <li>Data may be stored or processed outside Nigeria on secure cloud providers.</li>
                        <li>We ensure safeguards in accordance with NDPR.</li>
                      </ul>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">12. Changes to This Privacy Policy</h2>
                      <p>
                        We may update this Privacy Policy occasionally. The revised policy will be posted in the app and on the website with an updated effective date.
                      </p>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">13. Governing Law</h2>
                      <p>
                        This Privacy Policy is governed by the laws of the Federal Republic of Nigeria and complies with the Nigeria Data Protection Regulation (NDPR).
                      </p>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">14. Contact Information</h2>
                      <p>For privacy-related inquiries or to exercise your rights:</p>
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

export default Privacy;
