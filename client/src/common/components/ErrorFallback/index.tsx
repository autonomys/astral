import { FC } from 'react'
import { ApolloError } from '@apollo/client'

import { ArrowButton } from 'common/components'

import AstronautImage from './AstronautImage'

type Props = {
  error?: ApolloError
}

const ErrorFallback: FC<Props> = ({ error }) => {
  return (
    <div className='flex items-center justify-center p-5 w-full'>
      <div className='text-center container flex flex-col items-center justify-center'>
        <AstronautImage />
        <h2 className='mt-5 text-[#282929] text-xl  font-medium'>
          {error?.name || 'Something went wrong'}
        </h2>
        <p className='text-slate-600 mt-4 mb-8 lg:text-lg w-1/2'>
          Please refresh the page. Feel free to <a className='font-medium text-[#9179EC]' href="/">get in touch</a> if the problem persist.
        </p>
        <ArrowButton onClick={() => window.location.reload()}>Refresh</ArrowButton>
      </div>
    </div>
  )
}

export default ErrorFallback
