// Shared wrapper for ported premium pages that have no page-specific
// interactive logic — just static markup, nav, and hover states
// (Support, Terms, Privacy, Refund Policy in the export all qualify).
import { useEffect, useRef } from "react";
import { setupPremiumPage } from "./setup";
import "./premium.css";

interface PremiumStaticPageProps {
  html: string;
  title: string;
}

const PremiumStaticPage = ({ html, title }: PremiumStaticPageProps) => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = title;
    if (!rootRef.current) return;
    return setupPremiumPage(rootRef.current);
  }, [title]);

  return (
    <div
      ref={rootRef}
      className="premium-root"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default PremiumStaticPage;
