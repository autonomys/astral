import HomeInfoCardSkeleton from '@/components/common/HomeInfoCardSkeleton'
import { useHistorySize } from '@/hooks/useHistorySize'
import { useSpacePledged } from '@/hooks/useSpacePledged'
import { ChainParam } from '@/types/app'
import { formatSpaceToDecimalAsObject } from '@autonomys/auto-consensus'
import type { HomeQuery } from 'gql/graphql'
import useIndexers from 'hooks/useIndexers'
import useMediaQuery from 'hooks/useMediaQuery'
import { useParams } from 'next/navigation'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { cn } from 'utils/cn'
import { HomeInfoCard } from './HomeInfoCard'

type TelemetryObject = [string, string, number, number]
type TelemetryData = TelemetryObject[]

type Props = {
  data: HomeQuery | undefined
  loading: boolean
}

export const HomeChainInfo: FC<Props> = ({ data, loading }) => {
  const { indexerSet } = useIndexers()
  const { chain } = useParams<ChainParam>()
  const isDesktop = useMediaQuery('(min-width: 1536px)')
  const [telemetryData, setTelemetryData] = useState<TelemetryData>([])
  const { spacePledgedVal } = useSpacePledged(chain || '')
  const { historySizeVal } = useHistorySize(chain || '')

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
    if (!telemetryData.length || !indexerSet.telemetryNetworkName) return 0
    try {
      const filterNetwork = telemetryData.filter(
        (item: TelemetryObject) => item[0] === indexerSet.telemetryNetworkName,
      )
      return filterNetwork.reduce(
        (max: number, current: TelemetryObject) => (current[2] > max ? current[2] : max),
        filterNetwork[0][2],
      )
    } catch (err) {
      console.error('Failed to get node count:', err)
      return 0
    }
  }, [telemetryData, indexerSet.telemetryNetworkName])

  const spacePledgedFormatted = formatSpaceToDecimalAsObject(spacePledgedVal)
  const historySize = formatSpaceToDecimalAsObject(historySizeVal)
  const blocksCount = data ? Number(data.consensus_blocks[0].height) : 'error'
  const accountsCount = data ? Number(data.consensus_accounts_aggregate?.aggregate?.count) : 'error'
  const extrinsicsCount = data
    ? Number(data.consensus_blocks[0].cumulative?.cumulative_extrinsics_count)
    : 'error'

  const listOfCards = useMemo(
    () => [
      {
        title: 'Processed Blocks',
        imagePath: '/images/icons/processed-blocks.webp',
        value: blocksCount,
        darkBgClass: 'dark:bg-boxDark',
      },
      {
        title: 'Wallet addresses',
        imagePath: '/images/icons/wallet-addresses.webp',
        value: accountsCount,
        darkBgClass: 'dark:bg-boxDark',
      },
      {
        title: 'Total Nodes',
        imagePath: '/images/icons/total-nodes.webp',
        value: nodeCount,
        darkBgClass: 'dark:bg-boxDark',
      },
      {
        title: 'Total Space Pledged',
        imagePath: '/images/icons/total-space-pledged.webp',
        value: spacePledgedFormatted.value,
        unit: spacePledgedFormatted.unit,
        decimal: 2,
        darkBgClass: 'dark:bg-boxDark',
      },
      {
        title: 'Archived History Size',
        imagePath: '/images/icons/archived-history-size.webp',
        value: historySize.value,
        unit: historySize.unit,
        decimal: 2,
        darkBgClass: 'dark:bg-boxDark',
      },
      {
        title: 'Total Extrinsics',
        imagePath: '/images/icons/total-extrinsics.webp',
        value: extrinsicsCount,
        darkBgClass: 'dark:bg-boxDark',
      },
    ],
    [blocksCount, nodeCount, spacePledgedFormatted, historySize, accountsCount, extrinsicsCount],
  )

  useEffect(() => {
    getTelemetryData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={20}
      pagination={{
        clickable: true,
        renderBullet: (index, className) =>
          `<span key="${index}" class="${className}" style="background-color: #1949D2;"></span>`,
      }}
      breakpoints={{
        460: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
        1536: {
          slidesPerView: 6,
          spaceBetween: 20,
        },
      }}
      modules={[Pagination]}
      className={cn('flex w-full items-center', isDesktop ? 'mb-12 !p-0' : 'mb-4 !pb-10')}
    >
      {!data || loading
        ? Array.from({ length: 6 }).map((_, index) => (
            <SwiperSlide key={`loader-${index}`}>
              <HomeInfoCardSkeleton key={index} />
            </SwiperSlide>
          ))
        : listOfCards.map(({ title, value, unit, decimal, imagePath, darkBgClass }, index) => (
            <SwiperSlide key={`${title}-${index}`}>
              <HomeInfoCard
                title={title}
                value={value}
                unit={unit}
                decimal={decimal}
                imagePath={imagePath}
                darkBgClass={darkBgClass}
              />
            </SwiperSlide>
          ))}
    </Swiper>
  )
}
