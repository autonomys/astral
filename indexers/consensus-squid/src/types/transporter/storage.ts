import { sts, Block, Bytes, Option, Result, StorageType, RuntimeCtx } from '../support'
import * as v0 from '../v0'
import * as v1 from '../v1'

export const outgoingTransfers = {
  /**
   *  All the outgoing transfers on this execution environment.
   */
  v0: new StorageType(
    'Transporter.OutgoingTransfers',
    'Optional',
    [v0.ChainId, sts.tuple(() => [sts.bigint(), sts.bigint()])],
    v0.Transfer,
  ) as OutgoingTransfersV0,
}

/**
 *  All the outgoing transfers on this execution environment.
 */
export interface OutgoingTransfersV0 {
  is(block: RuntimeCtx): boolean
  get(block: Block, key1: v0.ChainId, key2: [bigint, bigint]): Promise<v0.Transfer | undefined>
  getMany(
    block: Block,
    keys: [v0.ChainId, [bigint, bigint]][],
  ): Promise<(v0.Transfer | undefined)[]>
  getKeys(block: Block): Promise<[v0.ChainId, [bigint, bigint]][]>
  getKeys(block: Block, key1: v0.ChainId): Promise<[v0.ChainId, [bigint, bigint]][]>
  getKeys(
    block: Block,
    key1: v0.ChainId,
    key2: [bigint, bigint],
  ): Promise<[v0.ChainId, [bigint, bigint]][]>
  getKeysPaged(pageSize: number, block: Block): AsyncIterable<[v0.ChainId, [bigint, bigint]][]>
  getKeysPaged(
    pageSize: number,
    block: Block,
    key1: v0.ChainId,
  ): AsyncIterable<[v0.ChainId, [bigint, bigint]][]>
  getKeysPaged(
    pageSize: number,
    block: Block,
    key1: v0.ChainId,
    key2: [bigint, bigint],
  ): AsyncIterable<[v0.ChainId, [bigint, bigint]][]>
  getPairs(block: Block): Promise<[k: [v0.ChainId, [bigint, bigint]], v: v0.Transfer | undefined][]>
  getPairs(
    block: Block,
    key1: v0.ChainId,
  ): Promise<[k: [v0.ChainId, [bigint, bigint]], v: v0.Transfer | undefined][]>
  getPairs(
    block: Block,
    key1: v0.ChainId,
    key2: [bigint, bigint],
  ): Promise<[k: [v0.ChainId, [bigint, bigint]], v: v0.Transfer | undefined][]>
  getPairsPaged(
    pageSize: number,
    block: Block,
  ): AsyncIterable<[k: [v0.ChainId, [bigint, bigint]], v: v0.Transfer | undefined][]>
  getPairsPaged(
    pageSize: number,
    block: Block,
    key1: v0.ChainId,
  ): AsyncIterable<[k: [v0.ChainId, [bigint, bigint]], v: v0.Transfer | undefined][]>
  getPairsPaged(
    pageSize: number,
    block: Block,
    key1: v0.ChainId,
    key2: [bigint, bigint],
  ): AsyncIterable<[k: [v0.ChainId, [bigint, bigint]], v: v0.Transfer | undefined][]>
}

export const domainBalances = {
  /**
   *  Domain balances.
   */
  v1: new StorageType(
    'Transporter.DomainBalances',
    'Default',
    [v1.DomainId],
    sts.bigint(),
  ) as DomainBalancesV1,
}

/**
 *  Domain balances.
 */
export interface DomainBalancesV1 {
  is(block: RuntimeCtx): boolean
  getDefault(block: Block): bigint
  get(block: Block, key: v1.DomainId): Promise<bigint | undefined>
  getMany(block: Block, keys: v1.DomainId[]): Promise<(bigint | undefined)[]>
  getKeys(block: Block): Promise<v1.DomainId[]>
  getKeys(block: Block, key: v1.DomainId): Promise<v1.DomainId[]>
  getKeysPaged(pageSize: number, block: Block): AsyncIterable<v1.DomainId[]>
  getKeysPaged(pageSize: number, block: Block, key: v1.DomainId): AsyncIterable<v1.DomainId[]>
  getPairs(block: Block): Promise<[k: v1.DomainId, v: bigint | undefined][]>
  getPairs(block: Block, key: v1.DomainId): Promise<[k: v1.DomainId, v: bigint | undefined][]>
  getPairsPaged(
    pageSize: number,
    block: Block,
  ): AsyncIterable<[k: v1.DomainId, v: bigint | undefined][]>
  getPairsPaged(
    pageSize: number,
    block: Block,
    key: v1.DomainId,
  ): AsyncIterable<[k: v1.DomainId, v: bigint | undefined][]>
}

export const chainTransfers = {
  /**
   *  A temporary storage that tracks total transfers from this chain.
   *  Clears on on_initialize for every block.
   */
  v1: new StorageType(
    'Transporter.ChainTransfers',
    'Default',
    [],
    v1.Transfers,
  ) as ChainTransfersV1,
}

/**
 *  A temporary storage that tracks total transfers from this chain.
 *  Clears on on_initialize for every block.
 */
export interface ChainTransfersV1 {
  is(block: RuntimeCtx): boolean
  getDefault(block: Block): v1.Transfers
  get(block: Block): Promise<v1.Transfers | undefined>
}

export const unconfirmedTransfers = {
  /**
   *  Storage to track unconfirmed transfers between different chains.
   */
  v1: new StorageType(
    'Transporter.UnconfirmedTransfers',
    'Default',
    [v1.ChainId, v1.ChainId],
    sts.bigint(),
  ) as UnconfirmedTransfersV1,
}

/**
 *  Storage to track unconfirmed transfers between different chains.
 */
export interface UnconfirmedTransfersV1 {
  is(block: RuntimeCtx): boolean
  getDefault(block: Block): bigint
  get(block: Block, key1: v1.ChainId, key2: v1.ChainId): Promise<bigint | undefined>
  getMany(block: Block, keys: [v1.ChainId, v1.ChainId][]): Promise<(bigint | undefined)[]>
  getKeys(block: Block): Promise<[v1.ChainId, v1.ChainId][]>
  getKeys(block: Block, key1: v1.ChainId): Promise<[v1.ChainId, v1.ChainId][]>
  getKeys(block: Block, key1: v1.ChainId, key2: v1.ChainId): Promise<[v1.ChainId, v1.ChainId][]>
  getKeysPaged(pageSize: number, block: Block): AsyncIterable<[v1.ChainId, v1.ChainId][]>
  getKeysPaged(
    pageSize: number,
    block: Block,
    key1: v1.ChainId,
  ): AsyncIterable<[v1.ChainId, v1.ChainId][]>
  getKeysPaged(
    pageSize: number,
    block: Block,
    key1: v1.ChainId,
    key2: v1.ChainId,
  ): AsyncIterable<[v1.ChainId, v1.ChainId][]>
  getPairs(block: Block): Promise<[k: [v1.ChainId, v1.ChainId], v: bigint | undefined][]>
  getPairs(
    block: Block,
    key1: v1.ChainId,
  ): Promise<[k: [v1.ChainId, v1.ChainId], v: bigint | undefined][]>
  getPairs(
    block: Block,
    key1: v1.ChainId,
    key2: v1.ChainId,
  ): Promise<[k: [v1.ChainId, v1.ChainId], v: bigint | undefined][]>
  getPairsPaged(
    pageSize: number,
    block: Block,
  ): AsyncIterable<[k: [v1.ChainId, v1.ChainId], v: bigint | undefined][]>
  getPairsPaged(
    pageSize: number,
    block: Block,
    key1: v1.ChainId,
  ): AsyncIterable<[k: [v1.ChainId, v1.ChainId], v: bigint | undefined][]>
  getPairsPaged(
    pageSize: number,
    block: Block,
    key1: v1.ChainId,
    key2: v1.ChainId,
  ): AsyncIterable<[k: [v1.ChainId, v1.ChainId], v: bigint | undefined][]>
}

export const cancelledTransfers = {
  /**
   *  Storage to track cancelled transfers between different chains.
   */
  v1: new StorageType(
    'Transporter.CancelledTransfers',
    'Default',
    [v1.ChainId, v1.ChainId],
    sts.bigint(),
  ) as CancelledTransfersV1,
}

/**
 *  Storage to track cancelled transfers between different chains.
 */
export interface CancelledTransfersV1 {
  is(block: RuntimeCtx): boolean
  getDefault(block: Block): bigint
  get(block: Block, key1: v1.ChainId, key2: v1.ChainId): Promise<bigint | undefined>
  getMany(block: Block, keys: [v1.ChainId, v1.ChainId][]): Promise<(bigint | undefined)[]>
  getKeys(block: Block): Promise<[v1.ChainId, v1.ChainId][]>
  getKeys(block: Block, key1: v1.ChainId): Promise<[v1.ChainId, v1.ChainId][]>
  getKeys(block: Block, key1: v1.ChainId, key2: v1.ChainId): Promise<[v1.ChainId, v1.ChainId][]>
  getKeysPaged(pageSize: number, block: Block): AsyncIterable<[v1.ChainId, v1.ChainId][]>
  getKeysPaged(
    pageSize: number,
    block: Block,
    key1: v1.ChainId,
  ): AsyncIterable<[v1.ChainId, v1.ChainId][]>
  getKeysPaged(
    pageSize: number,
    block: Block,
    key1: v1.ChainId,
    key2: v1.ChainId,
  ): AsyncIterable<[v1.ChainId, v1.ChainId][]>
  getPairs(block: Block): Promise<[k: [v1.ChainId, v1.ChainId], v: bigint | undefined][]>
  getPairs(
    block: Block,
    key1: v1.ChainId,
  ): Promise<[k: [v1.ChainId, v1.ChainId], v: bigint | undefined][]>
  getPairs(
    block: Block,
    key1: v1.ChainId,
    key2: v1.ChainId,
  ): Promise<[k: [v1.ChainId, v1.ChainId], v: bigint | undefined][]>
  getPairsPaged(
    pageSize: number,
    block: Block,
  ): AsyncIterable<[k: [v1.ChainId, v1.ChainId], v: bigint | undefined][]>
  getPairsPaged(
    pageSize: number,
    block: Block,
    key1: v1.ChainId,
  ): AsyncIterable<[k: [v1.ChainId, v1.ChainId], v: bigint | undefined][]>
  getPairsPaged(
    pageSize: number,
    block: Block,
    key1: v1.ChainId,
    key2: v1.ChainId,
  ): AsyncIterable<[k: [v1.ChainId, v1.ChainId], v: bigint | undefined][]>
}
