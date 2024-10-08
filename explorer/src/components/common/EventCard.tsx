import { LogByIdQuery } from 'gql/graphql'
import { FC } from 'react'
import { MobileCard } from './MobileCard'

type EventCardProps = {
  event: NonNullable<NonNullable<LogByIdQuery['consensus_logs_by_pk']>['block']>['events'][number]
  id: string
}

export const EventCard: FC<EventCardProps> = ({ event, id }) => {
  const body = [
    { name: 'Action', value: event.name.split('.')[1] },
    {
      name: 'Extrinsic Id',
      value: event.extrinsic_id,
    },
    { name: 'Type', value: event.phase },
  ]
  return (
    <MobileCard
      id={id}
      header={
        <h3 className='text-sm font-medium text-grayDarker dark:text-white'>
          {event.block_height}
        </h3>
      }
      body={body}
    />
  )
}
