const benefits = [
  {
    number: 1,
    title: "Easy Bookings & Cancellations",
    description: "Book or cancel your sessions instantly without making phone calls. Manage everything from your phone with just a few taps.",
  },
  {
    number: 2,
    title: "Hassle-free Refunds",
    description: "Cancel your booking and get automatic refunds directly to your account. No paperwork, no waiting.",
  },
  {
    number: 3,
    title: "Recurring Sessions",
    description: "Set up recurring bookings for your regular training sessions. Book once, play every week automatically.",
  },
  {
    number: 4,
    title: "Membership Management",
    description: "Manage your facility memberships all in one place. Track benefits, renewals, and exclusive member perks.",
  },
];

const PlayersBenefits = () => {
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

          <div className="relative z-10 p-8 md:p-16">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-4">
                <span className="text-sm font-semibold text-white">Benefits</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Players</span> Benefits
              </h2>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {benefits.map((benefit) => (
                <div
                  key={benefit.number}
                  className="bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center text-white text-2xl font-bold">
                      {benefit.number}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
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

export default PlayersBenefits;
