import { FC } from 'react'
import { Event, Extrinsic, Log } from 'gql/graphql'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

// common
import { StatusIcon, MobileCard, Tabs, Tab } from 'common/components'

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
      tabStyle={isDesktop ? 'bg-white border border-slate-100 shadow rounded-[20px] p-4' : ''}
      tabTitleStyle={!isDesktop ? 'bg-white rounded-full mb-5 px-5' : ''}
    >
      <Tab title={`Extrinsics (${extrinsics.length})`}>
        {isDesktop ? (
          <BlockDetailsExtrinsicList extrinsics={extrinsics} />
        ) : (
          <div className='flex flex-col'>
            {extrinsics.map((extrinsic) => (
              <BlockDetailsExtrinsicCard
                key={`block-details-extrinsic-card-${extrinsic.id}`}
                extrinsic={extrinsic}
              />
            ))}
          </div>
        )}
      </Tab>
      <Tab title={`Events (${events.length})`}>
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
      <Tab title={`Logs (${logs.length})`}>
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

type ExtrinsicCardProps = {
  extrinsic: Extrinsic
}

const BlockDetailsExtrinsicCard: FC<ExtrinsicCardProps> = ({ extrinsic }) => {
  const blockDate = dayjs(extrinsic.block.timestamp).fromNow(true)

  const body = [
    { name: 'Block', value: extrinsic.block.height },
    { name: 'Call', value: extrinsic.name.split('.')[1].toUpperCase() },
    { name: 'Time', value: `${blockDate} ago` },
  ]
  return (
    <MobileCard
      id='block-details-extrinsic-mobile'
      header={
        <>
          <StatusIcon status={extrinsic.success} />
          <h3 className='font-medium text-[#241235] text-sm'>{`${extrinsic.pos}.${extrinsic.block.height}`}</h3>
        </>
      }
      body={body}
    />
  )
}

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
