import { lazy } from "react";

// Eagerly loaded for SSR, lazily loaded for client — consumers choose
export const routeConfig = [
  { path: "/", component: "Index" },
  { path: "/car-shipping-calculator", component: "CarShippingCalculator" },
  { path: "/services", component: "Services" },
  { path: "/open-auto-transport", component: "OpenAutoTransport" },
  { path: "/enclosed-auto-transport", component: "EnclosedAutoTransport" },
  { path: "/door-to-door-shipping", component: "DoorToDoorShipping" },
  { path: "/expedited-car-shipping", component: "ExpeditedCarShipping" },
  { path: "/gallery", component: "Gallery" },
  { path: "/how-it-works", component: "HowItWorks" },
  { path: "/about", component: "About" },
  { path: "/contact", component: "Contact" },
  { path: "/reviews", component: "Reviews" },
  { path: "/blog", component: "Blog" },
] as const;

// Redirect config
export const redirects = [
  { from: "/quote", to: "/car-shipping-calculator" },
] as const;

// State pages use explicit routes per state slug (from src/data/states.ts)
// The broad /:stateSlug catch-all has been removed to prevent unintended matches.
// A /car-shipping/:stateName dynamic route is kept for backward compatibility.
