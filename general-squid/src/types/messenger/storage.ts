import {sts, Block, Bytes, Option, Result, StorageType, RuntimeCtx} from '../support'
import * as v0 from '../v0'
import * as v3 from '../v3'

export const nextChannelId =  {
    /**
     *  Stores the next channel id for a foreign chain.
     */
    v0: new StorageType('Messenger.NextChannelId', 'Default', [v0.ChainId], sts.bigint()) as NextChannelIdV0,
}

/**
 *  Stores the next channel id for a foreign chain.
 */
export interface NextChannelIdV0  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): bigint
    get(block: Block, key: v0.ChainId): Promise<(bigint | undefined)>
    getMany(block: Block, keys: v0.ChainId[]): Promise<(bigint | undefined)[]>
    getKeys(block: Block): Promise<v0.ChainId[]>
    getKeys(block: Block, key: v0.ChainId): Promise<v0.ChainId[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v0.ChainId[]>
    getKeysPaged(pageSize: number, block: Block, key: v0.ChainId): AsyncIterable<v0.ChainId[]>
    getPairs(block: Block): Promise<[k: v0.ChainId, v: (bigint | undefined)][]>
    getPairs(block: Block, key: v0.ChainId): Promise<[k: v0.ChainId, v: (bigint | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v0.ChainId, v: (bigint | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v0.ChainId): AsyncIterable<[k: v0.ChainId, v: (bigint | undefined)][]>
}

export const channels =  {
    /**
     *  Stores channel config between two chains.
     *  Key points to the foreign chain wrt own chain's storage name space
     */
    v0: new StorageType('Messenger.Channels', 'Optional', [v0.ChainId, sts.bigint()], v0.Channel) as ChannelsV0,
    /**
     *  Stores channel config between two chains.
     *  Key points to the foreign chain wrt own chain's storage name space
     */
    v3: new StorageType('Messenger.Channels', 'Optional', [v3.ChainId, sts.bigint()], v3.Channel) as ChannelsV3,
}

/**
 *  Stores channel config between two chains.
 *  Key points to the foreign chain wrt own chain's storage name space
 */
export interface ChannelsV0  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key1: v0.ChainId, key2: bigint): Promise<(v0.Channel | undefined)>
    getMany(block: Block, keys: [v0.ChainId, bigint][]): Promise<(v0.Channel | undefined)[]>
    getKeys(block: Block): Promise<[v0.ChainId, bigint][]>
    getKeys(block: Block, key1: v0.ChainId): Promise<[v0.ChainId, bigint][]>
    getKeys(block: Block, key1: v0.ChainId, key2: bigint): Promise<[v0.ChainId, bigint][]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<[v0.ChainId, bigint][]>
    getKeysPaged(pageSize: number, block: Block, key1: v0.ChainId): AsyncIterable<[v0.ChainId, bigint][]>
    getKeysPaged(pageSize: number, block: Block, key1: v0.ChainId, key2: bigint): AsyncIterable<[v0.ChainId, bigint][]>
    getPairs(block: Block): Promise<[k: [v0.ChainId, bigint], v: (v0.Channel | undefined)][]>
    getPairs(block: Block, key1: v0.ChainId): Promise<[k: [v0.ChainId, bigint], v: (v0.Channel | undefined)][]>
    getPairs(block: Block, key1: v0.ChainId, key2: bigint): Promise<[k: [v0.ChainId, bigint], v: (v0.Channel | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: [v0.ChainId, bigint], v: (v0.Channel | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: v0.ChainId): AsyncIterable<[k: [v0.ChainId, bigint], v: (v0.Channel | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: v0.ChainId, key2: bigint): AsyncIterable<[k: [v0.ChainId, bigint], v: (v0.Channel | undefined)][]>
}

/**
 *  Stores channel config between two chains.
 *  Key points to the foreign chain wrt own chain's storage name space
 */
export interface ChannelsV3  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key1: v3.ChainId, key2: bigint): Promise<(v3.Channel | undefined)>
    getMany(block: Block, keys: [v3.ChainId, bigint][]): Promise<(v3.Channel | undefined)[]>
    getKeys(block: Block): Promise<[v3.ChainId, bigint][]>
    getKeys(block: Block, key1: v3.ChainId): Promise<[v3.ChainId, bigint][]>
    getKeys(block: Block, key1: v3.ChainId, key2: bigint): Promise<[v3.ChainId, bigint][]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<[v3.ChainId, bigint][]>
    getKeysPaged(pageSize: number, block: Block, key1: v3.ChainId): AsyncIterable<[v3.ChainId, bigint][]>
    getKeysPaged(pageSize: number, block: Block, key1: v3.ChainId, key2: bigint): AsyncIterable<[v3.ChainId, bigint][]>
    getPairs(block: Block): Promise<[k: [v3.ChainId, bigint], v: (v3.Channel | undefined)][]>
    getPairs(block: Block, key1: v3.ChainId): Promise<[k: [v3.ChainId, bigint], v: (v3.Channel | undefined)][]>
    getPairs(block: Block, key1: v3.ChainId, key2: bigint): Promise<[k: [v3.ChainId, bigint], v: (v3.Channel | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: [v3.ChainId, bigint], v: (v3.Channel | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: v3.ChainId): AsyncIterable<[k: [v3.ChainId, bigint], v: (v3.Channel | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key1: v3.ChainId, key2: bigint): AsyncIterable<[k: [v3.ChainId, bigint], v: (v3.Channel | undefined)][]>
}

export const inbox =  {
    /**
     *  A temporary storage for storing decoded inbox message between `pre_dispatch_relay_message`
     *  and `relay_message`.
     */
    v0: new StorageType('Messenger.Inbox', 'Optional', [], v0.Message) as InboxV0,
}

/**
 *  A temporary storage for storing decoded inbox message between `pre_dispatch_relay_message`
 *  and `relay_message`.
 */
export interface InboxV0  {
    is(block: RuntimeCtx): boolean
    get(block: Block): Promise<(v0.Message | undefined)>
}

export const inboxFee =  {
    /**
     *  A temporary storage of fees for executing an inbox message.
     *  The storage is cleared when the acknowledgement of inbox response is received
     *  from the src_chain.
     */
    v0: new StorageType('Messenger.InboxFee', 'Optional', [sts.tuple(() => [v0.ChainId, sts.tuple(() => [sts.bigint(), sts.bigint()])])], sts.bigint()) as InboxFeeV0,
}

/**
 *  A temporary storage of fees for executing an inbox message.
 *  The storage is cleared when the acknowledgement of inbox response is received
 *  from the src_chain.
 */
export interface InboxFeeV0  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: [v0.ChainId, [bigint, bigint]]): Promise<(bigint | undefined)>
    getMany(block: Block, keys: [v0.ChainId, [bigint, bigint]][]): Promise<(bigint | undefined)[]>
    getKeys(block: Block): Promise<[v0.ChainId, [bigint, bigint]][]>
    getKeys(block: Block, key: [v0.ChainId, [bigint, bigint]]): Promise<[v0.ChainId, [bigint, bigint]][]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<[v0.ChainId, [bigint, bigint]][]>
    getKeysPaged(pageSize: number, block: Block, key: [v0.ChainId, [bigint, bigint]]): AsyncIterable<[v0.ChainId, [bigint, bigint]][]>
    getPairs(block: Block): Promise<[k: [v0.ChainId, [bigint, bigint]], v: (bigint | undefined)][]>
    getPairs(block: Block, key: [v0.ChainId, [bigint, bigint]]): Promise<[k: [v0.ChainId, [bigint, bigint]], v: (bigint | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: [v0.ChainId, [bigint, bigint]], v: (bigint | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: [v0.ChainId, [bigint, bigint]]): AsyncIterable<[k: [v0.ChainId, [bigint, bigint]], v: (bigint | undefined)][]>
}

export const outboxFee =  {
    /**
     *  A temporary storage of fees for executing an outbox message and its response from dst_chain.
     *  The storage is cleared when src_chain receives the response from dst_chain.
     */
    v0: new StorageType('Messenger.OutboxFee', 'Optional', [sts.tuple(() => [v0.ChainId, sts.tuple(() => [sts.bigint(), sts.bigint()])])], sts.bigint()) as OutboxFeeV0,
}

/**
 *  A temporary storage of fees for executing an outbox message and its response from dst_chain.
 *  The storage is cleared when src_chain receives the response from dst_chain.
 */
export interface OutboxFeeV0  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: [v0.ChainId, [bigint, bigint]]): Promise<(bigint | undefined)>
    getMany(block: Block, keys: [v0.ChainId, [bigint, bigint]][]): Promise<(bigint | undefined)[]>
    getKeys(block: Block): Promise<[v0.ChainId, [bigint, bigint]][]>
    getKeys(block: Block, key: [v0.ChainId, [bigint, bigint]]): Promise<[v0.ChainId, [bigint, bigint]][]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<[v0.ChainId, [bigint, bigint]][]>
    getKeysPaged(pageSize: number, block: Block, key: [v0.ChainId, [bigint, bigint]]): AsyncIterable<[v0.ChainId, [bigint, bigint]][]>
    getPairs(block: Block): Promise<[k: [v0.ChainId, [bigint, bigint]], v: (bigint | undefined)][]>
    getPairs(block: Block, key: [v0.ChainId, [bigint, bigint]]): Promise<[k: [v0.ChainId, [bigint, bigint]], v: (bigint | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: [v0.ChainId, [bigint, bigint]], v: (bigint | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: [v0.ChainId, [bigint, bigint]]): AsyncIterable<[k: [v0.ChainId, [bigint, bigint]], v: (bigint | undefined)][]>
}

export const inboxResponses =  {
    /**
     *  Stores the message responses of the incoming processed responses.
     *  Used by the dst_chains to verify the message response.
     */
    v0: new StorageType('Messenger.InboxResponses', 'Optional', [sts.tuple(() => [v0.ChainId, sts.bigint(), sts.bigint()])], v0.Message) as InboxResponsesV0,
}

/**
 *  Stores the message responses of the incoming processed responses.
 *  Used by the dst_chains to verify the message response.
 */
export interface InboxResponsesV0  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: [v0.ChainId, bigint, bigint]): Promise<(v0.Message | undefined)>
    getMany(block: Block, keys: [v0.ChainId, bigint, bigint][]): Promise<(v0.Message | undefined)[]>
    getKeys(block: Block): Promise<[v0.ChainId, bigint, bigint][]>
    getKeys(block: Block, key: [v0.ChainId, bigint, bigint]): Promise<[v0.ChainId, bigint, bigint][]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<[v0.ChainId, bigint, bigint][]>
    getKeysPaged(pageSize: number, block: Block, key: [v0.ChainId, bigint, bigint]): AsyncIterable<[v0.ChainId, bigint, bigint][]>
    getPairs(block: Block): Promise<[k: [v0.ChainId, bigint, bigint], v: (v0.Message | undefined)][]>
    getPairs(block: Block, key: [v0.ChainId, bigint, bigint]): Promise<[k: [v0.ChainId, bigint, bigint], v: (v0.Message | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: [v0.ChainId, bigint, bigint], v: (v0.Message | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: [v0.ChainId, bigint, bigint]): AsyncIterable<[k: [v0.ChainId, bigint, bigint], v: (v0.Message | undefined)][]>
}

export const counterForInboxResponses =  {
    /**
     * Counter for the related counted storage map
     */
    v0: new StorageType('Messenger.CounterForInboxResponses', 'Default', [], sts.number()) as CounterForInboxResponsesV0,
}

/**
 * Counter for the related counted storage map
 */
export interface CounterForInboxResponsesV0  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): number
    get(block: Block): Promise<(number | undefined)>
}

export const outbox =  {
    /**
     *  Stores the outgoing messages that are awaiting message responses from the dst_chain.
     *  Messages are processed in the outbox nonce order of chain's channel.
     */
    v0: new StorageType('Messenger.Outbox', 'Optional', [sts.tuple(() => [v0.ChainId, sts.bigint(), sts.bigint()])], v0.Message) as OutboxV0,
}

/**
 *  Stores the outgoing messages that are awaiting message responses from the dst_chain.
 *  Messages are processed in the outbox nonce order of chain's channel.
 */
export interface OutboxV0  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: [v0.ChainId, bigint, bigint]): Promise<(v0.Message | undefined)>
    getMany(block: Block, keys: [v0.ChainId, bigint, bigint][]): Promise<(v0.Message | undefined)[]>
    getKeys(block: Block): Promise<[v0.ChainId, bigint, bigint][]>
    getKeys(block: Block, key: [v0.ChainId, bigint, bigint]): Promise<[v0.ChainId, bigint, bigint][]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<[v0.ChainId, bigint, bigint][]>
    getKeysPaged(pageSize: number, block: Block, key: [v0.ChainId, bigint, bigint]): AsyncIterable<[v0.ChainId, bigint, bigint][]>
    getPairs(block: Block): Promise<[k: [v0.ChainId, bigint, bigint], v: (v0.Message | undefined)][]>
    getPairs(block: Block, key: [v0.ChainId, bigint, bigint]): Promise<[k: [v0.ChainId, bigint, bigint], v: (v0.Message | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: [v0.ChainId, bigint, bigint], v: (v0.Message | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: [v0.ChainId, bigint, bigint]): AsyncIterable<[k: [v0.ChainId, bigint, bigint], v: (v0.Message | undefined)][]>
}

export const counterForOutbox =  {
    /**
     * Counter for the related counted storage map
     */
    v0: new StorageType('Messenger.CounterForOutbox', 'Default', [], sts.number()) as CounterForOutboxV0,
}

/**
 * Counter for the related counted storage map
 */
export interface CounterForOutboxV0  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): number
    get(block: Block): Promise<(number | undefined)>
}

export const outboxResponses =  {
    /**
     *  A temporary storage for storing decoded outbox response message between `pre_dispatch_relay_message_response`
     *  and `relay_message_response`.
     */
    v0: new StorageType('Messenger.OutboxResponses', 'Optional', [], v0.Message) as OutboxResponsesV0,
}

/**
 *  A temporary storage for storing decoded outbox response message between `pre_dispatch_relay_message_response`
 *  and `relay_message_response`.
 */
export interface OutboxResponsesV0  {
    is(block: RuntimeCtx): boolean
    get(block: Block): Promise<(v0.Message | undefined)>
}

export const blockMessages =  {
    /**
     *  A temporary storage to store all the messages to be relayed in this block.
     *  Will be cleared on the initialization on next block.
     */
    v0: new StorageType('Messenger.BlockMessages', 'Optional', [], v0.BlockMessages) as BlockMessagesV0,
}

/**
 *  A temporary storage to store all the messages to be relayed in this block.
 *  Will be cleared on the initialization on next block.
 */
export interface BlockMessagesV0  {
    is(block: RuntimeCtx): boolean
    get(block: Block): Promise<(v0.BlockMessages | undefined)>
}

export const chainAllowlist =  {
    /**
     *  An allowlist of chains that can open channel with this chain.
     */
    v3: new StorageType('Messenger.ChainAllowlist', 'Default', [], sts.array(() => v3.ChainId)) as ChainAllowlistV3,
}

/**
 *  An allowlist of chains that can open channel with this chain.
 */
export interface ChainAllowlistV3  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v3.ChainId[]
    get(block: Block): Promise<(v3.ChainId[] | undefined)>
}

export const domainChainAllowlistUpdate =  {
    /**
     *  A temporary storage to store any allowlist updates to domain.
     *  Will be cleared in the next block once the previous block has a domain bundle.
     */
    v3: new StorageType('Messenger.DomainChainAllowlistUpdate', 'Optional', [v3.DomainId], v3.DomainAllowlistUpdates) as DomainChainAllowlistUpdateV3,
}

/**
 *  A temporary storage to store any allowlist updates to domain.
 *  Will be cleared in the next block once the previous block has a domain bundle.
 */
export interface DomainChainAllowlistUpdateV3  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v3.DomainId): Promise<(v3.DomainAllowlistUpdates | undefined)>
    getMany(block: Block, keys: v3.DomainId[]): Promise<(v3.DomainAllowlistUpdates | undefined)[]>
    getKeys(block: Block): Promise<v3.DomainId[]>
    getKeys(block: Block, key: v3.DomainId): Promise<v3.DomainId[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v3.DomainId[]>
    getKeysPaged(pageSize: number, block: Block, key: v3.DomainId): AsyncIterable<v3.DomainId[]>
    getPairs(block: Block): Promise<[k: v3.DomainId, v: (v3.DomainAllowlistUpdates | undefined)][]>
    getPairs(block: Block, key: v3.DomainId): Promise<[k: v3.DomainId, v: (v3.DomainAllowlistUpdates | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v3.DomainId, v: (v3.DomainAllowlistUpdates | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v3.DomainId): AsyncIterable<[k: v3.DomainId, v: (v3.DomainAllowlistUpdates | undefined)][]>
}
