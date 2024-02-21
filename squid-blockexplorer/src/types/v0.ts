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

export type Type_60 = Type_60_Ok | Type_60_Err

export interface Type_60_Ok {
    __kind: 'Ok'
}

export interface Type_60_Err {
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

export type Call = Call_System | Call_Timestamp | Call_ExecutivePallet | Call_Balances | Call_Messenger | Call_Transporter | Call_Ethereum | Call_EVM | Call_BaseFee | Call_BlockFees | Call_Sudo

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

export interface Call_BlockFees {
    __kind: 'BlockFees'
    value: BlockFeesCall
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

export interface BlockFees {
    consensusStorageFee: bigint
    domainExecutionFee: bigint
    burnedBalance: bigint
}

export interface CodeMetadata {
    size: bigint
    hash: Uint8Array
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

export type Releases = Releases_V1Ancient | Releases_V2

export interface Releases_V1Ancient {
    __kind: 'V1Ancient'
}

export interface Releases_V2 {
    __kind: 'V2'
}

export interface Transfers {
    transfersIn: [ChainId, bigint][]
    transfersOut: [ChainId, bigint][]
    rejectedTransfersClaimed: [ChainId, bigint][]
    transfersRejected: [ChainId, bigint][]
}

export interface Transfer {
    amount: bigint
    sender: Location
    receiver: Location
}

export interface BlockLength {
    max: Type_78
}

export interface BlockWeights {
    baseBlock: Weight
    maxBlock: Weight
    perClass: Type_74
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

export type ExitError = ExitError_StackUnderflow | ExitError_StackOverflow | ExitError_InvalidJump | ExitError_InvalidRange | ExitError_DesignatedInvalid | ExitError_CallTooDeep | ExitError_CreateCollision | ExitError_CreateContractLimit | ExitError_InvalidCode | ExitError_OutOfOffset | ExitError_OutOfGas | ExitError_OutOfFund | ExitError_PCUnderflow | ExitError_CreateEmpty | ExitError_Other | ExitError_MaxNonce

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

export interface ExitError_MaxNonce {
    __kind: 'MaxNonce'
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
export type ExecutivePalletCall = ExecutivePalletCall_set_code

/**
 * See [`Pallet::set_code`].
 */
export interface ExecutivePalletCall_set_code {
    __kind: 'set_code'
    code: Uint8Array
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
    dest: Uint8Array
    value: bigint
}

/**
 * See [`Pallet::force_transfer`].
 */
export interface BalancesCall_force_transfer {
    __kind: 'force_transfer'
    source: Uint8Array
    dest: Uint8Array
    value: bigint
}

/**
 * See [`Pallet::transfer_keep_alive`].
 */
export interface BalancesCall_transfer_keep_alive {
    __kind: 'transfer_keep_alive'
    dest: Uint8Array
    value: bigint
}

/**
 * See [`Pallet::transfer_all`].
 */
export interface BalancesCall_transfer_all {
    __kind: 'transfer_all'
    dest: Uint8Array
    keepAlive: boolean
}

/**
 * See [`Pallet::force_unreserve`].
 */
export interface BalancesCall_force_unreserve {
    __kind: 'force_unreserve'
    who: Uint8Array
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
    who: Uint8Array
    newFree: bigint
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
export type EthereumCall = EthereumCall_transact

/**
 * See [`Pallet::transact`].
 */
export interface EthereumCall_transact {
    __kind: 'transact'
    transaction: TransactionV2
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type EVMCall = EVMCall_withdraw | EVMCall_call | EVMCall_create | EVMCall_create2

/**
 * See [`Pallet::withdraw`].
 */
export interface EVMCall_withdraw {
    __kind: 'withdraw'
    address: Uint8Array
    value: bigint
}

/**
 * See [`Pallet::call`].
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
 * See [`Pallet::create`].
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
 * See [`Pallet::create2`].
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
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type BaseFeeCall = BaseFeeCall_set_base_fee_per_gas | BaseFeeCall_set_elasticity

/**
 * See [`Pallet::set_base_fee_per_gas`].
 */
export interface BaseFeeCall_set_base_fee_per_gas {
    __kind: 'set_base_fee_per_gas'
    fee: bigint
}

/**
 * See [`Pallet::set_elasticity`].
 */
export interface BaseFeeCall_set_elasticity {
    __kind: 'set_elasticity'
    elasticity: number
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type BlockFeesCall = BlockFeesCall_set_next_consensus_chain_byte_fee

/**
 * See [`Pallet::set_next_consensus_chain_byte_fee`].
 */
export interface BlockFeesCall_set_next_consensus_chain_byte_fee {
    __kind: 'set_next_consensus_chain_byte_fee'
    transactionByteFee: bigint
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
    new: Uint8Array
}

/**
 * See [`Pallet::sudo_as`].
 */
export interface SudoCall_sudo_as {
    __kind: 'sudo_as'
    who: Uint8Array
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

export interface Type_78 {
    normal: number
    operational: number
    mandatory: number
}

export interface Type_74 {
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

export interface BlockInfo {
    blockNumber: number
    blockHash: Uint8Array
}

export interface StorageProof {
    trieNodes: Uint8Array[]
}

export type Endpoint = Endpoint_Id

export interface Endpoint_Id {
    __kind: 'Id'
    value: bigint
}

export type Payload = Payload_Protocol | Payload_Endpoint

export interface Payload_Protocol {
    __kind: 'Protocol'
    value: RequestResponse
}

export interface Payload_Endpoint {
    __kind: 'Endpoint'
    value: Type_117
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
 * The `Event` enum of this pallet
 */
export type ExecutivePalletEvent = never

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
    extraData: Uint8Array
}

/**
 * The `Event` enum of this pallet
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
 * The `Event` enum of this pallet
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
    sudoResult: Type_60
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
    sudoResult: Type_60
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
    value: Type_60
}

export type Type_117 = Type_117_Request | Type_117_Response

export interface Type_117_Request {
    __kind: 'Request'
    value: EndpointRequest
}

export interface Type_117_Response {
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
