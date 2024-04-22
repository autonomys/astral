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

export type NominatorWithRewards = Nominator & {
  nominatorReward: bigint
  operatorReward: bigint
  taxes: bigint
  operators: string[]
}

export const getNominatorRewards = (
  nominators: Nominator[] | undefined,
  operators: Operator[] | undefined,
): NominatorWithRewards[] => {
  if (!nominators) return []

  const nominatorsWithRewards = nominators.map((nominator) => {
    const operator = operators?.find((operator) => {
      return operator.id === nominator.operator.id
    })
    if (!operator)
      return {
        ...nominator,
        nominatorReward: BigInt(0),
        taxes: BigInt(0),
        operatorReward: BigInt(0),
        operators: [],
      }

    const operatorReward = getOperatorRewards(operator)

    const taxes = (BigInt(operator.nominationTax || 0) * BigInt(operatorReward)) / BigInt(100)
    const nominatorReward =
      nominator.shares !== '0'
        ? (BigInt(nominator.shares) * operatorReward) / BigInt(operator.totalShares)
        : BigInt(0)

    return {
      ...nominator,
      nominatorReward,
      taxes,
      operatorReward: operatorReward,
      operators: [operator.id],
    }
  })

  const rewardSumsById = nominatorsWithRewards.reduce((acc: RewardSums, current) => {
    const id = current.account.id
    if (acc[id]) {
      acc[id].nominatorReward += current.nominatorReward
      acc[id].taxes += current.taxes
      acc[id].operatorReward += current.operatorReward
      acc[id].operators.push(current.operator.id)
    } else {
      acc[id] = { ...current }
    }
    return acc
  }, {})

  return Object.values(rewardSumsById)
}
