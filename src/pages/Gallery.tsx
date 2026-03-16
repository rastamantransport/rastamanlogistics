import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import SEOHead from "@/components/SEOHead";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import porscheGt3rs from "@/assets/gallery-porsche-gt3rs.jpg";
import ferrari308gts from "@/assets/gallery-ferrari-308-gts.jpg";
import chevyC10 from "@/assets/gallery-chevy-c10.jpg";
import fordModelA from "@/assets/gallery-ford-model-a-woody.jpg";
import acuraNsx from "@/assets/gallery-acura-nsx.jpg";
import f1Replica from "@/assets/gallery-f1-replica-art-car.jpg";
import teslaRoadster from "@/assets/gallery-tesla-roadster.jpg";
import vintagePurple from "@/assets/gallery-vintage-purple-classic.jpg";

const galleryImages = [
  { src: porscheGt3rs, alt: "White Porsche 911 GT3 RS being loaded for secure supercar shipping from Bay Area California to Las Vegas Nevada for SEMA show", caption: "Bay Area, CA → Las Vegas, NV • Porsche 911 GT3 RS • Enclosed supercar transport to SEMA 2026" },
  { src: ferrari308gts, alt: "Red Ferrari 308 GTS after successful delivery from San Diego California to the Washington D.C. area — professional exotic car shipping", caption: "San Diego, CA → Washington, D.C. Area • Ferrari 308 GTS • Cross-country supercar transport" },
  { src: chevyC10, alt: "Custom blue Chevrolet C10 pickup truck prepared for professional enclosed shipping from Napa California to Charlotte North Carolina", caption: "Napa, CA → Charlotte, NC • Classic Chevrolet C10 • High-value vehicle relocation shipping" },
  { src: fordModelA, alt: "Vintage 1930 Ford Model A Woody station wagon safely transported from Cape Cod Massachusetts to South Carolina", caption: "Cape Cod, MA → South Carolina • 1930 Ford Model A Woody • Classic car enclosed shipping" },
  { src: acuraNsx, alt: "Orange Acura NSX loaded for secure supercar shipping from Atlanta Georgia to Bay Area California — professional enclosed transport", caption: "Atlanta, GA → Bay Area, CA • February 2026 • Acura NSX • Door-to-door enclosed supercar shipping" },
  { src: f1Replica, alt: "Custom F1 replica race car sculpture loaded for secure enclosed shipping from Las Vegas Nevada to Tampa Florida", caption: "Las Vegas, NV → Tampa, FL • F1 Replica Art Car • Specialty show-car transport" },
  { src: teslaRoadster, alt: "Maroon Tesla Roadster with scissor doors loaded for professional exotic EV shipping from Scottsdale Arizona to Miami Florida", caption: "Scottsdale, AZ → Miami, FL • Tesla Roadster • Enclosed high-value EV transport" },
  { src: vintagePurple, alt: "Rare vintage purple classic car from San Francisco museum safely loaded for long-distance enclosed transport to Miami Florida", caption: "San Francisco, CA → Miami, FL • Vintage Museum Classic • White-glove collector car shipping" },
];

const Gallery = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Auto Transport Gallery | Vehicles We've Shipped Nationwide"
        description="Browse photos of luxury, classic, and exotic vehicles shipped by Rastaman Logistics. Porsche, Ferrari, Tesla, and more — safely transported coast to coast."
        canonical="https://rastamanlogistics.com/gallery"
        robots="index, follow"
      />
      <Navbar />
      <main className="pt-16">
        <section className="py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Gallery</p>
              <h1 className="text-3xl md:text-4xl font-bold font-display text-foreground mb-3">
                Our Work in <span className="text-gradient-gold">Action</span>
              </h1>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Browse photos of vehicles we've safely transported across the country.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
              {galleryImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelected(i)}
                  className="group overflow-hidden rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <AspectRatio ratio={4 / 3}>
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                      width={800}
                      height={600}
                    />
                  </AspectRatio>
                  <div className="p-3 text-left">
                    <p className="text-sm font-medium text-foreground">{img.caption}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <Dialog open={selected !== null} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-3xl p-2 bg-background">
          {selected !== null && (
            <img
              src={galleryImages[selected].src}
              alt={galleryImages[selected].alt}
              className="w-full rounded-lg object-contain max-h-[80vh]"
              decoding="async"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Gallery;
