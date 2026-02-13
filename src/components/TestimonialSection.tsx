import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Michael R.",
    location: "Los Angeles, CA → Miami, FL",
    text: "Rastaman Logistics made shipping my car cross-country seamless. Great communication from start to finish.",
    rating: 5,
  },
  {
    name: "Sarah T.",
    location: "New York, NY → Houston, TX",
    text: "I was nervous about shipping my classic car, but the enclosed transport was perfect. Vehicle arrived in pristine condition.",
    rating: 5,
  },
  {
    name: "James K.",
    location: "Chicago, IL → Phoenix, AZ",
    text: "Fast quote, competitive pricing, and the carrier was professional. Highly recommend for anyone shipping a vehicle.",
    rating: 5,
  },
];

const TestimonialSection = () => (
  <section className="py-20 bg-background">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground mb-3">
          What Our Customers Say
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Trusted by thousands of customers nationwide for safe, reliable vehicle transport.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {testimonials.map((t) => (
          <div key={t.name} className="bg-card border border-border rounded-lg p-6 flex flex-col">
            <div className="flex gap-1 mb-3">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground flex-1 mb-4 leading-relaxed">"{t.text}"</p>
            <div>
              <p className="text-sm font-semibold text-foreground">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialSection;
