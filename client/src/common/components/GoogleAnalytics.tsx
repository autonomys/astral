import { initializeGA } from 'common/helpers/googleAnalytics'
import { FC, useEffect } from 'react'

type Props = {
  children: React.ReactNode
}

export const GoogleAnalytics: FC<Props> = ({ children }) => {
  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initializeGA()
      window.GA_INITIALIZED = true
    }
  }, [])

  return <div className='w-full'>{children}</div>
}
