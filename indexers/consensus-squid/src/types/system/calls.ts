import { sts, Block, Bytes, Option, Result, CallType, RuntimeCtx } from '../support'
import * as v0 from '../v0'

export const remark = {
  name: 'System.remark',
  /**
   * See [`Pallet::remark`].
   */
  v0: new CallType(
    'System.remark',
    sts.struct({
      remark: sts.bytes(),
    }),
  ),
}

export const setHeapPages = {
  name: 'System.set_heap_pages',
  /**
   * See [`Pallet::set_heap_pages`].
   */
  v0: new CallType(
    'System.set_heap_pages',
    sts.struct({
      pages: sts.bigint(),
    }),
  ),
}

export const setCode = {
  name: 'System.set_code',
  /**
   * See [`Pallet::set_code`].
   */
  v0: new CallType(
    'System.set_code',
    sts.struct({
      code: sts.bytes(),
    }),
  ),
}

export const setCodeWithoutChecks = {
  name: 'System.set_code_without_checks',
  /**
   * See [`Pallet::set_code_without_checks`].
   */
  v0: new CallType(
    'System.set_code_without_checks',
    sts.struct({
      code: sts.bytes(),
    }),
  ),
}

export const setStorage = {
  name: 'System.set_storage',
  /**
   * See [`Pallet::set_storage`].
   */
  v0: new CallType(
    'System.set_storage',
    sts.struct({
      items: sts.array(() => sts.tuple(() => [sts.bytes(), sts.bytes()])),
    }),
  ),
}

export const killStorage = {
  name: 'System.kill_storage',
  /**
   * See [`Pallet::kill_storage`].
   */
  v0: new CallType(
    'System.kill_storage',
    sts.struct({
      keys: sts.array(() => sts.bytes()),
    }),
  ),
}

export const killPrefix = {
  name: 'System.kill_prefix',
  /**
   * See [`Pallet::kill_prefix`].
   */
  v0: new CallType(
    'System.kill_prefix',
    sts.struct({
      prefix: sts.bytes(),
      subkeys: sts.number(),
    }),
  ),
}

export const remarkWithEvent = {
  name: 'System.remark_with_event',
  /**
   * See [`Pallet::remark_with_event`].
   */
  v0: new CallType(
    'System.remark_with_event',
    sts.struct({
      remark: sts.bytes(),
    }),
  ),
}

export const authorizeUpgrade = {
  name: 'System.authorize_upgrade',
  /**
   * See [`Pallet::authorize_upgrade`].
   */
  v0: new CallType(
    'System.authorize_upgrade',
    sts.struct({
      codeHash: v0.H256,
    }),
  ),
}

export const authorizeUpgradeWithoutChecks = {
  name: 'System.authorize_upgrade_without_checks',
  /**
   * See [`Pallet::authorize_upgrade_without_checks`].
   */
  v0: new CallType(
    'System.authorize_upgrade_without_checks',
    sts.struct({
      codeHash: v0.H256,
    }),
  ),
}

export const applyAuthorizedUpgrade = {
  name: 'System.apply_authorized_upgrade',
  /**
   * See [`Pallet::apply_authorized_upgrade`].
   */
  v0: new CallType(
    'System.apply_authorized_upgrade',
    sts.struct({
      code: sts.bytes(),
    }),
  ),
}
