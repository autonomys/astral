import type {Result, Option} from './support'

export type Type_47 = Type_47_Ok | Type_47_Err

export interface Type_47_Ok {
    __kind: 'Ok'
}

export interface Type_47_Err {
    __kind: 'Err'
    value: DispatchError
}

export type DispatchError = DispatchError_Other | DispatchError_CannotLookup | DispatchError_BadOrigin | DispatchError_Module | DispatchError_ConsumerRemaining | DispatchError_NoProviders | DispatchError_TooManyConsumers | DispatchError_Token | DispatchError_Arithmetic | DispatchError_Transactional | DispatchError_Exhausted | DispatchError_Corruption | DispatchError_Unavailable

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

export interface DispatchInfo {
    weight: Weight
    class: DispatchClass
    paysFee: Pays
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

export interface AccountData {
    free: bigint
    reserved: bigint
    frozen: bigint
    flags: bigint
}

export interface IdAmount {
    amount: bigint
}

export interface AccountInfo {
    nonce: number
    consumers: number
    providers: number
    sufficients: number
    data: AccountData
}

export interface EventRecord {
    phase: Phase
    event: Event
    topics: Uint8Array[]
}

export interface ModuleError {
    index: number
    error: Uint8Array
}

export type TokenError = TokenError_FundsUnavailable | TokenError_OnlyProvider | TokenError_BelowMinimum | TokenError_CannotCreate | TokenError_UnknownAsset | TokenError_Frozen | TokenError_Unsupported | TokenError_CannotCreateHold | TokenError_NotExpendable

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

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export type SystemCall = SystemCall_remark | SystemCall_set_heap_pages | SystemCall_set_code | SystemCall_set_code_without_checks | SystemCall_set_storage | SystemCall_kill_storage | SystemCall_kill_prefix | SystemCall_remark_with_event

/**
 * Make some on-chain remark.
 * 
 * ## Complexity
 * - `O(1)`
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
 * ## Complexity
 * - `O(C + S)` where `C` length of `code` and `S` complexity of `can_set_code`
 */
export interface SystemCall_set_code {
    __kind: 'set_code'
    code: Uint8Array
}

/**
 * Set the new runtime code without doing any checks of the given `code`.
 * 
 * ## Complexity
 * - `O(C)` where `C` length of `code`
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
 * ## Complexity
 * - `O(1)` (Note that implementations of `OnTimestampSet` must also be `O(1)`)
 * - 1 storage read and 1 storage mutation (codec `O(1)`). (because of `DidUpdate::take` in
 *   `on_finalize`)
 * - 1 event handler `on_timestamp_set`. Must be `O(1)`.
 */
export interface TimestampCall_set {
    __kind: 'set'
    now: bigint
}

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export type SubspaceCall = SubspaceCall_report_equivocation | SubspaceCall_store_segment_headers | SubspaceCall_enable_solution_range_adjustment | SubspaceCall_vote | SubspaceCall_enable_rewards | SubspaceCall_enable_storage_access | SubspaceCall_enable_authoring_by_anyone

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
 * Submit new segment header to the blockchain. This is an inherent extrinsic and part of
 * the Subspace consensus logic.
 */
export interface SubspaceCall_store_segment_headers {
    __kind: 'store_segment_headers'
    segmentHeaders: SegmentHeader[]
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
export type BalancesCall = BalancesCall_transfer_allow_death | BalancesCall_set_balance_deprecated | BalancesCall_force_transfer | BalancesCall_transfer_keep_alive | BalancesCall_transfer_all | BalancesCall_force_unreserve | BalancesCall_upgrade_accounts | BalancesCall_transfer | BalancesCall_force_set_balance

/**
 * Transfer some liquid free balance to another account.
 * 
 * `transfer_allow_death` will set the `FreeBalance` of the sender and receiver.
 * If the sender's account is below the existential deposit as a result
 * of the transfer, the account will be reaped.
 * 
 * The dispatch origin for this call must be `Signed` by the transactor.
 */
export interface BalancesCall_transfer_allow_death {
    __kind: 'transfer_allow_death'
    dest: MultiAddress
    value: bigint
}

/**
 * Set the regular balance of a given account; it also takes a reserved balance but this
 * must be the same as the account's current reserved balance.
 * 
 * The dispatch origin for this call is `root`.
 * 
 * WARNING: This call is DEPRECATED! Use `force_set_balance` instead.
 */
export interface BalancesCall_set_balance_deprecated {
    __kind: 'set_balance_deprecated'
    who: MultiAddress
    newFree: bigint
    oldReserved: bigint
}

/**
 * Exactly as `transfer_allow_death`, except the origin must be root and the source account
 * may be specified.
 */
export interface BalancesCall_force_transfer {
    __kind: 'force_transfer'
    source: MultiAddress
    dest: MultiAddress
    value: bigint
}

/**
 * Same as the [`transfer_allow_death`] call, but with a check that the transfer will not
 * kill the origin account.
 * 
 * 99% of the time you want [`transfer_allow_death`] instead.
 * 
 * [`transfer_allow_death`]: struct.Pallet.html#method.transfer
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
 *   keep the sender account alive (true).
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
 * Upgrade a specified account.
 * 
 * - `origin`: Must be `Signed`.
 * - `who`: The account to be upgraded.
 * 
 * This will waive the transaction fee if at least all but 10% of the accounts needed to
 * be upgraded. (We let some not have to be upgraded just in order to allow for the
 * possibililty of churn).
 */
export interface BalancesCall_upgrade_accounts {
    __kind: 'upgrade_accounts'
    who: Uint8Array[]
}

/**
 * Alias for `transfer_allow_death`, provided only for name-wise compatibility.
 * 
 * WARNING: DEPRECATED! Will be released in approximately 3 months.
 */
export interface BalancesCall_transfer {
    __kind: 'transfer'
    dest: MultiAddress
    value: bigint
}

/**
 * Set the regular balance of a given account.
 * 
 * The dispatch origin for this call is `root`.
 */
export interface BalancesCall_force_set_balance {
    __kind: 'force_set_balance'
    who: MultiAddress
    newFree: bigint
}

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export type UtilityCall = UtilityCall_batch | UtilityCall_as_derivative | UtilityCall_batch_all | UtilityCall_dispatch_as | UtilityCall_force_batch | UtilityCall_with_weight

/**
 * Send a batch of dispatch calls.
 * 
 * May be called from any origin except `None`.
 * 
 * - `calls`: The calls to be dispatched from the same origin. The number of call must not
 *   exceed the constant: `batched_calls_limit` (available in constant metadata).
 * 
 * If origin is root then the calls are dispatched without checking origin filter. (This
 * includes bypassing `frame_system::Config::BaseCallFilter`).
 * 
 * ## Complexity
 * - O(C) where C is the number of calls to be batched.
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
 * May be called from any origin except `None`.
 * 
 * - `calls`: The calls to be dispatched from the same origin. The number of call must not
 *   exceed the constant: `batched_calls_limit` (available in constant metadata).
 * 
 * If origin is root then the calls are dispatched without checking origin filter. (This
 * includes bypassing `frame_system::Config::BaseCallFilter`).
 * 
 * ## Complexity
 * - O(C) where C is the number of calls to be batched.
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
 * ## Complexity
 * - O(1).
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
 * May be called from any origin except `None`.
 * 
 * - `calls`: The calls to be dispatched from the same origin. The number of call must not
 *   exceed the constant: `batched_calls_limit` (available in constant metadata).
 * 
 * If origin is root then the calls are dispatch without checking origin filter. (This
 * includes bypassing `frame_system::Config::BaseCallFilter`).
 * 
 * ## Complexity
 * - O(C) where C is the number of calls to be batched.
 */
export interface UtilityCall_force_batch {
    __kind: 'force_batch'
    calls: Call[]
}

/**
 * Dispatch a function call with a specified weight.
 * 
 * This function does not check the weight of the call, and instead allows the
 * Root origin to specify the weight of the call.
 * 
 * The dispatch origin for this call must be _Root_.
 */
export interface UtilityCall_with_weight {
    __kind: 'with_weight'
    call: Call
    weight: Weight
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
export type DomainsCall = DomainsCall_submit_bundle | DomainsCall_submit_fraud_proof | DomainsCall_submit_bundle_equivocation_proof | DomainsCall_submit_invalid_transaction_proof

export interface DomainsCall_submit_bundle {
    __kind: 'submit_bundle'
    signedOpaqueBundle: SignedBundle
}

export interface DomainsCall_submit_fraud_proof {
    __kind: 'submit_fraud_proof'
    fraudProof: FraudProof
}

export interface DomainsCall_submit_bundle_equivocation_proof {
    __kind: 'submit_bundle_equivocation_proof'
    bundleEquivocationProof: BundleEquivocationProof
}

export interface DomainsCall_submit_invalid_transaction_proof {
    __kind: 'submit_invalid_transaction_proof'
    invalidTransactionProof: InvalidTransactionProof
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
 * ## Complexity
 * - O(1).
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
 * ## Complexity
 * - O(1).
 */
export interface SudoCall_sudo_unchecked_weight {
    __kind: 'sudo_unchecked_weight'
    call: Call
    weight: Weight
}

/**
 * Authenticates the current sudo key and sets the given AccountId (`new`) as the new sudo
 * key.
 * 
 * The dispatch origin for this call must be _Signed_.
 * 
 * ## Complexity
 * - O(1).
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
 * ## Complexity
 * - O(1).
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

export type Event = Event_System | Event_Subspace | Event_OffencesSubspace | Event_Rewards | Event_Balances | Event_TransactionFees | Event_TransactionPayment | Event_Utility | Event_Feeds | Event_ObjectStore | Event_Receipts | Event_Domains | Event_Vesting | Event_Sudo

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

export interface Event_Receipts {
    __kind: 'Receipts'
    value: ReceiptsEvent
}

export interface Event_Domains {
    __kind: 'Domains'
    value: DomainsEvent
}

export interface Event_Vesting {
    __kind: 'Vesting'
    value: VestingEvent
}

export interface Event_Sudo {
    __kind: 'Sudo'
    value: SudoEvent
}

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

export interface SignedBundle {
    bundle: Bundle
    bundleSolution: BundleSolution
    signature: Uint8Array
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

export interface BundleEquivocationProof {
    domainId: number
    offender: Uint8Array
    slot: bigint
    firstHeader: BundleHeader
    secondHeader: BundleHeader
}

export interface InvalidTransactionProof {
    domainId: number
}

export interface VestingSchedule {
    start: number
    period: number
    periodCount: number
    perPeriod: bigint
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
 * 
			The [event](https://docs.substrate.io/main-docs/build/events-errors/) emitted
			by this pallet.
			
 */
export type BalancesEvent = BalancesEvent_Endowed | BalancesEvent_DustLost | BalancesEvent_Transfer | BalancesEvent_BalanceSet | BalancesEvent_Reserved | BalancesEvent_Unreserved | BalancesEvent_ReserveRepatriated | BalancesEvent_Deposit | BalancesEvent_Withdraw | BalancesEvent_Slashed | BalancesEvent_Minted | BalancesEvent_Burned | BalancesEvent_Suspended | BalancesEvent_Restored | BalancesEvent_Upgraded | BalancesEvent_Issued | BalancesEvent_Rescinded | BalancesEvent_Locked | BalancesEvent_Unlocked

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
    result: Type_47
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
export type ReceiptsEvent = ReceiptsEvent_NewDomainReceipt | ReceiptsEvent_FraudProofProcessed

/**
 * A new domain receipt.
 */
export interface ReceiptsEvent_NewDomainReceipt {
    __kind: 'NewDomainReceipt'
    domainId: number
    primaryNumber: number
    primaryHash: Uint8Array
}

/**
 * A fraud proof was processed.
 */
export interface ReceiptsEvent_FraudProofProcessed {
    __kind: 'FraudProofProcessed'
    domainId: number
    newBestNumber: number
    newBestHash: Uint8Array
}

/**
 * 
			The [event](https://docs.substrate.io/main-docs/build/events-errors/) emitted
			by this pallet.
			
 */
export type DomainsEvent = DomainsEvent_BundleStored | DomainsEvent_BundleEquivocationProofProcessed | DomainsEvent_InvalidTransactionProofProcessed

/**
 * A domain bundle was included.
 */
export interface DomainsEvent_BundleStored {
    __kind: 'BundleStored'
    domainId: number
    bundleHash: Uint8Array
    bundleAuthor: Uint8Array
}

/**
 * A bundle equivocation proof was processed.
 */
export interface DomainsEvent_BundleEquivocationProofProcessed {
    __kind: 'BundleEquivocationProofProcessed'
}

/**
 * An invalid transaction proof was processed.
 */
export interface DomainsEvent_InvalidTransactionProofProcessed {
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
    sudoResult: Type_47
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
    sudoResult: Type_47
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

export interface Bundle {
    header: BundleHeader
    receipts: ExecutionReceipt[]
    extrinsics: Uint8Array[]
}

export type BundleSolution = BundleSolution_System | BundleSolution_Core

export interface BundleSolution_System {
    __kind: 'System'
    authorityStakeWeight: bigint
    authorityWitness: Type_158
    proofOfElection: ProofOfElection
}

export interface BundleSolution_Core {
    __kind: 'Core'
    proofOfElection: ProofOfElection
    coreBlockNumber: number
    coreBlockHash: Uint8Array
    coreStateRoot: Uint8Array
}

export interface InvalidStateTransitionProof {
    domainId: number
    badReceiptHash: Uint8Array
    parentNumber: number
    primaryParentHash: Uint8Array
    preStateRoot: Uint8Array
    postStateRoot: Uint8Array
    proof: StorageProof
    executionPhase: ExecutionPhase
}

export interface ImproperTransactionSortitionProof {
    domainId: number
}

export interface BundleHeader {
    primaryNumber: number
    primaryHash: Uint8Array
    slotNumber: bigint
    extrinsicsRoot: Uint8Array
}

export type BalanceStatus = BalanceStatus_Free | BalanceStatus_Reserved

export interface BalanceStatus_Free {
    __kind: 'Free'
}

export interface BalanceStatus_Reserved {
    __kind: 'Reserved'
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
    sectorIndex: bigint
    totalPieces: bigint
    pieceOffset: bigint
    recordCommitmentHash: Scalar
    pieceWitness: Witness
    chunkOffset: number
    chunk: Scalar
    chunkSignature: ChunkSignature
}

export interface ExecutionReceipt {
    primaryNumber: number
    primaryHash: Uint8Array
    domainHash: Uint8Array
    trace: Uint8Array[]
    traceRoot: Uint8Array
}

export interface Type_158 {
    leafIndex: number
    proof: Uint8Array
    numberOfLeaves: number
}

export interface ProofOfElection {
    domainId: number
    vrfOutput: Uint8Array
    vrfProof: Uint8Array
    executorPublicKey: Uint8Array
    globalChallenge: Uint8Array
    stateRoot: Uint8Array
    storageProof: StorageProof
    blockNumber: number
    blockHash: Uint8Array
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

export interface Scalar {
    inner: Uint8Array
}

export interface Witness {
    inner: Uint8Array
}

export interface ChunkSignature {
    output: Uint8Array
    proof: Uint8Array
}
