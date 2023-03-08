import { FC } from 'react'
import { Event } from 'gql/graphql'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Link } from 'react-router-dom'

// common
import { Table, Column } from 'common/components'
import { INTERNAL_ROUTES } from 'common/routes'
import { useDomains } from 'common/providers/ChainProvider'

dayjs.extend(relativeTime)

type Props = {
  events: Event[]
}

const ExtrinsicDetailsEventList: FC<Props> = ({ events }) => {
  const { selectedChain } = useDomains()
  // methods
  const generateColumns = (events: Event[]): Column[] => [
    {
      title: 'Event Id',
      cells: events.map(({ block, pos, id }, index) => (
        <Link
          key={`${id}-extrinsic-event-id`}
          className='w-full hover:text-[#DE67E4]'
          to={INTERNAL_ROUTES.events.id.page(selectedChain.urls.page, id)}
        >
          <div>{`${block?.height || index}-${pos}`}</div>
        </Link>
      )),
    },
    {
      title: 'Extrinsic Id',
      cells: events.map(({ block, id, pos }) => (
        <div key={`${id}-extrinsic-event-extrinsic`}>{`${block?.height}-${pos}`}</div>
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
      id='extrinsic-details-event-list'
    />
  )
}

export default ExtrinsicDetailsEventList
