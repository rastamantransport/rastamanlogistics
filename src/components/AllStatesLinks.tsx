import { Link } from "react-router-dom";
import { states } from "@/data/states";

const AllStatesLinks = () => (
  <section className="py-16 bg-card">
    <div className="container mx-auto px-4 lg:px-8">
      <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground mb-6 text-center">
        We Ship To All 50 States
      </h2>
      <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
        Rastaman Logistics offers reliable auto transport to and from every contiguous US state. Click any state to learn more about routes, pricing, and transit times.
      </p>
      <div className="flex flex-wrap justify-center gap-x-1.5 gap-y-1 max-w-4xl mx-auto">
        {states.map((s, i) => (
          <span key={s.slug}>
            <Link
              to={`/${s.slug}`}
              className="text-sm text-primary hover:underline"
            >
              {s.name}
            </Link>
            {i < states.length - 1 && (
              <span className="text-muted-foreground text-sm"> · </span>
            )}
          </span>
        ))}
      </div>
    </div>
  </section>
);

export default AllStatesLinks;
