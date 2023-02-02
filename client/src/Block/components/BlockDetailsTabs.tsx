import { FC } from 'react'
import { Event, Extrinsic, Log } from 'gql/graphql'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

// common
import { EventCard, MobileCard, PageTabs, Tab, ExtrinsicCard } from 'common/components'

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
    <PageTabs>
      <Tab title={`Extrinsics (${extrinsics.length})`}>
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
      <Tab title={`Events (${events.length})`}>
        {isDesktop ? (
          <BlockDetailsEventList events={events} />
        ) : (
          <div className='flex flex-col'>
            {events.map((event) => (
              <EventCard 
                key={`block-details-event-card-${event.id}`} 
                event={event} 
                id='block-details-event-mobile'
              />
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
    </PageTabs>
  )
}

export default BlockDetailsTabs

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
