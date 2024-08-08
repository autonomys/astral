import {sts, Result, Option, Bytes, BitSequence} from './support'

export interface RewardPoint {
    block: number
    subsidy: bigint
}

export type DomainId = number

export const DomainId = sts.number()

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

export type ChainId = ChainId_Consensus | ChainId_Domain

export interface ChainId_Consensus {
    __kind: 'Consensus'
}

export interface ChainId_Domain {
    __kind: 'Domain'
    value: DomainId
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

export const ChainId: sts.Type<ChainId> = sts.closedEnum(() => {
    return  {
        Consensus: sts.unit(),
        Domain: DomainId,
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
