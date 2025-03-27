import { PageTabs } from 'components/common/PageTabs'
import { Tab } from 'components/common/Tabs'
import { FC } from 'react'
import { ExtrinsicDetailsEventList } from './ExtrinsicDetailsEventList'

type Props = {
  eventsCount: number
  extrinsicId: string
  isDesktop?: boolean
}

export const ExtrinsicDetailsTab: FC<Props> = ({ eventsCount, extrinsicId, isDesktop = false }) => {
  return (
    <PageTabs isDesktop={isDesktop}>
      <Tab title={`Events (${eventsCount})`}>
        <ExtrinsicDetailsEventList eventsCount={eventsCount} extrinsicId={extrinsicId} />
      </Tab>
    </PageTabs>
  )
}
