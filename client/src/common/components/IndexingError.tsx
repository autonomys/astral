import { XMarkIcon } from '@heroicons/react/24/outline'
import { FC, useCallback, useState } from 'react'

const IndexingError: FC = () => {
  const [isWarningVisible, setIsWarningVisible] = useState(true)

  const handleHideWarning = useCallback(() => {
    setIsWarningVisible(false)
  }, [])

  if (!isWarningVisible) return <></>

  return (
    <div className='w-full flex items-center justify-center bg-orange-600/40 py-2 px-5'>
      <div className='text-gray-600 text-sm font-medium dark:text-white'>
        <p>
          We are currently experiencing issues with our indexing service. Please bear with us as we
          work to resolve this issue.
        </p>
      </div>
      <button
        className='mx-2 w-8 px-1 py-1 bg-white dark:bg-orange-600/40 hover:bg-gray-200 text-gray-800 dark:text-white text-sm font-medium rounded-[20px]'
        onClick={handleHideWarning}
      >
        <XMarkIcon className='w-6 h-6 text-[#282929] dark:text-white' />
      </button>
    </div>
  )
}

export default IndexingError
