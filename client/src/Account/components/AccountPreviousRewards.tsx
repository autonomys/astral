import { useQuery } from '@apollo/client'
import { QUERY_ALL_REWARDS_FOR_ACCOUNT_BY_ID } from 'Account/query'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { AccountRewards } from 'gql/graphql'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'

// common
import { formatUnitsToNumber } from 'common/helpers'
import { formatAddress } from 'common/helpers/formatAddress'
import useDomains from 'common/hooks/useDomains'

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

const AccountPreviousRewards: FC<AccountPreviousRewardsProps> = () => {
  const [previousRewards, setRewards] = useState(defaultRewards)

  const { accountId } = useParams<{ accountId?: string }>()
  const { selectedChain } = useDomains()

  const convertedAddress = useMemo(
    () => (selectedChain.isDomain ? accountId : formatAddress(accountId)),
    [accountId, selectedChain],
  )

  const { data: rewardsData } = useQuery(QUERY_ALL_REWARDS_FOR_ACCOUNT_BY_ID, {
    variables: { convertedAddress },
  })
  const rewards: AccountRewards = useMemo(
    () =>
      rewardsData && rewardsData.accountRewards && rewardsData.accountRewards.length === 1
        ? rewardsData.accountRewards[0]
        : [],
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
    <div className='flex flex-col p-4 w-full border border-gray-200 dark:border-none rounded-[20px] bg-white dark:bg-gradient-to-r dark:from-[#4141B3] dark:via-[#6B5ACF] dark:to-[#896BD2]'>
      <div className='w-full flex flex-col gap-6 py-4 pl-4'>
        <div className='w-full grid grid-cols-3 gap-8 xl:gap-8'>
          <div className='col-span-1 text-[13px] font-normal text-[#857EC2] dark:text-white/75'>
            Testnet
          </div>
          <div className='col-span-1 text-[13px] font-normal text-[#857EC2] dark:text-white/75'>
            Localized tSSC
          </div>
          <div className='col-span-1 text-[13px] font-normal text-[#857EC2] dark:text-white/75'>
            Mainnet allocation %
          </div>
        </div>
        <div className='w-full'>
          <ol className='relative border-l border-[#E6EAFA] dark:border-[#6C6BCF]'>
            {rewardsPhase.map((phase, index) => (
              <li
                key={`${index}-account-rewards-block`}
                className={`grid grid-cols-3 gap-14 xl:gap-32 ${
                  index !== rewardsPhase.length - 1 && 'mb-[26px]'
                }`}
              >
                <div className=''>
                  <div
                    className={`absolute w-3 h-3 -left-1.5 rounded-full ${
                      index === 0
                        ? 'bg-[#DE67E4] dark:bg-[#DE67E4]'
                        : 'bg-[#E6EAFA] dark:bg-[#6C6BCF]'
                    }`}
                  ></div>
                  <div className='ml-4 -mt-1 text-[13px] font-normal text-[#282929 ] dark:text-white '>
                    {phase.label}
                  </div>
                </div>
                <div className='-mt-1 text-[13px] font-normal text-[#282929 ] dark:text-white'>
                  {rewardsByPhase(phase.name)}
                </div>
                <div className='-mt-1 text-[13px] font-normal text-[#282929 ] dark:text-white'>
                  {rewardsPercentageByPhase(phase.name)}
                </div>
              </li>
            ))}
            <li
              key={'total-account-rewards-block'}
              className={'grid grid-cols-3 gap-14 xl:gap-32 mb-[26px]'}
            >
              <div className=''></div>
              <div className='-mt-1 text-[13px] font-bold text-[#4B5563 ] dark:text-white'>
                Total Mainnet %
              </div>
              <div className='-mt-1 text-[13px] font-bold text-[#4B5563 ] dark:text-white'>
                {rewardsPercentageByPhase('mainnet')}
              </div>
            </li>
          </ol>
        </div>
      </div>
    </div>
  )
}

export default AccountPreviousRewards
