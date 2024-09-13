import { SubstrateEvent } from "@subql/types";
import assert from "assert";
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

export async function handleTransferEvent(
  event: SubstrateEvent
): Promise<void> {
  logger.info(
    `New ${event.event.section}.${
      event.event.method
    } event found at block ${event.block.block.header.number.toString()}`
  );
  const {
    event: {
      data: [_from, _to, _amount],
    },
  } = event;
  const from = _from.toString();
  const to = _to.toString();
  const amount = BigInt(_amount.toString());
  const blockNumber = event.block.block.header.number.toNumber();
  const timestamp = new Date(Number(event.block.timestamp) * 1000);

  const accountTransferSenderTotalCount =
    await checkAndGetAccountTransferSenderTotalCount(from, blockNumber);
  accountTransferSenderTotalCount.value++;
  accountTransferSenderTotalCount.lastContributionAt = timestamp;
  accountTransferSenderTotalCount.updatedAt = blockNumber;

  const accountTransferSenderTotalValue =
    await checkAndGetAccountTransferSenderTotalValue(from, blockNumber);
  accountTransferSenderTotalValue.value += amount;
  accountTransferSenderTotalValue.lastContributionAt = timestamp;
  accountTransferSenderTotalValue.updatedAt = blockNumber;

  const accountTransferReceiverTotalCount =
    await checkAndGetAccountTransferReceiverTotalCount(to, blockNumber);
  accountTransferReceiverTotalCount.value++;
  accountTransferReceiverTotalCount.lastContributionAt = timestamp;
  accountTransferReceiverTotalCount.updatedAt = blockNumber;

  const accountTransferReceiverTotalValue =
    await checkAndGetAccountTransferReceiverTotalValue(to, blockNumber);
  accountTransferReceiverTotalValue.value += amount;

  await Promise.all([
    accountTransferSenderTotalCount.save(),
    accountTransferSenderTotalValue.save(),
    accountTransferReceiverTotalCount.save(),
    accountTransferReceiverTotalValue.save(),
  ]);
}

export async function handleRemarkEvent(event: SubstrateEvent): Promise<void> {
  logger.info(
    `New ${event.event.section}.${
      event.event.method
    } event found at block ${event.block.block.header.number.toString()}`
  );
  const {
    event: { index },
  } = event;

  const extrinsicIndex = Number(index);
  const extrinsic = event.block.block.extrinsics[extrinsicIndex];
  const accountId = extrinsic.signer;
  const blockNumber = event.block.block.header.number.toNumber();
  const timestamp = new Date(Number(event.block.timestamp) * 1000);

  const accountRemarkCount = await checkAndGetAccountRemarkCount(
    accountId.toString(),
    blockNumber
  );
  accountRemarkCount.value++;
  accountRemarkCount.lastContributionAt = timestamp;
  accountRemarkCount.updatedAt = blockNumber;

  await accountRemarkCount.save();
}

export async function handleExtrinsicSuccessEvent(
  event: SubstrateEvent
): Promise<void> {
  logger.info(
    `New ${event.event.section}.${
      event.event.method
    } event found at block ${event.block.block.header.number.toString()}`
  );
  const {
    event: { index },
  } = event;

  const extrinsicIndex = Number(index);
  const extrinsic = event.block.block.extrinsics[extrinsicIndex];
  const accountId = extrinsic.signer;
  const blockNumber = event.block.block.header.number.toNumber();
  const timestamp = new Date(Number(event.block.timestamp) * 1000);

  const accountExtrinsicTotalCount =
    await checkAndGetAccountExtrinsicTotalCount(
      accountId.toString(),
      blockNumber
    );
  accountExtrinsicTotalCount.value++;
  accountExtrinsicTotalCount.lastContributionAt = timestamp;
  accountExtrinsicTotalCount.updatedAt = blockNumber;

  const accountExtrinsicSuccessTotalCount =
    await checkAndGetAccountExtrinsicSuccessTotalCount(
      accountId.toString(),
      blockNumber
    );
  accountExtrinsicSuccessTotalCount.value++;
  accountExtrinsicSuccessTotalCount.lastContributionAt = timestamp;
  accountExtrinsicSuccessTotalCount.updatedAt = blockNumber;

  await Promise.all([
    accountExtrinsicTotalCount.save(),
    accountExtrinsicSuccessTotalCount.save(),
  ]);
}

export async function handleExtrinsicFailedEvent(
  event: SubstrateEvent
): Promise<void> {
  logger.info(
    `New ${event.event.section}.${
      event.event.method
    } event found at block ${event.block.block.header.number.toString()}`
  );
  const {
    event: { index },
  } = event;

  const extrinsicIndex = Number(index);
  const extrinsic = event.block.block.extrinsics[extrinsicIndex];
  const accountId = extrinsic.signer;
  const blockNumber = event.block.block.header.number.toNumber();
  const timestamp = new Date(Number(event.block.timestamp) * 1000);

  const accountExtrinsicTotalCount =
    await checkAndGetAccountExtrinsicTotalCount(
      accountId.toString(),
      blockNumber
    );
  accountExtrinsicTotalCount.value++;
  accountExtrinsicTotalCount.lastContributionAt = timestamp;
  accountExtrinsicTotalCount.updatedAt = blockNumber;

  const accountExtrinsicFailedTotalCount =
    await checkAndGetAccountExtrinsicFailedTotalCount(
      accountId.toString(),
      blockNumber
    );
  accountExtrinsicFailedTotalCount.value++;
  accountExtrinsicFailedTotalCount.lastContributionAt = timestamp;
  accountExtrinsicFailedTotalCount.updatedAt = blockNumber;

  await Promise.all([
    accountExtrinsicTotalCount.save(),
    accountExtrinsicFailedTotalCount.save(),
  ]);
}

export async function handleTransactionFeePaidEvent(
  event: SubstrateEvent
): Promise<void> {
  logger.info(
    `New ${event.event.section}.${
      event.event.method
    } event found at block ${event.block.block.header.number.toString()}`
  );
  const {
    event: {
      data: [_who, _actualFee, _tip],
    },
  } = event;
  const who = _who.toString();
  const actualFee = BigInt(_actualFee.toString());
  const tip = BigInt(_tip.toString());
  const totalFeePaid = actualFee + tip;
  const blockNumber = event.block.block.header.number.toNumber();
  const timestamp = new Date(Number(event.block.timestamp) * 1000);

  const accountTransactionFeePaidTotalValue =
    await checkAndGetAccountTransactionFeePaidTotalValue(who, blockNumber);
  accountTransactionFeePaidTotalValue.value += totalFeePaid;
  accountTransactionFeePaidTotalValue.lastContributionAt = timestamp;
  accountTransactionFeePaidTotalValue.updatedAt = blockNumber;

  await accountTransactionFeePaidTotalValue.save();
}

export async function handleFarmerVoteRewardEvent(
  event: SubstrateEvent
): Promise<void> {
  logger.info(
    `New ${event.event.section}.${
      event.event.method
    } event found at block ${event.block.block.header.number.toString()}`
  );
  const {
    event: {
      data: [_voter, _reward],
    },
  } = event;
  const voter = _voter.toString();
  const reward = BigInt(_reward.toString());
  const blockNumber = event.block.block.header.number.toNumber();
  const timestamp = new Date(Number(event.block.timestamp) * 1000);

  const farmerVoteTotalCount = await checkAndGetFarmerVoteTotalCount(
    voter,
    blockNumber
  );
  farmerVoteTotalCount.value++;
  farmerVoteTotalCount.lastContributionAt = timestamp;
  farmerVoteTotalCount.updatedAt = blockNumber;

  const farmerVoteTotalValue = await checkAndGetFarmerVoteTotalValue(
    voter,
    blockNumber
  );
  farmerVoteTotalValue.value += reward;
  farmerVoteTotalValue.lastContributionAt = timestamp;
  farmerVoteTotalValue.updatedAt = blockNumber;

  const farmerVoteAndBlockTotalCount =
    await checkAndGetFarmerVoteAndBlockTotalCount(voter, blockNumber);
  farmerVoteAndBlockTotalCount.value++;
  farmerVoteAndBlockTotalCount.lastContributionAt = timestamp;
  farmerVoteAndBlockTotalCount.updatedAt = blockNumber;

  const farmerVoteAndBlockTotalValue =
    await checkAndGetFarmerVoteAndBlockTotalValue(voter, blockNumber);
  farmerVoteAndBlockTotalValue.value += reward;
  farmerVoteAndBlockTotalValue.lastContributionAt = timestamp;
  farmerVoteAndBlockTotalValue.updatedAt = blockNumber;

  await Promise.all([
    farmerVoteTotalCount.save(),
    farmerVoteTotalValue.save(),
    farmerVoteAndBlockTotalCount.save(),
    farmerVoteAndBlockTotalValue.save(),
  ]);
}

export async function handleFarmerBlockRewardEvent(
  event: SubstrateEvent
): Promise<void> {
  logger.info(
    `New ${event.event.section}.${
      event.event.method
    } event found at block ${event.block.block.header.number.toString()}`
  );
  const {
    event: {
      data: [_blockAuthor, _reward],
    },
  } = event;
  const blockAuthor = _blockAuthor.toString();
  const reward = BigInt(_reward.toString());
  const blockNumber = event.block.block.header.number.toNumber();
  const timestamp = new Date(Number(event.block.timestamp) * 1000);

  const farmerBlockTotalCount = await checkAndGetFarmerBlockTotalCount(
    blockAuthor,
    blockNumber
  );
  farmerBlockTotalCount.value++;
  farmerBlockTotalCount.lastContributionAt = timestamp;
  farmerBlockTotalCount.updatedAt = blockNumber;

  const farmerBlockTotalValue = await checkAndGetFarmerBlockTotalValue(
    blockAuthor,
    blockNumber
  );
  farmerBlockTotalValue.value += reward;
  farmerBlockTotalValue.lastContributionAt = timestamp;
  farmerBlockTotalValue.updatedAt = blockNumber;

  const farmerBlockAndVoteTotalCount =
    await checkAndGetFarmerVoteAndBlockTotalCount(blockAuthor, blockNumber);
  farmerBlockAndVoteTotalCount.value++;
  farmerBlockAndVoteTotalCount.lastContributionAt = timestamp;
  farmerBlockAndVoteTotalCount.updatedAt = blockNumber;

  const farmerBlockAndVoteTotalValue =
    await checkAndGetFarmerVoteAndBlockTotalValue(blockAuthor, blockNumber);
  farmerBlockAndVoteTotalValue.value += reward;
  farmerBlockAndVoteTotalValue.lastContributionAt = timestamp;
  farmerBlockAndVoteTotalValue.updatedAt = blockNumber;

  await Promise.all([
    farmerBlockTotalCount.save(),
    farmerBlockTotalValue.save(),
    farmerBlockAndVoteTotalCount.save(),
    farmerBlockAndVoteTotalValue.save(),
  ]);
}

export async function handleOperatorRewardedEvent(
  event: SubstrateEvent
): Promise<void> {
  logger.info(
    `New ${event.event.section}.${
      event.event.method
    } event found at block ${event.block.block.header.number.toString()}`
  );
  const {
    event: {
      data: [_operatorId, _reward],
    },
  } = event;
  const operatorId = _operatorId.toString();
  const reward = BigInt(_reward.toString());
  const blockNumber = event.block.block.header.number.toNumber();
  const timestamp = new Date(Number(event.block.timestamp) * 1000);

  const operatorTotalRewardsCollected =
    await checkAndGetOperatorTotalRewardsCollected(operatorId, blockNumber);
  operatorTotalRewardsCollected.value += reward;
  operatorTotalRewardsCollected.lastContributionAt = timestamp;
  operatorTotalRewardsCollected.updatedAt = blockNumber;

  await operatorTotalRewardsCollected.save();
}

export async function handleOperatorTaxCollectedEvent(
  event: SubstrateEvent
): Promise<void> {
  logger.info(
    `New ${event.event.section}.${
      event.event.method
    } event found at block ${event.block.block.header.number.toString()}`
  );
  const {
    event: {
      data: [_operatorId, _tax],
    },
  } = event;
  const operatorId = _operatorId.toString();
  const tax = BigInt(_tax.toString());
  const blockNumber = event.block.block.header.number.toNumber();
  const timestamp = new Date(Number(event.block.timestamp) * 1000);

  const operatorTotalTaxCollected = await checkAndGetOperatorTotalTaxCollected(
    operatorId,
    blockNumber
  );
  operatorTotalTaxCollected.value += tax;
  operatorTotalTaxCollected.lastContributionAt = timestamp;
  operatorTotalTaxCollected.updatedAt = blockNumber;

  await operatorTotalTaxCollected.save();
}

export async function handleBundleStoredEvent(
  event: SubstrateEvent
): Promise<void> {
  logger.info(
    `New ${event.event.section}.${
      event.event.method
    } event found at block ${event.block.block.header.number.toString()}`
  );
  const {
    event: {
      data: [_bundleAuthor],
    },
  } = event;
  const bundleAuthor = _bundleAuthor.toString();
  const blockNumber = event.block.block.header.number.toNumber();
  const timestamp = new Date(Number(event.block.timestamp) * 1000);

  const operatorBundleTotalCount = await checkAndGetOperatorBundleTotalCount(
    bundleAuthor,
    blockNumber
  );
  operatorBundleTotalCount.value++;
  operatorBundleTotalCount.lastContributionAt = timestamp;
  operatorBundleTotalCount.updatedAt = blockNumber;

  await operatorBundleTotalCount.save();
}

export async function handleOperatorRegisteredEvent(
  event: SubstrateEvent
): Promise<void> {
  logger.info(
    `New ${event.event.section}.${
      event.event.method
    } event found at block ${event.block.block.header.number.toString()}`
  );
  const {
    event: {
      data: [_operatorId],
    },
  } = event;
  const operatorId = _operatorId.toString();
  const blockNumber = event.block.block.header.number.toNumber();
  const timestamp = new Date(Number(event.block.timestamp) * 1000);

  const operatorTotalRewardsCollected =
    await checkAndGetOperatorTotalRewardsCollected(operatorId, blockNumber);
  operatorTotalRewardsCollected.value++;
  operatorTotalRewardsCollected.lastContributionAt = timestamp;
  operatorTotalRewardsCollected.updatedAt = blockNumber;

  await operatorTotalRewardsCollected.save();
}

export async function handleOperatorNominatedEvent(
  event: SubstrateEvent
): Promise<void> {
  logger.info(
    `New ${event.event.section}.${
      event.event.method
    } event found at block ${event.block.block.header.number.toString()}`
  );
  const {
    event: {
      data: [_operatorId, _nominatorId, _amount],
    },
  } = event;
  const operatorId = _operatorId.toString();
  const nominatorId = _nominatorId.toString();
  const amount = BigInt(_amount.toString());
  const blockNumber = event.block.block.header.number.toNumber();
  const timestamp = new Date(Number(event.block.timestamp) * 1000);

  const operatorDepositsTotalCount =
    await checkAndGetOperatorDepositsTotalCount(operatorId, blockNumber);
  operatorDepositsTotalCount.value++;
  operatorDepositsTotalCount.lastContributionAt = timestamp;
  operatorDepositsTotalCount.updatedAt = blockNumber;

  const operatorDepositsTotalValue =
    await checkAndGetOperatorDepositsTotalValue(operatorId, blockNumber);
  operatorDepositsTotalValue.value += amount;
  operatorDepositsTotalValue.lastContributionAt = timestamp;
  operatorDepositsTotalValue.updatedAt = blockNumber;

  const nominatorDepositsTotalCount =
    await checkAndGetNominatorDepositsTotalCount(nominatorId, blockNumber);
  nominatorDepositsTotalCount.value++;
  nominatorDepositsTotalCount.lastContributionAt = timestamp;
  nominatorDepositsTotalCount.updatedAt = blockNumber;

  const nominatorDepositsTotalValue =
    await checkAndGetNominatorDepositsTotalValue(nominatorId, blockNumber);
  nominatorDepositsTotalValue.value += amount;
  nominatorDepositsTotalValue.lastContributionAt = timestamp;
  nominatorDepositsTotalValue.updatedAt = blockNumber;

  await Promise.all([
    operatorDepositsTotalCount.save(),
    operatorDepositsTotalValue.save(),
    nominatorDepositsTotalCount.save(),
    nominatorDepositsTotalValue.save(),
  ]);
}

export async function handleWithdrewStakeEvent(
  event: SubstrateEvent
): Promise<void> {
  logger.info(
    `New ${event.event.section}.${
      event.event.method
    } event found at block ${event.block.block.header.number.toString()}`
  );
  const {
    event: {
      data: [_operatorId, _nominatorId],
    },
  } = event;
  const operatorId = _operatorId.toString();
  const nominatorId = _nominatorId.toString();
  const blockNumber = event.block.block.header.number.toNumber();
  const timestamp = new Date(Number(event.block.timestamp) * 1000);

  const operatorWithdrawalsTotalCount =
    await checkAndGetOperatorWithdrawalsTotalCount(operatorId, blockNumber);
  operatorWithdrawalsTotalCount.value++;
  operatorWithdrawalsTotalCount.lastContributionAt = timestamp;
  operatorWithdrawalsTotalCount.updatedAt = blockNumber;

  const nominatorWithdrawalsTotalCount =
    await checkAndGetNominatorWithdrawalsTotalCount(nominatorId, blockNumber);
  nominatorWithdrawalsTotalCount.value++;
  nominatorWithdrawalsTotalCount.lastContributionAt = timestamp;
  nominatorWithdrawalsTotalCount.updatedAt = blockNumber;

  await Promise.all([
    operatorWithdrawalsTotalCount.save(),
    nominatorWithdrawalsTotalCount.save(),
  ]);
}

async function checkAndGetAccountTransferSenderTotalCount(
  id: string,
  blockNumber: number,
  lastContributionAt: Date = new Date()
): Promise<AccountTransferSenderTotalCount> {
  let account = await AccountTransferSenderTotalCount.get(id.toLowerCase());
  if (!account) {
    // We couldn't find the account
    account = AccountTransferSenderTotalCount.create({
      id: id.toLowerCase(),
      rank: 0,
      value: 0,
      lastContributionAt,
      createdAt: blockNumber,
      updatedAt: blockNumber,
    });
  }
  return account;
}

async function checkAndGetAccountTransferSenderTotalValue(
  id: string,
  blockNumber: number,
  lastContributionAt: Date = new Date()
): Promise<AccountTransferSenderTotalValue> {
  let account = await AccountTransferSenderTotalValue.get(id.toLowerCase());
  if (!account) {
    account = AccountTransferSenderTotalValue.create({
      id: id.toLowerCase(),
      rank: 0,
      value: BigInt(0),
      lastContributionAt,
      createdAt: blockNumber,
      updatedAt: blockNumber,
    });
  }
  return account;
}

async function checkAndGetAccountTransferReceiverTotalCount(
  id: string,
  blockNumber: number,
  lastContributionAt: Date = new Date()
): Promise<AccountTransferReceiverTotalCount> {
  let account = await AccountTransferReceiverTotalCount.get(id.toLowerCase());
  if (!account) {
    account = AccountTransferReceiverTotalCount.create({
      id: id.toLowerCase(),
      rank: 0,
      value: 0,
      lastContributionAt,
      createdAt: blockNumber,
      updatedAt: blockNumber,
    });
  }
  return account;
}

async function checkAndGetAccountTransferReceiverTotalValue(
  id: string,
  blockNumber: number,
  lastContributionAt: Date = new Date()
): Promise<AccountTransferReceiverTotalValue> {
  let account = await AccountTransferReceiverTotalValue.get(id.toLowerCase());
  if (!account) {
    account = AccountTransferReceiverTotalValue.create({
      id: id.toLowerCase(),
      rank: 0,
      value: BigInt(0),
      lastContributionAt,
      createdAt: blockNumber,
      updatedAt: blockNumber,
    });
  }
  return account;
}

async function checkAndGetAccountRemarkCount(
  id: string,
  blockNumber: number,
  lastContributionAt: Date = new Date()
): Promise<AccountRemarkCount> {
  let account = await AccountRemarkCount.get(id.toLowerCase());
  if (!account) {
    account = AccountRemarkCount.create({
      id: id.toLowerCase(),
      rank: 0,
      value: 0,
      lastContributionAt,
      createdAt: blockNumber,
      updatedAt: blockNumber,
    });
  }
  return account;
}

async function checkAndGetAccountExtrinsicTotalCount(
  id: string,
  blockNumber: number,
  lastContributionAt: Date = new Date()
): Promise<AccountExtrinsicTotalCount> {
  let account = await AccountExtrinsicTotalCount.get(id.toLowerCase());
  if (!account) {
    account = AccountExtrinsicTotalCount.create({
      id: id.toLowerCase(),
      rank: 0,
      value: 0,
      lastContributionAt,
      createdAt: blockNumber,
      updatedAt: blockNumber,
    });
  }
  return account;
}

async function checkAndGetAccountExtrinsicSuccessTotalCount(
  id: string,
  blockNumber: number,
  lastContributionAt: Date = new Date()
): Promise<AccountExtrinsicSuccessTotalCount> {
  let account = await AccountExtrinsicSuccessTotalCount.get(id.toLowerCase());
  if (!account) {
    account = AccountExtrinsicSuccessTotalCount.create({
      id: id.toLowerCase(),
      rank: 0,
      value: 0,
      lastContributionAt,
      createdAt: blockNumber,
      updatedAt: blockNumber,
    });
  }
  return account;
}

async function checkAndGetAccountExtrinsicFailedTotalCount(
  id: string,
  blockNumber: number,
  lastContributionAt: Date = new Date()
): Promise<AccountExtrinsicFailedTotalCount> {
  let account = await AccountExtrinsicFailedTotalCount.get(id.toLowerCase());
  if (!account) {
    account = AccountExtrinsicFailedTotalCount.create({
      id: id.toLowerCase(),
      rank: 0,
      value: 0,
      lastContributionAt,
      createdAt: blockNumber,
      updatedAt: blockNumber,
    });
  }
  return account;
}

async function checkAndGetAccountTransactionFeePaidTotalValue(
  id: string,
  blockNumber: number,
  lastContributionAt: Date = new Date()
): Promise<AccountTransactionFeePaidTotalValue> {
  let account = await AccountTransactionFeePaidTotalValue.get(id.toLowerCase());
  if (!account) {
    account = AccountTransactionFeePaidTotalValue.create({
      id: id.toLowerCase(),
      rank: 0,
      value: BigInt(0),
      lastContributionAt,
      createdAt: blockNumber,
      updatedAt: blockNumber,
    });
  }
  return account;
}

// Farmer entities
async function checkAndGetFarmerVoteTotalCount(
  id: string,
  blockNumber: number,
  lastContributionAt: Date = new Date()
): Promise<FarmerVoteTotalCount> {
  let account = await FarmerVoteTotalCount.get(id.toLowerCase());
  if (!account) {
    account = FarmerVoteTotalCount.create({
      id: id.toLowerCase(),
      rank: 0,
      value: 0,
      lastContributionAt,
      createdAt: blockNumber,
      updatedAt: blockNumber,
    });
  }
  return account;
}

async function checkAndGetFarmerVoteTotalValue(
  id: string,
  blockNumber: number,
  lastContributionAt: Date = new Date()
): Promise<FarmerVoteTotalValue> {
  let account = await FarmerVoteTotalValue.get(id.toLowerCase());
  if (!account) {
    account = FarmerVoteTotalValue.create({
      id: id.toLowerCase(),
      rank: 0,
      value: BigInt(0),
      lastContributionAt,
      createdAt: blockNumber,
      updatedAt: blockNumber,
    });
  }
  return account;
}

async function checkAndGetFarmerBlockTotalCount(
  id: string,
  blockNumber: number,
  lastContributionAt: Date = new Date()
): Promise<FarmerBlockTotalCount> {
  let account = await FarmerBlockTotalCount.get(id.toLowerCase());
  if (!account) {
    account = FarmerBlockTotalCount.create({
      id: id.toLowerCase(),
      rank: 0,
      value: 0,
      lastContributionAt,
      createdAt: blockNumber,
      updatedAt: blockNumber,
    });
  }
  return account;
}

async function checkAndGetFarmerBlockTotalValue(
  id: string,
  blockNumber: number,
  lastContributionAt: Date = new Date()
): Promise<FarmerBlockTotalValue> {
  let account = await FarmerBlockTotalValue.get(id.toLowerCase());
  if (!account) {
    account = FarmerBlockTotalValue.create({
      id: id.toLowerCase(),
      rank: 0,
      value: BigInt(0),
      lastContributionAt,
      createdAt: blockNumber,
      updatedAt: blockNumber,
    });
  }
  return account;
}

async function checkAndGetFarmerVoteAndBlockTotalCount(
  id: string,
  blockNumber: number,
  lastContributionAt: Date = new Date()
): Promise<FarmerVoteAndBlockTotalCount> {
  let account = await FarmerVoteAndBlockTotalCount.get(id.toLowerCase());
  if (!account) {
    account = FarmerVoteAndBlockTotalCount.create({
      id: id.toLowerCase(),
      rank: 0,
      value: 0,
      lastContributionAt,
      createdAt: blockNumber,
      updatedAt: blockNumber,
    });
  }
  return account;
}

async function checkAndGetFarmerVoteAndBlockTotalValue(
  id: string,
  blockNumber: number,
  lastContributionAt: Date = new Date()
): Promise<FarmerVoteAndBlockTotalValue> {
  let account = await FarmerVoteAndBlockTotalValue.get(id.toLowerCase());
  if (!account) {
    account = FarmerVoteAndBlockTotalValue.create({
      id: id.toLowerCase(),
      rank: 0,
      value: BigInt(0),
      lastContributionAt,
      createdAt: blockNumber,
      updatedAt: blockNumber,
    });
  }
  return account;
}

// Operator entities
async function checkAndGetOperatorTotalRewardsCollected(
  id: string,
  blockNumber: number,
  lastContributionAt: Date = new Date()
): Promise<OperatorTotalRewardsCollected> {
  let account = await OperatorTotalRewardsCollected.get(id.toLowerCase());
  if (!account) {
    account = OperatorTotalRewardsCollected.create({
      id: id.toLowerCase(),
      rank: 0,
      value: BigInt(0),
      lastContributionAt,
      createdAt: blockNumber,
      updatedAt: blockNumber,
    });
  }
  return account;
}

async function checkAndGetOperatorTotalTaxCollected(
  id: string,
  blockNumber: number,
  lastContributionAt: Date = new Date()
): Promise<OperatorTotalTaxCollected> {
  let account = await OperatorTotalTaxCollected.get(id.toLowerCase());
  if (!account) {
    account = OperatorTotalTaxCollected.create({
      id: id.toLowerCase(),
      rank: 0,
      value: BigInt(0),
      lastContributionAt,
      createdAt: blockNumber,
      updatedAt: blockNumber,
    });
  }
  return account;
}

async function checkAndGetOperatorBundleTotalCount(
  id: string,
  blockNumber: number,
  lastContributionAt: Date = new Date()
): Promise<OperatorBundleTotalCount> {
  let account = await OperatorBundleTotalCount.get(id.toLowerCase());
  if (!account) {
    account = OperatorBundleTotalCount.create({
      id: id.toLowerCase(),
      rank: 0,
      value: 0,
      lastContributionAt,
      createdAt: blockNumber,
      updatedAt: blockNumber,
    });
  }
  return account;
}

async function checkAndGetOperatorDepositsTotalCount(
  id: string,
  blockNumber: number,
  lastContributionAt: Date = new Date()
): Promise<OperatorDepositsTotalCount> {
  let account = await OperatorDepositsTotalCount.get(id.toLowerCase());
  if (!account) {
    account = OperatorDepositsTotalCount.create({
      id: id.toLowerCase(),
      rank: 0,
      value: 0,
      lastContributionAt,
      createdAt: blockNumber,
      updatedAt: blockNumber,
    });
  }
  return account;
}

async function checkAndGetOperatorDepositsTotalValue(
  id: string,
  blockNumber: number,
  lastContributionAt: Date = new Date()
): Promise<OperatorDepositsTotalValue> {
  let account = await OperatorDepositsTotalValue.get(id.toLowerCase());
  if (!account) {
    account = OperatorDepositsTotalValue.create({
      id: id.toLowerCase(),
      rank: 0,
      value: BigInt(0),
      lastContributionAt,
      createdAt: blockNumber,
      updatedAt: blockNumber,
    });
  }
  return account;
}

async function checkAndGetOperatorWithdrawalsTotalCount(
  id: string,
  blockNumber: number,
  lastContributionAt: Date = new Date()
): Promise<OperatorWithdrawalsTotalCount> {
  let account = await OperatorWithdrawalsTotalCount.get(id.toLowerCase());
  if (!account) {
    account = OperatorWithdrawalsTotalCount.create({
      id: id.toLowerCase(),
      rank: 0,
      value: 0,
      lastContributionAt,
      createdAt: blockNumber,
      updatedAt: blockNumber,
    });
  }
  return account;
}

// Nominator entities
async function checkAndGetNominatorDepositsTotalCount(
  id: string,
  blockNumber: number,
  lastContributionAt: Date = new Date()
): Promise<NominatorDepositsTotalCount> {
  let account = await NominatorDepositsTotalCount.get(id.toLowerCase());
  if (!account) {
    account = NominatorDepositsTotalCount.create({
      id: id.toLowerCase(),
      rank: 0,
      value: 0,
      lastContributionAt,
      createdAt: blockNumber,
      updatedAt: blockNumber,
    });
  }
  return account;
}

async function checkAndGetNominatorDepositsTotalValue(
  id: string,
  blockNumber: number,
  lastContributionAt: Date = new Date()
): Promise<NominatorDepositsTotalValue> {
  let account = await NominatorDepositsTotalValue.get(id.toLowerCase());
  if (!account) {
    account = NominatorDepositsTotalValue.create({
      id: id.toLowerCase(),
      rank: 0,
      value: BigInt(0),
      lastContributionAt,
      createdAt: blockNumber,
      updatedAt: blockNumber,
    });
  }
  return account;
}

async function checkAndGetNominatorWithdrawalsTotalCount(
  id: string,
  blockNumber: number,
  lastContributionAt: Date = new Date()
): Promise<NominatorWithdrawalsTotalCount> {
  let account = await NominatorWithdrawalsTotalCount.get(id.toLowerCase());
  if (!account) {
    account = NominatorWithdrawalsTotalCount.create({
      id: id.toLowerCase(),
      rank: 0,
      value: 0,
      lastContributionAt,
      createdAt: blockNumber,
      updatedAt: blockNumber,
    });
  }
  return account;
}
