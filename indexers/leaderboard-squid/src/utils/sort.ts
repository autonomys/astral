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
} from "../model";
import { Cache } from "./cache";

export const sort = (cache: Cache): Cache => {
  // AccountTransferSenderTotalCount
  const accountTransferSenderTotalCount = new Map();
  const sortedAccountTransferSenderTotalCount: AccountTransferSenderTotalCount[] =
    Array.from(cache.accountTransferSenderTotalCount.values()).sort(
      (a, b) => b.value - a.value
    );

  sortedAccountTransferSenderTotalCount.map((n, key) => {
    const sortId = key + 1;
    const id = sortId.toString();
    accountTransferSenderTotalCount.set(
      id,
      new AccountTransferSenderTotalCount({
        ...n,
        id,
        sortId,
      })
    );
  });

  cache.accountTransferSenderTotalCount = accountTransferSenderTotalCount;

  // AccountTransferSenderTotalValue
  const accountTransferSenderTotalValue = new Map();
  const sortedAccountTransferSenderTotalValue: AccountTransferSenderTotalValue[] =
    Array.from(cache.accountTransferSenderTotalValue.values()).sort((a, b) =>
      a.value < b.value ? -1 : a.value > b.value ? 1 : 0
    );

  sortedAccountTransferSenderTotalValue.map((n, key) => {
    const sortId = key + 1;
    const id = sortId.toString();
    accountTransferSenderTotalValue.set(
      id,
      new AccountTransferSenderTotalValue({
        ...n,
        id,
        sortId,
      })
    );
  });

  cache.accountTransferSenderTotalValue = accountTransferSenderTotalValue;

  // AccountTransferReceiverTotalCount
  const accountTransferReceiverTotalCount = new Map();
  const sortedAccountTransferReceiverTotalCount: AccountTransferReceiverTotalCount[] =
    Array.from(cache.accountTransferReceiverTotalCount.values()).sort(
      (a, b) => b.value - a.value
    );

  sortedAccountTransferReceiverTotalCount.map((n, key) => {
    const sortId = key + 1;
    const id = sortId.toString();
    accountTransferReceiverTotalCount.set(
      id,
      new AccountTransferReceiverTotalCount({
        ...n,
        id,
        sortId,
      })
    );
  });

  cache.accountTransferReceiverTotalCount = accountTransferReceiverTotalCount;

  // AccountTransferReceiverTotalValue
  const accountTransferReceiverTotalValue = new Map();
  const sortedAccountTransferReceiverTotalValue: AccountTransferReceiverTotalValue[] =
    Array.from(cache.accountTransferReceiverTotalValue.values()).sort((a, b) =>
      a.value < b.value ? -1 : a.value > b.value ? 1 : 0
    );

  sortedAccountTransferReceiverTotalValue.map((n, key) => {
    const sortId = key + 1;
    const id = sortId.toString();
    accountTransferReceiverTotalValue.set(
      id,
      new AccountTransferReceiverTotalValue({
        ...n,
        id,
        sortId,
      })
    );
  });

  cache.accountTransferReceiverTotalValue = accountTransferReceiverTotalValue;

  // AccountRemarkCount
  const accountRemarkCount = new Map();
  const sortedAccountRemarkCount: AccountRemarkCount[] = Array.from(
    cache.accountRemarkCount.values()
  ).sort((a, b) => b.value - a.value);

  sortedAccountRemarkCount.map((n, key) => {
    const sortId = key + 1;
    const id = sortId.toString();
    accountRemarkCount.set(
      id,
      new AccountRemarkCount({
        ...n,
        id,
        sortId,
      })
    );
  });

  cache.accountRemarkCount = accountRemarkCount;

  // AccountExtrinsicTotalCount
  const accountExtrinsicTotalCount = new Map();
  const sortedAccountExtrinsicTotalCount: AccountExtrinsicTotalCount[] =
    Array.from(cache.accountExtrinsicTotalCount.values()).sort(
      (a, b) => b.value - a.value
    );

  sortedAccountExtrinsicTotalCount.map((n, key) => {
    const sortId = key + 1;
    const id = sortId.toString();
    accountExtrinsicTotalCount.set(
      id,
      new AccountExtrinsicTotalCount({
        ...n,
        id,
        sortId,
      })
    );
  });

  cache.accountExtrinsicTotalCount = accountExtrinsicTotalCount;

  // AccountExtrinsicSuccessTotalCount
  const accountExtrinsicSuccessTotalCount = new Map();
  const sortedAccountExtrinsicSuccessTotalCount: AccountExtrinsicSuccessTotalCount[] =
    Array.from(cache.accountExtrinsicSuccessTotalCount.values()).sort(
      (a, b) => b.value - a.value
    );

  sortedAccountExtrinsicSuccessTotalCount.map((n, key) => {
    const sortId = key + 1;
    const id = sortId.toString();
    accountExtrinsicSuccessTotalCount.set(
      id,
      new AccountExtrinsicSuccessTotalCount({
        ...n,
        id,
        sortId,
      })
    );
  });

  cache.accountExtrinsicSuccessTotalCount = accountExtrinsicSuccessTotalCount;

  // AccountExtrinsicFailedTotalCount
  const accountExtrinsicFailedTotalCount = new Map();
  const sortedAccountExtrinsicFailedTotalCount: AccountExtrinsicFailedTotalCount[] =
    Array.from(cache.accountExtrinsicFailedTotalCount.values()).sort(
      (a, b) => b.value - a.value
    );

  sortedAccountExtrinsicFailedTotalCount.map((n, key) => {
    const sortId = key + 1;
    const id = sortId.toString();
    accountExtrinsicFailedTotalCount.set(
      id,
      new AccountExtrinsicFailedTotalCount({
        ...n,
        id,
        sortId,
      })
    );
  });

  cache.accountExtrinsicFailedTotalCount = accountExtrinsicFailedTotalCount;

  // AccountTransactionFeePaidTotalValue
  const accountTransactionFeePaidTotalValue = new Map();
  const sortedAccountTransactionFeePaidTotalValue: AccountTransactionFeePaidTotalValue[] =
    Array.from(cache.accountTransactionFeePaidTotalValue.values()).sort(
      (a, b) => (a.value < b.value ? -1 : a.value > b.value ? 1 : 0)
    );

  sortedAccountTransactionFeePaidTotalValue.map((n, key) => {
    const sortId = key + 1;
    const id = sortId.toString();
    accountTransactionFeePaidTotalValue.set(
      id,
      new AccountTransactionFeePaidTotalValue({
        ...n,
        id,
        sortId,
      })
    );
  });

  cache.accountTransactionFeePaidTotalValue =
    accountTransactionFeePaidTotalValue;

  // FarmerVoteTotalCount
  const farmerVoteTotalCount = new Map();
  const sortedFarmerVoteTotalCount: FarmerVoteTotalCount[] = Array.from(
    cache.farmerVoteTotalCount.values()
  ).sort((a, b) => b.value - a.value);

  sortedFarmerVoteTotalCount.map((n, key) => {
    const sortId = key + 1;
    const id = sortId.toString();
    farmerVoteTotalCount.set(
      id,
      new FarmerVoteTotalCount({
        ...n,
        id,
        sortId,
      })
    );
  });

  cache.farmerVoteTotalCount = farmerVoteTotalCount;

  // FarmerVoteTotalValue
  const farmerVoteTotalValue = new Map();
  const sortedFarmerVoteTotalValue: FarmerVoteTotalValue[] = Array.from(
    cache.farmerVoteTotalValue.values()
  ).sort((a, b) => (a.value < b.value ? -1 : a.value > b.value ? 1 : 0));

  sortedFarmerVoteTotalValue.map((n, key) => {
    const sortId = key + 1;
    const id = sortId.toString();
    farmerVoteTotalValue.set(
      id,
      new FarmerVoteTotalValue({
        ...n,
        id,
        sortId,
      })
    );
  });

  cache.farmerVoteTotalValue = farmerVoteTotalValue;

  // FarmerBlockTotalCount
  const farmerBlockTotalCount = new Map();
  const sortedFarmerBlockTotalCount: FarmerBlockTotalCount[] = Array.from(
    cache.farmerBlockTotalCount.values()
  ).sort((a, b) => b.value - a.value);

  sortedFarmerBlockTotalCount.map((n, key) => {
    const sortId = key + 1;
    const id = sortId.toString();
    farmerBlockTotalCount.set(
      id,
      new FarmerBlockTotalCount({
        ...n,
        id,
        sortId,
      })
    );
  });

  cache.farmerBlockTotalCount = farmerBlockTotalCount;

  // FarmerBlockTotalValue
  const farmerBlockTotalValue = new Map();
  const sortedFarmerBlockTotalValue: FarmerBlockTotalValue[] = Array.from(
    cache.farmerBlockTotalValue.values()
  ).sort((a, b) => (a.value < b.value ? -1 : a.value > b.value ? 1 : 0));

  sortedFarmerBlockTotalValue.map((n, key) => {
    const sortId = key + 1;
    const id = sortId.toString();
    farmerBlockTotalValue.set(
      id,
      new FarmerBlockTotalValue({
        ...n,
        id,
        sortId,
      })
    );
  });

  cache.farmerBlockTotalValue = farmerBlockTotalValue;

  // FarmerVoteAndBlockTotalCount
  const farmerVoteAndBlockTotalCount = new Map();
  const sortedFarmerVoteAndBlockTotalCount: FarmerVoteAndBlockTotalCount[] =
    Array.from(cache.farmerVoteAndBlockTotalCount.values()).sort(
      (a, b) => b.value - a.value
    );

  sortedFarmerVoteAndBlockTotalCount.map((n, key) => {
    const sortId = key + 1;
    const id = sortId.toString();
    farmerVoteAndBlockTotalCount.set(
      id,
      new FarmerVoteAndBlockTotalCount({
        ...n,
        id,
        sortId,
      })
    );
  });

  cache.farmerVoteAndBlockTotalCount = farmerVoteAndBlockTotalCount;

  // FarmerVoteAndBlockTotalValue
  const farmerVoteAndBlockTotalValue = new Map();
  const sortedFarmerVoteAndBlockTotalValue: FarmerVoteAndBlockTotalValue[] =
    Array.from(cache.farmerVoteAndBlockTotalValue.values()).sort((a, b) =>
      a.value < b.value ? -1 : a.value > b.value ? 1 : 0
    );

  sortedFarmerVoteAndBlockTotalValue.map((n, key) => {
    const sortId = key + 1;
    const id = sortId.toString();
    farmerVoteAndBlockTotalValue.set(
      id,
      new FarmerVoteAndBlockTotalValue({
        ...n,
        id,
        sortId,
      })
    );
  });

  cache.farmerVoteAndBlockTotalValue = farmerVoteAndBlockTotalValue;

  // OperatorTotalRewardsCollected
  const operatorTotalRewardsCollected = new Map();
  const sortedOperatorTotalRewardsCollected: OperatorTotalRewardsCollected[] =
    Array.from(cache.operatorTotalRewardsCollected.values()).sort((a, b) =>
      a.value < b.value ? -1 : a.value > b.value ? 1 : 0
    );

  sortedOperatorTotalRewardsCollected.map((n, key) => {
    const sortId = key + 1;
    const id = sortId.toString();
    operatorTotalRewardsCollected.set(
      id,
      new OperatorTotalRewardsCollected({
        ...n,
        id,
        sortId,
      })
    );
  });

  cache.operatorTotalRewardsCollected = operatorTotalRewardsCollected;

  // OperatorTotalTaxCollected
  const operatorTotalTaxCollected = new Map();
  const sortedOperatorTotalTaxCollected: OperatorTotalTaxCollected[] =
    Array.from(cache.operatorTotalTaxCollected.values()).sort((a, b) =>
      a.value < b.value ? -1 : a.value > b.value ? 1 : 0
    );

  sortedOperatorTotalTaxCollected.map((n, key) => {
    const sortId = key + 1;
    const id = sortId.toString();
    operatorTotalTaxCollected.set(
      id,
      new OperatorTotalTaxCollected({
        ...n,
        id,
        sortId,
      })
    );
  });

  cache.operatorTotalTaxCollected = operatorTotalTaxCollected;

  // OperatorBundleTotalCount
  const operatorBundleTotalCount = new Map();
  const sortedOperatorBundleTotalCount: OperatorBundleTotalCount[] = Array.from(
    cache.operatorBundleTotalCount.values()
  ).sort((a, b) => b.value - a.value);

  sortedOperatorBundleTotalCount.map((n, key) => {
    const sortId = key + 1;
    const id = sortId.toString();
    operatorBundleTotalCount.set(
      id,
      new OperatorBundleTotalCount({
        ...n,
        id,
        sortId,
      })
    );
  });

  cache.operatorBundleTotalCount = operatorBundleTotalCount;

  // OperatorDepositsTotalCount
  const operatorDepositsTotalCount = new Map();
  const sortedOperatorDepositsTotalCount: OperatorDepositsTotalCount[] =
    Array.from(cache.operatorDepositsTotalCount.values()).sort(
      (a, b) => b.value - a.value
    );

  sortedOperatorDepositsTotalCount.map((n, key) => {
    const sortId = key + 1;
    const id = sortId.toString();
    operatorDepositsTotalCount.set(
      id,
      new OperatorDepositsTotalCount({
        ...n,
        id,
        sortId,
      })
    );
  });

  cache.operatorDepositsTotalCount = operatorDepositsTotalCount;

  // OperatorDepositsTotalValue
  const operatorDepositsTotalValue = new Map();
  const sortedOperatorDepositsTotalValue: OperatorDepositsTotalValue[] =
    Array.from(cache.operatorDepositsTotalValue.values()).sort((a, b) =>
      a.value < b.value ? -1 : a.value > b.value ? 1 : 0
    );

  sortedOperatorDepositsTotalValue.map((n, key) => {
    const sortId = key + 1;
    const id = sortId.toString();
    operatorDepositsTotalValue.set(
      id,
      new OperatorDepositsTotalValue({
        ...n,
        id,
        sortId,
      })
    );
  });

  cache.operatorDepositsTotalValue = operatorDepositsTotalValue;

  // OperatorWithdrawalsTotalCount
  const operatorWithdrawalsTotalCount = new Map();
  const sortedOperatorWithdrawalsTotalCount: OperatorWithdrawalsTotalCount[] =
    Array.from(cache.operatorWithdrawalsTotalCount.values()).sort(
      (a, b) => b.value - a.value
    );

  sortedOperatorWithdrawalsTotalCount.map((n, key) => {
    const sortId = key + 1;
    const id = sortId.toString();
    operatorWithdrawalsTotalCount.set(
      id,
      new OperatorWithdrawalsTotalCount({
        ...n,
        id,
        sortId,
      })
    );
  });

  cache.operatorWithdrawalsTotalCount = operatorWithdrawalsTotalCount;

  // NominatorDepositsTotalCount
  const nominatorDepositsTotalCount = new Map();
  const sortedNominatorDepositsTotalCount: NominatorDepositsTotalCount[] =
    Array.from(cache.nominatorDepositsTotalCount.values()).sort(
      (a, b) => b.value - a.value
    );

  sortedNominatorDepositsTotalCount.map((n, key) => {
    const sortId = key + 1;
    const id = sortId.toString();
    nominatorDepositsTotalCount.set(
      id,
      new NominatorDepositsTotalCount({
        ...n,
        id,
        sortId,
      })
    );
  });

  cache.nominatorDepositsTotalCount = nominatorDepositsTotalCount;

  // NominatorDepositsTotalValue
  const nominatorDepositsTotalValue = new Map();
  const sortedNominatorDepositsTotalValue: NominatorDepositsTotalValue[] =
    Array.from(cache.nominatorDepositsTotalValue.values()).sort((a, b) =>
      a.value < b.value ? -1 : a.value > b.value ? 1 : 0
    );

  sortedNominatorDepositsTotalValue.map((n, key) => {
    const sortId = key + 1;
    const id = sortId.toString();
    nominatorDepositsTotalValue.set(
      id,
      new NominatorDepositsTotalValue({
        ...n,
        id,
        sortId,
      })
    );
  });

  cache.nominatorDepositsTotalValue = nominatorDepositsTotalValue;

  // NominatorWithdrawalsTotalCount
  const nominatorWithdrawalsTotalCount = new Map();
  const sortedNominatorWithdrawalsTotalCount: NominatorWithdrawalsTotalCount[] =
    Array.from(cache.nominatorWithdrawalsTotalCount.values()).sort(
      (a, b) => b.value - a.value
    );

  sortedNominatorWithdrawalsTotalCount.map((n, key) => {
    const sortId = key + 1;
    const id = sortId.toString();
    nominatorWithdrawalsTotalCount.set(
      id,
      new NominatorWithdrawalsTotalCount({
        ...n,
        id,
        sortId,
      })
    );
  });

  cache.nominatorWithdrawalsTotalCount = nominatorWithdrawalsTotalCount;

  return cache;
};
