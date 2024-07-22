import type { StorageKey } from '@polkadot/types'
import type { AnyTuple, Codec } from '@polkadot/types-codec/types'
import { Deposit, Operators, RawDeposit, Withdrawal } from 'types/consensus'

export const formatOperators = (
  operators: [StorageKey<AnyTuple>, Codec][],
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

export const formatDeposits = (deposits: [StorageKey<AnyTuple>, Codec][]) =>
  deposits.map((deposit) => {
    const parsedDeposit = deposit[1].toJSON() as RawDeposit
    return {
      operatorId: parseInt((deposit[0].toHuman() as string[])[0]),
      account: (deposit[0].toHuman() as string[])[1],
      shares: BigInt(parsedDeposit.known.shares).toString(10),
      storageFeeDeposit: parseInt(parsedDeposit.known.storageFeeDeposit.toString(), 16).toString(),
      pending: {
        amount: BigInt(parsedDeposit.pending.amount).toString(10),
        storageFeeDeposit: BigInt(parsedDeposit.pending.storageFeeDeposit).toString(10),
      },
    } as Deposit
  })

export const formatWithdrawals = (withdrawals: [StorageKey<AnyTuple>, Codec][]) =>
  withdrawals.map((withdrawal) => {
    const parsedWithdrawal = withdrawal[1].toJSON() as Omit<Withdrawal, 'operatorId'>
    return {
      operatorId: parseInt((withdrawal[0].toHuman() as string[])[0]),
      totalWithdrawalAmount: parsedWithdrawal.totalWithdrawalAmount,
      withdrawals: parsedWithdrawal.withdrawals,
      withdrawalInShares: {
        domainEpoch: parsedWithdrawal.withdrawalInShares.domainEpoch,
        unlockAtConfirmedDomainBlockNumber:
          parsedWithdrawal.withdrawalInShares.unlockAtConfirmedDomainBlockNumber,
        shares: BigInt(parsedWithdrawal.withdrawalInShares.shares).toString(10),
        storageFeeRefund: BigInt(parsedWithdrawal.withdrawalInShares.storageFeeRefund).toString(10),
      },
    } as Withdrawal
  })
