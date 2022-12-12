import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

// common
import { INTERNAL_ROUTES } from 'common/routes'

const NotFound: FC = () => {
  const navigate = useNavigate()

  const handleNavigate = (url: string) => {
    navigate(url)
  }
  return (
    <section className='flex items-center h-full p-16 dark:bg-gray-900 dark:text-gray-100'>
      <div className='container flex flex-col items-center justify-center px-5 mx-auto my-8'>
        <div className='max-w-md text-center'>
          <h2 className='mb-8 font-extrabold text-[#282929] text-9xl dark:text-gray-600'>
            <span className='sr-only'>Error</span>404
          </h2>
          <p className='text-2xl text-[#282929] font-semibold md:text-3xl'>
            Sorry, we couldn&apos;t find this page.
          </p>
          <p className='mt-4 mb-8 text-[#282929] dark:text-gray-400'>
            But dont worry, you can find plenty of other things on our homepage.
          </p>
          <button
            onClick={() => handleNavigate(INTERNAL_ROUTES.home)}
            className='px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-900'
          >
            Back to homepage
          </button>
        </div>
      </div>
    </section>
  )
}

export default NotFound
