import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CircularGallery from "@/components/CircularGallery";

const Categories = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Our <span className="gradient-text">Categories</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Explore our diverse range of sports and activities. Swipe or drag to browse through all available categories.
              </p>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-10">
          <div style={{ height: '600px', position: 'relative' }}>
            <CircularGallery
              bend={3}
              textColor="#ffffff"
              borderRadius={0.05}
              scrollEase={0.02}
            />
          </div>
        </section>

        {/* Info Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Find Your Perfect Sport</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Whether you're into team sports, individual activities, or looking to try something new,
                we have a category for everyone. Join our vibrant community and start your sports journey today.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Categories;
