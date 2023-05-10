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
        return this.getTypeHash() === 'ee2115b027893d1c56456aa70c4c809a607243f8ae340fcc3174a4fda6b5fa60'
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
        return this.getTypeHash() === '4a9471c596674dc74081789e451860abe90c610d3fc5e0dd1f131cb156843b0c'
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
        return this.getTypeHash() === '4a9471c596674dc74081789e451860abe90c610d3fc5e0dd1f131cb156843b0c'
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
        return this.getTypeHash() === '06841a55079a86baa2b12695efaff49e696e0a558e06bbd4b18273c80bed1aa7'
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
        return this.getTypeHash() === '8d51fd387814de21dbda4559e469fac48b20d115c43cfecaecc67226920214d5'
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

export class BaseFeeBaseFeePerGasStorage extends StorageBase {
    protected getPrefix() {
        return 'BaseFee'
    }

    protected getName() {
        return 'BaseFeePerGas'
    }

    get isV0(): boolean {
        return this.getTypeHash() === '12f873961beb65950ba33112c0ef55aa5cd3ec2d1e17a439f76a028d6b94ec7b'
    }

    get asV0(): BaseFeeBaseFeePerGasStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

export interface BaseFeeBaseFeePerGasStorageV0 {
    get(): Promise<bigint>
}

export class BaseFeeElasticityStorage extends StorageBase {
    protected getPrefix() {
        return 'BaseFee'
    }

    protected getName() {
        return 'Elasticity'
    }

    get isV0(): boolean {
        return this.getTypeHash() === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
    }

    get asV0(): BaseFeeElasticityStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

export interface BaseFeeElasticityStorageV0 {
    get(): Promise<number>
}

export class EVMAccountCodesStorage extends StorageBase {
    protected getPrefix() {
        return 'EVM'
    }

    protected getName() {
        return 'AccountCodes'
    }

    get isV0(): boolean {
        return this.getTypeHash() === '4b802a732c8f27bcaa64a64c00c70aeccf7b09e63cd3db9000de1ada8ab379c2'
    }

    get asV0(): EVMAccountCodesStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

export interface EVMAccountCodesStorageV0 {
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

export class EVMAccountStoragesStorage extends StorageBase {
    protected getPrefix() {
        return 'EVM'
    }

    protected getName() {
        return 'AccountStorages'
    }

    get isV0(): boolean {
        return this.getTypeHash() === 'e46b64a08590ade9974d6cacb482b7b117daf13fb4b1c7e4a0c1e141c3c7c76f'
    }

    get asV0(): EVMAccountStoragesStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

export interface EVMAccountStoragesStorageV0 {
    get(key1: Uint8Array, key2: Uint8Array): Promise<Uint8Array>
    getAll(): Promise<Uint8Array[]>
    getMany(keys: [Uint8Array, Uint8Array][]): Promise<Uint8Array[]>
    getKeys(): Promise<[Uint8Array, Uint8Array][]>
    getKeys(key1: Uint8Array): Promise<[Uint8Array, Uint8Array][]>
    getKeys(key1: Uint8Array, key2: Uint8Array): Promise<[Uint8Array, Uint8Array][]>
    getKeysPaged(pageSize: number): AsyncIterable<[Uint8Array, Uint8Array][]>
    getKeysPaged(pageSize: number, key1: Uint8Array): AsyncIterable<[Uint8Array, Uint8Array][]>
    getKeysPaged(pageSize: number, key1: Uint8Array, key2: Uint8Array): AsyncIterable<[Uint8Array, Uint8Array][]>
    getPairs(): Promise<[k: [Uint8Array, Uint8Array], v: Uint8Array][]>
    getPairs(key1: Uint8Array): Promise<[k: [Uint8Array, Uint8Array], v: Uint8Array][]>
    getPairs(key1: Uint8Array, key2: Uint8Array): Promise<[k: [Uint8Array, Uint8Array], v: Uint8Array][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [Uint8Array, Uint8Array], v: Uint8Array][]>
    getPairsPaged(pageSize: number, key1: Uint8Array): AsyncIterable<[k: [Uint8Array, Uint8Array], v: Uint8Array][]>
    getPairsPaged(pageSize: number, key1: Uint8Array, key2: Uint8Array): AsyncIterable<[k: [Uint8Array, Uint8Array], v: Uint8Array][]>
}

export class EVMChainIdChainIdStorage extends StorageBase {
    protected getPrefix() {
        return 'EVMChainId'
    }

    protected getName() {
        return 'ChainId'
    }

    /**
     *  The EVM chain ID.
     */
    get isV0(): boolean {
        return this.getTypeHash() === '95ff4f914f08e149ddbe1ae2dcb1743bbf9aaae69d04c486e1a398cacfcca06a'
    }

    /**
     *  The EVM chain ID.
     */
    get asV0(): EVMChainIdChainIdStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  The EVM chain ID.
 */
export interface EVMChainIdChainIdStorageV0 {
    get(): Promise<bigint>
}

export class EthereumBlockHashStorage extends StorageBase {
    protected getPrefix() {
        return 'Ethereum'
    }

    protected getName() {
        return 'BlockHash'
    }

    get isV0(): boolean {
        return this.getTypeHash() === '3cdb160343948514e73c6294339cfda53b65a21ccd0591b9966cf8b00b8db892'
    }

    get asV0(): EthereumBlockHashStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

export interface EthereumBlockHashStorageV0 {
    get(key: bigint): Promise<Uint8Array>
    getAll(): Promise<Uint8Array[]>
    getMany(keys: bigint[]): Promise<Uint8Array[]>
    getKeys(): Promise<bigint[]>
    getKeys(key: bigint): Promise<bigint[]>
    getKeysPaged(pageSize: number): AsyncIterable<bigint[]>
    getKeysPaged(pageSize: number, key: bigint): AsyncIterable<bigint[]>
    getPairs(): Promise<[k: bigint, v: Uint8Array][]>
    getPairs(key: bigint): Promise<[k: bigint, v: Uint8Array][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: bigint, v: Uint8Array][]>
    getPairsPaged(pageSize: number, key: bigint): AsyncIterable<[k: bigint, v: Uint8Array][]>
}

export class EthereumCurrentBlockStorage extends StorageBase {
    protected getPrefix() {
        return 'Ethereum'
    }

    protected getName() {
        return 'CurrentBlock'
    }

    /**
     *  The current Ethereum block.
     */
    get isV0(): boolean {
        return this.getTypeHash() === '83cc60e6bcafe0d8714add8cf55f02976711d5e30ab464d1a2079648429b2716'
    }

    /**
     *  The current Ethereum block.
     */
    get asV0(): EthereumCurrentBlockStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  The current Ethereum block.
 */
export interface EthereumCurrentBlockStorageV0 {
    get(): Promise<(v0.Block | undefined)>
}

export class EthereumCurrentReceiptsStorage extends StorageBase {
    protected getPrefix() {
        return 'Ethereum'
    }

    protected getName() {
        return 'CurrentReceipts'
    }

    /**
     *  The current Ethereum receipts.
     */
    get isV0(): boolean {
        return this.getTypeHash() === '3808105e37ff881e09dab58654e60755cf8107d16545835652272971b001adf7'
    }

    /**
     *  The current Ethereum receipts.
     */
    get asV0(): EthereumCurrentReceiptsStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  The current Ethereum receipts.
 */
export interface EthereumCurrentReceiptsStorageV0 {
    get(): Promise<(v0.ReceiptV3[] | undefined)>
}

export class EthereumCurrentTransactionStatusesStorage extends StorageBase {
    protected getPrefix() {
        return 'Ethereum'
    }

    protected getName() {
        return 'CurrentTransactionStatuses'
    }

    /**
     *  The current transaction statuses.
     */
    get isV0(): boolean {
        return this.getTypeHash() === 'e42d9c1a7dbca2e4e0301367b0c021b885fe9bf9ce8eadadb8b48112a96cf49e'
    }

    /**
     *  The current transaction statuses.
     */
    get asV0(): EthereumCurrentTransactionStatusesStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  The current transaction statuses.
 */
export interface EthereumCurrentTransactionStatusesStorageV0 {
    get(): Promise<(v0.TransactionStatus[] | undefined)>
}

export class EthereumPendingStorage extends StorageBase {
    protected getPrefix() {
        return 'Ethereum'
    }

    protected getName() {
        return 'Pending'
    }

    /**
     *  Current building block's transactions and receipts.
     */
    get isV0(): boolean {
        return this.getTypeHash() === '00020cc0b6f1b30cefcbc71a9c5abcba50c851f7263cf484aa6fd41c577e5a1f'
    }

    /**
     *  Current building block's transactions and receipts.
     */
    get asV0(): EthereumPendingStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Current building block's transactions and receipts.
 */
export interface EthereumPendingStorageV0 {
    get(): Promise<[v0.TransactionV2, v0.TransactionStatus, v0.ReceiptV3][]>
}

export class ExecutivePalletIntermediateRootsStorage extends StorageBase {
    protected getPrefix() {
        return 'ExecutivePallet'
    }

    protected getName() {
        return 'IntermediateRoots'
    }

    /**
     *  Intermediate storage roots collected during the block execution.
     */
    get isV0(): boolean {
        return this.getTypeHash() === 'f5df25eadcdffaa0d2a68b199d671d3921ca36a7b70d22d57506dca52b4b5895'
    }

    /**
     *  Intermediate storage roots collected during the block execution.
     */
    get asV0(): ExecutivePalletIntermediateRootsStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Intermediate storage roots collected during the block execution.
 */
export interface ExecutivePalletIntermediateRootsStorageV0 {
    get(): Promise<Uint8Array[]>
}

export class MessengerChannelsStorage extends StorageBase {
    protected getPrefix() {
        return 'Messenger'
    }

    protected getName() {
        return 'Channels'
    }

    /**
     *  Stores channel config between two domains.
     *  Key points to the foreign domain wrt own domain's storage name space
     */
    get isV0(): boolean {
        return this.getTypeHash() === '21ec36ff92783845993b0dfacd479a4982317821b78848da8853d03ab36d9cd7'
    }

    /**
     *  Stores channel config between two domains.
     *  Key points to the foreign domain wrt own domain's storage name space
     */
    get asV0(): MessengerChannelsStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Stores channel config between two domains.
 *  Key points to the foreign domain wrt own domain's storage name space
 */
export interface MessengerChannelsStorageV0 {
    get(key1: number, key2: bigint): Promise<(v0.Channel | undefined)>
    getAll(): Promise<v0.Channel[]>
    getMany(keys: [number, bigint][]): Promise<(v0.Channel | undefined)[]>
    getKeys(): Promise<[number, bigint][]>
    getKeys(key1: number): Promise<[number, bigint][]>
    getKeys(key1: number, key2: bigint): Promise<[number, bigint][]>
    getKeysPaged(pageSize: number): AsyncIterable<[number, bigint][]>
    getKeysPaged(pageSize: number, key1: number): AsyncIterable<[number, bigint][]>
    getKeysPaged(pageSize: number, key1: number, key2: bigint): AsyncIterable<[number, bigint][]>
    getPairs(): Promise<[k: [number, bigint], v: v0.Channel][]>
    getPairs(key1: number): Promise<[k: [number, bigint], v: v0.Channel][]>
    getPairs(key1: number, key2: bigint): Promise<[k: [number, bigint], v: v0.Channel][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [number, bigint], v: v0.Channel][]>
    getPairsPaged(pageSize: number, key1: number): AsyncIterable<[k: [number, bigint], v: v0.Channel][]>
    getPairsPaged(pageSize: number, key1: number, key2: bigint): AsyncIterable<[k: [number, bigint], v: v0.Channel][]>
}

export class MessengerCounterForInboxStorage extends StorageBase {
    protected getPrefix() {
        return 'Messenger'
    }

    protected getName() {
        return 'CounterForInbox'
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
    get asV0(): MessengerCounterForInboxStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 * Counter for the related counted storage map
 */
export interface MessengerCounterForInboxStorageV0 {
    get(): Promise<number>
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

export class MessengerCounterForOutboxResponsesStorage extends StorageBase {
    protected getPrefix() {
        return 'Messenger'
    }

    protected getName() {
        return 'CounterForOutboxResponses'
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
    get asV0(): MessengerCounterForOutboxResponsesStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 * Counter for the related counted storage map
 */
export interface MessengerCounterForOutboxResponsesStorageV0 {
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
     *  Stores the incoming messages that are yet to be processed.
     *  Messages are processed in the inbox nonce order of domain channel.
     */
    get isV0(): boolean {
        return this.getTypeHash() === '437d76c64dfb8125491e3b15c361ccbb75c9ceb4b83178f1f9a612a55bf7fd29'
    }

    /**
     *  Stores the incoming messages that are yet to be processed.
     *  Messages are processed in the inbox nonce order of domain channel.
     */
    get asV0(): MessengerInboxStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Stores the incoming messages that are yet to be processed.
 *  Messages are processed in the inbox nonce order of domain channel.
 */
export interface MessengerInboxStorageV0 {
    get(key: [number, bigint, bigint]): Promise<(v0.Message | undefined)>
    getAll(): Promise<v0.Message[]>
    getMany(keys: [number, bigint, bigint][]): Promise<(v0.Message | undefined)[]>
    getKeys(): Promise<[number, bigint, bigint][]>
    getKeys(key: [number, bigint, bigint]): Promise<[number, bigint, bigint][]>
    getKeysPaged(pageSize: number): AsyncIterable<[number, bigint, bigint][]>
    getKeysPaged(pageSize: number, key: [number, bigint, bigint]): AsyncIterable<[number, bigint, bigint][]>
    getPairs(): Promise<[k: [number, bigint, bigint], v: v0.Message][]>
    getPairs(key: [number, bigint, bigint]): Promise<[k: [number, bigint, bigint], v: v0.Message][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [number, bigint, bigint], v: v0.Message][]>
    getPairsPaged(pageSize: number, key: [number, bigint, bigint]): AsyncIterable<[k: [number, bigint, bigint], v: v0.Message][]>
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
     *  Used by the dst_domain to verify the message response.
     */
    get isV0(): boolean {
        return this.getTypeHash() === '437d76c64dfb8125491e3b15c361ccbb75c9ceb4b83178f1f9a612a55bf7fd29'
    }

    /**
     *  Stores the message responses of the incoming processed responses.
     *  Used by the dst_domain to verify the message response.
     */
    get asV0(): MessengerInboxResponsesStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Stores the message responses of the incoming processed responses.
 *  Used by the dst_domain to verify the message response.
 */
export interface MessengerInboxResponsesStorageV0 {
    get(key: [number, bigint, bigint]): Promise<(v0.Message | undefined)>
    getAll(): Promise<v0.Message[]>
    getMany(keys: [number, bigint, bigint][]): Promise<(v0.Message | undefined)[]>
    getKeys(): Promise<[number, bigint, bigint][]>
    getKeys(key: [number, bigint, bigint]): Promise<[number, bigint, bigint][]>
    getKeysPaged(pageSize: number): AsyncIterable<[number, bigint, bigint][]>
    getKeysPaged(pageSize: number, key: [number, bigint, bigint]): AsyncIterable<[number, bigint, bigint][]>
    getPairs(): Promise<[k: [number, bigint, bigint], v: v0.Message][]>
    getPairs(key: [number, bigint, bigint]): Promise<[k: [number, bigint, bigint], v: v0.Message][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [number, bigint, bigint], v: v0.Message][]>
    getPairsPaged(pageSize: number, key: [number, bigint, bigint]): AsyncIterable<[k: [number, bigint, bigint], v: v0.Message][]>
}

export class MessengerNextChannelIdStorage extends StorageBase {
    protected getPrefix() {
        return 'Messenger'
    }

    protected getName() {
        return 'NextChannelId'
    }

    /**
     *  Stores the next channel id for a foreign domain.
     */
    get isV0(): boolean {
        return this.getTypeHash() === '20fe898f07bb840efc08a332cc64aa4b2ccb54ab4c14657ac54a702a890509ee'
    }

    /**
     *  Stores the next channel id for a foreign domain.
     */
    get asV0(): MessengerNextChannelIdStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Stores the next channel id for a foreign domain.
 */
export interface MessengerNextChannelIdStorageV0 {
    get(key: number): Promise<bigint>
    getAll(): Promise<bigint[]>
    getMany(keys: number[]): Promise<bigint[]>
    getKeys(): Promise<number[]>
    getKeys(key: number): Promise<number[]>
    getKeysPaged(pageSize: number): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, key: number): AsyncIterable<number[]>
    getPairs(): Promise<[k: number, v: bigint][]>
    getPairs(key: number): Promise<[k: number, v: bigint][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: number, v: bigint][]>
    getPairsPaged(pageSize: number, key: number): AsyncIterable<[k: number, v: bigint][]>
}

export class MessengerNextRelayerIdxStorage extends StorageBase {
    protected getPrefix() {
        return 'Messenger'
    }

    protected getName() {
        return 'NextRelayerIdx'
    }

    get isV0(): boolean {
        return this.getTypeHash() === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
    }

    get asV0(): MessengerNextRelayerIdxStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

export interface MessengerNextRelayerIdxStorageV0 {
    get(): Promise<number>
}

export class MessengerOutboxStorage extends StorageBase {
    protected getPrefix() {
        return 'Messenger'
    }

    protected getName() {
        return 'Outbox'
    }

    /**
     *  Stores the outgoing messages that are awaiting message responses from the dst_domain.
     *  Messages are processed in the outbox nonce order of domain channel.
     */
    get isV0(): boolean {
        return this.getTypeHash() === '437d76c64dfb8125491e3b15c361ccbb75c9ceb4b83178f1f9a612a55bf7fd29'
    }

    /**
     *  Stores the outgoing messages that are awaiting message responses from the dst_domain.
     *  Messages are processed in the outbox nonce order of domain channel.
     */
    get asV0(): MessengerOutboxStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Stores the outgoing messages that are awaiting message responses from the dst_domain.
 *  Messages are processed in the outbox nonce order of domain channel.
 */
export interface MessengerOutboxStorageV0 {
    get(key: [number, bigint, bigint]): Promise<(v0.Message | undefined)>
    getAll(): Promise<v0.Message[]>
    getMany(keys: [number, bigint, bigint][]): Promise<(v0.Message | undefined)[]>
    getKeys(): Promise<[number, bigint, bigint][]>
    getKeys(key: [number, bigint, bigint]): Promise<[number, bigint, bigint][]>
    getKeysPaged(pageSize: number): AsyncIterable<[number, bigint, bigint][]>
    getKeysPaged(pageSize: number, key: [number, bigint, bigint]): AsyncIterable<[number, bigint, bigint][]>
    getPairs(): Promise<[k: [number, bigint, bigint], v: v0.Message][]>
    getPairs(key: [number, bigint, bigint]): Promise<[k: [number, bigint, bigint], v: v0.Message][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [number, bigint, bigint], v: v0.Message][]>
    getPairsPaged(pageSize: number, key: [number, bigint, bigint]): AsyncIterable<[k: [number, bigint, bigint], v: v0.Message][]>
}

export class MessengerOutboxResponsesStorage extends StorageBase {
    protected getPrefix() {
        return 'Messenger'
    }

    protected getName() {
        return 'OutboxResponses'
    }

    get isV0(): boolean {
        return this.getTypeHash() === '437d76c64dfb8125491e3b15c361ccbb75c9ceb4b83178f1f9a612a55bf7fd29'
    }

    get asV0(): MessengerOutboxResponsesStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

export interface MessengerOutboxResponsesStorageV0 {
    get(key: [number, bigint, bigint]): Promise<(v0.Message | undefined)>
    getAll(): Promise<v0.Message[]>
    getMany(keys: [number, bigint, bigint][]): Promise<(v0.Message | undefined)[]>
    getKeys(): Promise<[number, bigint, bigint][]>
    getKeys(key: [number, bigint, bigint]): Promise<[number, bigint, bigint][]>
    getKeysPaged(pageSize: number): AsyncIterable<[number, bigint, bigint][]>
    getKeysPaged(pageSize: number, key: [number, bigint, bigint]): AsyncIterable<[number, bigint, bigint][]>
    getPairs(): Promise<[k: [number, bigint, bigint], v: v0.Message][]>
    getPairs(key: [number, bigint, bigint]): Promise<[k: [number, bigint, bigint], v: v0.Message][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [number, bigint, bigint], v: v0.Message][]>
    getPairsPaged(pageSize: number, key: [number, bigint, bigint]): AsyncIterable<[k: [number, bigint, bigint], v: v0.Message][]>
}

export class MessengerRelayerMessagesStorage extends StorageBase {
    protected getPrefix() {
        return 'Messenger'
    }

    protected getName() {
        return 'RelayerMessages'
    }

    get isV0(): boolean {
        return this.getTypeHash() === '9e657c21424e859f87efec2560b0dbdc6989136c8ce5c13dcb7392828c843346'
    }

    get asV0(): MessengerRelayerMessagesStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

export interface MessengerRelayerMessagesStorageV0 {
    get(key: Uint8Array): Promise<(v0.RelayerMessages | undefined)>
    getAll(): Promise<v0.RelayerMessages[]>
    getMany(keys: Uint8Array[]): Promise<(v0.RelayerMessages | undefined)[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: v0.RelayerMessages][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: v0.RelayerMessages][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: v0.RelayerMessages][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: v0.RelayerMessages][]>
}

export class MessengerRelayersStorage extends StorageBase {
    protected getPrefix() {
        return 'Messenger'
    }

    protected getName() {
        return 'Relayers'
    }

    get isV0(): boolean {
        return this.getTypeHash() === 'd14508def9da76532021b53d553e9048fd079e2e735d2393e6d531e6d1fd29ca'
    }

    get asV0(): MessengerRelayersStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

export interface MessengerRelayersStorageV0 {
    get(): Promise<Uint8Array[]>
}

export class MessengerRelayersInfoStorage extends StorageBase {
    protected getPrefix() {
        return 'Messenger'
    }

    protected getName() {
        return 'RelayersInfo'
    }

    get isV0(): boolean {
        return this.getTypeHash() === '5f3525925a9eeed0c167bb6aab33cac21608ad2176636d0107e0b90c551da99e'
    }

    get asV0(): MessengerRelayersInfoStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

export interface MessengerRelayersInfoStorageV0 {
    get(key: Uint8Array): Promise<(v0.RelayerInfo | undefined)>
    getAll(): Promise<v0.RelayerInfo[]>
    getMany(keys: Uint8Array[]): Promise<(v0.RelayerInfo | undefined)[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: v0.RelayerInfo][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: v0.RelayerInfo][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: v0.RelayerInfo][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: v0.RelayerInfo][]>
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
        return this.getTypeHash() === '1660936d4028b791703af3ae985bc49e73619feaf378f3fe474e68b98897138f'
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
        return this.getTypeHash() === '7983bbc1ae8edba4f5e13a7cd91a68076c89d6d422e9438dacd92a53008c3751'
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
        return this.getTypeHash() === '5f7613bc8425e771044b8164ec83b11fe411b9751bee51871f745ebe659fb6a5'
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
        return this.getTypeHash() === 'dbf0870d7eb068300eba2e14eaead15fcd40e2b1f33d729b2603175f9756c520'
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
    get(key1: number, key2: [bigint, bigint]): Promise<(v0.Transfer | undefined)>
    getAll(): Promise<v0.Transfer[]>
    getMany(keys: [number, [bigint, bigint]][]): Promise<(v0.Transfer | undefined)[]>
    getKeys(): Promise<[number, [bigint, bigint]][]>
    getKeys(key1: number): Promise<[number, [bigint, bigint]][]>
    getKeys(key1: number, key2: [bigint, bigint]): Promise<[number, [bigint, bigint]][]>
    getKeysPaged(pageSize: number): AsyncIterable<[number, [bigint, bigint]][]>
    getKeysPaged(pageSize: number, key1: number): AsyncIterable<[number, [bigint, bigint]][]>
    getKeysPaged(pageSize: number, key1: number, key2: [bigint, bigint]): AsyncIterable<[number, [bigint, bigint]][]>
    getPairs(): Promise<[k: [number, [bigint, bigint]], v: v0.Transfer][]>
    getPairs(key1: number): Promise<[k: [number, [bigint, bigint]], v: v0.Transfer][]>
    getPairs(key1: number, key2: [bigint, bigint]): Promise<[k: [number, [bigint, bigint]], v: v0.Transfer][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: [number, [bigint, bigint]], v: v0.Transfer][]>
    getPairsPaged(pageSize: number, key1: number): AsyncIterable<[k: [number, [bigint, bigint]], v: v0.Transfer][]>
    getPairsPaged(pageSize: number, key1: number, key2: [bigint, bigint]): AsyncIterable<[k: [number, [bigint, bigint]], v: v0.Transfer][]>
}
