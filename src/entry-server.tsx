import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Routes, Route } from "react-router-dom";

// Eager imports for SSR — no lazy loading
import Index from "./pages/Index";
import Quote from "./pages/Quote";
import Services from "./pages/Services";
import OpenAutoTransport from "./pages/OpenAutoTransport";
import EnclosedAutoTransport from "./pages/EnclosedAutoTransport";
import DoorToDoorShipping from "./pages/DoorToDoorShipping";
import ExpeditedCarShipping from "./pages/ExpeditedCarShipping";
import Gallery from "./pages/Gallery";
import HowItWorks from "./pages/HowItWorks";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Reviews from "./pages/Reviews";
import NotFound from "./pages/NotFound";

interface HelmetContextData {
  helmet?: {
    title: { toString(): string };
    meta: { toString(): string };
    link: { toString(): string };
    script: { toString(): string };
  };
}

export function render(url: string) {
  const helmetContext: HelmetContextData = {};
  const queryClient = new QueryClient();

  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <StaticRouter location={url}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/quote" element={<Quote />} />
              <Route path="/services" element={<Services />} />
              <Route path="/open-auto-transport" element={<OpenAutoTransport />} />
              <Route path="/enclosed-auto-transport" element={<EnclosedAutoTransport />} />
              <Route path="/door-to-door-shipping" element={<DoorToDoorShipping />} />
              <Route path="/expedited-car-shipping" element={<ExpeditedCarShipping />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </StaticRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );

  return { html, helmet: helmetContext.helmet };
}
