import assert from 'assert'
import {Chain, ChainContext, EventContext, Event, Result, Option} from './support'
import * as v0 from './v0'

export class BalancesBalanceSetEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Balances.BalanceSet')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * A balance was set by root.
     */
    get isV0(): boolean {
        return this._chain.getEventHash('Balances.BalanceSet') === '75ce258a2eedf74b36490a9550887771d7c0a07c5c6c0e8c9c9957eb17ff3bd9'
    }

    /**
     * A balance was set by root.
     */
    get asV0(): {who: Uint8Array, free: bigint} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class BalancesBurnedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Balances.Burned')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Some amount was burned from an account.
     */
    get isV0(): boolean {
        return this._chain.getEventHash('Balances.Burned') === '43e3321e3408ebd2b7d4c70d42ffa076463495043e47ddb0fb1fbe3e105f5b2f'
    }

    /**
     * Some amount was burned from an account.
     */
    get asV0(): {who: Uint8Array, amount: bigint} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class BalancesDepositEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Balances.Deposit')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Some amount was deposited (e.g. for transaction fees).
     */
    get isV0(): boolean {
        return this._chain.getEventHash('Balances.Deposit') === '43e3321e3408ebd2b7d4c70d42ffa076463495043e47ddb0fb1fbe3e105f5b2f'
    }

    /**
     * Some amount was deposited (e.g. for transaction fees).
     */
    get asV0(): {who: Uint8Array, amount: bigint} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class BalancesDustLostEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Balances.DustLost')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * An account was removed whose balance was non-zero but below ExistentialDeposit,
     * resulting in an outright loss.
     */
    get isV0(): boolean {
        return this._chain.getEventHash('Balances.DustLost') === '73756cb75a05416db04c153fd4a78048e7662d48c0830e51e080bcd1ca6f540a'
    }

    /**
     * An account was removed whose balance was non-zero but below ExistentialDeposit,
     * resulting in an outright loss.
     */
    get asV0(): {account: Uint8Array, amount: bigint} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class BalancesEndowedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Balances.Endowed')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * An account was created with some free balance.
     */
    get isV0(): boolean {
        return this._chain.getEventHash('Balances.Endowed') === 'a773a5c0921f3b97243d311c28ce9bb596c8cc3eacae83e0b616a49c6784a35a'
    }

    /**
     * An account was created with some free balance.
     */
    get asV0(): {account: Uint8Array, freeBalance: bigint} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class BalancesFrozenEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Balances.Frozen')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Some balance was frozen.
     */
    get isV0(): boolean {
        return this._chain.getEventHash('Balances.Frozen') === '43e3321e3408ebd2b7d4c70d42ffa076463495043e47ddb0fb1fbe3e105f5b2f'
    }

    /**
     * Some balance was frozen.
     */
    get asV0(): {who: Uint8Array, amount: bigint} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class BalancesIssuedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Balances.Issued')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Total issuance was increased by `amount`, creating a credit to be balanced.
     */
    get isV0(): boolean {
        return this._chain.getEventHash('Balances.Issued') === 'a3bdd43eed59e7b65720eef9b2dfe72389ca71ac9dbe7fe2874438aae4f18886'
    }

    /**
     * Total issuance was increased by `amount`, creating a credit to be balanced.
     */
    get asV0(): {amount: bigint} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class BalancesLockedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Balances.Locked')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Some balance was locked.
     */
    get isV0(): boolean {
        return this._chain.getEventHash('Balances.Locked') === '43e3321e3408ebd2b7d4c70d42ffa076463495043e47ddb0fb1fbe3e105f5b2f'
    }

    /**
     * Some balance was locked.
     */
    get asV0(): {who: Uint8Array, amount: bigint} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class BalancesMintedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Balances.Minted')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Some amount was minted into an account.
     */
    get isV0(): boolean {
        return this._chain.getEventHash('Balances.Minted') === '43e3321e3408ebd2b7d4c70d42ffa076463495043e47ddb0fb1fbe3e105f5b2f'
    }

    /**
     * Some amount was minted into an account.
     */
    get asV0(): {who: Uint8Array, amount: bigint} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class BalancesRescindedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Balances.Rescinded')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Total issuance was decreased by `amount`, creating a debt to be balanced.
     */
    get isV0(): boolean {
        return this._chain.getEventHash('Balances.Rescinded') === 'a3bdd43eed59e7b65720eef9b2dfe72389ca71ac9dbe7fe2874438aae4f18886'
    }

    /**
     * Total issuance was decreased by `amount`, creating a debt to be balanced.
     */
    get asV0(): {amount: bigint} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class BalancesReserveRepatriatedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Balances.ReserveRepatriated')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Some balance was moved from the reserve of the first account to the second account.
     * Final argument indicates the destination balance type.
     */
    get isV0(): boolean {
        return this._chain.getEventHash('Balances.ReserveRepatriated') === 'daa0192df4c75cafc52e847a38b276d53a6330bf4083906b38c0d1eb5166d98a'
    }

    /**
     * Some balance was moved from the reserve of the first account to the second account.
     * Final argument indicates the destination balance type.
     */
    get asV0(): {from: Uint8Array, to: Uint8Array, amount: bigint, destinationStatus: v0.BalanceStatus} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class BalancesReservedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Balances.Reserved')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Some balance was reserved (moved from free to reserved).
     */
    get isV0(): boolean {
        return this._chain.getEventHash('Balances.Reserved') === '43e3321e3408ebd2b7d4c70d42ffa076463495043e47ddb0fb1fbe3e105f5b2f'
    }

    /**
     * Some balance was reserved (moved from free to reserved).
     */
    get asV0(): {who: Uint8Array, amount: bigint} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class BalancesRestoredEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Balances.Restored')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Some amount was restored into an account.
     */
    get isV0(): boolean {
        return this._chain.getEventHash('Balances.Restored') === '43e3321e3408ebd2b7d4c70d42ffa076463495043e47ddb0fb1fbe3e105f5b2f'
    }

    /**
     * Some amount was restored into an account.
     */
    get asV0(): {who: Uint8Array, amount: bigint} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class BalancesSlashedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Balances.Slashed')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Some amount was removed from the account (e.g. for misbehavior).
     */
    get isV0(): boolean {
        return this._chain.getEventHash('Balances.Slashed') === '43e3321e3408ebd2b7d4c70d42ffa076463495043e47ddb0fb1fbe3e105f5b2f'
    }

    /**
     * Some amount was removed from the account (e.g. for misbehavior).
     */
    get asV0(): {who: Uint8Array, amount: bigint} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class BalancesSuspendedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Balances.Suspended')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Some amount was suspended from an account (it can be restored later).
     */
    get isV0(): boolean {
        return this._chain.getEventHash('Balances.Suspended') === '43e3321e3408ebd2b7d4c70d42ffa076463495043e47ddb0fb1fbe3e105f5b2f'
    }

    /**
     * Some amount was suspended from an account (it can be restored later).
     */
    get asV0(): {who: Uint8Array, amount: bigint} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class BalancesThawedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Balances.Thawed')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Some balance was thawed.
     */
    get isV0(): boolean {
        return this._chain.getEventHash('Balances.Thawed') === '43e3321e3408ebd2b7d4c70d42ffa076463495043e47ddb0fb1fbe3e105f5b2f'
    }

    /**
     * Some balance was thawed.
     */
    get asV0(): {who: Uint8Array, amount: bigint} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class BalancesTransferEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Balances.Transfer')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Transfer succeeded.
     */
    get isV0(): boolean {
        return this._chain.getEventHash('Balances.Transfer') === '23222c59f2992c12387568241620899d2d399ab9027595daca8255637f62ece3'
    }

    /**
     * Transfer succeeded.
     */
    get asV0(): {from: Uint8Array, to: Uint8Array, amount: bigint} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class BalancesUnlockedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Balances.Unlocked')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Some balance was unlocked.
     */
    get isV0(): boolean {
        return this._chain.getEventHash('Balances.Unlocked') === '43e3321e3408ebd2b7d4c70d42ffa076463495043e47ddb0fb1fbe3e105f5b2f'
    }

    /**
     * Some balance was unlocked.
     */
    get asV0(): {who: Uint8Array, amount: bigint} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class BalancesUnreservedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Balances.Unreserved')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Some balance was unreserved (moved from reserved to free).
     */
    get isV0(): boolean {
        return this._chain.getEventHash('Balances.Unreserved') === '43e3321e3408ebd2b7d4c70d42ffa076463495043e47ddb0fb1fbe3e105f5b2f'
    }

    /**
     * Some balance was unreserved (moved from reserved to free).
     */
    get asV0(): {who: Uint8Array, amount: bigint} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class BalancesUpgradedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Balances.Upgraded')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * An account was upgraded.
     */
    get isV0(): boolean {
        return this._chain.getEventHash('Balances.Upgraded') === 'e92c9f723dde51134e2f444b9c6f3d649ad16574a792290c80e904dda6240391'
    }

    /**
     * An account was upgraded.
     */
    get asV0(): {who: Uint8Array} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class BalancesWithdrawEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Balances.Withdraw')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Some amount was withdrawn from the account (e.g. for transaction fees).
     */
    get isV0(): boolean {
        return this._chain.getEventHash('Balances.Withdraw') === '43e3321e3408ebd2b7d4c70d42ffa076463495043e47ddb0fb1fbe3e105f5b2f'
    }

    /**
     * Some amount was withdrawn from the account (e.g. for transaction fees).
     */
    get asV0(): {who: Uint8Array, amount: bigint} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class BaseFeeBaseFeeOverflowEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'BaseFee.BaseFeeOverflow')
        this._chain = ctx._chain
        this.event = event
    }

    get isV0(): boolean {
        return this._chain.getEventHash('BaseFee.BaseFeeOverflow') === '01f2f9c28aa1d4d36a81ff042620b6677d25bf07c2bf4acc37b58658778a4fca'
    }

    get asV0(): null {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class BaseFeeNewBaseFeePerGasEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'BaseFee.NewBaseFeePerGas')
        this._chain = ctx._chain
        this.event = event
    }

    get isV0(): boolean {
        return this._chain.getEventHash('BaseFee.NewBaseFeePerGas') === 'df74b0f066943b24c635a19ba2763478ab00f9c0373d74c9a771b1a1047ff6d6'
    }

    get asV0(): {fee: bigint} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class BaseFeeNewElasticityEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'BaseFee.NewElasticity')
        this._chain = ctx._chain
        this.event = event
    }

    get isV0(): boolean {
        return this._chain.getEventHash('BaseFee.NewElasticity') === 'efcd4cd6d4fde4342db62d270df85a88b1c153af50159f9bc1ba1ce1133f2524'
    }

    get asV0(): {elasticity: number} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class EvmCreatedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'EVM.Created')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * A contract has been created at given address.
     */
    get isV0(): boolean {
        return this._chain.getEventHash('EVM.Created') === 'c5bed4ffae488fefd76eb807a683ba2d9cb6726ded1d162edcacf2126be4665f'
    }

    /**
     * A contract has been created at given address.
     */
    get asV0(): {address: Uint8Array} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class EvmCreatedFailedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'EVM.CreatedFailed')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * A contract was attempted to be created, but the execution failed.
     */
    get isV0(): boolean {
        return this._chain.getEventHash('EVM.CreatedFailed') === 'c5bed4ffae488fefd76eb807a683ba2d9cb6726ded1d162edcacf2126be4665f'
    }

    /**
     * A contract was attempted to be created, but the execution failed.
     */
    get asV0(): {address: Uint8Array} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class EvmExecutedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'EVM.Executed')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * A contract has been executed successfully with states applied.
     */
    get isV0(): boolean {
        return this._chain.getEventHash('EVM.Executed') === 'c5bed4ffae488fefd76eb807a683ba2d9cb6726ded1d162edcacf2126be4665f'
    }

    /**
     * A contract has been executed successfully with states applied.
     */
    get asV0(): {address: Uint8Array} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class EvmExecutedFailedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'EVM.ExecutedFailed')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * A contract has been executed with errors. States are reverted with only gas fees applied.
     */
    get isV0(): boolean {
        return this._chain.getEventHash('EVM.ExecutedFailed') === 'c5bed4ffae488fefd76eb807a683ba2d9cb6726ded1d162edcacf2126be4665f'
    }

    /**
     * A contract has been executed with errors. States are reverted with only gas fees applied.
     */
    get asV0(): {address: Uint8Array} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class EvmLogEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'EVM.Log')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Ethereum events from contracts.
     */
    get isV0(): boolean {
        return this._chain.getEventHash('EVM.Log') === '4edddb5632dcffc943bfbdb42201f95b9c2ffa1df042e526a7c54a39f099056a'
    }

    /**
     * Ethereum events from contracts.
     */
    get asV0(): {log: v0.Log} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class EthereumExecutedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Ethereum.Executed')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * An ethereum transaction was successfully executed.
     */
    get isV0(): boolean {
        return this._chain.getEventHash('Ethereum.Executed') === '4da35f3b1cb63c6084839486f6cc44465f31d4dbf24abce9ef5d05b899d9309e'
    }

    /**
     * An ethereum transaction was successfully executed.
     */
    get asV0(): {from: Uint8Array, to: Uint8Array, transactionHash: Uint8Array, exitReason: v0.ExitReason, extraData: Uint8Array} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class ExecutivePalletSudidEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'ExecutivePallet.Sudid')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * A sudo just took place.
     */
    get isV0(): boolean {
        return this._chain.getEventHash('ExecutivePallet.Sudid') === '3ecb430e21c76eb720064ac2294a31cf70178245416aa72891f2973dfab55b73'
    }

    /**
     * A sudo just took place.
     */
    get asV0(): {sudoResult: v0.Type_32} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class MessengerChannelClosedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Messenger.ChannelClosed')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Emits when a channel between two chains is closed.
     */
    get isV0(): boolean {
        return this._chain.getEventHash('Messenger.ChannelClosed') === '99e846ee486452b93d7e8ba9fef938f53400f9bc70cad9d50c0ec8571e646860'
    }

    /**
     * Emits when a channel between two chains is closed.
     */
    get asV0(): {chainId: v0.ChainId, channelId: bigint} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class MessengerChannelInitiatedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Messenger.ChannelInitiated')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Emits when a channel between two chains is initiated.
     */
    get isV0(): boolean {
        return this._chain.getEventHash('Messenger.ChannelInitiated') === '99e846ee486452b93d7e8ba9fef938f53400f9bc70cad9d50c0ec8571e646860'
    }

    /**
     * Emits when a channel between two chains is initiated.
     */
    get asV0(): {chainId: v0.ChainId, channelId: bigint} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class MessengerChannelOpenEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Messenger.ChannelOpen')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Emits when a channel between two chain is open.
     */
    get isV0(): boolean {
        return this._chain.getEventHash('Messenger.ChannelOpen') === '99e846ee486452b93d7e8ba9fef938f53400f9bc70cad9d50c0ec8571e646860'
    }

    /**
     * Emits when a channel between two chain is open.
     */
    get asV0(): {chainId: v0.ChainId, channelId: bigint} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class MessengerInboxMessageEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Messenger.InboxMessage')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Emits when a new inbox message is validated and added to Inbox.
     */
    get isV0(): boolean {
        return this._chain.getEventHash('Messenger.InboxMessage') === '0e34089e72443f740fd696858423da231d02658f8476a3a9c7f69667704e429e'
    }

    /**
     * Emits when a new inbox message is validated and added to Inbox.
     */
    get asV0(): {chainId: v0.ChainId, channelId: bigint, nonce: bigint} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class MessengerInboxMessageResponseEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Messenger.InboxMessageResponse')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Emits when a message response is available for Inbox message.
     */
    get isV0(): boolean {
        return this._chain.getEventHash('Messenger.InboxMessageResponse') === 'a9be62ec471d0e6b71e4ff953dc2203ce20da74dfd1b7c8aedf41489b5db0b73'
    }

    /**
     * Emits when a message response is available for Inbox message.
     */
    get asV0(): {chainId: v0.ChainId, channelId: bigint, nonce: bigint, relayerId: Uint8Array} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class MessengerOutboxMessageEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Messenger.OutboxMessage')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Emits when a new message is added to the outbox.
     */
    get isV0(): boolean {
        return this._chain.getEventHash('Messenger.OutboxMessage') === 'a9be62ec471d0e6b71e4ff953dc2203ce20da74dfd1b7c8aedf41489b5db0b73'
    }

    /**
     * Emits when a new message is added to the outbox.
     */
    get asV0(): {chainId: v0.ChainId, channelId: bigint, nonce: bigint, relayerId: Uint8Array} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class MessengerOutboxMessageResponseEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Messenger.OutboxMessageResponse')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Emits when a message response is available for Outbox message.
     */
    get isV0(): boolean {
        return this._chain.getEventHash('Messenger.OutboxMessageResponse') === '0e34089e72443f740fd696858423da231d02658f8476a3a9c7f69667704e429e'
    }

    /**
     * Emits when a message response is available for Outbox message.
     */
    get asV0(): {chainId: v0.ChainId, channelId: bigint, nonce: bigint} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class MessengerOutboxMessageResultEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Messenger.OutboxMessageResult')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Emits outbox message result.
     */
    get isV0(): boolean {
        return this._chain.getEventHash('Messenger.OutboxMessageResult') === '18451495888b210bde9b76181dcf5bf95a7f2af155861a27f88f488491504f6e'
    }

    /**
     * Emits outbox message result.
     */
    get asV0(): {chainId: v0.ChainId, channelId: bigint, nonce: bigint, result: v0.OutboxMessageResult} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class MessengerRelayerExitedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Messenger.RelayerExited')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Emits when a relayer exists the relayer set.
     */
    get isV0(): boolean {
        return this._chain.getEventHash('Messenger.RelayerExited') === '9c5397893ef536fe8c1d559d36e2abf141cba74ddcae364e153c668161651836'
    }

    /**
     * Emits when a relayer exists the relayer set.
     */
    get asV0(): {owner: Uint8Array, relayerId: Uint8Array} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class MessengerRelayerJoinedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Messenger.RelayerJoined')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Emits when a relayer successfully joins the relayer set.
     */
    get isV0(): boolean {
        return this._chain.getEventHash('Messenger.RelayerJoined') === '9c5397893ef536fe8c1d559d36e2abf141cba74ddcae364e153c668161651836'
    }

    /**
     * Emits when a relayer successfully joins the relayer set.
     */
    get asV0(): {owner: Uint8Array, relayerId: Uint8Array} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class SudoKeyChangedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Sudo.KeyChanged')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * The \[sudoer\] just switched identity; the old key is supplied if one existed.
     */
    get isV0(): boolean {
        return this._chain.getEventHash('Sudo.KeyChanged') === 'a51e68bb9e434ef786a7be512f2eaf348c198352ad5831f5d74cdbb9f17ba1a0'
    }

    /**
     * The \[sudoer\] just switched identity; the old key is supplied if one existed.
     */
    get asV0(): {oldSudoer: (Uint8Array | undefined)} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class SudoSudidEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Sudo.Sudid')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * A sudo just took place. \[result\]
     */
    get isV0(): boolean {
        return this._chain.getEventHash('Sudo.Sudid') === '3ecb430e21c76eb720064ac2294a31cf70178245416aa72891f2973dfab55b73'
    }

    /**
     * A sudo just took place. \[result\]
     */
    get asV0(): {sudoResult: v0.Type_32} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class SudoSudoAsDoneEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Sudo.SudoAsDone')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * A sudo just took place. \[result\]
     */
    get isV0(): boolean {
        return this._chain.getEventHash('Sudo.SudoAsDone') === '3ecb430e21c76eb720064ac2294a31cf70178245416aa72891f2973dfab55b73'
    }

    /**
     * A sudo just took place. \[result\]
     */
    get asV0(): {sudoResult: v0.Type_32} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class SystemCodeUpdatedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'System.CodeUpdated')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * `:code` was updated.
     */
    get isV0(): boolean {
        return this._chain.getEventHash('System.CodeUpdated') === '01f2f9c28aa1d4d36a81ff042620b6677d25bf07c2bf4acc37b58658778a4fca'
    }

    /**
     * `:code` was updated.
     */
    get asV0(): null {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class SystemExtrinsicFailedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'System.ExtrinsicFailed')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * An extrinsic failed.
     */
    get isV0(): boolean {
        return this._chain.getEventHash('System.ExtrinsicFailed') === '89ca818f689e3f6e085d8137a961f36cc94819777211c5c11cca985a448944b8'
    }

    /**
     * An extrinsic failed.
     */
    get asV0(): {dispatchError: v0.DispatchError, dispatchInfo: v0.DispatchInfo} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class SystemExtrinsicSuccessEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'System.ExtrinsicSuccess')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * An extrinsic completed successfully.
     */
    get isV0(): boolean {
        return this._chain.getEventHash('System.ExtrinsicSuccess') === '6b78214e1591ecc2de1662ebf5ca93838612414a62415cde1cdd2962f8235a92'
    }

    /**
     * An extrinsic completed successfully.
     */
    get asV0(): {dispatchInfo: v0.DispatchInfo} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class SystemKilledAccountEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'System.KilledAccount')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * An account was reaped.
     */
    get isV0(): boolean {
        return this._chain.getEventHash('System.KilledAccount') === '041e3c99c7373645533b0a38437f03393c46e1c811b17689bc2c51c0b6784c09'
    }

    /**
     * An account was reaped.
     */
    get asV0(): {account: Uint8Array} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class SystemNewAccountEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'System.NewAccount')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * A new account was created.
     */
    get isV0(): boolean {
        return this._chain.getEventHash('System.NewAccount') === '041e3c99c7373645533b0a38437f03393c46e1c811b17689bc2c51c0b6784c09'
    }

    /**
     * A new account was created.
     */
    get asV0(): {account: Uint8Array} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class SystemRemarkedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'System.Remarked')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * On on-chain remark happened.
     */
    get isV0(): boolean {
        return this._chain.getEventHash('System.Remarked') === 'aeed1c1d467ca7ef8cb28e828b4c151ed9cf2a6a928b055559fe3cd7c73e790c'
    }

    /**
     * On on-chain remark happened.
     */
    get asV0(): {sender: Uint8Array, hash: Uint8Array} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class TransactionPaymentTransactionFeePaidEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'TransactionPayment.TransactionFeePaid')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * A transaction fee `actual_fee`, of which `tip` was added to the minimum inclusion fee,
     * has been paid by `who`.
     */
    get isV0(): boolean {
        return this._chain.getEventHash('TransactionPayment.TransactionFeePaid') === '0e2aa7b73399d934ce51badc2f3fc832e2196aab6d6e820e3f58d4cf2c178b47'
    }

    /**
     * A transaction fee `actual_fee`, of which `tip` was added to the minimum inclusion fee,
     * has been paid by `who`.
     */
    get asV0(): {who: Uint8Array, actualFee: bigint, tip: bigint} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class TransporterIncomingTransferSuccessfulEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Transporter.IncomingTransferSuccessful')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Emits when a given incoming transfer was successfully processed.
     */
    get isV0(): boolean {
        return this._chain.getEventHash('Transporter.IncomingTransferSuccessful') === 'fdab5e2c779cffb2406e5807516b21383ad15d052f89e79a8e4e7fd4e3f374b7'
    }

    /**
     * Emits when a given incoming transfer was successfully processed.
     */
    get asV0(): {chainId: v0.ChainId, messageId: [bigint, bigint]} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class TransporterOutgoingTransferFailedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Transporter.OutgoingTransferFailed')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Emits when a given outgoing transfer was failed on dst_chain.
     */
    get isV0(): boolean {
        return this._chain.getEventHash('Transporter.OutgoingTransferFailed') === '8879e3378dbaaa3e9d1bc3d2126970cabe60ba5ec69bb7e9d7fac17f97ce0c28'
    }

    /**
     * Emits when a given outgoing transfer was failed on dst_chain.
     */
    get asV0(): {chainId: v0.ChainId, messageId: [bigint, bigint], err: v0.DispatchError} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class TransporterOutgoingTransferInitiatedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Transporter.OutgoingTransferInitiated')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Emits when there is a new outgoing transfer.
     */
    get isV0(): boolean {
        return this._chain.getEventHash('Transporter.OutgoingTransferInitiated') === 'fdab5e2c779cffb2406e5807516b21383ad15d052f89e79a8e4e7fd4e3f374b7'
    }

    /**
     * Emits when there is a new outgoing transfer.
     */
    get asV0(): {chainId: v0.ChainId, messageId: [bigint, bigint]} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class TransporterOutgoingTransferSuccessfulEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Transporter.OutgoingTransferSuccessful')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Emits when a given outgoing transfer was successful.
     */
    get isV0(): boolean {
        return this._chain.getEventHash('Transporter.OutgoingTransferSuccessful') === 'fdab5e2c779cffb2406e5807516b21383ad15d052f89e79a8e4e7fd4e3f374b7'
    }

    /**
     * Emits when a given outgoing transfer was successful.
     */
    get asV0(): {chainId: v0.ChainId, messageId: [bigint, bigint]} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}
