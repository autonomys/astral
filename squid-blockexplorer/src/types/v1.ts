import type {Result, Option} from './support'

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
    result: Type_47
}

/**
 * The `Event` enum of this pallet
 */
export type DomainsEvent = DomainsEvent_BundleStored | DomainsEvent_DomainRuntimeCreated | DomainsEvent_DomainRuntimeUpgradeScheduled | DomainsEvent_DomainRuntimeUpgraded | DomainsEvent_OperatorRegistered | DomainsEvent_OperatorNominated | DomainsEvent_DomainInstantiated | DomainsEvent_OperatorSwitchedDomain | DomainsEvent_OperatorDeregistered | DomainsEvent_WithdrewStake | DomainsEvent_PreferredOperator | DomainsEvent_OperatorRewarded | DomainsEvent_DomainEpochCompleted | DomainsEvent_FraudProofProcessed | DomainsEvent_DomainOperatorAllowListUpdated

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

export interface DomainsEvent_WithdrewStake {
    __kind: 'WithdrewStake'
    operatorId: bigint
    nominatorId: Uint8Array
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

export interface DomainsEvent_DomainEpochCompleted {
    __kind: 'DomainEpochCompleted'
    domainId: number
    completedEpochIndex: number
}

export interface DomainsEvent_FraudProofProcessed {
    __kind: 'FraudProofProcessed'
    domainId: number
    newHeadReceiptNumber: number
}

export interface DomainsEvent_DomainOperatorAllowListUpdated {
    __kind: 'DomainOperatorAllowListUpdated'
    domainId: number
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
export type SudoEvent = SudoEvent_Sudid | SudoEvent_KeyChanged | SudoEvent_SudoAsDone

/**
 * A sudo call just took place.
 */
export interface SudoEvent_Sudid {
    __kind: 'Sudid'
    /**
     * The result of the call made by the sudo user.
     */
    sudoResult: Type_47
}

/**
 * The sudo key has been updated.
 */
export interface SudoEvent_KeyChanged {
    __kind: 'KeyChanged'
    /**
     * The old sudo key if one was previously set.
     */
    oldSudoer: (Uint8Array | undefined)
}

/**
 * A [sudo_as](Pallet::sudo_as) call just took place.
 */
export interface SudoEvent_SudoAsDone {
    __kind: 'SudoAsDone'
    /**
     * The result of the call made by the sudo user.
     */
    sudoResult: Type_47
}

export interface DispatchInfo {
    weight: Weight
    class: DispatchClass
    paysFee: Pays
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

export type SegmentHeader = SegmentHeader_V0

export interface SegmentHeader_V0 {
    __kind: 'V0'
    segmentIndex: bigint
    segmentCommitment: Uint8Array
    prevSegmentHeaderHash: Uint8Array
    lastArchivedBlock: LastArchivedBlock
}

export type BalanceStatus = BalanceStatus_Free | BalanceStatus_Reserved

export interface BalanceStatus_Free {
    __kind: 'Free'
}

export interface BalanceStatus_Reserved {
    __kind: 'Reserved'
}

export type Type_47 = Type_47_Ok | Type_47_Err

export interface Type_47_Ok {
    __kind: 'Ok'
}

export interface Type_47_Err {
    __kind: 'Err'
    value: DispatchError
}

export type RuntimeType = RuntimeType_Evm

export interface RuntimeType_Evm {
    __kind: 'Evm'
}

export interface VestingSchedule {
    start: number
    period: number
    periodCount: number
    perPeriod: bigint
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

export interface Weight {
    refTime: bigint
    proofSize: bigint
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
