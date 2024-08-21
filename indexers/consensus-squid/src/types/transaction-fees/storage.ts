import { sts, Block, Bytes, Option, Result, StorageType, RuntimeCtx } from '../support'
import * as v0 from '../v0'

export const transactionByteFee = {
  /**
   *  The value of `transaction_byte_fee` for both the current and the next block.
   *
   *  The `next` value of `transaction_byte_fee` is updated at block finalization and used to
   *  validate extrinsic to be included in the next block, the value is move to `current` at
   *  block initialization and used to execute extrinsic in the current block. Together it
   *  ensure we use the same value for both validating and executing the extrinsic.
   *
   *  NOTE: both the `current` and `next` value is set to the default `Balance::max_value` in
   *  the genesis block which means there will be no signed extrinsic included in block #1.
   */
  v0: new StorageType(
    'TransactionFees.TransactionByteFee',
    'Default',
    [],
    v0.BlockTransactionByteFee,
  ) as TransactionByteFeeV0,
}

/**
 *  The value of `transaction_byte_fee` for both the current and the next block.
 *
 *  The `next` value of `transaction_byte_fee` is updated at block finalization and used to
 *  validate extrinsic to be included in the next block, the value is move to `current` at
 *  block initialization and used to execute extrinsic in the current block. Together it
 *  ensure we use the same value for both validating and executing the extrinsic.
 *
 *  NOTE: both the `current` and `next` value is set to the default `Balance::max_value` in
 *  the genesis block which means there will be no signed extrinsic included in block #1.
 */
export interface TransactionByteFeeV0 {
  is(block: RuntimeCtx): boolean
  getDefault(block: Block): v0.BlockTransactionByteFee
  get(block: Block): Promise<v0.BlockTransactionByteFee | undefined>
}

export const isDuringBlockExecution = {
  /**
   *  Temporary value (cleared at block finalization) used to determine if the `transaction_byte_fee`
   *  is used to validate extrinsic or execute extrinsic.
   */
  v0: new StorageType(
    'TransactionFees.IsDuringBlockExecution',
    'Default',
    [],
    sts.boolean(),
  ) as IsDuringBlockExecutionV0,
}

/**
 *  Temporary value (cleared at block finalization) used to determine if the `transaction_byte_fee`
 *  is used to validate extrinsic or execute extrinsic.
 */
export interface IsDuringBlockExecutionV0 {
  is(block: RuntimeCtx): boolean
  getDefault(block: Block): boolean
  get(block: Block): Promise<boolean | undefined>
}

export const blockAuthor = {
  /**
   *  Temporary value (cleared at block finalization) which contains current block author, so we
   *  can issue fees during block finalization.
   */
  v0: new StorageType(
    'TransactionFees.BlockAuthor',
    'Optional',
    [],
    v0.AccountId32,
  ) as BlockAuthorV0,
}

/**
 *  Temporary value (cleared at block finalization) which contains current block author, so we
 *  can issue fees during block finalization.
 */
export interface BlockAuthorV0 {
  is(block: RuntimeCtx): boolean
  get(block: Block): Promise<v0.AccountId32 | undefined>
}

export const collectedBlockFees = {
  /**
   *  Temporary value (cleared at block finalization) which contains current block fees, so we can
   *  issue fees during block finalization.
   */
  v0: new StorageType(
    'TransactionFees.CollectedBlockFees',
    'Optional',
    [],
    v0.CollectedFees,
  ) as CollectedBlockFeesV0,
}

/**
 *  Temporary value (cleared at block finalization) which contains current block fees, so we can
 *  issue fees during block finalization.
 */
export interface CollectedBlockFeesV0 {
  is(block: RuntimeCtx): boolean
  get(block: Block): Promise<v0.CollectedFees | undefined>
}
