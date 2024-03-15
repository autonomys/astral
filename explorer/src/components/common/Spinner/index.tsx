import { useTheme } from '@/providers/ThemeProvider'
import Lottie from 'lottie-react'
import { FC } from 'react'
import loaderDark from './Loader_Dark.json'
import loaderLight from './Loader_Light.json'

export const Spinner: FC = () => {
  const { isDark } = useTheme()
  return (
    <div className='py-32'>
      <Lottie animationData={isDark ? loaderDark : loaderLight} />
    </div>
  )
}
