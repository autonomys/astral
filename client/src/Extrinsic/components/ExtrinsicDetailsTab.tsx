import { FC } from 'react'
import { Event } from 'gql/graphql'
import { Link } from 'react-router-dom'

// common
import { MobileCard, Tab, PageTabs } from 'common/components'

// extrinsic
import { ExtrinsicDetailsEventList } from 'Extrinsic/components'
import { INTERNAL_ROUTES } from 'common/routes'
import useDomains from 'common/hooks/useDomains'

type Props = {
  events: Event[]
  isDesktop?: boolean
}

const ExtrinsicDetailsTab: FC<Props> = ({ events, isDesktop = false }) => {
  return (
    <PageTabs isDesktop={isDesktop}>
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
    </PageTabs>
  )
}

export default ExtrinsicDetailsTab

type EventCardProps = {
  event: Event
}

// TODO: similar to EventCard, consider refactoring
const ExtrinsicDetailsEventCard: FC<EventCardProps> = ({ event }) => {
  const { selectedChain } = useDomains()
  const body = [
    { name: 'Action', value: event.name.split('.')[1] },
    { name: 'Extrinsic Id', value: `${event.extrinsic?.block.height}-${event.extrinsic?.indexInBlock}` },
    { name: 'Type', value: event.phase },
  ]
  return (
    <MobileCard
      id='extrinsic-details-event-mobile'
      header={
        <Link
          className='w-full'
          to={INTERNAL_ROUTES.events.id.page(selectedChain.urls.page, event.id)}
        >
          <h3 className='font-medium text-[#241235] text-sm dark:text-white'>
            <div>{`${event.block?.height}-${event.indexInBlock}`}</div>
          </h3>
        </Link>
      }
      body={body}
    />
  )
}
