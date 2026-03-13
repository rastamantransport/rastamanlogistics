import { Plugin, ResolvedConfig } from "vite";
import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";
import * as cheerio from "cheerio";
import { parseHTML } from "linkedom"; // Correct import for linkedom

// -----------------------------------------------------------------------------
//   CONFIGURATION
// -----------------------------------------------------------------------------

// Fallback hardcoded routes (your originals minus states for now)
const FALLBACK_ROUTES = ["/", "/404"];

// Fallback hardcoded state routes (in case dynamic import fails)
const FALLBACK_STATE_ROUTES = [
  "/car-shipping-alabama", "/car-shipping-arizona", "/car-shipping-arkansas",
  "/car-shipping-california", "/car-shipping-colorado", "/car-shipping-connecticut",
  "/car-shipping-delaware", "/car-shipping-florida", "/car-shipping-georgia",
  "/car-shipping-idaho", "/car-shipping-illinois", "/car-shipping-indiana",
  "/car-shipping-iowa", "/car-shipping-kansas", "/car-shipping-kentucky",
  "/car-shipping-louisiana", "/car-shipping-maine", "/car-shipping-maryland",
  "/car-shipping-massachusetts", "/car-shipping-michigan", "/car-shipping-minnesota",
  "/car-shipping-mississippi", "/car-shipping-missouri", "/car-shipping-montana",
  "/car-shipping-nebraska", "/car-shipping-nevada", "/car-shipping-new-hampshire",
  "/car-shipping-new-jersey", "/car-shipping-new-mexico", "/car-shipping-new-york",
  "/car-shipping-north-carolina", "/car-shipping-north-dakota", "/car-shipping-ohio",
  "/car-shipping-oklahoma", "/car-shipping-oregon", "/car-shipping-pennsylvania",
  "/car-shipping-rhode-island", "/car-shipping-south-carolina", "/car-shipping-south-dakota",
  "/car-shipping-tennessee", "/car-shipping-texas", "/car-shipping-utah",
  "/car-shipping-vermont", "/car-shipping-virginia", "/car-shipping-washington",
  "/car-shipping-west-virginia", "/car-shipping-wisconsin", "/car-shipping-wyoming",
];

// Your server entry
const ENTRY_SERVER = "src/entry-server.tsx";

// -----------------------------------------------------------------------------
//   IMPROVED POLYFILLS (linkedom-based)
// -----------------------------------------------------------------------------

function setupPolyfills() {
  // Use parseHTML to create window and document (correct linkedom API)
  const { window, document } = parseHTML(
    `<!DOCTYPE html><html><head></head><body><div id="root"></div></body></html>`
  );

  // Expose globals safely (use defineProperty to override read-only ones like navigator)
  (global as any).window = window;
  (global as any).document = document;
  (global as any).localStorage = { getItem: () => null, setItem: () => {}, removeItem: () => {}, clear: () => {} };
  (global as any).sessionStorage = { getItem: () => null, setItem: () => {}, removeItem: () => {}, clear: () => {} };

  // Safe override for navigator (Vercel/Node 20+ has read-only version)
  Object.defineProperty(global, 'navigator', {
    value: window.navigator,
    writable: true,
    configurable: true,
  });

  // Same for location and history (prevents similar future errors)
  Object.defineProperty(global, 'location', {
    value: window.location,
    writable: true,
    configurable: true,
  });
  Object.defineProperty(global, 'history', {
    value: window.history,
    writable: true,
    configurable: true,
  });

  // Extras for common libs (React Query, Helmet, Router)
  window.CustomEvent = class CustomEvent extends Event {
    detail: any;
    constructor(type: string, eventInitDict?: CustomEventInit) {
      super(type, eventInitDict);
      this.detail = eventInitDict?.detail ?? null;
    }
  } as any;

  window.getComputedStyle = (elt: Element) => ({
    getPropertyValue: (prop: string) => "",
  } as CSSStyleDeclaration);

  class FakeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  window.MutationObserver = FakeObserver as any;
  window.ResizeObserver = FakeObserver as any;
  window.IntersectionObserver = FakeObserver as any;

  window.matchMedia = () => ({ matches: false, addListener: () => {}, removeListener: () => {} }) as any;
  window.requestAnimationFrame = (cb: any) => setTimeout(cb, 0);
  window.cancelAnimationFrame = (id: any) => clearTimeout(id);

  console.log("[prerender] Polyfills applied (linkedom + safe overrides for Vercel/Node)");
}

// -----------------------------------------------------------------------------
//   PLUGIN
// -----------------------------------------------------------------------------

export default function prerenderPlugin(): Plugin {
  let config: ResolvedConfig;

  return {
    name: "vite-prerender-plugin-improved",
    apply: "build",
    configResolved(resolvedConfig) {
      config = resolvedConfig;
    },
    async closeBundle() {
      if (config.build.ssr) return;

      const start = Date.now();
      console.log("[prerender] Starting...");

      setupPolyfills();

      const outDir = path.resolve(config.root, config.build.outDir || "dist");
      const templatePath = path.join(outDir, "index.html");

      if (!fs.existsSync(templatePath)) {
        console.warn("[prerender] No dist/index.html found, skipping.");
        return;
      }

      const template = fs.readFileSync(templatePath, "utf-8");

      // Build SSR bundle
      const { build } = await import("vite");
      await build({
        ...config, // Reuse full config
        plugins: [], // Avoid recursion
        build: {
          ...config.build,
          ssr: true,
          outDir: path.join(outDir, ".ssr-temp"),
          rollupOptions: {
            input: path.resolve(config.root
