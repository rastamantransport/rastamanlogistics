import { Plugin, ResolvedConfig } from "vite";
import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";
import * as cheerio from "cheerio";
import { Window } from "linkedom"; // No Document needed, Window provides it

// -----------------------------------------------------------------------------
//   CONFIGURATION
// -----------------------------------------------------------------------------

// Fallback hardcoded routes (your originals minus states for now)
const FALLBACK_ROUTES = ["/", "/404"];

// Hardcoded state routes (from your original ROUTES—move to dynamic if possible)
const STATE_ROUTES = [
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
  // Base mock document (linkedom provides a lightweight DOM)
  const { window, document } = new Window(
    `<!DOCTYPE html><html><head></head><body><div id="root"></div></body></html>`,
    { url: "https://rastamanlogistics.vercel.app" } // Match your origin
  );

  // Expose globals
  (global as any).window = window;
  (global as any).document = document;
  (global as any).navigator = window.navigator;
  (global as any).location = window.location;
  (global as any).history = window.history;
  (global as any).localStorage = { getItem: () => null, setItem: () => {}, removeItem: () => {}, clear: () => {} };
  (global as any).sessionStorage = { getItem: () => null, setItem: () => {}, removeItem: () => {}, clear: () => {} };

  // Extras for common libs (React Query, Helmet, etc.)
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

  console.log("[prerender] Polyfills applied (linkedom + extras for Helmet/Query/Router)");
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
            input: path.resolve(config.root, ENTRY_SERVER),
          },
          emptyOutDir: false,
        },
        logLevel: "warn",
      });

      const ssrOutDir = path.join(outDir, ".ssr-temp");
      const entryPath = path.join(ssrOutDir, "entry-server.js"); // Vite outputs .js
      const entryUrl = pathToFileURL(entryPath).href;

      let render: (url: string) => Promise<{ html: string; head?: string }>;
      try {
        const mod = await import(entryUrl);
        render = mod.render; // Matches your export
      } catch (err) {
        console.error("[prerender] Failed to load SSR entry:", err);
        return;
      }

      // Collect routes dynamically
      let routes: string[] = [];
      try {
        const { routeConfig } = await import(path.resolve(config.root, "src/routes.tsx"));
        routes = routeConfig.map((r: { path: string }) => r.path).filter(Boolean);
        console.log("[prerender] Loaded dynamic routes from src/routes.tsx");
      } catch (err) {
        console.warn("[prerender] Failed to load src/routes.tsx:", err);
      }

      // Merge with fallbacks and states
      routes = [...new Set([...routes, ...FALLBACK_ROUTES, ...STATE_ROUTES])]; // Dedupe

      console.log(`[prerender] Prerendering ${routes.length} routes...`);

      // Render loop
      for (const route of routes) {
        try {
          const timer = Date.now();
          const { html: appHtml, head = "" } = await render(route);

          const $ = cheerio.load(template);
          $("#root").html(appHtml);
          if (head) $("head").append(head);

          let filePath = route === "/" ? "index.html" : `${route.slice(1)}/index.html`;
          if (route === "/404") filePath = "404.html";

          const dir = path.join(outDir, path.dirname(filePath));
          if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

          fs.writeFileSync(path.join(outDir, filePath), $.html(), "utf-8");
          console.log(`[prerender] ✓ ${route} (${Date.now() - timer}ms)`);
        } catch (err) {
          console.error(`[prerender] ✗ ${route}:`, err);
        }
      }

      // For faster builds: await Promise.all(routes.map(async (route) => { ... }));

      // Cleanup
      fs.rmSync(ssrOutDir, { recursive: true, force: true });

      console.log(`[prerender] Done in ${Date.now() - start}ms`);
    },
  };
}
