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
        return this._chain.getCallHash('Balances.force_set_balance') === 'da45c3c00236880f5146e11853687495dde7530c266c3790f8c891c5d99d7e6a'
    }

    /**
     * See [`Pallet::force_set_balance`].
     */
    get asV0(): {who: Uint8Array, newFree: bigint} {
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
        return this._chain.getCallHash('Balances.force_transfer') === '5943ae1ef3513ee6550de75db5107994b40b854e8b6882c4a9016266af9e639b'
    }

    /**
     * See [`Pallet::force_transfer`].
     */
    get asV0(): {source: Uint8Array, dest: Uint8Array, value: bigint} {
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
        return this._chain.getCallHash('Balances.force_unreserve') === '43e3321e3408ebd2b7d4c70d42ffa076463495043e47ddb0fb1fbe3e105f5b2f'
    }

    /**
     * See [`Pallet::force_unreserve`].
     */
    get asV0(): {who: Uint8Array, amount: bigint} {
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
        return this._chain.getCallHash('Balances.transfer_all') === 'f8ce8e577c7dd91d99648a56e9a48561995bf0be3a680c01895f87fb1c0f92e6'
    }

    /**
     * See [`Pallet::transfer_all`].
     */
    get asV0(): {dest: Uint8Array, keepAlive: boolean} {
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
        return this._chain.getCallHash('Balances.transfer_allow_death') === '467dee5087ba2ba771d4bb4c0c9afaa6fa202df3114b49c8db6e165b679e2c4f'
    }

    /**
     * See [`Pallet::transfer_allow_death`].
     */
    get asV0(): {dest: Uint8Array, value: bigint} {
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
        return this._chain.getCallHash('Balances.transfer_keep_alive') === '467dee5087ba2ba771d4bb4c0c9afaa6fa202df3114b49c8db6e165b679e2c4f'
    }

    /**
     * See [`Pallet::transfer_keep_alive`].
     */
    get asV0(): {dest: Uint8Array, value: bigint} {
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
        return this._chain.getCallHash('Balances.upgrade_accounts') === '98c86939083ea3dd6b57441f68ad4536f31d00f6a84739fabffaa645ff8da117'
    }

    /**
     * See [`Pallet::upgrade_accounts`].
     */
    get asV0(): {who: Uint8Array[]} {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}

export class BaseFeeSetBaseFeePerGasCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'BaseFee.set_base_fee_per_gas')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::set_base_fee_per_gas`].
     */
    get isV0(): boolean {
        return this._chain.getCallHash('BaseFee.set_base_fee_per_gas') === 'df74b0f066943b24c635a19ba2763478ab00f9c0373d74c9a771b1a1047ff6d6'
    }

    /**
     * See [`Pallet::set_base_fee_per_gas`].
     */
    get asV0(): {fee: bigint} {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}

export class BaseFeeSetElasticityCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'BaseFee.set_elasticity')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::set_elasticity`].
     */
    get isV0(): boolean {
        return this._chain.getCallHash('BaseFee.set_elasticity') === 'efcd4cd6d4fde4342db62d270df85a88b1c153af50159f9bc1ba1ce1133f2524'
    }

    /**
     * See [`Pallet::set_elasticity`].
     */
    get asV0(): {elasticity: number} {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}

export class BlockFeesSetNextConsensusChainByteFeeCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'BlockFees.set_next_consensus_chain_byte_fee')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::set_next_consensus_chain_byte_fee`].
     */
    get isV0(): boolean {
        return this._chain.getCallHash('BlockFees.set_next_consensus_chain_byte_fee') === 'cad5cb73b04d18b8804c6fa5732a999e45aed9adb05b19680eee4714bed16c14'
    }

    /**
     * See [`Pallet::set_next_consensus_chain_byte_fee`].
     */
    get asV0(): {transactionByteFee: bigint} {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}

export class EvmCallCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'EVM.call')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::call`].
     */
    get isV0(): boolean {
        return this._chain.getCallHash('EVM.call') === 'eeb77745ff27b8506fb1b57e6ef488c35d1ac95be3176673b1921b8ab0f9e942'
    }

    /**
     * See [`Pallet::call`].
     */
    get asV0(): {source: Uint8Array, target: Uint8Array, input: Uint8Array, value: bigint, gasLimit: bigint, maxFeePerGas: bigint, maxPriorityFeePerGas: (bigint | undefined), nonce: (bigint | undefined), accessList: [Uint8Array, Uint8Array[]][]} {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}

export class EvmCreateCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'EVM.create')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::create`].
     */
    get isV0(): boolean {
        return this._chain.getCallHash('EVM.create') === 'b2d4cf6513231e7f717fc6fe95cbd4f5ca7b8b0c1d2979ba0aff39e8cc9397dd'
    }

    /**
     * See [`Pallet::create`].
     */
    get asV0(): {source: Uint8Array, init: Uint8Array, value: bigint, gasLimit: bigint, maxFeePerGas: bigint, maxPriorityFeePerGas: (bigint | undefined), nonce: (bigint | undefined), accessList: [Uint8Array, Uint8Array[]][]} {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}

export class EvmCreate2Call {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'EVM.create2')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::create2`].
     */
    get isV0(): boolean {
        return this._chain.getCallHash('EVM.create2') === '18602ee4331e8cb35f58191422a9e3d8c7f8ad7a7203e110799b90c33ad59ad9'
    }

    /**
     * See [`Pallet::create2`].
     */
    get asV0(): {source: Uint8Array, init: Uint8Array, salt: Uint8Array, value: bigint, gasLimit: bigint, maxFeePerGas: bigint, maxPriorityFeePerGas: (bigint | undefined), nonce: (bigint | undefined), accessList: [Uint8Array, Uint8Array[]][]} {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}

export class EvmWithdrawCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'EVM.withdraw')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::withdraw`].
     */
    get isV0(): boolean {
        return this._chain.getCallHash('EVM.withdraw') === '6213607a84a4a3aa47d755efc366f94b81dbbfa3fe175ebac796707949240fdb'
    }

    /**
     * See [`Pallet::withdraw`].
     */
    get asV0(): {address: Uint8Array, value: bigint} {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}

export class EthereumTransactCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Ethereum.transact')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::transact`].
     */
    get isV0(): boolean {
        return this._chain.getCallHash('Ethereum.transact') === '1415fd2e9fbe639b903297515a3d773224e43cd3e03aa9e6c3f0ae82fe4e93f4'
    }

    /**
     * See [`Pallet::transact`].
     */
    get asV0(): {transaction: v0.TransactionV2} {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}

export class ExecutivePalletSetCodeCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'ExecutivePallet.set_code')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * See [`Pallet::set_code`].
     */
    get isV0(): boolean {
        return this._chain.getCallHash('ExecutivePallet.set_code') === '7bf3d4785d9be7a4872f39cbd3702a66e16f7ee01e4446fb4a05624dc0ec4c93'
    }

    /**
     * See [`Pallet::set_code`].
     */
    get asV0(): {code: Uint8Array} {
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
        return this._chain.getCallHash('Sudo.set_key') === '3c6afa5041fd40be6f0bd612338d44e54b2fc8aedc3ca3dbd6797775549297ba'
    }

    /**
     * See [`Pallet::set_key`].
     */
    get asV0(): {new: Uint8Array} {
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
        return this._chain.getCallHash('Sudo.sudo') === '26b1bb84993a46d2ae640798e38f7be0d3d50bc9941915f1117293e06217b6ba'
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
        return this._chain.getCallHash('Sudo.sudo_as') === '233e96cd29f9885512d96849432a3e29c2d68f32916f25e580531eb5d95624f1'
    }

    /**
     * See [`Pallet::sudo_as`].
     */
    get asV0(): {who: Uint8Array, call: v0.Call} {
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
        return this._chain.getCallHash('Sudo.sudo_unchecked_weight') === '2d1bc3162a881c87544c99bbeee69d42ea8440f081ef2f87cf9c57e7f7581b11'
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
