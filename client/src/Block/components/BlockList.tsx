import { FC, useState } from 'react'
import { useQuery } from '@apollo/client'

// block
import BlockTable from 'Block/components/BlockTable'
import { QUERY_BLOCK_LIST_CONNECTION } from 'Block/query'

// common
import Spinner from 'common/components/Spinner'
import ErrorFallback from 'common/components/ErrorFallback'
import SearchBar from 'common/components/SearchBar'
import Pagination from 'common/components/Pagination'
import { numberWithCommas } from 'common/helpers'

const BlockList: FC = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [lastCursor, setLastCursor] = useState(undefined)
  const PAGE_SIZE = 10

  const { data, error, loading } = useQuery(QUERY_BLOCK_LIST_CONNECTION, {
    variables: { first: PAGE_SIZE, after: lastCursor },
  })

  if (loading) {
    return <Spinner />
  }

  if (error || !data) {
    return <ErrorFallback error={error} />
  }

  const blocksConnection = data.blocksConnection.edges.map((block) => block.node)
  const totalCount = data.blocksConnection.totalCount
  const totalLabel = numberWithCommas(Number(totalCount))

  const pageInfo = data.blocksConnection.pageInfo

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1)
    setLastCursor(pageInfo.endCursor)
  }

  const handlePreviousPage = () => {
    setCurrentPage((prev) => prev - 1)
    setLastCursor(pageInfo.endCursor)
  }

  return (
    <div className='w-full flex flex-col align-middle'>
      <div className='grid grid-cols-2'>
        <SearchBar />
      </div>
      <div className='w-full flex justify-between mt-5'>
        <div className='text-[#282929] text-base'>{`Blocks (${totalLabel})`}</div>
      </div>
      <div className='w-full flex flex-col'>
        <BlockTable blocks={blocksConnection} />
        <Pagination
          nextPage={handleNextPage}
          previousPage={handlePreviousPage}
          currentPage={currentPage}
          pageSize={PAGE_SIZE}
          totalCount={totalCount}
          hasNextPage={pageInfo.hasNextPage}
          hasPreviousPage={pageInfo.hasPreviousPage}
        />
      </div>
    </div>
  )
}

export default BlockList
