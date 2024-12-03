import { Spinner } from '@/components/common/Spinner'
import { formatSpaceToDecimal } from '@autonomys/auto-consensus'
import { useHomeCardsQueryQuery } from 'gql/graphql'
import useIndexers from 'hooks/useIndexers'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { numberWithCommas } from 'utils/number'
import { HomeCards } from './HomeCards'

type TelemetryObject = [string, string, number, number]
type TelemetryData = TelemetryObject[]

export const HomeChainInfo: FC = () => {
  const { ref, inView } = useInView()
  const { indexerSet } = useIndexers()
  const { loading, data } = useHomeCardsQueryQuery({ skip: !inView })
  const [telemetryData, setTelemetryData] = useState<TelemetryData>([])

  const getTelemetryData = useCallback(async () => {
    if (!process.env.NEXT_PUBLIC_TELEMETRY_URL) return

    const ws = new WebSocket(process.env.NEXT_PUBLIC_TELEMETRY_URL)
    ws.onopen = () => {
      console.log('Telemetry WebSocket connected')
      ws.send(JSON.stringify({ ping: 1 }))
    }

    ws.onmessage = async (event) => {
      try {
        const text = await event.data.text()
        const jsonData: TelemetryData = JSON.parse(text)
        setTelemetryData(jsonData)
      } catch (err) {
        console.error('Failed to parse Blob as JSON:', err)
      }
    }

    ws.onerror = (error) => console.error('Telemetry WebSocket error:', error)
    ws.onclose = () => console.log('WebSocket disconnected')

    return () => ws.close()
  }, [])

  const nodeCount = useMemo(() => {
    if (!telemetryData.length || !indexerSet.telemetryNetworkName) return '0'
    try {
      const filterNetwork = telemetryData.filter(
        (item: TelemetryObject) => item[0] === indexerSet.telemetryNetworkName,
      )
      return numberWithCommas(
        filterNetwork.reduce(
          (max: number, current: TelemetryObject) => (current[2] > max ? current[2] : max),
          filterNetwork[0][2],
        ),
      )
    } catch (err) {
      console.error('Failed to get node count:', err)
      return '0'
    }
  }, [telemetryData, indexerSet.telemetryNetworkName])

  const spacePledgedVal = data ? Number(data.consensus_blocks[0].space_pledged) : 0
  const spacePledged = formatSpaceToDecimal(spacePledgedVal)
  const historySizeVal = data ? Number(data.consensus_blocks[0].blockchain_size) : 0
  const historySize = formatSpaceToDecimal(historySizeVal)
  const blocksCount = data ? numberWithCommas(Number(data.consensus_blocks[0].height)) : 'error'

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
