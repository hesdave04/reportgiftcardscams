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
          DEFAULT: "#111827",   // slate-900
          accent: "#0ea5e9"     // sky-500
        }
      },
      boxShadow: {
        card: "0 8px 24px rgba(2, 6, 23, 0.08)"
      }
    }
  },
  plugins: []
};
