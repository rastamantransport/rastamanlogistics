import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { imagetools } from "vite-imagetools";
import prerenderPlugin from "./vite-prerender-plugin";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    imagetools(),
    mode === "development" && componentTagger(),
    prerenderPlugin(),
  ].filter(Boolean),
  build: {
    target: "esnext",
    cssCodeSplit: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
