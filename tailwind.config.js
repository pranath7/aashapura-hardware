/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          gold: "#c5a059",
          goldHover: "#b38f48",
          goldLight: "#fcf8f2",
          goldBorder: "#e6d5b8",
          dark: "#111827",
          slate: "#374151",
          lightBg: "#f9fafb",
        }
      },
      fontFamily: {
        sans: ['"Oswald"', 'sans-serif'],
        display: ['"Oswald"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
