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
] as const;

// Redirect config
export const redirects = [
  { from: "/quote", to: "/car-shipping-calculator" },
] as const;

// State pages use dynamic route patterns
export const stateRoutePatterns = [
  "/car-shipping/:stateName",
  "/:stateSlug",
] as const;
