const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
      },
      fontFamily: {
        sans: ["var(--font-roboto)", ...defaultTheme.fontFamily.sans],
        title: ["var(--font-silkscreen)", ...defaultTheme.fontFamily.sans],
        barcode: ["var(--font-barcode)"],
      },
    },
  },
  plugins: [],
};
