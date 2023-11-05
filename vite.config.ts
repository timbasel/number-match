import { resolve } from "path";
import solid from "solid-start/vite";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "~": resolve("./src/"),
      "@": resolve("./assets/"),
    },
  },
  plugins: [solid({ ssr: false })],
});
