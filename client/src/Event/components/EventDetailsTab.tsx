import { FC } from 'react'

// gql
import { Event } from 'gql/graphql'

// common
import Tabs from 'common/components/Tabs'
import MobileCard from 'common/components/MobileCard'
import { shortString } from 'common/helpers'

// event
import EventTabDescription from './EventTabDescription'

type Props = {
  event: Event
  isDesktop?: boolean
}

const EventDetailsTab: FC<Props> = ({ event, isDesktop = false }) => {
  const tabs = [
    {
      title: 'Events',
      content: isDesktop ? (
        <EventTabDescription event={event} />
      ) : (
        <EventDetailsCard event={event} />
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
        <h3 className='font-medium text-[#241235] text-sm'>{`$${event.block?.height}-${event.pos}`}</h3>
      }
      body={body}
    >
      <div className='block bg-[#F3FBFF] rounded-lg px-5 py-8 mt-5'>
        <div className='w-full divide-y divide-gray-200 text-[#282929] text-xs'>
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
