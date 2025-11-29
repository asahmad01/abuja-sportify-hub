import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Lanyard from "@/components/Lanyard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Trophy, Calendar, Users, Zap } from "lucide-react";

const VipAccess = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        {/* Hero Section with Lanyard */}
        <section className="relative py-10 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Get <span className="gradient-text">VIP Access</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
                Grab your exclusive early access pass! Drag it around and be part of something special.
              </p>
            </div>
          </div>

          {/* Interactive Lanyard Card */}
          <div className="w-full" style={{ height: '70vh', minHeight: '500px' }}>
            <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Join Our <span className="gradient-text">VIP List</span>?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Be among the first to experience the future of sports booking in Abuja
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <div className="bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Trophy className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Early Access</h3>
                <p className="text-muted-foreground">
                  Get the app before anyone else and enjoy exclusive features
                </p>
              </div>

              <div className="bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Premium Perks</h3>
                <p className="text-muted-foreground">
                  Unlock special discounts and priority booking for life
                </p>
              </div>

              <div className="bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">First Dibs</h3>
                <p className="text-muted-foreground">
                  Book your favorite venues and times before public launch
                </p>
              </div>

              <div className="bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">VIP Community</h3>
                <p className="text-muted-foreground">
                  Join an exclusive group of sports enthusiasts in Abuja
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Join the <span className="gradient-text">Elite</span>?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Secure your spot now and be part of Abuja's sports revolution.
                Limited VIP passes available!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="lg" asChild>
                  <Link to="/register">Get VIP Access Now</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/about">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default VipAccess;
