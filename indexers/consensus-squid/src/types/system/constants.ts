import {sts, Block, Bytes, Option, Result, ConstantType, RuntimeCtx} from '../support'
import * as v0 from '../v0'

export const blockWeights =  {
    /**
     *  Block & extrinsics weights: base values and limits.
     */
    v0: new ConstantType(
        'System.BlockWeights',
        v0.BlockWeights
    ),
}

export const blockLength =  {
    /**
     *  The maximum length of a block (in bytes).
     */
    v0: new ConstantType(
        'System.BlockLength',
        v0.BlockLength
    ),
}

export const blockHashCount =  {
    /**
     *  Maximum number of block number to block hash mappings to keep (oldest pruned first).
     */
    v0: new ConstantType(
        'System.BlockHashCount',
        sts.number()
    ),
}

export const dbWeight =  {
    /**
     *  The weight of runtime database operations the runtime can invoke.
     */
    v0: new ConstantType(
        'System.DbWeight',
        v0.RuntimeDbWeight
    ),
}

export const version =  {
    /**
     *  Get the chain's current version.
     */
    v0: new ConstantType(
        'System.Version',
        v0.RuntimeVersion
    ),
}

export const ss58Prefix =  {
    /**
     *  The designated SS58 prefix of this chain.
     * 
     *  This replaces the "ss58Format" property declared in the chain spec. Reason is
     *  that the runtime should know about the prefix in order to make use of it as
     *  an identifier of the chain.
     */
    v0: new ConstantType(
        'System.SS58Prefix',
        sts.number()
    ),
}
