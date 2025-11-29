import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const FindYourGame = () => {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 italic leading-tight">
              Find Your Game
              <br />
              Anytime
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 gap-2">
              Learn More
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Right Content - Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=2070"
                alt="Football player"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-accent rounded-full flex items-center justify-center shadow-lg">
              <ArrowRight className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FindYourGame;
