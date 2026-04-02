import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Target, Eye, Award } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold">
                About <span className="gradient-text">Spotts</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Revolutionizing how people in Abuja access sports facilities and fitness centers through innovative technology.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Target className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Our Mission</h3>
                <p className="text-muted-foreground">
                  To make sports and fitness accessible to everyone in Abuja by connecting users with the best facilities through seamless booking experiences.
                </p>
              </div>

              <div className="space-y-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Eye className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Our Vision</h3>
                <p className="text-muted-foreground">
                  To become Africa's leading sports and fitness booking platform, promoting healthy lifestyles and building vibrant communities.
                </p>
              </div>

              <div className="space-y-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Award className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Our Values</h3>
                <p className="text-muted-foreground">
                  Innovation, accessibility, community, and excellence drive everything we do to serve our users and partners better.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
