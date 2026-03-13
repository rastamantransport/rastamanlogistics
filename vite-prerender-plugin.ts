
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
  // State landing pages
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
  const mockLocalStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    clear: () => {},
    length: 0,
    key: () => null,
  };

  const mockElement = {
    style: {},
    setAttribute: () => {},
    getAttribute: () => null,
    appendChild: () => {},
    removeChild: () => {},
    classList: { add: () => {}, remove: () => {}, contains: () => false, toggle: () => {} },
    addEventListener: () => {},
    removeEventListener: () => {},
    innerHTML: '',
    textContent: '',
    children: [],
    childNodes: [],
  };

  const mockDocument = {
    cookie: '',
    querySelector: () => null,
    querySelectorAll: () => [],
    getElementsByTagName: () => [],
    getElementsByClassName: () => [],
    getElementById: () => null,
    createElement: () => ({ ...mockElement }),
    createTextNode: () => ({}),
    createElementNS: () => ({ ...mockElement }),
    head: { appendChild: () => {}, removeChild: () => {}, children: [], querySelectorAll: () => [], querySelector: () => null, getElementsByTagName: () => [] },
    body: { appendChild: () => {}, removeChild: () => {}, style: {}, children: [] },
    documentElement: {
      style: {},
      setAttribute: () => {},
      getAttribute: () => null,
      lang: 'en',
      classList: { add: () => {}, remove: () => {}, contains: () => false },
    },
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => true,
    readyState: 'complete',
  };

  const mockWindow = {
    document: mockDocument,
    localStorage: mockLocalStorage,
    sessionStorage: mockLocalStorage,
    location: { href: '/', pathname: '/', search: '', hash: '', origin: 'https://rastamanlogistics.com' },
    history: { pushState: () => {}, replaceState: () => {}, back: () => {} },
    navigator: { userAgent: 'node', language: 'en-US', languages: ['en-US'] },
    screen: { width: 1280, height: 800 },
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => true,
    getComputedStyle: () => ({ getPropertyValue: () => '', setProperty: () => {} }),
    matchMedia: () => ({ matches: false, addListener: () => {}, removeListener: () => {}, addEventListener: () => {}, removeEventListener: () => {} }),
    scrollTo: () => {},
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
  (global as any).localStorage = mockLocalStorage;
  (global as any).sessionStorage = mockLocalStorage;
  Object.defineProperty(global, 'navigator', { value: mockWindow.navigator, writable: true, configurable: true });
  Object.defineProperty(global, 'location', { value: mockWindow.location, writable: true, configurable: true });
  Object.defineProperty(global, 'history', { value: mockWindow.history, writable: true, configurable: true });
  (global as any).CustomEvent = mockWindow.CustomEvent;
  (global as any).Event = mockWindow.Event;
  (global as any).MutationObserver = mockWindow.MutationObserver;
  (global as any).ResizeObserver = mockWindow.ResizeObserver;
  (global as any).IntersectionObserver = mockWindow.IntersectionObserver;
  (global as any).matchMedia = mockWindow.matchMedia;
  (global as any).getComputedStyle = mockWindow.getComputedStyle;
  (global as any).requestAnimationFrame = mockWindow.requestAnimationFrame;
  (global as any).cancelAnimationFrame = mockWindow.cancelAnimationFrame;
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
      if (!fs.existsSync(templatePath)) {
        console.warn("[prerender] No dist/index.html found, skipping.");
        return;
      }
      const template = fs.readFileSync(templatePath, "utf-8");

      const { build } = await import("vite");
      await build({
        root: config.root,
        resolve: config.resolve,
        plugins: [],
        build: {
          ssr: true,
          outDir: path.join(outDir, ".ssr-temp"),
          rollupOptions: {
            input: path.resolve(config.root, "src/entry-server.tsx"),
          },
          emptyOutDir: false,
        },
        logLevel: "warn",
      });

      const ssrOutDir = path.join(outDir, ".ssr-temp");
      const entryPath = path.join(ssrOutDir, "entry-server.js");
      const entryUrl = pathToFileURL(entryPath).href;
      const { render } = await import(entryUrl);

      console.log(`[prerender] Prerendering ${ROUTES.length} routes...`);
      for (const route of ROUTES) {
        try {
          const { html: appHtml, head } = render(route);
          let finalHtml = template;
          finalHtml = finalHtml.replace(
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
          const filePath =
  route === "/"
    ? path.join(outDir, "index.html")
    : path.join(outDir, route.slice(1) + ".html");
const dir = path.dirname(filePath);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}
fs.writeFileSync(filePath, finalHtml);
          console.log(`[prerender] ✓ ${route}`);
        } catch (err) {
          console.error(`[prerender] ✗ ${route}:`, err);
        }
      }

      fs.rmSync(ssrOutDir, { recursive: true, force: true });
      console.log("[prerender] Done.");
    },
  };
}
