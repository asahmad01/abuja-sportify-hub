import { Search, Calendar, CheckCircle } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: "Find Your Venue",
      description: "Browse hundreds of sports facilities across Abuja. Filter by location, sport, and availability."
    },
    {
      icon: Calendar,
      title: "Book Your Slot",
      description: "Select your preferred date and time. See real-time availability and instant pricing."
    },
    {
      icon: CheckCircle,
      title: "Play Your Game",
      description: "Get instant confirmation with QR code. Show up and play. It's that simple."
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            How It <span className="text-primary italic">Works</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Book your next game in three simple steps. No phone calls, no waiting for confirmations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative text-center">
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-xl font-bold text-primary">{index + 1}</span>
                </div>

                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 mt-8">
                  <Icon className="h-8 w-8 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>

                {/* Connector Arrow (not on last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/3 -right-6 lg:-right-10 w-12 lg:w-20 h-0.5 bg-primary/20">
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-8 border-l-primary/20 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
