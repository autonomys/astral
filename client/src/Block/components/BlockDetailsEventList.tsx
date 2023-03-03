import { FC } from 'react'
import { Event } from 'gql/graphql'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

// common
import { Table, Column } from 'common/components'
import { INTERNAL_ROUTES } from 'common/routes'

dayjs.extend(relativeTime)

type Props = {
  events: Event[]
}

const BlockDetailsEventList: FC<Props> = ({ events }) => {
  // methods
  const generateColumns = (events: Event[]): Column[] => [
    {
      title: 'Event Id',
      cells: events.map(({ block, pos, id }, index) => (
        <div className='w-full flex gap-1' key={`${id}-block-event-id`}>
          <Link className='w-full hover:text-[#DE67E4]' to={INTERNAL_ROUTES.events.id.page(id)}>
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
    <Table
      columns={columns}
      emptyMessage='There are no events to show'
      id='block-details-event-list'
    />
  )
}

export default BlockDetailsEventList
