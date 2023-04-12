import { FC } from 'react'
import { Event } from 'gql/graphql'

// common
import { MobileCard } from 'common/components'

type EventCardProps = {
  event: Event
  id: string
}

const EventCard: FC<EventCardProps> = ({ event, id }) => {
  const body = [
    { name: 'Action', value: event.name.split('.')[1] },
    { name: 'Extrinsic Id', value: `${event.extrinsic?.block.height}-${event.extrinsic?.indexInBlock}` },
    { name: 'Type', value: event.phase },
  ]
  return (
    <MobileCard
      id={id}
      header={
        <h3 className='font-medium text-[#241235] text-sm dark:text-white'>{`${event.block?.height}-${event.indexInBlock}`}</h3>
      }
      body={body}
    />
  )
}

export default EventCard
