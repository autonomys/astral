import { Operator } from 'types'

export const getOperatorRewards = (operator: Operator) => {
  return operator.operatorRewards.reduce(
    (acc: BigInt, reward) => acc + BigInt(reward.amount),
    BigInt(0),
  )
}

export const getNominatorRewards = (nominator: [], operators: []) => {
  const nominatorsWithRewards = nominator?.map((nominator) => {
    const operator = operators.find((operator) => operator.id === nominator.operator.id)
    const operatorReward = getOperatorRewards(operator)

    const taxes = (BigInt(operator.nominationTax) * BigInt(operatorReward)) / BigInt(100)
    const nominatorReward =
      nominator.shares !== '0'
        ? (BigInt(nominator.shares) * operatorReward) / BigInt(operator.totalShares)
        : BigInt(0)

    return { ...nominator, nominatorReward, taxes }
  })

  const rewardSumsById = nominatorsWithRewards?.reduce((acc, current) => {
    const id = current.account.id
    if (acc[id]) {
      acc[id].nominatorReward += current.nominatorReward
    } else {
      acc[id] = { ...current }
    }
    return acc
  }, {})

  return rewardSumsById && Object.values(rewardSumsById)
}
