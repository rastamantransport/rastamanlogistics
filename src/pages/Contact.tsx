import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const Contact = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Message sent! We'll get back to you shortly.");
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <section className="py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Get In Touch</p>
              <h1 className="text-3xl md:text-4xl font-bold font-display text-foreground mb-3">
                Contact <span className="text-gradient-gold">Us</span>
              </h1>
              <p className="text-muted-foreground max-w-md mx-auto">
                Have questions? Need a quote? We're here to help.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <div>
                <h2 className="text-xl font-bold font-display text-foreground mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="ct-name" className="text-sm text-foreground">Name *</Label>
                      <Input id="ct-name" name="name" required placeholder="Your name" className="bg-secondary border-border" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="ct-phone" className="text-sm text-foreground">Phone</Label>
                      <Input id="ct-phone" name="phone" type="tel" placeholder="(555) 555-5555" className="bg-secondary border-border" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="ct-email" className="text-sm text-foreground">Email *</Label>
                    <Input id="ct-email" name="email" type="email" required placeholder="you@email.com" className="bg-secondary border-border" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="ct-message" className="text-sm text-foreground">Message *</Label>
                    <Textarea id="ct-message" name="message" required placeholder="How can we help?" className="bg-secondary border-border min-h-[120px]" />
                  </div>
                  <Button type="submit" disabled={loading} className="w-full bg-gradient-gold text-primary-foreground font-semibold hover:opacity-90">
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </div>

              <div>
                <h2 className="text-xl font-bold font-display text-foreground mb-6">Contact Information</h2>
                <div className="space-y-6">
                  {[
                    { icon: Phone, label: "Phone", value: "(123) 456-7890", href: "tel:+1234567890" },
                    { icon: Mail, label: "Email", value: "info@rastamanlogistics.com", href: "mailto:info@rastamanlogistics.com" },
                    { icon: MapPin, label: "Service Area", value: "Nationwide — All 50 States" },
                    { icon: Clock, label: "Hours", value: "Mon–Fri: 8AM–8PM EST\nSat: 9AM–5PM EST" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{item.label}</p>
                        {item.href ? (
                          <a href={item.href} className="text-sm text-muted-foreground hover:text-primary transition-colors whitespace-pre-line">
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-sm text-muted-foreground whitespace-pre-line">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
