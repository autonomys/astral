export enum TransactionStatus {
  Pending = 'Pending',
  Success = 'Success',
  Failed = 'Failed',
}

export const successfulTxEvent = 'system.ExtrinsicSuccess'
export const failedTxEvent = 'system.ExtrinsicFailed'
