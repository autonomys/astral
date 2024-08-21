import {
  AccountExtrinsicFailedTotalCount,
  AccountExtrinsicSuccessTotalCount,
  AccountExtrinsicTotalCount,
  AccountRemarkCount,
  AccountTransactionFeePaidTotalValue,
  AccountTransferReceiverTotalCount,
  AccountTransferReceiverTotalValue,
  AccountTransferSenderTotalCount,
  AccountTransferSenderTotalValue,
  FarmerBlockTotalCount,
  FarmerBlockTotalValue,
  FarmerVoteAndBlockTotalCount,
  FarmerVoteAndBlockTotalValue,
  FarmerVoteTotalCount,
  FarmerVoteTotalValue,
  NominatorDepositsTotalCount,
  NominatorDepositsTotalValue,
  NominatorWithdrawalsTotalCount,
  OperatorBundleTotalCount,
  OperatorDepositsTotalCount,
  OperatorDepositsTotalValue,
  OperatorTotalRewardsCollected,
  OperatorTotalTaxCollected,
  OperatorWithdrawalsTotalCount,
} from '../model'
import { Cache } from './cache'

export const sort = (cache: Cache): Cache => {
  // AccountTransferSenderTotalCount
  const sortedAccountTransferSenderTotalCount: AccountTransferSenderTotalCount[] = Array.from(
    cache.accountTransferSenderTotalCount.values(),
  ).sort((a, b) => b.value - a.value)

  sortedAccountTransferSenderTotalCount.map((n, key) => {
    n.rank = key + 1
    cache.accountTransferSenderTotalCount.set(n.id, n)
  })

  // AccountTransferSenderTotalValue
  const sortedAccountTransferSenderTotalValue: AccountTransferSenderTotalValue[] = Array.from(
    cache.accountTransferSenderTotalValue.values(),
  ).sort((a, b) => (a.value < b.value ? -1 : a.value > b.value ? 1 : 0))

  sortedAccountTransferSenderTotalValue.map((n, key) => {
    n.rank = key + 1
    cache.accountTransferSenderTotalValue.set(n.id, n)
  })

  // AccountTransferReceiverTotalCount
  const sortedAccountTransferReceiverTotalCount: AccountTransferReceiverTotalCount[] = Array.from(
    cache.accountTransferReceiverTotalCount.values(),
  ).sort((a, b) => b.value - a.value)

  sortedAccountTransferReceiverTotalCount.map((n, key) => {
    n.rank = key + 1
    cache.accountTransferReceiverTotalCount.set(n.id, n)
  })

  // AccountTransferReceiverTotalValue
  const sortedAccountTransferReceiverTotalValue: AccountTransferReceiverTotalValue[] = Array.from(
    cache.accountTransferReceiverTotalValue.values(),
  ).sort((a, b) => (a.value < b.value ? -1 : a.value > b.value ? 1 : 0))

  sortedAccountTransferReceiverTotalValue.map((n, key) => {
    n.rank = key + 1
    cache.accountTransferReceiverTotalValue.set(n.id, n)
  })

  // AccountRemarkCount
  const sortedAccountRemarkCount: AccountRemarkCount[] = Array.from(
    cache.accountRemarkCount.values(),
  ).sort((a, b) => b.value - a.value)

  sortedAccountRemarkCount.map((n, key) => {
    n.rank = key + 1
    cache.accountRemarkCount.set(n.id, n)
  })

  // AccountExtrinsicTotalCount
  const sortedAccountExtrinsicTotalCount: AccountExtrinsicTotalCount[] = Array.from(
    cache.accountExtrinsicTotalCount.values(),
  ).sort((a, b) => b.value - a.value)

  sortedAccountExtrinsicTotalCount.map((n, key) => {
    n.rank = key + 1
    cache.accountExtrinsicTotalCount.set(n.id, n)
  })

  // AccountExtrinsicSuccessTotalCount
  const sortedAccountExtrinsicSuccessTotalCount: AccountExtrinsicSuccessTotalCount[] = Array.from(
    cache.accountExtrinsicSuccessTotalCount.values(),
  ).sort((a, b) => b.value - a.value)

  sortedAccountExtrinsicSuccessTotalCount.map((n, key) => {
    n.rank = key + 1
    cache.accountExtrinsicSuccessTotalCount.set(n.id, n)
  })

  // AccountExtrinsicFailedTotalCount
  const sortedAccountExtrinsicFailedTotalCount: AccountExtrinsicFailedTotalCount[] = Array.from(
    cache.accountExtrinsicFailedTotalCount.values(),
  ).sort((a, b) => b.value - a.value)

  sortedAccountExtrinsicFailedTotalCount.map((n, key) => {
    n.rank = key + 1
    cache.accountExtrinsicFailedTotalCount.set(n.id, n)
  })

  // AccountTransactionFeePaidTotalValue
  const sortedAccountTransactionFeePaidTotalValue: AccountTransactionFeePaidTotalValue[] =
    Array.from(cache.accountTransactionFeePaidTotalValue.values()).sort((a, b) =>
      a.value < b.value ? -1 : a.value > b.value ? 1 : 0,
    )

  sortedAccountTransactionFeePaidTotalValue.map((n, key) => {
    n.rank = key + 1
    cache.accountTransactionFeePaidTotalValue.set(n.id, n)
  })

  // FarmerVoteTotalCount
  const sortedFarmerVoteTotalCount: FarmerVoteTotalCount[] = Array.from(
    cache.farmerVoteTotalCount.values(),
  ).sort((a, b) => b.value - a.value)

  sortedFarmerVoteTotalCount.map((n, key) => {
    n.rank = key + 1
    cache.farmerVoteTotalCount.set(n.id, n)
  })

  // FarmerVoteTotalValue
  const sortedFarmerVoteTotalValue: FarmerVoteTotalValue[] = Array.from(
    cache.farmerVoteTotalValue.values(),
  ).sort((a, b) => (a.value < b.value ? -1 : a.value > b.value ? 1 : 0))

  sortedFarmerVoteTotalValue.map((n, key) => {
    n.rank = key + 1
    cache.farmerVoteTotalValue.set(n.id, n)
  })

  // FarmerBlockTotalCount
  const sortedFarmerBlockTotalCount: FarmerBlockTotalCount[] = Array.from(
    cache.farmerBlockTotalCount.values(),
  ).sort((a, b) => b.value - a.value)

  sortedFarmerBlockTotalCount.map((n, key) => {
    n.rank = key + 1
    cache.farmerBlockTotalCount.set(n.id, n)
  })

  // FarmerBlockTotalValue
  const sortedFarmerBlockTotalValue: FarmerBlockTotalValue[] = Array.from(
    cache.farmerBlockTotalValue.values(),
  ).sort((a, b) => (a.value < b.value ? -1 : a.value > b.value ? 1 : 0))

  sortedFarmerBlockTotalValue.map((n, key) => {
    n.rank = key + 1
    cache.farmerBlockTotalValue.set(n.id, n)
  })

  // FarmerVoteAndBlockTotalCount
  const sortedFarmerVoteAndBlockTotalCount: FarmerVoteAndBlockTotalCount[] = Array.from(
    cache.farmerVoteAndBlockTotalCount.values(),
  ).sort((a, b) => b.value - a.value)

  sortedFarmerVoteAndBlockTotalCount.map((n, key) => {
    n.rank = key + 1
    cache.farmerVoteAndBlockTotalCount.set(n.id, n)
  })

  // FarmerVoteAndBlockTotalValue
  const sortedFarmerVoteAndBlockTotalValue: FarmerVoteAndBlockTotalValue[] = Array.from(
    cache.farmerVoteAndBlockTotalValue.values(),
  ).sort((a, b) => (a.value < b.value ? -1 : a.value > b.value ? 1 : 0))

  sortedFarmerVoteAndBlockTotalValue.map((n, key) => {
    n.rank = key + 1
    cache.farmerVoteAndBlockTotalValue.set(n.id, n)
  })

  // OperatorTotalRewardsCollected
  const sortedOperatorTotalRewardsCollected: OperatorTotalRewardsCollected[] = Array.from(
    cache.operatorTotalRewardsCollected.values(),
  ).sort((a, b) => (a.value < b.value ? -1 : a.value > b.value ? 1 : 0))

  sortedOperatorTotalRewardsCollected.map((n, key) => {
    n.rank = key + 1
    cache.operatorTotalRewardsCollected.set(n.id, n)
  })

  // OperatorTotalTaxCollected
  const sortedOperatorTotalTaxCollected: OperatorTotalTaxCollected[] = Array.from(
    cache.operatorTotalTaxCollected.values(),
  ).sort((a, b) => (a.value < b.value ? -1 : a.value > b.value ? 1 : 0))

  sortedOperatorTotalTaxCollected.map((n, key) => {
    n.rank = key + 1
    cache.operatorTotalTaxCollected.set(n.id, n)
  })

  // OperatorBundleTotalCount
  const sortedOperatorBundleTotalCount: OperatorBundleTotalCount[] = Array.from(
    cache.operatorBundleTotalCount.values(),
  ).sort((a, b) => b.value - a.value)

  sortedOperatorBundleTotalCount.map((n, key) => {
    n.rank = key + 1
    cache.operatorBundleTotalCount.set(n.id, n)
  })

  // OperatorDepositsTotalCount
  const sortedOperatorDepositsTotalCount: OperatorDepositsTotalCount[] = Array.from(
    cache.operatorDepositsTotalCount.values(),
  ).sort((a, b) => b.value - a.value)

  sortedOperatorDepositsTotalCount.map((n, key) => {
    n.rank = key + 1
    cache.operatorDepositsTotalCount.set(n.id, n)
  })

  // OperatorDepositsTotalValue
  const sortedOperatorDepositsTotalValue: OperatorDepositsTotalValue[] = Array.from(
    cache.operatorDepositsTotalValue.values(),
  ).sort((a, b) => (a.value < b.value ? -1 : a.value > b.value ? 1 : 0))

  sortedOperatorDepositsTotalValue.map((n, key) => {
    n.rank = key + 1
    cache.operatorDepositsTotalValue.set(n.id, n)
  })

  // OperatorWithdrawalsTotalCount
  const sortedOperatorWithdrawalsTotalCount: OperatorWithdrawalsTotalCount[] = Array.from(
    cache.operatorWithdrawalsTotalCount.values(),
  ).sort((a, b) => b.value - a.value)

  sortedOperatorWithdrawalsTotalCount.map((n, key) => {
    n.rank = key + 1
    cache.operatorWithdrawalsTotalCount.set(n.id, n)
  })

  // NominatorDepositsTotalCount
  const sortedNominatorDepositsTotalCount: NominatorDepositsTotalCount[] = Array.from(
    cache.nominatorDepositsTotalCount.values(),
  ).sort((a, b) => b.value - a.value)

  sortedNominatorDepositsTotalCount.map((n, key) => {
    n.rank = key + 1
    cache.nominatorDepositsTotalCount.set(n.id, n)
  })

  // NominatorDepositsTotalValue
  const sortedNominatorDepositsTotalValue: NominatorDepositsTotalValue[] = Array.from(
    cache.nominatorDepositsTotalValue.values(),
  ).sort((a, b) => (a.value < b.value ? -1 : a.value > b.value ? 1 : 0))

  sortedNominatorDepositsTotalValue.map((n, key) => {
    n.rank = key + 1
    cache.nominatorDepositsTotalValue.set(n.id, n)
  })

  // NominatorWithdrawalsTotalCount
  const sortedNominatorWithdrawalsTotalCount: NominatorWithdrawalsTotalCount[] = Array.from(
    cache.nominatorWithdrawalsTotalCount.values(),
  ).sort((a, b) => b.value - a.value)

  sortedNominatorWithdrawalsTotalCount.map((n, key) => {
    n.rank = key + 1
    cache.nominatorWithdrawalsTotalCount.set(n.id, n)
  })

  return cache
}
