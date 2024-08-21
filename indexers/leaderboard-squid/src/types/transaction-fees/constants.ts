import { sts, Block, Bytes, Option, Result, ConstantType, RuntimeCtx } from '../support'

export const minReplicationFactor = {
  /**
   *  Minimum desired number of replicas of the blockchain to be stored by the network,
   *  impacts storage fees.
   */
  v0: new ConstantType('TransactionFees.MinReplicationFactor', sts.number()),
}

export const creditSupply = {
  /**
   *  How many credits there is in circulation.
   */
  v0: new ConstantType('TransactionFees.CreditSupply', sts.bigint()),
}

export const totalSpacePledged = {
  /**
   *  How much space there is on the network.
   */
  v0: new ConstantType('TransactionFees.TotalSpacePledged', sts.bigint()),
}

export const blockchainHistorySize = {
  /**
   *  How big is the history of the blockchain in archived state (thus includes erasure
   *  coding, but not replication).
   */
  v0: new ConstantType('TransactionFees.BlockchainHistorySize', sts.bigint()),
}
