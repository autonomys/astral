import {sts, Block, Bytes, Option, Result, CallType, RuntimeCtx} from '../support'
import * as v0 from '../v0'
import * as v1 from '../v1'
import * as v3 from '../v3'

export const batch =  {
    name: 'Utility.batch',
    /**
     * See [`Pallet::batch`].
     */
    v0: new CallType(
        'Utility.batch',
        sts.struct({
            calls: sts.array(() => v0.Call),
        })
    ),
    /**
     * See [`Pallet::batch`].
     */
    v1: new CallType(
        'Utility.batch',
        sts.struct({
            calls: sts.array(() => v1.Call),
        })
    ),
    /**
     * See [`Pallet::batch`].
     */
    v3: new CallType(
        'Utility.batch',
        sts.struct({
            calls: sts.array(() => v3.Call),
        })
    ),
}

export const asDerivative =  {
    name: 'Utility.as_derivative',
    /**
     * See [`Pallet::as_derivative`].
     */
    v0: new CallType(
        'Utility.as_derivative',
        sts.struct({
            index: sts.number(),
            call: v0.Call,
        })
    ),
    /**
     * See [`Pallet::as_derivative`].
     */
    v1: new CallType(
        'Utility.as_derivative',
        sts.struct({
            index: sts.number(),
            call: v1.Call,
        })
    ),
    /**
     * See [`Pallet::as_derivative`].
     */
    v3: new CallType(
        'Utility.as_derivative',
        sts.struct({
            index: sts.number(),
            call: v3.Call,
        })
    ),
}

export const batchAll =  {
    name: 'Utility.batch_all',
    /**
     * See [`Pallet::batch_all`].
     */
    v0: new CallType(
        'Utility.batch_all',
        sts.struct({
            calls: sts.array(() => v0.Call),
        })
    ),
    /**
     * See [`Pallet::batch_all`].
     */
    v1: new CallType(
        'Utility.batch_all',
        sts.struct({
            calls: sts.array(() => v1.Call),
        })
    ),
    /**
     * See [`Pallet::batch_all`].
     */
    v3: new CallType(
        'Utility.batch_all',
        sts.struct({
            calls: sts.array(() => v3.Call),
        })
    ),
}

export const dispatchAs =  {
    name: 'Utility.dispatch_as',
    /**
     * See [`Pallet::dispatch_as`].
     */
    v0: new CallType(
        'Utility.dispatch_as',
        sts.struct({
            asOrigin: v0.OriginCaller,
            call: v0.Call,
        })
    ),
    /**
     * See [`Pallet::dispatch_as`].
     */
    v1: new CallType(
        'Utility.dispatch_as',
        sts.struct({
            asOrigin: v1.OriginCaller,
            call: v1.Call,
        })
    ),
    /**
     * See [`Pallet::dispatch_as`].
     */
    v3: new CallType(
        'Utility.dispatch_as',
        sts.struct({
            asOrigin: v3.OriginCaller,
            call: v3.Call,
        })
    ),
}

export const forceBatch =  {
    name: 'Utility.force_batch',
    /**
     * See [`Pallet::force_batch`].
     */
    v0: new CallType(
        'Utility.force_batch',
        sts.struct({
            calls: sts.array(() => v0.Call),
        })
    ),
    /**
     * See [`Pallet::force_batch`].
     */
    v1: new CallType(
        'Utility.force_batch',
        sts.struct({
            calls: sts.array(() => v1.Call),
        })
    ),
    /**
     * See [`Pallet::force_batch`].
     */
    v3: new CallType(
        'Utility.force_batch',
        sts.struct({
            calls: sts.array(() => v3.Call),
        })
    ),
}

export const withWeight =  {
    name: 'Utility.with_weight',
    /**
     * See [`Pallet::with_weight`].
     */
    v0: new CallType(
        'Utility.with_weight',
        sts.struct({
            call: v0.Call,
            weight: v0.Weight,
        })
    ),
    /**
     * See [`Pallet::with_weight`].
     */
    v1: new CallType(
        'Utility.with_weight',
        sts.struct({
            call: v1.Call,
            weight: v1.Weight,
        })
    ),
    /**
     * See [`Pallet::with_weight`].
     */
    v3: new CallType(
        'Utility.with_weight',
        sts.struct({
            call: v3.Call,
            weight: v3.Weight,
        })
    ),
}
