import { FC } from 'react'
import { Event } from 'gql/graphql'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Link } from 'react-router-dom'

// common
import { Table, Column } from 'common/components'
import { INTERNAL_ROUTES } from 'common/routes'
import useDomains from 'common/hooks/useDomains'

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
      cells: events.map(({ block, indexInBlock, id }) => (
        <Link
          key={`${id}-extrinsic-event-id`}
          className='w-full hover:text-[#DE67E4]'
          to={INTERNAL_ROUTES.events.id.page(selectedChain.urls.page, id)}
        >
          <div>{block ? `${block?.height}-${indexInBlock}` : '-'}</div>
        </Link>
      )),
    },
    {
      title: 'Extrinsic Id',
      cells: events.map(({ block, id, extrinsic }) => (
        <div key={`${id}-extrinsic-event-extrinsic`}>{extrinsic ? `${block?.height}-${extrinsic.indexInBlock}` : '-'}</div>
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
