import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import VenueOnboardingForm from "@/components/VenueOnboardingForm";

const VenueOnboarding = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 pt-28 md:pt-32 pb-12 md:pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">SPOTTS Venue Onboarding Form</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Welcome to SPOTTS! Please fill in what applies to your venue.
            </p>
          </div>
          <VenueOnboardingForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VenueOnboarding;
