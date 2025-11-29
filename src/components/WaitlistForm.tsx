import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Sparkles } from "lucide-react";

const WaitlistForm = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    sport: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("YOUR_FORMSPREE_ENDPOINT_HERE", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          formType: "Waitlist",
        }),
      });

      if (response.ok) {
        toast({
          title: "Success!",
          description: "You've been added to the waitlist. We'll be in touch soon!",
        });
        setFormData({ name: "", email: "", phone: "", sport: "" });
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
    <section className="py-20 md:py-32 bg-gradient-to-br from-primary/5 via-accent/5 to-purple-500/5 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-48 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -left-48 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Early Access</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              <span className="italic">Join the</span> Waitlist
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Be the first to know when we launch. Get early access to exclusive features and special offers!
            </p>
          </div>

          {/* Form Container */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            <div className="p-8 md:p-12">
              <form onSubmit={handleSubmit}>
                {/* Two Column Grid for larger screens */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-semibold text-gray-700">
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      className="h-12 border-gray-200 focus:border-primary focus:ring-primary rounded-xl"
                    />
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-semibold text-gray-700">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      className="h-12 border-gray-200 focus:border-primary focus:ring-primary rounded-xl"
                    />
                  </div>

                  {/* Phone Field */}
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-semibold text-gray-700">
                      Phone Number <span className="text-gray-400 font-normal">(Optional)</span>
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+234 800 000 0000"
                      className="h-12 border-gray-200 focus:border-primary focus:ring-primary rounded-xl"
                    />
                  </div>

                  {/* Sport Selection */}
                  <div className="space-y-2">
                    <label htmlFor="sport" className="text-sm font-semibold text-gray-700">
                      Favorite Sport
                    </label>
                    <Select value={formData.sport} onValueChange={(value) => setFormData({ ...formData, sport: value })}>
                      <SelectTrigger className="h-12 border-gray-200 focus:border-primary focus:ring-primary rounded-xl">
                        <SelectValue placeholder="Select a sport" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="football">Football</SelectItem>
                        <SelectItem value="basketball">Basketball</SelectItem>
                        <SelectItem value="tennis">Tennis</SelectItem>
                        <SelectItem value="badminton">Badminton</SelectItem>
                        <SelectItem value="swimming">Swimming</SelectItem>
                        <SelectItem value="volleyball">Volleyball</SelectItem>
                        <SelectItem value="squash">Squash</SelectItem>
                        <SelectItem value="table-tennis">Table Tennis</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex flex-col sm:flex-row gap-4 items-center mt-8">
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-12 gap-2 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all"
                    disabled={loading}
                  >
                    {loading ? "Joining..." : "Join Waitlist"}
                    <ArrowRight className="h-5 w-5" />
                  </Button>

                  <p className="text-sm text-gray-500 text-center sm:text-left">
                    Join <span className="font-semibold text-primary">1,000+</span> people already on the list
                  </p>
                </div>

                {/* Trust Indicators */}
                <div className="mt-8 pt-8 border-t border-gray-100">
                  <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-center">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">1,000+</div>
                      <div className="text-sm text-gray-600">On Waitlist</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">500+</div>
                      <div className="text-sm text-gray-600">Venues Ready</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">8+</div>
                      <div className="text-sm text-gray-600">Sports Available</div>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* Bottom Accent Bar */}
            <div className="h-2 bg-gradient-to-r from-primary via-accent to-purple-500"></div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              No spam, ever. We'll only send you updates about our launch.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WaitlistForm;
