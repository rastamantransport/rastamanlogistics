import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, Users, ClipboardCheck, Truck, CheckCircle, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const steps = [
  {
    icon: FileText,
    step: "01",
    title: "Request a Quote",
    desc: "Fill out our simple online form or call us with your vehicle details, pickup location, and destination. We'll provide a free, no-obligation quote within minutes.",
  },
  {
    icon: Users,
    step: "02",
    title: "Carrier Assignment",
    desc: "Once you accept your quote, we tap into our nationwide network of vetted, insured carriers to find the best match for your route, timeline, and vehicle type.",
  },
  {
    icon: ClipboardCheck,
    step: "03",
    title: "Pickup & Inspection",
    desc: "Your assigned carrier arrives at the pickup location, performs a thorough vehicle inspection, documents the condition, and securely loads your vehicle for transport.",
  },
  {
    icon: Truck,
    step: "04",
    title: "Safe Transport",
    desc: "Your vehicle is transported with care across the country. We keep you informed throughout the journey with status updates and estimated delivery windows.",
  },
  {
    icon: CheckCircle,
    step: "05",
    title: "Delivery & Confirmation",
    desc: "Your vehicle arrives at the destination. A final inspection is completed, and you confirm delivery. It's that simple — safe, reliable, and hassle-free.",
  },
];

const HowItWorks = () => (
  <div className="min-h-screen bg-background">
    <SEOHead
      title="How Car Shipping Works | 5-Step Auto Transport Process"
      description="Learn how vehicle shipping works in 5 simple steps: get a quote, carrier assignment, pickup, safe transport, and delivery. Stress-free auto transport nationwide."
      canonical="https://rastamanlogistics.com/how-it-works"
    />
    <Navbar />
    <main className="pt-16">
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">The Process</p>
            <h1 className="text-3xl md:text-4xl font-bold font-display text-foreground mb-3">
              How Vehicle <span className="text-gradient-gold">Shipping Works</span>
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Our streamlined 5-step process makes shipping your vehicle simple, transparent, and stress-free.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {steps.map((s) => (
              <div key={s.step} className="flex gap-6 bg-card border border-border rounded-xl p-6 md:p-8 hover:border-primary/30 transition-colors">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center">
                    <span className="text-sm font-bold text-primary-foreground">{s.step}</span>
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-bold font-display text-foreground mb-2">{s.title}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/quote">
              <Button size="lg" className="bg-gradient-gold text-primary-foreground font-bold px-8 hover:opacity-90">
                Start Your Shipment <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default HowItWorks;
