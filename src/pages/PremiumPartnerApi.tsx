import PremiumStaticPage from "./premium/PremiumStaticPage";
import html from "./premium/partner-api.html?raw";

const PremiumPartnerApi = () => <PremiumStaticPage html={html} route="/partner-api" />;

export default PremiumPartnerApi;
