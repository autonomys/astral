import {sts, Result, Option, Bytes, BitSequence} from './support'

export interface RewardPoint {
    block: number
    subsidy: bigint
}

export interface DomainAllowlistUpdates {
    allowChains: ChainId[]
    removeChains: ChainId[]
}

export type ChainId = ChainId_Consensus | ChainId_Domain

export interface ChainId_Consensus {
    __kind: 'Consensus'
}

export interface ChainId_Domain {
    __kind: 'Domain'
    value: DomainId
}

export interface Channel {
    channelId: bigint
    state: ChannelState
    nextInboxNonce: bigint
    nextOutboxNonce: bigint
    latestResponseReceivedMessageNonce?: (bigint | undefined)
    maxOutgoingMessages: number
    fee: FeeModel
    maybeOwner?: (AccountId32 | undefined)
}

export interface FeeModel {
    relayFee: bigint
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
        maybeOwner: sts.option(() => AccountId32),
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

export const ChainId: sts.Type<ChainId> = sts.closedEnum(() => {
    return  {
        Consensus: sts.unit(),
        Domain: DomainId,
    }
})

export type DomainId = number

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
    totalStorageFeeDeposit: bigint
}

export type OperatorStatus = OperatorStatus_Deregistered | OperatorStatus_PendingSlash | OperatorStatus_Registered | OperatorStatus_Slashed

export interface OperatorStatus_Deregistered {
    __kind: 'Deregistered'
    value: OperatorDeregisteredInfo
}

export interface OperatorStatus_PendingSlash {
    __kind: 'PendingSlash'
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

export type DomainEpoch = [DomainId, number]

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
        currentTotalShares: sts.bigint(),
        status: OperatorStatus,
        depositsInEpoch: sts.bigint(),
        withdrawalsInEpoch: sts.bigint(),
        totalStorageFeeDeposit: sts.bigint(),
    }
})

export const OperatorStatus: sts.Type<OperatorStatus> = sts.closedEnum(() => {
    return  {
        Deregistered: OperatorDeregisteredInfo,
        PendingSlash: sts.unit(),
        Registered: sts.unit(),
        Slashed: sts.unit(),
    }
})

export const OperatorDeregisteredInfo: sts.Type<OperatorDeregisteredInfo> = sts.struct(() => {
    return  {
        domainEpoch: DomainEpoch,
        unlockAtConfirmedDomainBlockNumber: sts.number(),
    }
})

export const DomainEpoch = sts.tuple(() => [DomainId, sts.number()])

export const Percent = sts.number()

export type AccountId32 = Bytes

export interface IdAmount {
    id: HoldIdentifier
    amount: bigint
}

export type HoldIdentifier = HoldIdentifier_Domains | HoldIdentifier_Messenger

export interface HoldIdentifier_Domains {
    __kind: 'Domains'
    value: DomainsHoldIdentifier
}

export interface HoldIdentifier_Messenger {
    __kind: 'Messenger'
    value: MessengerHoldIdentifier
}

export type MessengerHoldIdentifier = MessengerHoldIdentifier_Channel

export interface MessengerHoldIdentifier_Channel {
    __kind: 'Channel'
    value: [ChainId, bigint]
}

export type DomainsHoldIdentifier = DomainsHoldIdentifier_DomainInstantiation | DomainsHoldIdentifier_Staking | DomainsHoldIdentifier_StorageFund

export interface DomainsHoldIdentifier_DomainInstantiation {
    __kind: 'DomainInstantiation'
    value: DomainId
}

export interface DomainsHoldIdentifier_Staking {
    __kind: 'Staking'
    value: StakingHoldIdentifier
}

export interface DomainsHoldIdentifier_StorageFund {
    __kind: 'StorageFund'
    value: bigint
}

export type StakingHoldIdentifier = StakingHoldIdentifier_Staked

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
        Messenger: MessengerHoldIdentifier,
    }
})

export const MessengerHoldIdentifier: sts.Type<MessengerHoldIdentifier> = sts.closedEnum(() => {
    return  {
        Channel: sts.tuple(() => [ChainId, sts.bigint()]),
    }
})

export const DomainsHoldIdentifier: sts.Type<DomainsHoldIdentifier> = sts.closedEnum(() => {
    return  {
        DomainInstantiation: DomainId,
        Staking: StakingHoldIdentifier,
        StorageFund: sts.bigint(),
    }
})

export const StakingHoldIdentifier: sts.Type<StakingHoldIdentifier> = sts.closedEnum(() => {
    return  {
        Staked: sts.bigint(),
    }
})

export const AccountId32 = sts.bytes()

export type Slot = bigint

export const Slot = sts.bigint()

export const RewardPoint: sts.Type<RewardPoint> = sts.struct(() => {
    return  {
        block: sts.number(),
        subsidy: sts.bigint(),
    }
})

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

export const DomainAllowlistUpdates: sts.Type<DomainAllowlistUpdates> = sts.struct(() => {
    return  {
        allowChains: sts.array(() => ChainId),
        removeChains: sts.array(() => ChainId),
    }
})

export const DomainId = sts.number()

export const ChainAllowlistUpdate: sts.Type<ChainAllowlistUpdate> = sts.closedEnum(() => {
    return  {
        Add: ChainId,
        Remove: ChainId,
    }
})

export type ChainAllowlistUpdate = ChainAllowlistUpdate_Add | ChainAllowlistUpdate_Remove

export interface ChainAllowlistUpdate_Add {
    __kind: 'Add'
    value: ChainId
}

export interface ChainAllowlistUpdate_Remove {
    __kind: 'Remove'
    value: ChainId
}

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

export type Endpoint = Endpoint_Id

export interface Endpoint_Id {
    __kind: 'Id'
    value: bigint
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

export const Proof: sts.Type<Proof> = sts.closedEnum(() => {
    return  {
        Consensus: sts.enumStruct({
            consensusChainMmrProof: ConsensusChainMmrLeafProof,
            messageProof: StorageProof,
        }),
        Domain: sts.enumStruct({
            consensusChainMmrProof: ConsensusChainMmrLeafProof,
            domainProof: StorageProof,
            messageProof: StorageProof,
        }),
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

export const ConsensusChainMmrLeafProof: sts.Type<ConsensusChainMmrLeafProof> = sts.struct(() => {
    return  {
        consensusBlockHash: H256,
        opaqueMmrLeaf: EncodableOpaqueLeaf,
        proof: Type_237,
    }
})

export const Type_237: sts.Type<Type_237> = sts.struct(() => {
    return  {
        leafIndices: sts.array(() => sts.bigint()),
        leafCount: sts.bigint(),
        items: sts.array(() => H256),
    }
})

export interface Type_237 {
    leafIndices: bigint[]
    leafCount: bigint
    items: H256[]
}

export type H256 = Bytes

export const EncodableOpaqueLeaf = sts.bytes()

export const H256 = sts.bytes()

export interface ConsensusChainMmrLeafProof {
    consensusBlockHash: H256
    opaqueMmrLeaf: EncodableOpaqueLeaf
    proof: Type_237
}

export type EncodableOpaqueLeaf = Bytes

export type Proof = Proof_Consensus | Proof_Domain

export interface Proof_Consensus {
    __kind: 'Consensus'
    consensusChainMmrProof: ConsensusChainMmrLeafProof
    messageProof: StorageProof
}

export interface Proof_Domain {
    __kind: 'Domain'
    consensusChainMmrProof: ConsensusChainMmrLeafProof
    domainProof: StorageProof
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

export const OriginCaller: sts.Type<OriginCaller> = sts.closedEnum(() => {
    return  {
        Void: Void,
        system: RawOrigin,
    }
})

export const RawOrigin: sts.Type<RawOrigin> = sts.closedEnum(() => {
    return  {
        None: sts.unit(),
        Root: sts.unit(),
        Signed: AccountId32,
    }
})

export type RawOrigin = RawOrigin_None | RawOrigin_Root | RawOrigin_Signed

export interface RawOrigin_None {
    __kind: 'None'
}

export interface RawOrigin_Root {
    __kind: 'Root'
}

export interface RawOrigin_Signed {
    __kind: 'Signed'
    value: AccountId32
}

export const Void: sts.Type<Void> = sts.closedEnum(() => {
    return  {
    }
})

export type Void = never

export type OriginCaller = OriginCaller_Void | OriginCaller_system

export interface OriginCaller_Void {
    __kind: 'Void'
    value: Void
}

export interface OriginCaller_system {
    __kind: 'system'
    value: RawOrigin
}

export const Call: sts.Type<Call> = sts.closedEnum(() => {
    return  {
        Balances: BalancesCall,
        Domains: DomainsCall,
        Messenger: MessengerCall,
        Rewards: RewardsCall,
        RuntimeConfigs: RuntimeConfigsCall,
        Subspace: SubspaceCall,
        Sudo: SudoCall,
        System: SystemCall,
        Timestamp: TimestampCall,
        Transporter: TransporterCall,
        Utility: UtilityCall,
        Vesting: VestingCall,
    }
})

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export const VestingCall: sts.Type<VestingCall> = sts.closedEnum(() => {
    return  {
        claim: sts.unit(),
        claim_for: sts.enumStruct({
            dest: MultiAddress,
        }),
        update_vesting_schedules: sts.enumStruct({
            who: MultiAddress,
            vestingSchedules: sts.array(() => VestingSchedule),
        }),
        vested_transfer: sts.enumStruct({
            dest: MultiAddress,
            schedule: VestingSchedule,
        }),
    }
})

export const VestingSchedule: sts.Type<VestingSchedule> = sts.struct(() => {
    return  {
        start: sts.number(),
        period: sts.number(),
        periodCount: sts.number(),
        perPeriod: sts.bigint(),
    }
})

export interface VestingSchedule {
    start: number
    period: number
    periodCount: number
    perPeriod: bigint
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type VestingCall = VestingCall_claim | VestingCall_claim_for | VestingCall_update_vesting_schedules | VestingCall_vested_transfer

/**
 * See [`Pallet::claim`].
 */
export interface VestingCall_claim {
    __kind: 'claim'
}

/**
 * See [`Pallet::claim_for`].
 */
export interface VestingCall_claim_for {
    __kind: 'claim_for'
    dest: MultiAddress
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
 * See [`Pallet::vested_transfer`].
 */
export interface VestingCall_vested_transfer {
    __kind: 'vested_transfer'
    dest: MultiAddress
    schedule: VestingSchedule
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export const UtilityCall: sts.Type<UtilityCall> = sts.closedEnum(() => {
    return  {
        as_derivative: sts.enumStruct({
            index: sts.number(),
            call: Call,
        }),
        batch: sts.enumStruct({
            calls: sts.array(() => Call),
        }),
        batch_all: sts.enumStruct({
            calls: sts.array(() => Call),
        }),
        dispatch_as: sts.enumStruct({
            asOrigin: OriginCaller,
            call: Call,
        }),
        force_batch: sts.enumStruct({
            calls: sts.array(() => Call),
        }),
        with_weight: sts.enumStruct({
            call: Call,
            weight: Weight,
        }),
    }
})

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type UtilityCall = UtilityCall_as_derivative | UtilityCall_batch | UtilityCall_batch_all | UtilityCall_dispatch_as | UtilityCall_force_batch | UtilityCall_with_weight

/**
 * See [`Pallet::as_derivative`].
 */
export interface UtilityCall_as_derivative {
    __kind: 'as_derivative'
    index: number
    call: Call
}

/**
 * See [`Pallet::batch`].
 */
export interface UtilityCall_batch {
    __kind: 'batch'
    calls: Call[]
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
export const TransporterCall: sts.Type<TransporterCall> = sts.closedEnum(() => {
    return  {
        transfer: sts.enumStruct({
            dstLocation: Location,
            amount: sts.bigint(),
        }),
    }
})

export const Location: sts.Type<Location> = sts.struct(() => {
    return  {
        chainId: ChainId,
        accountId: MultiAccountId,
    }
})

export const MultiAccountId: sts.Type<MultiAccountId> = sts.closedEnum(() => {
    return  {
        AccountId20: sts.bytes(),
        AccountId32: sts.bytes(),
        Raw: sts.bytes(),
    }
})

export type MultiAccountId = MultiAccountId_AccountId20 | MultiAccountId_AccountId32 | MultiAccountId_Raw

export interface MultiAccountId_AccountId20 {
    __kind: 'AccountId20'
    value: Bytes
}

export interface MultiAccountId_AccountId32 {
    __kind: 'AccountId32'
    value: Bytes
}

export interface MultiAccountId_Raw {
    __kind: 'Raw'
    value: Bytes
}

export interface Location {
    chainId: ChainId
    accountId: MultiAccountId
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
export const TimestampCall: sts.Type<TimestampCall> = sts.closedEnum(() => {
    return  {
        set: sts.enumStruct({
            now: sts.bigint(),
        }),
    }
})

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
export const SystemCall: sts.Type<SystemCall> = sts.closedEnum(() => {
    return  {
        apply_authorized_upgrade: sts.enumStruct({
            code: sts.bytes(),
        }),
        authorize_upgrade: sts.enumStruct({
            codeHash: H256,
        }),
        authorize_upgrade_without_checks: sts.enumStruct({
            codeHash: H256,
        }),
        kill_prefix: sts.enumStruct({
            prefix: sts.bytes(),
            subkeys: sts.number(),
        }),
        kill_storage: sts.enumStruct({
            keys: sts.array(() => sts.bytes()),
        }),
        remark: sts.enumStruct({
            remark: sts.bytes(),
        }),
        remark_with_event: sts.enumStruct({
            remark: sts.bytes(),
        }),
        set_code: sts.enumStruct({
            code: sts.bytes(),
        }),
        set_code_without_checks: sts.enumStruct({
            code: sts.bytes(),
        }),
        set_heap_pages: sts.enumStruct({
            pages: sts.bigint(),
        }),
        set_storage: sts.enumStruct({
            items: sts.array(() => sts.tuple(() => [sts.bytes(), sts.bytes()])),
        }),
    }
})

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type SystemCall = SystemCall_apply_authorized_upgrade | SystemCall_authorize_upgrade | SystemCall_authorize_upgrade_without_checks | SystemCall_kill_prefix | SystemCall_kill_storage | SystemCall_remark | SystemCall_remark_with_event | SystemCall_set_code | SystemCall_set_code_without_checks | SystemCall_set_heap_pages | SystemCall_set_storage

/**
 * See [`Pallet::apply_authorized_upgrade`].
 */
export interface SystemCall_apply_authorized_upgrade {
    __kind: 'apply_authorized_upgrade'
    code: Bytes
}

/**
 * See [`Pallet::authorize_upgrade`].
 */
export interface SystemCall_authorize_upgrade {
    __kind: 'authorize_upgrade'
    codeHash: H256
}

/**
 * See [`Pallet::authorize_upgrade_without_checks`].
 */
export interface SystemCall_authorize_upgrade_without_checks {
    __kind: 'authorize_upgrade_without_checks'
    codeHash: H256
}

/**
 * See [`Pallet::kill_prefix`].
 */
export interface SystemCall_kill_prefix {
    __kind: 'kill_prefix'
    prefix: Bytes
    subkeys: number
}

/**
 * See [`Pallet::kill_storage`].
 */
export interface SystemCall_kill_storage {
    __kind: 'kill_storage'
    keys: Bytes[]
}

/**
 * See [`Pallet::remark`].
 */
export interface SystemCall_remark {
    __kind: 'remark'
    remark: Bytes
}

/**
 * See [`Pallet::remark_with_event`].
 */
export interface SystemCall_remark_with_event {
    __kind: 'remark_with_event'
    remark: Bytes
}

/**
 * See [`Pallet::set_code`].
 */
export interface SystemCall_set_code {
    __kind: 'set_code'
    code: Bytes
}

/**
 * See [`Pallet::set_code_without_checks`].
 */
export interface SystemCall_set_code_without_checks {
    __kind: 'set_code_without_checks'
    code: Bytes
}

/**
 * See [`Pallet::set_heap_pages`].
 */
export interface SystemCall_set_heap_pages {
    __kind: 'set_heap_pages'
    pages: bigint
}

/**
 * See [`Pallet::set_storage`].
 */
export interface SystemCall_set_storage {
    __kind: 'set_storage'
    items: [Bytes, Bytes][]
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export const SudoCall: sts.Type<SudoCall> = sts.closedEnum(() => {
    return  {
        remove_key: sts.unit(),
        set_key: sts.enumStruct({
            new: MultiAddress,
        }),
        sudo: sts.enumStruct({
            call: Call,
        }),
        sudo_as: sts.enumStruct({
            who: MultiAddress,
            call: Call,
        }),
        sudo_unchecked_weight: sts.enumStruct({
            call: Call,
            weight: Weight,
        }),
    }
})

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type SudoCall = SudoCall_remove_key | SudoCall_set_key | SudoCall_sudo | SudoCall_sudo_as | SudoCall_sudo_unchecked_weight

/**
 * See [`Pallet::remove_key`].
 */
export interface SudoCall_remove_key {
    __kind: 'remove_key'
}

/**
 * See [`Pallet::set_key`].
 */
export interface SudoCall_set_key {
    __kind: 'set_key'
    new: MultiAddress
}

/**
 * See [`Pallet::sudo`].
 */
export interface SudoCall_sudo {
    __kind: 'sudo'
    call: Call
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
 * See [`Pallet::sudo_unchecked_weight`].
 */
export interface SudoCall_sudo_unchecked_weight {
    __kind: 'sudo_unchecked_weight'
    call: Call
    weight: Weight
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export const SubspaceCall: sts.Type<SubspaceCall> = sts.closedEnum(() => {
    return  {
        enable_authoring_by_anyone: sts.unit(),
        enable_rewards_at: sts.enumStruct({
            enableRewardsAt: EnableRewardsAt,
        }),
        enable_solution_range_adjustment: sts.enumStruct({
            solutionRangeOverride: sts.option(() => sts.bigint()),
            votingSolutionRangeOverride: sts.option(() => sts.bigint()),
        }),
        report_equivocation: sts.enumStruct({
            equivocationProof: EquivocationProof,
        }),
        store_segment_headers: sts.enumStruct({
            segmentHeaders: sts.array(() => SegmentHeader),
        }),
        vote: sts.enumStruct({
            signedVote: SignedVote,
        }),
    }
})

export const SignedVote: sts.Type<SignedVote> = sts.struct(() => {
    return  {
        vote: Vote,
        signature: Signature,
    }
})

export const Signature = sts.bytes()

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

export const Scalar: sts.Type<Scalar> = sts.struct(() => {
    return  {
        inner: sts.bytes(),
    }
})

export interface Scalar {
    inner: Bytes
}

export const RecordWitness = sts.bytes()

export const RecordCommitment = sts.bytes()

export const PieceOffset = sts.number()

export const HistorySize = sts.bigint()

export const Public = sts.bytes()

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

export type PieceOffset = number

export type HistorySize = bigint

export type Public = Bytes

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

export type Signature = Bytes

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

export const SegmentCommitment = sts.bytes()

export const SegmentIndex = sts.bigint()

export type SegmentHeader = SegmentHeader_V0

export interface SegmentHeader_V0 {
    __kind: 'V0'
    segmentIndex: SegmentIndex
    segmentCommitment: SegmentCommitment
    prevSegmentHeaderHash: Bytes
    lastArchivedBlock: LastArchivedBlock
}

export type SegmentCommitment = Bytes

export type SegmentIndex = bigint

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

export const EnableRewardsAt: sts.Type<EnableRewardsAt> = sts.closedEnum(() => {
    return  {
        Height: sts.option(() => sts.number()),
        Manually: sts.unit(),
        SolutionRange: sts.bigint(),
    }
})

export type EnableRewardsAt = EnableRewardsAt_Height | EnableRewardsAt_Manually | EnableRewardsAt_SolutionRange

export interface EnableRewardsAt_Height {
    __kind: 'Height'
    value?: (number | undefined)
}

export interface EnableRewardsAt_Manually {
    __kind: 'Manually'
}

export interface EnableRewardsAt_SolutionRange {
    __kind: 'SolutionRange'
    value: bigint
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type SubspaceCall = SubspaceCall_enable_authoring_by_anyone | SubspaceCall_enable_rewards_at | SubspaceCall_enable_solution_range_adjustment | SubspaceCall_report_equivocation | SubspaceCall_store_segment_headers | SubspaceCall_vote

/**
 * See [`Pallet::enable_authoring_by_anyone`].
 */
export interface SubspaceCall_enable_authoring_by_anyone {
    __kind: 'enable_authoring_by_anyone'
}

/**
 * See [`Pallet::enable_rewards_at`].
 */
export interface SubspaceCall_enable_rewards_at {
    __kind: 'enable_rewards_at'
    enableRewardsAt: EnableRewardsAt
}

/**
 * See [`Pallet::enable_solution_range_adjustment`].
 */
export interface SubspaceCall_enable_solution_range_adjustment {
    __kind: 'enable_solution_range_adjustment'
    solutionRangeOverride?: (bigint | undefined)
    votingSolutionRangeOverride?: (bigint | undefined)
}

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
 * See [`Pallet::vote`].
 */
export interface SubspaceCall_vote {
    __kind: 'vote'
    signedVote: SignedVote
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export const RuntimeConfigsCall: sts.Type<RuntimeConfigsCall> = sts.closedEnum(() => {
    return  {
        set_enable_balance_transfers: sts.enumStruct({
            enableBalanceTransfers: sts.boolean(),
        }),
        set_enable_domains: sts.enumStruct({
            enableDomains: sts.boolean(),
        }),
        set_enable_dynamic_cost_of_storage: sts.enumStruct({
            enableDynamicCostOfStorage: sts.boolean(),
        }),
        set_enable_non_root_calls: sts.enumStruct({
            enableNonRootCalls: sts.boolean(),
        }),
    }
})

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type RuntimeConfigsCall = RuntimeConfigsCall_set_enable_balance_transfers | RuntimeConfigsCall_set_enable_domains | RuntimeConfigsCall_set_enable_dynamic_cost_of_storage | RuntimeConfigsCall_set_enable_non_root_calls

/**
 * See [`Pallet::set_enable_balance_transfers`].
 */
export interface RuntimeConfigsCall_set_enable_balance_transfers {
    __kind: 'set_enable_balance_transfers'
    enableBalanceTransfers: boolean
}

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
 * See [`Pallet::set_enable_non_root_calls`].
 */
export interface RuntimeConfigsCall_set_enable_non_root_calls {
    __kind: 'set_enable_non_root_calls'
    enableNonRootCalls: boolean
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export const RewardsCall: sts.Type<RewardsCall> = sts.closedEnum(() => {
    return  {
        update_issuance_params: sts.enumStruct({
            proposerSubsidyPoints: sts.array(() => RewardPoint),
            voterSubsidyPoints: sts.array(() => RewardPoint),
        }),
    }
})

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type RewardsCall = RewardsCall_update_issuance_params

/**
 * See [`Pallet::update_issuance_params`].
 */
export interface RewardsCall_update_issuance_params {
    __kind: 'update_issuance_params'
    proposerSubsidyPoints: RewardPoint[]
    voterSubsidyPoints: RewardPoint[]
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export const MessengerCall: sts.Type<MessengerCall> = sts.closedEnum(() => {
    return  {
        close_channel: sts.enumStruct({
            chainId: ChainId,
            channelId: sts.bigint(),
        }),
        initiate_channel: sts.enumStruct({
            dstChainId: ChainId,
            params: InitiateChannelParams,
        }),
        initiate_domain_update_chain_allowlist: sts.enumStruct({
            domainId: DomainId,
            update: ChainAllowlistUpdate,
        }),
        relay_message: sts.enumStruct({
            msg: CrossDomainMessage,
        }),
        relay_message_response: sts.enumStruct({
            msg: CrossDomainMessage,
        }),
        update_consensus_chain_allowlist: sts.enumStruct({
            update: ChainAllowlistUpdate,
        }),
        update_domain_allowlist: sts.enumStruct({
            updates: DomainAllowlistUpdates,
        }),
    }
})

export const InitiateChannelParams: sts.Type<InitiateChannelParams> = sts.struct(() => {
    return  {
        maxOutgoingMessages: sts.number(),
        feeModel: FeeModel,
    }
})

export interface InitiateChannelParams {
    maxOutgoingMessages: number
    feeModel: FeeModel
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type MessengerCall = MessengerCall_close_channel | MessengerCall_initiate_channel | MessengerCall_initiate_domain_update_chain_allowlist | MessengerCall_relay_message | MessengerCall_relay_message_response | MessengerCall_update_consensus_chain_allowlist | MessengerCall_update_domain_allowlist

/**
 * See [`Pallet::close_channel`].
 */
export interface MessengerCall_close_channel {
    __kind: 'close_channel'
    chainId: ChainId
    channelId: bigint
}

/**
 * See [`Pallet::initiate_channel`].
 */
export interface MessengerCall_initiate_channel {
    __kind: 'initiate_channel'
    dstChainId: ChainId
    params: InitiateChannelParams
}

/**
 * See [`Pallet::initiate_domain_update_chain_allowlist`].
 */
export interface MessengerCall_initiate_domain_update_chain_allowlist {
    __kind: 'initiate_domain_update_chain_allowlist'
    domainId: DomainId
    update: ChainAllowlistUpdate
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
 * See [`Pallet::update_consensus_chain_allowlist`].
 */
export interface MessengerCall_update_consensus_chain_allowlist {
    __kind: 'update_consensus_chain_allowlist'
    update: ChainAllowlistUpdate
}

/**
 * See [`Pallet::update_domain_allowlist`].
 */
export interface MessengerCall_update_domain_allowlist {
    __kind: 'update_domain_allowlist'
    updates: DomainAllowlistUpdates
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export const DomainsCall: sts.Type<DomainsCall> = sts.closedEnum(() => {
    return  {
        deregister_operator: sts.enumStruct({
            operatorId: sts.bigint(),
        }),
        force_staking_epoch_transition: sts.enumStruct({
            domainId: DomainId,
        }),
        instantiate_domain: sts.enumStruct({
            domainConfig: DomainConfig,
        }),
        nominate_operator: sts.enumStruct({
            operatorId: sts.bigint(),
            amount: sts.bigint(),
        }),
        register_domain_runtime: sts.enumStruct({
            runtimeName: sts.string(),
            runtimeType: RuntimeType,
            rawGenesisStorage: sts.bytes(),
        }),
        register_operator: sts.enumStruct({
            domainId: DomainId,
            amount: sts.bigint(),
            config: OperatorConfig,
        }),
        submit_bundle: sts.enumStruct({
            opaqueBundle: Bundle,
        }),
        submit_fraud_proof: sts.enumStruct({
            fraudProof: FraudProof,
        }),
        unlock_funds: sts.enumStruct({
            operatorId: sts.bigint(),
        }),
        unlock_operator: sts.enumStruct({
            operatorId: sts.bigint(),
        }),
        update_domain_operator_allow_list: sts.enumStruct({
            domainId: DomainId,
            operatorAllowList: OperatorAllowList,
        }),
        upgrade_domain_runtime: sts.enumStruct({
            runtimeId: sts.number(),
            rawGenesisStorage: sts.bytes(),
        }),
        withdraw_stake: sts.enumStruct({
            operatorId: sts.bigint(),
            shares: sts.bigint(),
        }),
    }
})

export const OperatorAllowList: sts.Type<OperatorAllowList> = sts.closedEnum(() => {
    return  {
        Anyone: sts.unit(),
        Operators: sts.array(() => AccountId32),
    }
})

export type OperatorAllowList = OperatorAllowList_Anyone | OperatorAllowList_Operators

export interface OperatorAllowList_Anyone {
    __kind: 'Anyone'
}

export interface OperatorAllowList_Operators {
    __kind: 'Operators'
    value: AccountId32[]
}

export const FraudProof: sts.Type<FraudProof> = sts.closedEnum(() => {
    return  {
        BundleEquivocation: BundleEquivocationProof,
        ImproperTransactionSortition: ImproperTransactionSortitionProof,
        InvalidBlockFees: InvalidBlockFeesProof,
        InvalidBundles: InvalidBundlesFraudProof,
        InvalidDomainBlockHash: InvalidDomainBlockHashProof,
        InvalidExtrinsicsRoot: InvalidExtrinsicsRootProof,
        InvalidStateTransition: InvalidStateTransitionProof,
        InvalidTransaction: InvalidTransactionProof,
        InvalidTransfers: InvalidTransfersProof,
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

export const InvalidTransfersProof: sts.Type<InvalidTransfersProof> = sts.struct(() => {
    return  {
        domainId: DomainId,
        badReceiptHash: H256,
        storageProof: StorageProof,
    }
})

export interface InvalidTransfersProof {
    domainId: DomainId
    badReceiptHash: H256
    storageProof: StorageProof
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
    return  {
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
    return  {
        Shorter: sts.unit(),
        StateRoot: sts.number(),
    }
})

export type ApplyExtrinsicMismatch = ApplyExtrinsicMismatch_Shorter | ApplyExtrinsicMismatch_StateRoot

export interface ApplyExtrinsicMismatch_Shorter {
    __kind: 'Shorter'
}

export interface ApplyExtrinsicMismatch_StateRoot {
    __kind: 'StateRoot'
    value: number
}

export type ExecutionPhase = ExecutionPhase_ApplyExtrinsic | ExecutionPhase_FinalizeBlock | ExecutionPhase_InitializeBlock

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
        proofData: StorageProof,
        isTrueInvalidFraudProof: sts.boolean(),
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

export interface InvalidBundlesFraudProof {
    badReceiptHash: H256
    domainId: DomainId
    bundleIndex: number
    invalidBundleType: InvalidBundleType
    proofData: StorageProof
    isTrueInvalidFraudProof: boolean
}

export const InvalidBlockFeesProof: sts.Type<InvalidBlockFeesProof> = sts.struct(() => {
    return  {
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
        estimatedBundleWeight: Weight,
        bundleExtrinsicsRoot: H256,
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
        blockFees: BlockFees,
        transfers: Transfers,
    }
})

export const Transfers: sts.Type<Transfers> = sts.struct(() => {
    return  {
        transfersIn: sts.array(() => sts.tuple(() => [ChainId, sts.bigint()])),
        transfersOut: sts.array(() => sts.tuple(() => [ChainId, sts.bigint()])),
        rejectedTransfersClaimed: sts.array(() => sts.tuple(() => [ChainId, sts.bigint()])),
        transfersRejected: sts.array(() => sts.tuple(() => [ChainId, sts.bigint()])),
    }
})

export interface Transfers {
    transfersIn: [ChainId, bigint][]
    transfersOut: [ChainId, bigint][]
    rejectedTransfersClaimed: [ChainId, bigint][]
    transfersRejected: [ChainId, bigint][]
}

export const BlockFees: sts.Type<BlockFees> = sts.struct(() => {
    return  {
        consensusStorageFee: sts.bigint(),
        domainExecutionFee: sts.bigint(),
        burnedBalance: sts.bigint(),
    }
})

export interface BlockFees {
    consensusStorageFee: bigint
    domainExecutionFee: bigint
    burnedBalance: bigint
}

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

export type BundleValidity = BundleValidity_Invalid | BundleValidity_Valid

export interface BundleValidity_Invalid {
    __kind: 'Invalid'
    value: InvalidBundleType
}

export interface BundleValidity_Valid {
    __kind: 'Valid'
    value: H256
}

export interface InboxedBundle {
    bundle: BundleValidity
    extrinsicsRoot: H256
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
    transfers: Transfers
}

export const ProofOfElection: sts.Type<ProofOfElection> = sts.struct(() => {
    return  {
        domainId: DomainId,
        slotNumber: sts.bigint(),
        proofOfTime: PotOutput,
        vrfSignature: VrfSignature,
        operatorId: sts.bigint(),
        consensusBlockHash: H256,
    }
})

export const VrfSignature: sts.Type<VrfSignature> = sts.struct(() => {
    return  {
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
    proofOfTime: PotOutput
    vrfSignature: VrfSignature
    operatorId: bigint
    consensusBlockHash: H256
}

export interface BundleHeader {
    proofOfElection: ProofOfElection
    receipt: ExecutionReceipt
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

export type FraudProof = FraudProof_BundleEquivocation | FraudProof_ImproperTransactionSortition | FraudProof_InvalidBlockFees | FraudProof_InvalidBundles | FraudProof_InvalidDomainBlockHash | FraudProof_InvalidExtrinsicsRoot | FraudProof_InvalidStateTransition | FraudProof_InvalidTransaction | FraudProof_InvalidTransfers | FraudProof_ValidBundle

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

export interface FraudProof_InvalidTransfers {
    __kind: 'InvalidTransfers'
    value: InvalidTransfersProof
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

export const RuntimeType: sts.Type<RuntimeType> = sts.closedEnum(() => {
    return  {
        Evm: sts.unit(),
    }
})

export type RuntimeType = RuntimeType_Evm

export interface RuntimeType_Evm {
    __kind: 'Evm'
}

export const DomainConfig: sts.Type<DomainConfig> = sts.struct(() => {
    return  {
        domainName: sts.string(),
        runtimeId: sts.number(),
        maxBlockSize: sts.number(),
        maxBlockWeight: Weight,
        bundleSlotProbability: sts.tuple(() => [sts.bigint(), sts.bigint()]),
        targetBundlesPerBlock: sts.number(),
        operatorAllowList: OperatorAllowList,
        initialBalances: sts.array(() => sts.tuple(() => [MultiAccountId, sts.bigint()])),
    }
})

export interface DomainConfig {
    domainName: string
    runtimeId: number
    maxBlockSize: number
    maxBlockWeight: Weight
    bundleSlotProbability: [bigint, bigint]
    targetBundlesPerBlock: number
    operatorAllowList: OperatorAllowList
    initialBalances: [MultiAccountId, bigint][]
}

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type DomainsCall = DomainsCall_deregister_operator | DomainsCall_force_staking_epoch_transition | DomainsCall_instantiate_domain | DomainsCall_nominate_operator | DomainsCall_register_domain_runtime | DomainsCall_register_operator | DomainsCall_submit_bundle | DomainsCall_submit_fraud_proof | DomainsCall_unlock_funds | DomainsCall_unlock_operator | DomainsCall_update_domain_operator_allow_list | DomainsCall_upgrade_domain_runtime | DomainsCall_withdraw_stake

/**
 * See [`Pallet::deregister_operator`].
 */
export interface DomainsCall_deregister_operator {
    __kind: 'deregister_operator'
    operatorId: bigint
}

/**
 * See [`Pallet::force_staking_epoch_transition`].
 */
export interface DomainsCall_force_staking_epoch_transition {
    __kind: 'force_staking_epoch_transition'
    domainId: DomainId
}

/**
 * See [`Pallet::instantiate_domain`].
 */
export interface DomainsCall_instantiate_domain {
    __kind: 'instantiate_domain'
    domainConfig: DomainConfig
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
 * See [`Pallet::register_domain_runtime`].
 */
export interface DomainsCall_register_domain_runtime {
    __kind: 'register_domain_runtime'
    runtimeName: string
    runtimeType: RuntimeType
    rawGenesisStorage: Bytes
}

/**
 * See [`Pallet::register_operator`].
 */
export interface DomainsCall_register_operator {
    __kind: 'register_operator'
    domainId: DomainId
    amount: bigint
    config: OperatorConfig
}

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
    domainId: DomainId
    operatorAllowList: OperatorAllowList
}

/**
 * See [`Pallet::upgrade_domain_runtime`].
 */
export interface DomainsCall_upgrade_domain_runtime {
    __kind: 'upgrade_domain_runtime'
    runtimeId: number
    rawGenesisStorage: Bytes
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
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export const BalancesCall: sts.Type<BalancesCall> = sts.closedEnum(() => {
    return  {
        force_set_balance: sts.enumStruct({
            who: MultiAddress,
            newFree: sts.bigint(),
        }),
        force_transfer: sts.enumStruct({
            source: MultiAddress,
            dest: MultiAddress,
            value: sts.bigint(),
        }),
        force_unreserve: sts.enumStruct({
            who: MultiAddress,
            amount: sts.bigint(),
        }),
        transfer_all: sts.enumStruct({
            dest: MultiAddress,
            keepAlive: sts.boolean(),
        }),
        transfer_allow_death: sts.enumStruct({
            dest: MultiAddress,
            value: sts.bigint(),
        }),
        transfer_keep_alive: sts.enumStruct({
            dest: MultiAddress,
            value: sts.bigint(),
        }),
        upgrade_accounts: sts.enumStruct({
            who: sts.array(() => AccountId32),
        }),
    }
})

/**
 * Contains a variant per dispatchable extrinsic that this pallet has.
 */
export type BalancesCall = BalancesCall_force_set_balance | BalancesCall_force_transfer | BalancesCall_force_unreserve | BalancesCall_transfer_all | BalancesCall_transfer_allow_death | BalancesCall_transfer_keep_alive | BalancesCall_upgrade_accounts

/**
 * See [`Pallet::force_set_balance`].
 */
export interface BalancesCall_force_set_balance {
    __kind: 'force_set_balance'
    who: MultiAddress
    newFree: bigint
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
 * See [`Pallet::force_unreserve`].
 */
export interface BalancesCall_force_unreserve {
    __kind: 'force_unreserve'
    who: MultiAddress
    amount: bigint
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
 * See [`Pallet::transfer_allow_death`].
 */
export interface BalancesCall_transfer_allow_death {
    __kind: 'transfer_allow_death'
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
 * See [`Pallet::upgrade_accounts`].
 */
export interface BalancesCall_upgrade_accounts {
    __kind: 'upgrade_accounts'
    who: AccountId32[]
}

export type Call = Call_Balances | Call_Domains | Call_Messenger | Call_Rewards | Call_RuntimeConfigs | Call_Subspace | Call_Sudo | Call_System | Call_Timestamp | Call_Transporter | Call_Utility | Call_Vesting

export interface Call_Balances {
    __kind: 'Balances'
    value: BalancesCall
}

export interface Call_Domains {
    __kind: 'Domains'
    value: DomainsCall
}

export interface Call_Messenger {
    __kind: 'Messenger'
    value: MessengerCall
}

export interface Call_Rewards {
    __kind: 'Rewards'
    value: RewardsCall
}

export interface Call_RuntimeConfigs {
    __kind: 'RuntimeConfigs'
    value: RuntimeConfigsCall
}

export interface Call_Subspace {
    __kind: 'Subspace'
    value: SubspaceCall
}

export interface Call_Sudo {
    __kind: 'Sudo'
    value: SudoCall
}

export interface Call_System {
    __kind: 'System'
    value: SystemCall
}

export interface Call_Timestamp {
    __kind: 'Timestamp'
    value: TimestampCall
}

export interface Call_Transporter {
    __kind: 'Transporter'
    value: TransporterCall
}

export interface Call_Utility {
    __kind: 'Utility'
    value: UtilityCall
}

export interface Call_Vesting {
    __kind: 'Vesting'
    value: VestingCall
}
