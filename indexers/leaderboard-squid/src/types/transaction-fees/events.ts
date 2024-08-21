import { sts, Block, Bytes, Option, Result, EventType, RuntimeCtx } from '../support'
import * as v0 from '../v0'

export const blockFees = {
  name: 'TransactionFees.BlockFees',
  /**
   * Storage fees.
   */
  v0: new EventType(
    'TransactionFees.BlockFees',
    sts.struct({
      /**
       * Block author that received the fees.
       */
      who: v0.AccountId32,
      /**
       * Amount of collected storage fees.
       */
      storage: sts.bigint(),
      /**
       * Amount of collected compute fees.
       */
      compute: sts.bigint(),
      /**
       * Amount of collected tips.
       */
      tips: sts.bigint(),
    }),
  ),
}

export const burnedBlockFees = {
  name: 'TransactionFees.BurnedBlockFees',
  /**
   * Fees burned due to equivocated block author.
   */
  v0: new EventType(
    'TransactionFees.BurnedBlockFees',
    sts.struct({
      /**
       * Amount of burned storage fees.
       */
      storage: sts.bigint(),
      /**
       * Amount of burned compute fees.
       */
      compute: sts.bigint(),
      /**
       * Amount of burned tips.
       */
      tips: sts.bigint(),
    }),
  ),
}
