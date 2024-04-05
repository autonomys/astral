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

export const HomeBlockCard: FC<Props> = ({ block }) => {
  const { selectedChain, selectedDomain } = useDomains()
  const blockDate = dayjs(block.timestamp).fromNow(true)
  const body = [
    { name: 'Extrinsics', value: block.extrinsics?.length || 0 },
    { name: 'Events', value: block.events?.length || 0 },
    { name: 'Time', value: `${blockDate} ago` },
  ]
  return (
    <MobileCard
      id='home-block-list-mobile'
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
