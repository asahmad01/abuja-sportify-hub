import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import StaticPhoneShowcase from "@/components/StaticPhoneShowcase";
import { Download, Search, MapPin, Clock, Star, Calendar, Zap, CreditCard, CheckCircle, Repeat } from "lucide-react";

const MobileApp = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-16 md:py-20 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
              {/* Left Content */}
              <div className="text-center lg:text-left space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
                  <span className="text-sm font-semibold text-primary">Download Our App</span>
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold italic">
                  Book Sports
                  <br />
                  <span className="gradient-text">On The Go</span>
                </h1>
                <p className="text-xl text-muted-foreground">
                  Experience the easiest way to discover and book sports facilities across Abuja. Your next game is just a tap away.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 gap-2">
                    <Download className="h-5 w-5" />
                    Get on App Store
                  </Button>
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 gap-2">
                    <Download className="h-5 w-5" />
                    Get on Play Store
                  </Button>
                </div>
              </div>

              {/* Right Content - 3 Phones */}
              <div className="flex justify-center lg:justify-end">
                <StaticPhoneShowcase
                  screens={[
                    {
                      title: "Browse Venues",
                      description: "Discover sports facilities",
                      screenshot: "/app-screenshots/Venue.png"
                    },
                    {
                      title: "Quick Booking",
                      description: "Book in seconds",
                      screenshot: "/app-screenshots/Book.png"
                    },
                    {
                      title: "Confirmed",
                      description: "Get instant confirmation",
                      screenshot: "/app-screenshots/home.png"
                    }
                  ]}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: Venue Detail - Phones Right */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left Content */}
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                  <Search className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold text-primary">Explore Venues</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                  Discover Every
                  <br />
                  <span className="text-primary">Venue Detail</span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  Browse detailed venue information in one place. See stunning photos, check available sports, compare pricing, view location on the map, and read authentic reviews - all before you book.
                </p>

                {/* Key Features */}
                <div className="space-y-4 pt-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Complete Venue Info</h4>
                      <p className="text-muted-foreground">Photos, amenities, sports offered, and location details all in one view</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Star className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Transparent Pricing</h4>
                      <p className="text-muted-foreground">See pricing for all sports and time slots before booking</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Real Reviews</h4>
                      <p className="text-muted-foreground">Read verified reviews from real players who've been there</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Content - 3 Phones */}
              <div className="flex justify-center">
                <StaticPhoneShowcase
                  screens={[
                    {
                      title: "Venue Overview",
                      description: "Main photos and about section",
                      screenshot: "/app-screenshots/Venue.png"
                    },
                    {
                      title: "Sports & Pricing",
                      description: "Available sports and pricing cards",
                      screenshot: "/app-screenshots/Book.png"
                    },
                    {
                      title: "Reviews",
                      description: "User ratings and reviews",
                      screenshot: "/app-screenshots/home.png"
                    }
                  ]}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Booking Flow - Phones Left */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left Content - 3 Phones */}
              <div className="flex justify-center order-2 lg:order-1">
                <StaticPhoneShowcase
                  screens={[
                    {
                      title: "Select Time",
                      description: "Choose your preferred time slot",
                      screenshot: "/app-screenshots/home.png"
                    },
                    {
                      title: "Booking Details",
                      description: "Enter your details and payment",
                      screenshot: "/app-screenshots/Book.png"
                    },
                    {
                      title: "Confirmed",
                      description: "Get instant confirmation with QR code",
                      screenshot: "/app-screenshots/Venue.png"
                    }
                  ]}
                />
              </div>

              {/* Right Content */}
              <div className="space-y-6 order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20">
                  <Zap className="h-4 w-4 text-accent" />
                  <span className="text-sm font-semibold text-accent">Quick Booking</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                  Book in Three
                  <br />
                  <span className="text-accent">Simple Steps</span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  Our streamlined booking process takes just 30 seconds. Select your time slot, enter your details, pay securely, and you're done. No phone calls, no waiting for confirmations.
                </p>

                {/* Key Features */}
                <div className="space-y-4 pt-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Calendar className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Instant Confirmation</h4>
                      <p className="text-muted-foreground">Receive immediate booking confirmation with QR code ticket</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <CreditCard className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Secure Payment</h4>
                      <p className="text-muted-foreground">Multiple payment options with bank-level security</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Easy Modifications</h4>
                      <p className="text-muted-foreground">Reschedule or cancel bookings hassle-free anytime</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Recurring Bookings - Phones Right */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left Content */}
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
                  <Repeat className="h-4 w-4 text-purple-600" />
                  <span className="text-sm font-semibold text-purple-600">Smart Scheduling</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                  Set It Once,
                  <br />
                  <span className="text-purple-600">Play Every Week</span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  Never worry about rebooking your regular games. Set up recurring bookings for weekly sessions and we'll automatically reserve your favorite time slot. Perfect for consistent training schedules.
                </p>

                {/* Key Features */}
                <div className="space-y-4 pt-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                      <Repeat className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Auto-Booking</h4>
                      <p className="text-muted-foreground">Automatically books your preferred time slot every week</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                      <Calendar className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Flexible Control</h4>
                      <p className="text-muted-foreground">Pause, skip, or cancel any individual session anytime</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Priority Access</h4>
                      <p className="text-muted-foreground">Get guaranteed slots even during peak hours</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Content - 3 Phones */}
              <div className="flex justify-center">
                <StaticPhoneShowcase
                  screens={[
                    {
                      title: "Setup Recurring",
                      description: "Choose frequency and duration",
                      screenshot: "https://placehold.co/400x800/a855f7/white?text=Recurring+Setup"
                    },
                    {
                      title: "Schedule View",
                      description: "See all upcoming sessions",
                      screenshot: "https://placehold.co/400x800/a855f7/white?text=Schedule+Calendar"
                    },
                    {
                      title: "Manage Bookings",
                      description: "Control all recurring bookings",
                      screenshot: "https://placehold.co/400x800/a855f7/white?text=Active+Recurring"
                    }
                  ]}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Membership - Phones Left */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left Content - 3 Phones */}
              <div className="flex justify-center order-2 lg:order-1">
                <StaticPhoneShowcase
                  screens={[
                    {
                      title: "Membership Plans",
                      description: "Choose your tier",
                      screenshot: "https://placehold.co/400x800/10b981/white?text=Membership+Tiers"
                    },
                    {
                      title: "Benefits",
                      description: "Exclusive perks and discounts",
                      screenshot: "https://placehold.co/400x800/10b981/white?text=Member+Benefits"
                    },
                    {
                      title: "Member Dashboard",
                      description: "Track usage and rewards",
                      screenshot: "https://placehold.co/400x800/10b981/white?text=Active+Membership"
                    }
                  ]}
                />
              </div>

              {/* Right Content */}
              <div className="space-y-6 order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                  <Star className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-semibold text-green-600">Premium Access</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                  Unlock Exclusive
                  <br />
                  <span className="text-green-600">Member Benefits</span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  Join our membership program and enjoy special perks. Get priority booking, exclusive discounts, free guest passes, and access to members-only events at premium venues across Abuja.
                </p>

                {/* Key Features */}
                <div className="space-y-4 pt-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                      <Star className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">VIP Priority Booking</h4>
                      <p className="text-muted-foreground">Book prime time slots before they're available to others</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                      <CreditCard className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Special Discounts</h4>
                      <p className="text-muted-foreground">Save up to 25% on all bookings across partner venues</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Free Guest Passes</h4>
                      <p className="text-muted-foreground">Bring friends for free with monthly guest pass credits</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Thousands</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Join the growing community of sports enthusiasts using Spotts
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center p-6 rounded-2xl bg-white border border-border">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">500+</div>
                <p className="text-muted-foreground">Sports Facilities</p>
              </div>
              <div className="text-center p-6 rounded-2xl bg-white border border-border">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">50K+</div>
                <p className="text-muted-foreground">Active Users</p>
              </div>
              <div className="text-center p-6 rounded-2xl bg-white border border-border">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">4.8★</div>
                <p className="text-muted-foreground">App Rating</p>
              </div>
              <div className="text-center p-6 rounded-2xl bg-white border border-border">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">100K+</div>
                <p className="text-muted-foreground">Bookings Made</p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 md:py-20 bg-primary text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-6">
                <Download className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold">Ready to Get Started?</h2>
              <p className="text-xl text-white/90">
                Download Spotts today and experience the easiest way to book sports facilities in Abuja. Free to download, no subscription required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-full px-8 gap-2">
                  <Download className="h-5 w-5" />
                  Download on App Store
                </Button>
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-full px-8 gap-2">
                  <Download className="h-5 w-5" />
                  Get it on Play Store
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default MobileApp;
