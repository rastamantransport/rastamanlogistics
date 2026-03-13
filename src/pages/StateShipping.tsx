import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { getStateBySlug } from "@/data/states";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import NotFound from "./NotFound";
import { Truck, Clock, DollarSign, MapPin, Shield, CheckCircle } from "lucide-react";

const StateShipping = () => {
  const { stateSlug } = useParams<{ stateSlug: string }>();
  const stateData = stateSlug ? getStateBySlug(stateSlug) : undefined;

  if (!stateData) {
    return <NotFound />;
  }

  const { name, abbreviation, majorCities, avgShippingCost, avgTransitDays, description } = stateData;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`Car Shipping to & from ${name} | Rastaman Logistics`}
        description={`Ship your car to or from ${name} (${abbreviation}) with Rastaman Logistics. ${avgShippingCost} avg cost, ${avgTransitDays} transit. Serving ${majorCities.join(", ")} & more.`}
        canonical={`https://rastamanlogistics.com/${stateData.slug}`}
      />
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold font-display text-foreground mb-4">
                Car Shipping to &amp; from{" "}
                <span className="text-gradient-gold">{name}</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                {description}
              </p>
              <Button asChild size="lg" className="text-base px-8">
                <Link to="/car-shipping-calculator">Get a Free {name} Shipping Quote</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-12 border-y border-border">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto text-center">
              <div className="flex flex-col items-center gap-2">
                <DollarSign className="w-8 h-8 text-primary" />
                <span className="text-sm text-muted-foreground">Average Cost</span>
                <span className="text-xl font-bold text-foreground">{avgShippingCost}</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Clock className="w-8 h-8 text-primary" />
                <span className="text-sm text-muted-foreground">Transit Time</span>
                <span className="text-xl font-bold text-foreground">{avgTransitDays}</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <MapPin className="w-8 h-8 text-primary" />
                <span className="text-sm text-muted-foreground">Major Cities</span>
                <span className="text-xl font-bold text-foreground">{majorCities.length}+ Cities</span>
              </div>
            </div>
          </div>
        </section>

        {/* Body Content */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto prose prose-lg">
              <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground mb-6">
                Auto Transport Services in {name}
              </h2>
              <p className="text-muted-foreground mb-4">
                Rastaman Logistics provides reliable, fully insured auto transport to and from {name} ({abbreviation}).
                Whether you're relocating, buying a vehicle online, or heading south for the winter, our nationwide
                network of vetted carriers ensures your car arrives safely and on time.
              </p>
              <p className="text-muted-foreground mb-4">
                We offer both <Link to="/open-auto-transport" className="text-primary hover:underline">open auto transport</Link> and{" "}
                <Link to="/enclosed-auto-transport" className="text-primary hover:underline">enclosed auto transport</Link> options
                for shipments to {name}. Open transport is the most popular and affordable choice for standard vehicles, while
                enclosed transport provides premium protection for luxury, classic, or high-value cars.
              </p>
              <p className="text-muted-foreground mb-4">
                Average shipping costs to {name} range from {avgShippingCost}, depending on distance, vehicle size, transport
                type, and seasonal demand. Transit times typically fall between {avgTransitDays} for most routes. We also offer{" "}
                <Link to="/expedited-car-shipping" className="text-primary hover:underline">expedited shipping</Link> for
                time-sensitive deliveries and{" "}
                <Link to="/door-to-door-shipping" className="text-primary hover:underline">door-to-door service</Link> for
                maximum convenience.
              </p>
              <p className="text-muted-foreground mb-4">
                Our {name} auto transport service covers all major metro areas including {majorCities.join(", ")}, as well as
                smaller towns and rural communities. Every shipment is fully insured with up to $250,000 in cargo coverage,
                and our dedicated team provides real-time tracking and updates throughout the shipping process.
              </p>
              <p className="text-muted-foreground mb-6">
                Ready to ship your vehicle to or from {name}? Get a free, no-obligation quote in minutes. Our shipping
                advisors are available to answer your questions and help you choose the right transport option for your
                needs and budget.
              </p>
            </div>
          </div>
        </section>

        {/* Major Cities */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground mb-8 text-center">
                Top Cities We Serve in {name}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {majorCities.map((city) => (
                  <div
                    key={city}
                    className="bg-card border border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors"
                  >
                    <MapPin className="w-6 h-6 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold text-foreground text-lg">{city}, {abbreviation}</h3>
                    <p className="text-sm text-muted-foreground mt-1">Car shipping available</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Trust + CTA */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground mb-4">
                Ship Your Car to {name} Today
              </h2>
              <p className="text-muted-foreground mb-8">
                Join thousands of satisfied customers who trust Rastaman Logistics for safe, affordable auto transport.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground mb-8">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" /> Licensed &amp; Insured
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-primary" /> Nationwide Coverage
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" /> Free Estimates
                </div>
              </div>
              <Button asChild size="lg" className="text-base px-8">
                <Link to="/car-shipping-calculator">Get Your Free Quote</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default StateShipping;
