import HomeInfoCardSkeleton from '@/components/common/HomeInfoCardSkeleton'
import useMediaQuery from '@/hooks/useMediaQuery'
import { cn } from '@/utils/cn'
import type { HomeQuery } from 'gql/graphql'
import useIndexers from 'hooks/useIndexers'
import { FC, useMemo } from 'react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { bigNumberToNumber, formatNumberWithUnit, safeDivide } from 'utils/number'
import { HomeInfoCard } from './HomeInfoCard'

type Props = {
  data: HomeQuery | undefined
  loading: boolean
}

export const HomeChainInfoExtra: FC<Props> = ({ data, loading }) => {
  const { tokenSymbol } = useIndexers()
  const isDesktop = useMediaQuery('(min-width: 1536px)')

  const eventsCount = data
    ? Number(data.consensus_blocks[0].cumulative?.cumulative_events_count)
    : 'error'
  const transfersCount = data
    ? Number(data.consensus_blocks[0].cumulative?.cumulative_transfers_count)
    : 'error'
  const transferValue = data
    ? bigNumberToNumber(data.consensus_blocks[0].cumulative?.cumulative_transfer_value)
    : 'error'
  const rewardsCount = data
    ? Number(data.consensus_blocks[0].cumulative?.cumulative_rewards_count)
    : 'error'
  const rewardsValue = data
    ? bigNumberToNumber(data.consensus_blocks[0].cumulative?.cumulative_reward_value)
    : 'error'
  const spacePledgedVal = data ? Number(data.consensus_blocks[0].space_pledged) : 0
  const historySizeVal = data ? Number(data.consensus_blocks[0].blockchain_size) : 0
  const replicationFactor = formatNumberWithUnit(safeDivide(spacePledgedVal, historySizeVal))

  const listOfCards = useMemo(
    () => [
      {
        title: 'Total Events',
        value: eventsCount,
        darkBgClass: 'dark:bg-boxDark',
      },
      {
        title: 'Total Transfers',
        value: transfersCount,
        darkBgClass: 'dark:bg-boxDark',
      },
      {
        title: 'Total Transfers Value',
        value: transferValue,
        darkBgClass: 'dark:bg-boxDark',
        unit: tokenSymbol,
      },
      {
        title: 'Total Rewards',
        value: rewardsCount,
        darkBgClass: 'dark:bg-boxDark',
      },
      {
        title: 'Total Rewards Value',
        value: rewardsValue,
        darkBgClass: 'dark:bg-boxDark',
        unit: tokenSymbol,
        decimal: 2,
      },
      {
        title: 'Data Replication Factor',
        value: replicationFactor.value,
        darkBgClass: 'dark:bg-boxDark',
        unit: replicationFactor.unit,
        decimal: 2,
      },
    ],
    [
      eventsCount,
      transfersCount,
      transferValue,
      rewardsCount,
      rewardsValue,
      tokenSymbol,
      replicationFactor,
    ],
  )

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
      className={cn('flex w-full items-center gap-5', isDesktop ? '!p-0' : '!pb-10')}
    >
      {!data || loading
        ? Array.from({ length: 6 }).map((_, index) => (
            <SwiperSlide key={`loader-${index}`}>
              <HomeInfoCardSkeleton
                key={index}
                className='h-[120px]'
                imagePlaceholderClassName='hidden'
              />
            </SwiperSlide>
          ))
        : listOfCards.map(({ title, value, unit, decimal, darkBgClass }, index) => (
            <SwiperSlide key={`${title}-${index}`}>
              <HomeInfoCard
                key={`${title}-${index}`}
                title={title}
                value={value}
                unit={unit}
                decimal={decimal}
                darkBgClass={darkBgClass}
              />
            </SwiperSlide>
          ))}
    </Swiper>
  )
}
