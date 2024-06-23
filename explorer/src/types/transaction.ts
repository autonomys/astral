import type { TransactionStatus } from 'constants/transaction'
import { WalletAccountWithType } from 'types/wallet'

export interface Transaction {
  ownerAccount: WalletAccountWithType
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
