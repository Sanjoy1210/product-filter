/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme');

const {
  typography,
  screens,
  spacing,
  form,
  bgImages,
  colors,
  components,
  keyframes,
  animations,
} = require('./configs/tailwind');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      ...screens,
    },
    extend: {
      fontFamily: {
        'inter': ['var(--font-inter)', ...fontFamily.sans],
      },
      colors: {
        ...colors,
      },
      backgroundImage: {
        ...bgImages,
      },
      keyframes: {
        ...keyframes,
      },
      animation: {
        ...animations,
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ...spacing,
        ...typography,
        ...form,
        ...components,
      });
    },
  ],
};
