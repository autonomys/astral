import { FC } from 'react'
import { Event } from 'gql/graphql'

// common
import Tabs from 'common/components/Tabs'
import MobileCard from 'common/components/MobileCard'
import useMediaQuery from 'common/hooks/useMediaQuery'

// log
import LogDetailsEventList from './LogDetailsEventList'

type Props = {
  events: Event[]
}

const LogDetailsTab: FC<Props> = ({ events }) => {
  const isDesktop = useMediaQuery('(min-width: 1440px)')
  const tabs = [
    {
      title: 'Events',
      content: isDesktop ? (
        <LogDetailsEventList events={events} />
      ) : (
        <div className='flex flex-col'>
          {events.map((event) => (
            <LogDetailsEventCard key={`extrinsic-details-event-card-${event.id}`} event={event} />
          ))}
        </div>
      ),
    },
  ]

  return (
    <Tabs
      id='block-details-tab'
      tabs={tabs}
      tabStyle={isDesktop ? 'bg-white border border-slate-100 shadow rounded-lg p-4' : ''}
      tabTitleStyle={isDesktop ? '' : 'bg-white rounded-full mb-5 px-5'}
    />
  )
}

export default LogDetailsTab

type EventCardProps = {
  event: Event
}

const LogDetailsEventCard: FC<EventCardProps> = ({ event }) => {
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
