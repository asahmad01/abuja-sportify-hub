import { MapPin, Smartphone, TrendingUp, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: MapPin,
    title: "Easy Facility Booking",
    description:
      "Browse and book sports facilities, gyms, and courts in seconds. Real-time availability and instant confirmation.",
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    icon: Smartphone,
    title: "Mobile Booking",
    description:
      "Book on the go with our mobile app. Get instant notifications, manage your bookings, and discover new venues near you.",
    color: "bg-purple-500/10 text-purple-500",
  },
  {
    icon: TrendingUp,
    title: "Revenue Analytics",
    description:
      "Track your earnings, growth trends, and financial performance. Make data-driven decisions to maximize your facility's revenue.",
    color: "bg-green-500/10 text-green-500",
  },
  {
    icon: FileText,
    title: "Booking Management",
    description:
      "Manage all your venue bookings in one place. Real-time updates, automated scheduling, and seamless customer communication.",
    color: "bg-orange-500/10 text-orange-500",
  },
];

const FeaturesSection = () => {
  const scrollToWaitlist = () => {
    const waitlistSection = document.getElementById('waitlist-section');
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 md:py-28 overflow-hidden bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[48px] bg-black overflow-hidden">
          {/* Blue Glow Effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-blue-600/50 rounded-full blur-[100px] pointer-events-none"></div>

          {/* Animated Shooting Stars SVG */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-100"
            viewBox="0 0 1200 450"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            {/* Left to right lines */}
            <path
              className="animate-flow-left-to-right"
              d="M -50 80 Q 200 100 400 90 Q 600 80 800 120 Q 1000 160 1250 140"
              stroke="rgba(255, 255, 255, 0.15)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="800"
              strokeDashoffset="800"
              style={{ animationDelay: '0s' }}
            />
            <path
              className="animate-flow-left-to-right"
              d="M -100 200 Q 150 220 350 180 Q 550 140 750 190 Q 950 240 1250 210"
              stroke="rgba(255, 255, 255, 0.12)"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="800"
              strokeDashoffset="800"
              style={{ animationDelay: '1.5s' }}
            />

            {/* Right to left lines */}
            <path
              className="animate-flow-right-to-left"
              d="M 1250 150 Q 1000 170 800 160 Q 600 150 400 200 Q 200 250 -50 230"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="800"
              strokeDashoffset="0"
              style={{ animationDelay: '0.5s' }}
            />
            <path
              className="animate-flow-right-to-left"
              d="M 1300 320 Q 1050 300 850 340 Q 650 380 450 350 Q 250 320 -100 360"
              stroke="rgba(255, 255, 255, 0.13)"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="800"
              strokeDashoffset="0"
              style={{ animationDelay: '2.5s' }}
            />

            {/* Diagonal lines */}
            <path
              className="animate-flow-diagonal"
              d="M 300 -50 Q 400 100 500 200 Q 600 300 700 450"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="600"
              strokeDashoffset="600"
              style={{ animationDelay: '1s' }}
            />
            <path
              className="animate-flow-diagonal"
              d="M 800 -50 Q 750 120 700 240 Q 650 360 550 500"
              stroke="rgba(255, 255, 255, 0.09)"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="600"
              strokeDashoffset="600"
              style={{ animationDelay: '3s' }}
            />

            {/* Bottom wavy line */}
            <path
              className="animate-flow-left-to-right"
              d="M -50 380 Q 300 360 600 390 Q 900 420 1250 400"
              stroke="rgba(255, 255, 255, 0.11)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="800"
              strokeDashoffset="800"
              style={{ animationDelay: '2s' }}
            />
          </svg>

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-16 items-center p-8 md:p-16 z-10">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 rounded-md bg-white/5 border border-white/10">
                <span className="text-sm font-semibold uppercase tracking-wider text-white">
                  Features
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Best Features We <br />
                <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Offer For You</span>
              </h2>

              <p className="text-lg text-white/80 leading-relaxed">
                Spotts offers a feature-rich and user-friendly booking experience tailored for sports enthusiasts and fitness lovers.
              </p>

              <Button
                variant="default"
                size="lg"
                className="mt-4 bg-white text-primary hover:bg-white/90"
                onClick={scrollToWaitlist}
              >
                Learn More
              </Button>
            </div>

            {/* Right Content - Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-4`}>
                    <feature.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Left to Right animation */
        @keyframes flowLeftToRight {
          0% {
            stroke-dashoffset: 800;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            stroke-dashoffset: 0;
            opacity: 0;
          }
        }

        /* Right to Left animation */
        @keyframes flowRightToLeft {
          0% {
            stroke-dashoffset: -800;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            stroke-dashoffset: 0;
            opacity: 0;
          }
        }

        /* Diagonal animation */
        @keyframes flowDiagonal {
          0% {
            stroke-dashoffset: 600;
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          85% {
            opacity: 1;
          }
          100% {
            stroke-dashoffset: 0;
            opacity: 0;
          }
        }

        .animate-flow-left-to-right {
          animation: flowLeftToRight 5s ease-in-out infinite;
        }

        .animate-flow-right-to-left {
          animation: flowRightToLeft 5.5s ease-in-out infinite;
        }

        .animate-flow-diagonal {
          animation: flowDiagonal 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default FeaturesSection;
