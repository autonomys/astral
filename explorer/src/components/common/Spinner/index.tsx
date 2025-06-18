import dynamic from 'next/dynamic'
import { useTheme } from 'providers/ThemeProvider'
import { FC } from 'react'
import loaderDark from './Loader_Dark.json'
import loaderLight from './Loader_Light.json'

const DynamicLottie = dynamic(() => import('lottie-react'), { ssr: false })

interface SpinnerProps {
  isSmall?: boolean
  isXSmall?: boolean
}

export const Spinner: FC<SpinnerProps> = ({ isSmall, isXSmall }) => {
  const { isDark } = useTheme()
  return (
    <div
      className={`flex w-full items-center justify-center ${
        isSmall ? 'py-12' : isXSmall ? 'py-8' : 'py-32'
      }`}
    >
      <DynamicLottie
        animationData={isDark ? loaderDark : loaderLight}
        style={isSmall ? { width: '50vw', height: '50vh' } : {}}
      />
    </div>
  )
}
