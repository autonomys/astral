import { AccountIdParam } from '@/types/app'
import { formatUnitsToNumber } from '@/utils/number'
import { useQuery } from '@apollo/client'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { AccountRewards, AllRewardForAccountByIdQuery } from 'gql/graphql'
import useDomains from 'hooks/useDomains'
import { useParams } from 'next/navigation'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { formatAddress } from 'utils//formatAddress'
import { QUERY_ALL_REWARDS_FOR_ACCOUNT_BY_ID } from './query'

dayjs.extend(relativeTime)

interface AccountPreviousRewardsProps {
  isDesktop: boolean
}

const defaultRewards = {
  aries: {
    blocksWon: '0',
  },
  geminiI: {
    earnings: '0',
    percentage: '0',
  },
  geminiII: {
    earnings: '0',
    percentage: '0',
  },
  geminiIII: {
    IIIf: {
      earnings: '0',
      percentage: '0',
    },
    IIIg: {
      earnings: '0',
      percentage: '0',
    },
    IIIh: {
      earnings: '0',
      percentage: '0',
    },
  },
  totalMainnet: {
    earnings: '0',
    percentage: '0',
  },
}

export const AccountPreviousRewards: FC<AccountPreviousRewardsProps> = () => {
  const [previousRewards, setRewards] = useState(defaultRewards)

  const { accountId } = useParams<AccountIdParam>()
  const { selectedChain } = useDomains()

  const convertedAddress = useMemo(
    () => (selectedChain.isDomain ? accountId : formatAddress(accountId)),
    [accountId, selectedChain],
  )

  const { data: rewardsData } = useQuery<AllRewardForAccountByIdQuery>(
    QUERY_ALL_REWARDS_FOR_ACCOUNT_BY_ID,
    {
      variables: { convertedAddress },
    },
  )
  const rewards = useMemo(
    () =>
      rewardsData && rewardsData.accountRewards && rewardsData.accountRewards.length === 1
        ? (rewardsData.accountRewards[0] as AccountRewards)
        : ({} as AccountRewards),
    [rewardsData],
  )

  const handleSearch = useCallback(async () => {
    const file = await fetch('/data/rewards.csv')
    const data = await file.text()
    const rows = data.split('\n').slice(1)
    const rewards = rows.map((row) => {
      const columns = row.split(',')
      return {
        address: {
          subspaceFormat: columns[0],
          polkadotFormat: columns[1],
        },
        rewards: {
          ...defaultRewards,
          aries: {
            blocksWon: columns[2],
          },
          geminiI: {
            earnings: columns[3],
            percentage: columns[4],
          },
          geminiII: {
            earnings: columns[5],
            percentage: columns[6],
          },
        },
      }
    })

    const fileGeminiIIIf = await fetch('/data/gemini-3f-rewards.csv')
    const dataGeminiIIIf = await fileGeminiIIIf.text()
    const rowsGeminiIIIf = dataGeminiIIIf.split('\n').slice(1)

    const totalRewardsGeminiIIIf = rowsGeminiIIIf.reduce((acc, row) => {
      const amount = parseFloat(row.split(',')[1])
      if (isNaN(amount)) return acc
      return acc + amount
    }, 0)
    const rewardsGeminiIIIf = rowsGeminiIIIf.map((row) => {
      const columns = row.split(',')
      return {
        address: {
          subspaceFormat: columns[0],
        },
        rewards: {
          geminiIII: {
            ...defaultRewards.geminiIII,
            IIIf: {
              earnings: columns[1],
              percentage: ((parseFloat(columns[1]) / totalRewardsGeminiIIIf) * 100).toFixed(2),
            },
          },
        },
      }
    })

    const userRewards = rewards.filter(
      (reward) => reward.address.subspaceFormat === convertedAddress,
    )
    const userRewardsGeminiIIIf = rewardsGeminiIIIf.filter(
      (reward) => reward.address.subspaceFormat === convertedAddress,
    )

    if (userRewards.length > 0 || userRewardsGeminiIIIf.length > 0)
      setRewards({ ...userRewards[0].rewards, ...userRewardsGeminiIIIf[0].rewards })
  }, [convertedAddress])

  const rewardsPhase = [
    {
      name: 'aries',
      label: 'Aries',
    },
    {
      name: 'geminiI',
      label: 'Gemini I',
    },
    {
      name: 'geminiII',
      label: 'Gemini II',
    },
    {
      name: 'gemini3f',
      label: 'Gemini 3f',
    },
    {
      name: 'gemini3g',
      label: 'Gemini 3g',
    },
    {
      name: 'gemini3h',
      label: 'Gemini 3h',
    },
  ]

  const rewardsByPhase = useCallback(
    (phase: string) => {
      switch (phase) {
        case 'aries':
          return parseFloat(previousRewards.aries.blocksWon).toFixed(2)
        case 'geminiI':
          return parseFloat(previousRewards.geminiI.earnings).toFixed(2)
        case 'geminiII':
          return parseFloat(previousRewards.geminiII.earnings).toFixed(2)
        case 'gemini3f':
          return parseFloat(previousRewards.geminiIII.IIIf.earnings).toFixed(2)
        case 'gemini3g':
          return formatUnitsToNumber(
            (BigInt(rewards.vote ?? 0) - BigInt(rewards.block ?? 0)).toString(),
          ).toFixed(2)
        case 'gemini3h':
          return 'n/a'
        default:
          return '0.00'
      }
    },
    [previousRewards, rewards],
  )

  const rewardsPercentageByPhase = useCallback(
    (phase: string) => {
      switch (phase) {
        case 'geminiI':
          return parseFloat(previousRewards.geminiI.percentage.replace('%', '')).toFixed(2) + '%'
        case 'geminiII':
          return parseFloat(previousRewards.geminiII.percentage.replace('%', '')).toFixed(2) + '%'
        case 'gemini3f':
          return (
            parseFloat(previousRewards.geminiIII.IIIf.percentage.replace('%', '')).toFixed(2) + '%'
          )
        case 'gemini3g':
        case 'gemini3h':
        case 'mainnet':
          return 'n/a'
        case 'aries':
        default:
          return '0.00%'
      }
    },
    [previousRewards],
  )

  useEffect(() => {
    handleSearch()
  }, [handleSearch])

  return (
    <div className='dark:from-gradientTwilight dark:via-gradientDusk dark:to-gradientSunset flex w-full flex-col rounded-[20px] border border-gray-200 bg-white p-4 dark:border-none dark:bg-gradient-to-r'>
      <div className='flex w-full flex-col gap-6 py-4 pl-4'>
        <div className='grid w-full grid-cols-3 gap-8 xl:gap-8'>
          <div className='text-purpleShade2 col-span-1 text-[13px] font-normal dark:text-white/75'>
            Testnet
          </div>
          <div className='text-purpleShade2 col-span-1 text-[13px] font-normal dark:text-white/75'>
            Localized {selectedChain.token.symbol}
          </div>
          <div className='text-purpleShade2 col-span-1 text-[13px] font-normal dark:text-white/75'>
            Mainnet allocation %
          </div>
        </div>
        <div className='w-full'>
          <ol className='border-purpleLight dark:border-blueShade1 relative border-l'>
            {rewardsPhase.map((phase, index) => (
              <li
                key={`${index}-account-rewards-block`}
                className={`grid grid-cols-3 gap-14 xl:gap-32 ${
                  index !== rewardsPhase.length - 1 && 'mb-[26px]'
                }`}
              >
                <div className=''>
                  <div
                    className={`absolute -left-1.5 size-3 rounded-full ${
                      index === 0
                        ? 'bg-purpleAccent dark:bg-purpleAccent'
                        : 'bg-purpleLight dark:bg-blueShade1'
                    }`}
                  ></div>
                  <div className='text-grayDark -mt-1 ml-4 text-[13px] font-normal dark:text-white '>
                    {phase.label}
                  </div>
                </div>
                <div className='text-grayDark -mt-1 text-[13px] font-normal dark:text-white'>
                  {rewardsByPhase(phase.name)}
                </div>
                <div className='text-grayDark -mt-1 text-[13px] font-normal dark:text-white'>
                  {rewardsPercentageByPhase(phase.name)}
                </div>
              </li>
            ))}
            <li
              key={'total-account-rewards-block'}
              className={'mb-[26px] grid grid-cols-3 gap-14 xl:gap-32'}
            >
              <div className=''></div>
              <div className='text-grayMedium -mt-1 text-[13px] font-bold dark:text-white'>
                Total Mainnet %
              </div>
              <div className='text-grayMedium -mt-1 text-[13px] font-bold dark:text-white'>
                {rewardsPercentageByPhase('mainnet')}
              </div>
            </li>
          </ol>
        </div>
      </div>
    </div>
  )
}
