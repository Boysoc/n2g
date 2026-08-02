import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import sitemap from '@astrojs/sitemap';
import { createDouyinEmbedPlugin } from './src/markdown/douyin-embed.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://n2g.cn',
  trailingSlash: 'always',
  // Preserve author-controlled spacing between inline elements when Astro
  // serializes templates in production.
  compressHTML: true,
  image: {
    layout: 'constrained',
    responsiveStyles: true,
    // Cover phones (including high-DPR screens) and the article column
    // without emitting full-size 2000-4000px variants for every photo.
    breakpoints: [480, 768, 960, 1280],
  },
  integrations: [
    sitemap({
      filter: (page) => page !== 'https://n2g.cn/friends/',
    }),
  ],
  markdown: {
    processor: satteri({
      mdastPlugins: [createDouyinEmbedPlugin()],
      features: {
        gfm: {
          footnotes: {
            label: '脚注',
            backContent: '#',
            backLabel: '返回正文 {reference}',
          },
        },
      },
    }),
    shikiConfig: {
      theme: 'github-dark',
      wrap: false,
    },
  },
});
