import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Event } from 'gql/graphql'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

// common
import Table, { Column } from 'common/components/Table'
import { INTERNAL_ROUTES } from 'common/routes'

dayjs.extend(relativeTime)

interface Props {
  events: Event[]
}

const EventTable: FC<Props> = ({ events }) => {
  // methods
  const generateColumns = (events: Event[]): Column[] => [
    {
      title: 'Block',
      cells: events.map(({ block, id }) => (
        <Link key={`${id}-event-block`} to={INTERNAL_ROUTES.blocks.id.page(block?.height || 0)}>
          {block?.height}
        </Link>
      )),
    },
    {
      title: 'Time',
      cells: events.map(({ block, id }) => {
        const blockDate = dayjs(block?.timestamp).fromNow(true)
        return <div key={`${id}-event-time`}>{blockDate}</div>
      }),
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
      title: 'Index in block',
      cells: events.map(({ indexInBlock, id }) => (
        <div key={`${id}-event-index`}>{indexInBlock}</div>
      )),
    },
  ]

  // constants
  const columns = generateColumns(events)

  return (
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
  )
}

export default EventTable
