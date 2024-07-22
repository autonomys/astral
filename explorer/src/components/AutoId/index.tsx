'use client'

import { FC } from 'react'

export const AutoIdPage: FC = () => {
  return (
    <div className='flex w-full flex-col items-center space-y-4'>
      <div className='w-full max-w-4xl'>
        <div className='mb-4 w-full rounded-[20px] border border-slate-100 bg-white px-3 py-4 shadow dark:border-none dark:bg-gradient-to-r dark:from-gradientTwilight dark:via-gradientDusk dark:to-gradientSunset sm:p-6'>
          <div className='mb-10 flex flex-col items-center justify-center'>
            <h1 className='mb-8 mt-6 text-center text-4xl font-bold text-gray-900 dark:text-white'>
              Auto-ID
            </h1>
          </div>
          <div className='m-6 flow-root text-gray-900 dark:text-white'>
            <div className='mb-12 flex w-full items-center gap-5 overflow-x-auto'>
              <p>
                Auto ID is our first primitive enabling identity infrastructure at massive scale.
                Documentation coming soon.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
