import assert from 'assert'
import {Block, Chain, ChainContext, BlockContext, Result} from './support'
import * as v3 from './v3'

export class BalancesAccountStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
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
  get isV3() {
    return this._chain.getStorageItemTypeHash('Balances', 'Account') === '0b3b4bf0dd7388459eba461bc7c3226bf58608c941710a714e02f33ec0f91e78'
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
  async getAsV3(key: Uint8Array): Promise<v3.AccountData> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Balances', 'Account', key)
  }

  async getManyAsV3(keys: Uint8Array[]): Promise<(v3.AccountData)[]> {
    assert(this.isV3)
    return this._chain.queryStorage(this.blockHash, 'Balances', 'Account', keys.map(k => [k]))
  }

  async getAllAsV3(): Promise<(v3.AccountData)[]> {
    assert(this.isV3)
    return this._chain.queryStorage(this.blockHash, 'Balances', 'Account')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Balances', 'Account') != null
  }
}

export class BalancesLocksStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Any liquidity locks on some account balances.
   *  NOTE: Should only be accessed when setting, changing and freeing a lock.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('Balances', 'Locks') === 'e393b3a20a6d47aee703c898fda1db02fffe128e4692a5861f416ecc67b13a86'
  }

  /**
   *  Any liquidity locks on some account balances.
   *  NOTE: Should only be accessed when setting, changing and freeing a lock.
   */
  async getAsV3(key: Uint8Array): Promise<v3.BalanceLock[]> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Balances', 'Locks', key)
  }

  async getManyAsV3(keys: Uint8Array[]): Promise<(v3.BalanceLock[])[]> {
    assert(this.isV3)
    return this._chain.queryStorage(this.blockHash, 'Balances', 'Locks', keys.map(k => [k]))
  }

  async getAllAsV3(): Promise<(v3.BalanceLock[])[]> {
    assert(this.isV3)
    return this._chain.queryStorage(this.blockHash, 'Balances', 'Locks')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Balances', 'Locks') != null
  }
}

export class BalancesReservesStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Named reserves on some account balances.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('Balances', 'Reserves') === '474ab364918936227f04514c303c572bb070961f30f593f2cbb3e25426aba37a'
  }

  /**
   *  Named reserves on some account balances.
   */
  async getAsV3(key: Uint8Array): Promise<v3.ReserveData[]> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Balances', 'Reserves', key)
  }

  async getManyAsV3(keys: Uint8Array[]): Promise<(v3.ReserveData[])[]> {
    assert(this.isV3)
    return this._chain.queryStorage(this.blockHash, 'Balances', 'Reserves', keys.map(k => [k]))
  }

  async getAllAsV3(): Promise<(v3.ReserveData[])[]> {
    assert(this.isV3)
    return this._chain.queryStorage(this.blockHash, 'Balances', 'Reserves')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Balances', 'Reserves') != null
  }
}

export class BalancesStorageVersionStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Storage version of the pallet.
   * 
   *  This is set to v2.0.0 for new networks.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('Balances', 'StorageVersion') === '1431e80ffaa4d10a7fe714faa381ada05c3baae7e12aa80f24f8728a41ba57c4'
  }

  /**
   *  Storage version of the pallet.
   * 
   *  This is set to v2.0.0 for new networks.
   */
  async getAsV3(): Promise<v3.Releases> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Balances', 'StorageVersion')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Balances', 'StorageVersion') != null
  }
}

export class BalancesTotalIssuanceStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  The total units issued in the system.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('Balances', 'TotalIssuance') === 'f8ebe28eb30158172c0ccf672f7747c46a244f892d08ef2ebcbaadde34a26bc0'
  }

  /**
   *  The total units issued in the system.
   */
  async getAsV3(): Promise<bigint> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Balances', 'TotalIssuance')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Balances', 'TotalIssuance') != null
  }
}

export class ExecutorBlockHashStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Map of block number to block hash.
   * 
   *  NOTE: The oldest block hash will be pruned once the oldest receipt is pruned. However, if the
   *  execution chain stalls, i.e., no receipts are included in the primary chain for a long time,
   *  this mapping will grow indefinitely.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('Executor', 'BlockHash') === '06f5703796027f4b198d4ffd50b721273430d8ff663660646793873168f9df17'
  }

  /**
   *  Map of block number to block hash.
   * 
   *  NOTE: The oldest block hash will be pruned once the oldest receipt is pruned. However, if the
   *  execution chain stalls, i.e., no receipts are included in the primary chain for a long time,
   *  this mapping will grow indefinitely.
   */
  async getAsV3(key: number): Promise<Uint8Array> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Executor', 'BlockHash', key)
  }

  async getManyAsV3(keys: number[]): Promise<(Uint8Array)[]> {
    assert(this.isV3)
    return this._chain.queryStorage(this.blockHash, 'Executor', 'BlockHash', keys.map(k => [k]))
  }

  async getAllAsV3(): Promise<(Uint8Array)[]> {
    assert(this.isV3)
    return this._chain.queryStorage(this.blockHash, 'Executor', 'BlockHash')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Executor', 'BlockHash') != null
  }
}

export class ExecutorExecutionChainBestNumberStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Latest execution chain block number.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('Executor', 'ExecutionChainBestNumber') === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
  }

  /**
   *  Latest execution chain block number.
   */
  async getAsV3(): Promise<number> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Executor', 'ExecutionChainBestNumber')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Executor', 'ExecutionChainBestNumber') != null
  }
}

export class ExecutorExecutorStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  A tuple of (stable_executor_id, executor_signing_key).
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('Executor', 'Executor') === '072fcd26efed51f16848a84d5d757c1391c51b9e0303e33f920a6101089e5dfe'
  }

  /**
   *  A tuple of (stable_executor_id, executor_signing_key).
   */
  async getAsV3(): Promise<[Uint8Array, Uint8Array] | undefined> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Executor', 'Executor')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Executor', 'Executor') != null
  }
}

export class ExecutorOldestReceiptNumberStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Number of the block that the oldest execution receipt points to.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('Executor', 'OldestReceiptNumber') === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
  }

  /**
   *  Number of the block that the oldest execution receipt points to.
   */
  async getAsV3(): Promise<number> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Executor', 'OldestReceiptNumber')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Executor', 'OldestReceiptNumber') != null
  }
}

export class ExecutorReceiptsStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Mapping from the primary block number to the corresponding verified execution receipt.
   * 
   *  The capacity of receipts stored in the state is [`Config::ReceiptsPruningDepth`], the older
   *  ones will be pruned once the size of receipts exceeds this number.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('Executor', 'Receipts') === 'b61524d27054258c1fb36c82e0222b6340ac55e627f9f80c498ace9107330f0f'
  }

  /**
   *  Mapping from the primary block number to the corresponding verified execution receipt.
   * 
   *  The capacity of receipts stored in the state is [`Config::ReceiptsPruningDepth`], the older
   *  ones will be pruned once the size of receipts exceeds this number.
   */
  async getAsV3(key: number): Promise<v3.ExecutionReceipt | undefined> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Executor', 'Receipts', key)
  }

  async getManyAsV3(keys: number[]): Promise<(v3.ExecutionReceipt | undefined)[]> {
    assert(this.isV3)
    return this._chain.queryStorage(this.blockHash, 'Executor', 'Receipts', keys.map(k => [k]))
  }

  async getAllAsV3(): Promise<(v3.ExecutionReceipt)[]> {
    assert(this.isV3)
    return this._chain.queryStorage(this.blockHash, 'Executor', 'Receipts')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Executor', 'Receipts') != null
  }
}

export class FeedsFeedConfigsStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  get isV3() {
    return this._chain.getStorageItemTypeHash('Feeds', 'FeedConfigs') === '2bd699643905f57b0afc999cdb46fe87e9bc88556f8d86cb437a4abcce700f74'
  }

  async getAsV3(key: bigint): Promise<v3.FeedConfig | undefined> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Feeds', 'FeedConfigs', key)
  }

  async getManyAsV3(keys: bigint[]): Promise<(v3.FeedConfig | undefined)[]> {
    assert(this.isV3)
    return this._chain.queryStorage(this.blockHash, 'Feeds', 'FeedConfigs', keys.map(k => [k]))
  }

  async getAllAsV3(): Promise<(v3.FeedConfig)[]> {
    assert(this.isV3)
    return this._chain.queryStorage(this.blockHash, 'Feeds', 'FeedConfigs')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Feeds', 'FeedConfigs') != null
  }
}

export class FeedsFeedsStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  get isV3() {
    return this._chain.getStorageItemTypeHash('Feeds', 'Feeds') === 'fe3e3ebfe8d9e3e028dc2ccc0243b34a5a1c77d8f318ffa75f6ca97892063814'
  }

  async getAsV3(key: Uint8Array): Promise<bigint[] | undefined> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Feeds', 'Feeds', key)
  }

  async getManyAsV3(keys: Uint8Array[]): Promise<(bigint[] | undefined)[]> {
    assert(this.isV3)
    return this._chain.queryStorage(this.blockHash, 'Feeds', 'Feeds', keys.map(k => [k]))
  }

  async getAllAsV3(): Promise<(bigint[])[]> {
    assert(this.isV3)
    return this._chain.queryStorage(this.blockHash, 'Feeds', 'Feeds')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Feeds', 'Feeds') != null
  }
}

export class FeedsMetadataStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  get isV3() {
    return this._chain.getStorageItemTypeHash('Feeds', 'Metadata') === '20982e01b9cf10a62e69d380b0c1fa5e45a352de0b5cf91f295f9c38d801bc9c'
  }

  async getAsV3(key: bigint): Promise<Uint8Array | undefined> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Feeds', 'Metadata', key)
  }

  async getManyAsV3(keys: bigint[]): Promise<(Uint8Array | undefined)[]> {
    assert(this.isV3)
    return this._chain.queryStorage(this.blockHash, 'Feeds', 'Metadata', keys.map(k => [k]))
  }

  async getAllAsV3(): Promise<(Uint8Array)[]> {
    assert(this.isV3)
    return this._chain.queryStorage(this.blockHash, 'Feeds', 'Metadata')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Feeds', 'Metadata') != null
  }
}

export class FeedsNextFeedIdStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  get isV3() {
    return this._chain.getStorageItemTypeHash('Feeds', 'NextFeedId') === '95ff4f914f08e149ddbe1ae2dcb1743bbf9aaae69d04c486e1a398cacfcca06a'
  }

  async getAsV3(): Promise<bigint> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Feeds', 'NextFeedId')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Feeds', 'NextFeedId') != null
  }
}

export class FeedsSuccessfulPutsStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  get isV3() {
    return this._chain.getStorageItemTypeHash('Feeds', 'SuccessfulPuts') === 'f5df25eadcdffaa0d2a68b199d671d3921ca36a7b70d22d57506dca52b4b5895'
  }

  async getAsV3(): Promise<Uint8Array[]> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Feeds', 'SuccessfulPuts')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Feeds', 'SuccessfulPuts') != null
  }
}

export class FeedsTotalsStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  get isV3() {
    return this._chain.getStorageItemTypeHash('Feeds', 'Totals') === 'f3d3eff3c9d5d10a4ce733327b300974210d0b2d3a5eb6ab25a8edd5f6a222ea'
  }

  async getAsV3(key: bigint): Promise<v3.TotalObjectsAndSize> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Feeds', 'Totals', key)
  }

  async getManyAsV3(keys: bigint[]): Promise<(v3.TotalObjectsAndSize)[]> {
    assert(this.isV3)
    return this._chain.queryStorage(this.blockHash, 'Feeds', 'Totals', keys.map(k => [k]))
  }

  async getAllAsV3(): Promise<(v3.TotalObjectsAndSize)[]> {
    assert(this.isV3)
    return this._chain.queryStorage(this.blockHash, 'Feeds', 'Totals')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Feeds', 'Totals') != null
  }
}

export class GrandpaFinalityVerifierChainTipStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Known tip of the chain
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('GrandpaFinalityVerifier', 'ChainTip') === 'ba297738a0a552cc3bb388113efafcf33241993a821307df5fac2ba96657223b'
  }

  /**
   *  Known tip of the chain
   */
  async getAsV3(key: bigint): Promise<[Uint8Array, Uint8Array]> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'GrandpaFinalityVerifier', 'ChainTip', key)
  }

  async getManyAsV3(keys: bigint[]): Promise<([Uint8Array, Uint8Array])[]> {
    assert(this.isV3)
    return this._chain.queryStorage(this.blockHash, 'GrandpaFinalityVerifier', 'ChainTip', keys.map(k => [k]))
  }

  async getAllAsV3(): Promise<([Uint8Array, Uint8Array])[]> {
    assert(this.isV3)
    return this._chain.queryStorage(this.blockHash, 'GrandpaFinalityVerifier', 'ChainTip')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('GrandpaFinalityVerifier', 'ChainTip') != null
  }
}

export class GrandpaFinalityVerifierCurrentAuthoritySetStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  The current GRANDPA Authority set for a given Chain
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('GrandpaFinalityVerifier', 'CurrentAuthoritySet') === 'e1694728d047f69484f829b13f6dabfa6d94da8b1aab59f55122e993a67db516'
  }

  /**
   *  The current GRANDPA Authority set for a given Chain
   */
  async getAsV3(key: bigint): Promise<v3.AuthoritySet> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'GrandpaFinalityVerifier', 'CurrentAuthoritySet', key)
  }

  async getManyAsV3(keys: bigint[]): Promise<(v3.AuthoritySet)[]> {
    assert(this.isV3)
    return this._chain.queryStorage(this.blockHash, 'GrandpaFinalityVerifier', 'CurrentAuthoritySet', keys.map(k => [k]))
  }

  async getAllAsV3(): Promise<(v3.AuthoritySet)[]> {
    assert(this.isV3)
    return this._chain.queryStorage(this.blockHash, 'GrandpaFinalityVerifier', 'CurrentAuthoritySet')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('GrandpaFinalityVerifier', 'CurrentAuthoritySet') != null
  }
}

export class GrandpaFinalityVerifierOldestKnownParentStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Oldest known parent
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('GrandpaFinalityVerifier', 'OldestKnownParent') === 'ba297738a0a552cc3bb388113efafcf33241993a821307df5fac2ba96657223b'
  }

  /**
   *  Oldest known parent
   */
  async getAsV3(key: bigint): Promise<[Uint8Array, Uint8Array]> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'GrandpaFinalityVerifier', 'OldestKnownParent', key)
  }

  async getManyAsV3(keys: bigint[]): Promise<([Uint8Array, Uint8Array])[]> {
    assert(this.isV3)
    return this._chain.queryStorage(this.blockHash, 'GrandpaFinalityVerifier', 'OldestKnownParent', keys.map(k => [k]))
  }

  async getAllAsV3(): Promise<([Uint8Array, Uint8Array])[]> {
    assert(this.isV3)
    return this._chain.queryStorage(this.blockHash, 'GrandpaFinalityVerifier', 'OldestKnownParent')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('GrandpaFinalityVerifier', 'OldestKnownParent') != null
  }
}

export class GrandpaFinalityVerifierValidationCheckPointStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  The point after which the block validation begins
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('GrandpaFinalityVerifier', 'ValidationCheckPoint') === 'ba297738a0a552cc3bb388113efafcf33241993a821307df5fac2ba96657223b'
  }

  /**
   *  The point after which the block validation begins
   */
  async getAsV3(key: bigint): Promise<[Uint8Array, Uint8Array]> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'GrandpaFinalityVerifier', 'ValidationCheckPoint', key)
  }

  async getManyAsV3(keys: bigint[]): Promise<([Uint8Array, Uint8Array])[]> {
    assert(this.isV3)
    return this._chain.queryStorage(this.blockHash, 'GrandpaFinalityVerifier', 'ValidationCheckPoint', keys.map(k => [k]))
  }

  async getAllAsV3(): Promise<([Uint8Array, Uint8Array])[]> {
    assert(this.isV3)
    return this._chain.queryStorage(this.blockHash, 'GrandpaFinalityVerifier', 'ValidationCheckPoint')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('GrandpaFinalityVerifier', 'ValidationCheckPoint') != null
  }
}

export class OffencesSubspaceConcurrentReportsIndexStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  A vector of reports of the same kind that happened at the same time slot.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('OffencesSubspace', 'ConcurrentReportsIndex') === 'd5c59a6db2baab9f1dcc1a37b0131a737935fd2082fcf39b6abc3f1d6e3ae008'
  }

  /**
   *  A vector of reports of the same kind that happened at the same time slot.
   */
  async getAsV3(key1: Uint8Array, key2: Uint8Array): Promise<Uint8Array[]> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'OffencesSubspace', 'ConcurrentReportsIndex', key1, key2)
  }

  async getManyAsV3(keys: [Uint8Array, Uint8Array][]): Promise<(Uint8Array[])[]> {
    assert(this.isV3)
    return this._chain.queryStorage(this.blockHash, 'OffencesSubspace', 'ConcurrentReportsIndex', keys)
  }

  async getAllAsV3(): Promise<(Uint8Array[])[]> {
    assert(this.isV3)
    return this._chain.queryStorage(this.blockHash, 'OffencesSubspace', 'ConcurrentReportsIndex')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('OffencesSubspace', 'ConcurrentReportsIndex') != null
  }
}

export class OffencesSubspaceReportsStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  The primary structure that holds all offence records keyed by report identifiers.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('OffencesSubspace', 'Reports') === 'ce845ea5260838377cabc469ad246c34b46439014c3d4dbdd581259560f3a24a'
  }

  /**
   *  The primary structure that holds all offence records keyed by report identifiers.
   */
  async getAsV3(key: Uint8Array): Promise<v3.OffenceDetails | undefined> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'OffencesSubspace', 'Reports', key)
  }

  async getManyAsV3(keys: Uint8Array[]): Promise<(v3.OffenceDetails | undefined)[]> {
    assert(this.isV3)
    return this._chain.queryStorage(this.blockHash, 'OffencesSubspace', 'Reports', keys.map(k => [k]))
  }

  async getAllAsV3(): Promise<(v3.OffenceDetails)[]> {
    assert(this.isV3)
    return this._chain.queryStorage(this.blockHash, 'OffencesSubspace', 'Reports')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('OffencesSubspace', 'Reports') != null
  }
}

export class OffencesSubspaceReportsByKindIndexStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Enumerates all reports of a kind along with the time they happened.
   * 
   *  All reports are sorted by the time of offence.
   * 
   *  Note that the actual type of this mapping is `Vec<u8>`, this is because values of
   *  different types are not supported at the moment so we are doing the manual serialization.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('OffencesSubspace', 'ReportsByKindIndex') === '0f535b9892aaca40228e6d3f57b63c241690838a686fa8be3e7f0992bfda0d19'
  }

  /**
   *  Enumerates all reports of a kind along with the time they happened.
   * 
   *  All reports are sorted by the time of offence.
   * 
   *  Note that the actual type of this mapping is `Vec<u8>`, this is because values of
   *  different types are not supported at the moment so we are doing the manual serialization.
   */
  async getAsV3(key: Uint8Array): Promise<Uint8Array> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'OffencesSubspace', 'ReportsByKindIndex', key)
  }

  async getManyAsV3(keys: Uint8Array[]): Promise<(Uint8Array)[]> {
    assert(this.isV3)
    return this._chain.queryStorage(this.blockHash, 'OffencesSubspace', 'ReportsByKindIndex', keys.map(k => [k]))
  }

  async getAllAsV3(): Promise<(Uint8Array)[]> {
    assert(this.isV3)
    return this._chain.queryStorage(this.blockHash, 'OffencesSubspace', 'ReportsByKindIndex')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('OffencesSubspace', 'ReportsByKindIndex') != null
  }
}

export class RuntimeConfigsEnableExecutorStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Sets this value to `true` to enable the signed extension `DisablePallets` which
   *  disallowes the Call from pallet-executor.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('RuntimeConfigs', 'EnableExecutor') === '1b6fbf1674d189f761a7ac63093bf5c755bf073dd9d9f0dbe657289f92575db5'
  }

  /**
   *  Sets this value to `true` to enable the signed extension `DisablePallets` which
   *  disallowes the Call from pallet-executor.
   */
  async getAsV3(): Promise<boolean> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'RuntimeConfigs', 'EnableExecutor')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('RuntimeConfigs', 'EnableExecutor') != null
  }
}

export class SubspaceAllowAuthoringByAnyoneStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Allow block authoring by anyone or just root.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('Subspace', 'AllowAuthoringByAnyone') === '1b6fbf1674d189f761a7ac63093bf5c755bf073dd9d9f0dbe657289f92575db5'
  }

  /**
   *  Allow block authoring by anyone or just root.
   */
  async getAsV3(): Promise<boolean> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Subspace', 'AllowAuthoringByAnyone')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Subspace', 'AllowAuthoringByAnyone') != null
  }
}

export class SubspaceBlockListStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  A set of blocked farmers keyed by their public key.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('Subspace', 'BlockList') === '29735300dba5135be0e1e53d771089aba86ed92479018d68d31c9d66cb9816e3'
  }

  /**
   *  A set of blocked farmers keyed by their public key.
   */
  async getAsV3(key: Uint8Array): Promise<null | undefined> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Subspace', 'BlockList', key)
  }

  async getManyAsV3(keys: Uint8Array[]): Promise<(null | undefined)[]> {
    assert(this.isV3)
    return this._chain.queryStorage(this.blockHash, 'Subspace', 'BlockList', keys.map(k => [k]))
  }

  async getAllAsV3(): Promise<(null)[]> {
    assert(this.isV3)
    return this._chain.queryStorage(this.blockHash, 'Subspace', 'BlockList')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Subspace', 'BlockList') != null
  }
}

export class SubspaceCounterForRecordsRootStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   * Counter for the related counted storage map
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('Subspace', 'CounterForRecordsRoot') === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
  }

  /**
   * Counter for the related counted storage map
   */
  async getAsV3(): Promise<number> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Subspace', 'CounterForRecordsRoot')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Subspace', 'CounterForRecordsRoot') != null
  }
}

export class SubspaceCurrentBlockAuthorInfoStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Temporary value (cleared at block finalization) with block author information.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('Subspace', 'CurrentBlockAuthorInfo') === '5f9396721380c424eb16f4b73fd10f9a2357b8dd41849bfbdf5027ac738ba723'
  }

  /**
   *  Temporary value (cleared at block finalization) with block author information.
   */
  async getAsV3(): Promise<[Uint8Array, bigint, Uint8Array] | undefined> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Subspace', 'CurrentBlockAuthorInfo')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Subspace', 'CurrentBlockAuthorInfo') != null
  }
}

export class SubspaceCurrentBlockVotersStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Temporary value (cleared at block finalization) with voters in the current block thus far.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('Subspace', 'CurrentBlockVoters') === '75ecbd1fb33fd6400e82c2bdecb7e842ec80aa1debc6383f1d37addce5e445fa'
  }

  /**
   *  Temporary value (cleared at block finalization) with voters in the current block thus far.
   */
  async getAsV3(): Promise<[[Uint8Array, bigint], [Uint8Array, Uint8Array]][] | undefined> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Subspace', 'CurrentBlockVoters')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Subspace', 'CurrentBlockVoters') != null
  }
}

export class SubspaceCurrentSlotStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Current slot number.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('Subspace', 'CurrentSlot') === '95ff4f914f08e149ddbe1ae2dcb1743bbf9aaae69d04c486e1a398cacfcca06a'
  }

  /**
   *  Current slot number.
   */
  async getAsV3(): Promise<bigint> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Subspace', 'CurrentSlot')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Subspace', 'CurrentSlot') != null
  }
}

export class SubspaceEnableRewardsStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Enable rewards since specified block number.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('Subspace', 'EnableRewards') === 'a926ad48d1a07d1162c5fdb99f3f6cef39c7c5a115a92ff9ccf0357bae4bf2ed'
  }

  /**
   *  Enable rewards since specified block number.
   */
  async getAsV3(): Promise<number | undefined> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Subspace', 'EnableRewards')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Subspace', 'EnableRewards') != null
  }
}

export class SubspaceEonIndexStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Current eon index.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('Subspace', 'EonIndex') === '95ff4f914f08e149ddbe1ae2dcb1743bbf9aaae69d04c486e1a398cacfcca06a'
  }

  /**
   *  Current eon index.
   */
  async getAsV3(): Promise<bigint> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Subspace', 'EonIndex')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Subspace', 'EonIndex') != null
  }
}

export class SubspaceEraStartSlotStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Slot at which current era started.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('Subspace', 'EraStartSlot') === 'd3f0e4c96dad8d73df3c44f02993a46a9ed2eed15208047c7d80882af09d67cc'
  }

  /**
   *  Slot at which current era started.
   */
  async getAsV3(): Promise<bigint | undefined> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Subspace', 'EraStartSlot')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Subspace', 'EraStartSlot') != null
  }
}

export class SubspaceGenesisSlotStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  The slot at which the first block was created. This is 0 until the first block of the chain.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('Subspace', 'GenesisSlot') === '95ff4f914f08e149ddbe1ae2dcb1743bbf9aaae69d04c486e1a398cacfcca06a'
  }

  /**
   *  The slot at which the first block was created. This is 0 until the first block of the chain.
   */
  async getAsV3(): Promise<bigint> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Subspace', 'GenesisSlot')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Subspace', 'GenesisSlot') != null
  }
}

export class SubspaceGlobalRandomnessesStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Global randomnesses derived from from PoR signature and used for deriving global challenges.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('Subspace', 'GlobalRandomnesses') === 'bd660e3e2e452a3c4ad8981d49862a3c5b75d79eb110a767554b3a53713dbcb0'
  }

  /**
   *  Global randomnesses derived from from PoR signature and used for deriving global challenges.
   */
  async getAsV3(): Promise<v3.GlobalRandomnesses> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Subspace', 'GlobalRandomnesses')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Subspace', 'GlobalRandomnesses') != null
  }
}

export class SubspaceIsStorageAccessEnabledStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Enable storage access for all users.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('Subspace', 'IsStorageAccessEnabled') === '1b6fbf1674d189f761a7ac63093bf5c755bf073dd9d9f0dbe657289f92575db5'
  }

  /**
   *  Enable storage access for all users.
   */
  async getAsV3(): Promise<boolean> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Subspace', 'IsStorageAccessEnabled')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Subspace', 'IsStorageAccessEnabled') != null
  }
}

export class SubspaceMaxPlotSizeStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Maximum plot size in bytes.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('Subspace', 'MaxPlotSize') === '95ff4f914f08e149ddbe1ae2dcb1743bbf9aaae69d04c486e1a398cacfcca06a'
  }

  /**
   *  Maximum plot size in bytes.
   */
  async getAsV3(): Promise<bigint> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Subspace', 'MaxPlotSize')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Subspace', 'MaxPlotSize') != null
  }
}

export class SubspaceNextSolutionRangeOverrideStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Override solution range during next update
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('Subspace', 'NextSolutionRangeOverride') === 'f85e5ab5a15931a03e24612ba0bf8cf561a07fe4000dd0746217e69abf3310c7'
  }

  /**
   *  Override solution range during next update
   */
  async getAsV3(): Promise<v3.SolutionRangeOverride | undefined> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Subspace', 'NextSolutionRangeOverride')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Subspace', 'NextSolutionRangeOverride') != null
  }
}

export class SubspaceParentBlockAuthorInfoStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Parent block author information.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('Subspace', 'ParentBlockAuthorInfo') === 'eef48e2beeab80ebf1ff831f480a1b85b9ee8c173fc7ec23254ac7f00f4ea352'
  }

  /**
   *  Parent block author information.
   */
  async getAsV3(): Promise<[Uint8Array, bigint] | undefined> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Subspace', 'ParentBlockAuthorInfo')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Subspace', 'ParentBlockAuthorInfo') != null
  }
}

export class SubspaceParentBlockVotersStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Voters in the parent block (set at the end of the block with current values).
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('Subspace', 'ParentBlockVoters') === '92ac331501fc84f9accbed56a3b3bcff3df2ff6d22ecbfc79eaff64b71d2c269'
  }

  /**
   *  Voters in the parent block (set at the end of the block with current values).
   */
  async getAsV3(): Promise<[[Uint8Array, bigint], [Uint8Array, Uint8Array]][]> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Subspace', 'ParentBlockVoters')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Subspace', 'ParentBlockVoters') != null
  }
}

export class SubspaceParentVoteVerificationDataStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Storage of previous vote verification data, updated on each block during finalization.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('Subspace', 'ParentVoteVerificationData') === '05fcde189d29f5ea2976e73c9546b694f059a4954374b5d892a263fefcaeeca4'
  }

  /**
   *  Storage of previous vote verification data, updated on each block during finalization.
   */
  async getAsV3(): Promise<v3.VoteVerificationData | undefined> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Subspace', 'ParentVoteVerificationData')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Subspace', 'ParentVoteVerificationData') != null
  }
}

export class SubspacePorRandomnessStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Temporary value (cleared at block finalization) which contains current block PoR randomness.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('Subspace', 'PorRandomness') === '8620bdc4f360add1f8e58e488bdba4fa9b6dab86ecdd1c942b8d9de43ede38e5'
  }

  /**
   *  Temporary value (cleared at block finalization) which contains current block PoR randomness.
   */
  async getAsV3(): Promise<Uint8Array | undefined> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Subspace', 'PorRandomness')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Subspace', 'PorRandomness') != null
  }
}

export class SubspaceRecordsRootStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Mapping from segment index to corresponding merkle tree root of segment records.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('Subspace', 'RecordsRoot') === 'ffc087e1323413e73a9729e444bf115bb89bc74cab9f4347c9dc890a14ae8d68'
  }

  /**
   *  Mapping from segment index to corresponding merkle tree root of segment records.
   */
  async getAsV3(key: bigint): Promise<Uint8Array | undefined> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Subspace', 'RecordsRoot', key)
  }

  async getManyAsV3(keys: bigint[]): Promise<(Uint8Array | undefined)[]> {
    assert(this.isV3)
    return this._chain.queryStorage(this.blockHash, 'Subspace', 'RecordsRoot', keys.map(k => [k]))
  }

  async getAllAsV3(): Promise<(Uint8Array)[]> {
    assert(this.isV3)
    return this._chain.queryStorage(this.blockHash, 'Subspace', 'RecordsRoot')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Subspace', 'RecordsRoot') != null
  }
}

export class SubspaceRootPlotPublicKeyStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Root plot public key.
   * 
   *  Set just once to make sure no one else can author blocks until allowed for anyone.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('Subspace', 'RootPlotPublicKey') === '8620bdc4f360add1f8e58e488bdba4fa9b6dab86ecdd1c942b8d9de43ede38e5'
  }

  /**
   *  Root plot public key.
   * 
   *  Set just once to make sure no one else can author blocks until allowed for anyone.
   */
  async getAsV3(): Promise<Uint8Array | undefined> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Subspace', 'RootPlotPublicKey')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Subspace', 'RootPlotPublicKey') != null
  }
}

export class SubspaceSaltsStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Salts used for challenges.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('Subspace', 'Salts') === 'fd499d49189ae51246a6ae3fd7ecaa2f8dd5c13e91da156bd92f5b659f3cd113'
  }

  /**
   *  Salts used for challenges.
   */
  async getAsV3(): Promise<v3.Salts> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Subspace', 'Salts')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Subspace', 'Salts') != null
  }
}

export class SubspaceShouldAdjustSolutionRangeStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Storage to check if the solution range is to be adjusted for next era
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('Subspace', 'ShouldAdjustSolutionRange') === '1b6fbf1674d189f761a7ac63093bf5c755bf073dd9d9f0dbe657289f92575db5'
  }

  /**
   *  Storage to check if the solution range is to be adjusted for next era
   */
  async getAsV3(): Promise<boolean> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Subspace', 'ShouldAdjustSolutionRange')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Subspace', 'ShouldAdjustSolutionRange') != null
  }
}

export class SubspaceSolutionRangesStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Solution ranges used for challenges.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('Subspace', 'SolutionRanges') === 'cae747bc9f17b3b0f1380a81f908e1762006357df74c193ce4e62a53bc8a5442'
  }

  /**
   *  Solution ranges used for challenges.
   */
  async getAsV3(): Promise<v3.SolutionRanges> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Subspace', 'SolutionRanges')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Subspace', 'SolutionRanges') != null
  }
}

export class SudoKeyStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  The `AccountId` of the sudo key.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('Sudo', 'Key') === '8620bdc4f360add1f8e58e488bdba4fa9b6dab86ecdd1c942b8d9de43ede38e5'
  }

  /**
   *  The `AccountId` of the sudo key.
   */
  async getAsV3(): Promise<Uint8Array | undefined> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Sudo', 'Key')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Sudo', 'Key') != null
  }
}

export class SystemAccountStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  The full account information for a particular account ID.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('System', 'Account') === '1ddc7ade926221442c388ee4405a71c9428e548fab037445aaf4b3a78f4735c1'
  }

  /**
   *  The full account information for a particular account ID.
   */
  async getAsV3(key: Uint8Array): Promise<v3.AccountInfo> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'System', 'Account', key)
  }

  async getManyAsV3(keys: Uint8Array[]): Promise<(v3.AccountInfo)[]> {
    assert(this.isV3)
    return this._chain.queryStorage(this.blockHash, 'System', 'Account', keys.map(k => [k]))
  }

  async getAllAsV3(): Promise<(v3.AccountInfo)[]> {
    assert(this.isV3)
    return this._chain.queryStorage(this.blockHash, 'System', 'Account')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('System', 'Account') != null
  }
}

export class SystemAllExtrinsicsLenStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Total length (in bytes) for all extrinsics put together, for the current block.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('System', 'AllExtrinsicsLen') === 'a926ad48d1a07d1162c5fdb99f3f6cef39c7c5a115a92ff9ccf0357bae4bf2ed'
  }

  /**
   *  Total length (in bytes) for all extrinsics put together, for the current block.
   */
  async getAsV3(): Promise<number | undefined> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'System', 'AllExtrinsicsLen')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('System', 'AllExtrinsicsLen') != null
  }
}

export class SystemBlockHashStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Map of block numbers to block hashes.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('System', 'BlockHash') === '06f5703796027f4b198d4ffd50b721273430d8ff663660646793873168f9df17'
  }

  /**
   *  Map of block numbers to block hashes.
   */
  async getAsV3(key: number): Promise<Uint8Array> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'System', 'BlockHash', key)
  }

  async getManyAsV3(keys: number[]): Promise<(Uint8Array)[]> {
    assert(this.isV3)
    return this._chain.queryStorage(this.blockHash, 'System', 'BlockHash', keys.map(k => [k]))
  }

  async getAllAsV3(): Promise<(Uint8Array)[]> {
    assert(this.isV3)
    return this._chain.queryStorage(this.blockHash, 'System', 'BlockHash')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('System', 'BlockHash') != null
  }
}

export class SystemBlockWeightStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  The current weight for the block.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('System', 'BlockWeight') === '3117e920c869758010946f61bdfb045561b02a263bdc3bcff42e4ce915e4e5d4'
  }

  /**
   *  The current weight for the block.
   */
  async getAsV3(): Promise<v3.PerDispatchClass> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'System', 'BlockWeight')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('System', 'BlockWeight') != null
  }
}

export class SystemDigestStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Digest of the current block, also part of the block header.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('System', 'Digest') === '6edb48fd53810bda6cc1015d69e4aacd63966970836398edb4a47cec0bf3fa85'
  }

  /**
   *  Digest of the current block, also part of the block header.
   */
  async getAsV3(): Promise<v3.Digest> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'System', 'Digest')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('System', 'Digest') != null
  }
}

export class SystemEventCountStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  The number of events in the `Events<T>` list.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('System', 'EventCount') === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
  }

  /**
   *  The number of events in the `Events<T>` list.
   */
  async getAsV3(): Promise<number> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'System', 'EventCount')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('System', 'EventCount') != null
  }
}

export class SystemEventTopicsStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
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
  get isV3() {
    return this._chain.getStorageItemTypeHash('System', 'EventTopics') === 'd5ef37ba3daec264a9dcba5a29bf5b2ff23eb80b912936f924f44a8db557c58d'
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
  async getAsV3(key: Uint8Array): Promise<[number, number][]> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'System', 'EventTopics', key)
  }

  async getManyAsV3(keys: Uint8Array[]): Promise<([number, number][])[]> {
    assert(this.isV3)
    return this._chain.queryStorage(this.blockHash, 'System', 'EventTopics', keys.map(k => [k]))
  }

  async getAllAsV3(): Promise<([number, number][])[]> {
    assert(this.isV3)
    return this._chain.queryStorage(this.blockHash, 'System', 'EventTopics')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('System', 'EventTopics') != null
  }
}

export class SystemEventsStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
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
  get isV3() {
    return this._chain.getStorageItemTypeHash('System', 'Events') === '076bedf07ae65743e79a1c11b99400db0f6ca67efbede767b8d014f24769b68f'
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
  async getAsV3(): Promise<v3.EventRecord[]> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'System', 'Events')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('System', 'Events') != null
  }
}

export class SystemExecutionPhaseStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  The execution phase of the block.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('System', 'ExecutionPhase') === '0ad1e323fa21971add5b3b0cc709a6e02dc7c64db7d344c1a67ec0227969ae75'
  }

  /**
   *  The execution phase of the block.
   */
  async getAsV3(): Promise<v3.Phase | undefined> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'System', 'ExecutionPhase')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('System', 'ExecutionPhase') != null
  }
}

export class SystemExtrinsicCountStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Total extrinsics count for the current block.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('System', 'ExtrinsicCount') === 'a926ad48d1a07d1162c5fdb99f3f6cef39c7c5a115a92ff9ccf0357bae4bf2ed'
  }

  /**
   *  Total extrinsics count for the current block.
   */
  async getAsV3(): Promise<number | undefined> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'System', 'ExtrinsicCount')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('System', 'ExtrinsicCount') != null
  }
}

export class SystemExtrinsicDataStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Extrinsics data for the current block (maps an extrinsic's index to its data).
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('System', 'ExtrinsicData') === 'f278d7d239e9ac4cbb0509cc885124fd45c3f5b75452aba0391701e1a886debb'
  }

  /**
   *  Extrinsics data for the current block (maps an extrinsic's index to its data).
   */
  async getAsV3(key: number): Promise<Uint8Array> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'System', 'ExtrinsicData', key)
  }

  async getManyAsV3(keys: number[]): Promise<(Uint8Array)[]> {
    assert(this.isV3)
    return this._chain.queryStorage(this.blockHash, 'System', 'ExtrinsicData', keys.map(k => [k]))
  }

  async getAllAsV3(): Promise<(Uint8Array)[]> {
    assert(this.isV3)
    return this._chain.queryStorage(this.blockHash, 'System', 'ExtrinsicData')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('System', 'ExtrinsicData') != null
  }
}

export class SystemLastRuntimeUpgradeStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Stores the `spec_version` and `spec_name` of when the last runtime upgrade happened.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('System', 'LastRuntimeUpgrade') === 'e03e445e7a7694163bede3a772a8a347abf7a3a00424fbafec75f819d6173a17'
  }

  /**
   *  Stores the `spec_version` and `spec_name` of when the last runtime upgrade happened.
   */
  async getAsV3(): Promise<v3.LastRuntimeUpgradeInfo | undefined> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'System', 'LastRuntimeUpgrade')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('System', 'LastRuntimeUpgrade') != null
  }
}

export class SystemNumberStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  The current block number being processed. Set by `execute_block`.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('System', 'Number') === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
  }

  /**
   *  The current block number being processed. Set by `execute_block`.
   */
  async getAsV3(): Promise<number> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'System', 'Number')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('System', 'Number') != null
  }
}

export class SystemParentHashStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Hash of the previous block.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('System', 'ParentHash') === '146c0d1dce070e2a43f497c479248a882f4ed48937203ea336e85dcf2fa0ec6c'
  }

  /**
   *  Hash of the previous block.
   */
  async getAsV3(): Promise<Uint8Array> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'System', 'ParentHash')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('System', 'ParentHash') != null
  }
}

export class SystemUpgradedToTripleRefCountStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  True if we have upgraded so that AccountInfo contains three types of `RefCount`. False
   *  (default) if not.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('System', 'UpgradedToTripleRefCount') === '1b6fbf1674d189f761a7ac63093bf5c755bf073dd9d9f0dbe657289f92575db5'
  }

  /**
   *  True if we have upgraded so that AccountInfo contains three types of `RefCount`. False
   *  (default) if not.
   */
  async getAsV3(): Promise<boolean> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'System', 'UpgradedToTripleRefCount')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('System', 'UpgradedToTripleRefCount') != null
  }
}

export class SystemUpgradedToU32RefCountStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  True if we have upgraded so that `type RefCount` is `u32`. False (default) if not.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('System', 'UpgradedToU32RefCount') === '1b6fbf1674d189f761a7ac63093bf5c755bf073dd9d9f0dbe657289f92575db5'
  }

  /**
   *  True if we have upgraded so that `type RefCount` is `u32`. False (default) if not.
   */
  async getAsV3(): Promise<boolean> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'System', 'UpgradedToU32RefCount')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('System', 'UpgradedToU32RefCount') != null
  }
}

export class TimestampDidUpdateStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Did the timestamp get updated in this block?
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('Timestamp', 'DidUpdate') === '1b6fbf1674d189f761a7ac63093bf5c755bf073dd9d9f0dbe657289f92575db5'
  }

  /**
   *  Did the timestamp get updated in this block?
   */
  async getAsV3(): Promise<boolean> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Timestamp', 'DidUpdate')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Timestamp', 'DidUpdate') != null
  }
}

export class TimestampNowStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Current time for the current block.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('Timestamp', 'Now') === '95ff4f914f08e149ddbe1ae2dcb1743bbf9aaae69d04c486e1a398cacfcca06a'
  }

  /**
   *  Current time for the current block.
   */
  async getAsV3(): Promise<bigint> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Timestamp', 'Now')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Timestamp', 'Now') != null
  }
}

export class TransactionFeesBlockAuthorStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Temporary value (cleared at block finalization) which contains current block author, so we
   *  can issue rewards during block finalization.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('TransactionFees', 'BlockAuthor') === '8620bdc4f360add1f8e58e488bdba4fa9b6dab86ecdd1c942b8d9de43ede38e5'
  }

  /**
   *  Temporary value (cleared at block finalization) which contains current block author, so we
   *  can issue rewards during block finalization.
   */
  async getAsV3(): Promise<Uint8Array | undefined> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'TransactionFees', 'BlockAuthor')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('TransactionFees', 'BlockAuthor') != null
  }
}

export class TransactionFeesCollectedBlockFeesStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Temporary value (cleared at block finalization) which contains current block fees, so we can
   *  issue rewards during block finalization.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('TransactionFees', 'CollectedBlockFees') === '28bed10d043b0c0b43024ee27d2e27a94df5258f8505d99a50db02806087f15a'
  }

  /**
   *  Temporary value (cleared at block finalization) which contains current block fees, so we can
   *  issue rewards during block finalization.
   */
  async getAsV3(): Promise<v3.CollectedFees | undefined> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'TransactionFees', 'CollectedBlockFees')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('TransactionFees', 'CollectedBlockFees') != null
  }
}

export class TransactionFeesCollectedStorageFeesEscrowStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Escrow of storage fees, a portion of it is released to the block author on every block
   *  and portion of storage fees goes back into this pot.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('TransactionFees', 'CollectedStorageFeesEscrow') === 'f8ebe28eb30158172c0ccf672f7747c46a244f892d08ef2ebcbaadde34a26bc0'
  }

  /**
   *  Escrow of storage fees, a portion of it is released to the block author on every block
   *  and portion of storage fees goes back into this pot.
   */
  async getAsV3(): Promise<bigint> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'TransactionFees', 'CollectedStorageFeesEscrow')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('TransactionFees', 'CollectedStorageFeesEscrow') != null
  }
}

export class TransactionFeesTransactionByteFeeStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Temporary value (cleared at block finalization) which contains cached value of
   *  `TransactionByteFee` for current block.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('TransactionFees', 'TransactionByteFee') === '8339208fdff8cc2cbfb9fe1daa9bd886d23b8951771ccf6b00d8cb68da55bcc5'
  }

  /**
   *  Temporary value (cleared at block finalization) which contains cached value of
   *  `TransactionByteFee` for current block.
   */
  async getAsV3(): Promise<bigint | undefined> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'TransactionFees', 'TransactionByteFee')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('TransactionFees', 'TransactionByteFee') != null
  }
}

export class TransactionPaymentNextFeeMultiplierStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  get isV3() {
    return this._chain.getStorageItemTypeHash('TransactionPayment', 'NextFeeMultiplier') === 'f8ebe28eb30158172c0ccf672f7747c46a244f892d08ef2ebcbaadde34a26bc0'
  }

  async getAsV3(): Promise<bigint> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'TransactionPayment', 'NextFeeMultiplier')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('TransactionPayment', 'NextFeeMultiplier') != null
  }
}

export class TransactionPaymentStorageVersionStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  get isV3() {
    return this._chain.getStorageItemTypeHash('TransactionPayment', 'StorageVersion') === '7a0b9b43fb3e876cfa92bb4b00e569ef9a82972b0600c8a8570e064c7e3890fd'
  }

  async getAsV3(): Promise<v3.Type_128> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'TransactionPayment', 'StorageVersion')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('TransactionPayment', 'StorageVersion') != null
  }
}

export class VestingVestingSchedulesStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  Vesting schedules of an account.
   * 
   *  VestingSchedules: map AccountId => Vec<VestingSchedule>
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('Vesting', 'VestingSchedules') === 'd1025301ffa60f04c50bb1007ecb356d52103dd9c366150de1ba80c6e043ac2f'
  }

  /**
   *  Vesting schedules of an account.
   * 
   *  VestingSchedules: map AccountId => Vec<VestingSchedule>
   */
  async getAsV3(key: Uint8Array): Promise<v3.VestingSchedule[]> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Vesting', 'VestingSchedules', key)
  }

  async getManyAsV3(keys: Uint8Array[]): Promise<(v3.VestingSchedule[])[]> {
    assert(this.isV3)
    return this._chain.queryStorage(this.blockHash, 'Vesting', 'VestingSchedules', keys.map(k => [k]))
  }

  async getAllAsV3(): Promise<(v3.VestingSchedule[])[]> {
    assert(this.isV3)
    return this._chain.queryStorage(this.blockHash, 'Vesting', 'VestingSchedules')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Vesting', 'VestingSchedules') != null
  }
}
