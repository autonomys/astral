'use client'

import { DEFAULT_TOKEN_SYMBOL, TESTNET_TOKEN } from '@autonomys/auto-utils'
import { sendGAEvent } from '@next/third-parties/google'
import {
  AriesStressTestIcon,
  Gemini3TestnetIcon,
  GeminiIITestnetIcon,
  GeminiITestnetIcon,
  StakeWarsIIcon,
} from 'components/icons/TestnetIcon'
import { SUBSPACE_ACC_PREFIX_TESTNET } from 'constants/general'
import useWallet from 'hooks/useWallet'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useViewStates } from 'states/view'
import { formatAddress } from 'utils/formatAddress'
import { numberFormattedString } from 'utils/number'
import {
  AllRewards,
  Campaign,
  cleanCell,
  DATE_LOCALES,
  DATE_OPTIONS,
  DEFAULT_REWARDS,
  getTestnetRewards,
  getTotalMainnetAllocationByPhase,
  getTotalMainnetPercentageAllocationByPhase,
  getTotalUserTestnetRewardsPercentage,
  getUserTestnetRewards,
  getUserTestnetRewardsByPhase,
  getUserTestnetRewardsPercentageByPhase,
  PERCENTAGE_PRECISION,
  Rewards,
} from 'utils/testnetRewards'

const TestnetRewardsTableSkeleton: FC = () => {
  const campaigns = [
    {
      name: 'Aries Stress Test',
      icon: <div className='h-6 w-6 animate-pulse rounded bg-gray-200 dark:bg-gray-700' />,
    },
    {
      name: 'Gemini 1',
      icon: <div className='h-6 w-6 animate-pulse rounded bg-gray-200 dark:bg-gray-700' />,
    },
    {
      name: 'Gemini 2',
      icon: <div className='h-6 w-6 animate-pulse rounded bg-gray-200 dark:bg-gray-700' />,
    },
    {
      name: 'Gemini 3',
      icon: <div className='h-6 w-6 animate-pulse rounded bg-gray-200 dark:bg-gray-700' />,
    },
    {
      name: 'Stake Wars I',
      icon: <div className='h-6 w-6 animate-pulse rounded bg-gray-200 dark:bg-gray-700' />,
    },
  ]

  return (
    <div className='max-w-8xl mt-8 w-full'>
      <div className='mt-4 rounded-lg bg-white p-4 shadow-md dark:border-none dark:bg-boxDark'>
        {/* Header skeleton */}
        <div className='mb-4 mt-4 flex justify-center'>
          <div className='flex w-full max-w-6xl items-center justify-between rounded-lg border border-blue-600 bg-blue-50 px-8 py-3 text-blue-600'>
            <div className='text-2xl font-semibold'>TOTAL ALLOCATION</div>
            <div className='h-8 w-32 animate-pulse rounded bg-blue-200'></div>
            <div className='text-2xl font-semibold'>TESTNETS PHASES IN TOTAL</div>
            <div className='h-8 w-8 animate-pulse rounded bg-blue-200'></div>
          </div>
        </div>

        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-gray-200 dark:divide-gray-700'>
            <thead className='bg-gray-50 dark:bg-gray-700'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300'>
                  TESTNET
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300'>
                  EARNINGS, % {TESTNET_TOKEN.symbol}
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300'>
                  EARNINGS, {TESTNET_TOKEN.symbol}
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300'>
                  EARNINGS, % {DEFAULT_TOKEN_SYMBOL}
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300'>
                  EARNINGS, {DEFAULT_TOKEN_SYMBOL}
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300'>
                  Date Range
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800'>
              {campaigns.map((campaign, index) => (
                <tr key={index}>
                  <td className='whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white'>
                    <div className='flex items-center'>
                      <span className='mr-2'>{campaign.icon}</span>
                      <div className='h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700'></div>
                    </div>
                  </td>
                  <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300'>
                    <div className='h-4 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-700'></div>
                  </td>
                  <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300'>
                    <div className='h-4 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-700'></div>
                    <div className='mt-1 h-3 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-700'></div>
                  </td>
                  <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300'>
                    <div className='h-4 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-700'></div>
                  </td>
                  <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300'>
                    <div className='h-4 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-700'></div>
                    <div className='mt-1 h-3 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-700'></div>
                  </td>
                  <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300'>
                    <div className='h-4 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-700'></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Footer skeleton */}
          <div className='mt-4 flex justify-between bg-gray-50 p-4 dark:bg-gray-700'>
            <div className='text-xl font-medium text-gray-900 dark:text-white'>TOTAL EARNINGS</div>
            <div className='h-4 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-700'></div>
            <div className='h-4 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-700'></div>
            <div className='h-4 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-700'></div>
            <div className='h-4 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-700'></div>
            <div className='h-4 w-8 animate-pulse rounded bg-gray-200 dark:bg-gray-700'></div>
            <div className='h-4 w-8 animate-pulse rounded bg-gray-200 dark:bg-gray-700'></div>
            <div className='h-4 w-8 animate-pulse rounded bg-gray-200 dark:bg-gray-700'></div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Modal: FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='rounded-lg bg-white p-4 shadow-lg'>
        <h2 className='mb-4 text-xl font-bold'>How it&apos;s calculated</h2>
        <p>Explanation of how the rewards are calculated...</p>
        <button
          className='mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  )
}

export const TestnetRewardsTable: FC = () => {
  const { subspaceAccount } = useWallet()
  const { mySubspaceWallets } = useViewStates()
  const [isModalOpen, setModalOpen] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isAggregated, setIsAggregated] = useState(false)
  const [allRewards, setAllRewards] = useState<AllRewards[]>([])
  const [rewards, setRewards] = useState<Rewards>(DEFAULT_REWARDS)
  const [totalRewards, setTotalRewards] = useState<Rewards>(DEFAULT_REWARDS)

  const stFormattedAndMergedAddresses = useMemo(() => {
    const addresses = mySubspaceWallets.map((wallet) =>
      formatAddress(wallet, SUBSPACE_ACC_PREFIX_TESTNET),
    )
    if (subspaceAccount) addresses.push(formatAddress(subspaceAccount, SUBSPACE_ACC_PREFIX_TESTNET))
    return addresses.filter((address): address is string => address !== undefined)
  }, [mySubspaceWallets, subspaceAccount])

  const campaigns: Record<string, Campaign> = useMemo(
    () => ({
      aries: {
        name: 'aries',
        testnet: 'Aries Stress Test',
        icon: <AriesStressTestIcon />,
        label: 'eligible addresses',
      },
      geminiI: {
        name: 'geminiI',
        testnet: 'Gemini 1',
        icon: <GeminiITestnetIcon />,
        dateRange: { start: new Date('2022-06-11'), end: new Date('2022-06-27') },
      },
      geminiII: {
        name: 'geminiII',
        testnet: 'Gemini 2',
        icon: <GeminiIITestnetIcon />,
        dateRange: { start: new Date('2022-09-20'), end: new Date('2022-10-25') },
      },
      geminiIII: {
        name: 'geminiIII',
        testnet: 'Gemini 3',
        icon: <Gemini3TestnetIcon />,
        dateRange: { start: new Date('2023-09-06'), end: new Date('2024-09-18') },
        label: 'block and vote rewards',
      },
      stakeWarsI: {
        name: 'stakeWarsI',
        testnet: 'Stake Wars I',
        icon: <StakeWarsIIcon />,
        dateRange: { start: new Date('2023-11-22'), end: new Date('2024-01-10') },
      },
    }),
    [],
  )

  const handleLoad = useCallback(async () => {
    const { rewardsData, totals } = await getTestnetRewards()
    setAllRewards(rewardsData)
    setTotalRewards(totals)
    setIsLoaded(true)
  }, [])

  const handleAggregated = useCallback(async () => {
    if (!isLoaded || !stFormattedAndMergedAddresses.length) return
    const mergedRewards = await getUserTestnetRewards(allRewards, stFormattedAndMergedAddresses)
    setRewards(mergedRewards)
    setIsAggregated(true)
  }, [allRewards, isLoaded, stFormattedAndMergedAddresses])

  const userTestnetRewardsByPhase = useCallback(
    (phase: string) => {
      return getUserTestnetRewardsByPhase(rewards, phase)
    },
    [rewards],
  )

  const totalTestnetByPhase = useCallback(
    (phase: string) => {
      if (totalRewards[phase as keyof Rewards].earningsTestnetToken)
        return numberFormattedString(
          parseFloat(totalRewards[phase as keyof Rewards].earningsTestnetToken),
        )
      return '0.00'
    },
    [totalRewards],
  )

  const totalMainnetByPhase = useCallback(
    (phase: string) => {
      if (totalRewards[phase as keyof Rewards].absoluteAllocation)
        return numberFormattedString(
          parseFloat(totalRewards[phase as keyof Rewards].absoluteAllocation),
        )
      return '0.00'
    },
    [totalRewards],
  )

  const userTestnetRewardsPercentageByPhase = useCallback(
    (phase: string) => getUserTestnetRewardsPercentageByPhase(rewards, totalRewards, phase),
    [rewards, totalRewards],
  )

  const totalUserTestnetRewards = useMemo(
    () => parseFloat(cleanCell(userTestnetRewardsByPhase('total'))),
    [userTestnetRewardsByPhase],
  )

  const totalUserTestnetRewardsPercentage = useMemo(
    () => getTotalUserTestnetRewardsPercentage(rewards, totalRewards),
    [rewards, totalRewards],
  )

  const campaignsList = useMemo(() => Object.values(campaigns), [campaigns])

  const totalMainnetAllocationByPhase = useCallback(
    (phase: string) => getTotalMainnetAllocationByPhase(rewards, phase),
    [rewards],
  )

  const totalMainnetPercentageAllocationByPhase = useCallback(
    (phase: string) => getTotalMainnetPercentageAllocationByPhase(rewards, phase),
    [rewards],
  )

  const totalUserMainnetAllocation = useMemo(() => {
    return totalMainnetAllocationByPhase('total')
  }, [totalMainnetAllocationByPhase])

  const totalMainnetRewardsPercentage = useMemo(() => {
    return (
      campaignsList
        .reduce((acc, campaign) => {
          const percentage = parseFloat(
            totalMainnetPercentageAllocationByPhase(campaign.name).replace('%', ''),
          )
          return acc + percentage
        }, 0)
        .toFixed(PERCENTAGE_PRECISION) + '%'
    )
  }, [campaignsList, totalMainnetPercentageAllocationByPhase])

  const countTestnetsWithRewards = useCallback((rewards: Rewards): number => {
    const count = Object.values(rewards).filter(
      (reward) => parseFloat(reward.earningsTestnetToken) > 0,
    ).length
    if (count > 1) return count - 1
    return count
  }, [])

  const testnetsWithRewardsCount = useMemo(
    () => countTestnetsWithRewards(rewards),
    [rewards, countTestnetsWithRewards],
  )

  useEffect(() => {
    handleLoad()
  }, [handleLoad])

  useEffect(() => {
    if (isLoaded) {
      handleAggregated()
      sendGAEvent('event', 'check_testnet_rewards', {
        value: subspaceAccount + mySubspaceWallets.join(','),
      })
    }
  }, [subspaceAccount, mySubspaceWallets, isLoaded, handleAggregated])

  return (
    <div className='max-w-8xl mt-8 w-full'>
      {!isLoaded || !isAggregated ? (
        <TestnetRewardsTableSkeleton />
      ) : (
        <div className='mt-4 rounded-lg bg-white p-4 shadow-md dark:border-none dark:bg-boxDark'>
          <div className='mb-8 mt-4 flex justify-center'>
            <div className='flex w-full max-w-7xl items-center justify-between rounded-lg border border-blue-600 bg-blue-50 px-8 py-3 text-blue-600'>
              <div className='text-2xl font-semibold'>TOTAL ALLOCATION</div>
              <div className='text-4xl font-bold'>
                {numberFormattedString(totalUserMainnetAllocation)} {DEFAULT_TOKEN_SYMBOL}
              </div>

              <div className='text-2xl font-semibold'>TESTNETS PHASES IN TOTAL</div>
              <div className='text-4xl font-bold'>{testnetsWithRewardsCount}</div>
            </div>
          </div>
          <div className='overflow-x-auto'>
            <table className='min-w-full divide-y divide-gray-200 dark:divide-gray-700'>
              <thead className='bg-gray-50 dark:bg-gray-700'>
                <tr>
                  <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300'>
                    TESTNET
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300'>
                    EARNINGS, % {TESTNET_TOKEN.symbol}
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300'>
                    EARNINGS, {TESTNET_TOKEN.symbol}
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300'>
                    EARNINGS, % {DEFAULT_TOKEN_SYMBOL}
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300'>
                    EARNINGS, {DEFAULT_TOKEN_SYMBOL}
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300'>
                    Date Range
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800'>
                {campaignsList.map((campaign, index) => (
                  <tr key={index}>
                    <td className='whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white'>
                      <div className='flex items-center'>
                        <span className='mr-2'>{campaign.icon}</span>
                        <span>{campaign.testnet}</span>
                      </div>
                    </td>
                    <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300'>
                      <span className='font-bold'>
                        {userTestnetRewardsPercentageByPhase(campaign.name)}
                      </span>
                      <br />
                    </td>
                    <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300'>
                      <span className='font-bold'>{userTestnetRewardsByPhase(campaign.name)}</span>
                      <br /> out of {totalTestnetByPhase(campaign.name)}{' '}
                      {campaign.label ? campaign.label : TESTNET_TOKEN.symbol}
                    </td>
                    <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300'>
                      <span className='font-bold'>
                        {totalMainnetPercentageAllocationByPhase(campaign.name)}
                      </span>
                      <br />
                    </td>
                    <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300'>
                      {numberFormattedString(totalMainnetAllocationByPhase(campaign.name))}
                      <br /> out of {totalMainnetByPhase(campaign.name)} {DEFAULT_TOKEN_SYMBOL}
                    </td>
                    <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300'>
                      {campaign.dateRange
                        ? `${campaign.dateRange.start.toLocaleDateString(DATE_LOCALES, DATE_OPTIONS)} - ${campaign.dateRange.end.toLocaleDateString(DATE_LOCALES, DATE_OPTIONS)}`
                        : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className='mt-4 flex justify-between bg-gray-50 p-4 dark:bg-gray-700'>
              <div className='text-xl font-medium text-gray-900 dark:text-white'>
                TOTAL EARNINGS
              </div>
              <div className='text-sm text-gray-500 dark:text-gray-300'>
                {totalUserTestnetRewardsPercentage}
              </div>
              <div className='text-sm text-gray-500 dark:text-gray-300'>
                {numberFormattedString(totalUserTestnetRewards)} {TESTNET_TOKEN.symbol}
              </div>
              <div className='text-sm text-gray-500 dark:text-gray-300'>
                {totalMainnetRewardsPercentage}
              </div>
              <div className='text-sm text-gray-500 dark:text-gray-300'>
                {numberFormattedString(totalUserMainnetAllocation)} {TESTNET_TOKEN.symbol}
              </div>
              <div className='text-sm text-gray-500 dark:text-gray-300'></div>
              <div className='text-sm text-gray-500 dark:text-gray-300'></div>
              <div className='text-sm text-gray-500 dark:text-gray-300'></div>
            </div>
          </div>
        </div>
      )}
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  )
}
