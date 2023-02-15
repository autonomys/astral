import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

// common
import { INTERNAL_ROUTES } from 'common/routes'

import { ArrowLongRightIcon } from '@heroicons/react/24/outline'

import NotFoundImage from './NotFoundImage'

const NotFound: FC = () => {
  const navigate = useNavigate()

  return (
    <section className='flex items-center h-full p-16 dark:bg-gray-900 dark:text-gray-100'>
      <div className='container flex flex-col items-center justify-center px-5 mx-auto my-8'>
        <NotFoundImage />
        <div className='max-w-md text-center'>
          <h2 className='mt-8 mb-8 text-[#282929] text-xl'>
            The page you are looking for could not be found.
          </h2>
          <button
            onClick={() => navigate(INTERNAL_ROUTES.home)}
            className='text-xs font-semibold px-5 py-3 rounded-full leading-normal text-white bg-[#241235]'
          >
            <div className='flex items-center gap-x-5'>
              Take Me Home
              <ArrowLongRightIcon stroke='#DE67E4' className='w-6 h-6' />
            </div>
          </button>
        </div>
      </div>
    </section>
  )
}

export default NotFound
