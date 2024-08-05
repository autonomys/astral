import {sts, Block, Bytes, Option, Result, CallType, RuntimeCtx} from '../support'
import * as v0 from '../v0'

export const reportEquivocation =  {
    name: 'Subspace.report_equivocation',
    /**
     * See [`Pallet::report_equivocation`].
     */
    v0: new CallType(
        'Subspace.report_equivocation',
        sts.struct({
            equivocationProof: v0.EquivocationProof,
        })
    ),
}

export const storeSegmentHeaders =  {
    name: 'Subspace.store_segment_headers',
    /**
     * See [`Pallet::store_segment_headers`].
     */
    v0: new CallType(
        'Subspace.store_segment_headers',
        sts.struct({
            segmentHeaders: sts.array(() => v0.SegmentHeader),
        })
    ),
}

export const enableSolutionRangeAdjustment =  {
    name: 'Subspace.enable_solution_range_adjustment',
    /**
     * See [`Pallet::enable_solution_range_adjustment`].
     */
    v0: new CallType(
        'Subspace.enable_solution_range_adjustment',
        sts.struct({
            solutionRangeOverride: sts.option(() => sts.bigint()),
            votingSolutionRangeOverride: sts.option(() => sts.bigint()),
        })
    ),
}

export const vote =  {
    name: 'Subspace.vote',
    /**
     * See [`Pallet::vote`].
     */
    v0: new CallType(
        'Subspace.vote',
        sts.struct({
            signedVote: v0.SignedVote,
        })
    ),
}

export const enableRewardsAt =  {
    name: 'Subspace.enable_rewards_at',
    /**
     * See [`Pallet::enable_rewards_at`].
     */
    v0: new CallType(
        'Subspace.enable_rewards_at',
        sts.struct({
            enableRewardsAt: v0.EnableRewardsAt,
        })
    ),
}

export const enableAuthoringByAnyone =  {
    name: 'Subspace.enable_authoring_by_anyone',
    /**
     * See [`Pallet::enable_authoring_by_anyone`].
     */
    v0: new CallType(
        'Subspace.enable_authoring_by_anyone',
        sts.unit()
    ),
}
