import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Truck, Shield, MapPin, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const coreServices = [
  {
    icon: Truck,
    title: "Open Auto Transport",
    description: "The most popular and affordable way to ship a vehicle. Your car rides on an open multi-car carrier — the same method trusted by dealerships and manufacturers across the country.",
    link: "/open-auto-transport",
  },
  {
    icon: Shield,
    title: "Enclosed Auto Transport",
    description: "Premium protection for luxury, classic, and exotic vehicles. Your car travels inside a fully enclosed trailer, shielded from weather, road debris, and prying eyes.",
    link: "/enclosed-auto-transport",
  },
  {
    icon: MapPin,
    title: "Door-to-Door Car Shipping",
    description: "We pick up your vehicle from your location and deliver it directly to your destination — no terminals, no extra trips, no hassle. Available on every route we serve.",
    link: "/door-to-door-shipping",
  },
  {
    icon: Clock,
    title: "Expedited Car Shipping",
    description: "Need your vehicle shipped fast? Our expedited service guarantees priority pickup within 24–48 hours and faster transit times through direct carrier routing.",
    link: "/expedited-car-shipping",
  },
];

const Services = () => (
  <div className="min-h-screen bg-background">
    <SEOHead
      title="Auto Transport Services | Rastaman Logistics"
      description="Explore all auto transport services from Rastaman Logistics — open transport, enclosed shipping, door-to-door delivery, and expedited car shipping nationwide."
      canonical="https://rastamanlogistics.com/services"
    />
    <Navbar />
    <main className="pt-16">
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display text-foreground mb-6">
              Auto Transport Services — Car Shipping by <span className="text-gradient-gold">Rastaman Logistics</span>
            </h1>
            <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
              Rastaman Logistics provides professional auto transport and car shipping solutions for customers across the United States. Whether you need open carrier vehicle transport for everyday cars or enclosed shipping for high-value collectibles, our nationwide network of vetted carriers delivers safe, reliable door-to-door service. From expedited auto transport with priority pickup to standard car shipping at competitive rates, we handle every detail so your vehicle arrives on time and damage-free.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {coreServices.map((s) => (
              <Link
                key={s.link}
                to={s.link}
                className="group bg-card border border-border rounded-xl p-8 hover:border-primary/40 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-lg bg-primary/10">
                    <s.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold font-display text-foreground">{s.title}</h2>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">{s.description}</p>
                <span className="inline-flex items-center text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                  Learn more <ArrowRight className="ml-1 w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link to="/car-shipping-calculator">
              <Button size="lg" className="bg-gradient-gold text-primary-foreground font-bold px-8 hover:opacity-90">
                Get a Free Quote <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default Services;
