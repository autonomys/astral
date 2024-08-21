import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v0 from '../v0'

export const channelInitiated =  {
    name: 'Messenger.ChannelInitiated',
    /**
     * Emits when a channel between two chains is initiated.
     */
    v0: new EventType(
        'Messenger.ChannelInitiated',
        sts.struct({
            /**
             * Foreign chain id this channel connects to.
             */
            chainId: v0.ChainId,
            /**
             * Channel ID of the said channel.
             */
            channelId: sts.bigint(),
        })
    ),
}

export const channelClosed =  {
    name: 'Messenger.ChannelClosed',
    /**
     * Emits when a channel between two chains is closed.
     */
    v0: new EventType(
        'Messenger.ChannelClosed',
        sts.struct({
            /**
             * Foreign chain id this channel connects to.
             */
            chainId: v0.ChainId,
            /**
             * Channel ID of the said channel.
             */
            channelId: sts.bigint(),
        })
    ),
}

export const channelOpen =  {
    name: 'Messenger.ChannelOpen',
    /**
     * Emits when a channel between two chain is open.
     */
    v0: new EventType(
        'Messenger.ChannelOpen',
        sts.struct({
            /**
             * Foreign chain id this channel connects to.
             */
            chainId: v0.ChainId,
            /**
             * Channel ID of the said channel.
             */
            channelId: sts.bigint(),
        })
    ),
}

export const outboxMessage =  {
    name: 'Messenger.OutboxMessage',
    /**
     * Emits when a new message is added to the outbox.
     */
    v0: new EventType(
        'Messenger.OutboxMessage',
        sts.struct({
            chainId: v0.ChainId,
            channelId: sts.bigint(),
            nonce: sts.bigint(),
        })
    ),
}

export const outboxMessageResponse =  {
    name: 'Messenger.OutboxMessageResponse',
    /**
     * Emits when a message response is available for Outbox message.
     */
    v0: new EventType(
        'Messenger.OutboxMessageResponse',
        sts.struct({
            /**
             * Destination chain ID.
             */
            chainId: v0.ChainId,
            /**
             * Channel Is
             */
            channelId: sts.bigint(),
            nonce: sts.bigint(),
        })
    ),
}

export const outboxMessageResult =  {
    name: 'Messenger.OutboxMessageResult',
    /**
     * Emits outbox message result.
     */
    v0: new EventType(
        'Messenger.OutboxMessageResult',
        sts.struct({
            chainId: v0.ChainId,
            channelId: sts.bigint(),
            nonce: sts.bigint(),
            result: v0.OutboxMessageResult,
        })
    ),
}

export const inboxMessage =  {
    name: 'Messenger.InboxMessage',
    /**
     * Emits when a new inbox message is validated and added to Inbox.
     */
    v0: new EventType(
        'Messenger.InboxMessage',
        sts.struct({
            chainId: v0.ChainId,
            channelId: sts.bigint(),
            nonce: sts.bigint(),
        })
    ),
}

export const inboxMessageResponse =  {
    name: 'Messenger.InboxMessageResponse',
    /**
     * Emits when a message response is available for Inbox message.
     */
    v0: new EventType(
        'Messenger.InboxMessageResponse',
        sts.struct({
            /**
             * Destination chain ID.
             */
            chainId: v0.ChainId,
            /**
             * Channel Is
             */
            channelId: sts.bigint(),
            nonce: sts.bigint(),
        })
    ),
}
