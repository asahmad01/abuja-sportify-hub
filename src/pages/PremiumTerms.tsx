import PremiumStaticPage from "./premium/PremiumStaticPage";
import html from "./premium/terms.html?raw";

const PremiumTerms = () => <PremiumStaticPage html={html} route="/terms" />;

export default PremiumTerms;
