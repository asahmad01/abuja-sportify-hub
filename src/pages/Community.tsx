import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Users, Trophy, Calendar, Heart } from "lucide-react";

const Community = () => {
  const stats = [
    { icon: Users, value: "5,000+", label: "Active Members" },
    { icon: Trophy, value: "100+", label: "Sports Events" },
    { icon: Calendar, value: "10,000+", label: "Bookings Made" },
    { icon: Heart, value: "50+", label: "Partner Facilities" },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Join the <span className="gradient-text">Spotts Community</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect with fellow fitness enthusiasts, join group activities, and be part of Abuja's growing sports community.
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center space-y-3">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center">
                    <stat.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Community;
