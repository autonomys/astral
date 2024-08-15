import type { HomeQueryDomainQuery, HomeQueryQuery } from 'gql/graphql'
import { FC } from 'react'
import { formatSpacePledged, numberWithCommas } from 'utils/number'
import { HomeCards } from './HomeCards'

interface HomeChainInfo {
  data: HomeQueryQuery | HomeQueryDomainQuery
}

export const HomeChainInfo: FC<HomeChainInfo> = ({ data }) => {
  const [block] = data.blocks
  const spacePledgedVal = Number((block as HomeQueryQuery['blocks'][0])?.spacePledged || 0)
  const spacePledged = formatSpacePledged(spacePledgedVal)
  const historySizeVal = Number((block as HomeQueryQuery['blocks'][0])?.blockchainSize || 0)
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
