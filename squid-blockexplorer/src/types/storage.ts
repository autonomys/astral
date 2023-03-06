import assert from 'assert'
import {Block, BlockContext, Chain, ChainContext, Option, Result, StorageBase} from './support'
import * as v0 from './v0'

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
    get isV0(): boolean {
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
    get asV0(): BalancesAccountStorageV0 {
        assert(this.isV0)
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
export interface BalancesAccountStorageV0 {
    get(key: Uint8Array): Promise<v0.AccountData>
    getAll(): Promise<v0.AccountData[]>
    getMany(keys: Uint8Array[]): Promise<v0.AccountData[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: v0.AccountData][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: v0.AccountData][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: v0.AccountData][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: v0.AccountData][]>
}

export class BalancesInactiveIssuanceStorage extends StorageBase {
    protected getPrefix() {
        return 'Balances'
    }

    protected getName() {
        return 'InactiveIssuance'
    }

    /**
     *  The total units of outstanding deactivated balance in the system.
     */
    get isV0(): boolean {
        return this.getTypeHash() === 'f8ebe28eb30158172c0ccf672f7747c46a244f892d08ef2ebcbaadde34a26bc0'
    }

    /**
     *  The total units of outstanding deactivated balance in the system.
     */
    get asV0(): BalancesInactiveIssuanceStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  The total units of outstanding deactivated balance in the system.
 */
export interface BalancesInactiveIssuanceStorageV0 {
    get(): Promise<bigint>
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
    get isV0(): boolean {
        return this.getTypeHash() === 'e393b3a20a6d47aee703c898fda1db02fffe128e4692a5861f416ecc67b13a86'
    }

    /**
     *  Any liquidity locks on some account balances.
     *  NOTE: Should only be accessed when setting, changing and freeing a lock.
     */
    get asV0(): BalancesLocksStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Any liquidity locks on some account balances.
 *  NOTE: Should only be accessed when setting, changing and freeing a lock.
 */
export interface BalancesLocksStorageV0 {
    get(key: Uint8Array): Promise<v0.BalanceLock[]>
    getAll(): Promise<v0.BalanceLock[][]>
    getMany(keys: Uint8Array[]): Promise<v0.BalanceLock[][]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: v0.BalanceLock[]][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: v0.BalanceLock[]][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: v0.BalanceLock[]][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: v0.BalanceLock[]][]>
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
    get isV0(): boolean {
        return this.getTypeHash() === '474ab364918936227f04514c303c572bb070961f30f593f2cbb3e25426aba37a'
    }

    /**
     *  Named reserves on some account balances.
     */
    get asV0(): BalancesReservesStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Named reserves on some account balances.
 */
export interface BalancesReservesStorageV0 {
    get(key: Uint8Array): Promise<v0.ReserveData[]>
    getAll(): Promise<v0.ReserveData[][]>
    getMany(keys: Uint8Array[]): Promise<v0.ReserveData[][]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: v0.ReserveData[]][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: v0.ReserveData[]][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: v0.ReserveData[]][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: v0.ReserveData[]][]>
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
    get isV0(): boolean {
        return this.getTypeHash() === 'f8ebe28eb30158172c0ccf672f7747c46a244f892d08ef2ebcbaadde34a26bc0'
    }

    /**
     *  The total units issued in the system.
     */
    get asV0(): BalancesTotalIssuanceStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  The total units issued in the system.
 */
export interface BalancesTotalIssuanceStorageV0 {
    get(): Promise<bigint>
}

export class FeedsFeedConfigsStorage extends StorageBase {
    protected getPrefix() {
        return 'Feeds'
    }

    protected getName() {
        return 'FeedConfigs'
    }

    get isV0(): boolean {
        return this.getTypeHash() === '2bd699643905f57b0afc999cdb46fe87e9bc88556f8d86cb437a4abcce700f74'
    }

    get asV0(): FeedsFeedConfigsStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

export interface FeedsFeedConfigsStorageV0 {
    get(key: bigint): Promise<(v0.FeedConfig | undefined)>
    getAll(): Promise<v0.FeedConfig[]>
    getMany(keys: bigint[]): Promise<(v0.FeedConfig | undefined)[]>
    getKeys(): Promise<bigint[]>
    getKeys(key: bigint): Promise<bigint[]>
    getKeysPaged(pageSize: number): AsyncIterable<bigint[]>
    getKeysPaged(pageSize: number, key: bigint): AsyncIterable<bigint[]>
    getPairs(): Promise<[k: bigint, v: v0.FeedConfig][]>
    getPairs(key: bigint): Promise<[k: bigint, v: v0.FeedConfig][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: bigint, v: v0.FeedConfig][]>
    getPairsPaged(pageSize: number, key: bigint): AsyncIterable<[k: bigint, v: v0.FeedConfig][]>
}

export class FeedsFeedsStorage extends StorageBase {
    protected getPrefix() {
        return 'Feeds'
    }

    protected getName() {
        return 'Feeds'
    }

    get isV0(): boolean {
        return this.getTypeHash() === 'fe3e3ebfe8d9e3e028dc2ccc0243b34a5a1c77d8f318ffa75f6ca97892063814'
    }

    get asV0(): FeedsFeedsStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

export interface FeedsFeedsStorageV0 {
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

    get isV0(): boolean {
        return this.getTypeHash() === '20982e01b9cf10a62e69d380b0c1fa5e45a352de0b5cf91f295f9c38d801bc9c'
    }

    get asV0(): FeedsMetadataStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

export interface FeedsMetadataStorageV0 {
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

    get isV0(): boolean {
        return this.getTypeHash() === '95ff4f914f08e149ddbe1ae2dcb1743bbf9aaae69d04c486e1a398cacfcca06a'
    }

    get asV0(): FeedsNextFeedIdStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

export interface FeedsNextFeedIdStorageV0 {
    get(): Promise<bigint>
}

export class FeedsSuccessfulPutsStorage extends StorageBase {
    protected getPrefix() {
        return 'Feeds'
    }

    protected getName() {
        return 'SuccessfulPuts'
    }

    get isV0(): boolean {
        return this.getTypeHash() === 'f5df25eadcdffaa0d2a68b199d671d3921ca36a7b70d22d57506dca52b4b5895'
    }

    get asV0(): FeedsSuccessfulPutsStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

export interface FeedsSuccessfulPutsStorageV0 {
    get(): Promise<Uint8Array[]>
}

export class FeedsTotalsStorage extends StorageBase {
    protected getPrefix() {
        return 'Feeds'
    }

    protected getName() {
        return 'Totals'
    }

    get isV0(): boolean {
        return this.getTypeHash() === 'f3d3eff3c9d5d10a4ce733327b300974210d0b2d3a5eb6ab25a8edd5f6a222ea'
    }

    get asV0(): FeedsTotalsStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

export interface FeedsTotalsStorageV0 {
    get(key: bigint): Promise<v0.TotalObjectsAndSize>
    getAll(): Promise<v0.TotalObjectsAndSize[]>
    getMany(keys: bigint[]): Promise<v0.TotalObjectsAndSize[]>
    getKeys(): Promise<bigint[]>
    getKeys(key: bigint): Promise<bigint[]>
    getKeysPaged(pageSize: number): AsyncIterable<bigint[]>
    getKeysPaged(pageSize: number, key: bigint): AsyncIterable<bigint[]>
    getPairs(): Promise<[k: bigint, v: v0.TotalObjectsAndSize][]>
    getPairs(key: bigint): Promise<[k: bigint, v: v0.TotalObjectsAndSize][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: bigint, v: v0.TotalObjectsAndSize][]>
    getPairsPaged(pageSize: number, key: bigint): AsyncIterable<[k: bigint, v: v0.TotalObjectsAndSize][]>
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
    get isV0(): boolean {
        return this.getTypeHash() === 'ba297738a0a552cc3bb388113efafcf33241993a821307df5fac2ba96657223b'
    }

    /**
     *  Known tip of the chain
     */
    get asV0(): GrandpaFinalityVerifierChainTipStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Known tip of the chain
 */
export interface GrandpaFinalityVerifierChainTipStorageV0 {
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
    get isV0(): boolean {
        return this.getTypeHash() === 'e1694728d047f69484f829b13f6dabfa6d94da8b1aab59f55122e993a67db516'
    }

    /**
     *  The current GRANDPA Authority set for a given Chain
     */
    get asV0(): GrandpaFinalityVerifierCurrentAuthoritySetStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  The current GRANDPA Authority set for a given Chain
 */
export interface GrandpaFinalityVerifierCurrentAuthoritySetStorageV0 {
    get(key: bigint): Promise<v0.AuthoritySet>
    getAll(): Promise<v0.AuthoritySet[]>
    getMany(keys: bigint[]): Promise<v0.AuthoritySet[]>
    getKeys(): Promise<bigint[]>
    getKeys(key: bigint): Promise<bigint[]>
    getKeysPaged(pageSize: number): AsyncIterable<bigint[]>
    getKeysPaged(pageSize: number, key: bigint): AsyncIterable<bigint[]>
    getPairs(): Promise<[k: bigint, v: v0.AuthoritySet][]>
    getPairs(key: bigint): Promise<[k: bigint, v: v0.AuthoritySet][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: bigint, v: v0.AuthoritySet][]>
    getPairsPaged(pageSize: number, key: bigint): AsyncIterable<[k: bigint, v: v0.AuthoritySet][]>
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
    get isV0(): boolean {
        return this.getTypeHash() === 'ba297738a0a552cc3bb388113efafcf33241993a821307df5fac2ba96657223b'
    }

    /**
     *  Oldest known parent
     */
    get asV0(): GrandpaFinalityVerifierOldestKnownParentStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Oldest known parent
 */
export interface GrandpaFinalityVerifierOldestKnownParentStorageV0 {
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
    get isV0(): boolean {
        return this.getTypeHash() === 'ba297738a0a552cc3bb388113efafcf33241993a821307df5fac2ba96657223b'
    }

    /**
     *  The point after which the block validation begins
     */
    get asV0(): GrandpaFinalityVerifierValidationCheckPointStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  The point after which the block validation begins
 */
export interface GrandpaFinalityVerifierValidationCheckPointStorageV0 {
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
    get isV0(): boolean {
        return this.getTypeHash() === 'd5c59a6db2baab9f1dcc1a37b0131a737935fd2082fcf39b6abc3f1d6e3ae008'
    }

    /**
     *  A vector of reports of the same kind that happened at the same time slot.
     */
    get asV0(): OffencesSubspaceConcurrentReportsIndexStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  A vector of reports of the same kind that happened at the same time slot.
 */
export interface OffencesSubspaceConcurrentReportsIndexStorageV0 {
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
    get isV0(): boolean {
        return this.getTypeHash() === 'ce845ea5260838377cabc469ad246c34b46439014c3d4dbdd581259560f3a24a'
    }

    /**
     *  The primary structure that holds all offence records keyed by report identifiers.
     */
    get asV0(): OffencesSubspaceReportsStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  The primary structure that holds all offence records keyed by report identifiers.
 */
export interface OffencesSubspaceReportsStorageV0 {
    get(key: Uint8Array): Promise<(v0.OffenceDetails | undefined)>
    getAll(): Promise<v0.OffenceDetails[]>
    getMany(keys: Uint8Array[]): Promise<(v0.OffenceDetails | undefined)[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: v0.OffenceDetails][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: v0.OffenceDetails][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: v0.OffenceDetails][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: v0.OffenceDetails][]>
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
    get isV0(): boolean {
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
    get asV0(): OffencesSubspaceReportsByKindIndexStorageV0 {
        assert(this.isV0)
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
export interface OffencesSubspaceReportsByKindIndexStorageV0 {
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

export class ReceiptsBlockHashStorage extends StorageBase {
    protected getPrefix() {
        return 'Receipts'
    }

    protected getName() {
        return 'BlockHash'
    }

    /**
     *  Map of primary block number to primary block hash for tracking bounded receipts per domain.
     * 
     *  The oldest block hash will be pruned once the oldest receipt is pruned. However, if a
     *  domain stalls, i.e., no receipts are included in the domain's parent chain for a long time,
     *  the corresponding entry will grow indefinitely.
     * 
     *  TODO: there is a pitfall that any stalled domain can lead to an ubounded runtime storage
     *  growth.
     */
    get isV0(): boolean {
        return this.getTypeHash() === 'aa7d4c5f4b563b675d41168735cddc5e6c983c16c557114ec9cc9e89c1f49482'
    }

    /**
     *  Map of primary block number to primary block hash for tracking bounded receipts per domain.
     * 
     *  The oldest block hash will be pruned once the oldest receipt is pruned. However, if a
     *  domain stalls, i.e., no receipts are included in the domain's parent chain for a long time,
     *  the corresponding entry will grow indefinitely.
     * 
     *  TODO: there is a pitfall that any stalled domain can lead to an ubounded runtime storage
     *  growth.
     */
    get asV0(): ReceiptsBlockHashStorageV0 {
        assert(this.isV0)
        return this as any
    }

    /**
     *  Map of primary block number to primary block hash for tracking bounded receipts per domain.
     * 
     *  The oldest block hash will be pruned once the oldest receipt is pruned. However, if a
     *  domain stalls, i.e., no receipts are included in the domain's parent chain for a long time,
     *  the corresponding entry will grow indefinitely.
     * 
     *  TODO: there is a pitfall that any stalled domain can lead to an ubounded runtime storage
     *  growth.
     */
    get isV1(): boolean {
        return this.getTypeHash() === 'b3c15232fb4346b458fc3153a06d89787a103676fa34fe3d795ee04fe62bf4d8'
    }

    /**
     *  Map of primary block number to primary block hash for tracking bounded receipts per domain.
     * 
     *  The oldest block hash will be pruned once the oldest receipt is pruned. However, if a
     *  domain stalls, i.e., no receipts are included in the domain's parent chain for a long time,
     *  the corresponding entry will grow indefinitely.
     * 
     *  TODO: there is a pitfall that any stalled domain can lead to an ubounded runtime storage
     *  growth.
     */
    get asV1(): ReceiptsBlockHashStorageV1 {
        assert(this.isV1)
        return this as any
    }
}

/**
 *  Map of primary block number to primary block hash for tracking bounded receipts per domain.
 * 
 *  The oldest block hash will be pruned once the oldest receipt is pruned. However, if a
 *  domain stalls, i.e., no receipts are included in the domain's parent chain for a long time,
 *  the corresponding entry will grow indefinitely.
 * 
 *  TODO: there is a pitfall that any stalled domain can lead to an ubounded runtime storage
 *  growth.
 */
export interface ReceiptsBlockHashStorageV0 {
    get(key1: number, key2: number): Promise<Uint8Array>
    getAll(): Promise<Uint8Array[]>
    getMany(keys: [number, number][]): Promise<Uint8Array[]>
    getKeys(): Promise<[number, number][]>
    getKeys(key1: number): Promise<[number, number][]>
    getKeys(key1: number, key2: number): Promise<[number, number][]>
    getKeysPaged(pageSize: number): AsyncIterable<[number, number][]>
    getKeysPaged(pageSize: number, key1: number): AsyncIterable<[number, number][]>
    getKeysPaged(pageSize: number, key1: number, key2: number): AsyncIterable<[number, number][]>
    getPairs(): Promise<[k: [number, number], v: Uint8Array][]>
    getPairs(key1: number): Promise<[k: [number, number], v: Uint8Array][]>
    getPairs(key1: number, key2: number): Promise<[k: [number, number], v: Uint8Array][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [number, number], v: Uint8Array][]>
    getPairsPaged(pageSize: number, key1: number): AsyncIterable<[k: [number, number], v: Uint8Array][]>
    getPairsPaged(pageSize: number, key1: number, key2: number): AsyncIterable<[k: [number, number], v: Uint8Array][]>
}

/**
 *  Map of primary block number to primary block hash for tracking bounded receipts per domain.
 * 
 *  The oldest block hash will be pruned once the oldest receipt is pruned. However, if a
 *  domain stalls, i.e., no receipts are included in the domain's parent chain for a long time,
 *  the corresponding entry will grow indefinitely.
 * 
 *  TODO: there is a pitfall that any stalled domain can lead to an ubounded runtime storage
 *  growth.
 */
export interface ReceiptsBlockHashStorageV1 {
    get(key1: number, key2: number): Promise<(Uint8Array | undefined)>
    getAll(): Promise<Uint8Array[]>
    getMany(keys: [number, number][]): Promise<(Uint8Array | undefined)[]>
    getKeys(): Promise<[number, number][]>
    getKeys(key1: number): Promise<[number, number][]>
    getKeys(key1: number, key2: number): Promise<[number, number][]>
    getKeysPaged(pageSize: number): AsyncIterable<[number, number][]>
    getKeysPaged(pageSize: number, key1: number): AsyncIterable<[number, number][]>
    getKeysPaged(pageSize: number, key1: number, key2: number): AsyncIterable<[number, number][]>
    getPairs(): Promise<[k: [number, number], v: Uint8Array][]>
    getPairs(key1: number): Promise<[k: [number, number], v: Uint8Array][]>
    getPairs(key1: number, key2: number): Promise<[k: [number, number], v: Uint8Array][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [number, number], v: Uint8Array][]>
    getPairsPaged(pageSize: number, key1: number): AsyncIterable<[k: [number, number], v: Uint8Array][]>
    getPairsPaged(pageSize: number, key1: number, key2: number): AsyncIterable<[k: [number, number], v: Uint8Array][]>
}

export class ReceiptsOldestReceiptNumberStorage extends StorageBase {
    protected getPrefix() {
        return 'Receipts'
    }

    protected getName() {
        return 'OldestReceiptNumber'
    }

    /**
     *  Block number of the oldest receipt stored in the state.
     */
    get isV0(): boolean {
        return this.getTypeHash() === 'be37cd27c0e60862618e14817365ea9f5c3c45854fea63a6259de44af2521364'
    }

    /**
     *  Block number of the oldest receipt stored in the state.
     */
    get asV0(): ReceiptsOldestReceiptNumberStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Block number of the oldest receipt stored in the state.
 */
export interface ReceiptsOldestReceiptNumberStorageV0 {
    get(key: number): Promise<number>
    getAll(): Promise<number[]>
    getMany(keys: number[]): Promise<number[]>
    getKeys(): Promise<number[]>
    getKeys(key: number): Promise<number[]>
    getKeysPaged(pageSize: number): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, key: number): AsyncIterable<number[]>
    getPairs(): Promise<[k: number, v: number][]>
    getPairs(key: number): Promise<[k: number, v: number][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: number, v: number][]>
    getPairsPaged(pageSize: number, key: number): AsyncIterable<[k: number, v: number][]>
}

export class ReceiptsReceiptHeadStorage extends StorageBase {
    protected getPrefix() {
        return 'Receipts'
    }

    protected getName() {
        return 'ReceiptHead'
    }

    /**
     *  A pair of (block_hash, block_number) of the latest execution receipt of a domain.
     */
    get isV0(): boolean {
        return this.getTypeHash() === '4bd3c0cf8685253d0f37627d88d524cdfbbd466473885a8547c11cab34816711'
    }

    /**
     *  A pair of (block_hash, block_number) of the latest execution receipt of a domain.
     */
    get asV0(): ReceiptsReceiptHeadStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  A pair of (block_hash, block_number) of the latest execution receipt of a domain.
 */
export interface ReceiptsReceiptHeadStorageV0 {
    get(key: number): Promise<[Uint8Array, number]>
    getAll(): Promise<[Uint8Array, number][]>
    getMany(keys: number[]): Promise<[Uint8Array, number][]>
    getKeys(): Promise<number[]>
    getKeys(key: number): Promise<number[]>
    getKeysPaged(pageSize: number): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, key: number): AsyncIterable<number[]>
    getPairs(): Promise<[k: number, v: [Uint8Array, number]][]>
    getPairs(key: number): Promise<[k: number, v: [Uint8Array, number]][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: number, v: [Uint8Array, number]][]>
    getPairsPaged(pageSize: number, key: number): AsyncIterable<[k: number, v: [Uint8Array, number]][]>
}

export class ReceiptsReceiptVotesStorage extends StorageBase {
    protected getPrefix() {
        return 'Receipts'
    }

    protected getName() {
        return 'ReceiptVotes'
    }

    /**
     *  Mapping for tracking the receipt votes.
     * 
     *  (domain_id, domain_block_hash, receipt_hash) -> receipt_count
     */
    get isV0(): boolean {
        return this.getTypeHash() === 'b5368aba2b08a0cd7eb0f2a07079ff53382c43f521633e8200f78bd0032c5b91'
    }

    /**
     *  Mapping for tracking the receipt votes.
     * 
     *  (domain_id, domain_block_hash, receipt_hash) -> receipt_count
     */
    get asV0(): ReceiptsReceiptVotesStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Mapping for tracking the receipt votes.
 * 
 *  (domain_id, domain_block_hash, receipt_hash) -> receipt_count
 */
export interface ReceiptsReceiptVotesStorageV0 {
    get(key1: number, key2: Uint8Array, key3: Uint8Array): Promise<number>
    getAll(): Promise<number[]>
    getMany(keys: [number, Uint8Array, Uint8Array][]): Promise<number[]>
    getKeys(): Promise<[number, Uint8Array, Uint8Array][]>
    getKeys(key1: number): Promise<[number, Uint8Array, Uint8Array][]>
    getKeys(key1: number, key2: Uint8Array): Promise<[number, Uint8Array, Uint8Array][]>
    getKeys(key1: number, key2: Uint8Array, key3: Uint8Array): Promise<[number, Uint8Array, Uint8Array][]>
    getKeysPaged(pageSize: number): AsyncIterable<[number, Uint8Array, Uint8Array][]>
    getKeysPaged(pageSize: number, key1: number): AsyncIterable<[number, Uint8Array, Uint8Array][]>
    getKeysPaged(pageSize: number, key1: number, key2: Uint8Array): AsyncIterable<[number, Uint8Array, Uint8Array][]>
    getKeysPaged(pageSize: number, key1: number, key2: Uint8Array, key3: Uint8Array): AsyncIterable<[number, Uint8Array, Uint8Array][]>
    getPairs(): Promise<[k: [number, Uint8Array, Uint8Array], v: number][]>
    getPairs(key1: number): Promise<[k: [number, Uint8Array, Uint8Array], v: number][]>
    getPairs(key1: number, key2: Uint8Array): Promise<[k: [number, Uint8Array, Uint8Array], v: number][]>
    getPairs(key1: number, key2: Uint8Array, key3: Uint8Array): Promise<[k: [number, Uint8Array, Uint8Array], v: number][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [number, Uint8Array, Uint8Array], v: number][]>
    getPairsPaged(pageSize: number, key1: number): AsyncIterable<[k: [number, Uint8Array, Uint8Array], v: number][]>
    getPairsPaged(pageSize: number, key1: number, key2: Uint8Array): AsyncIterable<[k: [number, Uint8Array, Uint8Array], v: number][]>
    getPairsPaged(pageSize: number, key1: number, key2: Uint8Array, key3: Uint8Array): AsyncIterable<[k: [number, Uint8Array, Uint8Array], v: number][]>
}

export class ReceiptsReceiptsStorage extends StorageBase {
    protected getPrefix() {
        return 'Receipts'
    }

    protected getName() {
        return 'Receipts'
    }

    /**
     *  Mapping from the receipt hash to the corresponding verified execution receipt.
     * 
     *  The capacity of receipts stored in the state is [`Config::ReceiptsPruningDepth`], the older
     *  ones will be pruned once the size of receipts exceeds this number.
     */
    get isV0(): boolean {
        return this.getTypeHash() === 'c2881848fa0c99d217c29d7d90870276b0ab8167a6029df9c77ee92d7838790d'
    }

    /**
     *  Mapping from the receipt hash to the corresponding verified execution receipt.
     * 
     *  The capacity of receipts stored in the state is [`Config::ReceiptsPruningDepth`], the older
     *  ones will be pruned once the size of receipts exceeds this number.
     */
    get asV0(): ReceiptsReceiptsStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Mapping from the receipt hash to the corresponding verified execution receipt.
 * 
 *  The capacity of receipts stored in the state is [`Config::ReceiptsPruningDepth`], the older
 *  ones will be pruned once the size of receipts exceeds this number.
 */
export interface ReceiptsReceiptsStorageV0 {
    get(key1: number, key2: Uint8Array): Promise<(v0.ExecutionReceipt | undefined)>
    getAll(): Promise<v0.ExecutionReceipt[]>
    getMany(keys: [number, Uint8Array][]): Promise<(v0.ExecutionReceipt | undefined)[]>
    getKeys(): Promise<[number, Uint8Array][]>
    getKeys(key1: number): Promise<[number, Uint8Array][]>
    getKeys(key1: number, key2: Uint8Array): Promise<[number, Uint8Array][]>
    getKeysPaged(pageSize: number): AsyncIterable<[number, Uint8Array][]>
    getKeysPaged(pageSize: number, key1: number): AsyncIterable<[number, Uint8Array][]>
    getKeysPaged(pageSize: number, key1: number, key2: Uint8Array): AsyncIterable<[number, Uint8Array][]>
    getPairs(): Promise<[k: [number, Uint8Array], v: v0.ExecutionReceipt][]>
    getPairs(key1: number): Promise<[k: [number, Uint8Array], v: v0.ExecutionReceipt][]>
    getPairs(key1: number, key2: Uint8Array): Promise<[k: [number, Uint8Array], v: v0.ExecutionReceipt][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [number, Uint8Array], v: v0.ExecutionReceipt][]>
    getPairsPaged(pageSize: number, key1: number): AsyncIterable<[k: [number, Uint8Array], v: v0.ExecutionReceipt][]>
    getPairsPaged(pageSize: number, key1: number, key2: Uint8Array): AsyncIterable<[k: [number, Uint8Array], v: v0.ExecutionReceipt][]>
}

export class ReceiptsStateRootsStorage extends StorageBase {
    protected getPrefix() {
        return 'Receipts'
    }

    protected getName() {
        return 'StateRoots'
    }

    /**
     *  Mapping for tracking the domain state roots.
     * 
     *  (domain_id, domain_block_number, domain_block_hash) -> domain_state_root
     */
    get isV0(): boolean {
        return this.getTypeHash() === 'af09af2e541e67c95622fd28dbdbad7b90d885c7e03a2cbf4412f369450db480'
    }

    /**
     *  Mapping for tracking the domain state roots.
     * 
     *  (domain_id, domain_block_number, domain_block_hash) -> domain_state_root
     */
    get asV0(): ReceiptsStateRootsStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Mapping for tracking the domain state roots.
 * 
 *  (domain_id, domain_block_number, domain_block_hash) -> domain_state_root
 */
export interface ReceiptsStateRootsStorageV0 {
    get(key1: number, key2: number, key3: Uint8Array): Promise<(Uint8Array | undefined)>
    getAll(): Promise<Uint8Array[]>
    getMany(keys: [number, number, Uint8Array][]): Promise<(Uint8Array | undefined)[]>
    getKeys(): Promise<[number, number, Uint8Array][]>
    getKeys(key1: number): Promise<[number, number, Uint8Array][]>
    getKeys(key1: number, key2: number): Promise<[number, number, Uint8Array][]>
    getKeys(key1: number, key2: number, key3: Uint8Array): Promise<[number, number, Uint8Array][]>
    getKeysPaged(pageSize: number): AsyncIterable<[number, number, Uint8Array][]>
    getKeysPaged(pageSize: number, key1: number): AsyncIterable<[number, number, Uint8Array][]>
    getKeysPaged(pageSize: number, key1: number, key2: number): AsyncIterable<[number, number, Uint8Array][]>
    getKeysPaged(pageSize: number, key1: number, key2: number, key3: Uint8Array): AsyncIterable<[number, number, Uint8Array][]>
    getPairs(): Promise<[k: [number, number, Uint8Array], v: Uint8Array][]>
    getPairs(key1: number): Promise<[k: [number, number, Uint8Array], v: Uint8Array][]>
    getPairs(key1: number, key2: number): Promise<[k: [number, number, Uint8Array], v: Uint8Array][]>
    getPairs(key1: number, key2: number, key3: Uint8Array): Promise<[k: [number, number, Uint8Array], v: Uint8Array][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [number, number, Uint8Array], v: Uint8Array][]>
    getPairsPaged(pageSize: number, key1: number): AsyncIterable<[k: [number, number, Uint8Array], v: Uint8Array][]>
    getPairsPaged(pageSize: number, key1: number, key2: number): AsyncIterable<[k: [number, number, Uint8Array], v: Uint8Array][]>
    getPairsPaged(pageSize: number, key1: number, key2: number, key3: Uint8Array): AsyncIterable<[k: [number, number, Uint8Array], v: Uint8Array][]>
}

export class RuntimeConfigsEnableExecutorStorage extends StorageBase {
    protected getPrefix() {
        return 'RuntimeConfigs'
    }

    protected getName() {
        return 'EnableExecutor'
    }

    /**
     *  Whether to disable the executor calls.
     */
    get isV0(): boolean {
        return this.getTypeHash() === '1b6fbf1674d189f761a7ac63093bf5c755bf073dd9d9f0dbe657289f92575db5'
    }

    /**
     *  Whether to disable the executor calls.
     */
    get asV0(): RuntimeConfigsEnableExecutorStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Whether to disable the executor calls.
 */
export interface RuntimeConfigsEnableExecutorStorageV0 {
    get(): Promise<boolean>
}

export class RuntimeConfigsEnableTransferStorage extends StorageBase {
    protected getPrefix() {
        return 'RuntimeConfigs'
    }

    protected getName() {
        return 'EnableTransfer'
    }

    /**
     *  Whether to disable the normal balances transfer calls.
     */
    get isV0(): boolean {
        return this.getTypeHash() === '1b6fbf1674d189f761a7ac63093bf5c755bf073dd9d9f0dbe657289f92575db5'
    }

    /**
     *  Whether to disable the normal balances transfer calls.
     */
    get asV0(): RuntimeConfigsEnableTransferStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Whether to disable the normal balances transfer calls.
 */
export interface RuntimeConfigsEnableTransferStorageV0 {
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
    get isV0(): boolean {
        return this.getTypeHash() === '1b6fbf1674d189f761a7ac63093bf5c755bf073dd9d9f0dbe657289f92575db5'
    }

    /**
     *  Allow block authoring by anyone or just root.
     */
    get asV0(): SubspaceAllowAuthoringByAnyoneStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Allow block authoring by anyone or just root.
 */
export interface SubspaceAllowAuthoringByAnyoneStorageV0 {
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
    get isV0(): boolean {
        return this.getTypeHash() === '29735300dba5135be0e1e53d771089aba86ed92479018d68d31c9d66cb9816e3'
    }

    /**
     *  A set of blocked farmers keyed by their public key.
     */
    get asV0(): SubspaceBlockListStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  A set of blocked farmers keyed by their public key.
 */
export interface SubspaceBlockListStorageV0 {
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
    get isV0(): boolean {
        return this.getTypeHash() === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
    }

    /**
     * Counter for the related counted storage map
     */
    get asV0(): SubspaceCounterForRecordsRootStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 * Counter for the related counted storage map
 */
export interface SubspaceCounterForRecordsRootStorageV0 {
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
    get isV0(): boolean {
        return this.getTypeHash() === '6d79390637ae1a4b2c7f94365fac773058faad0c5c3975e0c9f890274124be78'
    }

    /**
     *  Temporary value (cleared at block finalization) with block author information.
     */
    get asV0(): SubspaceCurrentBlockAuthorInfoStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Temporary value (cleared at block finalization) with block author information.
 */
export interface SubspaceCurrentBlockAuthorInfoStorageV0 {
    get(): Promise<([Uint8Array, bigint, number, bigint, Uint8Array] | undefined)>
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
    get isV0(): boolean {
        return this.getTypeHash() === '47def9f6d7e6014a6300f058be0c10695977357e2d30d053338f97ef5e29b57c'
    }

    /**
     *  Temporary value (cleared at block finalization) with voters in the current block thus far.
     */
    get asV0(): SubspaceCurrentBlockVotersStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Temporary value (cleared at block finalization) with voters in the current block thus far.
 */
export interface SubspaceCurrentBlockVotersStorageV0 {
    get(): Promise<([[Uint8Array, bigint, number, bigint], [Uint8Array, Uint8Array]][] | undefined)>
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
    get isV0(): boolean {
        return this.getTypeHash() === '95ff4f914f08e149ddbe1ae2dcb1743bbf9aaae69d04c486e1a398cacfcca06a'
    }

    /**
     *  Current slot number.
     */
    get asV0(): SubspaceCurrentSlotStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Current slot number.
 */
export interface SubspaceCurrentSlotStorageV0 {
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
    get isV0(): boolean {
        return this.getTypeHash() === 'a926ad48d1a07d1162c5fdb99f3f6cef39c7c5a115a92ff9ccf0357bae4bf2ed'
    }

    /**
     *  Enable rewards since specified block number.
     */
    get asV0(): SubspaceEnableRewardsStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Enable rewards since specified block number.
 */
export interface SubspaceEnableRewardsStorageV0 {
    get(): Promise<(number | undefined)>
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
    get isV0(): boolean {
        return this.getTypeHash() === 'd3f0e4c96dad8d73df3c44f02993a46a9ed2eed15208047c7d80882af09d67cc'
    }

    /**
     *  Slot at which current era started.
     */
    get asV0(): SubspaceEraStartSlotStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Slot at which current era started.
 */
export interface SubspaceEraStartSlotStorageV0 {
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
    get isV0(): boolean {
        return this.getTypeHash() === '95ff4f914f08e149ddbe1ae2dcb1743bbf9aaae69d04c486e1a398cacfcca06a'
    }

    /**
     *  The slot at which the first block was created. This is 0 until the first block of the chain.
     */
    get asV0(): SubspaceGenesisSlotStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  The slot at which the first block was created. This is 0 until the first block of the chain.
 */
export interface SubspaceGenesisSlotStorageV0 {
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
    get isV0(): boolean {
        return this.getTypeHash() === 'bd660e3e2e452a3c4ad8981d49862a3c5b75d79eb110a767554b3a53713dbcb0'
    }

    /**
     *  Global randomnesses derived from from PoR signature and used for deriving global challenges.
     */
    get asV0(): SubspaceGlobalRandomnessesStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Global randomnesses derived from from PoR signature and used for deriving global challenges.
 */
export interface SubspaceGlobalRandomnessesStorageV0 {
    get(): Promise<v0.GlobalRandomnesses>
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
    get isV0(): boolean {
        return this.getTypeHash() === '1b6fbf1674d189f761a7ac63093bf5c755bf073dd9d9f0dbe657289f92575db5'
    }

    /**
     *  Enable storage access for all users.
     */
    get asV0(): SubspaceIsStorageAccessEnabledStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Enable storage access for all users.
 */
export interface SubspaceIsStorageAccessEnabledStorageV0 {
    get(): Promise<boolean>
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
    get isV0(): boolean {
        return this.getTypeHash() === 'f85e5ab5a15931a03e24612ba0bf8cf561a07fe4000dd0746217e69abf3310c7'
    }

    /**
     *  Override solution range during next update
     */
    get asV0(): SubspaceNextSolutionRangeOverrideStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Override solution range during next update
 */
export interface SubspaceNextSolutionRangeOverrideStorageV0 {
    get(): Promise<(v0.SolutionRangeOverride | undefined)>
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
    get isV0(): boolean {
        return this.getTypeHash() === 'ba9fc0896f843bdd462fb296fc28c5b777440427dcb2d8ddc4df69e77a826901'
    }

    /**
     *  Parent block author information.
     */
    get asV0(): SubspaceParentBlockAuthorInfoStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Parent block author information.
 */
export interface SubspaceParentBlockAuthorInfoStorageV0 {
    get(): Promise<([Uint8Array, bigint, number, bigint] | undefined)>
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
    get isV0(): boolean {
        return this.getTypeHash() === '40d56fe1f1fa7e5a7a12eca51129efa2535e4ea87c718b94396215bf1e0da8c1'
    }

    /**
     *  Voters in the parent block (set at the end of the block with current values).
     */
    get asV0(): SubspaceParentBlockVotersStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Voters in the parent block (set at the end of the block with current values).
 */
export interface SubspaceParentBlockVotersStorageV0 {
    get(): Promise<[[Uint8Array, bigint, number, bigint], [Uint8Array, Uint8Array]][]>
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
    get isV0(): boolean {
        return this.getTypeHash() === 'b1fc0f6ee5ccfec315073764334acd7109ca3139cb0d98b39905c6cd4c8d26f0'
    }

    /**
     *  Storage of previous vote verification data, updated on each block during finalization.
     */
    get asV0(): SubspaceParentVoteVerificationDataStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Storage of previous vote verification data, updated on each block during finalization.
 */
export interface SubspaceParentVoteVerificationDataStorageV0 {
    get(): Promise<(v0.VoteVerificationData | undefined)>
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
    get isV0(): boolean {
        return this.getTypeHash() === '8620bdc4f360add1f8e58e488bdba4fa9b6dab86ecdd1c942b8d9de43ede38e5'
    }

    /**
     *  Temporary value (cleared at block finalization) which contains current block PoR randomness.
     */
    get asV0(): SubspacePorRandomnessStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Temporary value (cleared at block finalization) which contains current block PoR randomness.
 */
export interface SubspacePorRandomnessStorageV0 {
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
    get isV0(): boolean {
        return this.getTypeHash() === 'b8082d465f7b419a4c95d8aaf9f1a7e3d7bc108486b1a05c570a0a11c3ac0279'
    }

    /**
     *  Mapping from segment index to corresponding merkle tree root of segment records.
     */
    get asV0(): SubspaceRecordsRootStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Mapping from segment index to corresponding merkle tree root of segment records.
 */
export interface SubspaceRecordsRootStorageV0 {
    get(key: bigint): Promise<(v0.Commitment | undefined)>
    getAll(): Promise<v0.Commitment[]>
    getMany(keys: bigint[]): Promise<(v0.Commitment | undefined)[]>
    getKeys(): Promise<bigint[]>
    getKeys(key: bigint): Promise<bigint[]>
    getKeysPaged(pageSize: number): AsyncIterable<bigint[]>
    getKeysPaged(pageSize: number, key: bigint): AsyncIterable<bigint[]>
    getPairs(): Promise<[k: bigint, v: v0.Commitment][]>
    getPairs(key: bigint): Promise<[k: bigint, v: v0.Commitment][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: bigint, v: v0.Commitment][]>
    getPairsPaged(pageSize: number, key: bigint): AsyncIterable<[k: bigint, v: v0.Commitment][]>
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
    get isV0(): boolean {
        return this.getTypeHash() === '8620bdc4f360add1f8e58e488bdba4fa9b6dab86ecdd1c942b8d9de43ede38e5'
    }

    /**
     *  Root plot public key.
     * 
     *  Set just once to make sure no one else can author blocks until allowed for anyone.
     */
    get asV0(): SubspaceRootPlotPublicKeyStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Root plot public key.
 * 
 *  Set just once to make sure no one else can author blocks until allowed for anyone.
 */
export interface SubspaceRootPlotPublicKeyStorageV0 {
    get(): Promise<(Uint8Array | undefined)>
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
    get isV0(): boolean {
        return this.getTypeHash() === '1b6fbf1674d189f761a7ac63093bf5c755bf073dd9d9f0dbe657289f92575db5'
    }

    /**
     *  Storage to check if the solution range is to be adjusted for next era
     */
    get asV0(): SubspaceShouldAdjustSolutionRangeStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Storage to check if the solution range is to be adjusted for next era
 */
export interface SubspaceShouldAdjustSolutionRangeStorageV0 {
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
    get isV0(): boolean {
        return this.getTypeHash() === 'cae747bc9f17b3b0f1380a81f908e1762006357df74c193ce4e62a53bc8a5442'
    }

    /**
     *  Solution ranges used for challenges.
     */
    get asV0(): SubspaceSolutionRangesStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Solution ranges used for challenges.
 */
export interface SubspaceSolutionRangesStorageV0 {
    get(): Promise<v0.SolutionRanges>
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
    get isV0(): boolean {
        return this.getTypeHash() === '8620bdc4f360add1f8e58e488bdba4fa9b6dab86ecdd1c942b8d9de43ede38e5'
    }

    /**
     *  The `AccountId` of the sudo key.
     */
    get asV0(): SudoKeyStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  The `AccountId` of the sudo key.
 */
export interface SudoKeyStorageV0 {
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
    get isV0(): boolean {
        return this.getTypeHash() === '1ddc7ade926221442c388ee4405a71c9428e548fab037445aaf4b3a78f4735c1'
    }

    /**
     *  The full account information for a particular account ID.
     */
    get asV0(): SystemAccountStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  The full account information for a particular account ID.
 */
export interface SystemAccountStorageV0 {
    get(key: Uint8Array): Promise<v0.AccountInfo>
    getAll(): Promise<v0.AccountInfo[]>
    getMany(keys: Uint8Array[]): Promise<v0.AccountInfo[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: v0.AccountInfo][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: v0.AccountInfo][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: v0.AccountInfo][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: v0.AccountInfo][]>
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
    get isV0(): boolean {
        return this.getTypeHash() === 'a926ad48d1a07d1162c5fdb99f3f6cef39c7c5a115a92ff9ccf0357bae4bf2ed'
    }

    /**
     *  Total length (in bytes) for all extrinsics put together, for the current block.
     */
    get asV0(): SystemAllExtrinsicsLenStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Total length (in bytes) for all extrinsics put together, for the current block.
 */
export interface SystemAllExtrinsicsLenStorageV0 {
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
    get isV0(): boolean {
        return this.getTypeHash() === '06f5703796027f4b198d4ffd50b721273430d8ff663660646793873168f9df17'
    }

    /**
     *  Map of block numbers to block hashes.
     */
    get asV0(): SystemBlockHashStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Map of block numbers to block hashes.
 */
export interface SystemBlockHashStorageV0 {
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
    get isV0(): boolean {
        return this.getTypeHash() === '1b5ecb31f1f780ce8b20535384ce7b3159da495c9f1cbf13a2f253ccb02ae175'
    }

    /**
     *  The current weight for the block.
     */
    get asV0(): SystemBlockWeightStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  The current weight for the block.
 */
export interface SystemBlockWeightStorageV0 {
    get(): Promise<v0.PerDispatchClass>
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
    get isV0(): boolean {
        return this.getTypeHash() === '6edb48fd53810bda6cc1015d69e4aacd63966970836398edb4a47cec0bf3fa85'
    }

    /**
     *  Digest of the current block, also part of the block header.
     */
    get asV0(): SystemDigestStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Digest of the current block, also part of the block header.
 */
export interface SystemDigestStorageV0 {
    get(): Promise<v0.Digest>
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
    get isV0(): boolean {
        return this.getTypeHash() === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
    }

    /**
     *  The number of events in the `Events<T>` list.
     */
    get asV0(): SystemEventCountStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  The number of events in the `Events<T>` list.
 */
export interface SystemEventCountStorageV0 {
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
    get isV0(): boolean {
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
    get asV0(): SystemEventTopicsStorageV0 {
        assert(this.isV0)
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
export interface SystemEventTopicsStorageV0 {
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
    get isV0(): boolean {
        return this.getTypeHash() === '60d9ed0c1c87f52a9787ca0d47d53739a243763cdc024883af61c11ebd27af1c'
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
    get asV0(): SystemEventsStorageV0 {
        assert(this.isV0)
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
export interface SystemEventsStorageV0 {
    get(): Promise<v0.EventRecord[]>
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
    get isV0(): boolean {
        return this.getTypeHash() === '0ad1e323fa21971add5b3b0cc709a6e02dc7c64db7d344c1a67ec0227969ae75'
    }

    /**
     *  The execution phase of the block.
     */
    get asV0(): SystemExecutionPhaseStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  The execution phase of the block.
 */
export interface SystemExecutionPhaseStorageV0 {
    get(): Promise<(v0.Phase | undefined)>
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
    get isV0(): boolean {
        return this.getTypeHash() === 'a926ad48d1a07d1162c5fdb99f3f6cef39c7c5a115a92ff9ccf0357bae4bf2ed'
    }

    /**
     *  Total extrinsics count for the current block.
     */
    get asV0(): SystemExtrinsicCountStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Total extrinsics count for the current block.
 */
export interface SystemExtrinsicCountStorageV0 {
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
    get isV0(): boolean {
        return this.getTypeHash() === 'f278d7d239e9ac4cbb0509cc885124fd45c3f5b75452aba0391701e1a886debb'
    }

    /**
     *  Extrinsics data for the current block (maps an extrinsic's index to its data).
     */
    get asV0(): SystemExtrinsicDataStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Extrinsics data for the current block (maps an extrinsic's index to its data).
 */
export interface SystemExtrinsicDataStorageV0 {
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
    get isV0(): boolean {
        return this.getTypeHash() === 'e03e445e7a7694163bede3a772a8a347abf7a3a00424fbafec75f819d6173a17'
    }

    /**
     *  Stores the `spec_version` and `spec_name` of when the last runtime upgrade happened.
     */
    get asV0(): SystemLastRuntimeUpgradeStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Stores the `spec_version` and `spec_name` of when the last runtime upgrade happened.
 */
export interface SystemLastRuntimeUpgradeStorageV0 {
    get(): Promise<(v0.LastRuntimeUpgradeInfo | undefined)>
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
    get isV0(): boolean {
        return this.getTypeHash() === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
    }

    /**
     *  The current block number being processed. Set by `execute_block`.
     */
    get asV0(): SystemNumberStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  The current block number being processed. Set by `execute_block`.
 */
export interface SystemNumberStorageV0 {
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
    get isV0(): boolean {
        return this.getTypeHash() === '146c0d1dce070e2a43f497c479248a882f4ed48937203ea336e85dcf2fa0ec6c'
    }

    /**
     *  Hash of the previous block.
     */
    get asV0(): SystemParentHashStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Hash of the previous block.
 */
export interface SystemParentHashStorageV0 {
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
    get isV0(): boolean {
        return this.getTypeHash() === '1b6fbf1674d189f761a7ac63093bf5c755bf073dd9d9f0dbe657289f92575db5'
    }

    /**
     *  True if we have upgraded so that AccountInfo contains three types of `RefCount`. False
     *  (default) if not.
     */
    get asV0(): SystemUpgradedToTripleRefCountStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  True if we have upgraded so that AccountInfo contains three types of `RefCount`. False
 *  (default) if not.
 */
export interface SystemUpgradedToTripleRefCountStorageV0 {
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
    get isV0(): boolean {
        return this.getTypeHash() === '1b6fbf1674d189f761a7ac63093bf5c755bf073dd9d9f0dbe657289f92575db5'
    }

    /**
     *  True if we have upgraded so that `type RefCount` is `u32`. False (default) if not.
     */
    get asV0(): SystemUpgradedToU32RefCountStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  True if we have upgraded so that `type RefCount` is `u32`. False (default) if not.
 */
export interface SystemUpgradedToU32RefCountStorageV0 {
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
    get isV0(): boolean {
        return this.getTypeHash() === '1b6fbf1674d189f761a7ac63093bf5c755bf073dd9d9f0dbe657289f92575db5'
    }

    /**
     *  Did the timestamp get updated in this block?
     */
    get asV0(): TimestampDidUpdateStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Did the timestamp get updated in this block?
 */
export interface TimestampDidUpdateStorageV0 {
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
    get isV0(): boolean {
        return this.getTypeHash() === '95ff4f914f08e149ddbe1ae2dcb1743bbf9aaae69d04c486e1a398cacfcca06a'
    }

    /**
     *  Current time for the current block.
     */
    get asV0(): TimestampNowStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Current time for the current block.
 */
export interface TimestampNowStorageV0 {
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
    get isV0(): boolean {
        return this.getTypeHash() === '8620bdc4f360add1f8e58e488bdba4fa9b6dab86ecdd1c942b8d9de43ede38e5'
    }

    /**
     *  Temporary value (cleared at block finalization) which contains current block author, so we
     *  can issue rewards during block finalization.
     */
    get asV0(): TransactionFeesBlockAuthorStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Temporary value (cleared at block finalization) which contains current block author, so we
 *  can issue rewards during block finalization.
 */
export interface TransactionFeesBlockAuthorStorageV0 {
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
    get isV0(): boolean {
        return this.getTypeHash() === '28bed10d043b0c0b43024ee27d2e27a94df5258f8505d99a50db02806087f15a'
    }

    /**
     *  Temporary value (cleared at block finalization) which contains current block fees, so we can
     *  issue rewards during block finalization.
     */
    get asV0(): TransactionFeesCollectedBlockFeesStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Temporary value (cleared at block finalization) which contains current block fees, so we can
 *  issue rewards during block finalization.
 */
export interface TransactionFeesCollectedBlockFeesStorageV0 {
    get(): Promise<(v0.CollectedFees | undefined)>
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
    get isV0(): boolean {
        return this.getTypeHash() === 'f8ebe28eb30158172c0ccf672f7747c46a244f892d08ef2ebcbaadde34a26bc0'
    }

    /**
     *  Escrow of storage fees, a portion of it is released to the block author on every block
     *  and portion of storage fees goes back into this pot.
     */
    get asV0(): TransactionFeesCollectedStorageFeesEscrowStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Escrow of storage fees, a portion of it is released to the block author on every block
 *  and portion of storage fees goes back into this pot.
 */
export interface TransactionFeesCollectedStorageFeesEscrowStorageV0 {
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
    get isV0(): boolean {
        return this.getTypeHash() === '8339208fdff8cc2cbfb9fe1daa9bd886d23b8951771ccf6b00d8cb68da55bcc5'
    }

    /**
     *  Temporary value (cleared at block finalization) which contains cached value of
     *  `TransactionByteFee` for current block.
     */
    get asV0(): TransactionFeesTransactionByteFeeStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Temporary value (cleared at block finalization) which contains cached value of
 *  `TransactionByteFee` for current block.
 */
export interface TransactionFeesTransactionByteFeeStorageV0 {
    get(): Promise<(bigint | undefined)>
}

export class TransactionPaymentNextFeeMultiplierStorage extends StorageBase {
    protected getPrefix() {
        return 'TransactionPayment'
    }

    protected getName() {
        return 'NextFeeMultiplier'
    }

    get isV0(): boolean {
        return this.getTypeHash() === 'f8ebe28eb30158172c0ccf672f7747c46a244f892d08ef2ebcbaadde34a26bc0'
    }

    get asV0(): TransactionPaymentNextFeeMultiplierStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

export interface TransactionPaymentNextFeeMultiplierStorageV0 {
    get(): Promise<bigint>
}

export class TransactionPaymentStorageVersionStorage extends StorageBase {
    protected getPrefix() {
        return 'TransactionPayment'
    }

    protected getName() {
        return 'StorageVersion'
    }

    get isV0(): boolean {
        return this.getTypeHash() === '7a0b9b43fb3e876cfa92bb4b00e569ef9a82972b0600c8a8570e064c7e3890fd'
    }

    get asV0(): TransactionPaymentStorageVersionStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

export interface TransactionPaymentStorageVersionStorageV0 {
    get(): Promise<v0.Releases>
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
     *  VestingSchedules: map AccountId => Vec\<VestingSchedule>
     */
    get isV0(): boolean {
        return this.getTypeHash() === 'd1025301ffa60f04c50bb1007ecb356d52103dd9c366150de1ba80c6e043ac2f'
    }

    /**
     *  Vesting schedules of an account.
     * 
     *  VestingSchedules: map AccountId => Vec\<VestingSchedule>
     */
    get asV0(): VestingVestingSchedulesStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Vesting schedules of an account.
 * 
 *  VestingSchedules: map AccountId => Vec\<VestingSchedule>
 */
export interface VestingVestingSchedulesStorageV0 {
    get(key: Uint8Array): Promise<v0.VestingSchedule[]>
    getAll(): Promise<v0.VestingSchedule[][]>
    getMany(keys: Uint8Array[]): Promise<v0.VestingSchedule[][]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: v0.VestingSchedule[]][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: v0.VestingSchedule[]][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: v0.VestingSchedule[]][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: v0.VestingSchedule[]][]>
}
