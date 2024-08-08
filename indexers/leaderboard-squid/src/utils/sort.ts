import {
  AccountExtrinsicFailedTotalCount,
  AccountExtrinsicSuccessTotalCount,
  AccountExtrinsicTotalCount,
  AccountTransactionFeePaidTotalValue,
} from "../model";
import { Cache } from "./cache";

export const sort = (cache: Cache): Cache => {
  // Sorting functions for new models
  const sortedAccountExtrinsicTotalCount: AccountExtrinsicTotalCount[] =
    Array.from(cache.accountExtrinsicTotalCount.values())
      .sort((a, b) => b.value - a.value)
      .map(
        (n, sortId) =>
          new AccountExtrinsicTotalCount({
            ...n,
            id: sortId.toString(),
            sortId,
          })
      );

  const sortedAccountExtrinsicSuccessTotalCount: AccountExtrinsicSuccessTotalCount[] =
    Array.from(cache.accountExtrinsicSuccessTotalCount.values())
      .sort((a, b) => b.value - a.value)
      .map(
        (n, sortId) =>
          new AccountExtrinsicSuccessTotalCount({
            ...n,
            id: sortId.toString(),
            sortId,
          })
      );

  const sortedAccountExtrinsicFailedTotalCount: AccountExtrinsicFailedTotalCount[] =
    Array.from(cache.accountExtrinsicFailedTotalCount.values())
      .sort((a, b) => b.value - a.value)
      .map(
        (n, sortId) =>
          new AccountExtrinsicFailedTotalCount({
            ...n,
            id: sortId.toString(),
            sortId,
          })
      );

  const sortedAccountTransactionFeePaidTotalValue: AccountTransactionFeePaidTotalValue[] =
    Array.from(cache.accountTransactionFeePaidTotalValue.values())
      .sort((a, b) => (a.value < b.value ? -1 : a.value > b.value ? 1 : 0))
      .map(
        (n, sortId) =>
          new AccountTransactionFeePaidTotalValue({
            ...n,
            id: sortId.toString(),
            sortId,
          })
      );

  // Add new sorted entries to the cache map
  return {
    ...cache,
    farmerVoteTotalCount: new Map(
      Array.from(cache.farmerVoteTotalCount.values())
        .sort((a, b) => b.value - a.value)
        .map((n, sortId) => ({
          ...n,
          id: sortId.toString(),
          sortId,
        }))
        .map((n) => [n.id, n])
    ),
    farmerVoteTotalValue: new Map(
      Array.from(cache.farmerVoteTotalValue.values())
        .sort((a, b) => (a.value < b.value ? -1 : 1))
        .map((n, sortId) => ({
          ...n,
          id: sortId.toString(),
          sortId,
        }))
        .map((n) => [n.id, n])
    ),
    farmerBlockTotalCount: new Map(
      Array.from(cache.farmerBlockTotalCount.values())
        .sort((a, b) => b.value - a.value)
        .map((n, sortId) => ({
          ...n,
          id: sortId.toString(),
          sortId,
        }))
        .map((n) => [n.id, n])
    ),
    farmerBlockTotalValue: new Map(
      Array.from(cache.farmerBlockTotalValue.values())
        .sort((a, b) => (a.value < b.value ? -1 : 1))
        .map((n, sortId) => ({
          ...n,
          id: sortId.toString(),
          sortId,
        }))
        .map((n) => [n.id, n])
    ),
    farmerVoteAndBlockTotalCount: new Map(
      Array.from(cache.farmerVoteAndBlockTotalCount.values())
        .sort((a, b) => b.value - a.value)
        .map((n, sortId) => ({
          ...n,
          id: sortId.toString(),
          sortId,
        }))
        .map((n) => [n.id, n])
    ),
    farmerVoteAndBlockTotalValue: new Map(
      Array.from(cache.farmerVoteAndBlockTotalValue.values())
        .sort((a, b) => (a.value < b.value ? -1 : 1))
        .map((n, sortId) => ({
          ...n,
          id: sortId.toString(),
          sortId,
        }))
        .map((n) => [n.id, n])
    ),
    operatorTotalRewardsCollected: new Map(
      Array.from(cache.operatorTotalRewardsCollected.values())
        .sort((a, b) => (a.value < b.value ? -1 : 1))
        .map((n, sortId) => ({
          ...n,
          id: sortId.toString(),
          sortId,
        }))
        .map((n) => [n.id, n])
    ),
    operatorTotalTaxCollected: new Map(
      Array.from(cache.operatorTotalTaxCollected.values())
        .sort((a, b) => (a.value < b.value ? -1 : 1))
        .map((n, sortId) => ({
          ...n,
          id: sortId.toString(),
          sortId,
        }))
        .map((n) => [n.id, n])
    ),
    operatorBundleTotalCount: new Map(
      Array.from(cache.operatorBundleTotalCount.values())
        .sort((a, b) => b.value - a.value)
        .map((n, sortId) => ({
          ...n,
          id: sortId.toString(),
          sortId,
        }))
        .map((n) => [n.id, n])
    ),
    operatorDepositsTotalCount: new Map(
      Array.from(cache.operatorDepositsTotalCount.values())
        .sort((a, b) => b.value - a.value)
        .map((n, sortId) => ({
          ...n,
          id: sortId.toString(),
          sortId,
        }))
        .map((n) => [n.id, n])
    ),
    operatorDepositsTotalValue: new Map(
      Array.from(cache.operatorDepositsTotalValue.values())
        .sort((a, b) => (a.value < b.value ? -1 : 1))
        .map((n, sortId) => ({
          ...n,
          id: sortId.toString(),
          sortId,
        }))
        .map((n) => [n.id, n])
    ),
    operatorWithdrawalsTotalCount: new Map(
      Array.from(cache.operatorWithdrawalsTotalCount.values())
        .sort((a, b) => b.value - a.value)
        .map((n, sortId) => ({
          ...n,
          id: sortId.toString(),
          sortId,
        }))
        .map((n) => [n.id, n])
    ),
    nominatorDepositsTotalCount: new Map(
      Array.from(cache.nominatorDepositsTotalCount.values())
        .sort((a, b) => b.value - a.value)
        .map((n, sortId) => ({
          ...n,
          id: sortId.toString(),
          sortId,
        }))
        .map((n) => [n.id, n])
    ),
    nominatorDepositsTotalValue: new Map(
      Array.from(cache.nominatorDepositsTotalValue.values())
        .sort((a, b) => (a.value < b.value ? -1 : 1))
        .map((n, sortId) => ({
          ...n,
          id: sortId.toString(),
          sortId,
        }))
        .map((n) => [n.id, n])
    ),
    nominatorWithdrawalsTotalCount: new Map(
      Array.from(cache.nominatorWithdrawalsTotalCount.values())
        .sort((a, b) => b.value - a.value)
        .map((n, sortId) => ({
          ...n,
          id: sortId.toString(),
          sortId,
        }))
        .map((n) => [n.id, n])
    ),
    accountTransferSenderTotalCount: new Map(
      Array.from(cache.accountTransferSenderTotalCount.values())
        .sort((a, b) => b.value - a.value)
        .map((n, sortId) => ({
          ...n,
          id: sortId.toString(),
          sortId,
        }))
        .map((n) => [n.id, n])
    ),
    accountTransferSenderTotalValue: new Map(
      Array.from(cache.accountTransferSenderTotalValue.values())
        .sort((a, b) => (a.value < b.value ? -1 : 1))
        .map((n, sortId) => ({
          ...n,
          id: sortId.toString(),
          sortId,
        }))
        .map((n) => [n.id, n])
    ),
    accountTransferReceiverTotalCount: new Map(
      Array.from(cache.accountTransferReceiverTotalCount.values())
        .sort((a, b) => b.value - a.value)
        .map((n, sortId) => ({
          ...n,
          id: sortId.toString(),
          sortId,
        }))
        .map((n) => [n.id, n])
    ),
    accountTransferReceiverTotalValue: new Map(
      Array.from(cache.accountTransferReceiverTotalValue.values())
        .sort((a, b) => (a.value < b.value ? -1 : 1))
        .map((n, sortId) => ({
          ...n,
          id: sortId.toString(),
          sortId,
        }))
        .map((n) => [n.id, n])
    ),
    accountRemarkCount: new Map(
      Array.from(cache.accountRemarkCount.values())
        .sort((a, b) => b.value - a.value)
        .map((n, sortId) => ({
          ...n,
          id: sortId.toString(),
          sortId,
        }))
        .map((n) => [n.id, n])
    ),
    accountExtrinsicTotalCount: new Map(
      sortedAccountExtrinsicTotalCount.map((n) => [n.id, n])
    ),
    accountExtrinsicSuccessTotalCount: new Map(
      sortedAccountExtrinsicSuccessTotalCount.map((n) => [n.id, n])
    ),
    accountExtrinsicFailedTotalCount: new Map(
      sortedAccountExtrinsicFailedTotalCount.map((n) => [n.id, n])
    ),
    accountTransactionFeePaidTotalValue: new Map(
      sortedAccountTransactionFeePaidTotalValue.map((n) => [n.id, n])
    ),
  };
};
