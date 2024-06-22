import { Event } from 'gql/graphql'
import Link from 'next/link'
import { FC } from 'react'

// common
import { MobileCard } from 'components/common/MobileCard'
import { PageTabs } from 'components/common/PageTabs'
import { Tab } from 'components/common/Tabs'

// extrinsic
import { INTERNAL_ROUTES } from 'constants/routes'
import useDomains from 'hooks/useDomains'
import { ExtrinsicDetailsEventList } from './ExtrinsicDetailsEventList'

type Props = {
  events: Event[]
  isDesktop?: boolean
}

export const ExtrinsicDetailsTab: FC<Props> = ({ events, isDesktop = false }) => {
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

type EventCardProps = {
  event: Event
}

// TODO: similar to EventCard, consider refactoring
const ExtrinsicDetailsEventCard: FC<EventCardProps> = ({ event }) => {
  const { selectedChain, selectedDomain } = useDomains()
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
      id='extrinsic-details-event-mobile'
      header={
        <Link
          className='w-full'
          href={INTERNAL_ROUTES.events.id.page(selectedChain.urls.page, selectedDomain, event.id)}
        >
          <h3 className='text-sm font-medium text-grayDarker dark:text-white'>
            <div>{`${event.block?.height}-${event.indexInBlock}`}</div>
          </h3>
        </Link>
      }
      body={body}
    />
  )
}
