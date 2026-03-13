import type { Plugin } from "vite";
import { build } from "vite";
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

export function prerenderPlugin(): Plugin {
  return {
    name: "vite-prerender",
    apply: "build",
    enforce: "post",
    async closeBundle() {
      const distDir = path.resolve("dist");
      const templatePath = path.join(distDir, "index.html");

      if (!fs.existsSync(templatePath)) {
        console.warn("[prerender] dist/index.html not found, skipping.");
        return;
      }

      const template = fs.readFileSync(templatePath, "utf-8");

      console.log("[prerender] Building SSR bundle...");

      // Build the server entry
      await build({
        configFile: false,
        resolve: {
          alias: {
            "@": path.resolve("src"),
          },
        },
        build: {
          ssr: true,
          outDir: path.resolve("dist-ssr"),
          rollupOptions: {
            input: path.resolve("src/entry-server.tsx"),
            output: {
              format: "es",
            },
          },
          // Suppress asset handling for SSR — images become plain strings
          assetsInlineLimit: 0,
        },
        // Treat all dependencies as external to avoid bundling issues
        ssr: {
          noExternal: [
            // Bundle these so they resolve correctly
            "lucide-react",
            "class-variance-authority",
            "clsx",
            "tailwind-merge",
            "react-helmet-async",
          ],
        },
        logLevel: "warn",
      });

      const ssrEntryPath = path.join(
        path.resolve("dist-ssr"),
        "entry-server.js"
      );

      if (!fs.existsSync(ssrEntryPath)) {
        console.error("[prerender] SSR bundle not found at", ssrEntryPath);
        return;
      }

      const { render } = await import(
        pathToFileURL(ssrEntryPath).href
      ) as { render: (url: string) => { html: string; head: string } };

      console.log(`[prerender] Rendering ${ROUTES.length} routes...`);

      for (const route of ROUTES) {
        try {
          const { html: appHtml, head } = render(route);

          let rendered = template;

          // Inject helmet head tags before </head>
          if (head) {
            rendered = rendered.replace("</head>", `${head}\n</head>`);
          }

          // Inject rendered app HTML into #root
          rendered = rendered.replace(
            '<div id="root"></div>',
            `<div id="root">${appHtml}</div>`
          );

          // Determine output path
          const routePath =
            route === "/" ? "index.html" : `${route.slice(1)}/index.html`;
          const outputPath = path.join(distDir, routePath);
          const outputDir = path.dirname(outputPath);

          if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
          }

          // For root route, overwrite existing index.html
          fs.writeFileSync(outputPath, rendered, "utf-8");
          console.log(`  ✓ ${route} → ${routePath}`);
        } catch (err) {
          console.error(`  ✗ ${route} failed:`, err);
        }
      }

      // Clean up SSR build
      fs.rmSync(path.resolve("dist-ssr"), { recursive: true, force: true });
      console.log("[prerender] Done.");
    },
  };
}
