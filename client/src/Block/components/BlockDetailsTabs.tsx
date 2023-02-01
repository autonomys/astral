import { FC } from 'react'
import { Event, Extrinsic, Log } from 'gql/graphql'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

// common
import { MobileCard, Tabs, Tab, ExtrinsicCard } from 'common/components'

// block
import {
  BlockDetailsExtrinsicList,
  BlockDetailsEventList,
  BlockDetailsLogList,
} from 'Block/components'

dayjs.extend(relativeTime)

type Props = {
  events: Event[]
  extrinsics: Extrinsic[]
  logs: Log[]
  isDesktop?: boolean
}

const BlockDetailsTabs: FC<Props> = ({ logs, events, extrinsics, isDesktop = false }) => {
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
      <Tab title='Extrinsics'>
        {isDesktop ? (
          <BlockDetailsExtrinsicList extrinsics={extrinsics} />
        ) : (
          <div className='flex flex-col'>
            {extrinsics.map((extrinsic) => (
              <ExtrinsicCard
                id='block-details-extrinsic-mobile'
                key={`block-details-extrinsic-card-${extrinsic.id}`}
                extrinsic={extrinsic}
              />
            ))}
          </div>
        )}
      </Tab>
      <Tab title='Events'>
        {isDesktop ? (
          <BlockDetailsEventList events={events} />
        ) : (
          <div className='flex flex-col'>
            {events.map((event) => (
              <BlockDetailsEventCard key={`block-details-event-card-${event.id}`} event={event} />
            ))}
          </div>
        )}
      </Tab>
      <Tab title='Logs'>
        {isDesktop ? (
          <BlockDetailsLogList logs={logs} />
        ) : (
          <div className='flex flex-col'>
            {logs.map((log) => (
              <BlockDetailsLogCard key={`block-details-log-card-${log.id}`} log={log} />
            ))}
          </div>
        )}
      </Tab>
    </Tabs>
  )
}

export default BlockDetailsTabs

type EventCardProps = {
  event: Event
}

const BlockDetailsEventCard: FC<EventCardProps> = ({ event }) => {
  const body = [
    { name: 'Action', value: event.name.split('.')[1] },
    { name: 'Extrinsic Id', value: `${event.extrinsic?.block.height}-${event.extrinsic?.pos}` },
    { name: 'Type', value: event.phase },
  ]
  return (
    <MobileCard
      id='block-details-event-mobile'
      header={
        <h3 className='font-medium text-[#241235] text-sm'>{`$${event.block?.height}-${event.pos}`}</h3>
      }
      body={body}
    />
  )
}

type LogCardProps = {
  log: Log
}

const BlockDetailsLogCard: FC<LogCardProps> = ({ log }) => {
  const body = [
    {
      name: 'Block',
      value: log.block.height,
    },
    {
      name: 'Type',
      value: log.kind,
    },
  ]
  return (
    <MobileCard
      id='block-details-log-mobile'
      header={<h3 className='font-medium text-[#241235] text-sm'>{log.id}</h3>}
      body={body}
    />
  )
}
