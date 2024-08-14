import type { NetworkId, SubmittableModuleExtrinsics } from '@autonomys/auto-utils'
import type { NetworkSource, TransactionStatus } from 'constants/transaction'
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

export interface OptionalTxFormValues {
  nonce?: number
}

export type ExtrinsicModule = SubmittableModuleExtrinsics<'promise'>
export type ExtrinsicsList = { [key: string]: ExtrinsicModule }
export type ExtrinsicsMethodFields = { name: string; type: string; typeName: string }
export type ExtrinsicsMethodArgs = ExtrinsicsMethodFields & { docs: string[] }

export type ExtrinsicsMethod = {
  name: string
  docs: string[]
  fields: ExtrinsicsMethodFields[]
  args: ExtrinsicsMethodArgs[]
}
export interface CustomExtrinsicFormValues {
  [key: string]: string
}
export interface MessageFormValues extends OptionalTxFormValues {
  message: string
}

export interface SendTokenFormValues extends OptionalTxFormValues {
  sender: string
  sourceNetwork: NetworkSource
  sourceDomainId: string
  receiver: string
  destinationNetwork: NetworkSource
  destinationDomainId: string
  amount: number
}
