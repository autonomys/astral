import { FC } from 'react'
import Lottie from 'lottie-react'

// common
import useTheme from 'common/hooks/useTheme'

import loaderLight from './Loader_Light.json'
import loaderDark from './Loader_Dark.json'

const Spinner: FC = () => {
  const [isDark] = useTheme()
  return (
    <div className='py-32'>
      <Lottie animationData={isDark ? loaderDark : loaderLight} />
    </div>
  )
}

export default Spinner
