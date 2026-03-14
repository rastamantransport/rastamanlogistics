import { Plugin, ResolvedConfig } from "vite";
import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";

const ROUTES = [
  "/",
  "/services",
  "/open-auto-transport",
  "/enclosed-auto-transport",
  "/door-to-door-shipping",
  "/expedited-car-shipping",
  "/car-shipping-calculator",
  "/how-it-works",
  "/about",
  "/reviews",
  "/contact",
  "/blog",
  "/blog/how-to-prepare-your-car-for-shipping",
  "/blog/open-vs-enclosed-auto-transport",
  "/blog/how-much-does-it-cost-to-ship-a-car",
  "/blog/questions-to-ask-auto-transport-broker",
  "/blog/snowbird-season-shipping-car-to-florida",
  "/blog/what-to-know-about-door-to-door-vehicle-delivery",
  "/car-shipping-alabama",
  "/car-shipping-arizona",
  "/car-shipping-arkansas",
  "/car-shipping-california",
  "/car-shipping-colorado",
  "/car-shipping-connecticut",
  "/car-shipping-delaware",
  "/car-shipping-florida",
  "/car-shipping-georgia",
  "/car-shipping-idaho",
  "/car-shipping-illinois",
  "/car-shipping-indiana",
  "/car-shipping-iowa",
  "/car-shipping-kansas",
  "/car-shipping-kentucky",
  "/car-shipping-louisiana",
  "/car-shipping-maine",
  "/car-shipping-maryland",
  "/car-shipping-massachusetts",
  "/car-shipping-michigan",
  "/car-shipping-minnesota",
  "/car-shipping-mississippi",
  "/car-shipping-missouri",
  "/car-shipping-montana",
  "/car-shipping-nebraska",
  "/car-shipping-nevada",
  "/car-shipping-new-hampshire",
  "/car-shipping-new-jersey",
  "/car-shipping-new-mexico",
  "/car-shipping-new-york",
  "/car-shipping-north-carolina",
  "/car-shipping-north-dakota",
  "/car-shipping-ohio",
  "/car-shipping-oklahoma",
  "/car-shipping-oregon",
  "/car-shipping-pennsylvania",
  "/car-shipping-rhode-island",
  "/car-shipping-south-carolina",
  "/car-shipping-south-dakota",
  "/car-shipping-tennessee",
  "/car-shipping-texas",
  "/car-shipping-utah",
  "/car-shipping-vermont",
  "/car-shipping-virginia",
  "/car-shipping-washington",
  "/car-shipping-west-virginia",
  "/car-shipping-wisconsin",
  "/car-shipping-wyoming",
];

function setupPolyfills() {
  const noop = () => {};

  const mockStorage = {
    getItem: () => null,
    setItem: noop,
    removeItem: noop,
    clear: noop,
    length: 0,
    key: () => null,
  };

  const mockElement: any = {
    style: {},
    setAttribute: noop,
    getAttribute: () => null,
    appendChild: noop,
    removeChild: noop,
    classList: { add: noop, remove: noop, contains: () => false, toggle: noop },
    addEventListener: noop,
    removeEventListener: noop,
    innerHTML: "",
    textContent: "",
    children: [],
    childNodes: [],
    querySelectorAll: () => [],
    querySelector: () => null,
    getElementsByTagName: () => [],
  };

  const mockDocument = {
    cookie: "",
    querySelector: () => null,
    querySelectorAll: () => [],
    getElementsByTagName: () => [],
    getElementsByClassName: () => [],
    getElementById: () => null,
    createElement: () => ({ ...mockElement }),
    createTextNode: () => ({}),
    createElementNS: () => ({ ...mockElement }),
    head: { ...mockElement },
    body: { ...mockElement, style: {} },
    documentElement: {
      style: {},
      setAttribute: noop,
      getAttribute: () => null,
      lang: "en",
      classList: { add: noop, remove: noop, contains: () => false },
    },
    addEventListener: noop,
    removeEventListener: noop,
    dispatchEvent: () => true,
    readyState: "complete",
  };

  const mockWindow: any = {
    document: mockDocument,
    localStorage: mockStorage,
    sessionStorage: mockStorage,
    location: { href: "/", pathname: "/", search: "", hash: "", origin: "https://rastamanlogistics.com" },
    history: { pushState: noop, replaceState: noop, back: noop },
    navigator: { userAgent: "node", language: "en-US", languages: ["en-US"] },
    screen: { width: 1280, height: 800 },
    addEventListener: noop,
    removeEventListener: noop,
    dispatchEvent: () => true,
    getComputedStyle: () => ({ getPropertyValue: () => "", setProperty: noop }),
    matchMedia: () => ({ matches: false, addListener: noop, removeListener: noop, addEventListener: noop, removeEventListener: noop }),
    scrollTo: noop,
    scrollX: 0,
    scrollY: 0,
    innerWidth: 1280,
    innerHeight: 800,
    requestAnimationFrame: (cb: any) => setTimeout(cb, 0),
    cancelAnimationFrame: (id: any) => clearTimeout(id),
    setTimeout,
    clearTimeout,
    setInterval,
    clearInterval,
    console,
    CSS: { supports: () => false },
    CustomEvent: class CustomEvent { constructor() {} },
    Event: class Event { constructor() {} },
    MutationObserver: class MutationObserver { observe() {} disconnect() {} takeRecords() { return []; } },
    ResizeObserver: class ResizeObserver { observe() {} disconnect() {} unobserve() {} },
    IntersectionObserver: class IntersectionObserver { observe() {} disconnect() {} unobserve() {} },
  };

  (global as any).window = mockWindow;
  (global as any).document = mockDocument;
  (global as any).localStorage = mockStorage;
  (global as any).sessionStorage = mockStorage;
  (global as any).CustomEvent = mockWindow.CustomEvent;
  (global as any).Event = mockWindow.Event;
  (global as any).MutationObserver = mockWindow.MutationObserver;
  (global as any).ResizeObserver = mockWindow.ResizeObserver;
  (global as any).IntersectionObserver = mockWindow.IntersectionObserver;
  (global as any).matchMedia = mockWindow.matchMedia;
  (global as any).getComputedStyle = mockWindow.getComputedStyle;
  (global as any).requestAnimationFrame = mockWindow.requestAnimationFrame;
  (global as any).cancelAnimationFrame = mockWindow.cancelAnimationFrame;

  Object.defineProperty(global, "navigator", { value: mockWindow.navigator, writable: true, configurable: true });
  Object.defineProperty(global, "location", { value: mockWindow.location, writable: true, configurable: true });
  Object.defineProperty(global, "history", { value: mockWindow.history, writable: true, configurable: true });
}

export default function prerenderPlugin(): Plugin {
  let config: ResolvedConfig;

  return {
    name: "vite-prerender-plugin",
    apply: "build",

    configResolved(resolvedConfig) {
      config = resolvedConfig;
    },

    async closeBundle() {
      if (config.build.ssr) return;

      setupPolyfills();

      const outDir = path.resolve(config.root, config.build.outDir || "dist");
      const templatePath = path.join(outDir, "index.html");
      const ssrOutDir = path.join(outDir, ".ssr-temp");

      if (!fs.existsSync(templatePath)) {
        console.warn("[prerender] No dist/index.html found, skipping.");
        return;
      }

      const template = fs.readFileSync(templatePath, "utf-8");

      try {
        const { build } = await import("vite");
        await build({
          root: config.root,
          resolve: config.resolve,
          plugins: [],
          build: {
            ssr: true,
            outDir: ssrOutDir,
            rollupOptions: {
              input: path.resolve(config.root, "src/entry-server.tsx"),
            },
            emptyOutDir: true,
          },
          logLevel: "warn",
        });

        const entryPath = path.join(ssrOutDir, "entry-server.js");
        const entryUrl = pathToFileURL(entryPath).href;
        const { render } = await import(entryUrl);

        console.log(`[prerender] Prerendering ${ROUTES.length} routes...`);
        let success = 0;
        let failed = 0;

        for (const route of ROUTES) {
          try {
           const { html: appHtml, head } = await render(route);
            let finalHtml = template.replace(
              '<div id="root"></div>',
              `<div id="root">${appHtml}</div>`
            );
            if (head) {
              finalHtml = finalHtml.replace("</head>", `${head}\n</head>`);
            }
            const filePath =
              route === "/"
                ? path.join(outDir, "index.html")
                : path.join(outDir, route.slice(1), "index.html");
            const dir = path.dirname(filePath);
            if (!fs.existsSync(dir)) {
              fs.mkdirSync(dir, { recursive: true });
            }
            fs.writeFileSync(filePath, finalHtml);
            console.log(`[prerender] ✓ ${route}`);
            success++;
          } catch (err) {
            console.error(`[prerender] ✗ ${route}:`, err);
            failed++;
          }
        }

        console.log(`[prerender] Done. ${success} succeeded, ${failed} failed.`);
      } finally {
        if (fs.existsSync(ssrOutDir)) {
          fs.rmSync(ssrOutDir, { recursive: true, force: true });
        }
      }
    },
  };
}
