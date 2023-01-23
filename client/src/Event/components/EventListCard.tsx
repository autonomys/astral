import { FC } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

// gql
import { Event } from 'gql/graphql'

// common
import { MobileCard } from 'common/components'

dayjs.extend(relativeTime)

type Props = {
  event: Event
}

const EventListCard: FC<Props> = ({ event }) => {
  const body = [
    { name: 'Block', value: event.block?.height },
    { name: 'Action', value: event.name.split('.')[1] },
    { name: 'Extrinsic Id', value: '-' },
    { name: 'Type', value: event.phase },
  ]
  return (
    <MobileCard
      id='event-list-mobile'
      header={
        <h3 className='font-medium text-[#241235] text-sm dark:text-white'>{`${event.block?.height}-${event.pos}`}</h3>
      }
      body={body}
    />
  )
}

export default EventListCard
