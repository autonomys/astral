'use client'

import { useSquidQuery } from '@/hooks/useSquidQuery'
import { bigNumberToFormattedString } from '@/utils/number'
import { sendGAEvent } from '@next/third-parties/google'
import {
  AriesStressTestIcon,
  Gemini3fTestnetIcon,
  Gemini3hTestnetIcon,
  GeminiIIncentivizedTestnetIcon,
  GeminiIITestnetIcon,
  StakeWarsIIcon,
  StakeWarsIIIcon,
} from 'components/icons/TestnetIcon'
import {
  AccountsPerCampaignListQuery,
  AccountsPerCampaignListQueryVariables,
  Order_By as OrderBy,
} from 'gql/types/testnetRewards'
import useWallet from 'hooks/useWallet'
import { useWindowFocus } from 'hooks/useWindowFocus'
import { FC, useEffect, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import { QUERY_ACCOUNTS_PER_CAMPAIGN_LIST } from './testnetRewards.query'

export const TestnetRewardsTable: FC = () => {
  const { ref, inView } = useInView()
  const { subspaceAccount } = useWallet()
  const inFocus = useWindowFocus()

  const where = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const conditions: Record<string, any> = {}

    if (subspaceAccount) {
      // eslint-disable-next-line camelcase
      conditions.account_id = { _eq: subspaceAccount }
    }

    return conditions
  }, [subspaceAccount])

  const variables = useMemo(
    () =>
      ({
        limit: 12,
        offset: undefined,
        // eslint-disable-next-line camelcase
        orderBy: { campaign_id: OrderBy.Asc },
        where,
      }) as AccountsPerCampaignListQueryVariables,
    [where],
  )

  const { loading, data, setIsVisible } = useSquidQuery<
    AccountsPerCampaignListQuery,
    AccountsPerCampaignListQueryVariables
  >(QUERY_ACCOUNTS_PER_CAMPAIGN_LIST, {
    variables,
    skip: !inFocus,
    pollInterval: 6000,
    context: { clientName: 'testnetRewards' },
  })

  const campaigns = useMemo(
    () => ({
      aries: {
        testnet: 'Aries Stress Test',
        icon: <AriesStressTestIcon />,
        dateRange: '01.05.2021 - 01.06.2021',
      },
      'gemini-1': {
        testnet: 'Gemini 1',
        icon: <GeminiIIncentivizedTestnetIcon />,
        dateRange: '01.04.2022 - 25.07.2022',
      },
      'gemini-2.1': {
        testnet: 'Gemini 2.1',
        icon: <GeminiIIncentivizedTestnetIcon />,
        dateRange: '01.04.2022 - 25.07.2022',
      },
      'gemini-2.2': {
        testnet: 'Gemini 2.2',
        icon: <GeminiIITestnetIcon />,
        dateRange: '01.04.2022 - 25.07.2022',
      },
      'gemini-3f': {
        testnet: 'Gemini 3f',
        icon: <Gemini3fTestnetIcon />,
        dateRange: '01.04.2022 - 25.07.2022',
      },
      'gemini-3g': {
        testnet: 'Gemini 3g',
        icon: <Gemini3fTestnetIcon />,
        dateRange: '01.04.2022 - 25.07.2022',
      },
      'gemini-3h': {
        testnet: 'Gemini 3h',
        icon: <Gemini3hTestnetIcon />,
        dateRange: '01.04.2022 - 25.07.2022',
      },
      'stake-wars-i': {
        testnet: 'Stake Wars I',
        icon: <StakeWarsIIcon />,
        dateRange: '01.04.2022 - 25.07.2022',
      },
      'stake-wars-ii': {
        testnet: 'Stake Wars II',
        icon: <StakeWarsIIIcon />,
        dateRange: '01.04.2022 - 25.07.2022',
      },
    }),
    [],
  )

  const rewards = useMemo(() => {
    if (loading || !data) return []

    return data.account_per_campaign.map((item) => ({
      ...campaigns[item.campaign_id as keyof typeof campaigns],
      earningsPercent: item.total_earnings_percentage_testnet_token,
      earningsTSSC: bigNumberToFormattedString(item.total_earnings_amount_testnet_token),
      earningsATC: bigNumberToFormattedString(item.total_earnings_amount_atc_token),
      rank: item.rank,
    }))
  }, [data, loading, campaigns])

  const totalEarningsPercent = '0.1'
  const totalEarningsTSSC = data
    ? data.account_per_campaign.reduce(
        (acc, reward) => acc + parseFloat(reward.total_earnings_amount_testnet_token),
        0,
      )
    : 0
  const totalEarningsATC = data
    ? data.account_per_campaign.reduce(
        (acc, reward) => acc + parseFloat(reward.total_earnings_amount_atc_token),
        0,
      )
    : 0

  useEffect(() => {
    setIsVisible(inView)
  }, [inView, setIsVisible])

  useEffect(() => {
    sendGAEvent('event', 'check_testnet_rewards', { value: subspaceAccount })
  }, [subspaceAccount])

  return (
    <div className='max-w-8xl mt-8 w-full' ref={ref}>
      <div className='mt-4 rounded-lg bg-white p-4 shadow-md dark:bg-gray-800'>
        <h3 className='text-center text-lg font-bold text-gray-400 dark:text-white'>
          Your rewards at Autonomys (Subspace Network) Testnets
        </h3>
        <div className='mb-4 mt-4 flex justify-center'>
          <div className='mx-8 flex w-full max-w-4xl items-center justify-between rounded-full border border-blue-600 bg-blue-50 p-8 text-blue-600'>
            <div className='text-2xl font-semibold'>TOTAL EARNINGS</div>
            <div className='text-4xl font-bold'>{totalEarningsPercent}%</div>
            <div className='text-2xl font-semibold'>TESTNETS IN TOTAL</div>
            <div className='text-4xl font-bold'>{rewards.length}</div>
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
                  Your rank
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
              {rewards.map((reward, index) => (
                <tr key={index}>
                  <td className='whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white'>
                    <div className='flex items-center'>
                      <span className='mr-2'>{reward.icon}</span>
                      <span>{reward.testnet}</span>
                    </div>
                  </td>
                  <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300'>
                    <span className='font-bold'>{reward.earningsPercent}</span>
                    <br /> out of 0.1%
                  </td>
                  <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300'>
                    <span className='font-bold'>{reward.earningsTSSC}</span>
                    <br /> out of 10000 tSSC
                  </td>
                  <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300'>
                    <span className='font-bold'>{reward.earningsATC}</span>
                    <br /> out of ......
                  </td>
                  <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300'>
                    {reward.rank}
                  </td>
                  <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300'>
                    {reward.dateRange}
                  </td>
                  <td className='whitespace-nowrap px-6 py-4 text-sm'>
                    <button className='rounded-full bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'>
                      Link to the table
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='mt-4 flex justify-between bg-gray-50 p-4 dark:bg-gray-700'>
            <div className='text-xl font-medium text-gray-900 dark:text-white'>TOTAL EARNINGS</div>
            <div className='text-sm text-gray-500 dark:text-gray-300'>
              {totalEarningsPercent} out of 0.1%
            </div>
            <div className='text-sm text-gray-500 dark:text-gray-300'>
              {bigNumberToFormattedString(totalEarningsTSSC)} out of 10000 tSSC
            </div>
            <div className='text-sm text-gray-500 dark:text-gray-300'>
              {totalEarningsATC} out of ......
            </div>
            <div className='text-sm text-gray-500 dark:text-gray-300'>#420</div>
            <div className='text-sm text-gray-500 dark:text-gray-300'></div>
          </div>
        </div>
      </div>
    </div>
  )
}
