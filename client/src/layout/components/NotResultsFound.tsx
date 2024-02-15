import { Link } from 'react-router-dom'

// common
import { ArrowButton } from 'common/components'
import AstronautImage from 'common/components/ErrorFallback/AstronautImage'
import useDomains from 'common/hooks/useDomains'

const NotResultsFound = () => {
  const { selectedChain, selectedDomain } = useDomains()

  return (
    <div className='flex items-center justify-center px-5 pt-12 pb-32 w-full'>
      <div className='text-center container flex flex-col items-center justify-center'>
        <AstronautImage />
        <h2 className='mt-5 text-[#282929] text-xl  font-medium dark:text-white'>
          Not results found.
        </h2>
        <div className=' flex flex-col gap-8 text-slate-600 mt-4 mb-8 lg:text-lg w-1/2 dark:text-white'>
          No related data found. Please try again with different search criteria.{' '}
        </div>
        <Link to={`/${selectedChain.urls.page}/${selectedDomain}`}>
          <ArrowButton>Take Me Home</ArrowButton>
        </Link>
      </div>
    </div>
  )
}

export default NotResultsFound
