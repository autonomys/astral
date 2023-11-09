import assert from 'assert'
import {Chain, ChainContext, CallContext, Call, Result, Option} from './support'
import * as v1 from './v1'
import * as v2 from './v2'

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
    get isV1(): boolean {
        return this._chain.getCallHash('Balances.force_set_balance') === 'd0f1dc28aeba8805f92a7e983d0fba2621912dc1665264dd9c38cd3c0c912737'
    }

    /**
     * See [`Pallet::force_set_balance`].
     */
    get asV1(): {who: v1.MultiAddress, newFree: bigint} {
        assert(this.isV1)
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
    get isV1(): boolean {
        return this._chain.getCallHash('Balances.force_transfer') === 'e5944fbe8224a17fe49f9c1d1d01efaf87fb1778fd39618512af54c9ba6f9dff'
    }

    /**
     * See [`Pallet::force_transfer`].
     */
    get asV1(): {source: v1.MultiAddress, dest: v1.MultiAddress, value: bigint} {
        assert(this.isV1)
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
    get isV1(): boolean {
        return this._chain.getCallHash('Balances.force_unreserve') === '30bc48977e2a7ad3fc8ac014948ded50fc54886bad9a1f65b02bb64f27d8a6be'
    }

    /**
     * See [`Pallet::force_unreserve`].
     */
    get asV1(): {who: v1.MultiAddress, amount: bigint} {
        assert(this.isV1)
        return this._chain.decodeCall(this.call)
    }
}

export class BalancesSetBalanceDeprecatedCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Balances.set_balance_deprecated')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::set_balance_deprecated`].
     */
    get isV1(): boolean {
        return this._chain.getCallHash('Balances.set_balance_deprecated') === 'cd8eaf83a985e64a94900c5c58bbc2bbd20e03f5d571cf6065020f1a4281ff19'
    }

    /**
     * See [`Pallet::set_balance_deprecated`].
     */
    get asV1(): {who: v1.MultiAddress, newFree: bigint, oldReserved: bigint} {
        assert(this.isV1)
        return this._chain.decodeCall(this.call)
    }
}

export class BalancesTransferCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Balances.transfer')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::transfer`].
     */
    get isV1(): boolean {
        return this._chain.getCallHash('Balances.transfer') === 'fc85bea9d0d171982f66e8a55667d58dc9a1612bcafe84309942bf47e23e3094'
    }

    /**
     * See [`Pallet::transfer`].
     */
    get asV1(): {dest: v1.MultiAddress, value: bigint} {
        assert(this.isV1)
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
    get isV1(): boolean {
        return this._chain.getCallHash('Balances.transfer_all') === '9c94c2ca9979f6551af6e123fb6b6ba14d026f862f9a023706f8f88c556b355f'
    }

    /**
     * See [`Pallet::transfer_all`].
     */
    get asV1(): {dest: v1.MultiAddress, keepAlive: boolean} {
        assert(this.isV1)
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
    get isV1(): boolean {
        return this._chain.getCallHash('Balances.transfer_allow_death') === 'fc85bea9d0d171982f66e8a55667d58dc9a1612bcafe84309942bf47e23e3094'
    }

    /**
     * See [`Pallet::transfer_allow_death`].
     */
    get asV1(): {dest: v1.MultiAddress, value: bigint} {
        assert(this.isV1)
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
    get isV1(): boolean {
        return this._chain.getCallHash('Balances.transfer_keep_alive') === 'fc85bea9d0d171982f66e8a55667d58dc9a1612bcafe84309942bf47e23e3094'
    }

    /**
     * See [`Pallet::transfer_keep_alive`].
     */
    get asV1(): {dest: v1.MultiAddress, value: bigint} {
        assert(this.isV1)
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
    get isV1(): boolean {
        return this._chain.getCallHash('Balances.upgrade_accounts') === 'e074d5a93414f189b47fbb5d94c57b62cfb9e63808a3c94665eeb2cfe53be8df'
    }

    /**
     * See [`Pallet::upgrade_accounts`].
     */
    get asV1(): {who: Uint8Array[]} {
        assert(this.isV1)
        return this._chain.decodeCall(this.call)
    }
}

export class DomainsAutoStakeBlockRewardsCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Domains.auto_stake_block_rewards')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::auto_stake_block_rewards`].
     */
    get isV1(): boolean {
        return this._chain.getCallHash('Domains.auto_stake_block_rewards') === '8ffd479fbc1b33b18b9485df09465e8f37e733ec4184266f9bbe335de066f5ec'
    }

    /**
     * See [`Pallet::auto_stake_block_rewards`].
     */
    get asV1(): {operatorId: bigint} {
        assert(this.isV1)
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
    get isV1(): boolean {
        return this._chain.getCallHash('Domains.deregister_operator') === '8ffd479fbc1b33b18b9485df09465e8f37e733ec4184266f9bbe335de066f5ec'
    }

    /**
     * See [`Pallet::deregister_operator`].
     */
    get asV1(): {operatorId: bigint} {
        assert(this.isV1)
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
    get isV1(): boolean {
        return this._chain.getCallHash('Domains.instantiate_domain') === 'f2fb2e1766adc302b2d1177f4ae0a100405f14e64416f638d3f0d432276852c5'
    }

    /**
     * See [`Pallet::instantiate_domain`].
     */
    get asV1(): {domainConfig: v1.DomainConfig} {
        assert(this.isV1)
        return this._chain.decodeCall(this.call)
    }

    /**
     * See [`Pallet::instantiate_domain`].
     */
    get isV2(): boolean {
        return this._chain.getCallHash('Domains.instantiate_domain') === '9e6ec7bab2c44f72dcdb642b6157dc8e80a9227bce213879f3e7a906fedaa6c0'
    }

    /**
     * See [`Pallet::instantiate_domain`].
     */
    get asV2(): {domainConfig: v2.DomainConfig, rawGenesis: Uint8Array} {
        assert(this.isV2)
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
    get isV1(): boolean {
        return this._chain.getCallHash('Domains.nominate_operator') === '421439c565b86b79d37b99791bc849f5eed06aea48fd8b3e0e7ebe6031d2f7f5'
    }

    /**
     * See [`Pallet::nominate_operator`].
     */
    get asV1(): {operatorId: bigint, amount: bigint} {
        assert(this.isV1)
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
    get isV1(): boolean {
        return this._chain.getCallHash('Domains.register_domain_runtime') === 'd724fc2d77a6cd5da8f35b0b6e4ddd2280e6273c54aa153159a00a6a5a205c4b'
    }

    /**
     * See [`Pallet::register_domain_runtime`].
     */
    get asV1(): {runtimeName: Uint8Array, runtimeType: v1.RuntimeType, code: Uint8Array} {
        assert(this.isV1)
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
    get isV1(): boolean {
        return this._chain.getCallHash('Domains.register_operator') === '893130193e63d991613dabb9eae4080125a976fe0ef7924d97334daee0c9ce08'
    }

    /**
     * See [`Pallet::register_operator`].
     */
    get asV1(): {domainId: number, amount: bigint, config: v1.OperatorConfig} {
        assert(this.isV1)
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
    get isV1(): boolean {
        return this._chain.getCallHash('Domains.submit_bundle') === 'aef0f85b0417504063a7ead6e112823be185b5e82e204a4c505c9ad0773a031f'
    }

    /**
     * See [`Pallet::submit_bundle`].
     */
    get asV1(): {opaqueBundle: v1.Bundle} {
        assert(this.isV1)
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
    get isV1(): boolean {
        return this._chain.getCallHash('Domains.submit_fraud_proof') === '81d52e0c7de33d88398de6aab2c017e9e8719dece786d20238236c290af58eed'
    }

    /**
     * See [`Pallet::submit_fraud_proof`].
     */
    get asV1(): {fraudProof: v1.FraudProof} {
        assert(this.isV1)
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
    get isV1(): boolean {
        return this._chain.getCallHash('Domains.switch_domain') === '74d2d29b12e7f73697440e4c37b44221ef01aec8716b9c5f1bc8b95948c21642'
    }

    /**
     * See [`Pallet::switch_domain`].
     */
    get asV1(): {operatorId: bigint, newDomainId: number} {
        assert(this.isV1)
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
    get isV1(): boolean {
        return this._chain.getCallHash('Domains.upgrade_domain_runtime') === '2286d8522d818ce5f2967ebc2741f0ed01ca58b9b87918dfa899c8799d2ed4c3'
    }

    /**
     * See [`Pallet::upgrade_domain_runtime`].
     */
    get asV1(): {runtimeId: number, code: Uint8Array} {
        assert(this.isV1)
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
    get isV1(): boolean {
        return this._chain.getCallHash('Domains.withdraw_stake') === '79487a357f90f713eb5d2263a90cc8df0fbd35eb9b921e828114a1e85cc61c9d'
    }

    /**
     * See [`Pallet::withdraw_stake`].
     */
    get asV1(): {operatorId: bigint, withdraw: v1.Withdraw} {
        assert(this.isV1)
        return this._chain.decodeCall(this.call)
    }
}

export class FeedsCloseCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Feeds.close')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::close`].
     */
    get isV1(): boolean {
        return this._chain.getCallHash('Feeds.close') === '215745b2763961a0f0dd6ee97e822fbabd09557e006da37ed1d2d580fbb0e209'
    }

    /**
     * See [`Pallet::close`].
     */
    get asV1(): {feedId: bigint} {
        assert(this.isV1)
        return this._chain.decodeCall(this.call)
    }
}

export class FeedsCreateCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Feeds.create')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::create`].
     */
    get isV1(): boolean {
        return this._chain.getCallHash('Feeds.create') === '66c965d9a88f038143b233616e89f9c8ae80b322d24d4937d7d311ec2a2b6347'
    }

    /**
     * See [`Pallet::create`].
     */
    get asV1(): {feedProcessorId: v1.FeedProcessorKind, initData: (Uint8Array | undefined)} {
        assert(this.isV1)
        return this._chain.decodeCall(this.call)
    }
}

export class FeedsPutCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Feeds.put')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::put`].
     */
    get isV1(): boolean {
        return this._chain.getCallHash('Feeds.put') === 'e38c212433ff4faa0fb098d7a66d9af9a81e760527a4fcbcef9f88e764e7a784'
    }

    /**
     * See [`Pallet::put`].
     */
    get asV1(): {feedId: bigint, object: Uint8Array} {
        assert(this.isV1)
        return this._chain.decodeCall(this.call)
    }
}

export class FeedsTransferCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Feeds.transfer')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::transfer`].
     */
    get isV1(): boolean {
        return this._chain.getCallHash('Feeds.transfer') === '3328c86a3211eb2f91fc3a8d321503b5fa4fbafe3b37514cc70787fd332becb2'
    }

    /**
     * See [`Pallet::transfer`].
     */
    get asV1(): {feedId: bigint, newOwner: v1.MultiAddress} {
        assert(this.isV1)
        return this._chain.decodeCall(this.call)
    }
}

export class FeedsUpdateCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Feeds.update')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::update`].
     */
    get isV1(): boolean {
        return this._chain.getCallHash('Feeds.update') === '74416376cca34f04132f5d713868526654c3ce9bbe110edbfa9c70ece8bbd84e'
    }

    /**
     * See [`Pallet::update`].
     */
    get asV1(): {feedId: bigint, feedProcessorId: v1.FeedProcessorKind, initData: (Uint8Array | undefined)} {
        assert(this.isV1)
        return this._chain.decodeCall(this.call)
    }
}

export class ObjectStorePutCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'ObjectStore.put')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::put`].
     */
    get isV1(): boolean {
        return this._chain.getCallHash('ObjectStore.put') === 'db1b3cc100eb94c9fc90e677c8e1837278395ece67b068bc0462ae353315387d'
    }

    /**
     * See [`Pallet::put`].
     */
    get asV1(): {object: Uint8Array} {
        assert(this.isV1)
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
    get isV1(): boolean {
        return this._chain.getCallHash('Subspace.enable_authoring_by_anyone') === '01f2f9c28aa1d4d36a81ff042620b6677d25bf07c2bf4acc37b58658778a4fca'
    }

    /**
     * See [`Pallet::enable_authoring_by_anyone`].
     */
    get asV1(): null {
        assert(this.isV1)
        return this._chain.decodeCall(this.call)
    }
}

export class SubspaceEnableRewardsCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Subspace.enable_rewards')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::enable_rewards`].
     */
    get isV1(): boolean {
        return this._chain.getCallHash('Subspace.enable_rewards') === '1bdaf75fb5be86cd00e96445c81877b4da02821f453e6b767650c5299dd02b65'
    }

    /**
     * See [`Pallet::enable_rewards`].
     */
    get asV1(): {height: (number | undefined)} {
        assert(this.isV1)
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
    get isV1(): boolean {
        return this._chain.getCallHash('Subspace.enable_solution_range_adjustment') === 'b8131d894f8e6b026073d301af2b9294a27af5e9b08c38e806f1987577845094'
    }

    /**
     * See [`Pallet::enable_solution_range_adjustment`].
     */
    get asV1(): {solutionRangeOverride: (bigint | undefined), votingSolutionRangeOverride: (bigint | undefined)} {
        assert(this.isV1)
        return this._chain.decodeCall(this.call)
    }
}

export class SubspaceEnableStorageAccessCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Subspace.enable_storage_access')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::enable_storage_access`].
     */
    get isV1(): boolean {
        return this._chain.getCallHash('Subspace.enable_storage_access') === '01f2f9c28aa1d4d36a81ff042620b6677d25bf07c2bf4acc37b58658778a4fca'
    }

    /**
     * See [`Pallet::enable_storage_access`].
     */
    get asV1(): null {
        assert(this.isV1)
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
    get isV1(): boolean {
        return this._chain.getCallHash('Subspace.report_equivocation') === '3b4dd8eb1272754b8223d410185edb75c6fa1763cb0899691848da9838d75c43'
    }

    /**
     * See [`Pallet::report_equivocation`].
     */
    get asV1(): {equivocationProof: v1.EquivocationProof} {
        assert(this.isV1)
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
    get isV1(): boolean {
        return this._chain.getCallHash('Subspace.store_segment_headers') === '59a81d6113b19526de1426393eb3f6f99fd5b1571272159f3399242e8ed6730d'
    }

    /**
     * See [`Pallet::store_segment_headers`].
     */
    get asV1(): {segmentHeaders: v1.SegmentHeader[]} {
        assert(this.isV1)
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
    get isV1(): boolean {
        return this._chain.getCallHash('Subspace.vote') === 'e557cbec9e62a4221a127615ed68970f8d78cd68d7f06408c5af21dff5cd0d97'
    }

    /**
     * See [`Pallet::vote`].
     */
    get asV1(): {signedVote: v1.SignedVote} {
        assert(this.isV1)
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
    get isV1(): boolean {
        return this._chain.getCallHash('Sudo.set_key') === 'e634aac3331d47a56ff572c52ad90a648769dfbf2c00d7bd44498b4ee41f6ac7'
    }

    /**
     * See [`Pallet::set_key`].
     */
    get asV1(): {new: v1.MultiAddress} {
        assert(this.isV1)
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
    get isV1(): boolean {
        return this._chain.getCallHash('Sudo.sudo') === '290ebb9b9ee7cb9506ab3cabbcc6107dec8b403a1431e154f70963449c362592'
    }

    /**
     * See [`Pallet::sudo`].
     */
    get asV1(): {call: v1.Call} {
        assert(this.isV1)
        return this._chain.decodeCall(this.call)
    }

    /**
     * See [`Pallet::sudo`].
     */
    get isV2(): boolean {
        return this._chain.getCallHash('Sudo.sudo') === '021eb4ca3d0532cc62f6c3b37856e94bc2d24ad1fa5754c65c8a901d771c6495'
    }

    /**
     * See [`Pallet::sudo`].
     */
    get asV2(): {call: v2.Call} {
        assert(this.isV2)
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
    get isV1(): boolean {
        return this._chain.getCallHash('Sudo.sudo_as') === 'a6cd9bb26c4824f8372d0dd08c27c41f42b2da5526563a8a7af320700df29b25'
    }

    /**
     * See [`Pallet::sudo_as`].
     */
    get asV1(): {who: v1.MultiAddress, call: v1.Call} {
        assert(this.isV1)
        return this._chain.decodeCall(this.call)
    }

    /**
     * See [`Pallet::sudo_as`].
     */
    get isV2(): boolean {
        return this._chain.getCallHash('Sudo.sudo_as') === '8f85fae7a39d88ea5b800a8de3a45c60496ce7e62c322b3b47b0e62a9025cfb4'
    }

    /**
     * See [`Pallet::sudo_as`].
     */
    get asV2(): {who: v2.MultiAddress, call: v2.Call} {
        assert(this.isV2)
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
    get isV1(): boolean {
        return this._chain.getCallHash('Sudo.sudo_unchecked_weight') === '4fdd386b71b0304e0018897b1e5253379503ed36ae1880a2b4142b17ea6a2bfd'
    }

    /**
     * See [`Pallet::sudo_unchecked_weight`].
     */
    get asV1(): {call: v1.Call, weight: v1.Weight} {
        assert(this.isV1)
        return this._chain.decodeCall(this.call)
    }

    /**
     * See [`Pallet::sudo_unchecked_weight`].
     */
    get isV2(): boolean {
        return this._chain.getCallHash('Sudo.sudo_unchecked_weight') === 'b4dca4e1c97f2ece801f824c7075ae7595136d3657931968fd4186ae36009e07'
    }

    /**
     * See [`Pallet::sudo_unchecked_weight`].
     */
    get asV2(): {call: v2.Call, weight: v2.Weight} {
        assert(this.isV2)
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
    get isV1(): boolean {
        return this._chain.getCallHash('System.kill_prefix') === 'dfbadd42bee8b18fc81cf78683511061181cffbf7a8ebfd3e5719c389b373d93'
    }

    /**
     * See [`Pallet::kill_prefix`].
     */
    get asV1(): {prefix: Uint8Array, subkeys: number} {
        assert(this.isV1)
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
    get isV1(): boolean {
        return this._chain.getCallHash('System.kill_storage') === 'eac21dc14e927c003d9c634fb019d04128f71f8529d2914b10a56b85289c2c11'
    }

    /**
     * See [`Pallet::kill_storage`].
     */
    get asV1(): {keys: Uint8Array[]} {
        assert(this.isV1)
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
    get isV1(): boolean {
        return this._chain.getCallHash('System.remark') === 'f4e9b5b7572eeae92978087ece9b4f57cb5cab4f16baf5625bb9ec4a432bad63'
    }

    /**
     * See [`Pallet::remark`].
     */
    get asV1(): {remark: Uint8Array} {
        assert(this.isV1)
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
    get isV1(): boolean {
        return this._chain.getCallHash('System.remark_with_event') === 'f4e9b5b7572eeae92978087ece9b4f57cb5cab4f16baf5625bb9ec4a432bad63'
    }

    /**
     * See [`Pallet::remark_with_event`].
     */
    get asV1(): {remark: Uint8Array} {
        assert(this.isV1)
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
    get isV1(): boolean {
        return this._chain.getCallHash('System.set_code') === '7bf3d4785d9be7a4872f39cbd3702a66e16f7ee01e4446fb4a05624dc0ec4c93'
    }

    /**
     * See [`Pallet::set_code`].
     */
    get asV1(): {code: Uint8Array} {
        assert(this.isV1)
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
    get isV1(): boolean {
        return this._chain.getCallHash('System.set_code_without_checks') === '7bf3d4785d9be7a4872f39cbd3702a66e16f7ee01e4446fb4a05624dc0ec4c93'
    }

    /**
     * See [`Pallet::set_code_without_checks`].
     */
    get asV1(): {code: Uint8Array} {
        assert(this.isV1)
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
    get isV1(): boolean {
        return this._chain.getCallHash('System.set_heap_pages') === '130172e47c5e517627712b4d084768b98489d920284223ea8ef9c462339b5808'
    }

    /**
     * See [`Pallet::set_heap_pages`].
     */
    get asV1(): {pages: bigint} {
        assert(this.isV1)
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
    get isV1(): boolean {
        return this._chain.getCallHash('System.set_storage') === 'a4fb507615d69849afb1b2ee654006f9be48bb6e960a4674624d6e46e4382083'
    }

    /**
     * See [`Pallet::set_storage`].
     */
    get asV1(): {items: [Uint8Array, Uint8Array][]} {
        assert(this.isV1)
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
    get isV1(): boolean {
        return this._chain.getCallHash('Timestamp.set') === '6a8b8ba2be107f0853b674eec0026cc440b314db44d0e2c59b36e353355aed14'
    }

    /**
     * See [`Pallet::set`].
     */
    get asV1(): {now: bigint} {
        assert(this.isV1)
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
    get isV1(): boolean {
        return this._chain.getCallHash('Utility.as_derivative') === 'bbd1ab9eaf3ce7f5b23d83cccc0f5e89ce56d519950bfa4542ef477a81c8bdbf'
    }

    /**
     * See [`Pallet::as_derivative`].
     */
    get asV1(): {index: number, call: v1.Call} {
        assert(this.isV1)
        return this._chain.decodeCall(this.call)
    }

    /**
     * See [`Pallet::as_derivative`].
     */
    get isV2(): boolean {
        return this._chain.getCallHash('Utility.as_derivative') === 'a462d7f1cb03d449c0a9fc04912723638cac57b370fbe4d4a71a0b25dc51bd01'
    }

    /**
     * See [`Pallet::as_derivative`].
     */
    get asV2(): {index: number, call: v2.Call} {
        assert(this.isV2)
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
    get isV1(): boolean {
        return this._chain.getCallHash('Utility.batch') === '8f3ee40845b5299396e8404058d8c44d38df945134f46a9d8c6eed037a1e1ff1'
    }

    /**
     * See [`Pallet::batch`].
     */
    get asV1(): {calls: v1.Call[]} {
        assert(this.isV1)
        return this._chain.decodeCall(this.call)
    }

    /**
     * See [`Pallet::batch`].
     */
    get isV2(): boolean {
        return this._chain.getCallHash('Utility.batch') === 'e7824a8166f28e08d9929c73f34b81e35a6e4df30c6bfa21e170295d48761b3e'
    }

    /**
     * See [`Pallet::batch`].
     */
    get asV2(): {calls: v2.Call[]} {
        assert(this.isV2)
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
    get isV1(): boolean {
        return this._chain.getCallHash('Utility.batch_all') === '8f3ee40845b5299396e8404058d8c44d38df945134f46a9d8c6eed037a1e1ff1'
    }

    /**
     * See [`Pallet::batch_all`].
     */
    get asV1(): {calls: v1.Call[]} {
        assert(this.isV1)
        return this._chain.decodeCall(this.call)
    }

    /**
     * See [`Pallet::batch_all`].
     */
    get isV2(): boolean {
        return this._chain.getCallHash('Utility.batch_all') === 'e7824a8166f28e08d9929c73f34b81e35a6e4df30c6bfa21e170295d48761b3e'
    }

    /**
     * See [`Pallet::batch_all`].
     */
    get asV2(): {calls: v2.Call[]} {
        assert(this.isV2)
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
    get isV1(): boolean {
        return this._chain.getCallHash('Utility.dispatch_as') === 'a1579f2a13e29309e7bdbd9082dc5b99bb7eb54b81e70334cee71bd9115adae7'
    }

    /**
     * See [`Pallet::dispatch_as`].
     */
    get asV1(): {asOrigin: v1.OriginCaller, call: v1.Call} {
        assert(this.isV1)
        return this._chain.decodeCall(this.call)
    }

    /**
     * See [`Pallet::dispatch_as`].
     */
    get isV2(): boolean {
        return this._chain.getCallHash('Utility.dispatch_as') === '90b9ef03a1a91d62b1d46aeb52e09e2e226dd1d2761e623741ac61df4b16cd19'
    }

    /**
     * See [`Pallet::dispatch_as`].
     */
    get asV2(): {asOrigin: v2.OriginCaller, call: v2.Call} {
        assert(this.isV2)
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
    get isV1(): boolean {
        return this._chain.getCallHash('Utility.force_batch') === '8f3ee40845b5299396e8404058d8c44d38df945134f46a9d8c6eed037a1e1ff1'
    }

    /**
     * See [`Pallet::force_batch`].
     */
    get asV1(): {calls: v1.Call[]} {
        assert(this.isV1)
        return this._chain.decodeCall(this.call)
    }

    /**
     * See [`Pallet::force_batch`].
     */
    get isV2(): boolean {
        return this._chain.getCallHash('Utility.force_batch') === 'e7824a8166f28e08d9929c73f34b81e35a6e4df30c6bfa21e170295d48761b3e'
    }

    /**
     * See [`Pallet::force_batch`].
     */
    get asV2(): {calls: v2.Call[]} {
        assert(this.isV2)
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
    get isV1(): boolean {
        return this._chain.getCallHash('Utility.with_weight') === '4fdd386b71b0304e0018897b1e5253379503ed36ae1880a2b4142b17ea6a2bfd'
    }

    /**
     * See [`Pallet::with_weight`].
     */
    get asV1(): {call: v1.Call, weight: v1.Weight} {
        assert(this.isV1)
        return this._chain.decodeCall(this.call)
    }

    /**
     * See [`Pallet::with_weight`].
     */
    get isV2(): boolean {
        return this._chain.getCallHash('Utility.with_weight') === 'b4dca4e1c97f2ece801f824c7075ae7595136d3657931968fd4186ae36009e07'
    }

    /**
     * See [`Pallet::with_weight`].
     */
    get asV2(): {call: v2.Call, weight: v2.Weight} {
        assert(this.isV2)
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
    get isV1(): boolean {
        return this._chain.getCallHash('Vesting.claim') === '01f2f9c28aa1d4d36a81ff042620b6677d25bf07c2bf4acc37b58658778a4fca'
    }

    /**
     * See [`Pallet::claim`].
     */
    get asV1(): null {
        assert(this.isV1)
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
    get isV1(): boolean {
        return this._chain.getCallHash('Vesting.claim_for') === 'b1b9d2bb9f2a27d3dfcb795f19a6625638978d1474d5d4dd34d918f46415e1e9'
    }

    /**
     * See [`Pallet::claim_for`].
     */
    get asV1(): {dest: v1.MultiAddress} {
        assert(this.isV1)
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
    get isV1(): boolean {
        return this._chain.getCallHash('Vesting.update_vesting_schedules') === '5cf5b6a09a9387300d4c3c69374c4045d3ca2a2794fa169a86fec9d8e1f3920c'
    }

    /**
     * See [`Pallet::update_vesting_schedules`].
     */
    get asV1(): {who: v1.MultiAddress, vestingSchedules: v1.VestingSchedule[]} {
        assert(this.isV1)
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
    get isV1(): boolean {
        return this._chain.getCallHash('Vesting.vested_transfer') === 'f1e312a24c806adf72eb68877c2620386cbfc53664014b14338b9491e044cb0d'
    }

    /**
     * See [`Pallet::vested_transfer`].
     */
    get asV1(): {dest: v1.MultiAddress, schedule: v1.VestingSchedule} {
        assert(this.isV1)
        return this._chain.decodeCall(this.call)
    }
}
