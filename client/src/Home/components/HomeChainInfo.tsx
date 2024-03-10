import { FC } from 'react'
import { ApolloError } from '@apollo/client'

// common
import { formatSpacePledged, numberWithCommas } from 'common/helpers'

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
  const spacePledgedVal = Number(block?.spacePledged || 0)
  const spacePledged = formatSpacePledged(spacePledgedVal)
  const historySizeVal = Number(block?.blockchainSize || 0)
  const historySize = formatSpacePledged(historySizeVal)
  const rewardAddresses = numberWithCommas(Number(data.accountsConnection.totalCount))
  const signedExtrinsics = numberWithCommas(Number(data.extrinsicsConnection.totalCount))
  const blocksCount = numberWithCommas(Number(block.height))

  return (
    <HomeCards
      signedExtrinsics={signedExtrinsics}
      rewardAddresses={rewardAddresses}
      spacePledged={spacePledged}
      blocksCount={blocksCount}
      historySize={historySize}
    />
  )
}

export default HomeChainInfo
