/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        skin: {
          fill: "rgb(var(--color-fill) / <alpha-value>)",
          "fill-secondary": "rgb(var(--color-fill-secondary) / <alpha-value>)",
          accent: "rgb(var(--color-accent) / <alpha-value>)",
          inverted: "rgb(var(--color-fill-inverted) / <alpha-value>)",
          base: "rgb(var(--color-text-base) / <alpha-value>)",
          muted: "rgb(var(--color-text-muted) / <alpha-value>)",
        },
      },
      fontFamily: {
        mono: ["IBM Plex Mono", "monospace"],
      },
      typography: {
        DEFAULT: {
          css: {
            pre: {
              color: false,
            },
            code: {
              color: false,
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
}