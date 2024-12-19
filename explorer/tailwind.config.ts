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
        dark: 'linear-gradient(180deg, #050D26 0%, #27355D 100%)',
        light: 'linear-gradient(180deg, #EBEFFC 0%, #3654A6 100%)',
      },
      colors: {
        // Common Gradient
        // Gradients
        gradientFrom: '#032372',
        gradientVia: '#1949D2',
        gradientTo: '#5373C4',
        gradientToSecondary: '#0C1C43',

        // Grays and Blacks
        grayDark: '#2A2C38',
        grayDarker: '#27355D',
        grayLight: '#EBEFFC',

        // Whites
        white: '#FFFFFF',
        whiteTransparent: '#ffffff1a',
        whiteOpaque: '#ffffffb3',

        // Pastels
        pastelPurple: '#C2B0EE',
        pastelBlue: '#ABCFEF',
        pastelPink: '#E6ADDC',
        pastelGreen: '#91D3A0',

        // Greens
        greenBright: '#37D058',

        // Primary
        primaryAccent: '#1949D2',

        // Blues
        blueAccent: '#1E254E',
        blueDarkAccent: '#2A345E',
        blueLight: '#EBEFFC',
        blueShade: '#3654A6',
        blueUndertone: '#27355D',

        // background
        backgroundLight: '#EBEFFC',
        backgroundDark: '#3654A6',
        backgroundDarker: '#27355D',
        backgroundDarkest: '#050D26',

        // box
        boxLight: '#FFFFFF',
        boxDark: '#2A2C38',

        // Button
        buttonLightFrom: '#032372',
        buttonLightTo: '#5373C4',
        buttonDarkFrom: '#1949D2',
        buttonDarkTo: '#0C1C43',

        // Header
        headerLight: '#FFFFFF',
        headerDark: '#2A2C38',

        // Footer
        footerLight: '#032372',
        footerDark: '#08183E',
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
