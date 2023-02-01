import { FC } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

// gql
import { Block } from 'gql/graphql'

// common
import { MobileCard, HeaderBlockLink } from 'common/components'
import { shortString } from 'common/helpers'

dayjs.extend(relativeTime)

type Props = {
  block: Block
}

const BlockListCard: FC<Props> = ({ block }) => {
  const blockDate = dayjs(block.timestamp).fromNow(true)
  const body = [
    { name: 'Extrinsics', value: block.extrinsics.length },
    { name: 'Events', value: block.events.length },
    { name: 'Block hash', value: shortString(block.hash) },
    { name: 'Time', value: `${blockDate} ago` },
  ]
  return (
    <MobileCard
      id='block-list-mobile'
      header={<HeaderBlockLink height={block.height} />}
      body={body}
    />
  )
}

export default BlockListCard
