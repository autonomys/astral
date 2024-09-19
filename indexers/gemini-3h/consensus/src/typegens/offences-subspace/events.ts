import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'

export const offence =  {
    name: 'OffencesSubspace.Offence',
    /**
     * There is an offence reported of the given `kind` happened at the `session_index` and
     * (kind-specific) time slot. This event is not deposited for duplicate slashes.
     * \[kind, timeslot\].
     */
    v0: new EventType(
        'OffencesSubspace.Offence',
        sts.struct({
            kind: sts.bytes(),
            timeslot: sts.bytes(),
        })
    ),
}
