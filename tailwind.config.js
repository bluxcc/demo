/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx,css}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        lora: ["Lora", "serif"],
        manrope: ["Manrope", "sans-serif"],
        "manrope-medium": ["Manrope-Medium", "sans-serif"],
        jetbrainsMono: ["JetBrainsMono", "monospace"],
      },
      colors: {
        primary: "#0D1292",
        lightPurple: "#CDCEEE",
        lightGray: "#F8F9FA",
      },
      screens: {
        short: { raw: "(max-width: 1920px) and (max-height: 820px)" },
        tall: { raw: "(min-width: 1500px) and (min-height: 821px)" },
        mobile: { max: "770px" },
        tablet: { min: "771px", max: "1270px" },
        desktop: { min: "1271px" },
      },
    },
  },
  plugins: [],
};
