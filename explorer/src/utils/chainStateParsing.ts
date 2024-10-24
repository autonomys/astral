import { parseDeposit, parseWithdrawal } from '@autonomys/auto-consensus'
import type { AnyTuple, Codec, StorageKey } from '@autonomys/auto-utils'
import { Operators } from 'types/consensus'

export const formatOperators = (
  // @ts-expect-error TODO: fix this
  operators: [StorageKey<AnyTuple>, Codec][],
  // @ts-expect-error TODO: fix this
  operatorIdOwner: [StorageKey<AnyTuple>, Codec][],
) =>
  operators.map((operator, key) => {
    const op = operator[1].toJSON() as Omit<Operators, 'id' | 'operatorOwner'>
    return {
      id: (operator[0].toHuman() as string[])[0],
      operatorOwner: operatorIdOwner[key][1].toJSON() as string,
      ...op,
      minimumNominatorStake: BigInt(op.minimumNominatorStake).toString(10),
      currentTotalStake: BigInt(op.currentTotalStake).toString(10),
      currentTotalShares: BigInt(op.currentTotalShares).toString(10),
      totalStorageFeeDeposit: BigInt(op.totalStorageFeeDeposit).toString(10),
      status: JSON.stringify(op.status),
    } as Operators
  })

// @ts-expect-error TODO: fix this
export const formatDeposits = (deposits: [StorageKey<AnyTuple>, Codec][]) =>
  deposits.map((deposit) => parseDeposit(deposit))

// @ts-expect-error TODO: fix this
export const formatWithdrawals = (withdrawals: [StorageKey<AnyTuple>, Codec][]) =>
  withdrawals.map((withdrawal) => parseWithdrawal(withdrawal))
