import { FC } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

// gql
import { Block } from 'gql/graphql'

// common
import StatusIcon from 'common/components/StatusIcon'
import { shortString } from 'common/helpers'
import MobileCard from 'common/components/MobileCard'
import { Link } from 'react-router-dom'
import { INTERNAL_ROUTES } from 'common/routes'

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
      header={
        <Link className='flex gap-1' to={INTERNAL_ROUTES.blocks.id.page(block.height)}>
          <StatusIcon status={block.extrinsics[0].success} />
          <h3 className='font-medium text-[#241235] text-sm'>#{block.height}</h3>
        </Link>
      }
      body={body}
    />
  )
}

export default BlockListCard
