'use client'

import { FC } from 'react'

// common
import AstronautImage from '../common/ErrorFallback/AstronautImage'

export const NotStarted: FC = () => {
  return (
    <section className='flex h-full items-center p-16'>
      <div className='container mx-auto my-8 flex flex-col items-center justify-center px-5'>
        <AstronautImage />
        <div className='max-w-md text-center'>
          <h2 className='my-8 text-xl text-grayDark dark:text-white'>
            This phase has not started yet.
          </h2>
        </div>
      </div>
    </section>
  )
}
