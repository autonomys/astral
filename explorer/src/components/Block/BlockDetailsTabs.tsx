import { MobileCard } from 'components/common/MobileCard'
import { PageTabs } from 'components/common/PageTabs'
import { Tab } from 'components/common/Tabs'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Log } from 'gql/graphql'
import { FC } from 'react'
import { BlockDetailsEventList } from './BlockDetailsEventList'
import { BlockDetailsExtrinsicList } from './BlockDetailsExtrinsicList'
import { BlockDetailsLogList } from './BlockDetailsLogList'

dayjs.extend(relativeTime)

type Props = {
  logs: Log[]
  isDesktop?: boolean
  extrinsicsCount?: number
  eventsCount?: number
}

export const BlockDetailsTabs: FC<Props> = ({
  logs,
  extrinsicsCount,
  eventsCount,
  isDesktop = false,
}) => {
  return (
    <PageTabs isDesktop={isDesktop}>
      <Tab title={`Extrinsics (${extrinsicsCount})`}>
        <BlockDetailsExtrinsicList isDesktop={isDesktop} />
      </Tab>
      <Tab title={`Events (${eventsCount})`}>
        <BlockDetailsEventList />
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
      header={<h3 className='text-sm font-medium text-grayDarker dark:text-white'>{log.id}</h3>}
      body={body}
    />
  )
}
