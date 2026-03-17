import { useState } from "react";
import { Phone, Mail, MapPin, Clock, CheckCircle, AlertCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, formType: "contact" }),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", phone: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Contact Rastaman Logistics | Get a Free Auto Transport Quote"
        description="Contact Rastaman Logistics for a free car shipping quote or questions about vehicle transport. Call (916) 519-3588 or email info@rastamanlogistics.com. Nationwide service."
        canonical="https://www.rastamanlogistics.com/contact"
      />
      <Navbar />
      <main className="pt-16">
        <section className="py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Get In Touch</p>
              <h1 className="text-3xl md:text-4xl font-bold font-display text-foreground mb-3">
                Contact <span className="text-gradient-gold">Us</span>
              </h1>
              <p className="text-muted-foreground max-w-md mx-auto">Have questions? Need a quote? We're here to help.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
              {/* Form */}
              <div>
                <h2 className="text-xl font-bold font-display text-foreground mb-6">Send Us a Message</h2>

                {status === "success" && (
                  <div className="flex items-center gap-3 p-4 mb-6 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <p className="text-sm font-medium">Message sent! We'll get back to you within 1 business day.</p>
                  </div>
                )}

                {status === "error" && (
                  <div className="flex items-center gap-3 p-4 mb-6 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <p className="text-sm font-medium">Something went wrong. Please try again or call us directly at (916) 519-3588.</p>
                  </div>
                )}

                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground" htmlFor="ct-name">Name *</label>
                      <input
                        className="flex h-10 w-full rounded-md border px-3 py-2 text-sm bg-secondary border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        id="ct-name"
                        name="name"
                        required
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground" htmlFor="ct-phone">Phone</label>
                      <input
                        type="tel"
                        className="flex h-10 w-full rounded-md border px-3 py-2 text-sm bg-secondary border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        id="ct-phone"
                        name="phone"
                        placeholder="(555) 555-5555"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground" htmlFor="ct-email">Email *</label>
                    <input
                      type="email"
                      className="flex h-10 w-full rounded-md border px-3 py-2 text-sm bg-secondary border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      id="ct-email"
                      name="email"
                      required
                      placeholder="you@email.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground" htmlFor="ct-message">Message *</label>
                    <textarea
                      className="flex w-full rounded-md border px-3 py-2 text-sm bg-secondary border-border min-h-[120px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      id="ct-message"
                      name="message"
                      required
                      placeholder="How can we help?"
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="inline-flex items-center justify-center gap-2 w-full h-10 px-4 py-2 rounded-md text-sm bg-gradient-gold text-primary-foreground font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === "loading" ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>

              {/* Contact Info */}
              <div>
                <h2 className="text-xl font-bold font-display text-foreground mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Phone</p>
                      <a href="tel:+19165193588" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        (916) 519-3588
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Email</p>
                      <a href="mailto:info@rastamanlogistics.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        info@rastamanlogistics.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Service Area</p>
                      <p className="text-sm text-muted-foreground">Nationwide — 48 Contiguous States</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Hours</p>
                      <p className="text-sm text-muted-foreground">Mon–Fri: 8AM–8PM EST<br />Sat: 9AM–5PM EST</p>
                    </div>
                  </div>
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

