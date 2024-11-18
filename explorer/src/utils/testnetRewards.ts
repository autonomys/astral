import { numberFormattedString } from './number'

type Reward<T = string> = {
  earningsTestnetToken: T
  absoluteAllocation: T
}

type DateRange = {
  start: Date
  end: Date
}

export type Rewards<T = string> = {
  aries: Reward<T>
  geminiI: Reward<T>
  geminiII: Reward<T>
  geminiIII: Reward<T>
  stakeWarsI: Reward<T>
  total: Reward<T>
}

export type AllRewards = {
  address: string
  rewards: Rewards<number>
  totalAllocation: number
}

export type Campaign = {
  name: string
  testnet: string
  icon: React.ReactNode
  dateRange?: DateRange
  label?: string
}

export const MAINNET_TOTAL_SUPPLY = 1000000000
export const PERCENTAGE_PRECISION = 6
export const DEFAULT_REWARDS: Rewards = {
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
export const CAMPAIGNS = {
  aries: {
    name: 'aries',
    testnet: 'Aries Stress Test',
    label: 'eligible addresses',
  },
  geminiI: {
    name: 'geminiI',
    testnet: 'Gemini 1',
    dateRange: { start: new Date('2022-06-11'), end: new Date('2022-06-27') },
  },
  geminiII: {
    name: 'geminiII',
    testnet: 'Gemini 2',
    dateRange: { start: new Date('2022-09-20'), end: new Date('2022-10-25') },
  },
  geminiIII: {
    name: 'geminiIII',
    testnet: 'Gemini 3',
    dateRange: { start: new Date('2023-09-06'), end: new Date('2024-09-18') },
    label: 'block and vote rewards',
  },
  stakeWarsI: {
    name: 'stakeWarsI',
    testnet: 'Stake Wars I',
    dateRange: { start: new Date('2023-11-22'), end: new Date('2024-01-10') },
  },
}

export const DATE_LOCALES = 'en-CA'
export const DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
}

export const cleanCell = (cell: string) => {
  const cleaned = cell.replace(/"/g, '').replace(/,/g, '')
  if (!cleaned) return '0'
  return cleaned
}

export const getTestnetRewards = async () => {
  const file = await fetch('/data/testnet/astralTestnetRewardsMainnetAllocations-16oct2024.csv')
  const data = await file.text()
  const rows = data.split('\n').slice(6)
  const rewardsData = rows.map((row) => {
    const columns = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
    return {
      address: cleanCell(columns[0]),
      rewards: {
        aries: {
          earningsTestnetToken: parseFloat(cleanCell(columns[1])) || 0,
          absoluteAllocation: parseFloat(cleanCell(columns[38])) || 0,
        },
        geminiI: {
          earningsTestnetToken: parseFloat(cleanCell(columns[2])) || 0,
          absoluteAllocation: parseFloat(cleanCell(columns[39])) || 0,
        },
        geminiII: {
          earningsTestnetToken:
            parseFloat(cleanCell(columns[3])) + parseFloat(cleanCell(columns[4])) || 0,
          absoluteAllocation:
            parseFloat(cleanCell(columns[40])) + parseFloat(cleanCell(columns[41])) || 0,
        },
        geminiIII: {
          earningsTestnetToken:
            parseFloat(cleanCell(columns[7])) +
              parseFloat(cleanCell(columns[8])) +
              parseFloat(cleanCell(columns[9])) +
              parseFloat(cleanCell(columns[10])) || 0,
          absoluteAllocation:
            parseFloat(cleanCell(columns[42])) + parseFloat(cleanCell(columns[43])) || 0,
        },
        stakeWarsI: {
          earningsTestnetToken:
            parseFloat(cleanCell(columns[12])) + parseFloat(cleanCell(columns[13])) || 0,
          absoluteAllocation:
            parseFloat(cleanCell(columns[44])) + parseFloat(cleanCell(columns[45])) || 0,
        },
        total: {
          earningsTestnetToken:
            // aries
            parseFloat(cleanCell(columns[1])) +
              // geminiI
              parseFloat(cleanCell(columns[2])) +
              // geminiII
              parseFloat(cleanCell(columns[3])) +
              parseFloat(cleanCell(columns[4])) +
              // geminiIII
              parseFloat(cleanCell(columns[7])) +
              parseFloat(cleanCell(columns[8])) +
              parseFloat(cleanCell(columns[9])) +
              parseFloat(cleanCell(columns[10])) +
              // stakeWarsI
              parseFloat(cleanCell(columns[12])) +
              parseFloat(cleanCell(columns[13])) || 0,
          // total mainnet allocation
          absoluteAllocation: parseFloat(cleanCell(columns[47])) || 0,
        },
      },
    } as AllRewards
  })

  const totalRow = data.split('\n')[1]
  const totalRowColumns = totalRow.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
  const totals: Rewards = {
    aries: {
      earningsTestnetToken: parseFloat(cleanCell(totalRowColumns[1])).toString() || '0',
      absoluteAllocation: parseFloat(cleanCell(totalRowColumns[38])).toString() || '0',
    },
    geminiI: {
      earningsTestnetToken: parseFloat(cleanCell(totalRowColumns[2])).toString() || '0',
      absoluteAllocation: parseFloat(cleanCell(totalRowColumns[39])).toString() || '0',
    },
    geminiII: {
      earningsTestnetToken:
        (
          parseFloat(cleanCell(totalRowColumns[3])) + parseFloat(cleanCell(totalRowColumns[4]))
        ).toString() || '0',
      absoluteAllocation:
        (
          parseFloat(cleanCell(totalRowColumns[40])) + parseFloat(cleanCell(totalRowColumns[41]))
        ).toString() || '0',
    },
    geminiIII: {
      earningsTestnetToken:
        (
          parseFloat(cleanCell(totalRowColumns[7])) +
          parseFloat(cleanCell(totalRowColumns[8])) +
          parseFloat(cleanCell(totalRowColumns[9])) +
          parseFloat(cleanCell(totalRowColumns[10]))
        ).toString() || '0',
      absoluteAllocation:
        (
          parseFloat(cleanCell(totalRowColumns[42])) + parseFloat(cleanCell(totalRowColumns[43]))
        ).toString() || '0',
    },
    stakeWarsI: {
      earningsTestnetToken:
        (
          parseFloat(cleanCell(totalRowColumns[12])) + parseFloat(cleanCell(totalRowColumns[13]))
        ).toString() || '0',
      absoluteAllocation:
        (
          parseFloat(cleanCell(totalRowColumns[44])) + parseFloat(cleanCell(totalRowColumns[45]))
        ).toString() || '0',
    },
    total: {
      earningsTestnetToken:
        // aries
        (
          parseFloat(cleanCell(totalRowColumns[1])) +
          // geminiI
          parseFloat(cleanCell(totalRowColumns[2])) +
          // geminiII
          parseFloat(cleanCell(totalRowColumns[3])) +
          parseFloat(cleanCell(totalRowColumns[4])) +
          // geminiIII
          parseFloat(cleanCell(totalRowColumns[7])) +
          parseFloat(cleanCell(totalRowColumns[8])) +
          parseFloat(cleanCell(totalRowColumns[9])) +
          parseFloat(cleanCell(totalRowColumns[10])) +
          // stakeWarsI
          parseFloat(cleanCell(totalRowColumns[12])) +
          parseFloat(cleanCell(totalRowColumns[13]))
        ).toString() || '0',
      absoluteAllocation: parseFloat(cleanCell(totalRowColumns[47])).toString() || '0',
    },
  }

  return { rewardsData, totals }
}

export const getUserTestnetRewards = async (allRewards: AllRewards[], address: string[]) => {
  const userRewards = allRewards.filter((reward) => address.includes(reward.address))

  const mergedRewards: Rewards = userRewards.reduce(
    (acc, reward) => {
      const newAcc = { ...acc }
      Object.keys(CAMPAIGNS).forEach((key) => {
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
      newAcc.total.absoluteAllocation = (currentTotalAllocation + rewardTotalAllocation).toString()
      return newAcc
    },
    JSON.parse(JSON.stringify(DEFAULT_REWARDS)),
  )

  return mergedRewards
}

export const getUserTestnetRewardsByPhase = (rewards: Rewards, phase: string) => {
  if (rewards[phase as keyof Rewards])
    return numberFormattedString(parseFloat(rewards[phase as keyof Rewards].earningsTestnetToken))
  return '0.00'
}

export const getUserTestnetRewardsPercentageByPhase = (
  rewards: Rewards,
  totalRewards: Rewards,
  phase: string,
) => {
  if (rewards[phase as keyof Rewards]) {
    const totalTokens = parseFloat(totalRewards[phase as keyof Rewards].earningsTestnetToken)
    const userTotalReward = parseFloat(rewards[phase as keyof Rewards].earningsTestnetToken)
    return totalTokens > 0
      ? ((userTotalReward / totalTokens) * 100).toFixed(PERCENTAGE_PRECISION) + '%'
      : '0.000000%'
  }
  return '0.000000%'
}

export const getTotalTestnetByPhase = (totalRewards: Rewards, phase: string) => {
  if (totalRewards[phase as keyof Rewards].earningsTestnetToken)
    return numberFormattedString(
      parseFloat(totalRewards[phase as keyof Rewards].earningsTestnetToken),
    )
  return '0.00'
}

export const getTotalUserTestnetRewardsPercentage = (rewards: Rewards, totalRewards: Rewards) =>
  (
    parseFloat(cleanCell(getUserTestnetRewardsByPhase(rewards, 'total'))) /
    parseFloat(cleanCell(getTotalTestnetByPhase(totalRewards, 'total')))
  ).toFixed(PERCENTAGE_PRECISION) + '%'

export const getTotalMainnetAllocationByPhase = (rewards: Rewards, phase: string) => {
  const reward = rewards[phase as keyof Rewards]
  if (reward === undefined) return 0
  return parseFloat(reward.absoluteAllocation)
}

export const getTotalMainnetPercentageAllocationByPhase = (rewards: Rewards, phase: string) => {
  const reward = rewards[phase as keyof Rewards]
  if (!reward) return '0.000000%'
  const userTotalReward = parseFloat(reward.absoluteAllocation)
  if (!userTotalReward) return '0.000000%'
  const total = userTotalReward / MAINNET_TOTAL_SUPPLY
  return (total * 100).toFixed(PERCENTAGE_PRECISION) + '%'
}

export const getTotalUserMainnetPercentageAllocation = (rewards: Rewards) =>
  Object.values(CAMPAIGNS)
    .reduce((acc, campaign) => {
      const percentage = parseFloat(
        getTotalMainnetPercentageAllocationByPhase(rewards, campaign.name).replace('%', ''),
      )
      return acc + percentage
    }, 0)
    .toFixed(PERCENTAGE_PRECISION) + '%'
