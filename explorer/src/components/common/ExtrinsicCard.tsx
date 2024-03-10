import dayjs from 'dayjs'
import { Extrinsic } from 'gql/graphql'
import { FC } from 'react'
import { MobileCard } from './MobileCard'
import { StatusIcon } from './StatusIcon'

type ExtrinsicCardProps = {
  extrinsic: Extrinsic
  id: string
}

export const ExtrinsicCard: FC<ExtrinsicCardProps> = ({ extrinsic, id }) => {
  const blockDate = dayjs(extrinsic.block.timestamp).fromNow(true)

  const body = [
    { name: 'Block', value: extrinsic.block.height },
    { name: 'Call', value: extrinsic.name.split('.')[1].toUpperCase() },
    { name: 'Time', value: `${blockDate} ago` },
  ]
  return (
    <MobileCard
      id={id}
      header={
        <>
          <StatusIcon status={extrinsic.success} />
          <h3 className='text-sm font-medium text-[#241235] dark:text-white'>{`${extrinsic.block.height}-${extrinsic.indexInBlock}`}</h3>
        </>
      }
      body={body}
    />
  )
}
