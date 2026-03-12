import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, p);

const template = fs.readFileSync(toAbsolute("dist/index.html"), "utf-8");

const { render } = await import("./dist/server/entry-server.js");

const routes = [
  "/",
  "/services",
  "/quote",
  "/open-auto-transport",
  "/enclosed-auto-transport",
  "/door-to-door-shipping",
  "/expedited-car-shipping",
  "/gallery",
  "/how-it-works",
  "/about",
  "/contact",
  "/reviews",
];

for (const url of routes) {
  const { html, helmet } = render(url);

  let page = template.replace(
    '<div id="root"></div>',
    `<div id="root">${html}</div>`
  );

  // Inject helmet-managed head tags
  if (helmet) {
    page = page.replace(
      /<title>.*?<\/title>/,
      helmet.title.toString()
    );
    page = page.replace(
      "</head>",
      `${helmet.meta.toString()}${helmet.link.toString()}${helmet.script.toString()}</head>`
    );
  }

  const filePath =
    url === "/" ? "dist/index.html" : `dist${url}/index.html`;
  const dir = path.dirname(toAbsolute(filePath));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(toAbsolute(filePath), page);
  console.log(`Pre-rendered: ${url}`);
}

console.log("SSG complete — all pages pre-rendered.");
