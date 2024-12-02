import { formatSpaceToBinary, formatSpaceToDecimal } from '@autonomys/auto-consensus'
import type { HomeCardsQueryQuery } from 'gql/graphql'
import { FC } from 'react'
import { numberWithCommas } from 'utils/number'
import { HomeCards } from './HomeCards'

interface HomeChainInfo {
  data: HomeCardsQueryQuery
}

export const HomeChainInfo: FC<HomeChainInfo> = ({ data }) => {
  const [block] = data.consensus_blocks
  const spacePledgedVal = Number(
    (block as HomeCardsQueryQuery['consensus_blocks'][0])?.space_pledged || 0,
  )
  const spacePledged = formatSpaceToDecimal(spacePledgedVal)
  const spacePledgedBinary = formatSpaceToBinary(spacePledgedVal)
  const historySizeVal = Number(
    (block as HomeCardsQueryQuery['consensus_blocks'][0])?.blockchain_size || 0,
  )
  const historySize = formatSpaceToDecimal(historySizeVal)
  const historySizeBinary = formatSpaceToBinary(historySizeVal)
  const accountsCount = numberWithCommas(
    Number(data.consensus_accounts_aggregate?.aggregate?.count),
  )
  const extrinsicsCount = numberWithCommas(
    Number(data.consensus_extrinsics_aggregate?.aggregate?.count),
  )
  const blocksCount = numberWithCommas(Number(block.height))

  return (
    <HomeCards
      blocksCount={blocksCount}
      extrinsicsCount={extrinsicsCount}
      accountsCount={accountsCount}
      spacePledged={spacePledged}
      spacePledgedBinary={spacePledgedBinary}
      historySize={historySize}
      historySizeBinary={historySizeBinary}
    />
  )
}
