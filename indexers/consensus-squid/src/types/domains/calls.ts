import { sts, Block, Bytes, Option, Result, CallType, RuntimeCtx } from '../support'
import * as v0 from '../v0'
import * as v1 from '../v1'
import * as v5 from '../v5'

export const submitBundle = {
  name: 'Domains.submit_bundle',
  /**
   * See [`Pallet::submit_bundle`].
   */
  v0: new CallType(
    'Domains.submit_bundle',
    sts.struct({
      opaqueBundle: v0.Bundle,
    }),
  ),
  /**
   * See [`Pallet::submit_bundle`].
   */
  v1: new CallType(
    'Domains.submit_bundle',
    sts.struct({
      opaqueBundle: v1.Bundle,
    }),
  ),
  v5: new CallType(
    'Domains.submit_bundle',
    sts.struct({
      opaqueBundle: v5.Bundle,
    }),
  ),
}

export const submitFraudProof = {
  name: 'Domains.submit_fraud_proof',
  /**
   * See [`Pallet::submit_fraud_proof`].
   */
  v0: new CallType(
    'Domains.submit_fraud_proof',
    sts.struct({
      fraudProof: v0.FraudProof,
    }),
  ),
  /**
   * See [`Pallet::submit_fraud_proof`].
   */
  v1: new CallType(
    'Domains.submit_fraud_proof',
    sts.struct({
      fraudProof: v1.FraudProof,
    }),
  ),
  v5: new CallType(
    'Domains.submit_fraud_proof',
    sts.struct({
      fraudProof: v5.FraudProof,
    }),
  ),
}

export const registerDomainRuntime = {
  name: 'Domains.register_domain_runtime',
  /**
   * See [`Pallet::register_domain_runtime`].
   */
  v0: new CallType(
    'Domains.register_domain_runtime',
    sts.struct({
      runtimeName: sts.string(),
      runtimeType: v0.RuntimeType,
      rawGenesisStorage: sts.bytes(),
    }),
  ),
  v5: new CallType(
    'Domains.register_domain_runtime',
    sts.struct({
      runtimeName: sts.string(),
      runtimeType: v5.RuntimeType,
      rawGenesisStorage: sts.bytes(),
    }),
  ),
}

export const upgradeDomainRuntime = {
  name: 'Domains.upgrade_domain_runtime',
  /**
   * See [`Pallet::upgrade_domain_runtime`].
   */
  v0: new CallType(
    'Domains.upgrade_domain_runtime',
    sts.struct({
      runtimeId: sts.number(),
      rawGenesisStorage: sts.bytes(),
    }),
  ),
}

export const registerOperator = {
  name: 'Domains.register_operator',
  /**
   * See [`Pallet::register_operator`].
   */
  v0: new CallType(
    'Domains.register_operator',
    sts.struct({
      domainId: v0.DomainId,
      amount: sts.bigint(),
      config: v0.OperatorConfig,
    }),
  ),
  v5: new CallType(
    'Domains.register_operator',
    sts.struct({
      domainId: v5.DomainId,
      amount: sts.bigint(),
      config: v5.OperatorConfig,
      signingKeyProofOfOwnership: sts.bytes(),
    }),
  ),
}

export const nominateOperator = {
  name: 'Domains.nominate_operator',
  /**
   * See [`Pallet::nominate_operator`].
   */
  v0: new CallType(
    'Domains.nominate_operator',
    sts.struct({
      operatorId: sts.bigint(),
      amount: sts.bigint(),
    }),
  ),
}

export const instantiateDomain = {
  name: 'Domains.instantiate_domain',
  /**
   * See [`Pallet::instantiate_domain`].
   */
  v0: new CallType(
    'Domains.instantiate_domain',
    sts.struct({
      domainConfig: v0.DomainConfig,
    }),
  ),
  /**
   * See [`Pallet::instantiate_domain`].
   */
  v1: new CallType(
    'Domains.instantiate_domain',
    sts.struct({
      domainConfig: v1.DomainConfig,
    }),
  ),
}

export const switchDomain = {
  name: 'Domains.switch_domain',
  /**
   * See [`Pallet::switch_domain`].
   */
  v0: new CallType(
    'Domains.switch_domain',
    sts.struct({
      operatorId: sts.bigint(),
      newDomainId: v0.DomainId,
    }),
  ),
}

export const deregisterOperator = {
  name: 'Domains.deregister_operator',
  /**
   * See [`Pallet::deregister_operator`].
   */
  v0: new CallType(
    'Domains.deregister_operator',
    sts.struct({
      operatorId: sts.bigint(),
    }),
  ),
}

export const withdrawStake = {
  name: 'Domains.withdraw_stake',
  /**
   * See [`Pallet::withdraw_stake`].
   */
  v0: new CallType(
    'Domains.withdraw_stake',
    sts.struct({
      operatorId: sts.bigint(),
      shares: sts.bigint(),
    }),
  ),
}

export const unlockFunds = {
  name: 'Domains.unlock_funds',
  /**
   * See [`Pallet::unlock_funds`].
   */
  v0: new CallType(
    'Domains.unlock_funds',
    sts.struct({
      operatorId: sts.bigint(),
    }),
  ),
}

export const unlockOperator = {
  name: 'Domains.unlock_operator',
  /**
   * See [`Pallet::unlock_operator`].
   */
  v0: new CallType(
    'Domains.unlock_operator',
    sts.struct({
      operatorId: sts.bigint(),
    }),
  ),
}

export const updateDomainOperatorAllowList = {
  name: 'Domains.update_domain_operator_allow_list',
  /**
   * See [`Pallet::update_domain_operator_allow_list`].
   */
  v0: new CallType(
    'Domains.update_domain_operator_allow_list',
    sts.struct({
      domainId: v0.DomainId,
      operatorAllowList: v0.OperatorAllowList,
    }),
  ),
}

export const forceStakingEpochTransition = {
  name: 'Domains.force_staking_epoch_transition',
  /**
   * See [`Pallet::force_staking_epoch_transition`].
   */
  v0: new CallType(
    'Domains.force_staking_epoch_transition',
    sts.struct({
      domainId: v0.DomainId,
    }),
  ),
}

export const unlockNominator = {
  name: 'Domains.unlock_nominator',
  /**
   * Unlocks the nominator under given operator given the unlocking period is complete.
   * A nominator can initiate their unlock given operator is already deregistered.
   */
  v5: new CallType(
    'Domains.unlock_nominator',
    sts.struct({
      operatorId: sts.bigint(),
    }),
  ),
}

export const setPermissionedActionAllowedBy = {
  name: 'Domains.set_permissioned_action_allowed_by',
  /**
   * Update permissioned action allowed by storage by Sudo.
   */
  v5: new CallType(
    'Domains.set_permissioned_action_allowed_by',
    sts.struct({
      permissionedActionAllowedBy: v5.PermissionedActionAllowedBy,
    }),
  ),
}
