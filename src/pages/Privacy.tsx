import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ShootingStars from "@/components/ShootingStars";
import { Link } from "react-router-dom";

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
                Effective Date: 5 March 2026
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
                      Spotts ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, store, and protect your personal information when you use the Spotts mobile app and related services (collectively, the "Platform"). By using Spotts, you agree to the practices described in this Privacy Policy.
                    </p>

                    {/* Section 1 */}
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>

                      <h3 className="text-xl font-bold text-white mt-4 mb-2">1.1 Personal Information</h3>
                      <p>When you create an account or make a booking, we collect:</p>
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Full name</li>
                        <li>Email address</li>
                        <li>Phone number (required for bookings, to enable venues to contact you directly about last-minute changes, confirmations, or cancellations)</li>
                      </ul>
                      <p className="mt-2">Guest users can browse venues without creating an account but cannot make bookings.</p>

                      <h3 className="text-xl font-bold text-white mt-4 mb-2">1.2 Location Information</h3>
                      <p>With your permission, we access your device's location to show nearby venues.</p>
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li><strong>How it works:</strong> We request foreground-only location permission (precise or approximate, depending on your device settings). Your location is used entirely on your device to calculate distances to venues. Your location coordinates are never sent to our servers, stored in our database, or shared with third parties.</li>
                        <li><strong>Optional:</strong> Location permission is only requested when you tap "Enable Location" in the app. If you deny permission, all other app features remain fully available.</li>
                        <li><strong>Control:</strong> You can enable or disable location access at any time in your device settings.</li>
                      </ul>

                      <h3 className="text-xl font-bold text-white mt-4 mb-2">1.3 Booking Information</h3>
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Selected venue and court</li>
                        <li>Booking date and time</li>
                        <li>Payment status and transaction reference numbers</li>
                      </ul>

                      <h3 className="text-xl font-bold text-white mt-4 mb-2">1.4 Device and App Data</h3>
                      <p>We automatically collect:</p>
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Device type, OS version, and app version (for compatibility and performance monitoring)</li>
                        <li>IP address (for security, fraud detection, and session management)</li>
                        <li>Crash reports via Firebase Crashlytics (may include your user ID to help diagnose account-specific issues)</li>
                        <li>App usage data via Firebase Analytics (screens viewed, features used)</li>
                        <li>Session information: login times and session duration</li>
                      </ul>
                      <p className="mt-2 font-bold text-white">IP Address Retention:</p>
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Session IPs are deleted after 120 minutes</li>
                        <li>Security logs retain IPs for up to 1 year. Financial audit records (booking and transaction data) are retained for 7 years in compliance with Nigerian financial regulations, then securely deleted or pseudonymized</li>
                      </ul>

                      <h3 className="text-xl font-bold text-white mt-4 mb-2">1.5 User-Generated Content and Social Features</h3>
                      <p className="mt-2"><strong>Open Sessions:</strong> When you create or join an open session, your name and profile information is visible to other participants and the session host. Session details (venue, sport, date, time, available spots) are visible to all users browsing open sessions on the Platform.</p>
                      <p className="mt-2"><strong>In-App Messaging:</strong> Spotts provides in-app chat for open session participants. Messages are stored on our servers and are visible to all participants in that session. Messages may be reviewed by Spotts staff for safety, dispute resolution, or policy enforcement. Users may report messages that violate our policies; reported content may be reviewed by Spotts staff and retained temporarily for investigation purposes. Messages are retained for 30 days after the session ends, then permanently deleted.</p>
                      <p className="mt-2"><strong>Reviews and Ratings:</strong> When you leave a review, your name and rating are visible to other users and venue owners. Reviews may be moderated and removed if they violate our community guidelines. Users may report reviews that violate our policies; reported content may be reviewed by Spotts staff and retained temporarily for investigation purposes.</p>
                      <p className="mt-2"><strong>Booking QR Codes:</strong> Each confirmed booking generates a unique QR code. Venue staff may scan this code to verify your check-in, at which point they will see your name, booking date, time, and court details.</p>
                      <p className="mt-2"><strong>Tournament and Event Registration:</strong> When you register for a tournament or featured event, your registration details (name, contact information, and registration status) may be shared with the event organiser or venue hosting the event.</p>

                      <h3 className="text-xl font-bold text-white mt-4 mb-2">1.6 Push Notifications</h3>
                      <p>With your permission, we send push notifications for booking confirmations, reminders, and updates. Your device token (a unique identifier used to deliver notifications) is stored on our servers and deleted when you log out or delete your account.</p>
                    </div>

                    {/* Section 2 */}
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
                      <p>We use your information to:</p>
                      <ul className="list-disc pl-6 mt-4 space-y-2">
                        <li>Enable account creation and authentication</li>
                        <li>Process bookings and payments via Paystack</li>
                        <li>Communicate booking confirmations and updates to you and venues</li>
                        <li>Facilitate open sessions, in-app messaging, and social features</li>
                        <li>Deliver push notifications</li>
                        <li>Provide customer support</li>
                        <li>Monitor app performance and detect errors</li>
                        <li>Prevent fraud and abuse</li>
                        <li>Improve and operate the Platform</li>
                        <li>Send promotional communications if you opt in</li>
                      </ul>

                      <h3 className="text-xl font-bold text-white mt-4 mb-2">2.1 Your Consent</h3>
                      <p>By creating an account or using Spotts, you consent to the collection and processing of your personal information as described in this policy.</p>
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li><strong>Account creation:</strong> You will be prompted to review and accept this Privacy Policy during signup.</li>
                        <li><strong>Location permission:</strong> We request explicit consent before accessing your device location.</li>
                        <li><strong>Push notifications:</strong> We request explicit permission before sending notifications.</li>
                        <li><strong>Marketing communications:</strong> You can opt in during signup or in app Settings. Opting in is not required to use Spotts.</li>
                      </ul>

                      <p className="mt-4"><strong>Withdrawing consent:</strong> You can withdraw consent at any time by:</p>
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Deleting your account (Settings &rarr; Account &rarr; Delete Account)</li>
                        <li>Disabling location permissions in your device settings</li>
                        <li>Disabling push notifications in your device settings</li>
                        <li>Unsubscribing from marketing emails via the link in emails or in app Settings</li>
                      </ul>
                    </div>

                    {/* Section 3 */}
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">3. Payments</h2>
                      <p>Card numbers, CVV, and full payment details are never stored by Spotts. Payments are securely processed via Paystack on their hosted payment page.</p>

                      <p className="mt-4 font-bold text-white">Data sent to Paystack:</p>
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Email address</li>
                        <li>Payment amount</li>
                        <li>Booking reference (transaction ID)</li>
                        <li>Metadata: booking_id, user_id, venue_id, court_id, booking_date, start_time</li>
                      </ul>
                      <p className="mt-2">We do not send your phone number, full name, or address to Paystack.</p>

                      <p className="mt-4 font-bold text-white">Data we store from Paystack:</p>
                      <p className="mt-1">After payment, we store transaction references, payment status, and gateway responses (including card BIN/first 6 digits, last 4 digits, card type) for refunds, auditing, fraud prevention, and financial reconciliation. Full webhook payloads are stored in our database indefinitely and in application logs for 14 days.</p>
                      <p className="mt-2">We never store full card numbers or CVVs.</p>
                      <p className="mt-4">
                        For more information, see <a href="https://paystack.com/privacy/merchant" className="text-blue-400 hover:text-blue-300 hover:underline">Paystack's Privacy Policy</a>.
                      </p>
                    </div>

                    {/* Section 4 */}
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">4. Data Sharing</h2>
                      <p>We may share personal information with:</p>
                      <ul className="list-disc pl-6 mt-4 space-y-2">
                        <li><strong>Venue partners:</strong> To fulfill bookings and verify check-ins. Venue staff can see your name and booking details when scanning your QR code or managing their bookings dashboard.</li>
                        <li><strong>Event organisers:</strong> Your registration details for tournaments or featured events may be shared with the organiser or hosting venue.</li>
                        <li><strong>Cloud hosting providers:</strong> For secure data storage and processing.</li>
                        <li><strong>Email service providers:</strong> For transactional messages and notifications.</li>
                        <li><strong>Payment processors (Paystack):</strong> For transaction processing.</li>
                        <li><strong>Legal authorities:</strong> When required by law or to protect the rights, property, or safety of Spotts, our users, or the public.</li>
                      </ul>

                      <p className="mt-4"><strong>Venue payout processing:</strong> Venue partners who receive payouts through the Platform have provided their bank account details during onboarding. These details are shared with Paystack to create a payment subaccount, enabling automated settlement of their earnings. This sharing is governed by their agreement with Spotts and Paystack's terms of service.</p>

                      <p className="mt-4">We do not sell personal information or share it for advertising purposes.</p>
                    </div>

                    {/* Section 5 */}
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">5. User Rights</h2>
                      <p>You have the right to:</p>
                      <ul className="list-disc pl-6 mt-4 space-y-2">
                        <li>Access and correct your personal data</li>
                        <li>Request deletion of your account or specific data</li>
                        <li>Opt out of marketing communications</li>
                        <li>Request a copy of your personal data by contacting <a href="mailto:info@spottsapp.com" className="text-blue-400 hover:text-blue-300 hover:underline">info@spottsapp.com</a></li>
                      </ul>

                      <h3 className="text-xl font-bold text-white mt-4 mb-2">Account Deletion:</h3>
                      <p>You can delete your account via:</p>
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>In-app: Settings &rarr; Account &rarr; Delete Account</li>
                        <li>Web: <Link to="/delete-account" className="text-blue-400 hover:text-blue-300 hover:underline">spottsapp.com/delete-account</Link></li>
                      </ul>

                      <p className="mt-4">When you delete your account:</p>
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Your personal information (name, email, phone) is permanently deleted.</li>
                        <li>All active bookings will be cancelled. Where applicable, refunds will be processed in accordance with the venue's cancellation policy.</li>
                        <li>You will lose access to your booking history, preferences, and any earned rewards.</li>
                        <li>Transaction and financial records are anonymized (your identifiers are replaced with "Deleted User [ID]") and retained for 7 years as required by Nigerian financial regulations, then securely deleted.</li>
                        <li>This action cannot be undone.</li>
                        <li>You will receive a confirmation email once deletion is complete.</li>
                      </ul>

                      <h3 className="text-xl font-bold text-white mt-4 mb-2">Specific Data Requests:</h3>
                      <p>
                        You can request deletion of specific data without deleting your entire account by contacting <a href="mailto:info@spottsapp.com" className="text-blue-400 hover:text-blue-300 hover:underline">info@spottsapp.com</a>. Requests are processed within 7 business days.
                      </p>
                    </div>

                    {/* Section 6 */}
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">6. Cookies and Tracking</h2>
                      <p>Spotts uses cookies and similar technologies for session management and app performance.</p>
                      <p className="mt-2">We use Firebase Analytics and Firebase Crashlytics strictly for performance monitoring, crash detection, and error diagnosis. We do not use Firebase for advertising purposes, and we do not share this data with advertising networks. Google Ads integration is disabled in our Firebase configuration.</p>
                      <p className="mt-2">You can control cookies through your device settings. On mobile, cookies are used for session management only.</p>
                    </div>

                    {/* Section 7 */}
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">7. Age Requirements and Children's Privacy</h2>
                      <p>Spotts is intended for users aged <strong>18 and above</strong>. You must be at least 18 years old to create an account or make bookings on the Platform.</p>
                      <ul className="list-disc pl-6 mt-4 space-y-2">
                        <li><strong>Under 18:</strong> You may not create an account or use Spotts. If we discover we have collected data from someone under 18, we will delete it immediately.</li>
                      </ul>
                      <p className="mt-4">
                        Parents or guardians who believe their child has provided personal information without consent may contact us at <a href="mailto:info@spottsapp.com" className="text-blue-400 hover:text-blue-300 hover:underline">info@spottsapp.com</a> to request deletion.
                      </p>
                    </div>

                    {/* Section 8 */}
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">8. Data Retention</h2>
                      <div className="overflow-x-auto mt-4">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="border-b border-white/20">
                              <th className="py-3 pr-4 text-white font-semibold">Data Type</th>
                              <th className="py-3 text-white font-semibold">Retention Period</th>
                            </tr>
                          </thead>
                          <tbody className="text-white/80">
                            <tr className="border-b border-white/10">
                              <td className="py-3 pr-4">Personal account data</td>
                              <td className="py-3">Retained while account is active; deleted immediately upon account deletion</td>
                            </tr>
                            <tr className="border-b border-white/10">
                              <td className="py-3 pr-4">Session data and IP addresses</td>
                              <td className="py-3">120 minutes</td>
                            </tr>
                            <tr className="border-b border-white/10">
                              <td className="py-3 pr-4">Application logs</td>
                              <td className="py-3">14 days</td>
                            </tr>
                            <tr className="border-b border-white/10">
                              <td className="py-3 pr-4">In-app messages</td>
                              <td className="py-3">30 days after the session ends, then permanently deleted</td>
                            </tr>
                            <tr className="border-b border-white/10">
                              <td className="py-3 pr-4">Security logs</td>
                              <td className="py-3">1 year</td>
                            </tr>
                            <tr className="border-b border-white/10">
                              <td className="py-3 pr-4">Reconciliation logs</td>
                              <td className="py-3">90 days</td>
                            </tr>
                            <tr className="border-b border-white/10">
                              <td className="py-3 pr-4">Integrity logs</td>
                              <td className="py-3">180 days</td>
                            </tr>
                            <tr className="border-b border-white/10">
                              <td className="py-3 pr-4">Payout logs</td>
                              <td className="py-3">1 year</td>
                            </tr>
                            <tr className="border-b border-white/10">
                              <td className="py-3 pr-4">Audit tables (booking records, transaction records, admin actions)</td>
                              <td className="py-3">7 years (Nigerian financial record-keeping compliance), then securely deleted</td>
                            </tr>
                            <tr className="border-b border-white/10">
                              <td className="py-3 pr-4">Device tokens (push notifications)</td>
                              <td className="py-3">Deleted on logout or account deletion</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Section 9 */}
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">9. Data Security</h2>
                      <ul className="list-disc pl-6 mt-4 space-y-2">
                        <li>All data in transit is encrypted via HTTPS</li>
                        <li>Passwords are hashed using bcrypt</li>
                        <li>Sensitive payment data is encrypted in the database</li>
                        <li>We implement technical and organisational measures appropriate to the sensitivity of your data</li>
                      </ul>
                      <p className="mt-4">
                        <strong>Data Breach Notification:</strong> We will notify affected users within 72 hours of discovering a breach that may harm you, and will notify relevant authorities in accordance with NDPR.
                      </p>
                    </div>

                    {/* Section 10 */}
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">10. Third-Party Services</h2>
                      <div className="overflow-x-auto mt-4">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="border-b border-white/20">
                              <th className="py-3 pr-4 text-white font-semibold">Service</th>
                              <th className="py-3 text-white font-semibold">Purpose</th>
                            </tr>
                          </thead>
                          <tbody className="text-white/80">
                            <tr className="border-b border-white/10">
                              <td className="py-3 pr-4">Firebase Analytics</td>
                              <td className="py-3">App usage monitoring</td>
                            </tr>
                            <tr className="border-b border-white/10">
                              <td className="py-3 pr-4">Firebase Crashlytics</td>
                              <td className="py-3">Crash and error reporting</td>
                            </tr>
                            <tr className="border-b border-white/10">
                              <td className="py-3 pr-4">Google Maps</td>
                              <td className="py-3">Venue location display</td>
                            </tr>
                            <tr className="border-b border-white/10">
                              <td className="py-3 pr-4">Paystack</td>
                              <td className="py-3">Payment processing</td>
                            </tr>
                            <tr className="border-b border-white/10">
                              <td className="py-3 pr-4">Email providers</td>
                              <td className="py-3">Transactional and marketing emails</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <p className="mt-4">All third-party services are governed by their respective privacy policies.</p>
                    </div>

                    {/* Section 11 */}
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">11. International Data Processing</h2>
                      <p>
                        Data may be processed outside Nigeria on secure cloud infrastructure. We ensure appropriate safeguards in accordance with the Nigeria Data Protection Regulation (NDPR).
                      </p>
                    </div>

                    {/* Section 12 */}
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">12. Changes to This Privacy Policy</h2>
                      <p>
                        We may update this Privacy Policy from time to time. The revised policy will be posted at <Link to="/privacy" className="text-blue-400 hover:text-blue-300 hover:underline">spottsapp.com/privacy</Link> with an updated effective date. Continued use of the Platform after changes constitutes your acceptance of the updated policy.
                      </p>
                    </div>

                    {/* Section 13 */}
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">13. Governing Law</h2>
                      <p>
                        This Privacy Policy is governed by the laws of the Federal Republic of Nigeria and complies with the Nigeria Data Protection Regulation (NDPR).
                      </p>
                    </div>

                    {/* Section 14 */}
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">14. Contact</h2>
                      <p>For privacy-related inquiries or to exercise your rights:</p>
                      <div className="mt-4 space-y-1">
                        <p><strong className="text-white">Company:</strong> Spotts Technologies</p>
                        <p><strong className="text-white">Location:</strong> Abuja, Federal Capital Territory, Nigeria</p>
                        <p><strong className="text-white">Email:</strong> <a href="mailto:info@spottsapp.com" className="text-blue-400 hover:text-blue-300 hover:underline">info@spottsapp.com</a></p>
                        <p><strong className="text-white">Support:</strong> <Link to="/support" className="text-blue-400 hover:text-blue-300 hover:underline">spottsapp.com/support</Link></p>
                      </div>
                    </div>

                    <div className="pt-8 border-t border-white/20">
                      <p className="text-sm text-white/60">
                        Last Updated: 9 March 2026
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
