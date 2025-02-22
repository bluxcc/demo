/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx,css}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        jetbrains: ["JetBrains Mono", "monospace"],
        lora: ["Lora", "serif"],
        manrope: ["Manrope", "sans-serif"],
      },
      colors: {
        primary: "#0D1292",
        lightPurple: "#CDCEEE",
        lightGray: "#F8F9FA",
      },
    },
  },
  plugins: [],
};
