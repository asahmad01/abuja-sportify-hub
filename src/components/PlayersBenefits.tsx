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
    title: "Exclusive Member Benefits",
    description: "Access special discounts, priority bookings, and member-only perks at your favorite sports venues.",
  },
];

const PlayersBenefits = () => {
  return (
    <section className="py-20 md:py-28 overflow-hidden bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[48px] bg-black overflow-hidden">
          {/* Blue Glow Effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-blue-600/50 rounded-full blur-[100px] pointer-events-none"></div>

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
    </section>
  );
};

export default PlayersBenefits;
