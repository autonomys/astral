import { PageTabs } from 'components/common/PageTabs'
import { Tab } from 'components/common/Tabs'
import { FC } from 'react'
import { ExtrinsicDetailsEventList } from './ExtrinsicDetailsEventList'

type Props = {
  eventsCount: number
  isDesktop?: boolean
}

export const ExtrinsicDetailsTab: FC<Props> = ({ eventsCount, isDesktop = false }) => {
  return (
    <PageTabs isDesktop={isDesktop}>
      <Tab title={`Events (${eventsCount})`}>
        <ExtrinsicDetailsEventList />
      </Tab>
    </PageTabs>
  )
}
