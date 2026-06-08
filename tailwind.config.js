/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#1B2A4A",
          light: "#243760",
          dark: "#111D33",
          accent: "#C49A3C",
          "accent-hover": "#A8832F",
        },
        navy: {
          50: "#F0F3F7",
          100: "#D8DFE9",
          200: "#B1BFCE",
          300: "#8A9FB3",
          400: "#637F98",
          500: "#3C5F7D",
          600: "#1B2A4A",
          700: "#142038",
          800: "#0D1626",
          900: "#060C14",
        },
        gold: {
          50: "#FBF6EC",
          100: "#F5E8CC",
          200: "#EBCE93",
          300: "#DFB45A",
          400: "#C49A3C",
          500: "#A37E2A",
          600: "#82631F",
        }
      },
      boxShadow: {
        card: "0 8px 24px rgba(2, 6, 23, 0.08)"
      }
    }
  },
  plugins: []
};
