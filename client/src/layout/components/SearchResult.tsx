import { ExtrinsicTable } from 'Extrinsic/components'
import { SearchBar } from 'common/components'
import useMediaQuery from 'common/hooks/useMediaQuery'
import { FC } from 'react'
import { useLocation } from 'react-router-dom'

const SearchResult: FC = () => {
  const { state } = useLocation()
  const isDesktop = useMediaQuery('(min-width: 640px)')

  return (
    <div className='w-full flex flex-col align-middle'>
      <div className='w-full grid lg:grid-cols-2'>
        <SearchBar />
      </div>
      <div className='w-full flex justify-between mt-5'>
        <div className='text-[#282929] text-base font-medium dark:text-white'>Search results</div>
      </div>
      <div className='w-full flex flex-col mt-5 sm:mt-0'>
        <ExtrinsicTable extrinsics={state.extrinsics} isDesktop={isDesktop} />
      </div>
    </div>
  )
}

export default SearchResult
