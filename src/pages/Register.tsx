import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

const Register = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Thanks for joining! We'll notify you when we launch.");
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Join the <span className="gradient-text">Waitlist</span>
                </h1>
                <p className="text-lg text-muted-foreground">
                  Be the first to know when Spotts launches in Abuja!
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" variant="hero" size="lg" className="w-full">
                  Join Waitlist
                </Button>
              </form>

              <p className="text-center text-sm text-muted-foreground mt-6">
                We'll never share your email with anyone else.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
