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

export type Cache = {
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
  // Account entities
  await Promise.all([
    store.bulkCreate(
      `AccountTransferSenderTotalCountHistory`,
      cache.accountTransferSenderTotalCountHistory
    ),
    store.bulkCreate(
      `AccountTransferReceiverTotalCountHistory`,
      cache.accountTransferReceiverTotalCountHistory
    ),
    store.bulkCreate(
      `AccountTransferSenderTotalValueHistory`,
      cache.accountTransferSenderTotalValueHistory
    ),
    store.bulkCreate(
      `AccountTransferReceiverTotalValueHistory`,
      cache.accountTransferReceiverTotalValueHistory
    ),
    store.bulkCreate(
      `AccountRemarkCountHistory`,
      cache.accountRemarkCountHistory
    ),
    store.bulkCreate(
      `AccountExtrinsicTotalCountHistory`,
      cache.accountExtrinsicTotalCountHistory
    ),
    store.bulkCreate(
      `AccountExtrinsicSuccessTotalCountHistory`,
      cache.accountExtrinsicSuccessTotalCountHistory
    ),
    store.bulkCreate(
      `AccountExtrinsicFailedTotalCountHistory`,
      cache.accountExtrinsicFailedTotalCountHistory
    ),
    store.bulkCreate(
      `AccountTransactionFeePaidTotalValueHistory`,
      cache.accountTransactionFeePaidTotalValueHistory
    ),
    // Farmer entities
    store.bulkCreate(
      `FarmerVoteTotalCountHistory`,
      cache.farmerVoteTotalCountHistory
    ),
    store.bulkCreate(
      `FarmerVoteTotalValueHistory`,
      cache.farmerVoteTotalValueHistory
    ),
    store.bulkCreate(
      `FarmerBlockTotalCountHistory`,
      cache.farmerBlockTotalCountHistory
    ),
    store.bulkCreate(
      `FarmerBlockTotalValueHistory`,
      cache.farmerBlockTotalValueHistory
    ),
    store.bulkCreate(
      `FarmerVoteAndBlockTotalCountHistory`,
      cache.farmerVoteAndBlockTotalCountHistory
    ),
    store.bulkCreate(
      `FarmerVoteAndBlockTotalValueHistory`,
      cache.farmerVoteAndBlockTotalValueHistory
    ),
    // Nominator entities
    store.bulkCreate(
      `NominatorDepositsTotalCountHistory`,
      cache.nominatorDepositsTotalCountHistory
    ),
    store.bulkCreate(
      `NominatorDepositsTotalValueHistory`,
      cache.nominatorDepositsTotalValueHistory
    ),
    store.bulkCreate(
      `NominatorWithdrawalsTotalCountHistory`,
      cache.nominatorWithdrawalsTotalCountHistory
    ),
    // Operator entities
    store.bulkCreate(
      `OperatorBundleTotalCountHistory`,
      cache.operatorBundleTotalCountHistory
    ),
    store.bulkCreate(
      `OperatorDepositsTotalCountHistory`,
      cache.operatorDepositsTotalCountHistory
    ),
    store.bulkCreate(
      `OperatorDepositsTotalValueHistory`,
      cache.operatorDepositsTotalValueHistory
    ),
    store.bulkCreate(
      `OperatorTotalRewardsCollectedHistory`,
      cache.operatorTotalRewardsCollectedHistory
    ),
    store.bulkCreate(
      `OperatorTotalTaxCollectedHistory`,
      cache.operatorTotalTaxCollectedHistory
    ),
    store.bulkCreate(
      `OperatorWithdrawalsTotalCountHistory`,
      cache.operatorWithdrawalsTotalCountHistory
    ),
  ]);
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
