'use client'

import { ArrowButton } from 'components/common/ArrowButton'
import useChains from 'hooks/useChains'
import Link from 'next/link'
import { FC } from 'react'
import { NotFoundImage } from './NotFoundImage'

export const NotFound: FC = () => {
  const { network, section } = useChains()

  return (
    <section className='flex h-full items-center p-16'>
      <div className='container mx-auto my-8 flex flex-col items-center justify-center px-5'>
        <NotFoundImage />
        <div className='max-w-md text-center'>
          <h2 className='my-8 text-xl text-grayDark dark:text-white'>
            The page you are looking for could not be found.
          </h2>
          <Link href={`/${network}/${section}`}>
            <ArrowButton>Take Me Home</ArrowButton>
          </Link>
        </div>
      </div>
    </section>
  )
}
