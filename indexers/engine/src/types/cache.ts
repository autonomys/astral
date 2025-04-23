import type { Operator, Withdrawal } from "@autonomys/auto-consensus";

export type CachedBlock = {
  id: string;
  sortId: string;
  height: bigint;
  hash: string;
  timestamp: Date;
  parentHash: string;
  specId: string;
  stateRoot: string;
  extrinsicsRoot: string;
  spacePledged: bigint;
  blockchainSize: bigint;
  extrinsicsCount: number;
  eventsCount: number;
  logsCount: number;
  transfersCount: number;
  rewardsCount: number;
  blockRewardsCount: number;
  voteRewardsCount: number;
  transferValue: bigint;
  rewardValue: bigint;
  blockRewardValue: bigint;
  voteRewardValue: bigint;
  authorId: string;
};

export type CachedLog = {
  id: string;
  sortId: string;
  logId: string;
  blockId: string;
  blockHeight: bigint;
  blockHash: string;
  indexInBlock: number;
  kind: string;
  value: string;
  timestamp: Date;
};

export type CachedExtrinsic = {
  id: string;
  sortId: string;
  extrinsicId: string;
  hash: string;
  blockId: string;
  blockHeight: bigint;
  blockHash: string;
  indexInBlock: number;
  section: string;
  module: string;
  name: string;
  success: boolean;
  timestamp: Date;
  nonce: bigint;
  signer: string;
  signature: string;
  eventsCount: number;
  args: string;
  error: string;
  tip: bigint;
  fee: bigint;
  pos: number;
  cid: string;
};

export type CachedEvent = {
  id: string;
  sortId: string;
  eventId: string;
  blockId: string;
  blockHeight: bigint;
  blockHash: string;
  extrinsicId: string;
  extrinsicHash: string;
  indexInBlock: bigint;
  section: string;
  module: string;
  name: string;
  timestamp: Date;
  phase: string;
  pos: number;
  args: string;
  cid: string;
};

export type CachedAccountHistory = {
  id: string;
  accountId: string;
  nonce: bigint;
  free: bigint;
  reserved: bigint;
  total: bigint;
  blockId: string;
  blockHeight: bigint;
  blockHash: string;
};

export type CachedTransfer = {
  id: string;
  blockId: string;
  blockHeight: bigint;
  blockHash: string;
  extrinsicId: string;
  eventId: string;
  from: string;
  fromChain: string;
  to: string;
  toChain: string;
  value: bigint;
  fee: bigint;
  type: string;
  success: boolean;
  isFinalized: boolean;
  timestamp: Date;
};

export type CachedReward = {
  id: string;
  blockId: string;
  blockHeight: bigint;
  blockHash: string;
  extrinsicId: string;
  eventId: string;
  accountId: string;
  rewardType: string;
  amount: bigint;
  timestamp: Date;
};

export type CachedLeaderboardEntity = {
  id: string;
  accountId: string;
  value: bigint;
  lastContributionAt: Date;
  blockId: string;
  blockHeight: bigint;
  extrinsicId: string;
  eventId: string;
};

export type CachedCid = {
  id: string;
  cid: string;
  blockId: string;
  blockHeight: bigint;
  blockHash: string;
  extrinsicId: string;
  extrinsicHash: string;
  indexInBlock: number;
  links: string[];
  blake3Hash: string;
  isArchived: boolean;
  timestamp: Date;
};

export type CachedChunk = {
  id: string;
  cid: string;
  blockId: string;
  blockHeight: bigint;
  blockHash: string;
  type: string;
  linkDepth: number;
  size: bigint;
  name: string;
  data: string;
  uploadOptions: string;
};

export type CachedFolder = {
  id: string;
  sortId: string;
  cid: string;
  blockId: string;
  blockHeight: bigint;
  blockHash: string;
  extrinsicId: string;
  size: bigint;
  name: string;
};

export type CachedFolderCid = {
  id: string;
  blockId: string;
  parentCid: string;
  childCid: string;
};

export type CachedFile = {
  id: string;
  sortId: string;
  cid: string;
  blockId: string;
  blockHeight: bigint;
  blockHash: string;
  extrinsicId: string;
  size: bigint;
  name: string;
};

export type CachedFileCid = {
  id: string;
  blockId: string;
  parentCid: string;
  childCid: string;
};

export type CachedMetadata = {
  id: string;
  sortId: string;
  cid: string;
  blockId: string;
  blockHeight: bigint;
  blockHash: string;
  extrinsicId: string;
  size: bigint;
  name: string;
};

export type CachedMetadataCid = {
  id: string;
  blockId: string;
  parentCid: string;
  childCid: string;
};

export type CachedFileError = {
  id: string;
  blockId: string;
  blockHeight: bigint;
  blockHash: string;
  extrinsicId: string;
  extrinsicHash: string;
  indexInBlock: number;
  error: string;
  timestamp: Date;
};

export type CachedBundleSubmission = {
  id: string;
  accountId: string;
  bundleId: string;
  domainId: string;
  domainBlockId: string;
  operatorId: string;
  domainBlockNumber: bigint;
  domainBlockHash: string;
  domainBlockExtrinsicRoot: string;
  epoch: bigint;
  consensusBlockNumber: bigint;
  consensusBlockHash: string;
  totalTransfersIn: bigint;
  transfersInCount: bigint;
  totalTransfersOut: bigint;
  transfersOutCount: bigint;
  totalRejectedTransfersClaimed: bigint;
  rejectedTransfersClaimedCount: bigint;
  totalTransfersRejected: bigint;
  transfersRejectedCount: bigint;
  totalVolume: bigint;
  consensusStorageFee: bigint;
  domainExecutionFee: bigint;
  burnedBalance: bigint;
  blockHeight: bigint;
  extrinsicId: string;
  eventId: string;
};

export type CachedRuntimeCreation = {
  id: string;
  sortId: string;
  name: string;
  type: string;
  createdBy: string;
  blockHeight: bigint;
  extrinsicId: string;
  eventId: string;
};

export type CachedDomainInstantiation = {
  id: string;
  sortId: string;
  name: string;
  runtimeId: number;
  runtime: string;
  runtimeInfo: string;
  createdBy: string;
  blockHeight: bigint;
  extrinsicId: string;
  eventId: string;
};

export type CachedOperatorRegistration = {
  id: string;
  sortId: string;
  owner: string;
  domainId: string;
  signingKey: string;
  minimumNominatorStake: bigint;
  nominationTax: number;
  blockHeight: bigint;
  extrinsicId: string;
  eventId: string;
};

export type CachedOperatorDeregistration = {
  id: string;
  owner: string;
  domainId: string;
  blockHeight: bigint;
  extrinsicId: string;
  eventId: string;
};

export type CachedDepositEvent = {
  id: string;
  sortId: string;
  accountId: string;
  domainId: string;
  operatorId: string;
  nominatorId: string;
  amount: bigint;
  storageFeeDeposit: bigint;
  totalAmount: bigint;
  estimatedShares: bigint;
  timestamp: Date;
  blockHeight: bigint;
  extrinsicId: string;
  eventId: string;
};

export type CachedWithdrawEvent = {
  id: string;
  sortId: string;
  accountId: string;
  domainId: string;
  operatorId: string;
  nominatorId: string;
  toWithdraw: string;
  shares: bigint;
  storageFeeRefund: bigint;
  estimatedAmount: bigint;
  timestamp: Date;
  blockHeight: bigint;
  extrinsicId: string;
  eventId: string;
};

export type CachedUnlockedEvent = {
  id: string;
  domainId: string;
  operatorId: string;
  accountId: string;
  nominatorId: string;
  amount: bigint;
  storageFee: bigint;
  timestamp: Date;
  blockHeight: bigint;
  extrinsicId: string;
  eventId: string;
};

export type CachedNominatorsUnlockedEvent = {
  id: string;
  domainId: string;
  operatorId: string;
  blockHeight: bigint;
  extrinsicId: string;
  eventId: string;
};

export type CachedOperatorReward = {
  id: string;
  domainId: string;
  operatorId: string;
  amount: bigint;
  atBlockNumber: bigint;
  blockHeight: bigint;
  extrinsicId: string;
  eventId: string;
};

export type CachedOperatorTaxCollection = {
  id: string;
  domainId: string;
  operatorId: string;
  amount: bigint;
  blockHeight: bigint;
  extrinsicId: string;
  eventId: string;
};

export type CachedDomainStakingHistory = {
  id: string;
  domainId: string;
  currentEpochIndex: number;
  currentTotalStake: bigint;
  currentTotalShares: bigint;
  sharePrice: bigint;
  timestamp: Date;
  blockHeight: bigint;
};

export type CachedOperatorStakingHistory = {
  id: string;
  operatorId: string;
  operatorOwner: string;
  signingKey: string;
  currentDomainId: string;
  currentTotalStake: bigint;
  currentTotalShares: bigint;
  depositsInEpoch: bigint;
  withdrawalsInEpoch: bigint;
  totalStorageFeeDeposit: bigint;
  sharePrice: bigint;
  partialStatus: string;
  timestamp: Date;
  blockHeight: bigint;
};

export type PersistentCache = {
  operatorOwnerMap: Map<string, string>;
};

export type Cache = PersistentCache & {
  // Metadata
  currentBlock: number | null;
  targetHeight: number | null;
  lastProcessedHeight: number | null;
  // Consensus entities
  blocks: CachedBlock[];
  logs: CachedLog[];
  extrinsics: CachedExtrinsic[];
  events: CachedEvent[];
  transfers: CachedTransfer[];
  rewards: CachedReward[];
  accountHistories: CachedAccountHistory[];
  // Leaderboard entities
  accountExtrinsicFailedTotalCountHistory: CachedLeaderboardEntity[];
  accountExtrinsicSuccessTotalCountHistory: CachedLeaderboardEntity[];
  accountExtrinsicTotalCountHistory: CachedLeaderboardEntity[];
  accountRemarkCountHistory: CachedLeaderboardEntity[];
  accountTransactionFeePaidTotalValueHistory: CachedLeaderboardEntity[];
  accountTransferReceiverTotalCountHistory: CachedLeaderboardEntity[];
  accountTransferReceiverTotalValueHistory: CachedLeaderboardEntity[];
  accountTransferSenderTotalCountHistory: CachedLeaderboardEntity[];
  accountTransferSenderTotalValueHistory: CachedLeaderboardEntity[];
  farmerBlockTotalCountHistory: CachedLeaderboardEntity[];
  farmerBlockTotalValueHistory: CachedLeaderboardEntity[];
  farmerVoteAndBlockTotalCountHistory: CachedLeaderboardEntity[];
  farmerVoteAndBlockTotalValueHistory: CachedLeaderboardEntity[];
  farmerVoteTotalCountHistory: CachedLeaderboardEntity[];
  farmerVoteTotalValueHistory: CachedLeaderboardEntity[];
  nominatorDepositsTotalCountHistory: CachedLeaderboardEntity[];
  nominatorDepositsTotalValueHistory: CachedLeaderboardEntity[];
  nominatorWithdrawalsTotalCountHistory: CachedLeaderboardEntity[];
  nominatorWithdrawalsTotalValueHistory: CachedLeaderboardEntity[];
  operatorBundleTotalCountHistory: CachedLeaderboardEntity[];
  operatorDepositsTotalCountHistory: CachedLeaderboardEntity[];
  operatorDepositsTotalValueHistory: CachedLeaderboardEntity[];
  operatorTotalRewardsCollectedHistory: CachedLeaderboardEntity[];
  operatorTotalTaxCollectedHistory: CachedLeaderboardEntity[];
  operatorWithdrawalsTotalCountHistory: CachedLeaderboardEntity[];
  operatorWithdrawalsTotalValueHistory: CachedLeaderboardEntity[];
  // Files entities
  cids: CachedCid[];
  chunks: CachedChunk[];
  folders: CachedFolder[];
  files: CachedFile[];
  filesErrors: CachedFileError[];
  metadata: CachedMetadata[];
  metadataCids: CachedMetadataCid[];
  folderCids: CachedFolderCid[];
  fileCids: CachedFileCid[];
  // Staking entities
  bundleSubmission: CachedBundleSubmission[];
  runtimeCreation: CachedRuntimeCreation[];
  domainInstantiation: CachedDomainInstantiation[];
  operatorRegistration: CachedOperatorRegistration[];
  operatorDeregistration: CachedOperatorDeregistration[];
  depositEvent: CachedDepositEvent[];
  withdrawEvent: CachedWithdrawEvent[];
  unlockedEvent: CachedUnlockedEvent[];
  nominatorsUnlockedEvent: CachedNominatorsUnlockedEvent[];
  operatorReward: CachedOperatorReward[];
  operatorTaxCollection: CachedOperatorTaxCollection[];
  domainStakingHistory: CachedDomainStakingHistory[];
  operatorStakingHistory: CachedOperatorStakingHistory[];
  // Addresses balances to update
  addressToUpdate: Set<string>;
  // Totals (for consensus.blocks)
  totalBlockRewardsCount: number;
  totalVoteRewardsCount: number;
  totalTransferValue: bigint;
  totalRewardValue: bigint;
  totalBlockRewardValue: bigint;
  totalVoteRewardValue: bigint;
  // only for caching purposes
  parentBlockOperators: Operator[];
  currentWithdrawal: Withdrawal[];
};
