import { Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const TestimonialSection = () => {
  const { data: reviews } = useQuery({
    queryKey: ["approved-reviews-home"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("approved", true)
        .order("created_at", { ascending: false })
        .limit(3);
      if (error) throw error;
      return data;
    },
  });

  const displayReviews = reviews && reviews.length > 0 ? reviews : [];

  if (displayReviews.length === 0) return null;

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground mb-3">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Trusted by customers nationwide for safe, reliable vehicle transport.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {displayReviews.map((t) => (
            <div key={t.id} className="bg-card border border-border rounded-lg p-6 flex flex-col">
              <div className="flex gap-1 mb-3">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground flex-1 mb-4 leading-relaxed">"{t.message}"</p>
              <div>
                <p className="text-sm font-semibold text-foreground">{t.name}</p>
                {t.location && <p className="text-xs text-muted-foreground">{t.location}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
