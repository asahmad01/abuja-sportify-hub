import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Logo from "@/components/Logo";

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const scrollToWaitlist = () => {
    const waitlistSection = document.getElementById('waitlist-section');
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  // Single-page navigation items
  const navItems = [
    { name: "Home", sectionId: "home" },
    { name: "Mobile App", sectionId: "mobile-app" },
    { name: "For Vendors", sectionId: "vendor-benefits" },
    { name: "Features", sectionId: "features" },
    { name: "Sports", sectionId: "sports" },
    { name: "Join Waitlist", action: scrollToWaitlist },
    // Commented out for future multi-page structure
    // { name: "About Us", path: "/about" },
    // { name: "Our Categories", path: "/categories" },
    // { name: "Blogs", path: "/blog" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center group">
            <Logo className="h-7 w-auto transition-transform duration-300 group-hover:scale-110" />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => item.action ? item.action() : item.sectionId && scrollToSection(item.sectionId)}
                className="text-sm font-medium transition-colors hover:text-white text-gray-300"
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              size="default"
              className="bg-accent hover:bg-accent/90 text-white rounded-full px-6"
              onClick={scrollToWaitlist}
            >
              Join Waitlist
            </Button>
            {/* Commented out for future multi-page structure */}
            {/* <Link to="/register">Contact Us</Link> */}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => item.action ? item.action() : item.sectionId && scrollToSection(item.sectionId)}
                className="block w-full text-left py-2 text-sm font-medium transition-colors text-gray-300 hover:text-white"
              >
                {item.name}
              </button>
            ))}
            <Button
              size="default"
              className="w-full bg-accent hover:bg-accent/90 text-white rounded-full"
              onClick={scrollToWaitlist}
            >
              Join Waitlist
            </Button>
            {/* Commented out for future multi-page structure */}
            {/* <Link to="/register">Contact Us</Link> */}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
