import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

const JoinSection = () => {
  const scrollToWaitlist = () => {
    const waitlistSection = document.getElementById('waitlist-section');
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="join-section" className="py-20 md:py-28 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              <span className="italic">Ready to</span> Get Started?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join our waitlist and be among the first to experience the easiest way to book sports facilities in Abuja.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={scrollToWaitlist}
              className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 gap-2 shadow-lg shadow-primary/25"
            >
              Join Waitlist Now
              <ArrowRight className="h-5 w-5" />
            </Button>

            <p className="text-sm text-gray-600">
              Join <span className="font-bold text-primary">1,000+</span> people already on the list
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinSection;
