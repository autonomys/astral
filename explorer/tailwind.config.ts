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
      colors: {
        // Common Gradient
        gradientTwilight: '#4141B3',
        gradientDusk: '#6B5ACF',
        gradientSunset: '#896BD2',

        // Grays and Blacks
        grayDark: '#282929',
        grayDarker: '#241235',
        grayText: '#8F9BB3',
        grayLight: '#DDEFF1',
        grayLighter: '#F3F5FA',

        // Whites
        white: '#FFFFFF',
        whiteTransparent: '#ffffff1a',
        whiteOpaque: '#ffffffb3',

        // Purples
        purpleShade1: '#9179EC',
        purpleShade2: '#857EC2',
        purpleAccent: '#DE67E4',
        purpleLight: '#E6EAFA',
        purpleDeep: '#5649A3',
        purpleDeepAccent: '#4D397A',
        purpleLighterAccent: '#6E6ECD',
        purpleMedium: '#A196E1',
        purplePale: '#C2B0EE',
        purplePastel: '#8EABE4',
        purpleTint: '#AC70E1',
        purpleTinge: '#E6ADDC',
        purpleUndertone: '#3A2D85',
        purpleRoyal: '#4524C1',
        purpleSoft: '#D3DEF5',
        purpleElectric: '#E970F8',
        purpleMist: '#EFFDFF',

        // Blues
        blueShade1: '#6C6BCF',
        blueShade2: '#D9F0FC',
        blueAccent: '#1E254E',
        blueLight: '#F3FBFF',
        blueMedium: '#678CD5',
        bluePastel: '#929EEA',
        bluePale: '#ABCFEF',
        blueDarkAccent: '#2A345E',

        // Greens
        greenBright: '#37D058',
        greenPastel: '#91D3A0',

        // Misc
        pinkAccent: '#EA71F9',
        bronze: '#F1F7F8',
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
