import { SubstrateEvent, SubstrateExtrinsic } from "@subql/types";
import assert from "assert";
import { Deposit, Nominator, Withdrawal } from "../types";
import * as db from "./db";
import {
  DepositStatus,
  NominatorPendingAction,
  NominatorStatus,
  OperatorPendingAction,
  OperatorStatus,
  WithdrawalStatus,
} from "./models";

export const SHARES_CALCULATION_MULTIPLIER = BigInt(1000000000000);

export async function handleRegisterOperatorCall(
  extrinsic: SubstrateExtrinsic
): Promise<void> {
  logger.info(
    `New ${extrinsic.extrinsic.registry.toString()}.${
      extrinsic.extrinsic.method
    } extrinsic found at block ${extrinsic.block.block.header.number.toString()}`
  );
  const {
    block: {
      timestamp,
      block: {
        header: { number },
      },
    },
    extrinsic: {
      method: { args },
      signer,
    },
    events,
  } = extrinsic;
  const domainId = String(args[0]);
  const amount = BigInt(args[1].toString());
  const { signingKey, minimumNominatorStake, nominationTax } =
    (args[2] as any) ?? {};

  const opRegistered = events.find(
    (e) => e.event.method.toString() === "OperatorRegistered"
  );
  const storageFee = events.find(
    (e) => e.event.method.toString() === "StorageFeeDeposited"
  );
  if (!opRegistered || !storageFee) {
    logger.info(`No operatorRegisteredEvent or storageFeeDepositedEvent found`);
    return;
  }

  const operatorId = String(opRegistered?.event.data[0]);
  const domainId_storageFee = String(opRegistered.event.data[1]);
  const operatorId_storageFee = String(storageFee.event.data[0]);
  const nominatorId_storageFee = String(storageFee.event.data[1]);
  const amount_storageFee = BigInt(storageFee.event.data[2].toString());

  assert(domainId === domainId_storageFee, "domainId mismatch");
  assert(operatorId === operatorId_storageFee, "operatorId mismatch");
  assert(signer.toString() === nominatorId_storageFee, "signer mismatch");
  assert(
    amount_storageFee === (BigInt(amount) * BigInt(20)) / BigInt(100),
    `Storage fee (${amount_storageFee}) should be 20% of the amount (${amount})`
  );

  const domain = await db.checkAndGetDomain(domainId, number.toNumber());
  domain.totalDeposits += amount;
  domain.updatedAt = number.toNumber();

  const account = await db.checkAndGetAccount(
    signer.toString(),
    number.toNumber()
  );
  account.totalDeposits += amount;
  account.updatedAt = number.toNumber();

  const operator = await db.checkAndGetOperator(operatorId, number.toNumber());
  operator.domainId = domain.id;
  operator.accountId = account.id;
  operator.signingKey = String(signingKey);
  operator.minimumNominatorStake = BigInt(minimumNominatorStake);
  operator.nominationTax = Number(nominationTax);
  operator.totalDeposits += amount;
  operator.pendingAction = OperatorPendingAction.PENDING_REGISTRATION;
  operator.updatedAt = number.toNumber();

  const nominator = await db.checkAndGetNominator(
    signer.toString(),
    domain.id,
    operator.id,
    number.toNumber()
  );
  nominator.totalDeposits += amount;
  nominator.pendingAction = NominatorPendingAction.PENDING_EPOCH_CHANGE;
  nominator.updatedAt = number.toNumber();

  const deposit = await db.checkAndGetDeposit(
    signer.toString(),
    domain.id,
    operator.id,
    amount - amount_storageFee,
    amount_storageFee,
    number.toNumber()
  );
  deposit.epochDepositedAt = domain.completedEpoch ?? 0;
  deposit.domainBlockNumberDepositedAt = domain.lastDomainBlockNumber ?? 0;

  await Promise.all([
    domain.save(),
    account.save(),
    operator.save(),
    nominator.save(),
    deposit.save(),
  ]);
}

export async function handleNominateOperatorCall(
  extrinsic: SubstrateExtrinsic
): Promise<void> {
  const {
    events,
    extrinsic: {
      method: { args },
    },
  } = extrinsic;
  const operatorId = String(args[0]);
  const amount = BigInt(args[1].toString());
  const blockNumber = extrinsic.block.block.header.number.toNumber();
  const signer = extrinsic.extrinsic.signer.toString();

  const storageFeeDepositedEvent = events.find(
    (e) => e.event.method.toString() === "StorageFeeDeposited"
  );
  const operatorNominatedEvent = events.find(
    (e) => e.event.method.toString() === "OperatorNominated"
  );

  const storageFeeDeposit = BigInt(
    storageFeeDepositedEvent?.event.data[2].toString() ?? 0
  );
  const totalAmount = amount + storageFeeDeposit;

  const account = await db.checkAndGetAccount(signer, blockNumber);
  const operator = await db.checkAndGetOperator(operatorId, blockNumber);
  const domain = await db.checkAndGetDomain(operator.domainId, blockNumber);

  const nominator = await db.checkAndGetNominator(
    signer,
    domain.id,
    operator.id,
    blockNumber
  );

  const deposit = await db.checkAndGetDeposit(
    signer,
    domain.id,
    operator.id,
    amount,
    storageFeeDeposit,
    blockNumber
  );
  deposit.epochDepositedAt = domain.completedEpoch ?? 0;
  deposit.domainBlockNumberDepositedAt = domain.lastDomainBlockNumber ?? 0;

  operator.totalDeposits += totalAmount;
  operator.updatedAt = blockNumber;

  if (nominator.totalDepositsCount === 0) {
    nominator.pendingAction = NominatorPendingAction.PENDING_EPOCH_CHANGE;
  }
  nominator.totalDeposits += totalAmount;
  nominator.totalDepositsCount++;
  nominator.updatedAt = blockNumber;

  domain.totalDeposits += totalAmount;
  domain.updatedAt = blockNumber;

  account.totalDeposits += totalAmount;
  account.updatedAt = blockNumber;

  await Promise.all([
    domain.save(),
    account.save(),
    operator.save(),
    nominator.save(),
    deposit.save(),
  ]);
}

export async function handleDeregisterOperatorCall(
  extrinsic: SubstrateExtrinsic
): Promise<void> {
  logger.info(
    `New ${extrinsic.extrinsic.registry.toString()}.${
      extrinsic.extrinsic.method
    } extrinsic found at block ${extrinsic.block.block.header.number.toString()}`
  );
  const blockNumber = extrinsic.block.block.header.number.toNumber();
  const {
    events,
    extrinsic: {
      method: { args },
    },
  } = extrinsic;
  const operatorId = String(args[0]);

  const opDeregistered = events.find(
    (e) => e.event.method.toString() === "OperatorDeregistered"
  );
  if (!opDeregistered) {
    logger.info(`No operatorDeregisteredEvent found`);
    return;
  }

  const operator = await db.checkAndGetOperator(operatorId, blockNumber);
  operator.currentTotalStake = BigInt(0);
  operator.currentStorageFeeDeposit = BigInt(0);
  operator.status = OperatorStatus.DEREGISTERED;
  operator.updatedAt = blockNumber;

  const domain = await db.checkAndGetDomain(operator.domainId, blockNumber);
  const account = await db.checkAndGetAccount(operator.accountId, blockNumber);

  const nominators = await Nominator.getByOperatorId(operator.id);
  const activeNominators =
    nominators &&
    nominators.filter(
      (n) =>
        n.status === NominatorStatus.STAKED ||
        n.status === NominatorStatus.PENDING
    );
  if (activeNominators) {
    activeNominators.forEach(async (n) => {
      const estimatedAmount =
        (operator.currentSharePrice * n.knownShares) /
        SHARES_CALCULATION_MULTIPLIER;
      const withdrawal = await db.checkAndGetWithdrawal(
        account.id,
        domain.id,
        operator.id,
        n.id,
        blockNumber
      );

      n.status = NominatorStatus.PENDING;
      n.pendingAction = NominatorPendingAction.PENDING_LOCK_PERIOD;
      n.totalWithdrawalsCount++;
      n.totalEstimatedWithdrawals += estimatedAmount;
      n.updatedAt = blockNumber;

      operator.totalEstimatedWithdrawals += estimatedAmount;
      account.totalEstimatedWithdrawals += estimatedAmount;
      domain.totalEstimatedWithdrawals += estimatedAmount;

      await Promise.all([n.save(), withdrawal.save()]);
    });
  }
  await Promise.all([operator.save(), domain.save(), account.save()]);
}

export async function handleOperatorSlashedEvent(
  event: SubstrateEvent
): Promise<void> {
  const blockNumber = event.block.block.header.number.toNumber();
  const operatorId = event.event.data[0].toString();

  // Query operator details
  const operator = await db.checkAndGetOperator(operatorId, blockNumber);
  operator.currentTotalStake = BigInt(0);
  operator.currentStorageFeeDeposit = BigInt(0);
  operator.status = OperatorStatus.SLASHED;
  operator.updatedAt = blockNumber;

  // Fetch nominators associated with the operator
  const nominators = await Nominator.getByOperatorId(operator.id);
  if (nominators) {
    nominators.forEach(async (nominator) => {
      nominator.status = NominatorStatus.SLASHED;
      nominator.pendingAction = NominatorPendingAction.NO_ACTION_REQUIRED;
      nominator.updatedAt = blockNumber;
      await nominator.save();
    });
  }

  // Fetch withdrawals associated with the operator
  const withdrawals = await Withdrawal.getByOperatorId(operator.id);
  if (withdrawals) {
    withdrawals.forEach(async (withdrawal) => {
      if (
        withdrawal.status === WithdrawalStatus.PENDING_LOCK ||
        withdrawal.status === WithdrawalStatus.PENDING_OPERATOR ||
        withdrawal.status === WithdrawalStatus.READY
      ) {
        withdrawal.status = WithdrawalStatus.SLASHED;
        withdrawal.updatedAt = blockNumber;
        await withdrawal.save();
      }
    });
  }

  // Save operator changes
  await operator.save();
}

export async function handleOperatorTaxCollectedEvent(
  event: SubstrateEvent
): Promise<void> {
  const {
    event: {
      data: [operatorId, tax],
    },
    block,
  } = event;
  const blockNumber = block.block.header.number.toNumber();
  const taxAmount = BigInt(tax.toString());

  const operator = await db.checkAndGetOperator(
    operatorId.toString(),
    blockNumber
  );
  const account = await db.checkAndGetAccount(operator.accountId, blockNumber);
  const domain = await db.checkAndGetDomain(operator.domainId, blockNumber);

  operator.totalTaxCollected += taxAmount;
  operator.updatedAt = blockNumber;

  account.totalTaxCollected += taxAmount;
  account.updatedAt = blockNumber;

  domain.totalTaxCollected += taxAmount;
  domain.updatedAt = blockNumber;

  await Promise.all([operator.save(), account.save(), domain.save()]);
}

export async function handleOperatorRewardedEvent(
  event: SubstrateEvent
): Promise<void> {
  const {
    event: {
      data: [operatorId, reward],
    },
    block,
  } = event;
  const amount = BigInt(reward.toString());

  const operator = await db.checkAndGetOperator(
    operatorId.toString(),
    block.block.header.number.toNumber()
  );
  const domain = await db.checkAndGetDomain(
    operator.domainId,
    block.block.header.number.toNumber()
  );

  operator.totalRewardsCollected += amount;
  domain.totalRewardsCollected += amount;

  const rewardEvent = await db.checkAndGetReward(
    `${operatorId}-${block.block.header.number.toNumber()}`,
    block.block.header.number.toNumber()
  );
  rewardEvent.amount = amount;
  rewardEvent.domainId = operator.domainId;
  rewardEvent.operatorId = operator.id;
  rewardEvent.timestamp = new Date(block.timestamp ?? 0);

  await Promise.all([operator.save(), domain.save(), rewardEvent.save()]);
}

export async function handleWithdrawStakeCall(
  extrinsic: SubstrateExtrinsic
): Promise<void> {
  const {
    extrinsic: {
      method: { args },
    },
  } = extrinsic;
  const operatorId = args[0].toString();
  const shares = args[1].toString();
  const address = extrinsic.extrinsic.signer.toString();
  const blockNumber = extrinsic.block.block.header.number.toNumber();
  const sharesBigInt = BigInt(shares.toString());

  const account = await db.checkAndGetAccount(address, blockNumber);
  const operator = await db.checkAndGetOperator(
    operatorId.toString(),
    blockNumber
  );
  const domain = await db.checkAndGetDomain(operator.domainId, blockNumber);
  const nominator = await db.checkAndGetNominator(
    address,
    domain.id,
    operator.id,
    blockNumber
  );

  const estimatedAmount =
    (operator.currentSharePrice * sharesBigInt) / SHARES_CALCULATION_MULTIPLIER;
  const withdrawal = await db.checkAndGetWithdrawal(
    account.id,
    domain.id,
    operator.id,
    nominator.id,
    blockNumber
  );

  withdrawal.domainId = domain.id;
  withdrawal.accountId = account.id;
  withdrawal.operatorId = operator.id;
  withdrawal.nominatorId = nominator.id;
  withdrawal.shares = sharesBigInt;
  withdrawal.estimatedAmount = estimatedAmount;
  withdrawal.epochWithdrawalRequestedAt = domain.completedEpoch ?? 0;
  withdrawal.domainBlockNumberWithdrawalRequestedAt =
    domain.lastDomainBlockNumber ?? 0;
  withdrawal.status = WithdrawalStatus.PENDING_LOCK;
  withdrawal.createdAt = blockNumber;
  withdrawal.updatedAt = blockNumber;

  nominator.totalWithdrawalsCount++;
  nominator.totalEstimatedWithdrawals += estimatedAmount;
  nominator.pendingAction = NominatorPendingAction.PENDING_LOCK_PERIOD;
  nominator.updatedAt = blockNumber;

  operator.totalEstimatedWithdrawals += estimatedAmount;
  operator.updatedAt = blockNumber;

  account.totalEstimatedWithdrawals += estimatedAmount;
  account.updatedAt = blockNumber;

  domain.totalEstimatedWithdrawals += estimatedAmount;
  domain.updatedAt = blockNumber;

  await Promise.all([
    withdrawal.save(),
    nominator.save(),
    operator.save(),
    account.save(),
    domain.save(),
  ]);
}

export async function handleUnlockFundsCall(
  extrinsic: SubstrateExtrinsic
): Promise<void> {
  const blockNumber = extrinsic.block.block.header.number.toNumber();
  const signer = extrinsic.extrinsic.signer.toString();
  const [operatorId, shares] = extrinsic.extrinsic.method.args;

  // Query operator details
  const operator = await db.checkAndGetOperator(
    operatorId.toString(),
    blockNumber
  );

  // Calculate estimated amount
  const sharesBigInt = BigInt(shares.toString());
  const estimatedAmount =
    (operator.currentSharePrice * sharesBigInt) / SHARES_CALCULATION_MULTIPLIER;

  // Fetch or create Withdrawal entity
  const withdrawal = await db.checkAndGetWithdrawal(
    signer,
    operator.domainId,
    operator.id,
    signer,
    blockNumber
  );

  withdrawal.shares = sharesBigInt;
  withdrawal.estimatedAmount = estimatedAmount;
  withdrawal.status = WithdrawalStatus.PENDING_LOCK;
  withdrawal.createdAt = blockNumber;
  withdrawal.updatedAt = blockNumber;

  // Update related entities
  const account = await db.checkAndGetAccount(signer, blockNumber);
  const domain = await db.checkAndGetDomain(operator.domainId, blockNumber);
  const nominator = await db.checkAndGetNominator(
    signer,
    domain.id,
    operator.id,
    blockNumber
  );

  nominator.totalWithdrawalsCount++;
  nominator.totalEstimatedWithdrawals += estimatedAmount;
  nominator.pendingAction = NominatorPendingAction.PENDING_LOCK_PERIOD;
  nominator.updatedAt = blockNumber;

  operator.totalEstimatedWithdrawals += estimatedAmount;
  operator.updatedAt = blockNumber;

  account.totalEstimatedWithdrawals += estimatedAmount;
  account.updatedAt = blockNumber;

  domain.totalEstimatedWithdrawals += estimatedAmount;
  domain.updatedAt = blockNumber;

  // Save all changes
  await Promise.all([
    withdrawal.save(),
    nominator.save(),
    operator.save(),
    account.save(),
    domain.save(),
  ]);
}

export async function handleUnlockOperatorCall(
  extrinsic: SubstrateExtrinsic
): Promise<void> {
  // Implementation for handleUnlockOperatorCall
}

export async function handleUnlockNominatorCall(
  extrinsic: SubstrateExtrinsic
): Promise<void> {
  // Implementation for handleUnlockNominatorCall
}

export async function handleDomainInstantiatedEvent(
  event: SubstrateEvent
): Promise<void> {
  logger.info(
    `New ${event.event.section}.${
      event.event.method
    } event found at block ${event.block.block.header.number.toString()}`
  );
  const {
    event: {
      data: [_domainId, _completedEpochIndex],
    },
  } = event;
  const domainId = _domainId.toString();
  const completedEpoch = Number(_completedEpochIndex?.toString() ?? 0);
  const blockNumber = event.block.block.header.number.toNumber();

  const domain = await db.checkAndGetDomain(domainId, blockNumber);
  domain.completedEpoch = completedEpoch;
  domain.updatedAt = blockNumber;

  await domain.save();
}

export async function handleDomainEpochCompletedEvent(
  event: SubstrateEvent
): Promise<void> {
  logger.info(
    `New ${event.event.section}.${
      event.event.method
    } event found at block ${event.block.block.header.number.toString()}`
  );
  const {
    event: {
      data: [domainId, epochIndex],
    },
  } = event;
  const blockNumber = event.block.block.header.number.toNumber();

  // Querying additional state if necessary
  const _domainEntry = await api.query.domains.domainRegistry(domainId);
  const domainEntry = _domainEntry.toJSON() as any[0];

  // Parse domain details
  const parsedDomain = {
    domainId: domainEntry.toHuman()?.domainId,
    ownerAccountId: domainEntry.toHuman()?.ownerAccountId,
    // Add other necessary fields
  };

  // Fetch or create Domain entity
  const domain = await db.checkAndGetDomain(domainId.toString(), blockNumber);
  domain.completedEpoch = Number(epochIndex);
  domain.updatedAt = blockNumber;

  // Update domain based on fetched data
  if (parsedDomain.ownerAccountId) {
    domain.accountId = parsedDomain.ownerAccountId;
    // Update other domain fields as necessary
  }

  await domain.save();
}

export async function handleForceDomainEpochTransitionEvent(
  event: SubstrateEvent
): Promise<void> {
  // Implementation for handleForceDomainEpochTransitionEvent
}

export async function handleOperatorRegisteredEvent(
  event: SubstrateEvent
): Promise<void> {
  // Implementation for handleOperatorRegisteredEvent
}

export async function handleOperatorDeregisteredEvent(
  event: SubstrateEvent
): Promise<void> {
  // Implementation for handleOperatorDeregisteredEvent
}

export async function handleOperatorNominatedEvent(
  event: SubstrateEvent
): Promise<void> {
  // Implementation for handleOperatorNominatedEvent
}

export async function handleWithdrewStakeEvent(
  event: SubstrateEvent
): Promise<void> {
  // Implementation for handleWithdrewStakeEvent
}

export async function handleStorageFeeDepositedEvent(
  event: SubstrateEvent
): Promise<void> {
  // Implementation for handleStorageFeeDepositedEvent
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
      data: [domainId, bundleAuthor],
    },
    block,
    extrinsic,
  } = event;
  const domainIdNum = Number(domainId);
  const operatorId = Number(bundleAuthor);

  // const sealedHeader = extrinsic.extrinsic.method.args[0].sealedHeader as SealedBundleHeader;
  // const domain = await checkAndGetDomain(domainId.toString(), block.block.header.number.toNumber());
  // const operator = await checkAndGetOperator(operatorId.toString(), block.block.header.number.toNumber());
  // const account = await checkAndGetAccount(operator.accountId, block.block.header.number.toNumber());

  // const receipt = sealedHeader.header.receipt as ExecutionReceipt;
  // const { transfers } = receipt;

  // const totalTransfersIn = transfers.transfersIn.reduce(
  //   (acc, [, amount]) => acc + BigInt(amount),
  //   BigInt(0)
  // );
  // const transfersInCount = transfers.transfersIn.length;

  // const totalTransfersOut = transfers.transfersOut.reduce(
  //   (acc, [, amount]) => acc + BigInt(amount),
  //   BigInt(0)
  // );
  // const transfersOutCount = transfers.transfersOut.length;

  // const totalRejectedTransfersClaimed =
  //   transfers.rejectedTransfersClaimed.reduce(
  //     (acc, [, amount]) => acc + BigInt(amount),
  //     BigInt(0)
  //   );
  // const rejectedTransfersClaimedCount =
  //   transfers.rejectedTransfersClaimed.length;

  // const totalTransfersRejected = transfers.transfersRejected.reduce(
  //   (acc, [, amount]) => acc + BigInt(amount),
  //   BigInt(0)
  // );
  // const transfersRejectedCount = transfers.transfersRejected.length;

  // const totalVolume = totalTransfersIn + totalTransfersOut;

  // const {
  //   domainBlockNumber,
  //   domainBlockHash,
  //   domainBlockExtrinsicRoot,
  //   consensusBlockNumber,
  //   consensusBlockHash,
  //   blockFees,
  // } = receipt;

  // const epoch = domain.completedEpoch;
  // const domainEpoch = await checkAndGetDomainEpoch(`${domainId}-${epoch}`, block.block.header.number.toNumber());
  // domainEpoch.blockNumberEnd = Number(domainBlockNumber);
  // domainEpoch.timestampEnd = new Date(block.timestamp);
  // domainEpoch.consensusBlockNumberEnd = block.block.header.number.toNumber();
  // domainEpoch.consensusBlockHashEnd = block.block.header.hash.toString();
  // domainEpoch.blockCount =
  //   domainEpoch.blockNumberEnd - domainEpoch.blockNumberStart + 1;
  // domainEpoch.epochDuration = BigInt(
  //   domainEpoch.timestampEnd.getTime() - domainEpoch.timestampStart.getTime()
  // );
  // domainEpoch.updatedAt = block.block.header.number.toNumber();

  // let domainBlock = await checkAndGetDomainBlock(`${domainId}-${domainBlockNumber}`, block.block.header.number.toNumber());
  // if (!domainBlock) {
  //   domainBlock = DomainBlock.create({
  //     id: `${domainId}-${domainBlockNumber}`,
  //     domainId: domain.id,
  //     domainEpochId: domainEpoch.id,
  //     blockNumber: Number(domainBlockNumber),
  //     blockHash: domainBlockHash,
  //     extrinsicRoot: domainBlockExtrinsicRoot,
  //     epoch: domain.completedEpoch,
  //     consensusBlockNumber: Number(consensusBlockNumber),
  //     consensusBlockHash,
  //     timestamp: new Date(block.timestamp),
  //     createdAt: block.block.header.number.toNumber(),
  //     updatedAt: block.block.header.number.toNumber(),
  //   });
  // }

  // let bundle = await checkAndGetBundle(`${domainId}-${domainBlockHash}-${block.block.header.number.toNumber()}`, block.block.header.number.toNumber());
  // if (!bundle) {
  //   bundle = Bundle.create({
  //     id: `${domainId}-${domainBlockHash}-${block.block.header.number.toNumber()}`,
  //     domainId: domain.id,
  //     domainBlockId: domainBlock.id,
  //     domainEpochId: domainEpoch.id,
  //     domainBlockNumber: Number(domainBlockNumber),
  //     domainBlockHash,
  //     domainBlockExtrinsicRoot,
  //     epoch: domain.completedEpoch,
  //     consensusBlockNumber: Number(consensusBlockNumber),
  //     consensusBlockHash,
  //     totalTransfersIn,
  //     transfersInCount,
  //     totalTransfersOut,
  //     transfersOutCount,
  //     totalRejectedTransfersClaimed,
  //     rejectedTransfersClaimedCount,
  //     totalTransfersRejected,
  //     transfersRejectedCount,
  //     totalVolume,
  //     consensusStorageFee: BigInt(blockFees.consensusStorageFee),
  //     domainExecutionFee: BigInt(blockFees.domainExecutionFee),
  //     burnedBalance: BigInt(blockFees.burnedBalance),
  //   });
  // }

  // const bundleAuthorEntity = await checkAndGetBundleAuthor(`${domainId}-${account.id}-${operator.id}-${bundle.id}`, block.block.header.number.toNumber());
  // if (!bundleAuthorEntity) {
  //   bundleAuthorEntity = BundleAuthor.create({
  //     id: `${domainId}-${account.id}-${operator.id}-${bundle.id}`,
  //     domainId: domain.id,
  //     accountId: account.id,
  //     operatorId: operator.id,
  //     bundleId: bundle.id,
  //     domainBlockId: domainBlock.id,
  //     domainEpochId: domainEpoch.id,
  //     epoch: domain.completedEpoch,
  //   });
  // }

  // domain.lastDomainBlockNumber = Number(domainBlockNumber);
  // domain.totalTransfersIn += totalTransfersIn;
  // domain.transfersInCount += transfersInCount;
  // domain.totalTransfersOut += totalTransfersOut;
  // domain.transfersOutCount += transfersOutCount;
  // domain.totalRejectedTransfersClaimed += totalRejectedTransfersClaimed;
  // domain.rejectedTransfersClaimedCount += rejectedTransfersClaimedCount;
  // domain.totalTransfersRejected += totalTransfersRejected;
  // domain.transfersRejectedCount += transfersRejectedCount;
  // domain.totalVolume += totalVolume;
  // domain.totalConsensusStorageFee += BigInt(blockFees.consensusStorageFee);
  // domain.totalDomainExecutionFee += BigInt(blockFees.domainExecutionFee);
  // domain.totalBurnedBalance += BigInt(blockFees.burnedBalance);
  // domain.bundleCount++;
  // domain.currentEpochDuration = domainEpoch.epochDuration;
  // if (epoch > 0) {
  //   const lastEpoch = await checkAndGetDomainEpoch(`${domainId}-${epoch - 1}`, block.block.header.number.toNumber());
  //   const lastEpochTimestampEnd = lastEpoch.timestampEnd.getTime();
  //   domain.lastEpochDuration = lastEpoch.epochDuration;
  //   if (epoch > 6) {
  //     domain.last6EpochsDuration = BigInt(
  //       lastEpochTimestampEnd -
  //         (await checkAndGetDomainEpoch(`${domainId}-${epoch - 6}`, block.block.header.number.toNumber())).timestampEnd.getTime()
  //     );
  //   }
  //   if (epoch > 144) {
  //     domain.last144EpochDuration = BigInt(
  //       lastEpochTimestampEnd -
  //         (await checkAndGetDomainEpoch(`${domainId}-${epoch - 144}`, block.block.header.number.toNumber())).timestampEnd.getTime()
  //     );
  //   }
  //   if (epoch > 1000) {
  //     domain.last1kEpochDuration = BigInt(
  //       lastEpochTimestampEnd -
  //         (await checkAndGetDomainEpoch(`${domainId}-${epoch - 1000}`, block.block.header.number.toNumber())).timestampEnd.getTime()
  //     );
  //   }
  // }
  // domain.lastBundleAt = block.block.header.number.toNumber();
  // domain.updatedAt = block.block.header.number.toNumber();

  // operator.totalTransfersIn += totalTransfersIn;
  // operator.transfersInCount += transfersInCount;
  // operator.totalTransfersOut += totalTransfersOut;
  // operator.transfersOutCount += transfersOutCount;
  // operator.totalRejectedTransfersClaimed += totalRejectedTransfersClaimed;
  // operator.rejectedTransfersClaimedCount += rejectedTransfersClaimedCount;
  // operator.totalTransfersRejected += totalTransfersRejected;
  // operator.transfersRejectedCount += transfersRejectedCount;
  // operator.totalConsensusStorageFee += BigInt(blockFees.consensusStorageFee);
  // operator.totalDomainExecutionFee += BigInt(blockFees.domainExecutionFee);
  // operator.totalBurnedBalance += BigInt(blockFees.burnedBalance);
  // operator.totalVolume += totalVolume;
  // operator.bundleCount++;
  // operator.lastBundleAt = block.block.header.number.toNumber();
  // operator.updatedAt = block.block.header.number.toNumber();

  // await Promise.all([
  //   domain.save(),
  //   domainEpoch.save(),
  //   domainBlock.save(),
  //   bundle.save(),
  //   bundleAuthorEntity.save(),
  //   operator.save(),
  // ]);
}

export async function handleOperatorUnlockedEvent(
  event: SubstrateEvent
): Promise<void> {
  const {
    event: {
      data: [operatorId],
    },
    block,
  } = event;
  const blockNumber = block.block.header.number.toNumber();
  const operator = await db.checkAndGetOperator(
    operatorId.toString(),
    blockNumber
  );
  const domain = await db.checkAndGetDomain(operator.domainId, blockNumber);
  const account = await db.checkAndGetAccount(operator.accountId, blockNumber);

  operator.pendingAction = OperatorPendingAction.NO_ACTION_REQUIRED;
  operator.updatedAt = blockNumber;

  const nominators = await Nominator.getByOperatorId(operator.id);
  if (nominators) {
    nominators.forEach(async (n) => {
      if (
        n.status === NominatorStatus.PENDING ||
        n.status === NominatorStatus.STAKED
      ) {
        n.status = NominatorStatus.PENDING;
        n.pendingAction = NominatorPendingAction.READY_TO_UNLOCK_ALL_FUNDS;
        n.updatedAt = blockNumber;
        await n.save();
      }
    });
  }

  const withdrawals = await Withdrawal.getByDomainId(domain.id);
  if (withdrawals) {
    withdrawals.forEach(async (w) => {
      if (w.status === WithdrawalStatus.PENDING_OPERATOR) {
        w.status = WithdrawalStatus.READY;
        w.readyAt = blockNumber;
        w.updatedAt = blockNumber;
        await w.save();
      }
    });
  }

  await Promise.all([operator.save(), domain.save(), account.save()]);
}

export async function handleFundsUnlockedEvent(
  event: SubstrateEvent
): Promise<void> {
  const {
    event: {
      data: [operatorId, nominatorId, amount],
    },
    block,
  } = event;
  const blockNumber = block.block.header.number.toNumber();
  const amountBigInt = BigInt(amount.toString());

  const operator = await db.checkAndGetOperator(
    operatorId.toString(),
    blockNumber
  );
  const domain = await db.checkAndGetDomain(operator.domainId, blockNumber);
  const account = await db.checkAndGetAccount(
    nominatorId.toString(),
    blockNumber
  );
  const nominator = await db.checkAndGetNominator(
    nominatorId.toString(),
    domain.id,
    operator.id,
    blockNumber
  );

  const withdrawals = await Withdrawal.getByFields([
    ["operatorId", "=", operator.id],
    ["accountId", "=", account.id],
  ]);
  if (withdrawals) {
    withdrawals.forEach(async (w) => {
      if (w.status === WithdrawalStatus.PENDING_LOCK) {
        w.status = WithdrawalStatus.WITHDRAW;
        w.unlockedAmount = amountBigInt;
        w.unlockedAt = blockNumber;
        w.updatedAt = blockNumber;
        await w.save();
      }
    });
  }

  let amountToWithdraw = amountBigInt;
  const deposits = await Deposit.getByFields([
    ["operatorId", "=", operator.id],
    ["accountId", "=", account.id],
  ]);
  if (deposits) {
    deposits.forEach(async (d) => {
      if (amountToWithdraw > 0) {
        if (amountToWithdraw > d.totalAmount) {
          amountToWithdraw -= d.totalAmount;
          d.totalWithdrawn = d.totalAmount;
          d.status = DepositStatus.WITHDRAWN;
        } else {
          d.totalWithdrawn = amountToWithdraw;
          d.status = DepositStatus.PARTIALLY_WITHDRAWN;
          amountToWithdraw = BigInt(0);
        }
        d.updatedAt = blockNumber;
        await d.save();
      }
    });
  }

  domain.totalWithdrawals += amountBigInt;
  domain.updatedAt = blockNumber;

  account.totalWithdrawals += amountBigInt;
  account.updatedAt = blockNumber;

  operator.totalWithdrawals += amountBigInt;
  operator.updatedAt = blockNumber;

  nominator.totalWithdrawals += amountBigInt;
  nominator.pendingAction = NominatorPendingAction.NO_ACTION_REQUIRED;
  nominator.updatedAt = blockNumber;

  await Promise.all([
    domain.save(),
    account.save(),
    operator.save(),
    nominator.save(),
  ]);
}

export async function handleNominatedStakedUnlockedEvent(
  event: SubstrateEvent
): Promise<void> {
  // Implementation for handleNominatedStakedUnlockedEvent
}

export async function handleNominatorUnlockedEvent(
  event: SubstrateEvent
): Promise<void> {
  // Implementation for handleNominatorUnlockedEvent
}

export async function handleStorageFeeUnlockedEvent(
  event: SubstrateEvent
): Promise<void> {
  // Implementation for handleStorageFeeUnlockedEvent
}
