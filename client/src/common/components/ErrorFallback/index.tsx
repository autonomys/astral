import { ArrowButton } from 'common/components'

import AstronautImage from './AstronautImage'

interface Props {
  resetErrorBoundary: () => void
}

const ErrorFallback = ({ resetErrorBoundary }: Props) => {
  return (
    <div className='flex items-center justify-center p-5 w-full'>
      <div className='text-center container flex flex-col items-center justify-center'>
        <AstronautImage />
        <h2 className='mt-5 text-[#282929] text-xl  font-medium'>Something went wrong</h2>
        <p className='text-slate-600 mt-4 mb-8 lg:text-lg w-1/2'>
          If the problem persists, visit our{' '}
          <a
            className='font-medium text-[#9179EC]'
            href='https://status.subspace.network/status'
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
