import { FC } from 'react'
import { Event } from 'gql/graphql'

// common
import Tabs from 'common/components/Tabs'

// log
import LogDetailsEventList from './LogDetailsEventList'

type Props = {
  events: Event[]
}

const LogDetailsTab: FC<Props> = ({ events }) => {
  const tabs = [
    {
      title: 'Events',
      content: <LogDetailsEventList events={events} />,
    },
  ]

  return <Tabs id='block-details-tab' tabs={tabs} />
}

export default LogDetailsTab
