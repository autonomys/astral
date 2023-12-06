import { FC } from 'react'
import { Event } from 'gql/graphql'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

// common
import { Table, Column } from 'common/components'
import { shortString } from 'common/helpers'
import { Link } from 'react-router-dom'
import { INTERNAL_ROUTES } from 'common/routes'
import useDomains from 'common/hooks/useDomains'

dayjs.extend(relativeTime)

type Props = {
  events: Event[]
}

const LogDetailsEventList: FC<Props> = ({ events }) => {
  const { selectedChain, selectedDomain } = useDomains()

  // methods
  const generateColumns = (events: Event[]): Column[] => [
    {
      title: 'Event Id',
      cells: events.map(({ block, indexInBlock, id }) => (
        <div className='w-full flex gap-1' key={`${id}-log-event-id`}>
          <Link
            className='w-full hover:text-[#DE67E4]'
            to={INTERNAL_ROUTES.events.id.page(selectedChain.urls.page, selectedDomain, id)}
          >
            {`${block?.height}-${indexInBlock}`}
          </Link>
        </div>
      )),
    },
    {
      title: 'Hash',
      cells: events.map(({ block, id }) => (
        <div key={`${id}-log-event-hash`}>{`${block && shortString(block.hash)}`}</div>
      )),
    },
    {
      title: 'Action',
      cells: events.map(({ name, id }) => (
        <div key={`${id}-extrinsic-event-action`}>{name.split('.')[1]}</div>
      )),
    },
    {
      title: 'Type',
      cells: events.map(({ phase, id }) => {
        return <div key={`${id}-extrinsic-event-phase`}>{phase}</div>
      }),
    },
  ]

  // constants
  const columns = generateColumns(events)

  return (
    <Table
      columns={columns}
      emptyMessage='There are no events to show'
      id='log-details-event-list'
    />
  )
}

export default LogDetailsEventList
