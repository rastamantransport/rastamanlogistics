import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Users, Truck, HeartHandshake, ArrowRight, Globe, Wrench, Zap, MessageSquare, ShieldCheck, Settings, Scale, Handshake } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const values = [
  { icon: Shield, title: "Safety First", desc: "Every carrier is fully licensed, insured, and vetted. Your vehicle's safety is non-negotiable." },
  { icon: Users, title: "Customer Focus", desc: "Dedicated support from quote to delivery. We treat every shipment like it's our own vehicle." },
  { icon: Truck, title: "Nationwide Reach", desc: "Our extensive carrier network covers all 50 states with reliable, timely service." },
  { icon: HeartHandshake, title: "Integrity", desc: "Transparent pricing, honest timelines, and clear communication — always." },
];

const whyChoose = [
  { icon: Globe, title: "Nationwide Coverage, Reliable Capacity", desc: "With access to a large network of vetted and insured carriers across the United States, we can move vehicles quickly and efficiently on virtually any route. From single units to multi-vehicle shipments, we scale to meet your needs." },
  { icon: Wrench, title: "Built by Transporters, Not Just Brokers", desc: "Our foundation as a carrier since 2015 gives us real operational knowledge. We understand dispatching, routing, equipment, and timing — which means fewer surprises and smoother deliveries for our customers." },
  { icon: Zap, title: "Fast, Efficient Dispatch", desc: "We work to assign qualified carriers quickly, minimizing wait times and keeping your vehicles moving. Our strong relationships with drivers and carriers help us secure capacity even on busy lanes." },
  { icon: MessageSquare, title: "Transparent Communication", desc: "Clear updates from pickup to delivery. We stay reachable, responsive, and proactive so you always know the status of your shipment." },
  { icon: ShieldCheck, title: "Fully Vetted & Insured Carrier Network", desc: "Every carrier in our network is carefully screened for active authority, insurance, and safety standards. We prioritize reliability and professionalism on every load." },
  { icon: Settings, title: "Flexible Solutions for Every Customer", desc: "We support individuals, dealerships, auctions, fleet managers, and businesses — whether you need open transport, enclosed shipping, or recurring volume moves." },
  { icon: Scale, title: "Compliance & Professional Standards", desc: "As an FMCSA-registered broker, we operate with full compliance, transparency, and accountability." },
  { icon: Handshake, title: "Long-Term Partnership Approach", desc: "Many of our customers are repeat clients. We focus on building lasting relationships through consistent service, fair pricing, and dependable results." },
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
                Rastaman Logistics LLC is a licensed auto transport broker committed to providing safe, efficient, and reliable vehicle shipping solutions across the United States. We proudly serve individuals, dealerships, collectors, and businesses with the same high level of professionalism, precision, and care.
              </p>
              <p>
                Our roots in the auto transport industry go back to 2015, when we began transporting vehicles and building hands-on experience in carrier operations, vehicle handling, and nationwide logistics. In 2021, we founded <a href="https://rastamantransport.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Rastaman Transport</a>, our own carrier company, allowing us to operate directly in the field and better understand every aspect of the shipping process.
              </p>
              <p>
                Today, with the launch of Rastaman Logistics LLC, we are expanding into brokerage services to better serve our repeat clients and growing customer base. By combining real carrier experience with a trusted nationwide network of thoroughly vetted and insured transport partners, we provide reliable solutions tailored to each customer's needs.
              </p>
              <p>
                As an FMCSA-registered broker, we uphold the highest standards of compliance, transparency, and customer service. Whether you're shipping a daily driver, luxury vehicle, classic car, or dealership inventory across the country, we manage the logistics so you can ship with complete confidence.
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

          {/* Why Choose Section */}
          <div className="mt-20 max-w-5xl mx-auto">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3 text-center">Why Choose Us</p>
            <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground mb-10 text-center">
              Why Choose <span className="text-gradient-gold">Rastaman Logistics</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {whyChoose.map((item) => (
                <div key={item.title} className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors flex gap-4">
                  <item.icon className="w-7 h-7 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-base font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
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
