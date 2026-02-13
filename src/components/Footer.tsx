import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="bg-card border-t border-border">
    <div className="container mx-auto px-4 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-bold font-display text-foreground mb-4">
            RASTAMAN<span className="text-primary"> LOGISTICS</span>
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Licensed auto transport broker specializing in safe, reliable nationwide vehicle shipping across the United States.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Services</h4>
          <ul className="space-y-2">
            {["Open Transport", "Enclosed Transport", "Dealer Transport", "Door-to-Door Delivery"].map((s) => (
              <li key={s}>
                <Link to="/services" className="text-sm text-muted-foreground hover:text-primary transition-colors">{s}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Company</h4>
          <ul className="space-y-2">
            {[
              { label: "About Us", path: "/about" },
              { label: "How It Works", path: "/how-it-works" },
              { label: "Get a Quote", path: "/quote" },
              { label: "Contact", path: "/contact" },
            ].map((l) => (
              <li key={l.path}>
                <Link to={l.path} className="text-sm text-muted-foreground hover:text-primary transition-colors">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Contact</h4>
          <ul className="space-y-3">
            <li className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="w-4 h-4 text-primary" /> (916) 519-3588
            </li>
            <li className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="w-4 h-4 text-primary" /> info@rastamanlogistics.com
            </li>
            <li className="flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary mt-0.5" /> Nationwide Service, USA
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-10 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Rastaman Logistics LLC. All rights reserved. Licensed & Insured.
        </p>
        <p className="text-xs text-muted-foreground">
          USDOT & FMCSA Registered Auto Transport Broker
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
