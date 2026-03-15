import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Shield, ArrowRight, CheckCircle, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import AllStatesLinks from "@/components/AllStatesLinks";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import enclosedTransport from "@/assets/enclosed-transport.jpg?format=webp";

const benefits = [
  "Maximum protection from weather, debris & road elements",
  "Climate-controlled trailer options available",
  "Ideal for luxury, exotic, classic & high-value vehicles",
  "Fully enclosed trailer — zero exposure during transit",
  "White-glove handling by specialized carriers",
  "Comprehensive insurance coverage included",
];

const faqs = [
  { q: "What types of vehicles should use enclosed transport?", a: "Enclosed transport is recommended for luxury vehicles, exotics (Ferrari, Lamborghini, Porsche), classic and vintage cars, custom show cars, low-clearance vehicles, and any vehicle valued above $75,000. It's also popular for collector cars heading to or from auctions." },
  { q: "How much more does enclosed transport cost vs. open?", a: "Enclosed transport typically costs 30–50% more than open shipping due to smaller carrier capacity (usually 2–6 vehicles vs. 7–10 on open carriers) and the premium protection provided. The added cost is well worth it for high-value vehicles." },
  { q: "Is my vehicle insured during enclosed transport?", a: "Yes. All carriers in our network carry comprehensive cargo insurance. Enclosed transport carriers typically carry higher insurance limits to match the value of the vehicles they transport. We verify insurance coverage before assigning any carrier." },
];

const EnclosedAutoTransport = () => (
  <div className="min-h-screen bg-background">
    <SEOHead
      title="Enclosed Auto Transport | Premium Car Shipping Protection"
      description="Ship luxury, exotic, and classic vehicles with enclosed auto transport. Fully protected from weather and road debris. Nationwide door-to-door service. Free quote."
      canonical="https://rastamanlogistics.com/enclosed-auto-transport"
    />
    <Helmet>
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Enclosed Auto Transport",
        "provider": { "@type": "Organization", "name": "Rastaman Logistics LLC" },
        "description": "Premium enclosed vehicle shipping for luxury, exotic, and classic cars with full protection from weather and road debris.",
        "areaServed": { "@type": "Country", "name": "United States" },
        "serviceType": "Enclosed Auto Transport"
      })}</script>
    </Helmet>
    <Navbar />
    <main className="pt-16">
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
            <div className="lg:order-2">
              <div className="rounded-xl overflow-hidden border border-border">
                <img src={enclosedTransport} alt="Enclosed auto transport trailer providing premium protection for luxury and exotic vehicle shipping" className="w-full h-80 lg:h-96 object-cover" loading="eager" width={800} height={600} />
              </div>
            </div>
            <div>
              <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Premium Service</p>
              <h1 className="text-3xl md:text-4xl font-bold font-display text-foreground mb-4">
                Enclosed Auto <span className="text-gradient-gold">Transport</span>
              </h1>
              <p className="text-muted-foreground leading-relaxed mb-4">
                When your vehicle demands the highest level of protection, enclosed auto transport is the answer. Your car travels inside a fully sealed trailer, completely shielded from weather, road debris, dust, and prying eyes.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                This premium shipping method is the top choice for owners of luxury sedans, exotic supercars, vintage classics, and custom show vehicles. Every carrier in our enclosed network is hand-selected for their expertise in handling high-value automobiles.
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
          </div>
        </div>
      </section>

      <section className="py-16 bg-card">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground text-center mb-10">
            Benefits of Enclosed Car Shipping
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
            Protect Your Investment
          </h2>
          <p className="text-white/65 mb-8 max-w-md mx-auto">Get a free enclosed transport quote and ship with confidence.</p>
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

export default EnclosedAutoTransport;
