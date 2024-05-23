import {sts, Block, Bytes, Option, Result, ConstantType, RuntimeCtx} from '../support'

export const minimumPeriod =  {
    /**
     *  The minimum period between blocks.
     * 
     *  Be aware that this is different to the *expected* period that the block production
     *  apparatus provides. Your chosen consensus system will generally work with this to
     *  determine a sensible block time. For example, in the Aura pallet it will be double this
     *  period on default settings.
     */
    v0: new ConstantType(
        'Timestamp.MinimumPeriod',
        sts.bigint()
    ),
}
