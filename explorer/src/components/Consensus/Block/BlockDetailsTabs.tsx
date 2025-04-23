import { PageTabs } from 'components/common/PageTabs'
import { Tab } from 'components/common/Tabs'
import { FC } from 'react'
import { BlockDetailsEventList } from './BlockDetailsEventList'
import { BlockDetailsExtrinsicList } from './BlockDetailsExtrinsicList'
import { BlockDetailsLogList } from './BlockDetailsLogList'

type Props = {
  extrinsicsCount: number
  eventsCount: number
  logsCount: number
  isDesktop: boolean
}

export const BlockDetailsTabs: FC<Props> = ({
  extrinsicsCount,
  eventsCount,
  logsCount,
  isDesktop = false,
}) => {
  return (
    <PageTabs pillStyle='py-2' activePillStyle='py-2' isDesktop={isDesktop}>
      <Tab title={`Extrinsics (${extrinsicsCount})`}>
        <BlockDetailsExtrinsicList extrinsicsCount={extrinsicsCount} isDesktop={isDesktop} />
      </Tab>
      <Tab title={`Events (${eventsCount})`}>
        <BlockDetailsEventList eventsCount={eventsCount} />
      </Tab>
      <Tab title={`Logs (${logsCount})`}>
        <BlockDetailsLogList logsCount={logsCount} />
      </Tab>
    </PageTabs>
  )
}
