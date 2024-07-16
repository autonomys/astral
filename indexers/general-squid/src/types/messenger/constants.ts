import {sts, Block, Bytes, Option, Result, ConstantType, RuntimeCtx} from '../support'
import * as v5 from '../v5'

export const channelReserveFee =  {
    /**
     *  Channel reserve fee to open a channel.
     */
    v3: new ConstantType(
        'Messenger.ChannelReserveFee',
        sts.bigint()
    ),
}

export const channelInitReservePortion =  {
    /**
     *  Portion of Channel reserve taken by the protocol
     *  if the channel is in init state and is requested to be closed.
     */
    v5: new ConstantType(
        'Messenger.ChannelInitReservePortion',
        v5.Perbill
    ),
}
