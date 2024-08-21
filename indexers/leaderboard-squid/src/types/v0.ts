import { sts, Result, Option, Bytes, BitSequence } from './support'

export const Weight: sts.Type<Weight> = sts.struct(() => {
  return {
    refTime: sts.bigint(),
    proofSize: sts.bigint(),
  }
})

export interface Weight {
  refTime: bigint
  proofSize: bigint
}

export const HistorySize = sts.bigint()

export const RuntimeVersion: sts.Type<RuntimeVersion> = sts.struct(() => {
  return {
    specName: sts.string(),
    implName: sts.string(),
    authoringVersion: sts.number(),
    specVersion: sts.number(),
    implVersion: sts.number(),
    apis: sts.array(() => sts.tuple(() => [sts.bytes(), sts.number()])),
    transactionVersion: sts.number(),
    stateVersion: sts.number(),
    extrinsicStateVersion: sts.number(),
  }
})

export interface RuntimeVersion {
  specName: string
  implName: string
  authoringVersion: number
  specVersion: number
  implVersion: number
  apis: [Bytes, number][]
  transactionVersion: number
  stateVersion: number
  extrinsicStateVersion: number
}

export const RuntimeDbWeight: sts.Type<RuntimeDbWeight> = sts.struct(() => {
  return {
    read: sts.bigint(),
    write: sts.bigint(),
  }
})

export interface RuntimeDbWeight {
  read: bigint
  write: bigint
}

export const BlockLength: sts.Type<BlockLength> = sts.struct(() => {
  return {
    max: Type_85,
  }
})

export const Type_85: sts.Type<Type_85> = sts.struct(() => {
  return {
    normal: sts.number(),
    operational: sts.number(),
    mandatory: sts.number(),
  }
})

export interface Type_85 {
  normal: number
  operational: number
  mandatory: number
}

export interface BlockLength {
  max: Type_85
}

export const BlockWeights: sts.Type<BlockWeights> = sts.struct(() => {
  return {
    baseBlock: Weight,
    maxBlock: Weight,
    perClass: Type_81,
  }
})

export const Type_81: sts.Type<Type_81> = sts.struct(() => {
  return {
    normal: WeightsPerClass,
    operational: WeightsPerClass,
    mandatory: WeightsPerClass,
  }
})

export const WeightsPerClass: sts.Type<WeightsPerClass> = sts.struct(() => {
  return {
    baseExtrinsic: Weight,
    maxExtrinsic: sts.option(() => Weight),
    maxTotal: sts.option(() => Weight),
    reserved: sts.option(() => Weight),
  }
})

export interface WeightsPerClass {
  baseExtrinsic: Weight
  maxExtrinsic?: Weight | undefined
  maxTotal?: Weight | undefined
  reserved?: Weight | undefined
}

export interface Type_81 {
  normal: WeightsPerClass
  operational: WeightsPerClass
  mandatory: WeightsPerClass
}

export interface BlockWeights {
  baseBlock: Weight
  maxBlock: Weight
  perClass: Type_81
}

export interface TxRangeState {
  txRange: U256
  intervalBlocks: bigint
  intervalBundles: bigint
}

export type U256 = bigint

export const TxRangeState: sts.Type<TxRangeState> = sts.struct(() => {
  return {
    txRange: U256,
    intervalBlocks: sts.bigint(),
    intervalBundles: sts.bigint(),
  }
})

export const U256 = sts.bigint()

export interface ElectionVerificationParams {
  operators: [bigint, bigint][]
  totalDomainStake: bigint
}

export const ElectionVerificationParams: sts.Type<ElectionVerificationParams> = sts.struct(() => {
  return {
    operators: sts.array(() => sts.tuple(() => [sts.bigint(), sts.bigint()])),
    totalDomainStake: sts.bigint(),
  }
})

export interface BundleDigest {
  headerHash: H256
  extrinsicsRoot: H256
}

export const BundleDigest: sts.Type<BundleDigest> = sts.struct(() => {
  return {
    headerHash: H256,
    extrinsicsRoot: H256,
  }
})

export interface BlockTreeNode {
  executionReceipt: ExecutionReceipt
  operatorIds: bigint[]
}

export interface ExecutionReceipt {
  domainBlockNumber: number
  domainBlockHash: H256
  domainBlockExtrinsicRoot: H256
  parentDomainBlockReceiptHash: H256
  consensusBlockNumber: number
  consensusBlockHash: H256
  inboxedBundles: InboxedBundle[]
  finalStateRoot: H256
  executionTrace: H256[]
  executionTraceRoot: H256
  blockFees: BlockFees
}

export interface BlockFees {
  consensusStorageFee: bigint
  domainExecutionFee: bigint
}

export interface InboxedBundle {
  bundle: BundleValidity
  extrinsicsRoot: H256
}

export type BundleValidity = BundleValidity_Invalid | BundleValidity_Valid

export interface BundleValidity_Invalid {
  __kind: 'Invalid'
  value: InvalidBundleType
}

export interface BundleValidity_Valid {
  __kind: 'Valid'
  value: H256
}

export type InvalidBundleType =
  | InvalidBundleType_IllegalTx
  | InvalidBundleType_InherentExtrinsic
  | InvalidBundleType_InvalidXDM
  | InvalidBundleType_OutOfRangeTx
  | InvalidBundleType_UndecodableTx

export interface InvalidBundleType_IllegalTx {
  __kind: 'IllegalTx'
  value: number
}

export interface InvalidBundleType_InherentExtrinsic {
  __kind: 'InherentExtrinsic'
  value: number
}

export interface InvalidBundleType_InvalidXDM {
  __kind: 'InvalidXDM'
  value: number
}

export interface InvalidBundleType_OutOfRangeTx {
  __kind: 'OutOfRangeTx'
  value: number
}

export interface InvalidBundleType_UndecodableTx {
  __kind: 'UndecodableTx'
  value: number
}

export const BlockTreeNode: sts.Type<BlockTreeNode> = sts.struct(() => {
  return {
    executionReceipt: ExecutionReceipt,
    operatorIds: sts.array(() => sts.bigint()),
  }
})

export const ExecutionReceipt: sts.Type<ExecutionReceipt> = sts.struct(() => {
  return {
    domainBlockNumber: sts.number(),
    domainBlockHash: H256,
    domainBlockExtrinsicRoot: H256,
    parentDomainBlockReceiptHash: H256,
    consensusBlockNumber: sts.number(),
    consensusBlockHash: H256,
    inboxedBundles: sts.array(() => InboxedBundle),
    finalStateRoot: H256,
    executionTrace: sts.array(() => H256),
    executionTraceRoot: H256,
    blockFees: BlockFees,
  }
})

export const BlockFees: sts.Type<BlockFees> = sts.struct(() => {
  return {
    consensusStorageFee: sts.bigint(),
    domainExecutionFee: sts.bigint(),
  }
})

export const InboxedBundle: sts.Type<InboxedBundle> = sts.struct(() => {
  return {
    bundle: BundleValidity,
    extrinsicsRoot: H256,
  }
})

export const BundleValidity: sts.Type<BundleValidity> = sts.closedEnum(() => {
  return {
    Invalid: InvalidBundleType,
    Valid: H256,
  }
})

export const InvalidBundleType: sts.Type<InvalidBundleType> = sts.closedEnum(() => {
  return {
    IllegalTx: sts.number(),
    InherentExtrinsic: sts.number(),
    InvalidXDM: sts.number(),
    OutOfRangeTx: sts.number(),
    UndecodableTx: sts.number(),
  }
})

export interface DomainObject {
  ownerAccountId: AccountId32
  createdAt: number
  genesisReceiptHash: H256
  domainConfig: DomainConfig
  domainRuntimeInfo: DomainRuntimeInfo
}

export type DomainRuntimeInfo = DomainRuntimeInfo_EVM

export interface DomainRuntimeInfo_EVM {
  __kind: 'EVM'
  chainId: bigint
}

export interface DomainConfig {
  domainName: string
  runtimeId: number
  maxBlockSize: number
  maxBlockWeight: Weight
  bundleSlotProbability: [bigint, bigint]
  targetBundlesPerBlock: number
  operatorAllowList: OperatorAllowList
}

export type OperatorAllowList = OperatorAllowList_Anyone | OperatorAllowList_Operators

export interface OperatorAllowList_Anyone {
  __kind: 'Anyone'
}

export interface OperatorAllowList_Operators {
  __kind: 'Operators'
  value: AccountId32[]
}

export const DomainObject: sts.Type<DomainObject> = sts.struct(() => {
  return {
    ownerAccountId: AccountId32,
    createdAt: sts.number(),
    genesisReceiptHash: H256,
    domainConfig: DomainConfig,
    domainRuntimeInfo: DomainRuntimeInfo,
  }
})

export const DomainRuntimeInfo: sts.Type<DomainRuntimeInfo> = sts.closedEnum(() => {
  return {
    EVM: sts.enumStruct({
      chainId: sts.bigint(),
    }),
  }
})

export interface Withdrawal {
  totalWithdrawalAmount: bigint
  withdrawals: [DomainId, number, bigint][]
  withdrawalInShares?: [DomainEpoch, number, bigint] | undefined
}

export const Withdrawal: sts.Type<Withdrawal> = sts.struct(() => {
  return {
    totalWithdrawalAmount: sts.bigint(),
    withdrawals: sts.array(() => sts.tuple(() => [DomainId, sts.number(), sts.bigint()])),
    withdrawalInShares: sts.option(() =>
      sts.tuple(() => [DomainEpoch, sts.number(), sts.bigint()]),
    ),
  }
})

export interface Deposit {
  known: KnownDeposit
  pending?: PendingDeposit | undefined
}

export interface PendingDeposit {
  effectiveDomainEpoch: DomainEpoch
  amount: bigint
}

export interface KnownDeposit {
  shares: bigint
}

export const Deposit: sts.Type<Deposit> = sts.struct(() => {
  return {
    known: KnownDeposit,
    pending: sts.option(() => PendingDeposit),
  }
})

export const PendingDeposit: sts.Type<PendingDeposit> = sts.struct(() => {
  return {
    effectiveDomainEpoch: DomainEpoch,
    amount: sts.bigint(),
  }
})

export const KnownDeposit: sts.Type<KnownDeposit> = sts.struct(() => {
  return {
    shares: sts.bigint(),
  }
})

export type DomainEpoch = [DomainId, number]

export type SharePrice = number

export const SharePrice = sts.number()

export const DomainEpoch = sts.tuple(() => [DomainId, sts.number()])

export interface Operator {
  signingKey: Bytes
  currentDomainId: DomainId
  nextDomainId: DomainId
  minimumNominatorStake: bigint
  nominationTax: Percent
  currentTotalStake: bigint
  currentEpochRewards: bigint
  currentTotalShares: bigint
  status: OperatorStatus
  depositsInEpoch: bigint
  withdrawalsInEpoch: bigint
}

export type OperatorStatus =
  | OperatorStatus_Deregistered
  | OperatorStatus_Registered
  | OperatorStatus_Slashed

export interface OperatorStatus_Deregistered {
  __kind: 'Deregistered'
  value: OperatorDeregisteredInfo
}

export interface OperatorStatus_Registered {
  __kind: 'Registered'
}

export interface OperatorStatus_Slashed {
  __kind: 'Slashed'
}

export interface OperatorDeregisteredInfo {
  domainEpoch: DomainEpoch
  unlockAtConfirmedDomainBlockNumber: number
}

export type Percent = number

export const Operator: sts.Type<Operator> = sts.struct(() => {
  return {
    signingKey: sts.bytes(),
    currentDomainId: DomainId,
    nextDomainId: DomainId,
    minimumNominatorStake: sts.bigint(),
    nominationTax: Percent,
    currentTotalStake: sts.bigint(),
    currentEpochRewards: sts.bigint(),
    currentTotalShares: sts.bigint(),
    status: OperatorStatus,
    depositsInEpoch: sts.bigint(),
    withdrawalsInEpoch: sts.bigint(),
  }
})

export const OperatorStatus: sts.Type<OperatorStatus> = sts.closedEnum(() => {
  return {
    Deregistered: OperatorDeregisteredInfo,
    Registered: sts.unit(),
    Slashed: sts.unit(),
  }
})

export const OperatorDeregisteredInfo: sts.Type<OperatorDeregisteredInfo> = sts.struct(() => {
  return {
    domainEpoch: DomainEpoch,
    unlockAtConfirmedDomainBlockNumber: sts.number(),
  }
})

export const Percent = sts.number()

export interface StakingSummary {
  currentEpochIndex: number
  currentTotalStake: bigint
  currentOperators: [bigint, bigint][]
  nextOperators: bigint[]
  currentEpochRewards: [bigint, bigint][]
}

export const StakingSummary: sts.Type<StakingSummary> = sts.struct(() => {
  return {
    currentEpochIndex: sts.number(),
    currentTotalStake: sts.bigint(),
    currentOperators: sts.array(() => sts.tuple(() => [sts.bigint(), sts.bigint()])),
    nextOperators: sts.array(() => sts.bigint()),
    currentEpochRewards: sts.array(() => sts.tuple(() => [sts.bigint(), sts.bigint()])),
  }
})

export interface ScheduledRuntimeUpgrade {
  rawGenesis: RawGenesis
  version: RuntimeVersion
  hash: H256
}

export interface RawGenesis {
  top: [StorageKey, StorageData][]
  childrenDefault: [StorageKey, [StorageKey, StorageData][]][]
}

export type StorageData = Bytes

export type StorageKey = Bytes

export const ScheduledRuntimeUpgrade: sts.Type<ScheduledRuntimeUpgrade> = sts.struct(() => {
  return {
    rawGenesis: RawGenesis,
    version: RuntimeVersion,
    hash: H256,
  }
})

export const RawGenesis: sts.Type<RawGenesis> = sts.struct(() => {
  return {
    top: sts.array(() => sts.tuple(() => [StorageKey, StorageData])),
    childrenDefault: sts.array(() =>
      sts.tuple(() => [StorageKey, sts.array(() => sts.tuple(() => [StorageKey, StorageData]))]),
    ),
  }
})

export const StorageData = sts.bytes()

export const StorageKey = sts.bytes()

export interface RuntimeObject {
  runtimeName: string
  runtimeType: RuntimeType
  runtimeUpgrades: number
  hash: H256
  rawGenesis: RawGenesis
  version: RuntimeVersion
  createdAt: number
  updatedAt: number
}

export type RuntimeType = RuntimeType_Evm

export interface RuntimeType_Evm {
  __kind: 'Evm'
}

export const RuntimeObject: sts.Type<RuntimeObject> = sts.struct(() => {
  return {
    runtimeName: sts.string(),
    runtimeType: RuntimeType,
    runtimeUpgrades: sts.number(),
    hash: H256,
    rawGenesis: RawGenesis,
    version: RuntimeVersion,
    createdAt: sts.number(),
    updatedAt: sts.number(),
  }
})

export type DomainId = number

export type Releases = Releases_V1Ancient | Releases_V2

export interface Releases_V1Ancient {
  __kind: 'V1Ancient'
}

export interface Releases_V2 {
  __kind: 'V2'
}

export const Releases: sts.Type<Releases> = sts.closedEnum(() => {
  return {
    V1Ancient: sts.unit(),
    V2: sts.unit(),
  }
})

export type FixedU128 = bigint

export const FixedU128 = sts.bigint()

export interface CollectedFees {
  storage: bigint
  compute: bigint
  tips: bigint
}

export const CollectedFees: sts.Type<CollectedFees> = sts.struct(() => {
  return {
    storage: sts.bigint(),
    compute: sts.bigint(),
    tips: sts.bigint(),
  }
})

export interface BlockTransactionByteFee {
  current: bigint
  next: bigint
}

export const BlockTransactionByteFee: sts.Type<BlockTransactionByteFee> = sts.struct(() => {
  return {
    current: sts.bigint(),
    next: sts.bigint(),
  }
})

export interface Type_152 {
  amount: bigint
}

export const Type_152: sts.Type<Type_152> = sts.struct(() => {
  return {
    amount: sts.bigint(),
  }
})

export interface IdAmount {
  id: HoldIdentifier
  amount: bigint
}

export type HoldIdentifier = HoldIdentifier_Domains

export interface HoldIdentifier_Domains {
  __kind: 'Domains'
  value: DomainsHoldIdentifier
}

export type DomainsHoldIdentifier =
  | DomainsHoldIdentifier_DomainInstantiation
  | DomainsHoldIdentifier_Staking

export interface DomainsHoldIdentifier_DomainInstantiation {
  __kind: 'DomainInstantiation'
  value: DomainId
}

export interface DomainsHoldIdentifier_Staking {
  __kind: 'Staking'
  value: StakingHoldIdentifier
}

export type StakingHoldIdentifier = StakingHoldIdentifier_Staked

export interface StakingHoldIdentifier_Staked {
  __kind: 'Staked'
  value: bigint
}

export const IdAmount: sts.Type<IdAmount> = sts.struct(() => {
  return {
    id: HoldIdentifier,
    amount: sts.bigint(),
  }
})

export const HoldIdentifier: sts.Type<HoldIdentifier> = sts.closedEnum(() => {
  return {
    Domains: DomainsHoldIdentifier,
  }
})

export const DomainsHoldIdentifier: sts.Type<DomainsHoldIdentifier> = sts.closedEnum(() => {
  return {
    DomainInstantiation: DomainId,
    Staking: StakingHoldIdentifier,
  }
})

export const StakingHoldIdentifier: sts.Type<StakingHoldIdentifier> = sts.closedEnum(() => {
  return {
    Staked: sts.bigint(),
  }
})

export interface ReserveData {
  id: Bytes
  amount: bigint
}

export const ReserveData: sts.Type<ReserveData> = sts.struct(() => {
  return {
    id: sts.bytes(),
    amount: sts.bigint(),
  }
})

export interface BalanceLock {
  id: Bytes
  amount: bigint
  reasons: Reasons
}

export type Reasons = Reasons_All | Reasons_Fee | Reasons_Misc

export interface Reasons_All {
  __kind: 'All'
}

export interface Reasons_Fee {
  __kind: 'Fee'
}

export interface Reasons_Misc {
  __kind: 'Misc'
}

export const BalanceLock: sts.Type<BalanceLock> = sts.struct(() => {
  return {
    id: sts.bytes(),
    amount: sts.bigint(),
    reasons: Reasons,
  }
})

export const Reasons: sts.Type<Reasons> = sts.closedEnum(() => {
  return {
    All: sts.unit(),
    Fee: sts.unit(),
    Misc: sts.unit(),
  }
})

export interface AccountData {
  free: bigint
  reserved: bigint
  frozen: bigint
  flags: ExtraFlags
}

export type ExtraFlags = bigint

export const AccountData: sts.Type<AccountData> = sts.struct(() => {
  return {
    free: sts.bigint(),
    reserved: sts.bigint(),
    frozen: sts.bigint(),
    flags: ExtraFlags,
  }
})

export const ExtraFlags = sts.bigint()

export type Randomness = Bytes

export const Randomness = sts.bytes()

export interface PotEntropyValue {
  targetSlot?: Slot | undefined
  entropy: Bytes
}

export const PotEntropyValue: sts.Type<PotEntropyValue> = sts.struct(() => {
  return {
    targetSlot: sts.option(() => Slot),
    entropy: sts.bytes(),
  }
})

export type Signature = Bytes

export const Signature = sts.bytes()

export interface Scalar {
  inner: Bytes
}

export type PieceOffset = number

export const Scalar: sts.Type<Scalar> = sts.struct(() => {
  return {
    inner: sts.bytes(),
  }
})

export const PieceOffset = sts.number()

export interface VoteVerificationData {
  solutionRange: bigint
  voteSolutionRange: bigint
  currentSlot: Slot
  parentSlot: Slot
}

export const VoteVerificationData: sts.Type<VoteVerificationData> = sts.struct(() => {
  return {
    solutionRange: sts.bigint(),
    voteSolutionRange: sts.bigint(),
    currentSlot: Slot,
    parentSlot: Slot,
  }
})

export type SegmentIndex = bigint

export type SegmentCommitment = Bytes

export const SegmentCommitment = sts.bytes()

export const SegmentIndex = sts.bigint()

export type Public = Bytes

export interface SolutionRangeOverride {
  solutionRange: bigint
  votingSolutionRange: bigint
}

export const SolutionRangeOverride: sts.Type<SolutionRangeOverride> = sts.struct(() => {
  return {
    solutionRange: sts.bigint(),
    votingSolutionRange: sts.bigint(),
  }
})

export interface SolutionRanges {
  current: bigint
  next?: bigint | undefined
  votingCurrent: bigint
  votingNext?: bigint | undefined
}

export const SolutionRanges: sts.Type<SolutionRanges> = sts.struct(() => {
  return {
    current: sts.bigint(),
    next: sts.option(() => sts.bigint()),
    votingCurrent: sts.bigint(),
    votingNext: sts.option(() => sts.bigint()),
  }
})

export type NonZeroU32 = number

export const NonZeroU32 = sts.number()

export type Slot = bigint

export const Slot = sts.bigint()

export interface CodeUpgradeAuthorization {
  codeHash: H256
  checkVersion: boolean
}

export const CodeUpgradeAuthorization: sts.Type<CodeUpgradeAuthorization> = sts.struct(() => {
  return {
    codeHash: H256,
    checkVersion: sts.boolean(),
  }
})

export type Phase = Phase_ApplyExtrinsic | Phase_Finalization | Phase_Initialization

export interface Phase_ApplyExtrinsic {
  __kind: 'ApplyExtrinsic'
  value: number
}

export interface Phase_Finalization {
  __kind: 'Finalization'
}

export interface Phase_Initialization {
  __kind: 'Initialization'
}

export const Phase: sts.Type<Phase> = sts.closedEnum(() => {
  return {
    ApplyExtrinsic: sts.number(),
    Finalization: sts.unit(),
    Initialization: sts.unit(),
  }
})

export interface LastRuntimeUpgradeInfo {
  specVersion: number
  specName: string
}

export const LastRuntimeUpgradeInfo: sts.Type<LastRuntimeUpgradeInfo> = sts.struct(() => {
  return {
    specVersion: sts.number(),
    specName: sts.string(),
  }
})

export interface EventRecord {
  phase: Phase
  event: Event
  topics: H256[]
}

export type Event =
  | Event_Balances
  | Event_Domains
  | Event_Messenger
  | Event_OffencesSubspace
  | Event_Rewards
  | Event_Subspace
  | Event_Sudo
  | Event_System
  | Event_TransactionFees
  | Event_TransactionPayment
  | Event_Transporter
  | Event_Utility
  | Event_Vesting

export interface Event_Balances {
  __kind: 'Balances'
  value: BalancesEvent
}

export interface Event_Domains {
  __kind: 'Domains'
  value: DomainsEvent
}

export interface Event_Messenger {
  __kind: 'Messenger'
  value: MessengerEvent
}

export interface Event_OffencesSubspace {
  __kind: 'OffencesSubspace'
  value: OffencesSubspaceEvent
}

export interface Event_Rewards {
  __kind: 'Rewards'
  value: RewardsEvent
}

export interface Event_Subspace {
  __kind: 'Subspace'
  value: SubspaceEvent
}

export interface Event_Sudo {
  __kind: 'Sudo'
  value: SudoEvent
}

export interface Event_System {
  __kind: 'System'
  value: SystemEvent
}

export interface Event_TransactionFees {
  __kind: 'TransactionFees'
  value: TransactionFeesEvent
}

export interface Event_TransactionPayment {
  __kind: 'TransactionPayment'
  value: TransactionPaymentEvent
}

export interface Event_Transporter {
  __kind: 'Transporter'
  value: TransporterEvent
}

export interface Event_Utility {
  __kind: 'Utility'
  value: UtilityEvent
}

export interface Event_Vesting {
  __kind: 'Vesting'
  value: VestingEvent
}

/**
 * The `Event` enum of this pallet
 */
export type VestingEvent =
  | VestingEvent_Claimed
  | VestingEvent_VestingScheduleAdded
  | VestingEvent_VestingSchedulesUpdated

/**
 * Claimed vesting.
 */
export interface VestingEvent_Claimed {
  __kind: 'Claimed'
  who: AccountId32
  amount: bigint
}

/**
 * Added new vesting schedule.
 */
export interface VestingEvent_VestingScheduleAdded {
  __kind: 'VestingScheduleAdded'
  from: AccountId32
  to: AccountId32
  vestingSchedule: VestingSchedule
}

/**
 * Updated vesting schedules.
 */
export interface VestingEvent_VestingSchedulesUpdated {
  __kind: 'VestingSchedulesUpdated'
  who: AccountId32
}

export interface VestingSchedule {
  start: number
  period: number
  periodCount: number
  perPeriod: bigint
}

/**
 * The `Event` enum of this pallet
 */
export type UtilityEvent =
  | UtilityEvent_BatchCompleted
  | UtilityEvent_BatchCompletedWithErrors
  | UtilityEvent_BatchInterrupted
  | UtilityEvent_DispatchedAs
  | UtilityEvent_ItemCompleted
  | UtilityEvent_ItemFailed

/**
 * Batch of dispatches completed fully with no error.
 */
export interface UtilityEvent_BatchCompleted {
  __kind: 'BatchCompleted'
}

/**
 * Batch of dispatches completed but has errors.
 */
export interface UtilityEvent_BatchCompletedWithErrors {
  __kind: 'BatchCompletedWithErrors'
}

/**
 * Batch of dispatches did not complete fully. Index of first failing dispatch given, as
 * well as the error.
 */
export interface UtilityEvent_BatchInterrupted {
  __kind: 'BatchInterrupted'
  index: number
  error: DispatchError
}

/**
 * A call was dispatched.
 */
export interface UtilityEvent_DispatchedAs {
  __kind: 'DispatchedAs'
  result: Result<null, DispatchError>
}

/**
 * A single item within a Batch of dispatches has completed with no error.
 */
export interface UtilityEvent_ItemCompleted {
  __kind: 'ItemCompleted'
}

/**
 * A single item within a Batch of dispatches has completed with error.
 */
export interface UtilityEvent_ItemFailed {
  __kind: 'ItemFailed'
  error: DispatchError
}

export type DispatchError =
  | DispatchError_Arithmetic
  | DispatchError_BadOrigin
  | DispatchError_CannotLookup
  | DispatchError_ConsumerRemaining
  | DispatchError_Corruption
  | DispatchError_Exhausted
  | DispatchError_Module
  | DispatchError_NoProviders
  | DispatchError_Other
  | DispatchError_RootNotAllowed
  | DispatchError_Token
  | DispatchError_TooManyConsumers
  | DispatchError_Transactional
  | DispatchError_Unavailable

export interface DispatchError_Arithmetic {
  __kind: 'Arithmetic'
  value: ArithmeticError
}

export interface DispatchError_BadOrigin {
  __kind: 'BadOrigin'
}

export interface DispatchError_CannotLookup {
  __kind: 'CannotLookup'
}

export interface DispatchError_ConsumerRemaining {
  __kind: 'ConsumerRemaining'
}

export interface DispatchError_Corruption {
  __kind: 'Corruption'
}

export interface DispatchError_Exhausted {
  __kind: 'Exhausted'
}

export interface DispatchError_Module {
  __kind: 'Module'
  value: ModuleError
}

export interface DispatchError_NoProviders {
  __kind: 'NoProviders'
}

export interface DispatchError_Other {
  __kind: 'Other'
}

export interface DispatchError_RootNotAllowed {
  __kind: 'RootNotAllowed'
}

export interface DispatchError_Token {
  __kind: 'Token'
  value: TokenError
}

export interface DispatchError_TooManyConsumers {
  __kind: 'TooManyConsumers'
}

export interface DispatchError_Transactional {
  __kind: 'Transactional'
  value: TransactionalError
}

export interface DispatchError_Unavailable {
  __kind: 'Unavailable'
}

export type TransactionalError = TransactionalError_LimitReached | TransactionalError_NoLayer

export interface TransactionalError_LimitReached {
  __kind: 'LimitReached'
}

export interface TransactionalError_NoLayer {
  __kind: 'NoLayer'
}

export type TokenError =
  | TokenError_BelowMinimum
  | TokenError_Blocked
  | TokenError_CannotCreate
  | TokenError_CannotCreateHold
  | TokenError_Frozen
  | TokenError_FundsUnavailable
  | TokenError_NotExpendable
  | TokenError_OnlyProvider
  | TokenError_UnknownAsset
  | TokenError_Unsupported

export interface TokenError_BelowMinimum {
  __kind: 'BelowMinimum'
}

export interface TokenError_Blocked {
  __kind: 'Blocked'
}

export interface TokenError_CannotCreate {
  __kind: 'CannotCreate'
}

export interface TokenError_CannotCreateHold {
  __kind: 'CannotCreateHold'
}

export interface TokenError_Frozen {
  __kind: 'Frozen'
}

export interface TokenError_FundsUnavailable {
  __kind: 'FundsUnavailable'
}

export interface TokenError_NotExpendable {
  __kind: 'NotExpendable'
}

export interface TokenError_OnlyProvider {
  __kind: 'OnlyProvider'
}

export interface TokenError_UnknownAsset {
  __kind: 'UnknownAsset'
}

export interface TokenError_Unsupported {
  __kind: 'Unsupported'
}

export interface ModuleError {
  index: number
  error: Bytes
}

export type ArithmeticError =
  | ArithmeticError_DivisionByZero
  | ArithmeticError_Overflow
  | ArithmeticError_Underflow

export interface ArithmeticError_DivisionByZero {
  __kind: 'DivisionByZero'
}

export interface ArithmeticError_Overflow {
  __kind: 'Overflow'
}

export interface ArithmeticError_Underflow {
  __kind: 'Underflow'
}

/**
 * Events emitted by pallet-transporter.
 */
export type TransporterEvent =
  | TransporterEvent_IncomingTransferSuccessful
  | TransporterEvent_OutgoingTransferFailed
  | TransporterEvent_OutgoingTransferInitiated
  | TransporterEvent_OutgoingTransferSuccessful

/**
 * Emits when a given incoming transfer was successfully processed.
 */
export interface TransporterEvent_IncomingTransferSuccessful {
  __kind: 'IncomingTransferSuccessful'
  /**
   * Source chain the transfer is coming from.
   */
  chainId: ChainId
  /**
   * Id of the transfer.
   */
  messageId: [bigint, bigint]
}

/**
 * Emits when a given outgoing transfer was failed on dst_chain.
 */
export interface TransporterEvent_OutgoingTransferFailed {
  __kind: 'OutgoingTransferFailed'
  /**
   * Destination chain the transfer is bound to.
   */
  chainId: ChainId
  /**
   * Id of the transfer.
   */
  messageId: [bigint, bigint]
  /**
   * Error from dst_chain endpoint.
   */
  err: DispatchError
}

/**
 * Emits when there is a new outgoing transfer.
 */
export interface TransporterEvent_OutgoingTransferInitiated {
  __kind: 'OutgoingTransferInitiated'
  /**
   * Destination chain the transfer is bound to.
   */
  chainId: ChainId
  /**
   * Id of the transfer.
   */
  messageId: [bigint, bigint]
}

/**
 * Emits when a given outgoing transfer was successful.
 */
export interface TransporterEvent_OutgoingTransferSuccessful {
  __kind: 'OutgoingTransferSuccessful'
  /**
   * Destination chain the transfer is bound to.
   */
  chainId: ChainId
  /**
   * Id of the transfer.
   */
  messageId: [bigint, bigint]
}

export type ChainId = ChainId_Consensus | ChainId_Domain

export interface ChainId_Consensus {
  __kind: 'Consensus'
}

export interface ChainId_Domain {
  __kind: 'Domain'
  value: DomainId
}

/**
 * The `Event` enum of this pallet
 */
export type TransactionPaymentEvent = TransactionPaymentEvent_TransactionFeePaid

/**
 * A transaction fee `actual_fee`, of which `tip` was added to the minimum inclusion fee,
 * has been paid by `who`.
 */
export interface TransactionPaymentEvent_TransactionFeePaid {
  __kind: 'TransactionFeePaid'
  who: AccountId32
  actualFee: bigint
  tip: bigint
}

/**
 * `pallet-transaction-fees` events
 */
export type TransactionFeesEvent =
  | TransactionFeesEvent_BlockFees
  | TransactionFeesEvent_BurnedBlockFees

/**
 * Storage fees.
 */
export interface TransactionFeesEvent_BlockFees {
  __kind: 'BlockFees'
  /**
   * Block author that received the fees.
   */
  who: AccountId32
  /**
   * Amount of collected storage fees.
   */
  storage: bigint
  /**
   * Amount of collected compute fees.
   */
  compute: bigint
  /**
   * Amount of collected tips.
   */
  tips: bigint
}

/**
 * Fees burned due to equivocated block author.
 */
export interface TransactionFeesEvent_BurnedBlockFees {
  __kind: 'BurnedBlockFees'
  /**
   * Amount of burned storage fees.
   */
  storage: bigint
  /**
   * Amount of burned compute fees.
   */
  compute: bigint
  /**
   * Amount of burned tips.
   */
  tips: bigint
}

/**
 * Event for the System pallet.
 */
export type SystemEvent =
  | SystemEvent_CodeUpdated
  | SystemEvent_ExtrinsicFailed
  | SystemEvent_ExtrinsicSuccess
  | SystemEvent_KilledAccount
  | SystemEvent_NewAccount
  | SystemEvent_Remarked
  | SystemEvent_UpgradeAuthorized

/**
 * `:code` was updated.
 */
export interface SystemEvent_CodeUpdated {
  __kind: 'CodeUpdated'
}

/**
 * An extrinsic failed.
 */
export interface SystemEvent_ExtrinsicFailed {
  __kind: 'ExtrinsicFailed'
  dispatchError: DispatchError
  dispatchInfo: DispatchInfo
}

/**
 * An extrinsic completed successfully.
 */
export interface SystemEvent_ExtrinsicSuccess {
  __kind: 'ExtrinsicSuccess'
  dispatchInfo: DispatchInfo
}

/**
 * An account was reaped.
 */
export interface SystemEvent_KilledAccount {
  __kind: 'KilledAccount'
  account: AccountId32
}

/**
 * A new account was created.
 */
export interface SystemEvent_NewAccount {
  __kind: 'NewAccount'
  account: AccountId32
}

/**
 * On on-chain remark happened.
 */
export interface SystemEvent_Remarked {
  __kind: 'Remarked'
  sender: AccountId32
  hash: H256
}

/**
 * An upgrade was authorized.
 */
export interface SystemEvent_UpgradeAuthorized {
  __kind: 'UpgradeAuthorized'
  codeHash: H256
  checkVersion: boolean
}

export interface DispatchInfo {
  weight: Weight
  class: DispatchClass
  paysFee: Pays
}

export type Pays = Pays_No | Pays_Yes

export interface Pays_No {
  __kind: 'No'
}

export interface Pays_Yes {
  __kind: 'Yes'
}

export type DispatchClass =
  | DispatchClass_Mandatory
  | DispatchClass_Normal
  | DispatchClass_Operational

export interface DispatchClass_Mandatory {
  __kind: 'Mandatory'
}

export interface DispatchClass_Normal {
  __kind: 'Normal'
}

export interface DispatchClass_Operational {
  __kind: 'Operational'
}

/**
 * The `Event` enum of this pallet
 */
export type SudoEvent =
  | SudoEvent_KeyChanged
  | SudoEvent_KeyRemoved
  | SudoEvent_Sudid
  | SudoEvent_SudoAsDone

/**
 * The sudo key has been updated.
 */
export interface SudoEvent_KeyChanged {
  __kind: 'KeyChanged'
  /**
   * The old sudo key (if one was previously set).
   */
  old?: AccountId32 | undefined
  /**
   * The new sudo key (if one was set).
   */
  new: AccountId32
}

/**
 * The key was permanently removed.
 */
export interface SudoEvent_KeyRemoved {
  __kind: 'KeyRemoved'
}

/**
 * A sudo call just took place.
 */
export interface SudoEvent_Sudid {
  __kind: 'Sudid'
  /**
   * The result of the call made by the sudo user.
   */
  sudoResult: Result<null, DispatchError>
}

/**
 * A [sudo_as](Pallet::sudo_as) call just took place.
 */
export interface SudoEvent_SudoAsDone {
  __kind: 'SudoAsDone'
  /**
   * The result of the call made by the sudo user.
   */
  sudoResult: Result<null, DispatchError>
}

/**
 * Events type.
 */
export type SubspaceEvent = SubspaceEvent_FarmerVote | SubspaceEvent_SegmentHeaderStored

/**
 * Farmer vote.
 */
export interface SubspaceEvent_FarmerVote {
  __kind: 'FarmerVote'
  publicKey: Public
  rewardAddress: AccountId32
  height: number
  parentHash: H256
}

/**
 * Segment header was stored in blockchain history.
 */
export interface SubspaceEvent_SegmentHeaderStored {
  __kind: 'SegmentHeaderStored'
  segmentHeader: SegmentHeader
}

export type SegmentHeader = SegmentHeader_V0

export interface SegmentHeader_V0 {
  __kind: 'V0'
  segmentIndex: SegmentIndex
  segmentCommitment: SegmentCommitment
  prevSegmentHeaderHash: Bytes
  lastArchivedBlock: LastArchivedBlock
}

export interface LastArchivedBlock {
  number: number
  archivedProgress: ArchivedBlockProgress
}

export type ArchivedBlockProgress = ArchivedBlockProgress_Complete | ArchivedBlockProgress_Partial

export interface ArchivedBlockProgress_Complete {
  __kind: 'Complete'
}

export interface ArchivedBlockProgress_Partial {
  __kind: 'Partial'
  value: number
}

/**
 * `pallet-rewards` events
 */
export type RewardsEvent = RewardsEvent_BlockReward | RewardsEvent_VoteReward

/**
 * Issued reward for the block author.
 */
export interface RewardsEvent_BlockReward {
  __kind: 'BlockReward'
  blockAuthor: AccountId32
  reward: bigint
}

/**
 * Issued reward for the voter.
 */
export interface RewardsEvent_VoteReward {
  __kind: 'VoteReward'
  voter: AccountId32
  reward: bigint
}

/**
 * Events type.
 */
export type OffencesSubspaceEvent = OffencesSubspaceEvent_Offence

/**
 * There is an offence reported of the given `kind` happened at the `session_index` and
 * (kind-specific) time slot. This event is not deposited for duplicate slashes.
 * \[kind, timeslot\].
 */
export interface OffencesSubspaceEvent_Offence {
  __kind: 'Offence'
  kind: Bytes
  timeslot: Bytes
}

/**
 * `pallet-messenger` events
 */
export type MessengerEvent =
  | MessengerEvent_ChannelClosed
  | MessengerEvent_ChannelInitiated
  | MessengerEvent_ChannelOpen
  | MessengerEvent_InboxMessage
  | MessengerEvent_InboxMessageResponse
  | MessengerEvent_OutboxMessage
  | MessengerEvent_OutboxMessageResponse
  | MessengerEvent_OutboxMessageResult

/**
 * Emits when a channel between two chains is closed.
 */
export interface MessengerEvent_ChannelClosed {
  __kind: 'ChannelClosed'
  /**
   * Foreign chain id this channel connects to.
   */
  chainId: ChainId
  /**
   * Channel ID of the said channel.
   */
  channelId: bigint
}

/**
 * Emits when a channel between two chains is initiated.
 */
export interface MessengerEvent_ChannelInitiated {
  __kind: 'ChannelInitiated'
  /**
   * Foreign chain id this channel connects to.
   */
  chainId: ChainId
  /**
   * Channel ID of the said channel.
   */
  channelId: bigint
}

/**
 * Emits when a channel between two chain is open.
 */
export interface MessengerEvent_ChannelOpen {
  __kind: 'ChannelOpen'
  /**
   * Foreign chain id this channel connects to.
   */
  chainId: ChainId
  /**
   * Channel ID of the said channel.
   */
  channelId: bigint
}

/**
 * Emits when a new inbox message is validated and added to Inbox.
 */
export interface MessengerEvent_InboxMessage {
  __kind: 'InboxMessage'
  chainId: ChainId
  channelId: bigint
  nonce: bigint
}

/**
 * Emits when a message response is available for Inbox message.
 */
export interface MessengerEvent_InboxMessageResponse {
  __kind: 'InboxMessageResponse'
  /**
   * Destination chain ID.
   */
  chainId: ChainId
  /**
   * Channel Is
   */
  channelId: bigint
  nonce: bigint
}

/**
 * Emits when a new message is added to the outbox.
 */
export interface MessengerEvent_OutboxMessage {
  __kind: 'OutboxMessage'
  chainId: ChainId
  channelId: bigint
  nonce: bigint
}

/**
 * Emits when a message response is available for Outbox message.
 */
export interface MessengerEvent_OutboxMessageResponse {
  __kind: 'OutboxMessageResponse'
  /**
   * Destination chain ID.
   */
  chainId: ChainId
  /**
   * Channel Is
   */
  channelId: bigint
  nonce: bigint
}

/**
 * Emits outbox message result.
 */
export interface MessengerEvent_OutboxMessageResult {
  __kind: 'OutboxMessageResult'
  chainId: ChainId
  channelId: bigint
  nonce: bigint
  result: OutboxMessageResult
}

export type OutboxMessageResult = Result<null, DispatchError>

/**
 * The `Event` enum of this pallet
 */
export type DomainsEvent =
  | DomainsEvent_BundleStored
  | DomainsEvent_DomainEpochCompleted
  | DomainsEvent_DomainInstantiated
  | DomainsEvent_DomainOperatorAllowListUpdated
  | DomainsEvent_DomainRuntimeCreated
  | DomainsEvent_DomainRuntimeUpgradeScheduled
  | DomainsEvent_DomainRuntimeUpgraded
  | DomainsEvent_ForceDomainEpochTransition
  | DomainsEvent_FraudProofProcessed
  | DomainsEvent_FundsUnlocked
  | DomainsEvent_OperatorDeregistered
  | DomainsEvent_OperatorNominated
  | DomainsEvent_OperatorRegistered
  | DomainsEvent_OperatorRewarded
  | DomainsEvent_OperatorSlashed
  | DomainsEvent_OperatorSwitchedDomain
  | DomainsEvent_OperatorTaxCollected
  | DomainsEvent_OperatorUnlocked
  | DomainsEvent_PreferredOperator
  | DomainsEvent_WithdrewStake

/**
 * A domain bundle was included.
 */
export interface DomainsEvent_BundleStored {
  __kind: 'BundleStored'
  domainId: DomainId
  bundleHash: H256
  bundleAuthor: bigint
}

export interface DomainsEvent_DomainEpochCompleted {
  __kind: 'DomainEpochCompleted'
  domainId: DomainId
  completedEpochIndex: number
}

export interface DomainsEvent_DomainInstantiated {
  __kind: 'DomainInstantiated'
  domainId: DomainId
}

export interface DomainsEvent_DomainOperatorAllowListUpdated {
  __kind: 'DomainOperatorAllowListUpdated'
  domainId: DomainId
}

export interface DomainsEvent_DomainRuntimeCreated {
  __kind: 'DomainRuntimeCreated'
  runtimeId: number
  runtimeType: RuntimeType
}

export interface DomainsEvent_DomainRuntimeUpgradeScheduled {
  __kind: 'DomainRuntimeUpgradeScheduled'
  runtimeId: number
  scheduledAt: number
}

export interface DomainsEvent_DomainRuntimeUpgraded {
  __kind: 'DomainRuntimeUpgraded'
  runtimeId: number
}

export interface DomainsEvent_ForceDomainEpochTransition {
  __kind: 'ForceDomainEpochTransition'
  domainId: DomainId
  completedEpochIndex: number
}

export interface DomainsEvent_FraudProofProcessed {
  __kind: 'FraudProofProcessed'
  domainId: DomainId
  newHeadReceiptNumber?: number | undefined
}

export interface DomainsEvent_FundsUnlocked {
  __kind: 'FundsUnlocked'
  operatorId: bigint
  nominatorId: AccountId32
  amount: bigint
}

export interface DomainsEvent_OperatorDeregistered {
  __kind: 'OperatorDeregistered'
  operatorId: bigint
}

export interface DomainsEvent_OperatorNominated {
  __kind: 'OperatorNominated'
  operatorId: bigint
  nominatorId: AccountId32
}

export interface DomainsEvent_OperatorRegistered {
  __kind: 'OperatorRegistered'
  operatorId: bigint
  domainId: DomainId
}

export interface DomainsEvent_OperatorRewarded {
  __kind: 'OperatorRewarded'
  operatorId: bigint
  reward: bigint
}

export interface DomainsEvent_OperatorSlashed {
  __kind: 'OperatorSlashed'
  operatorId: bigint
  reason: SlashedReason
}

export interface DomainsEvent_OperatorSwitchedDomain {
  __kind: 'OperatorSwitchedDomain'
  oldDomainId: DomainId
  newDomainId: DomainId
}

export interface DomainsEvent_OperatorTaxCollected {
  __kind: 'OperatorTaxCollected'
  operatorId: bigint
  tax: bigint
}

export interface DomainsEvent_OperatorUnlocked {
  __kind: 'OperatorUnlocked'
  operatorId: bigint
}

export interface DomainsEvent_PreferredOperator {
  __kind: 'PreferredOperator'
  operatorId: bigint
  nominatorId: AccountId32
}

export interface DomainsEvent_WithdrewStake {
  __kind: 'WithdrewStake'
  operatorId: bigint
  nominatorId: AccountId32
}

export type SlashedReason =
  | SlashedReason_BadExecutionReceipt
  | SlashedReason_BundleEquivocation
  | SlashedReason_InvalidBundle

export interface SlashedReason_BadExecutionReceipt {
  __kind: 'BadExecutionReceipt'
  value: H256
}

export interface SlashedReason_BundleEquivocation {
  __kind: 'BundleEquivocation'
  value: Slot
}

export interface SlashedReason_InvalidBundle {
  __kind: 'InvalidBundle'
  value: number
}

/**
 * The `Event` enum of this pallet
 */
export type BalancesEvent =
  | BalancesEvent_BalanceSet
  | BalancesEvent_Burned
  | BalancesEvent_Deposit
  | BalancesEvent_DustLost
  | BalancesEvent_Endowed
  | BalancesEvent_Frozen
  | BalancesEvent_Issued
  | BalancesEvent_Locked
  | BalancesEvent_Minted
  | BalancesEvent_Rescinded
  | BalancesEvent_ReserveRepatriated
  | BalancesEvent_Reserved
  | BalancesEvent_Restored
  | BalancesEvent_Slashed
  | BalancesEvent_Suspended
  | BalancesEvent_Thawed
  | BalancesEvent_Transfer
  | BalancesEvent_Unlocked
  | BalancesEvent_Unreserved
  | BalancesEvent_Upgraded
  | BalancesEvent_Withdraw

/**
 * A balance was set by root.
 */
export interface BalancesEvent_BalanceSet {
  __kind: 'BalanceSet'
  who: AccountId32
  free: bigint
}

/**
 * Some amount was burned from an account.
 */
export interface BalancesEvent_Burned {
  __kind: 'Burned'
  who: AccountId32
  amount: bigint
}

/**
 * Some amount was deposited (e.g. for transaction fees).
 */
export interface BalancesEvent_Deposit {
  __kind: 'Deposit'
  who: AccountId32
  amount: bigint
}

/**
 * An account was removed whose balance was non-zero but below ExistentialDeposit,
 * resulting in an outright loss.
 */
export interface BalancesEvent_DustLost {
  __kind: 'DustLost'
  account: AccountId32
  amount: bigint
}

/**
 * An account was created with some free balance.
 */
export interface BalancesEvent_Endowed {
  __kind: 'Endowed'
  account: AccountId32
  freeBalance: bigint
}

/**
 * Some balance was frozen.
 */
export interface BalancesEvent_Frozen {
  __kind: 'Frozen'
  who: AccountId32
  amount: bigint
}

/**
 * Total issuance was increased by `amount`, creating a credit to be balanced.
 */
export interface BalancesEvent_Issued {
  __kind: 'Issued'
  amount: bigint
}

/**
 * Some balance was locked.
 */
export interface BalancesEvent_Locked {
  __kind: 'Locked'
  who: AccountId32
  amount: bigint
}

/**
 * Some amount was minted into an account.
 */
export interface BalancesEvent_Minted {
  __kind: 'Minted'
  who: AccountId32
  amount: bigint
}

/**
 * Total issuance was decreased by `amount`, creating a debt to be balanced.
 */
export interface BalancesEvent_Rescinded {
  __kind: 'Rescinded'
  amount: bigint
}

/**
 * Some balance was moved from the reserve of the first account to the second account.
 * Final argument indicates the destination balance type.
 */
export interface BalancesEvent_ReserveRepatriated {
  __kind: 'ReserveRepatriated'
  from: AccountId32
  to: AccountId32
  amount: bigint
  destinationStatus: BalanceStatus
}

/**
 * Some balance was reserved (moved from free to reserved).
 */
export interface BalancesEvent_Reserved {
  __kind: 'Reserved'
  who: AccountId32
  amount: bigint
}

/**
 * Some amount was restored into an account.
 */
export interface BalancesEvent_Restored {
  __kind: 'Restored'
  who: AccountId32
  amount: bigint
}

/**
 * Some amount was removed from the account (e.g. for misbehavior).
 */
export interface BalancesEvent_Slashed {
  __kind: 'Slashed'
  who: AccountId32
  amount: bigint
}

/**
 * Some amount was suspended from an account (it can be restored later).
 */
export interface BalancesEvent_Suspended {
  __kind: 'Suspended'
  who: AccountId32
  amount: bigint
}

/**
 * Some balance was thawed.
 */
export interface BalancesEvent_Thawed {
  __kind: 'Thawed'
  who: AccountId32
  amount: bigint
}

/**
 * Transfer succeeded.
 */
export interface BalancesEvent_Transfer {
  __kind: 'Transfer'
  from: AccountId32
  to: AccountId32
  amount: bigint
}

/**
 * Some balance was unlocked.
 */
export interface BalancesEvent_Unlocked {
  __kind: 'Unlocked'
  who: AccountId32
  amount: bigint
}

/**
 * Some balance was unreserved (moved from reserved to free).
 */
export interface BalancesEvent_Unreserved {
  __kind: 'Unreserved'
  who: AccountId32
  amount: bigint
}

/**
 * An account was upgraded.
 */
export interface BalancesEvent_Upgraded {
  __kind: 'Upgraded'
  who: AccountId32
}

/**
 * Some amount was withdrawn from the account (e.g. for transaction fees).
 */
export interface BalancesEvent_Withdraw {
  __kind: 'Withdraw'
  who: AccountId32
  amount: bigint
}

export type BalanceStatus = BalanceStatus_Free | BalanceStatus_Reserved

export interface BalanceStatus_Free {
  __kind: 'Free'
}

export interface BalanceStatus_Reserved {
  __kind: 'Reserved'
}

export const EventRecord: sts.Type<EventRecord> = sts.struct(() => {
  return {
    phase: Phase,
    event: Event,
    topics: sts.array(() => H256),
  }
})

export const Event: sts.Type<Event> = sts.closedEnum(() => {
  return {
    Balances: BalancesEvent,
    Domains: DomainsEvent,
    Messenger: MessengerEvent,
    OffencesSubspace: OffencesSubspaceEvent,
    Rewards: RewardsEvent,
    Subspace: SubspaceEvent,
    Sudo: SudoEvent,
    System: SystemEvent,
    TransactionFees: TransactionFeesEvent,
    TransactionPayment: TransactionPaymentEvent,
    Transporter: TransporterEvent,
    Utility: UtilityEvent,
    Vesting: VestingEvent,
  }
})

/**
 * The `Event` enum of this pallet
 */
export const VestingEvent: sts.Type<VestingEvent> = sts.closedEnum(() => {
  return {
    Claimed: sts.enumStruct({
      who: AccountId32,
      amount: sts.bigint(),
    }),
    VestingScheduleAdded: sts.enumStruct({
      from: AccountId32,
      to: AccountId32,
      vestingSchedule: VestingSchedule,
    }),
    VestingSchedulesUpdated: sts.enumStruct({
      who: AccountId32,
    }),
  }
})

export const VestingSchedule: sts.Type<VestingSchedule> = sts.struct(() => {
  return {
    start: sts.number(),
    period: sts.number(),
    periodCount: sts.number(),
    perPeriod: sts.bigint(),
  }
})

/**
 * The `Event` enum of this pallet
 */
export const UtilityEvent: sts.Type<UtilityEvent> = sts.closedEnum(() => {
  return {
    BatchCompleted: sts.unit(),
    BatchCompletedWithErrors: sts.unit(),
    BatchInterrupted: sts.enumStruct({
      index: sts.number(),
      error: DispatchError,
    }),
    DispatchedAs: sts.enumStruct({
      result: sts.result(
        () => sts.unit(),
        () => DispatchError,
      ),
    }),
    ItemCompleted: sts.unit(),
    ItemFailed: sts.enumStruct({
      error: DispatchError,
    }),
  }
})

/**
 * Events emitted by pallet-transporter.
 */
export const TransporterEvent: sts.Type<TransporterEvent> = sts.closedEnum(() => {
  return {
    IncomingTransferSuccessful: sts.enumStruct({
      chainId: ChainId,
      messageId: sts.tuple(() => [sts.bigint(), sts.bigint()]),
    }),
    OutgoingTransferFailed: sts.enumStruct({
      chainId: ChainId,
      messageId: sts.tuple(() => [sts.bigint(), sts.bigint()]),
      err: DispatchError,
    }),
    OutgoingTransferInitiated: sts.enumStruct({
      chainId: ChainId,
      messageId: sts.tuple(() => [sts.bigint(), sts.bigint()]),
    }),
    OutgoingTransferSuccessful: sts.enumStruct({
      chainId: ChainId,
      messageId: sts.tuple(() => [sts.bigint(), sts.bigint()]),
    }),
  }
})

export const ChainId: sts.Type<ChainId> = sts.closedEnum(() => {
  return {
    Consensus: sts.unit(),
    Domain: DomainId,
  }
})

/**
 * The `Event` enum of this pallet
 */
export const TransactionPaymentEvent: sts.Type<TransactionPaymentEvent> = sts.closedEnum(() => {
  return {
    TransactionFeePaid: sts.enumStruct({
      who: AccountId32,
      actualFee: sts.bigint(),
      tip: sts.bigint(),
    }),
  }
})

/**
 * `pallet-transaction-fees` events
 */
export const TransactionFeesEvent: sts.Type<TransactionFeesEvent> = sts.closedEnum(() => {
  return {
    BlockFees: sts.enumStruct({
      who: AccountId32,
      storage: sts.bigint(),
      compute: sts.bigint(),
      tips: sts.bigint(),
    }),
    BurnedBlockFees: sts.enumStruct({
      storage: sts.bigint(),
      compute: sts.bigint(),
      tips: sts.bigint(),
    }),
  }
})

/**
 * Event for the System pallet.
 */
export const SystemEvent: sts.Type<SystemEvent> = sts.closedEnum(() => {
  return {
    CodeUpdated: sts.unit(),
    ExtrinsicFailed: sts.enumStruct({
      dispatchError: DispatchError,
      dispatchInfo: DispatchInfo,
    }),
    ExtrinsicSuccess: sts.enumStruct({
      dispatchInfo: DispatchInfo,
    }),
    KilledAccount: sts.enumStruct({
      account: AccountId32,
    }),
    NewAccount: sts.enumStruct({
      account: AccountId32,
    }),
    Remarked: sts.enumStruct({
      sender: AccountId32,
      hash: H256,
    }),
    UpgradeAuthorized: sts.enumStruct({
      codeHash: H256,
      checkVersion: sts.boolean(),
    }),
  }
})

/**
 * The `Event` enum of this pallet
 */
export const SudoEvent: sts.Type<SudoEvent> = sts.closedEnum(() => {
  return {
    KeyChanged: sts.enumStruct({
      old: sts.option(() => AccountId32),
      new: AccountId32,
    }),
    KeyRemoved: sts.unit(),
    Sudid: sts.enumStruct({
      sudoResult: sts.result(
        () => sts.unit(),
        () => DispatchError,
      ),
    }),
    SudoAsDone: sts.enumStruct({
      sudoResult: sts.result(
        () => sts.unit(),
        () => DispatchError,
      ),
    }),
  }
})

/**
 * Events type.
 */
export const SubspaceEvent: sts.Type<SubspaceEvent> = sts.closedEnum(() => {
  return {
    FarmerVote: sts.enumStruct({
      publicKey: Public,
      rewardAddress: AccountId32,
      height: sts.number(),
      parentHash: H256,
    }),
    SegmentHeaderStored: sts.enumStruct({
      segmentHeader: SegmentHeader,
    }),
  }
})

/**
 * `pallet-rewards` events
 */
export const RewardsEvent: sts.Type<RewardsEvent> = sts.closedEnum(() => {
  return {
    BlockReward: sts.enumStruct({
      blockAuthor: AccountId32,
      reward: sts.bigint(),
    }),
    VoteReward: sts.enumStruct({
      voter: AccountId32,
      reward: sts.bigint(),
    }),
  }
})

/**
 * Events type.
 */
export const OffencesSubspaceEvent: sts.Type<OffencesSubspaceEvent> = sts.closedEnum(() => {
  return {
    Offence: sts.enumStruct({
      kind: sts.bytes(),
      timeslot: sts.bytes(),
    }),
  }
})

/**
 * `pallet-messenger` events
 */
export const MessengerEvent: sts.Type<MessengerEvent> = sts.closedEnum(() => {
  return {
    ChannelClosed: sts.enumStruct({
      chainId: ChainId,
      channelId: sts.bigint(),
    }),
    ChannelInitiated: sts.enumStruct({
      chainId: ChainId,
      channelId: sts.bigint(),
    }),
    ChannelOpen: sts.enumStruct({
      chainId: ChainId,
      channelId: sts.bigint(),
    }),
    InboxMessage: sts.enumStruct({
      chainId: ChainId,
      channelId: sts.bigint(),
      nonce: sts.bigint(),
    }),
    InboxMessageResponse: sts.enumStruct({
      chainId: ChainId,
      channelId: sts.bigint(),
      nonce: sts.bigint(),
    }),
    OutboxMessage: sts.enumStruct({
      chainId: ChainId,
      channelId: sts.bigint(),
      nonce: sts.bigint(),
    }),
    OutboxMessageResponse: sts.enumStruct({
      chainId: ChainId,
      channelId: sts.bigint(),
      nonce: sts.bigint(),
    }),
    OutboxMessageResult: sts.enumStruct({
      chainId: ChainId,
      channelId: sts.bigint(),
      nonce: sts.bigint(),
      result: OutboxMessageResult,
    }),
  }
})

export const OutboxMessageResult = sts.result(
  () => sts.unit(),
  () => DispatchError,
)

/**
 * The `Event` enum of this pallet
 */
export const DomainsEvent: sts.Type<DomainsEvent> = sts.closedEnum(() => {
  return {
    BundleStored: sts.enumStruct({
      domainId: DomainId,
      bundleHash: H256,
      bundleAuthor: sts.bigint(),
    }),
    DomainEpochCompleted: sts.enumStruct({
      domainId: DomainId,
      completedEpochIndex: sts.number(),
    }),
    DomainInstantiated: sts.enumStruct({
      domainId: DomainId,
    }),
    DomainOperatorAllowListUpdated: sts.enumStruct({
      domainId: DomainId,
    }),
    DomainRuntimeCreated: sts.enumStruct({
      runtimeId: sts.number(),
      runtimeType: RuntimeType,
    }),
    DomainRuntimeUpgradeScheduled: sts.enumStruct({
      runtimeId: sts.number(),
      scheduledAt: sts.number(),
    }),
    DomainRuntimeUpgraded: sts.enumStruct({
      runtimeId: sts.number(),
    }),
    ForceDomainEpochTransition: sts.enumStruct({
      domainId: DomainId,
      completedEpochIndex: sts.number(),
    }),
    FraudProofProcessed: sts.enumStruct({
      domainId: DomainId,
      newHeadReceiptNumber: sts.option(() => sts.number()),
    }),
    FundsUnlocked: sts.enumStruct({
      operatorId: sts.bigint(),
      nominatorId: AccountId32,
      amount: sts.bigint(),
    }),
    OperatorDeregistered: sts.enumStruct({
      operatorId: sts.bigint(),
    }),
    OperatorNominated: sts.enumStruct({
      operatorId: sts.bigint(),
      nominatorId: AccountId32,
    }),
    OperatorRegistered: sts.enumStruct({
      operatorId: sts.bigint(),
      domainId: DomainId,
    }),
    OperatorRewarded: sts.enumStruct({
      operatorId: sts.bigint(),
      reward: sts.bigint(),
    }),
    OperatorSlashed: sts.enumStruct({
      operatorId: sts.bigint(),
      reason: SlashedReason,
    }),
    OperatorSwitchedDomain: sts.enumStruct({
      oldDomainId: DomainId,
      newDomainId: DomainId,
    }),
    OperatorTaxCollected: sts.enumStruct({
      operatorId: sts.bigint(),
      tax: sts.bigint(),
    }),
    OperatorUnlocked: sts.enumStruct({
      operatorId: sts.bigint(),
    }),
    PreferredOperator: sts.enumStruct({
      operatorId: sts.bigint(),
      nominatorId: AccountId32,
    }),
    WithdrewStake: sts.enumStruct({
      operatorId: sts.bigint(),
      nominatorId: AccountId32,
    }),
  }
})

/**
 * The `Event` enum of this pallet
 */
export const BalancesEvent: sts.Type<BalancesEvent> = sts.closedEnum(() => {
  return {
    BalanceSet: sts.enumStruct({
      who: AccountId32,
      free: sts.bigint(),
    }),
    Burned: sts.enumStruct({
      who: AccountId32,
      amount: sts.bigint(),
    }),
    Deposit: sts.enumStruct({
      who: AccountId32,
      amount: sts.bigint(),
    }),
    DustLost: sts.enumStruct({
      account: AccountId32,
      amount: sts.bigint(),
    }),
    Endowed: sts.enumStruct({
      account: AccountId32,
      freeBalance: sts.bigint(),
    }),
    Frozen: sts.enumStruct({
      who: AccountId32,
      amount: sts.bigint(),
    }),
    Issued: sts.enumStruct({
      amount: sts.bigint(),
    }),
    Locked: sts.enumStruct({
      who: AccountId32,
      amount: sts.bigint(),
    }),
    Minted: sts.enumStruct({
      who: AccountId32,
      amount: sts.bigint(),
    }),
    Rescinded: sts.enumStruct({
      amount: sts.bigint(),
    }),
    ReserveRepatriated: sts.enumStruct({
      from: AccountId32,
      to: AccountId32,
      amount: sts.bigint(),
      destinationStatus: BalanceStatus,
    }),
    Reserved: sts.enumStruct({
      who: AccountId32,
      amount: sts.bigint(),
    }),
    Restored: sts.enumStruct({
      who: AccountId32,
      amount: sts.bigint(),
    }),
    Slashed: sts.enumStruct({
      who: AccountId32,
      amount: sts.bigint(),
    }),
    Suspended: sts.enumStruct({
      who: AccountId32,
      amount: sts.bigint(),
    }),
    Thawed: sts.enumStruct({
      who: AccountId32,
      amount: sts.bigint(),
    }),
    Transfer: sts.enumStruct({
      from: AccountId32,
      to: AccountId32,
      amount: sts.bigint(),
    }),
    Unlocked: sts.enumStruct({
      who: AccountId32,
      amount: sts.bigint(),
    }),
    Unreserved: sts.enumStruct({
      who: AccountId32,
      amount: sts.bigint(),
    }),
    Upgraded: sts.enumStruct({
      who: AccountId32,
    }),
    Withdraw: sts.enumStruct({
      who: AccountId32,
      amount: sts.bigint(),
    }),
  }
})

export interface Digest {
  logs: DigestItem[]
}

export type DigestItem =
  | DigestItem_Consensus
  | DigestItem_Other
  | DigestItem_PreRuntime
  | DigestItem_RuntimeEnvironmentUpdated
  | DigestItem_Seal

export interface DigestItem_Consensus {
  __kind: 'Consensus'
  value: [Bytes, Bytes]
}

export interface DigestItem_Other {
  __kind: 'Other'
  value: Bytes
}

export interface DigestItem_PreRuntime {
  __kind: 'PreRuntime'
  value: [Bytes, Bytes]
}

export interface DigestItem_RuntimeEnvironmentUpdated {
  __kind: 'RuntimeEnvironmentUpdated'
}

export interface DigestItem_Seal {
  __kind: 'Seal'
  value: [Bytes, Bytes]
}

export const Digest: sts.Type<Digest> = sts.struct(() => {
  return {
    logs: sts.array(() => DigestItem),
  }
})

export const DigestItem: sts.Type<DigestItem> = sts.closedEnum(() => {
  return {
    Consensus: sts.tuple(() => [sts.bytes(), sts.bytes()]),
    Other: sts.bytes(),
    PreRuntime: sts.tuple(() => [sts.bytes(), sts.bytes()]),
    RuntimeEnvironmentUpdated: sts.unit(),
    Seal: sts.tuple(() => [sts.bytes(), sts.bytes()]),
  }
})

export type H256 = Bytes

export interface PerDispatchClass {
  normal: Weight
  operational: Weight
  mandatory: Weight
}

export const PerDispatchClass: sts.Type<PerDispatchClass> = sts.struct(() => {
  return {
    normal: Weight,
    operational: Weight,
    mandatory: Weight,
  }
})

export type AccountId32 = Bytes

export interface AccountInfo {
  nonce: number
  consumers: number
  providers: number
  sufficients: number
  data: AccountData
}

export const AccountInfo: sts.Type<AccountInfo> = sts.struct(() => {
  return {
    nonce: sts.number(),
    consumers: sts.number(),
    providers: sts.number(),
    sufficients: sts.number(),
    data: AccountData,
  }
})

export const OperatorAllowList: sts.Type<OperatorAllowList> = sts.closedEnum(() => {
  return {
    Anyone: sts.unit(),
    Operators: sts.array(() => AccountId32),
  }
})

export const DomainConfig: sts.Type<DomainConfig> = sts.struct(() => {
  return {
    domainName: sts.string(),
    runtimeId: sts.number(),
    maxBlockSize: sts.number(),
    maxBlockWeight: Weight,
    bundleSlotProbability: sts.tuple(() => [sts.bigint(), sts.bigint()]),
    targetBundlesPerBlock: sts.number(),
    operatorAllowList: OperatorAllowList,
  }
})

export const OperatorConfig: sts.Type<OperatorConfig> = sts.struct(() => {
  return {
    signingKey: sts.bytes(),
    minimumNominatorStake: sts.bigint(),
    nominationTax: Percent,
  }
})

export interface OperatorConfig {
  signingKey: Bytes
  minimumNominatorStake: bigint
  nominationTax: Percent
}

export const FraudProof: sts.Type<FraudProof> = sts.closedEnum(() => {
  return {
    BundleEquivocation: BundleEquivocationProof,
    ImproperTransactionSortition: ImproperTransactionSortitionProof,
    InvalidBlockFees: InvalidBlockFeesProof,
    InvalidBundles: InvalidBundlesFraudProof,
    InvalidDomainBlockHash: InvalidDomainBlockHashProof,
    InvalidExtrinsicsRoot: InvalidExtrinsicsRootProof,
    InvalidStateTransition: InvalidStateTransitionProof,
    InvalidTransaction: InvalidTransactionProof,
    ValidBundle: ValidBundleProof,
  }
})

export const ValidBundleProof: sts.Type<ValidBundleProof> = sts.struct(() => {
  return {
    domainId: DomainId,
    badReceiptHash: H256,
    bundleIndex: sts.number(),
  }
})

export interface ValidBundleProof {
  domainId: DomainId
  badReceiptHash: H256
  bundleIndex: number
}

export const InvalidTransactionProof: sts.Type<InvalidTransactionProof> = sts.struct(() => {
  return {
    domainId: DomainId,
    badReceiptHash: H256,
    domainBlockNumber: sts.number(),
    domainBlockHash: H256,
    invalidExtrinsic: sts.bytes(),
    storageProof: StorageProof,
  }
})

export const StorageProof: sts.Type<StorageProof> = sts.struct(() => {
  return {
    trieNodes: sts.array(() => sts.bytes()),
  }
})

export interface StorageProof {
  trieNodes: Bytes[]
}

export interface InvalidTransactionProof {
  domainId: DomainId
  badReceiptHash: H256
  domainBlockNumber: number
  domainBlockHash: H256
  invalidExtrinsic: Bytes
  storageProof: StorageProof
}

export const InvalidStateTransitionProof: sts.Type<InvalidStateTransitionProof> = sts.struct(() => {
  return {
    domainId: DomainId,
    badReceiptHash: H256,
    proof: StorageProof,
    executionPhase: ExecutionPhase,
  }
})

export const ExecutionPhase: sts.Type<ExecutionPhase> = sts.closedEnum(() => {
  return {
    ApplyExtrinsic: sts.enumStruct({
      extrinsicProof: StorageProof,
      mismatch: ApplyExtrinsicMismatch,
    }),
    FinalizeBlock: sts.enumStruct({
      mismatch: FinalizeBlockMismatch,
    }),
    InitializeBlock: sts.unit(),
  }
})

export const FinalizeBlockMismatch: sts.Type<FinalizeBlockMismatch> = sts.closedEnum(() => {
  return {
    Longer: sts.number(),
    StateRoot: sts.unit(),
  }
})

export type FinalizeBlockMismatch = FinalizeBlockMismatch_Longer | FinalizeBlockMismatch_StateRoot

export interface FinalizeBlockMismatch_Longer {
  __kind: 'Longer'
  value: number
}

export interface FinalizeBlockMismatch_StateRoot {
  __kind: 'StateRoot'
}

export const ApplyExtrinsicMismatch: sts.Type<ApplyExtrinsicMismatch> = sts.closedEnum(() => {
  return {
    Shorter: sts.unit(),
    StateRoot: sts.number(),
  }
})

export type ApplyExtrinsicMismatch =
  | ApplyExtrinsicMismatch_Shorter
  | ApplyExtrinsicMismatch_StateRoot

export interface ApplyExtrinsicMismatch_Shorter {
  __kind: 'Shorter'
}

export interface ApplyExtrinsicMismatch_StateRoot {
  __kind: 'StateRoot'
  value: number
}

export type ExecutionPhase =
  | ExecutionPhase_ApplyExtrinsic
  | ExecutionPhase_FinalizeBlock
  | ExecutionPhase_InitializeBlock

export interface ExecutionPhase_ApplyExtrinsic {
  __kind: 'ApplyExtrinsic'
  extrinsicProof: StorageProof
  mismatch: ApplyExtrinsicMismatch
}

export interface ExecutionPhase_FinalizeBlock {
  __kind: 'FinalizeBlock'
  mismatch: FinalizeBlockMismatch
}

export interface ExecutionPhase_InitializeBlock {
  __kind: 'InitializeBlock'
}

export interface InvalidStateTransitionProof {
  domainId: DomainId
  badReceiptHash: H256
  proof: StorageProof
  executionPhase: ExecutionPhase
}

export const InvalidExtrinsicsRootProof: sts.Type<InvalidExtrinsicsRootProof> = sts.struct(() => {
  return {
    domainId: DomainId,
    badReceiptHash: H256,
    validBundleDigests: sts.array(() => ValidBundleDigest),
  }
})

export const ValidBundleDigest: sts.Type<ValidBundleDigest> = sts.struct(() => {
  return {
    bundleIndex: sts.number(),
    bundleDigest: sts.array(() =>
      sts.tuple(() => [sts.option(() => sts.bytes()), ExtrinsicDigest]),
    ),
  }
})

export const ExtrinsicDigest: sts.Type<ExtrinsicDigest> = sts.closedEnum(() => {
  return {
    Data: sts.bytes(),
    Hash: H256,
  }
})

export type ExtrinsicDigest = ExtrinsicDigest_Data | ExtrinsicDigest_Hash

export interface ExtrinsicDigest_Data {
  __kind: 'Data'
  value: Bytes
}

export interface ExtrinsicDigest_Hash {
  __kind: 'Hash'
  value: H256
}

export interface ValidBundleDigest {
  bundleIndex: number
  bundleDigest: [Bytes | undefined, ExtrinsicDigest][]
}

export interface InvalidExtrinsicsRootProof {
  domainId: DomainId
  badReceiptHash: H256
  validBundleDigests: ValidBundleDigest[]
}

export const InvalidDomainBlockHashProof: sts.Type<InvalidDomainBlockHashProof> = sts.struct(() => {
  return {
    domainId: DomainId,
    badReceiptHash: H256,
    digestStorageProof: StorageProof,
  }
})

export interface InvalidDomainBlockHashProof {
  domainId: DomainId
  badReceiptHash: H256
  digestStorageProof: StorageProof
}

export const InvalidBundlesFraudProof: sts.Type<InvalidBundlesFraudProof> = sts.struct(() => {
  return {
    badReceiptHash: H256,
    domainId: DomainId,
    bundleIndex: sts.number(),
    invalidBundleType: InvalidBundleType,
    proofData: StorageProof,
    isTrueInvalidFraudProof: sts.boolean(),
  }
})

export interface InvalidBundlesFraudProof {
  badReceiptHash: H256
  domainId: DomainId
  bundleIndex: number
  invalidBundleType: InvalidBundleType
  proofData: StorageProof
  isTrueInvalidFraudProof: boolean
}

export const InvalidBlockFeesProof: sts.Type<InvalidBlockFeesProof> = sts.struct(() => {
  return {
    domainId: DomainId,
    badReceiptHash: H256,
    storageProof: StorageProof,
  }
})

export interface InvalidBlockFeesProof {
  domainId: DomainId
  badReceiptHash: H256
  storageProof: StorageProof
}

export const ImproperTransactionSortitionProof: sts.Type<ImproperTransactionSortitionProof> =
  sts.struct(() => {
    return {
      domainId: DomainId,
      badReceiptHash: H256,
    }
  })

export interface ImproperTransactionSortitionProof {
  domainId: DomainId
  badReceiptHash: H256
}

export const BundleEquivocationProof: sts.Type<BundleEquivocationProof> = sts.struct(() => {
  return {
    domainId: DomainId,
    slot: Slot,
    firstHeader: SealedBundleHeader,
    secondHeader: SealedBundleHeader,
  }
})

export const SealedBundleHeader: sts.Type<SealedBundleHeader> = sts.struct(() => {
  return {
    header: BundleHeader,
    signature: sts.bytes(),
  }
})

export const BundleHeader: sts.Type<BundleHeader> = sts.struct(() => {
  return {
    proofOfElection: ProofOfElection,
    receipt: ExecutionReceipt,
    bundleSize: sts.number(),
    estimatedBundleWeight: Weight,
    bundleExtrinsicsRoot: H256,
  }
})

export const ProofOfElection: sts.Type<ProofOfElection> = sts.struct(() => {
  return {
    domainId: DomainId,
    slotNumber: sts.bigint(),
    globalRandomness: Randomness,
    vrfSignature: VrfSignature,
    operatorId: sts.bigint(),
    consensusBlockHash: H256,
  }
})

export const VrfSignature: sts.Type<VrfSignature> = sts.struct(() => {
  return {
    preOutput: sts.bytes(),
    proof: sts.bytes(),
  }
})

export interface VrfSignature {
  preOutput: Bytes
  proof: Bytes
}

export interface ProofOfElection {
  domainId: DomainId
  slotNumber: bigint
  globalRandomness: Randomness
  vrfSignature: VrfSignature
  operatorId: bigint
  consensusBlockHash: H256
}

export interface BundleHeader {
  proofOfElection: ProofOfElection
  receipt: ExecutionReceipt
  bundleSize: number
  estimatedBundleWeight: Weight
  bundleExtrinsicsRoot: H256
}

export interface SealedBundleHeader {
  header: BundleHeader
  signature: Bytes
}

export interface BundleEquivocationProof {
  domainId: DomainId
  slot: Slot
  firstHeader: SealedBundleHeader
  secondHeader: SealedBundleHeader
}

export type FraudProof =
  | FraudProof_BundleEquivocation
  | FraudProof_ImproperTransactionSortition
  | FraudProof_InvalidBlockFees
  | FraudProof_InvalidBundles
  | FraudProof_InvalidDomainBlockHash
  | FraudProof_InvalidExtrinsicsRoot
  | FraudProof_InvalidStateTransition
  | FraudProof_InvalidTransaction
  | FraudProof_ValidBundle

export interface FraudProof_BundleEquivocation {
  __kind: 'BundleEquivocation'
  value: BundleEquivocationProof
}

export interface FraudProof_ImproperTransactionSortition {
  __kind: 'ImproperTransactionSortition'
  value: ImproperTransactionSortitionProof
}

export interface FraudProof_InvalidBlockFees {
  __kind: 'InvalidBlockFees'
  value: InvalidBlockFeesProof
}

export interface FraudProof_InvalidBundles {
  __kind: 'InvalidBundles'
  value: InvalidBundlesFraudProof
}

export interface FraudProof_InvalidDomainBlockHash {
  __kind: 'InvalidDomainBlockHash'
  value: InvalidDomainBlockHashProof
}

export interface FraudProof_InvalidExtrinsicsRoot {
  __kind: 'InvalidExtrinsicsRoot'
  value: InvalidExtrinsicsRootProof
}

export interface FraudProof_InvalidStateTransition {
  __kind: 'InvalidStateTransition'
  value: InvalidStateTransitionProof
}

export interface FraudProof_InvalidTransaction {
  __kind: 'InvalidTransaction'
  value: InvalidTransactionProof
}

export interface FraudProof_ValidBundle {
  __kind: 'ValidBundle'
  value: ValidBundleProof
}

export const Bundle: sts.Type<Bundle> = sts.struct(() => {
  return {
    sealedHeader: SealedBundleHeader,
    extrinsics: sts.array(() => OpaqueExtrinsic),
  }
})

export const OpaqueExtrinsic = sts.bytes()

export interface Bundle {
  sealedHeader: SealedBundleHeader
  extrinsics: OpaqueExtrinsic[]
}

export type OpaqueExtrinsic = Bytes

export const MultiAddress: sts.Type<MultiAddress> = sts.closedEnum(() => {
  return {
    Address20: sts.bytes(),
    Address32: sts.bytes(),
    Id: AccountId32,
    Index: sts.unit(),
    Raw: sts.bytes(),
  }
})

export type MultiAddress =
  | MultiAddress_Address20
  | MultiAddress_Address32
  | MultiAddress_Id
  | MultiAddress_Index
  | MultiAddress_Raw

export interface MultiAddress_Address20 {
  __kind: 'Address20'
  value: Bytes
}

export interface MultiAddress_Address32 {
  __kind: 'Address32'
  value: Bytes
}

export interface MultiAddress_Id {
  __kind: 'Id'
  value: AccountId32
}

export interface MultiAddress_Index {
  __kind: 'Index'
}

export interface MultiAddress_Raw {
  __kind: 'Raw'
  value: Bytes
}

export const EnableRewardsAt: sts.Type<EnableRewardsAt> = sts.closedEnum(() => {
  return {
    Height: sts.option(() => sts.number()),
    Manually: sts.unit(),
    SolutionRange: sts.bigint(),
  }
})

export type EnableRewardsAt =
  | EnableRewardsAt_Height
  | EnableRewardsAt_Manually
  | EnableRewardsAt_SolutionRange

export interface EnableRewardsAt_Height {
  __kind: 'Height'
  value?: number | undefined
}

export interface EnableRewardsAt_Manually {
  __kind: 'Manually'
}

export interface EnableRewardsAt_SolutionRange {
  __kind: 'SolutionRange'
  value: bigint
}

export const SignedVote: sts.Type<SignedVote> = sts.struct(() => {
  return {
    vote: Vote,
    signature: Signature,
  }
})

export const Vote: sts.Type<Vote> = sts.closedEnum(() => {
  return {
    V0: sts.enumStruct({
      height: sts.number(),
      parentHash: H256,
      slot: Slot,
      solution: Solution,
      proofOfTime: PotOutput,
      futureProofOfTime: PotOutput,
    }),
  }
})

export const PotOutput = sts.bytes()

export const Solution: sts.Type<Solution> = sts.struct(() => {
  return {
    publicKey: Public,
    rewardAddress: AccountId32,
    sectorIndex: sts.number(),
    historySize: HistorySize,
    pieceOffset: PieceOffset,
    recordCommitment: RecordCommitment,
    recordWitness: RecordWitness,
    chunk: Scalar,
    chunkWitness: ChunkWitness,
    proofOfSpace: PosProof,
  }
})

export const PosProof = sts.bytes()

export const ChunkWitness = sts.bytes()

export const RecordWitness = sts.bytes()

export const RecordCommitment = sts.bytes()

export interface Solution {
  publicKey: Public
  rewardAddress: AccountId32
  sectorIndex: number
  historySize: HistorySize
  pieceOffset: PieceOffset
  recordCommitment: RecordCommitment
  recordWitness: RecordWitness
  chunk: Scalar
  chunkWitness: ChunkWitness
  proofOfSpace: PosProof
}

export type PosProof = Bytes

export type ChunkWitness = Bytes

export type RecordWitness = Bytes

export type RecordCommitment = Bytes

export type HistorySize = bigint

export type Vote = Vote_V0

export interface Vote_V0 {
  __kind: 'V0'
  height: number
  parentHash: H256
  slot: Slot
  solution: Solution
  proofOfTime: PotOutput
  futureProofOfTime: PotOutput
}

export type PotOutput = Bytes

export interface SignedVote {
  vote: Vote
  signature: Signature
}

export const EquivocationProof: sts.Type<EquivocationProof> = sts.struct(() => {
  return {
    offender: Public,
    slot: Slot,
    firstHeader: Header,
    secondHeader: Header,
  }
})

export const Header: sts.Type<Header> = sts.struct(() => {
  return {
    parentHash: H256,
    number: sts.number(),
    stateRoot: H256,
    extrinsicsRoot: H256,
    digest: Digest,
  }
})

export interface Header {
  parentHash: H256
  number: number
  stateRoot: H256
  extrinsicsRoot: H256
  digest: Digest
}

export interface EquivocationProof {
  offender: Public
  slot: Slot
  firstHeader: Header
  secondHeader: Header
}

export const SlashedReason: sts.Type<SlashedReason> = sts.closedEnum(() => {
  return {
    BadExecutionReceipt: H256,
    BundleEquivocation: Slot,
    InvalidBundle: sts.number(),
  }
})

export const RuntimeType: sts.Type<RuntimeType> = sts.closedEnum(() => {
  return {
    Evm: sts.unit(),
  }
})

export const DomainId = sts.number()

export const BalanceStatus: sts.Type<BalanceStatus> = sts.closedEnum(() => {
  return {
    Free: sts.unit(),
    Reserved: sts.unit(),
  }
})

export const Public = sts.bytes()

export const SegmentHeader: sts.Type<SegmentHeader> = sts.closedEnum(() => {
  return {
    V0: sts.enumStruct({
      segmentIndex: SegmentIndex,
      segmentCommitment: SegmentCommitment,
      prevSegmentHeaderHash: sts.bytes(),
      lastArchivedBlock: LastArchivedBlock,
    }),
  }
})

export const LastArchivedBlock: sts.Type<LastArchivedBlock> = sts.struct(() => {
  return {
    number: sts.number(),
    archivedProgress: ArchivedBlockProgress,
  }
})

export const ArchivedBlockProgress: sts.Type<ArchivedBlockProgress> = sts.closedEnum(() => {
  return {
    Complete: sts.unit(),
    Partial: sts.number(),
  }
})

export const H256 = sts.bytes()

export const AccountId32 = sts.bytes()

export const DispatchError: sts.Type<DispatchError> = sts.closedEnum(() => {
  return {
    Arithmetic: ArithmeticError,
    BadOrigin: sts.unit(),
    CannotLookup: sts.unit(),
    ConsumerRemaining: sts.unit(),
    Corruption: sts.unit(),
    Exhausted: sts.unit(),
    Module: ModuleError,
    NoProviders: sts.unit(),
    Other: sts.unit(),
    RootNotAllowed: sts.unit(),
    Token: TokenError,
    TooManyConsumers: sts.unit(),
    Transactional: TransactionalError,
    Unavailable: sts.unit(),
  }
})

export const TransactionalError: sts.Type<TransactionalError> = sts.closedEnum(() => {
  return {
    LimitReached: sts.unit(),
    NoLayer: sts.unit(),
  }
})

export const TokenError: sts.Type<TokenError> = sts.closedEnum(() => {
  return {
    BelowMinimum: sts.unit(),
    Blocked: sts.unit(),
    CannotCreate: sts.unit(),
    CannotCreateHold: sts.unit(),
    Frozen: sts.unit(),
    FundsUnavailable: sts.unit(),
    NotExpendable: sts.unit(),
    OnlyProvider: sts.unit(),
    UnknownAsset: sts.unit(),
    Unsupported: sts.unit(),
  }
})

export const ModuleError: sts.Type<ModuleError> = sts.struct(() => {
  return {
    index: sts.number(),
    error: sts.bytes(),
  }
})

export const ArithmeticError: sts.Type<ArithmeticError> = sts.closedEnum(() => {
  return {
    DivisionByZero: sts.unit(),
    Overflow: sts.unit(),
    Underflow: sts.unit(),
  }
})

export const DispatchInfo: sts.Type<DispatchInfo> = sts.struct(() => {
  return {
    weight: Weight,
    class: DispatchClass,
    paysFee: Pays,
  }
})

export const Pays: sts.Type<Pays> = sts.closedEnum(() => {
  return {
    No: sts.unit(),
    Yes: sts.unit(),
  }
})

export const DispatchClass: sts.Type<DispatchClass> = sts.closedEnum(() => {
  return {
    Mandatory: sts.unit(),
    Normal: sts.unit(),
    Operational: sts.unit(),
  }
})
