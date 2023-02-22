import { FC } from 'react'
import { Event } from 'gql/graphql'

// common
import { EventCard, Tab, PageTabs } from 'common/components'
import useMediaQuery from 'common/hooks/useMediaQuery'

// log
import { LogDetailsEventList } from 'Log/components'

type Props = {
  events: Event[]
}

const LogDetailsTab: FC<Props> = ({ events }) => {
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

export default LogDetailsTab
