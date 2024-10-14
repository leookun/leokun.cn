import { defineConfig } from "astro/config";
import unocss from "unocss/astro";
import { rehypeAccessibleEmojis } from "rehype-accessible-emojis";
import path from "path";
import react from "@astrojs/react";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import sitemap from "@astrojs/sitemap";
import { SITE } from "./src/config";
import { remarkModifiedTime } from "./plugins/remark-modified-time";
// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  site: SITE.website,
  integrations: [
    unocss({
      injectReset: true,
    }),
    react(),
    sitemap(),
  ],
  markdown: {
    remarkPlugins: [
      remarkModifiedTime,
      remarkToc,
      [
        remarkCollapse,
        {
          test: "Table of contents",
        },
      ],
    ],
    rehypePlugins: [rehypeAccessibleEmojis],
    shikiConfig: {
      // For more themes, visit https://shiki.style/themes
      themes: { light: "min-light", dark: "night-owl" },
      wrap: true,
    },
  },
  vite: {
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
    plugins: [
      {
        name: "md-url",
        resolveId(id, importer) {
          if (importer?.endsWith(".md")) {
            return path.resolve(
              process.cwd(),
              `./src/content/bolg/_附件/${id}`
            );
          }
        },
      },
    ],
  },
  scopedStyleStrategy: "where",
  experimental: {
    contentLayer: true,
  },
});
