import { ArrowButton } from 'common/components'

import AstronautImage from './AstronautImage'

const ErrorFallback = () => {
  return (
    <div className='flex items-center justify-center p-5 w-full'>
      <div className='text-center container flex flex-col items-center justify-center'>
        <AstronautImage />
        <h2 className='mt-5 text-[#282929] text-xl  font-medium'>Something went wrong</h2>
        <p className='text-slate-600 mt-4 mb-8 lg:text-lg w-1/2'>
          We apologize for the inconvenience. Please visit our{' '}
          <a
            className='font-medium text-[#9179EC]'
            href='https://status.subspace.network/status'
            target='_blank'
            rel='noreferrer'
          >
            status page
          </a>{' '}
          for updates and more information
        </p>
        <ArrowButton onClick={() => window.location.reload()}>Refresh</ArrowButton>
      </div>
    </div>
  )
}

export default ErrorFallback
