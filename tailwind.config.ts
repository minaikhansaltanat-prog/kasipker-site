import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        kasipker: {
          navy: {
            900: '#0D1B4B',
            800: '#152466',
            700: '#1C2E80',
            600: '#1F3399',
            500: '#2540B8',
            400: '#3D5ACF',
            300: '#6A83DC',
            200: '#99ADE8',
            100: '#C8D4F3',
            50:  '#EBF0FA',
          },
          gold: {
            900: '#3D2800',
            700: '#8F5C00',
            500: '#C99100',
            400: '#D4A017',
            300: '#E0B84D',
            200: '#EDD080',
            50:  '#FBF3DC',
          },
        },
      },
      fontFamily: {
        display: ['Montserrat', 'Arial Black', 'sans-serif'],
        heading: ['Montserrat', 'Segoe UI', 'sans-serif'],
        body: ['Inter', 'Segoe UI', 'Arial', 'sans-serif'],
      },
      borderRadius: { '4xl': '2rem' },
      boxShadow: {
        card: '0 2px 12px rgba(28,46,128,0.10)',
        elevated: '0 8px 32px rgba(13,27,75,0.18)',
        gold: '0 4px 14px rgba(212,160,23,0.30)',
      },
    },
  },
  plugins: [],
};
export default config;
