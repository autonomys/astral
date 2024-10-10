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
  proportionalAllocation: string
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

type TotalRewards = {
  geminiI: number
  geminiIIphase1: number
  geminiIIphase2: number
  geminiIIIf: number
  geminiIIIg: number
  geminiIIIhPhase1: number
  geminiIIIhPhase2: number
  stakeWarsIPhase1: number
  stakeWarsIPhase2: number
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

  console.log('isLoaded', isLoaded)

  const defaultRewards: Rewards = useMemo(() => {
    return {
      geminiI: {
        earningsTestnetToken: '0',
        proportionalAllocation: '0',
        absoluteAllocation: '0',
      },
      geminiIIphase1: {
        earningsTestnetToken: '0',
        proportionalAllocation: '0',
        absoluteAllocation: '0',
      },
      geminiIIphase2: {
        earningsTestnetToken: '0',
        proportionalAllocation: '0',
        absoluteAllocation: '0',
      },
      geminiIIIf: {
        earningsTestnetToken: '0',
        proportionalAllocation: '0',
        absoluteAllocation: '0',
      },
      geminiIIIg: {
        earningsTestnetToken: '0',
        proportionalAllocation: '0',
        absoluteAllocation: '0',
      },
      geminiIIIhPhase1: {
        earningsTestnetToken: '0',
        proportionalAllocation: '0',
        absoluteAllocation: '0',
      },
      geminiIIIhPhase2: {
        earningsTestnetToken: '0',
        proportionalAllocation: '0',
        absoluteAllocation: '0',
      },
      stakeWarsIPhase1: {
        earningsTestnetToken: '0',
        proportionalAllocation: '0',
        absoluteAllocation: '0',
      },
      stakeWarsIPhase2: {
        earningsTestnetToken: '0',
        proportionalAllocation: '0',
        absoluteAllocation: '0',
      },
    }
  }, [])
  const defaultTotalRewards: TotalRewards = {
    geminiI: 0,
    geminiIIphase1: 0,
    geminiIIphase2: 0,
    geminiIIIf: 0,
    geminiIIIg: 0,
    geminiIIIhPhase1: 0,
    geminiIIIhPhase2: 0,
    stakeWarsIPhase1: 0,
    stakeWarsIPhase2: 0,
  }
  const [previousRewards, setRewards] = useState<Rewards>(defaultRewards)
  const [totalRewards, setTotalRewards] = useState<TotalRewards>(defaultTotalRewards)
  const [totalTokensPerPhase, setTotalTokensPerPhase] = useState<TotalRewards>({
    geminiI: 0,
    geminiIIphase1: 0,
    geminiIIphase2: 0,
    geminiIIIf: 0,
    geminiIIIg: 0,
    geminiIIIhPhase1: 0,
    geminiIIIhPhase2: 0,
    stakeWarsIPhase1: 0,
    stakeWarsIPhase2: 0,
  })

  const campaigns = useMemo(
    () => ({
      geminiI: {
        name: 'geminiI',
        testnet: 'Gemini 1',
        icon: <GeminiITestnetIcon />,
        dateRange: '11.06.2022 - 27.06.2022',
        portionOfMainnet: 0.5,
      },
      geminiIIphase1: {
        name: 'geminiIIphase1',
        testnet: 'Gemini 2 Phase 1',
        icon: <GeminiIIp1TestnetIcon />,
        dateRange: '20.09.2022 - 25.10.2022',
        portionOfMainnet: 0.05,
      },
      geminiIIphase2: {
        name: 'geminiIIphase2',
        testnet: 'Gemini 2 Phase 2',
        icon: <GeminiIIp2TestnetIcon />,
        portionOfMainnet: 0.5,
      },
      geminiIIIf: {
        name: 'geminiIIIf',
        testnet: 'Gemini 3f',
        icon: <Gemini3p1TestnetIcon />,
        dateRange: '06.09.2023 - 02.11.2023',
        portionOfMainnet: 0.81,
      },
      geminiIIIg: {
        name: 'geminiIIIg',
        testnet: 'Gemini 3g',
        icon: <Gemini3p2TestnetIcon />,
        dateRange: '02.11.2023 - 10.01.2024',
        portionOfMainnet: 1.39,
      },
      stakeWarsIPhase1: {
        name: 'stakeWarsIPhase1',
        testnet: 'Stake Wars I Phase 1',
        icon: <StakeWarsIIcon />,
        dateRange: '22.11.2023 - 12.06.2023',
        portionOfMainnet: 0.6,
      },
      stakeWarsIPhase2: {
        name: 'stakeWarsIPhase2',
        testnet: 'Stake Wars I Phase 2',
        icon: <StakeWarsIIcon />,
        dateRange: '12.06.2023 - 10.01.2024',
        portionOfMainnet: 0.6,
      },
      geminiIIIhPhase1: {
        name: 'geminiIIIhPhase1',
        testnet: 'Gemini 3h Phase 1',
        icon: <Gemini3hTestnetIcon />,
        dateRange: '10.01.2024 - 25.07.2024',
        portionOfMainnet: 4.71,
      },
      geminiIIIhPhase2: {
        name: 'geminiIIIhPhase2',
        testnet: 'Gemini 3h Phase 2',
        icon: <Gemini3hTestnetIcon />,
        dateRange: '10.01.2024 - 25.07.2024',
        portionOfMainnet: 4.71,
      },
    }),
    [],
  )

  const cleanCell = (cell: string) => cell.replace(/"/g, '').replace(/,/g, '')

  const handleLoad = useCallback(async () => {
    const file = await fetch('/data/testnet/astralTestnetRewardsMainnetAllocations.csv')
    const data = await file.text()
    const rows = data.split('\n').slice(1)
    return rows.map((row) => {
      const columns = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
      return {
        address: cleanCell(columns[0]),
        rewards: {
          geminiI: {
            earningsTestnetToken: parseFloat(cleanCell(columns[1])) || 0,
            absoluteAllocation: parseFloat(cleanCell(columns[37])) || 0,
          },
          geminiIIphase1: {
            earningsTestnetToken: parseFloat(cleanCell(columns[2])) || 0,
            absoluteAllocation: 0,
          },
          geminiIIphase2: {
            earningsTestnetToken: parseFloat(cleanCell(columns[3])) || 0,
            absoluteAllocation: parseFloat(cleanCell(columns[38])) || 0,
          },
          geminiIIIf: {
            earningsTestnetToken: parseFloat(cleanCell(columns[4])) || 0,
            absoluteAllocation: parseFloat(cleanCell(columns[40])) || 0,
          },
          geminiIIIg: {
            earningsTestnetToken: parseFloat(cleanCell(columns[5])) || 0,
            absoluteAllocation: parseFloat(cleanCell(columns[41])) || 0,
          },
          geminiIIIhPhase1: {
            earningsTestnetToken: parseFloat(cleanCell(columns[6])) || 0,
            absoluteAllocation: parseFloat(cleanCell(columns[42])) || 0,
          },
          geminiIIIhPhase2: {
            earningsTestnetToken: parseFloat(cleanCell(columns[7])) || 0,
            absoluteAllocation: parseFloat(cleanCell(columns[43])) || 0,
          },
          stakeWarsIPhase1: {
            earningsTestnetToken: parseFloat(cleanCell(columns[9])) || 0,
            absoluteAllocation: parseFloat(cleanCell(columns[44])) || 0,
          },
          stakeWarsIPhase2: {
            earningsTestnetToken: parseFloat(cleanCell(columns[10])) || 0,
            absoluteAllocation: parseFloat(cleanCell(columns[45])) || 0,
          },
        },
        totalAllocation: parseFloat(cleanCell(columns[46])) || 0,
      }
    })
  }, [])

  const handleSearch = useCallback(async () => {
    const testnetData = await handleLoad()

    const calculatedTotalTokensPerPhase: TotalRewards = {
      geminiI: 0,
      geminiIIphase1: 0,
      geminiIIphase2: 0,
      geminiIIIf: 0,
      geminiIIIg: 0,
      geminiIIIhPhase1: 0,
      geminiIIIhPhase2: 0,
      stakeWarsIPhase1: 0,
      stakeWarsIPhase2: 0,
    }

    testnetData.forEach((reward) => {
      Object.keys(reward.rewards).forEach((key) => {
        const testnetKey = key as keyof TotalRewards
        calculatedTotalTokensPerPhase[testnetKey] += reward.rewards[testnetKey].earningsTestnetToken
      })
    })

    setTotalTokensPerPhase(calculatedTotalTokensPerPhase)

    console.log('Total tokens per phase:', calculatedTotalTokensPerPhase)

    const userRewards = testnetData.filter((reward) => mySubspaceWallets.includes(reward.address))

    console.log('userRewards', userRewards)

    const mergedRewards: Rewards = userRewards.reduce(
      (acc, reward) => {
        Object.keys(reward.rewards).forEach((key) => {
          const testnetKey = key as keyof Rewards

          console.log('testnetKey', testnetKey)
          console.log('reward.rewards[testnetKey]', reward.rewards[testnetKey])

          acc[testnetKey].earningsTestnetToken = (
            parseFloat(acc[testnetKey].earningsTestnetToken) +
            reward.rewards[testnetKey].earningsTestnetToken
          ).toString()

          acc[testnetKey].proportionalAllocation = (
            (parseFloat(acc[testnetKey].absoluteAllocation) +
              reward.rewards[testnetKey].absoluteAllocation) /
            MAINNET_TOTAL_SUPPLY
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

    console.log('mergedRewards', mergedRewards)

    setRewards(mergedRewards)
    setTotalRewards({
      geminiI: parseFloat(mergedRewards.geminiI.absoluteAllocation),
      geminiIIphase1: parseFloat(mergedRewards.geminiIIphase1.absoluteAllocation),
      geminiIIphase2: parseFloat(mergedRewards.geminiIIphase2.absoluteAllocation),
      geminiIIIf: parseFloat(mergedRewards.geminiIIIf.absoluteAllocation),
      geminiIIIg: parseFloat(mergedRewards.geminiIIIg.absoluteAllocation),
      geminiIIIhPhase1: parseFloat(mergedRewards.geminiIIIhPhase1.absoluteAllocation),
      geminiIIIhPhase2: parseFloat(mergedRewards.geminiIIIhPhase2.absoluteAllocation),
      stakeWarsIPhase1: parseFloat(mergedRewards.stakeWarsIPhase1.absoluteAllocation),
      stakeWarsIPhase2: parseFloat(mergedRewards.stakeWarsIPhase2.absoluteAllocation),
    })
    setIsLoaded(true)
  }, [defaultRewards, handleLoad, mySubspaceWallets])

  const rewardsByPhase = useCallback(
    (phase: string) => {
      if (previousRewards[phase as keyof Rewards])
        return parseFloat(previousRewards[phase as keyof Rewards].earningsTestnetToken).toFixed(
          EARNINGS_PRECISION,
        )
      return '0.00'
    },
    [previousRewards],
  )

  const totalTSSC = useCallback(
    (phase: string) => {
      switch (phase) {
        case 'geminiI':
          return numberFormattedString(totalRewards.geminiI)
        case 'geminiIIphase1':
          return numberFormattedString(totalRewards.geminiIIphase1)
        case 'geminiIIphase2':
          return numberFormattedString(totalRewards.geminiIIphase2)
        case 'geminiIIIf':
          return numberFormattedString(totalRewards.geminiIIIf)
        case 'geminiIIIg':
          return numberFormattedString(totalRewards.geminiIIIg)
        default:
          return 0
      }
    },
    [totalRewards],
  )

  const rewardsPercentageByPhase = useCallback(
    (phase: string) => {
      if (previousRewards[phase as keyof Rewards]) {
        const totalTokens = totalTokensPerPhase[phase as keyof TotalRewards]
        const userTotalReward = parseFloat(
          previousRewards[phase as keyof Rewards].absoluteAllocation,
        )
        return totalTokens > 0
          ? ((userTotalReward / totalTokens) * 100).toFixed(PERCENTAGE_PRECISION) + '%'
          : '0.00%'
      }
      return '0.00%'
    },
    [previousRewards, totalTokensPerPhase],
  )

  const totalEarningsTSSC = useMemo(() => {
    return (
      parseFloat(previousRewards.geminiI.earningsTestnetToken) +
      parseFloat(previousRewards.geminiIIphase1.earningsTestnetToken) +
      parseFloat(previousRewards.geminiIIphase2.earningsTestnetToken) +
      parseFloat(previousRewards.geminiIIIf.earningsTestnetToken) +
      parseFloat(previousRewards.geminiIIIg.earningsTestnetToken)
    )
  }, [previousRewards])

  const totalTestnetTokenEmissions = useMemo(() => {
    return (
      totalRewards.geminiI +
      totalRewards.geminiIIphase1 +
      totalRewards.geminiIIphase2 +
      totalRewards.geminiIIIf +
      totalRewards.geminiIIIg
    )
  }, [totalRewards])

  const totalEarningsTSSCPercentage = useMemo(() => {
    return (totalEarningsTSSC / totalTestnetTokenEmissions).toFixed(PERCENTAGE_PRECISION) + '%'
  }, [totalEarningsTSSC, totalTestnetTokenEmissions])

  const campaignsList = useMemo(() => Object.values(campaigns), [campaigns])

  const totalMainnetRewardPerTestnet = useCallback(
    (testnet: string) => {
      const campaign = campaigns[testnet as keyof typeof campaigns]
      const totalReward = totalRewards[testnet as keyof TotalRewards]

      if (!campaign || totalReward === undefined) return 0
      return totalReward
    },
    [campaigns, totalRewards],
  )

  const totalMainnetRewardPercentagePerTestnet = useCallback(
    (testnet: string) => {
      const reward = previousRewards[testnet as keyof Rewards]
      if (!reward) return '0.00%'
      const userTotalReward = parseFloat(reward.absoluteAllocation)
      if (!userTotalReward) return '0.00%'
      const total = userTotalReward / MAINNET_TOTAL_SUPPLY
      return (total * 100).toFixed(PERCENTAGE_PRECISION) + '%'
    },
    [previousRewards],
  )

  const totalMainnetRewards = useMemo(() => {
    return campaignsList.reduce((acc, campaign) => {
      console.log('campaign', campaign)
      console.log('totalMainnetRewardPerTestnet', totalMainnetRewardPerTestnet(campaign.name))
      return acc + totalMainnetRewardPerTestnet(campaign.name)
    }, 0)
  }, [campaignsList, totalMainnetRewardPerTestnet])

  const totalMainnetRewardsPercentage = useMemo(() => {
    return (
      campaignsList
        .reduce((acc, campaign) => {
          const percentage = parseFloat(
            totalMainnetRewardPercentagePerTestnet(campaign.name).replace('%', ''),
          )
          return acc + percentage
        }, 0)
        .toFixed(PERCENTAGE_PRECISION) + '%'
    )
  }, [campaignsList, totalMainnetRewardPercentagePerTestnet])

  const countTestnetsWithRewards = useCallback((rewards: Rewards): number => {
    return Object.values(rewards).filter((reward) => parseFloat(reward.earningsTestnetToken) > 0)
      .length
  }, [])

  const testnetsWithRewardsCount = useMemo(
    () => countTestnetsWithRewards(previousRewards),
    [previousRewards, countTestnetsWithRewards],
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
            <div className='mx-8 flex w-full max-w-4xl items-center justify-between rounded-full border border-blue-600 bg-blue-50 p-8 text-blue-600'>
              <div className='text-2xl font-semibold'>TOTAL EARNINGS</div>
              <div className='text-4xl font-bold'>
                {numberFormattedString(totalMainnetRewards)} ATC
              </div>
              <div className='text-2xl font-semibold'>TESTNETS IN TOTAL</div>
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
                      <span className='font-bold'>{rewardsPercentageByPhase(campaign.name)}</span>
                      <br />
                    </td>
                    <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300'>
                      <span className='font-bold'>{rewardsByPhase(campaign.name)}</span>
                      <br /> out of {totalTSSC(campaign.name)} tSSC
                    </td>
                    <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300'>
                      <span className='font-bold'>
                        {totalMainnetRewardPercentagePerTestnet(campaign.name)}
                      </span>
                      <br />
                    </td>
                    <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300'>
                      {numberFormattedString(totalMainnetRewardPerTestnet(campaign.name))}
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
                {totalEarningsTSSCPercentage}
              </div>
              <div className='text-sm text-gray-500 dark:text-gray-300'>
                {totalEarningsTSSC.toFixed(EARNINGS_PRECISION)} tSSC
              </div>
              <div className='text-sm text-gray-500 dark:text-gray-300'>
                {totalMainnetRewardsPercentage}
              </div>
              <div className='text-sm text-gray-500 dark:text-gray-300'>
                {numberFormattedString(totalMainnetRewards)} ATC
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
