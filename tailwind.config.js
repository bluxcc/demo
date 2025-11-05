/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // <--- add this line
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
        white: '#ffffff',
        primary: '#0D1292',
        primaryDark: '#04062F',
        lightPurple: '#CDCEEE',
        lightGray: '#F8F9FA',
        // Add dark theme variants
        darkBg: '#000',
        darkGray: '#0F0F0F',
        darkBorder: '#333333',
        darkField: '#1A1A1A',
        darkFieldGray: '#121212',
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
