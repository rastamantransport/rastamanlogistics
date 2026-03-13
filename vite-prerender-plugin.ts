import { Plugin, ResolvedConfig } from "vite";
import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";

// -----------------------------------------------------------------------------
//   CONFIGURATION
// -----------------------------------------------------------------------------

const FALLBACK_ROUTES = ["/", "/404"];

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

const ENTRY_SERVER = "src/entry-server.tsx";

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

      // Dynamic imports to avoid breaking dev server
      const cheerio = await import("cheerio");
      const linkedom = await import("linkedom");

      // Setup polyfills
      const { parseHTML } = linkedom;
      const { document, window } = parseHTML(
        `<!DOCTYPE html><html><head></head><body><div id="root"></div></body></html>`
      );

      (global as any).window = window;
      (global as any).document = document;
      (global as any).navigator = (window as any).navigator ?? { userAgent: "" };
      (global as any).location = (window as any).location ?? { href: "", pathname: "/" };
      (global as any).history = (window as any).history ?? { pushState: () => {}, replaceState: () => {} };
      (global as any).localStorage = { getItem: () => null, setItem: () => {}, removeItem: () => {}, clear: () => {} };
      (global as any).sessionStorage = { getItem: () => null, setItem: () => {}, removeItem: () => {}, clear: () => {} };

      (window as any).matchMedia = () => ({ matches: false, addListener: () => {}, removeListener: () => {} });
      (window as any).requestAnimationFrame = (cb: any) => setTimeout(cb, 0);
      (window as any).cancelAnimationFrame = (id: any) => clearTimeout(id);

      class FakeObserver { observe() {} unobserve() {} disconnect() {} }
      (window as any).MutationObserver = FakeObserver;
      (window as any).ResizeObserver = FakeObserver;
      (window as any).IntersectionObserver = FakeObserver;

      console.log("[prerender] Polyfills applied");

      const outDir = path.resolve(config.root, config.build.outDir || "dist");
      const templatePath = path.join(outDir, "index.html");

      if (!fs.existsSync(templatePath)) {
        console.warn("[prerender] No dist/index.html found, skipping.");
        return;
      }

      const template = fs.readFileSync(templatePath, "utf-8");

      // Build SSR bundle
      const { build } = await import("vite");
      const ssrConfig: any = {
        root: config.root,
        base: config.base,
        publicDir: false,
        plugins: [],
        build: {
          ssr: true,
          outDir: path.join(outDir, ".ssr-temp"),
          rollupOptions: {
            input: path.resolve(config.root, ENTRY_SERVER),
          },
          emptyOutDir: false,
        },
        resolve: config.resolve,
        logLevel: "warn" as const,
      };
      await build(ssrConfig);

      const ssrOutDir = path.join(outDir, ".ssr-temp");
      const entryPath = path.join(ssrOutDir, "entry-server.js");
      const entryUrl = pathToFileURL(entryPath).href;

      let render: (url: string) => Promise<{ html: string; head?: string }>;
      try {
        const mod = await import(entryUrl);
        render = mod.render;
      } catch (err) {
        console.error("[prerender] Failed to load SSR entry:", err);
        return;
      }

      // Collect routes
      let routes: string[] = [];
      try {
        const { routeConfig } = await import(path.resolve(config.root, "src/routes.tsx"));
        routes = routeConfig.map((r: { path: string }) => r.path).filter(Boolean);
      } catch {
        console.warn("[prerender] Could not load src/routes.tsx, using fallbacks");
      }

      routes = [...new Set([...routes, ...FALLBACK_ROUTES, ...STATE_ROUTES])];
      console.log(`[prerender] Prerendering ${routes.length} routes...`);

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

      fs.rmSync(ssrOutDir, { recursive: true, force: true });
      console.log(`[prerender] Done in ${Date.now() - start}ms`);
    },
  };
}
