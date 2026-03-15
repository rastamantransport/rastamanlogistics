import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { states } from "@/data/states";
import { MapPin } from "lucide-react";

const CarShippingStates = () => (
  <>
    <SEOHead
      title="Car Shipping to & from Every US State | Rastaman Logistics"
      description="Browse all 48 state car shipping pages. Get instant quotes, transit times, and pricing for auto transport to and from every contiguous US state."
      canonical="https://rastamanlogistics.com/car-shipping-states"
    />
    <Navbar />
    <main className="pt-20 pb-16">
      <section className="container mx-auto px-4 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold font-display text-foreground mb-4 mt-8">
          Car Shipping to &amp; from Every US State
        </h1>
        <p className="text-muted-foreground max-w-3xl mb-10 text-base leading-relaxed">
          Rastaman Logistics provides reliable auto transport services across all 48 contiguous
          United States. Select your state below to view estimated costs, transit times, major
          city routes, and request a free shipping quote.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {states.map((s) => (
            <Link
              key={s.slug}
              to={`/${s.slug}`}
              className="group flex flex-col items-center gap-2 rounded-lg border border-border bg-card p-4 text-center shadow-sm transition-all hover:shadow-md hover:border-primary/40 hover:-translate-y-0.5"
            >
              <MapPin className="w-5 h-5 text-primary opacity-70 group-hover:opacity-100 transition-opacity" />
              <span className="text-sm font-semibold text-card-foreground group-hover:text-primary transition-colors">
                {s.name}
              </span>
              <span className="text-xs text-muted-foreground">{s.abbreviation}</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default CarShippingStates;
