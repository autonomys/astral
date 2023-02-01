import { FC } from 'react'
import { Event } from 'gql/graphql'
import { Link } from 'react-router-dom'

// common
import { MobileCard, Tabs, Tab } from 'common/components'

// extrinsic
import { ExtrinsicDetailsEventList } from 'Extrinsic/components'
import { INTERNAL_ROUTES } from 'common/routes'

type Props = {
  events: Event[]
  isDesktop?: boolean
}

const ExtrinsicDetailsTab: FC<Props> = ({ events, isDesktop = false }) => {
  return (
    <Tabs
      tabStyle={
        isDesktop
          ? 'bg-white border border-slate-100 shadow rounded-lg p-4 dark:bg-gradient-to-r dark:from-[#4141B3] dark:via-[#6B5ACF] dark:to-[#896BD2] dark:border-none'
          : ''
      }
      tabTitleStyle={!isDesktop ? 'bg-white rounded-full mb-5 px-5 dark:bg-[#1E254E]' : ''}
      pillStyle={!isDesktop ? 'dark:bg-transparent dark:text-white' : undefined}
      activePillStyle={!isDesktop ? 'dark:bg-[#DE67E4] dark:text-white' : undefined}
    >
      <Tab title={`Events (${events.length})`}>
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
        <Link className='w-full' to={INTERNAL_ROUTES.events.id.page(event.id)}>
          <h3 className='font-medium text-[#241235] text-sm'>
            <div>{`${event.block?.height}-${event.pos}`}</div>
          </h3>
        </Link>
      }
      body={body}
    />
  )
}
