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
  plugins: [
    {
      ...(await import("@mdx-js/rollup")).default({
        jsx: true,
        jsxImportSource: "solid-js/h",
        providerImportSource: "solid-mdx",
      }),
      enforce: "pre",
    },
    solid({ ssr: false, extensions: [".md", ".mdx"] }),
  ],
});
