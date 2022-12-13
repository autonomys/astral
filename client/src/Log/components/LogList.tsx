import { FC, useState } from 'react'
import { useQuery } from '@apollo/client'

// common
import { Pagination, SearchBar, Spinner, ErrorFallback } from 'common/components'
import { numberWithCommas } from 'common/helpers'
import useMediaQuery from 'common/hooks/useMediaQuery'

// log
import { QUERY_LOG_CONNECTION_LIST } from 'Log/query'
import { LogTable } from 'Log/components'

const LogList: FC = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [lastCursor, setLastCursor] = useState<string | undefined>(undefined)
  const isDesktop = useMediaQuery('(min-width: 640px)')

  const PAGE_SIZE = 10

  const { data, error, loading } = useQuery(QUERY_LOG_CONNECTION_LIST, {
    variables: { first: PAGE_SIZE, after: lastCursor },
  })

  if (loading) {
    return <Spinner />
  }

  if (error || !data) {
    return <ErrorFallback error={error} />
  }

  const logsConnection = data.logsConnection.edges.map((log) => log.node)
  const totalCount = data.logsConnection.totalCount
  const totalLabel = numberWithCommas(Number(totalCount))

  const pageInfo = data.logsConnection.pageInfo

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1)
    setLastCursor(pageInfo.endCursor)
  }

  const handlePreviousPage = () => {
    setCurrentPage((prev) => prev - 1)
    setLastCursor(pageInfo.endCursor)
  }

  const handleGetPage = (page: string | number) => {
    setCurrentPage(Number(page))
    const endCursor = PAGE_SIZE * Number(page)
    setLastCursor(endCursor.toString())
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
          handleGetPage={handleGetPage}
        />
      </div>
    </div>
  )
}

export default LogList
