import { FC } from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

// gql
import { Event } from 'gql/graphql'

// common
import { Table, Column, CopyButton } from 'common/components'
import { INTERNAL_ROUTES } from 'common/routes'

// event
import { EventListCard } from 'Event/components'
import { useDomains } from 'common/providers/ChainProvider'

dayjs.extend(relativeTime)

interface Props {
  events: Event[]
  isDesktop?: boolean
}

const EventTable: FC<Props> = ({ events, isDesktop = false }) => {
  const { selectedChain } = useDomains()
  // methods
  const generateColumns = (events: Event[]): Column[] => [
    {
      title: 'Event Id',
      cells: events.map(({ id, pos }, index) => (
        <div className='w-full flex gap-1' key={`${id}-${pos}-event-id`}>
          <Link
            className='w-full hover:text-[#DE67E4]'
            to={INTERNAL_ROUTES.events.id.page(selectedChain.urls.page, id)}
            data-testid={`event-link-${index}`}
          >
            {id}
          </Link>
          <CopyButton data-testid={`testCopyButton-${index}`} value={id} message='Id copied' />
        </div>
      )),
    },
    {
      title: 'Block',
      cells: events.map(({ block, id, pos }) => (
        <Link
          key={`${id}-${pos}-event-block`}
          className='hover:text-[#DE67E4]'
          to={INTERNAL_ROUTES.events.id.page(selectedChain.urls.page, id)}
        >
          {block?.height}
        </Link>
      )),
    },
    {
      title: 'Action',
      cells: events.map(({ name, id, pos }) => (
        <div key={`${id}-${pos}-event-action`}>{name.split('.')[1]}</div>
      )),
    },
    {
      title: 'Type',
      cells: events.map(({ phase, id, pos }) => (
        <div key={`${id}-${pos}-event-phase`}>{phase}</div>
      )),
    },
    {
      title: 'Time',
      cells: events.map(({ block, id, pos }) => {
        const blockDate = dayjs(block?.timestamp).fromNow(true)
        return <div key={`${id}-${pos}-event-time`}>{blockDate}</div>
      }),
    },
  ]

  // constants
  const columns = generateColumns(events)

  return isDesktop ? (
    <div className='w-full'>
      <div className='rounded my-6'>
        <Table
          columns={columns}
          emptyMessage='There are no blocks to show'
          tableProps='bg-white rounded-[20px] dark:bg-gradient-to-r dark:from-[#4141B3] dark:via-[#6B5ACF] dark:to-[#896BD2] dark:border-none'
          tableHeaderProps='border-b border-gray-200'
          id='latest-events'
        />
      </div>
    </div>
  ) : (
    <div className='w-full'>
      {events.map((event) => (
        <EventListCard event={event} key={`event-list-card-${event.id}-${event.pos}`} />
      ))}
    </div>
  )
}

export default EventTable
