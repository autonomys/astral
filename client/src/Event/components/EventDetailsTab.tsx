import { FC } from 'react'

// gql
import { Event } from 'gql/graphql'

// common
import { MobileCard, Tabs, Tab } from 'common/components'
import { shortString } from 'common/helpers'

// event
import { EventTabDescription } from 'Event/components'

type Props = {
  event: Event
  isDesktop?: boolean
}

const EventDetailsTab: FC<Props> = ({ event, isDesktop = false }) => {
  return (
    <Tabs
      tabStyle={isDesktop ? 'bg-white border border-slate-100 shadow rounded-lg p-4 dark:bg-gradient-to-r dark:from-[#4141B3] dark:via-[#6B5ACF] dark:to-[#896BD2] dark:border-none' : ''}
      tabTitleStyle={!isDesktop ? 'bg-white rounded-full mb-5 px-5' : ''}
    >
      <Tab title='Events'>
        {isDesktop ? <EventTabDescription event={event} /> : <EventDetailsCard event={event} />}
      </Tab>
    </Tabs>
  )
}

export default EventDetailsTab

const EventDetailsCard: FC<Props> = ({ event }) => {
  const body = [
    { name: 'Event Id', value: event.id },
    { name: 'Hash', value: shortString(event.block?.hash || '') },
    { name: 'Action', value: event.phase },
  ]
  return (
    <MobileCard
      id='extrinsic-details-event-mobile'
      header={
        <h3 className='font-medium text-[#241235] text-sm dark:text-white'>{`$${event.block?.height}-${event.pos}`}</h3>
      }
      body={body}
    >
      <div className='block bg-[#F3FBFF] rounded-lg px-5 py-8 mt-5 dark:bg-white/10'>
        <div className='w-full divide-y divide-gray-200 text-[#282929] text-xs dark:text-white dark:divide-white/20'>
          <div className='flex justify-between  py-2'>
            <div>Signer</div>
            <div>{event.extrinsic?.signer?.id || '-'}</div>
          </div>
          <div className='flex justify-between py-2'>
            <div>Fee</div>
            <div>{event.extrinsic?.fee}</div>
          </div>
          <div className='flex justify-between py-2'>
            <div>Tip</div>
            <div>{event.extrinsic?.tip}</div>
          </div>
        </div>
      </div>
    </MobileCard>
  )
}
