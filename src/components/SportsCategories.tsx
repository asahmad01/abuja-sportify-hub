const categories = [
  "BADMINTON",
  "BOX CRICKET",
  "PADEL",
  "FOOTBALL",
  "PICKLEBALL",
  "TENNIS",
  "BASKETBALL",
  "VOLLEYBALL",
  "TABLE TENNIS",
  "SQUASH",
  "SWIMMING",
  "GOLF",
  "CRICKET",
  "HOCKEY",
  "RUGBY",
];

const SportsCategories = () => {
  // Duplicate categories for seamless infinite scroll
  const duplicatedCategories = [...categories, ...categories];

  return (
    <section className="dark-section py-6 border-t border-white/10 overflow-hidden">
      <div className="relative">
        <div className="flex animate-scroll hover:[animation-play-state:paused]">
          {duplicatedCategories.map((category, index) => (
            <div
              key={index}
              className="flex items-center gap-3 group cursor-pointer whitespace-nowrap mx-6 md:mx-8"
            >
              <div className="w-2 h-2 rounded-full bg-accent group-hover:scale-125 transition-transform flex-shrink-0"></div>
              <span className="text-white font-semibold text-sm md:text-base tracking-wide group-hover:text-accent transition-colors">
                {category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SportsCategories;
