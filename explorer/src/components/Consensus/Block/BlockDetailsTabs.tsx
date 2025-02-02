import { MobileCard } from 'components/common/MobileCard'
import { PageTabs } from 'components/common/PageTabs'
import { Tab } from 'components/common/Tabs'
import { BlockByIdQuery } from 'gql/graphql'
import { FC } from 'react'
import { BlockDetailsEventList } from './BlockDetailsEventList'
import { BlockDetailsExtrinsicList } from './BlockDetailsExtrinsicList'
import { BlockDetailsLogList } from './BlockDetailsLogList'

type Logs = NonNullable<BlockByIdQuery['consensus_blocks'][number]>['logs']

type Props = {
  logs: Logs
  extrinsicsCount: number
  eventsCount: number
  isDesktop: boolean
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
        <BlockDetailsExtrinsicList extrinsicsCount={extrinsicsCount} isDesktop={isDesktop} />
      </Tab>
      <Tab title={`Events (${eventsCount})`}>
        <BlockDetailsEventList eventsCount={eventsCount} />
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
  log: Logs[number]
}

const BlockDetailsLogCard: FC<LogCardProps> = ({ log }) => {
  const body = [
    {
      name: 'Block',
      value: log.block_height ?? 'N/A',
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
