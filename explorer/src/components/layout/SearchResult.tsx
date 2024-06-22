import { ExtrinsicAndEventResultTable } from '@/components/layout/ExtrinsicAndEventResult'
import { ExtrinsicTable } from 'components/Extrinsic/ExtrinsicTable'
import { SearchBar } from 'components/common/SearchBar'
import useMediaQuery from 'hooks/useMediaQuery'
import { useSearch } from 'hooks/useSearch'
import { useParams } from 'next/navigation'
import { FC } from 'react'

const SearchResult: FC = () => {
  const { type } = useParams()
  const { state } = useSearch()
  const isDesktop = useMediaQuery('(min-width: 640px)')

  return (
    <div className='flex w-full flex-col align-middle'>
      <div className='grid w-full lg:grid-cols-2'>
        <SearchBar />
      </div>
      <div className='mt-5 flex w-full justify-between'>
        <div className='text-base font-medium text-grayDark dark:text-white'>Search results</div>
      </div>
      <div className='mt-5 flex w-full flex-col sm:mt-0'>
        {type === 'extrinsics' ? (
          <ExtrinsicTable extrinsics={state.extrinsics} isDesktop={isDesktop} />
        ) : (
          <ExtrinsicAndEventResultTable results={state.results} isDesktop={isDesktop} />
        )}
      </div>
    </div>
  )
}

export default SearchResult
