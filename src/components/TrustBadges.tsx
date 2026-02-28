import { Shield, Award, Truck, CheckCircle } from "lucide-react";

const badges = [
  { icon: Shield, label: "Licensed & Insured", desc: "Fully licensed auto transport broker" },
  { icon: Award, label: "Verified Carriers", desc: "Only vetted, insured carriers" },
  { icon: Truck, label: "Nationwide Service", desc: "All 50 states covered" },
  { icon: CheckCircle, label: "FMCSA Registered", desc: "Federal motor carrier authority" },
];

const TrustBadges = () => (
  <section className="py-12 bg-card border-y border-border">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {badges.map((b) => (
          <div key={b.label} className="flex flex-col items-center text-center gap-2">
            <b.icon className="w-8 h-8 text-primary" />
            <p className="text-sm font-semibold text-foreground">{b.label}</p>
            <p className="text-xs text-muted-foreground">{b.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustBadges;
