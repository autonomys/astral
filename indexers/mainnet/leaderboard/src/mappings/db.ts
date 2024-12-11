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

export async function createAndSaveAccountTransferSenderTotalCount(
  id: string,
  value: bigint,
  blockHeight: bigint,
  lastContributionAt: Date = new Date(),
  extrinsicId: string,
  eventId: string
): Promise<AccountTransferSenderTotalCountHistory> {
  const account = AccountTransferSenderTotalCountHistory.create({
    id,
    value,
    lastContributionAt,
    blockHeight,
    extrinsicId,
    eventId,
  });
  await account.save();
  return account;
}

export async function createAndSaveAccountTransferSenderTotalValue(
  id: string,
  value: bigint,
  blockHeight: bigint,
  lastContributionAt: Date = new Date(),
  extrinsicId: string,
  eventId: string
): Promise<AccountTransferSenderTotalValueHistory> {
  const account = AccountTransferSenderTotalValueHistory.create({
    id,
    value,
    lastContributionAt,
    blockHeight,
    extrinsicId,
    eventId,
  });
  await account.save();
  return account;
}

export async function createAndSaveAccountTransferReceiverTotalCount(
  id: string,
  value: bigint,
  blockHeight: bigint,
  lastContributionAt: Date = new Date(),
  extrinsicId: string,
  eventId: string
): Promise<AccountTransferReceiverTotalCountHistory> {
  const account = AccountTransferReceiverTotalCountHistory.create({
    id,
    value,
    lastContributionAt,
    blockHeight,
    extrinsicId,
    eventId,
  });
  await account.save();
  return account;
}

export async function createAndSaveAccountTransferReceiverTotalValue(
  id: string,
  value: bigint,
  blockHeight: bigint,
  lastContributionAt: Date = new Date(),
  extrinsicId: string,
  eventId: string
): Promise<AccountTransferReceiverTotalValueHistory> {
  const account = AccountTransferReceiverTotalValueHistory.create({
    id,
    value,
    lastContributionAt,
    blockHeight,
    extrinsicId,
    eventId,
  });
  await account.save();
  return account;
}

export async function createAndSaveAccountRemarkCount(
  id: string,
  value: bigint,
  blockHeight: bigint,
  lastContributionAt: Date = new Date(),
  extrinsicId: string,
  eventId: string
): Promise<AccountRemarkCountHistory> {
  const account = AccountRemarkCountHistory.create({
    id,
    value,
    lastContributionAt,
    blockHeight,
    extrinsicId,
    eventId,
  });
  await account.save();
  return account;
}

export async function createAndSaveAccountExtrinsicTotalCount(
  id: string,
  value: bigint,
  blockHeight: bigint,
  lastContributionAt: Date = new Date(),
  extrinsicId: string,
  eventId: string
): Promise<AccountExtrinsicTotalCountHistory> {
  const account = AccountExtrinsicTotalCountHistory.create({
    id,
    value,
    lastContributionAt,
    blockHeight,
    extrinsicId,
    eventId,
  });
  await account.save();
  return account;
}

export async function createAndSaveAccountExtrinsicSuccessTotalCount(
  id: string,
  value: bigint,
  blockHeight: bigint,
  lastContributionAt: Date = new Date(),
  extrinsicId: string,
  eventId: string
): Promise<AccountExtrinsicSuccessTotalCountHistory> {
  const account = AccountExtrinsicSuccessTotalCountHistory.create({
    id,
    value,
    lastContributionAt,
    blockHeight,
    extrinsicId,
    eventId,
  });
  await account.save();
  return account;
}

export async function createAndSaveAccountExtrinsicFailedTotalCount(
  id: string,
  value: bigint,
  blockHeight: bigint,
  lastContributionAt: Date = new Date(),
  extrinsicId: string,
  eventId: string
): Promise<AccountExtrinsicFailedTotalCountHistory> {
  const account = AccountExtrinsicFailedTotalCountHistory.create({
    id,
    value,
    lastContributionAt,
    blockHeight,
    extrinsicId,
    eventId,
  });
  await account.save();
  return account;
}

export async function createAndSaveAccountTransactionFeePaidTotalValue(
  id: string,
  value: bigint,
  blockHeight: bigint,
  lastContributionAt: Date = new Date(),
  extrinsicId: string,
  eventId: string
): Promise<AccountTransactionFeePaidTotalValueHistory> {
  const account = AccountTransactionFeePaidTotalValueHistory.create({
    id,
    value,
    lastContributionAt,
    blockHeight,
    extrinsicId,
    eventId,
  });
  await account.save();
  return account;
}

// Farmer entities
export async function createAndSaveFarmerVoteTotalCount(
  id: string,
  value: bigint,
  blockHeight: bigint,
  lastContributionAt: Date = new Date(),
  extrinsicId: string,
  eventId: string
): Promise<FarmerVoteTotalCountHistory> {
  const account = FarmerVoteTotalCountHistory.create({
    id,
    value,
    lastContributionAt,
    blockHeight,
    extrinsicId,
    eventId,
  });
  await account.save();
  return account;
}

export async function createAndSaveFarmerVoteTotalValue(
  id: string,
  value: bigint,
  blockHeight: bigint,
  lastContributionAt: Date = new Date(),
  extrinsicId: string,
  eventId: string
): Promise<FarmerVoteTotalValueHistory> {
  const account = FarmerVoteTotalValueHistory.create({
    id,
    value,
    lastContributionAt,
    blockHeight,
    extrinsicId,
    eventId,
  });
  await account.save();
  return account;
}

export async function createAndSaveFarmerBlockTotalCount(
  id: string,
  value: bigint,
  blockHeight: bigint,
  lastContributionAt: Date = new Date(),
  extrinsicId: string,
  eventId: string
): Promise<FarmerBlockTotalCountHistory> {
  const account = FarmerBlockTotalCountHistory.create({
    id,
    value,
    lastContributionAt,
    blockHeight,
    extrinsicId,
    eventId,
  });
  await account.save();
  return account;
}

export async function createAndSaveFarmerBlockTotalValue(
  id: string,
  value: bigint,
  blockHeight: bigint,
  lastContributionAt: Date = new Date(),
  extrinsicId: string,
  eventId: string
): Promise<FarmerBlockTotalValueHistory> {
  const account = FarmerBlockTotalValueHistory.create({
    id,
    value,
    lastContributionAt,
    blockHeight,
    extrinsicId,
    eventId,
  });
  await account.save();
  return account;
}

export async function createAndSaveFarmerVoteAndBlockTotalCount(
  id: string,
  value: bigint,
  blockHeight: bigint,
  lastContributionAt: Date = new Date(),
  extrinsicId: string,
  eventId: string
): Promise<FarmerVoteAndBlockTotalCountHistory> {
  const account = FarmerVoteAndBlockTotalCountHistory.create({
    id,
    value,
    lastContributionAt,
    blockHeight,
    extrinsicId,
    eventId,
  });
  await account.save();
  return account;
}

export async function createAndSaveFarmerVoteAndBlockTotalValue(
  id: string,
  value: bigint,
  blockHeight: bigint,
  lastContributionAt: Date = new Date(),
  extrinsicId: string,
  eventId: string
): Promise<FarmerVoteAndBlockTotalValueHistory> {
  const account = FarmerVoteAndBlockTotalValueHistory.create({
    id,
    value,
    lastContributionAt,
    blockHeight,
    extrinsicId,
    eventId,
  });
  await account.save();
  return account;
}

// Operator entities
export async function createAndSaveOperatorTotalRewardsCollected(
  id: string,
  value: bigint,
  blockHeight: bigint,
  lastContributionAt: Date = new Date(),
  extrinsicId: string,
  eventId: string
): Promise<OperatorTotalRewardsCollectedHistory> {
  const account = OperatorTotalRewardsCollectedHistory.create({
    id,
    value,
    lastContributionAt,
    blockHeight,
    extrinsicId,
    eventId,
  });
  await account.save();
  return account;
}

export async function createAndSaveOperatorTotalTaxCollected(
  id: string,
  value: bigint,
  blockHeight: bigint,
  lastContributionAt: Date = new Date(),
  extrinsicId: string,
  eventId: string
): Promise<OperatorTotalTaxCollectedHistory> {
  const account = OperatorTotalTaxCollectedHistory.create({
    id,
    value,
    lastContributionAt,
    blockHeight,
    extrinsicId,
    eventId,
  });
  await account.save();
  return account;
}

export async function createAndSaveOperatorBundleTotalCount(
  id: string,
  value: bigint,
  blockHeight: bigint,
  lastContributionAt: Date = new Date(),
  extrinsicId: string,
  eventId: string
): Promise<OperatorBundleTotalCountHistory> {
  const account = OperatorBundleTotalCountHistory.create({
    id,
    value,
    lastContributionAt,
    blockHeight,
    extrinsicId,
    eventId,
  });
  await account.save();
  return account;
}

export async function createAndSaveOperatorDepositsTotalCount(
  id: string,
  value: bigint,
  blockHeight: bigint,
  lastContributionAt: Date = new Date(),
  extrinsicId: string,
  eventId: string
): Promise<OperatorDepositsTotalCountHistory> {
  const account = OperatorDepositsTotalCountHistory.create({
    id,
    value,
    lastContributionAt,
    blockHeight,
    extrinsicId,
    eventId,
  });
  await account.save();
  return account;
}

export async function createAndSaveOperatorDepositsTotalValue(
  id: string,
  value: bigint,
  blockHeight: bigint,
  lastContributionAt: Date = new Date(),
  extrinsicId: string,
  eventId: string
): Promise<OperatorDepositsTotalValueHistory> {
  const account = OperatorDepositsTotalValueHistory.create({
    id,
    value,
    lastContributionAt,
    blockHeight,
    extrinsicId,
    eventId,
  });
  await account.save();
  return account;
}

export async function createAndSaveOperatorWithdrawalsTotalCount(
  id: string,
  value: bigint,
  blockHeight: bigint,
  lastContributionAt: Date = new Date(),
  extrinsicId: string,
  eventId: string
): Promise<OperatorWithdrawalsTotalCountHistory> {
  const account = OperatorWithdrawalsTotalCountHistory.create({
    id,
    value,
    lastContributionAt,
    blockHeight,
    extrinsicId,
    eventId,
  });
  await account.save();
  return account;
}

// Nominator entities
export async function createAndSaveNominatorDepositsTotalCount(
  id: string,
  value: bigint,
  blockHeight: bigint,
  lastContributionAt: Date = new Date(),
  extrinsicId: string,
  eventId: string
): Promise<NominatorDepositsTotalCountHistory> {
  const account = NominatorDepositsTotalCountHistory.create({
    id,
    value,
    lastContributionAt,
    blockHeight,
    extrinsicId,
    eventId,
  });
  await account.save();
  return account;
}

export async function createAndSaveNominatorDepositsTotalValue(
  id: string,
  value: bigint,
  blockHeight: bigint,
  lastContributionAt: Date = new Date(),
  extrinsicId: string,
  eventId: string
): Promise<NominatorDepositsTotalValueHistory> {
  const account = NominatorDepositsTotalValueHistory.create({
    id,
    value,
    lastContributionAt,
    blockHeight,
    extrinsicId,
    eventId,
  });
  await account.save();
  return account;
}

export async function createAndSaveNominatorWithdrawalsTotalCount(
  id: string,
  value: bigint,
  blockHeight: bigint,
  lastContributionAt: Date = new Date(),
  extrinsicId: string,
  eventId: string
): Promise<NominatorWithdrawalsTotalCountHistory> {
  const account = NominatorWithdrawalsTotalCountHistory.create({
    id,
    value,
    lastContributionAt,
    blockHeight,
    extrinsicId,
    eventId,
  });
  await account.save();
  return account;
}
