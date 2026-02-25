import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import heroTransport from "@/assets/hero-transport.jpg";
import openTransport from "@/assets/open-transport.jpg";
import enclosedTransport from "@/assets/enclosed-transport.jpg";
import porscheGt3rs from "@/assets/gallery-porsche-gt3rs.jpg";

const galleryImages = [
  { src: porscheGt3rs, alt: "Porsche GT3 RS loading into enclosed trailer", caption: "Porsche GT3 RS enclosed transport" },
  { src: heroTransport, alt: "Vehicle loaded on carrier trailer", caption: "Cross-country auto transport" },
  { src: openTransport, alt: "Open car transport carrier", caption: "Open carrier shipping" },
  { src: enclosedTransport, alt: "Enclosed vehicle transport", caption: "Enclosed premium transport" },
  { src: heroTransport, alt: "Car hauler on highway", caption: "Nationwide delivery" },
  { src: openTransport, alt: "Multi-car carrier loading", caption: "Multi-vehicle shipment" },
  { src: enclosedTransport, alt: "Protected vehicle shipping", caption: "Luxury vehicle protection" },
];

const Gallery = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
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
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Gallery;
