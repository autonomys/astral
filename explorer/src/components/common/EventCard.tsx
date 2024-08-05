import { Event } from 'gql/graphql'
import { FC } from 'react'
import { MobileCard } from './MobileCard'

type EventCardProps = {
  event: Event
  id: string
}

export const EventCard: FC<EventCardProps> = ({ event, id }) => {
  const body = [
    { name: 'Action', value: event.name.split('.')[1] },
    {
      name: 'Extrinsic Id',
      value: `${event.extrinsic?.block.height}-${event.extrinsic?.indexInBlock}`,
    },
    { name: 'Type', value: event.phase },
  ]
  return (
    <MobileCard
      id={id}
      header={
        <h3 className='text-sm font-medium text-grayDarker dark:text-white'>{`${event.block?.height}-${event.indexInBlock}`}</h3>
      }
      body={body}
    />
  )
}
