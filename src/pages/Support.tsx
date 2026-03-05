import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";
import ShootingStars from "@/components/ShootingStars";

// TODO: Replace with your Formspree endpoint (e.g. "https://formspree.io/f/xxxxx")
const FORMSPREE_ENDPOINT = "";

const Support = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (FORMSPREE_ENDPOINT) {
        const response = await fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            formType: "Support Query",
          }),
        });

        if (!response.ok) throw new Error("Failed to submit");
      }

      // Simulate a short delay for UX
      await new Promise((resolve) => setTimeout(resolve, 800));

      toast({
        title: "Message Received!",
        description:
          "We've received your support request. Our support team will contact you via email shortly.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
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
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="pt-12 pb-6 md:pt-16 md:pb-8 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold">
                How Can We <span className="gradient-text">Help?</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Have a question or running into an issue? Drop us a message and
                our team will get back to you as soon as possible.
              </p>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="pt-0 pb-16 md:pb-24 overflow-hidden bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-[48px] bg-black overflow-hidden">
              <ShootingStars />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-blue-600/50 rounded-full blur-[100px] pointer-events-none z-0"></div>
              <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-blue-600/5 via-transparent to-transparent pointer-events-none z-0"></div>

              <div className="relative z-10 p-8 md:p-16">
                <div className="max-w-2xl mx-auto">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-white">
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          placeholder="Your full name"
                          className="h-12 bg-white/10 border-white/20 placeholder:text-white/50 text-white rounded-xl focus:bg-white/15 focus:border-white/40"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-white">
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          placeholder="you@example.com"
                          className="h-12 bg-white/10 border-white/20 placeholder:text-white/50 text-white rounded-xl focus:bg-white/15 focus:border-white/40"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-white">
                        Subject
                      </Label>
                      <Select
                        required
                        value={formData.subject}
                        onValueChange={(value) =>
                          setFormData({ ...formData, subject: value })
                        }
                      >
                        <SelectTrigger className="h-12 bg-white/10 border-white/20 text-white rounded-xl focus:bg-white/15 focus:border-white/40 [&>span]:text-white/50 [&[data-state=open]>span]:text-white data-[state=closed]:text-white/50">
                          <SelectValue placeholder="Select a topic" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Booking Issue">
                            Booking Issue
                          </SelectItem>
                          <SelectItem value="Payment Issue">
                            Payment Issue
                          </SelectItem>
                          <SelectItem value="Venue Issue">
                            Venue Issue
                          </SelectItem>
                          <SelectItem value="Account Issue">
                            Account Issue
                          </SelectItem>
                          <SelectItem value="Feature Request">
                            Feature Request
                          </SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-white">
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        required
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        placeholder="Describe your issue or question in detail..."
                        rows={6}
                        className="bg-white/10 border-white/20 placeholder:text-white/50 text-white rounded-xl focus:bg-white/15 focus:border-white/40 resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full h-12 bg-white text-primary hover:bg-white/90 rounded-xl font-semibold gap-2 shadow-lg"
                    >
                      {loading ? "Sending..." : "Send Message"}
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>

                  {/* Alternative Contact */}
                  <div className="mt-12 p-8 bg-white/10 backdrop-blur-sm rounded-lg text-center border border-white/20">
                    <h3 className="text-xl font-bold text-white mb-3">
                      Prefer to reach out directly?
                    </h3>
                    <p className="text-white/70 mb-4">
                      You can also contact us through these channels.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                      <a
                        href="mailto:info@spottsapp.com"
                        className="text-blue-400 hover:text-blue-300 hover:underline font-medium"
                      >
                        info@spottsapp.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Support;
