import {sts, Block, Bytes, Option, Result, ConstantType, RuntimeCtx} from '../support'

export const channelReserveFee =  {
    /**
     *  Channel reserve fee to open a channel.
     */
    v3: new ConstantType(
        'Messenger.ChannelReserveFee',
        sts.bigint()
    ),
}
