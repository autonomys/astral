import assert from 'assert'
import {Chain, ChainContext, CallContext, Call, Result, Option} from './support'
import * as v0 from './v0'

export class BalancesForceSetBalanceCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Balances.force_set_balance')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::force_set_balance`].
     */
    get isV0(): boolean {
        return this._chain.getCallHash('Balances.force_set_balance') === 'd0f1dc28aeba8805f92a7e983d0fba2621912dc1665264dd9c38cd3c0c912737'
    }

    /**
     * See [`Pallet::force_set_balance`].
     */
    get asV0(): {who: v0.MultiAddress, newFree: bigint} {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}

export class BalancesForceTransferCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Balances.force_transfer')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::force_transfer`].
     */
    get isV0(): boolean {
        return this._chain.getCallHash('Balances.force_transfer') === 'e5944fbe8224a17fe49f9c1d1d01efaf87fb1778fd39618512af54c9ba6f9dff'
    }

    /**
     * See [`Pallet::force_transfer`].
     */
    get asV0(): {source: v0.MultiAddress, dest: v0.MultiAddress, value: bigint} {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}

export class BalancesForceUnreserveCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Balances.force_unreserve')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::force_unreserve`].
     */
    get isV0(): boolean {
        return this._chain.getCallHash('Balances.force_unreserve') === '30bc48977e2a7ad3fc8ac014948ded50fc54886bad9a1f65b02bb64f27d8a6be'
    }

    /**
     * See [`Pallet::force_unreserve`].
     */
    get asV0(): {who: v0.MultiAddress, amount: bigint} {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}

export class BalancesTransferAllCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Balances.transfer_all')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::transfer_all`].
     */
    get isV0(): boolean {
        return this._chain.getCallHash('Balances.transfer_all') === '9c94c2ca9979f6551af6e123fb6b6ba14d026f862f9a023706f8f88c556b355f'
    }

    /**
     * See [`Pallet::transfer_all`].
     */
    get asV0(): {dest: v0.MultiAddress, keepAlive: boolean} {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}

export class BalancesTransferAllowDeathCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Balances.transfer_allow_death')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::transfer_allow_death`].
     */
    get isV0(): boolean {
        return this._chain.getCallHash('Balances.transfer_allow_death') === 'fc85bea9d0d171982f66e8a55667d58dc9a1612bcafe84309942bf47e23e3094'
    }

    /**
     * See [`Pallet::transfer_allow_death`].
     */
    get asV0(): {dest: v0.MultiAddress, value: bigint} {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}

export class BalancesTransferKeepAliveCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Balances.transfer_keep_alive')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::transfer_keep_alive`].
     */
    get isV0(): boolean {
        return this._chain.getCallHash('Balances.transfer_keep_alive') === 'fc85bea9d0d171982f66e8a55667d58dc9a1612bcafe84309942bf47e23e3094'
    }

    /**
     * See [`Pallet::transfer_keep_alive`].
     */
    get asV0(): {dest: v0.MultiAddress, value: bigint} {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}

export class BalancesUpgradeAccountsCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Balances.upgrade_accounts')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::upgrade_accounts`].
     */
    get isV0(): boolean {
        return this._chain.getCallHash('Balances.upgrade_accounts') === 'e074d5a93414f189b47fbb5d94c57b62cfb9e63808a3c94665eeb2cfe53be8df'
    }

    /**
     * See [`Pallet::upgrade_accounts`].
     */
    get asV0(): {who: Uint8Array[]} {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}

export class DomainsDeregisterOperatorCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Domains.deregister_operator')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::deregister_operator`].
     */
    get isV0(): boolean {
        return this._chain.getCallHash('Domains.deregister_operator') === '8ffd479fbc1b33b18b9485df09465e8f37e733ec4184266f9bbe335de066f5ec'
    }

    /**
     * See [`Pallet::deregister_operator`].
     */
    get asV0(): {operatorId: bigint} {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}

export class DomainsForceStakingEpochTransitionCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Domains.force_staking_epoch_transition')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::force_staking_epoch_transition`].
     */
    get isV0(): boolean {
        return this._chain.getCallHash('Domains.force_staking_epoch_transition') === '3037d4816636b5c3fb65811d3539dec2cca52f588262804bf1cbf515a78108bb'
    }

    /**
     * See [`Pallet::force_staking_epoch_transition`].
     */
    get asV0(): {domainId: number} {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}

export class DomainsInstantiateDomainCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Domains.instantiate_domain')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::instantiate_domain`].
     */
    get isV0(): boolean {
        return this._chain.getCallHash('Domains.instantiate_domain') === '3736adac534a0603d2d12360636caff5aa581a359e26caa965d0128066ffba0d'
    }

    /**
     * See [`Pallet::instantiate_domain`].
     */
    get asV0(): {domainConfig: v0.DomainConfig} {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}

export class DomainsNominateOperatorCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Domains.nominate_operator')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::nominate_operator`].
     */
    get isV0(): boolean {
        return this._chain.getCallHash('Domains.nominate_operator') === '421439c565b86b79d37b99791bc849f5eed06aea48fd8b3e0e7ebe6031d2f7f5'
    }

    /**
     * See [`Pallet::nominate_operator`].
     */
    get asV0(): {operatorId: bigint, amount: bigint} {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}

export class DomainsRegisterDomainRuntimeCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Domains.register_domain_runtime')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::register_domain_runtime`].
     */
    get isV0(): boolean {
        return this._chain.getCallHash('Domains.register_domain_runtime') === '9989725574aea46fcd9db586ccd0645f4b61aa7cc243c84b7d97f85a18f49f35'
    }

    /**
     * See [`Pallet::register_domain_runtime`].
     */
    get asV0(): {runtimeName: string, runtimeType: v0.RuntimeType, rawGenesisStorage: Uint8Array} {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}

export class DomainsRegisterOperatorCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Domains.register_operator')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::register_operator`].
     */
    get isV0(): boolean {
        return this._chain.getCallHash('Domains.register_operator') === '893130193e63d991613dabb9eae4080125a976fe0ef7924d97334daee0c9ce08'
    }

    /**
     * See [`Pallet::register_operator`].
     */
    get asV0(): {domainId: number, amount: bigint, config: v0.OperatorConfig} {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}

export class DomainsSubmitBundleCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Domains.submit_bundle')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::submit_bundle`].
     */
    get isV0(): boolean {
        return this._chain.getCallHash('Domains.submit_bundle') === '2d832ef0366644e936c9fcd7114f2e9b72f1fd7c860ee678edbb1a9eaa04553d'
    }

    /**
     * See [`Pallet::submit_bundle`].
     */
    get asV0(): {opaqueBundle: v0.Bundle} {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}

export class DomainsSubmitFraudProofCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Domains.submit_fraud_proof')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::submit_fraud_proof`].
     */
    get isV0(): boolean {
        return this._chain.getCallHash('Domains.submit_fraud_proof') === '616f25e845d5a9fa0caa73f5426dac779499c52dc666bf8afa93d3d33fe630ff'
    }

    /**
     * See [`Pallet::submit_fraud_proof`].
     */
    get asV0(): {fraudProof: v0.FraudProof} {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}

export class DomainsSwitchDomainCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Domains.switch_domain')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::switch_domain`].
     */
    get isV0(): boolean {
        return this._chain.getCallHash('Domains.switch_domain') === '74d2d29b12e7f73697440e4c37b44221ef01aec8716b9c5f1bc8b95948c21642'
    }

    /**
     * See [`Pallet::switch_domain`].
     */
    get asV0(): {operatorId: bigint, newDomainId: number} {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}

export class DomainsUnlockFundsCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Domains.unlock_funds')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::unlock_funds`].
     */
    get isV0(): boolean {
        return this._chain.getCallHash('Domains.unlock_funds') === '8ffd479fbc1b33b18b9485df09465e8f37e733ec4184266f9bbe335de066f5ec'
    }

    /**
     * See [`Pallet::unlock_funds`].
     */
    get asV0(): {operatorId: bigint} {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}

export class DomainsUnlockOperatorCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Domains.unlock_operator')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::unlock_operator`].
     */
    get isV0(): boolean {
        return this._chain.getCallHash('Domains.unlock_operator') === '8ffd479fbc1b33b18b9485df09465e8f37e733ec4184266f9bbe335de066f5ec'
    }

    /**
     * See [`Pallet::unlock_operator`].
     */
    get asV0(): {operatorId: bigint} {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}

export class DomainsUpdateDomainOperatorAllowListCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Domains.update_domain_operator_allow_list')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::update_domain_operator_allow_list`].
     */
    get isV0(): boolean {
        return this._chain.getCallHash('Domains.update_domain_operator_allow_list') === '097db5481945466d86952ecd14ca82a2b2bc5326857aa9c809befe5088b76dc6'
    }

    /**
     * See [`Pallet::update_domain_operator_allow_list`].
     */
    get asV0(): {domainId: number, operatorAllowList: v0.OperatorAllowList} {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}

export class DomainsUpgradeDomainRuntimeCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Domains.upgrade_domain_runtime')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::upgrade_domain_runtime`].
     */
    get isV0(): boolean {
        return this._chain.getCallHash('Domains.upgrade_domain_runtime') === 'da6d2a06bc2c4ce680961b6ce49dc109b21d175e7a6ac7e21dc992949793e197'
    }

    /**
     * See [`Pallet::upgrade_domain_runtime`].
     */
    get asV0(): {runtimeId: number, rawGenesisStorage: Uint8Array} {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}

export class DomainsWithdrawStakeCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Domains.withdraw_stake')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::withdraw_stake`].
     */
    get isV0(): boolean {
        return this._chain.getCallHash('Domains.withdraw_stake') === 'f2d71d8d43d5bda0d2a990e7f9214542f1b33cfeba62c44b5800db04618db375'
    }

    /**
     * See [`Pallet::withdraw_stake`].
     */
    get asV0(): {operatorId: bigint, shares: bigint} {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}

export class MessengerCloseChannelCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Messenger.close_channel')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::close_channel`].
     */
    get isV0(): boolean {
        return this._chain.getCallHash('Messenger.close_channel') === '99e846ee486452b93d7e8ba9fef938f53400f9bc70cad9d50c0ec8571e646860'
    }

    /**
     * See [`Pallet::close_channel`].
     */
    get asV0(): {chainId: v0.ChainId, channelId: bigint} {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}

export class MessengerInitiateChannelCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Messenger.initiate_channel')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::initiate_channel`].
     */
    get isV0(): boolean {
        return this._chain.getCallHash('Messenger.initiate_channel') === 'e7497a443803c2de1a58a5edd070059d577ad163effc9fb720c1b7fc35ee5477'
    }

    /**
     * See [`Pallet::initiate_channel`].
     */
    get asV0(): {dstChainId: v0.ChainId, params: v0.InitiateChannelParams} {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}

export class MessengerRelayMessageCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Messenger.relay_message')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::relay_message`].
     */
    get isV0(): boolean {
        return this._chain.getCallHash('Messenger.relay_message') === '74c4f115fd173c6e33ee1b327b4111ff2cde4e46a3753f359e615c6be7839698'
    }

    /**
     * See [`Pallet::relay_message`].
     */
    get asV0(): {msg: v0.CrossDomainMessage} {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}

export class MessengerRelayMessageResponseCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Messenger.relay_message_response')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::relay_message_response`].
     */
    get isV0(): boolean {
        return this._chain.getCallHash('Messenger.relay_message_response') === '74c4f115fd173c6e33ee1b327b4111ff2cde4e46a3753f359e615c6be7839698'
    }

    /**
     * See [`Pallet::relay_message_response`].
     */
    get asV0(): {msg: v0.CrossDomainMessage} {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}

export class RuntimeConfigsSetEnableBalanceTransfersCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'RuntimeConfigs.set_enable_balance_transfers')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::set_enable_balance_transfers`].
     */
    get isV0(): boolean {
        return this._chain.getCallHash('RuntimeConfigs.set_enable_balance_transfers') === '4b0283ee44d0362973eed8434beb4856bf9572b33cba7b212c34885d52a7ec9d'
    }

    /**
     * See [`Pallet::set_enable_balance_transfers`].
     */
    get asV0(): {enableBalanceTransfers: boolean} {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}

export class RuntimeConfigsSetEnableDomainsCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'RuntimeConfigs.set_enable_domains')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::set_enable_domains`].
     */
    get isV0(): boolean {
        return this._chain.getCallHash('RuntimeConfigs.set_enable_domains') === '276df3941c9f9c3be495e857de80f5434591d42480a5fa9d4239df8ffdbf4215'
    }

    /**
     * See [`Pallet::set_enable_domains`].
     */
    get asV0(): {enableDomains: boolean} {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}

export class RuntimeConfigsSetEnableDynamicCostOfStorageCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'RuntimeConfigs.set_enable_dynamic_cost_of_storage')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::set_enable_dynamic_cost_of_storage`].
     */
    get isV0(): boolean {
        return this._chain.getCallHash('RuntimeConfigs.set_enable_dynamic_cost_of_storage') === '7501bfe3353efbeb13bf1dea0acc87b5a87c80c229e6df97f79e650e4261f2fa'
    }

    /**
     * See [`Pallet::set_enable_dynamic_cost_of_storage`].
     */
    get asV0(): {enableDynamicCostOfStorage: boolean} {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}

export class RuntimeConfigsSetEnableNonRootCallsCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'RuntimeConfigs.set_enable_non_root_calls')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::set_enable_non_root_calls`].
     */
    get isV0(): boolean {
        return this._chain.getCallHash('RuntimeConfigs.set_enable_non_root_calls') === 'c08d033fb3ca017f79045348ecf090ebe1a7ac2d6a4287d2231815d6da823398'
    }

    /**
     * See [`Pallet::set_enable_non_root_calls`].
     */
    get asV0(): {enableNonRootCalls: boolean} {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}

export class SubspaceEnableAuthoringByAnyoneCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Subspace.enable_authoring_by_anyone')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::enable_authoring_by_anyone`].
     */
    get isV0(): boolean {
        return this._chain.getCallHash('Subspace.enable_authoring_by_anyone') === '01f2f9c28aa1d4d36a81ff042620b6677d25bf07c2bf4acc37b58658778a4fca'
    }

    /**
     * See [`Pallet::enable_authoring_by_anyone`].
     */
    get asV0(): null {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}

export class SubspaceEnableRewardsAtCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Subspace.enable_rewards_at')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::enable_rewards_at`].
     */
    get isV0(): boolean {
        return this._chain.getCallHash('Subspace.enable_rewards_at') === 'e43296c603c79a1d3231f0971002e356b8f11d65e90d902ee8e58a352db95e38'
    }

    /**
     * See [`Pallet::enable_rewards_at`].
     */
    get asV0(): {enableRewardsAt: v0.EnableRewardsAt} {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}

export class SubspaceEnableSolutionRangeAdjustmentCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Subspace.enable_solution_range_adjustment')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::enable_solution_range_adjustment`].
     */
    get isV0(): boolean {
        return this._chain.getCallHash('Subspace.enable_solution_range_adjustment') === 'b8131d894f8e6b026073d301af2b9294a27af5e9b08c38e806f1987577845094'
    }

    /**
     * See [`Pallet::enable_solution_range_adjustment`].
     */
    get asV0(): {solutionRangeOverride: (bigint | undefined), votingSolutionRangeOverride: (bigint | undefined)} {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}

export class SubspaceReportEquivocationCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Subspace.report_equivocation')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::report_equivocation`].
     */
    get isV0(): boolean {
        return this._chain.getCallHash('Subspace.report_equivocation') === '3b4dd8eb1272754b8223d410185edb75c6fa1763cb0899691848da9838d75c43'
    }

    /**
     * See [`Pallet::report_equivocation`].
     */
    get asV0(): {equivocationProof: v0.EquivocationProof} {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}

export class SubspaceStoreSegmentHeadersCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Subspace.store_segment_headers')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::store_segment_headers`].
     */
    get isV0(): boolean {
        return this._chain.getCallHash('Subspace.store_segment_headers') === '19b7059e1e5234b79bb42a1a5e7740c5d72fda7c9e66a42568f21b149aa05023'
    }

    /**
     * See [`Pallet::store_segment_headers`].
     */
    get asV0(): {segmentHeaders: v0.SegmentHeader[]} {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}

export class SubspaceVoteCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Subspace.vote')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::vote`].
     */
    get isV0(): boolean {
        return this._chain.getCallHash('Subspace.vote') === '24f61d65d0156c2ed6b339e6b6d2fa10dde0e84016eb5a44aba60c82b8c749dc'
    }

    /**
     * See [`Pallet::vote`].
     */
    get asV0(): {signedVote: v0.SignedVote} {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}

export class SudoRemoveKeyCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Sudo.remove_key')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::remove_key`].
     */
    get isV0(): boolean {
        return this._chain.getCallHash('Sudo.remove_key') === '01f2f9c28aa1d4d36a81ff042620b6677d25bf07c2bf4acc37b58658778a4fca'
    }

    /**
     * See [`Pallet::remove_key`].
     */
    get asV0(): null {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}

export class SudoSetKeyCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Sudo.set_key')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::set_key`].
     */
    get isV0(): boolean {
        return this._chain.getCallHash('Sudo.set_key') === 'e634aac3331d47a56ff572c52ad90a648769dfbf2c00d7bd44498b4ee41f6ac7'
    }

    /**
     * See [`Pallet::set_key`].
     */
    get asV0(): {new: v0.MultiAddress} {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}

export class SudoSudoCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Sudo.sudo')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::sudo`].
     */
    get isV0(): boolean {
        return this._chain.getCallHash('Sudo.sudo') === '17bc383b6b213d850f89baad0610bdf7ee2bbf6b522bf6a1ea4749885332cf18'
    }

    /**
     * See [`Pallet::sudo`].
     */
    get asV0(): {call: v0.Call} {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}

export class SudoSudoAsCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Sudo.sudo_as')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::sudo_as`].
     */
    get isV0(): boolean {
        return this._chain.getCallHash('Sudo.sudo_as') === '413945ac977ce12a8eafbef2c3f63a4a733131e4740a01d3e900af683fc8586c'
    }

    /**
     * See [`Pallet::sudo_as`].
     */
    get asV0(): {who: v0.MultiAddress, call: v0.Call} {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}

export class SudoSudoUncheckedWeightCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Sudo.sudo_unchecked_weight')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::sudo_unchecked_weight`].
     */
    get isV0(): boolean {
        return this._chain.getCallHash('Sudo.sudo_unchecked_weight') === '79fb30bf71f203b7e0ee79e784280b54da40158c1427ed750961b7b40b2a0256'
    }

    /**
     * See [`Pallet::sudo_unchecked_weight`].
     */
    get asV0(): {call: v0.Call, weight: v0.Weight} {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}

export class SystemApplyAuthorizedUpgradeCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'System.apply_authorized_upgrade')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::apply_authorized_upgrade`].
     */
    get isV0(): boolean {
        return this._chain.getCallHash('System.apply_authorized_upgrade') === '7bf3d4785d9be7a4872f39cbd3702a66e16f7ee01e4446fb4a05624dc0ec4c93'
    }

    /**
     * See [`Pallet::apply_authorized_upgrade`].
     */
    get asV0(): {code: Uint8Array} {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}

export class SystemAuthorizeUpgradeCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'System.authorize_upgrade')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::authorize_upgrade`].
     */
    get isV0(): boolean {
        return this._chain.getCallHash('System.authorize_upgrade') === '9e5c86c297bd88fae31bc40119e44695818ddc3ab8842b90daeb12771005c70d'
    }

    /**
     * See [`Pallet::authorize_upgrade`].
     */
    get asV0(): {codeHash: Uint8Array} {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}

export class SystemAuthorizeUpgradeWithoutChecksCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'System.authorize_upgrade_without_checks')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::authorize_upgrade_without_checks`].
     */
    get isV0(): boolean {
        return this._chain.getCallHash('System.authorize_upgrade_without_checks') === '9e5c86c297bd88fae31bc40119e44695818ddc3ab8842b90daeb12771005c70d'
    }

    /**
     * See [`Pallet::authorize_upgrade_without_checks`].
     */
    get asV0(): {codeHash: Uint8Array} {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}

export class SystemKillPrefixCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'System.kill_prefix')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::kill_prefix`].
     */
    get isV0(): boolean {
        return this._chain.getCallHash('System.kill_prefix') === 'dfbadd42bee8b18fc81cf78683511061181cffbf7a8ebfd3e5719c389b373d93'
    }

    /**
     * See [`Pallet::kill_prefix`].
     */
    get asV0(): {prefix: Uint8Array, subkeys: number} {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}

export class SystemKillStorageCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'System.kill_storage')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::kill_storage`].
     */
    get isV0(): boolean {
        return this._chain.getCallHash('System.kill_storage') === 'eac21dc14e927c003d9c634fb019d04128f71f8529d2914b10a56b85289c2c11'
    }

    /**
     * See [`Pallet::kill_storage`].
     */
    get asV0(): {keys: Uint8Array[]} {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}

export class SystemRemarkCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'System.remark')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::remark`].
     */
    get isV0(): boolean {
        return this._chain.getCallHash('System.remark') === 'f4e9b5b7572eeae92978087ece9b4f57cb5cab4f16baf5625bb9ec4a432bad63'
    }

    /**
     * See [`Pallet::remark`].
     */
    get asV0(): {remark: Uint8Array} {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}

export class SystemRemarkWithEventCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'System.remark_with_event')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::remark_with_event`].
     */
    get isV0(): boolean {
        return this._chain.getCallHash('System.remark_with_event') === 'f4e9b5b7572eeae92978087ece9b4f57cb5cab4f16baf5625bb9ec4a432bad63'
    }

    /**
     * See [`Pallet::remark_with_event`].
     */
    get asV0(): {remark: Uint8Array} {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}

export class SystemSetCodeCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'System.set_code')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::set_code`].
     */
    get isV0(): boolean {
        return this._chain.getCallHash('System.set_code') === '7bf3d4785d9be7a4872f39cbd3702a66e16f7ee01e4446fb4a05624dc0ec4c93'
    }

    /**
     * See [`Pallet::set_code`].
     */
    get asV0(): {code: Uint8Array} {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}

export class SystemSetCodeWithoutChecksCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'System.set_code_without_checks')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::set_code_without_checks`].
     */
    get isV0(): boolean {
        return this._chain.getCallHash('System.set_code_without_checks') === '7bf3d4785d9be7a4872f39cbd3702a66e16f7ee01e4446fb4a05624dc0ec4c93'
    }

    /**
     * See [`Pallet::set_code_without_checks`].
     */
    get asV0(): {code: Uint8Array} {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}

export class SystemSetHeapPagesCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'System.set_heap_pages')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::set_heap_pages`].
     */
    get isV0(): boolean {
        return this._chain.getCallHash('System.set_heap_pages') === '130172e47c5e517627712b4d084768b98489d920284223ea8ef9c462339b5808'
    }

    /**
     * See [`Pallet::set_heap_pages`].
     */
    get asV0(): {pages: bigint} {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}

export class SystemSetStorageCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'System.set_storage')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::set_storage`].
     */
    get isV0(): boolean {
        return this._chain.getCallHash('System.set_storage') === 'a4fb507615d69849afb1b2ee654006f9be48bb6e960a4674624d6e46e4382083'
    }

    /**
     * See [`Pallet::set_storage`].
     */
    get asV0(): {items: [Uint8Array, Uint8Array][]} {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}

export class TimestampSetCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Timestamp.set')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::set`].
     */
    get isV0(): boolean {
        return this._chain.getCallHash('Timestamp.set') === '6a8b8ba2be107f0853b674eec0026cc440b314db44d0e2c59b36e353355aed14'
    }

    /**
     * See [`Pallet::set`].
     */
    get asV0(): {now: bigint} {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}

export class TransporterTransferCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Transporter.transfer')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::transfer`].
     */
    get isV0(): boolean {
        return this._chain.getCallHash('Transporter.transfer') === '85b7804146d6aa58034d4590fabc2f8bf7966bcf30992a8876b4aa3a00fe18fd'
    }

    /**
     * See [`Pallet::transfer`].
     */
    get asV0(): {dstLocation: v0.Location, amount: bigint} {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}

export class UtilityAsDerivativeCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Utility.as_derivative')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::as_derivative`].
     */
    get isV0(): boolean {
        return this._chain.getCallHash('Utility.as_derivative') === '2fd63d572a49f9b893c429bacb58aff9b70b0c55556193105f58764fea0cdb7f'
    }

    /**
     * See [`Pallet::as_derivative`].
     */
    get asV0(): {index: number, call: v0.Call} {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}

export class UtilityBatchCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Utility.batch')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::batch`].
     */
    get isV0(): boolean {
        return this._chain.getCallHash('Utility.batch') === 'caa2e2f3b6f3fb2e46da75660bda87731321019eb050cbf54ae632c48d65b7ae'
    }

    /**
     * See [`Pallet::batch`].
     */
    get asV0(): {calls: v0.Call[]} {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}

export class UtilityBatchAllCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Utility.batch_all')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::batch_all`].
     */
    get isV0(): boolean {
        return this._chain.getCallHash('Utility.batch_all') === 'caa2e2f3b6f3fb2e46da75660bda87731321019eb050cbf54ae632c48d65b7ae'
    }

    /**
     * See [`Pallet::batch_all`].
     */
    get asV0(): {calls: v0.Call[]} {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}

export class UtilityDispatchAsCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Utility.dispatch_as')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::dispatch_as`].
     */
    get isV0(): boolean {
        return this._chain.getCallHash('Utility.dispatch_as') === '6d69fdc2ae85929eda199ab8c78ac1997d64ee46a09eef133d00353e40922ccb'
    }

    /**
     * See [`Pallet::dispatch_as`].
     */
    get asV0(): {asOrigin: v0.OriginCaller, call: v0.Call} {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}

export class UtilityForceBatchCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Utility.force_batch')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::force_batch`].
     */
    get isV0(): boolean {
        return this._chain.getCallHash('Utility.force_batch') === 'caa2e2f3b6f3fb2e46da75660bda87731321019eb050cbf54ae632c48d65b7ae'
    }

    /**
     * See [`Pallet::force_batch`].
     */
    get asV0(): {calls: v0.Call[]} {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}

export class UtilityWithWeightCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Utility.with_weight')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::with_weight`].
     */
    get isV0(): boolean {
        return this._chain.getCallHash('Utility.with_weight') === '79fb30bf71f203b7e0ee79e784280b54da40158c1427ed750961b7b40b2a0256'
    }

    /**
     * See [`Pallet::with_weight`].
     */
    get asV0(): {call: v0.Call, weight: v0.Weight} {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}

export class VestingClaimCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Vesting.claim')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::claim`].
     */
    get isV0(): boolean {
        return this._chain.getCallHash('Vesting.claim') === '01f2f9c28aa1d4d36a81ff042620b6677d25bf07c2bf4acc37b58658778a4fca'
    }

    /**
     * See [`Pallet::claim`].
     */
    get asV0(): null {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}

export class VestingClaimForCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Vesting.claim_for')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::claim_for`].
     */
    get isV0(): boolean {
        return this._chain.getCallHash('Vesting.claim_for') === 'b1b9d2bb9f2a27d3dfcb795f19a6625638978d1474d5d4dd34d918f46415e1e9'
    }

    /**
     * See [`Pallet::claim_for`].
     */
    get asV0(): {dest: v0.MultiAddress} {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}

export class VestingUpdateVestingSchedulesCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Vesting.update_vesting_schedules')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::update_vesting_schedules`].
     */
    get isV0(): boolean {
        return this._chain.getCallHash('Vesting.update_vesting_schedules') === '5cf5b6a09a9387300d4c3c69374c4045d3ca2a2794fa169a86fec9d8e1f3920c'
    }

    /**
     * See [`Pallet::update_vesting_schedules`].
     */
    get asV0(): {who: v0.MultiAddress, vestingSchedules: v0.VestingSchedule[]} {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}

export class VestingVestedTransferCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Vesting.vested_transfer')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::vested_transfer`].
     */
    get isV0(): boolean {
        return this._chain.getCallHash('Vesting.vested_transfer') === 'f1e312a24c806adf72eb68877c2620386cbfc53664014b14338b9491e044cb0d'
    }

    /**
     * See [`Pallet::vested_transfer`].
     */
    get asV0(): {dest: v0.MultiAddress, schedule: v0.VestingSchedule} {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}
