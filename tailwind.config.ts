import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,html}', // Added 'html'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
