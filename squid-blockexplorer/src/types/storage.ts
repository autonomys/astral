import assert from 'assert'
import {Block, BlockContext, Chain, ChainContext, Option, Result, StorageBase} from './support'
import * as v3 from './v3'

export class BalancesAccountStorage extends StorageBase {
    protected getPrefix() {
        return 'Balances'
    }

    protected getName() {
        return 'Account'
    }

    /**
     *  The Balances pallet example of storing the balance of an account.
     * 
     *  # Example
     * 
     *  ```nocompile
     *   impl pallet_balances::Config for Runtime {
     *     type AccountStore = StorageMapShim<Self::Account<Runtime>, frame_system::Provider<Runtime>, AccountId, Self::AccountData<Balance>>
     *   }
     *  ```
     * 
     *  You can also store the balance of an account in the `System` pallet.
     * 
     *  # Example
     * 
     *  ```nocompile
     *   impl pallet_balances::Config for Runtime {
     *    type AccountStore = System
     *   }
     *  ```
     * 
     *  But this comes with tradeoffs, storing account balances in the system pallet stores
     *  `frame_system` data alongside the account data contrary to storing account balances in the
     *  `Balances` pallet, which uses a `StorageMap` to store balances data only.
     *  NOTE: This is only used in the case that this pallet is used to store balances.
     */
    get isV3(): boolean {
        return this.getTypeHash() === '0b3b4bf0dd7388459eba461bc7c3226bf58608c941710a714e02f33ec0f91e78'
    }

    /**
     *  The Balances pallet example of storing the balance of an account.
     * 
     *  # Example
     * 
     *  ```nocompile
     *   impl pallet_balances::Config for Runtime {
     *     type AccountStore = StorageMapShim<Self::Account<Runtime>, frame_system::Provider<Runtime>, AccountId, Self::AccountData<Balance>>
     *   }
     *  ```
     * 
     *  You can also store the balance of an account in the `System` pallet.
     * 
     *  # Example
     * 
     *  ```nocompile
     *   impl pallet_balances::Config for Runtime {
     *    type AccountStore = System
     *   }
     *  ```
     * 
     *  But this comes with tradeoffs, storing account balances in the system pallet stores
     *  `frame_system` data alongside the account data contrary to storing account balances in the
     *  `Balances` pallet, which uses a `StorageMap` to store balances data only.
     *  NOTE: This is only used in the case that this pallet is used to store balances.
     */
    get asV3(): BalancesAccountStorageV3 {
        assert(this.isV3)
        return this as any
    }
}

/**
 *  The Balances pallet example of storing the balance of an account.
 * 
 *  # Example
 * 
 *  ```nocompile
 *   impl pallet_balances::Config for Runtime {
 *     type AccountStore = StorageMapShim<Self::Account<Runtime>, frame_system::Provider<Runtime>, AccountId, Self::AccountData<Balance>>
 *   }
 *  ```
 * 
 *  You can also store the balance of an account in the `System` pallet.
 * 
 *  # Example
 * 
 *  ```nocompile
 *   impl pallet_balances::Config for Runtime {
 *    type AccountStore = System
 *   }
 *  ```
 * 
 *  But this comes with tradeoffs, storing account balances in the system pallet stores
 *  `frame_system` data alongside the account data contrary to storing account balances in the
 *  `Balances` pallet, which uses a `StorageMap` to store balances data only.
 *  NOTE: This is only used in the case that this pallet is used to store balances.
 */
export interface BalancesAccountStorageV3 {
    get(key: Uint8Array): Promise<v3.AccountData>
    getAll(): Promise<v3.AccountData[]>
    getMany(keys: Uint8Array[]): Promise<v3.AccountData[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: v3.AccountData][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: v3.AccountData][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: v3.AccountData][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: v3.AccountData][]>
}

export class BalancesLocksStorage extends StorageBase {
    protected getPrefix() {
        return 'Balances'
    }

    protected getName() {
        return 'Locks'
    }

    /**
     *  Any liquidity locks on some account balances.
     *  NOTE: Should only be accessed when setting, changing and freeing a lock.
     */
    get isV3(): boolean {
        return this.getTypeHash() === 'e393b3a20a6d47aee703c898fda1db02fffe128e4692a5861f416ecc67b13a86'
    }

    /**
     *  Any liquidity locks on some account balances.
     *  NOTE: Should only be accessed when setting, changing and freeing a lock.
     */
    get asV3(): BalancesLocksStorageV3 {
        assert(this.isV3)
        return this as any
    }
}

/**
 *  Any liquidity locks on some account balances.
 *  NOTE: Should only be accessed when setting, changing and freeing a lock.
 */
export interface BalancesLocksStorageV3 {
    get(key: Uint8Array): Promise<v3.BalanceLock[]>
    getAll(): Promise<v3.BalanceLock[][]>
    getMany(keys: Uint8Array[]): Promise<v3.BalanceLock[][]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: v3.BalanceLock[]][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: v3.BalanceLock[]][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: v3.BalanceLock[]][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: v3.BalanceLock[]][]>
}

export class BalancesReservesStorage extends StorageBase {
    protected getPrefix() {
        return 'Balances'
    }

    protected getName() {
        return 'Reserves'
    }

    /**
     *  Named reserves on some account balances.
     */
    get isV3(): boolean {
        return this.getTypeHash() === '474ab364918936227f04514c303c572bb070961f30f593f2cbb3e25426aba37a'
    }

    /**
     *  Named reserves on some account balances.
     */
    get asV3(): BalancesReservesStorageV3 {
        assert(this.isV3)
        return this as any
    }
}

/**
 *  Named reserves on some account balances.
 */
export interface BalancesReservesStorageV3 {
    get(key: Uint8Array): Promise<v3.ReserveData[]>
    getAll(): Promise<v3.ReserveData[][]>
    getMany(keys: Uint8Array[]): Promise<v3.ReserveData[][]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: v3.ReserveData[]][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: v3.ReserveData[]][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: v3.ReserveData[]][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: v3.ReserveData[]][]>
}

export class BalancesStorageVersionStorage extends StorageBase {
    protected getPrefix() {
        return 'Balances'
    }

    protected getName() {
        return 'StorageVersion'
    }

    /**
     *  Storage version of the pallet.
     * 
     *  This is set to v2.0.0 for new networks.
     */
    get isV3(): boolean {
        return this.getTypeHash() === '1431e80ffaa4d10a7fe714faa381ada05c3baae7e12aa80f24f8728a41ba57c4'
    }

    /**
     *  Storage version of the pallet.
     * 
     *  This is set to v2.0.0 for new networks.
     */
    get asV3(): BalancesStorageVersionStorageV3 {
        assert(this.isV3)
        return this as any
    }
}

/**
 *  Storage version of the pallet.
 * 
 *  This is set to v2.0.0 for new networks.
 */
export interface BalancesStorageVersionStorageV3 {
    get(): Promise<v3.Releases>
}

export class BalancesTotalIssuanceStorage extends StorageBase {
    protected getPrefix() {
        return 'Balances'
    }

    protected getName() {
        return 'TotalIssuance'
    }

    /**
     *  The total units issued in the system.
     */
    get isV3(): boolean {
        return this.getTypeHash() === 'f8ebe28eb30158172c0ccf672f7747c46a244f892d08ef2ebcbaadde34a26bc0'
    }

    /**
     *  The total units issued in the system.
     */
    get asV3(): BalancesTotalIssuanceStorageV3 {
        assert(this.isV3)
        return this as any
    }
}

/**
 *  The total units issued in the system.
 */
export interface BalancesTotalIssuanceStorageV3 {
    get(): Promise<bigint>
}

export class ExecutorBlockHashStorage extends StorageBase {
    protected getPrefix() {
        return 'Executor'
    }

    protected getName() {
        return 'BlockHash'
    }

    /**
     *  Map of block number to block hash.
     * 
     *  NOTE: The oldest block hash will be pruned once the oldest receipt is pruned. However, if the
     *  execution chain stalls, i.e., no receipts are included in the primary chain for a long time,
     *  this mapping will grow indefinitely.
     */
    get isV3(): boolean {
        return this.getTypeHash() === '06f5703796027f4b198d4ffd50b721273430d8ff663660646793873168f9df17'
    }

    /**
     *  Map of block number to block hash.
     * 
     *  NOTE: The oldest block hash will be pruned once the oldest receipt is pruned. However, if the
     *  execution chain stalls, i.e., no receipts are included in the primary chain for a long time,
     *  this mapping will grow indefinitely.
     */
    get asV3(): ExecutorBlockHashStorageV3 {
        assert(this.isV3)
        return this as any
    }
}

/**
 *  Map of block number to block hash.
 * 
 *  NOTE: The oldest block hash will be pruned once the oldest receipt is pruned. However, if the
 *  execution chain stalls, i.e., no receipts are included in the primary chain for a long time,
 *  this mapping will grow indefinitely.
 */
export interface ExecutorBlockHashStorageV3 {
    get(key: number): Promise<Uint8Array>
    getAll(): Promise<Uint8Array[]>
    getMany(keys: number[]): Promise<Uint8Array[]>
    getKeys(): Promise<number[]>
    getKeys(key: number): Promise<number[]>
    getKeysPaged(pageSize: number): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, key: number): AsyncIterable<number[]>
    getPairs(): Promise<[k: number, v: Uint8Array][]>
    getPairs(key: number): Promise<[k: number, v: Uint8Array][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: number, v: Uint8Array][]>
    getPairsPaged(pageSize: number, key: number): AsyncIterable<[k: number, v: Uint8Array][]>
}

export class ExecutorExecutionChainBestNumberStorage extends StorageBase {
    protected getPrefix() {
        return 'Executor'
    }

    protected getName() {
        return 'ExecutionChainBestNumber'
    }

    /**
     *  Latest execution chain block number.
     */
    get isV3(): boolean {
        return this.getTypeHash() === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
    }

    /**
     *  Latest execution chain block number.
     */
    get asV3(): ExecutorExecutionChainBestNumberStorageV3 {
        assert(this.isV3)
        return this as any
    }
}

/**
 *  Latest execution chain block number.
 */
export interface ExecutorExecutionChainBestNumberStorageV3 {
    get(): Promise<number>
}

export class ExecutorExecutorStorage extends StorageBase {
    protected getPrefix() {
        return 'Executor'
    }

    protected getName() {
        return 'Executor'
    }

    /**
     *  A tuple of (stable_executor_id, executor_signing_key).
     */
    get isV3(): boolean {
        return this.getTypeHash() === '072fcd26efed51f16848a84d5d757c1391c51b9e0303e33f920a6101089e5dfe'
    }

    /**
     *  A tuple of (stable_executor_id, executor_signing_key).
     */
    get asV3(): ExecutorExecutorStorageV3 {
        assert(this.isV3)
        return this as any
    }
}

/**
 *  A tuple of (stable_executor_id, executor_signing_key).
 */
export interface ExecutorExecutorStorageV3 {
    get(): Promise<([Uint8Array, Uint8Array] | undefined)>
}

export class ExecutorOldestReceiptNumberStorage extends StorageBase {
    protected getPrefix() {
        return 'Executor'
    }

    protected getName() {
        return 'OldestReceiptNumber'
    }

    /**
     *  Number of the block that the oldest execution receipt points to.
     */
    get isV3(): boolean {
        return this.getTypeHash() === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
    }

    /**
     *  Number of the block that the oldest execution receipt points to.
     */
    get asV3(): ExecutorOldestReceiptNumberStorageV3 {
        assert(this.isV3)
        return this as any
    }
}

/**
 *  Number of the block that the oldest execution receipt points to.
 */
export interface ExecutorOldestReceiptNumberStorageV3 {
    get(): Promise<number>
}

export class ExecutorReceiptsStorage extends StorageBase {
    protected getPrefix() {
        return 'Executor'
    }

    protected getName() {
        return 'Receipts'
    }

    /**
     *  Mapping from the primary block number to the corresponding verified execution receipt.
     * 
     *  The capacity of receipts stored in the state is [`Config::ReceiptsPruningDepth`], the older
     *  ones will be pruned once the size of receipts exceeds this number.
     */
    get isV3(): boolean {
        return this.getTypeHash() === 'b61524d27054258c1fb36c82e0222b6340ac55e627f9f80c498ace9107330f0f'
    }

    /**
     *  Mapping from the primary block number to the corresponding verified execution receipt.
     * 
     *  The capacity of receipts stored in the state is [`Config::ReceiptsPruningDepth`], the older
     *  ones will be pruned once the size of receipts exceeds this number.
     */
    get asV3(): ExecutorReceiptsStorageV3 {
        assert(this.isV3)
        return this as any
    }
}

/**
 *  Mapping from the primary block number to the corresponding verified execution receipt.
 * 
 *  The capacity of receipts stored in the state is [`Config::ReceiptsPruningDepth`], the older
 *  ones will be pruned once the size of receipts exceeds this number.
 */
export interface ExecutorReceiptsStorageV3 {
    get(key: number): Promise<(v3.ExecutionReceipt | undefined)>
    getAll(): Promise<v3.ExecutionReceipt[]>
    getMany(keys: number[]): Promise<(v3.ExecutionReceipt | undefined)[]>
    getKeys(): Promise<number[]>
    getKeys(key: number): Promise<number[]>
    getKeysPaged(pageSize: number): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, key: number): AsyncIterable<number[]>
    getPairs(): Promise<[k: number, v: v3.ExecutionReceipt][]>
    getPairs(key: number): Promise<[k: number, v: v3.ExecutionReceipt][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: number, v: v3.ExecutionReceipt][]>
    getPairsPaged(pageSize: number, key: number): AsyncIterable<[k: number, v: v3.ExecutionReceipt][]>
}

export class FeedsFeedConfigsStorage extends StorageBase {
    protected getPrefix() {
        return 'Feeds'
    }

    protected getName() {
        return 'FeedConfigs'
    }

    get isV3(): boolean {
        return this.getTypeHash() === '2bd699643905f57b0afc999cdb46fe87e9bc88556f8d86cb437a4abcce700f74'
    }

    get asV3(): FeedsFeedConfigsStorageV3 {
        assert(this.isV3)
        return this as any
    }
}

export interface FeedsFeedConfigsStorageV3 {
    get(key: bigint): Promise<(v3.FeedConfig | undefined)>
    getAll(): Promise<v3.FeedConfig[]>
    getMany(keys: bigint[]): Promise<(v3.FeedConfig | undefined)[]>
    getKeys(): Promise<bigint[]>
    getKeys(key: bigint): Promise<bigint[]>
    getKeysPaged(pageSize: number): AsyncIterable<bigint[]>
    getKeysPaged(pageSize: number, key: bigint): AsyncIterable<bigint[]>
    getPairs(): Promise<[k: bigint, v: v3.FeedConfig][]>
    getPairs(key: bigint): Promise<[k: bigint, v: v3.FeedConfig][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: bigint, v: v3.FeedConfig][]>
    getPairsPaged(pageSize: number, key: bigint): AsyncIterable<[k: bigint, v: v3.FeedConfig][]>
}

export class FeedsFeedsStorage extends StorageBase {
    protected getPrefix() {
        return 'Feeds'
    }

    protected getName() {
        return 'Feeds'
    }

    get isV3(): boolean {
        return this.getTypeHash() === 'fe3e3ebfe8d9e3e028dc2ccc0243b34a5a1c77d8f318ffa75f6ca97892063814'
    }

    get asV3(): FeedsFeedsStorageV3 {
        assert(this.isV3)
        return this as any
    }
}

export interface FeedsFeedsStorageV3 {
    get(key: Uint8Array): Promise<(bigint[] | undefined)>
    getAll(): Promise<bigint[][]>
    getMany(keys: Uint8Array[]): Promise<(bigint[] | undefined)[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: bigint[]][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: bigint[]][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: bigint[]][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: bigint[]][]>
}

export class FeedsMetadataStorage extends StorageBase {
    protected getPrefix() {
        return 'Feeds'
    }

    protected getName() {
        return 'Metadata'
    }

    get isV3(): boolean {
        return this.getTypeHash() === '20982e01b9cf10a62e69d380b0c1fa5e45a352de0b5cf91f295f9c38d801bc9c'
    }

    get asV3(): FeedsMetadataStorageV3 {
        assert(this.isV3)
        return this as any
    }
}

export interface FeedsMetadataStorageV3 {
    get(key: bigint): Promise<(Uint8Array | undefined)>
    getAll(): Promise<Uint8Array[]>
    getMany(keys: bigint[]): Promise<(Uint8Array | undefined)[]>
    getKeys(): Promise<bigint[]>
    getKeys(key: bigint): Promise<bigint[]>
    getKeysPaged(pageSize: number): AsyncIterable<bigint[]>
    getKeysPaged(pageSize: number, key: bigint): AsyncIterable<bigint[]>
    getPairs(): Promise<[k: bigint, v: Uint8Array][]>
    getPairs(key: bigint): Promise<[k: bigint, v: Uint8Array][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: bigint, v: Uint8Array][]>
    getPairsPaged(pageSize: number, key: bigint): AsyncIterable<[k: bigint, v: Uint8Array][]>
}

export class FeedsNextFeedIdStorage extends StorageBase {
    protected getPrefix() {
        return 'Feeds'
    }

    protected getName() {
        return 'NextFeedId'
    }

    get isV3(): boolean {
        return this.getTypeHash() === '95ff4f914f08e149ddbe1ae2dcb1743bbf9aaae69d04c486e1a398cacfcca06a'
    }

    get asV3(): FeedsNextFeedIdStorageV3 {
        assert(this.isV3)
        return this as any
    }
}

export interface FeedsNextFeedIdStorageV3 {
    get(): Promise<bigint>
}

export class FeedsSuccessfulPutsStorage extends StorageBase {
    protected getPrefix() {
        return 'Feeds'
    }

    protected getName() {
        return 'SuccessfulPuts'
    }

    get isV3(): boolean {
        return this.getTypeHash() === 'f5df25eadcdffaa0d2a68b199d671d3921ca36a7b70d22d57506dca52b4b5895'
    }

    get asV3(): FeedsSuccessfulPutsStorageV3 {
        assert(this.isV3)
        return this as any
    }
}

export interface FeedsSuccessfulPutsStorageV3 {
    get(): Promise<Uint8Array[]>
}

export class FeedsTotalsStorage extends StorageBase {
    protected getPrefix() {
        return 'Feeds'
    }

    protected getName() {
        return 'Totals'
    }

    get isV3(): boolean {
        return this.getTypeHash() === 'f3d3eff3c9d5d10a4ce733327b300974210d0b2d3a5eb6ab25a8edd5f6a222ea'
    }

    get asV3(): FeedsTotalsStorageV3 {
        assert(this.isV3)
        return this as any
    }
}

export interface FeedsTotalsStorageV3 {
    get(key: bigint): Promise<v3.TotalObjectsAndSize>
    getAll(): Promise<v3.TotalObjectsAndSize[]>
    getMany(keys: bigint[]): Promise<v3.TotalObjectsAndSize[]>
    getKeys(): Promise<bigint[]>
    getKeys(key: bigint): Promise<bigint[]>
    getKeysPaged(pageSize: number): AsyncIterable<bigint[]>
    getKeysPaged(pageSize: number, key: bigint): AsyncIterable<bigint[]>
    getPairs(): Promise<[k: bigint, v: v3.TotalObjectsAndSize][]>
    getPairs(key: bigint): Promise<[k: bigint, v: v3.TotalObjectsAndSize][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: bigint, v: v3.TotalObjectsAndSize][]>
    getPairsPaged(pageSize: number, key: bigint): AsyncIterable<[k: bigint, v: v3.TotalObjectsAndSize][]>
}

export class GrandpaFinalityVerifierChainTipStorage extends StorageBase {
    protected getPrefix() {
        return 'GrandpaFinalityVerifier'
    }

    protected getName() {
        return 'ChainTip'
    }

    /**
     *  Known tip of the chain
     */
    get isV3(): boolean {
        return this.getTypeHash() === 'ba297738a0a552cc3bb388113efafcf33241993a821307df5fac2ba96657223b'
    }

    /**
     *  Known tip of the chain
     */
    get asV3(): GrandpaFinalityVerifierChainTipStorageV3 {
        assert(this.isV3)
        return this as any
    }
}

/**
 *  Known tip of the chain
 */
export interface GrandpaFinalityVerifierChainTipStorageV3 {
    get(key: bigint): Promise<[Uint8Array, Uint8Array]>
    getAll(): Promise<[Uint8Array, Uint8Array][]>
    getMany(keys: bigint[]): Promise<[Uint8Array, Uint8Array][]>
    getKeys(): Promise<bigint[]>
    getKeys(key: bigint): Promise<bigint[]>
    getKeysPaged(pageSize: number): AsyncIterable<bigint[]>
    getKeysPaged(pageSize: number, key: bigint): AsyncIterable<bigint[]>
    getPairs(): Promise<[k: bigint, v: [Uint8Array, Uint8Array]][]>
    getPairs(key: bigint): Promise<[k: bigint, v: [Uint8Array, Uint8Array]][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: bigint, v: [Uint8Array, Uint8Array]][]>
    getPairsPaged(pageSize: number, key: bigint): AsyncIterable<[k: bigint, v: [Uint8Array, Uint8Array]][]>
}

export class GrandpaFinalityVerifierCurrentAuthoritySetStorage extends StorageBase {
    protected getPrefix() {
        return 'GrandpaFinalityVerifier'
    }

    protected getName() {
        return 'CurrentAuthoritySet'
    }

    /**
     *  The current GRANDPA Authority set for a given Chain
     */
    get isV3(): boolean {
        return this.getTypeHash() === 'e1694728d047f69484f829b13f6dabfa6d94da8b1aab59f55122e993a67db516'
    }

    /**
     *  The current GRANDPA Authority set for a given Chain
     */
    get asV3(): GrandpaFinalityVerifierCurrentAuthoritySetStorageV3 {
        assert(this.isV3)
        return this as any
    }
}

/**
 *  The current GRANDPA Authority set for a given Chain
 */
export interface GrandpaFinalityVerifierCurrentAuthoritySetStorageV3 {
    get(key: bigint): Promise<v3.AuthoritySet>
    getAll(): Promise<v3.AuthoritySet[]>
    getMany(keys: bigint[]): Promise<v3.AuthoritySet[]>
    getKeys(): Promise<bigint[]>
    getKeys(key: bigint): Promise<bigint[]>
    getKeysPaged(pageSize: number): AsyncIterable<bigint[]>
    getKeysPaged(pageSize: number, key: bigint): AsyncIterable<bigint[]>
    getPairs(): Promise<[k: bigint, v: v3.AuthoritySet][]>
    getPairs(key: bigint): Promise<[k: bigint, v: v3.AuthoritySet][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: bigint, v: v3.AuthoritySet][]>
    getPairsPaged(pageSize: number, key: bigint): AsyncIterable<[k: bigint, v: v3.AuthoritySet][]>
}

export class GrandpaFinalityVerifierOldestKnownParentStorage extends StorageBase {
    protected getPrefix() {
        return 'GrandpaFinalityVerifier'
    }

    protected getName() {
        return 'OldestKnownParent'
    }

    /**
     *  Oldest known parent
     */
    get isV3(): boolean {
        return this.getTypeHash() === 'ba297738a0a552cc3bb388113efafcf33241993a821307df5fac2ba96657223b'
    }

    /**
     *  Oldest known parent
     */
    get asV3(): GrandpaFinalityVerifierOldestKnownParentStorageV3 {
        assert(this.isV3)
        return this as any
    }
}

/**
 *  Oldest known parent
 */
export interface GrandpaFinalityVerifierOldestKnownParentStorageV3 {
    get(key: bigint): Promise<[Uint8Array, Uint8Array]>
    getAll(): Promise<[Uint8Array, Uint8Array][]>
    getMany(keys: bigint[]): Promise<[Uint8Array, Uint8Array][]>
    getKeys(): Promise<bigint[]>
    getKeys(key: bigint): Promise<bigint[]>
    getKeysPaged(pageSize: number): AsyncIterable<bigint[]>
    getKeysPaged(pageSize: number, key: bigint): AsyncIterable<bigint[]>
    getPairs(): Promise<[k: bigint, v: [Uint8Array, Uint8Array]][]>
    getPairs(key: bigint): Promise<[k: bigint, v: [Uint8Array, Uint8Array]][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: bigint, v: [Uint8Array, Uint8Array]][]>
    getPairsPaged(pageSize: number, key: bigint): AsyncIterable<[k: bigint, v: [Uint8Array, Uint8Array]][]>
}

export class GrandpaFinalityVerifierValidationCheckPointStorage extends StorageBase {
    protected getPrefix() {
        return 'GrandpaFinalityVerifier'
    }

    protected getName() {
        return 'ValidationCheckPoint'
    }

    /**
     *  The point after which the block validation begins
     */
    get isV3(): boolean {
        return this.getTypeHash() === 'ba297738a0a552cc3bb388113efafcf33241993a821307df5fac2ba96657223b'
    }

    /**
     *  The point after which the block validation begins
     */
    get asV3(): GrandpaFinalityVerifierValidationCheckPointStorageV3 {
        assert(this.isV3)
        return this as any
    }
}

/**
 *  The point after which the block validation begins
 */
export interface GrandpaFinalityVerifierValidationCheckPointStorageV3 {
    get(key: bigint): Promise<[Uint8Array, Uint8Array]>
    getAll(): Promise<[Uint8Array, Uint8Array][]>
    getMany(keys: bigint[]): Promise<[Uint8Array, Uint8Array][]>
    getKeys(): Promise<bigint[]>
    getKeys(key: bigint): Promise<bigint[]>
    getKeysPaged(pageSize: number): AsyncIterable<bigint[]>
    getKeysPaged(pageSize: number, key: bigint): AsyncIterable<bigint[]>
    getPairs(): Promise<[k: bigint, v: [Uint8Array, Uint8Array]][]>
    getPairs(key: bigint): Promise<[k: bigint, v: [Uint8Array, Uint8Array]][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: bigint, v: [Uint8Array, Uint8Array]][]>
    getPairsPaged(pageSize: number, key: bigint): AsyncIterable<[k: bigint, v: [Uint8Array, Uint8Array]][]>
}

export class OffencesSubspaceConcurrentReportsIndexStorage extends StorageBase {
    protected getPrefix() {
        return 'OffencesSubspace'
    }

    protected getName() {
        return 'ConcurrentReportsIndex'
    }

    /**
     *  A vector of reports of the same kind that happened at the same time slot.
     */
    get isV3(): boolean {
        return this.getTypeHash() === 'd5c59a6db2baab9f1dcc1a37b0131a737935fd2082fcf39b6abc3f1d6e3ae008'
    }

    /**
     *  A vector of reports of the same kind that happened at the same time slot.
     */
    get asV3(): OffencesSubspaceConcurrentReportsIndexStorageV3 {
        assert(this.isV3)
        return this as any
    }
}

/**
 *  A vector of reports of the same kind that happened at the same time slot.
 */
export interface OffencesSubspaceConcurrentReportsIndexStorageV3 {
    get(key1: Uint8Array, key2: Uint8Array): Promise<Uint8Array[]>
    getAll(): Promise<Uint8Array[][]>
    getMany(keys: [Uint8Array, Uint8Array][]): Promise<Uint8Array[][]>
    getKeys(): Promise<[Uint8Array, Uint8Array][]>
    getKeys(key1: Uint8Array): Promise<[Uint8Array, Uint8Array][]>
    getKeys(key1: Uint8Array, key2: Uint8Array): Promise<[Uint8Array, Uint8Array][]>
    getKeysPaged(pageSize: number): AsyncIterable<[Uint8Array, Uint8Array][]>
    getKeysPaged(pageSize: number, key1: Uint8Array): AsyncIterable<[Uint8Array, Uint8Array][]>
    getKeysPaged(pageSize: number, key1: Uint8Array, key2: Uint8Array): AsyncIterable<[Uint8Array, Uint8Array][]>
    getPairs(): Promise<[k: [Uint8Array, Uint8Array], v: Uint8Array[]][]>
    getPairs(key1: Uint8Array): Promise<[k: [Uint8Array, Uint8Array], v: Uint8Array[]][]>
    getPairs(key1: Uint8Array, key2: Uint8Array): Promise<[k: [Uint8Array, Uint8Array], v: Uint8Array[]][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [Uint8Array, Uint8Array], v: Uint8Array[]][]>
    getPairsPaged(pageSize: number, key1: Uint8Array): AsyncIterable<[k: [Uint8Array, Uint8Array], v: Uint8Array[]][]>
    getPairsPaged(pageSize: number, key1: Uint8Array, key2: Uint8Array): AsyncIterable<[k: [Uint8Array, Uint8Array], v: Uint8Array[]][]>
}

export class OffencesSubspaceReportsStorage extends StorageBase {
    protected getPrefix() {
        return 'OffencesSubspace'
    }

    protected getName() {
        return 'Reports'
    }

    /**
     *  The primary structure that holds all offence records keyed by report identifiers.
     */
    get isV3(): boolean {
        return this.getTypeHash() === 'ce845ea5260838377cabc469ad246c34b46439014c3d4dbdd581259560f3a24a'
    }

    /**
     *  The primary structure that holds all offence records keyed by report identifiers.
     */
    get asV3(): OffencesSubspaceReportsStorageV3 {
        assert(this.isV3)
        return this as any
    }
}

/**
 *  The primary structure that holds all offence records keyed by report identifiers.
 */
export interface OffencesSubspaceReportsStorageV3 {
    get(key: Uint8Array): Promise<(v3.OffenceDetails | undefined)>
    getAll(): Promise<v3.OffenceDetails[]>
    getMany(keys: Uint8Array[]): Promise<(v3.OffenceDetails | undefined)[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: v3.OffenceDetails][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: v3.OffenceDetails][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: v3.OffenceDetails][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: v3.OffenceDetails][]>
}

export class OffencesSubspaceReportsByKindIndexStorage extends StorageBase {
    protected getPrefix() {
        return 'OffencesSubspace'
    }

    protected getName() {
        return 'ReportsByKindIndex'
    }

    /**
     *  Enumerates all reports of a kind along with the time they happened.
     * 
     *  All reports are sorted by the time of offence.
     * 
     *  Note that the actual type of this mapping is `Vec<u8>`, this is because values of
     *  different types are not supported at the moment so we are doing the manual serialization.
     */
    get isV3(): boolean {
        return this.getTypeHash() === '0f535b9892aaca40228e6d3f57b63c241690838a686fa8be3e7f0992bfda0d19'
    }

    /**
     *  Enumerates all reports of a kind along with the time they happened.
     * 
     *  All reports are sorted by the time of offence.
     * 
     *  Note that the actual type of this mapping is `Vec<u8>`, this is because values of
     *  different types are not supported at the moment so we are doing the manual serialization.
     */
    get asV3(): OffencesSubspaceReportsByKindIndexStorageV3 {
        assert(this.isV3)
        return this as any
    }
}

/**
 *  Enumerates all reports of a kind along with the time they happened.
 * 
 *  All reports are sorted by the time of offence.
 * 
 *  Note that the actual type of this mapping is `Vec<u8>`, this is because values of
 *  different types are not supported at the moment so we are doing the manual serialization.
 */
export interface OffencesSubspaceReportsByKindIndexStorageV3 {
    get(key: Uint8Array): Promise<Uint8Array>
    getAll(): Promise<Uint8Array[]>
    getMany(keys: Uint8Array[]): Promise<Uint8Array[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: Uint8Array][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: Uint8Array][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: Uint8Array][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: Uint8Array][]>
}

export class RuntimeConfigsEnableExecutorStorage extends StorageBase {
    protected getPrefix() {
        return 'RuntimeConfigs'
    }

    protected getName() {
        return 'EnableExecutor'
    }

    /**
     *  Sets this value to `true` to enable the signed extension `DisablePallets` which
     *  disallowes the Call from pallet-executor.
     */
    get isV3(): boolean {
        return this.getTypeHash() === '1b6fbf1674d189f761a7ac63093bf5c755bf073dd9d9f0dbe657289f92575db5'
    }

    /**
     *  Sets this value to `true` to enable the signed extension `DisablePallets` which
     *  disallowes the Call from pallet-executor.
     */
    get asV3(): RuntimeConfigsEnableExecutorStorageV3 {
        assert(this.isV3)
        return this as any
    }
}

/**
 *  Sets this value to `true` to enable the signed extension `DisablePallets` which
 *  disallowes the Call from pallet-executor.
 */
export interface RuntimeConfigsEnableExecutorStorageV3 {
    get(): Promise<boolean>
}

export class SubspaceAllowAuthoringByAnyoneStorage extends StorageBase {
    protected getPrefix() {
        return 'Subspace'
    }

    protected getName() {
        return 'AllowAuthoringByAnyone'
    }

    /**
     *  Allow block authoring by anyone or just root.
     */
    get isV3(): boolean {
        return this.getTypeHash() === '1b6fbf1674d189f761a7ac63093bf5c755bf073dd9d9f0dbe657289f92575db5'
    }

    /**
     *  Allow block authoring by anyone or just root.
     */
    get asV3(): SubspaceAllowAuthoringByAnyoneStorageV3 {
        assert(this.isV3)
        return this as any
    }
}

/**
 *  Allow block authoring by anyone or just root.
 */
export interface SubspaceAllowAuthoringByAnyoneStorageV3 {
    get(): Promise<boolean>
}

export class SubspaceBlockListStorage extends StorageBase {
    protected getPrefix() {
        return 'Subspace'
    }

    protected getName() {
        return 'BlockList'
    }

    /**
     *  A set of blocked farmers keyed by their public key.
     */
    get isV3(): boolean {
        return this.getTypeHash() === '29735300dba5135be0e1e53d771089aba86ed92479018d68d31c9d66cb9816e3'
    }

    /**
     *  A set of blocked farmers keyed by their public key.
     */
    get asV3(): SubspaceBlockListStorageV3 {
        assert(this.isV3)
        return this as any
    }
}

/**
 *  A set of blocked farmers keyed by their public key.
 */
export interface SubspaceBlockListStorageV3 {
    get(key: Uint8Array): Promise<(null | undefined)>
    getAll(): Promise<null[]>
    getMany(keys: Uint8Array[]): Promise<(null | undefined)[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: null][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: null][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: null][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: null][]>
}

export class SubspaceCounterForRecordsRootStorage extends StorageBase {
    protected getPrefix() {
        return 'Subspace'
    }

    protected getName() {
        return 'CounterForRecordsRoot'
    }

    /**
     * Counter for the related counted storage map
     */
    get isV3(): boolean {
        return this.getTypeHash() === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
    }

    /**
     * Counter for the related counted storage map
     */
    get asV3(): SubspaceCounterForRecordsRootStorageV3 {
        assert(this.isV3)
        return this as any
    }
}

/**
 * Counter for the related counted storage map
 */
export interface SubspaceCounterForRecordsRootStorageV3 {
    get(): Promise<number>
}

export class SubspaceCurrentBlockAuthorInfoStorage extends StorageBase {
    protected getPrefix() {
        return 'Subspace'
    }

    protected getName() {
        return 'CurrentBlockAuthorInfo'
    }

    /**
     *  Temporary value (cleared at block finalization) with block author information.
     */
    get isV3(): boolean {
        return this.getTypeHash() === '5f9396721380c424eb16f4b73fd10f9a2357b8dd41849bfbdf5027ac738ba723'
    }

    /**
     *  Temporary value (cleared at block finalization) with block author information.
     */
    get asV3(): SubspaceCurrentBlockAuthorInfoStorageV3 {
        assert(this.isV3)
        return this as any
    }
}

/**
 *  Temporary value (cleared at block finalization) with block author information.
 */
export interface SubspaceCurrentBlockAuthorInfoStorageV3 {
    get(): Promise<([Uint8Array, bigint, Uint8Array] | undefined)>
}

export class SubspaceCurrentBlockVotersStorage extends StorageBase {
    protected getPrefix() {
        return 'Subspace'
    }

    protected getName() {
        return 'CurrentBlockVoters'
    }

    /**
     *  Temporary value (cleared at block finalization) with voters in the current block thus far.
     */
    get isV3(): boolean {
        return this.getTypeHash() === '75ecbd1fb33fd6400e82c2bdecb7e842ec80aa1debc6383f1d37addce5e445fa'
    }

    /**
     *  Temporary value (cleared at block finalization) with voters in the current block thus far.
     */
    get asV3(): SubspaceCurrentBlockVotersStorageV3 {
        assert(this.isV3)
        return this as any
    }
}

/**
 *  Temporary value (cleared at block finalization) with voters in the current block thus far.
 */
export interface SubspaceCurrentBlockVotersStorageV3 {
    get(): Promise<([[Uint8Array, bigint], [Uint8Array, Uint8Array]][] | undefined)>
}

export class SubspaceCurrentSlotStorage extends StorageBase {
    protected getPrefix() {
        return 'Subspace'
    }

    protected getName() {
        return 'CurrentSlot'
    }

    /**
     *  Current slot number.
     */
    get isV3(): boolean {
        return this.getTypeHash() === '95ff4f914f08e149ddbe1ae2dcb1743bbf9aaae69d04c486e1a398cacfcca06a'
    }

    /**
     *  Current slot number.
     */
    get asV3(): SubspaceCurrentSlotStorageV3 {
        assert(this.isV3)
        return this as any
    }
}

/**
 *  Current slot number.
 */
export interface SubspaceCurrentSlotStorageV3 {
    get(): Promise<bigint>
}

export class SubspaceEnableRewardsStorage extends StorageBase {
    protected getPrefix() {
        return 'Subspace'
    }

    protected getName() {
        return 'EnableRewards'
    }

    /**
     *  Enable rewards since specified block number.
     */
    get isV3(): boolean {
        return this.getTypeHash() === 'a926ad48d1a07d1162c5fdb99f3f6cef39c7c5a115a92ff9ccf0357bae4bf2ed'
    }

    /**
     *  Enable rewards since specified block number.
     */
    get asV3(): SubspaceEnableRewardsStorageV3 {
        assert(this.isV3)
        return this as any
    }
}

/**
 *  Enable rewards since specified block number.
 */
export interface SubspaceEnableRewardsStorageV3 {
    get(): Promise<(number | undefined)>
}

export class SubspaceEonIndexStorage extends StorageBase {
    protected getPrefix() {
        return 'Subspace'
    }

    protected getName() {
        return 'EonIndex'
    }

    /**
     *  Current eon index.
     */
    get isV3(): boolean {
        return this.getTypeHash() === '95ff4f914f08e149ddbe1ae2dcb1743bbf9aaae69d04c486e1a398cacfcca06a'
    }

    /**
     *  Current eon index.
     */
    get asV3(): SubspaceEonIndexStorageV3 {
        assert(this.isV3)
        return this as any
    }
}

/**
 *  Current eon index.
 */
export interface SubspaceEonIndexStorageV3 {
    get(): Promise<bigint>
}

export class SubspaceEraStartSlotStorage extends StorageBase {
    protected getPrefix() {
        return 'Subspace'
    }

    protected getName() {
        return 'EraStartSlot'
    }

    /**
     *  Slot at which current era started.
     */
    get isV3(): boolean {
        return this.getTypeHash() === 'd3f0e4c96dad8d73df3c44f02993a46a9ed2eed15208047c7d80882af09d67cc'
    }

    /**
     *  Slot at which current era started.
     */
    get asV3(): SubspaceEraStartSlotStorageV3 {
        assert(this.isV3)
        return this as any
    }
}

/**
 *  Slot at which current era started.
 */
export interface SubspaceEraStartSlotStorageV3 {
    get(): Promise<(bigint | undefined)>
}

export class SubspaceGenesisSlotStorage extends StorageBase {
    protected getPrefix() {
        return 'Subspace'
    }

    protected getName() {
        return 'GenesisSlot'
    }

    /**
     *  The slot at which the first block was created. This is 0 until the first block of the chain.
     */
    get isV3(): boolean {
        return this.getTypeHash() === '95ff4f914f08e149ddbe1ae2dcb1743bbf9aaae69d04c486e1a398cacfcca06a'
    }

    /**
     *  The slot at which the first block was created. This is 0 until the first block of the chain.
     */
    get asV3(): SubspaceGenesisSlotStorageV3 {
        assert(this.isV3)
        return this as any
    }
}

/**
 *  The slot at which the first block was created. This is 0 until the first block of the chain.
 */
export interface SubspaceGenesisSlotStorageV3 {
    get(): Promise<bigint>
}

export class SubspaceGlobalRandomnessesStorage extends StorageBase {
    protected getPrefix() {
        return 'Subspace'
    }

    protected getName() {
        return 'GlobalRandomnesses'
    }

    /**
     *  Global randomnesses derived from from PoR signature and used for deriving global challenges.
     */
    get isV3(): boolean {
        return this.getTypeHash() === 'bd660e3e2e452a3c4ad8981d49862a3c5b75d79eb110a767554b3a53713dbcb0'
    }

    /**
     *  Global randomnesses derived from from PoR signature and used for deriving global challenges.
     */
    get asV3(): SubspaceGlobalRandomnessesStorageV3 {
        assert(this.isV3)
        return this as any
    }
}

/**
 *  Global randomnesses derived from from PoR signature and used for deriving global challenges.
 */
export interface SubspaceGlobalRandomnessesStorageV3 {
    get(): Promise<v3.GlobalRandomnesses>
}

export class SubspaceIsStorageAccessEnabledStorage extends StorageBase {
    protected getPrefix() {
        return 'Subspace'
    }

    protected getName() {
        return 'IsStorageAccessEnabled'
    }

    /**
     *  Enable storage access for all users.
     */
    get isV3(): boolean {
        return this.getTypeHash() === '1b6fbf1674d189f761a7ac63093bf5c755bf073dd9d9f0dbe657289f92575db5'
    }

    /**
     *  Enable storage access for all users.
     */
    get asV3(): SubspaceIsStorageAccessEnabledStorageV3 {
        assert(this.isV3)
        return this as any
    }
}

/**
 *  Enable storage access for all users.
 */
export interface SubspaceIsStorageAccessEnabledStorageV3 {
    get(): Promise<boolean>
}

export class SubspaceMaxPlotSizeStorage extends StorageBase {
    protected getPrefix() {
        return 'Subspace'
    }

    protected getName() {
        return 'MaxPlotSize'
    }

    /**
     *  Maximum plot size in bytes.
     */
    get isV3(): boolean {
        return this.getTypeHash() === '95ff4f914f08e149ddbe1ae2dcb1743bbf9aaae69d04c486e1a398cacfcca06a'
    }

    /**
     *  Maximum plot size in bytes.
     */
    get asV3(): SubspaceMaxPlotSizeStorageV3 {
        assert(this.isV3)
        return this as any
    }
}

/**
 *  Maximum plot size in bytes.
 */
export interface SubspaceMaxPlotSizeStorageV3 {
    get(): Promise<bigint>
}

export class SubspaceNextSolutionRangeOverrideStorage extends StorageBase {
    protected getPrefix() {
        return 'Subspace'
    }

    protected getName() {
        return 'NextSolutionRangeOverride'
    }

    /**
     *  Override solution range during next update
     */
    get isV3(): boolean {
        return this.getTypeHash() === 'f85e5ab5a15931a03e24612ba0bf8cf561a07fe4000dd0746217e69abf3310c7'
    }

    /**
     *  Override solution range during next update
     */
    get asV3(): SubspaceNextSolutionRangeOverrideStorageV3 {
        assert(this.isV3)
        return this as any
    }
}

/**
 *  Override solution range during next update
 */
export interface SubspaceNextSolutionRangeOverrideStorageV3 {
    get(): Promise<(v3.SolutionRangeOverride | undefined)>
}

export class SubspaceParentBlockAuthorInfoStorage extends StorageBase {
    protected getPrefix() {
        return 'Subspace'
    }

    protected getName() {
        return 'ParentBlockAuthorInfo'
    }

    /**
     *  Parent block author information.
     */
    get isV3(): boolean {
        return this.getTypeHash() === 'eef48e2beeab80ebf1ff831f480a1b85b9ee8c173fc7ec23254ac7f00f4ea352'
    }

    /**
     *  Parent block author information.
     */
    get asV3(): SubspaceParentBlockAuthorInfoStorageV3 {
        assert(this.isV3)
        return this as any
    }
}

/**
 *  Parent block author information.
 */
export interface SubspaceParentBlockAuthorInfoStorageV3 {
    get(): Promise<([Uint8Array, bigint] | undefined)>
}

export class SubspaceParentBlockVotersStorage extends StorageBase {
    protected getPrefix() {
        return 'Subspace'
    }

    protected getName() {
        return 'ParentBlockVoters'
    }

    /**
     *  Voters in the parent block (set at the end of the block with current values).
     */
    get isV3(): boolean {
        return this.getTypeHash() === '92ac331501fc84f9accbed56a3b3bcff3df2ff6d22ecbfc79eaff64b71d2c269'
    }

    /**
     *  Voters in the parent block (set at the end of the block with current values).
     */
    get asV3(): SubspaceParentBlockVotersStorageV3 {
        assert(this.isV3)
        return this as any
    }
}

/**
 *  Voters in the parent block (set at the end of the block with current values).
 */
export interface SubspaceParentBlockVotersStorageV3 {
    get(): Promise<[[Uint8Array, bigint], [Uint8Array, Uint8Array]][]>
}

export class SubspaceParentVoteVerificationDataStorage extends StorageBase {
    protected getPrefix() {
        return 'Subspace'
    }

    protected getName() {
        return 'ParentVoteVerificationData'
    }

    /**
     *  Storage of previous vote verification data, updated on each block during finalization.
     */
    get isV3(): boolean {
        return this.getTypeHash() === '05fcde189d29f5ea2976e73c9546b694f059a4954374b5d892a263fefcaeeca4'
    }

    /**
     *  Storage of previous vote verification data, updated on each block during finalization.
     */
    get asV3(): SubspaceParentVoteVerificationDataStorageV3 {
        assert(this.isV3)
        return this as any
    }
}

/**
 *  Storage of previous vote verification data, updated on each block during finalization.
 */
export interface SubspaceParentVoteVerificationDataStorageV3 {
    get(): Promise<(v3.VoteVerificationData | undefined)>
}

export class SubspacePorRandomnessStorage extends StorageBase {
    protected getPrefix() {
        return 'Subspace'
    }

    protected getName() {
        return 'PorRandomness'
    }

    /**
     *  Temporary value (cleared at block finalization) which contains current block PoR randomness.
     */
    get isV3(): boolean {
        return this.getTypeHash() === '8620bdc4f360add1f8e58e488bdba4fa9b6dab86ecdd1c942b8d9de43ede38e5'
    }

    /**
     *  Temporary value (cleared at block finalization) which contains current block PoR randomness.
     */
    get asV3(): SubspacePorRandomnessStorageV3 {
        assert(this.isV3)
        return this as any
    }
}

/**
 *  Temporary value (cleared at block finalization) which contains current block PoR randomness.
 */
export interface SubspacePorRandomnessStorageV3 {
    get(): Promise<(Uint8Array | undefined)>
}

export class SubspaceRecordsRootStorage extends StorageBase {
    protected getPrefix() {
        return 'Subspace'
    }

    protected getName() {
        return 'RecordsRoot'
    }

    /**
     *  Mapping from segment index to corresponding merkle tree root of segment records.
     */
    get isV3(): boolean {
        return this.getTypeHash() === 'ffc087e1323413e73a9729e444bf115bb89bc74cab9f4347c9dc890a14ae8d68'
    }

    /**
     *  Mapping from segment index to corresponding merkle tree root of segment records.
     */
    get asV3(): SubspaceRecordsRootStorageV3 {
        assert(this.isV3)
        return this as any
    }
}

/**
 *  Mapping from segment index to corresponding merkle tree root of segment records.
 */
export interface SubspaceRecordsRootStorageV3 {
    get(key: bigint): Promise<(Uint8Array | undefined)>
    getAll(): Promise<Uint8Array[]>
    getMany(keys: bigint[]): Promise<(Uint8Array | undefined)[]>
    getKeys(): Promise<bigint[]>
    getKeys(key: bigint): Promise<bigint[]>
    getKeysPaged(pageSize: number): AsyncIterable<bigint[]>
    getKeysPaged(pageSize: number, key: bigint): AsyncIterable<bigint[]>
    getPairs(): Promise<[k: bigint, v: Uint8Array][]>
    getPairs(key: bigint): Promise<[k: bigint, v: Uint8Array][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: bigint, v: Uint8Array][]>
    getPairsPaged(pageSize: number, key: bigint): AsyncIterable<[k: bigint, v: Uint8Array][]>
}

export class SubspaceRootPlotPublicKeyStorage extends StorageBase {
    protected getPrefix() {
        return 'Subspace'
    }

    protected getName() {
        return 'RootPlotPublicKey'
    }

    /**
     *  Root plot public key.
     * 
     *  Set just once to make sure no one else can author blocks until allowed for anyone.
     */
    get isV3(): boolean {
        return this.getTypeHash() === '8620bdc4f360add1f8e58e488bdba4fa9b6dab86ecdd1c942b8d9de43ede38e5'
    }

    /**
     *  Root plot public key.
     * 
     *  Set just once to make sure no one else can author blocks until allowed for anyone.
     */
    get asV3(): SubspaceRootPlotPublicKeyStorageV3 {
        assert(this.isV3)
        return this as any
    }
}

/**
 *  Root plot public key.
 * 
 *  Set just once to make sure no one else can author blocks until allowed for anyone.
 */
export interface SubspaceRootPlotPublicKeyStorageV3 {
    get(): Promise<(Uint8Array | undefined)>
}

export class SubspaceSaltsStorage extends StorageBase {
    protected getPrefix() {
        return 'Subspace'
    }

    protected getName() {
        return 'Salts'
    }

    /**
     *  Salts used for challenges.
     */
    get isV3(): boolean {
        return this.getTypeHash() === 'fd499d49189ae51246a6ae3fd7ecaa2f8dd5c13e91da156bd92f5b659f3cd113'
    }

    /**
     *  Salts used for challenges.
     */
    get asV3(): SubspaceSaltsStorageV3 {
        assert(this.isV3)
        return this as any
    }
}

/**
 *  Salts used for challenges.
 */
export interface SubspaceSaltsStorageV3 {
    get(): Promise<v3.Salts>
}

export class SubspaceShouldAdjustSolutionRangeStorage extends StorageBase {
    protected getPrefix() {
        return 'Subspace'
    }

    protected getName() {
        return 'ShouldAdjustSolutionRange'
    }

    /**
     *  Storage to check if the solution range is to be adjusted for next era
     */
    get isV3(): boolean {
        return this.getTypeHash() === '1b6fbf1674d189f761a7ac63093bf5c755bf073dd9d9f0dbe657289f92575db5'
    }

    /**
     *  Storage to check if the solution range is to be adjusted for next era
     */
    get asV3(): SubspaceShouldAdjustSolutionRangeStorageV3 {
        assert(this.isV3)
        return this as any
    }
}

/**
 *  Storage to check if the solution range is to be adjusted for next era
 */
export interface SubspaceShouldAdjustSolutionRangeStorageV3 {
    get(): Promise<boolean>
}

export class SubspaceSolutionRangesStorage extends StorageBase {
    protected getPrefix() {
        return 'Subspace'
    }

    protected getName() {
        return 'SolutionRanges'
    }

    /**
     *  Solution ranges used for challenges.
     */
    get isV3(): boolean {
        return this.getTypeHash() === 'cae747bc9f17b3b0f1380a81f908e1762006357df74c193ce4e62a53bc8a5442'
    }

    /**
     *  Solution ranges used for challenges.
     */
    get asV3(): SubspaceSolutionRangesStorageV3 {
        assert(this.isV3)
        return this as any
    }
}

/**
 *  Solution ranges used for challenges.
 */
export interface SubspaceSolutionRangesStorageV3 {
    get(): Promise<v3.SolutionRanges>
}

export class SudoKeyStorage extends StorageBase {
    protected getPrefix() {
        return 'Sudo'
    }

    protected getName() {
        return 'Key'
    }

    /**
     *  The `AccountId` of the sudo key.
     */
    get isV3(): boolean {
        return this.getTypeHash() === '8620bdc4f360add1f8e58e488bdba4fa9b6dab86ecdd1c942b8d9de43ede38e5'
    }

    /**
     *  The `AccountId` of the sudo key.
     */
    get asV3(): SudoKeyStorageV3 {
        assert(this.isV3)
        return this as any
    }
}

/**
 *  The `AccountId` of the sudo key.
 */
export interface SudoKeyStorageV3 {
    get(): Promise<(Uint8Array | undefined)>
}

export class SystemAccountStorage extends StorageBase {
    protected getPrefix() {
        return 'System'
    }

    protected getName() {
        return 'Account'
    }

    /**
     *  The full account information for a particular account ID.
     */
    get isV3(): boolean {
        return this.getTypeHash() === '1ddc7ade926221442c388ee4405a71c9428e548fab037445aaf4b3a78f4735c1'
    }

    /**
     *  The full account information for a particular account ID.
     */
    get asV3(): SystemAccountStorageV3 {
        assert(this.isV3)
        return this as any
    }
}

/**
 *  The full account information for a particular account ID.
 */
export interface SystemAccountStorageV3 {
    get(key: Uint8Array): Promise<v3.AccountInfo>
    getAll(): Promise<v3.AccountInfo[]>
    getMany(keys: Uint8Array[]): Promise<v3.AccountInfo[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: v3.AccountInfo][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: v3.AccountInfo][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: v3.AccountInfo][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: v3.AccountInfo][]>
}

export class SystemAllExtrinsicsLenStorage extends StorageBase {
    protected getPrefix() {
        return 'System'
    }

    protected getName() {
        return 'AllExtrinsicsLen'
    }

    /**
     *  Total length (in bytes) for all extrinsics put together, for the current block.
     */
    get isV3(): boolean {
        return this.getTypeHash() === 'a926ad48d1a07d1162c5fdb99f3f6cef39c7c5a115a92ff9ccf0357bae4bf2ed'
    }

    /**
     *  Total length (in bytes) for all extrinsics put together, for the current block.
     */
    get asV3(): SystemAllExtrinsicsLenStorageV3 {
        assert(this.isV3)
        return this as any
    }
}

/**
 *  Total length (in bytes) for all extrinsics put together, for the current block.
 */
export interface SystemAllExtrinsicsLenStorageV3 {
    get(): Promise<(number | undefined)>
}

export class SystemBlockHashStorage extends StorageBase {
    protected getPrefix() {
        return 'System'
    }

    protected getName() {
        return 'BlockHash'
    }

    /**
     *  Map of block numbers to block hashes.
     */
    get isV3(): boolean {
        return this.getTypeHash() === '06f5703796027f4b198d4ffd50b721273430d8ff663660646793873168f9df17'
    }

    /**
     *  Map of block numbers to block hashes.
     */
    get asV3(): SystemBlockHashStorageV3 {
        assert(this.isV3)
        return this as any
    }
}

/**
 *  Map of block numbers to block hashes.
 */
export interface SystemBlockHashStorageV3 {
    get(key: number): Promise<Uint8Array>
    getAll(): Promise<Uint8Array[]>
    getMany(keys: number[]): Promise<Uint8Array[]>
    getKeys(): Promise<number[]>
    getKeys(key: number): Promise<number[]>
    getKeysPaged(pageSize: number): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, key: number): AsyncIterable<number[]>
    getPairs(): Promise<[k: number, v: Uint8Array][]>
    getPairs(key: number): Promise<[k: number, v: Uint8Array][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: number, v: Uint8Array][]>
    getPairsPaged(pageSize: number, key: number): AsyncIterable<[k: number, v: Uint8Array][]>
}

export class SystemBlockWeightStorage extends StorageBase {
    protected getPrefix() {
        return 'System'
    }

    protected getName() {
        return 'BlockWeight'
    }

    /**
     *  The current weight for the block.
     */
    get isV3(): boolean {
        return this.getTypeHash() === '3117e920c869758010946f61bdfb045561b02a263bdc3bcff42e4ce915e4e5d4'
    }

    /**
     *  The current weight for the block.
     */
    get asV3(): SystemBlockWeightStorageV3 {
        assert(this.isV3)
        return this as any
    }
}

/**
 *  The current weight for the block.
 */
export interface SystemBlockWeightStorageV3 {
    get(): Promise<v3.PerDispatchClass>
}

export class SystemDigestStorage extends StorageBase {
    protected getPrefix() {
        return 'System'
    }

    protected getName() {
        return 'Digest'
    }

    /**
     *  Digest of the current block, also part of the block header.
     */
    get isV3(): boolean {
        return this.getTypeHash() === '6edb48fd53810bda6cc1015d69e4aacd63966970836398edb4a47cec0bf3fa85'
    }

    /**
     *  Digest of the current block, also part of the block header.
     */
    get asV3(): SystemDigestStorageV3 {
        assert(this.isV3)
        return this as any
    }
}

/**
 *  Digest of the current block, also part of the block header.
 */
export interface SystemDigestStorageV3 {
    get(): Promise<v3.Digest>
}

export class SystemEventCountStorage extends StorageBase {
    protected getPrefix() {
        return 'System'
    }

    protected getName() {
        return 'EventCount'
    }

    /**
     *  The number of events in the `Events<T>` list.
     */
    get isV3(): boolean {
        return this.getTypeHash() === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
    }

    /**
     *  The number of events in the `Events<T>` list.
     */
    get asV3(): SystemEventCountStorageV3 {
        assert(this.isV3)
        return this as any
    }
}

/**
 *  The number of events in the `Events<T>` list.
 */
export interface SystemEventCountStorageV3 {
    get(): Promise<number>
}

export class SystemEventTopicsStorage extends StorageBase {
    protected getPrefix() {
        return 'System'
    }

    protected getName() {
        return 'EventTopics'
    }

    /**
     *  Mapping between a topic (represented by T::Hash) and a vector of indexes
     *  of events in the `<Events<T>>` list.
     * 
     *  All topic vectors have deterministic storage locations depending on the topic. This
     *  allows light-clients to leverage the changes trie storage tracking mechanism and
     *  in case of changes fetch the list of events of interest.
     * 
     *  The value has the type `(T::BlockNumber, EventIndex)` because if we used only just
     *  the `EventIndex` then in case if the topic has the same contents on the next block
     *  no notification will be triggered thus the event might be lost.
     */
    get isV3(): boolean {
        return this.getTypeHash() === 'd5ef37ba3daec264a9dcba5a29bf5b2ff23eb80b912936f924f44a8db557c58d'
    }

    /**
     *  Mapping between a topic (represented by T::Hash) and a vector of indexes
     *  of events in the `<Events<T>>` list.
     * 
     *  All topic vectors have deterministic storage locations depending on the topic. This
     *  allows light-clients to leverage the changes trie storage tracking mechanism and
     *  in case of changes fetch the list of events of interest.
     * 
     *  The value has the type `(T::BlockNumber, EventIndex)` because if we used only just
     *  the `EventIndex` then in case if the topic has the same contents on the next block
     *  no notification will be triggered thus the event might be lost.
     */
    get asV3(): SystemEventTopicsStorageV3 {
        assert(this.isV3)
        return this as any
    }
}

/**
 *  Mapping between a topic (represented by T::Hash) and a vector of indexes
 *  of events in the `<Events<T>>` list.
 * 
 *  All topic vectors have deterministic storage locations depending on the topic. This
 *  allows light-clients to leverage the changes trie storage tracking mechanism and
 *  in case of changes fetch the list of events of interest.
 * 
 *  The value has the type `(T::BlockNumber, EventIndex)` because if we used only just
 *  the `EventIndex` then in case if the topic has the same contents on the next block
 *  no notification will be triggered thus the event might be lost.
 */
export interface SystemEventTopicsStorageV3 {
    get(key: Uint8Array): Promise<[number, number][]>
    getAll(): Promise<[number, number][][]>
    getMany(keys: Uint8Array[]): Promise<[number, number][][]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: [number, number][]][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: [number, number][]][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: [number, number][]][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: [number, number][]][]>
}

export class SystemEventsStorage extends StorageBase {
    protected getPrefix() {
        return 'System'
    }

    protected getName() {
        return 'Events'
    }

    /**
     *  Events deposited for the current block.
     * 
     *  NOTE: The item is unbound and should therefore never be read on chain.
     *  It could otherwise inflate the PoV size of a block.
     * 
     *  Events have a large in-memory size. Box the events to not go out-of-memory
     *  just in case someone still reads them from within the runtime.
     */
    get isV3(): boolean {
        return this.getTypeHash() === '8fb1d458737181d1972b9dd4e8f2beb2c464394449cce06f3e9a5e28d83f75d3'
    }

    /**
     *  Events deposited for the current block.
     * 
     *  NOTE: The item is unbound and should therefore never be read on chain.
     *  It could otherwise inflate the PoV size of a block.
     * 
     *  Events have a large in-memory size. Box the events to not go out-of-memory
     *  just in case someone still reads them from within the runtime.
     */
    get asV3(): SystemEventsStorageV3 {
        assert(this.isV3)
        return this as any
    }
}

/**
 *  Events deposited for the current block.
 * 
 *  NOTE: The item is unbound and should therefore never be read on chain.
 *  It could otherwise inflate the PoV size of a block.
 * 
 *  Events have a large in-memory size. Box the events to not go out-of-memory
 *  just in case someone still reads them from within the runtime.
 */
export interface SystemEventsStorageV3 {
    get(): Promise<v3.EventRecord[]>
}

export class SystemExecutionPhaseStorage extends StorageBase {
    protected getPrefix() {
        return 'System'
    }

    protected getName() {
        return 'ExecutionPhase'
    }

    /**
     *  The execution phase of the block.
     */
    get isV3(): boolean {
        return this.getTypeHash() === '0ad1e323fa21971add5b3b0cc709a6e02dc7c64db7d344c1a67ec0227969ae75'
    }

    /**
     *  The execution phase of the block.
     */
    get asV3(): SystemExecutionPhaseStorageV3 {
        assert(this.isV3)
        return this as any
    }
}

/**
 *  The execution phase of the block.
 */
export interface SystemExecutionPhaseStorageV3 {
    get(): Promise<(v3.Phase | undefined)>
}

export class SystemExtrinsicCountStorage extends StorageBase {
    protected getPrefix() {
        return 'System'
    }

    protected getName() {
        return 'ExtrinsicCount'
    }

    /**
     *  Total extrinsics count for the current block.
     */
    get isV3(): boolean {
        return this.getTypeHash() === 'a926ad48d1a07d1162c5fdb99f3f6cef39c7c5a115a92ff9ccf0357bae4bf2ed'
    }

    /**
     *  Total extrinsics count for the current block.
     */
    get asV3(): SystemExtrinsicCountStorageV3 {
        assert(this.isV3)
        return this as any
    }
}

/**
 *  Total extrinsics count for the current block.
 */
export interface SystemExtrinsicCountStorageV3 {
    get(): Promise<(number | undefined)>
}

export class SystemExtrinsicDataStorage extends StorageBase {
    protected getPrefix() {
        return 'System'
    }

    protected getName() {
        return 'ExtrinsicData'
    }

    /**
     *  Extrinsics data for the current block (maps an extrinsic's index to its data).
     */
    get isV3(): boolean {
        return this.getTypeHash() === 'f278d7d239e9ac4cbb0509cc885124fd45c3f5b75452aba0391701e1a886debb'
    }

    /**
     *  Extrinsics data for the current block (maps an extrinsic's index to its data).
     */
    get asV3(): SystemExtrinsicDataStorageV3 {
        assert(this.isV3)
        return this as any
    }
}

/**
 *  Extrinsics data for the current block (maps an extrinsic's index to its data).
 */
export interface SystemExtrinsicDataStorageV3 {
    get(key: number): Promise<Uint8Array>
    getAll(): Promise<Uint8Array[]>
    getMany(keys: number[]): Promise<Uint8Array[]>
    getKeys(): Promise<number[]>
    getKeys(key: number): Promise<number[]>
    getKeysPaged(pageSize: number): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, key: number): AsyncIterable<number[]>
    getPairs(): Promise<[k: number, v: Uint8Array][]>
    getPairs(key: number): Promise<[k: number, v: Uint8Array][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: number, v: Uint8Array][]>
    getPairsPaged(pageSize: number, key: number): AsyncIterable<[k: number, v: Uint8Array][]>
}

export class SystemLastRuntimeUpgradeStorage extends StorageBase {
    protected getPrefix() {
        return 'System'
    }

    protected getName() {
        return 'LastRuntimeUpgrade'
    }

    /**
     *  Stores the `spec_version` and `spec_name` of when the last runtime upgrade happened.
     */
    get isV3(): boolean {
        return this.getTypeHash() === 'e03e445e7a7694163bede3a772a8a347abf7a3a00424fbafec75f819d6173a17'
    }

    /**
     *  Stores the `spec_version` and `spec_name` of when the last runtime upgrade happened.
     */
    get asV3(): SystemLastRuntimeUpgradeStorageV3 {
        assert(this.isV3)
        return this as any
    }
}

/**
 *  Stores the `spec_version` and `spec_name` of when the last runtime upgrade happened.
 */
export interface SystemLastRuntimeUpgradeStorageV3 {
    get(): Promise<(v3.LastRuntimeUpgradeInfo | undefined)>
}

export class SystemNumberStorage extends StorageBase {
    protected getPrefix() {
        return 'System'
    }

    protected getName() {
        return 'Number'
    }

    /**
     *  The current block number being processed. Set by `execute_block`.
     */
    get isV3(): boolean {
        return this.getTypeHash() === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
    }

    /**
     *  The current block number being processed. Set by `execute_block`.
     */
    get asV3(): SystemNumberStorageV3 {
        assert(this.isV3)
        return this as any
    }
}

/**
 *  The current block number being processed. Set by `execute_block`.
 */
export interface SystemNumberStorageV3 {
    get(): Promise<number>
}

export class SystemParentHashStorage extends StorageBase {
    protected getPrefix() {
        return 'System'
    }

    protected getName() {
        return 'ParentHash'
    }

    /**
     *  Hash of the previous block.
     */
    get isV3(): boolean {
        return this.getTypeHash() === '146c0d1dce070e2a43f497c479248a882f4ed48937203ea336e85dcf2fa0ec6c'
    }

    /**
     *  Hash of the previous block.
     */
    get asV3(): SystemParentHashStorageV3 {
        assert(this.isV3)
        return this as any
    }
}

/**
 *  Hash of the previous block.
 */
export interface SystemParentHashStorageV3 {
    get(): Promise<Uint8Array>
}

export class SystemUpgradedToTripleRefCountStorage extends StorageBase {
    protected getPrefix() {
        return 'System'
    }

    protected getName() {
        return 'UpgradedToTripleRefCount'
    }

    /**
     *  True if we have upgraded so that AccountInfo contains three types of `RefCount`. False
     *  (default) if not.
     */
    get isV3(): boolean {
        return this.getTypeHash() === '1b6fbf1674d189f761a7ac63093bf5c755bf073dd9d9f0dbe657289f92575db5'
    }

    /**
     *  True if we have upgraded so that AccountInfo contains three types of `RefCount`. False
     *  (default) if not.
     */
    get asV3(): SystemUpgradedToTripleRefCountStorageV3 {
        assert(this.isV3)
        return this as any
    }
}

/**
 *  True if we have upgraded so that AccountInfo contains three types of `RefCount`. False
 *  (default) if not.
 */
export interface SystemUpgradedToTripleRefCountStorageV3 {
    get(): Promise<boolean>
}

export class SystemUpgradedToU32RefCountStorage extends StorageBase {
    protected getPrefix() {
        return 'System'
    }

    protected getName() {
        return 'UpgradedToU32RefCount'
    }

    /**
     *  True if we have upgraded so that `type RefCount` is `u32`. False (default) if not.
     */
    get isV3(): boolean {
        return this.getTypeHash() === '1b6fbf1674d189f761a7ac63093bf5c755bf073dd9d9f0dbe657289f92575db5'
    }

    /**
     *  True if we have upgraded so that `type RefCount` is `u32`. False (default) if not.
     */
    get asV3(): SystemUpgradedToU32RefCountStorageV3 {
        assert(this.isV3)
        return this as any
    }
}

/**
 *  True if we have upgraded so that `type RefCount` is `u32`. False (default) if not.
 */
export interface SystemUpgradedToU32RefCountStorageV3 {
    get(): Promise<boolean>
}

export class TimestampDidUpdateStorage extends StorageBase {
    protected getPrefix() {
        return 'Timestamp'
    }

    protected getName() {
        return 'DidUpdate'
    }

    /**
     *  Did the timestamp get updated in this block?
     */
    get isV3(): boolean {
        return this.getTypeHash() === '1b6fbf1674d189f761a7ac63093bf5c755bf073dd9d9f0dbe657289f92575db5'
    }

    /**
     *  Did the timestamp get updated in this block?
     */
    get asV3(): TimestampDidUpdateStorageV3 {
        assert(this.isV3)
        return this as any
    }
}

/**
 *  Did the timestamp get updated in this block?
 */
export interface TimestampDidUpdateStorageV3 {
    get(): Promise<boolean>
}

export class TimestampNowStorage extends StorageBase {
    protected getPrefix() {
        return 'Timestamp'
    }

    protected getName() {
        return 'Now'
    }

    /**
     *  Current time for the current block.
     */
    get isV3(): boolean {
        return this.getTypeHash() === '95ff4f914f08e149ddbe1ae2dcb1743bbf9aaae69d04c486e1a398cacfcca06a'
    }

    /**
     *  Current time for the current block.
     */
    get asV3(): TimestampNowStorageV3 {
        assert(this.isV3)
        return this as any
    }
}

/**
 *  Current time for the current block.
 */
export interface TimestampNowStorageV3 {
    get(): Promise<bigint>
}

export class TransactionFeesBlockAuthorStorage extends StorageBase {
    protected getPrefix() {
        return 'TransactionFees'
    }

    protected getName() {
        return 'BlockAuthor'
    }

    /**
     *  Temporary value (cleared at block finalization) which contains current block author, so we
     *  can issue rewards during block finalization.
     */
    get isV3(): boolean {
        return this.getTypeHash() === '8620bdc4f360add1f8e58e488bdba4fa9b6dab86ecdd1c942b8d9de43ede38e5'
    }

    /**
     *  Temporary value (cleared at block finalization) which contains current block author, so we
     *  can issue rewards during block finalization.
     */
    get asV3(): TransactionFeesBlockAuthorStorageV3 {
        assert(this.isV3)
        return this as any
    }
}

/**
 *  Temporary value (cleared at block finalization) which contains current block author, so we
 *  can issue rewards during block finalization.
 */
export interface TransactionFeesBlockAuthorStorageV3 {
    get(): Promise<(Uint8Array | undefined)>
}

export class TransactionFeesCollectedBlockFeesStorage extends StorageBase {
    protected getPrefix() {
        return 'TransactionFees'
    }

    protected getName() {
        return 'CollectedBlockFees'
    }

    /**
     *  Temporary value (cleared at block finalization) which contains current block fees, so we can
     *  issue rewards during block finalization.
     */
    get isV3(): boolean {
        return this.getTypeHash() === '28bed10d043b0c0b43024ee27d2e27a94df5258f8505d99a50db02806087f15a'
    }

    /**
     *  Temporary value (cleared at block finalization) which contains current block fees, so we can
     *  issue rewards during block finalization.
     */
    get asV3(): TransactionFeesCollectedBlockFeesStorageV3 {
        assert(this.isV3)
        return this as any
    }
}

/**
 *  Temporary value (cleared at block finalization) which contains current block fees, so we can
 *  issue rewards during block finalization.
 */
export interface TransactionFeesCollectedBlockFeesStorageV3 {
    get(): Promise<(v3.CollectedFees | undefined)>
}

export class TransactionFeesCollectedStorageFeesEscrowStorage extends StorageBase {
    protected getPrefix() {
        return 'TransactionFees'
    }

    protected getName() {
        return 'CollectedStorageFeesEscrow'
    }

    /**
     *  Escrow of storage fees, a portion of it is released to the block author on every block
     *  and portion of storage fees goes back into this pot.
     */
    get isV3(): boolean {
        return this.getTypeHash() === 'f8ebe28eb30158172c0ccf672f7747c46a244f892d08ef2ebcbaadde34a26bc0'
    }

    /**
     *  Escrow of storage fees, a portion of it is released to the block author on every block
     *  and portion of storage fees goes back into this pot.
     */
    get asV3(): TransactionFeesCollectedStorageFeesEscrowStorageV3 {
        assert(this.isV3)
        return this as any
    }
}

/**
 *  Escrow of storage fees, a portion of it is released to the block author on every block
 *  and portion of storage fees goes back into this pot.
 */
export interface TransactionFeesCollectedStorageFeesEscrowStorageV3 {
    get(): Promise<bigint>
}

export class TransactionFeesTransactionByteFeeStorage extends StorageBase {
    protected getPrefix() {
        return 'TransactionFees'
    }

    protected getName() {
        return 'TransactionByteFee'
    }

    /**
     *  Temporary value (cleared at block finalization) which contains cached value of
     *  `TransactionByteFee` for current block.
     */
    get isV3(): boolean {
        return this.getTypeHash() === '8339208fdff8cc2cbfb9fe1daa9bd886d23b8951771ccf6b00d8cb68da55bcc5'
    }

    /**
     *  Temporary value (cleared at block finalization) which contains cached value of
     *  `TransactionByteFee` for current block.
     */
    get asV3(): TransactionFeesTransactionByteFeeStorageV3 {
        assert(this.isV3)
        return this as any
    }
}

/**
 *  Temporary value (cleared at block finalization) which contains cached value of
 *  `TransactionByteFee` for current block.
 */
export interface TransactionFeesTransactionByteFeeStorageV3 {
    get(): Promise<(bigint | undefined)>
}

export class TransactionPaymentNextFeeMultiplierStorage extends StorageBase {
    protected getPrefix() {
        return 'TransactionPayment'
    }

    protected getName() {
        return 'NextFeeMultiplier'
    }

    get isV3(): boolean {
        return this.getTypeHash() === 'f8ebe28eb30158172c0ccf672f7747c46a244f892d08ef2ebcbaadde34a26bc0'
    }

    get asV3(): TransactionPaymentNextFeeMultiplierStorageV3 {
        assert(this.isV3)
        return this as any
    }
}

export interface TransactionPaymentNextFeeMultiplierStorageV3 {
    get(): Promise<bigint>
}

export class TransactionPaymentStorageVersionStorage extends StorageBase {
    protected getPrefix() {
        return 'TransactionPayment'
    }

    protected getName() {
        return 'StorageVersion'
    }

    get isV3(): boolean {
        return this.getTypeHash() === '7a0b9b43fb3e876cfa92bb4b00e569ef9a82972b0600c8a8570e064c7e3890fd'
    }

    get asV3(): TransactionPaymentStorageVersionStorageV3 {
        assert(this.isV3)
        return this as any
    }
}

export interface TransactionPaymentStorageVersionStorageV3 {
    get(): Promise<v3.Type_128>
}

export class VestingVestingSchedulesStorage extends StorageBase {
    protected getPrefix() {
        return 'Vesting'
    }

    protected getName() {
        return 'VestingSchedules'
    }

    /**
     *  Vesting schedules of an account.
     * 
     *  VestingSchedules: map AccountId => Vec<VestingSchedule>
     */
    get isV3(): boolean {
        return this.getTypeHash() === 'd1025301ffa60f04c50bb1007ecb356d52103dd9c366150de1ba80c6e043ac2f'
    }

    /**
     *  Vesting schedules of an account.
     * 
     *  VestingSchedules: map AccountId => Vec<VestingSchedule>
     */
    get asV3(): VestingVestingSchedulesStorageV3 {
        assert(this.isV3)
        return this as any
    }
}

/**
 *  Vesting schedules of an account.
 * 
 *  VestingSchedules: map AccountId => Vec<VestingSchedule>
 */
export interface VestingVestingSchedulesStorageV3 {
    get(key: Uint8Array): Promise<v3.VestingSchedule[]>
    getAll(): Promise<v3.VestingSchedule[][]>
    getMany(keys: Uint8Array[]): Promise<v3.VestingSchedule[][]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: v3.VestingSchedule[]][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: v3.VestingSchedule[]][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: v3.VestingSchedule[]][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: v3.VestingSchedule[]][]>
}
