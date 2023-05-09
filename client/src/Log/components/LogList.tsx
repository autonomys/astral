import { FC, useState } from 'react'
import { useQuery } from '@apollo/client'
import { useErrorHandler } from 'react-error-boundary'

// log
import { QUERY_LOG_CONNECTION_LIST } from 'Log/query'
import { LogTable } from 'Log/components'

// common
import { Pagination, SearchBar, Spinner } from 'common/components'
import { numberWithCommas } from 'common/helpers'
import useMediaQuery from 'common/hooks/useMediaQuery'
import ExportButton from 'common/components/ExportButton'
import { LogWhereInput } from 'gql/graphql'
import LogListFilter from './LogListFilter'

const LogList: FC = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [lastCursor, setLastCursor] = useState<string | undefined>(undefined)
  const isDesktop = useMediaQuery('(min-width: 640px)')
  const [filters, setFilters] = useState<LogWhereInput>({})

  const PAGE_SIZE = 10

  const { data, error, loading } = useQuery(QUERY_LOG_CONNECTION_LIST, {
    variables: { first: PAGE_SIZE, after: lastCursor, where: filters },
    pollInterval: 6000,
  })

  useErrorHandler(error)

  if (loading) {
    return <Spinner />
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
    const newCount = PAGE_SIZE * Number(page)
    const endCursor = newCount - PAGE_SIZE
    if (endCursor === 0) {
      return setLastCursor(undefined)
    }
    setLastCursor(endCursor.toString())
  }

  return (
    <div className='w-full flex flex-col align-middle'>
      <div className='w-full grid lg:grid-cols-2'>
        <SearchBar />
      </div>
      <div className='w-full flex justify-between mt-5'>
        <LogListFilter
          title={
            <div className=' font-medium text-[#282929] dark:text-white'>Logs {totalLabel}</div>
          }
          filters={filters}
          setFilters={setFilters}
        />
      </div>
      <div className='w-full flex flex-col mt-5 sm:mt-0'>
        <LogTable logs={logsConnection} isDesktop={isDesktop} />
        <div className='w-full flex justify-between'>
          <ExportButton data={logsConnection} filename='log-list' />
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
    </div>
  )
}

export default LogList
