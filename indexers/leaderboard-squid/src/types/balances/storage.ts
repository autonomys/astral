import { sts, Block, Bytes, Option, Result, StorageType, RuntimeCtx } from '../support'
import * as v0 from '../v0'
import * as v1 from '../v1'
import * as v3 from '../v3'

export const totalIssuance = {
  /**
   *  The total units issued in the system.
   */
  v0: new StorageType('Balances.TotalIssuance', 'Default', [], sts.bigint()) as TotalIssuanceV0,
}

/**
 *  The total units issued in the system.
 */
export interface TotalIssuanceV0 {
  is(block: RuntimeCtx): boolean
  getDefault(block: Block): bigint
  get(block: Block): Promise<bigint | undefined>
}

export const inactiveIssuance = {
  /**
   *  The total units of outstanding deactivated balance in the system.
   */
  v0: new StorageType(
    'Balances.InactiveIssuance',
    'Default',
    [],
    sts.bigint(),
  ) as InactiveIssuanceV0,
}

/**
 *  The total units of outstanding deactivated balance in the system.
 */
export interface InactiveIssuanceV0 {
  is(block: RuntimeCtx): boolean
  getDefault(block: Block): bigint
  get(block: Block): Promise<bigint | undefined>
}

export const account = {
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
  v0: new StorageType('Balances.Account', 'Default', [v0.AccountId32], v0.AccountData) as AccountV0,
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
export interface AccountV0 {
  is(block: RuntimeCtx): boolean
  getDefault(block: Block): v0.AccountData
  get(block: Block, key: v0.AccountId32): Promise<v0.AccountData | undefined>
  getMany(block: Block, keys: v0.AccountId32[]): Promise<(v0.AccountData | undefined)[]>
  getKeys(block: Block): Promise<v0.AccountId32[]>
  getKeys(block: Block, key: v0.AccountId32): Promise<v0.AccountId32[]>
  getKeysPaged(pageSize: number, block: Block): AsyncIterable<v0.AccountId32[]>
  getKeysPaged(pageSize: number, block: Block, key: v0.AccountId32): AsyncIterable<v0.AccountId32[]>
  getPairs(block: Block): Promise<[k: v0.AccountId32, v: v0.AccountData | undefined][]>
  getPairs(
    block: Block,
    key: v0.AccountId32,
  ): Promise<[k: v0.AccountId32, v: v0.AccountData | undefined][]>
  getPairsPaged(
    pageSize: number,
    block: Block,
  ): AsyncIterable<[k: v0.AccountId32, v: v0.AccountData | undefined][]>
  getPairsPaged(
    pageSize: number,
    block: Block,
    key: v0.AccountId32,
  ): AsyncIterable<[k: v0.AccountId32, v: v0.AccountData | undefined][]>
}

export const locks = {
  /**
   *  Any liquidity locks on some account balances.
   *  NOTE: Should only be accessed when setting, changing and freeing a lock.
   */
  v0: new StorageType(
    'Balances.Locks',
    'Default',
    [v0.AccountId32],
    sts.array(() => v0.BalanceLock),
  ) as LocksV0,
}

/**
 *  Any liquidity locks on some account balances.
 *  NOTE: Should only be accessed when setting, changing and freeing a lock.
 */
export interface LocksV0 {
  is(block: RuntimeCtx): boolean
  getDefault(block: Block): v0.BalanceLock[]
  get(block: Block, key: v0.AccountId32): Promise<v0.BalanceLock[] | undefined>
  getMany(block: Block, keys: v0.AccountId32[]): Promise<(v0.BalanceLock[] | undefined)[]>
  getKeys(block: Block): Promise<v0.AccountId32[]>
  getKeys(block: Block, key: v0.AccountId32): Promise<v0.AccountId32[]>
  getKeysPaged(pageSize: number, block: Block): AsyncIterable<v0.AccountId32[]>
  getKeysPaged(pageSize: number, block: Block, key: v0.AccountId32): AsyncIterable<v0.AccountId32[]>
  getPairs(block: Block): Promise<[k: v0.AccountId32, v: v0.BalanceLock[] | undefined][]>
  getPairs(
    block: Block,
    key: v0.AccountId32,
  ): Promise<[k: v0.AccountId32, v: v0.BalanceLock[] | undefined][]>
  getPairsPaged(
    pageSize: number,
    block: Block,
  ): AsyncIterable<[k: v0.AccountId32, v: v0.BalanceLock[] | undefined][]>
  getPairsPaged(
    pageSize: number,
    block: Block,
    key: v0.AccountId32,
  ): AsyncIterable<[k: v0.AccountId32, v: v0.BalanceLock[] | undefined][]>
}

export const reserves = {
  /**
   *  Named reserves on some account balances.
   */
  v0: new StorageType(
    'Balances.Reserves',
    'Default',
    [v0.AccountId32],
    sts.array(() => v0.ReserveData),
  ) as ReservesV0,
}

/**
 *  Named reserves on some account balances.
 */
export interface ReservesV0 {
  is(block: RuntimeCtx): boolean
  getDefault(block: Block): v0.ReserveData[]
  get(block: Block, key: v0.AccountId32): Promise<v0.ReserveData[] | undefined>
  getMany(block: Block, keys: v0.AccountId32[]): Promise<(v0.ReserveData[] | undefined)[]>
  getKeys(block: Block): Promise<v0.AccountId32[]>
  getKeys(block: Block, key: v0.AccountId32): Promise<v0.AccountId32[]>
  getKeysPaged(pageSize: number, block: Block): AsyncIterable<v0.AccountId32[]>
  getKeysPaged(pageSize: number, block: Block, key: v0.AccountId32): AsyncIterable<v0.AccountId32[]>
  getPairs(block: Block): Promise<[k: v0.AccountId32, v: v0.ReserveData[] | undefined][]>
  getPairs(
    block: Block,
    key: v0.AccountId32,
  ): Promise<[k: v0.AccountId32, v: v0.ReserveData[] | undefined][]>
  getPairsPaged(
    pageSize: number,
    block: Block,
  ): AsyncIterable<[k: v0.AccountId32, v: v0.ReserveData[] | undefined][]>
  getPairsPaged(
    pageSize: number,
    block: Block,
    key: v0.AccountId32,
  ): AsyncIterable<[k: v0.AccountId32, v: v0.ReserveData[] | undefined][]>
}

export const holds = {
  /**
   *  Holds on account balances.
   */
  v0: new StorageType(
    'Balances.Holds',
    'Default',
    [v0.AccountId32],
    sts.array(() => v0.IdAmount),
  ) as HoldsV0,
  /**
   *  Holds on account balances.
   */
  v1: new StorageType(
    'Balances.Holds',
    'Default',
    [v1.AccountId32],
    sts.array(() => v1.IdAmount),
  ) as HoldsV1,
  /**
   *  Holds on account balances.
   */
  v3: new StorageType(
    'Balances.Holds',
    'Default',
    [v3.AccountId32],
    sts.array(() => v3.IdAmount),
  ) as HoldsV3,
}

/**
 *  Holds on account balances.
 */
export interface HoldsV0 {
  is(block: RuntimeCtx): boolean
  getDefault(block: Block): v0.IdAmount[]
  get(block: Block, key: v0.AccountId32): Promise<v0.IdAmount[] | undefined>
  getMany(block: Block, keys: v0.AccountId32[]): Promise<(v0.IdAmount[] | undefined)[]>
  getKeys(block: Block): Promise<v0.AccountId32[]>
  getKeys(block: Block, key: v0.AccountId32): Promise<v0.AccountId32[]>
  getKeysPaged(pageSize: number, block: Block): AsyncIterable<v0.AccountId32[]>
  getKeysPaged(pageSize: number, block: Block, key: v0.AccountId32): AsyncIterable<v0.AccountId32[]>
  getPairs(block: Block): Promise<[k: v0.AccountId32, v: v0.IdAmount[] | undefined][]>
  getPairs(
    block: Block,
    key: v0.AccountId32,
  ): Promise<[k: v0.AccountId32, v: v0.IdAmount[] | undefined][]>
  getPairsPaged(
    pageSize: number,
    block: Block,
  ): AsyncIterable<[k: v0.AccountId32, v: v0.IdAmount[] | undefined][]>
  getPairsPaged(
    pageSize: number,
    block: Block,
    key: v0.AccountId32,
  ): AsyncIterable<[k: v0.AccountId32, v: v0.IdAmount[] | undefined][]>
}

/**
 *  Holds on account balances.
 */
export interface HoldsV1 {
  is(block: RuntimeCtx): boolean
  getDefault(block: Block): v1.IdAmount[]
  get(block: Block, key: v1.AccountId32): Promise<v1.IdAmount[] | undefined>
  getMany(block: Block, keys: v1.AccountId32[]): Promise<(v1.IdAmount[] | undefined)[]>
  getKeys(block: Block): Promise<v1.AccountId32[]>
  getKeys(block: Block, key: v1.AccountId32): Promise<v1.AccountId32[]>
  getKeysPaged(pageSize: number, block: Block): AsyncIterable<v1.AccountId32[]>
  getKeysPaged(pageSize: number, block: Block, key: v1.AccountId32): AsyncIterable<v1.AccountId32[]>
  getPairs(block: Block): Promise<[k: v1.AccountId32, v: v1.IdAmount[] | undefined][]>
  getPairs(
    block: Block,
    key: v1.AccountId32,
  ): Promise<[k: v1.AccountId32, v: v1.IdAmount[] | undefined][]>
  getPairsPaged(
    pageSize: number,
    block: Block,
  ): AsyncIterable<[k: v1.AccountId32, v: v1.IdAmount[] | undefined][]>
  getPairsPaged(
    pageSize: number,
    block: Block,
    key: v1.AccountId32,
  ): AsyncIterable<[k: v1.AccountId32, v: v1.IdAmount[] | undefined][]>
}

/**
 *  Holds on account balances.
 */
export interface HoldsV3 {
  is(block: RuntimeCtx): boolean
  getDefault(block: Block): v3.IdAmount[]
  get(block: Block, key: v3.AccountId32): Promise<v3.IdAmount[] | undefined>
  getMany(block: Block, keys: v3.AccountId32[]): Promise<(v3.IdAmount[] | undefined)[]>
  getKeys(block: Block): Promise<v3.AccountId32[]>
  getKeys(block: Block, key: v3.AccountId32): Promise<v3.AccountId32[]>
  getKeysPaged(pageSize: number, block: Block): AsyncIterable<v3.AccountId32[]>
  getKeysPaged(pageSize: number, block: Block, key: v3.AccountId32): AsyncIterable<v3.AccountId32[]>
  getPairs(block: Block): Promise<[k: v3.AccountId32, v: v3.IdAmount[] | undefined][]>
  getPairs(
    block: Block,
    key: v3.AccountId32,
  ): Promise<[k: v3.AccountId32, v: v3.IdAmount[] | undefined][]>
  getPairsPaged(
    pageSize: number,
    block: Block,
  ): AsyncIterable<[k: v3.AccountId32, v: v3.IdAmount[] | undefined][]>
  getPairsPaged(
    pageSize: number,
    block: Block,
    key: v3.AccountId32,
  ): AsyncIterable<[k: v3.AccountId32, v: v3.IdAmount[] | undefined][]>
}

export const freezes = {
  /**
   *  Freeze locks on account balances.
   */
  v0: new StorageType(
    'Balances.Freezes',
    'Default',
    [v0.AccountId32],
    sts.array(() => v0.Type_152),
  ) as FreezesV0,
}

/**
 *  Freeze locks on account balances.
 */
export interface FreezesV0 {
  is(block: RuntimeCtx): boolean
  getDefault(block: Block): v0.Type_152[]
  get(block: Block, key: v0.AccountId32): Promise<v0.Type_152[] | undefined>
  getMany(block: Block, keys: v0.AccountId32[]): Promise<(v0.Type_152[] | undefined)[]>
  getKeys(block: Block): Promise<v0.AccountId32[]>
  getKeys(block: Block, key: v0.AccountId32): Promise<v0.AccountId32[]>
  getKeysPaged(pageSize: number, block: Block): AsyncIterable<v0.AccountId32[]>
  getKeysPaged(pageSize: number, block: Block, key: v0.AccountId32): AsyncIterable<v0.AccountId32[]>
  getPairs(block: Block): Promise<[k: v0.AccountId32, v: v0.Type_152[] | undefined][]>
  getPairs(
    block: Block,
    key: v0.AccountId32,
  ): Promise<[k: v0.AccountId32, v: v0.Type_152[] | undefined][]>
  getPairsPaged(
    pageSize: number,
    block: Block,
  ): AsyncIterable<[k: v0.AccountId32, v: v0.Type_152[] | undefined][]>
  getPairsPaged(
    pageSize: number,
    block: Block,
    key: v0.AccountId32,
  ): AsyncIterable<[k: v0.AccountId32, v: v0.Type_152[] | undefined][]>
}
