import PremiumStaticPage from "./premium/PremiumStaticPage";
import html from "./premium/support.html?raw";

const PremiumSupport = () => <PremiumStaticPage html={html} route="/support" />;

export default PremiumSupport;
