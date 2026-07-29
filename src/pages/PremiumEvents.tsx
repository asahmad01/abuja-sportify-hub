import PremiumStaticPage from "./premium/PremiumStaticPage";
import html from "./premium/events.html?raw";

const PremiumEvents = () => <PremiumStaticPage html={html} route="/events" />;

export default PremiumEvents;
