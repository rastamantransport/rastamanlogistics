import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Truck, Shield, Package, Building2, MapPin, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import openTransport from "@/assets/open-transport.jpg?format=webp";
import enclosedTransport from "@/assets/enclosed-transport.jpg?format=webp";

const services = [
  {
    icon: Truck,
    title: "Open Car Transport",
    desc: "The most popular and affordable option for vehicle shipping. Your car is loaded onto an open multi-car carrier — the same method used by dealerships and manufacturers nationwide.",
    benefits: ["Most cost-effective option", "Widely available routes", "Ideal for standard vehicles"],
    image: openTransport,
  },
  {
    icon: Shield,
    title: "Enclosed Car Transport",
    desc: "Premium protection for high-value, luxury, classic, and exotic vehicles. Your car travels inside a fully enclosed trailer, shielded from weather and road debris.",
    benefits: ["Maximum vehicle protection", "Climate-controlled options", "Perfect for luxury & classics"],
    image: enclosedTransport,
  },
  {
    icon: Building2,
    title: "Dealer & Auction Transport",
    desc: "Reliable transport solutions for dealerships, auctions, and automotive businesses. We handle single or multi-vehicle shipments with the efficiency your business demands.",
    benefits: ["Volume discounts available", "Flexible scheduling", "Business account options"],
  },
  {
    icon: Package,
    title: "Multi-Vehicle & Business Shipping",
    desc: "Shipping multiple vehicles? We coordinate logistics for fleet moves, corporate relocations, and bulk transport with dedicated support.",
    benefits: ["Fleet management support", "Consolidated shipping", "Dedicated account manager"],
  },
  {
    icon: MapPin,
    title: "Door-to-Door Delivery",
    desc: "We pick up your vehicle from your specified location and deliver it directly to your destination — no terminals, no extra trips, no hassle.",
    benefits: ["Convenient pickup & delivery", "No terminal drop-offs", "Available nationwide"],
  },
];

const Services = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pt-16">
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Our Services</p>
            <h1 className="text-3xl md:text-4xl font-bold font-display text-foreground mb-3">
              Vehicle Transport <span className="text-gradient-gold">Solutions</span>
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              From standard sedans to exotic supercars — we have the right shipping solution for every vehicle.
            </p>
          </div>

          <div className="space-y-12 max-w-5xl mx-auto">
            {services.map((s, i) => (
              <div key={s.title} className="bg-card border border-border rounded-xl overflow-hidden">
                <div className={`grid grid-cols-1 ${s.image ? 'lg:grid-cols-2' : ''}`}>
                  {s.image && (
                    <div className={`${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                      <img src={s.image} alt={s.title} className="w-full h-64 lg:h-full object-cover" loading="lazy" decoding="async" width={800} height={600} />
                    </div>
                  )}
                  <div className="p-6 md:p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <s.icon className="w-6 h-6 text-primary" />
                      <h2 className="text-xl font-bold font-display text-foreground">{s.title}</h2>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{s.desc}</p>
                    <ul className="space-y-2 mb-6">
                      {s.benefits.map((b) => (
                        <li key={b} className="flex items-center gap-2 text-sm text-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <Link to="/quote">
                      <Button className="bg-gradient-gold text-primary-foreground font-semibold hover:opacity-90">
                        Get a Quote <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default Services;
