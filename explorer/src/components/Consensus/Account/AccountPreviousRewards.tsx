import { DEFAULT_TOKEN_SYMBOL, TESTNET_TOKEN } from '@autonomys/auto-utils'
import { sendGAEvent } from '@next/third-parties/google'
import { Spinner } from 'components/common/Spinner'
import { SUBSPACE_ACC_PREFIX_TESTNET } from 'constants/general'
import { useParams } from 'next/navigation'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { AccountIdParam } from 'types/app'
import { formatAddress } from 'utils//formatAddress'
import {
  AllRewards,
  CAMPAIGNS,
  DEFAULT_REWARDS,
  getTestnetRewards,
  getTotalMainnetAllocationByPhase,
  getTotalUserMainnetPercentageAllocation,
  getUserTestnetRewards,
  getUserTestnetRewardsByPhase,
  getUserTestnetRewardsPercentageByPhase,
  Rewards,
} from 'utils/testnetRewards'

interface AccountPreviousRewardsProps {
  isDesktop: boolean
}

export const AccountPreviousRewards: FC<AccountPreviousRewardsProps> = () => {
  const { ref } = useInView()
  const { accountId } = useParams<AccountIdParam>()
  const [isLoaded, setIsLoaded] = useState(false)
  const [isAggregated, setIsAggregated] = useState(false)
  const [allRewards, setAllRewards] = useState<AllRewards[]>([])
  const [rewards, setRewards] = useState<Rewards>(DEFAULT_REWARDS)
  const [totalRewards, setTotalRewards] = useState<Rewards>(DEFAULT_REWARDS)

  const stFormattedAccountId = useMemo(() => {
    const addresses = [formatAddress(accountId, SUBSPACE_ACC_PREFIX_TESTNET)]
    return addresses.filter((address): address is string => address !== undefined)
  }, [accountId])

  const handleLoad = useCallback(async () => {
    const { rewardsData, totals } = await getTestnetRewards()
    setAllRewards(rewardsData)
    setTotalRewards(totals)
    setIsLoaded(true)
  }, [])

  const handleAggregated = useCallback(async () => {
    if (!isLoaded || !accountId) return
    const mergedRewards = await getUserTestnetRewards(allRewards, stFormattedAccountId)
    setRewards(mergedRewards)
    setIsAggregated(true)
  }, [accountId, allRewards, isLoaded, stFormattedAccountId])

  useEffect(() => {
    handleLoad()
  }, [handleLoad])

  useEffect(() => {
    if (isLoaded) {
      handleAggregated()
      sendGAEvent('event', 'check_account_previous_rewards', {
        value: accountId,
      })
    }
  }, [accountId, isLoaded, handleAggregated])

  return (
    <div
      className='flex w-full flex-col rounded-lg border border-gray-200 p-4 dark:border-none'
      ref={ref}
    >
      {!isLoaded || !isAggregated ? (
        <Spinner isXSmall />
      ) : (
        <div className='flex w-full flex-col gap-6 py-4 pl-4'>
          <div className='grid w-full grid-cols-4 gap-8 xl:gap-8'>
            <div className='col-span-1 text-[13px] font-normal text-blueShade dark:text-white/75'>
              Testnet
            </div>
            <div className='col-span-1 text-[13px] font-normal text-blueShade dark:text-white/75'>
              Localized {TESTNET_TOKEN.symbol}
            </div>
            <div className='col-span-1 text-[13px] font-normal text-blueShade dark:text-white/75'>
              Mainnet allocation %
            </div>
            <div className='col-span-1 text-[13px] font-normal text-blueShade dark:text-white/75'>
              Mainnet allocation {DEFAULT_TOKEN_SYMBOL}
            </div>
          </div>
          <div className='w-full'>
            <ol className='relative border-l border-buttonLightFrom dark:border-buttonDarkFrom'>
              {Object.values(CAMPAIGNS).map((phase, index) => (
                <li
                  key={`${index}-account-rewards-block`}
                  className={`grid grid-cols-4 gap-14 xl:gap-32 ${
                    index !== Object.values(CAMPAIGNS).length - 1 && 'mb-[26px]'
                  }`}
                >
                  <div className=''>
                    <div
                      className={`absolute -left-1.5 size-3 rounded-lg ${
                        index === 0
                          ? 'bg-buttonLightFrom dark:bg-buttonDarkFrom'
                          : 'bg-buttonLightTo dark:bg-buttonDarkTo'
                      }`}
                    ></div>
                    <div className='-mt-1 ml-4 text-[13px] font-normal text-grayDark dark:text-white'>
                      {phase.testnet}
                    </div>
                  </div>
                  <div className='-mt-1 text-[13px] font-normal text-grayDark dark:text-white'>
                    {getUserTestnetRewardsByPhase(rewards, phase.name)} {TESTNET_TOKEN.symbol}
                  </div>
                  <div className='-mt-1 text-[13px] font-normal text-grayDark dark:text-white'>
                    {getUserTestnetRewardsPercentageByPhase(rewards, totalRewards, phase.name)}
                  </div>
                  <div className='-mt-1 text-[13px] font-normal text-grayDark dark:text-white'>
                    {getTotalMainnetAllocationByPhase(rewards, phase.name)} {DEFAULT_TOKEN_SYMBOL}
                  </div>
                </li>
              ))}
              <li
                key={'total-account-rewards-block'}
                className={'mb-[26px] grid grid-cols-4 gap-14 xl:gap-32'}
              >
                <div className=''></div>
                <div className='text-grayMedium -mt-1 text-[13px] font-bold dark:text-white'>
                  Total Mainnet
                </div>
                <div className='text-grayMedium -mt-1 text-[13px] font-bold dark:text-white'>
                  {getTotalUserMainnetPercentageAllocation(rewards)}
                </div>
                <div className='text-grayMedium -mt-1 text-[13px] font-bold dark:text-white'>
                  {getTotalMainnetAllocationByPhase(rewards, 'total')} {DEFAULT_TOKEN_SYMBOL}
                </div>
              </li>
            </ol>
          </div>
        </div>
      )}
    </div>
  )
}
