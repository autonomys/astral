import {sts, Result, Option, Bytes, BitSequence} from './support'

export type DomainId = number

export interface DomainObject {
    ownerAccountId: AccountId32
    createdAt: number
    genesisReceiptHash: H256
    domainConfig: DomainConfig
    domainRuntimeInfo: DomainRuntimeInfo
}

export type DomainRuntimeInfo = DomainRuntimeInfo_EVM

export interface DomainRuntimeInfo_EVM {
    __kind: 'EVM'
    chainId: bigint
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

export interface Weight {
    refTime: bigint
    proofSize: bigint
}

export type H256 = Bytes

export type AccountId32 = Bytes

export const DomainObject: sts.Type<DomainObject> = sts.struct(() => {
    return  {
        ownerAccountId: AccountId32,
        createdAt: sts.number(),
        genesisReceiptHash: H256,
        domainConfig: DomainConfig,
        domainRuntimeInfo: DomainRuntimeInfo,
    }
})

export const DomainRuntimeInfo: sts.Type<DomainRuntimeInfo> = sts.closedEnum(() => {
    return  {
        EVM: sts.enumStruct({
            chainId: sts.bigint(),
        }),
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

export const OperatorAllowList: sts.Type<OperatorAllowList> = sts.closedEnum(() => {
    return  {
        Anyone: sts.unit(),
        Operators: sts.array(() => AccountId32),
    }
})

export const Weight: sts.Type<Weight> = sts.struct(() => {
    return  {
        refTime: sts.bigint(),
        proofSize: sts.bigint(),
    }
})

export const H256 = sts.bytes()

export const AccountId32 = sts.bytes()

export const SlashedReason: sts.Type<SlashedReason> = sts.closedEnum(() => {
    return  {
        BadExecutionReceipt: H256,
        BundleEquivocation: Slot,
        InvalidBundle: sts.number(),
    }
})

export const Slot = sts.bigint()

export type SlashedReason = SlashedReason_BadExecutionReceipt | SlashedReason_BundleEquivocation | SlashedReason_InvalidBundle

export interface SlashedReason_BadExecutionReceipt {
    __kind: 'BadExecutionReceipt'
    value: H256
}

export interface SlashedReason_BundleEquivocation {
    __kind: 'BundleEquivocation'
    value: Slot
}

export interface SlashedReason_InvalidBundle {
    __kind: 'InvalidBundle'
    value: number
}

export type Slot = bigint

export const DomainId = sts.number()
