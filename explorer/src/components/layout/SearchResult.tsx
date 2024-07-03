import { ExtrinsicTable } from 'components/Extrinsic/ExtrinsicTable'
import { SearchBar } from 'components/common/SearchBar'
import { ExtrinsicAndEventResultTable } from 'components/layout/ExtrinsicAndEventResult'
import { useSearch } from 'hooks/useSearch'
import { useParams } from 'next/navigation'
import { FC } from 'react'

const SearchResult: FC = () => {
  const { type } = useParams()
  const { state } = useSearch()

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
          <ExtrinsicTable extrinsics={state.extrinsics} />
        ) : (
          <ExtrinsicAndEventResultTable results={state.results} />
        )}
      </div>
    </div>
  )
}

export default SearchResult
