import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import CardSwap, { Card } from "./CardSwap";

const dashboardViews = [
  {
    title: "Revenue Analytics",
    description: "Monitor your earnings, growth trends, and financial performance at a glance",
    color: "from-green-500 to-teal-600",
    hasScreenshot: true,
    screenshot: "/dashboard-screenshots/Revenue copy.png",
  },
  {
    title: "Booking Management",
    description: "Track and manage all your bookings in real-time with an intuitive interface",
    color: "from-blue-500 to-purple-600",
    hasScreenshot: true,
    screenshot: "/dashboard-screenshots/Bookings copy.png",
  },
  {
    title: "Customer Insights",
    description: "Understand your customer base with detailed analytics and booking patterns",
    color: "from-orange-500 to-red-600",
    hasScreenshot: true,
    screenshot: "/dashboard-screenshots/Insights2 copy.png",
  },
  {
    title: "Membership Management",
    description: "Manage member profiles, subscriptions, and access levels effortlessly",
    color: "from-purple-500 to-pink-600",
    hasScreenshot: true,
    screenshot: "/dashboard-screenshots/Membership  copy.png",
  },
  {
    title: "Courts & Fields Management",
    description: "Configure and manage your sports facilities, schedules, and availability",
    color: "from-cyan-500 to-blue-600",
    hasScreenshot: true,
    screenshot: "/dashboard-screenshots/Courts:Fields copy.png",
  },
];

const VendorBenefits = () => {
  const scrollToWaitlist = () => {
    const waitlistSection = document.getElementById('waitlist-section');
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content Grid - Similar to Find Your Game */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left Content - Text */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <span className="text-sm font-semibold text-primary">Court Owner Benefits</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 italic leading-tight">
              Simplify Court
              <br />
              Management
            </h2>

            <p className="text-lg text-gray-600 leading-relaxed">
              Be among the first venue owners to transform your sports facility management. Manage bookings, track earnings, and grow your business - all in one powerful dashboard. No setup fees, no long-term contracts.
            </p>

            {/* Features List */}
            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Increased Bookings & Revenue</h3>
                  <p className="text-sm text-gray-600">Reach more customers online and fill empty slots automatically</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Digital Payments</h3>
                  <p className="text-sm text-gray-600">Accept secure online payments and reduce cash handling</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Real-time Analytics</h3>
                  <p className="text-sm text-gray-600">Track performance with comprehensive insights and reports</p>
                </div>
              </div>
            </div>

            <Button
              size="lg"
              onClick={scrollToWaitlist}
              className="bg-accent hover:bg-accent/90 text-white rounded-full px-8 gap-2 mt-6"
            >
              Become a Partner
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Right Content - Animated Dashboard Cards (Desktop) / Static Cards (Mobile) */}
          <div className="relative min-h-[500px] lg:min-h-[550px]">
            {/* Desktop: Animated Card Stack */}
            <div className="hidden lg:block">
              <CardSwap
                width={650}
                height={450}
                cardDistance={50}
                verticalDistance={50}
                delay={4000}
                pauseOnHover={true}
                easing="smooth"
              >
                {dashboardViews.map((view, index) => (
                  <Card key={index} className="shadow-2xl overflow-hidden">
                    {view.hasScreenshot && view.screenshot ? (
                      // Real Screenshot Card
                      <div className="w-full h-full bg-white p-4 flex flex-col">
                        <div className="flex-1 rounded-lg overflow-hidden bg-gray-100">
                          <img
                            src={view.screenshot}
                            alt={view.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="mt-4 text-center">
                          <h3 className="text-xl font-bold text-gray-900 mb-1">{view.title}</h3>
                          <p className="text-gray-600 text-sm">{view.description}</p>
                        </div>
                      </div>
                    ) : (
                      // Placeholder Card
                      <div className={`w-full h-full bg-gradient-to-br ${view.color} p-8 flex flex-col`}>
                        {/* Dashboard Header */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="w-24 h-3 bg-white/30 rounded"></div>
                            <div className="w-8 h-8 bg-white/20 rounded-full"></div>
                          </div>
                          <div className="w-32 h-2 bg-white/20 rounded"></div>
                        </div>

                        {/* Dashboard Content */}
                        <div className="flex-1 space-y-3">
                          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                            <div className="w-20 h-2 bg-white/30 rounded mb-2"></div>
                            <div className="w-full h-12 bg-white/20 rounded mb-2"></div>
                            <div className="flex gap-2">
                              <div className="w-16 h-2 bg-white/20 rounded"></div>
                              <div className="w-16 h-2 bg-white/20 rounded"></div>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                              <div className="w-12 h-2 bg-white/30 rounded mb-2"></div>
                              <div className="w-16 h-5 bg-white/40 rounded"></div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                              <div className="w-12 h-2 bg-white/30 rounded mb-2"></div>
                              <div className="w-16 h-5 bg-white/40 rounded"></div>
                            </div>
                          </div>
                        </div>

                        {/* Dashboard Footer - Title */}
                        <div className="mt-4 text-center">
                          <h3 className="text-xl font-bold text-white mb-1">{view.title}</h3>
                          <p className="text-white/80 text-sm">{view.description}</p>
                        </div>
                      </div>
                    )}
                  </Card>
                ))}
              </CardSwap>
            </div>

            {/* Mobile: Horizontal Swipeable Carousel */}
            <div className="lg:hidden">
              <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-4 px-4">
                {dashboardViews.map((view, index) => (
                  <div key={index} className="flex-shrink-0 w-[90vw] snap-center">
                    <div className="rounded-xl shadow-xl overflow-hidden h-full">
                      {view.hasScreenshot && view.screenshot ? (
                        // Real Screenshot Card
                        <div className="bg-white p-3 flex flex-col h-full">
                          <div className="rounded-lg overflow-hidden bg-gray-100">
                            <img
                              src={view.screenshot}
                              alt={view.title}
                              className="w-full h-auto object-contain"
                            />
                          </div>
                          <div className="mt-3 text-center">
                            <p className="text-gray-600 text-sm">{view.description}</p>
                          </div>
                        </div>
                      ) : (
                        // Placeholder Card
                        <div className={`bg-gradient-to-br ${view.color} p-6 flex flex-col h-96`}>
                          {/* Dashboard Header */}
                          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="w-24 h-3 bg-white/30 rounded"></div>
                              <div className="w-8 h-8 bg-white/20 rounded-full"></div>
                            </div>
                            <div className="w-32 h-2 bg-white/20 rounded"></div>
                          </div>

                          {/* Dashboard Content */}
                          <div className="flex-1 space-y-3">
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                              <div className="w-20 h-2 bg-white/30 rounded mb-2"></div>
                              <div className="w-full h-12 bg-white/20 rounded mb-2"></div>
                              <div className="flex gap-2">
                                <div className="w-16 h-2 bg-white/20 rounded"></div>
                                <div className="w-16 h-2 bg-white/20 rounded"></div>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                                <div className="w-12 h-2 bg-white/30 rounded mb-2"></div>
                                <div className="w-16 h-5 bg-white/40 rounded"></div>
                              </div>
                              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                                <div className="w-12 h-2 bg-white/30 rounded mb-2"></div>
                                <div className="w-16 h-5 bg-white/40 rounded"></div>
                              </div>
                            </div>
                          </div>

                          {/* Dashboard Footer - Title */}
                          <div className="mt-4 text-center">
                            <h3 className="text-xl font-bold text-white mb-1">{view.title}</h3>
                            <p className="text-white/80 text-sm">{view.description}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {/* Scroll Indicator Dots */}
              <div className="flex justify-center gap-2 mt-4">
                {dashboardViews.map((_, index) => (
                  <div key={index} className="w-2 h-2 rounded-full bg-gray-300"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VendorBenefits;
