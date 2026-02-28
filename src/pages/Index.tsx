import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight, Truck, Shield, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/QuoteForm";
import TrustBadges from "@/components/TrustBadges";
import TestimonialSection from "@/components/TestimonialSection";
import FAQSection from "@/components/FAQSection";
import heroImage from "@/assets/hero-transport.jpg?format=webp";

const steps = [
  { icon: "01", title: "Request a Quote", desc: "Fill out our quick form with your vehicle and route details." },
  { icon: "02", title: "Get Matched", desc: "We connect you with the best vetted carrier for your route." },
  { icon: "03", title: "Vehicle Picked Up", desc: "Your carrier arrives, inspects, and loads your vehicle." },
  { icon: "04", title: "Safe Delivery", desc: "Track your shipment and receive your vehicle at the destination." },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center pt-16">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Car transport truck hauling vehicles on highway" className="w-full h-full object-cover" fetchPriority="high" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
        </div>

        <div className="relative container mx-auto px-4 lg:px-8 py-20">
          <div className="max-w-2xl">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">Licensed Auto Transport Broker</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-foreground leading-tight mb-6">
              Nationwide Vehicle Shipping You Can <span className="text-gradient-gold">Trust</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed">
              Safe, reliable auto transport across all 50 states. Get connected with vetted carriers and competitive rates — fast.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/quote">
                <Button size="lg" className="bg-gradient-gold text-primary-foreground font-bold text-base px-8 hover:opacity-90 glow-gold">
                  Get Free Quote <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <a href="tel:+19165193588">
                <Button size="lg" variant="outline" className="border-primary text-primary font-semibold hover:bg-primary hover:text-primary-foreground">
                  <Phone className="mr-2 w-4 h-4" /> Call Now
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <TrustBadges />

      {/* How It Works Brief */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground mb-3">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              From quote to delivery — we make vehicle shipping simple.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {steps.map((step) => (
              <div key={step.icon} className="text-center p-6 rounded-lg bg-card border border-border hover:border-primary/30 transition-colors">
                <div className="text-2xl font-bold font-display text-primary mb-3">{step.icon}</div>
                <h3 className="text-base font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground mb-3">
              Why Choose Rastaman Logistics
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: Shield, title: "Vetted Carriers Only", desc: "Every carrier is fully insured, licensed, and verified before being assigned to your shipment." },
              { icon: Truck, title: "Door-to-Door Service", desc: "We pick up and deliver your vehicle right to your specified locations — no terminals, no hassle." },
              { icon: Clock, title: "Fast & Transparent", desc: "Get a quote in minutes with clear pricing. No hidden fees, no surprises — just reliable service." },
            ].map((item) => (
              <div key={item.title} className="flex flex-col items-center text-center p-6">
                <item.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Quote */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground mb-3">
              Get Your Free Quote
            </h2>
            <p className="text-muted-foreground">
              Fill out the form below and we'll get back to you with a competitive rate.
            </p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 md:p-8">
            <QuoteForm compact />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialSection />

      {/* FAQ */}
      <FAQSection />

      {/* CTA */}
      <section className="py-20 bg-gradient-dark">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground mb-4">
            Ready to Ship Your Vehicle?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Get a free, no-obligation quote in minutes. Nationwide coverage, competitive rates.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/quote">
              <Button size="lg" className="bg-gradient-gold text-primary-foreground font-bold px-8 hover:opacity-90">
                Get Free Quote <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <a href="tel:+19165193588">
              <Button size="lg" variant="outline" className="border-primary text-primary font-semibold hover:bg-primary hover:text-primary-foreground">
                <Phone className="mr-2 w-4 h-4" /> (916) 519-3588
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
