import { useQuery } from '@apollo/client'
import { EventCard } from 'components/common/EventCard'
import { Pagination } from 'components/common/Pagination'
import { Spinner } from 'components/common/Spinner'
import { Column, Table } from 'components/common/Table'
import { INTERNAL_ROUTES } from 'constants/routes'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Event, EventsByBlockIdQuery } from 'gql/graphql'
import useDomains from 'hooks/useDomains'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { FC, useCallback, useMemo, useState } from 'react'
import { QUERY_BLOCK_EVENTS } from './query'

dayjs.extend(relativeTime)

type Props = {
  isDesktop?: boolean
}

export const BlockDetailsEventList: FC<Props> = ({ isDesktop = false }) => {
  const { blockId } = useParams()
  const { selectedChain, selectedDomain } = useDomains()
  const [currentPage, setCurrentPage] = useState(0)
  const [lastCursor, setLastCursor] = useState<string | undefined>(undefined)

  const first = useMemo(() => (isDesktop ? 10 : 5), [isDesktop])
  const { data, error, loading } = useQuery<EventsByBlockIdQuery>(QUERY_BLOCK_EVENTS, {
    variables: { blockId: Number(blockId), first, after: lastCursor },
  })

  const eventsConnection = useMemo(() => data && data.eventsConnection, [data])
  const events = useMemo(
    () => eventsConnection && (eventsConnection.edges.map((event) => event.node) as Event[]),
    [eventsConnection],
  )
  const totalCount = useMemo(
    () => eventsConnection && eventsConnection.totalCount,
    [eventsConnection],
  )
  const pageInfo = useMemo(() => eventsConnection && eventsConnection.pageInfo, [eventsConnection])

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

  const onChange = useCallback(
    (page: number) => {
      setCurrentPage(Number(page))

      const newCount = page > 0 ? first * Number(page + 1) : first
      const endCursor = newCount - first

      if (endCursor === 0 || endCursor < 0) return setLastCursor(undefined)
      setLastCursor(endCursor.toString())
    },
    [first],
  )

  // methods
  const generateColumns = useCallback(
    (events: Event[]): Column[] => [
      {
        title: 'Event Id',
        cells: events.map(({ block, indexInBlock, id }) => (
          <div className='flex w-full gap-1' key={`${id}-block-event-id`}>
            <Link
              className='w-full hover:text-purpleAccent'
              href={INTERNAL_ROUTES.events.id.page(selectedChain.urls.page, selectedDomain, id)}
            >
              {`${block?.height}-${indexInBlock}`}
            </Link>
          </div>
        )),
      },
      {
        // Log/components/LogDetailsEventList.tsx has similar columns, but there is extrinsic hash instead of ID
        // TODO: consider merging
        title: 'Extrinsic Id',
        cells: events.map(({ extrinsic, id }) => (
          <div key={`${id}-block-event-extrinsic`}>
            {extrinsic ? `${extrinsic.block.height}-${extrinsic.indexInBlock}` : '-'}
          </div>
        )),
      },
      {
        title: 'Action',
        cells: events.map(({ name, id }) => (
          <div key={`${id}-block-event-action`}>{name.split('.')[1]}</div>
        )),
      },
      {
        title: 'Type',
        cells: events.map(({ phase, id }) => {
          return <div key={`${id}-block-event-phase`}>{phase}</div>
        }),
      },
    ],
    [selectedDomain, selectedChain],
  )

  // constants
  const columns = useMemo(() => events && generateColumns(events), [events, generateColumns])

  if (error)
    return (
      <div className='mt-5 flex w-full items-center justify-center sm:mt-0'>
        <p className='text-sm font-light text-gray-600 dark:text-white'>There was an error</p>
      </div>
    )

  if (loading)
    return (
      <div className='mt-5 flex w-full items-center justify-center sm:mt-0'>
        <div className='size-20 '>
          <Spinner />
        </div>
      </div>
    )

  if (!data || !columns || !events)
    return (
      <div className='mt-5 flex w-full items-center justify-center sm:mt-0'>
        <p className='text-sm font-light text-gray-600 dark:text-white'>There was an error</p>
      </div>
    )

  return (
    <div className='mt-5 flex w-full flex-col space-y-4 sm:mt-0'>
      <>
        {isDesktop ? (
          <Table
            columns={columns}
            emptyMessage='There are no events to show'
            id='block-details-event-list'
          />
        ) : (
          <div className='flex flex-col'>
            {events.map((event) => (
              <EventCard
                key={`block-details-event-card-${event.id}`}
                event={event}
                id='block-details-event-mobile'
              />
            ))}
          </div>
        )}
      </>
      {totalCount && pageInfo && (
        <Pagination
          nextPage={handleNextPage}
          previousPage={handlePreviousPage}
          currentPage={currentPage}
          pageSize={first}
          totalCount={totalCount}
          hasNextPage={pageInfo.hasNextPage}
          hasPreviousPage={pageInfo.hasPreviousPage}
          onChange={onChange}
        />
      )}
    </div>
  )
}
