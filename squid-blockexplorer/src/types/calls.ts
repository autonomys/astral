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
     * Set the regular balance of a given account.
     * 
     * The dispatch origin for this call is `root`.
     */
    get isV0(): boolean {
        return this._chain.getCallHash('Balances.force_set_balance') === 'da45c3c00236880f5146e11853687495dde7530c266c3790f8c891c5d99d7e6a'
    }

    /**
     * Set the regular balance of a given account.
     * 
     * The dispatch origin for this call is `root`.
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
     * Exactly as `transfer_allow_death`, except the origin must be root and the source account
     * may be specified.
     */
    get isV0(): boolean {
        return this._chain.getCallHash('Balances.force_transfer') === '5943ae1ef3513ee6550de75db5107994b40b854e8b6882c4a9016266af9e639b'
    }

    /**
     * Exactly as `transfer_allow_death`, except the origin must be root and the source account
     * may be specified.
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
     * Unreserve some balance from a user by force.
     * 
     * Can only be called by ROOT.
     */
    get isV0(): boolean {
        return this._chain.getCallHash('Balances.force_unreserve') === '43e3321e3408ebd2b7d4c70d42ffa076463495043e47ddb0fb1fbe3e105f5b2f'
    }

    /**
     * Unreserve some balance from a user by force.
     * 
     * Can only be called by ROOT.
     */
    get asV0(): {who: Uint8Array, amount: bigint} {
        assert(this.isV0)
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
     * Set the regular balance of a given account; it also takes a reserved balance but this
     * must be the same as the account's current reserved balance.
     * 
     * The dispatch origin for this call is `root`.
     * 
     * WARNING: This call is DEPRECATED! Use `force_set_balance` instead.
     */
    get isV0(): boolean {
        return this._chain.getCallHash('Balances.set_balance_deprecated') === 'f3b252041566bf9f8a5123ad6f426e3be195e9866b82ab8ea5346211b8f13c54'
    }

    /**
     * Set the regular balance of a given account; it also takes a reserved balance but this
     * must be the same as the account's current reserved balance.
     * 
     * The dispatch origin for this call is `root`.
     * 
     * WARNING: This call is DEPRECATED! Use `force_set_balance` instead.
     */
    get asV0(): {who: Uint8Array, newFree: bigint, oldReserved: bigint} {
        assert(this.isV0)
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
     * Alias for `transfer_allow_death`, provided only for name-wise compatibility.
     * 
     * WARNING: DEPRECATED! Will be released in approximately 3 months.
     */
    get isV0(): boolean {
        return this._chain.getCallHash('Balances.transfer') === '467dee5087ba2ba771d4bb4c0c9afaa6fa202df3114b49c8db6e165b679e2c4f'
    }

    /**
     * Alias for `transfer_allow_death`, provided only for name-wise compatibility.
     * 
     * WARNING: DEPRECATED! Will be released in approximately 3 months.
     */
    get asV0(): {dest: Uint8Array, value: bigint} {
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
     * Transfer the entire transferable balance from the caller account.
     * 
     * NOTE: This function only attempts to transfer _transferable_ balances. This means that
     * any locked, reserved, or existential deposits (when `keep_alive` is `true`), will not be
     * transferred by this function. To ensure that this function results in a killed account,
     * you might need to prepare the account by removing any reference counters, storage
     * deposits, etc...
     * 
     * The dispatch origin of this call must be Signed.
     * 
     * - `dest`: The recipient of the transfer.
     * - `keep_alive`: A boolean to determine if the `transfer_all` operation should send all
     *   of the funds the account has, causing the sender account to be killed (false), or
     *   transfer everything except at least the existential deposit, which will guarantee to
     *   keep the sender account alive (true).
     */
    get isV0(): boolean {
        return this._chain.getCallHash('Balances.transfer_all') === 'f8ce8e577c7dd91d99648a56e9a48561995bf0be3a680c01895f87fb1c0f92e6'
    }

    /**
     * Transfer the entire transferable balance from the caller account.
     * 
     * NOTE: This function only attempts to transfer _transferable_ balances. This means that
     * any locked, reserved, or existential deposits (when `keep_alive` is `true`), will not be
     * transferred by this function. To ensure that this function results in a killed account,
     * you might need to prepare the account by removing any reference counters, storage
     * deposits, etc...
     * 
     * The dispatch origin of this call must be Signed.
     * 
     * - `dest`: The recipient of the transfer.
     * - `keep_alive`: A boolean to determine if the `transfer_all` operation should send all
     *   of the funds the account has, causing the sender account to be killed (false), or
     *   transfer everything except at least the existential deposit, which will guarantee to
     *   keep the sender account alive (true).
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
     * Transfer some liquid free balance to another account.
     * 
     * `transfer_allow_death` will set the `FreeBalance` of the sender and receiver.
     * If the sender's account is below the existential deposit as a result
     * of the transfer, the account will be reaped.
     * 
     * The dispatch origin for this call must be `Signed` by the transactor.
     */
    get isV0(): boolean {
        return this._chain.getCallHash('Balances.transfer_allow_death') === '467dee5087ba2ba771d4bb4c0c9afaa6fa202df3114b49c8db6e165b679e2c4f'
    }

    /**
     * Transfer some liquid free balance to another account.
     * 
     * `transfer_allow_death` will set the `FreeBalance` of the sender and receiver.
     * If the sender's account is below the existential deposit as a result
     * of the transfer, the account will be reaped.
     * 
     * The dispatch origin for this call must be `Signed` by the transactor.
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
     * Same as the [`transfer_allow_death`] call, but with a check that the transfer will not
     * kill the origin account.
     * 
     * 99% of the time you want [`transfer_allow_death`] instead.
     * 
     * [`transfer_allow_death`]: struct.Pallet.html#method.transfer
     */
    get isV0(): boolean {
        return this._chain.getCallHash('Balances.transfer_keep_alive') === '467dee5087ba2ba771d4bb4c0c9afaa6fa202df3114b49c8db6e165b679e2c4f'
    }

    /**
     * Same as the [`transfer_allow_death`] call, but with a check that the transfer will not
     * kill the origin account.
     * 
     * 99% of the time you want [`transfer_allow_death`] instead.
     * 
     * [`transfer_allow_death`]: struct.Pallet.html#method.transfer
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
     * Upgrade a specified account.
     * 
     * - `origin`: Must be `Signed`.
     * - `who`: The account to be upgraded.
     * 
     * This will waive the transaction fee if at least all but 10% of the accounts needed to
     * be upgraded. (We let some not have to be upgraded just in order to allow for the
     * possibililty of churn).
     */
    get isV0(): boolean {
        return this._chain.getCallHash('Balances.upgrade_accounts') === '98c86939083ea3dd6b57441f68ad4536f31d00f6a84739fabffaa645ff8da117'
    }

    /**
     * Upgrade a specified account.
     * 
     * - `origin`: Must be `Signed`.
     * - `who`: The account to be upgraded.
     * 
     * This will waive the transaction fee if at least all but 10% of the accounts needed to
     * be upgraded. (We let some not have to be upgraded just in order to allow for the
     * possibililty of churn).
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

    get isV0(): boolean {
        return this._chain.getCallHash('BaseFee.set_base_fee_per_gas') === 'df74b0f066943b24c635a19ba2763478ab00f9c0373d74c9a771b1a1047ff6d6'
    }

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

    get isV0(): boolean {
        return this._chain.getCallHash('BaseFee.set_elasticity') === 'efcd4cd6d4fde4342db62d270df85a88b1c153af50159f9bc1ba1ce1133f2524'
    }

    get asV0(): {elasticity: number} {
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
     * Issue an EVM call operation. This is similar to a message call transaction in Ethereum.
     */
    get isV0(): boolean {
        return this._chain.getCallHash('EVM.call') === 'eeb77745ff27b8506fb1b57e6ef488c35d1ac95be3176673b1921b8ab0f9e942'
    }

    /**
     * Issue an EVM call operation. This is similar to a message call transaction in Ethereum.
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
     * Issue an EVM create operation. This is similar to a contract creation transaction in
     * Ethereum.
     */
    get isV0(): boolean {
        return this._chain.getCallHash('EVM.create') === 'b2d4cf6513231e7f717fc6fe95cbd4f5ca7b8b0c1d2979ba0aff39e8cc9397dd'
    }

    /**
     * Issue an EVM create operation. This is similar to a contract creation transaction in
     * Ethereum.
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
     * Issue an EVM create2 operation.
     */
    get isV0(): boolean {
        return this._chain.getCallHash('EVM.create2') === '18602ee4331e8cb35f58191422a9e3d8c7f8ad7a7203e110799b90c33ad59ad9'
    }

    /**
     * Issue an EVM create2 operation.
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
     * Withdraw balance from EVM into currency/balances pallet.
     */
    get isV0(): boolean {
        return this._chain.getCallHash('EVM.withdraw') === '6213607a84a4a3aa47d755efc366f94b81dbbfa3fe175ebac796707949240fdb'
    }

    /**
     * Withdraw balance from EVM into currency/balances pallet.
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
     * Transact an Ethereum transaction.
     */
    get isV0(): boolean {
        return this._chain.getCallHash('Ethereum.transact') === '1415fd2e9fbe639b903297515a3d773224e43cd3e03aa9e6c3f0ae82fe4e93f4'
    }

    /**
     * Transact an Ethereum transaction.
     */
    get asV0(): {transaction: v0.TransactionV2} {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}

export class ExecutivePalletSudoUncheckedWeightUnsignedCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'ExecutivePallet.sudo_unchecked_weight_unsigned')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Unsigned version of `frame_sudo::sudo_unchecked_weight`.
     */
    get isV0(): boolean {
        return this._chain.getCallHash('ExecutivePallet.sudo_unchecked_weight_unsigned') === '60dcfcf5b49945e62163a9aa3f954affc6355969bb7fcc500cfd6f9dcceca316'
    }

    /**
     * Unsigned version of `frame_sudo::sudo_unchecked_weight`.
     */
    get asV0(): {call: v0.Call, weight: v0.Weight} {
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
     * An open channel is closed with a foreign domain.
     * Channel is set to Closed and do not accept or receive any messages.
     * Only a root user can close an open channel.
     */
    get isV0(): boolean {
        return this._chain.getCallHash('Messenger.close_channel') === '642eb9d600ff974cfa725478a9f8e2db54b5833568b827e3d763a6d398c2d362'
    }

    /**
     * An open channel is closed with a foreign domain.
     * Channel is set to Closed and do not accept or receive any messages.
     * Only a root user can close an open channel.
     */
    get asV0(): {domainId: number, channelId: bigint} {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}

export class MessengerExitRelayerSetCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Messenger.exit_relayer_set')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Declare the desire to exit relaying for this domain.
     */
    get isV0(): boolean {
        return this._chain.getCallHash('Messenger.exit_relayer_set') === 'e17993f2e68388545e1f82a7adf9d4c32d75db317f51550f44ce0bb3a7afd846'
    }

    /**
     * Declare the desire to exit relaying for this domain.
     */
    get asV0(): {relayerId: Uint8Array} {
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
     * A new Channel is initiated with a foreign domain.
     * Next Channel ID is used to assign the new channel.
     * Channel is set to initiated and do not accept or receive any messages.
     * Only a root user can create the channel.
     */
    get isV0(): boolean {
        return this._chain.getCallHash('Messenger.initiate_channel') === 'a81aaa7a88b7ac0bb6ea2ebb4975ce77b220338a0f5a328becd62340b13febcb'
    }

    /**
     * A new Channel is initiated with a foreign domain.
     * Next Channel ID is used to assign the new channel.
     * Channel is set to initiated and do not accept or receive any messages.
     * Only a root user can create the channel.
     */
    get asV0(): {dstDomainId: number, params: v0.InitiateChannelParams} {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}

export class MessengerJoinRelayerSetCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'Messenger.join_relayer_set')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Declare the desire to become a relayer for this domain by reserving the relayer deposit.
     */
    get isV0(): boolean {
        return this._chain.getCallHash('Messenger.join_relayer_set') === 'e17993f2e68388545e1f82a7adf9d4c32d75db317f51550f44ce0bb3a7afd846'
    }

    /**
     * Declare the desire to become a relayer for this domain by reserving the relayer deposit.
     */
    get asV0(): {relayerId: Uint8Array} {
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
     * Receives an Inbox message that needs to be validated and processed.
     */
    get isV0(): boolean {
        return this._chain.getCallHash('Messenger.relay_message') === 'a304d105f9302621850e0d48566bc8cabb7a0d0c6040697380bde1ddf188414a'
    }

    /**
     * Receives an Inbox message that needs to be validated and processed.
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
     * Receives a response from the dst_domain for a message in Outbox.
     */
    get isV0(): boolean {
        return this._chain.getCallHash('Messenger.relay_message_response') === 'a304d105f9302621850e0d48566bc8cabb7a0d0c6040697380bde1ddf188414a'
    }

    /**
     * Receives a response from the dst_domain for a message in Outbox.
     */
    get asV0(): {msg: v0.CrossDomainMessage} {
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
     * Authenticates the current sudo key and sets the given AccountId (`new`) as the new sudo
     * key.
     * 
     * The dispatch origin for this call must be _Signed_.
     * 
     * ## Complexity
     * - O(1).
     */
    get isV0(): boolean {
        return this._chain.getCallHash('Sudo.set_key') === '3c6afa5041fd40be6f0bd612338d44e54b2fc8aedc3ca3dbd6797775549297ba'
    }

    /**
     * Authenticates the current sudo key and sets the given AccountId (`new`) as the new sudo
     * key.
     * 
     * The dispatch origin for this call must be _Signed_.
     * 
     * ## Complexity
     * - O(1).
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
     * Authenticates the sudo key and dispatches a function call with `Root` origin.
     * 
     * The dispatch origin for this call must be _Signed_.
     * 
     * ## Complexity
     * - O(1).
     */
    get isV0(): boolean {
        return this._chain.getCallHash('Sudo.sudo') === '6105853e85637d769289840df0cbe8147c7a770c425cd00a0a568f3e081bafca'
    }

    /**
     * Authenticates the sudo key and dispatches a function call with `Root` origin.
     * 
     * The dispatch origin for this call must be _Signed_.
     * 
     * ## Complexity
     * - O(1).
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
     * Authenticates the sudo key and dispatches a function call with `Signed` origin from
     * a given account.
     * 
     * The dispatch origin for this call must be _Signed_.
     * 
     * ## Complexity
     * - O(1).
     */
    get isV0(): boolean {
        return this._chain.getCallHash('Sudo.sudo_as') === '467fcefc492837d423277f7b3bd75768d253f14b25492065ebfba0dfb22d7037'
    }

    /**
     * Authenticates the sudo key and dispatches a function call with `Signed` origin from
     * a given account.
     * 
     * The dispatch origin for this call must be _Signed_.
     * 
     * ## Complexity
     * - O(1).
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
     * Authenticates the sudo key and dispatches a function call with `Root` origin.
     * This function does not check the weight of the call, and instead allows the
     * Sudo user to specify the weight of the call.
     * 
     * The dispatch origin for this call must be _Signed_.
     * 
     * ## Complexity
     * - O(1).
     */
    get isV0(): boolean {
        return this._chain.getCallHash('Sudo.sudo_unchecked_weight') === '60dcfcf5b49945e62163a9aa3f954affc6355969bb7fcc500cfd6f9dcceca316'
    }

    /**
     * Authenticates the sudo key and dispatches a function call with `Root` origin.
     * This function does not check the weight of the call, and instead allows the
     * Sudo user to specify the weight of the call.
     * 
     * The dispatch origin for this call must be _Signed_.
     * 
     * ## Complexity
     * - O(1).
     */
    get asV0(): {call: v0.Call, weight: v0.Weight} {
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
     * Kill all storage items with a key that starts with the given prefix.
     * 
     * **NOTE:** We rely on the Root origin to provide us the number of subkeys under
     * the prefix we are removing to accurately calculate the weight of this function.
     */
    get isV0(): boolean {
        return this._chain.getCallHash('System.kill_prefix') === 'dfbadd42bee8b18fc81cf78683511061181cffbf7a8ebfd3e5719c389b373d93'
    }

    /**
     * Kill all storage items with a key that starts with the given prefix.
     * 
     * **NOTE:** We rely on the Root origin to provide us the number of subkeys under
     * the prefix we are removing to accurately calculate the weight of this function.
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
     * Kill some items from storage.
     */
    get isV0(): boolean {
        return this._chain.getCallHash('System.kill_storage') === 'eac21dc14e927c003d9c634fb019d04128f71f8529d2914b10a56b85289c2c11'
    }

    /**
     * Kill some items from storage.
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
     * Make some on-chain remark.
     * 
     * ## Complexity
     * - `O(1)`
     */
    get isV0(): boolean {
        return this._chain.getCallHash('System.remark') === 'f4e9b5b7572eeae92978087ece9b4f57cb5cab4f16baf5625bb9ec4a432bad63'
    }

    /**
     * Make some on-chain remark.
     * 
     * ## Complexity
     * - `O(1)`
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
     * Make some on-chain remark and emit event.
     */
    get isV0(): boolean {
        return this._chain.getCallHash('System.remark_with_event') === 'f4e9b5b7572eeae92978087ece9b4f57cb5cab4f16baf5625bb9ec4a432bad63'
    }

    /**
     * Make some on-chain remark and emit event.
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
     * Set the new runtime code.
     * 
     * ## Complexity
     * - `O(C + S)` where `C` length of `code` and `S` complexity of `can_set_code`
     */
    get isV0(): boolean {
        return this._chain.getCallHash('System.set_code') === '7bf3d4785d9be7a4872f39cbd3702a66e16f7ee01e4446fb4a05624dc0ec4c93'
    }

    /**
     * Set the new runtime code.
     * 
     * ## Complexity
     * - `O(C + S)` where `C` length of `code` and `S` complexity of `can_set_code`
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
     * Set the new runtime code without doing any checks of the given `code`.
     * 
     * ## Complexity
     * - `O(C)` where `C` length of `code`
     */
    get isV0(): boolean {
        return this._chain.getCallHash('System.set_code_without_checks') === '7bf3d4785d9be7a4872f39cbd3702a66e16f7ee01e4446fb4a05624dc0ec4c93'
    }

    /**
     * Set the new runtime code without doing any checks of the given `code`.
     * 
     * ## Complexity
     * - `O(C)` where `C` length of `code`
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
     * Set the number of pages in the WebAssembly environment's heap.
     */
    get isV0(): boolean {
        return this._chain.getCallHash('System.set_heap_pages') === '130172e47c5e517627712b4d084768b98489d920284223ea8ef9c462339b5808'
    }

    /**
     * Set the number of pages in the WebAssembly environment's heap.
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
     * Set some items of storage.
     */
    get isV0(): boolean {
        return this._chain.getCallHash('System.set_storage') === 'a4fb507615d69849afb1b2ee654006f9be48bb6e960a4674624d6e46e4382083'
    }

    /**
     * Set some items of storage.
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
     * Set the current time.
     * 
     * This call should be invoked exactly once per block. It will panic at the finalization
     * phase, if this call hasn't been invoked by that time.
     * 
     * The timestamp should be greater than the previous one by the amount specified by
     * `MinimumPeriod`.
     * 
     * The dispatch origin for this call must be `Inherent`.
     * 
     * ## Complexity
     * - `O(1)` (Note that implementations of `OnTimestampSet` must also be `O(1)`)
     * - 1 storage read and 1 storage mutation (codec `O(1)`). (because of `DidUpdate::take` in
     *   `on_finalize`)
     * - 1 event handler `on_timestamp_set`. Must be `O(1)`.
     */
    get isV0(): boolean {
        return this._chain.getCallHash('Timestamp.set') === '6a8b8ba2be107f0853b674eec0026cc440b314db44d0e2c59b36e353355aed14'
    }

    /**
     * Set the current time.
     * 
     * This call should be invoked exactly once per block. It will panic at the finalization
     * phase, if this call hasn't been invoked by that time.
     * 
     * The timestamp should be greater than the previous one by the amount specified by
     * `MinimumPeriod`.
     * 
     * The dispatch origin for this call must be `Inherent`.
     * 
     * ## Complexity
     * - `O(1)` (Note that implementations of `OnTimestampSet` must also be `O(1)`)
     * - 1 storage read and 1 storage mutation (codec `O(1)`). (because of `DidUpdate::take` in
     *   `on_finalize`)
     * - 1 event handler `on_timestamp_set`. Must be `O(1)`.
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
     * Initiates transfer of funds from account on src_domain to account on dst_domain.
     * Funds are burned on src_domain first and are minted on dst_domain using Messenger.
     */
    get isV0(): boolean {
        return this._chain.getCallHash('Transporter.transfer') === '8ee7e4865fcf76865805923ad50714221e48b752fd67e93204760e012cfff555'
    }

    /**
     * Initiates transfer of funds from account on src_domain to account on dst_domain.
     * Funds are burned on src_domain first and are minted on dst_domain using Messenger.
     */
    get asV0(): {dstLocation: v0.Location, amount: bigint} {
        assert(this.isV0)
        return this._chain.decodeCall(this.call)
    }
}
