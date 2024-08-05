import { PageTabs } from 'components/common/PageTabs'
import { Tab } from 'components/common/Tabs'
import { Event } from 'gql/graphql'
import { FC } from 'react'
import { ExtrinsicDetailsEventList } from './ExtrinsicDetailsEventList'

type Props = {
  events: Event[]
  isDesktop?: boolean
}

export const ExtrinsicDetailsTab: FC<Props> = ({ events, isDesktop = false }) => {
  return (
    <PageTabs isDesktop={isDesktop}>
      <Tab title={`Events (${events.length})`}>
        <ExtrinsicDetailsEventList events={events} />
      </Tab>
    </PageTabs>
  )
}
