import { EventCard } from 'components/common/EventCard'
import { PageTabs } from 'components/common/PageTabs'
import { Tab } from 'components/common/Tabs'
import { Event } from 'gql/graphql'
import useMediaQuery from 'hooks/useMediaQuery'
import { FC } from 'react'
import { LogDetailsEventList } from './LogDetailsEventList'

type Props = {
  events: Event[]
}

export const LogDetailsTab: FC<Props> = ({ events }) => {
  const isDesktop = useMediaQuery('(min-width: 1440px)')

  return (
    <PageTabs isDesktop={isDesktop}>
      <Tab title='Events'>
        {isDesktop ? (
          <LogDetailsEventList events={events} />
        ) : (
          <div className='flex flex-col'>
            {events.map((event) => (
              <EventCard
                key={`extrinsic-details-event-card-${event.id}`}
                event={event}
                id='extrinsic-details-event-mobile'
              />
            ))}
          </div>
        )}
      </Tab>
    </PageTabs>
  )
}
