import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Truck, ArrowRight, CheckCircle, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import AllStatesLinks from "@/components/AllStatesLinks";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import FAQSection from "@/components/FAQSection";
import openTransport from "@/assets/open-transport.jpg?format=webp";

const benefits = [
  "Most affordable vehicle shipping method",
  "Widely available routes across all 50 states",
  "Same method used by dealerships & manufacturers",
  "Faster pickup times due to carrier availability",
  "Ideal for standard sedans, SUVs, and trucks",
  "Fully insured with vetted, licensed carriers",
];

const faqs = [
  { q: "Is open auto transport safe for my vehicle?", a: "Yes. Open transport is the most common method used in the auto shipping industry — over 90% of vehicles, including brand-new cars from manufacturers, are shipped this way. Your vehicle is secured on the carrier with professional tie-downs and fully insured during transit." },
  { q: "How much does open car transport cost?", a: "Pricing depends on distance, vehicle size, route popularity, and time of year. Open transport is typically 30–40% less expensive than enclosed shipping. Contact us for a free, no-obligation quote tailored to your specific route." },
  { q: "How long does open auto transport take?", a: "Transit times vary by distance. Shipments under 500 miles typically take 1–3 days, while cross-country moves (1,500+ miles) usually take 5–7 days. We provide estimated delivery windows when you book." },
];

const OpenAutoTransport = () => (
  <div className="min-h-screen bg-background">
    <SEOHead
      title="Open Auto Transport | Affordable Nationwide Car Shipping"
      description="Ship your vehicle affordably with open auto transport. The most popular car shipping method across the U.S. — fully insured, door-to-door delivery. Get a free quote."
      canonical="https://rastamanlogistics.com/open-auto-transport"
    />
    <Helmet>
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Open Auto Transport",
        "provider": { "@type": "Organization", "name": "Rastaman Logistics LLC" },
        "description": "Affordable open carrier vehicle shipping across all 50 states with fully insured, vetted carriers.",
        "areaServed": { "@type": "Country", "name": "United States" },
        "serviceType": "Open Auto Transport"
      })}</script>
    </Helmet>
    <Navbar />
    <main className="pt-16">
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
            <div>
              <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Our Services</p>
              <h1 className="text-3xl md:text-4xl font-bold font-display text-foreground mb-4">
                Open Auto <span className="text-gradient-gold">Transport</span>
              </h1>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Open auto transport is the most popular and cost-effective way to ship a vehicle across the United States. Your car is loaded onto a multi-car open carrier — the same method dealerships and manufacturers use to move inventory nationwide.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Whether you're relocating, buying a car out of state, or moving for military deployment, open transport delivers reliable, affordable shipping with door-to-door convenience.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/car-shipping-calculator">
                  <Button className="bg-gradient-gold text-primary-foreground font-semibold hover:opacity-90">
                    Get Free Quote <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <a href="tel:+19165193588">
                  <Button variant="outline" className="border-border text-foreground hover:bg-muted">
                    <Phone className="mr-2 w-4 h-4" /> (916) 519-3588
                  </Button>
                </a>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden border border-border">
              <img src={openTransport} alt="Open auto transport carrier shipping multiple vehicles on an open trailer across the United States" className="w-full h-80 lg:h-96 object-cover" loading="eager" width={800} height={600} />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-card">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground text-center mb-10">
            Why Choose Open Car Transport?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b) => (
              <div key={b} className="flex items-start gap-3 p-4 rounded-lg bg-background border border-border">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <p className="text-sm text-foreground">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground text-center mb-10">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-base font-semibold text-foreground mb-2">{faq.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-dark">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold font-display text-white mb-4">
            Ready to Ship Your Vehicle?
          </h2>
          <p className="text-white/65 mb-8 max-w-md mx-auto">Get a free, no-obligation open transport quote in minutes.</p>
          <Link to="/car-shipping-calculator">
            <Button size="lg" className="bg-gradient-gold text-primary-foreground font-bold px-8 hover:opacity-90">
              Get Free Quote <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </main>
      <AllStatesLinks />
    <Footer />
  </div>
);

export default OpenAutoTransport;
