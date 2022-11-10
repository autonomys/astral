import assert from 'assert'
import {Chain, ChainContext, EventContext, Event, Result} from './support'
import * as v3 from './v3'

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
  get isV3(): boolean {
    return this._chain.getEventHash('Balances.BalanceSet') === '1e2b5d5a07046e6d6e5507661d3f3feaddfb41fc609a2336b24957322080ca77'
  }

  /**
   * A balance was set by root.
   */
  get asV3(): {who: Uint8Array, free: bigint, reserved: bigint} {
    assert(this.isV3)
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
  get isV3(): boolean {
    return this._chain.getEventHash('Balances.Deposit') === 'e84a34a6a3d577b31f16557bd304282f4fe4cbd7115377f4687635dc48e52ba5'
  }

  /**
   * Some amount was deposited (e.g. for transaction fees).
   */
  get asV3(): {who: Uint8Array, amount: bigint} {
    assert(this.isV3)
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
  get isV3(): boolean {
    return this._chain.getEventHash('Balances.DustLost') === '504f155afb2789c50df19d1f747fb2dc0e99bf8b7623c30bdb5cf82029fec760'
  }

  /**
   * An account was removed whose balance was non-zero but below ExistentialDeposit,
   * resulting in an outright loss.
   */
  get asV3(): {account: Uint8Array, amount: bigint} {
    assert(this.isV3)
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
  get isV3(): boolean {
    return this._chain.getEventHash('Balances.Endowed') === '75951f685df19cbb5fdda09cf928a105518ceca9576d95bd18d4fac8802730ca'
  }

  /**
   * An account was created with some free balance.
   */
  get asV3(): {account: Uint8Array, freeBalance: bigint} {
    assert(this.isV3)
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
  get isV3(): boolean {
    return this._chain.getEventHash('Balances.ReserveRepatriated') === '6232d50d422cea3a6fd21da36387df36d1d366405d0c589566c6de85c9cf541f'
  }

  /**
   * Some balance was moved from the reserve of the first account to the second account.
   * Final argument indicates the destination balance type.
   */
  get asV3(): {from: Uint8Array, to: Uint8Array, amount: bigint, destinationStatus: v3.BalanceStatus} {
    assert(this.isV3)
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
  get isV3(): boolean {
    return this._chain.getEventHash('Balances.Reserved') === 'e84a34a6a3d577b31f16557bd304282f4fe4cbd7115377f4687635dc48e52ba5'
  }

  /**
   * Some balance was reserved (moved from free to reserved).
   */
  get asV3(): {who: Uint8Array, amount: bigint} {
    assert(this.isV3)
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
  get isV3(): boolean {
    return this._chain.getEventHash('Balances.Slashed') === 'e84a34a6a3d577b31f16557bd304282f4fe4cbd7115377f4687635dc48e52ba5'
  }

  /**
   * Some amount was removed from the account (e.g. for misbehavior).
   */
  get asV3(): {who: Uint8Array, amount: bigint} {
    assert(this.isV3)
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
  get isV3(): boolean {
    return this._chain.getEventHash('Balances.Transfer') === '0ffdf35c495114c2d42a8bf6c241483fd5334ca0198662e14480ad040f1e3a66'
  }

  /**
   * Transfer succeeded.
   */
  get asV3(): {from: Uint8Array, to: Uint8Array, amount: bigint} {
    assert(this.isV3)
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
  get isV3(): boolean {
    return this._chain.getEventHash('Balances.Unreserved') === 'e84a34a6a3d577b31f16557bd304282f4fe4cbd7115377f4687635dc48e52ba5'
  }

  /**
   * Some balance was unreserved (moved from reserved to free).
   */
  get asV3(): {who: Uint8Array, amount: bigint} {
    assert(this.isV3)
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
  get isV3(): boolean {
    return this._chain.getEventHash('Balances.Withdraw') === 'e84a34a6a3d577b31f16557bd304282f4fe4cbd7115377f4687635dc48e52ba5'
  }

  /**
   * Some amount was withdrawn from the account (e.g. for transaction fees).
   */
  get asV3(): {who: Uint8Array, amount: bigint} {
    assert(this.isV3)
    return this._chain.decodeEvent(this.event)
  }
}

export class ExecutorBundleEquivocationProofProcessedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Executor.BundleEquivocationProofProcessed')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * A bundle equivocation proof was processed.
   */
  get isV3(): boolean {
    return this._chain.getEventHash('Executor.BundleEquivocationProofProcessed') === '01f2f9c28aa1d4d36a81ff042620b6677d25bf07c2bf4acc37b58658778a4fca'
  }

  /**
   * A bundle equivocation proof was processed.
   */
  get asV3(): null {
    assert(this.isV3)
    return this._chain.decodeEvent(this.event)
  }
}

export class ExecutorFraudProofProcessedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Executor.FraudProofProcessed')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * A fraud proof was processed.
   */
  get isV3(): boolean {
    return this._chain.getEventHash('Executor.FraudProofProcessed') === '01f2f9c28aa1d4d36a81ff042620b6677d25bf07c2bf4acc37b58658778a4fca'
  }

  /**
   * A fraud proof was processed.
   */
  get asV3(): null {
    assert(this.isV3)
    return this._chain.decodeEvent(this.event)
  }
}

export class ExecutorInvalidTransactionProofProcessedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Executor.InvalidTransactionProofProcessed')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * An invalid transaction proof was processed.
   */
  get isV3(): boolean {
    return this._chain.getEventHash('Executor.InvalidTransactionProofProcessed') === '01f2f9c28aa1d4d36a81ff042620b6677d25bf07c2bf4acc37b58658778a4fca'
  }

  /**
   * An invalid transaction proof was processed.
   */
  get asV3(): null {
    assert(this.isV3)
    return this._chain.decodeEvent(this.event)
  }
}

export class ExecutorNewExecutionReceiptEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Executor.NewExecutionReceipt')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * A new execution receipt was backed.
   */
  get isV3(): boolean {
    return this._chain.getEventHash('Executor.NewExecutionReceipt') === '751597b080a73167a0e64a0eb0d50ef855e96b3ae9dcb224faae9840a8a9b5e1'
  }

  /**
   * A new execution receipt was backed.
   */
  get asV3(): {primaryNumber: number, primaryHash: Uint8Array} {
    assert(this.isV3)
    return this._chain.decodeEvent(this.event)
  }
}

export class ExecutorTransactionBundleStoredEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Executor.TransactionBundleStored')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * A transaction bundle was included.
   */
  get isV3(): boolean {
    return this._chain.getEventHash('Executor.TransactionBundleStored') === '121e9b9f917f681ab25ab7192e732ddd972a04a8a8abe003221a9f7098bc4425'
  }

  /**
   * A transaction bundle was included.
   */
  get asV3(): {bundleHash: Uint8Array} {
    assert(this.isV3)
    return this._chain.decodeEvent(this.event)
  }
}

export class FeedsFeedClosedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Feeds.FeedClosed')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * Feed was closed.
   */
  get isV3(): boolean {
    return this._chain.getEventHash('Feeds.FeedClosed') === 'e43054e99b8cb765e96c7db36a6b850607da7282f5be14e63e2b98b6b99fe8ca'
  }

  /**
   * Feed was closed.
   */
  get asV3(): {feedId: bigint, who: Uint8Array} {
    assert(this.isV3)
    return this._chain.decodeEvent(this.event)
  }
}

export class FeedsFeedCreatedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Feeds.FeedCreated')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * New feed was created.
   */
  get isV3(): boolean {
    return this._chain.getEventHash('Feeds.FeedCreated') === 'e43054e99b8cb765e96c7db36a6b850607da7282f5be14e63e2b98b6b99fe8ca'
  }

  /**
   * New feed was created.
   */
  get asV3(): {feedId: bigint, who: Uint8Array} {
    assert(this.isV3)
    return this._chain.decodeEvent(this.event)
  }
}

export class FeedsFeedDeletedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Feeds.FeedDeleted')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * Feed was deleted.
   */
  get isV3(): boolean {
    return this._chain.getEventHash('Feeds.FeedDeleted') === 'e43054e99b8cb765e96c7db36a6b850607da7282f5be14e63e2b98b6b99fe8ca'
  }

  /**
   * Feed was deleted.
   */
  get asV3(): {feedId: bigint, who: Uint8Array} {
    assert(this.isV3)
    return this._chain.decodeEvent(this.event)
  }
}

export class FeedsFeedUpdatedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Feeds.FeedUpdated')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * An existing feed was updated.
   */
  get isV3(): boolean {
    return this._chain.getEventHash('Feeds.FeedUpdated') === 'e43054e99b8cb765e96c7db36a6b850607da7282f5be14e63e2b98b6b99fe8ca'
  }

  /**
   * An existing feed was updated.
   */
  get asV3(): {feedId: bigint, who: Uint8Array} {
    assert(this.isV3)
    return this._chain.decodeEvent(this.event)
  }
}

export class FeedsObjectSubmittedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Feeds.ObjectSubmitted')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * New object was added.
   */
  get isV3(): boolean {
    return this._chain.getEventHash('Feeds.ObjectSubmitted') === '9dff4ce751040e6c312a9d6f11c55b628f8fdb1bc8960350d03559269a0caba0'
  }

  /**
   * New object was added.
   */
  get asV3(): {feedId: bigint, who: Uint8Array, metadata: Uint8Array, objectSize: bigint} {
    assert(this.isV3)
    return this._chain.decodeEvent(this.event)
  }
}

export class FeedsOwnershipTransferredEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Feeds.OwnershipTransferred')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * feed ownership transferred
   */
  get isV3(): boolean {
    return this._chain.getEventHash('Feeds.OwnershipTransferred') === '8cd4af30caf7849482aee01d96993a5ce6051d6d1b3e680bece2a7c5cfe53d6a'
  }

  /**
   * feed ownership transferred
   */
  get asV3(): {feedId: bigint, oldOwner: Uint8Array, newOwner: Uint8Array} {
    assert(this.isV3)
    return this._chain.decodeEvent(this.event)
  }
}

export class ObjectStoreObjectSubmittedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'ObjectStore.ObjectSubmitted')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * New object was added.
   */
  get isV3(): boolean {
    return this._chain.getEventHash('ObjectStore.ObjectSubmitted') === '80f120b73cd4d87f5e2660011c01a42364fbb414bfff25dbab89c245ab4f76f2'
  }

  /**
   * New object was added.
   */
  get asV3(): {who: Uint8Array, objectId: Uint8Array, objectSize: number} {
    assert(this.isV3)
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
  get isV3(): boolean {
    return this._chain.getEventHash('OffencesSubspace.Offence') === '5c9081474f836b1480d3d7cc7a09403e5d7f913d809fe792509e057c77a1ff4f'
  }

  /**
   * There is an offence reported of the given `kind` happened at the `session_index` and
   * (kind-specific) time slot. This event is not deposited for duplicate slashes.
   * \[kind, timeslot\].
   */
  get asV3(): {kind: Uint8Array, timeslot: Uint8Array} {
    assert(this.isV3)
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
  get isV3(): boolean {
    return this._chain.getEventHash('Rewards.BlockReward') === '52c46ec505c209924903866c2ba671eea6ee312e03bb458f2436378466b14d2b'
  }

  /**
   * Issued reward for the block author.
   */
  get asV3(): {blockAuthor: Uint8Array, reward: bigint} {
    assert(this.isV3)
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
  get isV3(): boolean {
    return this._chain.getEventHash('Rewards.VoteReward') === '1d7d0f8f594d7631e4d95e8d4b83db4e76674e22deb98444aaff18dca52e47d5'
  }

  /**
   * Issued reward for the voter.
   */
  get asV3(): {voter: Uint8Array, reward: bigint} {
    assert(this.isV3)
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
  get isV3(): boolean {
    return this._chain.getEventHash('Subspace.FarmerVote') === '2a02b147da21bd4db73efcff9b581ba19dbb81948f004ed3e8a535410de2e754'
  }

  /**
   * Farmer vote.
   */
  get asV3(): {publicKey: Uint8Array, rewardAddress: Uint8Array, height: number, parentHash: Uint8Array} {
    assert(this.isV3)
    return this._chain.decodeEvent(this.event)
  }
}

export class SubspaceRootBlockStoredEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Subspace.RootBlockStored')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * Root block was stored in blockchain history.
   */
  get isV3(): boolean {
    return this._chain.getEventHash('Subspace.RootBlockStored') === '6d2e9aaaeb2391576e01b427d15d1c9239c6e9f46427fc45676f30c489ac4275'
  }

  /**
   * Root block was stored in blockchain history.
   */
  get asV3(): {rootBlock: v3.RootBlock} {
    assert(this.isV3)
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
  get isV3(): boolean {
    return this._chain.getEventHash('Sudo.KeyChanged') === 'b94a7a753f8f0b026120555f1f1c70878235307461e256807cb791dad15244c2'
  }

  /**
   * The \[sudoer\] just switched identity; the old key is supplied if one existed.
   */
  get asV3(): {oldSudoer: (Uint8Array | undefined)} {
    assert(this.isV3)
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
  get isV3(): boolean {
    return this._chain.getEventHash('Sudo.Sudid') === '790144505f3238f63eeea8b351d8b0c3c90a3b9cd88e7ee262cd9b81c35d80c6'
  }

  /**
   * A sudo just took place. \[result\]
   */
  get asV3(): {sudoResult: Result<null, v3.DispatchError>} {
    assert(this.isV3)
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
  get isV3(): boolean {
    return this._chain.getEventHash('Sudo.SudoAsDone') === '790144505f3238f63eeea8b351d8b0c3c90a3b9cd88e7ee262cd9b81c35d80c6'
  }

  /**
   * A sudo just took place. \[result\]
   */
  get asV3(): {sudoResult: Result<null, v3.DispatchError>} {
    assert(this.isV3)
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
  get isV3(): boolean {
    return this._chain.getEventHash('System.CodeUpdated') === '01f2f9c28aa1d4d36a81ff042620b6677d25bf07c2bf4acc37b58658778a4fca'
  }

  /**
   * `:code` was updated.
   */
  get asV3(): null {
    assert(this.isV3)
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
  get isV3(): boolean {
    return this._chain.getEventHash('System.ExtrinsicFailed') === 'a6220584fa4f22cb02db1bfad4eacf1a689aea2324f22b4763def7376b7dd9bf'
  }

  /**
   * An extrinsic failed.
   */
  get asV3(): {dispatchError: v3.DispatchError, dispatchInfo: v3.DispatchInfo} {
    assert(this.isV3)
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
  get isV3(): boolean {
    return this._chain.getEventHash('System.ExtrinsicSuccess') === '407ed94c14f243acbe2cdb53df52c37d97bbb5ae550a10a6036bf59677cdd165'
  }

  /**
   * An extrinsic completed successfully.
   */
  get asV3(): {dispatchInfo: v3.DispatchInfo} {
    assert(this.isV3)
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
  get isV3(): boolean {
    return this._chain.getEventHash('System.KilledAccount') === '7fb7672b764b0a4f0c4910fddefec0709628843df7ad0073a97eede13c53ca92'
  }

  /**
   * An account was reaped.
   */
  get asV3(): {account: Uint8Array} {
    assert(this.isV3)
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
  get isV3(): boolean {
    return this._chain.getEventHash('System.NewAccount') === '7fb7672b764b0a4f0c4910fddefec0709628843df7ad0073a97eede13c53ca92'
  }

  /**
   * A new account was created.
   */
  get asV3(): {account: Uint8Array} {
    assert(this.isV3)
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
  get isV3(): boolean {
    return this._chain.getEventHash('System.Remarked') === 'c58b73482fe762a6dcca2f35266f0d1739333312cf7a50eea55c666d0cda6101'
  }

  /**
   * On on-chain remark happened.
   */
  get asV3(): {sender: Uint8Array, hash: Uint8Array} {
    assert(this.isV3)
    return this._chain.decodeEvent(this.event)
  }
}

export class TransactionFeesComputeFeesRewardEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'TransactionFees.ComputeFeesReward')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * Compute fees.
   */
  get isV3(): boolean {
    return this._chain.getEventHash('TransactionFees.ComputeFeesReward') === 'e84a34a6a3d577b31f16557bd304282f4fe4cbd7115377f4687635dc48e52ba5'
  }

  /**
   * Compute fees.
   */
  get asV3(): {who: Uint8Array, amount: bigint} {
    assert(this.isV3)
    return this._chain.decodeEvent(this.event)
  }
}

export class TransactionFeesStorageFeesEscrowChangeEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'TransactionFees.StorageFeesEscrowChange')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * Storage fees escrow change.
   */
  get isV3(): boolean {
    return this._chain.getEventHash('TransactionFees.StorageFeesEscrowChange') === '500c1a1e72640855fd9d8ee7f3c88e551c4a2190429f05b6681ae847f8ab5fc5'
  }

  /**
   * Storage fees escrow change.
   */
  get asV3(): {before: bigint, after: bigint} {
    assert(this.isV3)
    return this._chain.decodeEvent(this.event)
  }
}

export class TransactionFeesStorageFeesRewardEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'TransactionFees.StorageFeesReward')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * Storage fees.
   */
  get isV3(): boolean {
    return this._chain.getEventHash('TransactionFees.StorageFeesReward') === 'e84a34a6a3d577b31f16557bd304282f4fe4cbd7115377f4687635dc48e52ba5'
  }

  /**
   * Storage fees.
   */
  get asV3(): {who: Uint8Array, amount: bigint} {
    assert(this.isV3)
    return this._chain.decodeEvent(this.event)
  }
}

export class TransactionFeesTipsRewardEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'TransactionFees.TipsReward')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * Tips.
   */
  get isV3(): boolean {
    return this._chain.getEventHash('TransactionFees.TipsReward') === 'e84a34a6a3d577b31f16557bd304282f4fe4cbd7115377f4687635dc48e52ba5'
  }

  /**
   * Tips.
   */
  get asV3(): {who: Uint8Array, amount: bigint} {
    assert(this.isV3)
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
  get isV3(): boolean {
    return this._chain.getEventHash('TransactionPayment.TransactionFeePaid') === 'f2e962e9996631445edecd62b0646df79871442a2d1a1a6e1f550a0b3a56b226'
  }

  /**
   * A transaction fee `actual_fee`, of which `tip` was added to the minimum inclusion fee,
   * has been paid by `who`.
   */
  get asV3(): {who: Uint8Array, actualFee: bigint, tip: bigint} {
    assert(this.isV3)
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
  get isV3(): boolean {
    return this._chain.getEventHash('Utility.BatchCompleted') === '01f2f9c28aa1d4d36a81ff042620b6677d25bf07c2bf4acc37b58658778a4fca'
  }

  /**
   * Batch of dispatches completed fully with no error.
   */
  get asV3(): null {
    assert(this.isV3)
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
  get isV3(): boolean {
    return this._chain.getEventHash('Utility.BatchCompletedWithErrors') === '01f2f9c28aa1d4d36a81ff042620b6677d25bf07c2bf4acc37b58658778a4fca'
  }

  /**
   * Batch of dispatches completed but has errors.
   */
  get asV3(): null {
    assert(this.isV3)
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
  get isV3(): boolean {
    return this._chain.getEventHash('Utility.BatchInterrupted') === '30bda593b1e7b041ebb6b79df0135b12bf0ecdbea3d7694f8d9d59560411df93'
  }

  /**
   * Batch of dispatches did not complete fully. Index of first failing dispatch given, as
   * well as the error.
   */
  get asV3(): {index: number, error: v3.DispatchError} {
    assert(this.isV3)
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
  get isV3(): boolean {
    return this._chain.getEventHash('Utility.DispatchedAs') === 'cbb13e6f8f0e2a0b00b89705f05de04cf34bbb44653bcdccedddc8448bc95bfc'
  }

  /**
   * A call was dispatched.
   */
  get asV3(): {result: Result<null, v3.DispatchError>} {
    assert(this.isV3)
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
  get isV3(): boolean {
    return this._chain.getEventHash('Utility.ItemCompleted') === '01f2f9c28aa1d4d36a81ff042620b6677d25bf07c2bf4acc37b58658778a4fca'
  }

  /**
   * A single item within a Batch of dispatches has completed with no error.
   */
  get asV3(): null {
    assert(this.isV3)
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
  get isV3(): boolean {
    return this._chain.getEventHash('Utility.ItemFailed') === '59e964849fe0837c16b04e3c81782ce0ee22b9efe3d6a8d43d6ea61e9b25b998'
  }

  /**
   * A single item within a Batch of dispatches has completed with error.
   */
  get asV3(): {error: v3.DispatchError} {
    assert(this.isV3)
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
  get isV3(): boolean {
    return this._chain.getEventHash('Vesting.Claimed') === 'e84a34a6a3d577b31f16557bd304282f4fe4cbd7115377f4687635dc48e52ba5'
  }

  /**
   * Claimed vesting.
   */
  get asV3(): {who: Uint8Array, amount: bigint} {
    assert(this.isV3)
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
  get isV3(): boolean {
    return this._chain.getEventHash('Vesting.VestingScheduleAdded') === '18422c66dedd030e21a5567fde05a68ab5ad4ffff5f9fdcd73f3d18dcb91873c'
  }

  /**
   * Added new vesting schedule.
   */
  get asV3(): {from: Uint8Array, to: Uint8Array, vestingSchedule: v3.VestingSchedule} {
    assert(this.isV3)
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
  get isV3(): boolean {
    return this._chain.getEventHash('Vesting.VestingSchedulesUpdated') === 'b8a0d2208835f6ada60dd21cd93533d703777b3779109a7c6a2f26bad68c2f3b'
  }

  /**
   * Updated vesting schedules.
   */
  get asV3(): {who: Uint8Array} {
    assert(this.isV3)
    return this._chain.decodeEvent(this.event)
  }
}
