import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,html}', // Ensure all relevant file types are included
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
