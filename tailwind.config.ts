import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Ported from index.html custom utilities
        lake: '#0c1c2c',
        'luxury-gold': '#c5a059',
      },
      fontFamily: {
        // CSS vars are provided by next/font in app/layout.tsx
        sans: ['var(--font-jakarta)', 'sans-serif'],
        serif: ['var(--font-playfair)', 'serif'],
        cinzel: ['var(--font-cinzel)', 'serif'],
      },
      keyframes: {
        pageFadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        heroFadeUp: {
          from: { opacity: '0', transform: 'translateY(18px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        menuSlideIn: {
          from: { opacity: '0', transform: 'translateY(-8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        modalBackdropIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        modalContentIn: {
          from: { opacity: '0', transform: 'scale(0.96)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
