import {
  AccountExtrinsicFailedTotalCountHistory,
  AccountExtrinsicSuccessTotalCountHistory,
  AccountExtrinsicTotalCountHistory,
  AccountRemarkCountHistory,
  AccountTransactionFeePaidTotalValueHistory,
  AccountTransferReceiverTotalCountHistory,
  AccountTransferReceiverTotalValueHistory,
  AccountTransferSenderTotalCountHistory,
  AccountTransferSenderTotalValueHistory,
  FarmerBlockTotalCountHistory,
  FarmerBlockTotalValueHistory,
  FarmerVoteAndBlockTotalCountHistory,
  FarmerVoteAndBlockTotalValueHistory,
  FarmerVoteTotalCountHistory,
  FarmerVoteTotalValueHistory,
  NominatorDepositsTotalCountHistory,
  NominatorDepositsTotalValueHistory,
  NominatorWithdrawalsTotalCountHistory,
  OperatorBundleTotalCountHistory,
  OperatorDepositsTotalCountHistory,
  OperatorDepositsTotalValueHistory,
  OperatorTotalRewardsCollectedHistory,
  OperatorTotalTaxCollectedHistory,
  OperatorWithdrawalsTotalCountHistory,
} from "../types";

export async function checkAndGetAccountTransferSenderTotalCount(
  id: string,
  value: bigint,
  blockNumber: number,
  lastContributionAt: Date = new Date()
): Promise<AccountTransferSenderTotalCountHistory> {
  const account = AccountTransferSenderTotalCountHistory.create({
    id,
    rank: 0,
    value,
    lastContributionAt,
    createdAt: blockNumber,
    updatedAt: blockNumber,
  });
  await account.save();
  return account;
}

export async function checkAndGetAccountTransferSenderTotalValue(
  id: string,
  value: bigint,
  blockNumber: number,
  lastContributionAt: Date = new Date()
): Promise<AccountTransferSenderTotalValueHistory> {
  const account = AccountTransferSenderTotalValueHistory.create({
    id,
    rank: 0,
    value,
    lastContributionAt,
    createdAt: blockNumber,
    updatedAt: blockNumber,
  });
  await account.save();
  return account;
}

export async function checkAndGetAccountTransferReceiverTotalCount(
  id: string,
  value: bigint,
  blockNumber: number,
  lastContributionAt: Date = new Date()
): Promise<AccountTransferReceiverTotalCountHistory> {
  const account = AccountTransferReceiverTotalCountHistory.create({
    id,
    rank: 0,
    value,
    lastContributionAt,
    createdAt: blockNumber,
    updatedAt: blockNumber,
  });
  await account.save();
  return account;
}

export async function checkAndGetAccountTransferReceiverTotalValue(
  id: string,
  value: bigint,
  blockNumber: number,
  lastContributionAt: Date = new Date()
): Promise<AccountTransferReceiverTotalValueHistory> {
  const account = AccountTransferReceiverTotalValueHistory.create({
    id,
    rank: 0,
    value,
    lastContributionAt,
    createdAt: blockNumber,
    updatedAt: blockNumber,
  });
  await account.save();
  return account;
}

export async function checkAndGetAccountRemarkCount(
  id: string,
  value: bigint,
  blockNumber: number,
  lastContributionAt: Date = new Date()
): Promise<AccountRemarkCountHistory> {
  const account = AccountRemarkCountHistory.create({
    id,
    rank: 0,
    value,
    lastContributionAt,
    createdAt: blockNumber,
    updatedAt: blockNumber,
  });
  await account.save();
  return account;
}

export async function checkAndGetAccountExtrinsicTotalCount(
  id: string,
  value: bigint,
  blockNumber: number,
  lastContributionAt: Date = new Date()
): Promise<AccountExtrinsicTotalCountHistory> {
  const account = AccountExtrinsicTotalCountHistory.create({
    id,
    rank: 0,
    value,
    lastContributionAt,
    createdAt: blockNumber,
    updatedAt: blockNumber,
  });
  await account.save();
  return account;
}

export async function checkAndGetAccountExtrinsicSuccessTotalCount(
  id: string,
  value: bigint,
  blockNumber: number,
  lastContributionAt: Date = new Date()
): Promise<AccountExtrinsicSuccessTotalCountHistory> {
  const account = AccountExtrinsicSuccessTotalCountHistory.create({
    id,
    rank: 0,
    value,
    lastContributionAt,
    createdAt: blockNumber,
    updatedAt: blockNumber,
  });
  await account.save();
  return account;
}

export async function checkAndGetAccountExtrinsicFailedTotalCount(
  id: string,
  value: bigint,
  blockNumber: number,
  lastContributionAt: Date = new Date()
): Promise<AccountExtrinsicFailedTotalCountHistory> {
  const account = AccountExtrinsicFailedTotalCountHistory.create({
    id,
    rank: 0,
    value,
    lastContributionAt,
    createdAt: blockNumber,
    updatedAt: blockNumber,
  });
  await account.save();
  return account;
}

export async function checkAndGetAccountTransactionFeePaidTotalValue(
  id: string,
  value: bigint,
  blockNumber: number,
  lastContributionAt: Date = new Date()
): Promise<AccountTransactionFeePaidTotalValueHistory> {
  const account = AccountTransactionFeePaidTotalValueHistory.create({
    id,
    rank: 0,
    value,
    lastContributionAt,
    createdAt: blockNumber,
    updatedAt: blockNumber,
  });
  await account.save();
  return account;
}

// Farmer entities
export async function checkAndGetFarmerVoteTotalCount(
  id: string,
  value: bigint,
  blockNumber: number,
  lastContributionAt: Date = new Date()
): Promise<FarmerVoteTotalCountHistory> {
  const account = FarmerVoteTotalCountHistory.create({
    id,
    rank: 0,
    value,
    lastContributionAt,
    createdAt: blockNumber,
    updatedAt: blockNumber,
  });
  await account.save();
  return account;
}

export async function checkAndGetFarmerVoteTotalValue(
  id: string,
  value: bigint,
  blockNumber: number,
  lastContributionAt: Date = new Date()
): Promise<FarmerVoteTotalValueHistory> {
  const account = FarmerVoteTotalValueHistory.create({
    id,
    rank: 0,
    value,
    lastContributionAt,
    createdAt: blockNumber,
    updatedAt: blockNumber,
  });
  await account.save();
  return account;
}

export async function checkAndGetFarmerBlockTotalCount(
  id: string,
  value: bigint,
  blockNumber: number,
  lastContributionAt: Date = new Date()
): Promise<FarmerBlockTotalCountHistory> {
  const account = FarmerBlockTotalCountHistory.create({
    id,
    rank: 0,
    value,
    lastContributionAt,
    createdAt: blockNumber,
    updatedAt: blockNumber,
  });
  await account.save();
  return account;
}

export async function checkAndGetFarmerBlockTotalValue(
  id: string,
  value: bigint,
  blockNumber: number,
  lastContributionAt: Date = new Date()
): Promise<FarmerBlockTotalValueHistory> {
  const account = FarmerBlockTotalValueHistory.create({
    id,
    rank: 0,
    value,
    lastContributionAt,
    createdAt: blockNumber,
    updatedAt: blockNumber,
  });
  await account.save();
  return account;
}

export async function checkAndGetFarmerVoteAndBlockTotalCount(
  id: string,
  value: bigint,
  blockNumber: number,
  lastContributionAt: Date = new Date()
): Promise<FarmerVoteAndBlockTotalCountHistory> {
  const account = FarmerVoteAndBlockTotalCountHistory.create({
    id,
    rank: 0,
    value,
    lastContributionAt,
    createdAt: blockNumber,
    updatedAt: blockNumber,
  });
  await account.save();
  return account;
}

export async function checkAndGetFarmerVoteAndBlockTotalValue(
  id: string,
  value: bigint,
  blockNumber: number,
  lastContributionAt: Date = new Date()
): Promise<FarmerVoteAndBlockTotalValueHistory> {
  const account = FarmerVoteAndBlockTotalValueHistory.create({
    id,
    rank: 0,
    value,
    lastContributionAt,
    createdAt: blockNumber,
    updatedAt: blockNumber,
  });
  await account.save();
  return account;
}

// Operator entities
export async function checkAndGetOperatorTotalRewardsCollected(
  id: string,
  value: bigint,
  blockNumber: number,
  lastContributionAt: Date = new Date()
): Promise<OperatorTotalRewardsCollectedHistory> {
  const account = OperatorTotalRewardsCollectedHistory.create({
    id,
    rank: 0,
    value,
    lastContributionAt,
    createdAt: blockNumber,
    updatedAt: blockNumber,
  });
  await account.save();
  return account;
}

export async function checkAndGetOperatorTotalTaxCollected(
  id: string,
  value: bigint,
  blockNumber: number,
  lastContributionAt: Date = new Date()
): Promise<OperatorTotalTaxCollectedHistory> {
  const account = OperatorTotalTaxCollectedHistory.create({
    id,
    rank: 0,
    value,
    lastContributionAt,
    createdAt: blockNumber,
    updatedAt: blockNumber,
  });
  await account.save();
  return account;
}

export async function checkAndGetOperatorBundleTotalCount(
  id: string,
  value: bigint,
  blockNumber: number,
  lastContributionAt: Date = new Date()
): Promise<OperatorBundleTotalCountHistory> {
  const account = OperatorBundleTotalCountHistory.create({
    id,
    rank: 0,
    value,
    lastContributionAt,
    createdAt: blockNumber,
    updatedAt: blockNumber,
  });
  await account.save();
  return account;
}

export async function checkAndGetOperatorDepositsTotalCount(
  id: string,
  value: bigint,
  blockNumber: number,
  lastContributionAt: Date = new Date()
): Promise<OperatorDepositsTotalCountHistory> {
  const account = OperatorDepositsTotalCountHistory.create({
    id,
    rank: 0,
    value,
    lastContributionAt,
    createdAt: blockNumber,
    updatedAt: blockNumber,
  });
  await account.save();
  return account;
}

export async function checkAndGetOperatorDepositsTotalValue(
  id: string,
  value: bigint,
  blockNumber: number,
  lastContributionAt: Date = new Date()
): Promise<OperatorDepositsTotalValueHistory> {
  const account = OperatorDepositsTotalValueHistory.create({
    id,
    rank: 0,
    value,
    lastContributionAt,
    createdAt: blockNumber,
    updatedAt: blockNumber,
  });
  await account.save();
  return account;
}

export async function checkAndGetOperatorWithdrawalsTotalCount(
  id: string,
  value: bigint,
  blockNumber: number,
  lastContributionAt: Date = new Date()
): Promise<OperatorWithdrawalsTotalCountHistory> {
  const account = OperatorWithdrawalsTotalCountHistory.create({
    id,
    rank: 0,
    value,
    lastContributionAt,
    createdAt: blockNumber,
    updatedAt: blockNumber,
  });
  await account.save();
  return account;
}

// Nominator entities
export async function checkAndGetNominatorDepositsTotalCount(
  id: string,
  value: bigint,
  blockNumber: number,
  lastContributionAt: Date = new Date()
): Promise<NominatorDepositsTotalCountHistory> {
  const account = NominatorDepositsTotalCountHistory.create({
    id,
    rank: 0,
    value,
    lastContributionAt,
    createdAt: blockNumber,
    updatedAt: blockNumber,
  });
  await account.save();
  return account;
}

export async function checkAndGetNominatorDepositsTotalValue(
  id: string,
  value: bigint,
  blockNumber: number,
  lastContributionAt: Date = new Date()
): Promise<NominatorDepositsTotalValueHistory> {
  const account = NominatorDepositsTotalValueHistory.create({
    id,
    rank: 0,
    value,
    lastContributionAt,
    createdAt: blockNumber,
    updatedAt: blockNumber,
  });
  await account.save();
  return account;
}

export async function checkAndGetNominatorWithdrawalsTotalCount(
  id: string,
  value: bigint,
  blockNumber: number,
  lastContributionAt: Date = new Date()
): Promise<NominatorWithdrawalsTotalCountHistory> {
  const account = NominatorWithdrawalsTotalCountHistory.create({
    id,
    rank: 0,
    value,
    lastContributionAt,
    createdAt: blockNumber,
    updatedAt: blockNumber,
  });
  await account.save();
  return account;
}
