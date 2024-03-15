import {sts, Block, Bytes, Option, Result, CallType, RuntimeCtx} from '../support'
import * as v0 from '../v0'

export const initiateChannel =  {
    name: 'Messenger.initiate_channel',
    /**
     * See [`Pallet::initiate_channel`].
     */
    v0: new CallType(
        'Messenger.initiate_channel',
        sts.struct({
            dstChainId: v0.ChainId,
            params: v0.InitiateChannelParams,
        })
    ),
}

export const closeChannel =  {
    name: 'Messenger.close_channel',
    /**
     * See [`Pallet::close_channel`].
     */
    v0: new CallType(
        'Messenger.close_channel',
        sts.struct({
            chainId: v0.ChainId,
            channelId: sts.bigint(),
        })
    ),
}

export const relayMessage =  {
    name: 'Messenger.relay_message',
    /**
     * See [`Pallet::relay_message`].
     */
    v0: new CallType(
        'Messenger.relay_message',
        sts.struct({
            msg: v0.CrossDomainMessage,
        })
    ),
}

export const relayMessageResponse =  {
    name: 'Messenger.relay_message_response',
    /**
     * See [`Pallet::relay_message_response`].
     */
    v0: new CallType(
        'Messenger.relay_message_response',
        sts.struct({
            msg: v0.CrossDomainMessage,
        })
    ),
}
