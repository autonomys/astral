import type {Result, Option} from './support'

export type BalanceStatus = BalanceStatus_Free | BalanceStatus_Reserved

export interface BalanceStatus_Free {
    __kind: 'Free'
}

export interface BalanceStatus_Reserved {
    __kind: 'Reserved'
}

export interface Log {
    address: Uint8Array
    topics: Uint8Array[]
    data: Uint8Array
}

export type ExitReason = ExitReason_Succeed | ExitReason_Error | ExitReason_Revert | ExitReason_Fatal

export interface ExitReason_Succeed {
    __kind: 'Succeed'
    value: ExitSucceed
}

export interface ExitReason_Error {
    __kind: 'Error'
    value: ExitError
}

export interface ExitReason_Revert {
    __kind: 'Revert'
    value: ExitRevert
}

export interface ExitReason_Fatal {
    __kind: 'Fatal'
    value: ExitFatal
}

export type Type_32 = Type_32_Ok | Type_32_Err

export interface Type_32_Ok {
    __kind: 'Ok'
}

export interface Type_32_Err {
    __kind: 'Err'
    value: DispatchError
}

export type OutboxMessageResult = OutboxMessageResult_Ok | OutboxMessageResult_Err

export interface OutboxMessageResult_Ok {
    __kind: 'Ok'
}

export interface OutboxMessageResult_Err {
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

export type TransactionV2 = TransactionV2_Legacy | TransactionV2_EIP2930 | TransactionV2_EIP1559

export interface TransactionV2_Legacy {
    __kind: 'Legacy'
    value: LegacyTransaction
}

export interface TransactionV2_EIP2930 {
    __kind: 'EIP2930'
    value: EIP2930Transaction
}

export interface TransactionV2_EIP1559 {
    __kind: 'EIP1559'
    value: EIP1559Transaction
}

export type Call = Call_System | Call_Timestamp | Call_ExecutivePallet | Call_Balances | Call_Messenger | Call_Transporter | Call_Ethereum | Call_EVM | Call_BaseFee | Call_Sudo

export interface Call_System {
    __kind: 'System'
    value: SystemCall
}

export interface Call_Timestamp {
    __kind: 'Timestamp'
    value: TimestampCall
}

export interface Call_ExecutivePallet {
    __kind: 'ExecutivePallet'
    value: ExecutivePalletCall
}

export interface Call_Balances {
    __kind: 'Balances'
    value: BalancesCall
}

export interface Call_Messenger {
    __kind: 'Messenger'
    value: MessengerCall
}

export interface Call_Transporter {
    __kind: 'Transporter'
    value: TransporterCall
}

export interface Call_Ethereum {
    __kind: 'Ethereum'
    value: EthereumCall
}

export interface Call_EVM {
    __kind: 'EVM'
    value: EVMCall
}

export interface Call_BaseFee {
    __kind: 'BaseFee'
    value: BaseFeeCall
}

export interface Call_Sudo {
    __kind: 'Sudo'
    value: SudoCall
}

export interface Weight {
    refTime: bigint
    proofSize: bigint
}

export interface InitiateChannelParams {
    maxOutgoingMessages: number
    feeModel: FeeModel
}

export interface CrossDomainMessage {
    srcDomainId: number
    dstDomainId: number
    channelId: bigint
    nonce: bigint
    proof: Proof
}

export interface Location {
    domainId: number
    accountId: MultiAccountId
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

export interface BalanceLock {
    id: Uint8Array
    amount: bigint
    reasons: Reasons
}

export interface ReserveData {
    id: Uint8Array
    amount: bigint
}

export interface Block {
    header: Header
    transactions: TransactionV2[]
    ommers: Header[]
}

export type ReceiptV3 = ReceiptV3_Legacy | ReceiptV3_EIP2930 | ReceiptV3_EIP1559

export interface ReceiptV3_Legacy {
    __kind: 'Legacy'
    value: EIP658ReceiptData
}

export interface ReceiptV3_EIP2930 {
    __kind: 'EIP2930'
    value: EIP658ReceiptData
}

export interface ReceiptV3_EIP1559 {
    __kind: 'EIP1559'
    value: EIP658ReceiptData
}

export interface TransactionStatus {
    transactionHash: Uint8Array
    transactionIndex: number
    from: Uint8Array
    to: (Uint8Array | undefined)
    contractAddress: (Uint8Array | undefined)
    logs: Log[]
    logsBloom: Uint8Array
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
    srcDomainId: number
    dstDomainId: number
    channelId: bigint
    nonce: bigint
    payload: VersionedPayload
    lastDeliveredMessageResponseNonce: (bigint | undefined)
}

export interface RelayerMessages {
    outbox: [number, [bigint, bigint]][]
    inboxResponses: [number, [bigint, bigint]][]
}

export interface RelayerInfo {
    owner: Uint8Array
    depositReserved: bigint
}

export interface AccountInfo {
    nonce: number
    consumers: number
    providers: number
    sufficients: number
    data: AccountData
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
    max: Type_76
}

export interface BlockWeights {
    baseBlock: Weight
    maxBlock: Weight
    perClass: Type_72
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

export type ExitSucceed = ExitSucceed_Stopped | ExitSucceed_Returned | ExitSucceed_Suicided

export interface ExitSucceed_Stopped {
    __kind: 'Stopped'
}

export interface ExitSucceed_Returned {
    __kind: 'Returned'
}

export interface ExitSucceed_Suicided {
    __kind: 'Suicided'
}

export type ExitError = ExitError_StackUnderflow | ExitError_StackOverflow | ExitError_InvalidJump | ExitError_InvalidRange | ExitError_DesignatedInvalid | ExitError_CallTooDeep | ExitError_CreateCollision | ExitError_CreateContractLimit | ExitError_InvalidCode | ExitError_OutOfOffset | ExitError_OutOfGas | ExitError_OutOfFund | ExitError_PCUnderflow | ExitError_CreateEmpty | ExitError_Other

export interface ExitError_StackUnderflow {
    __kind: 'StackUnderflow'
}

export interface ExitError_StackOverflow {
    __kind: 'StackOverflow'
}

export interface ExitError_InvalidJump {
    __kind: 'InvalidJump'
}

export interface ExitError_InvalidRange {
    __kind: 'InvalidRange'
}

export interface ExitError_DesignatedInvalid {
    __kind: 'DesignatedInvalid'
}

export interface ExitError_CallTooDeep {
    __kind: 'CallTooDeep'
}

export interface ExitError_CreateCollision {
    __kind: 'CreateCollision'
}

export interface ExitError_CreateContractLimit {
    __kind: 'CreateContractLimit'
}

export interface ExitError_InvalidCode {
    __kind: 'InvalidCode'
    value: number
}

export interface ExitError_OutOfOffset {
    __kind: 'OutOfOffset'
}

export interface ExitError_OutOfGas {
    __kind: 'OutOfGas'
}

export interface ExitError_OutOfFund {
    __kind: 'OutOfFund'
}

export interface ExitError_PCUnderflow {
    __kind: 'PCUnderflow'
}

export interface ExitError_CreateEmpty {
    __kind: 'CreateEmpty'
}

export interface ExitError_Other {
    __kind: 'Other'
    value: string
}

export type ExitRevert = ExitRevert_Reverted

export interface ExitRevert_Reverted {
    __kind: 'Reverted'
}

export type ExitFatal = ExitFatal_NotSupported | ExitFatal_UnhandledInterrupt | ExitFatal_CallErrorAsFatal | ExitFatal_Other

export interface ExitFatal_NotSupported {
    __kind: 'NotSupported'
}

export interface ExitFatal_UnhandledInterrupt {
    __kind: 'UnhandledInterrupt'
}

export interface ExitFatal_CallErrorAsFatal {
    __kind: 'CallErrorAsFatal'
    value: ExitError
}

export interface ExitFatal_Other {
    __kind: 'Other'
    value: string
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

export interface LegacyTransaction {
    nonce: bigint
    gasPrice: bigint
    gasLimit: bigint
    action: TransactionAction
    value: bigint
    input: Uint8Array
    signature: TransactionSignature
}

export interface EIP2930Transaction {
    chainId: bigint
    nonce: bigint
    gasPrice: bigint
    gasLimit: bigint
    action: TransactionAction
    value: bigint
    input: Uint8Array
    accessList: AccessListItem[]
    oddYParity: boolean
    r: Uint8Array
    s: Uint8Array
}

export interface EIP1559Transaction {
    chainId: bigint
    nonce: bigint
    maxPriorityFeePerGas: bigint
    maxFeePerGas: bigint
    gasLimit: bigint
    action: TransactionAction
    value: bigint
    input: Uint8Array
    accessList: AccessListItem[]
    oddYParity: boolean
    r: Uint8Array
    s: Uint8Array
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
export type ExecutivePalletCall = ExecutivePalletCall_sudo_unchecked_weight_unsigned

/**
 * Unsigned version of `frame_sudo::sudo_unchecked_weight`.
 */
export interface ExecutivePalletCall_sudo_unchecked_weight_unsigned {
    __kind: 'sudo_unchecked_weight_unsigned'
    call: Call
    weight: Weight
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
    dest: Uint8Array
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
    who: Uint8Array
    newFree: bigint
    oldReserved: bigint
}

/**
 * Exactly as `transfer_allow_death`, except the origin must be root and the source account
 * may be specified.
 */
export interface BalancesCall_force_transfer {
    __kind: 'force_transfer'
    source: Uint8Array
    dest: Uint8Array
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
    dest: Uint8Array
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
    dest: Uint8Array
    keepAlive: boolean
}

/**
 * Unreserve some balance from a user by force.
 * 
 * Can only be called by ROOT.
 */
export interface BalancesCall_force_unreserve {
    __kind: 'force_unreserve'
    who: Uint8Array
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
    dest: Uint8Array
    value: bigint
}

/**
 * Set the regular balance of a given account.
 * 
 * The dispatch origin for this call is `root`.
 */
export interface BalancesCall_force_set_balance {
    __kind: 'force_set_balance'
    who: Uint8Array
    newFree: bigint
}

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export type MessengerCall = MessengerCall_initiate_channel | MessengerCall_close_channel | MessengerCall_relay_message | MessengerCall_relay_message_response | MessengerCall_join_relayer_set | MessengerCall_exit_relayer_set

/**
 * A new Channel is initiated with a foreign domain.
 * Next Channel ID is used to assign the new channel.
 * Channel is set to initiated and do not accept or receive any messages.
 * Only a root user can create the channel.
 */
export interface MessengerCall_initiate_channel {
    __kind: 'initiate_channel'
    dstDomainId: number
    params: InitiateChannelParams
}

/**
 * An open channel is closed with a foreign domain.
 * Channel is set to Closed and do not accept or receive any messages.
 * Only a root user can close an open channel.
 */
export interface MessengerCall_close_channel {
    __kind: 'close_channel'
    domainId: number
    channelId: bigint
}

/**
 * Receives an Inbox message that needs to be validated and processed.
 */
export interface MessengerCall_relay_message {
    __kind: 'relay_message'
    msg: CrossDomainMessage
}

/**
 * Receives a response from the dst_domain for a message in Outbox.
 */
export interface MessengerCall_relay_message_response {
    __kind: 'relay_message_response'
    msg: CrossDomainMessage
}

/**
 * Declare the desire to become a relayer for this domain by reserving the relayer deposit.
 */
export interface MessengerCall_join_relayer_set {
    __kind: 'join_relayer_set'
    relayerId: Uint8Array
}

/**
 * Declare the desire to exit relaying for this domain.
 */
export interface MessengerCall_exit_relayer_set {
    __kind: 'exit_relayer_set'
    relayerId: Uint8Array
}

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export type TransporterCall = TransporterCall_transfer

/**
 * Initiates transfer of funds from account on src_domain to account on dst_domain.
 * Funds are burned on src_domain first and are minted on dst_domain using Messenger.
 */
export interface TransporterCall_transfer {
    __kind: 'transfer'
    dstLocation: Location
    amount: bigint
}

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export type EthereumCall = EthereumCall_transact

/**
 * Transact an Ethereum transaction.
 */
export interface EthereumCall_transact {
    __kind: 'transact'
    transaction: TransactionV2
}

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export type EVMCall = EVMCall_withdraw | EVMCall_call | EVMCall_create | EVMCall_create2

/**
 * Withdraw balance from EVM into currency/balances pallet.
 */
export interface EVMCall_withdraw {
    __kind: 'withdraw'
    address: Uint8Array
    value: bigint
}

/**
 * Issue an EVM call operation. This is similar to a message call transaction in Ethereum.
 */
export interface EVMCall_call {
    __kind: 'call'
    source: Uint8Array
    target: Uint8Array
    input: Uint8Array
    value: bigint
    gasLimit: bigint
    maxFeePerGas: bigint
    maxPriorityFeePerGas: (bigint | undefined)
    nonce: (bigint | undefined)
    accessList: [Uint8Array, Uint8Array[]][]
}

/**
 * Issue an EVM create operation. This is similar to a contract creation transaction in
 * Ethereum.
 */
export interface EVMCall_create {
    __kind: 'create'
    source: Uint8Array
    init: Uint8Array
    value: bigint
    gasLimit: bigint
    maxFeePerGas: bigint
    maxPriorityFeePerGas: (bigint | undefined)
    nonce: (bigint | undefined)
    accessList: [Uint8Array, Uint8Array[]][]
}

/**
 * Issue an EVM create2 operation.
 */
export interface EVMCall_create2 {
    __kind: 'create2'
    source: Uint8Array
    init: Uint8Array
    salt: Uint8Array
    value: bigint
    gasLimit: bigint
    maxFeePerGas: bigint
    maxPriorityFeePerGas: (bigint | undefined)
    nonce: (bigint | undefined)
    accessList: [Uint8Array, Uint8Array[]][]
}

/**
 * Contains one variant per dispatchable that can be called by an extrinsic.
 */
export type BaseFeeCall = BaseFeeCall_set_base_fee_per_gas | BaseFeeCall_set_elasticity

export interface BaseFeeCall_set_base_fee_per_gas {
    __kind: 'set_base_fee_per_gas'
    fee: bigint
}

export interface BaseFeeCall_set_elasticity {
    __kind: 'set_elasticity'
    elasticity: number
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
    new: Uint8Array
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
    who: Uint8Array
    call: Call
}

export interface FeeModel {
    outboxFee: ExecutionFee
    inboxFee: ExecutionFee
}

export interface Proof {
    systemDomainBlockInfo: DomainBlockInfo
    systemDomainStateRoot: Uint8Array
    coreDomainProof: ([DomainBlockInfo, StorageProof] | undefined)
    messageProof: StorageProof
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

export interface Header {
    parentHash: Uint8Array
    ommersHash: Uint8Array
    beneficiary: Uint8Array
    stateRoot: Uint8Array
    transactionsRoot: Uint8Array
    receiptsRoot: Uint8Array
    logsBloom: Uint8Array
    difficulty: bigint
    number: bigint
    gasLimit: bigint
    gasUsed: bigint
    timestamp: bigint
    extraData: Uint8Array
    mixHash: Uint8Array
    nonce: Uint8Array
}

export interface EIP658ReceiptData {
    statusCode: number
    usedGas: bigint
    logsBloom: Uint8Array
    logs: Log[]
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

export type Event = Event_System | Event_ExecutivePallet | Event_Balances | Event_TransactionPayment | Event_Messenger | Event_Transporter | Event_Ethereum | Event_EVM | Event_BaseFee | Event_Sudo

export interface Event_System {
    __kind: 'System'
    value: SystemEvent
}

export interface Event_ExecutivePallet {
    __kind: 'ExecutivePallet'
    value: ExecutivePalletEvent
}

export interface Event_Balances {
    __kind: 'Balances'
    value: BalancesEvent
}

export interface Event_TransactionPayment {
    __kind: 'TransactionPayment'
    value: TransactionPaymentEvent
}

export interface Event_Messenger {
    __kind: 'Messenger'
    value: MessengerEvent
}

export interface Event_Transporter {
    __kind: 'Transporter'
    value: TransporterEvent
}

export interface Event_Ethereum {
    __kind: 'Ethereum'
    value: EthereumEvent
}

export interface Event_EVM {
    __kind: 'EVM'
    value: EVMEvent
}

export interface Event_BaseFee {
    __kind: 'BaseFee'
    value: BaseFeeEvent
}

export interface Event_Sudo {
    __kind: 'Sudo'
    value: SudoEvent
}

export interface Type_76 {
    normal: number
    operational: number
    mandatory: number
}

export interface Type_72 {
    normal: WeightsPerClass
    operational: WeightsPerClass
    mandatory: WeightsPerClass
}

export type TransactionAction = TransactionAction_Call | TransactionAction_Create

export interface TransactionAction_Call {
    __kind: 'Call'
    value: Uint8Array
}

export interface TransactionAction_Create {
    __kind: 'Create'
}

export interface TransactionSignature {
    v: bigint
    r: Uint8Array
    s: Uint8Array
}

export interface AccessListItem {
    address: Uint8Array
    storageKeys: Uint8Array[]
}

export interface ExecutionFee {
    relayerPoolFee: bigint
    computeFee: bigint
}

export interface DomainBlockInfo {
    blockNumber: number
    blockHash: Uint8Array
}

export interface StorageProof {
    trieNodes: Uint8Array[]
}

export type Payload = Payload_Protocol | Payload_Endpoint

export interface Payload_Protocol {
    __kind: 'Protocol'
    value: RequestResponse
}

export interface Payload_Endpoint {
    __kind: 'Endpoint'
    value: Type_144
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
 * 
			The [event](https://docs.substrate.io/main-docs/build/events-errors/) emitted
			by this pallet.
			
 */
export type ExecutivePalletEvent = ExecutivePalletEvent_Sudid

/**
 * A sudo just took place.
 */
export interface ExecutivePalletEvent_Sudid {
    __kind: 'Sudid'
    sudoResult: Type_32
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
 * `pallet-messenger` events
 */
export type MessengerEvent = MessengerEvent_ChannelInitiated | MessengerEvent_ChannelClosed | MessengerEvent_ChannelOpen | MessengerEvent_OutboxMessage | MessengerEvent_OutboxMessageResponse | MessengerEvent_OutboxMessageResult | MessengerEvent_InboxMessage | MessengerEvent_InboxMessageResponse | MessengerEvent_RelayerJoined | MessengerEvent_RelayerExited

/**
 * Emits when a channel between two domains in initiated.
 */
export interface MessengerEvent_ChannelInitiated {
    __kind: 'ChannelInitiated'
    /**
     * Foreign domain id this channel connects to.
     */
    domainId: number
    /**
     * Channel ID of the said channel.
     */
    channelId: bigint
}

/**
 * Emits when a channel between two domains in closed.
 */
export interface MessengerEvent_ChannelClosed {
    __kind: 'ChannelClosed'
    /**
     * Foreign domain id this channel connects to.
     */
    domainId: number
    /**
     * Channel ID of the said channel.
     */
    channelId: bigint
}

/**
 * Emits when a channel between two domains in open.
 */
export interface MessengerEvent_ChannelOpen {
    __kind: 'ChannelOpen'
    /**
     * Foreign domain id this channel connects to.
     */
    domainId: number
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
    domainId: number
    channelId: bigint
    nonce: bigint
    relayerId: Uint8Array
}

/**
 * Emits when a message response is available for Outbox message.
 */
export interface MessengerEvent_OutboxMessageResponse {
    __kind: 'OutboxMessageResponse'
    /**
     * Destination domain ID.
     */
    domainId: number
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
    domainId: number
    channelId: bigint
    nonce: bigint
    result: OutboxMessageResult
}

/**
 * Emits when a new inbox message is validated and added to Inbox.
 */
export interface MessengerEvent_InboxMessage {
    __kind: 'InboxMessage'
    domainId: number
    channelId: bigint
    nonce: bigint
}

/**
 * Emits when a message response is available for Inbox message.
 */
export interface MessengerEvent_InboxMessageResponse {
    __kind: 'InboxMessageResponse'
    /**
     * Destination domain ID.
     */
    domainId: number
    /**
     * Channel Is
     */
    channelId: bigint
    nonce: bigint
    relayerId: Uint8Array
}

/**
 * Emits when a relayer successfully joins the relayer set.
 */
export interface MessengerEvent_RelayerJoined {
    __kind: 'RelayerJoined'
    /**
     * Owner who controls the relayer.
     */
    owner: Uint8Array
    /**
     * Relayer address to which rewards are paid.
     */
    relayerId: Uint8Array
}

/**
 * Emits when a relayer exists the relayer set.
 */
export interface MessengerEvent_RelayerExited {
    __kind: 'RelayerExited'
    /**
     * Owner who controls the relayer.
     */
    owner: Uint8Array
    /**
     * Relayer address which exited the set.
     */
    relayerId: Uint8Array
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
     * Destination domain the transfer is bound to.
     */
    domainId: number
    /**
     * Id of the transfer.
     */
    messageId: [bigint, bigint]
}

/**
 * Emits when a given outgoing transfer was failed on dst_domain.
 */
export interface TransporterEvent_OutgoingTransferFailed {
    __kind: 'OutgoingTransferFailed'
    /**
     * Destination domain the transfer is bound to.
     */
    domainId: number
    /**
     * Id of the transfer.
     */
    messageId: [bigint, bigint]
    /**
     * Error from dst_domain endpoint.
     */
    err: DispatchError
}

/**
 * Emits when a given outgoing transfer was successful.
 */
export interface TransporterEvent_OutgoingTransferSuccessful {
    __kind: 'OutgoingTransferSuccessful'
    /**
     * Destination domain the transfer is bound to.
     */
    domainId: number
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
     * Source domain the transfer is coming from.
     */
    domainId: number
    /**
     * Id of the transfer.
     */
    messageId: [bigint, bigint]
}

/**
 * 
			The [event](https://docs.substrate.io/main-docs/build/events-errors/) emitted
			by this pallet.
			
 */
export type EthereumEvent = EthereumEvent_Executed

/**
 * An ethereum transaction was successfully executed.
 */
export interface EthereumEvent_Executed {
    __kind: 'Executed'
    from: Uint8Array
    to: Uint8Array
    transactionHash: Uint8Array
    exitReason: ExitReason
}

/**
 * 
			The [event](https://docs.substrate.io/main-docs/build/events-errors/) emitted
			by this pallet.
			
 */
export type EVMEvent = EVMEvent_Log | EVMEvent_Created | EVMEvent_CreatedFailed | EVMEvent_Executed | EVMEvent_ExecutedFailed

/**
 * Ethereum events from contracts.
 */
export interface EVMEvent_Log {
    __kind: 'Log'
    log: Log
}

/**
 * A contract has been created at given address.
 */
export interface EVMEvent_Created {
    __kind: 'Created'
    address: Uint8Array
}

/**
 * A contract was attempted to be created, but the execution failed.
 */
export interface EVMEvent_CreatedFailed {
    __kind: 'CreatedFailed'
    address: Uint8Array
}

/**
 * A contract has been executed successfully with states applied.
 */
export interface EVMEvent_Executed {
    __kind: 'Executed'
    address: Uint8Array
}

/**
 * A contract has been executed with errors. States are reverted with only gas fees applied.
 */
export interface EVMEvent_ExecutedFailed {
    __kind: 'ExecutedFailed'
    address: Uint8Array
}

/**
 * 
			The [event](https://docs.substrate.io/main-docs/build/events-errors/) emitted
			by this pallet.
			
 */
export type BaseFeeEvent = BaseFeeEvent_NewBaseFeePerGas | BaseFeeEvent_BaseFeeOverflow | BaseFeeEvent_NewElasticity

export interface BaseFeeEvent_NewBaseFeePerGas {
    __kind: 'NewBaseFeePerGas'
    fee: bigint
}

export interface BaseFeeEvent_BaseFeeOverflow {
    __kind: 'BaseFeeOverflow'
}

export interface BaseFeeEvent_NewElasticity {
    __kind: 'NewElasticity'
    elasticity: number
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
    sudoResult: Type_32
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
    sudoResult: Type_32
}

export interface WeightsPerClass {
    baseExtrinsic: Weight
    maxExtrinsic: (Weight | undefined)
    maxTotal: (Weight | undefined)
    reserved: (Weight | undefined)
}

export type RequestResponse = RequestResponse_Request | RequestResponse_Response

export interface RequestResponse_Request {
    __kind: 'Request'
    value: ProtocolMessageRequest
}

export interface RequestResponse_Response {
    __kind: 'Response'
    value: Type_32
}

export type Type_144 = Type_144_Request | Type_144_Response

export interface Type_144_Request {
    __kind: 'Request'
    value: EndpointRequest
}

export interface Type_144_Response {
    __kind: 'Response'
    value: Result<Uint8Array, DispatchError>
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

export type Endpoint = Endpoint_Id

export interface Endpoint_Id {
    __kind: 'Id'
    value: bigint
}
