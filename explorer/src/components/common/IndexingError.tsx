import { XMarkIcon } from '@heroicons/react/24/outline'
import { EXTERNAL_ROUTES } from 'constants/routes'
import { FC, useCallback, useState } from 'react'

export const IndexingError: FC = () => {
  const [isWarningVisible, setIsWarningVisible] = useState(true)

  const handleHideWarning = useCallback(() => {
    setIsWarningVisible(false)
  }, [])

  if (!isWarningVisible) return <></>

  return (
    <div className='flex w-full items-center justify-center bg-orange-600/40 px-5 py-2'>
      <div className='text-sm font-medium text-gray-600 dark:text-white'>
        <p>
          We are currently experiencing issues with our indexing service. Please bear with us as we
          work to resolve this issue. You can check{' '}
          <a
            href={EXTERNAL_ROUTES.subscan}
            target='_blank'
            className='text-md text-[#ffffffb3] hover:text-[#DE67E4]'
            rel='noreferrer'
          >
            Subscan
          </a>{' '}
          or{' '}
          <a
            href={EXTERNAL_ROUTES.polkadot}
            target='_blank'
            className='text-md text-[#ffffffb3] hover:text-[#DE67E4]'
            rel='noreferrer'
          >
            Polkadot
          </a>{' '}
          while we complete the fix.
        </p>
      </div>
      <button
        className='mx-2 w-8 rounded-[20px] bg-white p-1 text-sm font-medium text-gray-800 hover:bg-gray-200 dark:bg-orange-600/40 dark:text-white'
        onClick={handleHideWarning}
      >
        <XMarkIcon className='size-6 text-[#282929] dark:text-white' />
      </button>
    </div>
  )
}
