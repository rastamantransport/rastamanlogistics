import { Phone } from "lucide-react";

const StickyCallButton = () => {
  return (
    <a
      href="tel:+1234567890"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-primary-foreground font-semibold shadow-lg hover:opacity-90 transition-opacity md:hidden"
      aria-label="Call us now"
    >
      <Phone className="w-5 h-5" />
      <span className="text-sm">Call Now</span>
    </a>
  );
};

export default StickyCallButton;
