import {sts, Block, Bytes, Option, Result, StorageType, RuntimeCtx} from '../support'
import * as v0 from '../v0'

export const key =  {
    /**
     *  The `AccountId` of the sudo key.
     */
    v0: new StorageType('Sudo.Key', 'Optional', [], v0.AccountId32) as KeyV0,
}

/**
 *  The `AccountId` of the sudo key.
 */
export interface KeyV0  {
    is(block: RuntimeCtx): boolean
    get(block: Block): Promise<(v0.AccountId32 | undefined)>
}
