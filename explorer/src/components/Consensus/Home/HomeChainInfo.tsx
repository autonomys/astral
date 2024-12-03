import { Spinner } from '@/components/common/Spinner'
import { formatSpaceToDecimal } from '@autonomys/auto-consensus'
import { useHomeCardsQueryQuery } from 'gql/graphql'
import { FC, useCallback, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { numberWithCommas } from 'utils/number'
import { HomeCards } from './HomeCards'

type TelemetryObject = [string, string, number, number]
type TelemetryData = TelemetryObject[]

export const HomeChainInfo: FC = () => {
  const { ref, inView } = useInView()
  const { loading, data } = useHomeCardsQueryQuery({ skip: !inView })
  const [rawNodeCount, setRawNodeCount] = useState<number>(0)

  const getTelemetryData = useCallback(async () => {
    const ws = new WebSocket('wss://telemetry.subspace.network/feed')
    ws.onopen = () => {
      console.log('Telemetry WebSocket connected')
      ws.send(JSON.stringify({ ping: 1 }))
    }

    ws.onmessage = async (event) => {
      try {
        const text = await event.data.text()
        const jsonData: TelemetryData = JSON.parse(text)
        const filterNetwork = jsonData.filter(
          (item: TelemetryObject) => item[0] === 'Autonomys Mainnet',
        )
        const nodeCount = filterNetwork.reduce(
          (max: number, current: TelemetryObject) => (current[2] > max ? current[2] : max),
          filterNetwork[0][2],
        )
        setRawNodeCount(nodeCount)
      } catch (err) {
        console.error('Failed to parse Blob as JSON:', err)
      }
    }

    ws.onerror = (error) => console.error('Telemetry WebSocket error:', error)
    ws.onclose = () => console.log('WebSocket disconnected')

    return () => ws.close()
  }, [])

  const spacePledgedVal = data ? Number(data.consensus_blocks[0].space_pledged) : 0
  const spacePledged = formatSpaceToDecimal(spacePledgedVal)
  const historySizeVal = data ? Number(data.consensus_blocks[0].blockchain_size) : 0
  const historySize = formatSpaceToDecimal(historySizeVal)
  const blocksCount = data ? numberWithCommas(Number(data.consensus_blocks[0].height)) : 'error'
  const nodeCount = numberWithCommas(rawNodeCount)

  useEffect(() => {
    getTelemetryData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div ref={ref}>
      {!data || loading ? (
        <Spinner isXSmall />
      ) : (
        <HomeCards
          blocksCount={blocksCount}
          spacePledged={spacePledged}
          nodeCount={nodeCount}
          historySize={historySize}
        />
      )}
    </div>
  )
}
