'use client'

import { sendGAEvent } from '@next/third-parties/google'
import {
  AriesStressTestIcon,
  Gemini3TestnetIcon,
  GeminiIITestnetIcon,
  GeminiITestnetIcon,
  StakeWarsIIcon,
} from 'components/icons/TestnetIcon'
import useWallet from 'hooks/useWallet'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useViewStates } from 'states/view'
import { numberFormattedString } from 'utils/number'
import { Spinner } from '../common/Spinner'

type Reward<T = string> = {
  earningsTestnetToken: T
  absoluteAllocation: T
}

type DateRange = {
  start: Date
  end: Date
}

type Rewards<T = string> = {
  aries: Reward<T>
  geminiI: Reward<T>
  geminiII: Reward<T>
  geminiIII: Reward<T>
  stakeWarsI: Reward<T>
  total: Reward<T>
}

type AllRewards = {
  address: string
  rewards: Rewards<number>
  totalAllocation: number
}

type Campaign = {
  name: string
  testnet: string
  icon: React.ReactNode
  dateRange?: DateRange
}

const Modal: FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='rounded-lg bg-white p-4 shadow-lg'>
        <h2 className='mb-4 text-xl font-bold'>How it&apos;s calculated</h2>
        <p>Explanation of how the rewards are calculated...</p>
        <button
          className='mt-4 rounded-full bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  )
}

const MAINNET_TOTAL_SUPPLY = 1000000000

const PERCENTAGE_PRECISION = 6
const DEFAULT_REWARDS: Rewards = {
  aries: {
    earningsTestnetToken: '0',
    absoluteAllocation: '0',
  },
  geminiI: {
    earningsTestnetToken: '0',
    absoluteAllocation: '0',
  },
  geminiII: {
    earningsTestnetToken: '0',
    absoluteAllocation: '0',
  },
  geminiIII: {
    earningsTestnetToken: '0',
    absoluteAllocation: '0',
  },
  stakeWarsI: {
    earningsTestnetToken: '0',
    absoluteAllocation: '0',
  },
  total: {
    earningsTestnetToken: '0',
    absoluteAllocation: '0',
  },
}

const DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
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

  const campaigns: Record<string, Campaign> = useMemo(
    () => ({
      aries: {
        name: 'aries',
        testnet: 'Aries Stress Test',
        icon: <AriesStressTestIcon />,
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
        dateRange: { start: new Date('2022-09-20'), end: new Date('2023-09-06') },
      },
      geminiIII: {
        name: 'geminiIII',
        testnet: 'Gemini 3',
        icon: <Gemini3TestnetIcon />,
        dateRange: { start: new Date('2023-09-06'), end: new Date('2024-07-25') },
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

  const cleanCell = (cell: string) => {
    const cleaned = cell.replace(/"/g, '').replace(/,/g, '')
    if (!cleaned) return '0'
    return cleaned
  }

  const handleLoad = useCallback(async () => {
    const file = await fetch('/data/testnet/astralTestnetRewardsMainnetAllocations-15oct2024.csv')
    const data = await file.text()
    const rows = data.split('\n').slice(6)
    const rewardsData = rows.map((row) => {
      const columns = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
      return {
        address: cleanCell(columns[0]),
        rewards: {
          aries: {
            earningsTestnetToken: parseFloat(cleanCell(columns[1])) || 0,
            absoluteAllocation: parseFloat(cleanCell(columns[36])) || 0,
          },
          geminiI: {
            earningsTestnetToken: parseFloat(cleanCell(columns[2])) || 0,
            absoluteAllocation: parseFloat(cleanCell(columns[37])) || 0,
          },
          geminiII: {
            earningsTestnetToken:
              parseFloat(cleanCell(columns[3])) + parseFloat(cleanCell(columns[4])) || 0,
            absoluteAllocation:
              parseFloat(cleanCell(columns[38])) + parseFloat(cleanCell(columns[39])) || 0,
          },
          geminiIII: {
            earningsTestnetToken:
              parseFloat(cleanCell(columns[5])) +
                parseFloat(cleanCell(columns[6])) +
                parseFloat(cleanCell(columns[7])) +
                parseFloat(cleanCell(columns[8])) || 0,
            absoluteAllocation:
              parseFloat(cleanCell(columns[40])) + parseFloat(cleanCell(columns[41])) || 0,
          },
          stakeWarsI: {
            earningsTestnetToken:
              parseFloat(cleanCell(columns[10])) + parseFloat(cleanCell(columns[11])) || 0,
            absoluteAllocation:
              parseFloat(cleanCell(columns[42])) + parseFloat(cleanCell(columns[43])) || 0,
          },
          total: {
            earningsTestnetToken:
              parseFloat(cleanCell(columns[1])) +
                parseFloat(cleanCell(columns[2])) +
                parseFloat(cleanCell(columns[3])) +
                parseFloat(cleanCell(columns[4])) +
                parseFloat(cleanCell(columns[5])) +
                parseFloat(cleanCell(columns[6])) +
                parseFloat(cleanCell(columns[7])) +
                parseFloat(cleanCell(columns[8])) +
                parseFloat(cleanCell(columns[10])) +
                parseFloat(cleanCell(columns[11])) || 0,
            absoluteAllocation: parseFloat(cleanCell(columns[45])) || 0,
          },
        },
      } as AllRewards
    })

    const totalRow = data.split('\n')[1]
    const totalRowColumns = totalRow.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
    const totals: Rewards = {
      aries: {
        earningsTestnetToken: parseFloat(cleanCell(totalRowColumns[1])).toString() || '0',
        absoluteAllocation: parseFloat(cleanCell(totalRowColumns[36])).toString() || '0',
      },
      geminiI: {
        earningsTestnetToken: parseFloat(cleanCell(totalRowColumns[2])).toString() || '0',
        absoluteAllocation: parseFloat(cleanCell(totalRowColumns[37])).toString() || '0',
      },
      geminiII: {
        earningsTestnetToken:
          (
            parseFloat(cleanCell(totalRowColumns[3])) + parseFloat(cleanCell(totalRowColumns[4]))
          ).toString() || '0',
        absoluteAllocation:
          (
            parseFloat(cleanCell(totalRowColumns[38])) + parseFloat(cleanCell(totalRowColumns[39]))
          ).toString() || '0',
      },
      geminiIII: {
        earningsTestnetToken:
          (
            parseFloat(cleanCell(totalRowColumns[5])) +
            parseFloat(cleanCell(totalRowColumns[6])) +
            parseFloat(cleanCell(totalRowColumns[7])) +
            parseFloat(cleanCell(totalRowColumns[8]))
          ).toString() || '0',
        absoluteAllocation:
          (
            parseFloat(cleanCell(totalRowColumns[40])) + parseFloat(cleanCell(totalRowColumns[41]))
          ).toString() || '0',
      },
      stakeWarsI: {
        earningsTestnetToken:
          (
            parseFloat(cleanCell(totalRowColumns[10])) + parseFloat(cleanCell(totalRowColumns[11]))
          ).toString() || '0',
        absoluteAllocation:
          (
            parseFloat(cleanCell(totalRowColumns[42])) + parseFloat(cleanCell(totalRowColumns[43]))
          ).toString() || '0',
      },
      total: {
        earningsTestnetToken:
          (
            parseFloat(cleanCell(totalRowColumns[1])) +
            parseFloat(cleanCell(totalRowColumns[2])) +
            parseFloat(cleanCell(totalRowColumns[3])) +
            parseFloat(cleanCell(totalRowColumns[4])) +
            parseFloat(cleanCell(totalRowColumns[5])) +
            parseFloat(cleanCell(totalRowColumns[6])) +
            parseFloat(cleanCell(totalRowColumns[7])) +
            parseFloat(cleanCell(totalRowColumns[8])) +
            parseFloat(cleanCell(totalRowColumns[10])) +
            parseFloat(cleanCell(totalRowColumns[11]))
          ).toString() || '0',
        absoluteAllocation: parseFloat(cleanCell(totalRowColumns[45])).toString() || '0',
      },
    }
    setAllRewards(rewardsData)
    console.log('totals', totals)
    setTotalRewards(totals)
    setIsLoaded(true)
  }, [])

  const handleAggregated = useCallback(async () => {
    if (!isLoaded) return
    const userRewards = allRewards.filter(
      (reward) => mySubspaceWallets.includes(reward.address) || subspaceAccount === reward.address,
    )

    const mergedRewards: Rewards = userRewards.reduce(
      (acc, reward) => {
        const newAcc = { ...acc }
        Object.keys(campaigns).forEach((key) => {
          const testnetKey = key as keyof Rewards
          const currentEarnings = parseFloat(newAcc[testnetKey].earningsTestnetToken) || 0
          const rewardEarnings = reward.rewards[testnetKey].earningsTestnetToken || 0
          newAcc[testnetKey].earningsTestnetToken = (currentEarnings + rewardEarnings).toString()

          const currentAllocation = parseFloat(newAcc[testnetKey].absoluteAllocation) || 0
          const rewardAllocation = reward.rewards[testnetKey].absoluteAllocation || 0
          newAcc[testnetKey].absoluteAllocation = (currentAllocation + rewardAllocation).toString()
        })
        const currentTotalEarnings = parseFloat(newAcc.total.earningsTestnetToken) || 0
        const rewardTotalEarnings = reward.rewards.total.earningsTestnetToken || 0
        newAcc.total.earningsTestnetToken = (currentTotalEarnings + rewardTotalEarnings).toString()

        const currentTotalAllocation = parseFloat(newAcc.total.absoluteAllocation) || 0
        const rewardTotalAllocation = reward.rewards.total.absoluteAllocation || 0
        newAcc.total.absoluteAllocation = (
          currentTotalAllocation + rewardTotalAllocation
        ).toString()
        return newAcc
      },
      JSON.parse(JSON.stringify(DEFAULT_REWARDS)),
    )
    setRewards(mergedRewards)
    setIsAggregated(true)
  }, [allRewards, campaigns, isLoaded, mySubspaceWallets, subspaceAccount])

  const userTestnetRewardsByPhase = useCallback(
    (phase: string) => {
      if (rewards[phase as keyof Rewards])
        return numberFormattedString(
          parseFloat(rewards[phase as keyof Rewards].earningsTestnetToken),
        )
      return '0.00'
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
    (phase: string) => {
      if (rewards[phase as keyof Rewards]) {
        const totalTokens = parseFloat(totalRewards[phase as keyof Rewards].earningsTestnetToken)
        const userTotalReward = parseFloat(rewards[phase as keyof Rewards].earningsTestnetToken)
        return totalTokens > 0
          ? ((userTotalReward / totalTokens) * 100).toFixed(PERCENTAGE_PRECISION) + '%'
          : '0.000000%'
      }
      return '0.000000%'
    },
    [rewards, totalRewards],
  )

  const totalUserTestnetRewards = useMemo(
    () => parseFloat(cleanCell(userTestnetRewardsByPhase('total'))),
    [userTestnetRewardsByPhase],
  )

  const totalTestnetTokenEmissions = useMemo(
    () => parseFloat(cleanCell(totalTestnetByPhase('total'))),
    [totalTestnetByPhase],
  )

  const totalUserTestnetRewardsPercentage = useMemo(() => {
    return (
      (totalUserTestnetRewards / totalTestnetTokenEmissions).toFixed(PERCENTAGE_PRECISION) + '%'
    )
  }, [totalUserTestnetRewards, totalTestnetTokenEmissions])

  const campaignsList = useMemo(() => Object.values(campaigns), [campaigns])

  const totalMainnetAllocationByPhase = useCallback(
    (testnet: string) => {
      const reward = rewards[testnet as keyof Rewards]
      if (reward === undefined) return 0
      return parseFloat(reward.absoluteAllocation)
    },
    [rewards],
  )

  const totalMainnetPercentageAllocationByPhase = useCallback(
    (testnet: string) => {
      const reward = rewards[testnet as keyof Rewards]
      if (!reward) return '0.000000%'
      const userTotalReward = parseFloat(reward.absoluteAllocation)
      if (!userTotalReward) return '0.000000%'
      const total = userTotalReward / MAINNET_TOTAL_SUPPLY
      return (total * 100).toFixed(PERCENTAGE_PRECISION) + '%'
    },
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
        <Spinner isSmall />
      ) : (
        <div className='mt-4 rounded-lg bg-white p-4 shadow-md dark:border-none dark:bg-gray-800 dark:bg-gradient-to-r dark:from-gradientFrom dark:via-gradientVia dark:to-gradientTo'>
          <div className='mb-4 mt-4 flex justify-center'>
            <div className='mx-8 flex w-full max-w-6xl items-center justify-between rounded-full border border-blue-600 bg-blue-50 p-8 text-blue-600'>
              <div className='text-2xl font-semibold'>TOTAL ALLOCATION</div>
              <div className='text-4xl font-bold'>
                {numberFormattedString(totalUserMainnetAllocation)} ATC
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
                    EARNINGS, % tSSC
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300'>
                    EARNINGS, tSSC
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300'>
                    EARNINGS, % ATC
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300'>
                    EARNINGS, ATC
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
                      {campaign.name === 'aries' ? 'eligible addresses' : 'tSSC'}
                    </td>
                    <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300'>
                      <span className='font-bold'>
                        {totalMainnetPercentageAllocationByPhase(campaign.name)}
                      </span>
                      <br />
                    </td>
                    <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300'>
                      {numberFormattedString(totalMainnetAllocationByPhase(campaign.name))}
                      <br /> out of {totalMainnetByPhase(campaign.name)} tSSC
                    </td>
                    <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300'>
                      {campaign.dateRange
                        ? `${campaign.dateRange.start.toLocaleDateString(undefined, DATE_OPTIONS)} - ${campaign.dateRange.end.toLocaleDateString(undefined, DATE_OPTIONS)}`
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
                {numberFormattedString(totalUserTestnetRewards)} tSSC
              </div>
              <div className='text-sm text-gray-500 dark:text-gray-300'>
                {totalMainnetRewardsPercentage}
              </div>
              <div className='text-sm text-gray-500 dark:text-gray-300'>
                {numberFormattedString(totalUserMainnetAllocation)} ATC
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
