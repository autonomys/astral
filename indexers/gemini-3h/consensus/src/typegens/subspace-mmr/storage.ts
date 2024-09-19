import {sts, Block, Bytes, Option, Result, StorageType, RuntimeCtx} from '../support'
import * as v5 from '../v5'

export const mmrRootHashes =  {
    /**
     *  Map of block numbers to mmr root hashes.
     */
    v5: new StorageType('SubspaceMmr.MmrRootHashes', 'Optional', [sts.number()], v5.H256) as MmrRootHashesV5,
}

/**
 *  Map of block numbers to mmr root hashes.
 */
export interface MmrRootHashesV5  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: number): Promise<(v5.H256 | undefined)>
    getMany(block: Block, keys: number[]): Promise<(v5.H256 | undefined)[]>
    getKeys(block: Block): Promise<number[]>
    getKeys(block: Block, key: number): Promise<number[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, block: Block, key: number): AsyncIterable<number[]>
    getPairs(block: Block): Promise<[k: number, v: (v5.H256 | undefined)][]>
    getPairs(block: Block, key: number): Promise<[k: number, v: (v5.H256 | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: number, v: (v5.H256 | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: number): AsyncIterable<[k: number, v: (v5.H256 | undefined)][]>
}
