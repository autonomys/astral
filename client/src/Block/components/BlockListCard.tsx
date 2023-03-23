import { FC } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

// gql
import { Block } from 'gql/graphql'

// common
import { MobileCard, HeaderBlockLink } from 'common/components'
import { shortString } from 'common/helpers'
import { useDomains } from 'common/providers/ChainProvider'

dayjs.extend(relativeTime)

type Props = {
  block: Block
}

const BlockListCard: FC<Props> = ({ block }) => {
  const { selectedChain } = useDomains()
  const blockDate = dayjs(block.timestamp).fromNow(true)
  const body = [
    { name: 'Author', value: block.author?.id ? shortString(block.author?.id) : 'Uknown' },
    { name: 'Extrinsics', value: block.extrinsics.length },
    { name: 'Events', value: block.events.length },
    { name: 'Block hash', value: shortString(block.hash) },
    { name: 'Time', value: `${blockDate} ago` },
  ]
  return (
    <MobileCard
      id='block-list-mobile'
      header={<HeaderBlockLink chain={selectedChain.urls.page} height={block.height} />}
      body={body}
    />
  )
}

export default BlockListCard
