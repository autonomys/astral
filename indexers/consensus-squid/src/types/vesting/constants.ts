import { sts, Block, Bytes, Option, Result, ConstantType, RuntimeCtx } from '../support'

export const minVestedTransfer = {
  /**
   *  The minimum amount transferred to call `vested_transfer`.
   */
  v0: new ConstantType('Vesting.MinVestedTransfer', sts.bigint()),
}
