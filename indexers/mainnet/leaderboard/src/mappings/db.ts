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
} from "../types";

export async function checkAndGetAccountTransferSenderTotalCount(
  id: string,
  value: bigint,
  blockNumber: number,
  lastContributionAt: Date = new Date()
): Promise<AccountTransferSenderTotalCount> {
  let account = await AccountTransferSenderTotalCount.get(id);
  if (!account) {
    account = AccountTransferSenderTotalCount.create({
      id,
      rank: 0,
      value,
      lastContributionAt,
      createdAt: blockNumber,
      updatedAt: blockNumber,
    });
  } else {
    account.value += value;
    account.updatedAt = blockNumber;
  }
  await account.save();
  return account;
}

export async function checkAndGetAccountTransferSenderTotalValue(
  id: string,
  value: bigint,
  blockNumber: number,
  lastContributionAt: Date = new Date()
): Promise<AccountTransferSenderTotalValue> {
  let account = await AccountTransferSenderTotalValue.get(id);
  if (!account) {
    account = AccountTransferSenderTotalValue.create({
      id,
      rank: 0,
      value,
      lastContributionAt,
      createdAt: blockNumber,
      updatedAt: blockNumber,
    });
  } else {
    account.value += value;
    account.updatedAt = blockNumber;
  }
  await account.save();
  return account;
}

export async function checkAndGetAccountTransferReceiverTotalCount(
  id: string,
  value: bigint,
  blockNumber: number,
  lastContributionAt: Date = new Date()
): Promise<AccountTransferReceiverTotalCount> {
  let account = await AccountTransferReceiverTotalCount.get(id);
  if (!account) {
    account = AccountTransferReceiverTotalCount.create({
      id,
      rank: 0,
      value,
      lastContributionAt,
      createdAt: blockNumber,
      updatedAt: blockNumber,
    });
  } else {
    account.value += value;
    account.updatedAt = blockNumber;
  }
  await account.save();
  return account;
}

export async function checkAndGetAccountTransferReceiverTotalValue(
  id: string,
  value: bigint,
  blockNumber: number,
  lastContributionAt: Date = new Date()
): Promise<AccountTransferReceiverTotalValue> {
  let account = await AccountTransferReceiverTotalValue.get(id);
  if (!account) {
    account = AccountTransferReceiverTotalValue.create({
      id,
      rank: 0,
      value,
      lastContributionAt,
      createdAt: blockNumber,
      updatedAt: blockNumber,
    });
  } else {
    account.value += value;
    account.updatedAt = blockNumber;
  }
  await account.save();
  return account;
}

export async function checkAndGetAccountRemarkCount(
  id: string,
  value: bigint,
  blockNumber: number,
  lastContributionAt: Date = new Date()
): Promise<AccountRemarkCount> {
  let account = await AccountRemarkCount.get(id);
  if (!account) {
    account = AccountRemarkCount.create({
      id,
      rank: 0,
      value,
      lastContributionAt,
      createdAt: blockNumber,
      updatedAt: blockNumber,
    });
  } else {
    account.value += value;
    account.updatedAt = blockNumber;
  }
  await account.save();
  return account;
}

export async function checkAndGetAccountExtrinsicTotalCount(
  id: string,
  value: bigint,
  blockNumber: number,
  lastContributionAt: Date = new Date()
): Promise<AccountExtrinsicTotalCount> {
  let account = await AccountExtrinsicTotalCount.get(id);
  if (!account) {
    account = AccountExtrinsicTotalCount.create({
      id,
      rank: 0,
      value,
      lastContributionAt,
      createdAt: blockNumber,
      updatedAt: blockNumber,
    });
  } else {
    account.value += value;
    account.updatedAt = blockNumber;
  }
  await account.save();
  return account;
}

export async function checkAndGetAccountExtrinsicSuccessTotalCount(
  id: string,
  value: bigint,
  blockNumber: number,
  lastContributionAt: Date = new Date()
): Promise<AccountExtrinsicSuccessTotalCount> {
  let account = await AccountExtrinsicSuccessTotalCount.get(id);
  if (!account) {
    account = AccountExtrinsicSuccessTotalCount.create({
      id,
      rank: 0,
      value,
      lastContributionAt,
      createdAt: blockNumber,
      updatedAt: blockNumber,
    });
  } else {
    account.value += value;
    account.updatedAt = blockNumber;
  }
  await account.save();
  return account;
}

export async function checkAndGetAccountExtrinsicFailedTotalCount(
  id: string,
  value: bigint,
  blockNumber: number,
  lastContributionAt: Date = new Date()
): Promise<AccountExtrinsicFailedTotalCount> {
  let account = await AccountExtrinsicFailedTotalCount.get(id);
  if (!account) {
    account = AccountExtrinsicFailedTotalCount.create({
      id,
      rank: 0,
      value,
      lastContributionAt,
      createdAt: blockNumber,
      updatedAt: blockNumber,
    });
  } else {
    account.value += value;
    account.updatedAt = blockNumber;
  }
  await account.save();
  return account;
}

export async function checkAndGetAccountTransactionFeePaidTotalValue(
  id: string,
  value: bigint,
  blockNumber: number,
  lastContributionAt: Date = new Date()
): Promise<AccountTransactionFeePaidTotalValue> {
  let account = await AccountTransactionFeePaidTotalValue.get(id);
  if (!account) {
    account = AccountTransactionFeePaidTotalValue.create({
      id,
      rank: 0,
      value,
      lastContributionAt,
      createdAt: blockNumber,
      updatedAt: blockNumber,
    });
  } else {
    account.value += value;
    account.updatedAt = blockNumber;
  }
  await account.save();
  return account;
}

// Farmer entities
export async function checkAndGetFarmerVoteTotalCount(
  id: string,
  value: bigint,
  blockNumber: number,
  lastContributionAt: Date = new Date()
): Promise<FarmerVoteTotalCount> {
  let account = await FarmerVoteTotalCount.get(id);
  if (!account) {
    account = FarmerVoteTotalCount.create({
      id,
      rank: 0,
      value,
      lastContributionAt,
      createdAt: blockNumber,
      updatedAt: blockNumber,
    });
  } else {
    account.value += value;
    account.updatedAt = blockNumber;
  }
  await account.save();
  return account;
}

export async function checkAndGetFarmerVoteTotalValue(
  id: string,
  value: bigint,
  blockNumber: number,
  lastContributionAt: Date = new Date()
): Promise<FarmerVoteTotalValue> {
  let account = await FarmerVoteTotalValue.get(id);
  if (!account) {
    account = FarmerVoteTotalValue.create({
      id,
      rank: 0,
      value,
      lastContributionAt,
      createdAt: blockNumber,
      updatedAt: blockNumber,
    });
  } else {
    account.value += value;
    account.updatedAt = blockNumber;
  }
  await account.save();
  return account;
}

export async function checkAndGetFarmerBlockTotalCount(
  id: string,
  value: bigint,
  blockNumber: number,
  lastContributionAt: Date = new Date()
): Promise<FarmerBlockTotalCount> {
  let account = await FarmerBlockTotalCount.get(id);
  if (!account) {
    account = FarmerBlockTotalCount.create({
      id,
      rank: 0,
      value,
      lastContributionAt,
      createdAt: blockNumber,
      updatedAt: blockNumber,
    });
  } else {
    account.value += value;
    account.updatedAt = blockNumber;
  }
  await account.save();
  return account;
}

export async function checkAndGetFarmerBlockTotalValue(
  id: string,
  value: bigint,
  blockNumber: number,
  lastContributionAt: Date = new Date()
): Promise<FarmerBlockTotalValue> {
  let account = await FarmerBlockTotalValue.get(id);
  if (!account) {
    account = FarmerBlockTotalValue.create({
      id,
      rank: 0,
      value,
      lastContributionAt,
      createdAt: blockNumber,
      updatedAt: blockNumber,
    });
  } else {
    account.value += value;
    account.updatedAt = blockNumber;
  }
  await account.save();
  return account;
}

export async function checkAndGetFarmerVoteAndBlockTotalCount(
  id: string,
  value: bigint,
  blockNumber: number,
  lastContributionAt: Date = new Date()
): Promise<FarmerVoteAndBlockTotalCount> {
  let account = await FarmerVoteAndBlockTotalCount.get(id);
  if (!account) {
    account = FarmerVoteAndBlockTotalCount.create({
      id,
      rank: 0,
      value,
      lastContributionAt,
      createdAt: blockNumber,
      updatedAt: blockNumber,
    });
  } else {
    account.value += value;
    account.updatedAt = blockNumber;
  }
  await account.save();
  return account;
}

export async function checkAndGetFarmerVoteAndBlockTotalValue(
  id: string,
  value: bigint,
  blockNumber: number,
  lastContributionAt: Date = new Date()
): Promise<FarmerVoteAndBlockTotalValue> {
  let account = await FarmerVoteAndBlockTotalValue.get(id);
  if (!account) {
    account = FarmerVoteAndBlockTotalValue.create({
      id,
      rank: 0,
      value,
      lastContributionAt,
      createdAt: blockNumber,
      updatedAt: blockNumber,
    });
  } else {
    account.value += value;
    account.updatedAt = blockNumber;
  }
  await account.save();
  return account;
}

// Operator entities
export async function checkAndGetOperatorTotalRewardsCollected(
  id: string,
  value: bigint,
  blockNumber: number,
  lastContributionAt: Date = new Date()
): Promise<OperatorTotalRewardsCollected> {
  let account = await OperatorTotalRewardsCollected.get(id);
  if (!account) {
    account = OperatorTotalRewardsCollected.create({
      id,
      rank: 0,
      value,
      lastContributionAt,
      createdAt: blockNumber,
      updatedAt: blockNumber,
    });
  } else {
    account.value += value;
    account.updatedAt = blockNumber;
  }
  await account.save();
  return account;
}

export async function checkAndGetOperatorTotalTaxCollected(
  id: string,
  value: bigint,
  blockNumber: number,
  lastContributionAt: Date = new Date()
): Promise<OperatorTotalTaxCollected> {
  let account = await OperatorTotalTaxCollected.get(id);
  if (!account) {
    account = OperatorTotalTaxCollected.create({
      id,
      rank: 0,
      value,
      lastContributionAt,
      createdAt: blockNumber,
      updatedAt: blockNumber,
    });
  } else {
    account.value += value;
    account.updatedAt = blockNumber;
  }
  await account.save();
  return account;
}

export async function checkAndGetOperatorBundleTotalCount(
  id: string,
  value: bigint,
  blockNumber: number,
  lastContributionAt: Date = new Date()
): Promise<OperatorBundleTotalCount> {
  let account = await OperatorBundleTotalCount.get(id);
  if (!account) {
    account = OperatorBundleTotalCount.create({
      id,
      rank: 0,
      value,
      lastContributionAt,
      createdAt: blockNumber,
      updatedAt: blockNumber,
    });
  } else {
    account.value += value;
    account.updatedAt = blockNumber;
  }
  await account.save();
  return account;
}

export async function checkAndGetOperatorDepositsTotalCount(
  id: string,
  value: bigint,
  blockNumber: number,
  lastContributionAt: Date = new Date()
): Promise<OperatorDepositsTotalCount> {
  let account = await OperatorDepositsTotalCount.get(id);
  if (!account) {
    account = OperatorDepositsTotalCount.create({
      id,
      rank: 0,
      value,
      lastContributionAt,
      createdAt: blockNumber,
      updatedAt: blockNumber,
    });
  } else {
    account.value += value;
    account.updatedAt = blockNumber;
  }
  await account.save();
  return account;
}

export async function checkAndGetOperatorDepositsTotalValue(
  id: string,
  value: bigint,
  blockNumber: number,
  lastContributionAt: Date = new Date()
): Promise<OperatorDepositsTotalValue> {
  let account = await OperatorDepositsTotalValue.get(id);
  if (!account) {
    account = OperatorDepositsTotalValue.create({
      id,
      rank: 0,
      value,
      lastContributionAt,
      createdAt: blockNumber,
      updatedAt: blockNumber,
    });
  } else {
    account.value += value;
    account.updatedAt = blockNumber;
  }
  await account.save();
  return account;
}

export async function checkAndGetOperatorWithdrawalsTotalCount(
  id: string,
  value: bigint,
  blockNumber: number,
  lastContributionAt: Date = new Date()
): Promise<OperatorWithdrawalsTotalCount> {
  let account = await OperatorWithdrawalsTotalCount.get(id);
  if (!account) {
    account = OperatorWithdrawalsTotalCount.create({
      id,
      rank: 0,
      value,
      lastContributionAt,
      createdAt: blockNumber,
      updatedAt: blockNumber,
    });
  } else {
    account.value += value;
    account.updatedAt = blockNumber;
  }
  await account.save();
  return account;
}

// Nominator entities
export async function checkAndGetNominatorDepositsTotalCount(
  id: string,
  value: bigint,
  blockNumber: number,
  lastContributionAt: Date = new Date()
): Promise<NominatorDepositsTotalCount> {
  let account = await NominatorDepositsTotalCount.get(id);
  if (!account) {
    account = NominatorDepositsTotalCount.create({
      id,
      rank: 0,
      value,
      lastContributionAt,
      createdAt: blockNumber,
      updatedAt: blockNumber,
    });
  } else {
    account.value += value;
    account.updatedAt = blockNumber;
  }
  await account.save();
  return account;
}

export async function checkAndGetNominatorDepositsTotalValue(
  id: string,
  value: bigint,
  blockNumber: number,
  lastContributionAt: Date = new Date()
): Promise<NominatorDepositsTotalValue> {
  let account = await NominatorDepositsTotalValue.get(id);
  if (!account) {
    account = NominatorDepositsTotalValue.create({
      id,
      rank: 0,
      value,
      lastContributionAt,
      createdAt: blockNumber,
      updatedAt: blockNumber,
    });
  } else {
    account.value += value;
    account.updatedAt = blockNumber;
  }
  await account.save();
  return account;
}

export async function checkAndGetNominatorWithdrawalsTotalCount(
  id: string,
  value: bigint,
  blockNumber: number,
  lastContributionAt: Date = new Date()
): Promise<NominatorWithdrawalsTotalCount> {
  let account = await NominatorWithdrawalsTotalCount.get(id);
  if (!account) {
    account = NominatorWithdrawalsTotalCount.create({
      id,
      rank: 0,
      value,
      lastContributionAt,
      createdAt: blockNumber,
      updatedAt: blockNumber,
    });
  } else {
    account.value += value;
    account.updatedAt = blockNumber;
  }
  await account.save();
  return account;
}
