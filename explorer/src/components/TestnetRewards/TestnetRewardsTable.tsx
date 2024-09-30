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

type Reward = {
  earnings: string
  percentage: string
}

type Rewards = {
  geminiI: Reward
  geminiIIphase1: Reward
  geminiIIphase2: Reward
  geminiIIIf: Reward
  geminiIIIg: Reward
}

type TotalRewards = {
  geminiI: number
  geminiIIphase1: number
  geminiIIphase2: number
  geminiIIIf: number
  geminiIIIg: number
}

type AddressRewards = {
  address: { subspaceFormat: string }
  rewards: Rewards
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

  const defaultRewards: Rewards = useMemo(() => {
    return {
      geminiI: {
        earnings: '0',
        percentage: '0',
      },
      geminiIIphase1: {
        earnings: '0',
        percentage: '0',
      },
      geminiIIphase2: {
        earnings: '0',
        percentage: '0',
      },
      geminiIIIf: {
        earnings: '0',
        percentage: '0',
      },
      geminiIIIg: {
        earnings: '0',
        percentage: '0',
      },
      geminiIIIh: {
        earnings: '0',
        percentage: '0',
      },
      totalMainnet: {
        earnings: '0',
        percentage: '0',
      },
    }
  }, [])
  const defaultTotalRewards: TotalRewards = {
    // aries: 0,
    geminiI: 0,
    geminiIIphase1: 0,
    geminiIIphase2: 0,
    geminiIIIf: 0,
    geminiIIIg: 0,
  }
  const [previousRewards, setRewards] = useState<Rewards>(defaultRewards)
  const [totalRewards, setTotalRewards] = useState<TotalRewards>(defaultTotalRewards)

  // TODO: Validate portionOfMainnet
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
        testnet: 'Gemini 2.1',
        icon: <GeminiIIp1TestnetIcon />,
        dateRange: '20.09.2022 - 25.10.2022',
        portionOfMainnet: 0.05,
      },
      geminiIIphase2: {
        name: 'geminiIIphase2',
        testnet: 'Gemini 2.2',
        icon: <GeminiIIp2TestnetIcon />,
        //  dateRange: '01.04.2022 - 25.07.2022', // TODO: Check dates
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
      geminiIIIh: {
        name: 'geminiIIIh',
        testnet: 'Gemini 3h',
        icon: <Gemini3hTestnetIcon />,
        dateRange: '10.01.2024 - 25.07.2024', // TODO: Check end date
        portionOfMainnet: 4.71,
      },
      stakeWarsI: {
        name: 'stakeWarsI',
        testnet: 'Stake Wars I',
        icon: <StakeWarsIIcon />,
        dateRange: '22.11.2023 - 10.01.2024',
        portionOfMainnet: 0.0,
      },
    }),
    [],
  )

  const handleLoad = useCallback(async (fileName: string) => {
    const file = await fetch(`/data/testnet/${fileName}.csv`)
    const data = await file.text()
    const rows = data.split('\n')
    return rows.map((row) => {
      const columns = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
      return {
        address: columns[0].replace(/"/g, ''),
        rewards: parseFloat(columns[1].replace(/"/g, '').replace(/,/g, '')),
      }
    })
  }, [])

  const handleSearch = useCallback(async () => {
    const testnetData: [
      { address: string; rewards: number }[],
      { address: string; rewards: number }[],
      { address: string; rewards: number }[],
      { address: string; rewards: number }[],
      { address: string; rewards: number }[],
    ] = await Promise.all([
      handleLoad('gemini1'),
      handleLoad('gemini2Phase1'),
      handleLoad('gemini2Phase2'),
      handleLoad('gemini3F'),
      handleLoad('gemini3G'),
    ])

    const [gemini1, gemini2Phase1, gemini2Phase2, gemini3F, gemini3G] = testnetData

    const mergedRewards = new Map<string, Rewards>()
    const totalRewards = {
      aries: 0,
      geminiI: gemini1.reduce((acc, { rewards }) => acc + rewards, 0),
      geminiIIphase1: gemini2Phase1.reduce((acc, { rewards }) => acc + rewards, 0),
      geminiIIphase2: gemini2Phase2.reduce((acc, { rewards }) => acc + rewards, 0),
      geminiIIIf: gemini3F.reduce((acc, { rewards }) => acc + rewards, 0),
      geminiIIIg: gemini3G.reduce((acc, { rewards }) => acc + rewards, 0),
    }

    setTotalRewards(totalRewards)

    const addToMap = (data: { address: string; rewards: number }[], testnet: keyof Rewards) => {
      data.forEach(({ address, rewards }) => {
        if (!mergedRewards.has(address)) {
          mergedRewards.set(address, {
            // aries: { earnings: '0', percentage: '0.00' },
            geminiI: { earnings: '0', percentage: '0.00' },
            geminiIIphase1: { earnings: '0', percentage: '0.00' },
            geminiIIphase2: { earnings: '0', percentage: '0.00' },
            geminiIIIf: { earnings: '0', percentage: '0.00' },
            geminiIIIg: { earnings: '0', percentage: '0.00' },
          })
        }
        const rewardObj = mergedRewards.get(address)!
        rewardObj[testnet] = {
          earnings: rewards.toString(),
          percentage: ((rewards / totalRewards[testnet]) * 100).toFixed(PERCENTAGE_PRECISION),
        }
      })
    }

    addToMap(gemini1, 'geminiI')
    addToMap(gemini2Phase1, 'geminiIIphase1')
    addToMap(gemini2Phase2, 'geminiIIphase2')
    addToMap(gemini3F, 'geminiIIIf')
    addToMap(gemini3G, 'geminiIIIg')

    const rewards: AddressRewards[] = Array.from(mergedRewards.entries()).map(
      ([address, rewards]) => ({
        address: { subspaceFormat: address },
        rewards,
      }),
    )

    const userRewards = rewards.filter((reward) =>
      mySubspaceWallets.includes(reward.address.subspaceFormat),
    )

    const _rewards: Rewards = {
      ...defaultRewards,
      geminiI: { earnings: '0', percentage: '0.00' },
      geminiIIphase1: { earnings: '0', percentage: '0.00' },
      geminiIIphase2: { earnings: '0', percentage: '0.00' },
      geminiIIIf: { earnings: '0', percentage: '0.00' },
      geminiIIIg: { earnings: '0', percentage: '0.00' },
    }

    userRewards.forEach((reward) => {
      Object.keys(reward.rewards).forEach((testnet) => {
        const testnetKey = testnet as keyof Rewards
        _rewards[testnetKey].earnings = (
          parseFloat(_rewards[testnetKey].earnings) +
          parseFloat(reward.rewards[testnetKey].earnings)
        ).toString()
        _rewards[testnetKey].percentage = (
          parseFloat(_rewards[testnetKey].percentage) +
          parseFloat(reward.rewards[testnetKey].percentage)
        ).toString()
      })
    })

    setRewards(_rewards)
  }, [defaultRewards, handleLoad, mySubspaceWallets])

  const rewardsByPhase = useCallback(
    (phase: string) => {
      switch (phase) {
        case 'geminiI':
          return parseFloat(previousRewards.geminiI.earnings).toFixed(EARNINGS_PRECISION)
        case 'geminiIIphase1':
          return parseFloat(previousRewards.geminiIIphase1.earnings).toFixed(EARNINGS_PRECISION)
        case 'geminiIIphase2':
          return parseFloat(previousRewards.geminiIIphase2.earnings).toFixed(EARNINGS_PRECISION)
        case 'geminiIIIf':
          return parseFloat(previousRewards.geminiIIIf.earnings).toFixed(EARNINGS_PRECISION)
        case 'geminiIIIg':
          return parseFloat(previousRewards.geminiIIIg.earnings).toFixed(EARNINGS_PRECISION)
        default:
          return '0.00'
      }
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
      switch (phase) {
        case 'geminiI':
          return (
            parseFloat(previousRewards.geminiI.percentage.replace('%', '')).toFixed(
              PERCENTAGE_PRECISION,
            ) + '%'
          )
        case 'geminiIIphase1':
          return (
            parseFloat(previousRewards.geminiIIphase1.percentage.replace('%', '')).toFixed(
              PERCENTAGE_PRECISION,
            ) + '%'
          )
        case 'geminiIIphase2':
          return (
            parseFloat(previousRewards.geminiIIphase2.percentage.replace('%', '')).toFixed(
              PERCENTAGE_PRECISION,
            ) + '%'
          )
        case 'geminiIIIf':
          return (
            parseFloat(previousRewards.geminiIIIf.percentage.replace('%', '')).toFixed(
              PERCENTAGE_PRECISION,
            ) + '%'
          )
        case 'geminiIIIg':
          return (
            parseFloat(previousRewards.geminiIIIg.percentage.replace('%', '')).toFixed(
              PERCENTAGE_PRECISION,
            ) + '%'
          )
        default:
          return '0.00%'
      }
    },
    [previousRewards],
  )

  const totalEarningsTSSC = useMemo(() => {
    return (
      parseFloat(previousRewards.geminiI.earnings) +
      parseFloat(previousRewards.geminiIIphase1.earnings) +
      parseFloat(previousRewards.geminiIIphase2.earnings) +
      parseFloat(previousRewards.geminiIIIf.earnings) +
      parseFloat(previousRewards.geminiIIIg.earnings)
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
      const portionOfMainnet = campaign.portionOfMainnet
      if (campaign.portionOfMainnet === 0 || !totalReward) return 0

      const total = (totalReward * portionOfMainnet) / MAINNET_TOTAL_SUPPLY
      return total
    },
    [campaigns, totalRewards],
  )

  const totalMainnetRewardPercentagePerTestnet = useCallback(
    (testnet: string) => {
      const campaign = campaigns[testnet as keyof typeof campaigns]
      const reward = previousRewards[testnet as keyof Rewards]
      if (!reward) return '0.00%'
      const userTotalReward = parseFloat(reward.earnings)
      const portionOfMainnet = campaign.portionOfMainnet
      if (campaign.portionOfMainnet === 0 || !userTotalReward) return '0.00%'
      const total = (userTotalReward * portionOfMainnet) / MAINNET_TOTAL_SUPPLY
      return (total * 100).toFixed(PERCENTAGE_PRECISION) + '%'
    },
    [campaigns, previousRewards],
  )

  const totalMainnetRewards = useMemo(() => {
    return campaignsList.reduce((acc, campaign) => {
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
    return Object.values(rewards).filter((reward) => parseFloat(reward.earnings) > 0).length
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
                <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300'>
                  Link
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
                    {campaign.dateRange}
                  </td>
                  <td className='whitespace-nowrap px-6 py-4 text-sm'>
                    <button
                      className='rounded-full bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'
                      onClick={() => setModalOpen(true)}
                    >
                      How it&apos;s calculated
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='mt-4 flex justify-between bg-gray-50 p-4 dark:bg-gray-700'>
            <div className='text-xl font-medium text-gray-900 dark:text-white'>TOTAL EARNINGS</div>
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
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  )
}
