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
        // Background Gradient
        dark: 'linear-gradient(180deg, var(--background-dark-start) 0%, var(--background-dark-middle) 50%, var(--background-dark-end) 100%)',
        light:
          'linear-gradient(180deg, var(--background-light-start) 0%, var(--background-light-end) 100%)',
      },
      colors: {
        // Common Gradient
        gradientTwilight: 'var(--gradient-twilight)',
        gradientDusk: 'var(--gradient-dusk)',
        gradientSunset: 'var(--gradient-sunset)',

        // Grays and Blacks
        grayDark: 'var(--gray-dark)',
        grayDarker: 'var(--gray-darker)',
        grayLight: 'var(--gray-light)',

        // Whites
        white: 'var(--white)',
        whiteTransparent: 'var(--white-transparent)',
        whiteOpaque: 'var(--white-opaque)',

        // Purples
        purpleShade1: 'var(--purple-shade-1)',
        purpleShade2: 'var(--purple-shade-2)',
        purpleAccent: 'var(--purple-accent)',
        purpleLight: 'var(--purple-light)',
        purpleDeep: 'var(--purple-deep)',
        purpleDeepAccent: 'var(--purple-deep-accent)',
        purpleLighterAccent: 'var(--purple-lighter-accent)',
        purpleMedium: 'var(--purple-medium)',
        purplePale: 'var(--purple-pale)',
        purplePastel: 'var(--purple-pastel)',
        purpleTint: 'var(--purple-tint)',
        purpleTinge: 'var(--purple-tinge)',
        purpleUndertone: 'var(--purple-undertone)',
        purpleRoyal: 'var(--purple-royal)',
        purpleSoft: 'var(--purple-soft)',
        purpleElectric: 'var(--purple-electric)',
        purpleMist: 'var(--purple-mist)',

        // Blues
        blueShade1: 'var(--blue-shade-1)',
        blueShade2: 'var(--blue-shade-2)',
        blueAccent: 'var(--blue-accent)',
        blueLight: 'var(--blue-light)',
        blueMedium: 'var(--blue-medium)',
        bluePastel: 'var(--blue-pastel)',
        bluePale: 'var(--blue-pale)',
        blueDarkAccent: 'var(--blue-dark-accent)',

        // Greens
        greenBright: 'var(--green-bright)',
        greenPastel: 'var(--green-pastel)',

        // Misc
        pinkAccent: 'var(--pink-accent)',
        bronze: 'var(--bronze)',
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
