import { useState, FC } from 'react'
import { useQuery } from '@apollo/client'

// ExtrinsicList
import ExtrinsicTable from 'Extrinsic/components/ExtrinsicTable'
import { QUERY_EXTRINSIC_LIST_CONNECTION } from 'Extrinsic/query'

// common
import Spinner from 'common/components/Spinner'
import ErrorFallback from 'common/components/ErrorFallback'
import SearchBar from 'common/components/SearchBar'
import Pagination from 'common/components/Pagination'
import { numberWithCommas } from 'common/helpers'

const ExtrinsicList: FC = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [lastCursor, setLastCursor] = useState(undefined)
  const PAGE_SIZE = 10

  const {
    data: connectionData,
    error: connectionError,
    loading: connectionLoading,
  } = useQuery(QUERY_EXTRINSIC_LIST_CONNECTION, {
    variables: { first: PAGE_SIZE, after: lastCursor },
  })

  if (connectionLoading) {
    return <Spinner />
  }

  if (connectionError || !connectionData) {
    return <ErrorFallback error={connectionError} />
  }

  const extrinsicsConnection = connectionData.extrinsicsConnection.edges.map(
    (extrinsic) => extrinsic.node,
  )
  const totalCount = connectionData.extrinsicsConnection.totalCount
  const totalLabel = numberWithCommas(Number(totalCount))

  const pageInfo = connectionData.extrinsicsConnection.pageInfo

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
        <div className='text-[#282929] text-base'>{`Extrinsics (${totalLabel})`}</div>
      </div>
      <div className='w-full flex flex-col'>
        <ExtrinsicTable extrinsics={extrinsicsConnection} />
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

export default ExtrinsicList
