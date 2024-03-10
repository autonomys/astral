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
        return this._chain.getEventHash('Balances.BalanceSet') === '8c52e43e845654720e1db5c5bd166f80eb777baf474e93ce4d20fd385601a8fb'
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
        return this._chain.getEventHash('Balances.Burned') === 'e84a34a6a3d577b31f16557bd304282f4fe4cbd7115377f4687635dc48e52ba5'
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
        return this._chain.getEventHash('Balances.Deposit') === 'e84a34a6a3d577b31f16557bd304282f4fe4cbd7115377f4687635dc48e52ba5'
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
        return this._chain.getEventHash('Balances.DustLost') === '504f155afb2789c50df19d1f747fb2dc0e99bf8b7623c30bdb5cf82029fec760'
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
        return this._chain.getEventHash('Balances.Endowed') === '75951f685df19cbb5fdda09cf928a105518ceca9576d95bd18d4fac8802730ca'
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
        return this._chain.getEventHash('Balances.Frozen') === 'e84a34a6a3d577b31f16557bd304282f4fe4cbd7115377f4687635dc48e52ba5'
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
        return this._chain.getEventHash('Balances.Locked') === 'e84a34a6a3d577b31f16557bd304282f4fe4cbd7115377f4687635dc48e52ba5'
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
        return this._chain.getEventHash('Balances.Minted') === 'e84a34a6a3d577b31f16557bd304282f4fe4cbd7115377f4687635dc48e52ba5'
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
        return this._chain.getEventHash('Balances.ReserveRepatriated') === '6232d50d422cea3a6fd21da36387df36d1d366405d0c589566c6de85c9cf541f'
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
        return this._chain.getEventHash('Balances.Reserved') === 'e84a34a6a3d577b31f16557bd304282f4fe4cbd7115377f4687635dc48e52ba5'
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
        return this._chain.getEventHash('Balances.Restored') === 'e84a34a6a3d577b31f16557bd304282f4fe4cbd7115377f4687635dc48e52ba5'
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
        return this._chain.getEventHash('Balances.Slashed') === 'e84a34a6a3d577b31f16557bd304282f4fe4cbd7115377f4687635dc48e52ba5'
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
        return this._chain.getEventHash('Balances.Suspended') === 'e84a34a6a3d577b31f16557bd304282f4fe4cbd7115377f4687635dc48e52ba5'
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
        return this._chain.getEventHash('Balances.Thawed') === 'e84a34a6a3d577b31f16557bd304282f4fe4cbd7115377f4687635dc48e52ba5'
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
        return this._chain.getEventHash('Balances.Transfer') === '0ffdf35c495114c2d42a8bf6c241483fd5334ca0198662e14480ad040f1e3a66'
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
        return this._chain.getEventHash('Balances.Unlocked') === 'e84a34a6a3d577b31f16557bd304282f4fe4cbd7115377f4687635dc48e52ba5'
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
        return this._chain.getEventHash('Balances.Unreserved') === 'e84a34a6a3d577b31f16557bd304282f4fe4cbd7115377f4687635dc48e52ba5'
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
        return this._chain.getEventHash('Balances.Upgraded') === 'b8a0d2208835f6ada60dd21cd93533d703777b3779109a7c6a2f26bad68c2f3b'
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
        return this._chain.getEventHash('Balances.Withdraw') === 'e84a34a6a3d577b31f16557bd304282f4fe4cbd7115377f4687635dc48e52ba5'
    }

    /**
     * Some amount was withdrawn from the account (e.g. for transaction fees).
     */
    get asV0(): {who: Uint8Array, amount: bigint} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class DomainsBundleStoredEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Domains.BundleStored')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * A domain bundle was included.
     */
    get isV0(): boolean {
        return this._chain.getEventHash('Domains.BundleStored') === '77b3a0cb165b2ed52f524a2328625f604ec2360c2aef78db15de1f3af4950455'
    }

    /**
     * A domain bundle was included.
     */
    get asV0(): {domainId: number, bundleHash: Uint8Array, bundleAuthor: bigint} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class DomainsDomainEpochCompletedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Domains.DomainEpochCompleted')
        this._chain = ctx._chain
        this.event = event
    }

    get isV0(): boolean {
        return this._chain.getEventHash('Domains.DomainEpochCompleted') === '6641f9112d3517683ff0183b2260fcd2e90ac07c3d64e78842dfa8f1305b1a57'
    }

    get asV0(): {domainId: number, completedEpochIndex: number} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class DomainsDomainInstantiatedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Domains.DomainInstantiated')
        this._chain = ctx._chain
        this.event = event
    }

    get isV0(): boolean {
        return this._chain.getEventHash('Domains.DomainInstantiated') === '3037d4816636b5c3fb65811d3539dec2cca52f588262804bf1cbf515a78108bb'
    }

    get asV0(): {domainId: number} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class DomainsDomainOperatorAllowListUpdatedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Domains.DomainOperatorAllowListUpdated')
        this._chain = ctx._chain
        this.event = event
    }

    get isV0(): boolean {
        return this._chain.getEventHash('Domains.DomainOperatorAllowListUpdated') === '3037d4816636b5c3fb65811d3539dec2cca52f588262804bf1cbf515a78108bb'
    }

    get asV0(): {domainId: number} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class DomainsDomainRuntimeCreatedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Domains.DomainRuntimeCreated')
        this._chain = ctx._chain
        this.event = event
    }

    get isV0(): boolean {
        return this._chain.getEventHash('Domains.DomainRuntimeCreated') === 'fa98444b8d2d5668ec750959d5e4d2c10870e00fd321c8c4b34d28f2a0cde674'
    }

    get asV0(): {runtimeId: number, runtimeType: v0.RuntimeType} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class DomainsDomainRuntimeUpgradeScheduledEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Domains.DomainRuntimeUpgradeScheduled')
        this._chain = ctx._chain
        this.event = event
    }

    get isV0(): boolean {
        return this._chain.getEventHash('Domains.DomainRuntimeUpgradeScheduled') === '0e9e2f52937c6b7d278d7e6e8889b7976b67105c48b931b9c724dfdb418c6c68'
    }

    get asV0(): {runtimeId: number, scheduledAt: number} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class DomainsDomainRuntimeUpgradedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Domains.DomainRuntimeUpgraded')
        this._chain = ctx._chain
        this.event = event
    }

    get isV0(): boolean {
        return this._chain.getEventHash('Domains.DomainRuntimeUpgraded') === 'b2a97b0e43e4ac095c1d5d2a9b052e0a4aca1b2870c0b20768eeb3dcacc685c5'
    }

    get asV0(): {runtimeId: number} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class DomainsForceDomainEpochTransitionEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Domains.ForceDomainEpochTransition')
        this._chain = ctx._chain
        this.event = event
    }

    get isV0(): boolean {
        return this._chain.getEventHash('Domains.ForceDomainEpochTransition') === '6641f9112d3517683ff0183b2260fcd2e90ac07c3d64e78842dfa8f1305b1a57'
    }

    get asV0(): {domainId: number, completedEpochIndex: number} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class DomainsFraudProofProcessedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Domains.FraudProofProcessed')
        this._chain = ctx._chain
        this.event = event
    }

    get isV0(): boolean {
        return this._chain.getEventHash('Domains.FraudProofProcessed') === 'd56be8a1a7d9d084ff8e457fa1466bd373d9dfe3d80eafaed54fc0e82aa572ab'
    }

    get asV0(): {domainId: number, newHeadReceiptNumber: (number | undefined)} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class DomainsFundsUnlockedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Domains.FundsUnlocked')
        this._chain = ctx._chain
        this.event = event
    }

    get isV0(): boolean {
        return this._chain.getEventHash('Domains.FundsUnlocked') === 'c6ffa5ee1d01f18e9b20b94ef4144bb946f6eed1c628f547a997811965926537'
    }

    get asV0(): {operatorId: bigint, nominatorId: Uint8Array, amount: bigint} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class DomainsOperatorDeregisteredEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Domains.OperatorDeregistered')
        this._chain = ctx._chain
        this.event = event
    }

    get isV0(): boolean {
        return this._chain.getEventHash('Domains.OperatorDeregistered') === '8ffd479fbc1b33b18b9485df09465e8f37e733ec4184266f9bbe335de066f5ec'
    }

    get asV0(): {operatorId: bigint} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class DomainsOperatorNominatedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Domains.OperatorNominated')
        this._chain = ctx._chain
        this.event = event
    }

    get isV0(): boolean {
        return this._chain.getEventHash('Domains.OperatorNominated') === '70e95936f842f9d6e0fb3cf376c695c17ef475eadb689739f4d0d35e7887fcad'
    }

    get asV0(): {operatorId: bigint, nominatorId: Uint8Array} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class DomainsOperatorRegisteredEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Domains.OperatorRegistered')
        this._chain = ctx._chain
        this.event = event
    }

    get isV0(): boolean {
        return this._chain.getEventHash('Domains.OperatorRegistered') === 'd27b30266d3acce0e9ed794b5c4e3cf04c4b84f97072bb7fcbae02f17dfa9b1f'
    }

    get asV0(): {operatorId: bigint, domainId: number} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class DomainsOperatorRewardedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Domains.OperatorRewarded')
        this._chain = ctx._chain
        this.event = event
    }

    get isV0(): boolean {
        return this._chain.getEventHash('Domains.OperatorRewarded') === 'b9eed1de2e05d0c8ec956e512420c3b6f8ca02565e985fd21a7f1e95c2622037'
    }

    get asV0(): {operatorId: bigint, reward: bigint} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class DomainsOperatorSlashedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Domains.OperatorSlashed')
        this._chain = ctx._chain
        this.event = event
    }

    get isV0(): boolean {
        return this._chain.getEventHash('Domains.OperatorSlashed') === 'e00099164eb39983043bcbcbbd6e650df1a72db96920471b6c54daf1bbc36f89'
    }

    get asV0(): {operatorId: bigint, reason: v0.SlashedReason} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class DomainsOperatorSwitchedDomainEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Domains.OperatorSwitchedDomain')
        this._chain = ctx._chain
        this.event = event
    }

    get isV0(): boolean {
        return this._chain.getEventHash('Domains.OperatorSwitchedDomain') === '77423adbeca85a39e75117a3571e4dcc42b1c62fd6b500c5a02ba73710623744'
    }

    get asV0(): {oldDomainId: number, newDomainId: number} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class DomainsOperatorTaxCollectedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Domains.OperatorTaxCollected')
        this._chain = ctx._chain
        this.event = event
    }

    get isV0(): boolean {
        return this._chain.getEventHash('Domains.OperatorTaxCollected') === 'e49dd1ad0347e4063fe244bce2b647fdd2edb53fc51d9dc12aca672b4d3c8fb5'
    }

    get asV0(): {operatorId: bigint, tax: bigint} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class DomainsOperatorUnlockedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Domains.OperatorUnlocked')
        this._chain = ctx._chain
        this.event = event
    }

    get isV0(): boolean {
        return this._chain.getEventHash('Domains.OperatorUnlocked') === '8ffd479fbc1b33b18b9485df09465e8f37e733ec4184266f9bbe335de066f5ec'
    }

    get asV0(): {operatorId: bigint} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class DomainsPreferredOperatorEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Domains.PreferredOperator')
        this._chain = ctx._chain
        this.event = event
    }

    get isV0(): boolean {
        return this._chain.getEventHash('Domains.PreferredOperator') === '70e95936f842f9d6e0fb3cf376c695c17ef475eadb689739f4d0d35e7887fcad'
    }

    get asV0(): {operatorId: bigint, nominatorId: Uint8Array} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class DomainsStorageFeeDepositedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Domains.StorageFeeDeposited')
        this._chain = ctx._chain
        this.event = event
    }

    get isV1(): boolean {
        return this._chain.getEventHash('Domains.StorageFeeDeposited') === 'c6ffa5ee1d01f18e9b20b94ef4144bb946f6eed1c628f547a997811965926537'
    }

    get asV1(): {operatorId: bigint, nominatorId: Uint8Array, amount: bigint} {
        assert(this.isV1)
        return this._chain.decodeEvent(this.event)
    }
}

export class DomainsWithdrewStakeEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Domains.WithdrewStake')
        this._chain = ctx._chain
        this.event = event
    }

    get isV0(): boolean {
        return this._chain.getEventHash('Domains.WithdrewStake') === '70e95936f842f9d6e0fb3cf376c695c17ef475eadb689739f4d0d35e7887fcad'
    }

    get asV0(): {operatorId: bigint, nominatorId: Uint8Array} {
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
        return this._chain.getEventHash('Messenger.InboxMessageResponse') === '0e34089e72443f740fd696858423da231d02658f8476a3a9c7f69667704e429e'
    }

    /**
     * Emits when a message response is available for Inbox message.
     */
    get asV0(): {chainId: v0.ChainId, channelId: bigint, nonce: bigint} {
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
        return this._chain.getEventHash('Messenger.OutboxMessage') === '0e34089e72443f740fd696858423da231d02658f8476a3a9c7f69667704e429e'
    }

    /**
     * Emits when a new message is added to the outbox.
     */
    get asV0(): {chainId: v0.ChainId, channelId: bigint, nonce: bigint} {
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

export class OffencesSubspaceOffenceEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'OffencesSubspace.Offence')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * There is an offence reported of the given `kind` happened at the `session_index` and
     * (kind-specific) time slot. This event is not deposited for duplicate slashes.
     * \[kind, timeslot\].
     */
    get isV0(): boolean {
        return this._chain.getEventHash('OffencesSubspace.Offence') === '5c9081474f836b1480d3d7cc7a09403e5d7f913d809fe792509e057c77a1ff4f'
    }

    /**
     * There is an offence reported of the given `kind` happened at the `session_index` and
     * (kind-specific) time slot. This event is not deposited for duplicate slashes.
     * \[kind, timeslot\].
     */
    get asV0(): {kind: Uint8Array, timeslot: Uint8Array} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class RewardsBlockRewardEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Rewards.BlockReward')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Issued reward for the block author.
     */
    get isV0(): boolean {
        return this._chain.getEventHash('Rewards.BlockReward') === '52c46ec505c209924903866c2ba671eea6ee312e03bb458f2436378466b14d2b'
    }

    /**
     * Issued reward for the block author.
     */
    get asV0(): {blockAuthor: Uint8Array, reward: bigint} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class RewardsVoteRewardEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Rewards.VoteReward')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Issued reward for the voter.
     */
    get isV0(): boolean {
        return this._chain.getEventHash('Rewards.VoteReward') === '1d7d0f8f594d7631e4d95e8d4b83db4e76674e22deb98444aaff18dca52e47d5'
    }

    /**
     * Issued reward for the voter.
     */
    get asV0(): {voter: Uint8Array, reward: bigint} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class SubspaceFarmerVoteEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Subspace.FarmerVote')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Farmer vote.
     */
    get isV0(): boolean {
        return this._chain.getEventHash('Subspace.FarmerVote') === '2a02b147da21bd4db73efcff9b581ba19dbb81948f004ed3e8a535410de2e754'
    }

    /**
     * Farmer vote.
     */
    get asV0(): {publicKey: Uint8Array, rewardAddress: Uint8Array, height: number, parentHash: Uint8Array} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class SubspaceSegmentHeaderStoredEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Subspace.SegmentHeaderStored')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Segment header was stored in blockchain history.
     */
    get isV0(): boolean {
        return this._chain.getEventHash('Subspace.SegmentHeaderStored') === 'cbf823342046ebf398eb95230c46fdfe0b1915ea3256f4a25c324e1a0e5d0976'
    }

    /**
     * Segment header was stored in blockchain history.
     */
    get asV0(): {segmentHeader: v0.SegmentHeader} {
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
     * The sudo key has been updated.
     */
    get isV0(): boolean {
        return this._chain.getEventHash('Sudo.KeyChanged') === 'a771bed496e6bee0a887b6ede5584a937b2b84b2386b8e90c5a43687a8485573'
    }

    /**
     * The sudo key has been updated.
     */
    get asV0(): {old: (Uint8Array | undefined), new: Uint8Array} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class SudoKeyRemovedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Sudo.KeyRemoved')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * The key was permanently removed.
     */
    get isV0(): boolean {
        return this._chain.getEventHash('Sudo.KeyRemoved') === '01f2f9c28aa1d4d36a81ff042620b6677d25bf07c2bf4acc37b58658778a4fca'
    }

    /**
     * The key was permanently removed.
     */
    get asV0(): null {
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
     * A sudo call just took place.
     */
    get isV0(): boolean {
        return this._chain.getEventHash('Sudo.Sudid') === '3ecb430e21c76eb720064ac2294a31cf70178245416aa72891f2973dfab55b73'
    }

    /**
     * A sudo call just took place.
     */
    get asV0(): {sudoResult: v0.Type_48} {
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
     * A [sudo_as](Pallet::sudo_as) call just took place.
     */
    get isV0(): boolean {
        return this._chain.getEventHash('Sudo.SudoAsDone') === '3ecb430e21c76eb720064ac2294a31cf70178245416aa72891f2973dfab55b73'
    }

    /**
     * A [sudo_as](Pallet::sudo_as) call just took place.
     */
    get asV0(): {sudoResult: v0.Type_48} {
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
        return this._chain.getEventHash('System.KilledAccount') === '7fb7672b764b0a4f0c4910fddefec0709628843df7ad0073a97eede13c53ca92'
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
        return this._chain.getEventHash('System.NewAccount') === '7fb7672b764b0a4f0c4910fddefec0709628843df7ad0073a97eede13c53ca92'
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
        return this._chain.getEventHash('System.Remarked') === 'c58b73482fe762a6dcca2f35266f0d1739333312cf7a50eea55c666d0cda6101'
    }

    /**
     * On on-chain remark happened.
     */
    get asV0(): {sender: Uint8Array, hash: Uint8Array} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class SystemUpgradeAuthorizedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'System.UpgradeAuthorized')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * An upgrade was authorized.
     */
    get isV0(): boolean {
        return this._chain.getEventHash('System.UpgradeAuthorized') === '5c55d10848d503323d2e442c7afe37bb9673cbd625584442853911cb797f840c'
    }

    /**
     * An upgrade was authorized.
     */
    get asV0(): {codeHash: Uint8Array, checkVersion: boolean} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class TransactionFeesBlockFeesEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'TransactionFees.BlockFees')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Storage fees.
     */
    get isV0(): boolean {
        return this._chain.getEventHash('TransactionFees.BlockFees') === 'db79208cdb6ffd3ede25a3d794427dd954d6b49a1a0b086cf7293893a72fd3a1'
    }

    /**
     * Storage fees.
     */
    get asV0(): {who: Uint8Array, storage: bigint, compute: bigint, tips: bigint} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class TransactionFeesBurnedBlockFeesEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'TransactionFees.BurnedBlockFees')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Fees burned due to equivocated block author.
     */
    get isV0(): boolean {
        return this._chain.getEventHash('TransactionFees.BurnedBlockFees') === '0d27e5ffd974bd0c42e48ea79214e88c6bf148ba434a5c44c47901f75d1e62b2'
    }

    /**
     * Fees burned due to equivocated block author.
     */
    get asV0(): {storage: bigint, compute: bigint, tips: bigint} {
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
        return this._chain.getEventHash('TransactionPayment.TransactionFeePaid') === 'f2e962e9996631445edecd62b0646df79871442a2d1a1a6e1f550a0b3a56b226'
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

export class UtilityBatchCompletedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Utility.BatchCompleted')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Batch of dispatches completed fully with no error.
     */
    get isV0(): boolean {
        return this._chain.getEventHash('Utility.BatchCompleted') === '01f2f9c28aa1d4d36a81ff042620b6677d25bf07c2bf4acc37b58658778a4fca'
    }

    /**
     * Batch of dispatches completed fully with no error.
     */
    get asV0(): null {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class UtilityBatchCompletedWithErrorsEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Utility.BatchCompletedWithErrors')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Batch of dispatches completed but has errors.
     */
    get isV0(): boolean {
        return this._chain.getEventHash('Utility.BatchCompletedWithErrors') === '01f2f9c28aa1d4d36a81ff042620b6677d25bf07c2bf4acc37b58658778a4fca'
    }

    /**
     * Batch of dispatches completed but has errors.
     */
    get asV0(): null {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class UtilityBatchInterruptedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Utility.BatchInterrupted')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Batch of dispatches did not complete fully. Index of first failing dispatch given, as
     * well as the error.
     */
    get isV0(): boolean {
        return this._chain.getEventHash('Utility.BatchInterrupted') === '031f8c01ddd9491965bf6e6671d70381e70d55e6028aab52a937d1c3afeecb9f'
    }

    /**
     * Batch of dispatches did not complete fully. Index of first failing dispatch given, as
     * well as the error.
     */
    get asV0(): {index: number, error: v0.DispatchError} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class UtilityDispatchedAsEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Utility.DispatchedAs')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * A call was dispatched.
     */
    get isV0(): boolean {
        return this._chain.getEventHash('Utility.DispatchedAs') === 'ee56f7174dc1a4631da3e5b48f323193771be6a702fb2ff1ff40459869d34a0e'
    }

    /**
     * A call was dispatched.
     */
    get asV0(): {result: v0.Type_48} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class UtilityItemCompletedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Utility.ItemCompleted')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * A single item within a Batch of dispatches has completed with no error.
     */
    get isV0(): boolean {
        return this._chain.getEventHash('Utility.ItemCompleted') === '01f2f9c28aa1d4d36a81ff042620b6677d25bf07c2bf4acc37b58658778a4fca'
    }

    /**
     * A single item within a Batch of dispatches has completed with no error.
     */
    get asV0(): null {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class UtilityItemFailedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Utility.ItemFailed')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * A single item within a Batch of dispatches has completed with error.
     */
    get isV0(): boolean {
        return this._chain.getEventHash('Utility.ItemFailed') === '4564a5412ce55535234d019dbd1d2999c5a9d6f452a565385d0c43e85d0dbf0b'
    }

    /**
     * A single item within a Batch of dispatches has completed with error.
     */
    get asV0(): {error: v0.DispatchError} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class VestingClaimedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Vesting.Claimed')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Claimed vesting.
     */
    get isV0(): boolean {
        return this._chain.getEventHash('Vesting.Claimed') === 'e84a34a6a3d577b31f16557bd304282f4fe4cbd7115377f4687635dc48e52ba5'
    }

    /**
     * Claimed vesting.
     */
    get asV0(): {who: Uint8Array, amount: bigint} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class VestingVestingScheduleAddedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Vesting.VestingScheduleAdded')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Added new vesting schedule.
     */
    get isV0(): boolean {
        return this._chain.getEventHash('Vesting.VestingScheduleAdded') === '18422c66dedd030e21a5567fde05a68ab5ad4ffff5f9fdcd73f3d18dcb91873c'
    }

    /**
     * Added new vesting schedule.
     */
    get asV0(): {from: Uint8Array, to: Uint8Array, vestingSchedule: v0.VestingSchedule} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}

export class VestingVestingSchedulesUpdatedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Vesting.VestingSchedulesUpdated')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Updated vesting schedules.
     */
    get isV0(): boolean {
        return this._chain.getEventHash('Vesting.VestingSchedulesUpdated') === 'b8a0d2208835f6ada60dd21cd93533d703777b3779109a7c6a2f26bad68c2f3b'
    }

    /**
     * Updated vesting schedules.
     */
    get asV0(): {who: Uint8Array} {
        assert(this.isV0)
        return this._chain.decodeEvent(this.event)
    }
}
