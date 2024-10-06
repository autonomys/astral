import AstronautImage from '@/components/common/ErrorFallback/AstronautImage'
import { ArrowButton } from 'components/common/ArrowButton'
import useChains from 'hooks/useChains'
import Link from 'next/link'

const NotResultsFound = () => {
  const { network, section } = useChains()

  return (
    <div className='flex w-full items-center justify-center px-5 pb-32 pt-12'>
      <div className='container flex flex-col items-center justify-center text-center'>
        <AstronautImage />
        <h2 className='mt-5 text-xl font-medium  text-grayDark dark:text-white'>
          Not results found.
        </h2>
        <div className=' mb-8 mt-4 flex w-1/2 flex-col gap-8 text-slate-600 dark:text-white lg:text-lg'>
          No related data found. Please try again with different search criteria.{' '}
        </div>
        <Link href={`/${network}/${section}`}>
          <ArrowButton>Take Me Home</ArrowButton>
        </Link>
      </div>
    </div>
  )
}
