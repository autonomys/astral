import { sts, Block, Bytes, Option, Result, ConstantType, RuntimeCtx } from '../support'

export const existentialDeposit = {
  /**
   *  The minimum amount required to keep an account open. MUST BE GREATER THAN ZERO!
   *
   *  If you *really* need it to be zero, you can enable the feature `insecure_zero_ed` for
   *  this pallet. However, you do so at your own risk: this will open up a major DoS vector.
   *  In case you have multiple sources of provider references, you may also get unexpected
   *  behaviour if you set this to zero.
   *
   *  Bottom line: Do yourself a favour and make it at least one!
   */
  v0: new ConstantType('Balances.ExistentialDeposit', sts.bigint()),
}

export const maxLocks = {
  /**
   *  The maximum number of locks that should exist on an account.
   *  Not strictly enforced, but used for weight estimation.
   */
  v0: new ConstantType('Balances.MaxLocks', sts.number()),
}

export const maxReserves = {
  /**
   *  The maximum number of named reserves that can exist on an account.
   */
  v0: new ConstantType('Balances.MaxReserves', sts.number()),
}

export const maxHolds = {
  /**
   *  The maximum number of holds that can exist on an account at any time.
   */
  v0: new ConstantType('Balances.MaxHolds', sts.number()),
}

export const maxFreezes = {
  /**
   *  The maximum number of individual freeze locks that can exist on an account at any time.
   */
  v0: new ConstantType('Balances.MaxFreezes', sts.number()),
}
