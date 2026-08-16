import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import SessionDeepLink from "./pages/SessionDeepLink";
import PremiumHome from "./pages/PremiumHome";
import PremiumSupport from "./pages/PremiumSupport";
import PremiumTerms from "./pages/PremiumTerms";
import PremiumPrivacy from "./pages/PremiumPrivacy";
import PremiumRefund from "./pages/PremiumRefund";
import PremiumVenueOnboarding from "./pages/PremiumVenueOnboarding";
import PremiumContact from "./pages/PremiumContact";
import PremiumPartnerApi from "./pages/PremiumPartnerApi";
import PremiumEvents from "./pages/PremiumEvents";
import GollazoConfirmed from "./pages/GollazoConfirmed";
import PremiumGollazo from "./pages/PremiumGollazo";
import GolazoVendorTerms from "./pages/GolazoVendorTerms";
import NotFound from "./pages/NotFound";

/** Redirect that carries the query string across, unlike a bare <Navigate to>. */
const KeepQuery = ({ to }: { to: string }) => (
  <Navigate to={{ pathname: to, search: useLocation().search }} replace />
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Spotts Premium — the live site */}
          <Route path="/" element={<PremiumHome />} />
          <Route path="/support" element={<PremiumSupport />} />
          <Route path="/terms" element={<PremiumTerms />} />
          <Route path="/privacy" element={<PremiumPrivacy />} />
          <Route path="/refund" element={<PremiumRefund />} />
          <Route path="/venue-onboarding" element={<PremiumVenueOnboarding />} />
          <Route path="/contact" element={<PremiumContact />} />
          <Route path="/partner-api" element={<PremiumPartnerApi />} />
          <Route path="/events" element={<PremiumEvents />} />
          <Route path="/golazo" element={<PremiumGollazo />} />
          <Route path="/golazo/confirmed" element={<GollazoConfirmed />} />
          <Route path="/golazo/vendor-terms" element={<GolazoVendorTerms />} />
          {/* The name shipped misspelled with a double L. These stay for good:
              the old URL is in the sitemap, was already shared, and is the
              return path Paystack has stored against in-flight payments.
              The search string MUST survive the hop — a buyer coming back from
              the gateway carries ?spotts_return=1, and a bare <Navigate to>
              would drop it and strand them on an unverified page. */}
          <Route path="/gollazo" element={<KeepQuery to="/golazo" />} />
          <Route path="/gollazo/confirmed" element={<KeepQuery to="/golazo/confirmed" />} />

          {/* App deeplink — untouched by the redesign */}
          <Route path="/sessions/:id" element={<SessionDeepLink />} />

          {/* Retired old-design pages — redirected to their closest Premium equivalent */}
          <Route path="/delete-account" element={<Navigate to="/support#delete-account" replace />} />
          <Route path="/api" element={<Navigate to="/partner-api" replace />} />
          <Route path="/become-partner" element={<Navigate to="/venue-onboarding" replace />} />
          <Route path="/about" element={<Navigate to="/" replace />} />
          <Route path="/blog" element={<Navigate to="/" replace />} />
          <Route path="/community" element={<Navigate to="/" replace />} />
          <Route path="/features" element={<Navigate to="/" replace />} />
          <Route path="/mobile-app" element={<Navigate to="/" replace />} />
          <Route path="/register" element={<Navigate to="/" replace />} />
          <Route path="/categories" element={<Navigate to="/" replace />} />
          <Route path="/vip-access" element={<Navigate to="/" replace />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
