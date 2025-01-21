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

type Cache = {
  accountExtrinsicFailedTotalCountHistory: AccountExtrinsicFailedTotalCountHistory[];
  accountExtrinsicSuccessTotalCountHistory: AccountExtrinsicSuccessTotalCountHistory[];
  accountExtrinsicTotalCountHistory: AccountExtrinsicTotalCountHistory[];
  accountRemarkCountHistory: AccountRemarkCountHistory[];
  accountTransactionFeePaidTotalValueHistory: AccountTransactionFeePaidTotalValueHistory[];
  accountTransferReceiverTotalCountHistory: AccountTransferReceiverTotalCountHistory[];
  accountTransferReceiverTotalValueHistory: AccountTransferReceiverTotalValueHistory[];
  accountTransferSenderTotalCountHistory: AccountTransferSenderTotalCountHistory[];
  accountTransferSenderTotalValueHistory: AccountTransferSenderTotalValueHistory[];
  farmerBlockTotalCountHistory: FarmerBlockTotalCountHistory[];
  farmerBlockTotalValueHistory: FarmerBlockTotalValueHistory[];
  farmerVoteAndBlockTotalCountHistory: FarmerVoteAndBlockTotalCountHistory[];
  farmerVoteAndBlockTotalValueHistory: FarmerVoteAndBlockTotalValueHistory[];
  farmerVoteTotalCountHistory: FarmerVoteTotalCountHistory[];
  farmerVoteTotalValueHistory: FarmerVoteTotalValueHistory[];
  nominatorDepositsTotalCountHistory: NominatorDepositsTotalCountHistory[];
  nominatorDepositsTotalValueHistory: NominatorDepositsTotalValueHistory[];
  nominatorWithdrawalsTotalCountHistory: NominatorWithdrawalsTotalCountHistory[];
  operatorBundleTotalCountHistory: OperatorBundleTotalCountHistory[];
  operatorDepositsTotalCountHistory: OperatorDepositsTotalCountHistory[];
  operatorDepositsTotalValueHistory: OperatorDepositsTotalValueHistory[];
  operatorTotalRewardsCollectedHistory: OperatorTotalRewardsCollectedHistory[];
  operatorTotalTaxCollectedHistory: OperatorTotalTaxCollectedHistory[];
  operatorWithdrawalsTotalCountHistory: OperatorWithdrawalsTotalCountHistory[];
};

export const initializeCache = (): Cache => ({
  accountExtrinsicFailedTotalCountHistory: [],
  accountExtrinsicSuccessTotalCountHistory: [],
  accountExtrinsicTotalCountHistory: [],
  accountRemarkCountHistory: [],
  accountTransactionFeePaidTotalValueHistory: [],
  accountTransferReceiverTotalCountHistory: [],
  accountTransferReceiverTotalValueHistory: [],
  accountTransferSenderTotalCountHistory: [],
  accountTransferSenderTotalValueHistory: [],
  farmerBlockTotalCountHistory: [],
  farmerBlockTotalValueHistory: [],
  farmerVoteAndBlockTotalCountHistory: [],
  farmerVoteAndBlockTotalValueHistory: [],
  farmerVoteTotalCountHistory: [],
  farmerVoteTotalValueHistory: [],
  nominatorDepositsTotalCountHistory: [],
  nominatorDepositsTotalValueHistory: [],
  nominatorWithdrawalsTotalCountHistory: [],
  operatorBundleTotalCountHistory: [],
  operatorDepositsTotalCountHistory: [],
  operatorDepositsTotalValueHistory: [],
  operatorTotalRewardsCollectedHistory: [],
  operatorTotalTaxCollectedHistory: [],
  operatorWithdrawalsTotalCountHistory: [],
});

export const saveCache = async (cache: Cache) => {
  await Promise.all(
    cache.accountTransferSenderTotalCountHistory.map((item) => item.save())
  );
  await Promise.all(
    cache.accountTransferReceiverTotalCountHistory.map((item) => item.save())
  );
  await Promise.all(
    cache.accountTransferSenderTotalValueHistory.map((item) => item.save())
  );
  await Promise.all(
    cache.accountTransferReceiverTotalValueHistory.map((item) => item.save())
  );
  await Promise.all(cache.accountRemarkCountHistory.map((item) => item.save()));
  await Promise.all(
    cache.accountExtrinsicTotalCountHistory.map((item) => item.save())
  );
  await Promise.all(
    cache.accountExtrinsicSuccessTotalCountHistory.map((item) => item.save())
  );
  await Promise.all(
    cache.accountExtrinsicFailedTotalCountHistory.map((item) => item.save())
  );
  await Promise.all(
    cache.accountTransactionFeePaidTotalValueHistory.map((item) => item.save())
  );
  await Promise.all(
    cache.farmerVoteTotalCountHistory.map((item) => item.save())
  );
  await Promise.all(
    cache.farmerVoteTotalValueHistory.map((item) => item.save())
  );
  await Promise.all(
    cache.farmerBlockTotalCountHistory.map((item) => item.save())
  );
  await Promise.all(
    cache.farmerBlockTotalValueHistory.map((item) => item.save())
  );
  await Promise.all(
    cache.farmerVoteAndBlockTotalCountHistory.map((item) => item.save())
  );
  await Promise.all(
    cache.farmerVoteAndBlockTotalValueHistory.map((item) => item.save())
  );
  await Promise.all(
    cache.nominatorDepositsTotalCountHistory.map((item) => item.save())
  );
  await Promise.all(
    cache.nominatorDepositsTotalValueHistory.map((item) => item.save())
  );
  await Promise.all(
    cache.nominatorWithdrawalsTotalCountHistory.map((item) => item.save())
  );
  await Promise.all(
    cache.operatorBundleTotalCountHistory.map((item) => item.save())
  );
  await Promise.all(
    cache.operatorDepositsTotalCountHistory.map((item) => item.save())
  );
  await Promise.all(
    cache.operatorDepositsTotalValueHistory.map((item) => item.save())
  );
  await Promise.all(
    cache.operatorTotalRewardsCollectedHistory.map((item) => item.save())
  );
  await Promise.all(
    cache.operatorTotalTaxCollectedHistory.map((item) => item.save())
  );
  await Promise.all(
    cache.operatorWithdrawalsTotalCountHistory.map((item) => item.save())
  );
};

export function createAccountTransferSenderTotalCount(
  accountId: string,
  value: bigint,
  blockHeight: bigint,
  extrinsicId: string,
  eventId: string,
  lastContributionAt: Date = new Date()
): AccountTransferSenderTotalCountHistory {
  return AccountTransferSenderTotalCountHistory.create({
    id: `${accountId}-${extrinsicId}-${eventId}`,
    accountId,
    value,
    lastContributionAt,
    blockHeight,
    extrinsicId,
    eventId,
  });
}

export function createAccountTransferSenderTotalValue(
  accountId: string,
  value: bigint,
  blockHeight: bigint,
  extrinsicId: string,
  eventId: string,
  lastContributionAt: Date = new Date()
): AccountTransferSenderTotalValueHistory {
  return AccountTransferSenderTotalValueHistory.create({
    id: `${accountId}-${extrinsicId}-${eventId}`,
    accountId,
    value,
    lastContributionAt,
    blockHeight,
    extrinsicId,
    eventId,
  });
}

export function createAccountTransferReceiverTotalCount(
  accountId: string,
  value: bigint,
  blockHeight: bigint,
  extrinsicId: string,
  eventId: string,
  lastContributionAt: Date = new Date()
): AccountTransferReceiverTotalCountHistory {
  return AccountTransferReceiverTotalCountHistory.create({
    id: `${accountId}-${extrinsicId}-${eventId}`,
    accountId,
    value,
    lastContributionAt,
    blockHeight,
    extrinsicId,
    eventId,
  });
}

export function createAccountTransferReceiverTotalValue(
  accountId: string,
  value: bigint,
  blockHeight: bigint,
  extrinsicId: string,
  eventId: string,
  lastContributionAt: Date = new Date()
): AccountTransferReceiverTotalValueHistory {
  return AccountTransferReceiverTotalValueHistory.create({
    id: `${accountId}-${extrinsicId}-${eventId}`,
    accountId,
    value,
    lastContributionAt,
    blockHeight,
    extrinsicId,
    eventId,
  });
}

export function createAccountRemarkCount(
  accountId: string,
  value: bigint,
  blockHeight: bigint,
  extrinsicId: string,
  eventId: string,
  lastContributionAt: Date = new Date()
): AccountRemarkCountHistory {
  return AccountRemarkCountHistory.create({
    id: `${accountId}-${extrinsicId}-${eventId}`,
    accountId,
    value,
    lastContributionAt,
    blockHeight,
    extrinsicId,
    eventId,
  });
}

export function createAccountExtrinsicTotalCount(
  accountId: string,
  value: bigint,
  blockHeight: bigint,
  extrinsicId: string,
  eventId: string,
  lastContributionAt: Date = new Date()
): AccountExtrinsicTotalCountHistory {
  return AccountExtrinsicTotalCountHistory.create({
    id: `${accountId}-${extrinsicId}-${eventId}`,
    accountId,
    value,
    lastContributionAt,
    blockHeight,
    extrinsicId,
    eventId,
  });
}

export function createAccountExtrinsicSuccessTotalCount(
  accountId: string,
  value: bigint,
  blockHeight: bigint,
  extrinsicId: string,
  eventId: string,
  lastContributionAt: Date = new Date()
): AccountExtrinsicSuccessTotalCountHistory {
  return AccountExtrinsicSuccessTotalCountHistory.create({
    id: `${accountId}-${extrinsicId}-${eventId}`,
    accountId,
    value,
    lastContributionAt,
    blockHeight,
    extrinsicId,
    eventId,
  });
}

export function createAccountExtrinsicFailedTotalCount(
  accountId: string,
  value: bigint,
  blockHeight: bigint,
  extrinsicId: string,
  eventId: string,
  lastContributionAt: Date = new Date()
): AccountExtrinsicFailedTotalCountHistory {
  return AccountExtrinsicFailedTotalCountHistory.create({
    id: `${accountId}-${extrinsicId}-${eventId}`,
    accountId,
    value,
    lastContributionAt,
    blockHeight,
    extrinsicId,
    eventId,
  });
}

export function createAccountTransactionFeePaidTotalValue(
  accountId: string,
  value: bigint,
  blockHeight: bigint,
  extrinsicId: string,
  eventId: string,
  lastContributionAt: Date = new Date()
): AccountTransactionFeePaidTotalValueHistory {
  return AccountTransactionFeePaidTotalValueHistory.create({
    id: `${accountId}-${extrinsicId}-${eventId}`,
    accountId,
    value,
    lastContributionAt,
    blockHeight,
    extrinsicId,
    eventId,
  });
}

// Farmer entities
export function createFarmerVoteTotalCount(
  accountId: string,
  value: bigint,
  blockHeight: bigint,
  extrinsicId: string,
  eventId: string,
  lastContributionAt: Date = new Date()
): FarmerVoteTotalCountHistory {
  return FarmerVoteTotalCountHistory.create({
    id: `${accountId}-${extrinsicId}-${eventId}`,
    accountId,
    value,
    lastContributionAt,
    blockHeight,
    extrinsicId,
    eventId,
  });
}

export function createFarmerVoteTotalValue(
  accountId: string,
  value: bigint,
  blockHeight: bigint,
  extrinsicId: string,
  eventId: string,
  lastContributionAt: Date = new Date()
): FarmerVoteTotalValueHistory {
  return FarmerVoteTotalValueHistory.create({
    id: `${accountId}-${extrinsicId}-${eventId}`,
    accountId,
    value,
    lastContributionAt,
    blockHeight,
    extrinsicId,
    eventId,
  });
}

export function createFarmerBlockTotalCount(
  accountId: string,
  value: bigint,
  blockHeight: bigint,
  extrinsicId: string,
  eventId: string,
  lastContributionAt: Date = new Date()
): FarmerBlockTotalCountHistory {
  return FarmerBlockTotalCountHistory.create({
    id: `${accountId}-${extrinsicId}-${eventId}`,
    accountId,
    value,
    lastContributionAt,
    blockHeight,
    extrinsicId,
    eventId,
  });
}

export function createFarmerBlockTotalValue(
  accountId: string,
  value: bigint,
  blockHeight: bigint,
  extrinsicId: string,
  eventId: string,
  lastContributionAt: Date = new Date()
): FarmerBlockTotalValueHistory {
  return FarmerBlockTotalValueHistory.create({
    id: `${accountId}-${extrinsicId}-${eventId}`,
    accountId,
    value,
    lastContributionAt,
    blockHeight,
    extrinsicId,
    eventId,
  });
}

export function createFarmerVoteAndBlockTotalCount(
  accountId: string,
  value: bigint,
  blockHeight: bigint,
  extrinsicId: string,
  eventId: string,
  lastContributionAt: Date = new Date()
): FarmerVoteAndBlockTotalCountHistory {
  return FarmerVoteAndBlockTotalCountHistory.create({
    id: `${accountId}-${extrinsicId}-${eventId}`,
    accountId,
    value,
    lastContributionAt,
    blockHeight,
    extrinsicId,
    eventId,
  });
}

export function createFarmerVoteAndBlockTotalValue(
  accountId: string,
  value: bigint,
  blockHeight: bigint,
  extrinsicId: string,
  eventId: string,
  lastContributionAt: Date = new Date()
): FarmerVoteAndBlockTotalValueHistory {
  return FarmerVoteAndBlockTotalValueHistory.create({
    id: `${accountId}-${extrinsicId}-${eventId}`,
    accountId,
    value,
    lastContributionAt,
    blockHeight,
    extrinsicId,
    eventId,
  });
}

// Operator entities
export function createOperatorTotalRewardsCollected(
  accountId: string,
  value: bigint,
  blockHeight: bigint,
  extrinsicId: string,
  eventId: string,
  lastContributionAt: Date = new Date()
): OperatorTotalRewardsCollectedHistory {
  return OperatorTotalRewardsCollectedHistory.create({
    id: `${accountId}-${extrinsicId}-${eventId}`,
    accountId,
    value,
    lastContributionAt,
    blockHeight,
    extrinsicId,
    eventId,
  });
}

export function createOperatorTotalTaxCollected(
  accountId: string,
  value: bigint,
  blockHeight: bigint,
  extrinsicId: string,
  eventId: string,
  lastContributionAt: Date = new Date()
): OperatorTotalTaxCollectedHistory {
  return OperatorTotalTaxCollectedHistory.create({
    id: `${accountId}-${extrinsicId}-${eventId}`,
    accountId,
    value,
    lastContributionAt,
    blockHeight,
    extrinsicId,
    eventId,
  });
}

export function createOperatorBundleTotalCount(
  accountId: string,
  value: bigint,
  blockHeight: bigint,
  extrinsicId: string,
  eventId: string,
  lastContributionAt: Date = new Date()
): OperatorBundleTotalCountHistory {
  return OperatorBundleTotalCountHistory.create({
    id: `${accountId}-${extrinsicId}-${eventId}`,
    accountId,
    value,
    lastContributionAt,
    blockHeight,
    extrinsicId,
    eventId,
  });
}

export function createOperatorDepositsTotalCount(
  accountId: string,
  value: bigint,
  blockHeight: bigint,
  extrinsicId: string,
  eventId: string,
  lastContributionAt: Date = new Date()
): OperatorDepositsTotalCountHistory {
  return OperatorDepositsTotalCountHistory.create({
    id: `${accountId}-${extrinsicId}-${eventId}`,
    accountId,
    value,
    lastContributionAt,
    blockHeight,
    extrinsicId,
    eventId,
  });
}

export function createOperatorDepositsTotalValue(
  accountId: string,
  value: bigint,
  blockHeight: bigint,
  extrinsicId: string,
  eventId: string,
  lastContributionAt: Date = new Date()
): OperatorDepositsTotalValueHistory {
  return OperatorDepositsTotalValueHistory.create({
    id: `${accountId}-${extrinsicId}-${eventId}`,
    accountId,
    value,
    lastContributionAt,
    blockHeight,
    extrinsicId,
    eventId,
  });
}

export function createOperatorWithdrawalsTotalCount(
  accountId: string,
  value: bigint,
  blockHeight: bigint,
  extrinsicId: string,
  eventId: string,
  lastContributionAt: Date = new Date()
): OperatorWithdrawalsTotalCountHistory {
  return OperatorWithdrawalsTotalCountHistory.create({
    id: `${accountId}-${extrinsicId}-${eventId}`,
    accountId,
    value,
    lastContributionAt,
    blockHeight,
    extrinsicId,
    eventId,
  });
}

// Nominator entities
export function createNominatorDepositsTotalCount(
  accountId: string,
  value: bigint,
  blockHeight: bigint,
  extrinsicId: string,
  eventId: string,
  lastContributionAt: Date = new Date()
): NominatorDepositsTotalCountHistory {
  return NominatorDepositsTotalCountHistory.create({
    id: `${accountId}-${extrinsicId}-${eventId}`,
    accountId,
    value,
    lastContributionAt,
    blockHeight,
    extrinsicId,
    eventId,
  });
}

export function createNominatorDepositsTotalValue(
  accountId: string,
  value: bigint,
  blockHeight: bigint,
  extrinsicId: string,
  eventId: string,
  lastContributionAt: Date = new Date()
): NominatorDepositsTotalValueHistory {
  return NominatorDepositsTotalValueHistory.create({
    id: `${accountId}-${extrinsicId}-${eventId}`,
    accountId,
    value,
    lastContributionAt,
    blockHeight,
    extrinsicId,
    eventId,
  });
}

export function createNominatorWithdrawalsTotalCount(
  accountId: string,
  value: bigint,
  blockHeight: bigint,
  extrinsicId: string,
  eventId: string,
  lastContributionAt: Date = new Date()
): NominatorWithdrawalsTotalCountHistory {
  return NominatorWithdrawalsTotalCountHistory.create({
    id: `${accountId}-${extrinsicId}-${eventId}`,
    accountId,
    value,
    lastContributionAt,
    blockHeight,
    extrinsicId,
    eventId,
  });
}
