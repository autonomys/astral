import { FC } from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

// gql
import { Block } from 'gql/graphql'

// common
import { MobileCard } from 'common/components'
import { INTERNAL_ROUTES } from 'common/routes'

dayjs.extend(relativeTime)

type Props = {
  block: Block
}

const HomeBlockCard: FC<Props> = ({ block }) => {
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
        <Link className='flex gap-1' to={INTERNAL_ROUTES.blocks.id.page(block.height)}>
          <h3 className='font-medium text-[#241235] text-sm dark:text-white'>#{block.height}</h3>
        </Link>
      }
      body={body}
    />
  )
}

export default HomeBlockCard
