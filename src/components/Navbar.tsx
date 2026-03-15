import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", path: "/" },
  {
    label: "Services",
    path: "/services",
    children: [
      { label: "All States", path: "/car-shipping-states" },
      { label: "Open Auto Transport", path: "/open-auto-transport" },
      { label: "Enclosed Transport", path: "/enclosed-auto-transport" },
      { label: "Door-to-Door", path: "/door-to-door-shipping" },
      { label: "Expedited Shipping", path: "/expedited-car-shipping" },
    ],
  },
  { label: "Gallery", path: "/gallery" },
  { label: "How It Works", path: "/how-it-works" },
  { label: "About", path: "/about" },
  { label: "Reviews", path: "/reviews" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b-2 border-primary/60">
      <nav className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-bold font-display tracking-tight text-foreground">
            RASTAMAN<span className="text-primary"> LOGISTICS</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.path} className="relative group">
                <Link
                  to={link.path}
                  className={`text-sm font-medium transition-colors hover:text-primary inline-flex items-center gap-1 ${
                    location.pathname.startsWith(link.path) ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                  <ChevronDown className="w-3 h-3" />
                </Link>
                <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="bg-popover border border-border rounded-md shadow-lg py-1 min-w-[200px]">
                    {link.children.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        className="block px-4 py-2 text-sm text-popover-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === link.path ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <a href="tel:+19165193588" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <Phone className="w-4 h-4" />
            (916) 519-3588
          </a>
          <Link to="/car-shipping-calculator">
            <Button className="bg-gradient-gold text-primary-foreground font-semibold hover:opacity-90 transition-opacity">
              Get a Quote
            </Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-background border-b border-border animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <div key={link.path}>
                <Link
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`text-sm font-medium py-2 block transition-colors ${
                    location.pathname === link.path ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
                {link.children?.map((child) => (
                  <Link
                    key={child.path}
                    to={child.path}
                    onClick={() => setMobileOpen(false)}
                    className={`text-sm py-1.5 pl-4 block transition-colors ${
                      location.pathname === child.path ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ))}
            <a href="tel:+19165193588" className="flex items-center gap-2 text-sm text-primary font-medium py-2">
              <Phone className="w-4 h-4" />
              (916) 519-3588
            </a>
            <Link to="/car-shipping-calculator" onClick={() => setMobileOpen(false)}>
              <Button className="w-full bg-gradient-gold text-primary-foreground font-semibold">
                Get a Quote
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
