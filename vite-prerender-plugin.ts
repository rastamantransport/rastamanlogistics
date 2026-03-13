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
  "/404",
];

/**
 * Maps a route to its output file path relative to outDir.
 * "/" => "index.html"
 * "/404" => "404.html"
 * "/about" => "about/index.html"
 * "/car-shipping-texas" => "car-shipping-texas/index.html"
 */
function routeToFilePath(route: string): string {
  if (route === "/") return "index.html";
  if (route === "/404") return "404.html";
  const segment = route.slice(1); // remove leading "/"
  return `${segment}/index.html`;
}

/**
 * Minimal browser globals needed for SSR rendering.
 * Avoids brittle full DOM mocks — only stubs what React and common libs actually touch.
 */
function setupMinimalGlobals() {
  const noop = () => {};
  const noopObj = () => ({});

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
    appendChild: () => mockElement,
    removeChild: () => mockElement,
    classList: { add: noop, remove: noop, contains: () => false, toggle: noop },
    addEventListener: noop,
    removeEventListener: noop,
    innerHTML: "",
    textContent: "",
    children: [],
    childNodes: [],
    querySelectorAll: () => [],
    querySelector: () => null,
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
    location: {
      href: "/",
      pathname: "/",
      search: "",
      hash: "",
      origin: "https://rastamanlogistics.com",
    },
    history: { pushState: noop, replaceState: noop, back: noop },
    navigator: { userAgent: "node", language: "en-US", languages: ["en-US"] },
    screen: { width: 1280, height: 800 },
    addEventListener: noop,
    removeEventListener: noop,
    dispatchEvent: () => true,
    getComputedStyle: () => ({
      getPropertyValue: () => "",
      setProperty: noop,
    }),
    matchMedia: () => ({
      matches: false,
      addListener: noop,
      removeListener: noop,
      addEventListener: noop,
      removeEventListener: noop,
    }),
    scrollTo: noop,
    scrollX: 0,
    scrollY: 0,
    innerWidth: 1280,
    innerHeight: 800,
    requestAnimationFrame: (cb: () => void) => setTimeout(cb, 0),
    cancelAnimationFrame: (id: number) => clearTimeout(id),
    setTimeout,
    clearTimeout,
    setInterval,
    clearInterval,
    console,
    CSS: { supports: () => false },
    CustomEvent: class CustomEvent {
      constructor() {}
    },
    Event: class Event {
      constructor() {}
    },
    MutationObserver: class MutationObserver {
      observe() {}
      disconnect() {}
      takeRecords() {
        return [];
      }
    },
    ResizeObserver: class ResizeObserver {
      observe() {}
      disconnect() {}
      unobserve() {}
    },
    IntersectionObserver: class IntersectionObserver {
      observe() {}
      disconnect() {}
      unobserve() {}
    },
  };

  const safeSet = (obj: any, key: string, value: any) => {
    try {
      obj[key] = value;
    } catch {
      Object.defineProperty(obj, key, { value, writable: true, configurable: true });
    }
  };

  safeSet(global, "window", mockWindow);
  safeSet(global, "document", mockDocument);
  safeSet(global, "localStorage", mockStorage);
  safeSet(global, "sessionStorage", mockStorage);
  safeSet(global, "navigator", mockWindow.navigator);
  safeSet(global, "location", mockWindow.location);
  safeSet(global, "history", mockWindow.history);
  safeSet(global, "CustomEvent", mockWindow.CustomEvent);
  safeSet(global, "Event", mockWindow.Event);
  safeSet(global, "MutationObserver", mockWindow.MutationObserver);
  safeSet(global, "ResizeObserver", mockWindow.ResizeObserver);
  safeSet(global, "IntersectionObserver", mockWindow.IntersectionObserver);
  safeSet(global, "matchMedia", mockWindow.matchMedia);
  safeSet(global, "getComputedStyle", mockWindow.getComputedStyle);
  safeSet(global, "requestAnimationFrame", mockWindow.requestAnimationFrame);
  safeSet(global, "cancelAnimationFrame", mockWindow.cancelAnimationFrame);
}

const PLUGIN_NAME = "vite-prerender-plugin";

export default function prerenderPlugin(): Plugin {
  let config: ResolvedConfig;

  return {
    name: PLUGIN_NAME,
    apply: "build",

    configResolved(resolvedConfig) {
      config = resolvedConfig;
    },

    async closeBundle() {
      // Skip when building the SSR bundle itself
      if (config.build.ssr) return;

      const outDir = path.resolve(config.root, config.build.outDir || "dist");
      const templatePath = path.join(outDir, "index.html");
      const ssrOutDir = path.join(outDir, ".ssr-temp");

      if (!fs.existsSync(templatePath)) {
        console.warn("[prerender] No dist/index.html found, skipping.");
        return;
      }

      const template = fs.readFileSync(templatePath, "utf-8");

      try {
        // Step 1: Build SSR bundle, filtering out THIS plugin to avoid recursion
        setupMinimalGlobals();

        const { build } = await import("vite");
        await build({
          root: config.root,
          resolve: config.resolve,
          plugins: config.plugins.filter((p) => p.name !== PLUGIN_NAME),
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

        // Step 2: Find the SSR entry output file
        const possibleNames = ["entry-server.js", "entry-server.mjs"];
        let entryFile: string | null = null;
        for (const name of possibleNames) {
          const candidate = path.join(ssrOutDir, name);
          if (fs.existsSync(candidate)) {
            entryFile = candidate;
            break;
          }
        }

        if (!entryFile) {
          // Fallback: find any .js/.mjs file
          const files = fs.readdirSync(ssrOutDir);
          const jsFile = files.find(
            (f) => f.endsWith(".js") || f.endsWith(".mjs")
          );
          if (jsFile) {
            entryFile = path.join(ssrOutDir, jsFile);
          }
        }

        if (!entryFile) {
          console.error("[prerender] Could not find SSR entry output. Skipping.");
          return;
        }

        // Step 3: Import and validate the render function
        const entryUrl = pathToFileURL(entryFile).href;
        const ssrModule = await import(entryUrl);

        if (typeof ssrModule.render !== "function") {
          console.error(
            "[prerender] SSR module does not export a render function. Skipping."
          );
          return;
        }

        const { render } = ssrModule;

        // Step 4: Render routes sequentially to avoid shared global state issues
        console.log(`[prerender] Prerendering ${ROUTES.length} routes...`);
        let success = 0;
        let failed = 0;

        for (const route of ROUTES) {
          try {
            const result = await render(route);
            const appHtml = result.html || "";
            const head = result.head || "";

            let finalHtml = template.replace(
              '<div id="root"></div>',
              `<div id="root">${appHtml}</div>`
            );

            if (head) {
              finalHtml = finalHtml.replace("</head>", `${head}\n</head>`);
            }

            const relPath = routeToFilePath(route);
            const filePath = path.join(outDir, relPath);
            const dir = path.dirname(filePath);

            if (!fs.existsSync(dir)) {
              fs.mkdirSync(dir, { recursive: true });
            }

            fs.writeFileSync(filePath, finalHtml);
            console.log(`[prerender] ✓ ${route} → ${relPath}`);
            success++;
          } catch (err) {
            console.error(`[prerender] ✗ ${route}:`, err);
            failed++;
          }
        }

        console.log(
          `[prerender] Done. ${success} succeeded, ${failed} failed.`
        );
      } finally {
        // Always clean up SSR temp directory
        if (fs.existsSync(ssrOutDir)) {
          fs.rmSync(ssrOutDir, { recursive: true, force: true });
        }
      }
    },
  };
}
