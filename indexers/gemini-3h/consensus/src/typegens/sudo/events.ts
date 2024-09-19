import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v0 from '../v0'

export const sudid =  {
    name: 'Sudo.Sudid',
    /**
     * A sudo call just took place.
     */
    v0: new EventType(
        'Sudo.Sudid',
        sts.struct({
            /**
             * The result of the call made by the sudo user.
             */
            sudoResult: sts.result(() => sts.unit(), () => v0.DispatchError),
        })
    ),
}

export const keyChanged =  {
    name: 'Sudo.KeyChanged',
    /**
     * The sudo key has been updated.
     */
    v0: new EventType(
        'Sudo.KeyChanged',
        sts.struct({
            /**
             * The old sudo key (if one was previously set).
             */
            old: sts.option(() => v0.AccountId32),
            /**
             * The new sudo key (if one was set).
             */
            new: v0.AccountId32,
        })
    ),
}

export const keyRemoved =  {
    name: 'Sudo.KeyRemoved',
    /**
     * The key was permanently removed.
     */
    v0: new EventType(
        'Sudo.KeyRemoved',
        sts.unit()
    ),
}

export const sudoAsDone =  {
    name: 'Sudo.SudoAsDone',
    /**
     * A [sudo_as](Pallet::sudo_as) call just took place.
     */
    v0: new EventType(
        'Sudo.SudoAsDone',
        sts.struct({
            /**
             * The result of the call made by the sudo user.
             */
            sudoResult: sts.result(() => sts.unit(), () => v0.DispatchError),
        })
    ),
}
