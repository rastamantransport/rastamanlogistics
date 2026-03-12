import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/QuoteForm";
import SEOHead from "@/components/SEOHead";
import { Shield, CheckCircle } from "lucide-react";

const Quote = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pt-16">
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold font-display text-foreground mb-3">
                Get Your Free <span className="text-gradient-gold">Shipping Quote</span>
              </h1>
              <p className="text-muted-foreground max-w-md mx-auto">
                Tell us about your vehicle and route. We'll match you with the best carrier at a competitive rate.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 md:p-8 mb-8">
              <QuoteForm />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" /> Licensed & Insured
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" /> No Obligation
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" /> Free Estimate
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default Quote;
