import { PageTabs } from 'components/common/PageTabs'
import { Tab } from 'components/common/Tabs'
import { FC } from 'react'
import { BlockDetailsEventList } from './BlockDetailsEventList'
import { BlockDetailsExtrinsicList } from './BlockDetailsExtrinsicList'
import { BlockDetailsLogList } from './BlockDetailsLogList'

type Props = {
  blockHeight: number
  extrinsicsCount: number
  eventsCount: number
  logsCount: number
  isDesktop: boolean
}

export const BlockDetailsTabs: FC<Props> = ({
  blockHeight,
  extrinsicsCount,
  eventsCount,
  logsCount,
  isDesktop = false,
}) => {
  return (
    <PageTabs pillStyle='py-2' activePillStyle='py-2' isDesktop={isDesktop}>
      <Tab title={`Extrinsics (${extrinsicsCount})`}>
        <BlockDetailsExtrinsicList
          blockHeight={blockHeight}
          extrinsicsCount={extrinsicsCount}
          isDesktop={isDesktop}
        />
      </Tab>
      <Tab title={`Events (${eventsCount})`}>
        <BlockDetailsEventList blockHeight={blockHeight} eventsCount={eventsCount} />
      </Tab>
      <Tab title={`Logs (${logsCount})`}>
        <BlockDetailsLogList blockHeight={blockHeight} logsCount={logsCount} />
      </Tab>
    </PageTabs>
  )
}
