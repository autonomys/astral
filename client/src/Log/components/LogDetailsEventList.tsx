import { FC } from 'react'
import { Event } from 'gql/graphql'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

// common
import Table, { Column } from 'common/components/Table'
import { shortString } from 'common/helpers'

dayjs.extend(relativeTime)

type Props = {
  events: Event[]
}

const LogDetailsEventList: FC<Props> = ({ events }) => {
  // methods
  const generateColumns = (events: Event[]): Column[] => [
    {
      title: 'Event Id',
      cells: events.map(({ block, pos, id }, index) => (
        <div key={`${id}-log-event-id`}>{`${block?.height || index}-${pos}`}</div>
      )),
    },
    {
      title: 'Hash',
      cells: events.map(({ block, id }) => (
        <div key={`${id}-log-event-hash`}>{block ? `${shortString(block.hash)}` : ''}</div>
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
