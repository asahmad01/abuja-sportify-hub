import Logo from "@/components/Logo";

const Footer = () => {
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
              Book sports facilities instantly. Play when you want, where you want. Launching soon in Abuja.
            </p>
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
              <h4 className="text-base font-semibold mb-4 text-white">Contact Us</h4>
              <ul className="space-y-3">
                <li>
                  <a href="mailto:info@spottsapp.com" className="text-white/50 hover:text-primary transition-colors text-sm flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    info@spottsapp.com
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/spottsapp/" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-primary transition-colors text-sm flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    @spottsapp
                  </a>
                </li>
                <li>
                  <button onClick={() => document.getElementById('waitlist-section')?.scrollIntoView({ behavior: 'smooth' })} className="text-white/50 hover:text-primary transition-colors text-sm">
                    Join Waitlist
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 text-center space-y-2">
          <p className="text-sm text-white/40">© 2025 Spotts. All rights reserved.</p>
          <p className="text-sm text-white/30">
            Powered by{' '}
            <a
              href="https://bleumeridiantech.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-primary transition-colors underline"
            >
              Bleu Meridian Technologies
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
