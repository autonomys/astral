import { Spinner } from '@/components/common/Spinner'
import type { HomeQuery } from 'gql/graphql'
import useIndexers from 'hooks/useIndexers'
import { FC, useMemo } from 'react'
import { bigNumberToNumber, numberWithCommas } from 'utils/number'
import { HomeInfoCard } from './HomeInfoCard'

type Props = {
  data: HomeQuery | undefined
  loading: boolean
}

export const HomeChainInfoExtra: FC<Props> = ({ data, loading }) => {
  const { tokenSymbol } = useIndexers()

  const eventsCount = data
    ? numberWithCommas(Number(data.consensus_blocks[0].cumulative?.cumulative_events_count))
    : 'error'
  const transfersCount = data
    ? numberWithCommas(Number(data.consensus_blocks[0].cumulative?.cumulative_transfers_count))
    : 'error'
  const transferValue = data
    ? numberWithCommas(
        bigNumberToNumber(data.consensus_blocks[0].cumulative?.cumulative_transfer_value),
      ) + ` ${tokenSymbol}`
    : 'error'
  const rewardsCount = data
    ? numberWithCommas(Number(data.consensus_blocks[0].cumulative?.cumulative_rewards_count))
    : 'error'
  const rewardsValue = data
    ? numberWithCommas(
        bigNumberToNumber(data.consensus_blocks[0].cumulative?.cumulative_reward_value),
      ) + ` ${tokenSymbol}`
    : 'error'

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
      },
    ],
    [eventsCount, transfersCount, transferValue, rewardsCount, rewardsValue],
  )

  return (
    <>
      {!data || loading ? (
        <Spinner isXSmall />
      ) : (
        <div className='flex w-full items-center gap-5 overflow-x-auto'>
          {listOfCards.map(({ title, value, darkBgClass }, index) => (
            <HomeInfoCard
              key={`${title}-${index}`}
              title={title}
              value={value}
              darkBgClass={darkBgClass}
            />
          ))}
        </div>
      )}
    </>
  )
}
