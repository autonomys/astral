import { FC } from 'react'
import { Event } from 'gql/graphql'

// common
import { Tabs, Tab } from 'common/components/Tabs'
import MobileCard from 'common/components/MobileCard'

// extrinsic
import ExtrinsicDetailsEventList from 'Extrinsic/components/ExtrinsicDetailsEventList'

type Props = {
  events: Event[]
  isDesktop?: boolean
}

const ExtrinsicDetailsTab: FC<Props> = ({ events, isDesktop = false }) => {
  return (
    <Tabs
      tabStyle={isDesktop ? 'bg-white border border-slate-100 shadow rounded-lg p-4' : ''}
      tabTitleStyle={!isDesktop ? 'bg-white rounded-full mb-5 px-5' : ''}
    >
      <Tab title='Events'>
        {isDesktop ? (
          <ExtrinsicDetailsEventList events={events} />
        ) : (
          <div className='flex flex-col'>
            {events.map((event) => (
              <ExtrinsicDetailsEventCard
                key={`extrinsic-details-event-card-${event.id}`}
                event={event}
              />
            ))}
          </div>
        )}
      </Tab>
    </Tabs>
  )
}

export default ExtrinsicDetailsTab

type EventCardProps = {
  event: Event
}

const ExtrinsicDetailsEventCard: FC<EventCardProps> = ({ event }) => {
  const body = [
    { name: 'Action', value: event.name.split('.')[1] },
    { name: 'Extrinsic Id', value: `${event.extrinsic?.block.height}-${event.extrinsic?.pos}` },
    { name: 'Type', value: event.phase },
  ]
  return (
    <MobileCard
      id='extrinsic-details-event-mobile'
      header={
        <h3 className='font-medium text-[#241235] text-sm'>{`$${event.block?.height}-${event.pos}`}</h3>
      }
      body={body}
    />
  )
}
