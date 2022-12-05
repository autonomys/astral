import { FC, useState } from 'react'
import { useQuery } from '@apollo/client'

// common
import Spinner from 'common/components/Spinner'
import ErrorFallback from 'common/components/ErrorFallback'
import SearchBar from 'common/components/SearchBar'
import Pagination from 'common/components/Pagination'
import { numberWithCommas } from 'common/helpers'

// log
import { QUERY_LOG_CONNECTION_LIST } from 'Log/query'
import LogTable from './LogTable'
import useMediaQuery from 'common/hooks/useMediaQuery'

const LogList: FC = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [lastCursor, setLastCursor] = useState(undefined)
  const isDesktop = useMediaQuery('(min-width: 640px)')

  const PAGE_SIZE = 10

  const {
    data: connectionData,
    error: connectionError,
    loading: connectionLoading,
  } = useQuery(QUERY_LOG_CONNECTION_LIST, {
    variables: { first: PAGE_SIZE, after: lastCursor },
  })

  if (connectionLoading) {
    return <Spinner />
  }

  if (connectionError || !connectionData) {
    return <ErrorFallback error={connectionError} />
  }

  const logsConnection = connectionData.logsConnection.edges.map((log) => log.node)
  const totalCount = connectionData.logsConnection.totalCount
  const totalLabel = numberWithCommas(Number(totalCount))

  const pageInfo = connectionData.logsConnection.pageInfo

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
      <div className='w-full grid lg:grid-cols-2'>
        <SearchBar />
      </div>
      <div className='w-full flex justify-between mt-5'>
        <div className='text-[#282929] text-base'>{`Logs (${totalLabel})`}</div>
      </div>
      <div className='w-full flex flex-col mt-5 sm:mt-0'>
        <LogTable logs={logsConnection} isDesktop={isDesktop} />
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

export default LogList
