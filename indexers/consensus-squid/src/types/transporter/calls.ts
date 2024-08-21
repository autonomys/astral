import { sts, Block, Bytes, Option, Result, CallType, RuntimeCtx } from '../support'
import * as v0 from '../v0'

export const transfer = {
  name: 'Transporter.transfer',
  /**
   * See [`Pallet::transfer`].
   */
  v0: new CallType(
    'Transporter.transfer',
    sts.struct({
      dstLocation: v0.Location,
      amount: sts.bigint(),
    }),
  ),
}
