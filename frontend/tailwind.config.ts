import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bigbark: {
          blue: '#073669',
          'blue-light': '#0a4a8a',
          'blue-dark': '#052a52',
          'blue-muted': '#e8f0fb',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
