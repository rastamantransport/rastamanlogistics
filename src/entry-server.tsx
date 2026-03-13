import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Eager imports for SSR — no lazy loading
import Index from "./pages/Index";
import CarShippingCalculator from "./pages/CarShippingCalculator";
import Services from "./pages/Services";
import OpenAutoTransport from "./pages/OpenAutoTransport";
import EnclosedAutoTransport from "./pages/EnclosedAutoTransport";
import DoorToDoorShipping from "./pages/DoorToDoorShipping";
import ExpeditedCarShipping from "./pages/ExpeditedCarShipping";
import HowItWorks from "./pages/HowItWorks";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Reviews from "./pages/Reviews";

const SSRRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/car-shipping-calculator" element={<CarShippingCalculator />} />
    <Route path="/quote" element={<Navigate to="/car-shipping-calculator" replace />} />
    <Route path="/services" element={<Services />} />
    <Route path="/open-auto-transport" element={<OpenAutoTransport />} />
    <Route path="/enclosed-auto-transport" element={<EnclosedAutoTransport />} />
    <Route path="/door-to-door-shipping" element={<DoorToDoorShipping />} />
    <Route path="/expedited-car-shipping" element={<ExpeditedCarShipping />} />
    <Route path="/how-it-works" element={<HowItWorks />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/reviews" element={<Reviews />} />
  </Routes>
);

export function render(url: string) {
  const queryClient = new QueryClient();
  const helmetContext: Record<string, unknown> = {};

  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <QueryClientProvider client={queryClient}>
        <StaticRouter location={url}>
          <SSRRoutes />
        </StaticRouter>
      </QueryClientProvider>
    </HelmetProvider>
  );

  const helmet = helmetContext.helmet as
    | Record<string, { toString(): string }>
    | undefined;
  const head = helmet
    ? [
        helmet.title?.toString() ?? "",
        helmet.meta?.toString() ?? "",
        helmet.link?.toString() ?? "",
        helmet.script?.toString() ?? "",
      ]
        .filter(Boolean)
        .join("\n")
    : "";

  return { html, head };
}
