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

export class EVMAccountCodesMetadataStorage extends StorageBase {
    protected getPrefix() {
        return 'EVM'
    }

    protected getName() {
        return 'AccountCodesMetadata'
    }

    get isV0(): boolean {
        return this.getTypeHash() === '85b2848eb820c708bd1d2c8e96a947d7f7597fba6d42d560a793758fc63f060e'
    }

    get asV0(): EVMAccountCodesMetadataStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

export interface EVMAccountCodesMetadataStorageV0 {
    get(key: Uint8Array): Promise<(v0.CodeMetadata | undefined)>
    getAll(): Promise<v0.CodeMetadata[]>
    getMany(keys: Uint8Array[]): Promise<(v0.CodeMetadata | undefined)[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: v0.CodeMetadata][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: v0.CodeMetadata][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: v0.CodeMetadata][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: v0.CodeMetadata][]>
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

export class OperatorRewardsBlockRewardsStorage extends StorageBase {
    protected getPrefix() {
        return 'OperatorRewards'
    }

    protected getName() {
        return 'BlockRewards'
    }

    /**
     *  The accumulated rewards of the current block
     * 
     *  Currently, the only source of rewards is the transaction fees, in the future it
     *  will include the XDM reward.
     */
    get isV0(): boolean {
        return this.getTypeHash() === 'f8ebe28eb30158172c0ccf672f7747c46a244f892d08ef2ebcbaadde34a26bc0'
    }

    /**
     *  The accumulated rewards of the current block
     * 
     *  Currently, the only source of rewards is the transaction fees, in the future it
     *  will include the XDM reward.
     */
    get asV0(): OperatorRewardsBlockRewardsStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  The accumulated rewards of the current block
 * 
 *  Currently, the only source of rewards is the transaction fees, in the future it
 *  will include the XDM reward.
 */
export interface OperatorRewardsBlockRewardsStorageV0 {
    get(): Promise<bigint>
}

export class SelfDomainIdSelfDomainIdStorage extends StorageBase {
    protected getPrefix() {
        return 'SelfDomainId'
    }

    protected getName() {
        return 'SelfDomainId'
    }

    get isV0(): boolean {
        return this.getTypeHash() === 'a926ad48d1a07d1162c5fdb99f3f6cef39c7c5a115a92ff9ccf0357bae4bf2ed'
    }

    get asV0(): SelfDomainIdSelfDomainIdStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

export interface SelfDomainIdSelfDomainIdStorageV0 {
    get(): Promise<(number | undefined)>
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
        return this.getTypeHash() === '23624d32723ccf1f66f5a522c53da280cdc0ff4db50ea34f65440327cbd5abca'
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
