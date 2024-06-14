'use client'

import { PAGE_SIZE, searchTypes } from '@/constants'
import { numberWithCommas } from '@/utils/number'
import { useQuery } from '@apollo/client'
import { ExportButton } from 'components/common/ExportButton'
import { Pagination } from 'components/common/Pagination'
import { SearchBar } from 'components/common/SearchBar'
import { Spinner } from 'components/common/Spinner'
import { Event, EventWhereInput, EventsConnectionQuery } from 'gql/graphql'
import useMediaQuery from 'hooks/useMediaQuery'
import { FC, useCallback, useMemo, useState } from 'react'
import { useErrorHandler } from 'react-error-boundary'
import { NotFound } from '../layout/NotFound'
import { EventListFilter } from './EventListFilter'
import { EventTable } from './EventTable'
import { QUERY_EVENT_CONNECTION_LIST } from './query'

export const EventList: FC = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const [lastCursor, setLastCursor] = useState<string | undefined>(undefined)
  const isDesktop = useMediaQuery('(min-width: 640px)')
  const [filters, setFilters] = useState<EventWhereInput>({})

  const { data, error, loading } = useQuery<EventsConnectionQuery>(QUERY_EVENT_CONNECTION_LIST, {
    variables: { first: PAGE_SIZE, after: lastCursor, where: filters },
    pollInterval: 6000,
  })

  useErrorHandler(error)

  const eventsConnection = useMemo(() => data && data.eventsConnection, [data])
  const events = useMemo(
    () => eventsConnection && eventsConnection.edges.map((event) => event.node as Event),
    [eventsConnection],
  )
  const totalCount = useMemo(
    () => eventsConnection && eventsConnection.totalCount,
    [eventsConnection],
  )
  const totalLabel = useMemo(() => numberWithCommas(Number(totalCount)), [totalCount])
  const pageInfo = useMemo(() => eventsConnection && eventsConnection.pageInfo, [eventsConnection])
  const modules = useMemo(
    () => data && data.eventModuleNames.map((module) => module.name.split('.')[0]),
    [data],
  )

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

  const onChange = useCallback((page: number) => {
    setCurrentPage(Number(page))

    const newCount = page > 0 ? PAGE_SIZE * Number(page + 1) : PAGE_SIZE
    const endCursor = newCount - PAGE_SIZE

    if (endCursor === 0 || endCursor < 0) {
      return setLastCursor(undefined)
    }
    setLastCursor(endCursor.toString())
  }, [])

  if (loading) return <Spinner />
  if (!data || !modules || !events) return <NotFound />

  return (
    <div className='flex w-full flex-col align-middle'>
      <div className='grid w-full lg:grid-cols-2'>
        <SearchBar fixSearchType={searchTypes[4]} />
      </div>
      <div className='mt-5 flex w-full justify-between'>
        <EventListFilter
          title={
            <div className=' font-medium text-[#282929] dark:text-white'>Events {totalLabel}</div>
          }
          filters={filters}
          modules={modules}
          setFilters={setFilters}
        />
      </div>
      <div className='mt-5 flex w-full flex-col sm:mt-0'>
        <EventTable events={events} isDesktop={isDesktop} />
        <div className='flex w-full justify-between gap-2'>
          <ExportButton data={events} filename='event-list' />
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
