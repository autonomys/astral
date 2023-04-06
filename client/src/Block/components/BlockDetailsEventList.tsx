import { FC, useState } from 'react'
import { Event } from 'gql/graphql'
import { Link, useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useQuery } from '@apollo/client'

// block
import { QUERY_BLOCK_EVENTS } from 'Block/query'

// common
import { Table, Column, Spinner, Pagination, EventCard } from 'common/components'
import { INTERNAL_ROUTES } from 'common/routes'
import useDomains from 'common/hooks/useDomains'

dayjs.extend(relativeTime)

type Props = {
  isDesktop?: boolean
}

const BlockDetailsEventList: FC<Props> = ({ isDesktop = false }) => {
  const { blockId } = useParams()
  const { selectedChain } = useDomains()
  const [currentPage, setCurrentPage] = useState(1)
  const [lastCursor, setLastCursor] = useState<string | undefined>(undefined)
  const PAGE_SIZE = isDesktop ? 10 : 5

  const { data, error, loading } = useQuery(QUERY_BLOCK_EVENTS, {
    variables: { blockId: Number(blockId), first: PAGE_SIZE, after: lastCursor },
  })

  if (error) {
    return (
      <div className='flex w-full mt-5 sm:mt-0 items-center justify-center'>
        <p className='text-gray-600 text-sm font-light dark:text-white'>There was an error</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className='flex w-full mt-5 sm:mt-0 items-center justify-center'>
        <div className='h-20 w-20 '>
          <Spinner />
        </div>
      </div>
    )
  }

  const events = data.eventsConnection.edges.map((event) => event.node)
  const totalCount = data.eventsConnection.totalCount

  const pageInfo = data.eventsConnection.pageInfo

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

  // methods
  const generateColumns = (events: Event[]): Column[] => [
    {
      title: 'Event Id',
      cells: events.map(({ block, pos, id }, index) => (
        <div className='w-full flex gap-1' key={`${id}-block-event-id`}>
          <Link
            className='w-full hover:text-[#DE67E4]'
            to={INTERNAL_ROUTES.events.id.page(selectedChain.urls.page, id)}
          >
            {`${block?.height || index}-${pos}`}
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
          {extrinsic ? `${extrinsic.block.height}-${extrinsic.pos}` : ''}
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
  ]

  // constants
  const columns = generateColumns(events)

  return (
    <div className='w-full flex flex-col mt-5 sm:mt-0 space-y-4'>
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
        )}{' '}
      </>
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
  )
}

export default BlockDetailsEventList
