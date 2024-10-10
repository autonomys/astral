'use client'

import { numberFormattedString } from '@/utils/number'
import { sendGAEvent } from '@next/third-parties/google'
import {
  Gemini3hTestnetIcon,
  Gemini3p1TestnetIcon,
  Gemini3p2TestnetIcon,
  GeminiIIp1TestnetIcon,
  GeminiIIp2TestnetIcon,
  GeminiITestnetIcon,
  StakeWarsIIcon,
} from 'components/icons/TestnetIcon'
import useWallet from 'hooks/useWallet'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useViewStates } from 'states/view'
import { Spinner } from '../common/Spinner'

type Reward = {
  earningsTestnetToken: string
  absoluteAllocation: string
}

type Rewards = {
  geminiI: Reward
  geminiIIphase1: Reward
  geminiIIphase2: Reward
  geminiIIIf: Reward
  geminiIIIg: Reward
  geminiIIIhPhase1: Reward
  geminiIIIhPhase2: Reward
  stakeWarsIPhase1: Reward
  stakeWarsIPhase2: Reward
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
const EARNINGS_PRECISION = 6

export const TestnetRewardsTable: FC = () => {
  const { subspaceAccount } = useWallet()
  const { mySubspaceWallets } = useViewStates()
  const [isModalOpen, setModalOpen] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  const defaultRewards: Rewards = useMemo(() => {
    return {
      geminiI: {
        earningsTestnetToken: '0',
        absoluteAllocation: '0',
      },
      geminiIIphase1: {
        earningsTestnetToken: '0',
        absoluteAllocation: '0',
      },
      geminiIIphase2: {
        earningsTestnetToken: '0',
        absoluteAllocation: '0',
      },
      geminiIIIf: {
        earningsTestnetToken: '0',
        absoluteAllocation: '0',
      },
      geminiIIIg: {
        earningsTestnetToken: '0',
        absoluteAllocation: '0',
      },
      geminiIIIhPhase1: {
        earningsTestnetToken: '0',
        absoluteAllocation: '0',
      },
      geminiIIIhPhase2: {
        earningsTestnetToken: '0',
        absoluteAllocation: '0',
      },
      stakeWarsIPhase1: {
        earningsTestnetToken: '0',
        absoluteAllocation: '0',
      },
      stakeWarsIPhase2: {
        earningsTestnetToken: '0',
        absoluteAllocation: '0',
      },
    }
  }, [])
  const [rewards, setRewards] = useState<Rewards>(defaultRewards)
  const [totalRewards, setTotalRewards] = useState<Rewards>(defaultRewards)

  const campaigns = useMemo(
    () => ({
      geminiI: {
        name: 'geminiI',
        testnet: 'Gemini 1',
        icon: <GeminiITestnetIcon />,
        dateRange: '11.06.2022 - 27.06.2022',
      },
      geminiIIphase1: {
        name: 'geminiIIphase1',
        testnet: 'Gemini 2 Phase 1',
        icon: <GeminiIIp1TestnetIcon />,
        dateRange: '20.09.2022 - 25.10.2022',
      },
      geminiIIphase2: {
        name: 'geminiIIphase2',
        testnet: 'Gemini 2 Phase 2',
        icon: <GeminiIIp2TestnetIcon />,
      },
      geminiIIIf: {
        name: 'geminiIIIf',
        testnet: 'Gemini 3f',
        icon: <Gemini3p1TestnetIcon />,
        dateRange: '06.09.2023 - 02.11.2023',
      },
      geminiIIIg: {
        name: 'geminiIIIg',
        testnet: 'Gemini 3g',
        icon: <Gemini3p2TestnetIcon />,
        dateRange: '02.11.2023 - 10.01.2024',
      },
      stakeWarsIPhase1: {
        name: 'stakeWarsIPhase1',
        testnet: 'Stake Wars I Phase 1',
        icon: <StakeWarsIIcon />,
        dateRange: '22.11.2023 - 12.06.2023',
      },
      stakeWarsIPhase2: {
        name: 'stakeWarsIPhase2',
        testnet: 'Stake Wars I Phase 2',
        icon: <StakeWarsIIcon />,
        dateRange: '12.06.2023 - 10.01.2024',
      },
      geminiIIIhPhase1: {
        name: 'geminiIIIhPhase1',
        testnet: 'Gemini 3h Phase 1',
        icon: <Gemini3hTestnetIcon />,
        dateRange: '10.01.2024 - 25.07.2024',
      },
      geminiIIIhPhase2: {
        name: 'geminiIIIhPhase2',
        testnet: 'Gemini 3h Phase 2',
        icon: <Gemini3hTestnetIcon />,
        dateRange: '10.01.2024 - 25.07.2024',
      },
    }),
    [],
  )

  const cleanCell = (cell: string) => cell.replace(/"/g, '').replace(/,/g, '')

  const handleLoad = useCallback(async () => {
    const file = await fetch('/data/testnet/astralTestnetRewardsMainnetAllocations-10oct2024.csv')
    const data = await file.text()
    const rows = data.split('\n').slice(6)
    const rewardsData = rows.map((row) => {
      const columns = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
      return {
        address: cleanCell(columns[0]),
        rewards: {
          geminiI: {
            earningsTestnetToken: parseFloat(cleanCell(columns[1])) || 0,
            absoluteAllocation: parseFloat(cleanCell(columns[10])) || 0,
          },
          geminiIIphase1: {
            earningsTestnetToken: parseFloat(cleanCell(columns[2])) || 0,
            absoluteAllocation: parseFloat(cleanCell(columns[11])) || 0,
          },
          geminiIIphase2: {
            earningsTestnetToken: parseFloat(cleanCell(columns[3])) || 0,
            absoluteAllocation: parseFloat(cleanCell(columns[12])) || 0,
          },
          geminiIIIf: {
            earningsTestnetToken: parseFloat(cleanCell(columns[4])) || 0,
            absoluteAllocation: parseFloat(cleanCell(columns[13])) || 0,
          },
          geminiIIIg: {
            earningsTestnetToken: parseFloat(cleanCell(columns[5])) || 0,
            absoluteAllocation: parseFloat(cleanCell(columns[14])) || 0,
          },
          geminiIIIhPhase1: {
            earningsTestnetToken: parseFloat(cleanCell(columns[6])) || 0,
            absoluteAllocation: parseFloat(cleanCell(columns[15])) || 0,
          },
          geminiIIIhPhase2: {
            earningsTestnetToken: parseFloat(cleanCell(columns[7])) || 0,
            absoluteAllocation: parseFloat(cleanCell(columns[16])) || 0,
          },
          stakeWarsIPhase1: {
            earningsTestnetToken: parseFloat(cleanCell(columns[8])) || 0,
            absoluteAllocation: parseFloat(cleanCell(columns[17])) || 0,
          },
          stakeWarsIPhase2: {
            earningsTestnetToken: parseFloat(cleanCell(columns[9])) || 0,
            absoluteAllocation: parseFloat(cleanCell(columns[18])) || 0,
          },
        },
        totalAllocation: parseFloat(cleanCell(columns[19])) || 0,
      }
    })

    const totalRow = data.split('\n')[1]
    const totalRowColumns = totalRow.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
    const totals = {
      geminiI: {
        earningsTestnetToken: parseFloat(cleanCell(totalRowColumns[1])).toString() || '0',
        absoluteAllocation: parseFloat(cleanCell(totalRowColumns[10])).toString() || '0',
      },
      geminiIIphase1: {
        earningsTestnetToken: parseFloat(cleanCell(totalRowColumns[2])).toString() || '0',
        absoluteAllocation: parseFloat(cleanCell(totalRowColumns[11])).toString() || '0',
      },
      geminiIIphase2: {
        earningsTestnetToken: parseFloat(cleanCell(totalRowColumns[3])).toString() || '0',
        absoluteAllocation: parseFloat(cleanCell(totalRowColumns[12])).toString() || '0',
      },
      geminiIIIf: {
        earningsTestnetToken: parseFloat(cleanCell(totalRowColumns[4])).toString() || '0',
        absoluteAllocation: parseFloat(cleanCell(totalRowColumns[13])).toString() || '0',
      },
      geminiIIIg: {
        earningsTestnetToken: parseFloat(cleanCell(totalRowColumns[5])).toString() || '0',
        absoluteAllocation: parseFloat(cleanCell(totalRowColumns[14])).toString() || '0',
      },
      geminiIIIhPhase1: {
        earningsTestnetToken: parseFloat(cleanCell(totalRowColumns[6])).toString() || '0',
        absoluteAllocation: parseFloat(cleanCell(totalRowColumns[15])).toString() || '0',
      },
      geminiIIIhPhase2: {
        earningsTestnetToken: parseFloat(cleanCell(totalRowColumns[7])).toString() || '0',
        absoluteAllocation: parseFloat(cleanCell(totalRowColumns[16])).toString() || '0',
      },
      stakeWarsIPhase1: {
        earningsTestnetToken: parseFloat(cleanCell(totalRowColumns[8])).toString() || '0',
        absoluteAllocation: parseFloat(cleanCell(totalRowColumns[17])).toString() || '0',
      },
      stakeWarsIPhase2: {
        earningsTestnetToken: parseFloat(cleanCell(totalRowColumns[9])).toString() || '0',
        absoluteAllocation: parseFloat(cleanCell(totalRowColumns[18])).toString() || '0',
      },
    }

    return { rewardsData, totals }
  }, [])

  const handleSearch = useCallback(async () => {
    const { rewardsData, totals } = await handleLoad()

    const userRewards = rewardsData.filter((reward) => mySubspaceWallets.includes(reward.address))
    const mergedRewards: Rewards = userRewards.reduce(
      (acc, reward) => {
        Object.keys(reward.rewards).forEach((key) => {
          const testnetKey = key as keyof Rewards
          acc[testnetKey].earningsTestnetToken = (
            parseFloat(acc[testnetKey].earningsTestnetToken) +
            reward.rewards[testnetKey].earningsTestnetToken
          ).toString()
          acc[testnetKey].absoluteAllocation = (
            parseFloat(acc[testnetKey].absoluteAllocation) +
            reward.rewards[testnetKey].absoluteAllocation
          ).toString()
        })
        return acc
      },
      { ...defaultRewards },
    )

    setRewards(mergedRewards)
    setTotalRewards(totals)
    setIsLoaded(true)
  }, [defaultRewards, handleLoad, mySubspaceWallets])

  const userTestnetRewardsByPhase = useCallback(
    (phase: string) => {
      if (rewards[phase as keyof Rewards])
        return parseFloat(rewards[phase as keyof Rewards].earningsTestnetToken).toFixed(
          EARNINGS_PRECISION,
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
          : '0.00%'
      }
      return '0.00%'
    },
    [rewards, totalRewards],
  )

  const totalUserTestnetRewards = useMemo(() => {
    return (
      parseFloat(rewards.geminiI.earningsTestnetToken) +
      parseFloat(rewards.geminiIIphase1.earningsTestnetToken) +
      parseFloat(rewards.geminiIIphase2.earningsTestnetToken) +
      parseFloat(rewards.geminiIIIf.earningsTestnetToken) +
      parseFloat(rewards.geminiIIIg.earningsTestnetToken)
    )
  }, [rewards])

  const totalTestnetTokenEmissions = useMemo(() => {
    return (
      parseFloat(totalRewards.geminiI.earningsTestnetToken) +
      parseFloat(totalRewards.geminiIIphase1.earningsTestnetToken) +
      parseFloat(totalRewards.geminiIIphase2.earningsTestnetToken) +
      parseFloat(totalRewards.geminiIIIf.earningsTestnetToken) +
      parseFloat(totalRewards.geminiIIIg.earningsTestnetToken)
    )
  }, [totalRewards])

  const totalUserTestnetRewardsPercentage = useMemo(() => {
    return (
      (totalUserTestnetRewards / totalTestnetTokenEmissions).toFixed(PERCENTAGE_PRECISION) + '%'
    )
  }, [totalUserTestnetRewards, totalTestnetTokenEmissions])

  const campaignsList = useMemo(() => Object.values(campaigns), [campaigns])

  const totalMainnetAllocationByPhase = useCallback(
    (testnet: string) => {
      const campaign = campaigns[testnet as keyof typeof campaigns]
      const reward = rewards[testnet as keyof Rewards]

      if (!campaign || reward === undefined) return 0
      return parseFloat(reward.absoluteAllocation)
    },
    [campaigns, rewards],
  )

  const totalMainnetPercentageAllocationByPhase = useCallback(
    (testnet: string) => {
      const reward = rewards[testnet as keyof Rewards]
      if (!reward) return '0.00%'
      const userTotalReward = parseFloat(reward.absoluteAllocation)
      if (!userTotalReward) return '0.00%'
      const total = userTotalReward / MAINNET_TOTAL_SUPPLY
      return (total * 100).toFixed(PERCENTAGE_PRECISION) + '%'
    },
    [rewards],
  )

  const totalUserMainnetAllocation = useMemo(() => {
    return campaignsList.reduce(
      (acc, campaign) => acc + totalMainnetAllocationByPhase(campaign.name),
      0,
    )
  }, [campaignsList, totalMainnetAllocationByPhase])

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
    return Object.values(rewards).filter((reward) => parseFloat(reward.earningsTestnetToken) > 0)
      .length
  }, [])

  const testnetsWithRewardsCount = useMemo(
    () => countTestnetsWithRewards(rewards),
    [rewards, countTestnetsWithRewards],
  )

  useEffect(() => {
    handleSearch()
  }, [handleSearch])

  useEffect(() => {
    sendGAEvent('event', 'check_testnet_rewards', { value: subspaceAccount })
  }, [subspaceAccount])

  return (
    <div className='max-w-8xl mt-8 w-full'>
      {!isLoaded ? (
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
                      <br /> out of {totalTestnetByPhase(campaign.name)} tSSC
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
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      {(campaign as any).dateRange ? (campaign as any).dateRange : 'N/A'}
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
                {totalUserTestnetRewards.toFixed(EARNINGS_PRECISION)} tSSC
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
