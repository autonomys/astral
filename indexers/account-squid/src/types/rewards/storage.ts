import {sts, Block, Bytes, Option, Result, StorageType, RuntimeCtx} from '../support'
import * as v3 from '../v3'

export const avgBlockspaceUsage =  {
    /**
     *  Utilization of blockspace (in bytes) by the normal extrinsics used to adjust issuance
     */
    v3: new StorageType('Rewards.AvgBlockspaceUsage', 'Default', [], sts.number()) as AvgBlockspaceUsageV3,
}

/**
 *  Utilization of blockspace (in bytes) by the normal extrinsics used to adjust issuance
 */
export interface AvgBlockspaceUsageV3  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): number
    get(block: Block): Promise<(number | undefined)>
}

export const rewardsEnabled =  {
    /**
     *  Whether rewards are enabled
     */
    v3: new StorageType('Rewards.RewardsEnabled', 'Default', [], sts.boolean()) as RewardsEnabledV3,
}

/**
 *  Whether rewards are enabled
 */
export interface RewardsEnabledV3  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): boolean
    get(block: Block): Promise<(boolean | undefined)>
}

export const remainingIssuance =  {
    /**
     *  Tokens left to issue to farmers at any given time
     */
    v3: new StorageType('Rewards.RemainingIssuance', 'Default', [], sts.bigint()) as RemainingIssuanceV3,
}

/**
 *  Tokens left to issue to farmers at any given time
 */
export interface RemainingIssuanceV3  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): bigint
    get(block: Block): Promise<(bigint | undefined)>
}

export const proposerSubsidyPoints =  {
    /**
     *  Block proposer subsidy parameters
     */
    v3: new StorageType('Rewards.ProposerSubsidyPoints', 'Default', [], sts.array(() => v3.RewardPoint)) as ProposerSubsidyPointsV3,
}

/**
 *  Block proposer subsidy parameters
 */
export interface ProposerSubsidyPointsV3  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v3.RewardPoint[]
    get(block: Block): Promise<(v3.RewardPoint[] | undefined)>
}

export const voterSubsidyPoints =  {
    /**
     *  Voter subsidy parameters
     */
    v3: new StorageType('Rewards.VoterSubsidyPoints', 'Default', [], sts.array(() => v3.RewardPoint)) as VoterSubsidyPointsV3,
}

/**
 *  Voter subsidy parameters
 */
export interface VoterSubsidyPointsV3  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v3.RewardPoint[]
    get(block: Block): Promise<(v3.RewardPoint[] | undefined)>
}
