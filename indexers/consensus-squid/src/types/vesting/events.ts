import { sts, Block, Bytes, Option, Result, EventType, RuntimeCtx } from '../support'
import * as v0 from '../v0'

export const vestingScheduleAdded = {
  name: 'Vesting.VestingScheduleAdded',
  /**
   * Added new vesting schedule.
   */
  v0: new EventType(
    'Vesting.VestingScheduleAdded',
    sts.struct({
      from: v0.AccountId32,
      to: v0.AccountId32,
      vestingSchedule: v0.VestingSchedule,
    }),
  ),
}

export const claimed = {
  name: 'Vesting.Claimed',
  /**
   * Claimed vesting.
   */
  v0: new EventType(
    'Vesting.Claimed',
    sts.struct({
      who: v0.AccountId32,
      amount: sts.bigint(),
    }),
  ),
}

export const vestingSchedulesUpdated = {
  name: 'Vesting.VestingSchedulesUpdated',
  /**
   * Updated vesting schedules.
   */
  v0: new EventType(
    'Vesting.VestingSchedulesUpdated',
    sts.struct({
      who: v0.AccountId32,
    }),
  ),
}
