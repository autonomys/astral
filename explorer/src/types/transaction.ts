import type { NetworkId } from '@autonomys/auto-utils'
import type { TransactionStatus } from 'constants/transaction'
import type { WalletAccountWithType } from 'types/wallet'

export interface Transaction {
  ownerAccount: WalletAccountWithType
  chain: NetworkId
  status: TransactionStatus
  submittedAtBlockHash: string
  submittedAtBlockNumber: number
  call: string
  txHash: string
  blockHash: string
  from: string
  to: string
  amount: string
  fee: string
  nonce: number
}

export interface TransactionWithMetadata extends Transaction {
  submittedAtLocalTimestamp: Date
  finalizedAtLocalTimestamp?: Date
}
