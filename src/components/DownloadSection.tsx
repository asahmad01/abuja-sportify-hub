import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Apple, Play as GooglePlay, ArrowRight } from "lucide-react";

const DownloadSection = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://formspree.io/f/xwpdgldl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userType: "venue",
          formType: "Venue Partner Enquiry",
        }),
      });

      if (response.ok) {
        toast({
          title: "Got it!",
          description: "We'll be in touch shortly to get your venue listed on Spotts.",
        });
        setFormData({ name: "", email: "", phone: "" });
      } else {
        throw new Error("Failed to submit");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="download-section" className="py-20 md:py-28 overflow-hidden bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[48px] bg-black overflow-hidden">
          {/* Blue Glow Effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-blue-600/50 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-8 md:p-16 z-10">
            {/* Left Content - Download */}
            <div className="space-y-6 text-white">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/20">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                <span className="text-sm font-semibold">Available on iOS & Android</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Download &{" "}
                <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  Start Playing
                </span>
              </h2>

              <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-xl">
                Spotts is live in Abuja. Book football fields, tennis courts, basketball courts, gyms and more — all in seconds, right from your phone.
              </p>

              {/* App Store Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                {/* iOS */}
                <a
                  href="https://apps.apple.com/app/6758109546"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-white text-black px-5 py-3.5 rounded-2xl hover:bg-white/90 transition-all group w-fit"
                >
                  <Apple className="h-7 w-7 shrink-0" />
                  <div className="text-left">
                    <div className="text-xs text-black/60 leading-none mb-0.5">Download on the</div>
                    <div className="text-base font-bold leading-none">App Store</div>
                  </div>
                </a>

                {/* Android */}
                <a
                  href="https://play.google.com/store/apps/details?id=com.bleumeridiantech.spotts"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-white text-black px-5 py-3.5 rounded-2xl hover:bg-white/90 transition-all group w-fit"
                >
                  <GooglePlay className="h-7 w-7 shrink-0" />
                  <div className="text-left">
                    <div className="text-xs text-black/60 leading-none mb-0.5">Get it on</div>
                    <div className="text-base font-bold leading-none">Google Play</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Right Content - Venue Owner Form */}
            <div className="relative">
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-2">Own a Sports Venue?</h3>
                <p className="text-white/60 text-sm mb-6">Get listed on Spotts and start receiving bookings from players across Abuja.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Venue Name"
                    className="h-12 bg-white/20 border-white/20 placeholder:text-white/60 text-white rounded-xl focus:bg-white/30 focus:border-white/40"
                  />
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Business Email"
                    className="h-12 bg-white/20 border-white/20 placeholder:text-white/60 text-white rounded-xl focus:bg-white/30 focus:border-white/40"
                  />
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9+\-() ]/g, '');
                      setFormData({ ...formData, phone: value });
                    }}
                    placeholder="Contact Number"
                    className="h-12 bg-white/20 border-white/20 placeholder:text-white/60 text-white rounded-xl focus:bg-white/30 focus:border-white/40"
                  />
                  <Button
                    type="submit"
                    className="w-full h-12 bg-white text-primary hover:bg-white/90 rounded-xl font-semibold gap-2 shadow-lg"
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "List My Venue"}
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadSection;
