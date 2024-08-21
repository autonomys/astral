import { sts, Block, Bytes, Option, Result, StorageType, RuntimeCtx } from '../support'
import * as v0 from '../v0'

export const vestingSchedules = {
  /**
   *  Vesting schedules of an account.
   *
   *  VestingSchedules: map AccountId => Vec<VestingSchedule>
   */
  v0: new StorageType(
    'Vesting.VestingSchedules',
    'Default',
    [v0.AccountId32],
    sts.array(() => v0.VestingSchedule),
  ) as VestingSchedulesV0,
}

/**
 *  Vesting schedules of an account.
 *
 *  VestingSchedules: map AccountId => Vec<VestingSchedule>
 */
export interface VestingSchedulesV0 {
  is(block: RuntimeCtx): boolean
  getDefault(block: Block): v0.VestingSchedule[]
  get(block: Block, key: v0.AccountId32): Promise<v0.VestingSchedule[] | undefined>
  getMany(block: Block, keys: v0.AccountId32[]): Promise<(v0.VestingSchedule[] | undefined)[]>
  getKeys(block: Block): Promise<v0.AccountId32[]>
  getKeys(block: Block, key: v0.AccountId32): Promise<v0.AccountId32[]>
  getKeysPaged(pageSize: number, block: Block): AsyncIterable<v0.AccountId32[]>
  getKeysPaged(pageSize: number, block: Block, key: v0.AccountId32): AsyncIterable<v0.AccountId32[]>
  getPairs(block: Block): Promise<[k: v0.AccountId32, v: v0.VestingSchedule[] | undefined][]>
  getPairs(
    block: Block,
    key: v0.AccountId32,
  ): Promise<[k: v0.AccountId32, v: v0.VestingSchedule[] | undefined][]>
  getPairsPaged(
    pageSize: number,
    block: Block,
  ): AsyncIterable<[k: v0.AccountId32, v: v0.VestingSchedule[] | undefined][]>
  getPairsPaged(
    pageSize: number,
    block: Block,
    key: v0.AccountId32,
  ): AsyncIterable<[k: v0.AccountId32, v: v0.VestingSchedule[] | undefined][]>
}
