import { sts, Block, Bytes, Option, Result, CallType, RuntimeCtx } from '../support'

export const setEnableDomains = {
  name: 'RuntimeConfigs.set_enable_domains',
  /**
   * See [`Pallet::set_enable_domains`].
   */
  v0: new CallType(
    'RuntimeConfigs.set_enable_domains',
    sts.struct({
      enableDomains: sts.boolean(),
    }),
  ),
}

export const setEnableDynamicCostOfStorage = {
  name: 'RuntimeConfigs.set_enable_dynamic_cost_of_storage',
  /**
   * See [`Pallet::set_enable_dynamic_cost_of_storage`].
   */
  v0: new CallType(
    'RuntimeConfigs.set_enable_dynamic_cost_of_storage',
    sts.struct({
      enableDynamicCostOfStorage: sts.boolean(),
    }),
  ),
}

export const setEnableBalanceTransfers = {
  name: 'RuntimeConfigs.set_enable_balance_transfers',
  /**
   * See [`Pallet::set_enable_balance_transfers`].
   */
  v0: new CallType(
    'RuntimeConfigs.set_enable_balance_transfers',
    sts.struct({
      enableBalanceTransfers: sts.boolean(),
    }),
  ),
}

export const setEnableNonRootCalls = {
  name: 'RuntimeConfigs.set_enable_non_root_calls',
  /**
   * See [`Pallet::set_enable_non_root_calls`].
   */
  v0: new CallType(
    'RuntimeConfigs.set_enable_non_root_calls',
    sts.struct({
      enableNonRootCalls: sts.boolean(),
    }),
  ),
}
