'use client'

import Link from 'next/link'
import { FC } from 'react'

// common
import { ArrowButton } from 'components/common/ArrowButton'
import useDomains from 'hooks/useDomains'
// layout
import { NotFoundImage } from './NotFoundImage'

export const NotFound: FC = () => {
  const { selectedChain, selectedDomain } = useDomains()

  return (
    <section className='flex h-full items-center p-16'>
      <div className='container mx-auto my-8 flex flex-col items-center justify-center px-5'>
        <NotFoundImage />
        <div className='max-w-md text-center'>
          <h2 className='my-8 text-xl text-grayDark dark:text-white'>
            The page you are looking for could not be found.
          </h2>
          <Link href={`/${selectedChain.urls.page}/${selectedDomain}`}>
            <ArrowButton>Take Me Home</ArrowButton>
          </Link>
        </div>
      </div>
    </section>
  )
}
