import { FC } from 'react'
import Lottie from 'lottie-react'
import loaderLight from './Loader_Light.json'

const Spinner: FC = () => {
  return <Lottie animationData={loaderLight} />
}

export default Spinner
