import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { remarkCustomFormatting } from "./src/utils/remark-custom-formatting";
import { rehypeImageFigure } from "./src/utils/rehype-image-figure";

// https://astro.build/config
export default defineConfig({
  site: "https://n2g.cn",
  base: "/",
  trailingSlash: "ignore",
  integrations: [sitemap(), react(), tailwind({ applyBaseStyles: false })],
  markdown: {
    remarkPlugins: [remarkCustomFormatting],
    rehypePlugins: [rehypeImageFigure],
    shikiConfig: {
      theme: "css-variables",
      wrap: true,
    },
  },
  vite: {
    ssr: {
      noExternal: [
        "mdast-util-to-string",
        "unist-util-visit",
        "github-slugger",
      ],
    },
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
    build: {
      rollupOptions: {
        external: ["@resvg/resvg-js"],
      },
    },
  },
});
