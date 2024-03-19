import {sts, Block, Bytes, Option, Result, CallType, RuntimeCtx} from '../support'
import * as v0 from '../v0'

export const transferAllowDeath =  {
    name: 'Balances.transfer_allow_death',
    /**
     * See [`Pallet::transfer_allow_death`].
     */
    v0: new CallType(
        'Balances.transfer_allow_death',
        sts.struct({
            dest: v0.MultiAddress,
            value: sts.bigint(),
        })
    ),
}

export const forceTransfer =  {
    name: 'Balances.force_transfer',
    /**
     * See [`Pallet::force_transfer`].
     */
    v0: new CallType(
        'Balances.force_transfer',
        sts.struct({
            source: v0.MultiAddress,
            dest: v0.MultiAddress,
            value: sts.bigint(),
        })
    ),
}

export const transferKeepAlive =  {
    name: 'Balances.transfer_keep_alive',
    /**
     * See [`Pallet::transfer_keep_alive`].
     */
    v0: new CallType(
        'Balances.transfer_keep_alive',
        sts.struct({
            dest: v0.MultiAddress,
            value: sts.bigint(),
        })
    ),
}

export const transferAll =  {
    name: 'Balances.transfer_all',
    /**
     * See [`Pallet::transfer_all`].
     */
    v0: new CallType(
        'Balances.transfer_all',
        sts.struct({
            dest: v0.MultiAddress,
            keepAlive: sts.boolean(),
        })
    ),
}

export const forceUnreserve =  {
    name: 'Balances.force_unreserve',
    /**
     * See [`Pallet::force_unreserve`].
     */
    v0: new CallType(
        'Balances.force_unreserve',
        sts.struct({
            who: v0.MultiAddress,
            amount: sts.bigint(),
        })
    ),
}

export const upgradeAccounts =  {
    name: 'Balances.upgrade_accounts',
    /**
     * See [`Pallet::upgrade_accounts`].
     */
    v0: new CallType(
        'Balances.upgrade_accounts',
        sts.struct({
            who: sts.array(() => v0.AccountId32),
        })
    ),
}

export const forceSetBalance =  {
    name: 'Balances.force_set_balance',
    /**
     * See [`Pallet::force_set_balance`].
     */
    v0: new CallType(
        'Balances.force_set_balance',
        sts.struct({
            who: v0.MultiAddress,
            newFree: sts.bigint(),
        })
    ),
}
