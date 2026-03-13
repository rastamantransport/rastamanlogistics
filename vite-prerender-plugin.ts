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
];

export default function prerenderPlugin(): Plugin {
  let config: ResolvedConfig;

  return {
    name: "vite-prerender-plugin",
    apply: "build",

    configResolved(resolvedConfig) {
      config = resolvedConfig;
    },

    async closeBundle() {
      // Only run for the client build (skip if SSR build)
      if (config.build.ssr) return;

      // Polyfill browser globals for SSR
(global as any).window = { localStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {}, clear: () => {} } };
(global as any).localStorage = (global as any).window.localStorage;
(global as any).document = { cookie: '', querySelector: () => null };

      const outDir = path.resolve(config.root, config.build.outDir || "dist");
      const templatePath = path.join(outDir, "index.html");

      if (!fs.existsSync(templatePath)) {
        console.warn("[prerender] No dist/index.html found, skipping.");
        return;
      }

      const template = fs.readFileSync(templatePath, "utf-8");

      // Build the server entry
      const { build } = await import("vite");
      const ssrResult = await build({
        root: config.root,
        resolve: config.resolve,
        plugins: [], // minimal plugins for SSR
        build: {
          ssr: true,
          outDir: path.join(outDir, ".ssr-temp"),
          rollupOptions: {
            input: path.resolve(config.root, "src/entry-server.tsx"),
          },
          // Don't empty outDir since it's inside dist
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

          // Inject rendered HTML into the root div
          finalHtml = finalHtml.replace(
            '<div id="root"></div>',
            `<div id="root">${appHtml}</div>`
          );

          // Inject head tags before </head>
          if (head) {
            finalHtml = finalHtml.replace("</head>", `${head}\n</head>`);
          }

          // Write the file
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
        } catch (err) {
          console.error(`[prerender] ✗ ${route}:`, err);
        }
      }

      // Cleanup temp SSR build
      fs.rmSync(ssrOutDir, { recursive: true, force: true });
      console.log("[prerender] Done.");
    },
  };
}
