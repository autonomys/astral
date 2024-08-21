import { sts, Block, Bytes, Option, Result, ConstantType, RuntimeCtx } from '../support'

export const blockReward = {
  /**
   *  Fixed reward for block producer.
   */
  v0: new ConstantType('Rewards.BlockReward', sts.bigint()),
}

export const voteReward = {
  /**
   *  Fixed reward for voter.
   */
  v0: new ConstantType('Rewards.VoteReward', sts.bigint()),
}

export const avgBlockspaceUsageNumBlocks = {
  /**
   *  Number of blocks over which to compute average blockspace usage
   */
  v3: new ConstantType('Rewards.AvgBlockspaceUsageNumBlocks', sts.number()),
}

export const transactionByteFee = {
  /**
   *  Cost of one byte of blockspace
   */
  v3: new ConstantType('Rewards.TransactionByteFee', sts.bigint()),
}

export const maxRewardPoints = {
  /**
   *  Max number of reward points
   */
  v3: new ConstantType('Rewards.MaxRewardPoints', sts.number()),
}

export const proposerTaxOnVotes = {
  /**
   *  Tax of the proposer on vote rewards
   */
  v3: new ConstantType(
    'Rewards.ProposerTaxOnVotes',
    sts.tuple(() => [sts.number(), sts.number()]),
  ),
}
