import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Logo from "@/components/Logo";

const Footer = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [email, setEmail] = useState("");

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
          email: email,
          formType: "Footer Waitlist",
        }),
      });

      if (response.ok) {
        toast({
          title: "Success!",
          description: "You've been added to the waitlist!",
        });
        setEmail("");
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
    <footer className="relative bg-black overflow-hidden">
      {/* Blue Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-600/30 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-12 mb-12">
          {/* Left Side - Brand & Form */}
          <div>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center mb-4 group w-fit">
              <Logo className="h-8 w-auto transition-transform duration-300 group-hover:scale-110" />
            </button>
            <p className="text-sm text-white/50 leading-relaxed mb-6 max-w-md">
              Book sports facilities across Abuja instantly. Play when you want, where you want.
            </p>

            {/* Embedded Waitlist Form */}
            <form onSubmit={handleSubmit} className="relative max-w-lg">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="w-full h-14 pl-5 pr-36 rounded-full bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:bg-white/8 transition-all"
              />
              <button
                type="submit"
                disabled={loading}
                className="absolute right-1 top-1/2 -translate-y-1/2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-full text-sm font-semibold transition-all disabled:opacity-50"
              >
                {loading ? "Joining..." : "Join the Access"}
              </button>
            </form>
          </div>

          {/* Right Side - Footer Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="text-base font-semibold mb-4 text-white">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-white/50 hover:text-primary transition-colors text-sm">
                    Home
                  </button>
                </li>
                <li>
                  <button onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} className="text-white/50 hover:text-primary transition-colors text-sm">
                    Features
                  </button>
                </li>
                <li>
                  <button onClick={() => document.getElementById('sports')?.scrollIntoView({ behavior: 'smooth' })} className="text-white/50 hover:text-primary transition-colors text-sm">
                    Sports
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-base font-semibold mb-4 text-white">Product</h4>
              <ul className="space-y-3">
                <li>
                  <button onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} className="text-white/50 hover:text-primary transition-colors text-sm">
                    For Players
                  </button>
                </li>
                <li>
                  <button onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} className="text-white/50 hover:text-primary transition-colors text-sm">
                    For Venue Owners
                  </button>
                </li>
                <li>
                  <button onClick={() => document.getElementById('waitlist-section')?.scrollIntoView({ behavior: 'smooth' })} className="text-white/50 hover:text-primary transition-colors text-sm">
                    Early Access
                  </button>
                </li>
                {/* Commented out for future multi-page structure */}
                {/* <Link to="/careers">Careers</Link> */}
                {/* <Link to="/press">Press</Link> */}
              </ul>
            </div>

            <div>
              <h4 className="text-base font-semibold mb-4 text-white">Join Us</h4>
              <ul className="space-y-3">
                <li>
                  <button onClick={() => document.getElementById('waitlist-section')?.scrollIntoView({ behavior: 'smooth' })} className="text-white/50 hover:text-primary transition-colors text-sm">
                    Join Waitlist
                  </button>
                </li>
                <li>
                  <button onClick={() => document.getElementById('waitlist-section')?.scrollIntoView({ behavior: 'smooth' })} className="text-white/50 hover:text-primary transition-colors text-sm">
                    List Your Venue
                  </button>
                </li>
                <li>
                  <button onClick={() => document.getElementById('waitlist-section')?.scrollIntoView({ behavior: 'smooth' })} className="text-white/50 hover:text-primary transition-colors text-sm">
                    Get Early Access
                  </button>
                </li>
                {/* Commented out for future multi-page structure */}
                {/* <Link to="/help">Help Center</Link> */}
                {/* <Link to="/contact">Contact</Link> */}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 text-center">
          <p className="text-sm text-white/40">© 2025 Spotts. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
