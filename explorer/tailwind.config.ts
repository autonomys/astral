import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './public/index.html',
    './node_modules/tailwind-datepicker-react/dist/**/*.js',
  ],
  darkMode: 'class',
  variants: {
    extend: { backgroundImage: ['dark'] },
  },
  theme: {
    extend: {
      backgroundImage: {
        dark: 'linear-gradient(180deg, #0B050F 0%, #4D2F92 50%, #BC8EDA 100%)',
        light: 'linear-gradient(180deg, #f1f7f8 0%, #effdff 100%)',
      },
    },
    fontFamily: {
      montserrat: ['Montserrat'],
    },
    theme: {
      fontFamily: {
        sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        xs: ['13px', '16px'],
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
  plugins: [require('@headlessui/tailwindcss'), require('@tailwindcss/forms')],
}

export default config
