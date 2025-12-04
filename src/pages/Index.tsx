import Navigation from "@/components/Navigation";
import CircularGallery from "@/components/CircularGallery";
import AppShowcase from "@/components/AppShowcase";
import PlayersBenefits from "@/components/PlayersBenefits";
import VendorBenefits from "@/components/VendorBenefits";
import FeaturesSection from "@/components/FeaturesSection";
import DownloadSection from "@/components/DownloadSection";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const scrollToWaitlist = () => {
    const waitlistSection = document.getElementById('waitlist-section');
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        {/* 0. Simple Landing Section */}
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/hero-sports.jpg')"
            }}
          >
            <div className="absolute inset-0 bg-black/40"></div>
          </div>

          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white">
                  <span className="italic">Game On</span>
                  <br />
                  <span className="italic">Anytime</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-300 max-w-2xl">
                  Book sports facilities instantly. From football fields to tennis courts, find and reserve your perfect venue in seconds. Launching soon in Abuja.
                </p>
              </div>

              <div className="mt-8 flex flex-row flex-wrap gap-3 items-start">
                <Button
                  size="default"
                  className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 gap-2"
                  onClick={scrollToWaitlist}
                >
                  Join Waitlist
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  size="default"
                  className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:border-white/30 rounded-full px-6 transition-all"
                  onClick={scrollToWaitlist}
                >
                  List Your Venue
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* 1. App Showcase - Visual demo with phones */}
        <div id="mobile-app">
          <AppShowcase />
        </div>

        {/* 4. Player Benefits - Why use the app */}
        <PlayersBenefits />

        {/* 5. Vendor Benefits - Drive vendor signups */}
        <div id="vendor-benefits">
          <VendorBenefits />
        </div>

        {/* 6. Features - Additional trust builders */}
        <div id="features">
          <FeaturesSection />
        </div>

        {/* 7. Animated Category Gallery - 3D Cards */}
        <section id="sports" className="py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4 mb-12">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Explore Our <span className="text-primary italic">Sports</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                <span className="hidden md:inline">Swipe or drag to browse through all available sports categories</span>
                <span className="md:hidden">Browse through all available sports categories</span>
              </p>
            </div>
          </div>
          {/* Desktop: 3D Circular Gallery */}
          <div className="hidden md:block" style={{ height: '600px', position: 'relative' }}>
            <CircularGallery
              bend={3}
              textColor="#ffffff"
              borderRadius={0.05}
              scrollEase={0.02}
            />
          </div>
          {/* Mobile: Simple Responsive Grid */}
          <div className="md:hidden container mx-auto px-4">
            <div className="grid grid-cols-2 gap-4">
              {[
                { image: '/carousel-pics/basketball.jpeg', text: 'Basketball' },
                { image: '/carousel-pics/Tennis.jpeg', text: 'Tennis' },
                { image: '/carousel-pics/Badminton.jpeg', text: 'Badminton' },
                { image: '/carousel-pics/swimming.jpeg', text: 'Swimming' },
                { image: '/carousel-pics/paddle.jpeg', text: 'Paddle' },
                { image: '/carousel-pics/Squash - The Sport.jpeg', text: 'Squash' },
                { image: '/carousel-pics/table tennis.jpeg', text: 'Table Tennis' },
                { image: '/carousel-pics/gym.jpeg', text: 'Gym' },
                { image: '/carousel-pics/boxing.jpeg', text: 'Boxing' },
                { image: '/carousel-pics/run.jpeg', text: 'Running' },
                { image: '/carousel-pics/cyclin.jpg', text: 'Cycling' },
                { image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80', text: 'Football' }
              ].map((sport, index) => (
                <div key={index} className="relative rounded-xl overflow-hidden aspect-[3/4] group">
                  <img
                    src={sport.image}
                    alt={sport.text}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-bold text-lg">{sport.text}</h3>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-muted-foreground mt-8 text-lg">
              ...and many more sports!
            </p>
          </div>
        </section>

        {/* 8. Download Section - Waitlist */}
        <DownloadSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
