import {sts, Block, Bytes, Option, Result, CallType, RuntimeCtx} from '../support'
import * as v0 from '../v0'
import * as v1 from '../v1'
import * as v3 from '../v3'
import * as v5 from '../v5'

export const sudo =  {
    name: 'Sudo.sudo',
    /**
     * See [`Pallet::sudo`].
     */
    v0: new CallType(
        'Sudo.sudo',
        sts.struct({
            call: v0.Call,
        })
    ),
    /**
     * See [`Pallet::sudo`].
     */
    v1: new CallType(
        'Sudo.sudo',
        sts.struct({
            call: v1.Call,
        })
    ),
    /**
     * See [`Pallet::sudo`].
     */
    v3: new CallType(
        'Sudo.sudo',
        sts.struct({
            call: v3.Call,
        })
    ),
    /**
     * Authenticates the sudo key and dispatches a function call with `Root` origin.
     */
    v5: new CallType(
        'Sudo.sudo',
        sts.struct({
            call: v5.Call,
        })
    ),
}

export const sudoUncheckedWeight =  {
    name: 'Sudo.sudo_unchecked_weight',
    /**
     * See [`Pallet::sudo_unchecked_weight`].
     */
    v0: new CallType(
        'Sudo.sudo_unchecked_weight',
        sts.struct({
            call: v0.Call,
            weight: v0.Weight,
        })
    ),
    /**
     * See [`Pallet::sudo_unchecked_weight`].
     */
    v1: new CallType(
        'Sudo.sudo_unchecked_weight',
        sts.struct({
            call: v1.Call,
            weight: v1.Weight,
        })
    ),
    /**
     * See [`Pallet::sudo_unchecked_weight`].
     */
    v3: new CallType(
        'Sudo.sudo_unchecked_weight',
        sts.struct({
            call: v3.Call,
            weight: v3.Weight,
        })
    ),
    /**
     * Authenticates the sudo key and dispatches a function call with `Root` origin.
     * This function does not check the weight of the call, and instead allows the
     * Sudo user to specify the weight of the call.
     * 
     * The dispatch origin for this call must be _Signed_.
     */
    v5: new CallType(
        'Sudo.sudo_unchecked_weight',
        sts.struct({
            call: v5.Call,
            weight: v5.Weight,
        })
    ),
}

export const setKey =  {
    name: 'Sudo.set_key',
    /**
     * See [`Pallet::set_key`].
     */
    v0: new CallType(
        'Sudo.set_key',
        sts.struct({
            new: v0.MultiAddress,
        })
    ),
}

export const sudoAs =  {
    name: 'Sudo.sudo_as',
    /**
     * See [`Pallet::sudo_as`].
     */
    v0: new CallType(
        'Sudo.sudo_as',
        sts.struct({
            who: v0.MultiAddress,
            call: v0.Call,
        })
    ),
    /**
     * See [`Pallet::sudo_as`].
     */
    v1: new CallType(
        'Sudo.sudo_as',
        sts.struct({
            who: v1.MultiAddress,
            call: v1.Call,
        })
    ),
    /**
     * See [`Pallet::sudo_as`].
     */
    v3: new CallType(
        'Sudo.sudo_as',
        sts.struct({
            who: v3.MultiAddress,
            call: v3.Call,
        })
    ),
    /**
     * Authenticates the sudo key and dispatches a function call with `Signed` origin from
     * a given account.
     * 
     * The dispatch origin for this call must be _Signed_.
     */
    v5: new CallType(
        'Sudo.sudo_as',
        sts.struct({
            who: v5.MultiAddress,
            call: v5.Call,
        })
    ),
}

export const removeKey =  {
    name: 'Sudo.remove_key',
    /**
     * See [`Pallet::remove_key`].
     */
    v0: new CallType(
        'Sudo.remove_key',
        sts.unit()
    ),
}
