import { FC } from 'react'
import { Log } from 'gql/graphql'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

// common
import { MobileCard, PageTabs, Tab } from 'common/components'

// block
import {
  BlockDetailsExtrinsicList,
  BlockDetailsEventList,
  BlockDetailsLogList,
} from 'Block/components'

dayjs.extend(relativeTime)

type Props = {
  logs: Log[]
  isDesktop?: boolean
  extrinsicsCount?: string
  eventsCount?: string
}

const BlockDetailsTabs: FC<Props> = ({ logs, extrinsicsCount, eventsCount, isDesktop = false }) => {
  return (
    <PageTabs isDesktop={isDesktop}>
      <Tab title={`Extrinsics (${extrinsicsCount})`}>
        <BlockDetailsExtrinsicList isDesktop={isDesktop} />
      </Tab>
      <Tab title={`Events (${eventsCount})`}>
        <BlockDetailsEventList isDesktop={isDesktop} />
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
      header={<h3 className='font-medium text-[#241235] dark:text-white text-sm'>{log.id}</h3>}
      body={body}
    />
  )
}
