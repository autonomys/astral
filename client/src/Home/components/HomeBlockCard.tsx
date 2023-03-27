import { FC } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

// gql
import { Block } from 'gql/graphql'

// common
import { MobileCard, HeaderBlockLink } from 'common/components'
import useDomains from 'common/hooks/useDomains'

dayjs.extend(relativeTime)

type Props = {
  block: Block
}

const HomeBlockCard: FC<Props> = ({ block }) => {
  const { selectedChain } = useDomains()
  const blockDate = dayjs(block.timestamp).fromNow(true)
  const body = [
    { name: 'Extrinsics', value: block.extrinsics?.length || 0 },
    { name: 'Events', value: block.events?.length || 0 },
    { name: 'Time', value: `${blockDate} ago` },
  ]
  return (
    <MobileCard
      id='home-block-list-mobile'
      header={<HeaderBlockLink chain={selectedChain.urls.page} height={block.height} />}
      body={body}
    />
  )
}

export default HomeBlockCard
