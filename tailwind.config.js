/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '380px',
      'sm': '680px',
      'md': '880px',
      'mlg': '1065px',
      'lg': '1280px',
      'xl': '1380px',
      'xxl': '1580px',
    },
    extend: {},
  },
  plugins: [],
}