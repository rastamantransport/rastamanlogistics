import type { Plugin } from "vite";
import { parseHTML } from "linkedom";

const routes = [
  "/",
  "/services",
  "/open-auto-transport",
  "/enclosed-auto-transport",
  "/door-to-door-shipping",
  "/expedited-car-shipping",
  "/car-shipping-calculator",
  "/how-it-works",
  "/about",
  "/gallery",
  "/reviews",
  "/contact",
  "/blog",
  "/blog/how-to-prepare-your-car-for-shipping",
  "/blog/open-vs-enclosed-auto-transport",
  "/blog/how-much-does-it-cost-to-ship-a-car",
  "/blog/questions-to-ask-auto-transport-broker",
  "/blog/snowbird-season-shipping-car-to-florida",
  "/blog/what-to-know-about-door-to-door-vehicle-delivery",
  "/car-shipping-states",
  "/car-shipping-alabama",
  "/car-shipping-alaska",
  "/car-shipping-arizona",
  "/car-shipping-arkansas",
  "/car-shipping-california",
  "/car-shipping-colorado",
  "/car-shipping-connecticut",
  "/car-shipping-delaware",
  "/car-shipping-florida",
  "/car-shipping-georgia",
  "/car-shipping-hawaii",
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

function prerenderPlugin(): Plugin {
  return {
    name: "vite-prerender-plugin",
    apply: "build",
    async closeBundle() {
      const { render } = await import("./dist/server/entry-server.js").catch(
        () => ({ render: null })
      );

      if (!render) return;

      const fs = await import("fs");
      const path = await import("path");

      const templatePath = path.resolve("dist/client/index.html");
      if (!fs.existsSync(templatePath)) return;

      const template = fs.readFileSync(templatePath, "utf-8");
      const outDir = path.resolve("dist/client");

      console.log(`[prerender] Prerendering ${routes.length} routes...`);

      let succeeded = 0;
      let failed = 0;

      for (const route of routes) {
        try {
          const appHtml = await render(route);
          const { document } = parseHTML(template);
          const appDiv = document.getElementById("root");
          if (appDiv) {
            appDiv.innerHTML = appHtml;
          }
          const html = `<!doctype html>\n${document.documentElement.outerHTML}`;

          const routePath = route === "/" ? "/index" : route;
          const filePath = path.join(outDir, `${routePath}.html`);
          const dir = path.dirname(filePath);

          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
          }

          fs.writeFileSync(filePath, html);
          console.log(`[prerender] ✓ ${route}`);
          succeeded++;
        } catch (e) {
          console.error(`[prerender] ✗ ${route}:`, e);
          failed++;
        }
      }

      console.log(
        `[prerender] Done. ${succeeded} succeeded, ${failed} failed.`
      );
    },
  };
}

export { prerenderPlugin };
export default prerenderPlugin;
