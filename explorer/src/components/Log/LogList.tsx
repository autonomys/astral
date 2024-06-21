'use client'

import { PAGE_SIZE } from '@/constants'
import { numberWithCommas } from '@/utils/number'
import { useQuery } from '@apollo/client'
import { ExportButton } from 'components/common/ExportButton'
import { Pagination } from 'components/common/Pagination'
import { Spinner } from 'components/common/Spinner'
import type { Log, LogWhereInput, LogsConnectionQuery } from 'gql/graphql'
import useMediaQuery from 'hooks/useMediaQuery'
import { FC, useCallback, useMemo, useState } from 'react'
import { useErrorHandler } from 'react-error-boundary'
import { NotFound } from '../layout/NotFound'
import { LogListFilter } from './LogListFilter'
import { LogTable } from './LogTable'
import { QUERY_LOG_CONNECTION_LIST } from './query'

export const LogList: FC = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const [lastCursor, setLastCursor] = useState<string | undefined>(undefined)
  const isDesktop = useMediaQuery('(min-width: 640px)')
  const [filters, setFilters] = useState<LogWhereInput>({})

  const { data, error, loading } = useQuery<LogsConnectionQuery>(QUERY_LOG_CONNECTION_LIST, {
    variables: { first: PAGE_SIZE, after: lastCursor, where: filters },
    pollInterval: 6000,
  })

  useErrorHandler(error)

  const logsConnection = useMemo(() => data && data.logsConnection, [data])
  const logs = useMemo(
    () => logsConnection && logsConnection.edges.map((log) => log.node as Log),
    [logsConnection],
  )
  const totalCount = useMemo(() => logsConnection && logsConnection.totalCount, [logsConnection])
  const totalLabel = useMemo(
    () => (totalCount ? numberWithCommas(Number(totalCount)) : 0),
    [totalCount],
  )
  const pageInfo = useMemo(() => logsConnection && logsConnection.pageInfo, [logsConnection])
  const logTypes = useMemo(() => data && data.logTypesQuery.result, [data])

  const handleNextPage = useCallback(() => {
    if (!pageInfo) return
    setCurrentPage((prev) => prev + 1)
    setLastCursor(pageInfo.endCursor)
  }, [pageInfo])

  const handlePreviousPage = useCallback(() => {
    if (!pageInfo) return
    setCurrentPage((prev) => prev - 1)
    setLastCursor(pageInfo.endCursor)
  }, [pageInfo])

  const onChange = (page: number) => {
    setCurrentPage(Number(page))

    const newCount = page > 0 ? PAGE_SIZE * Number(page + 1) : PAGE_SIZE
    const endCursor = newCount - PAGE_SIZE

    if (endCursor === 0 || endCursor < 0) {
      return setLastCursor(undefined)
    }
    setLastCursor(endCursor.toString())
  }

  if (loading) return <Spinner />
  if (!logs || !logTypes) return <NotFound />

  return (
    <div className='flex w-full flex-col align-middle'>
      <div className='mt-5 flex w-full justify-between'>
        <LogListFilter
          title={
            <div className=' font-medium text-grayDark dark:text-white'>Logs {totalLabel}</div>
          }
          filters={filters}
          logTypes={logTypes}
          setFilters={setFilters}
        />
      </div>
      <div className='mt-5 flex w-full flex-col sm:mt-0'>
        <LogTable logs={logs} isDesktop={isDesktop} />
        <div className='flex w-full justify-between gap-2'>
          <ExportButton data={logs} filename='log-list' />
          {totalCount && pageInfo && (
            <Pagination
              nextPage={handleNextPage}
              previousPage={handlePreviousPage}
              currentPage={currentPage}
              pageSize={PAGE_SIZE}
              totalCount={totalCount}
              hasNextPage={pageInfo.hasNextPage}
              hasPreviousPage={pageInfo.hasPreviousPage}
              onChange={onChange}
            />
          )}
        </div>
      </div>
    </div>
  )
}
