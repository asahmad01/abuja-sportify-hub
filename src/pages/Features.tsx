import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FeaturesSection from "@/components/FeaturesSection";

const Features = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        <FeaturesSection />
        
        {/* Additional Features Content */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold">
                Everything You Need in One App
              </h2>
              <p className="text-lg text-muted-foreground">
                From booking facilities to tracking your fitness progress, Spotts provides all the tools you need to achieve your fitness goals in Abuja.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Features;
