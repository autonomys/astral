import { sts, Block, Bytes, Option, Result, ConstantType, RuntimeCtx } from '../support'
import * as v0 from '../v0'

export const blockAuthoringDelay = {
  /**
   *  Number of slots between slot arrival and when corresponding block can be produced.
   *
   *  Practically this means future proof of time proof needs to be revealed this many slots
   *  ahead before block can be authored even though solution is available before that.
   */
  v0: new ConstantType('Subspace.BlockAuthoringDelay', v0.Slot),
}

export const potEntropyInjectionInterval = {
  /**
   *  Interval, in blocks, between blockchain entropy injection into proof of time chain.
   */
  v0: new ConstantType('Subspace.PotEntropyInjectionInterval', sts.number()),
}

export const potEntropyInjectionLookbackDepth = {
  /**
   *  Interval, in entropy injection intervals, where to take entropy for injection from.
   */
  v0: new ConstantType('Subspace.PotEntropyInjectionLookbackDepth', sts.number()),
}

export const potEntropyInjectionDelay = {
  /**
   *  Delay after block, in slots, when entropy injection takes effect.
   */
  v0: new ConstantType('Subspace.PotEntropyInjectionDelay', v0.Slot),
}

export const eraDuration = {
  /**
   *  The amount of time, in blocks, that each era should last.
   *  NOTE: Currently it is not possible to change the era duration after
   *  the chain has started. Attempting to do so will brick block production.
   */
  v0: new ConstantType('Subspace.EraDuration', sts.number()),
}

export const initialSolutionRange = {
  /**
   *  Initial solution range used for challenges during the very first era.
   */
  v0: new ConstantType('Subspace.InitialSolutionRange', sts.bigint()),
}

export const slotProbability = {
  /**
   *  How often in slots slots (on average, not counting collisions) will have a block.
   *
   *  Expressed as a rational where the first member of the tuple is the
   *  numerator and the second is the denominator. The rational should
   *  represent a value between 0 and 1.
   */
  v0: new ConstantType(
    'Subspace.SlotProbability',
    sts.tuple(() => [sts.bigint(), sts.bigint()]),
  ),
}

export const confirmationDepthK = {
  /**
   *  Depth `K` after which a block enters the recorded history (a global constant, as opposed
   *  to the client-dependent transaction confirmation depth `k`).
   */
  v0: new ConstantType('Subspace.ConfirmationDepthK', sts.number()),
}

export const recentSegments = {
  /**
   *  Number of latest archived segments that are considered "recent history".
   */
  v0: new ConstantType('Subspace.RecentSegments', v0.HistorySize),
}

export const recentHistoryFraction = {
  /**
   *  Fraction of pieces from the "recent history" (`recent_segments`) in each sector.
   */
  v0: new ConstantType(
    'Subspace.RecentHistoryFraction',
    sts.tuple(() => [v0.HistorySize, v0.HistorySize]),
  ),
}

export const minSectorLifetime = {
  /**
   *  Minimum lifetime of a plotted sector, measured in archived segment.
   */
  v0: new ConstantType('Subspace.MinSectorLifetime', v0.HistorySize),
}

export const expectedVotesPerBlock = {
  /**
   *  Number of votes expected per block.
   *
   *  This impacts solution range for votes in consensus.
   */
  v0: new ConstantType('Subspace.ExpectedVotesPerBlock', sts.number()),
}

export const maxPiecesInSector = {
  /**
   *  How many pieces one sector is supposed to contain (max)
   */
  v0: new ConstantType('Subspace.MaxPiecesInSector', sts.number()),
}

export const blockSlotCount = {
  /**
   *  Maximum number of block number to block slot mappings to keep (oldest pruned first).
   */
  v3: new ConstantType('Subspace.BlockSlotCount', sts.number()),
}
