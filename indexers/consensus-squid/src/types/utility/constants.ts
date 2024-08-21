import {sts, Block, Bytes, Option, Result, ConstantType, RuntimeCtx} from '../support'

export const batchedCallsLimit =  {
    /**
     *  The limit on the number of batched calls.
     */
    v0: new ConstantType(
        'Utility.batched_calls_limit',
        sts.number()
    ),
}
