import { FC } from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

// gql
import { Event } from 'gql/graphql'

// common
import Table, { Column } from 'common/components/Table'
import { INTERNAL_ROUTES } from 'common/routes'

// event
import EventListCard from './EventListCard'

dayjs.extend(relativeTime)

interface Props {
  events: Event[]
  isDesktop?: boolean
}

const EventTable: FC<Props> = ({ events, isDesktop = false }) => {
  // methods
  const generateColumns = (events: Event[]): Column[] => [
    {
      title: 'Event Id',
      cells: events.map(({ id }) => (
        <Link key={`${id}-event-id`} to={INTERNAL_ROUTES.events.id.page(id)}>
          {id}
        </Link>
      )),
    },
    {
      title: 'Block',
      cells: events.map(({ block, id }) => (
        <Link key={`${id}-event-block`} to={INTERNAL_ROUTES.events.id.page(id)}>
          {block?.height}
        </Link>
      )),
    },
    {
      title: 'Action',
      cells: events.map(({ name, id }) => (
        <div key={`${id}-event-action`}>{name.split('.')[1]}</div>
      )),
    },
    {
      title: 'Type',
      cells: events.map(({ phase, id }) => <div key={`${id}-event-phase`}>{phase}</div>),
    },
    {
      title: 'Time',
      cells: events.map(({ block, id }) => {
        const blockDate = dayjs(block?.timestamp).fromNow(true)
        return <div key={`${id}-event-time`}>{blockDate}</div>
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
          tableProps='bg-white rounded-md'
          tableHeaderProps='border-b border-gray-200'
          id='latest-events'
        />
      </div>
    </div>
  ) : (
    <div className='w-full'>
      {events.map((event) => (
        <EventListCard event={event} key={`event-list-card-${event.id}`} />
      ))}
    </div>
  )
}

export default EventTable
