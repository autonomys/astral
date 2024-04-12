import { NominatorsConnectionQuery, OperatorsConnectionRewardsQuery } from 'gql/graphql'
import { GetAllNominatorsQuery } from 'gql/rewardTypes'

type Operator = GetAllNominatorsQuery['operatorsConnection']['edges'][0]['node']

export const getOperatorRewards = (operator: Operator) => {
  return operator.operatorRewards.reduce(
    (acc: bigint, reward) => acc + BigInt(reward.amount),
    BigInt(0),
  )
}

type Nominator = GetAllNominatorsQuery['nominatorsConnection']['edges'][0]['node']
type RewardSums = {
  [key: string]: NominatorWithRewards
}

type NominatorWithRewards = Nominator & { nominatorReward: bigint }

export const getNominatorRewards = (
  nominators: Nominator[] | undefined,
  operators: Operator[] | undefined,
): NominatorWithRewards[] => {
  if (!nominators) return []
  const nominatorsWithRewards = nominators.map((nominator) => {
    const operator = operators?.find((operator) => operator.id === nominator.operator.id)

    if (!operator) return { ...nominator, nominatorReward: BigInt(0), taxes: BigInt(0) }

    const operatorReward = getOperatorRewards(operator)

    const taxes = (BigInt(operator.nominationTax || 0) * BigInt(operatorReward)) / BigInt(100)
    const nominatorReward =
      nominator.shares !== '0'
        ? (BigInt(nominator.shares) * operatorReward) / BigInt(operator.totalShares)
        : BigInt(0)

    return { ...nominator, nominatorReward, taxes }
  })

  const rewardSumsById = nominatorsWithRewards.reduce((acc: RewardSums, current) => {
    const id = current.account.id
    if (acc[id]) {
      acc[id].nominatorReward += current.nominatorReward
    } else {
      acc[id] = { ...current }
    }
    return acc
  }, {})

  return Object.values(rewardSumsById)
}
