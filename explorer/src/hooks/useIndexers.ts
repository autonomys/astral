'use client'

import { IndexersContext, IndexersContextValue } from 'providers/IndexersProvider'
import { useContext } from 'react'

export const useIndexers = (): IndexersContextValue => {
  const context = useContext(IndexersContext)

  if (!context) throw new Error('IndexersContext must be used within IndexersProvider')

  return context
}

export default useIndexers
