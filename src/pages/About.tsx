import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Users, Truck, HeartHandshake, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const values = [
  { icon: Shield, title: "Safety First", desc: "Every carrier is fully licensed, insured, and vetted. Your vehicle's safety is non-negotiable." },
  { icon: Users, title: "Customer Focus", desc: "Dedicated support from quote to delivery. We treat every shipment like it's our own vehicle." },
  { icon: Truck, title: "Nationwide Reach", desc: "Our extensive carrier network covers all 50 states with reliable, timely service." },
  { icon: HeartHandshake, title: "Integrity", desc: "Transparent pricing, honest timelines, and clear communication — always." },
];

const About = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pt-16">
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">About Us</p>
            <h1 className="text-3xl md:text-4xl font-bold font-display text-foreground mb-6">
              Your Trusted <span className="text-gradient-gold">Auto Transport</span> Partner
            </h1>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Rastaman Logistics LLC is a licensed auto transport broker committed to providing safe, efficient, and affordable vehicle shipping solutions across the United States. We serve individuals, dealerships, and businesses with the same level of professionalism and care.
              </p>
              <p>
                Our mission is simple: connect customers with the best carriers in the industry while delivering an exceptional experience from the first call to final delivery. We've built a nationwide network of thoroughly vetted, insured carriers so you can ship your vehicle with complete confidence.
              </p>
              <p>
                As a FMCSA-registered broker, we uphold the highest standards of compliance, transparency, and customer service. Whether you're shipping a family sedan across state lines or a classic car across the country, we handle the logistics so you don't have to.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 max-w-5xl mx-auto">
            {values.map((v) => (
              <div key={v.title} className="bg-card border border-border rounded-xl p-6 text-center hover:border-primary/30 transition-colors">
                <v.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="text-base font-semibold text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link to="/quote">
              <Button size="lg" className="bg-gradient-gold text-primary-foreground font-bold px-8 hover:opacity-90">
                Get Your Free Quote <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default About;
