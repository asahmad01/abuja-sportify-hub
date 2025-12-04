import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Apple, Play as GooglePlay, ArrowRight } from "lucide-react";

const DownloadSection = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [userType, setUserType] = useState<"individual" | "venue">("individual");
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
          userType: userType,
          formType: userType === "individual" ? "Individual Waitlist" : "Venue Waitlist",
        }),
      });

      if (response.ok) {
        toast({
          title: "Success!",
          description: "You've been added to the waitlist. We'll be in touch soon!",
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
    <section id="waitlist-section" className="py-20 md:py-28 overflow-hidden bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[48px] bg-black overflow-hidden">
          {/* Blue Glow Effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-blue-600/50 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-8 md:p-16 z-10">
            {/* Left Content */}
            <div className="space-y-6 text-white">
              <div className="inline-block px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-2">
                <span className="text-sm font-semibold">Coming Soon</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Be <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">First to Play</span>
              </h2>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-xl">
                Join our waitlist and get early access when we launch in Abuja. Be among the first to experience the easiest way to book sports facilities.
              </p>

              {/* Coming to App Stores badge */}
              <div className="flex items-center gap-4 pt-4 opacity-90">
                <div className="flex items-center gap-2">
                  <Apple className="h-5 w-5" />
                  <span className="text-sm">iOS</span>
                </div>
                <div className="flex items-center gap-2">
                  <GooglePlay className="h-5 w-5" />
                  <span className="text-sm">Android</span>
                </div>
              </div>

            </div>

            {/* Right Content - Inline Waitlist Form */}
            <div className="relative">
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-6">Join the Waitlist</h3>

                {/* User Type Toggle */}
                <div className="flex gap-3 mb-6 bg-white/10 p-1.5 rounded-xl backdrop-blur-sm">
                  <button
                    type="button"
                    onClick={() => setUserType("individual")}
                    className={`flex-1 py-2.5 px-4 rounded-lg font-semibold transition-all text-sm ${
                      userType === "individual"
                        ? "bg-white text-primary shadow-lg"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    Individual
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserType("venue")}
                    className={`flex-1 py-2.5 px-4 rounded-lg font-semibold transition-all text-sm ${
                      userType === "venue"
                        ? "bg-white text-primary shadow-lg"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    Venue Owner
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name Field - Dynamic Label */}
                  <div>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={userType === "individual" ? "Full Name" : "Venue Name"}
                      className="h-12 bg-white/20 border-white/20 placeholder:text-white/60 text-white rounded-xl focus:bg-white/30 focus:border-white/40"
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={userType === "individual" ? "Email Address" : "Business Email"}
                      className="h-12 bg-white/20 border-white/20 placeholder:text-white/60 text-white rounded-xl focus:bg-white/30 focus:border-white/40"
                    />
                  </div>

                  {/* Phone Field */}
                  <div>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder={userType === "individual" ? "Phone Number (Optional)" : "Contact Number"}
                      className="h-12 bg-white/20 border-white/20 placeholder:text-white/60 text-white rounded-xl focus:bg-white/30 focus:border-white/40"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full h-12 bg-white text-primary hover:bg-white/90 rounded-xl font-semibold gap-2 shadow-lg"
                    disabled={loading}
                  >
                    {loading ? "Joining..." : "Join Waitlist"}
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
