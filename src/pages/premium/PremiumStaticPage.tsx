// Shared wrapper for ported premium pages that have no page-specific
// interactive logic — just static markup, nav, and hover states
// (Support, Terms, Privacy, Refund Policy in the export all qualify).
import { useEffect, useRef } from "react";
import { setupPremiumPage } from "./setup";
import Seo from "../../seo/Seo";
import "./premium.css";

interface PremiumStaticPageProps {
  html: string;
  /** Route key into seo.routes.json — drives <title>/meta/OG for this page. */
  route: string;
}

const PremiumStaticPage = ({ html, route }: PremiumStaticPageProps) => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    return setupPremiumPage(rootRef.current);
  }, []);

  return (
    <>
      <Seo route={route} />
      <div
        ref={rootRef}
        className="premium-root"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </>
  );
};

export default PremiumStaticPage;
