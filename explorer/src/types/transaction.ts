import type { TransactionStatus } from 'constants/transaction'
import { WalletAccountWithType } from 'types/wallet'

export interface Transaction {
  ownerAccount: WalletAccountWithType
  status: TransactionStatus
  submittedAtBlock: number
  txHash: string
  blockHash: string
  from: string
  to: string
  amount: string
  fee: string
  nonce: number
  signature: string
}
