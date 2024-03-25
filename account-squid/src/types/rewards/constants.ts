import {sts, Block, Bytes, Option, Result, ConstantType, RuntimeCtx} from '../support'

export const blockReward =  {
    /**
     *  Fixed reward for block producer.
     */
    v0: new ConstantType(
        'Rewards.BlockReward',
        sts.bigint()
    ),
}

export const voteReward =  {
    /**
     *  Fixed reward for voter.
     */
    v0: new ConstantType(
        'Rewards.VoteReward',
        sts.bigint()
    ),
}
