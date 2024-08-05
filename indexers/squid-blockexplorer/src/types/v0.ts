import type {Result, Option} from './support'

export type BalanceStatus = BalanceStatus_Free | BalanceStatus_Reserved

export interface BalanceStatus_Free {
    __kind: 'Free'
}

export interface BalanceStatus_Reserved {
    __kind: 'Reserved'
}

export type RuntimeType = RuntimeType_Evm

export interface RuntimeType_Evm {
    __kind: 'Evm'
}

export type SlashedReason = SlashedReason_InvalidBundle | SlashedReason_BadExecutionReceipt | SlashedReason_BundleEquivocation

export interface SlashedReason_InvalidBundle {
    __kind: 'InvalidBundle'
    value: number
}

export interface SlashedReason_BadExecutionReceipt {
    __kind: 'BadExecutionReceipt'
    value: Uint8Array
}

export interface SlashedReason_BundleEquivocation {
    __kind: 'BundleEquivocation'
    value: bigint
}

export type ChainId = ChainId_Consensus | ChainId_Domain

export interface ChainId_Consensus {
    __kind: 'Consensus'
}

export interface ChainId_Domain {
    __kind: 'Domain'
    value: number
}

export type OutboxMessageResult = OutboxMessageResult_Ok | OutboxMessageResult_Err

export interface OutboxMessageResult_Ok {
    __kind: 'Ok'
}

export interface OutboxMessageResult_Err {
    __kind: 'Err'
    value: DispatchError
}

export type SegmentHeader = SegmentHeader_V0

export interface SegmentHeader_V0 {
    __kind: 'V0'
    segmentIndex: bigint
    segmentCommitment: Uint8Array
    prevSegmentHeaderHash: Uint8Array
    lastArchivedBlock: LastArchivedBlock
}

export type Type_48 = Type_48_Ok | Type_48_Err

export interface Type_48_Ok {
    __kind: 'Ok'
}

export interface Type_48_Err {
    __kind: 'Err'
    value: DispatchError
}

export type DispatchError = DispatchError_Other | DispatchError_CannotLookup | DispatchError_BadOrigin | DispatchError_Module | DispatchError_ConsumerRemaining | DispatchError_NoProviders | DispatchError_TooManyConsumers | DispatchError_Token | DispatchError_Arithmetic | DispatchError_Transactional | DispatchError_Exhausted | DispatchError_Corruption | DispatchError_Unavailable | DispatchError_RootNotAllowed

export interface DispatchError_Other {
    __kind: 'Other'
}

export interface DispatchError_CannotLookup {
    __kind: 'CannotLookup'
}

export interface DispatchError_BadOrigin {
    __kind: 'BadOrigin'
}

export interface DispatchError_Module {
    __kind: 'Module'
    value: ModuleError
}

export interface DispatchError_ConsumerRemaining {
    __kind: 'ConsumerRemaining'
}

export interface DispatchError_NoProviders {
    __kind: 'NoProviders'
}

export interface DispatchError_TooManyConsumers {
    __kind: 'TooManyConsumers'
}

export interface DispatchError_Token {
    __kind: 'Token'
    value: TokenError
}

export interface DispatchError_Arithmetic {
    __kind: 'Arithmetic'
    value: ArithmeticError
}

export interface DispatchError_Transactional {
    __kind: 'Transactional'
    value: TransactionalError
}

export interface DispatchError_Exhausted {
    __kind: 'Exhausted'
}

export interface DispatchError_Corruption {
    __kind: 'Corruption'
}

export interface DispatchError_Unavailable {
    __kind: 'Unavailable'
}

export interface DispatchError_RootNotAllowed {
    __kind: 'RootNotAllowed'
}

export interface DispatchInfo {
    weight: Weight
    class: DispatchClass
    paysFee: Pays
}

export interface VestingSchedule {
    start: number
    period: number
    periodCount: number
    perPeriod: bigint
}

export type MultiAddress = MultiAddress_Id | MultiAddress_Index | MultiAddress_Raw | MultiAddress_Address32 | MultiAddress_Address20

export interface MultiAddress_Id {
    __kind: 'Id'
    value: Uint8Array
}

export interface MultiAddress_Index {
    __kind: 'Index'
    value: null
}

export interface MultiAddress_Raw {
    __kind: 'Raw'
    value: Uint8Array
}

export interface MultiAddress_Address32 {
    __kind: 'Address32'
    value: Uint8Array
}

export interface MultiAddress_Address20 {
    __kind: 'Address20'
    value: Uint8Array
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

export interface OperatorConfig {
    signingKey: Uint8Array
    minimumNominatorStake: bigint
    nominationTax: number
}

export interface Bundle {
    sealedHeader: SealedBundleHeader
    extrinsics: Uint8Array[]
}

export type FraudProof = FraudProof_InvalidStateTransition | FraudProof_InvalidTransaction | FraudProof_BundleEquivocation | FraudProof_ImproperTransactionSortition | FraudProof_InvalidBlockFees | FraudProof_InvalidExtrinsicsRoot | FraudProof_ValidBundle | FraudProof_InvalidDomainBlockHash | FraudProof_InvalidBundles

export interface FraudProof_InvalidStateTransition {
    __kind: 'InvalidStateTransition'
    value: InvalidStateTransitionProof
}

export interface FraudProof_InvalidTransaction {
    __kind: 'InvalidTransaction'
    value: InvalidTransactionProof
}

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

export interface FraudProof_InvalidExtrinsicsRoot {
    __kind: 'InvalidExtrinsicsRoot'
    value: InvalidExtrinsicsRootProof
}

export interface FraudProof_ValidBundle {
    __kind: 'ValidBundle'
    value: ValidBundleProof
}

export interface FraudProof_InvalidDomainBlockHash {
    __kind: 'InvalidDomainBlockHash'
    value: InvalidDomainBlockHashProof
}

export interface FraudProof_InvalidBundles {
    __kind: 'InvalidBundles'
    value: InvalidBundlesFraudProof
}

export type OperatorAllowList = OperatorAllowList_Anyone | OperatorAllowList_Operators

export interface OperatorAllowList_Anyone {
    __kind: 'Anyone'
}

export interface OperatorAllowList_Operators {
    __kind: 'Operators'
    value: Uint8Array[]
}

export interface InitiateChannelParams {
    maxOutgoingMessages: number
    feeModel: FeeModel
}

export interface CrossDomainMessage {
    srcChainId: ChainId
    dstChainId: ChainId
    channelId: bigint
    nonce: bigint
    proof: Proof
    weightTag: MessageWeightTag
}

export type EnableRewardsAt = EnableRewardsAt_Height | EnableRewardsAt_SolutionRange | EnableRewardsAt_Manually

export interface EnableRewardsAt_Height {
    __kind: 'Height'
    value: (number | undefined)
}

export interface EnableRewardsAt_SolutionRange {
    __kind: 'SolutionRange'
    value: bigint
}

export interface EnableRewardsAt_Manually {
    __kind: 'Manually'
}

export interface EquivocationProof {
    offender: Uint8Array
    slot: bigint
    firstHeader: Header
    secondHeader: Header
}

export interface SignedVote {
    vote: Vote
    signature: Uint8Array
}

export type Call = Call_System | Call_Timestamp | Call_Subspace | Call_Balances | Call_Utility | Call_Domains | Call_RuntimeConfigs | Call_Vesting | Call_Messenger | Call_Transporter | Call_Sudo

export interface Call_System {
    __kind: 'System'
    value: SystemCall
}

export interface Call_Timestamp {
    __kind: 'Timestamp'
    value: TimestampCall
}

export interface Call_Subspace {
    __kind: 'Subspace'
    value: SubspaceCall
}

export interface Call_Balances {
    __kind: 'Balances'
    value: BalancesCall
}

export interface Call_Utility {
    __kind: 'Utility'
    value: UtilityCall
}

export interface Call_Domains {
    __kind: 'Domains'
    value: DomainsCall
}

export interface Call_RuntimeConfigs {
    __kind: 'RuntimeConfigs'
    value: RuntimeConfigsCall
}

export interface Call_Vesting {
    __kind: 'Vesting'
    value: VestingCall
}

export interface Call_Messenger {
    __kind: 'Messenger'
    value: MessengerCall
}

export interface Call_Transporter {
    __kind: 'Transporter'
    value: TransporterCall
}

export interface Call_Sudo {
    __kind: 'Sudo'
    value: SudoCall
}

export interface Weight {
    refTime: bigint
    proofSize: bigint
}

export interface Location {
    chainId: ChainId
    accountId: MultiAccountId
}

export type OriginCaller = OriginCaller_system | OriginCaller_Void

export interface OriginCaller_system {
    __kind: 'system'
    value: RawOrigin
}

export interface OriginCaller_Void {
    __kind: 'Void'
    value: Void
}

export interface AccountData {
    free: bigint
    reserved: bigint
    frozen: bigint
    flags: bigint
}

export interface Type_152 {
    amount: bigint
}

export interface IdAmount {
    id: HoldIdentifier
    amount: bigint
}

export interface BalanceLock {
    id: Uint8Array
    amount: bigint
    reasons: Reasons
}

export interface ReserveData {
    id: Uint8Array
    amount: bigint
}

export interface BlockTreeNode {
    executionReceipt: ExecutionReceipt
    operatorIds: bigint[]
}

export interface Deposit {
    known: KnownDeposit
    pending: (PendingDeposit | undefined)
}

export interface DomainObject {
    ownerAccountId: Uint8Array
    createdAt: number
    genesisReceiptHash: Uint8Array
    domainConfig: DomainConfig
    domainRuntimeInfo: DomainRuntimeInfo
}

export interface StakingSummary {
    currentEpochIndex: number
    currentTotalStake: bigint
    currentOperators: [bigint, bigint][]
    nextOperators: bigint[]
    currentEpochRewards: [bigint, bigint][]
}

export interface TxRangeState {
    txRange: bigint
    intervalBlocks: bigint
    intervalBundles: bigint
}

export interface BundleDigest {
    headerHash: Uint8Array
    extrinsicsRoot: Uint8Array
}

export interface ElectionVerificationParams {
    operators: [bigint, bigint][]
    totalDomainStake: bigint
}

export interface Operator {
    signingKey: Uint8Array
    currentDomainId: number
    nextDomainId: number
    minimumNominatorStake: bigint
    nominationTax: number
    currentTotalStake: bigint
    currentEpochRewards: bigint
    currentTotalShares: bigint
    status: OperatorStatus
    depositsInEpoch: bigint
    withdrawalsInEpoch: bigint
}

export interface RuntimeObject {
    runtimeName: string
    runtimeType: RuntimeType
    runtimeUpgrades: number
    hash: Uint8Array
    rawGenesis: RawGenesis
    version: RuntimeVersion
    createdAt: number
    updatedAt: number
}

export interface ScheduledRuntimeUpgrade {
    rawGenesis: RawGenesis
    version: RuntimeVersion
    hash: Uint8Array
}

export interface Withdrawal {
    totalWithdrawalAmount: bigint
    withdrawals: [number, number, bigint][]
    withdrawalInShares: ([[number, number], number, bigint] | undefined)
}

export interface BlockMessages {
    outbox: [ChainId, [bigint, bigint], MessageWeightTag][]
    inboxResponses: [ChainId, [bigint, bigint], MessageWeightTag][]
}

export interface Channel {
    channelId: bigint
    state: ChannelState
    nextInboxNonce: bigint
    nextOutboxNonce: bigint
    latestResponseReceivedMessageNonce: (bigint | undefined)
    maxOutgoingMessages: number
    fee: FeeModel
}

export interface Message {
    srcChainId: ChainId
    dstChainId: ChainId
    channelId: bigint
    nonce: bigint
    payload: VersionedPayload
    lastDeliveredMessageResponseNonce: (bigint | undefined)
}

export interface OffenceDetails {
    offender: Uint8Array
}

export interface Scalar {
    inner: Uint8Array
}

export interface SolutionRangeOverride {
    solutionRange: bigint
    votingSolutionRange: bigint
}

export interface VoteVerificationData {
    solutionRange: bigint
    voteSolutionRange: bigint
    currentSlot: bigint
    parentSlot: bigint
}

export interface PotEntropyValue {
    targetSlot: (bigint | undefined)
    entropy: Uint8Array
}

export interface SolutionRanges {
    current: bigint
    next: (bigint | undefined)
    votingCurrent: bigint
    votingNext: (bigint | undefined)
}

export interface AccountInfo {
    nonce: number
    consumers: number
    providers: number
    sufficients: number
    data: AccountData
}

export interface CodeUpgradeAuthorization {
    codeHash: Uint8Array
    checkVersion: boolean
}

export interface PerDispatchClass {
    normal: Weight
    operational: Weight
    mandatory: Weight
}

export interface Digest {
    logs: DigestItem[]
}

export interface EventRecord {
    phase: Phase
    event: Event
    topics: Uint8Array[]
}

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

export interface LastRuntimeUpgradeInfo {
    specVersion: number
    specName: string
}

export interface CollectedFees {
    storage: bigint
    compute: bigint
    tips: bigint
}

export interface BlockTransactionByteFee {
    current: bigint
    next: bigint
}

export type Releases = Releases_V1Ancient | Releases_V2

export interface Releases_V1Ancient {
    __kind: 'V1Ancient'
}

export interface Releases_V2 {
    __kind: 'V2'
}

export interface Transfer {
    amount: bigint
    sender: Location
    receiver: Location
}

export interface BlockLength {
    max: Type_85
}

export interface BlockWeights {
    baseBlock: Weight
    maxBlock: Weight
    perClass: Type_81
}

export interface RuntimeDbWeight {
    read: bigint
    write: bigint
}

export interface RuntimeVersion {
    specName: string
    implName: string
    authoringVersion: number
    specVersion: number
    implVersion: number
    apis: [Uint8Array, number][]
    transactionVersion: number
    stateVersion: number
    extrinsicStateVersion: number
}

export interface LastArchivedBlock {
    number: number
    archivedProgress: ArchivedBlockProgress
}

export interface ModuleError {
    index: number
    error: Uint8Array
}

export type TokenError = TokenError_FundsUnavailable | TokenError_OnlyProvider | TokenError_BelowMinimum | TokenError_CannotCreate | TokenError_UnknownAsset | TokenError_Frozen | TokenError_Unsupported | TokenError_CannotCreateHold | TokenError_NotExpendable | TokenError_Blocked

export interface TokenError_FundsUnavailable {
    __kind: 'FundsUnavailable'
}

export interface TokenError_OnlyProvider {
    __kind: 'OnlyProvider'
}

export interface TokenError_BelowMinimum {
    __kind: 'BelowMinimum'
}

export interface TokenError_CannotCreate {
    __kind: 'CannotCreate'
}

export interface TokenError_UnknownAsset {
    __kind: 'UnknownAsset'
}

export interface TokenError_Frozen {
    __kind: 'Frozen'
}

export interface TokenError_Unsupported {
    __kind: 'Unsupported'
}

export interface TokenError_CannotCreateHold {
    __kind: 'CannotCreateHold'
}

export interface TokenError_NotExpendable {
    __kind: 'NotExpendable'
}

export interface TokenError_Blocked {
    __kind: 'Blocked'
}

export type ArithmeticError = ArithmeticError_Underflow | ArithmeticError_Overflow | ArithmeticError_DivisionByZero

export interface ArithmeticError_Underflow {
    __kind: 'Underflow'
}

export interface ArithmeticError_Overflow {
    __kind: 'Overflow'
}

export interface ArithmeticError_DivisionByZero {
    __kind: 'DivisionByZero'
}

export type TransactionalError = TransactionalError_LimitReached | TransactionalError_NoLayer

export interface TransactionalError_LimitReached {
    __kind: 'LimitReached'
}

export interface TransactionalError_NoLayer {
    __kind: 'NoLayer'
}

export type DispatchClass = DispatchClass_Normal | DispatchClass_Operational | DispatchClass_Mandatory

export interface DispatchClass_Normal {
    __kind: 'Normal'
}

export interface DispatchClass_Operational {
    __kind: 'Operational'
}

export interface DispatchClass_Mandatory {
    __kind: 'Mandatory'
}

export type Pays = Pays_Yes | Pays_No

export interface Pays_Yes {
    __kind: 'Yes'
}

export interface Pays_No {
    __kind: 'No'
}

export interface SealedBundleHeader {
    header: BundleHeader
    signature: Uint8Array
}

export interface InvalidStateTransitionProof {
    domainId: number
    badReceiptHash: Uint8Array
    proof: StorageProof
    executionPhase: ExecutionPhase
}

export interface InvalidTransactionProof {
    domainId: number
    badReceiptHash: Uint8Array
    domainBlockNumber: number
    domainBlockHash: Uint8Array
    invalidExtrinsic: Uint8Array
    storageProof: StorageProof
}

export interface BundleEquivocationProof {
    domainId: number
    slot: bigint
    firstHeader: SealedBundleHeader
    secondHeader: SealedBundleHeader
}

export interface ImproperTransactionSortitionProof {
    domainId: number
    badReceiptHash: Uint8Array
}

export interface InvalidBlockFeesProof {
    domainId: number
    badReceiptHash: Uint8Array
    storageProof: StorageProof
}

export interface InvalidExtrinsicsRootProof {
    domainId: number
    badReceiptHash: Uint8Array
    validBundleDigests: ValidBundleDigest[]
}

export interface ValidBundleProof {
    domainId: number
    badReceiptHash: Uint8Array
    bundleIndex: number
}

export interface InvalidDomainBlockHashProof {
    domainId: number
    badReceiptHash: Uint8Array
    digestStorageProof: StorageProof
}

export interface InvalidBundlesFraudProof {
    badReceiptHash: Uint8Array
    domainId: number
    bundleIndex: number
    invalidBundleType: InvalidBundleType
    proofData: StorageProof
    isTrueInvalidFraudProof: boolean
}

export interface FeeModel {
    relayFee: bigint
}

export interface Proof {
    consensusChainBlockInfo: BlockInfo
    consensusChainStateRoot: Uint8Array
    domainProof: ([BlockInfo, StorageProof] | undefined)
    messageProof: StorageProof
}

export type MessageWeightTag = MessageWeightTag_ProtocolChannelOpen | MessageWeightTag_ProtocolChannelClose | MessageWeightTag_EndpointRequest | MessageWeightTag_EndpointResponse | MessageWeightTag_None

export interface MessageWeightTag_ProtocolChannelOpen {
    __kind: 'ProtocolChannelOpen'
}

export interface MessageWeightTag_ProtocolChannelClose {
    __kind: 'ProtocolChannelClose'
}

export interface MessageWeightTag_EndpointRequest {
    __kind: 'EndpointRequest'
    value: Endpoint
}

export interface MessageWeightTag_EndpointResponse {
    __kind: 'EndpointResponse'
    value: Endpoint
}

export interface MessageWeightTag_None {
    __kind: 'None'
}

export interface Header {
    parentHash: Uint8Array
    number: number
    stateRoot: Uint8Array
    extrinsicsRoot: Uint8Array
    digest: Digest
}

export type Vote = Vote_V0

export interface Vote_V0 {
    __kind: 'V0'
    height: number
    parentHash: Uint8Array
    slot: bigint
    solution: Solution
    proofOfTime: Uint8Array
    futureProofOfTime: Uint8Array
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type SystemCall = SystemCall_remark | SystemCall_set_heap_pages | SystemCall_set_code | SystemCall_set_code_without_checks | SystemCall_set_storage | SystemCall_kill_storage | SystemCall_kill_prefix | SystemCall_remark_with_event | SystemCall_authorize_upgrade | SystemCall_authorize_upgrade_without_checks | SystemCall_apply_authorized_upgrade

/**
 * See [`Pallet::remark`].
 */
export interface SystemCall_remark {
    __kind: 'remark'
    remark: Uint8Array
}

/**
 * See [`Pallet::set_heap_pages`].
 */
export interface SystemCall_set_heap_pages {
    __kind: 'set_heap_pages'
    pages: bigint
}

/**
 * See [`Pallet::set_code`].
 */
export interface SystemCall_set_code {
    __kind: 'set_code'
    code: Uint8Array
}

/**
 * See [`Pallet::set_code_without_checks`].
 */
export interface SystemCall_set_code_without_checks {
    __kind: 'set_code_without_checks'
    code: Uint8Array
}

/**
 * See [`Pallet::set_storage`].
 */
export interface SystemCall_set_storage {
    __kind: 'set_storage'
    items: [Uint8Array, Uint8Array][]
}

/**
 * See [`Pallet::kill_storage`].
 */
export interface SystemCall_kill_storage {
    __kind: 'kill_storage'
    keys: Uint8Array[]
}

/**
 * See [`Pallet::kill_prefix`].
 */
export interface SystemCall_kill_prefix {
    __kind: 'kill_prefix'
    prefix: Uint8Array
    subkeys: number
}

/**
 * See [`Pallet::remark_with_event`].
 */
export interface SystemCall_remark_with_event {
    __kind: 'remark_with_event'
    remark: Uint8Array
}

/**
 * See [`Pallet::authorize_upgrade`].
 */
export interface SystemCall_authorize_upgrade {
    __kind: 'authorize_upgrade'
    codeHash: Uint8Array
}

/**
 * See [`Pallet::authorize_upgrade_without_checks`].
 */
export interface SystemCall_authorize_upgrade_without_checks {
    __kind: 'authorize_upgrade_without_checks'
    codeHash: Uint8Array
}

/**
 * See [`Pallet::apply_authorized_upgrade`].
 */
export interface SystemCall_apply_authorized_upgrade {
    __kind: 'apply_authorized_upgrade'
    code: Uint8Array
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type TimestampCall = TimestampCall_set

/**
 * See [`Pallet::set`].
 */
export interface TimestampCall_set {
    __kind: 'set'
    now: bigint
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type SubspaceCall = SubspaceCall_report_equivocation | SubspaceCall_store_segment_headers | SubspaceCall_enable_solution_range_adjustment | SubspaceCall_vote | SubspaceCall_enable_rewards_at | SubspaceCall_enable_authoring_by_anyone

/**
 * See [`Pallet::report_equivocation`].
 */
export interface SubspaceCall_report_equivocation {
    __kind: 'report_equivocation'
    equivocationProof: EquivocationProof
}

/**
 * See [`Pallet::store_segment_headers`].
 */
export interface SubspaceCall_store_segment_headers {
    __kind: 'store_segment_headers'
    segmentHeaders: SegmentHeader[]
}

/**
 * See [`Pallet::enable_solution_range_adjustment`].
 */
export interface SubspaceCall_enable_solution_range_adjustment {
    __kind: 'enable_solution_range_adjustment'
    solutionRangeOverride: (bigint | undefined)
    votingSolutionRangeOverride: (bigint | undefined)
}

/**
 * See [`Pallet::vote`].
 */
export interface SubspaceCall_vote {
    __kind: 'vote'
    signedVote: SignedVote
}

/**
 * See [`Pallet::enable_rewards_at`].
 */
export interface SubspaceCall_enable_rewards_at {
    __kind: 'enable_rewards_at'
    enableRewardsAt: EnableRewardsAt
}

/**
 * See [`Pallet::enable_authoring_by_anyone`].
 */
export interface SubspaceCall_enable_authoring_by_anyone {
    __kind: 'enable_authoring_by_anyone'
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type BalancesCall = BalancesCall_transfer_allow_death | BalancesCall_force_transfer | BalancesCall_transfer_keep_alive | BalancesCall_transfer_all | BalancesCall_force_unreserve | BalancesCall_upgrade_accounts | BalancesCall_force_set_balance

/**
 * See [`Pallet::transfer_allow_death`].
 */
export interface BalancesCall_transfer_allow_death {
    __kind: 'transfer_allow_death'
    dest: MultiAddress
    value: bigint
}

/**
 * See [`Pallet::force_transfer`].
 */
export interface BalancesCall_force_transfer {
    __kind: 'force_transfer'
    source: MultiAddress
    dest: MultiAddress
    value: bigint
}

/**
 * See [`Pallet::transfer_keep_alive`].
 */
export interface BalancesCall_transfer_keep_alive {
    __kind: 'transfer_keep_alive'
    dest: MultiAddress
    value: bigint
}

/**
 * See [`Pallet::transfer_all`].
 */
export interface BalancesCall_transfer_all {
    __kind: 'transfer_all'
    dest: MultiAddress
    keepAlive: boolean
}

/**
 * See [`Pallet::force_unreserve`].
 */
export interface BalancesCall_force_unreserve {
    __kind: 'force_unreserve'
    who: MultiAddress
    amount: bigint
}

/**
 * See [`Pallet::upgrade_accounts`].
 */
export interface BalancesCall_upgrade_accounts {
    __kind: 'upgrade_accounts'
    who: Uint8Array[]
}

/**
 * See [`Pallet::force_set_balance`].
 */
export interface BalancesCall_force_set_balance {
    __kind: 'force_set_balance'
    who: MultiAddress
    newFree: bigint
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type UtilityCall = UtilityCall_batch | UtilityCall_as_derivative | UtilityCall_batch_all | UtilityCall_dispatch_as | UtilityCall_force_batch | UtilityCall_with_weight

/**
 * See [`Pallet::batch`].
 */
export interface UtilityCall_batch {
    __kind: 'batch'
    calls: Call[]
}

/**
 * See [`Pallet::as_derivative`].
 */
export interface UtilityCall_as_derivative {
    __kind: 'as_derivative'
    index: number
    call: Call
}

/**
 * See [`Pallet::batch_all`].
 */
export interface UtilityCall_batch_all {
    __kind: 'batch_all'
    calls: Call[]
}

/**
 * See [`Pallet::dispatch_as`].
 */
export interface UtilityCall_dispatch_as {
    __kind: 'dispatch_as'
    asOrigin: OriginCaller
    call: Call
}

/**
 * See [`Pallet::force_batch`].
 */
export interface UtilityCall_force_batch {
    __kind: 'force_batch'
    calls: Call[]
}

/**
 * See [`Pallet::with_weight`].
 */
export interface UtilityCall_with_weight {
    __kind: 'with_weight'
    call: Call
    weight: Weight
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type DomainsCall = DomainsCall_submit_bundle | DomainsCall_submit_fraud_proof | DomainsCall_register_domain_runtime | DomainsCall_upgrade_domain_runtime | DomainsCall_register_operator | DomainsCall_nominate_operator | DomainsCall_instantiate_domain | DomainsCall_switch_domain | DomainsCall_deregister_operator | DomainsCall_withdraw_stake | DomainsCall_unlock_funds | DomainsCall_unlock_operator | DomainsCall_update_domain_operator_allow_list | DomainsCall_force_staking_epoch_transition

/**
 * See [`Pallet::submit_bundle`].
 */
export interface DomainsCall_submit_bundle {
    __kind: 'submit_bundle'
    opaqueBundle: Bundle
}

/**
 * See [`Pallet::submit_fraud_proof`].
 */
export interface DomainsCall_submit_fraud_proof {
    __kind: 'submit_fraud_proof'
    fraudProof: FraudProof
}

/**
 * See [`Pallet::register_domain_runtime`].
 */
export interface DomainsCall_register_domain_runtime {
    __kind: 'register_domain_runtime'
    runtimeName: string
    runtimeType: RuntimeType
    rawGenesisStorage: Uint8Array
}

/**
 * See [`Pallet::upgrade_domain_runtime`].
 */
export interface DomainsCall_upgrade_domain_runtime {
    __kind: 'upgrade_domain_runtime'
    runtimeId: number
    rawGenesisStorage: Uint8Array
}

/**
 * See [`Pallet::register_operator`].
 */
export interface DomainsCall_register_operator {
    __kind: 'register_operator'
    domainId: number
    amount: bigint
    config: OperatorConfig
}

/**
 * See [`Pallet::nominate_operator`].
 */
export interface DomainsCall_nominate_operator {
    __kind: 'nominate_operator'
    operatorId: bigint
    amount: bigint
}

/**
 * See [`Pallet::instantiate_domain`].
 */
export interface DomainsCall_instantiate_domain {
    __kind: 'instantiate_domain'
    domainConfig: DomainConfig
}

/**
 * See [`Pallet::switch_domain`].
 */
export interface DomainsCall_switch_domain {
    __kind: 'switch_domain'
    operatorId: bigint
    newDomainId: number
}

/**
 * See [`Pallet::deregister_operator`].
 */
export interface DomainsCall_deregister_operator {
    __kind: 'deregister_operator'
    operatorId: bigint
}

/**
 * See [`Pallet::withdraw_stake`].
 */
export interface DomainsCall_withdraw_stake {
    __kind: 'withdraw_stake'
    operatorId: bigint
    shares: bigint
}

/**
 * See [`Pallet::unlock_funds`].
 */
export interface DomainsCall_unlock_funds {
    __kind: 'unlock_funds'
    operatorId: bigint
}

/**
 * See [`Pallet::unlock_operator`].
 */
export interface DomainsCall_unlock_operator {
    __kind: 'unlock_operator'
    operatorId: bigint
}

/**
 * See [`Pallet::update_domain_operator_allow_list`].
 */
export interface DomainsCall_update_domain_operator_allow_list {
    __kind: 'update_domain_operator_allow_list'
    domainId: number
    operatorAllowList: OperatorAllowList
}

/**
 * See [`Pallet::force_staking_epoch_transition`].
 */
export interface DomainsCall_force_staking_epoch_transition {
    __kind: 'force_staking_epoch_transition'
    domainId: number
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type RuntimeConfigsCall = RuntimeConfigsCall_set_enable_domains | RuntimeConfigsCall_set_enable_dynamic_cost_of_storage | RuntimeConfigsCall_set_enable_balance_transfers | RuntimeConfigsCall_set_enable_non_root_calls

/**
 * See [`Pallet::set_enable_domains`].
 */
export interface RuntimeConfigsCall_set_enable_domains {
    __kind: 'set_enable_domains'
    enableDomains: boolean
}

/**
 * See [`Pallet::set_enable_dynamic_cost_of_storage`].
 */
export interface RuntimeConfigsCall_set_enable_dynamic_cost_of_storage {
    __kind: 'set_enable_dynamic_cost_of_storage'
    enableDynamicCostOfStorage: boolean
}

/**
 * See [`Pallet::set_enable_balance_transfers`].
 */
export interface RuntimeConfigsCall_set_enable_balance_transfers {
    __kind: 'set_enable_balance_transfers'
    enableBalanceTransfers: boolean
}

/**
 * See [`Pallet::set_enable_non_root_calls`].
 */
export interface RuntimeConfigsCall_set_enable_non_root_calls {
    __kind: 'set_enable_non_root_calls'
    enableNonRootCalls: boolean
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type VestingCall = VestingCall_claim | VestingCall_vested_transfer | VestingCall_update_vesting_schedules | VestingCall_claim_for

/**
 * See [`Pallet::claim`].
 */
export interface VestingCall_claim {
    __kind: 'claim'
}

/**
 * See [`Pallet::vested_transfer`].
 */
export interface VestingCall_vested_transfer {
    __kind: 'vested_transfer'
    dest: MultiAddress
    schedule: VestingSchedule
}

/**
 * See [`Pallet::update_vesting_schedules`].
 */
export interface VestingCall_update_vesting_schedules {
    __kind: 'update_vesting_schedules'
    who: MultiAddress
    vestingSchedules: VestingSchedule[]
}

/**
 * See [`Pallet::claim_for`].
 */
export interface VestingCall_claim_for {
    __kind: 'claim_for'
    dest: MultiAddress
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type MessengerCall = MessengerCall_initiate_channel | MessengerCall_close_channel | MessengerCall_relay_message | MessengerCall_relay_message_response

/**
 * See [`Pallet::initiate_channel`].
 */
export interface MessengerCall_initiate_channel {
    __kind: 'initiate_channel'
    dstChainId: ChainId
    params: InitiateChannelParams
}

/**
 * See [`Pallet::close_channel`].
 */
export interface MessengerCall_close_channel {
    __kind: 'close_channel'
    chainId: ChainId
    channelId: bigint
}

/**
 * See [`Pallet::relay_message`].
 */
export interface MessengerCall_relay_message {
    __kind: 'relay_message'
    msg: CrossDomainMessage
}

/**
 * See [`Pallet::relay_message_response`].
 */
export interface MessengerCall_relay_message_response {
    __kind: 'relay_message_response'
    msg: CrossDomainMessage
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type TransporterCall = TransporterCall_transfer

/**
 * See [`Pallet::transfer`].
 */
export interface TransporterCall_transfer {
    __kind: 'transfer'
    dstLocation: Location
    amount: bigint
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type SudoCall = SudoCall_sudo | SudoCall_sudo_unchecked_weight | SudoCall_set_key | SudoCall_sudo_as | SudoCall_remove_key

/**
 * See [`Pallet::sudo`].
 */
export interface SudoCall_sudo {
    __kind: 'sudo'
    call: Call
}

/**
 * See [`Pallet::sudo_unchecked_weight`].
 */
export interface SudoCall_sudo_unchecked_weight {
    __kind: 'sudo_unchecked_weight'
    call: Call
    weight: Weight
}

/**
 * See [`Pallet::set_key`].
 */
export interface SudoCall_set_key {
    __kind: 'set_key'
    new: MultiAddress
}

/**
 * See [`Pallet::sudo_as`].
 */
export interface SudoCall_sudo_as {
    __kind: 'sudo_as'
    who: MultiAddress
    call: Call
}

/**
 * See [`Pallet::remove_key`].
 */
export interface SudoCall_remove_key {
    __kind: 'remove_key'
}

export type MultiAccountId = MultiAccountId_AccountId32 | MultiAccountId_AccountId20 | MultiAccountId_Raw

export interface MultiAccountId_AccountId32 {
    __kind: 'AccountId32'
    value: Uint8Array
}

export interface MultiAccountId_AccountId20 {
    __kind: 'AccountId20'
    value: Uint8Array
}

export interface MultiAccountId_Raw {
    __kind: 'Raw'
    value: Uint8Array
}

export type RawOrigin = RawOrigin_Root | RawOrigin_Signed | RawOrigin_None

export interface RawOrigin_Root {
    __kind: 'Root'
}

export interface RawOrigin_Signed {
    __kind: 'Signed'
    value: Uint8Array
}

export interface RawOrigin_None {
    __kind: 'None'
}

export type Void = never

export type HoldIdentifier = HoldIdentifier_Domains

export interface HoldIdentifier_Domains {
    __kind: 'Domains'
    value: DomainsHoldIdentifier
}

export type Reasons = Reasons_Fee | Reasons_Misc | Reasons_All

export interface Reasons_Fee {
    __kind: 'Fee'
}

export interface Reasons_Misc {
    __kind: 'Misc'
}

export interface Reasons_All {
    __kind: 'All'
}

export interface ExecutionReceipt {
    domainBlockNumber: number
    domainBlockHash: Uint8Array
    domainBlockExtrinsicRoot: Uint8Array
    parentDomainBlockReceiptHash: Uint8Array
    consensusBlockNumber: number
    consensusBlockHash: Uint8Array
    inboxedBundles: InboxedBundle[]
    finalStateRoot: Uint8Array
    executionTrace: Uint8Array[]
    executionTraceRoot: Uint8Array
    blockFees: BlockFees
}

export interface KnownDeposit {
    shares: bigint
}

export interface PendingDeposit {
    effectiveDomainEpoch: [number, number]
    amount: bigint
}

export type DomainRuntimeInfo = DomainRuntimeInfo_EVM

export interface DomainRuntimeInfo_EVM {
    __kind: 'EVM'
    chainId: bigint
}

export type OperatorStatus = OperatorStatus_Registered | OperatorStatus_Deregistered | OperatorStatus_Slashed

export interface OperatorStatus_Registered {
    __kind: 'Registered'
}

export interface OperatorStatus_Deregistered {
    __kind: 'Deregistered'
    value: OperatorDeregisteredInfo
}

export interface OperatorStatus_Slashed {
    __kind: 'Slashed'
}

export interface RawGenesis {
    top: [Uint8Array, Uint8Array][]
    childrenDefault: [Uint8Array, [Uint8Array, Uint8Array][]][]
}

export type ChannelState = ChannelState_Initiated | ChannelState_Open | ChannelState_Closed

export interface ChannelState_Initiated {
    __kind: 'Initiated'
}

export interface ChannelState_Open {
    __kind: 'Open'
}

export interface ChannelState_Closed {
    __kind: 'Closed'
}

export type VersionedPayload = VersionedPayload_V0

export interface VersionedPayload_V0 {
    __kind: 'V0'
    value: Payload
}

export type DigestItem = DigestItem_PreRuntime | DigestItem_Consensus | DigestItem_Seal | DigestItem_Other | DigestItem_RuntimeEnvironmentUpdated

export interface DigestItem_PreRuntime {
    __kind: 'PreRuntime'
    value: [Uint8Array, Uint8Array]
}

export interface DigestItem_Consensus {
    __kind: 'Consensus'
    value: [Uint8Array, Uint8Array]
}

export interface DigestItem_Seal {
    __kind: 'Seal'
    value: [Uint8Array, Uint8Array]
}

export interface DigestItem_Other {
    __kind: 'Other'
    value: Uint8Array
}

export interface DigestItem_RuntimeEnvironmentUpdated {
    __kind: 'RuntimeEnvironmentUpdated'
}

export type Event = Event_System | Event_Subspace | Event_OffencesSubspace | Event_Rewards | Event_Balances | Event_TransactionFees | Event_TransactionPayment | Event_Utility | Event_Domains | Event_Vesting | Event_Messenger | Event_Transporter | Event_Sudo

export interface Event_System {
    __kind: 'System'
    value: SystemEvent
}

export interface Event_Subspace {
    __kind: 'Subspace'
    value: SubspaceEvent
}

export interface Event_OffencesSubspace {
    __kind: 'OffencesSubspace'
    value: OffencesSubspaceEvent
}

export interface Event_Rewards {
    __kind: 'Rewards'
    value: RewardsEvent
}

export interface Event_Balances {
    __kind: 'Balances'
    value: BalancesEvent
}

export interface Event_TransactionFees {
    __kind: 'TransactionFees'
    value: TransactionFeesEvent
}

export interface Event_TransactionPayment {
    __kind: 'TransactionPayment'
    value: TransactionPaymentEvent
}

export interface Event_Utility {
    __kind: 'Utility'
    value: UtilityEvent
}

export interface Event_Domains {
    __kind: 'Domains'
    value: DomainsEvent
}

export interface Event_Vesting {
    __kind: 'Vesting'
    value: VestingEvent
}

export interface Event_Messenger {
    __kind: 'Messenger'
    value: MessengerEvent
}

export interface Event_Transporter {
    __kind: 'Transporter'
    value: TransporterEvent
}

export interface Event_Sudo {
    __kind: 'Sudo'
    value: SudoEvent
}

export interface Type_85 {
    normal: number
    operational: number
    mandatory: number
}

export interface Type_81 {
    normal: WeightsPerClass
    operational: WeightsPerClass
    mandatory: WeightsPerClass
}

export type ArchivedBlockProgress = ArchivedBlockProgress_Complete | ArchivedBlockProgress_Partial

export interface ArchivedBlockProgress_Complete {
    __kind: 'Complete'
}

export interface ArchivedBlockProgress_Partial {
    __kind: 'Partial'
    value: number
}

export interface BundleHeader {
    proofOfElection: ProofOfElection
    receipt: ExecutionReceipt
    bundleSize: number
    estimatedBundleWeight: Weight
    bundleExtrinsicsRoot: Uint8Array
}

export interface StorageProof {
    trieNodes: Uint8Array[]
}

export type ExecutionPhase = ExecutionPhase_InitializeBlock | ExecutionPhase_ApplyExtrinsic | ExecutionPhase_FinalizeBlock

export interface ExecutionPhase_InitializeBlock {
    __kind: 'InitializeBlock'
}

export interface ExecutionPhase_ApplyExtrinsic {
    __kind: 'ApplyExtrinsic'
    extrinsicProof: StorageProof
    mismatch: ApplyExtrinsicMismatch
}

export interface ExecutionPhase_FinalizeBlock {
    __kind: 'FinalizeBlock'
    mismatch: FinalizeBlockMismatch
}

export interface ValidBundleDigest {
    bundleIndex: number
    bundleDigest: [(Uint8Array | undefined), ExtrinsicDigest][]
}

export type InvalidBundleType = InvalidBundleType_UndecodableTx | InvalidBundleType_OutOfRangeTx | InvalidBundleType_IllegalTx | InvalidBundleType_InvalidXDM | InvalidBundleType_InherentExtrinsic

export interface InvalidBundleType_UndecodableTx {
    __kind: 'UndecodableTx'
    value: number
}

export interface InvalidBundleType_OutOfRangeTx {
    __kind: 'OutOfRangeTx'
    value: number
}

export interface InvalidBundleType_IllegalTx {
    __kind: 'IllegalTx'
    value: number
}

export interface InvalidBundleType_InvalidXDM {
    __kind: 'InvalidXDM'
    value: number
}

export interface InvalidBundleType_InherentExtrinsic {
    __kind: 'InherentExtrinsic'
    value: number
}

export interface BlockInfo {
    blockNumber: number
    blockHash: Uint8Array
}

export type Endpoint = Endpoint_Id

export interface Endpoint_Id {
    __kind: 'Id'
    value: bigint
}

export interface Solution {
    publicKey: Uint8Array
    rewardAddress: Uint8Array
    sectorIndex: number
    historySize: bigint
    pieceOffset: number
    recordCommitment: Uint8Array
    recordWitness: Uint8Array
    chunk: Scalar
    chunkWitness: Uint8Array
    proofOfSpace: Uint8Array
}

export type DomainsHoldIdentifier = DomainsHoldIdentifier_Staking | DomainsHoldIdentifier_DomainInstantiation

export interface DomainsHoldIdentifier_Staking {
    __kind: 'Staking'
    value: StakingHoldIdentifier
}

export interface DomainsHoldIdentifier_DomainInstantiation {
    __kind: 'DomainInstantiation'
    value: number
}

export interface InboxedBundle {
    bundle: BundleValidity
    extrinsicsRoot: Uint8Array
}

export interface BlockFees {
    consensusStorageFee: bigint
    domainExecutionFee: bigint
}

export interface OperatorDeregisteredInfo {
    domainEpoch: [number, number]
    unlockAtConfirmedDomainBlockNumber: number
}

export type Payload = Payload_Protocol | Payload_Endpoint

export interface Payload_Protocol {
    __kind: 'Protocol'
    value: RequestResponse
}

export interface Payload_Endpoint {
    __kind: 'Endpoint'
    value: Type_294
}

/**
 * Event for the System pallet.
 */
export type SystemEvent = SystemEvent_ExtrinsicSuccess | SystemEvent_ExtrinsicFailed | SystemEvent_CodeUpdated | SystemEvent_NewAccount | SystemEvent_KilledAccount | SystemEvent_Remarked | SystemEvent_UpgradeAuthorized

/**
 * An extrinsic completed successfully.
 */
export interface SystemEvent_ExtrinsicSuccess {
    __kind: 'ExtrinsicSuccess'
    dispatchInfo: DispatchInfo
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
 * `:code` was updated.
 */
export interface SystemEvent_CodeUpdated {
    __kind: 'CodeUpdated'
}

/**
 * A new account was created.
 */
export interface SystemEvent_NewAccount {
    __kind: 'NewAccount'
    account: Uint8Array
}

/**
 * An account was reaped.
 */
export interface SystemEvent_KilledAccount {
    __kind: 'KilledAccount'
    account: Uint8Array
}

/**
 * On on-chain remark happened.
 */
export interface SystemEvent_Remarked {
    __kind: 'Remarked'
    sender: Uint8Array
    hash: Uint8Array
}

/**
 * An upgrade was authorized.
 */
export interface SystemEvent_UpgradeAuthorized {
    __kind: 'UpgradeAuthorized'
    codeHash: Uint8Array
    checkVersion: boolean
}

/**
 * Events type.
 */
export type SubspaceEvent = SubspaceEvent_SegmentHeaderStored | SubspaceEvent_FarmerVote

/**
 * Segment header was stored in blockchain history.
 */
export interface SubspaceEvent_SegmentHeaderStored {
    __kind: 'SegmentHeaderStored'
    segmentHeader: SegmentHeader
}

/**
 * Farmer vote.
 */
export interface SubspaceEvent_FarmerVote {
    __kind: 'FarmerVote'
    publicKey: Uint8Array
    rewardAddress: Uint8Array
    height: number
    parentHash: Uint8Array
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
    kind: Uint8Array
    timeslot: Uint8Array
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
    blockAuthor: Uint8Array
    reward: bigint
}

/**
 * Issued reward for the voter.
 */
export interface RewardsEvent_VoteReward {
    __kind: 'VoteReward'
    voter: Uint8Array
    reward: bigint
}

/**
 * The `Event` enum of this pallet
 */
export type BalancesEvent = BalancesEvent_Endowed | BalancesEvent_DustLost | BalancesEvent_Transfer | BalancesEvent_BalanceSet | BalancesEvent_Reserved | BalancesEvent_Unreserved | BalancesEvent_ReserveRepatriated | BalancesEvent_Deposit | BalancesEvent_Withdraw | BalancesEvent_Slashed | BalancesEvent_Minted | BalancesEvent_Burned | BalancesEvent_Suspended | BalancesEvent_Restored | BalancesEvent_Upgraded | BalancesEvent_Issued | BalancesEvent_Rescinded | BalancesEvent_Locked | BalancesEvent_Unlocked | BalancesEvent_Frozen | BalancesEvent_Thawed

/**
 * An account was created with some free balance.
 */
export interface BalancesEvent_Endowed {
    __kind: 'Endowed'
    account: Uint8Array
    freeBalance: bigint
}

/**
 * An account was removed whose balance was non-zero but below ExistentialDeposit,
 * resulting in an outright loss.
 */
export interface BalancesEvent_DustLost {
    __kind: 'DustLost'
    account: Uint8Array
    amount: bigint
}

/**
 * Transfer succeeded.
 */
export interface BalancesEvent_Transfer {
    __kind: 'Transfer'
    from: Uint8Array
    to: Uint8Array
    amount: bigint
}

/**
 * A balance was set by root.
 */
export interface BalancesEvent_BalanceSet {
    __kind: 'BalanceSet'
    who: Uint8Array
    free: bigint
}

/**
 * Some balance was reserved (moved from free to reserved).
 */
export interface BalancesEvent_Reserved {
    __kind: 'Reserved'
    who: Uint8Array
    amount: bigint
}

/**
 * Some balance was unreserved (moved from reserved to free).
 */
export interface BalancesEvent_Unreserved {
    __kind: 'Unreserved'
    who: Uint8Array
    amount: bigint
}

/**
 * Some balance was moved from the reserve of the first account to the second account.
 * Final argument indicates the destination balance type.
 */
export interface BalancesEvent_ReserveRepatriated {
    __kind: 'ReserveRepatriated'
    from: Uint8Array
    to: Uint8Array
    amount: bigint
    destinationStatus: BalanceStatus
}

/**
 * Some amount was deposited (e.g. for transaction fees).
 */
export interface BalancesEvent_Deposit {
    __kind: 'Deposit'
    who: Uint8Array
    amount: bigint
}

/**
 * Some amount was withdrawn from the account (e.g. for transaction fees).
 */
export interface BalancesEvent_Withdraw {
    __kind: 'Withdraw'
    who: Uint8Array
    amount: bigint
}

/**
 * Some amount was removed from the account (e.g. for misbehavior).
 */
export interface BalancesEvent_Slashed {
    __kind: 'Slashed'
    who: Uint8Array
    amount: bigint
}

/**
 * Some amount was minted into an account.
 */
export interface BalancesEvent_Minted {
    __kind: 'Minted'
    who: Uint8Array
    amount: bigint
}

/**
 * Some amount was burned from an account.
 */
export interface BalancesEvent_Burned {
    __kind: 'Burned'
    who: Uint8Array
    amount: bigint
}

/**
 * Some amount was suspended from an account (it can be restored later).
 */
export interface BalancesEvent_Suspended {
    __kind: 'Suspended'
    who: Uint8Array
    amount: bigint
}

/**
 * Some amount was restored into an account.
 */
export interface BalancesEvent_Restored {
    __kind: 'Restored'
    who: Uint8Array
    amount: bigint
}

/**
 * An account was upgraded.
 */
export interface BalancesEvent_Upgraded {
    __kind: 'Upgraded'
    who: Uint8Array
}

/**
 * Total issuance was increased by `amount`, creating a credit to be balanced.
 */
export interface BalancesEvent_Issued {
    __kind: 'Issued'
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
 * Some balance was locked.
 */
export interface BalancesEvent_Locked {
    __kind: 'Locked'
    who: Uint8Array
    amount: bigint
}

/**
 * Some balance was unlocked.
 */
export interface BalancesEvent_Unlocked {
    __kind: 'Unlocked'
    who: Uint8Array
    amount: bigint
}

/**
 * Some balance was frozen.
 */
export interface BalancesEvent_Frozen {
    __kind: 'Frozen'
    who: Uint8Array
    amount: bigint
}

/**
 * Some balance was thawed.
 */
export interface BalancesEvent_Thawed {
    __kind: 'Thawed'
    who: Uint8Array
    amount: bigint
}

/**
 * `pallet-transaction-fees` events
 */
export type TransactionFeesEvent = TransactionFeesEvent_BlockFees | TransactionFeesEvent_BurnedBlockFees

/**
 * Storage fees.
 */
export interface TransactionFeesEvent_BlockFees {
    __kind: 'BlockFees'
    /**
     * Block author that received the fees.
     */
    who: Uint8Array
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
 * The `Event` enum of this pallet
 */
export type TransactionPaymentEvent = TransactionPaymentEvent_TransactionFeePaid

/**
 * A transaction fee `actual_fee`, of which `tip` was added to the minimum inclusion fee,
 * has been paid by `who`.
 */
export interface TransactionPaymentEvent_TransactionFeePaid {
    __kind: 'TransactionFeePaid'
    who: Uint8Array
    actualFee: bigint
    tip: bigint
}

/**
 * The `Event` enum of this pallet
 */
export type UtilityEvent = UtilityEvent_BatchInterrupted | UtilityEvent_BatchCompleted | UtilityEvent_BatchCompletedWithErrors | UtilityEvent_ItemCompleted | UtilityEvent_ItemFailed | UtilityEvent_DispatchedAs

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

/**
 * A call was dispatched.
 */
export interface UtilityEvent_DispatchedAs {
    __kind: 'DispatchedAs'
    result: Type_48
}

/**
 * The `Event` enum of this pallet
 */
export type DomainsEvent = DomainsEvent_BundleStored | DomainsEvent_DomainRuntimeCreated | DomainsEvent_DomainRuntimeUpgradeScheduled | DomainsEvent_DomainRuntimeUpgraded | DomainsEvent_OperatorRegistered | DomainsEvent_OperatorNominated | DomainsEvent_DomainInstantiated | DomainsEvent_OperatorSwitchedDomain | DomainsEvent_OperatorDeregistered | DomainsEvent_OperatorUnlocked | DomainsEvent_WithdrewStake | DomainsEvent_FundsUnlocked | DomainsEvent_PreferredOperator | DomainsEvent_OperatorRewarded | DomainsEvent_OperatorTaxCollected | DomainsEvent_DomainEpochCompleted | DomainsEvent_ForceDomainEpochTransition | DomainsEvent_FraudProofProcessed | DomainsEvent_DomainOperatorAllowListUpdated | DomainsEvent_OperatorSlashed

/**
 * A domain bundle was included.
 */
export interface DomainsEvent_BundleStored {
    __kind: 'BundleStored'
    domainId: number
    bundleHash: Uint8Array
    bundleAuthor: bigint
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

export interface DomainsEvent_OperatorRegistered {
    __kind: 'OperatorRegistered'
    operatorId: bigint
    domainId: number
}

export interface DomainsEvent_OperatorNominated {
    __kind: 'OperatorNominated'
    operatorId: bigint
    nominatorId: Uint8Array
}

export interface DomainsEvent_DomainInstantiated {
    __kind: 'DomainInstantiated'
    domainId: number
}

export interface DomainsEvent_OperatorSwitchedDomain {
    __kind: 'OperatorSwitchedDomain'
    oldDomainId: number
    newDomainId: number
}

export interface DomainsEvent_OperatorDeregistered {
    __kind: 'OperatorDeregistered'
    operatorId: bigint
}

export interface DomainsEvent_OperatorUnlocked {
    __kind: 'OperatorUnlocked'
    operatorId: bigint
}

export interface DomainsEvent_WithdrewStake {
    __kind: 'WithdrewStake'
    operatorId: bigint
    nominatorId: Uint8Array
}

export interface DomainsEvent_FundsUnlocked {
    __kind: 'FundsUnlocked'
    operatorId: bigint
    nominatorId: Uint8Array
    amount: bigint
}

export interface DomainsEvent_PreferredOperator {
    __kind: 'PreferredOperator'
    operatorId: bigint
    nominatorId: Uint8Array
}

export interface DomainsEvent_OperatorRewarded {
    __kind: 'OperatorRewarded'
    operatorId: bigint
    reward: bigint
}

export interface DomainsEvent_OperatorTaxCollected {
    __kind: 'OperatorTaxCollected'
    operatorId: bigint
    tax: bigint
}

export interface DomainsEvent_DomainEpochCompleted {
    __kind: 'DomainEpochCompleted'
    domainId: number
    completedEpochIndex: number
}

export interface DomainsEvent_ForceDomainEpochTransition {
    __kind: 'ForceDomainEpochTransition'
    domainId: number
    completedEpochIndex: number
}

export interface DomainsEvent_FraudProofProcessed {
    __kind: 'FraudProofProcessed'
    domainId: number
    newHeadReceiptNumber: (number | undefined)
}

export interface DomainsEvent_DomainOperatorAllowListUpdated {
    __kind: 'DomainOperatorAllowListUpdated'
    domainId: number
}

export interface DomainsEvent_OperatorSlashed {
    __kind: 'OperatorSlashed'
    operatorId: bigint
    reason: SlashedReason
}

/**
 * The `Event` enum of this pallet
 */
export type VestingEvent = VestingEvent_VestingScheduleAdded | VestingEvent_Claimed | VestingEvent_VestingSchedulesUpdated

/**
 * Added new vesting schedule.
 */
export interface VestingEvent_VestingScheduleAdded {
    __kind: 'VestingScheduleAdded'
    from: Uint8Array
    to: Uint8Array
    vestingSchedule: VestingSchedule
}

/**
 * Claimed vesting.
 */
export interface VestingEvent_Claimed {
    __kind: 'Claimed'
    who: Uint8Array
    amount: bigint
}

/**
 * Updated vesting schedules.
 */
export interface VestingEvent_VestingSchedulesUpdated {
    __kind: 'VestingSchedulesUpdated'
    who: Uint8Array
}

/**
 * `pallet-messenger` events
 */
export type MessengerEvent = MessengerEvent_ChannelInitiated | MessengerEvent_ChannelClosed | MessengerEvent_ChannelOpen | MessengerEvent_OutboxMessage | MessengerEvent_OutboxMessageResponse | MessengerEvent_OutboxMessageResult | MessengerEvent_InboxMessage | MessengerEvent_InboxMessageResponse

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
 * Events emitted by pallet-transporter.
 */
export type TransporterEvent = TransporterEvent_OutgoingTransferInitiated | TransporterEvent_OutgoingTransferFailed | TransporterEvent_OutgoingTransferSuccessful | TransporterEvent_IncomingTransferSuccessful

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
 * The `Event` enum of this pallet
 */
export type SudoEvent = SudoEvent_Sudid | SudoEvent_KeyChanged | SudoEvent_KeyRemoved | SudoEvent_SudoAsDone

/**
 * A sudo call just took place.
 */
export interface SudoEvent_Sudid {
    __kind: 'Sudid'
    /**
     * The result of the call made by the sudo user.
     */
    sudoResult: Type_48
}

/**
 * The sudo key has been updated.
 */
export interface SudoEvent_KeyChanged {
    __kind: 'KeyChanged'
    /**
     * The old sudo key (if one was previously set).
     */
    old: (Uint8Array | undefined)
    /**
     * The new sudo key (if one was set).
     */
    new: Uint8Array
}

/**
 * The key was permanently removed.
 */
export interface SudoEvent_KeyRemoved {
    __kind: 'KeyRemoved'
}

/**
 * A [sudo_as](Pallet::sudo_as) call just took place.
 */
export interface SudoEvent_SudoAsDone {
    __kind: 'SudoAsDone'
    /**
     * The result of the call made by the sudo user.
     */
    sudoResult: Type_48
}

export interface WeightsPerClass {
    baseExtrinsic: Weight
    maxExtrinsic: (Weight | undefined)
    maxTotal: (Weight | undefined)
    reserved: (Weight | undefined)
}

export interface ProofOfElection {
    domainId: number
    slotNumber: bigint
    globalRandomness: Uint8Array
    vrfSignature: VrfSignature
    operatorId: bigint
    consensusBlockHash: Uint8Array
}

export type ApplyExtrinsicMismatch = ApplyExtrinsicMismatch_StateRoot | ApplyExtrinsicMismatch_Shorter

export interface ApplyExtrinsicMismatch_StateRoot {
    __kind: 'StateRoot'
    value: number
}

export interface ApplyExtrinsicMismatch_Shorter {
    __kind: 'Shorter'
}

export type FinalizeBlockMismatch = FinalizeBlockMismatch_StateRoot | FinalizeBlockMismatch_Longer

export interface FinalizeBlockMismatch_StateRoot {
    __kind: 'StateRoot'
}

export interface FinalizeBlockMismatch_Longer {
    __kind: 'Longer'
    value: number
}

export type ExtrinsicDigest = ExtrinsicDigest_Data | ExtrinsicDigest_Hash

export interface ExtrinsicDigest_Data {
    __kind: 'Data'
    value: Uint8Array
}

export interface ExtrinsicDigest_Hash {
    __kind: 'Hash'
    value: Uint8Array
}

export type StakingHoldIdentifier = StakingHoldIdentifier_Staked

export interface StakingHoldIdentifier_Staked {
    __kind: 'Staked'
    value: bigint
}

export type BundleValidity = BundleValidity_Invalid | BundleValidity_Valid

export interface BundleValidity_Invalid {
    __kind: 'Invalid'
    value: InvalidBundleType
}

export interface BundleValidity_Valid {
    __kind: 'Valid'
    value: Uint8Array
}

export type RequestResponse = RequestResponse_Request | RequestResponse_Response

export interface RequestResponse_Request {
    __kind: 'Request'
    value: ProtocolMessageRequest
}

export interface RequestResponse_Response {
    __kind: 'Response'
    value: Type_48
}

export type Type_294 = Type_294_Request | Type_294_Response

export interface Type_294_Request {
    __kind: 'Request'
    value: EndpointRequest
}

export interface Type_294_Response {
    __kind: 'Response'
    value: Result<Uint8Array, DispatchError>
}

export interface VrfSignature {
    preOutput: Uint8Array
    proof: Uint8Array
}

export type ProtocolMessageRequest = ProtocolMessageRequest_ChannelOpen | ProtocolMessageRequest_ChannelClose

export interface ProtocolMessageRequest_ChannelOpen {
    __kind: 'ChannelOpen'
    value: InitiateChannelParams
}

export interface ProtocolMessageRequest_ChannelClose {
    __kind: 'ChannelClose'
}

export interface EndpointRequest {
    srcEndpoint: Endpoint
    dstEndpoint: Endpoint
    payload: Uint8Array
}
