import {sts, Block, Bytes, Option, Result, CallType, RuntimeCtx} from '../support'
import * as v0 from '../v0'
import * as v1 from '../v1'
import * as v3 from '../v3'
import * as v5 from '../v5'

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
    /**
     * Send a batch of dispatch calls.
     * 
     * May be called from any origin except `None`.
     * 
     * - `calls`: The calls to be dispatched from the same origin. The number of call must not
     *   exceed the constant: `batched_calls_limit` (available in constant metadata).
     * 
     * If origin is root then the calls are dispatched without checking origin filter. (This
     * includes bypassing `frame_system::Config::BaseCallFilter`).
     * 
     * ## Complexity
     * - O(C) where C is the number of calls to be batched.
     * 
     * This will return `Ok` in all circumstances. To determine the success of the batch, an
     * event is deposited. If a call failed and the batch was interrupted, then the
     * `BatchInterrupted` event is deposited, along with the number of successful calls made
     * and the error of the failed call. If all were successful, then the `BatchCompleted`
     * event is deposited.
     */
    v5: new CallType(
        'Utility.batch',
        sts.struct({
            calls: sts.array(() => v5.Call),
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
    /**
     * Send a call through an indexed pseudonym of the sender.
     * 
     * Filter from origin are passed along. The call will be dispatched with an origin which
     * use the same filter as the origin of this call.
     * 
     * NOTE: If you need to ensure that any account-based filtering is not honored (i.e.
     * because you expect `proxy` to have been used prior in the call stack and you do not want
     * the call restrictions to apply to any sub-accounts), then use `as_multi_threshold_1`
     * in the Multisig pallet instead.
     * 
     * NOTE: Prior to version *12, this was called `as_limited_sub`.
     * 
     * The dispatch origin for this call must be _Signed_.
     */
    v5: new CallType(
        'Utility.as_derivative',
        sts.struct({
            index: sts.number(),
            call: v5.Call,
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
    /**
     * Send a batch of dispatch calls and atomically execute them.
     * The whole transaction will rollback and fail if any of the calls failed.
     * 
     * May be called from any origin except `None`.
     * 
     * - `calls`: The calls to be dispatched from the same origin. The number of call must not
     *   exceed the constant: `batched_calls_limit` (available in constant metadata).
     * 
     * If origin is root then the calls are dispatched without checking origin filter. (This
     * includes bypassing `frame_system::Config::BaseCallFilter`).
     * 
     * ## Complexity
     * - O(C) where C is the number of calls to be batched.
     */
    v5: new CallType(
        'Utility.batch_all',
        sts.struct({
            calls: sts.array(() => v5.Call),
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
    /**
     * Dispatches a function call with a provided origin.
     * 
     * The dispatch origin for this call must be _Root_.
     * 
     * ## Complexity
     * - O(1).
     */
    v5: new CallType(
        'Utility.dispatch_as',
        sts.struct({
            asOrigin: v5.OriginCaller,
            call: v5.Call,
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
    /**
     * Send a batch of dispatch calls.
     * Unlike `batch`, it allows errors and won't interrupt.
     * 
     * May be called from any origin except `None`.
     * 
     * - `calls`: The calls to be dispatched from the same origin. The number of call must not
     *   exceed the constant: `batched_calls_limit` (available in constant metadata).
     * 
     * If origin is root then the calls are dispatch without checking origin filter. (This
     * includes bypassing `frame_system::Config::BaseCallFilter`).
     * 
     * ## Complexity
     * - O(C) where C is the number of calls to be batched.
     */
    v5: new CallType(
        'Utility.force_batch',
        sts.struct({
            calls: sts.array(() => v5.Call),
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
    /**
     * Dispatch a function call with a specified weight.
     * 
     * This function does not check the weight of the call, and instead allows the
     * Root origin to specify the weight of the call.
     * 
     * The dispatch origin for this call must be _Root_.
     */
    v5: new CallType(
        'Utility.with_weight',
        sts.struct({
            call: v5.Call,
            weight: v5.Weight,
        })
    ),
}
