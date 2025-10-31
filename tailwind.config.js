/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx,css}'],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['playfair', 'serif'],
        comicNeue: ['comicNeue', 'cursive'],
        manrope: ['Manrope', 'sans-serif'],
        'manrope-medium': ['Manrope-Medium', 'sans-serif'],
        jetbrainsMono: ['JetBrainsMono', 'monospace'],
      },
      colors: {
        primary: '#0D1292',
        primaryDark: '#04062F',
        lightPurple: '#CDCEEE',
        lightGray: '#F8F9FA',
      },
      screens: {
        short: { raw: '(min-width: 1024px) and (max-height: 820px)' },
        tall: { raw: '(min-width: 1500px) and (min-height: 821px)' },
        mobile: { max: '770px' },
        tablet: { min: '771px', max: '1255px' },
        desktop: { min: '1256px' },
      },
    },
  },
  plugins: [],
};
