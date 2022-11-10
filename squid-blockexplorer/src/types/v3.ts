import type {Result} from './support'

export type BalanceStatus = BalanceStatus_Free | BalanceStatus_Reserved

export interface BalanceStatus_Free {
  __kind: 'Free'
}

export interface BalanceStatus_Reserved {
  __kind: 'Reserved'
}

export type RootBlock = RootBlock_V0

export interface RootBlock_V0 {
  __kind: 'V0'
  segmentIndex: bigint
  recordsRoot: Uint8Array
  prevRootBlockHash: Uint8Array
  lastArchivedBlock: LastArchivedBlock
}

export type DispatchError = DispatchError_Other | DispatchError_CannotLookup | DispatchError_BadOrigin | DispatchError_Module | DispatchError_ConsumerRemaining | DispatchError_NoProviders | DispatchError_TooManyConsumers | DispatchError_Token | DispatchError_Arithmetic | DispatchError_Transactional

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

export interface DispatchInfo {
  weight: bigint
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

export interface BundleEquivocationProof {
  offender: Uint8Array
  slot: bigint
  firstHeader: BundleHeader
  secondHeader: BundleHeader
}

export interface SignedExecutionReceipt {
  executionReceipt: ExecutionReceipt
  signature: Uint8Array
  signer: Uint8Array
}

export interface FraudProof {
  badSignedReceiptHash: Uint8Array
  parentNumber: number
  parentHash: Uint8Array
  preStateRoot: Uint8Array
  postStateRoot: Uint8Array
  proof: StorageProof
  executionPhase: ExecutionPhase
}

export interface SignedOpaqueBundle {
  opaqueBundle: OpaqueBundle
  signature: Uint8Array
  signer: Uint8Array
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

export type Call = Call_System | Call_Timestamp | Call_Subspace | Call_Balances | Call_Utility | Call_Feeds | Call_ObjectStore | Call_Executor | Call_Vesting | Call_Sudo

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

export interface Call_Executor {
  __kind: 'Executor'
  value: ExecutorCall
}

export interface Call_Vesting {
  __kind: 'Vesting'
  value: VestingCall
}

export interface Call_Sudo {
  __kind: 'Sudo'
  value: SudoCall
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
  miscFrozen: bigint
  feeFrozen: bigint
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

export type Releases = Releases_V1_0_0 | Releases_V2_0_0

export interface Releases_V1_0_0 {
  __kind: 'V1_0_0'
}

export interface Releases_V2_0_0 {
  __kind: 'V2_0_0'
}

export interface ExecutionReceipt {
  primaryNumber: number
  primaryHash: Uint8Array
  secondaryHash: Uint8Array
  trace: Uint8Array[]
  traceRoot: Uint8Array
}

export interface FeedConfig {
  active: boolean
  feedProcessorId: FeedProcessorKind
  owner: Uint8Array
}

export interface TotalObjectsAndSize {
  size: bigint
  count: bigint
}

export interface AuthoritySet {
  authorities: [Uint8Array, bigint][]
  setId: bigint
}

export interface OffenceDetails {
  offender: Uint8Array
}

export interface GlobalRandomnesses {
  current: Uint8Array
  next: (Uint8Array | undefined)
}

export interface SolutionRangeOverride {
  solutionRange: bigint
  votingSolutionRange: bigint
}

export interface VoteVerificationData {
  globalRandomness: Uint8Array
  solutionRange: bigint
  salt: Uint8Array
  recordSize: number
  recordedHistorySegmentSize: number
  maxPlotSize: bigint
  totalPieces: bigint
  currentSlot: bigint
  parentSlot: bigint
}

export interface Salts {
  current: Uint8Array
  next: (Uint8Array | undefined)
  switchNextBlock: boolean
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

export interface PerDispatchClass {
  normal: bigint
  operational: bigint
  mandatory: bigint
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

export type Type_128 = Type_128_V1Ancient | Type_128_V2

export interface Type_128_V1Ancient {
  __kind: 'V1Ancient'
}

export interface Type_128_V2 {
  __kind: 'V2'
}

export interface BlockLength {
  max: Type_69
}

export interface BlockWeights {
  baseBlock: bigint
  maxBlock: bigint
  perClass: Type_65
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
}

export interface LastArchivedBlock {
  number: number
  archivedProgress: ArchivedBlockProgress
}

export interface ModuleError {
  index: number
  error: Uint8Array
}

export type TokenError = TokenError_NoFunds | TokenError_WouldDie | TokenError_BelowMinimum | TokenError_CannotCreate | TokenError_UnknownAsset | TokenError_Frozen | TokenError_Unsupported

export interface TokenError_NoFunds {
  __kind: 'NoFunds'
}

export interface TokenError_WouldDie {
  __kind: 'WouldDie'
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

export interface BundleHeader {
  primaryHash: Uint8Array
  slotNumber: bigint
  extrinsicsRoot: Uint8Array
}

export interface StorageProof {
  trieNodes: Uint8Array[]
}

export type ExecutionPhase = ExecutionPhase_InitializeBlock | ExecutionPhase_ApplyExtrinsic | ExecutionPhase_FinalizeBlock

export interface ExecutionPhase_InitializeBlock {
  __kind: 'InitializeBlock'
  callData: Uint8Array
}

export interface ExecutionPhase_ApplyExtrinsic {
  __kind: 'ApplyExtrinsic'
  callData: Uint8Array
}

export interface ExecutionPhase_FinalizeBlock {
  __kind: 'FinalizeBlock'
}

export interface OpaqueBundle {
  header: BundleHeader
  opaqueExtrinsics: Uint8Array[]
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
}

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export type SystemCall = SystemCall_fill_block | SystemCall_remark | SystemCall_set_heap_pages | SystemCall_set_code | SystemCall_set_code_without_checks | SystemCall_set_storage | SystemCall_kill_storage | SystemCall_kill_prefix | SystemCall_remark_with_event

/**
 * A dispatch that will fill the block weight up to the given ratio.
 */
export interface SystemCall_fill_block {
  __kind: 'fill_block'
  ratio: number
}

/**
 * Make some on-chain remark.
 * 
 * # <weight>
 * - `O(1)`
 * # </weight>
 */
export interface SystemCall_remark {
  __kind: 'remark'
  remark: Uint8Array
}

/**
 * Set the number of pages in the WebAssembly environment's heap.
 */
export interface SystemCall_set_heap_pages {
  __kind: 'set_heap_pages'
  pages: bigint
}

/**
 * Set the new runtime code.
 * 
 * # <weight>
 * - `O(C + S)` where `C` length of `code` and `S` complexity of `can_set_code`
 * - 1 call to `can_set_code`: `O(S)` (calls `sp_io::misc::runtime_version` which is
 *   expensive).
 * - 1 storage write (codec `O(C)`).
 * - 1 digest item.
 * - 1 event.
 * The weight of this function is dependent on the runtime, but generally this is very
 * expensive. We will treat this as a full block.
 * # </weight>
 */
export interface SystemCall_set_code {
  __kind: 'set_code'
  code: Uint8Array
}

/**
 * Set the new runtime code without doing any checks of the given `code`.
 * 
 * # <weight>
 * - `O(C)` where `C` length of `code`
 * - 1 storage write (codec `O(C)`).
 * - 1 digest item.
 * - 1 event.
 * The weight of this function is dependent on the runtime. We will treat this as a full
 * block. # </weight>
 */
export interface SystemCall_set_code_without_checks {
  __kind: 'set_code_without_checks'
  code: Uint8Array
}

/**
 * Set some items of storage.
 */
export interface SystemCall_set_storage {
  __kind: 'set_storage'
  items: [Uint8Array, Uint8Array][]
}

/**
 * Kill some items from storage.
 */
export interface SystemCall_kill_storage {
  __kind: 'kill_storage'
  keys: Uint8Array[]
}

/**
 * Kill all storage items with a key that starts with the given prefix.
 * 
 * **NOTE:** We rely on the Root origin to provide us the number of subkeys under
 * the prefix we are removing to accurately calculate the weight of this function.
 */
export interface SystemCall_kill_prefix {
  __kind: 'kill_prefix'
  prefix: Uint8Array
  subkeys: number
}

/**
 * Make some on-chain remark and emit event.
 */
export interface SystemCall_remark_with_event {
  __kind: 'remark_with_event'
  remark: Uint8Array
}

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export type TimestampCall = TimestampCall_set

/**
 * Set the current time.
 * 
 * This call should be invoked exactly once per block. It will panic at the finalization
 * phase, if this call hasn't been invoked by that time.
 * 
 * The timestamp should be greater than the previous one by the amount specified by
 * `MinimumPeriod`.
 * 
 * The dispatch origin for this call must be `Inherent`.
 * 
 * # <weight>
 * - `O(1)` (Note that implementations of `OnTimestampSet` must also be `O(1)`)
 * - 1 storage read and 1 storage mutation (codec `O(1)`). (because of `DidUpdate::take` in
 *   `on_finalize`)
 * - 1 event handler `on_timestamp_set`. Must be `O(1)`.
 * # </weight>
 */
export interface TimestampCall_set {
  __kind: 'set'
  now: bigint
}

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export type SubspaceCall = SubspaceCall_report_equivocation | SubspaceCall_store_root_blocks | SubspaceCall_enable_solution_range_adjustment | SubspaceCall_vote | SubspaceCall_enable_rewards | SubspaceCall_enable_storage_access | SubspaceCall_enable_authoring_by_anyone

/**
 * Report farmer equivocation/misbehavior. This method will verify the equivocation proof.
 * If valid, the offence will be reported.
 * 
 * This extrinsic must be called unsigned and it is expected that only block authors will
 * call it (validated in `ValidateUnsigned`), as such if the block author is defined it
 * will be defined as the equivocation reporter.
 */
export interface SubspaceCall_report_equivocation {
  __kind: 'report_equivocation'
  equivocationProof: EquivocationProof
}

/**
 * Submit new root block to the blockchain. This is an inherent extrinsic and part of the
 * Subspace consensus logic.
 */
export interface SubspaceCall_store_root_blocks {
  __kind: 'store_root_blocks'
  rootBlocks: RootBlock[]
}

/**
 * Enable solution range adjustment after every era.
 * Note: No effect on the solution range for the current era
 */
export interface SubspaceCall_enable_solution_range_adjustment {
  __kind: 'enable_solution_range_adjustment'
  solutionRangeOverride: (bigint | undefined)
  votingSolutionRangeOverride: (bigint | undefined)
}

/**
 * Farmer vote, currently only used for extra rewards to farmers.
 */
export interface SubspaceCall_vote {
  __kind: 'vote'
  signedVote: SignedVote
}

/**
 * Enable rewards for blocks and votes at specified block height.
 */
export interface SubspaceCall_enable_rewards {
  __kind: 'enable_rewards'
  height: (number | undefined)
}

/**
 * Enable storage access for all users.
 */
export interface SubspaceCall_enable_storage_access {
  __kind: 'enable_storage_access'
}

/**
 * Enable storage access for all users.
 */
export interface SubspaceCall_enable_authoring_by_anyone {
  __kind: 'enable_authoring_by_anyone'
}

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export type BalancesCall = BalancesCall_transfer | BalancesCall_set_balance | BalancesCall_force_transfer | BalancesCall_transfer_keep_alive | BalancesCall_transfer_all | BalancesCall_force_unreserve

/**
 * Transfer some liquid free balance to another account.
 * 
 * `transfer` will set the `FreeBalance` of the sender and receiver.
 * If the sender's account is below the existential deposit as a result
 * of the transfer, the account will be reaped.
 * 
 * The dispatch origin for this call must be `Signed` by the transactor.
 * 
 * # <weight>
 * - Dependent on arguments but not critical, given proper implementations for input config
 *   types. See related functions below.
 * - It contains a limited number of reads and writes internally and no complex
 *   computation.
 * 
 * Related functions:
 * 
 *   - `ensure_can_withdraw` is always called internally but has a bounded complexity.
 *   - Transferring balances to accounts that did not exist before will cause
 *     `T::OnNewAccount::on_new_account` to be called.
 *   - Removing enough funds from an account will trigger `T::DustRemoval::on_unbalanced`.
 *   - `transfer_keep_alive` works the same way as `transfer`, but has an additional check
 *     that the transfer will not kill the origin account.
 * ---------------------------------
 * - Origin account is already in memory, so no DB operations for them.
 * # </weight>
 */
export interface BalancesCall_transfer {
  __kind: 'transfer'
  dest: MultiAddress
  value: bigint
}

/**
 * Set the balances of a given account.
 * 
 * This will alter `FreeBalance` and `ReservedBalance` in storage. it will
 * also alter the total issuance of the system (`TotalIssuance`) appropriately.
 * If the new free or reserved balance is below the existential deposit,
 * it will reset the account nonce (`frame_system::AccountNonce`).
 * 
 * The dispatch origin for this call is `root`.
 */
export interface BalancesCall_set_balance {
  __kind: 'set_balance'
  who: MultiAddress
  newFree: bigint
  newReserved: bigint
}

/**
 * Exactly as `transfer`, except the origin must be root and the source account may be
 * specified.
 * # <weight>
 * - Same as transfer, but additional read and write because the source account is not
 *   assumed to be in the overlay.
 * # </weight>
 */
export interface BalancesCall_force_transfer {
  __kind: 'force_transfer'
  source: MultiAddress
  dest: MultiAddress
  value: bigint
}

/**
 * Same as the [`transfer`] call, but with a check that the transfer will not kill the
 * origin account.
 * 
 * 99% of the time you want [`transfer`] instead.
 * 
 * [`transfer`]: struct.Pallet.html#method.transfer
 */
export interface BalancesCall_transfer_keep_alive {
  __kind: 'transfer_keep_alive'
  dest: MultiAddress
  value: bigint
}

/**
 * Transfer the entire transferable balance from the caller account.
 * 
 * NOTE: This function only attempts to transfer _transferable_ balances. This means that
 * any locked, reserved, or existential deposits (when `keep_alive` is `true`), will not be
 * transferred by this function. To ensure that this function results in a killed account,
 * you might need to prepare the account by removing any reference counters, storage
 * deposits, etc...
 * 
 * The dispatch origin of this call must be Signed.
 * 
 * - `dest`: The recipient of the transfer.
 * - `keep_alive`: A boolean to determine if the `transfer_all` operation should send all
 *   of the funds the account has, causing the sender account to be killed (false), or
 *   transfer everything except at least the existential deposit, which will guarantee to
 *   keep the sender account alive (true). # <weight>
 * - O(1). Just like transfer, but reading the user's transferable balance first.
 *   #</weight>
 */
export interface BalancesCall_transfer_all {
  __kind: 'transfer_all'
  dest: MultiAddress
  keepAlive: boolean
}

/**
 * Unreserve some balance from a user by force.
 * 
 * Can only be called by ROOT.
 */
export interface BalancesCall_force_unreserve {
  __kind: 'force_unreserve'
  who: MultiAddress
  amount: bigint
}

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export type UtilityCall = UtilityCall_batch | UtilityCall_as_derivative | UtilityCall_batch_all | UtilityCall_dispatch_as | UtilityCall_force_batch

/**
 * Send a batch of dispatch calls.
 * 
 * May be called from any origin.
 * 
 * - `calls`: The calls to be dispatched from the same origin. The number of call must not
 *   exceed the constant: `batched_calls_limit` (available in constant metadata).
 * 
 * If origin is root then call are dispatch without checking origin filter. (This includes
 * bypassing `frame_system::Config::BaseCallFilter`).
 * 
 * # <weight>
 * - Complexity: O(C) where C is the number of calls to be batched.
 * # </weight>
 * 
 * This will return `Ok` in all circumstances. To determine the success of the batch, an
 * event is deposited. If a call failed and the batch was interrupted, then the
 * `BatchInterrupted` event is deposited, along with the number of successful calls made
 * and the error of the failed call. If all were successful, then the `BatchCompleted`
 * event is deposited.
 */
export interface UtilityCall_batch {
  __kind: 'batch'
  calls: Call[]
}

/**
 * Send a call through an indexed pseudonym of the sender.
 * 
 * Filter from origin are passed along. The call will be dispatched with an origin which
 * use the same filter as the origin of this call.
 * 
 * NOTE: If you need to ensure that any account-based filtering is not honored (i.e.
 * because you expect `proxy` to have been used prior in the call stack and you do not want
 * the call restrictions to apply to any sub-accounts), then use `as_multi_threshold_1`
 * in the Multisig pallet instead.
 * 
 * NOTE: Prior to version *12, this was called `as_limited_sub`.
 * 
 * The dispatch origin for this call must be _Signed_.
 */
export interface UtilityCall_as_derivative {
  __kind: 'as_derivative'
  index: number
  call: Call
}

/**
 * Send a batch of dispatch calls and atomically execute them.
 * The whole transaction will rollback and fail if any of the calls failed.
 * 
 * May be called from any origin.
 * 
 * - `calls`: The calls to be dispatched from the same origin. The number of call must not
 *   exceed the constant: `batched_calls_limit` (available in constant metadata).
 * 
 * If origin is root then call are dispatch without checking origin filter. (This includes
 * bypassing `frame_system::Config::BaseCallFilter`).
 * 
 * # <weight>
 * - Complexity: O(C) where C is the number of calls to be batched.
 * # </weight>
 */
export interface UtilityCall_batch_all {
  __kind: 'batch_all'
  calls: Call[]
}

/**
 * Dispatches a function call with a provided origin.
 * 
 * The dispatch origin for this call must be _Root_.
 * 
 * # <weight>
 * - O(1).
 * - Limited storage reads.
 * - One DB write (event).
 * - Weight of derivative `call` execution + T::WeightInfo::dispatch_as().
 * # </weight>
 */
export interface UtilityCall_dispatch_as {
  __kind: 'dispatch_as'
  asOrigin: OriginCaller
  call: Call
}

/**
 * Send a batch of dispatch calls.
 * Unlike `batch`, it allows errors and won't interrupt.
 * 
 * May be called from any origin.
 * 
 * - `calls`: The calls to be dispatched from the same origin. The number of call must not
 *   exceed the constant: `batched_calls_limit` (available in constant metadata).
 * 
 * If origin is root then call are dispatch without checking origin filter. (This includes
 * bypassing `frame_system::Config::BaseCallFilter`).
 * 
 * # <weight>
 * - Complexity: O(C) where C is the number of calls to be batched.
 * # </weight>
 */
export interface UtilityCall_force_batch {
  __kind: 'force_batch'
  calls: Call[]
}

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export type FeedsCall = FeedsCall_create | FeedsCall_update | FeedsCall_put | FeedsCall_close | FeedsCall_transfer

/**
 * Create a new feed
 */
export interface FeedsCall_create {
  __kind: 'create'
  feedProcessorId: FeedProcessorKind
  initData: (Uint8Array | undefined)
}

/**
 * Updates the feed with init data provided.
 */
export interface FeedsCall_update {
  __kind: 'update'
  feedId: bigint
  feedProcessorId: FeedProcessorKind
  initData: (Uint8Array | undefined)
}

/**
 * Put a new object into a feed
 */
export interface FeedsCall_put {
  __kind: 'put'
  feedId: bigint
  object: Uint8Array
}

/**
 * Closes the feed and stops accepting new feed.
 */
export interface FeedsCall_close {
  __kind: 'close'
  feedId: bigint
}

/**
 * Transfers feed from current owner to new owner
 */
export interface FeedsCall_transfer {
  __kind: 'transfer'
  feedId: bigint
  newOwner: MultiAddress
}

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export type ObjectStoreCall = ObjectStoreCall_put

/**
 * Put a new object into a feed
 */
export interface ObjectStoreCall_put {
  __kind: 'put'
  object: Uint8Array
}

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export type ExecutorCall = ExecutorCall_submit_execution_receipt | ExecutorCall_submit_transaction_bundle | ExecutorCall_submit_fraud_proof | ExecutorCall_submit_bundle_equivocation_proof | ExecutorCall_submit_invalid_transaction_proof

export interface ExecutorCall_submit_execution_receipt {
  __kind: 'submit_execution_receipt'
  signedExecutionReceipt: SignedExecutionReceipt
}

export interface ExecutorCall_submit_transaction_bundle {
  __kind: 'submit_transaction_bundle'
  signedOpaqueBundle: SignedOpaqueBundle
}

export interface ExecutorCall_submit_fraud_proof {
  __kind: 'submit_fraud_proof'
  fraudProof: FraudProof
}

export interface ExecutorCall_submit_bundle_equivocation_proof {
  __kind: 'submit_bundle_equivocation_proof'
  bundleEquivocationProof: BundleEquivocationProof
}

export interface ExecutorCall_submit_invalid_transaction_proof {
  __kind: 'submit_invalid_transaction_proof'
}

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export type VestingCall = VestingCall_claim | VestingCall_vested_transfer | VestingCall_update_vesting_schedules | VestingCall_claim_for

export interface VestingCall_claim {
  __kind: 'claim'
}

export interface VestingCall_vested_transfer {
  __kind: 'vested_transfer'
  dest: MultiAddress
  schedule: VestingSchedule
}

export interface VestingCall_update_vesting_schedules {
  __kind: 'update_vesting_schedules'
  who: MultiAddress
  vestingSchedules: VestingSchedule[]
}

export interface VestingCall_claim_for {
  __kind: 'claim_for'
  dest: MultiAddress
}

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export type SudoCall = SudoCall_sudo | SudoCall_sudo_unchecked_weight | SudoCall_set_key | SudoCall_sudo_as

/**
 * Authenticates the sudo key and dispatches a function call with `Root` origin.
 * 
 * The dispatch origin for this call must be _Signed_.
 * 
 * # <weight>
 * - O(1).
 * - Limited storage reads.
 * - One DB write (event).
 * - Weight of derivative `call` execution + 10,000.
 * # </weight>
 */
export interface SudoCall_sudo {
  __kind: 'sudo'
  call: Call
}

/**
 * Authenticates the sudo key and dispatches a function call with `Root` origin.
 * This function does not check the weight of the call, and instead allows the
 * Sudo user to specify the weight of the call.
 * 
 * The dispatch origin for this call must be _Signed_.
 * 
 * # <weight>
 * - O(1).
 * - The weight of this call is defined by the caller.
 * # </weight>
 */
export interface SudoCall_sudo_unchecked_weight {
  __kind: 'sudo_unchecked_weight'
  call: Call
  weight: bigint
}

/**
 * Authenticates the current sudo key and sets the given AccountId (`new`) as the new sudo
 * key.
 * 
 * The dispatch origin for this call must be _Signed_.
 * 
 * # <weight>
 * - O(1).
 * - Limited storage reads.
 * - One DB change.
 * # </weight>
 */
export interface SudoCall_set_key {
  __kind: 'set_key'
  new: MultiAddress
}

/**
 * Authenticates the sudo key and dispatches a function call with `Signed` origin from
 * a given account.
 * 
 * The dispatch origin for this call must be _Signed_.
 * 
 * # <weight>
 * - O(1).
 * - Limited storage reads.
 * - One DB write (event).
 * - Weight of derivative `call` execution + 10,000.
 * # </weight>
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

export type Event = Event_System | Event_Subspace | Event_OffencesSubspace | Event_Rewards | Event_Balances | Event_TransactionFees | Event_TransactionPayment | Event_Utility | Event_Feeds | Event_ObjectStore | Event_Executor | Event_Vesting | Event_Sudo

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

export interface Event_Feeds {
  __kind: 'Feeds'
  value: FeedsEvent
}

export interface Event_ObjectStore {
  __kind: 'ObjectStore'
  value: ObjectStoreEvent
}

export interface Event_Executor {
  __kind: 'Executor'
  value: ExecutorEvent
}

export interface Event_Vesting {
  __kind: 'Vesting'
  value: VestingEvent
}

export interface Event_Sudo {
  __kind: 'Sudo'
  value: SudoEvent
}

export interface Type_69 {
  normal: number
  operational: number
  mandatory: number
}

export interface Type_65 {
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

export interface Solution {
  publicKey: Uint8Array
  rewardAddress: Uint8Array
  pieceIndex: bigint
  encoding: Uint8Array
  tagSignature: TagSignature
  localChallenge: LocalChallenge
  tag: Uint8Array
}

/**
 * Event for the System pallet.
 */
export type SystemEvent = SystemEvent_ExtrinsicSuccess | SystemEvent_ExtrinsicFailed | SystemEvent_CodeUpdated | SystemEvent_NewAccount | SystemEvent_KilledAccount | SystemEvent_Remarked

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
 * Events type.
 */
export type SubspaceEvent = SubspaceEvent_RootBlockStored | SubspaceEvent_FarmerVote

/**
 * Root block was stored in blockchain history.
 */
export interface SubspaceEvent_RootBlockStored {
  __kind: 'RootBlockStored'
  rootBlock: RootBlock
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
 * 
			The [event](https://docs.substrate.io/main-docs/build/events-errors/) emitted
			by this pallet.
			
 */
export type BalancesEvent = BalancesEvent_Endowed | BalancesEvent_DustLost | BalancesEvent_Transfer | BalancesEvent_BalanceSet | BalancesEvent_Reserved | BalancesEvent_Unreserved | BalancesEvent_ReserveRepatriated | BalancesEvent_Deposit | BalancesEvent_Withdraw | BalancesEvent_Slashed

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
  reserved: bigint
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
 * `pallet-transaction-fees` events
 */
export type TransactionFeesEvent = TransactionFeesEvent_StorageFeesEscrowChange | TransactionFeesEvent_StorageFeesReward | TransactionFeesEvent_ComputeFeesReward | TransactionFeesEvent_TipsReward

/**
 * Storage fees escrow change.
 */
export interface TransactionFeesEvent_StorageFeesEscrowChange {
  __kind: 'StorageFeesEscrowChange'
  /**
   * State of storage fees escrow before block execution.
   */
  before: bigint
  /**
   * State of storage fees escrow after block execution.
   */
  after: bigint
}

/**
 * Storage fees.
 */
export interface TransactionFeesEvent_StorageFeesReward {
  __kind: 'StorageFeesReward'
  /**
   * Receiver of the storage fees.
   */
  who: Uint8Array
  /**
   * Amount of collected storage fees.
   */
  amount: bigint
}

/**
 * Compute fees.
 */
export interface TransactionFeesEvent_ComputeFeesReward {
  __kind: 'ComputeFeesReward'
  /**
   * Receiver of the compute fees.
   */
  who: Uint8Array
  /**
   * Amount of collected compute fees.
   */
  amount: bigint
}

/**
 * Tips.
 */
export interface TransactionFeesEvent_TipsReward {
  __kind: 'TipsReward'
  /**
   * Receiver of the tip.
   */
  who: Uint8Array
  /**
   * Amount of collected tips.
   */
  amount: bigint
}

/**
 * 
			The [event](https://docs.substrate.io/main-docs/build/events-errors/) emitted
			by this pallet.
			
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
 * 
			The [event](https://docs.substrate.io/main-docs/build/events-errors/) emitted
			by this pallet.
			
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
  result: Result<null, DispatchError>
}

/**
 * `pallet-feeds` events
 */
export type FeedsEvent = FeedsEvent_ObjectSubmitted | FeedsEvent_FeedCreated | FeedsEvent_FeedUpdated | FeedsEvent_FeedClosed | FeedsEvent_FeedDeleted | FeedsEvent_OwnershipTransferred

/**
 * New object was added.
 */
export interface FeedsEvent_ObjectSubmitted {
  __kind: 'ObjectSubmitted'
  feedId: bigint
  who: Uint8Array
  metadata: Uint8Array
  objectSize: bigint
}

/**
 * New feed was created.
 */
export interface FeedsEvent_FeedCreated {
  __kind: 'FeedCreated'
  feedId: bigint
  who: Uint8Array
}

/**
 * An existing feed was updated.
 */
export interface FeedsEvent_FeedUpdated {
  __kind: 'FeedUpdated'
  feedId: bigint
  who: Uint8Array
}

/**
 * Feed was closed.
 */
export interface FeedsEvent_FeedClosed {
  __kind: 'FeedClosed'
  feedId: bigint
  who: Uint8Array
}

/**
 * Feed was deleted.
 */
export interface FeedsEvent_FeedDeleted {
  __kind: 'FeedDeleted'
  feedId: bigint
  who: Uint8Array
}

/**
 * feed ownership transferred
 */
export interface FeedsEvent_OwnershipTransferred {
  __kind: 'OwnershipTransferred'
  feedId: bigint
  oldOwner: Uint8Array
  newOwner: Uint8Array
}

/**
 * `pallet-object-store` events
 */
export type ObjectStoreEvent = ObjectStoreEvent_ObjectSubmitted

/**
 * New object was added.
 */
export interface ObjectStoreEvent_ObjectSubmitted {
  __kind: 'ObjectSubmitted'
  who: Uint8Array
  objectId: Uint8Array
  objectSize: number
}

/**
 * 
			The [event](https://docs.substrate.io/main-docs/build/events-errors/) emitted
			by this pallet.
			
 */
export type ExecutorEvent = ExecutorEvent_NewExecutionReceipt | ExecutorEvent_TransactionBundleStored | ExecutorEvent_FraudProofProcessed | ExecutorEvent_BundleEquivocationProofProcessed | ExecutorEvent_InvalidTransactionProofProcessed

/**
 * A new execution receipt was backed.
 */
export interface ExecutorEvent_NewExecutionReceipt {
  __kind: 'NewExecutionReceipt'
  primaryNumber: number
  primaryHash: Uint8Array
}

/**
 * A transaction bundle was included.
 */
export interface ExecutorEvent_TransactionBundleStored {
  __kind: 'TransactionBundleStored'
  bundleHash: Uint8Array
}

/**
 * A fraud proof was processed.
 */
export interface ExecutorEvent_FraudProofProcessed {
  __kind: 'FraudProofProcessed'
}

/**
 * A bundle equivocation proof was processed.
 */
export interface ExecutorEvent_BundleEquivocationProofProcessed {
  __kind: 'BundleEquivocationProofProcessed'
}

/**
 * An invalid transaction proof was processed.
 */
export interface ExecutorEvent_InvalidTransactionProofProcessed {
  __kind: 'InvalidTransactionProofProcessed'
}

/**
 * 
			The [event](https://docs.substrate.io/main-docs/build/events-errors/) emitted
			by this pallet.
			
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
 * 
			The [event](https://docs.substrate.io/main-docs/build/events-errors/) emitted
			by this pallet.
			
 */
export type SudoEvent = SudoEvent_Sudid | SudoEvent_KeyChanged | SudoEvent_SudoAsDone

/**
 * A sudo just took place. \[result\]
 */
export interface SudoEvent_Sudid {
  __kind: 'Sudid'
  sudoResult: Result<null, DispatchError>
}

/**
 * The \[sudoer\] just switched identity; the old key is supplied if one existed.
 */
export interface SudoEvent_KeyChanged {
  __kind: 'KeyChanged'
  oldSudoer: (Uint8Array | undefined)
}

/**
 * A sudo just took place. \[result\]
 */
export interface SudoEvent_SudoAsDone {
  __kind: 'SudoAsDone'
  sudoResult: Result<null, DispatchError>
}

export interface WeightsPerClass {
  baseExtrinsic: bigint
  maxExtrinsic: (bigint | undefined)
  maxTotal: (bigint | undefined)
  reserved: (bigint | undefined)
}

export interface TagSignature {
  output: Uint8Array
  proof: Uint8Array
}

export interface LocalChallenge {
  output: Uint8Array
  proof: Uint8Array
}
