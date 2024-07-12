import { useTheme } from '@/providers/ThemeProvider'
import Lottie from 'lottie-react'
import { FC } from 'react'
import loaderDark from './Loader_Dark.json'
import loaderLight from './Loader_Light.json'

interface SpinnerProps {
  isSmall?: boolean
}

export const Spinner: FC<SpinnerProps> = ({ isSmall }) => {
  const { isDark } = useTheme()
  return (
    <div className={`flex w-full items-center justify-center ${isSmall ? 'py-12' : 'py-32'}`}>
      <Lottie
        animationData={isDark ? loaderDark : loaderLight}
        style={isSmall ? { width: '50vw', height: '50vh' } : {}}
      />
    </div>
  )
}
