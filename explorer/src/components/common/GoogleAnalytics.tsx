'use client'

import { FC, useEffect } from 'react'
import { initializeGA } from 'utils/googleAnalytics'

type Props = {
  children: React.ReactNode
}

declare global {
  interface Window {
    GA_INITIALIZED: boolean
  }
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
