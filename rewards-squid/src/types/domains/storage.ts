import {sts, Block, Bytes, Option, Result, StorageType, RuntimeCtx} from '../support'
import * as v0 from '../v0'
import * as v1 from '../v1'
import * as v2 from '../v2'
import * as v3 from '../v3'

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

export const runtimeRegistry =  {
    v0: new StorageType('Domains.RuntimeRegistry', 'Optional', [sts.number()], v0.RuntimeObject) as RuntimeRegistryV0,
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

export const nominators =  {
    /**
     *  List of all current epoch's nominators and their shares under a given operator,
     */
    v0: new StorageType('Domains.Nominators', 'Optional', [sts.bigint(), v0.AccountId32], v0.Nominator) as NominatorsV0,
}

/**
 *  List of all current epoch's nominators and their shares under a given operator,
 */
export interface NominatorsV0  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key1: bigint, key2: v0.AccountId32): Promise<(v0.Nominator | undefined)>
    getMany(block: Block, keys: [bigint, v0.AccountId32][]): Promise<(v0.Nominator | undefined)[]>
    getKeys(block: Block): Promise<[bigint, v0.AccountId32][]>
    getKeys(block: Block, key1: bigint): Promise<[bigint, v0.AccountId32][]>
    getKeys(block: Block, key1: bigint, key2: v0.AccountId32): Promise<[bigint, v0.AccountId32][]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<[bigint, v0.AccountId32][]>
    getKeysPaged(pageSize: number, block: Block, key1: bigint): AsyncIterable<[bigint, v0.AccountId32][]>
    getKeysPaged(pageSize: number, block: Block, key1: bigint, key2: v0.AccountId32): AsyncIterable<[bigint, v0.AccountId32][]>
    getPairs(block: Block): Promise<[k: [bigint, v0.AccountId32], v: (v0.Nominator | undefined)][]>
    getPairs(block: Block, key1: bigint): Promise<[k: [bigint, v0.AccountId32], v: (v0.Nominator | undefined)][]>
    getPairs(block: Block, key1: bigint, key2: v0.AccountId32): Promise<[k: [bigint, v0.AccountId32], v: (v0.Nominator | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: [bigint, v0.AccountId32], v: (v0.Nominator | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: bigint): AsyncIterable<[k: [bigint, v0.AccountId32], v: (v0.Nominator | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: bigint, key2: v0.AccountId32): AsyncIterable<[k: [bigint, v0.AccountId32], v: (v0.Nominator | undefined)][]>
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

export const pendingDeposits =  {
    /**
     *  Deposits initiated a nominator under this operator.
     *  Will be stored temporarily until the current epoch is complete.
     *  Once, epoch is complete, these deposits are staked beginning next epoch.
     */
    v0: new StorageType('Domains.PendingDeposits', 'Optional', [sts.bigint(), v0.AccountId32], sts.bigint()) as PendingDepositsV0,
}

/**
 *  Deposits initiated a nominator under this operator.
 *  Will be stored temporarily until the current epoch is complete.
 *  Once, epoch is complete, these deposits are staked beginning next epoch.
 */
export interface PendingDepositsV0  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key1: bigint, key2: v0.AccountId32): Promise<(bigint | undefined)>
    getMany(block: Block, keys: [bigint, v0.AccountId32][]): Promise<(bigint | undefined)[]>
    getKeys(block: Block): Promise<[bigint, v0.AccountId32][]>
    getKeys(block: Block, key1: bigint): Promise<[bigint, v0.AccountId32][]>
    getKeys(block: Block, key1: bigint, key2: v0.AccountId32): Promise<[bigint, v0.AccountId32][]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<[bigint, v0.AccountId32][]>
    getKeysPaged(pageSize: number, block: Block, key1: bigint): AsyncIterable<[bigint, v0.AccountId32][]>
    getKeysPaged(pageSize: number, block: Block, key1: bigint, key2: v0.AccountId32): AsyncIterable<[bigint, v0.AccountId32][]>
    getPairs(block: Block): Promise<[k: [bigint, v0.AccountId32], v: (bigint | undefined)][]>
    getPairs(block: Block, key1: bigint): Promise<[k: [bigint, v0.AccountId32], v: (bigint | undefined)][]>
    getPairs(block: Block, key1: bigint, key2: v0.AccountId32): Promise<[k: [bigint, v0.AccountId32], v: (bigint | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: [bigint, v0.AccountId32], v: (bigint | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: bigint): AsyncIterable<[k: [bigint, v0.AccountId32], v: (bigint | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: bigint, key2: v0.AccountId32): AsyncIterable<[k: [bigint, v0.AccountId32], v: (bigint | undefined)][]>
}

export const pendingWithdrawals =  {
    /**
     *  Withdrawals initiated a nominator under this operator.
     *  Will be stored temporarily until the current epoch is complete.
     *  Once, epoch is complete, these will be moved to PendingNominatorUnlocks.
     */
    v0: new StorageType('Domains.PendingWithdrawals', 'Optional', [sts.bigint(), v0.AccountId32], v0.Withdraw) as PendingWithdrawalsV0,
}

/**
 *  Withdrawals initiated a nominator under this operator.
 *  Will be stored temporarily until the current epoch is complete.
 *  Once, epoch is complete, these will be moved to PendingNominatorUnlocks.
 */
export interface PendingWithdrawalsV0  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key1: bigint, key2: v0.AccountId32): Promise<(v0.Withdraw | undefined)>
    getMany(block: Block, keys: [bigint, v0.AccountId32][]): Promise<(v0.Withdraw | undefined)[]>
    getKeys(block: Block): Promise<[bigint, v0.AccountId32][]>
    getKeys(block: Block, key1: bigint): Promise<[bigint, v0.AccountId32][]>
    getKeys(block: Block, key1: bigint, key2: v0.AccountId32): Promise<[bigint, v0.AccountId32][]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<[bigint, v0.AccountId32][]>
    getKeysPaged(pageSize: number, block: Block, key1: bigint): AsyncIterable<[bigint, v0.AccountId32][]>
    getKeysPaged(pageSize: number, block: Block, key1: bigint, key2: v0.AccountId32): AsyncIterable<[bigint, v0.AccountId32][]>
    getPairs(block: Block): Promise<[k: [bigint, v0.AccountId32], v: (v0.Withdraw | undefined)][]>
    getPairs(block: Block, key1: bigint): Promise<[k: [bigint, v0.AccountId32], v: (v0.Withdraw | undefined)][]>
    getPairs(block: Block, key1: bigint, key2: v0.AccountId32): Promise<[k: [bigint, v0.AccountId32], v: (v0.Withdraw | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: [bigint, v0.AccountId32], v: (v0.Withdraw | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: bigint): AsyncIterable<[k: [bigint, v0.AccountId32], v: (v0.Withdraw | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: bigint, key2: v0.AccountId32): AsyncIterable<[k: [bigint, v0.AccountId32], v: (v0.Withdraw | undefined)][]>
}

export const pendingOperatorDeregistrations =  {
    /**
     *  Operators who chose to deregister from a domain.
     *  Stored here temporarily until domain epoch is complete.
     */
    v0: new StorageType('Domains.PendingOperatorDeregistrations', 'Optional', [v0.DomainId], sts.array(() => sts.bigint())) as PendingOperatorDeregistrationsV0,
}

/**
 *  Operators who chose to deregister from a domain.
 *  Stored here temporarily until domain epoch is complete.
 */
export interface PendingOperatorDeregistrationsV0  {
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

export const pendingOperatorUnlocks =  {
    /**
     *  Stores a list of operators who are unlocking in the coming blocks.
     *  The operator will be removed when the wait period is over
     *  or when the operator is slashed.
     */
    v0: new StorageType('Domains.PendingOperatorUnlocks', 'Default', [], sts.array(() => sts.bigint())) as PendingOperatorUnlocksV0,
}

/**
 *  Stores a list of operators who are unlocking in the coming blocks.
 *  The operator will be removed when the wait period is over
 *  or when the operator is slashed.
 */
export interface PendingOperatorUnlocksV0  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): bigint[]
    get(block: Block): Promise<(bigint[] | undefined)>
}

export const pendingNominatorUnlocks =  {
    /**
     *  All the pending unlocks for the nominators.
     *  We use this storage to fetch all the pending unlocks under a operator pool at the time of slashing.
     */
    v0: new StorageType('Domains.PendingNominatorUnlocks', 'Optional', [sts.bigint(), sts.number()], sts.array(() => v0.PendingNominatorUnlock)) as PendingNominatorUnlocksV0,
}

/**
 *  All the pending unlocks for the nominators.
 *  We use this storage to fetch all the pending unlocks under a operator pool at the time of slashing.
 */
export interface PendingNominatorUnlocksV0  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key1: bigint, key2: number): Promise<(v0.PendingNominatorUnlock[] | undefined)>
    getMany(block: Block, keys: [bigint, number][]): Promise<(v0.PendingNominatorUnlock[] | undefined)[]>
    getKeys(block: Block): Promise<[bigint, number][]>
    getKeys(block: Block, key1: bigint): Promise<[bigint, number][]>
    getKeys(block: Block, key1: bigint, key2: number): Promise<[bigint, number][]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<[bigint, number][]>
    getKeysPaged(pageSize: number, block: Block, key1: bigint): AsyncIterable<[bigint, number][]>
    getKeysPaged(pageSize: number, block: Block, key1: bigint, key2: number): AsyncIterable<[bigint, number][]>
    getPairs(block: Block): Promise<[k: [bigint, number], v: (v0.PendingNominatorUnlock[] | undefined)][]>
    getPairs(block: Block, key1: bigint): Promise<[k: [bigint, number], v: (v0.PendingNominatorUnlock[] | undefined)][]>
    getPairs(block: Block, key1: bigint, key2: number): Promise<[k: [bigint, number], v: (v0.PendingNominatorUnlock[] | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: [bigint, number], v: (v0.PendingNominatorUnlock[] | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: bigint): AsyncIterable<[k: [bigint, number], v: (v0.PendingNominatorUnlock[] | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: bigint, key2: number): AsyncIterable<[k: [bigint, number], v: (v0.PendingNominatorUnlock[] | undefined)][]>
}

export const pendingUnlocks =  {
    /**
     *  A list of operators that are either unregistering or one more of the nominators
     *  are withdrawing some staked funds.
     */
    v0: new StorageType('Domains.PendingUnlocks', 'Optional', [sts.tuple(() => [v0.DomainId, sts.number()])], sts.array(() => sts.bigint())) as PendingUnlocksV0,
}

/**
 *  A list of operators that are either unregistering or one more of the nominators
 *  are withdrawing some staked funds.
 */
export interface PendingUnlocksV0  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: [v0.DomainId, number]): Promise<(bigint[] | undefined)>
    getMany(block: Block, keys: [v0.DomainId, number][]): Promise<(bigint[] | undefined)[]>
    getKeys(block: Block): Promise<[v0.DomainId, number][]>
    getKeys(block: Block, key: [v0.DomainId, number]): Promise<[v0.DomainId, number][]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<[v0.DomainId, number][]>
    getKeysPaged(pageSize: number, block: Block, key: [v0.DomainId, number]): AsyncIterable<[v0.DomainId, number][]>
    getPairs(block: Block): Promise<[k: [v0.DomainId, number], v: (bigint[] | undefined)][]>
    getPairs(block: Block, key: [v0.DomainId, number]): Promise<[k: [v0.DomainId, number], v: (bigint[] | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: [v0.DomainId, number], v: (bigint[] | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: [v0.DomainId, number]): AsyncIterable<[k: [v0.DomainId, number], v: (bigint[] | undefined)][]>
}

export const pendingSlashes =  {
    /**
     *  A list operators who were slashed during the current epoch associated with the domain.
     *  When the epoch for a given domain is complete, operator total stake is moved to treasury and
     *  then deleted.
     */
    v0: new StorageType('Domains.PendingSlashes', 'Optional', [v0.DomainId], sts.array(() => sts.tuple(() => [sts.bigint(), v0.PendingOperatorSlashInfo]))) as PendingSlashesV0,
}

/**
 *  A list operators who were slashed during the current epoch associated with the domain.
 *  When the epoch for a given domain is complete, operator total stake is moved to treasury and
 *  then deleted.
 */
export interface PendingSlashesV0  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v0.DomainId): Promise<([bigint, v0.PendingOperatorSlashInfo][] | undefined)>
    getMany(block: Block, keys: v0.DomainId[]): Promise<([bigint, v0.PendingOperatorSlashInfo][] | undefined)[]>
    getKeys(block: Block): Promise<v0.DomainId[]>
    getKeys(block: Block, key: v0.DomainId): Promise<v0.DomainId[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v0.DomainId[]>
    getKeysPaged(pageSize: number, block: Block, key: v0.DomainId): AsyncIterable<v0.DomainId[]>
    getPairs(block: Block): Promise<[k: v0.DomainId, v: ([bigint, v0.PendingOperatorSlashInfo][] | undefined)][]>
    getPairs(block: Block, key: v0.DomainId): Promise<[k: v0.DomainId, v: ([bigint, v0.PendingOperatorSlashInfo][] | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v0.DomainId, v: ([bigint, v0.PendingOperatorSlashInfo][] | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v0.DomainId): AsyncIterable<[k: v0.DomainId, v: ([bigint, v0.PendingOperatorSlashInfo][] | undefined)][]>
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
    v3: new StorageType('Domains.DomainRegistry', 'Optional', [v3.DomainId], v3.DomainObject) as DomainRegistryV3,
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
export interface DomainRegistryV3  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v3.DomainId): Promise<(v3.DomainObject | undefined)>
    getMany(block: Block, keys: v3.DomainId[]): Promise<(v3.DomainObject | undefined)[]>
    getKeys(block: Block): Promise<v3.DomainId[]>
    getKeys(block: Block, key: v3.DomainId): Promise<v3.DomainId[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v3.DomainId[]>
    getKeysPaged(pageSize: number, block: Block, key: v3.DomainId): AsyncIterable<v3.DomainId[]>
    getPairs(block: Block): Promise<[k: v3.DomainId, v: (v3.DomainObject | undefined)][]>
    getPairs(block: Block, key: v3.DomainId): Promise<[k: v3.DomainId, v: (v3.DomainObject | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v3.DomainId, v: (v3.DomainObject | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v3.DomainId): AsyncIterable<[k: v3.DomainId, v: (v3.DomainObject | undefined)][]>
}

export const blockTree =  {
    /**
     *  The domain block tree, map (`domain_id`, `domain_block_number`) to the hash of ER,
     *  which can be used get the block tree node in `BlockTreeNodes`
     */
    v0: new StorageType('Domains.BlockTree', 'Default', [v0.DomainId, sts.number()], sts.array(() => v0.H256)) as BlockTreeV0,
    /**
     *  The domain block tree, map (`domain_id`, `domain_block_number`) to the hash of ER,
     *  which can be used get the block tree node in `BlockTreeNodes`
     */
    v1: new StorageType('Domains.BlockTree', 'Optional', [v1.DomainId, sts.number()], v1.H256) as BlockTreeV1,
}

/**
 *  The domain block tree, map (`domain_id`, `domain_block_number`) to the hash of ER,
 *  which can be used get the block tree node in `BlockTreeNodes`
 */
export interface BlockTreeV0  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v0.H256[]
    get(block: Block, key1: v0.DomainId, key2: number): Promise<(v0.H256[] | undefined)>
    getMany(block: Block, keys: [v0.DomainId, number][]): Promise<(v0.H256[] | undefined)[]>
    getKeys(block: Block): Promise<[v0.DomainId, number][]>
    getKeys(block: Block, key1: v0.DomainId): Promise<[v0.DomainId, number][]>
    getKeys(block: Block, key1: v0.DomainId, key2: number): Promise<[v0.DomainId, number][]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<[v0.DomainId, number][]>
    getKeysPaged(pageSize: number, block: Block, key1: v0.DomainId): AsyncIterable<[v0.DomainId, number][]>
    getKeysPaged(pageSize: number, block: Block, key1: v0.DomainId, key2: number): AsyncIterable<[v0.DomainId, number][]>
    getPairs(block: Block): Promise<[k: [v0.DomainId, number], v: (v0.H256[] | undefined)][]>
    getPairs(block: Block, key1: v0.DomainId): Promise<[k: [v0.DomainId, number], v: (v0.H256[] | undefined)][]>
    getPairs(block: Block, key1: v0.DomainId, key2: number): Promise<[k: [v0.DomainId, number], v: (v0.H256[] | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: [v0.DomainId, number], v: (v0.H256[] | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: v0.DomainId): AsyncIterable<[k: [v0.DomainId, number], v: (v0.H256[] | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: v0.DomainId, key2: number): AsyncIterable<[k: [v0.DomainId, number], v: (v0.H256[] | undefined)][]>
}

/**
 *  The domain block tree, map (`domain_id`, `domain_block_number`) to the hash of ER,
 *  which can be used get the block tree node in `BlockTreeNodes`
 */
export interface BlockTreeV1  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key1: v1.DomainId, key2: number): Promise<(v1.H256 | undefined)>
    getMany(block: Block, keys: [v1.DomainId, number][]): Promise<(v1.H256 | undefined)[]>
    getKeys(block: Block): Promise<[v1.DomainId, number][]>
    getKeys(block: Block, key1: v1.DomainId): Promise<[v1.DomainId, number][]>
    getKeys(block: Block, key1: v1.DomainId, key2: number): Promise<[v1.DomainId, number][]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<[v1.DomainId, number][]>
    getKeysPaged(pageSize: number, block: Block, key1: v1.DomainId): AsyncIterable<[v1.DomainId, number][]>
    getKeysPaged(pageSize: number, block: Block, key1: v1.DomainId, key2: number): AsyncIterable<[v1.DomainId, number][]>
    getPairs(block: Block): Promise<[k: [v1.DomainId, number], v: (v1.H256 | undefined)][]>
    getPairs(block: Block, key1: v1.DomainId): Promise<[k: [v1.DomainId, number], v: (v1.H256 | undefined)][]>
    getPairs(block: Block, key1: v1.DomainId, key2: number): Promise<[k: [v1.DomainId, number], v: (v1.H256 | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: [v1.DomainId, number], v: (v1.H256 | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: v1.DomainId): AsyncIterable<[k: [v1.DomainId, number], v: (v1.H256 | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: v1.DomainId, key2: number): AsyncIterable<[k: [v1.DomainId, number], v: (v1.H256 | undefined)][]>
}

export const blockTreeNodes =  {
    /**
     *  Mapping of block tree node hash to the node, each node represent a domain block
     */
    v0: new StorageType('Domains.BlockTreeNodes', 'Optional', [v0.H256], v0.BlockTreeNode) as BlockTreeNodesV0,
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

export const domainBlockDescendants =  {
    v0: new StorageType('Domains.DomainBlockDescendants', 'Default', [v0.H256], sts.array(() => v0.H256)) as DomainBlockDescendantsV0,
}

export interface DomainBlockDescendantsV0  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v0.H256[]
    get(block: Block, key: v0.H256): Promise<(v0.H256[] | undefined)>
    getMany(block: Block, keys: v0.H256[]): Promise<(v0.H256[] | undefined)[]>
    getKeys(block: Block): Promise<v0.H256[]>
    getKeys(block: Block, key: v0.H256): Promise<v0.H256[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v0.H256[]>
    getKeysPaged(pageSize: number, block: Block, key: v0.H256): AsyncIterable<v0.H256[]>
    getPairs(block: Block): Promise<[k: v0.H256, v: (v0.H256[] | undefined)][]>
    getPairs(block: Block, key: v0.H256): Promise<[k: v0.H256, v: (v0.H256[] | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v0.H256, v: (v0.H256[] | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v0.H256): AsyncIterable<[k: v0.H256, v: (v0.H256[] | undefined)][]>
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

export const preferredOperator =  {
    /**
     *  A preferred Operator for a given Farmer, enabling automatic staking of block rewards.
     *  For the auto-staking to succeed, the Farmer must also be a Nominator of the preferred Operator.
     */
    v0: new StorageType('Domains.PreferredOperator', 'Optional', [v0.AccountId32], sts.bigint()) as PreferredOperatorV0,
}

/**
 *  A preferred Operator for a given Farmer, enabling automatic staking of block rewards.
 *  For the auto-staking to succeed, the Farmer must also be a Nominator of the preferred Operator.
 */
export interface PreferredOperatorV0  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v0.AccountId32): Promise<(bigint | undefined)>
    getMany(block: Block, keys: v0.AccountId32[]): Promise<(bigint | undefined)[]>
    getKeys(block: Block): Promise<v0.AccountId32[]>
    getKeys(block: Block, key: v0.AccountId32): Promise<v0.AccountId32[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v0.AccountId32[]>
    getKeysPaged(pageSize: number, block: Block, key: v0.AccountId32): AsyncIterable<v0.AccountId32[]>
    getPairs(block: Block): Promise<[k: v0.AccountId32, v: (bigint | undefined)][]>
    getPairs(block: Block, key: v0.AccountId32): Promise<[k: v0.AccountId32, v: (bigint | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v0.AccountId32, v: (bigint | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v0.AccountId32): AsyncIterable<[k: v0.AccountId32, v: (bigint | undefined)][]>
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

export const headReceiptExtended =  {
    /**
     *  Whether the head receipt have extended in the current consensus block
     * 
     *  Temporary storage only exist during block execution
     */
    v1: new StorageType('Domains.HeadReceiptExtended', 'Default', [v1.DomainId], sts.boolean()) as HeadReceiptExtendedV1,
}

/**
 *  Whether the head receipt have extended in the current consensus block
 * 
 *  Temporary storage only exist during block execution
 */
export interface HeadReceiptExtendedV1  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): boolean
    get(block: Block, key: v1.DomainId): Promise<(boolean | undefined)>
    getMany(block: Block, keys: v1.DomainId[]): Promise<(boolean | undefined)[]>
    getKeys(block: Block): Promise<v1.DomainId[]>
    getKeys(block: Block, key: v1.DomainId): Promise<v1.DomainId[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v1.DomainId[]>
    getKeysPaged(pageSize: number, block: Block, key: v1.DomainId): AsyncIterable<v1.DomainId[]>
    getPairs(block: Block): Promise<[k: v1.DomainId, v: (boolean | undefined)][]>
    getPairs(block: Block, key: v1.DomainId): Promise<[k: v1.DomainId, v: (boolean | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v1.DomainId, v: (boolean | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v1.DomainId): AsyncIterable<[k: v1.DomainId, v: (boolean | undefined)][]>
}

export const successfulFraudProofs =  {
    /**
     *  Fraud proofs submitted successfully in current block.
     */
    v2: new StorageType('Domains.SuccessfulFraudProofs', 'Default', [v2.DomainId], sts.array(() => v2.H256)) as SuccessfulFraudProofsV2,
}

/**
 *  Fraud proofs submitted successfully in current block.
 */
export interface SuccessfulFraudProofsV2  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v2.H256[]
    get(block: Block, key: v2.DomainId): Promise<(v2.H256[] | undefined)>
    getMany(block: Block, keys: v2.DomainId[]): Promise<(v2.H256[] | undefined)[]>
    getKeys(block: Block): Promise<v2.DomainId[]>
    getKeys(block: Block, key: v2.DomainId): Promise<v2.DomainId[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v2.DomainId[]>
    getKeysPaged(pageSize: number, block: Block, key: v2.DomainId): AsyncIterable<v2.DomainId[]>
    getPairs(block: Block): Promise<[k: v2.DomainId, v: (v2.H256[] | undefined)][]>
    getPairs(block: Block, key: v2.DomainId): Promise<[k: v2.DomainId, v: (v2.H256[] | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v2.DomainId, v: (v2.H256[] | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v2.DomainId): AsyncIterable<[k: v2.DomainId, v: (v2.H256[] | undefined)][]>
}

export const nextEvmChainId =  {
    /**
     *  Stores the next evm chain id.
     */
    v3: new StorageType('Domains.NextEVMChainId', 'Default', [], sts.bigint()) as NextEvmChainIdV3,
}

/**
 *  Stores the next evm chain id.
 */
export interface NextEvmChainIdV3  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): bigint
    get(block: Block): Promise<(bigint | undefined)>
}

export const operatorSigningKey =  {
    /**
     *  Indexes operator signing key against OperatorId.
     */
    v4: new StorageType('Domains.OperatorSigningKey', 'Optional', [sts.bytes()], sts.array(() => sts.bigint())) as OperatorSigningKeyV4,
    /**
     *  Indexes operator signing key against OperatorId.
     */
    v5: new StorageType('Domains.OperatorSigningKey', 'Optional', [sts.bytes()], sts.bigint()) as OperatorSigningKeyV5,
}

/**
 *  Indexes operator signing key against OperatorId.
 */
export interface OperatorSigningKeyV4  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: Bytes): Promise<(bigint[] | undefined)>
    getMany(block: Block, keys: Bytes[]): Promise<(bigint[] | undefined)[]>
    getKeys(block: Block): Promise<Bytes[]>
    getKeys(block: Block, key: Bytes): Promise<Bytes[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<Bytes[]>
    getKeysPaged(pageSize: number, block: Block, key: Bytes): AsyncIterable<Bytes[]>
    getPairs(block: Block): Promise<[k: Bytes, v: (bigint[] | undefined)][]>
    getPairs(block: Block, key: Bytes): Promise<[k: Bytes, v: (bigint[] | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: Bytes, v: (bigint[] | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: Bytes): AsyncIterable<[k: Bytes, v: (bigint[] | undefined)][]>
}

/**
 *  Indexes operator signing key against OperatorId.
 */
export interface OperatorSigningKeyV5  {
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
