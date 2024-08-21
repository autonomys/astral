import { sts, Block, Bytes, Option, Result, EventType, RuntimeCtx } from '../support'
import * as v0 from '../v0'

export const segmentHeaderStored = {
  name: 'Subspace.SegmentHeaderStored',
  /**
   * Segment header was stored in blockchain history.
   */
  v0: new EventType(
    'Subspace.SegmentHeaderStored',
    sts.struct({
      segmentHeader: v0.SegmentHeader,
    }),
  ),
}

export const farmerVote = {
  name: 'Subspace.FarmerVote',
  /**
   * Farmer vote.
   */
  v0: new EventType(
    'Subspace.FarmerVote',
    sts.struct({
      publicKey: v0.Public,
      rewardAddress: v0.AccountId32,
      height: sts.number(),
      parentHash: v0.H256,
    }),
  ),
}
