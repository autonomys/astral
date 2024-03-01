import {sts, Result, Option, Bytes, BitSequence} from './support'

export const Weight: sts.Type<Weight> = sts.struct(() => {
    return  {
        refTime: sts.bigint(),
        proofSize: sts.bigint(),
    }
})

export interface Weight {
    refTime: bigint
    proofSize: bigint
}

export const HistorySize = sts.bigint()

export interface BlockMessages {
    outbox: [ChainId, [bigint, bigint], MessageWeightTag][]
    inboxResponses: [ChainId, [bigint, bigint], MessageWeightTag][]
}

export type MessageWeightTag = MessageWeightTag_EndpointRequest | MessageWeightTag_EndpointResponse | MessageWeightTag_None | MessageWeightTag_ProtocolChannelClose | MessageWeightTag_ProtocolChannelOpen

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

export interface MessageWeightTag_ProtocolChannelClose {
    __kind: 'ProtocolChannelClose'
}

export interface MessageWeightTag_ProtocolChannelOpen {
    __kind: 'ProtocolChannelOpen'
}

export type Endpoint = Endpoint_Id

export interface Endpoint_Id {
    __kind: 'Id'
    value: bigint
}

export const BlockMessages: sts.Type<BlockMessages> = sts.struct(() => {
    return  {
        outbox: sts.array(() => sts.tuple(() => [ChainId, sts.tuple(() => [sts.bigint(), sts.bigint()]), MessageWeightTag])),
        inboxResponses: sts.array(() => sts.tuple(() => [ChainId, sts.tuple(() => [sts.bigint(), sts.bigint()]), MessageWeightTag])),
    }
})

export const MessageWeightTag: sts.Type<MessageWeightTag> = sts.closedEnum(() => {
    return  {
        EndpointRequest: Endpoint,
        EndpointResponse: Endpoint,
        None: sts.unit(),
        ProtocolChannelClose: sts.unit(),
        ProtocolChannelOpen: sts.unit(),
    }
})

export const Endpoint: sts.Type<Endpoint> = sts.closedEnum(() => {
    return  {
        Id: sts.bigint(),
    }
})

export interface Message {
    srcChainId: ChainId
    dstChainId: ChainId
    channelId: bigint
    nonce: bigint
    payload: VersionedPayload
    lastDeliveredMessageResponseNonce?: (bigint | undefined)
}

export type VersionedPayload = VersionedPayload_V0

export interface VersionedPayload_V0 {
    __kind: 'V0'
    value: Payload
}

export type Payload = Payload_Endpoint | Payload_Protocol

export interface Payload_Endpoint {
    __kind: 'Endpoint'
    value: Type_282
}

export interface Payload_Protocol {
    __kind: 'Protocol'
    value: RequestResponse
}

export type RequestResponse = RequestResponse_Request | RequestResponse_Response

export interface RequestResponse_Request {
    __kind: 'Request'
    value: ProtocolMessageRequest
}

export interface RequestResponse_Response {
    __kind: 'Response'
    value: Result<null, DispatchError>
}

export type DispatchError = DispatchError_Arithmetic | DispatchError_BadOrigin | DispatchError_CannotLookup | DispatchError_ConsumerRemaining | DispatchError_Corruption | DispatchError_Exhausted | DispatchError_Module | DispatchError_NoProviders | DispatchError_Other | DispatchError_RootNotAllowed | DispatchError_Token | DispatchError_TooManyConsumers | DispatchError_Transactional | DispatchError_Unavailable

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

export type TokenError = TokenError_BelowMinimum | TokenError_Blocked | TokenError_CannotCreate | TokenError_CannotCreateHold | TokenError_Frozen | TokenError_FundsUnavailable | TokenError_NotExpendable | TokenError_OnlyProvider | TokenError_UnknownAsset | TokenError_Unsupported

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

export type ArithmeticError = ArithmeticError_DivisionByZero | ArithmeticError_Overflow | ArithmeticError_Underflow

export interface ArithmeticError_DivisionByZero {
    __kind: 'DivisionByZero'
}

export interface ArithmeticError_Overflow {
    __kind: 'Overflow'
}

export interface ArithmeticError_Underflow {
    __kind: 'Underflow'
}

export type ProtocolMessageRequest = ProtocolMessageRequest_ChannelClose | ProtocolMessageRequest_ChannelOpen

export interface ProtocolMessageRequest_ChannelClose {
    __kind: 'ChannelClose'
}

export interface ProtocolMessageRequest_ChannelOpen {
    __kind: 'ChannelOpen'
    value: InitiateChannelParams
}

export interface InitiateChannelParams {
    maxOutgoingMessages: number
    feeModel: FeeModel
}

export interface FeeModel {
    relayFee: bigint
}

export type Type_282 = Type_282_Request | Type_282_Response

export interface Type_282_Request {
    __kind: 'Request'
    value: EndpointRequest
}

export interface Type_282_Response {
    __kind: 'Response'
    value: Result<Bytes, DispatchError>
}

export interface EndpointRequest {
    srcEndpoint: Endpoint
    dstEndpoint: Endpoint
    payload: Bytes
}

export const Message: sts.Type<Message> = sts.struct(() => {
    return  {
        srcChainId: ChainId,
        dstChainId: ChainId,
        channelId: sts.bigint(),
        nonce: sts.bigint(),
        payload: VersionedPayload,
        lastDeliveredMessageResponseNonce: sts.option(() => sts.bigint()),
    }
})

export const VersionedPayload: sts.Type<VersionedPayload> = sts.closedEnum(() => {
    return  {
        V0: Payload,
    }
})

export const Payload: sts.Type<Payload> = sts.closedEnum(() => {
    return  {
        Endpoint: Type_282,
        Protocol: RequestResponse,
    }
})

export const RequestResponse: sts.Type<RequestResponse> = sts.closedEnum(() => {
    return  {
        Request: ProtocolMessageRequest,
        Response: sts.result(() => sts.unit(), () => DispatchError),
    }
})

export const ProtocolMessageRequest: sts.Type<ProtocolMessageRequest> = sts.closedEnum(() => {
    return  {
        ChannelClose: sts.unit(),
        ChannelOpen: InitiateChannelParams,
    }
})

export const Type_282: sts.Type<Type_282> = sts.closedEnum(() => {
    return  {
        Request: EndpointRequest,
        Response: sts.result(() => sts.bytes(), () => DispatchError),
    }
})

export const EndpointRequest: sts.Type<EndpointRequest> = sts.struct(() => {
    return  {
        srcEndpoint: Endpoint,
        dstEndpoint: Endpoint,
        payload: sts.bytes(),
    }
})

export interface Channel {
    channelId: bigint
    state: ChannelState
    nextInboxNonce: bigint
    nextOutboxNonce: bigint
    latestResponseReceivedMessageNonce?: (bigint | undefined)
    maxOutgoingMessages: number
    fee: FeeModel
}

export type ChannelState = ChannelState_Closed | ChannelState_Initiated | ChannelState_Open

export interface ChannelState_Closed {
    __kind: 'Closed'
}

export interface ChannelState_Initiated {
    __kind: 'Initiated'
}

export interface ChannelState_Open {
    __kind: 'Open'
}

export const Channel: sts.Type<Channel> = sts.struct(() => {
    return  {
        channelId: sts.bigint(),
        state: ChannelState,
        nextInboxNonce: sts.bigint(),
        nextOutboxNonce: sts.bigint(),
        latestResponseReceivedMessageNonce: sts.option(() => sts.bigint()),
        maxOutgoingMessages: sts.number(),
        fee: FeeModel,
    }
})

export const FeeModel: sts.Type<FeeModel> = sts.struct(() => {
    return  {
        relayFee: sts.bigint(),
    }
})

export const ChannelState: sts.Type<ChannelState> = sts.closedEnum(() => {
    return  {
        Closed: sts.unit(),
        Initiated: sts.unit(),
        Open: sts.unit(),
    }
})

export type ChainId = ChainId_Consensus | ChainId_Domain

export interface ChainId_Consensus {
    __kind: 'Consensus'
}

export interface ChainId_Domain {
    __kind: 'Domain'
    value: DomainId
}

export interface TxRangeState {
    txRange: U256
    intervalBlocks: bigint
    intervalBundles: bigint
}

export type U256 = bigint

export const TxRangeState: sts.Type<TxRangeState> = sts.struct(() => {
    return  {
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
    return  {
        operators: sts.array(() => sts.tuple(() => [sts.bigint(), sts.bigint()])),
        totalDomainStake: sts.bigint(),
    }
})

export interface BundleDigest {
    headerHash: H256
    extrinsicsRoot: H256
}

export const BundleDigest: sts.Type<BundleDigest> = sts.struct(() => {
    return  {
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
    totalRewards: bigint
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

export type InvalidBundleType = InvalidBundleType_IllegalTx | InvalidBundleType_InherentExtrinsic | InvalidBundleType_InvalidXDM | InvalidBundleType_OutOfRangeTx | InvalidBundleType_UndecodableTx

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
    return  {
        executionReceipt: ExecutionReceipt,
        operatorIds: sts.array(() => sts.bigint()),
    }
})

export const ExecutionReceipt: sts.Type<ExecutionReceipt> = sts.struct(() => {
    return  {
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
        totalRewards: sts.bigint(),
    }
})

export const InboxedBundle: sts.Type<InboxedBundle> = sts.struct(() => {
    return  {
        bundle: BundleValidity,
        extrinsicsRoot: H256,
    }
})

export const BundleValidity: sts.Type<BundleValidity> = sts.closedEnum(() => {
    return  {
        Invalid: InvalidBundleType,
        Valid: H256,
    }
})

export const InvalidBundleType: sts.Type<InvalidBundleType> = sts.closedEnum(() => {
    return  {
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
    return  {
        ownerAccountId: AccountId32,
        createdAt: sts.number(),
        genesisReceiptHash: H256,
        domainConfig: DomainConfig,
    }
})

export interface PendingOperatorSlashInfo {
    unlockingNominators: PendingNominatorUnlock[]
}

export const PendingOperatorSlashInfo: sts.Type<PendingOperatorSlashInfo> = sts.struct(() => {
    return  {
        unlockingNominators: sts.array(() => PendingNominatorUnlock),
    }
})

export interface PendingNominatorUnlock {
    nominatorId: AccountId32
    balance: bigint
}

export const PendingNominatorUnlock: sts.Type<PendingNominatorUnlock> = sts.struct(() => {
    return  {
        nominatorId: AccountId32,
        balance: sts.bigint(),
    }
})

export type Withdraw = Withdraw_All | Withdraw_Some

export interface Withdraw_All {
    __kind: 'All'
}

export interface Withdraw_Some {
    __kind: 'Some'
    value: bigint
}

export interface Nominator {
    shares: bigint
}

export const Nominator: sts.Type<Nominator> = sts.struct(() => {
    return  {
        shares: sts.bigint(),
    }
})

export interface Operator {
    signingKey: Bytes
    currentDomainId: DomainId
    nextDomainId: DomainId
    minimumNominatorStake: bigint
    nominationTax: Percent
    currentTotalStake: bigint
    currentEpochRewards: bigint
    totalShares: bigint
    status: OperatorStatus
}

export type OperatorStatus = OperatorStatus_Deregistered | OperatorStatus_Registered | OperatorStatus_Slashed

export interface OperatorStatus_Deregistered {
    __kind: 'Deregistered'
}

export interface OperatorStatus_Registered {
    __kind: 'Registered'
}

export interface OperatorStatus_Slashed {
    __kind: 'Slashed'
}

export type Percent = number

export const Operator: sts.Type<Operator> = sts.struct(() => {
    return  {
        signingKey: sts.bytes(),
        currentDomainId: DomainId,
        nextDomainId: DomainId,
        minimumNominatorStake: sts.bigint(),
        nominationTax: Percent,
        currentTotalStake: sts.bigint(),
        currentEpochRewards: sts.bigint(),
        totalShares: sts.bigint(),
        status: OperatorStatus,
    }
})

export const OperatorStatus: sts.Type<OperatorStatus> = sts.closedEnum(() => {
    return  {
        Deregistered: sts.unit(),
        Registered: sts.unit(),
        Slashed: sts.unit(),
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
    return  {
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

export interface RuntimeVersion {
    specName: string
    implName: string
    authoringVersion: number
    specVersion: number
    implVersion: number
    apis: [Bytes, number][]
    transactionVersion: number
    stateVersion: number
}

export interface RawGenesis {
    top: [StorageKey, StorageData][]
    childrenDefault: [StorageKey, [StorageKey, StorageData][]][]
}

export type StorageData = Bytes

export type StorageKey = Bytes

export const ScheduledRuntimeUpgrade: sts.Type<ScheduledRuntimeUpgrade> = sts.struct(() => {
    return  {
        rawGenesis: RawGenesis,
        version: RuntimeVersion,
        hash: H256,
    }
})

export const RuntimeVersion: sts.Type<RuntimeVersion> = sts.struct(() => {
    return  {
        specName: sts.string(),
        implName: sts.string(),
        authoringVersion: sts.number(),
        specVersion: sts.number(),
        implVersion: sts.number(),
        apis: sts.array(() => sts.tuple(() => [sts.bytes(), sts.number()])),
        transactionVersion: sts.number(),
        stateVersion: sts.number(),
    }
})

export const RawGenesis: sts.Type<RawGenesis> = sts.struct(() => {
    return  {
        top: sts.array(() => sts.tuple(() => [StorageKey, StorageData])),
        childrenDefault: sts.array(() => sts.tuple(() => [StorageKey, sts.array(() => sts.tuple(() => [StorageKey, StorageData]))])),
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
    return  {
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

export type H256 = Bytes

export interface Type_149 {
    amount: bigint
}

export const Type_149: sts.Type<Type_149> = sts.struct(() => {
    return  {
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

export type DomainsHoldIdentifier = DomainsHoldIdentifier_DomainInstantiation | DomainsHoldIdentifier_Staking

export interface DomainsHoldIdentifier_DomainInstantiation {
    __kind: 'DomainInstantiation'
    value: DomainId
}

export interface DomainsHoldIdentifier_Staking {
    __kind: 'Staking'
    value: StakingHoldIdentifier
}

export type StakingHoldIdentifier = StakingHoldIdentifier_PendingDeposit | StakingHoldIdentifier_PendingUnlock | StakingHoldIdentifier_Staked

export interface StakingHoldIdentifier_PendingDeposit {
    __kind: 'PendingDeposit'
    value: bigint
}

export interface StakingHoldIdentifier_PendingUnlock {
    __kind: 'PendingUnlock'
    value: bigint
}

export interface StakingHoldIdentifier_Staked {
    __kind: 'Staked'
    value: bigint
}

export const IdAmount: sts.Type<IdAmount> = sts.struct(() => {
    return  {
        id: HoldIdentifier,
        amount: sts.bigint(),
    }
})

export const HoldIdentifier: sts.Type<HoldIdentifier> = sts.closedEnum(() => {
    return  {
        Domains: DomainsHoldIdentifier,
    }
})

export const DomainsHoldIdentifier: sts.Type<DomainsHoldIdentifier> = sts.closedEnum(() => {
    return  {
        DomainInstantiation: DomainId,
        Staking: StakingHoldIdentifier,
    }
})

export const StakingHoldIdentifier: sts.Type<StakingHoldIdentifier> = sts.closedEnum(() => {
    return  {
        PendingDeposit: sts.bigint(),
        PendingUnlock: sts.bigint(),
        Staked: sts.bigint(),
    }
})

export interface ReserveData {
    id: Bytes
    amount: bigint
}

export const ReserveData: sts.Type<ReserveData> = sts.struct(() => {
    return  {
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
    return  {
        id: sts.bytes(),
        amount: sts.bigint(),
        reasons: Reasons,
    }
})

export const Reasons: sts.Type<Reasons> = sts.closedEnum(() => {
    return  {
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
    return  {
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
    targetSlot?: (Slot | undefined)
    entropy: Bytes
}

export const PotEntropyValue: sts.Type<PotEntropyValue> = sts.struct(() => {
    return  {
        targetSlot: sts.option(() => Slot),
        entropy: sts.bytes(),
    }
})

export type Signature = Bytes

export const Signature = sts.bytes()

export type AccountId32 = Bytes

export interface Scalar {
    inner: Bytes
}

export type PieceOffset = number

export const Scalar: sts.Type<Scalar> = sts.struct(() => {
    return  {
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
    return  {
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
    return  {
        solutionRange: sts.bigint(),
        votingSolutionRange: sts.bigint(),
    }
})

export interface SolutionRanges {
    current: bigint
    next?: (bigint | undefined)
    votingCurrent: bigint
    votingNext?: (bigint | undefined)
}

export const SolutionRanges: sts.Type<SolutionRanges> = sts.struct(() => {
    return  {
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

export const CrossDomainMessage: sts.Type<CrossDomainMessage> = sts.struct(() => {
    return  {
        srcChainId: ChainId,
        dstChainId: ChainId,
        channelId: sts.bigint(),
        nonce: sts.bigint(),
        proof: Proof,
        weightTag: MessageWeightTag,
    }
})

export const Proof: sts.Type<Proof> = sts.struct(() => {
    return  {
        consensusChainBlockInfo: BlockInfo,
        consensusChainStateRoot: H256,
        domainProof: sts.option(() => sts.tuple(() => [BlockInfo, StorageProof])),
        messageProof: StorageProof,
    }
})

export const StorageProof: sts.Type<StorageProof> = sts.struct(() => {
    return  {
        trieNodes: sts.array(() => sts.bytes()),
    }
})

export interface StorageProof {
    trieNodes: Bytes[]
}

export const BlockInfo: sts.Type<BlockInfo> = sts.struct(() => {
    return  {
        blockNumber: sts.number(),
        blockHash: H256,
    }
})

export interface BlockInfo {
    blockNumber: number
    blockHash: H256
}

export interface Proof {
    consensusChainBlockInfo: BlockInfo
    consensusChainStateRoot: H256
    domainProof?: ([BlockInfo, StorageProof] | undefined)
    messageProof: StorageProof
}

export interface CrossDomainMessage {
    srcChainId: ChainId
    dstChainId: ChainId
    channelId: bigint
    nonce: bigint
    proof: Proof
    weightTag: MessageWeightTag
}

export const InitiateChannelParams: sts.Type<InitiateChannelParams> = sts.struct(() => {
    return  {
        maxOutgoingMessages: sts.number(),
        feeModel: FeeModel,
    }
})

export const OperatorAllowList: sts.Type<OperatorAllowList> = sts.closedEnum(() => {
    return  {
        Anyone: sts.unit(),
        Operators: sts.array(() => AccountId32),
    }
})

export const Withdraw: sts.Type<Withdraw> = sts.closedEnum(() => {
    return  {
        All: sts.unit(),
        Some: sts.bigint(),
    }
})

export const DomainConfig: sts.Type<DomainConfig> = sts.struct(() => {
    return  {
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
    return  {
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
    return  {
        BundleEquivocation: BundleEquivocationProof,
        ImproperTransactionSortition: ImproperTransactionSortitionProof,
        InvalidBundles: InvalidBundlesFraudProof,
        InvalidDomainBlockHash: InvalidDomainBlockHashProof,
        InvalidExtrinsicsRoot: InvalidExtrinsicsRootProof,
        InvalidStateTransition: InvalidStateTransitionProof,
        InvalidTotalRewards: InvalidTotalRewardsProof,
        InvalidTransaction: InvalidTransactionProof,
        ValidBundle: ValidBundleProof,
    }
})

export const ValidBundleProof: sts.Type<ValidBundleProof> = sts.struct(() => {
    return  {
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
    return  {
        domainId: DomainId,
        badReceiptHash: H256,
        domainBlockNumber: sts.number(),
        domainBlockHash: H256,
        invalidExtrinsic: sts.bytes(),
        storageProof: StorageProof,
    }
})

export interface InvalidTransactionProof {
    domainId: DomainId
    badReceiptHash: H256
    domainBlockNumber: number
    domainBlockHash: H256
    invalidExtrinsic: Bytes
    storageProof: StorageProof
}

export const InvalidTotalRewardsProof: sts.Type<InvalidTotalRewardsProof> = sts.struct(() => {
    return  {
        domainId: DomainId,
        badReceiptHash: H256,
        storageProof: StorageProof,
    }
})

export interface InvalidTotalRewardsProof {
    domainId: DomainId
    badReceiptHash: H256
    storageProof: StorageProof
}

export const InvalidStateTransitionProof: sts.Type<InvalidStateTransitionProof> = sts.struct(() => {
    return  {
        domainId: DomainId,
        badReceiptHash: H256,
        proof: StorageProof,
        executionPhase: ExecutionPhase,
    }
})

export const ExecutionPhase: sts.Type<ExecutionPhase> = sts.closedEnum(() => {
    return  {
        ApplyExtrinsic: sts.enumStruct({
            proofOfInclusion: StorageProof,
            mismatchIndex: sts.number(),
            extrinsic: sts.bytes(),
        }),
        FinalizeBlock: sts.unit(),
        InitializeBlock: sts.unit(),
    }
})

export type ExecutionPhase = ExecutionPhase_ApplyExtrinsic | ExecutionPhase_FinalizeBlock | ExecutionPhase_InitializeBlock

export interface ExecutionPhase_ApplyExtrinsic {
    __kind: 'ApplyExtrinsic'
    proofOfInclusion: StorageProof
    mismatchIndex: number
    extrinsic: Bytes
}

export interface ExecutionPhase_FinalizeBlock {
    __kind: 'FinalizeBlock'
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
    return  {
        domainId: DomainId,
        badReceiptHash: H256,
        validBundleDigests: sts.array(() => ValidBundleDigest),
    }
})

export const ValidBundleDigest: sts.Type<ValidBundleDigest> = sts.struct(() => {
    return  {
        bundleIndex: sts.number(),
        bundleDigest: sts.array(() => sts.tuple(() => [sts.option(() => sts.bytes()), ExtrinsicDigest])),
    }
})

export const ExtrinsicDigest: sts.Type<ExtrinsicDigest> = sts.closedEnum(() => {
    return  {
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
    bundleDigest: [(Bytes | undefined), ExtrinsicDigest][]
}

export interface InvalidExtrinsicsRootProof {
    domainId: DomainId
    badReceiptHash: H256
    validBundleDigests: ValidBundleDigest[]
}

export const InvalidDomainBlockHashProof: sts.Type<InvalidDomainBlockHashProof> = sts.struct(() => {
    return  {
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
    return  {
        badReceiptHash: H256,
        domainId: DomainId,
        bundleIndex: sts.number(),
        invalidBundleType: InvalidBundleType,
        extrinsicInclusionProof: StorageProof,
        isTrueInvalidFraudProof: sts.boolean(),
    }
})

export interface InvalidBundlesFraudProof {
    badReceiptHash: H256
    domainId: DomainId
    bundleIndex: number
    invalidBundleType: InvalidBundleType
    extrinsicInclusionProof: StorageProof
    isTrueInvalidFraudProof: boolean
}

export const ImproperTransactionSortitionProof: sts.Type<ImproperTransactionSortitionProof> = sts.struct(() => {
    return  {
        domainId: DomainId,
        badReceiptHash: H256,
    }
})

export interface ImproperTransactionSortitionProof {
    domainId: DomainId
    badReceiptHash: H256
}

export const BundleEquivocationProof: sts.Type<BundleEquivocationProof> = sts.struct(() => {
    return  {
        domainId: DomainId,
        offender: AccountId32,
        slot: Slot,
        firstHeader: SealedBundleHeader,
        secondHeader: SealedBundleHeader,
    }
})

export const SealedBundleHeader: sts.Type<SealedBundleHeader> = sts.struct(() => {
    return  {
        header: BundleHeader,
        signature: sts.bytes(),
    }
})

export const BundleHeader: sts.Type<BundleHeader> = sts.struct(() => {
    return  {
        proofOfElection: ProofOfElection,
        receipt: ExecutionReceipt,
        bundleSize: sts.number(),
        estimatedBundleWeight: Weight,
        bundleExtrinsicsRoot: H256,
    }
})

export const ProofOfElection: sts.Type<ProofOfElection> = sts.struct(() => {
    return  {
        domainId: DomainId,
        slotNumber: sts.bigint(),
        globalRandomness: Randomness,
        vrfSignature: VrfSignature,
        operatorId: sts.bigint(),
    }
})

export const VrfSignature: sts.Type<VrfSignature> = sts.struct(() => {
    return  {
        output: sts.bytes(),
        proof: sts.bytes(),
    }
})

export interface VrfSignature {
    output: Bytes
    proof: Bytes
}

export interface ProofOfElection {
    domainId: DomainId
    slotNumber: bigint
    globalRandomness: Randomness
    vrfSignature: VrfSignature
    operatorId: bigint
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
    offender: AccountId32
    slot: Slot
    firstHeader: SealedBundleHeader
    secondHeader: SealedBundleHeader
}

export type FraudProof = FraudProof_BundleEquivocation | FraudProof_ImproperTransactionSortition | FraudProof_InvalidBundles | FraudProof_InvalidDomainBlockHash | FraudProof_InvalidExtrinsicsRoot | FraudProof_InvalidStateTransition | FraudProof_InvalidTotalRewards | FraudProof_InvalidTransaction | FraudProof_ValidBundle

export interface FraudProof_BundleEquivocation {
    __kind: 'BundleEquivocation'
    value: BundleEquivocationProof
}

export interface FraudProof_ImproperTransactionSortition {
    __kind: 'ImproperTransactionSortition'
    value: ImproperTransactionSortitionProof
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

export interface FraudProof_InvalidTotalRewards {
    __kind: 'InvalidTotalRewards'
    value: InvalidTotalRewardsProof
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
    return  {
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
    return  {
        Address20: sts.bytes(),
        Address32: sts.bytes(),
        Id: AccountId32,
        Index: sts.unit(),
        Raw: sts.bytes(),
    }
})

export type MultiAddress = MultiAddress_Address20 | MultiAddress_Address32 | MultiAddress_Id | MultiAddress_Index | MultiAddress_Raw

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

export const SignedVote: sts.Type<SignedVote> = sts.struct(() => {
    return  {
        vote: Vote,
        signature: Signature,
    }
})

export const Vote: sts.Type<Vote> = sts.closedEnum(() => {
    return  {
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
    return  {
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
    return  {
        offender: Public,
        slot: Slot,
        firstHeader: Header,
        secondHeader: Header,
    }
})

export const Header: sts.Type<Header> = sts.struct(() => {
    return  {
        parentHash: H256,
        number: sts.number(),
        stateRoot: H256,
        extrinsicsRoot: H256,
        digest: Digest,
    }
})

export const Digest: sts.Type<Digest> = sts.struct(() => {
    return  {
        logs: sts.array(() => DigestItem),
    }
})

export const DigestItem: sts.Type<DigestItem> = sts.closedEnum(() => {
    return  {
        Consensus: sts.tuple(() => [sts.bytes(), sts.bytes()]),
        Other: sts.bytes(),
        PreRuntime: sts.tuple(() => [sts.bytes(), sts.bytes()]),
        RuntimeEnvironmentUpdated: sts.unit(),
        Seal: sts.tuple(() => [sts.bytes(), sts.bytes()]),
    }
})

export type DigestItem = DigestItem_Consensus | DigestItem_Other | DigestItem_PreRuntime | DigestItem_RuntimeEnvironmentUpdated | DigestItem_Seal

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

export interface Digest {
    logs: DigestItem[]
}

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

export const OutboxMessageResult = sts.result(() => sts.unit(), () => DispatchError)

export const DispatchError: sts.Type<DispatchError> = sts.closedEnum(() => {
    return  {
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
    return  {
        LimitReached: sts.unit(),
        NoLayer: sts.unit(),
    }
})

export const TokenError: sts.Type<TokenError> = sts.closedEnum(() => {
    return  {
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
    return  {
        index: sts.number(),
        error: sts.bytes(),
    }
})

export const ArithmeticError: sts.Type<ArithmeticError> = sts.closedEnum(() => {
    return  {
        DivisionByZero: sts.unit(),
        Overflow: sts.unit(),
        Underflow: sts.unit(),
    }
})

export const ChainId: sts.Type<ChainId> = sts.closedEnum(() => {
    return  {
        Consensus: sts.unit(),
        Domain: DomainId,
    }
})

export const RuntimeType: sts.Type<RuntimeType> = sts.closedEnum(() => {
    return  {
        Evm: sts.unit(),
    }
})

export const DomainId = sts.number()

export const BalanceStatus: sts.Type<BalanceStatus> = sts.closedEnum(() => {
    return  {
        Free: sts.unit(),
        Reserved: sts.unit(),
    }
})

export type BalanceStatus = BalanceStatus_Free | BalanceStatus_Reserved

export interface BalanceStatus_Free {
    __kind: 'Free'
}

export interface BalanceStatus_Reserved {
    __kind: 'Reserved'
}

export const H256 = sts.bytes()

export const AccountId32 = sts.bytes()

export const Public = sts.bytes()

export const SegmentHeader: sts.Type<SegmentHeader> = sts.closedEnum(() => {
    return  {
        V0: sts.enumStruct({
            segmentIndex: SegmentIndex,
            segmentCommitment: SegmentCommitment,
            prevSegmentHeaderHash: sts.bytes(),
            lastArchivedBlock: LastArchivedBlock,
        }),
    }
})

export const LastArchivedBlock: sts.Type<LastArchivedBlock> = sts.struct(() => {
    return  {
        number: sts.number(),
        archivedProgress: ArchivedBlockProgress,
    }
})

export const ArchivedBlockProgress: sts.Type<ArchivedBlockProgress> = sts.closedEnum(() => {
    return  {
        Complete: sts.unit(),
        Partial: sts.number(),
    }
})

export type ArchivedBlockProgress = ArchivedBlockProgress_Complete | ArchivedBlockProgress_Partial

export interface ArchivedBlockProgress_Complete {
    __kind: 'Complete'
}

export interface ArchivedBlockProgress_Partial {
    __kind: 'Partial'
    value: number
}

export interface LastArchivedBlock {
    number: number
    archivedProgress: ArchivedBlockProgress
}

export type SegmentHeader = SegmentHeader_V0

export interface SegmentHeader_V0 {
    __kind: 'V0'
    segmentIndex: SegmentIndex
    segmentCommitment: SegmentCommitment
    prevSegmentHeaderHash: Bytes
    lastArchivedBlock: LastArchivedBlock
}
