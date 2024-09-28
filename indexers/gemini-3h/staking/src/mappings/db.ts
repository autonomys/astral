import {
  Account,
  Bundle,
  BundleAuthor,
  Deposit,
  Domain,
  DomainBlock,
  DomainEpoch,
  Nominator,
  Operator,
  Reward,
  Stats,
  StatsPerAccount,
  StatsPerDomain,
  StatsPerNominator,
  StatsPerOperator,
  Withdrawal,
} from "../types";
import {
  DepositStatus,
  DomainRuntime,
  NominatorPendingAction,
  NominatorStatus,
  OperatorPendingAction,
  OperatorStatus,
  WithdrawalStatus,
} from "./models";

// Helper for Domain
export async function checkAndGetDomain(
  domainId: string,
  blockNumber: number
): Promise<Domain> {
  const id = domainId.toLowerCase();
  let domain = await Domain.get(id);
  if (!domain) {
    domain = Domain.create({
      id,
      sortId: Number(id),
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
  let account = await Account.get(id);
  if (!account) {
    account = Account.create({
      id,
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
      sortId: Number(id),
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
