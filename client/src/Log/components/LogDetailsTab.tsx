import { FC } from 'react'
import { Event } from 'gql/graphql'

// common
import { EventCard, Tabs, Tab } from 'common/components'
import useMediaQuery from 'common/hooks/useMediaQuery'

// log
import { LogDetailsEventList } from 'Log/components'

type Props = {
  events: Event[]
}

const LogDetailsTab: FC<Props> = ({ events }) => {
  const isDesktop = useMediaQuery('(min-width: 1440px)')

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
    </Tabs>
  )
}

export default LogDetailsTab
