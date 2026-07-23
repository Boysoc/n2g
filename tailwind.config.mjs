/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        'skin-accent': 'var(--color-primary-500)',
        'skin-accent-contrast': 'var(--color-text-on-primary)',
        'skin-base': 'var(--color-text-primary)',
        'skin-secondary': 'var(--color-text-secondary)',
        'skin-tertiary': 'var(--color-text-tertiary)',
        'skin-faint': 'var(--color-text-quaternary)',
        'skin-link': 'var(--color-text-link)',
        'skin-line': 'var(--color-border-default)',
        'skin-card': 'var(--color-bg-surface)',
        'skin-fill': 'var(--color-bg-page)',
        'skin-input': 'var(--color-bg-surface)',
        'skin-shadow': 'var(--color-border-default)',
        primary: {
          50: 'var(--color-primary-50)',
          100: 'var(--color-primary-100)',
          200: 'var(--color-primary-200)',
          300: 'var(--color-primary-300)',
          400: 'var(--color-primary-400)',
          500: 'var(--color-primary-500)',
          600: 'var(--color-primary-600)',
          700: 'var(--color-primary-700)',
          800: 'var(--color-primary-800)',
          900: 'var(--color-primary-900)',
        },
      },
    },
  },
  plugins: [],
};
