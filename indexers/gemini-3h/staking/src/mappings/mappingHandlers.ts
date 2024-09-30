import { SubstrateEvent, SubstrateExtrinsic } from "@subql/types";
import assert from "assert";
import {
  Bundle,
  BundleAuthor,
  Deposit,
  DomainBlock,
  Nominator,
  Withdrawal,
} from "../types";
import * as db from "./db";
import {
  DepositStatus,
  DomainRuntime,
  NominatorPendingAction,
  NominatorStatus,
  OperatorPendingAction,
  OperatorStatus,
  WithdrawalStatus,
} from "./models";
import { capitalizeFirstLetter, stringify } from "./utils";

export const SHARES_CALCULATION_MULTIPLIER = BigInt(1000000000000);

export interface TBundle {
  sealedHeader: SealedBundleHeader;
  extrinsics: Uint8Array[];
}

export interface SealedBundleHeader {
  header: BundleHeader;
  signature: Uint8Array;
}

export interface BundleHeader {
  proofOfElection: ProofOfElection;
  receipt: ExecutionReceipt;
  estimatedBundleWeight: Weight;
  bundleExtrinsicsRoot: Uint8Array;
}

export interface ProofOfElection {
  domainId: number;
  slotNumber: bigint;
  proofOfTime: Uint8Array;
  vrfSignature: VrfSignature;
  operatorId: bigint;
  consensusBlockHash: Uint8Array;
}

export interface ExecutionReceipt {
  domainBlockNumber: number;
  domainBlockHash: Uint8Array;
  domainBlockExtrinsicRoot: Uint8Array;
  parentDomainBlockReceiptHash: Uint8Array;
  consensusBlockNumber: number;
  consensusBlockHash: Uint8Array;
  inboxedBundles: InboxedBundle[];
  finalStateRoot: Uint8Array;
  executionTrace: Uint8Array[];
  executionTraceRoot: Uint8Array;
  blockFees: BlockFees;
  transfers: Transfers;
}

export interface VrfSignature {
  preOutput: Uint8Array;
  proof: Uint8Array;
}

export interface Weight {
  refTime: bigint;
  proofSize: bigint;
}

export interface InboxedBundle {
  bundle: BundleValidity;
  extrinsicsRoot: Uint8Array;
}

export interface Transfers {
  transfersIn: [ChainId, bigint][];
  transfersOut: [ChainId, bigint][];
  rejectedTransfersClaimed: [ChainId, bigint][];
  transfersRejected: [ChainId, bigint][];
}

export interface BlockFees {
  consensusStorageFee: bigint;
  domainExecutionFee: bigint;
  burnedBalance: bigint;
}

export type BundleValidity = BundleValidity_Invalid | BundleValidity_Valid;

export interface BundleValidity_Invalid {
  __kind: "Invalid";
  value: InvalidBundleType;
}

export interface BundleValidity_Valid {
  __kind: "Valid";
  value: Uint8Array;
}

export type ChainId = ChainId_Consensus | ChainId_Domain;

export interface ChainId_Consensus {
  __kind: "Consensus";
}

export interface ChainId_Domain {
  __kind: "Domain";
  value: number;
}

export type InvalidBundleType =
  | InvalidBundleType_UndecodableTx
  | InvalidBundleType_OutOfRangeTx
  | InvalidBundleType_IllegalTx
  | InvalidBundleType_InvalidXDM
  | InvalidBundleType_InherentExtrinsic;

export interface InvalidBundleType_UndecodableTx {
  __kind: "UndecodableTx";
  value: number;
}

export interface InvalidBundleType_OutOfRangeTx {
  __kind: "OutOfRangeTx";
  value: number;
}

export interface InvalidBundleType_IllegalTx {
  __kind: "IllegalTx";
  value: number;
}

export interface InvalidBundleType_InvalidXDM {
  __kind: "InvalidXDM";
  value: number;
}

export interface InvalidBundleType_InherentExtrinsic {
  __kind: "InherentExtrinsic";
  value: number;
}

export async function handleDomainInstantiatedEvent(
  event: SubstrateEvent
): Promise<void> {
  const {
    extrinsic,
    event: {
      data: [_domainId, _completedEpochIndex],
    },
  } = event;
  if (extrinsic) {
    const _extrinsic = extrinsic.extrinsic.method.args[0].toHuman() as any;
    const accountId = extrinsic.extrinsic.signer.toString();
    const domainName = capitalizeFirstLetter(
      _extrinsic.args.domain_config.domainName
    );
    const domainId = _domainId.toString();
    const completedEpoch = Number(_completedEpochIndex?.toString() ?? 0);
    const blockNumber = event.block.block.header.number.toNumber();

    const domain = await db.checkAndGetDomain(domainId, BigInt(blockNumber));
    domain.accountId = accountId;
    domain.name = domainName;
    switch (domainName) {
      case "Nova":
        domain.runtime = DomainRuntime.EVM;
        break;
      case "Auto-id":
        domain.runtime = DomainRuntime.AUTO_ID;
        break;
      default:
        break;
    }
    domain.runtimeInfo = stringify(_extrinsic.args.domain_config);
    domain.completedEpoch = BigInt(completedEpoch);
    domain.updatedAt = BigInt(blockNumber);

    await domain.save();
  }
}

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
  logger.info(`args: ${stringify(args)}`);
  const _args = args.map((arg) => arg.toPrimitive());
  logger.info(`_args: ${stringify(_args)}`);
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

  const domain = await db.checkAndGetDomain(
    domainId,
    BigInt(number.toString())
  );
  domain.totalDeposits += amount;
  domain.updatedAt = BigInt(number.toString());

  const account = await db.checkAndGetAccount(
    signer.toString(),
    number.toNumber()
  );
  account.totalDeposits += amount;
  account.updatedAt = BigInt(number.toString());

  const operator = await db.checkAndGetOperator(operatorId, number.toNumber());
  operator.domainId = domain.id;
  operator.accountId = account.id;
  operator.signingKey = String(signingKey);
  operator.minimumNominatorStake = BigInt(minimumNominatorStake);
  operator.nominationTax = Number(nominationTax);
  operator.totalDeposits += amount;
  operator.pendingAction = OperatorPendingAction.PENDING_REGISTRATION;
  operator.updatedAt = BigInt(number.toString());

  const nominator = await db.checkAndGetNominator(
    signer.toString(),
    domain.id,
    operator.id,
    number.toNumber()
  );
  nominator.totalDeposits += amount;
  nominator.pendingAction = NominatorPendingAction.PENDING_EPOCH_CHANGE;
  nominator.updatedAt = BigInt(number.toString());

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
  const domain = await db.checkAndGetDomain(
    operator.domainId,
    BigInt(blockNumber)
  );

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
  operator.updatedAt = BigInt(blockNumber);

  if (nominator.totalDepositsCount === BigInt(0)) {
    nominator.pendingAction = NominatorPendingAction.PENDING_EPOCH_CHANGE;
  }
  nominator.totalDeposits += totalAmount;
  nominator.totalDepositsCount++;
  nominator.updatedAt = BigInt(blockNumber);

  domain.totalDeposits += totalAmount;
  domain.updatedAt = BigInt(blockNumber);

  account.totalDeposits += totalAmount;
  account.updatedAt = BigInt(blockNumber);

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
  operator.updatedAt = BigInt(blockNumber);

  const domain = await db.checkAndGetDomain(
    operator.domainId,
    BigInt(blockNumber)
  );
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
      n.updatedAt = BigInt(blockNumber);

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
  operator.updatedAt = BigInt(blockNumber);

  // Fetch nominators associated with the operator
  const nominators = await Nominator.getByOperatorId(operator.id);
  if (nominators) {
    nominators.forEach(async (nominator) => {
      nominator.status = NominatorStatus.SLASHED;
      nominator.pendingAction = NominatorPendingAction.NO_ACTION_REQUIRED;
      nominator.updatedAt = BigInt(blockNumber);
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
        withdrawal.updatedAt = BigInt(blockNumber);
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
  const domain = await db.checkAndGetDomain(
    operator.domainId,
    BigInt(blockNumber)
  );

  operator.totalTaxCollected += taxAmount;
  operator.updatedAt = BigInt(blockNumber);

  account.totalTaxCollected += taxAmount;
  account.updatedAt = BigInt(blockNumber);

  domain.totalTaxCollected += taxAmount;
  domain.updatedAt = BigInt(blockNumber);

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
    BigInt(block.block.header.number.toString())
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
  const domain = await db.checkAndGetDomain(
    operator.domainId,
    BigInt(blockNumber)
  );
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
  withdrawal.createdAt = BigInt(blockNumber);
  withdrawal.updatedAt = BigInt(blockNumber);

  nominator.totalWithdrawalsCount++;
  nominator.totalEstimatedWithdrawals += estimatedAmount;
  nominator.pendingAction = NominatorPendingAction.PENDING_LOCK_PERIOD;
  nominator.updatedAt = BigInt(blockNumber);

  operator.totalEstimatedWithdrawals += estimatedAmount;
  operator.updatedAt = BigInt(blockNumber);

  account.totalEstimatedWithdrawals += estimatedAmount;
  account.updatedAt = BigInt(blockNumber);

  domain.totalEstimatedWithdrawals += estimatedAmount;
  domain.updatedAt = BigInt(blockNumber);

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
  withdrawal.createdAt = BigInt(blockNumber);
  withdrawal.updatedAt = BigInt(blockNumber);

  // Update related entities
  const account = await db.checkAndGetAccount(signer, blockNumber);
  const domain = await db.checkAndGetDomain(
    operator.domainId,
    BigInt(blockNumber)
  );
  const nominator = await db.checkAndGetNominator(
    signer,
    domain.id,
    operator.id,
    blockNumber
  );

  nominator.totalWithdrawalsCount++;
  nominator.totalEstimatedWithdrawals += estimatedAmount;
  nominator.pendingAction = NominatorPendingAction.PENDING_LOCK_PERIOD;
  nominator.updatedAt = BigInt(blockNumber);

  operator.totalEstimatedWithdrawals += estimatedAmount;
  operator.updatedAt = BigInt(blockNumber);

  account.totalEstimatedWithdrawals += estimatedAmount;
  account.updatedAt = BigInt(blockNumber);

  domain.totalEstimatedWithdrawals += estimatedAmount;
  domain.updatedAt = BigInt(blockNumber);

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
    domainId: domainEntry?.domainId,
    ownerAccountId: domainEntry?.ownerAccountId,
    // Add other necessary fields
  };

  // Fetch or create Domain entity
  const domain = await db.checkAndGetDomain(
    domainId.toString(),
    BigInt(blockNumber)
  );
  domain.completedEpoch = BigInt(epochIndex.toString());
  domain.updatedAt = BigInt(blockNumber);

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
  const {
    event: {
      data: [domainId, bundleAuthor],
    },
    block: {
      block: {
        header: { number, hash },
      },
      timestamp,
    },
    extrinsic,
  } = event;
  const domainIdNum = BigInt(domainId.toString());
  const operatorId = BigInt(bundleAuthor.toString());
  if (!extrinsic) return;

  const _bundle =
    extrinsic.extrinsic.method.args[0].toPrimitive() as unknown as TBundle;
  const sealedHeader = _bundle.sealedHeader as SealedBundleHeader;
  const domain = await db.checkAndGetDomain(
    domainId.toString(),
    BigInt(number.toString())
  );
  const operator = await db.checkAndGetOperator(
    operatorId.toString(),
    number.toNumber()
  );
  const account = await db.checkAndGetAccount(
    operator.accountId,
    number.toNumber()
  );

  const receipt = sealedHeader.header.receipt as ExecutionReceipt;
  const { transfers } = receipt;

  const totalTransfersIn = Array.isArray(transfers.transfersIn)
    ? transfers.transfersIn.reduce(
        (acc, [, amount]) => acc + BigInt(amount),
        BigInt(0)
      )
    : BigInt(0);
  const transfersInCount = Array.isArray(transfers.transfersIn)
    ? transfers.transfersIn.length
    : 0;

  const totalTransfersOut = Array.isArray(transfers.transfersOut)
    ? transfers.transfersOut.reduce(
        (acc, [, amount]) => acc + BigInt(amount),
        BigInt(0)
      )
    : BigInt(0);
  const transfersOutCount = Array.isArray(transfers.transfersOut)
    ? transfers.transfersOut.length
    : 0;

  const totalRejectedTransfersClaimed = Array.isArray(
    transfers.rejectedTransfersClaimed
  )
    ? transfers.rejectedTransfersClaimed.reduce(
        (acc, [, amount]) => acc + BigInt(amount),
        BigInt(0)
      )
    : BigInt(0);
  const rejectedTransfersClaimedCount = Array.isArray(
    transfers.rejectedTransfersClaimed
  )
    ? transfers.rejectedTransfersClaimed.length
    : 0;

  const totalTransfersRejected = Array.isArray(transfers.transfersRejected)
    ? transfers.transfersRejected.reduce(
        (acc, [, amount]) => acc + BigInt(amount),
        BigInt(0)
      )
    : BigInt(0);
  const transfersRejectedCount = Array.isArray(transfers.transfersRejected)
    ? transfers.transfersRejected.length
    : 0;

  const totalVolume = totalTransfersIn + totalTransfersOut;

  const {
    domainBlockNumber,
    domainBlockHash,
    domainBlockExtrinsicRoot,
    consensusBlockNumber,
    consensusBlockHash,
    blockFees,
  } = receipt;

  const epoch = domain.completedEpoch;
  const domainEpoch = await db.checkAndGetDomainEpoch(
    `${domainId}-${epoch}`,
    number.toNumber()
  );
  domainEpoch.blockNumberEnd = BigInt(domainBlockNumber);
  domainEpoch.timestampEnd = timestamp ?? new Date(0);
  domainEpoch.consensusBlockNumberEnd = BigInt(consensusBlockNumber);
  domainEpoch.consensusBlockHashEnd = hash.toString();
  domainEpoch.blockCount =
    domainEpoch.blockNumberEnd - domainEpoch.blockNumberStart + BigInt(1);
  domainEpoch.epochDuration = BigInt(
    domainEpoch.timestampEnd.getTime() - domainEpoch.timestampStart.getTime()
  );
  domainEpoch.updatedAt = BigInt(number.toNumber());

  let domainBlock = await db.checkAndGetDomainBlock(
    `${domainId}-${domainBlockNumber}`,
    number.toNumber()
  );
  if (!domainBlock) {
    domainBlock = DomainBlock.create({
      id: `${domainId}-${domainBlockNumber}`,
      domainId: domain.id,
      domainEpochId: domainEpoch.id,
      blockNumber: BigInt(domainBlockNumber),
      blockHash: domainBlockHash.toString(),
      extrinsicRoot: domainBlockExtrinsicRoot.toString(),
      epoch: domain.completedEpoch,
      consensusBlockNumber: BigInt(consensusBlockNumber),
      consensusBlockHash: consensusBlockHash.toString(),
      timestamp: timestamp ?? new Date(0),
      createdAt: BigInt(number.toString()),
      updatedAt: BigInt(number.toString()),
    });
  }

  let bundle = await db.checkAndGetBundle(
    `${domainId}-${domainBlockHash}-${number.toNumber()}`,
    number.toNumber()
  );
  if (!bundle) {
    bundle = Bundle.create({
      id: `${domainId}-${domainBlockHash}-${number.toNumber()}`,
      domainId: domain.id,
      domainBlockId: domainBlock.id,
      domainEpochId: domainEpoch.id,
      domainBlockNumber: BigInt(domainBlockNumber),
      domainBlockHash: domainBlockHash.toString(),
      domainBlockExtrinsicRoot: domainBlockExtrinsicRoot.toString(),
      epoch: domain.completedEpoch,
      consensusBlockNumber: BigInt(consensusBlockNumber),
      consensusBlockHash: consensusBlockHash.toString(),
      totalTransfersIn,
      transfersInCount: BigInt(transfersInCount),
      totalTransfersOut,
      transfersOutCount: BigInt(transfersOutCount),
      totalRejectedTransfersClaimed,
      rejectedTransfersClaimedCount: BigInt(rejectedTransfersClaimedCount),
      totalTransfersRejected,
      transfersRejectedCount: BigInt(transfersRejectedCount),
      totalVolume,
      consensusStorageFee: BigInt(blockFees.consensusStorageFee),
      domainExecutionFee: BigInt(blockFees.domainExecutionFee),
      burnedBalance: BigInt(blockFees.burnedBalance),
    });
  }

  let bundleAuthorEntity = await db.checkAndGetBundleAuthor(
    `${domainId}-${account.id}-${operator.id}-${bundle.id}`,
    number.toNumber()
  );
  if (!bundleAuthorEntity) {
    bundleAuthorEntity = BundleAuthor.create({
      id: `${domainId}-${account.id}-${operator.id}-${bundle.id}`,
      domainId: domain.id,
      accountId: account.id,
      operatorId: operator.id,
      bundleId: bundle.id,
      domainBlockId: domainBlock.id,
      domainEpochId: domainEpoch.id,
      epoch: domain.completedEpoch,
    });
  }

  domain.lastDomainBlockNumber = BigInt(domainBlockNumber);
  domain.totalTransfersIn += totalTransfersIn;
  domain.transfersInCount += BigInt(transfersInCount);
  domain.totalTransfersOut += totalTransfersOut;
  domain.transfersOutCount += BigInt(transfersOutCount);
  domain.totalRejectedTransfersClaimed += totalRejectedTransfersClaimed;
  domain.rejectedTransfersClaimedCount += BigInt(rejectedTransfersClaimedCount);
  domain.totalTransfersRejected += totalTransfersRejected;
  domain.transfersRejectedCount += BigInt(transfersRejectedCount);
  domain.totalVolume += totalVolume;
  domain.totalConsensusStorageFee += BigInt(blockFees.consensusStorageFee);
  domain.totalDomainExecutionFee += BigInt(blockFees.domainExecutionFee);
  domain.totalBurnedBalance += BigInt(blockFees.burnedBalance);
  domain.bundleCount++;
  domain.currentEpochDuration = domainEpoch.epochDuration;

  if (epoch > 0) {
    const lastEpoch = await db.checkAndGetDomainEpoch(
      `${domainId}-${epoch - BigInt(1)}`,
      number.toNumber()
    );
    const lastEpochTimestampEnd = lastEpoch.timestampEnd.getTime();
    domain.lastEpochDuration = lastEpoch.epochDuration;
    if (epoch > 6) {
      domain.last6EpochsDuration = BigInt(
        lastEpochTimestampEnd -
          (
            await db.checkAndGetDomainEpoch(
              `${domainId}-${epoch - BigInt(6)}`,
              number.toNumber()
            )
          ).timestampEnd.getTime()
      );
    }
    if (epoch > 144) {
      domain.last144EpochDuration = BigInt(
        lastEpochTimestampEnd -
          (
            await db.checkAndGetDomainEpoch(
              `${domainId}-${epoch - BigInt(144)}`,
              number.toNumber()
            )
          ).timestampEnd.getTime()
      );
    }
    if (epoch > 1000) {
      domain.last1kEpochDuration = BigInt(
        lastEpochTimestampEnd -
          (
            await db.checkAndGetDomainEpoch(
              `${domainId}-${epoch - BigInt(1000)}`,
              number.toNumber()
            )
          ).timestampEnd.getTime()
      );
    }
  }
  domain.lastBundleAt = BigInt(number.toString());
  domain.updatedAt = BigInt(number.toString());

  operator.totalTransfersIn += totalTransfersIn;
  operator.transfersInCount += BigInt(transfersInCount);
  operator.totalTransfersOut += totalTransfersOut;
  operator.transfersOutCount += BigInt(transfersOutCount);
  operator.totalRejectedTransfersClaimed += totalRejectedTransfersClaimed;
  operator.rejectedTransfersClaimedCount += BigInt(
    rejectedTransfersClaimedCount
  );
  operator.totalTransfersRejected += totalTransfersRejected;
  operator.transfersRejectedCount += BigInt(transfersRejectedCount);
  operator.totalConsensusStorageFee += BigInt(blockFees.consensusStorageFee);
  operator.totalDomainExecutionFee += BigInt(blockFees.domainExecutionFee);
  operator.totalBurnedBalance += BigInt(blockFees.burnedBalance);
  operator.totalVolume += totalVolume;
  operator.bundleCount++;
  operator.lastBundleAt = BigInt(number.toString());
  operator.updatedAt = BigInt(number.toString());

  await Promise.all([
    domain.save(),
    domainEpoch.save(),
    domainBlock.save(),
    bundle.save(),
    bundleAuthorEntity.save(),
    operator.save(),
  ]);
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
  const domain = await db.checkAndGetDomain(
    operator.domainId,
    BigInt(blockNumber)
  );
  const account = await db.checkAndGetAccount(operator.accountId, blockNumber);

  operator.pendingAction = OperatorPendingAction.NO_ACTION_REQUIRED;
  operator.updatedAt = BigInt(blockNumber);

  const nominators = await Nominator.getByOperatorId(operator.id);
  if (nominators) {
    nominators.forEach(async (n) => {
      if (
        n.status === NominatorStatus.PENDING ||
        n.status === NominatorStatus.STAKED
      ) {
        n.status = NominatorStatus.PENDING;
        n.pendingAction = NominatorPendingAction.READY_TO_UNLOCK_ALL_FUNDS;
        n.updatedAt = BigInt(blockNumber);
        await n.save();
      }
    });
  }

  const withdrawals = await Withdrawal.getByDomainId(domain.id);
  if (withdrawals) {
    withdrawals.forEach(async (w) => {
      if (w.status === WithdrawalStatus.PENDING_OPERATOR) {
        w.status = WithdrawalStatus.READY;
        w.readyAt = BigInt(blockNumber);
        w.updatedAt = BigInt(blockNumber);
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
  const domain = await db.checkAndGetDomain(
    operator.domainId,
    BigInt(blockNumber)
  );
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
        w.unlockedAt = BigInt(blockNumber);
        w.updatedAt = BigInt(blockNumber);
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
        d.updatedAt = BigInt(blockNumber);
        await d.save();
      }
    });
  }

  domain.totalWithdrawals += amountBigInt;
  domain.updatedAt = BigInt(blockNumber);

  account.totalWithdrawals += amountBigInt;
  account.updatedAt = BigInt(blockNumber);

  operator.totalWithdrawals += amountBigInt;
  operator.updatedAt = BigInt(blockNumber);

  nominator.totalWithdrawals += amountBigInt;
  nominator.pendingAction = NominatorPendingAction.NO_ACTION_REQUIRED;
  nominator.updatedAt = BigInt(blockNumber);

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
