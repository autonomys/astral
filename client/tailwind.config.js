/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: true,
  theme: {
    theme: {
      fontFamily: {
        montserrat: ['Montserrat'],
      },
      extend: {
        fontFamily: {
          sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
        },
        spacing: {
          13: '3.125rem',
          128: '32rem',
          144: '36rem',
        },
        borderRadius: {
          '4xl': '2rem',
        },
      },
    },
  },
  plugins: [require('@headlessui/tailwindcss')],
}
