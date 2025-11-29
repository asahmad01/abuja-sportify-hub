import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  const scrollToWaitlist = () => {
    const waitlistSection = document.getElementById('waitlist-section');
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-24 pb-40 md:pt-32 md:pb-48 lg:pb-56 dark-section overflow-hidden min-h-[600px] md:min-h-[700px]">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=2070')",
          backgroundPosition: "center bottom"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/35"></div>
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
              Book sports facilities across Abuja instantly. From football fields to tennis courts, find and reserve your perfect venue in seconds. Play when you want, where you want.
            </p>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              onClick={scrollToWaitlist}
              className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 gap-2"
            >
              Join Waitlist
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={scrollToWaitlist}
              className="border-white text-white hover:bg-white hover:text-black rounded-full px-8"
            >
              List Your Venue
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
