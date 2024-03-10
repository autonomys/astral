import { FC } from 'react'
import { Link } from 'react-router-dom'

// common
import { ArrowButton } from 'common/components'
import useDomains from 'common/hooks/useDomains'
// layout
import NotFoundImage from './NotFoundImage'

const NotFound: FC = () => {
  const { selectedChain, selectedDomain } = useDomains()

  return (
    <section className='flex items-center h-full p-16'>
      <div className='container flex flex-col items-center justify-center px-5 mx-auto my-8'>
        <NotFoundImage />
        <div className='max-w-md text-center'>
          <h2 className='mt-8 mb-8 text-[#282929] text-xl dark:text-white'>
            The page you are looking for could not be found.
          </h2>
          <Link to={`/${selectedChain.urls.page}/${selectedDomain}`}>
            <ArrowButton>Take Me Home</ArrowButton>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default NotFound
