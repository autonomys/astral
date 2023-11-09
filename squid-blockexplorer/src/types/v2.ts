import type {Result, Option} from './support'

export interface DomainConfig {
    domainName: Uint8Array
    runtimeId: number
    maxBlockSize: number
    maxBlockWeight: Weight
    bundleSlotProbability: [bigint, bigint]
    targetBundlesPerBlock: number
}

export type Call = Call_System | Call_Timestamp | Call_Subspace | Call_Balances | Call_Utility | Call_Feeds | Call_ObjectStore | Call_Domains | Call_Vesting | Call_Sudo

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

export interface Call_Feeds {
    __kind: 'Feeds'
    value: FeedsCall
}

export interface Call_ObjectStore {
    __kind: 'ObjectStore'
    value: ObjectStoreCall
}

export interface Call_Domains {
    __kind: 'Domains'
    value: DomainsCall
}

export interface Call_Vesting {
    __kind: 'Vesting'
    value: VestingCall
}

export interface Call_Sudo {
    __kind: 'Sudo'
    value: SudoCall
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

export interface Weight {
    refTime: bigint
    proofSize: bigint
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

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type SystemCall = SystemCall_remark | SystemCall_set_heap_pages | SystemCall_set_code | SystemCall_set_code_without_checks | SystemCall_set_storage | SystemCall_kill_storage | SystemCall_kill_prefix | SystemCall_remark_with_event

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
export type SubspaceCall = SubspaceCall_report_equivocation | SubspaceCall_store_segment_headers | SubspaceCall_enable_solution_range_adjustment | SubspaceCall_vote | SubspaceCall_enable_rewards | SubspaceCall_enable_storage_access | SubspaceCall_enable_authoring_by_anyone

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
 * See [`Pallet::enable_rewards`].
 */
export interface SubspaceCall_enable_rewards {
    __kind: 'enable_rewards'
    height: (number | undefined)
}

/**
 * See [`Pallet::enable_storage_access`].
 */
export interface SubspaceCall_enable_storage_access {
    __kind: 'enable_storage_access'
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
export type BalancesCall = BalancesCall_transfer_allow_death | BalancesCall_set_balance_deprecated | BalancesCall_force_transfer | BalancesCall_transfer_keep_alive | BalancesCall_transfer_all | BalancesCall_force_unreserve | BalancesCall_upgrade_accounts | BalancesCall_transfer | BalancesCall_force_set_balance

/**
 * See [`Pallet::transfer_allow_death`].
 */
export interface BalancesCall_transfer_allow_death {
    __kind: 'transfer_allow_death'
    dest: MultiAddress
    value: bigint
}

/**
 * See [`Pallet::set_balance_deprecated`].
 */
export interface BalancesCall_set_balance_deprecated {
    __kind: 'set_balance_deprecated'
    who: MultiAddress
    newFree: bigint
    oldReserved: bigint
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
 * See [`Pallet::transfer`].
 */
export interface BalancesCall_transfer {
    __kind: 'transfer'
    dest: MultiAddress
    value: bigint
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
export type FeedsCall = FeedsCall_create | FeedsCall_update | FeedsCall_put | FeedsCall_close | FeedsCall_transfer

/**
 * See [`Pallet::create`].
 */
export interface FeedsCall_create {
    __kind: 'create'
    feedProcessorId: FeedProcessorKind
    initData: (Uint8Array | undefined)
}

/**
 * See [`Pallet::update`].
 */
export interface FeedsCall_update {
    __kind: 'update'
    feedId: bigint
    feedProcessorId: FeedProcessorKind
    initData: (Uint8Array | undefined)
}

/**
 * See [`Pallet::put`].
 */
export interface FeedsCall_put {
    __kind: 'put'
    feedId: bigint
    object: Uint8Array
}

/**
 * See [`Pallet::close`].
 */
export interface FeedsCall_close {
    __kind: 'close'
    feedId: bigint
}

/**
 * See [`Pallet::transfer`].
 */
export interface FeedsCall_transfer {
    __kind: 'transfer'
    feedId: bigint
    newOwner: MultiAddress
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type ObjectStoreCall = ObjectStoreCall_put

/**
 * See [`Pallet::put`].
 */
export interface ObjectStoreCall_put {
    __kind: 'put'
    object: Uint8Array
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type DomainsCall = DomainsCall_submit_bundle | DomainsCall_submit_fraud_proof | DomainsCall_register_domain_runtime | DomainsCall_upgrade_domain_runtime | DomainsCall_register_operator | DomainsCall_nominate_operator | DomainsCall_instantiate_domain | DomainsCall_switch_domain | DomainsCall_deregister_operator | DomainsCall_withdraw_stake | DomainsCall_auto_stake_block_rewards

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
    runtimeName: Uint8Array
    runtimeType: RuntimeType
    code: Uint8Array
}

/**
 * See [`Pallet::upgrade_domain_runtime`].
 */
export interface DomainsCall_upgrade_domain_runtime {
    __kind: 'upgrade_domain_runtime'
    runtimeId: number
    code: Uint8Array
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
    rawGenesis: Uint8Array
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
    withdraw: Withdraw
}

/**
 * See [`Pallet::auto_stake_block_rewards`].
 */
export interface DomainsCall_auto_stake_block_rewards {
    __kind: 'auto_stake_block_rewards'
    operatorId: bigint
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
export type SudoCall = SudoCall_sudo | SudoCall_sudo_unchecked_weight | SudoCall_set_key | SudoCall_sudo_as

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

export interface EquivocationProof {
    offender: Uint8Array
    slot: bigint
    firstHeader: Header
    secondHeader: Header
}

export type SegmentHeader = SegmentHeader_V0

export interface SegmentHeader_V0 {
    __kind: 'V0'
    segmentIndex: bigint
    segmentCommitment: Commitment
    prevSegmentHeaderHash: Uint8Array
    lastArchivedBlock: LastArchivedBlock
}

export interface SignedVote {
    vote: Vote
    signature: Uint8Array
}

export type FeedProcessorKind = FeedProcessorKind_ContentAddressable | FeedProcessorKind_PolkadotLike | FeedProcessorKind_ParachainLike

export interface FeedProcessorKind_ContentAddressable {
    __kind: 'ContentAddressable'
}

export interface FeedProcessorKind_PolkadotLike {
    __kind: 'PolkadotLike'
}

export interface FeedProcessorKind_ParachainLike {
    __kind: 'ParachainLike'
}

export interface Bundle {
    sealedHeader: SealedBundleHeader
    extrinsics: Uint8Array[]
}

export type FraudProof = FraudProof_InvalidStateTransition | FraudProof_InvalidTransaction | FraudProof_BundleEquivocation | FraudProof_ImproperTransactionSortition

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

export type RuntimeType = RuntimeType_Evm

export interface RuntimeType_Evm {
    __kind: 'Evm'
}

export interface OperatorConfig {
    signingKey: Uint8Array
    minimumNominatorStake: bigint
    nominationTax: number
}

export type Withdraw = Withdraw_All | Withdraw_Some

export interface Withdraw_All {
    __kind: 'All'
}

export interface Withdraw_Some {
    __kind: 'Some'
    value: bigint
}

export interface VestingSchedule {
    start: number
    period: number
    periodCount: number
    perPeriod: bigint
}

export interface Header {
    parentHash: Uint8Array
    number: number
    stateRoot: Uint8Array
    extrinsicsRoot: Uint8Array
    digest: Digest
}

export interface Commitment {
    inner: Uint8Array
}

export interface LastArchivedBlock {
    number: number
    archivedProgress: ArchivedBlockProgress
}

export type Vote = Vote_V0

export interface Vote_V0 {
    __kind: 'V0'
    height: number
    parentHash: Uint8Array
    slot: bigint
    solution: Solution
}

export interface SealedBundleHeader {
    header: BundleHeader
    signature: Uint8Array
}

export interface InvalidStateTransitionProof {
    domainId: number
    badReceiptHash: Uint8Array
    parentNumber: number
    consensusParentHash: Uint8Array
    preStateRoot: Uint8Array
    postStateRoot: Uint8Array
    proof: StorageProof
    executionPhase: ExecutionPhase
}

export interface InvalidTransactionProof {
    domainId: number
    blockNumber: number
    domainBlockHash: Uint8Array
    invalidExtrinsic: Uint8Array
    storageProof: StorageProof
}

export interface BundleEquivocationProof {
    domainId: number
    offender: Uint8Array
    slot: bigint
    firstHeader: SealedBundleHeader
    secondHeader: SealedBundleHeader
}

export interface ImproperTransactionSortitionProof {
    domainId: number
}

export interface Digest {
    logs: DigestItem[]
}

export type ArchivedBlockProgress = ArchivedBlockProgress_Complete | ArchivedBlockProgress_Partial

export interface ArchivedBlockProgress_Complete {
    __kind: 'Complete'
}

export interface ArchivedBlockProgress_Partial {
    __kind: 'Partial'
    value: number
}

export interface Solution {
    publicKey: Uint8Array
    rewardAddress: Uint8Array
    sectorIndex: number
    historySize: bigint
    pieceOffset: number
    recordCommitment: Commitment
    recordWitness: Witness
    chunk: Scalar
    chunkWitness: Witness
    auditChunkOffset: number
    proofOfSpace: Uint8Array
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
    domainParentHash: Uint8Array
}

export interface ExecutionPhase_ApplyExtrinsic {
    __kind: 'ApplyExtrinsic'
    value: number
}

export interface ExecutionPhase_FinalizeBlock {
    __kind: 'FinalizeBlock'
    totalExtrinsics: number
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

export interface Witness {
    inner: Uint8Array
}

export interface Scalar {
    inner: Uint8Array
}

export interface ProofOfElection {
    domainId: number
    slotNumber: bigint
    globalRandomness: Uint8Array
    vrfSignature: VrfSignature
    operatorId: bigint
}

export interface ExecutionReceipt {
    domainBlockNumber: number
    domainBlockHash: Uint8Array
    parentDomainBlockReceiptHash: Uint8Array
    consensusBlockNumber: number
    consensusBlockHash: Uint8Array
    invalidBundles: InvalidBundle[]
    blockExtrinsicsRoots: Uint8Array[]
    finalStateRoot: Uint8Array
    executionTrace: Uint8Array[]
    executionTraceRoot: Uint8Array
    totalRewards: bigint
}

export interface VrfSignature {
    output: Uint8Array
    proof: Uint8Array
}

export interface InvalidBundle {
    bundleIndex: number
    invalidBundleType: InvalidBundleType
}

export type InvalidBundleType = InvalidBundleType_UndecodableTx | InvalidBundleType_OutOfRangeTx | InvalidBundleType_IllegalTx | InvalidBundleType_InvalidReceipt

export interface InvalidBundleType_UndecodableTx {
    __kind: 'UndecodableTx'
}

export interface InvalidBundleType_OutOfRangeTx {
    __kind: 'OutOfRangeTx'
}

export interface InvalidBundleType_IllegalTx {
    __kind: 'IllegalTx'
}

export interface InvalidBundleType_InvalidReceipt {
    __kind: 'InvalidReceipt'
    value: InvalidReceipt
}

export type InvalidReceipt = InvalidReceipt_InvalidBundles

export interface InvalidReceipt_InvalidBundles {
    __kind: 'InvalidBundles'
}
