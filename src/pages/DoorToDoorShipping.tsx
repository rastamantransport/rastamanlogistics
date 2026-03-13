import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowRight, CheckCircle, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const benefits = [
  "Vehicle picked up directly from your location",
  "Delivered right to your destination address",
  "No terminal drop-offs or extra trips required",
  "Available nationwide across all 50 states",
  "Convenient scheduling around your timeline",
  "Real-time tracking from pickup to delivery",
];

const faqs = [
  { q: "What does door-to-door auto transport mean?", a: "Door-to-door shipping means we pick up your vehicle from your specified location (home, office, dealership) and deliver it directly to your destination address. You don't need to drop your car off at a terminal or travel to pick it up — we come to you." },
  { q: "Can you pick up from any address?", a: "We pick up from virtually any address. If your street is too narrow or restricted for a large carrier, we'll arrange pickup at the nearest safe, accessible location — usually within a short distance. We always coordinate with you in advance." },
  { q: "How do I prepare my vehicle for door-to-door pickup?", a: "Remove all personal items from the vehicle, ensure the car starts and is drivable (or let us know if it's inoperable), disable any aftermarket alarms, and keep fuel at about a quarter tank. We'll handle a thorough inspection at pickup." },
];

const DoorToDoorShipping = () => (
  <div className="min-h-screen bg-background">
    <SEOHead
      title="Door-to-Door Auto Shipping | Convenient Vehicle Delivery"
      description="Door-to-door auto transport picks up your vehicle at your location and delivers it directly to your destination. No terminals, no hassle. Free nationwide quote."
      canonical="https://rastamanlogistics.com/door-to-door-shipping"
    />
    <Helmet>
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Door-to-Door Auto Shipping",
        "provider": { "@type": "Organization", "name": "Rastaman Logistics LLC" },
        "description": "Convenient door-to-door vehicle pickup and delivery service across all 50 states — no terminals required.",
        "areaServed": { "@type": "Country", "name": "United States" },
        "serviceType": "Door-to-Door Auto Transport"
      })}</script>
    </Helmet>
    <Navbar />
    <main className="pt-16">
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Convenient Service</p>
            <h1 className="text-3xl md:text-4xl font-bold font-display text-foreground mb-4">
              Door-to-Door Auto <span className="text-gradient-gold">Shipping</span>
            </h1>
            <p className="text-muted-foreground leading-relaxed mb-4 max-w-xl mx-auto">
              Skip the terminals and the extra trips. With our door-to-door auto transport service, we pick up your vehicle from your specified location and deliver it directly to your destination — anywhere in the United States.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-xl mx-auto">
              Whether you're relocating across the country, purchasing a vehicle online, or sending a car to a family member, door-to-door shipping is the most convenient way to move your vehicle without the hassle.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
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
      </section>

      <section className="py-16 bg-card">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground text-center mb-10">
            Why Choose Door-to-Door Delivery?
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
            Ship With Maximum Convenience
          </h2>
          <p className="text-white/65 mb-8 max-w-md mx-auto">Get a free door-to-door transport quote in minutes.</p>
          <Link to="/car-shipping-calculator">
            <Button size="lg" className="bg-gradient-gold text-primary-foreground font-bold px-8 hover:opacity-90">
              Get Free Quote <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default DoorToDoorShipping;
