import {sts, Block, Bytes, Option, Result, StorageType, RuntimeCtx} from '../support'
import * as v0 from '../v0'
import * as v1 from '../v1'
import * as v3 from '../v3'
import * as v5 from '../v5'
import * as v6 from '../v6'

export const successfulBundles =  {
    /**
     *  Bundles submitted successfully in current block.
     */
    v0: new StorageType('Domains.SuccessfulBundles', 'Default', [v0.DomainId], sts.array(() => v0.H256)) as SuccessfulBundlesV0,
}

/**
 *  Bundles submitted successfully in current block.
 */
export interface SuccessfulBundlesV0  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v0.H256[]
    get(block: Block, key: v0.DomainId): Promise<(v0.H256[] | undefined)>
    getMany(block: Block, keys: v0.DomainId[]): Promise<(v0.H256[] | undefined)[]>
    getKeys(block: Block): Promise<v0.DomainId[]>
    getKeys(block: Block, key: v0.DomainId): Promise<v0.DomainId[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v0.DomainId[]>
    getKeysPaged(pageSize: number, block: Block, key: v0.DomainId): AsyncIterable<v0.DomainId[]>
    getPairs(block: Block): Promise<[k: v0.DomainId, v: (v0.H256[] | undefined)][]>
    getPairs(block: Block, key: v0.DomainId): Promise<[k: v0.DomainId, v: (v0.H256[] | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v0.DomainId, v: (v0.H256[] | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v0.DomainId): AsyncIterable<[k: v0.DomainId, v: (v0.H256[] | undefined)][]>
}

export const successfulFraudProofs =  {
    /**
     *  Fraud proofs submitted successfully in current block.
     */
    v0: new StorageType('Domains.SuccessfulFraudProofs', 'Default', [v0.DomainId], sts.array(() => v0.H256)) as SuccessfulFraudProofsV0,
}

/**
 *  Fraud proofs submitted successfully in current block.
 */
export interface SuccessfulFraudProofsV0  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v0.H256[]
    get(block: Block, key: v0.DomainId): Promise<(v0.H256[] | undefined)>
    getMany(block: Block, keys: v0.DomainId[]): Promise<(v0.H256[] | undefined)[]>
    getKeys(block: Block): Promise<v0.DomainId[]>
    getKeys(block: Block, key: v0.DomainId): Promise<v0.DomainId[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v0.DomainId[]>
    getKeysPaged(pageSize: number, block: Block, key: v0.DomainId): AsyncIterable<v0.DomainId[]>
    getPairs(block: Block): Promise<[k: v0.DomainId, v: (v0.H256[] | undefined)][]>
    getPairs(block: Block, key: v0.DomainId): Promise<[k: v0.DomainId, v: (v0.H256[] | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v0.DomainId, v: (v0.H256[] | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v0.DomainId): AsyncIterable<[k: v0.DomainId, v: (v0.H256[] | undefined)][]>
}

export const nextRuntimeId =  {
    /**
     *  Stores the next runtime id.
     */
    v0: new StorageType('Domains.NextRuntimeId', 'Default', [], sts.number()) as NextRuntimeIdV0,
}

/**
 *  Stores the next runtime id.
 */
export interface NextRuntimeIdV0  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): number
    get(block: Block): Promise<(number | undefined)>
}

export const nextEvmChainId =  {
    /**
     *  Stores the next evm chain id.
     */
    v0: new StorageType('Domains.NextEVMChainId', 'Default', [], sts.bigint()) as NextEvmChainIdV0,
}

/**
 *  Stores the next evm chain id.
 */
export interface NextEvmChainIdV0  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): bigint
    get(block: Block): Promise<(bigint | undefined)>
}

export const runtimeRegistry =  {
    v0: new StorageType('Domains.RuntimeRegistry', 'Optional', [sts.number()], v0.RuntimeObject) as RuntimeRegistryV0,
    v5: new StorageType('Domains.RuntimeRegistry', 'Optional', [sts.number()], v5.RuntimeObject) as RuntimeRegistryV5,
    v6: new StorageType('Domains.RuntimeRegistry', 'Optional', [sts.number()], v6.RuntimeObject) as RuntimeRegistryV6,
}

export interface RuntimeRegistryV0  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: number): Promise<(v0.RuntimeObject | undefined)>
    getMany(block: Block, keys: number[]): Promise<(v0.RuntimeObject | undefined)[]>
    getKeys(block: Block): Promise<number[]>
    getKeys(block: Block, key: number): Promise<number[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, block: Block, key: number): AsyncIterable<number[]>
    getPairs(block: Block): Promise<[k: number, v: (v0.RuntimeObject | undefined)][]>
    getPairs(block: Block, key: number): Promise<[k: number, v: (v0.RuntimeObject | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: number, v: (v0.RuntimeObject | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: number): AsyncIterable<[k: number, v: (v0.RuntimeObject | undefined)][]>
}

export interface RuntimeRegistryV5  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: number): Promise<(v5.RuntimeObject | undefined)>
    getMany(block: Block, keys: number[]): Promise<(v5.RuntimeObject | undefined)[]>
    getKeys(block: Block): Promise<number[]>
    getKeys(block: Block, key: number): Promise<number[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, block: Block, key: number): AsyncIterable<number[]>
    getPairs(block: Block): Promise<[k: number, v: (v5.RuntimeObject | undefined)][]>
    getPairs(block: Block, key: number): Promise<[k: number, v: (v5.RuntimeObject | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: number, v: (v5.RuntimeObject | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: number): AsyncIterable<[k: number, v: (v5.RuntimeObject | undefined)][]>
}

export interface RuntimeRegistryV6  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: number): Promise<(v6.RuntimeObject | undefined)>
    getMany(block: Block, keys: number[]): Promise<(v6.RuntimeObject | undefined)[]>
    getKeys(block: Block): Promise<number[]>
    getKeys(block: Block, key: number): Promise<number[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, block: Block, key: number): AsyncIterable<number[]>
    getPairs(block: Block): Promise<[k: number, v: (v6.RuntimeObject | undefined)][]>
    getPairs(block: Block, key: number): Promise<[k: number, v: (v6.RuntimeObject | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: number, v: (v6.RuntimeObject | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: number): AsyncIterable<[k: number, v: (v6.RuntimeObject | undefined)][]>
}

export const scheduledRuntimeUpgrades =  {
    v0: new StorageType('Domains.ScheduledRuntimeUpgrades', 'Optional', [sts.number(), sts.number()], v0.ScheduledRuntimeUpgrade) as ScheduledRuntimeUpgradesV0,
}

export interface ScheduledRuntimeUpgradesV0  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key1: number, key2: number): Promise<(v0.ScheduledRuntimeUpgrade | undefined)>
    getMany(block: Block, keys: [number, number][]): Promise<(v0.ScheduledRuntimeUpgrade | undefined)[]>
    getKeys(block: Block): Promise<[number, number][]>
    getKeys(block: Block, key1: number): Promise<[number, number][]>
    getKeys(block: Block, key1: number, key2: number): Promise<[number, number][]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<[number, number][]>
    getKeysPaged(pageSize: number, block: Block, key1: number): AsyncIterable<[number, number][]>
    getKeysPaged(pageSize: number, block: Block, key1: number, key2: number): AsyncIterable<[number, number][]>
    getPairs(block: Block): Promise<[k: [number, number], v: (v0.ScheduledRuntimeUpgrade | undefined)][]>
    getPairs(block: Block, key1: number): Promise<[k: [number, number], v: (v0.ScheduledRuntimeUpgrade | undefined)][]>
    getPairs(block: Block, key1: number, key2: number): Promise<[k: [number, number], v: (v0.ScheduledRuntimeUpgrade | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: [number, number], v: (v0.ScheduledRuntimeUpgrade | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: number): AsyncIterable<[k: [number, number], v: (v0.ScheduledRuntimeUpgrade | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: number, key2: number): AsyncIterable<[k: [number, number], v: (v0.ScheduledRuntimeUpgrade | undefined)][]>
}

export const nextOperatorId =  {
    v0: new StorageType('Domains.NextOperatorId', 'Default', [], sts.bigint()) as NextOperatorIdV0,
}

export interface NextOperatorIdV0  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): bigint
    get(block: Block): Promise<(bigint | undefined)>
}

export const operatorIdOwner =  {
    v0: new StorageType('Domains.OperatorIdOwner', 'Optional', [sts.bigint()], v0.AccountId32) as OperatorIdOwnerV0,
}

export interface OperatorIdOwnerV0  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: bigint): Promise<(v0.AccountId32 | undefined)>
    getMany(block: Block, keys: bigint[]): Promise<(v0.AccountId32 | undefined)[]>
    getKeys(block: Block): Promise<bigint[]>
    getKeys(block: Block, key: bigint): Promise<bigint[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<bigint[]>
    getKeysPaged(pageSize: number, block: Block, key: bigint): AsyncIterable<bigint[]>
    getPairs(block: Block): Promise<[k: bigint, v: (v0.AccountId32 | undefined)][]>
    getPairs(block: Block, key: bigint): Promise<[k: bigint, v: (v0.AccountId32 | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: bigint, v: (v0.AccountId32 | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: bigint): AsyncIterable<[k: bigint, v: (v0.AccountId32 | undefined)][]>
}

export const operatorSigningKey =  {
    /**
     *  Indexes operator signing key against OperatorId.
     */
    v0: new StorageType('Domains.OperatorSigningKey', 'Optional', [sts.bytes()], sts.bigint()) as OperatorSigningKeyV0,
}

/**
 *  Indexes operator signing key against OperatorId.
 */
export interface OperatorSigningKeyV0  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: Bytes): Promise<(bigint | undefined)>
    getMany(block: Block, keys: Bytes[]): Promise<(bigint | undefined)[]>
    getKeys(block: Block): Promise<Bytes[]>
    getKeys(block: Block, key: Bytes): Promise<Bytes[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<Bytes[]>
    getKeysPaged(pageSize: number, block: Block, key: Bytes): AsyncIterable<Bytes[]>
    getPairs(block: Block): Promise<[k: Bytes, v: (bigint | undefined)][]>
    getPairs(block: Block, key: Bytes): Promise<[k: Bytes, v: (bigint | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: Bytes, v: (bigint | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: Bytes): AsyncIterable<[k: Bytes, v: (bigint | undefined)][]>
}

export const domainStakingSummary =  {
    v0: new StorageType('Domains.DomainStakingSummary', 'Optional', [v0.DomainId], v0.StakingSummary) as DomainStakingSummaryV0,
}

export interface DomainStakingSummaryV0  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v0.DomainId): Promise<(v0.StakingSummary | undefined)>
    getMany(block: Block, keys: v0.DomainId[]): Promise<(v0.StakingSummary | undefined)[]>
    getKeys(block: Block): Promise<v0.DomainId[]>
    getKeys(block: Block, key: v0.DomainId): Promise<v0.DomainId[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v0.DomainId[]>
    getKeysPaged(pageSize: number, block: Block, key: v0.DomainId): AsyncIterable<v0.DomainId[]>
    getPairs(block: Block): Promise<[k: v0.DomainId, v: (v0.StakingSummary | undefined)][]>
    getPairs(block: Block, key: v0.DomainId): Promise<[k: v0.DomainId, v: (v0.StakingSummary | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v0.DomainId, v: (v0.StakingSummary | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v0.DomainId): AsyncIterable<[k: v0.DomainId, v: (v0.StakingSummary | undefined)][]>
}

export const operators =  {
    /**
     *  List of all registered operators and their configuration.
     */
    v0: new StorageType('Domains.Operators', 'Optional', [sts.bigint()], v0.Operator) as OperatorsV0,
    /**
     *  List of all registered operators and their configuration.
     */
    v1: new StorageType('Domains.Operators', 'Optional', [sts.bigint()], v1.Operator) as OperatorsV1,
    /**
     *  List of all registered operators and their configuration.
     */
    v3: new StorageType('Domains.Operators', 'Optional', [sts.bigint()], v3.Operator) as OperatorsV3,
}

/**
 *  List of all registered operators and their configuration.
 */
export interface OperatorsV0  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: bigint): Promise<(v0.Operator | undefined)>
    getMany(block: Block, keys: bigint[]): Promise<(v0.Operator | undefined)[]>
    getKeys(block: Block): Promise<bigint[]>
    getKeys(block: Block, key: bigint): Promise<bigint[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<bigint[]>
    getKeysPaged(pageSize: number, block: Block, key: bigint): AsyncIterable<bigint[]>
    getPairs(block: Block): Promise<[k: bigint, v: (v0.Operator | undefined)][]>
    getPairs(block: Block, key: bigint): Promise<[k: bigint, v: (v0.Operator | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: bigint, v: (v0.Operator | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: bigint): AsyncIterable<[k: bigint, v: (v0.Operator | undefined)][]>
}

/**
 *  List of all registered operators and their configuration.
 */
export interface OperatorsV1  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: bigint): Promise<(v1.Operator | undefined)>
    getMany(block: Block, keys: bigint[]): Promise<(v1.Operator | undefined)[]>
    getKeys(block: Block): Promise<bigint[]>
    getKeys(block: Block, key: bigint): Promise<bigint[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<bigint[]>
    getKeysPaged(pageSize: number, block: Block, key: bigint): AsyncIterable<bigint[]>
    getPairs(block: Block): Promise<[k: bigint, v: (v1.Operator | undefined)][]>
    getPairs(block: Block, key: bigint): Promise<[k: bigint, v: (v1.Operator | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: bigint, v: (v1.Operator | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: bigint): AsyncIterable<[k: bigint, v: (v1.Operator | undefined)][]>
}

/**
 *  List of all registered operators and their configuration.
 */
export interface OperatorsV3  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: bigint): Promise<(v3.Operator | undefined)>
    getMany(block: Block, keys: bigint[]): Promise<(v3.Operator | undefined)[]>
    getKeys(block: Block): Promise<bigint[]>
    getKeys(block: Block, key: bigint): Promise<bigint[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<bigint[]>
    getKeysPaged(pageSize: number, block: Block, key: bigint): AsyncIterable<bigint[]>
    getPairs(block: Block): Promise<[k: bigint, v: (v3.Operator | undefined)][]>
    getPairs(block: Block, key: bigint): Promise<[k: bigint, v: (v3.Operator | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: bigint, v: (v3.Operator | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: bigint): AsyncIterable<[k: bigint, v: (v3.Operator | undefined)][]>
}

export const pendingOperatorSwitches =  {
    /**
     *  Temporary hold of all the operators who decided to switch to another domain.
     *  Once epoch is complete, these operators are added to new domains under next_operators.
     */
    v0: new StorageType('Domains.PendingOperatorSwitches', 'Optional', [v0.DomainId], sts.array(() => sts.bigint())) as PendingOperatorSwitchesV0,
}

/**
 *  Temporary hold of all the operators who decided to switch to another domain.
 *  Once epoch is complete, these operators are added to new domains under next_operators.
 */
export interface PendingOperatorSwitchesV0  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v0.DomainId): Promise<(bigint[] | undefined)>
    getMany(block: Block, keys: v0.DomainId[]): Promise<(bigint[] | undefined)[]>
    getKeys(block: Block): Promise<v0.DomainId[]>
    getKeys(block: Block, key: v0.DomainId): Promise<v0.DomainId[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v0.DomainId[]>
    getKeysPaged(pageSize: number, block: Block, key: v0.DomainId): AsyncIterable<v0.DomainId[]>
    getPairs(block: Block): Promise<[k: v0.DomainId, v: (bigint[] | undefined)][]>
    getPairs(block: Block, key: v0.DomainId): Promise<[k: v0.DomainId, v: (bigint[] | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v0.DomainId, v: (bigint[] | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v0.DomainId): AsyncIterable<[k: v0.DomainId, v: (bigint[] | undefined)][]>
}

export const operatorEpochSharePrice =  {
    /**
     *  Share price for the operator pool at the end of Domain epoch.
     */
    v0: new StorageType('Domains.OperatorEpochSharePrice', 'Optional', [sts.bigint(), v0.DomainEpoch], v0.SharePrice) as OperatorEpochSharePriceV0,
}

/**
 *  Share price for the operator pool at the end of Domain epoch.
 */
export interface OperatorEpochSharePriceV0  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key1: bigint, key2: v0.DomainEpoch): Promise<(v0.SharePrice | undefined)>
    getMany(block: Block, keys: [bigint, v0.DomainEpoch][]): Promise<(v0.SharePrice | undefined)[]>
    getKeys(block: Block): Promise<[bigint, v0.DomainEpoch][]>
    getKeys(block: Block, key1: bigint): Promise<[bigint, v0.DomainEpoch][]>
    getKeys(block: Block, key1: bigint, key2: v0.DomainEpoch): Promise<[bigint, v0.DomainEpoch][]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<[bigint, v0.DomainEpoch][]>
    getKeysPaged(pageSize: number, block: Block, key1: bigint): AsyncIterable<[bigint, v0.DomainEpoch][]>
    getKeysPaged(pageSize: number, block: Block, key1: bigint, key2: v0.DomainEpoch): AsyncIterable<[bigint, v0.DomainEpoch][]>
    getPairs(block: Block): Promise<[k: [bigint, v0.DomainEpoch], v: (v0.SharePrice | undefined)][]>
    getPairs(block: Block, key1: bigint): Promise<[k: [bigint, v0.DomainEpoch], v: (v0.SharePrice | undefined)][]>
    getPairs(block: Block, key1: bigint, key2: v0.DomainEpoch): Promise<[k: [bigint, v0.DomainEpoch], v: (v0.SharePrice | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: [bigint, v0.DomainEpoch], v: (v0.SharePrice | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: bigint): AsyncIterable<[k: [bigint, v0.DomainEpoch], v: (v0.SharePrice | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: bigint, key2: v0.DomainEpoch): AsyncIterable<[k: [bigint, v0.DomainEpoch], v: (v0.SharePrice | undefined)][]>
}

export const deposits =  {
    /**
     *  List of all deposits for given Operator.
     */
    v0: new StorageType('Domains.Deposits', 'Optional', [sts.bigint(), v0.AccountId32], v0.Deposit) as DepositsV0,
    /**
     *  List of all deposits for given Operator.
     */
    v1: new StorageType('Domains.Deposits', 'Optional', [sts.bigint(), v1.AccountId32], v1.Deposit) as DepositsV1,
}

/**
 *  List of all deposits for given Operator.
 */
export interface DepositsV0  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key1: bigint, key2: v0.AccountId32): Promise<(v0.Deposit | undefined)>
    getMany(block: Block, keys: [bigint, v0.AccountId32][]): Promise<(v0.Deposit | undefined)[]>
    getKeys(block: Block): Promise<[bigint, v0.AccountId32][]>
    getKeys(block: Block, key1: bigint): Promise<[bigint, v0.AccountId32][]>
    getKeys(block: Block, key1: bigint, key2: v0.AccountId32): Promise<[bigint, v0.AccountId32][]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<[bigint, v0.AccountId32][]>
    getKeysPaged(pageSize: number, block: Block, key1: bigint): AsyncIterable<[bigint, v0.AccountId32][]>
    getKeysPaged(pageSize: number, block: Block, key1: bigint, key2: v0.AccountId32): AsyncIterable<[bigint, v0.AccountId32][]>
    getPairs(block: Block): Promise<[k: [bigint, v0.AccountId32], v: (v0.Deposit | undefined)][]>
    getPairs(block: Block, key1: bigint): Promise<[k: [bigint, v0.AccountId32], v: (v0.Deposit | undefined)][]>
    getPairs(block: Block, key1: bigint, key2: v0.AccountId32): Promise<[k: [bigint, v0.AccountId32], v: (v0.Deposit | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: [bigint, v0.AccountId32], v: (v0.Deposit | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: bigint): AsyncIterable<[k: [bigint, v0.AccountId32], v: (v0.Deposit | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: bigint, key2: v0.AccountId32): AsyncIterable<[k: [bigint, v0.AccountId32], v: (v0.Deposit | undefined)][]>
}

/**
 *  List of all deposits for given Operator.
 */
export interface DepositsV1  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key1: bigint, key2: v1.AccountId32): Promise<(v1.Deposit | undefined)>
    getMany(block: Block, keys: [bigint, v1.AccountId32][]): Promise<(v1.Deposit | undefined)[]>
    getKeys(block: Block): Promise<[bigint, v1.AccountId32][]>
    getKeys(block: Block, key1: bigint): Promise<[bigint, v1.AccountId32][]>
    getKeys(block: Block, key1: bigint, key2: v1.AccountId32): Promise<[bigint, v1.AccountId32][]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<[bigint, v1.AccountId32][]>
    getKeysPaged(pageSize: number, block: Block, key1: bigint): AsyncIterable<[bigint, v1.AccountId32][]>
    getKeysPaged(pageSize: number, block: Block, key1: bigint, key2: v1.AccountId32): AsyncIterable<[bigint, v1.AccountId32][]>
    getPairs(block: Block): Promise<[k: [bigint, v1.AccountId32], v: (v1.Deposit | undefined)][]>
    getPairs(block: Block, key1: bigint): Promise<[k: [bigint, v1.AccountId32], v: (v1.Deposit | undefined)][]>
    getPairs(block: Block, key1: bigint, key2: v1.AccountId32): Promise<[k: [bigint, v1.AccountId32], v: (v1.Deposit | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: [bigint, v1.AccountId32], v: (v1.Deposit | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: bigint): AsyncIterable<[k: [bigint, v1.AccountId32], v: (v1.Deposit | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: bigint, key2: v1.AccountId32): AsyncIterable<[k: [bigint, v1.AccountId32], v: (v1.Deposit | undefined)][]>
}

export const withdrawals =  {
    /**
     *  List of all withdrawals for a given operator.
     */
    v0: new StorageType('Domains.Withdrawals', 'Optional', [sts.bigint(), v0.AccountId32], v0.Withdrawal) as WithdrawalsV0,
    /**
     *  List of all withdrawals for a given operator.
     */
    v1: new StorageType('Domains.Withdrawals', 'Optional', [sts.bigint(), v1.AccountId32], v1.Withdrawal) as WithdrawalsV1,
}

/**
 *  List of all withdrawals for a given operator.
 */
export interface WithdrawalsV0  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key1: bigint, key2: v0.AccountId32): Promise<(v0.Withdrawal | undefined)>
    getMany(block: Block, keys: [bigint, v0.AccountId32][]): Promise<(v0.Withdrawal | undefined)[]>
    getKeys(block: Block): Promise<[bigint, v0.AccountId32][]>
    getKeys(block: Block, key1: bigint): Promise<[bigint, v0.AccountId32][]>
    getKeys(block: Block, key1: bigint, key2: v0.AccountId32): Promise<[bigint, v0.AccountId32][]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<[bigint, v0.AccountId32][]>
    getKeysPaged(pageSize: number, block: Block, key1: bigint): AsyncIterable<[bigint, v0.AccountId32][]>
    getKeysPaged(pageSize: number, block: Block, key1: bigint, key2: v0.AccountId32): AsyncIterable<[bigint, v0.AccountId32][]>
    getPairs(block: Block): Promise<[k: [bigint, v0.AccountId32], v: (v0.Withdrawal | undefined)][]>
    getPairs(block: Block, key1: bigint): Promise<[k: [bigint, v0.AccountId32], v: (v0.Withdrawal | undefined)][]>
    getPairs(block: Block, key1: bigint, key2: v0.AccountId32): Promise<[k: [bigint, v0.AccountId32], v: (v0.Withdrawal | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: [bigint, v0.AccountId32], v: (v0.Withdrawal | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: bigint): AsyncIterable<[k: [bigint, v0.AccountId32], v: (v0.Withdrawal | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: bigint, key2: v0.AccountId32): AsyncIterable<[k: [bigint, v0.AccountId32], v: (v0.Withdrawal | undefined)][]>
}

/**
 *  List of all withdrawals for a given operator.
 */
export interface WithdrawalsV1  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key1: bigint, key2: v1.AccountId32): Promise<(v1.Withdrawal | undefined)>
    getMany(block: Block, keys: [bigint, v1.AccountId32][]): Promise<(v1.Withdrawal | undefined)[]>
    getKeys(block: Block): Promise<[bigint, v1.AccountId32][]>
    getKeys(block: Block, key1: bigint): Promise<[bigint, v1.AccountId32][]>
    getKeys(block: Block, key1: bigint, key2: v1.AccountId32): Promise<[bigint, v1.AccountId32][]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<[bigint, v1.AccountId32][]>
    getKeysPaged(pageSize: number, block: Block, key1: bigint): AsyncIterable<[bigint, v1.AccountId32][]>
    getKeysPaged(pageSize: number, block: Block, key1: bigint, key2: v1.AccountId32): AsyncIterable<[bigint, v1.AccountId32][]>
    getPairs(block: Block): Promise<[k: [bigint, v1.AccountId32], v: (v1.Withdrawal | undefined)][]>
    getPairs(block: Block, key1: bigint): Promise<[k: [bigint, v1.AccountId32], v: (v1.Withdrawal | undefined)][]>
    getPairs(block: Block, key1: bigint, key2: v1.AccountId32): Promise<[k: [bigint, v1.AccountId32], v: (v1.Withdrawal | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: [bigint, v1.AccountId32], v: (v1.Withdrawal | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: bigint): AsyncIterable<[k: [bigint, v1.AccountId32], v: (v1.Withdrawal | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: bigint, key2: v1.AccountId32): AsyncIterable<[k: [bigint, v1.AccountId32], v: (v1.Withdrawal | undefined)][]>
}

export const nominatorCount =  {
    /**
     *  Tracks the nominator count under given operator.
     *  This storage is necessary since CountedStorageNMap does not support prefix key count, so
     *  cannot use that storage type for `Nominators` storage.
     *  Note: The count is incremented for new nominators and decremented when the nominator withdraws
     *  all the stake.
     *  Since Operator themselves are first nominator, they are not counted.
     */
    v0: new StorageType('Domains.NominatorCount', 'Default', [sts.bigint()], sts.number()) as NominatorCountV0,
}

/**
 *  Tracks the nominator count under given operator.
 *  This storage is necessary since CountedStorageNMap does not support prefix key count, so
 *  cannot use that storage type for `Nominators` storage.
 *  Note: The count is incremented for new nominators and decremented when the nominator withdraws
 *  all the stake.
 *  Since Operator themselves are first nominator, they are not counted.
 */
export interface NominatorCountV0  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): number
    get(block: Block, key: bigint): Promise<(number | undefined)>
    getMany(block: Block, keys: bigint[]): Promise<(number | undefined)[]>
    getKeys(block: Block): Promise<bigint[]>
    getKeys(block: Block, key: bigint): Promise<bigint[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<bigint[]>
    getKeysPaged(pageSize: number, block: Block, key: bigint): AsyncIterable<bigint[]>
    getPairs(block: Block): Promise<[k: bigint, v: (number | undefined)][]>
    getPairs(block: Block, key: bigint): Promise<[k: bigint, v: (number | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: bigint, v: (number | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: bigint): AsyncIterable<[k: bigint, v: (number | undefined)][]>
}

export const pendingSlashes =  {
    /**
     *  A list operators who were slashed during the current epoch associated with the domain.
     *  When the epoch for a given domain is complete, operator total stake is moved to treasury and
     *  then deleted.
     */
    v0: new StorageType('Domains.PendingSlashes', 'Optional', [v0.DomainId], sts.array(() => sts.bigint())) as PendingSlashesV0,
}

/**
 *  A list operators who were slashed during the current epoch associated with the domain.
 *  When the epoch for a given domain is complete, operator total stake is moved to treasury and
 *  then deleted.
 */
export interface PendingSlashesV0  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v0.DomainId): Promise<(bigint[] | undefined)>
    getMany(block: Block, keys: v0.DomainId[]): Promise<(bigint[] | undefined)[]>
    getKeys(block: Block): Promise<v0.DomainId[]>
    getKeys(block: Block, key: v0.DomainId): Promise<v0.DomainId[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v0.DomainId[]>
    getKeysPaged(pageSize: number, block: Block, key: v0.DomainId): AsyncIterable<v0.DomainId[]>
    getPairs(block: Block): Promise<[k: v0.DomainId, v: (bigint[] | undefined)][]>
    getPairs(block: Block, key: v0.DomainId): Promise<[k: v0.DomainId, v: (bigint[] | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v0.DomainId, v: (bigint[] | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v0.DomainId): AsyncIterable<[k: v0.DomainId, v: (bigint[] | undefined)][]>
}

export const pendingStakingOperationCount =  {
    /**
     *  The pending staking operation count of the current epoch, it should not larger than
     *  `MaxPendingStakingOperation` and will be resetted to 0 upon epoch transition.
     */
    v0: new StorageType('Domains.PendingStakingOperationCount', 'Default', [v0.DomainId], sts.number()) as PendingStakingOperationCountV0,
}

/**
 *  The pending staking operation count of the current epoch, it should not larger than
 *  `MaxPendingStakingOperation` and will be resetted to 0 upon epoch transition.
 */
export interface PendingStakingOperationCountV0  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): number
    get(block: Block, key: v0.DomainId): Promise<(number | undefined)>
    getMany(block: Block, keys: v0.DomainId[]): Promise<(number | undefined)[]>
    getKeys(block: Block): Promise<v0.DomainId[]>
    getKeys(block: Block, key: v0.DomainId): Promise<v0.DomainId[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v0.DomainId[]>
    getKeysPaged(pageSize: number, block: Block, key: v0.DomainId): AsyncIterable<v0.DomainId[]>
    getPairs(block: Block): Promise<[k: v0.DomainId, v: (number | undefined)][]>
    getPairs(block: Block, key: v0.DomainId): Promise<[k: v0.DomainId, v: (number | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v0.DomainId, v: (number | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v0.DomainId): AsyncIterable<[k: v0.DomainId, v: (number | undefined)][]>
}

export const nextDomainId =  {
    /**
     *  Stores the next domain id.
     */
    v0: new StorageType('Domains.NextDomainId', 'Default', [], v0.DomainId) as NextDomainIdV0,
}

/**
 *  Stores the next domain id.
 */
export interface NextDomainIdV0  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v0.DomainId
    get(block: Block): Promise<(v0.DomainId | undefined)>
}

export const domainRegistry =  {
    /**
     *  The domain registry
     */
    v0: new StorageType('Domains.DomainRegistry', 'Optional', [v0.DomainId], v0.DomainObject) as DomainRegistryV0,
    /**
     *  The domain registry
     */
    v1: new StorageType('Domains.DomainRegistry', 'Optional', [v1.DomainId], v1.DomainObject) as DomainRegistryV1,
    /**
     *  The domain registry
     */
    v5: new StorageType('Domains.DomainRegistry', 'Optional', [v5.DomainId], v5.DomainObject) as DomainRegistryV5,
}

/**
 *  The domain registry
 */
export interface DomainRegistryV0  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v0.DomainId): Promise<(v0.DomainObject | undefined)>
    getMany(block: Block, keys: v0.DomainId[]): Promise<(v0.DomainObject | undefined)[]>
    getKeys(block: Block): Promise<v0.DomainId[]>
    getKeys(block: Block, key: v0.DomainId): Promise<v0.DomainId[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v0.DomainId[]>
    getKeysPaged(pageSize: number, block: Block, key: v0.DomainId): AsyncIterable<v0.DomainId[]>
    getPairs(block: Block): Promise<[k: v0.DomainId, v: (v0.DomainObject | undefined)][]>
    getPairs(block: Block, key: v0.DomainId): Promise<[k: v0.DomainId, v: (v0.DomainObject | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v0.DomainId, v: (v0.DomainObject | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v0.DomainId): AsyncIterable<[k: v0.DomainId, v: (v0.DomainObject | undefined)][]>
}

/**
 *  The domain registry
 */
export interface DomainRegistryV1  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v1.DomainId): Promise<(v1.DomainObject | undefined)>
    getMany(block: Block, keys: v1.DomainId[]): Promise<(v1.DomainObject | undefined)[]>
    getKeys(block: Block): Promise<v1.DomainId[]>
    getKeys(block: Block, key: v1.DomainId): Promise<v1.DomainId[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v1.DomainId[]>
    getKeysPaged(pageSize: number, block: Block, key: v1.DomainId): AsyncIterable<v1.DomainId[]>
    getPairs(block: Block): Promise<[k: v1.DomainId, v: (v1.DomainObject | undefined)][]>
    getPairs(block: Block, key: v1.DomainId): Promise<[k: v1.DomainId, v: (v1.DomainObject | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v1.DomainId, v: (v1.DomainObject | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v1.DomainId): AsyncIterable<[k: v1.DomainId, v: (v1.DomainObject | undefined)][]>
}

/**
 *  The domain registry
 */
export interface DomainRegistryV5  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v5.DomainId): Promise<(v5.DomainObject | undefined)>
    getMany(block: Block, keys: v5.DomainId[]): Promise<(v5.DomainObject | undefined)[]>
    getKeys(block: Block): Promise<v5.DomainId[]>
    getKeys(block: Block, key: v5.DomainId): Promise<v5.DomainId[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v5.DomainId[]>
    getKeysPaged(pageSize: number, block: Block, key: v5.DomainId): AsyncIterable<v5.DomainId[]>
    getPairs(block: Block): Promise<[k: v5.DomainId, v: (v5.DomainObject | undefined)][]>
    getPairs(block: Block, key: v5.DomainId): Promise<[k: v5.DomainId, v: (v5.DomainObject | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v5.DomainId, v: (v5.DomainObject | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v5.DomainId): AsyncIterable<[k: v5.DomainId, v: (v5.DomainObject | undefined)][]>
}

export const blockTree =  {
    /**
     *  The domain block tree, map (`domain_id`, `domain_block_number`) to the hash of ER,
     *  which can be used get the block tree node in `BlockTreeNodes`
     */
    v0: new StorageType('Domains.BlockTree', 'Optional', [v0.DomainId, sts.number()], v0.H256) as BlockTreeV0,
}

/**
 *  The domain block tree, map (`domain_id`, `domain_block_number`) to the hash of ER,
 *  which can be used get the block tree node in `BlockTreeNodes`
 */
export interface BlockTreeV0  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key1: v0.DomainId, key2: number): Promise<(v0.H256 | undefined)>
    getMany(block: Block, keys: [v0.DomainId, number][]): Promise<(v0.H256 | undefined)[]>
    getKeys(block: Block): Promise<[v0.DomainId, number][]>
    getKeys(block: Block, key1: v0.DomainId): Promise<[v0.DomainId, number][]>
    getKeys(block: Block, key1: v0.DomainId, key2: number): Promise<[v0.DomainId, number][]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<[v0.DomainId, number][]>
    getKeysPaged(pageSize: number, block: Block, key1: v0.DomainId): AsyncIterable<[v0.DomainId, number][]>
    getKeysPaged(pageSize: number, block: Block, key1: v0.DomainId, key2: number): AsyncIterable<[v0.DomainId, number][]>
    getPairs(block: Block): Promise<[k: [v0.DomainId, number], v: (v0.H256 | undefined)][]>
    getPairs(block: Block, key1: v0.DomainId): Promise<[k: [v0.DomainId, number], v: (v0.H256 | undefined)][]>
    getPairs(block: Block, key1: v0.DomainId, key2: number): Promise<[k: [v0.DomainId, number], v: (v0.H256 | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: [v0.DomainId, number], v: (v0.H256 | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: v0.DomainId): AsyncIterable<[k: [v0.DomainId, number], v: (v0.H256 | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: v0.DomainId, key2: number): AsyncIterable<[k: [v0.DomainId, number], v: (v0.H256 | undefined)][]>
}

export const blockTreeNodes =  {
    /**
     *  Mapping of block tree node hash to the node, each node represent a domain block
     */
    v0: new StorageType('Domains.BlockTreeNodes', 'Optional', [v0.H256], v0.BlockTreeNode) as BlockTreeNodesV0,
    /**
     *  Mapping of block tree node hash to the node, each node represent a domain block
     */
    v1: new StorageType('Domains.BlockTreeNodes', 'Optional', [v1.H256], v1.BlockTreeNode) as BlockTreeNodesV1,
    /**
     *  Mapping of block tree node hash to the node, each node represent a domain block
     */
    v5: new StorageType('Domains.BlockTreeNodes', 'Optional', [v5.H256], v5.BlockTreeNode) as BlockTreeNodesV5,
    /**
     *  Mapping of block tree node hash to the node, each node represent a domain block
     */
    v6: new StorageType('Domains.BlockTreeNodes', 'Optional', [v6.H256], v6.BlockTreeNode) as BlockTreeNodesV6,
}

/**
 *  Mapping of block tree node hash to the node, each node represent a domain block
 */
export interface BlockTreeNodesV0  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v0.H256): Promise<(v0.BlockTreeNode | undefined)>
    getMany(block: Block, keys: v0.H256[]): Promise<(v0.BlockTreeNode | undefined)[]>
    getKeys(block: Block): Promise<v0.H256[]>
    getKeys(block: Block, key: v0.H256): Promise<v0.H256[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v0.H256[]>
    getKeysPaged(pageSize: number, block: Block, key: v0.H256): AsyncIterable<v0.H256[]>
    getPairs(block: Block): Promise<[k: v0.H256, v: (v0.BlockTreeNode | undefined)][]>
    getPairs(block: Block, key: v0.H256): Promise<[k: v0.H256, v: (v0.BlockTreeNode | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v0.H256, v: (v0.BlockTreeNode | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v0.H256): AsyncIterable<[k: v0.H256, v: (v0.BlockTreeNode | undefined)][]>
}

/**
 *  Mapping of block tree node hash to the node, each node represent a domain block
 */
export interface BlockTreeNodesV1  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v1.H256): Promise<(v1.BlockTreeNode | undefined)>
    getMany(block: Block, keys: v1.H256[]): Promise<(v1.BlockTreeNode | undefined)[]>
    getKeys(block: Block): Promise<v1.H256[]>
    getKeys(block: Block, key: v1.H256): Promise<v1.H256[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v1.H256[]>
    getKeysPaged(pageSize: number, block: Block, key: v1.H256): AsyncIterable<v1.H256[]>
    getPairs(block: Block): Promise<[k: v1.H256, v: (v1.BlockTreeNode | undefined)][]>
    getPairs(block: Block, key: v1.H256): Promise<[k: v1.H256, v: (v1.BlockTreeNode | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v1.H256, v: (v1.BlockTreeNode | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v1.H256): AsyncIterable<[k: v1.H256, v: (v1.BlockTreeNode | undefined)][]>
}

/**
 *  Mapping of block tree node hash to the node, each node represent a domain block
 */
export interface BlockTreeNodesV5  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v5.H256): Promise<(v5.BlockTreeNode | undefined)>
    getMany(block: Block, keys: v5.H256[]): Promise<(v5.BlockTreeNode | undefined)[]>
    getKeys(block: Block): Promise<v5.H256[]>
    getKeys(block: Block, key: v5.H256): Promise<v5.H256[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v5.H256[]>
    getKeysPaged(pageSize: number, block: Block, key: v5.H256): AsyncIterable<v5.H256[]>
    getPairs(block: Block): Promise<[k: v5.H256, v: (v5.BlockTreeNode | undefined)][]>
    getPairs(block: Block, key: v5.H256): Promise<[k: v5.H256, v: (v5.BlockTreeNode | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v5.H256, v: (v5.BlockTreeNode | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v5.H256): AsyncIterable<[k: v5.H256, v: (v5.BlockTreeNode | undefined)][]>
}

/**
 *  Mapping of block tree node hash to the node, each node represent a domain block
 */
export interface BlockTreeNodesV6  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v6.H256): Promise<(v6.BlockTreeNode | undefined)>
    getMany(block: Block, keys: v6.H256[]): Promise<(v6.BlockTreeNode | undefined)[]>
    getKeys(block: Block): Promise<v6.H256[]>
    getKeys(block: Block, key: v6.H256): Promise<v6.H256[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v6.H256[]>
    getKeysPaged(pageSize: number, block: Block, key: v6.H256): AsyncIterable<v6.H256[]>
    getPairs(block: Block): Promise<[k: v6.H256, v: (v6.BlockTreeNode | undefined)][]>
    getPairs(block: Block, key: v6.H256): Promise<[k: v6.H256, v: (v6.BlockTreeNode | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v6.H256, v: (v6.BlockTreeNode | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v6.H256): AsyncIterable<[k: v6.H256, v: (v6.BlockTreeNode | undefined)][]>
}

export const headReceiptNumber =  {
    /**
     *  The head receipt number of each domain
     */
    v0: new StorageType('Domains.HeadReceiptNumber', 'Default', [v0.DomainId], sts.number()) as HeadReceiptNumberV0,
}

/**
 *  The head receipt number of each domain
 */
export interface HeadReceiptNumberV0  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): number
    get(block: Block, key: v0.DomainId): Promise<(number | undefined)>
    getMany(block: Block, keys: v0.DomainId[]): Promise<(number | undefined)[]>
    getKeys(block: Block): Promise<v0.DomainId[]>
    getKeys(block: Block, key: v0.DomainId): Promise<v0.DomainId[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v0.DomainId[]>
    getKeysPaged(pageSize: number, block: Block, key: v0.DomainId): AsyncIterable<v0.DomainId[]>
    getPairs(block: Block): Promise<[k: v0.DomainId, v: (number | undefined)][]>
    getPairs(block: Block, key: v0.DomainId): Promise<[k: v0.DomainId, v: (number | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v0.DomainId, v: (number | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v0.DomainId): AsyncIterable<[k: v0.DomainId, v: (number | undefined)][]>
}

export const latestConfirmedDomainBlockNumber =  {
    /**
     *  The latest confirmed block number of each domain.
     */
    v0: new StorageType('Domains.LatestConfirmedDomainBlockNumber', 'Default', [v0.DomainId], sts.number()) as LatestConfirmedDomainBlockNumberV0,
}

/**
 *  The latest confirmed block number of each domain.
 */
export interface LatestConfirmedDomainBlockNumberV0  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): number
    get(block: Block, key: v0.DomainId): Promise<(number | undefined)>
    getMany(block: Block, keys: v0.DomainId[]): Promise<(number | undefined)[]>
    getKeys(block: Block): Promise<v0.DomainId[]>
    getKeys(block: Block, key: v0.DomainId): Promise<v0.DomainId[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v0.DomainId[]>
    getKeysPaged(pageSize: number, block: Block, key: v0.DomainId): AsyncIterable<v0.DomainId[]>
    getPairs(block: Block): Promise<[k: v0.DomainId, v: (number | undefined)][]>
    getPairs(block: Block, key: v0.DomainId): Promise<[k: v0.DomainId, v: (number | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v0.DomainId, v: (number | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v0.DomainId): AsyncIterable<[k: v0.DomainId, v: (number | undefined)][]>
}

export const headReceiptExtended =  {
    /**
     *  Whether the head receipt have extended in the current consensus block
     * 
     *  Temporary storage only exist during block execution
     */
    v0: new StorageType('Domains.HeadReceiptExtended', 'Default', [v0.DomainId], sts.boolean()) as HeadReceiptExtendedV0,
}

/**
 *  Whether the head receipt have extended in the current consensus block
 * 
 *  Temporary storage only exist during block execution
 */
export interface HeadReceiptExtendedV0  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): boolean
    get(block: Block, key: v0.DomainId): Promise<(boolean | undefined)>
    getMany(block: Block, keys: v0.DomainId[]): Promise<(boolean | undefined)[]>
    getKeys(block: Block): Promise<v0.DomainId[]>
    getKeys(block: Block, key: v0.DomainId): Promise<v0.DomainId[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v0.DomainId[]>
    getKeysPaged(pageSize: number, block: Block, key: v0.DomainId): AsyncIterable<v0.DomainId[]>
    getPairs(block: Block): Promise<[k: v0.DomainId, v: (boolean | undefined)][]>
    getPairs(block: Block, key: v0.DomainId): Promise<[k: v0.DomainId, v: (boolean | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v0.DomainId, v: (boolean | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v0.DomainId): AsyncIterable<[k: v0.DomainId, v: (boolean | undefined)][]>
}

export const stateRoots =  {
    /**
     *  State root mapped again each domain (block, hash)
     *  This acts as an index for other protocols like XDM to fetch state roots faster.
     */
    v0: new StorageType('Domains.StateRoots', 'Optional', [sts.tuple(() => [v0.DomainId, sts.number(), v0.H256])], v0.H256) as StateRootsV0,
}

/**
 *  State root mapped again each domain (block, hash)
 *  This acts as an index for other protocols like XDM to fetch state roots faster.
 */
export interface StateRootsV0  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: [v0.DomainId, number, v0.H256]): Promise<(v0.H256 | undefined)>
    getMany(block: Block, keys: [v0.DomainId, number, v0.H256][]): Promise<(v0.H256 | undefined)[]>
    getKeys(block: Block): Promise<[v0.DomainId, number, v0.H256][]>
    getKeys(block: Block, key: [v0.DomainId, number, v0.H256]): Promise<[v0.DomainId, number, v0.H256][]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<[v0.DomainId, number, v0.H256][]>
    getKeysPaged(pageSize: number, block: Block, key: [v0.DomainId, number, v0.H256]): AsyncIterable<[v0.DomainId, number, v0.H256][]>
    getPairs(block: Block): Promise<[k: [v0.DomainId, number, v0.H256], v: (v0.H256 | undefined)][]>
    getPairs(block: Block, key: [v0.DomainId, number, v0.H256]): Promise<[k: [v0.DomainId, number, v0.H256], v: (v0.H256 | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: [v0.DomainId, number, v0.H256], v: (v0.H256 | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: [v0.DomainId, number, v0.H256]): AsyncIterable<[k: [v0.DomainId, number, v0.H256], v: (v0.H256 | undefined)][]>
}

export const consensusBlockHash =  {
    /**
     *  The consensus block hash used to verify ER,
     *  only store the consensus block hash for a domain
     *  if that consensus block contains bundle of the domain, the hash will be pruned when the ER
     *  that point to the consensus block is pruned.
     * 
     *  TODO: this storage is unbounded in some cases, see https://github.com/subspace/subspace/issues/1673
     *  for more details, this will be fixed once https://github.com/subspace/subspace/issues/1731 is implemented.
     */
    v0: new StorageType('Domains.ConsensusBlockHash', 'Optional', [v0.DomainId, sts.number()], v0.H256) as ConsensusBlockHashV0,
}

/**
 *  The consensus block hash used to verify ER,
 *  only store the consensus block hash for a domain
 *  if that consensus block contains bundle of the domain, the hash will be pruned when the ER
 *  that point to the consensus block is pruned.
 * 
 *  TODO: this storage is unbounded in some cases, see https://github.com/subspace/subspace/issues/1673
 *  for more details, this will be fixed once https://github.com/subspace/subspace/issues/1731 is implemented.
 */
export interface ConsensusBlockHashV0  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key1: v0.DomainId, key2: number): Promise<(v0.H256 | undefined)>
    getMany(block: Block, keys: [v0.DomainId, number][]): Promise<(v0.H256 | undefined)[]>
    getKeys(block: Block): Promise<[v0.DomainId, number][]>
    getKeys(block: Block, key1: v0.DomainId): Promise<[v0.DomainId, number][]>
    getKeys(block: Block, key1: v0.DomainId, key2: number): Promise<[v0.DomainId, number][]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<[v0.DomainId, number][]>
    getKeysPaged(pageSize: number, block: Block, key1: v0.DomainId): AsyncIterable<[v0.DomainId, number][]>
    getKeysPaged(pageSize: number, block: Block, key1: v0.DomainId, key2: number): AsyncIterable<[v0.DomainId, number][]>
    getPairs(block: Block): Promise<[k: [v0.DomainId, number], v: (v0.H256 | undefined)][]>
    getPairs(block: Block, key1: v0.DomainId): Promise<[k: [v0.DomainId, number], v: (v0.H256 | undefined)][]>
    getPairs(block: Block, key1: v0.DomainId, key2: number): Promise<[k: [v0.DomainId, number], v: (v0.H256 | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: [v0.DomainId, number], v: (v0.H256 | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: v0.DomainId): AsyncIterable<[k: [v0.DomainId, number], v: (v0.H256 | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: v0.DomainId, key2: number): AsyncIterable<[k: [v0.DomainId, number], v: (v0.H256 | undefined)][]>
}

export const executionInbox =  {
    /**
     *  A set of `BundleDigest` from all bundles that successfully submitted to the consensus block,
     *  these bundles will be used to construct the domain block and `ExecutionInbox` is used to:
     * 
     *  1. Ensure subsequent ERs of that domain block include all pre-validated extrinsic bundles
     *  2. Index the `InboxedBundleAuthor` and pruned its value when the corresponding `ExecutionInbox` is pruned
     */
    v0: new StorageType('Domains.ExecutionInbox', 'Default', [v0.DomainId, sts.number(), sts.number()], sts.array(() => v0.BundleDigest)) as ExecutionInboxV0,
    /**
     *  A set of `BundleDigest` from all bundles that successfully submitted to the consensus block,
     *  these bundles will be used to construct the domain block and `ExecutionInbox` is used to:
     * 
     *  1. Ensure subsequent ERs of that domain block include all pre-validated extrinsic bundles
     *  2. Index the `InboxedBundleAuthor` and pruned its value when the corresponding `ExecutionInbox` is pruned
     */
    v1: new StorageType('Domains.ExecutionInbox', 'Default', [v1.DomainId, sts.number(), sts.number()], sts.array(() => v1.BundleDigest)) as ExecutionInboxV1,
}

/**
 *  A set of `BundleDigest` from all bundles that successfully submitted to the consensus block,
 *  these bundles will be used to construct the domain block and `ExecutionInbox` is used to:
 * 
 *  1. Ensure subsequent ERs of that domain block include all pre-validated extrinsic bundles
 *  2. Index the `InboxedBundleAuthor` and pruned its value when the corresponding `ExecutionInbox` is pruned
 */
export interface ExecutionInboxV0  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v0.BundleDigest[]
    get(block: Block, key1: v0.DomainId, key2: number, key3: number): Promise<(v0.BundleDigest[] | undefined)>
    getMany(block: Block, keys: [v0.DomainId, number, number][]): Promise<(v0.BundleDigest[] | undefined)[]>
    getKeys(block: Block): Promise<[v0.DomainId, number, number][]>
    getKeys(block: Block, key1: v0.DomainId): Promise<[v0.DomainId, number, number][]>
    getKeys(block: Block, key1: v0.DomainId, key2: number): Promise<[v0.DomainId, number, number][]>
    getKeys(block: Block, key1: v0.DomainId, key2: number, key3: number): Promise<[v0.DomainId, number, number][]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<[v0.DomainId, number, number][]>
    getKeysPaged(pageSize: number, block: Block, key1: v0.DomainId): AsyncIterable<[v0.DomainId, number, number][]>
    getKeysPaged(pageSize: number, block: Block, key1: v0.DomainId, key2: number): AsyncIterable<[v0.DomainId, number, number][]>
    getKeysPaged(pageSize: number, block: Block, key1: v0.DomainId, key2: number, key3: number): AsyncIterable<[v0.DomainId, number, number][]>
    getPairs(block: Block): Promise<[k: [v0.DomainId, number, number], v: (v0.BundleDigest[] | undefined)][]>
    getPairs(block: Block, key1: v0.DomainId): Promise<[k: [v0.DomainId, number, number], v: (v0.BundleDigest[] | undefined)][]>
    getPairs(block: Block, key1: v0.DomainId, key2: number): Promise<[k: [v0.DomainId, number, number], v: (v0.BundleDigest[] | undefined)][]>
    getPairs(block: Block, key1: v0.DomainId, key2: number, key3: number): Promise<[k: [v0.DomainId, number, number], v: (v0.BundleDigest[] | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: [v0.DomainId, number, number], v: (v0.BundleDigest[] | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: v0.DomainId): AsyncIterable<[k: [v0.DomainId, number, number], v: (v0.BundleDigest[] | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: v0.DomainId, key2: number): AsyncIterable<[k: [v0.DomainId, number, number], v: (v0.BundleDigest[] | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: v0.DomainId, key2: number, key3: number): AsyncIterable<[k: [v0.DomainId, number, number], v: (v0.BundleDigest[] | undefined)][]>
}

/**
 *  A set of `BundleDigest` from all bundles that successfully submitted to the consensus block,
 *  these bundles will be used to construct the domain block and `ExecutionInbox` is used to:
 * 
 *  1. Ensure subsequent ERs of that domain block include all pre-validated extrinsic bundles
 *  2. Index the `InboxedBundleAuthor` and pruned its value when the corresponding `ExecutionInbox` is pruned
 */
export interface ExecutionInboxV1  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v1.BundleDigest[]
    get(block: Block, key1: v1.DomainId, key2: number, key3: number): Promise<(v1.BundleDigest[] | undefined)>
    getMany(block: Block, keys: [v1.DomainId, number, number][]): Promise<(v1.BundleDigest[] | undefined)[]>
    getKeys(block: Block): Promise<[v1.DomainId, number, number][]>
    getKeys(block: Block, key1: v1.DomainId): Promise<[v1.DomainId, number, number][]>
    getKeys(block: Block, key1: v1.DomainId, key2: number): Promise<[v1.DomainId, number, number][]>
    getKeys(block: Block, key1: v1.DomainId, key2: number, key3: number): Promise<[v1.DomainId, number, number][]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<[v1.DomainId, number, number][]>
    getKeysPaged(pageSize: number, block: Block, key1: v1.DomainId): AsyncIterable<[v1.DomainId, number, number][]>
    getKeysPaged(pageSize: number, block: Block, key1: v1.DomainId, key2: number): AsyncIterable<[v1.DomainId, number, number][]>
    getKeysPaged(pageSize: number, block: Block, key1: v1.DomainId, key2: number, key3: number): AsyncIterable<[v1.DomainId, number, number][]>
    getPairs(block: Block): Promise<[k: [v1.DomainId, number, number], v: (v1.BundleDigest[] | undefined)][]>
    getPairs(block: Block, key1: v1.DomainId): Promise<[k: [v1.DomainId, number, number], v: (v1.BundleDigest[] | undefined)][]>
    getPairs(block: Block, key1: v1.DomainId, key2: number): Promise<[k: [v1.DomainId, number, number], v: (v1.BundleDigest[] | undefined)][]>
    getPairs(block: Block, key1: v1.DomainId, key2: number, key3: number): Promise<[k: [v1.DomainId, number, number], v: (v1.BundleDigest[] | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: [v1.DomainId, number, number], v: (v1.BundleDigest[] | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: v1.DomainId): AsyncIterable<[k: [v1.DomainId, number, number], v: (v1.BundleDigest[] | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: v1.DomainId, key2: number): AsyncIterable<[k: [v1.DomainId, number, number], v: (v1.BundleDigest[] | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: v1.DomainId, key2: number, key3: number): AsyncIterable<[k: [v1.DomainId, number, number], v: (v1.BundleDigest[] | undefined)][]>
}

export const inboxedBundleAuthor =  {
    /**
     *  A mapping of `bundle_header_hash` -> `bundle_author` for all the successfully submitted bundles of
     *  the last `BlockTreePruningDepth` domain blocks. Used to verify the invalid bundle fraud proof and
     *  slash malicious operator who have submitted invalid bundle.
     */
    v0: new StorageType('Domains.InboxedBundleAuthor', 'Optional', [v0.H256], sts.bigint()) as InboxedBundleAuthorV0,
}

/**
 *  A mapping of `bundle_header_hash` -> `bundle_author` for all the successfully submitted bundles of
 *  the last `BlockTreePruningDepth` domain blocks. Used to verify the invalid bundle fraud proof and
 *  slash malicious operator who have submitted invalid bundle.
 */
export interface InboxedBundleAuthorV0  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v0.H256): Promise<(bigint | undefined)>
    getMany(block: Block, keys: v0.H256[]): Promise<(bigint | undefined)[]>
    getKeys(block: Block): Promise<v0.H256[]>
    getKeys(block: Block, key: v0.H256): Promise<v0.H256[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v0.H256[]>
    getKeysPaged(pageSize: number, block: Block, key: v0.H256): AsyncIterable<v0.H256[]>
    getPairs(block: Block): Promise<[k: v0.H256, v: (bigint | undefined)][]>
    getPairs(block: Block, key: v0.H256): Promise<[k: v0.H256, v: (bigint | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v0.H256, v: (bigint | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v0.H256): AsyncIterable<[k: v0.H256, v: (bigint | undefined)][]>
}

export const headDomainNumber =  {
    /**
     *  The block number of the best domain block, increase by one when the first bundle of the domain is
     *  successfully submitted to current consensus block, which mean a new domain block with this block
     *  number will be produce. Used as a pointer in `ExecutionInbox` to identify the current under building
     *  domain block, also used as a mapping of consensus block number to domain block number.
     */
    v0: new StorageType('Domains.HeadDomainNumber', 'Default', [v0.DomainId], sts.number()) as HeadDomainNumberV0,
}

/**
 *  The block number of the best domain block, increase by one when the first bundle of the domain is
 *  successfully submitted to current consensus block, which mean a new domain block with this block
 *  number will be produce. Used as a pointer in `ExecutionInbox` to identify the current under building
 *  domain block, also used as a mapping of consensus block number to domain block number.
 */
export interface HeadDomainNumberV0  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): number
    get(block: Block, key: v0.DomainId): Promise<(number | undefined)>
    getMany(block: Block, keys: v0.DomainId[]): Promise<(number | undefined)[]>
    getKeys(block: Block): Promise<v0.DomainId[]>
    getKeys(block: Block, key: v0.DomainId): Promise<v0.DomainId[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v0.DomainId[]>
    getKeysPaged(pageSize: number, block: Block, key: v0.DomainId): AsyncIterable<v0.DomainId[]>
    getPairs(block: Block): Promise<[k: v0.DomainId, v: (number | undefined)][]>
    getPairs(block: Block, key: v0.DomainId): Promise<[k: v0.DomainId, v: (number | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v0.DomainId, v: (number | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v0.DomainId): AsyncIterable<[k: v0.DomainId, v: (number | undefined)][]>
}

export const lastEpochStakingDistribution =  {
    /**
     *  A temporary storage to hold any previous epoch details for a given domain
     *  if the epoch transitioned in this block so that all the submitted bundles
     *  within this block are verified.
     *  TODO: The storage is cleared on block finalization that means this storage is already cleared when
     *  verifying the `submit_bundle` extrinsic and not used at all
     */
    v0: new StorageType('Domains.LastEpochStakingDistribution', 'Optional', [v0.DomainId], v0.ElectionVerificationParams) as LastEpochStakingDistributionV0,
}

/**
 *  A temporary storage to hold any previous epoch details for a given domain
 *  if the epoch transitioned in this block so that all the submitted bundles
 *  within this block are verified.
 *  TODO: The storage is cleared on block finalization that means this storage is already cleared when
 *  verifying the `submit_bundle` extrinsic and not used at all
 */
export interface LastEpochStakingDistributionV0  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v0.DomainId): Promise<(v0.ElectionVerificationParams | undefined)>
    getMany(block: Block, keys: v0.DomainId[]): Promise<(v0.ElectionVerificationParams | undefined)[]>
    getKeys(block: Block): Promise<v0.DomainId[]>
    getKeys(block: Block, key: v0.DomainId): Promise<v0.DomainId[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v0.DomainId[]>
    getKeysPaged(pageSize: number, block: Block, key: v0.DomainId): AsyncIterable<v0.DomainId[]>
    getPairs(block: Block): Promise<[k: v0.DomainId, v: (v0.ElectionVerificationParams | undefined)][]>
    getPairs(block: Block, key: v0.DomainId): Promise<[k: v0.DomainId, v: (v0.ElectionVerificationParams | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v0.DomainId, v: (v0.ElectionVerificationParams | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v0.DomainId): AsyncIterable<[k: v0.DomainId, v: (v0.ElectionVerificationParams | undefined)][]>
}

export const domainTxRangeState =  {
    v0: new StorageType('Domains.DomainTxRangeState', 'Optional', [v0.DomainId], v0.TxRangeState) as DomainTxRangeStateV0,
}

export interface DomainTxRangeStateV0  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v0.DomainId): Promise<(v0.TxRangeState | undefined)>
    getMany(block: Block, keys: v0.DomainId[]): Promise<(v0.TxRangeState | undefined)[]>
    getKeys(block: Block): Promise<v0.DomainId[]>
    getKeys(block: Block, key: v0.DomainId): Promise<v0.DomainId[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v0.DomainId[]>
    getKeysPaged(pageSize: number, block: Block, key: v0.DomainId): AsyncIterable<v0.DomainId[]>
    getPairs(block: Block): Promise<[k: v0.DomainId, v: (v0.TxRangeState | undefined)][]>
    getPairs(block: Block, key: v0.DomainId): Promise<[k: v0.DomainId, v: (v0.TxRangeState | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v0.DomainId, v: (v0.TxRangeState | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v0.DomainId): AsyncIterable<[k: v0.DomainId, v: (v0.TxRangeState | undefined)][]>
}

export const latestConfirmedDomainBlock =  {
    /**
     *  Storage to hold all the domain's latest confirmed block.
     */
    v1: new StorageType('Domains.LatestConfirmedDomainBlock', 'Optional', [v1.DomainId], v1.ConfirmedDomainBlock) as LatestConfirmedDomainBlockV1,
}

/**
 *  Storage to hold all the domain's latest confirmed block.
 */
export interface LatestConfirmedDomainBlockV1  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v1.DomainId): Promise<(v1.ConfirmedDomainBlock | undefined)>
    getMany(block: Block, keys: v1.DomainId[]): Promise<(v1.ConfirmedDomainBlock | undefined)[]>
    getKeys(block: Block): Promise<v1.DomainId[]>
    getKeys(block: Block, key: v1.DomainId): Promise<v1.DomainId[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v1.DomainId[]>
    getKeysPaged(pageSize: number, block: Block, key: v1.DomainId): AsyncIterable<v1.DomainId[]>
    getPairs(block: Block): Promise<[k: v1.DomainId, v: (v1.ConfirmedDomainBlock | undefined)][]>
    getPairs(block: Block, key: v1.DomainId): Promise<[k: v1.DomainId, v: (v1.ConfirmedDomainBlock | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v1.DomainId, v: (v1.ConfirmedDomainBlock | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v1.DomainId): AsyncIterable<[k: v1.DomainId, v: (v1.ConfirmedDomainBlock | undefined)][]>
}

export const latestSubmittedEr =  {
    /**
     *  The latest ER submitted by the operator for a given domain. It is used to determine if the operator
     *  has submitted bad ER and is pending to slash.
     * 
     *  The storage item of a given `(domain_id, operator_id)` will be pruned after either:
     *  - All the ERs submitted by the operator for this domain are confirmed and pruned
     *  - All the bad ERs submitted by the operator for this domain are pruned and the operator is slashed
     */
    v3: new StorageType('Domains.LatestSubmittedER', 'Default', [sts.tuple(() => [v3.DomainId, sts.bigint()])], sts.number()) as LatestSubmittedErV3,
}

/**
 *  The latest ER submitted by the operator for a given domain. It is used to determine if the operator
 *  has submitted bad ER and is pending to slash.
 * 
 *  The storage item of a given `(domain_id, operator_id)` will be pruned after either:
 *  - All the ERs submitted by the operator for this domain are confirmed and pruned
 *  - All the bad ERs submitted by the operator for this domain are pruned and the operator is slashed
 */
export interface LatestSubmittedErV3  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): number
    get(block: Block, key: [v3.DomainId, bigint]): Promise<(number | undefined)>
    getMany(block: Block, keys: [v3.DomainId, bigint][]): Promise<(number | undefined)[]>
    getKeys(block: Block): Promise<[v3.DomainId, bigint][]>
    getKeys(block: Block, key: [v3.DomainId, bigint]): Promise<[v3.DomainId, bigint][]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<[v3.DomainId, bigint][]>
    getKeysPaged(pageSize: number, block: Block, key: [v3.DomainId, bigint]): AsyncIterable<[v3.DomainId, bigint][]>
    getPairs(block: Block): Promise<[k: [v3.DomainId, bigint], v: (number | undefined)][]>
    getPairs(block: Block, key: [v3.DomainId, bigint]): Promise<[k: [v3.DomainId, bigint], v: (number | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: [v3.DomainId, bigint], v: (number | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: [v3.DomainId, bigint]): AsyncIterable<[k: [v3.DomainId, bigint], v: (number | undefined)][]>
}

export const operatorHighestSlot =  {
    /**
     *  The highest slot of the bundle submitted by an operator
     */
    v5: new StorageType('Domains.OperatorHighestSlot', 'Default', [sts.bigint()], sts.bigint()) as OperatorHighestSlotV5,
}

/**
 *  The highest slot of the bundle submitted by an operator
 */
export interface OperatorHighestSlotV5  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): bigint
    get(block: Block, key: bigint): Promise<(bigint | undefined)>
    getMany(block: Block, keys: bigint[]): Promise<(bigint | undefined)[]>
    getKeys(block: Block): Promise<bigint[]>
    getKeys(block: Block, key: bigint): Promise<bigint[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<bigint[]>
    getKeysPaged(pageSize: number, block: Block, key: bigint): AsyncIterable<bigint[]>
    getPairs(block: Block): Promise<[k: bigint, v: (bigint | undefined)][]>
    getPairs(block: Block, key: bigint): Promise<[k: bigint, v: (bigint | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: bigint, v: (bigint | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: bigint): AsyncIterable<[k: bigint, v: (bigint | undefined)][]>
}

export const operatorBundleSlot =  {
    /**
     *  The set of slot of the bundle submitted by an operator in the current block, cleared at the
     *  next block initialization
     */
    v5: new StorageType('Domains.OperatorBundleSlot', 'Default', [sts.bigint()], sts.array(() => sts.bigint())) as OperatorBundleSlotV5,
}

/**
 *  The set of slot of the bundle submitted by an operator in the current block, cleared at the
 *  next block initialization
 */
export interface OperatorBundleSlotV5  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): bigint[]
    get(block: Block, key: bigint): Promise<(bigint[] | undefined)>
    getMany(block: Block, keys: bigint[]): Promise<(bigint[] | undefined)[]>
    getKeys(block: Block): Promise<bigint[]>
    getKeys(block: Block, key: bigint): Promise<bigint[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<bigint[]>
    getKeysPaged(pageSize: number, block: Block, key: bigint): AsyncIterable<bigint[]>
    getPairs(block: Block): Promise<[k: bigint, v: (bigint[] | undefined)][]>
    getPairs(block: Block, key: bigint): Promise<[k: bigint, v: (bigint[] | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: bigint, v: (bigint[] | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: bigint): AsyncIterable<[k: bigint, v: (bigint[] | undefined)][]>
}

export const permissionedActionAllowedBy =  {
    /**
     *  Storage for PermissionedActions for domain instantiation and other permissioned calls.
     */
    v5: new StorageType('Domains.PermissionedActionAllowedBy', 'Optional', [], v5.PermissionedActionAllowedBy) as PermissionedActionAllowedByV5,
}

/**
 *  Storage for PermissionedActions for domain instantiation and other permissioned calls.
 */
export interface PermissionedActionAllowedByV5  {
    is(block: RuntimeCtx): boolean
    get(block: Block): Promise<(v5.PermissionedActionAllowedBy | undefined)>
}

export const accumulatedTreasuryFunds =  {
    /**
     *  Accumulate treasury funds temporarily until the funds are above Existential despoit.
     *  We do this to ensure minting small amounts into treasury would not fail.
     */
    v5: new StorageType('Domains.AccumulatedTreasuryFunds', 'Default', [], sts.bigint()) as AccumulatedTreasuryFundsV5,
}

/**
 *  Accumulate treasury funds temporarily until the funds are above Existential despoit.
 *  We do this to ensure minting small amounts into treasury would not fail.
 */
export interface AccumulatedTreasuryFundsV5  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): bigint
    get(block: Block): Promise<(bigint | undefined)>
}

export const domainRuntimeUpgradeRecords =  {
    /**
     *  Storage used to keep track of which consensus block the domain runtime upgrade happen.
     */
    v5: new StorageType('Domains.DomainRuntimeUpgradeRecords', 'Default', [sts.number()], sts.array(() => sts.tuple(() => [sts.number(), v5.DomainRuntimeUpgradeEntry]))) as DomainRuntimeUpgradeRecordsV5,
}

/**
 *  Storage used to keep track of which consensus block the domain runtime upgrade happen.
 */
export interface DomainRuntimeUpgradeRecordsV5  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): [number, v5.DomainRuntimeUpgradeEntry][]
    get(block: Block, key: number): Promise<([number, v5.DomainRuntimeUpgradeEntry][] | undefined)>
    getMany(block: Block, keys: number[]): Promise<([number, v5.DomainRuntimeUpgradeEntry][] | undefined)[]>
    getKeys(block: Block): Promise<number[]>
    getKeys(block: Block, key: number): Promise<number[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, block: Block, key: number): AsyncIterable<number[]>
    getPairs(block: Block): Promise<[k: number, v: ([number, v5.DomainRuntimeUpgradeEntry][] | undefined)][]>
    getPairs(block: Block, key: number): Promise<[k: number, v: ([number, v5.DomainRuntimeUpgradeEntry][] | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: number, v: ([number, v5.DomainRuntimeUpgradeEntry][] | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: number): AsyncIterable<[k: number, v: ([number, v5.DomainRuntimeUpgradeEntry][] | undefined)][]>
}

export const domainRuntimeUpgrades =  {
    /**
     *  Temporary storage keep track of domain runtime upgrade happen in the current block, cleared
     *  in the next block initialization.
     */
    v5: new StorageType('Domains.DomainRuntimeUpgrades', 'Default', [], sts.array(() => sts.number())) as DomainRuntimeUpgradesV5,
}

/**
 *  Temporary storage keep track of domain runtime upgrade happen in the current block, cleared
 *  in the next block initialization.
 */
export interface DomainRuntimeUpgradesV5  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): number[]
    get(block: Block): Promise<(number[] | undefined)>
}

export const newAddedHeadReceipt =  {
    /**
     *  The hash of the new head receipt added in the current consensus block
     * 
     *  Temporary storage only exist during block execution
     */
    v6: new StorageType('Domains.NewAddedHeadReceipt', 'Optional', [v6.DomainId], v6.H256) as NewAddedHeadReceiptV6,
}

/**
 *  The hash of the new head receipt added in the current consensus block
 * 
 *  Temporary storage only exist during block execution
 */
export interface NewAddedHeadReceiptV6  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v6.DomainId): Promise<(v6.H256 | undefined)>
    getMany(block: Block, keys: v6.DomainId[]): Promise<(v6.H256 | undefined)[]>
    getKeys(block: Block): Promise<v6.DomainId[]>
    getKeys(block: Block, key: v6.DomainId): Promise<v6.DomainId[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v6.DomainId[]>
    getKeysPaged(pageSize: number, block: Block, key: v6.DomainId): AsyncIterable<v6.DomainId[]>
    getPairs(block: Block): Promise<[k: v6.DomainId, v: (v6.H256 | undefined)][]>
    getPairs(block: Block, key: v6.DomainId): Promise<[k: v6.DomainId, v: (v6.H256 | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v6.DomainId, v: (v6.H256 | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v6.DomainId): AsyncIterable<[k: v6.DomainId, v: (v6.H256 | undefined)][]>
}

export const latestConfirmedDomainExecutionReceipt =  {
    /**
     *  Storage to hold all the domain's latest confirmed block.
     */
    v6: new StorageType('Domains.LatestConfirmedDomainExecutionReceipt', 'Optional', [v6.DomainId], v6.ExecutionReceipt) as LatestConfirmedDomainExecutionReceiptV6,
}

/**
 *  Storage to hold all the domain's latest confirmed block.
 */
export interface LatestConfirmedDomainExecutionReceiptV6  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v6.DomainId): Promise<(v6.ExecutionReceipt | undefined)>
    getMany(block: Block, keys: v6.DomainId[]): Promise<(v6.ExecutionReceipt | undefined)[]>
    getKeys(block: Block): Promise<v6.DomainId[]>
    getKeys(block: Block, key: v6.DomainId): Promise<v6.DomainId[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v6.DomainId[]>
    getKeysPaged(pageSize: number, block: Block, key: v6.DomainId): AsyncIterable<v6.DomainId[]>
    getPairs(block: Block): Promise<[k: v6.DomainId, v: (v6.ExecutionReceipt | undefined)][]>
    getPairs(block: Block, key: v6.DomainId): Promise<[k: v6.DomainId, v: (v6.ExecutionReceipt | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v6.DomainId, v: (v6.ExecutionReceipt | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v6.DomainId): AsyncIterable<[k: v6.DomainId, v: (v6.ExecutionReceipt | undefined)][]>
}

export const domainSudoCalls =  {
    /**
     *  Temporary storage to hold the sudo calls meant for the Domains.
     *  Storage is cleared when there are any successful bundles in the next block.
     *  Only one sudo call is allowed per domain per consensus block.
     */
    v6: new StorageType('Domains.DomainSudoCalls', 'Default', [v6.DomainId], v6.DomainSudoCall) as DomainSudoCallsV6,
}

/**
 *  Temporary storage to hold the sudo calls meant for the Domains.
 *  Storage is cleared when there are any successful bundles in the next block.
 *  Only one sudo call is allowed per domain per consensus block.
 */
export interface DomainSudoCallsV6  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v6.DomainSudoCall
    get(block: Block, key: v6.DomainId): Promise<(v6.DomainSudoCall | undefined)>
    getMany(block: Block, keys: v6.DomainId[]): Promise<(v6.DomainSudoCall | undefined)[]>
    getKeys(block: Block): Promise<v6.DomainId[]>
    getKeys(block: Block, key: v6.DomainId): Promise<v6.DomainId[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v6.DomainId[]>
    getKeysPaged(pageSize: number, block: Block, key: v6.DomainId): AsyncIterable<v6.DomainId[]>
    getPairs(block: Block): Promise<[k: v6.DomainId, v: (v6.DomainSudoCall | undefined)][]>
    getPairs(block: Block, key: v6.DomainId): Promise<[k: v6.DomainId, v: (v6.DomainSudoCall | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v6.DomainId, v: (v6.DomainSudoCall | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v6.DomainId): AsyncIterable<[k: v6.DomainId, v: (v6.DomainSudoCall | undefined)][]>
}

export const frozenDomains =  {
    /**
     *  Storage that hold a list of all frozen domains.
     *  A frozen domain does not accept the bundles but does accept a fraud proof.
     */
    v6: new StorageType('Domains.FrozenDomains', 'Default', [], sts.array(() => v6.DomainId)) as FrozenDomainsV6,
}

/**
 *  Storage that hold a list of all frozen domains.
 *  A frozen domain does not accept the bundles but does accept a fraud proof.
 */
export interface FrozenDomainsV6  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v6.DomainId[]
    get(block: Block): Promise<(v6.DomainId[] | undefined)>
}
