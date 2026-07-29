// Pilot port of the new Spotts Premium homepage (Spotts Website.dc.html).
// The markup is kept 1:1 in premium/home.html; premium/setup.ts recreates the
// export's hover states, mobile menu and GSAP animations.
import { useEffect, useRef } from "react";
import homeHtml from "./premium/home.html?raw";
import { setupPremiumPage } from "./premium/setup";
import Seo from "../seo/Seo";
import "./premium/premium.css";

const PremiumHome = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    return setupPremiumPage(rootRef.current);
  }, []);

  return (
    <>
      <Seo route="/" />
      <div
        ref={rootRef}
        className="premium-root"
        dangerouslySetInnerHTML={{ __html: homeHtml }}
      />
    </>
  );
};

export default PremiumHome;
