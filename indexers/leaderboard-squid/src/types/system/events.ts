import { sts, Block, Bytes, Option, Result, EventType, RuntimeCtx } from '../support'
import * as v0 from '../v0'

export const extrinsicSuccess = {
  name: 'System.ExtrinsicSuccess',
  /**
   * An extrinsic completed successfully.
   */
  v0: new EventType(
    'System.ExtrinsicSuccess',
    sts.struct({
      dispatchInfo: v0.DispatchInfo,
    }),
  ),
}

export const extrinsicFailed = {
  name: 'System.ExtrinsicFailed',
  /**
   * An extrinsic failed.
   */
  v0: new EventType(
    'System.ExtrinsicFailed',
    sts.struct({
      dispatchError: v0.DispatchError,
      dispatchInfo: v0.DispatchInfo,
    }),
  ),
}

export const codeUpdated = {
  name: 'System.CodeUpdated',
  /**
   * `:code` was updated.
   */
  v0: new EventType('System.CodeUpdated', sts.unit()),
}

export const newAccount = {
  name: 'System.NewAccount',
  /**
   * A new account was created.
   */
  v0: new EventType(
    'System.NewAccount',
    sts.struct({
      account: v0.AccountId32,
    }),
  ),
}

export const killedAccount = {
  name: 'System.KilledAccount',
  /**
   * An account was reaped.
   */
  v0: new EventType(
    'System.KilledAccount',
    sts.struct({
      account: v0.AccountId32,
    }),
  ),
}

export const remarked = {
  name: 'System.Remarked',
  /**
   * On on-chain remark happened.
   */
  v0: new EventType(
    'System.Remarked',
    sts.struct({
      sender: v0.AccountId32,
      hash: v0.H256,
    }),
  ),
}

export const upgradeAuthorized = {
  name: 'System.UpgradeAuthorized',
  /**
   * An upgrade was authorized.
   */
  v0: new EventType(
    'System.UpgradeAuthorized',
    sts.struct({
      codeHash: v0.H256,
      checkVersion: sts.boolean(),
    }),
  ),
}
