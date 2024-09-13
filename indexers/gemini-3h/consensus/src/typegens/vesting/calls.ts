import {sts, Block, Bytes, Option, Result, CallType, RuntimeCtx} from '../support'
import * as v0 from '../v0'

export const claim =  {
    name: 'Vesting.claim',
    /**
     * See [`Pallet::claim`].
     */
    v0: new CallType(
        'Vesting.claim',
        sts.unit()
    ),
}

export const vestedTransfer =  {
    name: 'Vesting.vested_transfer',
    /**
     * See [`Pallet::vested_transfer`].
     */
    v0: new CallType(
        'Vesting.vested_transfer',
        sts.struct({
            dest: v0.MultiAddress,
            schedule: v0.VestingSchedule,
        })
    ),
}

export const updateVestingSchedules =  {
    name: 'Vesting.update_vesting_schedules',
    /**
     * See [`Pallet::update_vesting_schedules`].
     */
    v0: new CallType(
        'Vesting.update_vesting_schedules',
        sts.struct({
            who: v0.MultiAddress,
            vestingSchedules: sts.array(() => v0.VestingSchedule),
        })
    ),
}

export const claimFor =  {
    name: 'Vesting.claim_for',
    /**
     * See [`Pallet::claim_for`].
     */
    v0: new CallType(
        'Vesting.claim_for',
        sts.struct({
            dest: v0.MultiAddress,
        })
    ),
}
