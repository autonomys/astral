'use client'

import {
  AriesStressTestIcon,
  Gemini3fTestnetIcon,
  Gemini3hTestnetIcon,
  GeminiIIncentivizedTestnetIcon,
  GeminiIITestnetIcon,
  StakeWarsIIcon,
  StakeWarsIIIcon,
} from 'components/icons/TestnetIcon'
import { FC } from 'react'

export const TestnetRewardsTable: FC = () => {
  const rewards = [
    {
      icon: <AriesStressTestIcon />,
      testnet: 'Aries Stress Test',
      earningsPercent: '0.00001',
      earningsTSSC: '100',
      earningsATC: '0.0000029',
      rank: '#560',
      dateRange: '01.05.2021 - 01.06.2021',
    },
    {
      icon: <GeminiIIncentivizedTestnetIcon />,
      testnet: 'Gemini I Incentivized Testnet',
      earningsPercent: '0.00001',
      earningsTSSC: '100',
      earningsATC: '0.0000029',
      rank: '#23560',
      dateRange: '01.04.2022 - 25.07.2022',
    },
    {
      icon: <GeminiIITestnetIcon />,
      testnet: 'Gemini II Testnet',
      earningsPercent: '0.00001',
      earningsTSSC: '100',
      earningsATC: '0.0000029',
      rank: '#23560',
      dateRange: '01.04.2022 - 25.07.2022',
    },
    {
      icon: <Gemini3fTestnetIcon />,
      testnet: 'Gemini 3f Testnet',
      earningsPercent: '0.00001',
      earningsTSSC: '100',
      earningsATC: '0.0000029',
      rank: '#23560',
      dateRange: '01.04.2022 - 25.07.2022',
    },
    {
      icon: <Gemini3hTestnetIcon />,
      testnet: 'Gemini 3h Testnet',
      earningsPercent: '0.00001',
      earningsTSSC: '100',
      earningsATC: '0.0000029',
      rank: '#23560',
      dateRange: '01.04.2022 - 25.07.2022',
    },
    {
      icon: <StakeWarsIIcon />,
      testnet: 'Stake Wars I',
      earningsPercent: '0.00001',
      earningsTSSC: '100',
      earningsATC: '0.0000029',
      rank: '#23560',
      dateRange: '01.04.2022 - 25.07.2022',
    },
    {
      icon: <StakeWarsIIIcon />,
      testnet: 'Stake Wars II',
      earningsPercent: '0.00001',
      earningsTSSC: '100',
      earningsATC: '0.0000029',
      rank: '#23560',
      dateRange: '01.04.2022 - 25.07.2022',
    },
  ]

  const totalEarningsPercent = rewards
    .reduce((acc, reward) => acc + parseFloat(reward.earningsPercent), 0)
    .toFixed(5)
  const totalEarningsTSSC = rewards.reduce(
    (acc, reward) => acc + parseFloat(reward.earningsTSSC),
    0,
  )
  const totalEarningsATC = rewards
    .reduce((acc, reward) => acc + parseFloat(reward.earningsATC), 0)
    .toFixed(7)

  return (
    <div className='max-w-8xl mt-8 w-full'>
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
              {totalEarningsTSSC} out of 10000 tSSC
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
