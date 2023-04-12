import { FC } from 'react'
import { Extrinsic } from 'gql/graphql'
import dayjs from 'dayjs'

// common
import { MobileCard, StatusIcon } from 'common/components'

type ExtrinsicCardProps = {
  extrinsic: Extrinsic
  id: string
}

const ExtrinsicCard: FC<ExtrinsicCardProps> = ({ extrinsic, id }) => {
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
          <h3 className='font-medium text-[#241235] text-sm dark:text-white'>{`${extrinsic.block.height}-${extrinsic.indexInBlock}`}</h3>
        </>
      }
      body={body}
    />
  )
}

export default ExtrinsicCard
