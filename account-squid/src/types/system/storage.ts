import {sts, Block, Bytes, Option, Result, StorageType, RuntimeCtx} from '../support'
import * as v0 from '../v0'
import * as v1 from '../v1'

export const account =  {
    /**
     *  The full account information for a particular account ID.
     */
    v0: new StorageType('System.Account', 'Default', [v0.AccountId32], v0.AccountInfo) as AccountV0,
}

/**
 *  The full account information for a particular account ID.
 */
export interface AccountV0  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v0.AccountInfo
    get(block: Block, key: v0.AccountId32): Promise<(v0.AccountInfo | undefined)>
    getMany(block: Block, keys: v0.AccountId32[]): Promise<(v0.AccountInfo | undefined)[]>
    getKeys(block: Block): Promise<v0.AccountId32[]>
    getKeys(block: Block, key: v0.AccountId32): Promise<v0.AccountId32[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v0.AccountId32[]>
    getKeysPaged(pageSize: number, block: Block, key: v0.AccountId32): AsyncIterable<v0.AccountId32[]>
    getPairs(block: Block): Promise<[k: v0.AccountId32, v: (v0.AccountInfo | undefined)][]>
    getPairs(block: Block, key: v0.AccountId32): Promise<[k: v0.AccountId32, v: (v0.AccountInfo | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v0.AccountId32, v: (v0.AccountInfo | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v0.AccountId32): AsyncIterable<[k: v0.AccountId32, v: (v0.AccountInfo | undefined)][]>
}

export const extrinsicCount =  {
    /**
     *  Total extrinsics count for the current block.
     */
    v0: new StorageType('System.ExtrinsicCount', 'Optional', [], sts.number()) as ExtrinsicCountV0,
}

/**
 *  Total extrinsics count for the current block.
 */
export interface ExtrinsicCountV0  {
    is(block: RuntimeCtx): boolean
    get(block: Block): Promise<(number | undefined)>
}

export const blockWeight =  {
    /**
     *  The current weight for the block.
     */
    v0: new StorageType('System.BlockWeight', 'Default', [], v0.PerDispatchClass) as BlockWeightV0,
}

/**
 *  The current weight for the block.
 */
export interface BlockWeightV0  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v0.PerDispatchClass
    get(block: Block): Promise<(v0.PerDispatchClass | undefined)>
}

export const allExtrinsicsLen =  {
    /**
     *  Total length (in bytes) for all extrinsics put together, for the current block.
     */
    v0: new StorageType('System.AllExtrinsicsLen', 'Optional', [], sts.number()) as AllExtrinsicsLenV0,
}

/**
 *  Total length (in bytes) for all extrinsics put together, for the current block.
 */
export interface AllExtrinsicsLenV0  {
    is(block: RuntimeCtx): boolean
    get(block: Block): Promise<(number | undefined)>
}

export const blockHash =  {
    /**
     *  Map of block numbers to block hashes.
     */
    v0: new StorageType('System.BlockHash', 'Default', [sts.number()], v0.H256) as BlockHashV0,
}

/**
 *  Map of block numbers to block hashes.
 */
export interface BlockHashV0  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v0.H256
    get(block: Block, key: number): Promise<(v0.H256 | undefined)>
    getMany(block: Block, keys: number[]): Promise<(v0.H256 | undefined)[]>
    getKeys(block: Block): Promise<number[]>
    getKeys(block: Block, key: number): Promise<number[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, block: Block, key: number): AsyncIterable<number[]>
    getPairs(block: Block): Promise<[k: number, v: (v0.H256 | undefined)][]>
    getPairs(block: Block, key: number): Promise<[k: number, v: (v0.H256 | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: number, v: (v0.H256 | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: number): AsyncIterable<[k: number, v: (v0.H256 | undefined)][]>
}

export const extrinsicData =  {
    /**
     *  Extrinsics data for the current block (maps an extrinsic's index to its data).
     */
    v0: new StorageType('System.ExtrinsicData', 'Default', [sts.number()], sts.bytes()) as ExtrinsicDataV0,
}

/**
 *  Extrinsics data for the current block (maps an extrinsic's index to its data).
 */
export interface ExtrinsicDataV0  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): Bytes
    get(block: Block, key: number): Promise<(Bytes | undefined)>
    getMany(block: Block, keys: number[]): Promise<(Bytes | undefined)[]>
    getKeys(block: Block): Promise<number[]>
    getKeys(block: Block, key: number): Promise<number[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, block: Block, key: number): AsyncIterable<number[]>
    getPairs(block: Block): Promise<[k: number, v: (Bytes | undefined)][]>
    getPairs(block: Block, key: number): Promise<[k: number, v: (Bytes | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: number, v: (Bytes | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: number): AsyncIterable<[k: number, v: (Bytes | undefined)][]>
}

export const number =  {
    /**
     *  The current block number being processed. Set by `execute_block`.
     */
    v0: new StorageType('System.Number', 'Default', [], sts.number()) as NumberV0,
}

/**
 *  The current block number being processed. Set by `execute_block`.
 */
export interface NumberV0  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): number
    get(block: Block): Promise<(number | undefined)>
}

export const parentHash =  {
    /**
     *  Hash of the previous block.
     */
    v0: new StorageType('System.ParentHash', 'Default', [], v0.H256) as ParentHashV0,
}

/**
 *  Hash of the previous block.
 */
export interface ParentHashV0  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v0.H256
    get(block: Block): Promise<(v0.H256 | undefined)>
}

export const digest =  {
    /**
     *  Digest of the current block, also part of the block header.
     */
    v0: new StorageType('System.Digest', 'Default', [], v0.Digest) as DigestV0,
}

/**
 *  Digest of the current block, also part of the block header.
 */
export interface DigestV0  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v0.Digest
    get(block: Block): Promise<(v0.Digest | undefined)>
}

export const events =  {
    /**
     *  Events deposited for the current block.
     * 
     *  NOTE: The item is unbound and should therefore never be read on chain.
     *  It could otherwise inflate the PoV size of a block.
     * 
     *  Events have a large in-memory size. Box the events to not go out-of-memory
     *  just in case someone still reads them from within the runtime.
     */
    v0: new StorageType('System.Events', 'Default', [], sts.array(() => v0.EventRecord)) as EventsV0,
    /**
     *  Events deposited for the current block.
     * 
     *  NOTE: The item is unbound and should therefore never be read on chain.
     *  It could otherwise inflate the PoV size of a block.
     * 
     *  Events have a large in-memory size. Box the events to not go out-of-memory
     *  just in case someone still reads them from within the runtime.
     */
    v1: new StorageType('System.Events', 'Default', [], sts.array(() => v1.EventRecord)) as EventsV1,
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
export interface EventsV0  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v0.EventRecord[]
    get(block: Block): Promise<(v0.EventRecord[] | undefined)>
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
export interface EventsV1  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v1.EventRecord[]
    get(block: Block): Promise<(v1.EventRecord[] | undefined)>
}

export const eventCount =  {
    /**
     *  The number of events in the `Events<T>` list.
     */
    v0: new StorageType('System.EventCount', 'Default', [], sts.number()) as EventCountV0,
}

/**
 *  The number of events in the `Events<T>` list.
 */
export interface EventCountV0  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): number
    get(block: Block): Promise<(number | undefined)>
}

export const eventTopics =  {
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
    v0: new StorageType('System.EventTopics', 'Default', [v0.H256], sts.array(() => sts.tuple(() => [sts.number(), sts.number()]))) as EventTopicsV0,
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
export interface EventTopicsV0  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): [number, number][]
    get(block: Block, key: v0.H256): Promise<([number, number][] | undefined)>
    getMany(block: Block, keys: v0.H256[]): Promise<([number, number][] | undefined)[]>
    getKeys(block: Block): Promise<v0.H256[]>
    getKeys(block: Block, key: v0.H256): Promise<v0.H256[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v0.H256[]>
    getKeysPaged(pageSize: number, block: Block, key: v0.H256): AsyncIterable<v0.H256[]>
    getPairs(block: Block): Promise<[k: v0.H256, v: ([number, number][] | undefined)][]>
    getPairs(block: Block, key: v0.H256): Promise<[k: v0.H256, v: ([number, number][] | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v0.H256, v: ([number, number][] | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v0.H256): AsyncIterable<[k: v0.H256, v: ([number, number][] | undefined)][]>
}

export const lastRuntimeUpgrade =  {
    /**
     *  Stores the `spec_version` and `spec_name` of when the last runtime upgrade happened.
     */
    v0: new StorageType('System.LastRuntimeUpgrade', 'Optional', [], v0.LastRuntimeUpgradeInfo) as LastRuntimeUpgradeV0,
}

/**
 *  Stores the `spec_version` and `spec_name` of when the last runtime upgrade happened.
 */
export interface LastRuntimeUpgradeV0  {
    is(block: RuntimeCtx): boolean
    get(block: Block): Promise<(v0.LastRuntimeUpgradeInfo | undefined)>
}

export const upgradedToU32RefCount =  {
    /**
     *  True if we have upgraded so that `type RefCount` is `u32`. False (default) if not.
     */
    v0: new StorageType('System.UpgradedToU32RefCount', 'Default', [], sts.boolean()) as UpgradedToU32RefCountV0,
}

/**
 *  True if we have upgraded so that `type RefCount` is `u32`. False (default) if not.
 */
export interface UpgradedToU32RefCountV0  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): boolean
    get(block: Block): Promise<(boolean | undefined)>
}

export const upgradedToTripleRefCount =  {
    /**
     *  True if we have upgraded so that AccountInfo contains three types of `RefCount`. False
     *  (default) if not.
     */
    v0: new StorageType('System.UpgradedToTripleRefCount', 'Default', [], sts.boolean()) as UpgradedToTripleRefCountV0,
}

/**
 *  True if we have upgraded so that AccountInfo contains three types of `RefCount`. False
 *  (default) if not.
 */
export interface UpgradedToTripleRefCountV0  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): boolean
    get(block: Block): Promise<(boolean | undefined)>
}

export const executionPhase =  {
    /**
     *  The execution phase of the block.
     */
    v0: new StorageType('System.ExecutionPhase', 'Optional', [], v0.Phase) as ExecutionPhaseV0,
}

/**
 *  The execution phase of the block.
 */
export interface ExecutionPhaseV0  {
    is(block: RuntimeCtx): boolean
    get(block: Block): Promise<(v0.Phase | undefined)>
}

export const authorizedUpgrade =  {
    /**
     *  `Some` if a code upgrade has been authorized.
     */
    v0: new StorageType('System.AuthorizedUpgrade', 'Optional', [], v0.CodeUpgradeAuthorization) as AuthorizedUpgradeV0,
}

/**
 *  `Some` if a code upgrade has been authorized.
 */
export interface AuthorizedUpgradeV0  {
    is(block: RuntimeCtx): boolean
    get(block: Block): Promise<(v0.CodeUpgradeAuthorization | undefined)>
}
