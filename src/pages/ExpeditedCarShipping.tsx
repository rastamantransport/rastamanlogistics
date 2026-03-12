import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Clock, ArrowRight, CheckCircle, Phone, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const benefits = [
  "Priority carrier assignment — fastest pickup times",
  "Guaranteed pickup within 24–48 hours",
  "Dedicated single-vehicle or small-load carriers",
  "Ideal for urgent relocations & time-sensitive moves",
  "Open or enclosed trailer options available",
  "Real-time updates throughout expedited transit",
];

const faqs = [
  { q: "How fast is expedited car shipping?", a: "With expedited service, your vehicle is typically picked up within 24–48 hours of booking (compared to 3–7 days for standard). Transit times are also shorter since carriers take more direct routes with fewer stops. Cross-country expedited shipments usually arrive in 3–5 days." },
  { q: "How much more does expedited shipping cost?", a: "Expedited auto transport typically costs 20–50% more than standard shipping due to priority scheduling and dedicated carrier assignment. The exact premium depends on your route, vehicle type, and how quickly you need pickup. Contact us for a personalized quote." },
  { q: "When should I choose expedited transport?", a: "Expedited shipping is ideal for urgent relocations, last-minute military PCS moves, time-sensitive dealership deliveries, vehicles purchased at auction with tight pickup deadlines, or anytime you simply can't wait for standard scheduling." },
];

const ExpeditedCarShipping = () => (
  <div className="min-h-screen bg-background">
    <SEOHead
      title="Expedited Car Shipping | Fast Priority Auto Transport"
      description="Need your vehicle shipped fast? Expedited car shipping offers priority pickup within 24–48 hours and faster transit times. Nationwide service. Get a free rush quote."
      canonical="https://rastamanlogistics.com/expedited-car-shipping"
    />
    <Helmet>
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Expedited Car Shipping",
        "provider": { "@type": "Organization", "name": "Rastaman Logistics LLC" },
        "description": "Priority expedited vehicle shipping with guaranteed pickup within 24–48 hours and faster transit times nationwide.",
        "areaServed": { "@type": "Country", "name": "United States" },
        "serviceType": "Expedited Auto Transport"
      })}</script>
    </Helmet>
    <Navbar />
    <main className="pt-16">
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              <Zap className="w-4 h-4" /> Priority Service
            </div>
            <h1 className="text-3xl md:text-4xl font-bold font-display text-foreground mb-4">
              Expedited Car <span className="text-gradient-gold">Shipping</span>
            </h1>
            <p className="text-muted-foreground leading-relaxed mb-4 max-w-xl mx-auto">
              When time is critical, our expedited auto transport service gets your vehicle moving fast. We prioritize your shipment with guaranteed pickup within 24–48 hours and faster transit through direct routing.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-xl mx-auto">
              Whether it's a last-minute relocation, a military PCS deadline, or a vehicle auction with a tight pickup window — our rush shipping service ensures your car arrives when you need it, not when it's convenient for the carrier.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/quote">
                <Button className="bg-gradient-gold text-primary-foreground font-semibold hover:opacity-90">
                  Get Rush Quote <ArrowRight className="ml-2 w-4 h-4" />
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
            Why Choose Expedited Shipping?
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
            Need It Shipped Fast?
          </h2>
          <p className="text-white/65 mb-8 max-w-md mx-auto">Get a free expedited shipping quote — priority pickup within 24–48 hours.</p>
          <Link to="/quote">
            <Button size="lg" className="bg-gradient-gold text-primary-foreground font-bold px-8 hover:opacity-90">
              Get Rush Quote <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default ExpeditedCarShipping;
