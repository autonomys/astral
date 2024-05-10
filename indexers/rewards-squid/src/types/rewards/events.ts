import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v0 from '../v0'

export const blockReward =  {
    name: 'Rewards.BlockReward',
    /**
     * Issued reward for the block author.
     */
    v0: new EventType(
        'Rewards.BlockReward',
        sts.struct({
            blockAuthor: v0.AccountId32,
            reward: sts.bigint(),
        })
    ),
}

export const voteReward =  {
    name: 'Rewards.VoteReward',
    /**
     * Issued reward for the voter.
     */
    v0: new EventType(
        'Rewards.VoteReward',
        sts.struct({
            voter: v0.AccountId32,
            reward: sts.bigint(),
        })
    ),
}
