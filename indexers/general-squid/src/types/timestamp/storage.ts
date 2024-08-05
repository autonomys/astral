import {sts, Block, Bytes, Option, Result, StorageType, RuntimeCtx} from '../support'

export const now =  {
    /**
     *  The current time for the current block.
     */
    v0: new StorageType('Timestamp.Now', 'Default', [], sts.bigint()) as NowV0,
}

/**
 *  The current time for the current block.
 */
export interface NowV0  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): bigint
    get(block: Block): Promise<(bigint | undefined)>
}

export const didUpdate =  {
    /**
     *  Whether the timestamp has been updated in this block.
     * 
     *  This value is updated to `true` upon successful submission of a timestamp by a node.
     *  It is then checked at the end of each block execution in the `on_finalize` hook.
     */
    v0: new StorageType('Timestamp.DidUpdate', 'Default', [], sts.boolean()) as DidUpdateV0,
}

/**
 *  Whether the timestamp has been updated in this block.
 * 
 *  This value is updated to `true` upon successful submission of a timestamp by a node.
 *  It is then checked at the end of each block execution in the `on_finalize` hook.
 */
export interface DidUpdateV0  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): boolean
    get(block: Block): Promise<(boolean | undefined)>
}
