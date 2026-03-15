import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Routes, Route, Navigate } from "react-router-dom";
import { states } from "@/data/states";

// Eager imports for SSR (no lazy loading)
import Index from "./pages/Index";
import CarShippingCalculator from "./pages/CarShippingCalculator";
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
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import StateShipping from "./pages/StateShipping";
import CarShippingStates from "./pages/CarShippingStates";
import NotFound from "./pages/NotFound";

function ServerRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/car-shipping-calculator" element={<CarShippingCalculator />} />
      <Route path="/quote" element={<Navigate to="/car-shipping-calculator" replace />} />
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
      <Route path="/car-shipping-states" element={<CarShippingStates />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      <Route path="/car-shipping/:stateName" element={<StateShipping />} />
      {states.map((s) => (
        <Route key={s.slug} path={`/${s.slug}`} element={<StateShipping />} />
      ))}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export async function render(url: string): Promise<{ html: string; head: string }> {
  const queryClient = new QueryClient();
  const helmetContext = {} as any;

  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <StaticRouter location={url}>
            <ServerRoutes />
          </StaticRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );

  const { helmet } = helmetContext;

  return {
    html,
    head: [
      helmet?.title?.toString() || "",
      helmet?.meta?.toString() || "",
      helmet?.link?.toString() || "",
    ]
      .filter(Boolean)
      .join("\n"),
  };
}
