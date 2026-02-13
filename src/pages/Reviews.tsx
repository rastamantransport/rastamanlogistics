import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const Reviews = () => {
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoveredStar, setHoveredStar] = useState(0);

  const { data: reviews, refetch } = useQuery({
    queryKey: ["approved-reviews"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("approved", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = (formData.get("name") as string)?.trim();
    const location = (formData.get("location") as string)?.trim();
    const message = (formData.get("message") as string)?.trim();

    if (!name || !message || name.length > 100 || message.length > 1000) {
      toast.error("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.from("reviews").insert({
        name,
        location: location || null,
        rating,
        message,
        approved: false,
      });
      if (error) throw error;
      toast.success("Thank you! Your review has been submitted and will appear once approved.");
      (e.target as HTMLFormElement).reset();
      setRating(5);
    } catch (err) {
      console.error("Review submit error:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <section className="py-16 border-b border-border">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Testimonials</p>
            <h1 className="text-3xl md:text-4xl font-bold font-display text-foreground mb-3">
              Customer <span className="text-gradient-gold">Reviews</span>
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              See what our customers say — or share your own experience.
            </p>
          </div>
        </section>

        {/* Approved Reviews */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
            <h2 className="text-2xl font-bold font-display text-foreground mb-8">Verified Reviews</h2>
            {reviews && reviews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                {reviews.map((r) => (
                  <div key={r.id} className="bg-card border border-border rounded-lg p-6 flex flex-col">
                    <div className="flex gap-1 mb-3">
                      {Array.from({ length: r.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                      ))}
                      {Array.from({ length: 5 - r.rating }).map((_, i) => (
                        <Star key={`e-${i}`} className="w-4 h-4 text-muted-foreground/30" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground flex-1 mb-4 leading-relaxed">"{r.message}"</p>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{r.name}</p>
                      {r.location && <p className="text-xs text-muted-foreground">{r.location}</p>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground mb-16">No reviews yet. Be the first!</p>
            )}

            {/* Submit Form */}
            <div className="max-w-xl mx-auto">
              <h2 className="text-2xl font-bold font-display text-foreground mb-2">Leave a Review</h2>
              <p className="text-sm text-muted-foreground mb-6">Your review will be published after approval.</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="rv-name" className="text-sm text-foreground">Name *</Label>
                    <Input id="rv-name" name="name" required maxLength={100} placeholder="Your name" className="bg-secondary border-border" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="rv-location" className="text-sm text-foreground">Route / Location</Label>
                    <Input id="rv-location" name="location" maxLength={100} placeholder="e.g. LA → Miami" className="bg-secondary border-border" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-sm text-foreground">Rating *</Label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setRating(s)}
                        onMouseEnter={() => setHoveredStar(s)}
                        onMouseLeave={() => setHoveredStar(0)}
                        className="p-0.5"
                      >
                        <Star
                          className={`w-6 h-6 transition-colors ${
                            s <= (hoveredStar || rating)
                              ? "fill-primary text-primary"
                              : "text-muted-foreground/30"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="rv-message" className="text-sm text-foreground">Your Review *</Label>
                  <Textarea
                    id="rv-message"
                    name="message"
                    required
                    maxLength={1000}
                    placeholder="Tell us about your experience..."
                    className="bg-secondary border-border min-h-[120px]"
                  />
                </div>

                <Button type="submit" disabled={loading} className="w-full bg-gradient-gold text-primary-foreground font-semibold hover:opacity-90">
                  {loading ? "Submitting..." : "Submit Review"}
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Reviews;
