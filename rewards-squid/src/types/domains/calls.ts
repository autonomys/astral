import {sts, Block, Bytes, Option, Result, CallType, RuntimeCtx} from '../support'
import * as v0 from '../v0'
import * as v2 from '../v2'
import * as v3 from '../v3'

export const submitBundle =  {
    name: 'Domains.submit_bundle',
    /**
     * See [`Pallet::submit_bundle`].
     */
    v0: new CallType(
        'Domains.submit_bundle',
        sts.struct({
            opaqueBundle: v0.Bundle,
        })
    ),
}

export const submitFraudProof =  {
    name: 'Domains.submit_fraud_proof',
    /**
     * See [`Pallet::submit_fraud_proof`].
     */
    v0: new CallType(
        'Domains.submit_fraud_proof',
        sts.struct({
            fraudProof: v0.FraudProof,
        })
    ),
    /**
     * See [`Pallet::submit_fraud_proof`].
     */
    v2: new CallType(
        'Domains.submit_fraud_proof',
        sts.struct({
            fraudProof: v2.FraudProof,
        })
    ),
}

export const registerDomainRuntime =  {
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
        })
    ),
}

export const upgradeDomainRuntime =  {
    name: 'Domains.upgrade_domain_runtime',
    /**
     * See [`Pallet::upgrade_domain_runtime`].
     */
    v0: new CallType(
        'Domains.upgrade_domain_runtime',
        sts.struct({
            runtimeId: sts.number(),
            rawGenesisStorage: sts.bytes(),
        })
    ),
}

export const registerOperator =  {
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
        })
    ),
}

export const nominateOperator =  {
    name: 'Domains.nominate_operator',
    /**
     * See [`Pallet::nominate_operator`].
     */
    v0: new CallType(
        'Domains.nominate_operator',
        sts.struct({
            operatorId: sts.bigint(),
            amount: sts.bigint(),
        })
    ),
}

export const instantiateDomain =  {
    name: 'Domains.instantiate_domain',
    /**
     * See [`Pallet::instantiate_domain`].
     */
    v0: new CallType(
        'Domains.instantiate_domain',
        sts.struct({
            domainConfig: v0.DomainConfig,
        })
    ),
}

export const switchDomain =  {
    name: 'Domains.switch_domain',
    /**
     * See [`Pallet::switch_domain`].
     */
    v0: new CallType(
        'Domains.switch_domain',
        sts.struct({
            operatorId: sts.bigint(),
            newDomainId: v0.DomainId,
        })
    ),
}

export const deregisterOperator =  {
    name: 'Domains.deregister_operator',
    /**
     * See [`Pallet::deregister_operator`].
     */
    v0: new CallType(
        'Domains.deregister_operator',
        sts.struct({
            operatorId: sts.bigint(),
        })
    ),
}

export const withdrawStake =  {
    name: 'Domains.withdraw_stake',
    /**
     * See [`Pallet::withdraw_stake`].
     */
    v0: new CallType(
        'Domains.withdraw_stake',
        sts.struct({
            operatorId: sts.bigint(),
            withdraw: v0.Withdraw,
        })
    ),
}

export const autoStakeBlockRewards =  {
    name: 'Domains.auto_stake_block_rewards',
    /**
     * See [`Pallet::auto_stake_block_rewards`].
     */
    v0: new CallType(
        'Domains.auto_stake_block_rewards',
        sts.struct({
            operatorId: sts.bigint(),
        })
    ),
}

export const updateDomainOperatorAllowList =  {
    name: 'Domains.update_domain_operator_allow_list',
    /**
     * See [`Pallet::update_domain_operator_allow_list`].
     */
    v0: new CallType(
        'Domains.update_domain_operator_allow_list',
        sts.struct({
            domainId: v0.DomainId,
            operatorAllowList: v0.OperatorAllowList,
        })
    ),
}

export const forceStakingEpochTransition =  {
    name: 'Domains.force_staking_epoch_transition',
    /**
     * See [`Pallet::force_staking_epoch_transition`].
     */
    v3: new CallType(
        'Domains.force_staking_epoch_transition',
        sts.struct({
            domainId: v3.DomainId,
        })
    ),
}
