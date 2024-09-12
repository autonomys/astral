import { SubstrateEvent, SubstrateExtrinsic } from "@subql/types";
import assert from "assert";
import {
  Account,
  Bundle,
  BundleAuthor,
  Deposit,
  DepositStatus,
  Domain,
  DomainBlock,
  DomainEpoch,
  DomainRuntime,
  Nominator,
  NominatorPendingAction,
  NominatorStatus,
  Operator,
  OperatorPendingAction,
  OperatorStatus,
  Reward,
  Stats,
  StatsPerAccount,
  StatsPerDomain,
  StatsPerNominator,
  StatsPerOperator,
  Withdrawal,
  WithdrawalStatus,
} from "../types";

export const SHARES_CALCULATION_MULTIPLIER = BigInt(1000000000000);

export async function handleRegisterOperatorCall(
  extrinsic: SubstrateExtrinsic
): Promise<void> {
  logger.info(
    `New ${extrinsic.extrinsic.registry.toString()}.${
      extrinsic.extrinsic.method
    } extrinsic found at block ${extrinsic.block.block.header.number.toString()}`
  );
  const signer = extrinsic.extrinsic.signer.toString();
  const blockNumber = extrinsic.block.block.header.number.toNumber();
  const {
    events,
    extrinsic: {
      method: { args },
    },
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
  assert(signer === nominatorId_storageFee, "signer mismatch");
  assert(
    amount_storageFee === (BigInt(amount) * BigInt(20)) / BigInt(100),
    `Storage fee (${amount_storageFee}) should be 20% of the amount (${amount})`
  );

  const domain = await checkAndGetDomain(domainId, blockNumber);
  domain.totalDeposits += amount;
  domain.updatedAt = blockNumber;

  const account = await checkAndGetAccount(signer, blockNumber);
  account.totalDeposits += amount;
  account.updatedAt = blockNumber;

  const operator = await checkAndGetOperator(operatorId, blockNumber);
  operator.domainId = domain.id;
  operator.accountId = account.id;
  operator.signingKey = String(signingKey);
  operator.minimumNominatorStake = BigInt(minimumNominatorStake);
  operator.nominationTax = Number(nominationTax);
  operator.totalDeposits += amount;
  operator.pendingAction = OperatorPendingAction.PENDING_REGISTRATION;
  operator.updatedAt = blockNumber;

  const nominator = await checkAndGetNominator(
    signer,
    domain.id,
    operator.id,
    blockNumber
  );
  nominator.totalDeposits += amount;
  nominator.pendingAction = NominatorPendingAction.PENDING_EPOCH_CHANGE;
  nominator.updatedAt = blockNumber;

  const deposit = await checkAndGetDeposit(
    signer,
    domain.id,
    operator.id,
    amount - amount_storageFee,
    amount_storageFee,
    blockNumber
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

  const account = await checkAndGetAccount(signer, blockNumber);
  const operator = await checkAndGetOperator(operatorId, blockNumber);
  const domain = await checkAndGetDomain(operator.domainId, blockNumber);

  const nominator = await checkAndGetNominator(
    signer,
    domain.id,
    operator.id,
    blockNumber
  );

  const deposit = await checkAndGetDeposit(
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

  const operator = await checkAndGetOperator(operatorId, blockNumber);
  operator.currentTotalStake = BigInt(0);
  operator.currentStorageFeeDeposit = BigInt(0);
  operator.status = OperatorStatus.DEREGISTERED;
  operator.updatedAt = blockNumber;

  const domain = await checkAndGetDomain(operator.domainId, blockNumber);
  const account = await checkAndGetAccount(operator.accountId, blockNumber);

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
      const withdrawal = await checkAndGetWithdrawal(
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
  const {
    event: {
      data: [operatorId],
    },
    block,
  } = event;
  const blockNumber = block.block.header.number.toNumber();

  const operator = await checkAndGetOperator(
    operatorId.toString(),
    blockNumber
  );
  operator.currentTotalStake = BigInt(0);
  operator.currentStorageFeeDeposit = BigInt(0);
  operator.status = OperatorStatus.SLASHED;
  operator.updatedAt = blockNumber;

  const nominators = await Nominator.getByOperatorId(operator.id);
  if (nominators) {
    nominators.forEach(async (n) => {
      n.status = NominatorStatus.SLASHED;
      n.pendingAction = NominatorPendingAction.NO_ACTION_REQUIRED;
      n.updatedAt = blockNumber;
      await n.save();
    });
  }

  const withdrawals = await Withdrawal.getByOperatorId(operator.id);
  if (withdrawals) {
    withdrawals.forEach(async (w) => {
      if (
        w.status === WithdrawalStatus.PENDING_LOCK ||
        w.status === WithdrawalStatus.PENDING_OPERATOR ||
        w.status === WithdrawalStatus.READY
      ) {
        w.status = WithdrawalStatus.SLASHED;
        w.updatedAt = blockNumber;
        await w.save();
      }
    });
  }

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

  const operator = await checkAndGetOperator(
    operatorId.toString(),
    blockNumber
  );
  const account = await checkAndGetAccount(operator.accountId, blockNumber);
  const domain = await checkAndGetDomain(operator.domainId, blockNumber);

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

  const operator = await checkAndGetOperator(
    operatorId.toString(),
    block.block.header.number.toNumber()
  );
  const domain = await checkAndGetDomain(
    operator.domainId,
    block.block.header.number.toNumber()
  );

  operator.totalRewardsCollected += amount;
  domain.totalRewardsCollected += amount;

  const rewardEvent = await checkAndGetReward(
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

  const account = await checkAndGetAccount(address, blockNumber);
  const operator = await checkAndGetOperator(
    operatorId.toString(),
    blockNumber
  );
  const domain = await checkAndGetDomain(operator.domainId, blockNumber);
  const nominator = await checkAndGetNominator(
    address,
    domain.id,
    operator.id,
    blockNumber
  );

  const estimatedAmount =
    (operator.currentSharePrice * sharesBigInt) / SHARES_CALCULATION_MULTIPLIER;
  const withdrawal = await checkAndGetWithdrawal(
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
  // Implementation for handleUnlockFundsCall
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

  const domain = await checkAndGetDomain(domainId, blockNumber);
  domain.completedEpoch = completedEpoch;
  domain.updatedAt = blockNumber;

  await domain.save();
}

export async function handleDomainEpochCompletedEvent(
  event: SubstrateEvent
): Promise<void> {
  // Implementation for handleDomainEpochCompletedEvent
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
  // const domainIdNum = Number(domainId);
  // const operatorId = Number(bundleAuthor);

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
  const operator = await checkAndGetOperator(
    operatorId.toString(),
    blockNumber
  );
  const domain = await checkAndGetDomain(operator.domainId, blockNumber);
  const account = await checkAndGetAccount(operator.accountId, blockNumber);

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

  const operator = await checkAndGetOperator(
    operatorId.toString(),
    blockNumber
  );
  const domain = await checkAndGetDomain(operator.domainId, blockNumber);
  const account = await checkAndGetAccount(nominatorId.toString(), blockNumber);
  const nominator = await checkAndGetNominator(
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

// Helper for Domain
export async function checkAndGetDomain(
  domainId: string,
  blockNumber: number
): Promise<Domain> {
  let domain = await Domain.get(domainId);
  if (!domain) {
    domain = Domain.create({
      id: domainId.toLowerCase(),
      sortId: Number(0),
      accountId: "",
      name: "",
      runtimeId: 0,
      runtime: DomainRuntime.EVM,
      runtimeInfo: "",
      completedEpoch: 0,
      lastDomainBlockNumber: 0,
      totalDeposits: BigInt(0),
      totalEstimatedWithdrawals: BigInt(0),
      totalWithdrawals: BigInt(0),
      totalTaxCollected: BigInt(0),
      totalRewardsCollected: BigInt(0),
      totalTransfersIn: BigInt(0),
      transfersInCount: 0,
      totalTransfersOut: BigInt(0),
      transfersOutCount: 0,
      totalRejectedTransfersClaimed: BigInt(0),
      rejectedTransfersClaimedCount: 0,
      totalTransfersRejected: BigInt(0),
      transfersRejectedCount: 0,
      totalVolume: BigInt(0),
      totalConsensusStorageFee: BigInt(0),
      totalDomainExecutionFee: BigInt(0),
      totalBurnedBalance: BigInt(0),
      currentTotalStake: BigInt(0),
      currentStorageFeeDeposit: BigInt(0),
      currentTotalShares: BigInt(0),
      currentSharePrice: BigInt(0),
      accumulatedEpochStake: BigInt(0),
      accumulatedEpochStorageFeeDeposit: BigInt(0),
      accumulatedEpochRewards: BigInt(0),
      accumulatedEpochShares: BigInt(0),
      bundleCount: 0,
      currentEpochDuration: BigInt(0),
      lastEpochDuration: BigInt(0),
      last6EpochsDuration: BigInt(0),
      last144EpochDuration: BigInt(0),
      last1kEpochDuration: BigInt(0),
      lastBundleAt: 0,
      createdAt: blockNumber,
      updatedAt: blockNumber,
    });
  }
  return domain;
}

// Helper for Account
export async function checkAndGetAccount(
  id: string,
  blockNumber: number
): Promise<Account> {
  let account = await Account.get(id.toLowerCase());
  if (!account) {
    account = Account.create({
      id: id.toLowerCase(),
      totalDeposits: BigInt(0),
      totalEstimatedWithdrawals: BigInt(0),
      totalWithdrawals: BigInt(0),
      totalTaxCollected: BigInt(0),
      currentTotalStake: BigInt(0),
      currentStorageFeeDeposit: BigInt(0),
      currentTotalShares: BigInt(0),
      currentSharePrice: BigInt(0),
      accumulatedEpochStake: BigInt(0),
      accumulatedEpochStorageFeeDeposit: BigInt(0),
      accumulatedEpochShares: BigInt(0),
      createdAt: blockNumber,
      updatedAt: blockNumber,
    });
  }
  return account;
}

// Helper for Operator
export async function checkAndGetOperator(
  operatorId: string,
  blockNumber: number
): Promise<Operator> {
  const id = operatorId.toLowerCase();
  let operator = await Operator.get(id);
  if (!operator) {
    operator = Operator.create({
      id,
      sortId: Number(operatorId),
      accountId: "",
      domainId: "",
      signingKey: "",
      minimumNominatorStake: BigInt(0),
      nominationTax: 0,
      currentTotalStake: BigInt(0),
      currentStorageFeeDeposit: BigInt(0),
      currentEpochRewards: BigInt(0),
      currentTotalShares: BigInt(0),
      currentSharePrice: BigInt(0),
      rawStatus: "",
      totalDeposits: BigInt(0),
      totalEstimatedWithdrawals: BigInt(0),
      totalWithdrawals: BigInt(0),
      totalTaxCollected: BigInt(0),
      totalRewardsCollected: BigInt(0),
      totalTransfersIn: BigInt(0),
      transfersInCount: 0,
      totalTransfersOut: BigInt(0),
      transfersOutCount: 0,
      totalRejectedTransfersClaimed: BigInt(0),
      rejectedTransfersClaimedCount: 0,
      totalTransfersRejected: BigInt(0),
      transfersRejectedCount: 0,
      totalVolume: BigInt(0),
      totalConsensusStorageFee: BigInt(0),
      totalDomainExecutionFee: BigInt(0),
      totalBurnedBalance: BigInt(0),
      accumulatedEpochStake: BigInt(0),
      accumulatedEpochStorageFeeDeposit: BigInt(0),
      accumulatedEpochRewards: BigInt(0),
      accumulatedEpochShares: BigInt(0),
      activeEpochCount: 0,
      bundleCount: 0,
      status: OperatorStatus.PENDING,
      pendingAction: OperatorPendingAction.NO_ACTION_REQUIRED,
      lastBundleAt: 0,
      createdAt: blockNumber,
      updatedAt: blockNumber,
    });
  }
  return operator;
}

// Helper for DomainBlock
export async function checkAndGetDomainBlock(
  id: string,
  blockNumber: number
): Promise<DomainBlock> {
  let domainBlock = await DomainBlock.get(id.toLowerCase());
  if (!domainBlock) {
    domainBlock = DomainBlock.create({
      id: id.toLowerCase(),
      domainId: "",
      domainEpochId: "",
      blockNumber: 0,
      blockHash: "",
      extrinsicRoot: "",
      epoch: 0,
      consensusBlockNumber: 0,
      consensusBlockHash: "",
      timestamp: new Date(),
      createdAt: blockNumber,
      updatedAt: blockNumber,
    });
  }
  return domainBlock;
}

// Helper for DomainEpoch
export async function checkAndGetDomainEpoch(
  id: string,
  blockNumber: number
): Promise<DomainEpoch> {
  let domainEpoch = await DomainEpoch.get(id.toLowerCase());
  if (!domainEpoch) {
    domainEpoch = DomainEpoch.create({
      id: id.toLowerCase(),
      epoch: 0,
      domainId: "",
      blockNumberStart: 0,
      blockNumberEnd: 0,
      blockCount: 0,
      timestampStart: new Date(),
      timestampEnd: new Date(),
      epochDuration: BigInt(0),
      consensusBlockNumberStart: 0,
      consensusBlockNumberEnd: 0,
      consensusBlockHashStart: "",
      consensusBlockHashEnd: "",
      createdAt: blockNumber,
      updatedAt: blockNumber,
    });
  }
  return domainEpoch;
}

// Helper for Bundle
export async function checkAndGetBundle(
  id: string,
  blockNumber: number
): Promise<Bundle> {
  let bundle = await Bundle.get(id.toLowerCase());
  if (!bundle) {
    bundle = Bundle.create({
      id: id.toLowerCase(),
      domainId: "",
      domainBlockId: "",
      domainEpochId: "",
      domainBlockNumber: 0,
      domainBlockHash: "",
      domainBlockExtrinsicRoot: "",
      epoch: 0,
      consensusBlockNumber: 0,
      consensusBlockHash: "",
      totalTransfersIn: BigInt(0),
      transfersInCount: 0,
      totalTransfersOut: BigInt(0),
      transfersOutCount: 0,
      totalRejectedTransfersClaimed: BigInt(0),
      rejectedTransfersClaimedCount: 0,
      totalTransfersRejected: BigInt(0),
      transfersRejectedCount: 0,
      totalVolume: BigInt(0),
      consensusStorageFee: BigInt(0),
      domainExecutionFee: BigInt(0),
      burnedBalance: BigInt(0),
    });
  }
  return bundle;
}

// Helper for BundleAuthor
export async function checkAndGetBundleAuthor(
  id: string,
  blockNumber: number
): Promise<BundleAuthor> {
  let bundleAuthor = await BundleAuthor.get(id.toLowerCase());
  if (!bundleAuthor) {
    bundleAuthor = BundleAuthor.create({
      id: id.toLowerCase(),
      domainId: "",
      accountId: "",
      operatorId: "",
      bundleId: "",
      domainBlockId: "",
      domainEpochId: "",
      epoch: 0,
    });
  }
  return bundleAuthor;
}

// Helper for Nominator
export async function checkAndGetNominator(
  accountId: string,
  domainId: string,
  operatorId: string,
  blockNumber: number
): Promise<Nominator> {
  const id = `${operatorId}-${accountId}`.toLowerCase();
  let nominator = await Nominator.get(id);
  if (!nominator) {
    nominator = Nominator.create({
      id,
      accountId,
      domainId,
      operatorId,
      knownShares: BigInt(0),
      knownStorageFeeDeposit: BigInt(0),
      pendingAmount: BigInt(0),
      pendingStorageFeeDeposit: BigInt(0),
      pendingEffectiveDomainEpoch: 0,
      totalWithdrawalAmounts: BigInt(0),
      totalStorageFeeRefund: BigInt(0),
      unlockAtConfirmedDomainBlockNumber: [],
      pendingShares: BigInt(0),
      pendingStorageFeeRefund: BigInt(0),
      totalDeposits: BigInt(0),
      totalEstimatedWithdrawals: BigInt(0),
      totalWithdrawals: BigInt(0),
      totalDepositsCount: 0,
      totalWithdrawalsCount: 0,
      currentTotalStake: BigInt(0),
      currentStorageFeeDeposit: BigInt(0),
      currentTotalShares: BigInt(0),
      currentSharePrice: BigInt(0),
      accumulatedEpochStake: BigInt(0),
      accumulatedEpochStorageFeeDeposit: BigInt(0),
      accumulatedEpochShares: BigInt(0),
      activeEpochCount: 0,
      status: NominatorStatus.PENDING,
      pendingAction: NominatorPendingAction.NO_ACTION_REQUIRED,
      createdAt: blockNumber,
      updatedAt: blockNumber,
    });
  }
  return nominator;
}

// Helper for Deposit
export async function checkAndGetDeposit(
  accountId: string,
  domainId: string,
  operatorId: string,
  amount: bigint,
  storageFeeDeposit: bigint,
  blockNumber: number
): Promise<Deposit> {
  const id = `${operatorId}-${accountId}-${blockNumber}`.toLowerCase();
  const nominatorId = `${operatorId}-${accountId}`.toLowerCase();
  const totalAmount = amount + storageFeeDeposit;
  let deposit = await Deposit.get(id);
  if (!deposit) {
    deposit = Deposit.create({
      id,
      accountId,
      domainId,
      operatorId,
      nominatorId,
      amount,
      storageFeeDeposit,
      totalAmount,
      totalWithdrawn: BigInt(0),
      status: DepositStatus.PENDING,
      timestamp: new Date(),
      extrinsicHash: "",
      epochDepositedAt: 0,
      domainBlockNumberDepositedAt: 0,
      createdAt: blockNumber,
      stakedAt: 0,
      updatedAt: blockNumber,
    });
  }
  return deposit;
}

// Helper for Withdrawal
export async function checkAndGetWithdrawal(
  accountId: string,
  domainId: string,
  operatorId: string,
  nominatorId: string,
  blockNumber: number
): Promise<Withdrawal> {
  const id = `${operatorId}-${accountId}-${blockNumber}`.toLowerCase();
  let withdrawal = await Withdrawal.get(id);
  if (!withdrawal) {
    withdrawal = Withdrawal.create({
      id,
      accountId,
      domainId,
      operatorId,
      nominatorId,
      shares: BigInt(0),
      estimatedAmount: BigInt(0),
      unlockedAmount: BigInt(0),
      unlockedStorageFee: BigInt(0),
      totalAmount: BigInt(0),
      status: WithdrawalStatus.PENDING_LOCK,
      timestamp: new Date(),
      withdrawExtrinsicHash: "",
      unlockExtrinsicHash: "",
      epochWithdrawalRequestedAt: 0,
      domainBlockNumberWithdrawalRequestedAt: 0,
      createdAt: blockNumber,
      readyAt: 0,
      unlockedAt: 0,
      updatedAt: blockNumber,
    });
  }
  return withdrawal;
}

// Helper for Reward
export async function checkAndGetReward(
  id: string,
  blockNumber: number
): Promise<Reward> {
  let reward = await Reward.get(id.toLowerCase());
  if (!reward) {
    reward = Reward.create({
      id: id.toLowerCase(),
      domainId: "",
      operatorId: "",
      amount: BigInt(0),
      timestamp: new Date(),
      blockNumber: 0,
      extrinsicHash: "",
    });
  }
  return reward;
}

// Helper for Stats
export async function checkAndGetStats(
  id: string,
  blockNumber: number
): Promise<Stats> {
  let stats = await Stats.get(id.toLowerCase());
  if (!stats) {
    stats = Stats.create({
      id: id.toLowerCase(),
      blockNumber: 0,
      totalStaked: BigInt(0),
      totalTaxCollected: BigInt(0),
      totalRewardsCollected: BigInt(0),
      totalDeposits: BigInt(0),
      totalWithdrawals: BigInt(0),
      totalShares: BigInt(0),
      currentSharePrice: BigInt(0),
      allTimeHighStaked: BigInt(0),
      allTimeHighSharePrice: BigInt(0),
      domainsCount: 0,
      operatorsCount: 0,
      activeOperatorsCount: 0,
      slashedOperatorsCount: 0,
      nominatorsCount: 0,
      depositsCount: 0,
      withdrawalsCount: 0,
      timestamp: new Date(),
    });
  }
  return stats;
}

// Helper for StatsPerDomain
export async function checkAndGetStatsPerDomain(
  id: string,
  blockNumber: number
): Promise<StatsPerDomain> {
  let statsPerDomain = await StatsPerDomain.get(id.toLowerCase());
  if (!statsPerDomain) {
    statsPerDomain = StatsPerDomain.create({
      id: id.toLowerCase(),
      domainId: "",
      blockNumber: 0,
      totalStaked: BigInt(0),
      totalTaxCollected: BigInt(0),
      totalRewardsCollected: BigInt(0),
      totalDeposits: BigInt(0),
      totalWithdrawals: BigInt(0),
      totalShares: BigInt(0),
      currentSharePrice: BigInt(0),
      allTimeHighStaked: BigInt(0),
      allTimeHighSharePrice: BigInt(0),
      operatorsCount: 0,
      activeOperatorsCount: 0,
      slashedOperatorsCount: 0,
      nominatorsCount: 0,
      depositsCount: 0,
      withdrawalsCount: 0,
      timestamp: new Date(),
    });
  }
  return statsPerDomain;
}

// Helper for StatsPerOperator
export async function checkAndGetStatsPerOperator(
  id: string,
  blockNumber: number
): Promise<StatsPerOperator> {
  let statsPerOperator = await StatsPerOperator.get(id.toLowerCase());
  if (!statsPerOperator) {
    statsPerOperator = StatsPerOperator.create({
      id: id.toLowerCase(),
      domainId: "",
      operatorId: "",
      blockNumber: 0,
      totalStaked: BigInt(0),
      totalTaxCollected: BigInt(0),
      totalRewardsCollected: BigInt(0),
      totalDeposits: BigInt(0),
      totalWithdrawals: BigInt(0),
      totalShares: BigInt(0),
      currentSharePrice: BigInt(0),
      allTimeHighStaked: BigInt(0),
      allTimeHighSharePrice: BigInt(0),
      nominatorsCount: 0,
      depositsCount: 0,
      withdrawalsCount: 0,
      timestamp: new Date(),
    });
  }
  return statsPerOperator;
}

// Helper for StatsPerNominator
export async function checkAndGetStatsPerNominator(
  id: string,
  blockNumber: number
): Promise<StatsPerNominator> {
  let statsPerNominator = await StatsPerNominator.get(id.toLowerCase());
  if (!statsPerNominator) {
    statsPerNominator = StatsPerNominator.create({
      id: id.toLowerCase(),
      domainId: "",
      operatorId: "",
      nominatorId: "",
      blockNumber: 0,
      totalStaked: BigInt(0),
      totalDeposits: BigInt(0),
      totalWithdrawals: BigInt(0),
      totalShares: BigInt(0),
      currentSharePrice: BigInt(0),
      allTimeHighStaked: BigInt(0),
      allTimeHighSharePrice: BigInt(0),
      depositsCount: 0,
      withdrawalsCount: 0,
      timestamp: new Date(),
    });
  }
  return statsPerNominator;
}

// Helper for StatsPerAccount
export async function checkAndGetStatsPerAccount(
  id: string,
  blockNumber: number
): Promise<StatsPerAccount> {
  let statsPerAccount = await StatsPerAccount.get(id.toLowerCase());
  if (!statsPerAccount) {
    statsPerAccount = StatsPerAccount.create({
      id: id.toLowerCase(),
      accountId: "",
      blockNumber: 0,
      totalStaked: BigInt(0),
      totalDeposits: BigInt(0),
      totalWithdrawals: BigInt(0),
      totalShares: BigInt(0),
      currentSharePrice: BigInt(0),
      allTimeHighStaked: BigInt(0),
      allTimeHighSharePrice: BigInt(0),
      operatorsCount: 0,
      nominatorsCount: 0,
      depositsCount: 0,
      withdrawalsCount: 0,
      timestamp: new Date(),
    });
  }
  return statsPerAccount;
}
