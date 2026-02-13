import { Phone } from "lucide-react";
import { Link } from "react-router-dom";

const StickyCallButton = () => {
  return (
    <div className="fixed bottom-5 left-0 right-0 z-50 flex justify-center gap-3 px-4 md:hidden">
      <a
        href="tel:+19165193588"
        className="flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-primary-foreground font-semibold shadow-lg hover:opacity-90 transition-opacity"
        aria-label="Call us now"
      >
        <Phone className="w-5 h-5" />
        <span className="text-sm">Call Now</span>
      </a>
      <Link
        to="/quote"
        className="flex items-center rounded-full bg-gradient-gold px-5 py-3 text-primary-foreground font-semibold shadow-lg hover:opacity-90 transition-opacity"
      >
        <span className="text-sm">Get Free Quote</span>
      </Link>
    </div>
  );
};

export default StickyCallButton;
