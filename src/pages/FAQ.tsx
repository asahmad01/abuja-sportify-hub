import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ShootingStars from "@/components/ShootingStars";

const FAQ = () => {
  const faqCategories = [
    {
      title: "General Questions",
      items: [
        {
          question: "What is Spotts?",
          answer: "Spotts is a sports venue discovery and booking platform that helps users find, book, and pay for sports facilities such as football pitches, padel courts, basketball courts, gyms, and other recreational venues across Nigeria."
        },
        {
          question: "Is Spotts live?",
          answer: "Spotts is preparing for launch and may offer limited booking functionality during its initial rollout. Features will be expanded over time based on user feedback and venue partnerships."
        },
        {
          question: "What sports and venues are available on Spotts?",
          answer: "Spotts features football pitches, padel courts, basketball courts, gyms, and other sports facilities. Availability varies by location. You can browse all available venues in your area through the app using the \"Near You\" feature or search function."
        },
        {
          question: "Do I need an account to use Spotts?",
          answer: "You can browse venues as a guest, but you need to create an account to make bookings and payments. Creating an account is free and takes just a few minutes."
        }
      ]
    },
    {
      title: "Booking & Payments",
      items: [
        {
          question: "How do bookings work on Spotts?",
          answer: (
            <ol className="list-decimal pl-4 space-y-1">
              <li>Browse available venues in the app</li>
              <li>Select your preferred venue, date, and time slot</li>
              <li>Review and accept the venue's cancellation policy</li>
              <li>Complete payment securely through Paystack</li>
              <li>Receive instant booking confirmation</li>
            </ol>
          )
        },
        {
          question: "Can I book for a group or team?",
          answer: "Yes! When making a booking, you can specify the number of players or guests if the venue requires this information. Check the venue details for capacity limits."
        },
        {
          question: "How do payments work?",
          answer: "All payments are processed securely through Paystack, a trusted third-party payment provider. Spotts never stores your card numbers, CVV, or sensitive payment details. Payment is required at the time of booking to confirm your reservation."
        },
        {
          question: "What payment methods are accepted?",
          answer: (
            <>
              <p>Spotts accepts all payment methods supported by Paystack, including:</p>
              <ul className="list-disc pl-4 mt-2 space-y-1">
                <li>Debit/Credit cards (Visa, Mastercard, Verve)</li>
                <li>Bank transfers</li>
                <li>USSD</li>
                <li>Mobile money</li>
              </ul>
            </>
          )
        },
        {
          question: "Are there any additional fees?",
          answer: "No. Joining Spotts and creating an account is free. You only pay the venue's booking price as shown on the Platform—what you see is what you pay. There are no hidden fees or extra charges added at checkout."
        },
        {
          question: "Why do I need to provide my phone number?",
          answer: "Your phone number is shared with the venue so they can contact you directly about your booking (confirmations, changes, or last-minute updates). This ensures smooth communication between you and the venue."
        }
      ]
    },
    {
      title: "Cancellations & Refunds",
      items: [
        {
          question: "Can I cancel a booking?",
          answer: "Yes. You can cancel bookings directly through the Spotts app. Cancellations are subject to the venue's cancellation policy, which you accept before booking. Refund eligibility depends on the venue's terms and how far in advance you cancel."
        },
        {
          question: "How do refunds work?",
          answer: (
            <>
              <p>Refunds are processed automatically through the app based on the venue's policy:</p>
              <ul className="list-disc pl-4 mt-2 space-y-1">
                <li>Navigate to your booking in the app</li>
                <li>Select "Cancel Booking"</li>
                <li>Review the refund amount (if applicable)</li>
                <li>Confirm cancellation</li>
                <li>Refund is processed automatically back to your original payment method</li>
              </ul>
              <p className="mt-2 text-sm text-white/70">Timeline: Refunds typically appear in your account within 3-10 business days, depending on your bank or card provider.</p>
            </>
          )
        },
        {
          question: "Why is my refund less than what I paid?",
          answer: (
            <>
              <p>When you cancel a booking (user-initiated cancellation), payment processing fees charged by Paystack are deducted from your refund. These fees (1.5% + ₦100, capped at ₦2,000) cover the cost of processing your original payment and cannot be recovered.</p>
              <p className="mt-2 font-semibold">Example:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>You paid: ₦20,000</li>
                <li>Processing fee: ₦400</li>
                <li>Venue allows 100% refund</li>
                <li>You receive: ₦20,000 - ₦400 = ₦19,600</li>
              </ul>
              <p className="mt-2 text-sm italic">If the venue cancels your booking, you receive a full 100% refund with no deductions.</p>
            </>
          )
        },
        {
          question: "What are refund tiers?",
          answer: (
            <>
              <p>Venues may set different refund amounts based on when you cancel. For example:</p>
              <ul className="list-disc pl-4 mt-2 space-y-1">
                <li>Cancel 24+ hours before: 100% refund (minus processing fee)</li>
                <li>Cancel 2-24 hours before: 50% refund (minus processing fee)</li>
                <li>Cancel less than 2 hours before: No refund</li>
              </ul>
              <p className="mt-2">The specific policy for your booking is shown clearly before you confirm.</p>
            </>
          )
        },
        {
          question: "Can I reschedule a booking instead of cancelling?",
          answer: "Yes, you can reschedule your booking if the venue allows it and slots are available. Each venue has its own rescheduling policy. You can reschedule through the app or contact Spotts support at info@spottsapp.com for assistance."
        }
      ]
    },
    {
      title: "Account & Privacy",
      items: [
        {
          question: "Is my personal and payment information safe?",
          answer: (
            <>
              <p>Yes. Spotts takes data security seriously:</p>
              <ul className="list-disc pl-4 mt-2 space-y-1">
                <li>All data is encrypted in transit (HTTPS)</li>
                <li>Passwords are encrypted using bcrypt</li>
                <li>Payments are handled by Paystack—we never store your card numbers or CVV</li>
                <li>We comply with Nigerian Data Protection Regulation (NDPR)</li>
              </ul>
              <p className="mt-2">For more details, see our Privacy Policy.</p>
            </>
          )
        },
        {
          question: "Can I delete my account?",
          answer: "Yes. You can delete your account anytime through the app settings. Your personal information will be permanently deleted immediately, except for transaction records required for legal and fraud prevention purposes, which are anonymized and retained for 7 years."
        },
        {
          question: "What data do you share with venues?",
          answer: "When you make a booking, we share your name, email address, and phone number with the venue so they can fulfill your booking and communicate with you. Venues handle this information in accordance with data protection laws."
        }
      ]
    },
    {
      title: "Support & Issues",
      items: [
        {
          question: "Who should I contact if there's an issue with a booking?",
          answer: (
            <>
              <p>Contact Spotts support first at:</p>
              <ul className="list-disc pl-4 mt-2 space-y-1">
                <li>Email: <a href="mailto:info@spottsapp.com" className="text-blue-400 hover:text-blue-300 hover:underline">info@spottsapp.com</a></li>
                <li>WhatsApp: <a href="https://wa.me/2349160244454" className="text-blue-400 hover:text-blue-300 hover:underline">+234 916 024 4454</a></li>
              </ul>
              <p className="mt-2">We'll assist you in resolving the issue. Some matters may require direct communication with the venue, and we'll help facilitate that.</p>
            </>
          )
        },
        {
          question: "Do venues verify my booking?",
          answer: "Yes. Once you complete payment, the venue receives your booking details and confirmation. Some venues may contact you directly to confirm or provide additional information about your booking."
        },
        {
          question: "What if a venue cancels my booking?",
          answer: "If a venue cancels your confirmed booking, you'll automatically receive a full 100% refund with no deductions. The refund is processed immediately through Paystack."
        }
      ]
    },
    {
      title: "Safety & Liability",
      items: [
        {
          question: "Does Spotts own or operate the venues?",
          answer: "No. Spotts acts as a booking platform and does not own, manage, or operate any listed venues. All venues are independently owned and operated. We carefully vet venues before listing them, but ongoing operations are controlled by the venue owners."
        },
        {
          question: "What if I get injured at a venue?",
          answer: "Users participate in sports activities at their own risk. Spotts is not responsible for injuries, accidents, or damages occurring at venues. We recommend verifying venue safety standards and bringing appropriate safety gear."
        }
      ]
    },
    {
      title: "For Venues",
      items: [
        {
          question: "How can venues partner with Spotts?",
          answer: (
            <>
              <p>Venues interested in partnering can contact us at:</p>
              <ul className="list-disc pl-4 mt-2 space-y-1">
                <li>Email: <a href="mailto:info@spottsapp.com" className="text-blue-400 hover:text-blue-300 hover:underline">info@spottsapp.com</a></li>
                <li>WhatsApp: <a href="https://wa.me/2349160244454" className="text-blue-400 hover:text-blue-300 hover:underline">+234 916 024 4454</a></li>
              </ul>
              <p className="mt-2">We'll guide you through the onboarding process, including venue verification and listing setup.</p>
            </>
          )
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="pt-12 pb-6 md:pt-16 md:pb-8 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold">
                Spotts Frequently Asked <span className="gradient-text">Questions</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Last Updated: January 20, 2026
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="pt-0 pb-16 md:pb-24 overflow-hidden bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-[48px] bg-black overflow-hidden">
              {/* Stars Animation */}
              <ShootingStars />

              {/* Blue Glow Effect */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-blue-600/50 rounded-full blur-[100px] pointer-events-none z-0"></div>
              <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-blue-600/5 via-transparent to-transparent pointer-events-none z-0"></div>

              <div className="relative z-10 p-8 md:p-16">
                <div className="max-w-4xl mx-auto space-y-12">

                  {faqCategories.map((category, catIndex) => (
                    <div key={catIndex}>
                      <h2 className="text-2xl font-bold text-white mb-6">{category.title}</h2>
                      <Accordion type="single" collapsible className="w-full space-y-4">
                        {category.items.map((faq, index) => (
                          <AccordionItem
                            key={index}
                            value={`item-${catIndex}-${index}`}
                            className="border border-white/20 rounded-lg px-6 py-2 bg-white/5 backdrop-blur-sm"
                          >
                            <AccordionTrigger className="text-left font-semibold text-white hover:no-underline">
                              {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-white/80 pt-2 text-base leading-relaxed">
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  ))}

                  {/* Contact Section */}
                  <div className="mt-12 p-8 bg-white/10 backdrop-blur-sm rounded-lg text-center border border-white/20">
                    <h3 className="text-2xl font-bold text-white mb-4">
                      Still have questions?
                    </h3>
                    <p className="text-white/80 mb-6">
                      Can't find the answer you're looking for? Please reach out to our friendly team.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                      <a
                        href="mailto:info@spottsapp.com"
                        className="text-blue-400 hover:text-blue-300 hover:underline font-medium"
                      >
                        info@spottsapp.com
                      </a>
                      <span className="hidden sm:inline text-white/40">•</span>
                      <a
                        href="https://wa.me/2349160244454"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 hover:underline font-medium"
                      >
                        +234 916 024 4454
                      </a>
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

export default FAQ;
