import { sts, Block, Bytes, Option, Result, CallType, RuntimeCtx } from '../support'

export const set = {
  name: 'Timestamp.set',
  /**
   * See [`Pallet::set`].
   */
  v0: new CallType(
    'Timestamp.set',
    sts.struct({
      now: sts.bigint(),
    }),
  ),
}
