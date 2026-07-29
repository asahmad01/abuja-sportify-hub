import PremiumStaticPage from "./premium/PremiumStaticPage";
import html from "./premium/privacy.html?raw";

const PremiumPrivacy = () => <PremiumStaticPage html={html} route="/privacy" />;

export default PremiumPrivacy;
