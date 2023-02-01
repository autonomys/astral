import { FC } from 'react'
import { Extrinsic } from 'gql/graphql'

// common
import { StatusIcon } from 'common/components'

type Props = { 
  extrinsic: Extrinsic 
}

const ExtrinsicHeader: FC<Props> = ({ extrinsic }) => (
  <>
    <StatusIcon status={extrinsic.success} />
    <h3 className='font-medium text-[#241235] text-sm dark:text-white'>{`${extrinsic.pos}.${extrinsic.block.height}`}</h3>
  </>
)

export default ExtrinsicHeader
