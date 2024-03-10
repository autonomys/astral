import { ArrowButton } from 'common/components'

import AstronautImage from './AstronautImage'

interface Props {
  resetErrorBoundary: () => void
}

const ErrorFallback = ({ resetErrorBoundary }: Props) => {
  return (
    <div className='flex items-center justify-center px-5 pt-12 pb-32 w-full'>
      <div className='text-center container flex flex-col items-center justify-center'>
        <AstronautImage />
        <h2 className='mt-5 text-[#282929] text-xl  font-medium dark:text-white'>Something went wrong</h2>
        <p className='text-slate-600 mt-4 mb-8 lg:text-lg w-1/2 dark:text-white'>
          If the problem persists, visit our{' '}
          <a
            className='font-medium text-[#9179EC] dark:text-[#DE67E4]'
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

export default ErrorFallback
