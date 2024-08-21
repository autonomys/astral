import { sts, Block, Bytes, Option, Result, StorageType, RuntimeCtx } from '../support'
import * as v0 from '../v0'

export const nextFeeMultiplier = {
  v0: new StorageType(
    'TransactionPayment.NextFeeMultiplier',
    'Default',
    [],
    v0.FixedU128,
  ) as NextFeeMultiplierV0,
}

export interface NextFeeMultiplierV0 {
  is(block: RuntimeCtx): boolean
  getDefault(block: Block): v0.FixedU128
  get(block: Block): Promise<v0.FixedU128 | undefined>
}

export const storageVersion = {
  v0: new StorageType(
    'TransactionPayment.StorageVersion',
    'Default',
    [],
    v0.Releases,
  ) as StorageVersionV0,
}

export interface StorageVersionV0 {
  is(block: RuntimeCtx): boolean
  getDefault(block: Block): v0.Releases
  get(block: Block): Promise<v0.Releases | undefined>
}
