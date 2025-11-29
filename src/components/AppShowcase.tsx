import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import StaticPhoneShowcase from "./StaticPhoneShowcase";

const appScreens = [
  {
    title: "Browse Venues",
    description: "Discover sports facilities near you with detailed information and availability",
    screenshot: "/app-screenshots/Venue.png",
  },
  {
    title: "Easy Booking",
    description: "Book your preferred time slot in just a few taps with instant confirmation",
    screenshot: "/app-screenshots/Book.png",
  },
  {
    title: "Payment Success",
    description: "Secure payment processing with immediate booking confirmation",
    screenshot: "/app-screenshots/home.png",
  },
];

const AppShowcase = () => {
  const scrollToWaitlist = () => {
    const waitlistSection = document.getElementById('waitlist-section');
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content Grid - Similar to Vendor Benefits */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content - Text */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <span className="text-sm font-semibold text-primary">Mobile App</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 italic leading-tight">
              Book Sports
              <br />
              On The Go
            </h2>

            <p className="text-lg text-gray-600 leading-relaxed">
              Join our waitlist to get early access to our mobile app. Book your favorite sports facilities anytime, anywhere. Simple, fast, and convenient.
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
                  <h3 className="font-bold text-gray-900">Browse Available Venues</h3>
                  <p className="text-sm text-gray-600">Find the perfect sports facility with real-time availability</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Quick & Easy Booking</h3>
                  <p className="text-sm text-gray-600">Reserve your slot in seconds with our intuitive interface</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Secure Payments</h3>
                  <p className="text-sm text-gray-600">Pay safely with multiple payment options and instant confirmation</p>
                </div>
              </div>
            </div>

            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 gap-2 mt-6"
              onClick={scrollToWaitlist}
            >
              Join Waitlist
              <ArrowRight className="h-5 w-5" />
            </Button>
            {/* Commented out for future multi-page structure */}
            {/* <Link to="/mobile-app">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 gap-2 mt-6">
                Download App
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link> */}
          </div>

          {/* Right Content - Static Phone Screenshots */}
          <div className="relative flex items-center justify-center">
            <StaticPhoneShowcase screens={appScreens} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppShowcase;
