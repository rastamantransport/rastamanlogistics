import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "How does auto transport brokering work?",
    a: "As a licensed auto transport broker, we connect you with vetted, insured carriers from our nationwide network. We handle the logistics — you get a safe, reliable transport experience at competitive rates.",
  },
  {
    q: "What's the difference between open and enclosed transport?",
    a: "Open transport uses multi-car carriers exposed to the elements — it's the most common and affordable option. Enclosed transport uses a covered trailer, ideal for luxury, classic, or exotic vehicles needing extra protection.",
  },
  {
    q: "How long does vehicle shipping take?",
    a: "Transit times vary by distance. Most cross-country shipments take 7–14 days, while shorter routes take 3–7 days. We provide estimated delivery windows with every quote.",
  },
  {
    q: "Is my vehicle insured during transport?",
    a: "Yes. All carriers in our network carry full cargo insurance. We verify insurance coverage before assigning any carrier to your shipment.",
  },
  {
    q: "Can I ship a non-running vehicle?",
    a: "Absolutely. We can arrange transport for non-running, inoperable, or project vehicles. Just let us know the condition when requesting a quote so we can match you with the right carrier.",
  },
  {
    q: "How much does car shipping cost?",
    a: "Costs depend on distance, vehicle size, transport type (open vs enclosed), route demand, and time of year. Request a free quote for an accurate estimate tailored to your shipment.",
  },
];

const FAQSection = () => (
  <section className="py-20 bg-card">
    <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground mb-3">
          Frequently Asked Questions
        </h2>
        <p className="text-muted-foreground">
          Everything you need to know about our auto transport services.
        </p>
      </div>

      <Accordion type="single" collapsible className="space-y-2">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-lg px-4 bg-background">
            <AccordionTrigger className="text-sm font-medium text-foreground hover:text-primary py-4">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default FAQSection;
