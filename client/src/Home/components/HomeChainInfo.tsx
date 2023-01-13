import { FC } from 'react'
import { ApolloError } from '@apollo/client'

// common
import { formatSpacePledged } from 'common/helpers'

// home
import { HomeCards } from 'Home/components'

interface HomeChainInfo {
  loading: boolean
  error?: ApolloError | undefined
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
}

const HomeChainInfo: FC<HomeChainInfo> = ({ data }) => {
  const [block] = data.blocks
  // won't have any archived blocks if there are less than 100 blocks
  const archivedBlock = block.height > 100 ? block.height - 100 : 0
  const spacePledgedVal = Number(block.spacePledged)
  const spacePledged = formatSpacePledged(spacePledgedVal)
  const historySizeVal = Number(block.blockchainSize)
  const historySize = formatSpacePledged(historySizeVal)
  const rewardAddresses = data.accountsConnection.totalCount
  const signedExtrinsics = data.extrinsicsConnection.totalCount

  return (
    <HomeCards
      archivedBlock={archivedBlock.toString()}
      signedExtrinsics={signedExtrinsics}
      rewardAddresses={rewardAddresses}
      spacePledged={spacePledged}
      bestBlock={block.height}
      historySize={historySize}
    />
  )
}

export default HomeChainInfo
