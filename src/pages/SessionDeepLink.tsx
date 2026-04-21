import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const SessionDeepLink = () => {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    // Attempt to open the app directly via custom scheme as a fallback
    // The primary mechanism is Android App Links / iOS Universal Links
    const timer = setTimeout(() => {
      // If the app didn't open within 2s, user likely doesn't have it installed
    }, 2000);
    return () => clearTimeout(timer);
  }, [id]);

  const iosUrl = "https://apps.apple.com/app/id6758109546";
  const androidUrl = "https://play.google.com/store/apps/details?id=com.bleumeridian.spotts";

  const isAndroid = /android/i.test(navigator.userAgent);
  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);

  const handleOpenApp = () => {
    if (isIOS) {
      window.location.href = iosUrl;
    } else if (isAndroid) {
      window.location.href = androidUrl;
    } else {
      window.location.href = iosUrl;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 flex items-center justify-center bg-gradient-to-b from-background to-muted/30 pt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-md mx-auto text-center space-y-8">

            {/* Icon */}
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>

            {/* Heading */}
            <div className="space-y-3">
              <h1 className="text-3xl font-bold">You're invited to a session</h1>
              <p className="text-muted-foreground text-lg">
                Open the Spotts app to view this session and join the game.
              </p>
            </div>

            {/* Primary CTA */}
            <div className="space-y-3">
              <Button
                size="lg"
                className="w-full text-base font-semibold"
                onClick={handleOpenApp}
              >
                {isIOS ? "Get Spotts on the App Store" : isAndroid ? "Get Spotts on Google Play" : "Download Spotts"}
              </Button>

              <p className="text-sm text-muted-foreground">
                Already have the app?{" "}
                <span className="text-primary font-medium">
                  Open Spotts and the session will appear.
                </span>
              </p>
            </div>

            {/* Store badges */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <a
                href={iosUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-black text-white text-sm font-medium hover:bg-gray-900 transition-colors"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs opacity-75">Download on the</div>
                  <div className="text-sm font-semibold">App Store</div>
                </div>
              </a>

              <a
                href={androidUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-black text-white text-sm font-medium hover:bg-gray-900 transition-colors"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.18 23.76c.3.17.64.22.99.14l12.47-7.18-2.61-2.61-10.85 9.65zM.44 1.6C.17 1.91 0 2.37 0 2.96v18.08c0 .59.17 1.05.44 1.36l.07.07 10.13-10.13v-.24L.51 1.53l-.07.07zM20.44 10.4l-2.77-1.6-2.93 2.93 2.93 2.93 2.79-1.61c.8-.46.8-1.19 0-1.65h-.02zM3.18.24L15.65 7.42l-2.61 2.61L2.19.38C2.52.17 2.89.09 3.18.24z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs opacity-75">Get it on</div>
                  <div className="text-sm font-semibold">Google Play</div>
                </div>
              </a>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SessionDeepLink;
