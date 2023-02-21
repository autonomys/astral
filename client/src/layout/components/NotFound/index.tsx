import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

// common
import { INTERNAL_ROUTES } from 'common/routes'
import { ArrowButton } from 'common/components'

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
          <ArrowButton onClick={() => navigate(INTERNAL_ROUTES.home)}>Take Me Home</ArrowButton>
        </div>
      </div>
    </section>
  )
}

export default NotFound
