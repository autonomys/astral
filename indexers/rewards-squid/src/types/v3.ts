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
