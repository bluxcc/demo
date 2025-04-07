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
      screens: {
        short: { raw: "(min-width: 1500px) and (max-height: 900px)" },
        tall: { raw: "(min-width: 1500px) and (min-height: 901px)" },
        mobile: { max: "770px" },
        tablet: { min: "771px", max: "1297px" },
        desktop: { min: "1298px" },
      },
    },
  },
  plugins: [],
};
