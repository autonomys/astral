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
        return this.getTypeHash() === '12d9e780c790f66e9c340b94cabd98da447e1087819d4acb4b1fe22bbb2783fb'
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

export class BalancesFreezesStorage extends StorageBase {
    protected getPrefix() {
        return 'Balances'
    }

    protected getName() {
        return 'Freezes'
    }

    /**
     *  Freeze locks on account balances.
     */
    get isV0(): boolean {
        return this.getTypeHash() === '687d129c824d7b23d1f21a471b19c3fed952e35b64e5de19f549851d1c3f7f91'
    }

    /**
     *  Freeze locks on account balances.
     */
    get asV0(): BalancesFreezesStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Freeze locks on account balances.
 */
export interface BalancesFreezesStorageV0 {
    get(key: Uint8Array): Promise<v0.Type_152[]>
    getAll(): Promise<v0.Type_152[][]>
    getMany(keys: Uint8Array[]): Promise<v0.Type_152[][]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: v0.Type_152[]][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: v0.Type_152[]][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: v0.Type_152[]][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: v0.Type_152[]][]>
}

export class BalancesHoldsStorage extends StorageBase {
    protected getPrefix() {
        return 'Balances'
    }

    protected getName() {
        return 'Holds'
    }

    /**
     *  Holds on account balances.
     */
    get isV0(): boolean {
        return this.getTypeHash() === '1bc801e6ddc82d439b0657cde8f7924a63cbbcaa0cde65d580db514afb65da1c'
    }

    /**
     *  Holds on account balances.
     */
    get asV0(): BalancesHoldsStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Holds on account balances.
 */
export interface BalancesHoldsStorageV0 {
    get(key: Uint8Array): Promise<v0.IdAmount[]>
    getAll(): Promise<v0.IdAmount[][]>
    getMany(keys: Uint8Array[]): Promise<v0.IdAmount[][]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: v0.IdAmount[]][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: v0.IdAmount[]][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: v0.IdAmount[]][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: v0.IdAmount[]][]>
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

export class DomainsBlockTreeStorage extends StorageBase {
    protected getPrefix() {
        return 'Domains'
    }

    protected getName() {
        return 'BlockTree'
    }

    /**
     *  The domain block tree, map (`domain_id`, `domain_block_number`) to the hash of ER,
     *  which can be used get the block tree node in `BlockTreeNodes`
     */
    get isV0(): boolean {
        return this.getTypeHash() === 'b3c15232fb4346b458fc3153a06d89787a103676fa34fe3d795ee04fe62bf4d8'
    }

    /**
     *  The domain block tree, map (`domain_id`, `domain_block_number`) to the hash of ER,
     *  which can be used get the block tree node in `BlockTreeNodes`
     */
    get asV0(): DomainsBlockTreeStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  The domain block tree, map (`domain_id`, `domain_block_number`) to the hash of ER,
 *  which can be used get the block tree node in `BlockTreeNodes`
 */
export interface DomainsBlockTreeStorageV0 {
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

export class DomainsBlockTreeNodesStorage extends StorageBase {
    protected getPrefix() {
        return 'Domains'
    }

    protected getName() {
        return 'BlockTreeNodes'
    }

    /**
     *  Mapping of block tree node hash to the node, each node represent a domain block
     */
    get isV0(): boolean {
        return this.getTypeHash() === 'e157a1ead7ef8d5c87dc1a099904452b1b1ae8a5dea2fe91b4cd1d6c0818209b'
    }

    /**
     *  Mapping of block tree node hash to the node, each node represent a domain block
     */
    get asV0(): DomainsBlockTreeNodesStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Mapping of block tree node hash to the node, each node represent a domain block
 */
export interface DomainsBlockTreeNodesStorageV0 {
    get(key: Uint8Array): Promise<(v0.BlockTreeNode | undefined)>
    getAll(): Promise<v0.BlockTreeNode[]>
    getMany(keys: Uint8Array[]): Promise<(v0.BlockTreeNode | undefined)[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: v0.BlockTreeNode][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: v0.BlockTreeNode][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: v0.BlockTreeNode][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: v0.BlockTreeNode][]>
}

export class DomainsConsensusBlockHashStorage extends StorageBase {
    protected getPrefix() {
        return 'Domains'
    }

    protected getName() {
        return 'ConsensusBlockHash'
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
    get isV0(): boolean {
        return this.getTypeHash() === 'b3c15232fb4346b458fc3153a06d89787a103676fa34fe3d795ee04fe62bf4d8'
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
    get asV0(): DomainsConsensusBlockHashStorageV0 {
        assert(this.isV0)
        return this as any
    }
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
export interface DomainsConsensusBlockHashStorageV0 {
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

export class DomainsDepositsStorage extends StorageBase {
    protected getPrefix() {
        return 'Domains'
    }

    protected getName() {
        return 'Deposits'
    }

    /**
     *  List of all deposits for given Operator.
     */
    get isV0(): boolean {
        return this.getTypeHash() === 'ec088471e0a3a8023a6af6c11e8f0aeacbcb67f6fa0046b109e2d07a1437daa0'
    }

    /**
     *  List of all deposits for given Operator.
     */
    get asV0(): DomainsDepositsStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  List of all deposits for given Operator.
 */
export interface DomainsDepositsStorageV0 {
    get(key1: bigint, key2: Uint8Array): Promise<(v0.Deposit | undefined)>
    getAll(): Promise<v0.Deposit[]>
    getMany(keys: [bigint, Uint8Array][]): Promise<(v0.Deposit | undefined)[]>
    getKeys(): Promise<[bigint, Uint8Array][]>
    getKeys(key1: bigint): Promise<[bigint, Uint8Array][]>
    getKeys(key1: bigint, key2: Uint8Array): Promise<[bigint, Uint8Array][]>
    getKeysPaged(pageSize: number): AsyncIterable<[bigint, Uint8Array][]>
    getKeysPaged(pageSize: number, key1: bigint): AsyncIterable<[bigint, Uint8Array][]>
    getKeysPaged(pageSize: number, key1: bigint, key2: Uint8Array): AsyncIterable<[bigint, Uint8Array][]>
    getPairs(): Promise<[k: [bigint, Uint8Array], v: v0.Deposit][]>
    getPairs(key1: bigint): Promise<[k: [bigint, Uint8Array], v: v0.Deposit][]>
    getPairs(key1: bigint, key2: Uint8Array): Promise<[k: [bigint, Uint8Array], v: v0.Deposit][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [bigint, Uint8Array], v: v0.Deposit][]>
    getPairsPaged(pageSize: number, key1: bigint): AsyncIterable<[k: [bigint, Uint8Array], v: v0.Deposit][]>
    getPairsPaged(pageSize: number, key1: bigint, key2: Uint8Array): AsyncIterable<[k: [bigint, Uint8Array], v: v0.Deposit][]>
}

export class DomainsDomainRegistryStorage extends StorageBase {
    protected getPrefix() {
        return 'Domains'
    }

    protected getName() {
        return 'DomainRegistry'
    }

    /**
     *  The domain registry
     */
    get isV0(): boolean {
        return this.getTypeHash() === '8c3c5b48bf43c4b092fd6b58d659319887beebd58f4ff60872be134acf44c9f0'
    }

    /**
     *  The domain registry
     */
    get asV0(): DomainsDomainRegistryStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  The domain registry
 */
export interface DomainsDomainRegistryStorageV0 {
    get(key: number): Promise<(v0.DomainObject | undefined)>
    getAll(): Promise<v0.DomainObject[]>
    getMany(keys: number[]): Promise<(v0.DomainObject | undefined)[]>
    getKeys(): Promise<number[]>
    getKeys(key: number): Promise<number[]>
    getKeysPaged(pageSize: number): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, key: number): AsyncIterable<number[]>
    getPairs(): Promise<[k: number, v: v0.DomainObject][]>
    getPairs(key: number): Promise<[k: number, v: v0.DomainObject][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: number, v: v0.DomainObject][]>
    getPairsPaged(pageSize: number, key: number): AsyncIterable<[k: number, v: v0.DomainObject][]>
}

export class DomainsDomainStakingSummaryStorage extends StorageBase {
    protected getPrefix() {
        return 'Domains'
    }

    protected getName() {
        return 'DomainStakingSummary'
    }

    get isV0(): boolean {
        return this.getTypeHash() === 'e4962a38125d72bf8ec89ca7af661a9db43cf468454deb464cf1ed90d927f1ce'
    }

    get asV0(): DomainsDomainStakingSummaryStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

export interface DomainsDomainStakingSummaryStorageV0 {
    get(key: number): Promise<(v0.StakingSummary | undefined)>
    getAll(): Promise<v0.StakingSummary[]>
    getMany(keys: number[]): Promise<(v0.StakingSummary | undefined)[]>
    getKeys(): Promise<number[]>
    getKeys(key: number): Promise<number[]>
    getKeysPaged(pageSize: number): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, key: number): AsyncIterable<number[]>
    getPairs(): Promise<[k: number, v: v0.StakingSummary][]>
    getPairs(key: number): Promise<[k: number, v: v0.StakingSummary][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: number, v: v0.StakingSummary][]>
    getPairsPaged(pageSize: number, key: number): AsyncIterable<[k: number, v: v0.StakingSummary][]>
}

export class DomainsDomainTxRangeStateStorage extends StorageBase {
    protected getPrefix() {
        return 'Domains'
    }

    protected getName() {
        return 'DomainTxRangeState'
    }

    get isV0(): boolean {
        return this.getTypeHash() === 'b33cdcbf1fbd2a196f953b48092bb36b14bbe6dbd0c45cc4d40b7ce6e2597eac'
    }

    get asV0(): DomainsDomainTxRangeStateStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

export interface DomainsDomainTxRangeStateStorageV0 {
    get(key: number): Promise<(v0.TxRangeState | undefined)>
    getAll(): Promise<v0.TxRangeState[]>
    getMany(keys: number[]): Promise<(v0.TxRangeState | undefined)[]>
    getKeys(): Promise<number[]>
    getKeys(key: number): Promise<number[]>
    getKeysPaged(pageSize: number): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, key: number): AsyncIterable<number[]>
    getPairs(): Promise<[k: number, v: v0.TxRangeState][]>
    getPairs(key: number): Promise<[k: number, v: v0.TxRangeState][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: number, v: v0.TxRangeState][]>
    getPairsPaged(pageSize: number, key: number): AsyncIterable<[k: number, v: v0.TxRangeState][]>
}

export class DomainsExecutionInboxStorage extends StorageBase {
    protected getPrefix() {
        return 'Domains'
    }

    protected getName() {
        return 'ExecutionInbox'
    }

    /**
     *  A set of `BundleDigest` from all bundles that successfully submitted to the consensus block,
     *  these bundles will be used to construct the domain block and `ExecutionInbox` is used to:
     * 
     *  1. Ensure subsequent ERs of that domain block include all pre-validated extrinsic bundles
     *  2. Index the `InboxedBundleAuthor` and pruned its value when the corresponding `ExecutionInbox` is pruned
     */
    get isV0(): boolean {
        return this.getTypeHash() === 'e1e2e7abf454f1f0d62f4d39fcd2fa276b68b422339f8d57dbfff3d55cbe9812'
    }

    /**
     *  A set of `BundleDigest` from all bundles that successfully submitted to the consensus block,
     *  these bundles will be used to construct the domain block and `ExecutionInbox` is used to:
     * 
     *  1. Ensure subsequent ERs of that domain block include all pre-validated extrinsic bundles
     *  2. Index the `InboxedBundleAuthor` and pruned its value when the corresponding `ExecutionInbox` is pruned
     */
    get asV0(): DomainsExecutionInboxStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  A set of `BundleDigest` from all bundles that successfully submitted to the consensus block,
 *  these bundles will be used to construct the domain block and `ExecutionInbox` is used to:
 * 
 *  1. Ensure subsequent ERs of that domain block include all pre-validated extrinsic bundles
 *  2. Index the `InboxedBundleAuthor` and pruned its value when the corresponding `ExecutionInbox` is pruned
 */
export interface DomainsExecutionInboxStorageV0 {
    get(key1: number, key2: number, key3: number): Promise<v0.BundleDigest[]>
    getAll(): Promise<v0.BundleDigest[][]>
    getMany(keys: [number, number, number][]): Promise<v0.BundleDigest[][]>
    getKeys(): Promise<[number, number, number][]>
    getKeys(key1: number): Promise<[number, number, number][]>
    getKeys(key1: number, key2: number): Promise<[number, number, number][]>
    getKeys(key1: number, key2: number, key3: number): Promise<[number, number, number][]>
    getKeysPaged(pageSize: number): AsyncIterable<[number, number, number][]>
    getKeysPaged(pageSize: number, key1: number): AsyncIterable<[number, number, number][]>
    getKeysPaged(pageSize: number, key1: number, key2: number): AsyncIterable<[number, number, number][]>
    getKeysPaged(pageSize: number, key1: number, key2: number, key3: number): AsyncIterable<[number, number, number][]>
    getPairs(): Promise<[k: [number, number, number], v: v0.BundleDigest[]][]>
    getPairs(key1: number): Promise<[k: [number, number, number], v: v0.BundleDigest[]][]>
    getPairs(key1: number, key2: number): Promise<[k: [number, number, number], v: v0.BundleDigest[]][]>
    getPairs(key1: number, key2: number, key3: number): Promise<[k: [number, number, number], v: v0.BundleDigest[]][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [number, number, number], v: v0.BundleDigest[]][]>
    getPairsPaged(pageSize: number, key1: number): AsyncIterable<[k: [number, number, number], v: v0.BundleDigest[]][]>
    getPairsPaged(pageSize: number, key1: number, key2: number): AsyncIterable<[k: [number, number, number], v: v0.BundleDigest[]][]>
    getPairsPaged(pageSize: number, key1: number, key2: number, key3: number): AsyncIterable<[k: [number, number, number], v: v0.BundleDigest[]][]>
}

export class DomainsHeadDomainNumberStorage extends StorageBase {
    protected getPrefix() {
        return 'Domains'
    }

    protected getName() {
        return 'HeadDomainNumber'
    }

    /**
     *  The block number of the best domain block, increase by one when the first bundle of the domain is
     *  successfully submitted to current consensus block, which mean a new domain block with this block
     *  number will be produce. Used as a pointer in `ExecutionInbox` to identify the current under building
     *  domain block, also used as a mapping of consensus block number to domain block number.
     */
    get isV0(): boolean {
        return this.getTypeHash() === 'be37cd27c0e60862618e14817365ea9f5c3c45854fea63a6259de44af2521364'
    }

    /**
     *  The block number of the best domain block, increase by one when the first bundle of the domain is
     *  successfully submitted to current consensus block, which mean a new domain block with this block
     *  number will be produce. Used as a pointer in `ExecutionInbox` to identify the current under building
     *  domain block, also used as a mapping of consensus block number to domain block number.
     */
    get asV0(): DomainsHeadDomainNumberStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  The block number of the best domain block, increase by one when the first bundle of the domain is
 *  successfully submitted to current consensus block, which mean a new domain block with this block
 *  number will be produce. Used as a pointer in `ExecutionInbox` to identify the current under building
 *  domain block, also used as a mapping of consensus block number to domain block number.
 */
export interface DomainsHeadDomainNumberStorageV0 {
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

export class DomainsHeadReceiptExtendedStorage extends StorageBase {
    protected getPrefix() {
        return 'Domains'
    }

    protected getName() {
        return 'HeadReceiptExtended'
    }

    /**
     *  Whether the head receipt have extended in the current consensus block
     * 
     *  Temporary storage only exist during block execution
     */
    get isV0(): boolean {
        return this.getTypeHash() === 'b527cfaace50a542585bae15a66f695c20e62fa45eabfd79ce93d7c504830239'
    }

    /**
     *  Whether the head receipt have extended in the current consensus block
     * 
     *  Temporary storage only exist during block execution
     */
    get asV0(): DomainsHeadReceiptExtendedStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Whether the head receipt have extended in the current consensus block
 * 
 *  Temporary storage only exist during block execution
 */
export interface DomainsHeadReceiptExtendedStorageV0 {
    get(key: number): Promise<boolean>
    getAll(): Promise<boolean[]>
    getMany(keys: number[]): Promise<boolean[]>
    getKeys(): Promise<number[]>
    getKeys(key: number): Promise<number[]>
    getKeysPaged(pageSize: number): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, key: number): AsyncIterable<number[]>
    getPairs(): Promise<[k: number, v: boolean][]>
    getPairs(key: number): Promise<[k: number, v: boolean][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: number, v: boolean][]>
    getPairsPaged(pageSize: number, key: number): AsyncIterable<[k: number, v: boolean][]>
}

export class DomainsHeadReceiptNumberStorage extends StorageBase {
    protected getPrefix() {
        return 'Domains'
    }

    protected getName() {
        return 'HeadReceiptNumber'
    }

    /**
     *  The head receipt number of each domain
     */
    get isV0(): boolean {
        return this.getTypeHash() === 'be37cd27c0e60862618e14817365ea9f5c3c45854fea63a6259de44af2521364'
    }

    /**
     *  The head receipt number of each domain
     */
    get asV0(): DomainsHeadReceiptNumberStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  The head receipt number of each domain
 */
export interface DomainsHeadReceiptNumberStorageV0 {
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

export class DomainsInboxedBundleAuthorStorage extends StorageBase {
    protected getPrefix() {
        return 'Domains'
    }

    protected getName() {
        return 'InboxedBundleAuthor'
    }

    /**
     *  A mapping of `bundle_header_hash` -> `bundle_author` for all the successfully submitted bundles of
     *  the last `BlockTreePruningDepth` domain blocks. Used to verify the invalid bundle fraud proof and
     *  slash malicious operator who have submitted invalid bundle.
     */
    get isV0(): boolean {
        return this.getTypeHash() === 'fc96d6750297129d4ff884dffc4742fe833e9be687fa34e80679655014942975'
    }

    /**
     *  A mapping of `bundle_header_hash` -> `bundle_author` for all the successfully submitted bundles of
     *  the last `BlockTreePruningDepth` domain blocks. Used to verify the invalid bundle fraud proof and
     *  slash malicious operator who have submitted invalid bundle.
     */
    get asV0(): DomainsInboxedBundleAuthorStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  A mapping of `bundle_header_hash` -> `bundle_author` for all the successfully submitted bundles of
 *  the last `BlockTreePruningDepth` domain blocks. Used to verify the invalid bundle fraud proof and
 *  slash malicious operator who have submitted invalid bundle.
 */
export interface DomainsInboxedBundleAuthorStorageV0 {
    get(key: Uint8Array): Promise<(bigint | undefined)>
    getAll(): Promise<bigint[]>
    getMany(keys: Uint8Array[]): Promise<(bigint | undefined)[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: bigint][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: bigint][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: bigint][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: bigint][]>
}

export class DomainsLastEpochStakingDistributionStorage extends StorageBase {
    protected getPrefix() {
        return 'Domains'
    }

    protected getName() {
        return 'LastEpochStakingDistribution'
    }

    /**
     *  A temporary storage to hold any previous epoch details for a given domain
     *  if the epoch transitioned in this block so that all the submitted bundles
     *  within this block are verified.
     *  TODO: The storage is cleared on block finalization that means this storage is already cleared when
     *  verifying the `submit_bundle` extrinsic and not used at all
     */
    get isV0(): boolean {
        return this.getTypeHash() === '3fbfed0280a211286cd7057803f571ba30eafa821c81988d3f7600945ba20260'
    }

    /**
     *  A temporary storage to hold any previous epoch details for a given domain
     *  if the epoch transitioned in this block so that all the submitted bundles
     *  within this block are verified.
     *  TODO: The storage is cleared on block finalization that means this storage is already cleared when
     *  verifying the `submit_bundle` extrinsic and not used at all
     */
    get asV0(): DomainsLastEpochStakingDistributionStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  A temporary storage to hold any previous epoch details for a given domain
 *  if the epoch transitioned in this block so that all the submitted bundles
 *  within this block are verified.
 *  TODO: The storage is cleared on block finalization that means this storage is already cleared when
 *  verifying the `submit_bundle` extrinsic and not used at all
 */
export interface DomainsLastEpochStakingDistributionStorageV0 {
    get(key: number): Promise<(v0.ElectionVerificationParams | undefined)>
    getAll(): Promise<v0.ElectionVerificationParams[]>
    getMany(keys: number[]): Promise<(v0.ElectionVerificationParams | undefined)[]>
    getKeys(): Promise<number[]>
    getKeys(key: number): Promise<number[]>
    getKeysPaged(pageSize: number): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, key: number): AsyncIterable<number[]>
    getPairs(): Promise<[k: number, v: v0.ElectionVerificationParams][]>
    getPairs(key: number): Promise<[k: number, v: v0.ElectionVerificationParams][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: number, v: v0.ElectionVerificationParams][]>
    getPairsPaged(pageSize: number, key: number): AsyncIterable<[k: number, v: v0.ElectionVerificationParams][]>
}

export class DomainsLatestConfirmedDomainBlockNumberStorage extends StorageBase {
    protected getPrefix() {
        return 'Domains'
    }

    protected getName() {
        return 'LatestConfirmedDomainBlockNumber'
    }

    /**
     *  The latest confirmed block number of each domain.
     */
    get isV0(): boolean {
        return this.getTypeHash() === 'be37cd27c0e60862618e14817365ea9f5c3c45854fea63a6259de44af2521364'
    }

    /**
     *  The latest confirmed block number of each domain.
     */
    get asV0(): DomainsLatestConfirmedDomainBlockNumberStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  The latest confirmed block number of each domain.
 */
export interface DomainsLatestConfirmedDomainBlockNumberStorageV0 {
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

export class DomainsNextDomainIdStorage extends StorageBase {
    protected getPrefix() {
        return 'Domains'
    }

    protected getName() {
        return 'NextDomainId'
    }

    /**
     *  Stores the next domain id.
     */
    get isV0(): boolean {
        return this.getTypeHash() === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
    }

    /**
     *  Stores the next domain id.
     */
    get asV0(): DomainsNextDomainIdStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Stores the next domain id.
 */
export interface DomainsNextDomainIdStorageV0 {
    get(): Promise<number>
}

export class DomainsNextEVMChainIdStorage extends StorageBase {
    protected getPrefix() {
        return 'Domains'
    }

    protected getName() {
        return 'NextEVMChainId'
    }

    /**
     *  Stores the next evm chain id.
     */
    get isV0(): boolean {
        return this.getTypeHash() === '95ff4f914f08e149ddbe1ae2dcb1743bbf9aaae69d04c486e1a398cacfcca06a'
    }

    /**
     *  Stores the next evm chain id.
     */
    get asV0(): DomainsNextEVMChainIdStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Stores the next evm chain id.
 */
export interface DomainsNextEVMChainIdStorageV0 {
    get(): Promise<bigint>
}

export class DomainsNextOperatorIdStorage extends StorageBase {
    protected getPrefix() {
        return 'Domains'
    }

    protected getName() {
        return 'NextOperatorId'
    }

    get isV0(): boolean {
        return this.getTypeHash() === '95ff4f914f08e149ddbe1ae2dcb1743bbf9aaae69d04c486e1a398cacfcca06a'
    }

    get asV0(): DomainsNextOperatorIdStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

export interface DomainsNextOperatorIdStorageV0 {
    get(): Promise<bigint>
}

export class DomainsNextRuntimeIdStorage extends StorageBase {
    protected getPrefix() {
        return 'Domains'
    }

    protected getName() {
        return 'NextRuntimeId'
    }

    /**
     *  Stores the next runtime id.
     */
    get isV0(): boolean {
        return this.getTypeHash() === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
    }

    /**
     *  Stores the next runtime id.
     */
    get asV0(): DomainsNextRuntimeIdStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Stores the next runtime id.
 */
export interface DomainsNextRuntimeIdStorageV0 {
    get(): Promise<number>
}

export class DomainsNominatorCountStorage extends StorageBase {
    protected getPrefix() {
        return 'Domains'
    }

    protected getName() {
        return 'NominatorCount'
    }

    /**
     *  Tracks the nominator count under given operator.
     *  This storage is necessary since CountedStorageNMap does not support prefix key count, so
     *  cannot use that storage type for `Nominators` storage.
     *  Note: The count is incremented for new nominators and decremented when the nominator withdraws
     *  all the stake.
     *  Since Operator themselves are first nominator, they are not counted.
     */
    get isV0(): boolean {
        return this.getTypeHash() === '01439b9224f08482e1de45b75774c6024e82c0b639ac35c14f04de28bc4b5e48'
    }

    /**
     *  Tracks the nominator count under given operator.
     *  This storage is necessary since CountedStorageNMap does not support prefix key count, so
     *  cannot use that storage type for `Nominators` storage.
     *  Note: The count is incremented for new nominators and decremented when the nominator withdraws
     *  all the stake.
     *  Since Operator themselves are first nominator, they are not counted.
     */
    get asV0(): DomainsNominatorCountStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Tracks the nominator count under given operator.
 *  This storage is necessary since CountedStorageNMap does not support prefix key count, so
 *  cannot use that storage type for `Nominators` storage.
 *  Note: The count is incremented for new nominators and decremented when the nominator withdraws
 *  all the stake.
 *  Since Operator themselves are first nominator, they are not counted.
 */
export interface DomainsNominatorCountStorageV0 {
    get(key: bigint): Promise<number>
    getAll(): Promise<number[]>
    getMany(keys: bigint[]): Promise<number[]>
    getKeys(): Promise<bigint[]>
    getKeys(key: bigint): Promise<bigint[]>
    getKeysPaged(pageSize: number): AsyncIterable<bigint[]>
    getKeysPaged(pageSize: number, key: bigint): AsyncIterable<bigint[]>
    getPairs(): Promise<[k: bigint, v: number][]>
    getPairs(key: bigint): Promise<[k: bigint, v: number][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: bigint, v: number][]>
    getPairsPaged(pageSize: number, key: bigint): AsyncIterable<[k: bigint, v: number][]>
}

export class DomainsOperatorEpochSharePriceStorage extends StorageBase {
    protected getPrefix() {
        return 'Domains'
    }

    protected getName() {
        return 'OperatorEpochSharePrice'
    }

    /**
     *  Share price for the operator pool at the end of Domain epoch.
     */
    get isV0(): boolean {
        return this.getTypeHash() === 'ec4e2a1376924b8d80744b9567f90eb1d160c56756c81ad1aa0a3f2169bc6972'
    }

    /**
     *  Share price for the operator pool at the end of Domain epoch.
     */
    get asV0(): DomainsOperatorEpochSharePriceStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Share price for the operator pool at the end of Domain epoch.
 */
export interface DomainsOperatorEpochSharePriceStorageV0 {
    get(key1: bigint, key2: [number, number]): Promise<(number | undefined)>
    getAll(): Promise<number[]>
    getMany(keys: [bigint, [number, number]][]): Promise<(number | undefined)[]>
    getKeys(): Promise<[bigint, [number, number]][]>
    getKeys(key1: bigint): Promise<[bigint, [number, number]][]>
    getKeys(key1: bigint, key2: [number, number]): Promise<[bigint, [number, number]][]>
    getKeysPaged(pageSize: number): AsyncIterable<[bigint, [number, number]][]>
    getKeysPaged(pageSize: number, key1: bigint): AsyncIterable<[bigint, [number, number]][]>
    getKeysPaged(pageSize: number, key1: bigint, key2: [number, number]): AsyncIterable<[bigint, [number, number]][]>
    getPairs(): Promise<[k: [bigint, [number, number]], v: number][]>
    getPairs(key1: bigint): Promise<[k: [bigint, [number, number]], v: number][]>
    getPairs(key1: bigint, key2: [number, number]): Promise<[k: [bigint, [number, number]], v: number][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [bigint, [number, number]], v: number][]>
    getPairsPaged(pageSize: number, key1: bigint): AsyncIterable<[k: [bigint, [number, number]], v: number][]>
    getPairsPaged(pageSize: number, key1: bigint, key2: [number, number]): AsyncIterable<[k: [bigint, [number, number]], v: number][]>
}

export class DomainsOperatorIdOwnerStorage extends StorageBase {
    protected getPrefix() {
        return 'Domains'
    }

    protected getName() {
        return 'OperatorIdOwner'
    }

    get isV0(): boolean {
        return this.getTypeHash() === 'ffc087e1323413e73a9729e444bf115bb89bc74cab9f4347c9dc890a14ae8d68'
    }

    get asV0(): DomainsOperatorIdOwnerStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

export interface DomainsOperatorIdOwnerStorageV0 {
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

export class DomainsOperatorSigningKeyStorage extends StorageBase {
    protected getPrefix() {
        return 'Domains'
    }

    protected getName() {
        return 'OperatorSigningKey'
    }

    /**
     *  Indexes operator signing key against OperatorId.
     */
    get isV0(): boolean {
        return this.getTypeHash() === 'fc96d6750297129d4ff884dffc4742fe833e9be687fa34e80679655014942975'
    }

    /**
     *  Indexes operator signing key against OperatorId.
     */
    get asV0(): DomainsOperatorSigningKeyStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Indexes operator signing key against OperatorId.
 */
export interface DomainsOperatorSigningKeyStorageV0 {
    get(key: Uint8Array): Promise<(bigint | undefined)>
    getAll(): Promise<bigint[]>
    getMany(keys: Uint8Array[]): Promise<(bigint | undefined)[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: bigint][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: bigint][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: bigint][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: bigint][]>
}

export class DomainsOperatorsStorage extends StorageBase {
    protected getPrefix() {
        return 'Domains'
    }

    protected getName() {
        return 'Operators'
    }

    /**
     *  List of all registered operators and their configuration.
     */
    get isV0(): boolean {
        return this.getTypeHash() === 'f29eeaa502bc665062c7dc7479ed218696c8f92116b9b0c6ba7857cd25a8bde7'
    }

    /**
     *  List of all registered operators and their configuration.
     */
    get asV0(): DomainsOperatorsStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  List of all registered operators and their configuration.
 */
export interface DomainsOperatorsStorageV0 {
    get(key: bigint): Promise<(v0.Operator | undefined)>
    getAll(): Promise<v0.Operator[]>
    getMany(keys: bigint[]): Promise<(v0.Operator | undefined)[]>
    getKeys(): Promise<bigint[]>
    getKeys(key: bigint): Promise<bigint[]>
    getKeysPaged(pageSize: number): AsyncIterable<bigint[]>
    getKeysPaged(pageSize: number, key: bigint): AsyncIterable<bigint[]>
    getPairs(): Promise<[k: bigint, v: v0.Operator][]>
    getPairs(key: bigint): Promise<[k: bigint, v: v0.Operator][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: bigint, v: v0.Operator][]>
    getPairsPaged(pageSize: number, key: bigint): AsyncIterable<[k: bigint, v: v0.Operator][]>
}

export class DomainsPendingOperatorSwitchesStorage extends StorageBase {
    protected getPrefix() {
        return 'Domains'
    }

    protected getName() {
        return 'PendingOperatorSwitches'
    }

    /**
     *  Temporary hold of all the operators who decided to switch to another domain.
     *  Once epoch is complete, these operators are added to new domains under next_operators.
     */
    get isV0(): boolean {
        return this.getTypeHash() === 'ad89e1c9cb8fd2d186873c54d677e80653e7a6bb19339657b83b5b789a22279e'
    }

    /**
     *  Temporary hold of all the operators who decided to switch to another domain.
     *  Once epoch is complete, these operators are added to new domains under next_operators.
     */
    get asV0(): DomainsPendingOperatorSwitchesStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Temporary hold of all the operators who decided to switch to another domain.
 *  Once epoch is complete, these operators are added to new domains under next_operators.
 */
export interface DomainsPendingOperatorSwitchesStorageV0 {
    get(key: number): Promise<(bigint[] | undefined)>
    getAll(): Promise<bigint[][]>
    getMany(keys: number[]): Promise<(bigint[] | undefined)[]>
    getKeys(): Promise<number[]>
    getKeys(key: number): Promise<number[]>
    getKeysPaged(pageSize: number): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, key: number): AsyncIterable<number[]>
    getPairs(): Promise<[k: number, v: bigint[]][]>
    getPairs(key: number): Promise<[k: number, v: bigint[]][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: number, v: bigint[]][]>
    getPairsPaged(pageSize: number, key: number): AsyncIterable<[k: number, v: bigint[]][]>
}

export class DomainsPendingSlashesStorage extends StorageBase {
    protected getPrefix() {
        return 'Domains'
    }

    protected getName() {
        return 'PendingSlashes'
    }

    /**
     *  A list operators who were slashed during the current epoch associated with the domain.
     *  When the epoch for a given domain is complete, operator total stake is moved to treasury and
     *  then deleted.
     */
    get isV0(): boolean {
        return this.getTypeHash() === 'ad89e1c9cb8fd2d186873c54d677e80653e7a6bb19339657b83b5b789a22279e'
    }

    /**
     *  A list operators who were slashed during the current epoch associated with the domain.
     *  When the epoch for a given domain is complete, operator total stake is moved to treasury and
     *  then deleted.
     */
    get asV0(): DomainsPendingSlashesStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  A list operators who were slashed during the current epoch associated with the domain.
 *  When the epoch for a given domain is complete, operator total stake is moved to treasury and
 *  then deleted.
 */
export interface DomainsPendingSlashesStorageV0 {
    get(key: number): Promise<(bigint[] | undefined)>
    getAll(): Promise<bigint[][]>
    getMany(keys: number[]): Promise<(bigint[] | undefined)[]>
    getKeys(): Promise<number[]>
    getKeys(key: number): Promise<number[]>
    getKeysPaged(pageSize: number): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, key: number): AsyncIterable<number[]>
    getPairs(): Promise<[k: number, v: bigint[]][]>
    getPairs(key: number): Promise<[k: number, v: bigint[]][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: number, v: bigint[]][]>
    getPairsPaged(pageSize: number, key: number): AsyncIterable<[k: number, v: bigint[]][]>
}

export class DomainsPendingStakingOperationCountStorage extends StorageBase {
    protected getPrefix() {
        return 'Domains'
    }

    protected getName() {
        return 'PendingStakingOperationCount'
    }

    /**
     *  The pending staking operation count of the current epoch, it should not larger than
     *  `MaxPendingStakingOperation` and will be resetted to 0 upon epoch transition.
     */
    get isV0(): boolean {
        return this.getTypeHash() === 'be37cd27c0e60862618e14817365ea9f5c3c45854fea63a6259de44af2521364'
    }

    /**
     *  The pending staking operation count of the current epoch, it should not larger than
     *  `MaxPendingStakingOperation` and will be resetted to 0 upon epoch transition.
     */
    get asV0(): DomainsPendingStakingOperationCountStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  The pending staking operation count of the current epoch, it should not larger than
 *  `MaxPendingStakingOperation` and will be resetted to 0 upon epoch transition.
 */
export interface DomainsPendingStakingOperationCountStorageV0 {
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

export class DomainsRuntimeRegistryStorage extends StorageBase {
    protected getPrefix() {
        return 'Domains'
    }

    protected getName() {
        return 'RuntimeRegistry'
    }

    get isV0(): boolean {
        return this.getTypeHash() === '7f5a4e5008dbae42d04f26a62c866ef88166d0c5539903dbbd55a814833bf54c'
    }

    get asV0(): DomainsRuntimeRegistryStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

export interface DomainsRuntimeRegistryStorageV0 {
    get(key: number): Promise<(v0.RuntimeObject | undefined)>
    getAll(): Promise<v0.RuntimeObject[]>
    getMany(keys: number[]): Promise<(v0.RuntimeObject | undefined)[]>
    getKeys(): Promise<number[]>
    getKeys(key: number): Promise<number[]>
    getKeysPaged(pageSize: number): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, key: number): AsyncIterable<number[]>
    getPairs(): Promise<[k: number, v: v0.RuntimeObject][]>
    getPairs(key: number): Promise<[k: number, v: v0.RuntimeObject][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: number, v: v0.RuntimeObject][]>
    getPairsPaged(pageSize: number, key: number): AsyncIterable<[k: number, v: v0.RuntimeObject][]>
}

export class DomainsScheduledRuntimeUpgradesStorage extends StorageBase {
    protected getPrefix() {
        return 'Domains'
    }

    protected getName() {
        return 'ScheduledRuntimeUpgrades'
    }

    get isV0(): boolean {
        return this.getTypeHash() === 'b62e60af2d8400cfe93957ee17de28c6e09aa0ef31545bc218268998887a6323'
    }

    get asV0(): DomainsScheduledRuntimeUpgradesStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

export interface DomainsScheduledRuntimeUpgradesStorageV0 {
    get(key1: number, key2: number): Promise<(v0.ScheduledRuntimeUpgrade | undefined)>
    getAll(): Promise<v0.ScheduledRuntimeUpgrade[]>
    getMany(keys: [number, number][]): Promise<(v0.ScheduledRuntimeUpgrade | undefined)[]>
    getKeys(): Promise<[number, number][]>
    getKeys(key1: number): Promise<[number, number][]>
    getKeys(key1: number, key2: number): Promise<[number, number][]>
    getKeysPaged(pageSize: number): AsyncIterable<[number, number][]>
    getKeysPaged(pageSize: number, key1: number): AsyncIterable<[number, number][]>
    getKeysPaged(pageSize: number, key1: number, key2: number): AsyncIterable<[number, number][]>
    getPairs(): Promise<[k: [number, number], v: v0.ScheduledRuntimeUpgrade][]>
    getPairs(key1: number): Promise<[k: [number, number], v: v0.ScheduledRuntimeUpgrade][]>
    getPairs(key1: number, key2: number): Promise<[k: [number, number], v: v0.ScheduledRuntimeUpgrade][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [number, number], v: v0.ScheduledRuntimeUpgrade][]>
    getPairsPaged(pageSize: number, key1: number): AsyncIterable<[k: [number, number], v: v0.ScheduledRuntimeUpgrade][]>
    getPairsPaged(pageSize: number, key1: number, key2: number): AsyncIterable<[k: [number, number], v: v0.ScheduledRuntimeUpgrade][]>
}

export class DomainsStateRootsStorage extends StorageBase {
    protected getPrefix() {
        return 'Domains'
    }

    protected getName() {
        return 'StateRoots'
    }

    /**
     *  State root mapped again each domain (block, hash)
     *  This acts as an index for other protocols like XDM to fetch state roots faster.
     */
    get isV0(): boolean {
        return this.getTypeHash() === '761cba00429d11332c16c4e8e73c5d48f26da7ac2b15449cb5c7d04591eb59e2'
    }

    /**
     *  State root mapped again each domain (block, hash)
     *  This acts as an index for other protocols like XDM to fetch state roots faster.
     */
    get asV0(): DomainsStateRootsStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  State root mapped again each domain (block, hash)
 *  This acts as an index for other protocols like XDM to fetch state roots faster.
 */
export interface DomainsStateRootsStorageV0 {
    get(key: [number, number, Uint8Array]): Promise<(Uint8Array | undefined)>
    getAll(): Promise<Uint8Array[]>
    getMany(keys: [number, number, Uint8Array][]): Promise<(Uint8Array | undefined)[]>
    getKeys(): Promise<[number, number, Uint8Array][]>
    getKeys(key: [number, number, Uint8Array]): Promise<[number, number, Uint8Array][]>
    getKeysPaged(pageSize: number): AsyncIterable<[number, number, Uint8Array][]>
    getKeysPaged(pageSize: number, key: [number, number, Uint8Array]): AsyncIterable<[number, number, Uint8Array][]>
    getPairs(): Promise<[k: [number, number, Uint8Array], v: Uint8Array][]>
    getPairs(key: [number, number, Uint8Array]): Promise<[k: [number, number, Uint8Array], v: Uint8Array][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [number, number, Uint8Array], v: Uint8Array][]>
    getPairsPaged(pageSize: number, key: [number, number, Uint8Array]): AsyncIterable<[k: [number, number, Uint8Array], v: Uint8Array][]>
}

export class DomainsSuccessfulBundlesStorage extends StorageBase {
    protected getPrefix() {
        return 'Domains'
    }

    protected getName() {
        return 'SuccessfulBundles'
    }

    /**
     *  Bundles submitted successfully in current block.
     */
    get isV0(): boolean {
        return this.getTypeHash() === 'f619540cfd39ec62194ccd8c2d0c1c6ffcb39cfc17df25d0e83357e4b6c7d6d5'
    }

    /**
     *  Bundles submitted successfully in current block.
     */
    get asV0(): DomainsSuccessfulBundlesStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Bundles submitted successfully in current block.
 */
export interface DomainsSuccessfulBundlesStorageV0 {
    get(key: number): Promise<Uint8Array[]>
    getAll(): Promise<Uint8Array[][]>
    getMany(keys: number[]): Promise<Uint8Array[][]>
    getKeys(): Promise<number[]>
    getKeys(key: number): Promise<number[]>
    getKeysPaged(pageSize: number): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, key: number): AsyncIterable<number[]>
    getPairs(): Promise<[k: number, v: Uint8Array[]][]>
    getPairs(key: number): Promise<[k: number, v: Uint8Array[]][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: number, v: Uint8Array[]][]>
    getPairsPaged(pageSize: number, key: number): AsyncIterable<[k: number, v: Uint8Array[]][]>
}

export class DomainsSuccessfulFraudProofsStorage extends StorageBase {
    protected getPrefix() {
        return 'Domains'
    }

    protected getName() {
        return 'SuccessfulFraudProofs'
    }

    /**
     *  Fraud proofs submitted successfully in current block.
     */
    get isV0(): boolean {
        return this.getTypeHash() === 'f619540cfd39ec62194ccd8c2d0c1c6ffcb39cfc17df25d0e83357e4b6c7d6d5'
    }

    /**
     *  Fraud proofs submitted successfully in current block.
     */
    get asV0(): DomainsSuccessfulFraudProofsStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Fraud proofs submitted successfully in current block.
 */
export interface DomainsSuccessfulFraudProofsStorageV0 {
    get(key: number): Promise<Uint8Array[]>
    getAll(): Promise<Uint8Array[][]>
    getMany(keys: number[]): Promise<Uint8Array[][]>
    getKeys(): Promise<number[]>
    getKeys(key: number): Promise<number[]>
    getKeysPaged(pageSize: number): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, key: number): AsyncIterable<number[]>
    getPairs(): Promise<[k: number, v: Uint8Array[]][]>
    getPairs(key: number): Promise<[k: number, v: Uint8Array[]][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: number, v: Uint8Array[]][]>
    getPairsPaged(pageSize: number, key: number): AsyncIterable<[k: number, v: Uint8Array[]][]>
}

export class DomainsWithdrawalsStorage extends StorageBase {
    protected getPrefix() {
        return 'Domains'
    }

    protected getName() {
        return 'Withdrawals'
    }

    /**
     *  List of all withdrawals for a given operator.
     */
    get isV0(): boolean {
        return this.getTypeHash() === 'f986a6de473c5b7b75538b3a40a851e0b81e36e0dcc198c2b90eddbee9b6ad57'
    }

    /**
     *  List of all withdrawals for a given operator.
     */
    get asV0(): DomainsWithdrawalsStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  List of all withdrawals for a given operator.
 */
export interface DomainsWithdrawalsStorageV0 {
    get(key1: bigint, key2: Uint8Array): Promise<(v0.Withdrawal | undefined)>
    getAll(): Promise<v0.Withdrawal[]>
    getMany(keys: [bigint, Uint8Array][]): Promise<(v0.Withdrawal | undefined)[]>
    getKeys(): Promise<[bigint, Uint8Array][]>
    getKeys(key1: bigint): Promise<[bigint, Uint8Array][]>
    getKeys(key1: bigint, key2: Uint8Array): Promise<[bigint, Uint8Array][]>
    getKeysPaged(pageSize: number): AsyncIterable<[bigint, Uint8Array][]>
    getKeysPaged(pageSize: number, key1: bigint): AsyncIterable<[bigint, Uint8Array][]>
    getKeysPaged(pageSize: number, key1: bigint, key2: Uint8Array): AsyncIterable<[bigint, Uint8Array][]>
    getPairs(): Promise<[k: [bigint, Uint8Array], v: v0.Withdrawal][]>
    getPairs(key1: bigint): Promise<[k: [bigint, Uint8Array], v: v0.Withdrawal][]>
    getPairs(key1: bigint, key2: Uint8Array): Promise<[k: [bigint, Uint8Array], v: v0.Withdrawal][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [bigint, Uint8Array], v: v0.Withdrawal][]>
    getPairsPaged(pageSize: number, key1: bigint): AsyncIterable<[k: [bigint, Uint8Array], v: v0.Withdrawal][]>
    getPairsPaged(pageSize: number, key1: bigint, key2: Uint8Array): AsyncIterable<[k: [bigint, Uint8Array], v: v0.Withdrawal][]>
}

export class MessengerBlockMessagesStorage extends StorageBase {
    protected getPrefix() {
        return 'Messenger'
    }

    protected getName() {
        return 'BlockMessages'
    }

    /**
     *  A temporary storage to store all the messages to be relayed in this block.
     *  Will be cleared on the initialization on next block.
     */
    get isV0(): boolean {
        return this.getTypeHash() === '63bbd4671d536cad499bbf5b77fcc5028b66dc73d7982d46ef777d4f70d3a702'
    }

    /**
     *  A temporary storage to store all the messages to be relayed in this block.
     *  Will be cleared on the initialization on next block.
     */
    get asV0(): MessengerBlockMessagesStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  A temporary storage to store all the messages to be relayed in this block.
 *  Will be cleared on the initialization on next block.
 */
export interface MessengerBlockMessagesStorageV0 {
    get(): Promise<(v0.BlockMessages | undefined)>
}

export class MessengerChannelsStorage extends StorageBase {
    protected getPrefix() {
        return 'Messenger'
    }

    protected getName() {
        return 'Channels'
    }

    /**
     *  Stores channel config between two chains.
     *  Key points to the foreign chain wrt own chain's storage name space
     */
    get isV0(): boolean {
        return this.getTypeHash() === 'bed44cf9d2a57ba3f8263a0b909e1ef8e843a47437dba82afb0cf386d78fcc49'
    }

    /**
     *  Stores channel config between two chains.
     *  Key points to the foreign chain wrt own chain's storage name space
     */
    get asV0(): MessengerChannelsStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Stores channel config between two chains.
 *  Key points to the foreign chain wrt own chain's storage name space
 */
export interface MessengerChannelsStorageV0 {
    get(key1: v0.ChainId, key2: bigint): Promise<(v0.Channel | undefined)>
    getAll(): Promise<v0.Channel[]>
    getMany(keys: [v0.ChainId, bigint][]): Promise<(v0.Channel | undefined)[]>
    getKeys(): Promise<[v0.ChainId, bigint][]>
    getKeys(key1: v0.ChainId): Promise<[v0.ChainId, bigint][]>
    getKeys(key1: v0.ChainId, key2: bigint): Promise<[v0.ChainId, bigint][]>
    getKeysPaged(pageSize: number): AsyncIterable<[v0.ChainId, bigint][]>
    getKeysPaged(pageSize: number, key1: v0.ChainId): AsyncIterable<[v0.ChainId, bigint][]>
    getKeysPaged(pageSize: number, key1: v0.ChainId, key2: bigint): AsyncIterable<[v0.ChainId, bigint][]>
    getPairs(): Promise<[k: [v0.ChainId, bigint], v: v0.Channel][]>
    getPairs(key1: v0.ChainId): Promise<[k: [v0.ChainId, bigint], v: v0.Channel][]>
    getPairs(key1: v0.ChainId, key2: bigint): Promise<[k: [v0.ChainId, bigint], v: v0.Channel][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [v0.ChainId, bigint], v: v0.Channel][]>
    getPairsPaged(pageSize: number, key1: v0.ChainId): AsyncIterable<[k: [v0.ChainId, bigint], v: v0.Channel][]>
    getPairsPaged(pageSize: number, key1: v0.ChainId, key2: bigint): AsyncIterable<[k: [v0.ChainId, bigint], v: v0.Channel][]>
}

export class MessengerCounterForInboxResponsesStorage extends StorageBase {
    protected getPrefix() {
        return 'Messenger'
    }

    protected getName() {
        return 'CounterForInboxResponses'
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
    get asV0(): MessengerCounterForInboxResponsesStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 * Counter for the related counted storage map
 */
export interface MessengerCounterForInboxResponsesStorageV0 {
    get(): Promise<number>
}

export class MessengerCounterForOutboxStorage extends StorageBase {
    protected getPrefix() {
        return 'Messenger'
    }

    protected getName() {
        return 'CounterForOutbox'
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
    get asV0(): MessengerCounterForOutboxStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 * Counter for the related counted storage map
 */
export interface MessengerCounterForOutboxStorageV0 {
    get(): Promise<number>
}

export class MessengerInboxStorage extends StorageBase {
    protected getPrefix() {
        return 'Messenger'
    }

    protected getName() {
        return 'Inbox'
    }

    /**
     *  A temporary storage for storing decoded inbox message between `pre_dispatch_relay_message`
     *  and `relay_message`.
     */
    get isV0(): boolean {
        return this.getTypeHash() === '26152400928c991381b49dee1d3fb3dcb8a40931dcc5dc773de97a4ce03decc4'
    }

    /**
     *  A temporary storage for storing decoded inbox message between `pre_dispatch_relay_message`
     *  and `relay_message`.
     */
    get asV0(): MessengerInboxStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  A temporary storage for storing decoded inbox message between `pre_dispatch_relay_message`
 *  and `relay_message`.
 */
export interface MessengerInboxStorageV0 {
    get(): Promise<(v0.Message | undefined)>
}

export class MessengerInboxFeeStorage extends StorageBase {
    protected getPrefix() {
        return 'Messenger'
    }

    protected getName() {
        return 'InboxFee'
    }

    /**
     *  A temporary storage of fees for executing an inbox message.
     *  The storage is cleared when the acknowledgement of inbox response is received
     *  from the src_chain.
     */
    get isV0(): boolean {
        return this.getTypeHash() === '7618137b0f2ebf14fc33ad64beab1e7e1456823b7d25b8f722497bc49dd3f16b'
    }

    /**
     *  A temporary storage of fees for executing an inbox message.
     *  The storage is cleared when the acknowledgement of inbox response is received
     *  from the src_chain.
     */
    get asV0(): MessengerInboxFeeStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  A temporary storage of fees for executing an inbox message.
 *  The storage is cleared when the acknowledgement of inbox response is received
 *  from the src_chain.
 */
export interface MessengerInboxFeeStorageV0 {
    get(key: [v0.ChainId, [bigint, bigint]]): Promise<(bigint | undefined)>
    getAll(): Promise<bigint[]>
    getMany(keys: [v0.ChainId, [bigint, bigint]][]): Promise<(bigint | undefined)[]>
    getKeys(): Promise<[v0.ChainId, [bigint, bigint]][]>
    getKeys(key: [v0.ChainId, [bigint, bigint]]): Promise<[v0.ChainId, [bigint, bigint]][]>
    getKeysPaged(pageSize: number): AsyncIterable<[v0.ChainId, [bigint, bigint]][]>
    getKeysPaged(pageSize: number, key: [v0.ChainId, [bigint, bigint]]): AsyncIterable<[v0.ChainId, [bigint, bigint]][]>
    getPairs(): Promise<[k: [v0.ChainId, [bigint, bigint]], v: bigint][]>
    getPairs(key: [v0.ChainId, [bigint, bigint]]): Promise<[k: [v0.ChainId, [bigint, bigint]], v: bigint][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [v0.ChainId, [bigint, bigint]], v: bigint][]>
    getPairsPaged(pageSize: number, key: [v0.ChainId, [bigint, bigint]]): AsyncIterable<[k: [v0.ChainId, [bigint, bigint]], v: bigint][]>
}

export class MessengerInboxResponsesStorage extends StorageBase {
    protected getPrefix() {
        return 'Messenger'
    }

    protected getName() {
        return 'InboxResponses'
    }

    /**
     *  Stores the message responses of the incoming processed responses.
     *  Used by the dst_chains to verify the message response.
     */
    get isV0(): boolean {
        return this.getTypeHash() === '8bc659381531be7140b2f3b0efd367b5746efdbb1fce43287d7c2fc23a6a685e'
    }

    /**
     *  Stores the message responses of the incoming processed responses.
     *  Used by the dst_chains to verify the message response.
     */
    get asV0(): MessengerInboxResponsesStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Stores the message responses of the incoming processed responses.
 *  Used by the dst_chains to verify the message response.
 */
export interface MessengerInboxResponsesStorageV0 {
    get(key: [v0.ChainId, bigint, bigint]): Promise<(v0.Message | undefined)>
    getAll(): Promise<v0.Message[]>
    getMany(keys: [v0.ChainId, bigint, bigint][]): Promise<(v0.Message | undefined)[]>
    getKeys(): Promise<[v0.ChainId, bigint, bigint][]>
    getKeys(key: [v0.ChainId, bigint, bigint]): Promise<[v0.ChainId, bigint, bigint][]>
    getKeysPaged(pageSize: number): AsyncIterable<[v0.ChainId, bigint, bigint][]>
    getKeysPaged(pageSize: number, key: [v0.ChainId, bigint, bigint]): AsyncIterable<[v0.ChainId, bigint, bigint][]>
    getPairs(): Promise<[k: [v0.ChainId, bigint, bigint], v: v0.Message][]>
    getPairs(key: [v0.ChainId, bigint, bigint]): Promise<[k: [v0.ChainId, bigint, bigint], v: v0.Message][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [v0.ChainId, bigint, bigint], v: v0.Message][]>
    getPairsPaged(pageSize: number, key: [v0.ChainId, bigint, bigint]): AsyncIterable<[k: [v0.ChainId, bigint, bigint], v: v0.Message][]>
}

export class MessengerNextChannelIdStorage extends StorageBase {
    protected getPrefix() {
        return 'Messenger'
    }

    protected getName() {
        return 'NextChannelId'
    }

    /**
     *  Stores the next channel id for a foreign chain.
     */
    get isV0(): boolean {
        return this.getTypeHash() === 'd3b5f9b4235ea3b606e728c9d320f2a1a6765e7dbf054c738a5aea20088b6ab1'
    }

    /**
     *  Stores the next channel id for a foreign chain.
     */
    get asV0(): MessengerNextChannelIdStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Stores the next channel id for a foreign chain.
 */
export interface MessengerNextChannelIdStorageV0 {
    get(key: v0.ChainId): Promise<bigint>
    getAll(): Promise<bigint[]>
    getMany(keys: v0.ChainId[]): Promise<bigint[]>
    getKeys(): Promise<v0.ChainId[]>
    getKeys(key: v0.ChainId): Promise<v0.ChainId[]>
    getKeysPaged(pageSize: number): AsyncIterable<v0.ChainId[]>
    getKeysPaged(pageSize: number, key: v0.ChainId): AsyncIterable<v0.ChainId[]>
    getPairs(): Promise<[k: v0.ChainId, v: bigint][]>
    getPairs(key: v0.ChainId): Promise<[k: v0.ChainId, v: bigint][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: v0.ChainId, v: bigint][]>
    getPairsPaged(pageSize: number, key: v0.ChainId): AsyncIterable<[k: v0.ChainId, v: bigint][]>
}

export class MessengerOutboxStorage extends StorageBase {
    protected getPrefix() {
        return 'Messenger'
    }

    protected getName() {
        return 'Outbox'
    }

    /**
     *  Stores the outgoing messages that are awaiting message responses from the dst_chain.
     *  Messages are processed in the outbox nonce order of chain's channel.
     */
    get isV0(): boolean {
        return this.getTypeHash() === '8bc659381531be7140b2f3b0efd367b5746efdbb1fce43287d7c2fc23a6a685e'
    }

    /**
     *  Stores the outgoing messages that are awaiting message responses from the dst_chain.
     *  Messages are processed in the outbox nonce order of chain's channel.
     */
    get asV0(): MessengerOutboxStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Stores the outgoing messages that are awaiting message responses from the dst_chain.
 *  Messages are processed in the outbox nonce order of chain's channel.
 */
export interface MessengerOutboxStorageV0 {
    get(key: [v0.ChainId, bigint, bigint]): Promise<(v0.Message | undefined)>
    getAll(): Promise<v0.Message[]>
    getMany(keys: [v0.ChainId, bigint, bigint][]): Promise<(v0.Message | undefined)[]>
    getKeys(): Promise<[v0.ChainId, bigint, bigint][]>
    getKeys(key: [v0.ChainId, bigint, bigint]): Promise<[v0.ChainId, bigint, bigint][]>
    getKeysPaged(pageSize: number): AsyncIterable<[v0.ChainId, bigint, bigint][]>
    getKeysPaged(pageSize: number, key: [v0.ChainId, bigint, bigint]): AsyncIterable<[v0.ChainId, bigint, bigint][]>
    getPairs(): Promise<[k: [v0.ChainId, bigint, bigint], v: v0.Message][]>
    getPairs(key: [v0.ChainId, bigint, bigint]): Promise<[k: [v0.ChainId, bigint, bigint], v: v0.Message][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [v0.ChainId, bigint, bigint], v: v0.Message][]>
    getPairsPaged(pageSize: number, key: [v0.ChainId, bigint, bigint]): AsyncIterable<[k: [v0.ChainId, bigint, bigint], v: v0.Message][]>
}

export class MessengerOutboxFeeStorage extends StorageBase {
    protected getPrefix() {
        return 'Messenger'
    }

    protected getName() {
        return 'OutboxFee'
    }

    /**
     *  A temporary storage of fees for executing an outbox message and its response from dst_chain.
     *  The storage is cleared when src_chain receives the response from dst_chain.
     */
    get isV0(): boolean {
        return this.getTypeHash() === '7618137b0f2ebf14fc33ad64beab1e7e1456823b7d25b8f722497bc49dd3f16b'
    }

    /**
     *  A temporary storage of fees for executing an outbox message and its response from dst_chain.
     *  The storage is cleared when src_chain receives the response from dst_chain.
     */
    get asV0(): MessengerOutboxFeeStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  A temporary storage of fees for executing an outbox message and its response from dst_chain.
 *  The storage is cleared when src_chain receives the response from dst_chain.
 */
export interface MessengerOutboxFeeStorageV0 {
    get(key: [v0.ChainId, [bigint, bigint]]): Promise<(bigint | undefined)>
    getAll(): Promise<bigint[]>
    getMany(keys: [v0.ChainId, [bigint, bigint]][]): Promise<(bigint | undefined)[]>
    getKeys(): Promise<[v0.ChainId, [bigint, bigint]][]>
    getKeys(key: [v0.ChainId, [bigint, bigint]]): Promise<[v0.ChainId, [bigint, bigint]][]>
    getKeysPaged(pageSize: number): AsyncIterable<[v0.ChainId, [bigint, bigint]][]>
    getKeysPaged(pageSize: number, key: [v0.ChainId, [bigint, bigint]]): AsyncIterable<[v0.ChainId, [bigint, bigint]][]>
    getPairs(): Promise<[k: [v0.ChainId, [bigint, bigint]], v: bigint][]>
    getPairs(key: [v0.ChainId, [bigint, bigint]]): Promise<[k: [v0.ChainId, [bigint, bigint]], v: bigint][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [v0.ChainId, [bigint, bigint]], v: bigint][]>
    getPairsPaged(pageSize: number, key: [v0.ChainId, [bigint, bigint]]): AsyncIterable<[k: [v0.ChainId, [bigint, bigint]], v: bigint][]>
}

export class MessengerOutboxResponsesStorage extends StorageBase {
    protected getPrefix() {
        return 'Messenger'
    }

    protected getName() {
        return 'OutboxResponses'
    }

    /**
     *  A temporary storage for storing decoded outbox response message between `pre_dispatch_relay_message_response`
     *  and `relay_message_response`.
     */
    get isV0(): boolean {
        return this.getTypeHash() === '26152400928c991381b49dee1d3fb3dcb8a40931dcc5dc773de97a4ce03decc4'
    }

    /**
     *  A temporary storage for storing decoded outbox response message between `pre_dispatch_relay_message_response`
     *  and `relay_message_response`.
     */
    get asV0(): MessengerOutboxResponsesStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  A temporary storage for storing decoded outbox response message between `pre_dispatch_relay_message_response`
 *  and `relay_message_response`.
 */
export interface MessengerOutboxResponsesStorageV0 {
    get(): Promise<(v0.Message | undefined)>
}

export class MmrNodesStorage extends StorageBase {
    protected getPrefix() {
        return 'Mmr'
    }

    protected getName() {
        return 'Nodes'
    }

    /**
     *  Hashes of the nodes in the MMR.
     * 
     *  Note this collection only contains MMR peaks, the inner nodes (and leaves)
     *  are pruned and only stored in the Offchain DB.
     */
    get isV0(): boolean {
        return this.getTypeHash() === 'ffc087e1323413e73a9729e444bf115bb89bc74cab9f4347c9dc890a14ae8d68'
    }

    /**
     *  Hashes of the nodes in the MMR.
     * 
     *  Note this collection only contains MMR peaks, the inner nodes (and leaves)
     *  are pruned and only stored in the Offchain DB.
     */
    get asV0(): MmrNodesStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Hashes of the nodes in the MMR.
 * 
 *  Note this collection only contains MMR peaks, the inner nodes (and leaves)
 *  are pruned and only stored in the Offchain DB.
 */
export interface MmrNodesStorageV0 {
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

export class MmrNumberOfLeavesStorage extends StorageBase {
    protected getPrefix() {
        return 'Mmr'
    }

    protected getName() {
        return 'NumberOfLeaves'
    }

    /**
     *  Current size of the MMR (number of leaves).
     */
    get isV0(): boolean {
        return this.getTypeHash() === '95ff4f914f08e149ddbe1ae2dcb1743bbf9aaae69d04c486e1a398cacfcca06a'
    }

    /**
     *  Current size of the MMR (number of leaves).
     */
    get asV0(): MmrNumberOfLeavesStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Current size of the MMR (number of leaves).
 */
export interface MmrNumberOfLeavesStorageV0 {
    get(): Promise<bigint>
}

export class MmrRootHashStorage extends StorageBase {
    protected getPrefix() {
        return 'Mmr'
    }

    protected getName() {
        return 'RootHash'
    }

    /**
     *  Latest MMR Root hash.
     */
    get isV0(): boolean {
        return this.getTypeHash() === '146c0d1dce070e2a43f497c479248a882f4ed48937203ea336e85dcf2fa0ec6c'
    }

    /**
     *  Latest MMR Root hash.
     */
    get asV0(): MmrRootHashStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Latest MMR Root hash.
 */
export interface MmrRootHashStorageV0 {
    get(): Promise<Uint8Array>
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

export class RuntimeConfigsConfirmationDepthKStorage extends StorageBase {
    protected getPrefix() {
        return 'RuntimeConfigs'
    }

    protected getName() {
        return 'ConfirmationDepthK'
    }

    get isV0(): boolean {
        return this.getTypeHash() === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
    }

    get asV0(): RuntimeConfigsConfirmationDepthKStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

export interface RuntimeConfigsConfirmationDepthKStorageV0 {
    get(): Promise<number>
}

export class RuntimeConfigsEnableBalanceTransfersStorage extends StorageBase {
    protected getPrefix() {
        return 'RuntimeConfigs'
    }

    protected getName() {
        return 'EnableBalanceTransfers'
    }

    /**
     *  Whether to enable balances transfers.
     */
    get isV0(): boolean {
        return this.getTypeHash() === '1b6fbf1674d189f761a7ac63093bf5c755bf073dd9d9f0dbe657289f92575db5'
    }

    /**
     *  Whether to enable balances transfers.
     */
    get asV0(): RuntimeConfigsEnableBalanceTransfersStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Whether to enable balances transfers.
 */
export interface RuntimeConfigsEnableBalanceTransfersStorageV0 {
    get(): Promise<boolean>
}

export class RuntimeConfigsEnableDomainsStorage extends StorageBase {
    protected getPrefix() {
        return 'RuntimeConfigs'
    }

    protected getName() {
        return 'EnableDomains'
    }

    /**
     *  Whether to enable calls in pallet-domains.
     */
    get isV0(): boolean {
        return this.getTypeHash() === '1b6fbf1674d189f761a7ac63093bf5c755bf073dd9d9f0dbe657289f92575db5'
    }

    /**
     *  Whether to enable calls in pallet-domains.
     */
    get asV0(): RuntimeConfigsEnableDomainsStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Whether to enable calls in pallet-domains.
 */
export interface RuntimeConfigsEnableDomainsStorageV0 {
    get(): Promise<boolean>
}

export class RuntimeConfigsEnableDynamicCostOfStorageStorage extends StorageBase {
    protected getPrefix() {
        return 'RuntimeConfigs'
    }

    protected getName() {
        return 'EnableDynamicCostOfStorage'
    }

    /**
     *  Whether to enable dynamic cost of storage.
     */
    get isV0(): boolean {
        return this.getTypeHash() === '1b6fbf1674d189f761a7ac63093bf5c755bf073dd9d9f0dbe657289f92575db5'
    }

    /**
     *  Whether to enable dynamic cost of storage.
     */
    get asV0(): RuntimeConfigsEnableDynamicCostOfStorageStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Whether to enable dynamic cost of storage.
 */
export interface RuntimeConfigsEnableDynamicCostOfStorageStorageV0 {
    get(): Promise<boolean>
}

export class RuntimeConfigsEnableNonRootCallsStorage extends StorageBase {
    protected getPrefix() {
        return 'RuntimeConfigs'
    }

    protected getName() {
        return 'EnableNonRootCalls'
    }

    /**
     *  Whether to enable calls from non-root account.
     */
    get isV0(): boolean {
        return this.getTypeHash() === '1b6fbf1674d189f761a7ac63093bf5c755bf073dd9d9f0dbe657289f92575db5'
    }

    /**
     *  Whether to enable calls from non-root account.
     */
    get asV0(): RuntimeConfigsEnableNonRootCallsStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Whether to enable calls from non-root account.
 */
export interface RuntimeConfigsEnableNonRootCallsStorageV0 {
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

export class SubspaceBlockRandomnessStorage extends StorageBase {
    protected getPrefix() {
        return 'Subspace'
    }

    protected getName() {
        return 'BlockRandomness'
    }

    /**
     *  The current block randomness, updated at block initialization. When the proof of time feature
     *  is enabled it derived from PoT otherwise PoR.
     */
    get isV0(): boolean {
        return this.getTypeHash() === '8620bdc4f360add1f8e58e488bdba4fa9b6dab86ecdd1c942b8d9de43ede38e5'
    }

    /**
     *  The current block randomness, updated at block initialization. When the proof of time feature
     *  is enabled it derived from PoT otherwise PoR.
     */
    get asV0(): SubspaceBlockRandomnessStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  The current block randomness, updated at block initialization. When the proof of time feature
 *  is enabled it derived from PoT otherwise PoR.
 */
export interface SubspaceBlockRandomnessStorageV0 {
    get(): Promise<(Uint8Array | undefined)>
}

export class SubspaceCounterForSegmentCommitmentStorage extends StorageBase {
    protected getPrefix() {
        return 'Subspace'
    }

    protected getName() {
        return 'CounterForSegmentCommitment'
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
    get asV0(): SubspaceCounterForSegmentCommitmentStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 * Counter for the related counted storage map
 */
export interface SubspaceCounterForSegmentCommitmentStorageV0 {
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
        return this.getTypeHash() === '572197de77e994cafb64d94aee2c638631956f8f5d0813bd02e4b7258c3494a7'
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
    get(): Promise<([Uint8Array, number, number, v0.Scalar, bigint, Uint8Array] | undefined)>
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
        return this.getTypeHash() === '44a2e58cb68e16cb72d53000e318d506786701c7370d9772c84869118219a2e0'
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
    get(): Promise<([[Uint8Array, number, number, v0.Scalar, bigint], [Uint8Array, Uint8Array]][] | undefined)>
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

export class SubspaceDidProcessSegmentHeadersStorage extends StorageBase {
    protected getPrefix() {
        return 'Subspace'
    }

    protected getName() {
        return 'DidProcessSegmentHeaders'
    }

    /**
     *  Whether the segment headers inherent has been processed in this block (temporary value).
     * 
     *  This value is updated to `true` when processing `store_segment_headers` by a node.
     *  It is then cleared at the end of each block execution in the `on_finalize` hook.
     */
    get isV0(): boolean {
        return this.getTypeHash() === '1b6fbf1674d189f761a7ac63093bf5c755bf073dd9d9f0dbe657289f92575db5'
    }

    /**
     *  Whether the segment headers inherent has been processed in this block (temporary value).
     * 
     *  This value is updated to `true` when processing `store_segment_headers` by a node.
     *  It is then cleared at the end of each block execution in the `on_finalize` hook.
     */
    get asV0(): SubspaceDidProcessSegmentHeadersStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Whether the segment headers inherent has been processed in this block (temporary value).
 * 
 *  This value is updated to `true` when processing `store_segment_headers` by a node.
 *  It is then cleared at the end of each block execution in the `on_finalize` hook.
 */
export interface SubspaceDidProcessSegmentHeadersStorageV0 {
    get(): Promise<boolean>
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

export class SubspaceEnableRewardsBelowSolutionRangeStorage extends StorageBase {
    protected getPrefix() {
        return 'Subspace'
    }

    protected getName() {
        return 'EnableRewardsBelowSolutionRange'
    }

    /**
     *  Enable rewards when solution range is below this threshold.
     */
    get isV0(): boolean {
        return this.getTypeHash() === 'd3f0e4c96dad8d73df3c44f02993a46a9ed2eed15208047c7d80882af09d67cc'
    }

    /**
     *  Enable rewards when solution range is below this threshold.
     */
    get asV0(): SubspaceEnableRewardsBelowSolutionRangeStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Enable rewards when solution range is below this threshold.
 */
export interface SubspaceEnableRewardsBelowSolutionRangeStorageV0 {
    get(): Promise<(bigint | undefined)>
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
        return this.getTypeHash() === 'c4b75b58df90c4d90c1e3b530fdf1603816e7ebea15e0a474a50a4898e6588df'
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
    get(): Promise<([Uint8Array, number, number, v0.Scalar, bigint] | undefined)>
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
        return this.getTypeHash() === '10dd025415ba5cd4983855e94a38559ad1a1efa323c08d9161a084ffc61b64d9'
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
    get(): Promise<[[Uint8Array, number, number, v0.Scalar, bigint], [Uint8Array, Uint8Array]][]>
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
        return this.getTypeHash() === '311b75af306ecc1560930f152c2fbf545e232c516a14be27294d9652a898503f'
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

export class SubspacePotEntropyStorage extends StorageBase {
    protected getPrefix() {
        return 'Subspace'
    }

    protected getName() {
        return 'PotEntropy'
    }

    /**
     *  Entropy that needs to be injected into proof of time chain at specific slot associated with
     *  block number it came from.
     */
    get isV0(): boolean {
        return this.getTypeHash() === '083fea27a6dfab191e1f3d99017ab08ac5c82fdcb68fb8889be5e3194b671b93'
    }

    /**
     *  Entropy that needs to be injected into proof of time chain at specific slot associated with
     *  block number it came from.
     */
    get asV0(): SubspacePotEntropyStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Entropy that needs to be injected into proof of time chain at specific slot associated with
 *  block number it came from.
 */
export interface SubspacePotEntropyStorageV0 {
    get(): Promise<[number, v0.PotEntropyValue][]>
}

export class SubspacePotSlotIterationsStorage extends StorageBase {
    protected getPrefix() {
        return 'Subspace'
    }

    protected getName() {
        return 'PotSlotIterations'
    }

    /**
     *  Number of iterations for proof of time per slot
     */
    get isV0(): boolean {
        return this.getTypeHash() === 'a926ad48d1a07d1162c5fdb99f3f6cef39c7c5a115a92ff9ccf0357bae4bf2ed'
    }

    /**
     *  Number of iterations for proof of time per slot
     */
    get asV0(): SubspacePotSlotIterationsStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Number of iterations for proof of time per slot
 */
export interface SubspacePotSlotIterationsStorageV0 {
    get(): Promise<(number | undefined)>
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

export class SubspaceSegmentCommitmentStorage extends StorageBase {
    protected getPrefix() {
        return 'Subspace'
    }

    protected getName() {
        return 'SegmentCommitment'
    }

    /**
     *  Mapping from segment index to corresponding segment commitment of contained records.
     */
    get isV0(): boolean {
        return this.getTypeHash() === '3508935497870e6a9b983257503c99b48652762d8236ef66894f85a4505ee3d2'
    }

    /**
     *  Mapping from segment index to corresponding segment commitment of contained records.
     */
    get asV0(): SubspaceSegmentCommitmentStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Mapping from segment index to corresponding segment commitment of contained records.
 */
export interface SubspaceSegmentCommitmentStorageV0 {
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
        return this.getTypeHash() === 'd6b7a816e0cf6dc8f60cb2bd55c5c5ae7ad928521a6e98aafbe6e954f5c54878'
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

export class SystemAuthorizedUpgradeStorage extends StorageBase {
    protected getPrefix() {
        return 'System'
    }

    protected getName() {
        return 'AuthorizedUpgrade'
    }

    /**
     *  `Some` if a code upgrade has been authorized.
     */
    get isV0(): boolean {
        return this.getTypeHash() === '901f6f87c9fafe3d3f61c36b45b24a63a90d51ae151f2b4a361d3c5611ffb723'
    }

    /**
     *  `Some` if a code upgrade has been authorized.
     */
    get asV0(): SystemAuthorizedUpgradeStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  `Some` if a code upgrade has been authorized.
 */
export interface SystemAuthorizedUpgradeStorageV0 {
    get(): Promise<(v0.CodeUpgradeAuthorization | undefined)>
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
     *  The value has the type `(BlockNumberFor<T>, EventIndex)` because if we used only just
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
     *  The value has the type `(BlockNumberFor<T>, EventIndex)` because if we used only just
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
 *  The value has the type `(BlockNumberFor<T>, EventIndex)` because if we used only just
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
        return this.getTypeHash() === 'f181dd928b68d4fa10968a5f185e525856b4cc99446b0e4acf83e814b788879e'
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
     *  Whether the timestamp has been updated in this block.
     * 
     *  This value is updated to `true` upon successful submission of a timestamp by a node.
     *  It is then checked at the end of each block execution in the `on_finalize` hook.
     */
    get isV0(): boolean {
        return this.getTypeHash() === '1b6fbf1674d189f761a7ac63093bf5c755bf073dd9d9f0dbe657289f92575db5'
    }

    /**
     *  Whether the timestamp has been updated in this block.
     * 
     *  This value is updated to `true` upon successful submission of a timestamp by a node.
     *  It is then checked at the end of each block execution in the `on_finalize` hook.
     */
    get asV0(): TimestampDidUpdateStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Whether the timestamp has been updated in this block.
 * 
 *  This value is updated to `true` upon successful submission of a timestamp by a node.
 *  It is then checked at the end of each block execution in the `on_finalize` hook.
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
     *  The current time for the current block.
     */
    get isV0(): boolean {
        return this.getTypeHash() === '95ff4f914f08e149ddbe1ae2dcb1743bbf9aaae69d04c486e1a398cacfcca06a'
    }

    /**
     *  The current time for the current block.
     */
    get asV0(): TimestampNowStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  The current time for the current block.
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
     *  can issue fees during block finalization.
     */
    get isV0(): boolean {
        return this.getTypeHash() === '8620bdc4f360add1f8e58e488bdba4fa9b6dab86ecdd1c942b8d9de43ede38e5'
    }

    /**
     *  Temporary value (cleared at block finalization) which contains current block author, so we
     *  can issue fees during block finalization.
     */
    get asV0(): TransactionFeesBlockAuthorStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Temporary value (cleared at block finalization) which contains current block author, so we
 *  can issue fees during block finalization.
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
     *  issue fees during block finalization.
     */
    get isV0(): boolean {
        return this.getTypeHash() === '28bed10d043b0c0b43024ee27d2e27a94df5258f8505d99a50db02806087f15a'
    }

    /**
     *  Temporary value (cleared at block finalization) which contains current block fees, so we can
     *  issue fees during block finalization.
     */
    get asV0(): TransactionFeesCollectedBlockFeesStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Temporary value (cleared at block finalization) which contains current block fees, so we can
 *  issue fees during block finalization.
 */
export interface TransactionFeesCollectedBlockFeesStorageV0 {
    get(): Promise<(v0.CollectedFees | undefined)>
}

export class TransactionFeesIsDuringBlockExecutionStorage extends StorageBase {
    protected getPrefix() {
        return 'TransactionFees'
    }

    protected getName() {
        return 'IsDuringBlockExecution'
    }

    /**
     *  Temporary value (cleared at block finalization) used to determine if the `transaction_byte_fee`
     *  is used to validate extrinsic or execute extrinsic.
     */
    get isV0(): boolean {
        return this.getTypeHash() === '1b6fbf1674d189f761a7ac63093bf5c755bf073dd9d9f0dbe657289f92575db5'
    }

    /**
     *  Temporary value (cleared at block finalization) used to determine if the `transaction_byte_fee`
     *  is used to validate extrinsic or execute extrinsic.
     */
    get asV0(): TransactionFeesIsDuringBlockExecutionStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Temporary value (cleared at block finalization) used to determine if the `transaction_byte_fee`
 *  is used to validate extrinsic or execute extrinsic.
 */
export interface TransactionFeesIsDuringBlockExecutionStorageV0 {
    get(): Promise<boolean>
}

export class TransactionFeesTransactionByteFeeStorage extends StorageBase {
    protected getPrefix() {
        return 'TransactionFees'
    }

    protected getName() {
        return 'TransactionByteFee'
    }

    /**
     *  The value of `transaction_byte_fee` for both the current and the next block.
     * 
     *  The `next` value of `transaction_byte_fee` is updated at block finalization and used to
     *  validate extrinsic to be included in the next block, the value is move to `current` at
     *  block initialization and used to execute extrinsic in the current block. Together it
     *  ensure we use the same value for both validating and executing the extrinsic.
     * 
     *  NOTE: both the `current` and `next` value is set to the default `Balance::max_value` in
     *  the genesis block which means there will be no signed extrinsic included in block #1.
     */
    get isV0(): boolean {
        return this.getTypeHash() === 'cfadc244c3675fe5bf049f37441ea7d51fb6fcecde09f089a03988b95131c736'
    }

    /**
     *  The value of `transaction_byte_fee` for both the current and the next block.
     * 
     *  The `next` value of `transaction_byte_fee` is updated at block finalization and used to
     *  validate extrinsic to be included in the next block, the value is move to `current` at
     *  block initialization and used to execute extrinsic in the current block. Together it
     *  ensure we use the same value for both validating and executing the extrinsic.
     * 
     *  NOTE: both the `current` and `next` value is set to the default `Balance::max_value` in
     *  the genesis block which means there will be no signed extrinsic included in block #1.
     */
    get asV0(): TransactionFeesTransactionByteFeeStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  The value of `transaction_byte_fee` for both the current and the next block.
 * 
 *  The `next` value of `transaction_byte_fee` is updated at block finalization and used to
 *  validate extrinsic to be included in the next block, the value is move to `current` at
 *  block initialization and used to execute extrinsic in the current block. Together it
 *  ensure we use the same value for both validating and executing the extrinsic.
 * 
 *  NOTE: both the `current` and `next` value is set to the default `Balance::max_value` in
 *  the genesis block which means there will be no signed extrinsic included in block #1.
 */
export interface TransactionFeesTransactionByteFeeStorageV0 {
    get(): Promise<v0.BlockTransactionByteFee>
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

export class TransporterOutgoingTransfersStorage extends StorageBase {
    protected getPrefix() {
        return 'Transporter'
    }

    protected getName() {
        return 'OutgoingTransfers'
    }

    /**
     *  All the outgoing transfers on this execution environment.
     */
    get isV0(): boolean {
        return this.getTypeHash() === '3cca9e038d7c425d26bd5e3053453baa1214629ad3686913220d9638cb31d06f'
    }

    /**
     *  All the outgoing transfers on this execution environment.
     */
    get asV0(): TransporterOutgoingTransfersStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  All the outgoing transfers on this execution environment.
 */
export interface TransporterOutgoingTransfersStorageV0 {
    get(key1: v0.ChainId, key2: [bigint, bigint]): Promise<(v0.Transfer | undefined)>
    getAll(): Promise<v0.Transfer[]>
    getMany(keys: [v0.ChainId, [bigint, bigint]][]): Promise<(v0.Transfer | undefined)[]>
    getKeys(): Promise<[v0.ChainId, [bigint, bigint]][]>
    getKeys(key1: v0.ChainId): Promise<[v0.ChainId, [bigint, bigint]][]>
    getKeys(key1: v0.ChainId, key2: [bigint, bigint]): Promise<[v0.ChainId, [bigint, bigint]][]>
    getKeysPaged(pageSize: number): AsyncIterable<[v0.ChainId, [bigint, bigint]][]>
    getKeysPaged(pageSize: number, key1: v0.ChainId): AsyncIterable<[v0.ChainId, [bigint, bigint]][]>
    getKeysPaged(pageSize: number, key1: v0.ChainId, key2: [bigint, bigint]): AsyncIterable<[v0.ChainId, [bigint, bigint]][]>
    getPairs(): Promise<[k: [v0.ChainId, [bigint, bigint]], v: v0.Transfer][]>
    getPairs(key1: v0.ChainId): Promise<[k: [v0.ChainId, [bigint, bigint]], v: v0.Transfer][]>
    getPairs(key1: v0.ChainId, key2: [bigint, bigint]): Promise<[k: [v0.ChainId, [bigint, bigint]], v: v0.Transfer][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [v0.ChainId, [bigint, bigint]], v: v0.Transfer][]>
    getPairsPaged(pageSize: number, key1: v0.ChainId): AsyncIterable<[k: [v0.ChainId, [bigint, bigint]], v: v0.Transfer][]>
    getPairsPaged(pageSize: number, key1: v0.ChainId, key2: [bigint, bigint]): AsyncIterable<[k: [v0.ChainId, [bigint, bigint]], v: v0.Transfer][]>
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
    get isV0(): boolean {
        return this.getTypeHash() === 'd1025301ffa60f04c50bb1007ecb356d52103dd9c366150de1ba80c6e043ac2f'
    }

    /**
     *  Vesting schedules of an account.
     * 
     *  VestingSchedules: map AccountId => Vec<VestingSchedule>
     */
    get asV0(): VestingVestingSchedulesStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Vesting schedules of an account.
 * 
 *  VestingSchedules: map AccountId => Vec<VestingSchedule>
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
