import {sts, Block, Bytes, Option, Result, StorageType, RuntimeCtx} from '../support'
import * as v0 from '../v0'

export const genesisSlot =  {
    /**
     *  The slot at which the first block was created. This is 0 until the first block of the chain.
     */
    v0: new StorageType('Subspace.GenesisSlot', 'Default', [], v0.Slot) as GenesisSlotV0,
}

/**
 *  The slot at which the first block was created. This is 0 until the first block of the chain.
 */
export interface GenesisSlotV0  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v0.Slot
    get(block: Block): Promise<(v0.Slot | undefined)>
}

export const currentSlot =  {
    /**
     *  Current slot number.
     */
    v0: new StorageType('Subspace.CurrentSlot', 'Default', [], v0.Slot) as CurrentSlotV0,
}

/**
 *  Current slot number.
 */
export interface CurrentSlotV0  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v0.Slot
    get(block: Block): Promise<(v0.Slot | undefined)>
}

export const potSlotIterations =  {
    /**
     *  Number of iterations for proof of time per slot
     */
    v0: new StorageType('Subspace.PotSlotIterations', 'Optional', [], v0.NonZeroU32) as PotSlotIterationsV0,
}

/**
 *  Number of iterations for proof of time per slot
 */
export interface PotSlotIterationsV0  {
    is(block: RuntimeCtx): boolean
    get(block: Block): Promise<(v0.NonZeroU32 | undefined)>
}

export const solutionRanges =  {
    /**
     *  Solution ranges used for challenges.
     */
    v0: new StorageType('Subspace.SolutionRanges', 'Default', [], v0.SolutionRanges) as SolutionRangesV0,
}

/**
 *  Solution ranges used for challenges.
 */
export interface SolutionRangesV0  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v0.SolutionRanges
    get(block: Block): Promise<(v0.SolutionRanges | undefined)>
}

export const shouldAdjustSolutionRange =  {
    /**
     *  Storage to check if the solution range is to be adjusted for next era
     */
    v0: new StorageType('Subspace.ShouldAdjustSolutionRange', 'Default', [], sts.boolean()) as ShouldAdjustSolutionRangeV0,
}

/**
 *  Storage to check if the solution range is to be adjusted for next era
 */
export interface ShouldAdjustSolutionRangeV0  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): boolean
    get(block: Block): Promise<(boolean | undefined)>
}

export const nextSolutionRangeOverride =  {
    /**
     *  Override solution range during next update
     */
    v0: new StorageType('Subspace.NextSolutionRangeOverride', 'Optional', [], v0.SolutionRangeOverride) as NextSolutionRangeOverrideV0,
}

/**
 *  Override solution range during next update
 */
export interface NextSolutionRangeOverrideV0  {
    is(block: RuntimeCtx): boolean
    get(block: Block): Promise<(v0.SolutionRangeOverride | undefined)>
}

export const eraStartSlot =  {
    /**
     *  Slot at which current era started.
     */
    v0: new StorageType('Subspace.EraStartSlot', 'Optional', [], v0.Slot) as EraStartSlotV0,
}

/**
 *  Slot at which current era started.
 */
export interface EraStartSlotV0  {
    is(block: RuntimeCtx): boolean
    get(block: Block): Promise<(v0.Slot | undefined)>
}

export const blockList =  {
    /**
     *  A set of blocked farmers keyed by their public key.
     */
    v0: new StorageType('Subspace.BlockList', 'Optional', [v0.Public], sts.unit()) as BlockListV0,
}

/**
 *  A set of blocked farmers keyed by their public key.
 */
export interface BlockListV0  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v0.Public): Promise<(null | undefined)>
    getMany(block: Block, keys: v0.Public[]): Promise<(null | undefined)[]>
    getKeys(block: Block): Promise<v0.Public[]>
    getKeys(block: Block, key: v0.Public): Promise<v0.Public[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v0.Public[]>
    getKeysPaged(pageSize: number, block: Block, key: v0.Public): AsyncIterable<v0.Public[]>
    getPairs(block: Block): Promise<[k: v0.Public, v: (null | undefined)][]>
    getPairs(block: Block, key: v0.Public): Promise<[k: v0.Public, v: (null | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v0.Public, v: (null | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v0.Public): AsyncIterable<[k: v0.Public, v: (null | undefined)][]>
}

export const segmentCommitment =  {
    /**
     *  Mapping from segment index to corresponding segment commitment of contained records.
     */
    v0: new StorageType('Subspace.SegmentCommitment', 'Optional', [v0.SegmentIndex], v0.SegmentCommitment) as SegmentCommitmentV0,
}

/**
 *  Mapping from segment index to corresponding segment commitment of contained records.
 */
export interface SegmentCommitmentV0  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v0.SegmentIndex): Promise<(v0.SegmentCommitment | undefined)>
    getMany(block: Block, keys: v0.SegmentIndex[]): Promise<(v0.SegmentCommitment | undefined)[]>
    getKeys(block: Block): Promise<v0.SegmentIndex[]>
    getKeys(block: Block, key: v0.SegmentIndex): Promise<v0.SegmentIndex[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v0.SegmentIndex[]>
    getKeysPaged(pageSize: number, block: Block, key: v0.SegmentIndex): AsyncIterable<v0.SegmentIndex[]>
    getPairs(block: Block): Promise<[k: v0.SegmentIndex, v: (v0.SegmentCommitment | undefined)][]>
    getPairs(block: Block, key: v0.SegmentIndex): Promise<[k: v0.SegmentIndex, v: (v0.SegmentCommitment | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v0.SegmentIndex, v: (v0.SegmentCommitment | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v0.SegmentIndex): AsyncIterable<[k: v0.SegmentIndex, v: (v0.SegmentCommitment | undefined)][]>
}

export const counterForSegmentCommitment =  {
    /**
     * Counter for the related counted storage map
     */
    v0: new StorageType('Subspace.CounterForSegmentCommitment', 'Default', [], sts.number()) as CounterForSegmentCommitmentV0,
}

/**
 * Counter for the related counted storage map
 */
export interface CounterForSegmentCommitmentV0  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): number
    get(block: Block): Promise<(number | undefined)>
}

export const didProcessSegmentHeaders =  {
    /**
     *  Whether the segment headers inherent has been processed in this block (temporary value).
     * 
     *  This value is updated to `true` when processing `store_segment_headers` by a node.
     *  It is then cleared at the end of each block execution in the `on_finalize` hook.
     */
    v0: new StorageType('Subspace.DidProcessSegmentHeaders', 'Default', [], sts.boolean()) as DidProcessSegmentHeadersV0,
}

/**
 *  Whether the segment headers inherent has been processed in this block (temporary value).
 * 
 *  This value is updated to `true` when processing `store_segment_headers` by a node.
 *  It is then cleared at the end of each block execution in the `on_finalize` hook.
 */
export interface DidProcessSegmentHeadersV0  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): boolean
    get(block: Block): Promise<(boolean | undefined)>
}

export const parentVoteVerificationData =  {
    /**
     *  Storage of previous vote verification data, updated on each block during finalization.
     */
    v0: new StorageType('Subspace.ParentVoteVerificationData', 'Optional', [], v0.VoteVerificationData) as ParentVoteVerificationDataV0,
}

/**
 *  Storage of previous vote verification data, updated on each block during finalization.
 */
export interface ParentVoteVerificationDataV0  {
    is(block: RuntimeCtx): boolean
    get(block: Block): Promise<(v0.VoteVerificationData | undefined)>
}

export const parentBlockAuthorInfo =  {
    /**
     *  Parent block author information.
     */
    v0: new StorageType('Subspace.ParentBlockAuthorInfo', 'Optional', [], sts.tuple(() => [v0.Public, sts.number(), v0.PieceOffset, v0.Scalar, v0.Slot])) as ParentBlockAuthorInfoV0,
}

/**
 *  Parent block author information.
 */
export interface ParentBlockAuthorInfoV0  {
    is(block: RuntimeCtx): boolean
    get(block: Block): Promise<([v0.Public, number, v0.PieceOffset, v0.Scalar, v0.Slot] | undefined)>
}

export const enableRewards =  {
    /**
     *  Enable rewards since specified block number.
     */
    v0: new StorageType('Subspace.EnableRewards', 'Optional', [], sts.number()) as EnableRewardsV0,
}

/**
 *  Enable rewards since specified block number.
 */
export interface EnableRewardsV0  {
    is(block: RuntimeCtx): boolean
    get(block: Block): Promise<(number | undefined)>
}

export const enableRewardsBelowSolutionRange =  {
    /**
     *  Enable rewards when solution range is below this threshold.
     */
    v0: new StorageType('Subspace.EnableRewardsBelowSolutionRange', 'Optional', [], sts.bigint()) as EnableRewardsBelowSolutionRangeV0,
}

/**
 *  Enable rewards when solution range is below this threshold.
 */
export interface EnableRewardsBelowSolutionRangeV0  {
    is(block: RuntimeCtx): boolean
    get(block: Block): Promise<(bigint | undefined)>
}

export const currentBlockAuthorInfo =  {
    /**
     *  Temporary value (cleared at block finalization) with block author information.
     */
    v0: new StorageType('Subspace.CurrentBlockAuthorInfo', 'Optional', [], sts.tuple(() => [v0.Public, sts.number(), v0.PieceOffset, v0.Scalar, v0.Slot, v0.AccountId32])) as CurrentBlockAuthorInfoV0,
}

/**
 *  Temporary value (cleared at block finalization) with block author information.
 */
export interface CurrentBlockAuthorInfoV0  {
    is(block: RuntimeCtx): boolean
    get(block: Block): Promise<([v0.Public, number, v0.PieceOffset, v0.Scalar, v0.Slot, v0.AccountId32] | undefined)>
}

export const parentBlockVoters =  {
    /**
     *  Voters in the parent block (set at the end of the block with current values).
     */
    v0: new StorageType('Subspace.ParentBlockVoters', 'Default', [], sts.array(() => sts.tuple(() => [sts.tuple(() => [v0.Public, sts.number(), v0.PieceOffset, v0.Scalar, v0.Slot]), sts.tuple(() => [v0.AccountId32, v0.Signature])]))) as ParentBlockVotersV0,
}

/**
 *  Voters in the parent block (set at the end of the block with current values).
 */
export interface ParentBlockVotersV0  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): [[v0.Public, number, v0.PieceOffset, v0.Scalar, v0.Slot], [v0.AccountId32, v0.Signature]][]
    get(block: Block): Promise<([[v0.Public, number, v0.PieceOffset, v0.Scalar, v0.Slot], [v0.AccountId32, v0.Signature]][] | undefined)>
}

export const currentBlockVoters =  {
    /**
     *  Temporary value (cleared at block finalization) with voters in the current block thus far.
     */
    v0: new StorageType('Subspace.CurrentBlockVoters', 'Optional', [], sts.array(() => sts.tuple(() => [sts.tuple(() => [v0.Public, sts.number(), v0.PieceOffset, v0.Scalar, v0.Slot]), sts.tuple(() => [v0.AccountId32, v0.Signature])]))) as CurrentBlockVotersV0,
}

/**
 *  Temporary value (cleared at block finalization) with voters in the current block thus far.
 */
export interface CurrentBlockVotersV0  {
    is(block: RuntimeCtx): boolean
    get(block: Block): Promise<([[v0.Public, number, v0.PieceOffset, v0.Scalar, v0.Slot], [v0.AccountId32, v0.Signature]][] | undefined)>
}

export const potEntropy =  {
    /**
     *  Entropy that needs to be injected into proof of time chain at specific slot associated with
     *  block number it came from.
     */
    v0: new StorageType('Subspace.PotEntropy', 'Default', [], sts.array(() => sts.tuple(() => [sts.number(), v0.PotEntropyValue]))) as PotEntropyV0,
}

/**
 *  Entropy that needs to be injected into proof of time chain at specific slot associated with
 *  block number it came from.
 */
export interface PotEntropyV0  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): [number, v0.PotEntropyValue][]
    get(block: Block): Promise<([number, v0.PotEntropyValue][] | undefined)>
}

export const blockRandomness =  {
    /**
     *  The current block randomness, updated at block initialization. When the proof of time feature
     *  is enabled it derived from PoT otherwise PoR.
     */
    v0: new StorageType('Subspace.BlockRandomness', 'Optional', [], v0.Randomness) as BlockRandomnessV0,
}

/**
 *  The current block randomness, updated at block initialization. When the proof of time feature
 *  is enabled it derived from PoT otherwise PoR.
 */
export interface BlockRandomnessV0  {
    is(block: RuntimeCtx): boolean
    get(block: Block): Promise<(v0.Randomness | undefined)>
}

export const allowAuthoringByAnyone =  {
    /**
     *  Allow block authoring by anyone or just root.
     */
    v0: new StorageType('Subspace.AllowAuthoringByAnyone', 'Default', [], sts.boolean()) as AllowAuthoringByAnyoneV0,
}

/**
 *  Allow block authoring by anyone or just root.
 */
export interface AllowAuthoringByAnyoneV0  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): boolean
    get(block: Block): Promise<(boolean | undefined)>
}

export const rootPlotPublicKey =  {
    /**
     *  Root plot public key.
     * 
     *  Set just once to make sure no one else can author blocks until allowed for anyone.
     */
    v0: new StorageType('Subspace.RootPlotPublicKey', 'Optional', [], v0.Public) as RootPlotPublicKeyV0,
}

/**
 *  Root plot public key.
 * 
 *  Set just once to make sure no one else can author blocks until allowed for anyone.
 */
export interface RootPlotPublicKeyV0  {
    is(block: RuntimeCtx): boolean
    get(block: Block): Promise<(v0.Public | undefined)>
}
