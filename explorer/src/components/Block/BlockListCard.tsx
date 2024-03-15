import { shortString } from '@/utils/string'
import { HeaderBlockLink } from 'components/common/HeaderBlockLink'
import { MobileCard } from 'components/common/MobileCard'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Block } from 'gql/graphql'
import useDomains from 'hooks/useDomains'
import { FC } from 'react'

dayjs.extend(relativeTime)

type Props = {
  block: Block
}

export const BlockListCard: FC<Props> = ({ block }) => {
  const { selectedChain, selectedDomain } = useDomains()
  const blockDate = dayjs(block.timestamp).fromNow(true)
  const body = [
    { name: 'Author', value: block.author?.id ? shortString(block.author?.id) : 'Unknown' },
    { name: 'Extrinsics', value: block.extrinsics.length },
    { name: 'Events', value: block.events.length },
    { name: 'Block hash', value: shortString(block.hash) },
    { name: 'Time', value: `${blockDate} ago` },
  ]
  return (
    <MobileCard
      id='block-list-mobile'
      header={
        <HeaderBlockLink
          chain={selectedChain.urls.page}
          domain={selectedDomain}
          height={block.height}
        />
      }
      body={body}
    />
  )
}
