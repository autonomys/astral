import { Spinner } from '@/components/common/Spinner'
import { formatSpaceToBinary, formatSpaceToDecimal } from '@autonomys/auto-consensus'
import { useHomeCardsQueryQuery } from 'gql/graphql'
import { FC } from 'react'
import { useInView } from 'react-intersection-observer'
import { numberWithCommas } from 'utils/number'
import { HomeCards } from './HomeCards'

export const HomeChainInfo: FC = () => {
  const { ref, inView } = useInView()

  const { loading, data } = useHomeCardsQueryQuery({ skip: !inView })

  const spacePledgedVal = data ? Number(data.consensus_blocks[0].space_pledged) : 0
  const spacePledged = formatSpaceToDecimal(spacePledgedVal)
  const spacePledgedBinary = formatSpaceToBinary(spacePledgedVal)
  const historySizeVal = data ? Number(data.consensus_blocks[0].blockchain_size) : 0
  const historySize = formatSpaceToDecimal(historySizeVal)
  const historySizeBinary = formatSpaceToBinary(historySizeVal)
  const accountsCount = data
    ? numberWithCommas(Number(data.consensus_accounts_aggregate?.aggregate?.count))
    : 'error'
  const extrinsicsCount = data
    ? numberWithCommas(Number(data.consensus_extrinsics_aggregate?.aggregate?.count))
    : 'error'
  const blocksCount = data ? numberWithCommas(Number(data.consensus_blocks[0].height)) : 'error'

  return (
    <div ref={ref}>
      {!data || loading ? (
        <Spinner isXSmall />
      ) : (
        <HomeCards
          blocksCount={blocksCount}
          extrinsicsCount={extrinsicsCount}
          accountsCount={accountsCount}
          spacePledged={spacePledged}
          spacePledgedBinary={spacePledgedBinary}
          historySize={historySize}
          historySizeBinary={historySizeBinary}
        />
      )}
    </div>
  )
}
