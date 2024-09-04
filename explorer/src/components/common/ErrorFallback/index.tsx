import { ArrowButton } from 'components/common/ArrowButton'

import AstronautImage from './AstronautImage'

interface Props {
  resetErrorBoundary: () => void
}

export const ErrorFallback = ({ resetErrorBoundary }: Props) => {
  return (
    <div className='flex w-full items-center justify-center px-5 pb-32 pt-12'>
      <div className='container flex flex-col items-center justify-center text-center'>
        <AstronautImage />
        <h2 className='mt-5 text-xl font-medium  text-grayDark dark:text-white'>
          Something went wrong
        </h2>
        <p className='mb-8 mt-4 w-1/2 text-slate-600 dark:text-white lg:text-lg'>
          If the problem persists, visit our{' '}
          <a
            className='font-medium text-purpleShade dark:text-primaryAccent'
            href='https://status.subspace.network'
            target='_blank'
            rel='noreferrer'
          >
            Services Status Page
          </a>
          . Thank you for being so patient while we are fixing this issue.
        </p>
        <ArrowButton onClick={resetErrorBoundary}>Refresh</ArrowButton>
      </div>
    </div>
  )
}
