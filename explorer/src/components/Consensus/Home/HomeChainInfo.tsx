import type { HomeQueryQuery } from 'gql/graphql'
import { FC } from 'react'
import { formatSpaceInDecimal, numberWithCommas } from 'utils/number'
import { HomeCards } from './HomeCards'

interface HomeChainInfo {
  data: HomeQueryQuery
}

export const HomeChainInfo: FC<HomeChainInfo> = ({ data }) => {
  const [block] = data.consensus_blocks
  const spacePledgedVal = Number(
    (block as HomeQueryQuery['consensus_blocks'][0])?.space_pledged || 0,
  )
  const spacePledged = formatSpaceInDecimal(spacePledgedVal)
  const historySizeVal = Number(
    (block as HomeQueryQuery['consensus_blocks'][0])?.blockchain_size || 0,
  )
  const historySize = formatSpaceInDecimal(historySizeVal)
  const rewardAddresses = numberWithCommas(
    Number(data.consensus_accounts_aggregate?.aggregate?.count),
  )
  const signedExtrinsics = numberWithCommas(
    Number(data.consensus_extrinsics_aggregate?.aggregate?.count),
  )
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
