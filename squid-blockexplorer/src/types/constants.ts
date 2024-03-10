import assert from 'assert'
import {Block, Chain, ChainContext, BlockContext, Result, Option} from './support'
import * as v0 from './v0'

export class BalancesExistentialDepositConstant {
    private readonly _chain: Chain

    constructor(ctx: ChainContext) {
        this._chain = ctx._chain
    }

    /**
     *  The minimum amount required to keep an account open. MUST BE GREATER THAN ZERO!
     * 
     *  If you *really* need it to be zero, you can enable the feature `insecure_zero_ed` for
     *  this pallet. However, you do so at your own risk: this will open up a major DoS vector.
     *  In case you have multiple sources of provider references, you may also get unexpected
     *  behaviour if you set this to zero.
     * 
     *  Bottom line: Do yourself a favour and make it at least one!
     */
    get isV0() {
        return this._chain.getConstantTypeHash('Balances', 'ExistentialDeposit') === 'a73c503ad07b8dce07ffc3646a2c7aeacb1280015e3b79887f6a9b11dae120f1'
    }

    /**
     *  The minimum amount required to keep an account open. MUST BE GREATER THAN ZERO!
     * 
     *  If you *really* need it to be zero, you can enable the feature `insecure_zero_ed` for
     *  this pallet. However, you do so at your own risk: this will open up a major DoS vector.
     *  In case you have multiple sources of provider references, you may also get unexpected
     *  behaviour if you set this to zero.
     * 
     *  Bottom line: Do yourself a favour and make it at least one!
     */
    get asV0(): bigint {
        assert(this.isV0)
        return this._chain.getConstant('Balances', 'ExistentialDeposit')
    }

    /**
     * Checks whether the constant is defined for the current chain version.
     */
    get isExists(): boolean {
        return this._chain.getConstantTypeHash('Balances', 'ExistentialDeposit') != null
    }
}

export class BalancesMaxFreezesConstant {
    private readonly _chain: Chain

    constructor(ctx: ChainContext) {
        this._chain = ctx._chain
    }

    /**
     *  The maximum number of individual freeze locks that can exist on an account at any time.
     */
    get isV0() {
        return this._chain.getConstantTypeHash('Balances', 'MaxFreezes') === 'b76f37d33f64f2d9b3234e29034ab4a73ee9da01a61ab139c27f8c841971e469'
    }

    /**
     *  The maximum number of individual freeze locks that can exist on an account at any time.
     */
    get asV0(): number {
        assert(this.isV0)
        return this._chain.getConstant('Balances', 'MaxFreezes')
    }

    /**
     * Checks whether the constant is defined for the current chain version.
     */
    get isExists(): boolean {
        return this._chain.getConstantTypeHash('Balances', 'MaxFreezes') != null
    }
}

export class BalancesMaxHoldsConstant {
    private readonly _chain: Chain

    constructor(ctx: ChainContext) {
        this._chain = ctx._chain
    }

    /**
     *  The maximum number of holds that can exist on an account at any time.
     */
    get isV0() {
        return this._chain.getConstantTypeHash('Balances', 'MaxHolds') === 'b76f37d33f64f2d9b3234e29034ab4a73ee9da01a61ab139c27f8c841971e469'
    }

    /**
     *  The maximum number of holds that can exist on an account at any time.
     */
    get asV0(): number {
        assert(this.isV0)
        return this._chain.getConstant('Balances', 'MaxHolds')
    }

    /**
     * Checks whether the constant is defined for the current chain version.
     */
    get isExists(): boolean {
        return this._chain.getConstantTypeHash('Balances', 'MaxHolds') != null
    }
}

export class BalancesMaxLocksConstant {
    private readonly _chain: Chain

    constructor(ctx: ChainContext) {
        this._chain = ctx._chain
    }

    /**
     *  The maximum number of locks that should exist on an account.
     *  Not strictly enforced, but used for weight estimation.
     */
    get isV0() {
        return this._chain.getConstantTypeHash('Balances', 'MaxLocks') === 'b76f37d33f64f2d9b3234e29034ab4a73ee9da01a61ab139c27f8c841971e469'
    }

    /**
     *  The maximum number of locks that should exist on an account.
     *  Not strictly enforced, but used for weight estimation.
     */
    get asV0(): number {
        assert(this.isV0)
        return this._chain.getConstant('Balances', 'MaxLocks')
    }

    /**
     * Checks whether the constant is defined for the current chain version.
     */
    get isExists(): boolean {
        return this._chain.getConstantTypeHash('Balances', 'MaxLocks') != null
    }
}

export class BalancesMaxReservesConstant {
    private readonly _chain: Chain

    constructor(ctx: ChainContext) {
        this._chain = ctx._chain
    }

    /**
     *  The maximum number of named reserves that can exist on an account.
     */
    get isV0() {
        return this._chain.getConstantTypeHash('Balances', 'MaxReserves') === 'b76f37d33f64f2d9b3234e29034ab4a73ee9da01a61ab139c27f8c841971e469'
    }

    /**
     *  The maximum number of named reserves that can exist on an account.
     */
    get asV0(): number {
        assert(this.isV0)
        return this._chain.getConstant('Balances', 'MaxReserves')
    }

    /**
     * Checks whether the constant is defined for the current chain version.
     */
    get isExists(): boolean {
        return this._chain.getConstantTypeHash('Balances', 'MaxReserves') != null
    }
}

export class DomainsBlockTreePruningDepthConstant {
    private readonly _chain: Chain

    constructor(ctx: ChainContext) {
        this._chain = ctx._chain
    }

    /**
     *  The block tree pruning depth.
     */
    get isV0() {
        return this._chain.getConstantTypeHash('Domains', 'BlockTreePruningDepth') === 'b76f37d33f64f2d9b3234e29034ab4a73ee9da01a61ab139c27f8c841971e469'
    }

    /**
     *  The block tree pruning depth.
     */
    get asV0(): number {
        assert(this.isV0)
        return this._chain.getConstant('Domains', 'BlockTreePruningDepth')
    }

    /**
     * Checks whether the constant is defined for the current chain version.
     */
    get isExists(): boolean {
        return this._chain.getConstantTypeHash('Domains', 'BlockTreePruningDepth') != null
    }
}

export class DomainsConfirmationDepthKConstant {
    private readonly _chain: Chain

    constructor(ctx: ChainContext) {
        this._chain = ctx._chain
    }

    /**
     *  Same with `pallet_subspace::Config::ConfirmationDepthK`.
     */
    get isV0() {
        return this._chain.getConstantTypeHash('Domains', 'ConfirmationDepthK') === 'b76f37d33f64f2d9b3234e29034ab4a73ee9da01a61ab139c27f8c841971e469'
    }

    /**
     *  Same with `pallet_subspace::Config::ConfirmationDepthK`.
     */
    get asV0(): number {
        assert(this.isV0)
        return this._chain.getConstant('Domains', 'ConfirmationDepthK')
    }

    /**
     * Checks whether the constant is defined for the current chain version.
     */
    get isExists(): boolean {
        return this._chain.getConstantTypeHash('Domains', 'ConfirmationDepthK') != null
    }
}

export class DomainsDomainInstantiationDepositConstant {
    private readonly _chain: Chain

    constructor(ctx: ChainContext) {
        this._chain = ctx._chain
    }

    /**
     *  The amount of fund to be locked up for the domain instance creator.
     */
    get isV0() {
        return this._chain.getConstantTypeHash('Domains', 'DomainInstantiationDeposit') === 'a73c503ad07b8dce07ffc3646a2c7aeacb1280015e3b79887f6a9b11dae120f1'
    }

    /**
     *  The amount of fund to be locked up for the domain instance creator.
     */
    get asV0(): bigint {
        assert(this.isV0)
        return this._chain.getConstant('Domains', 'DomainInstantiationDeposit')
    }

    /**
     * Checks whether the constant is defined for the current chain version.
     */
    get isExists(): boolean {
        return this._chain.getConstantTypeHash('Domains', 'DomainInstantiationDeposit') != null
    }
}

export class DomainsDomainRuntimeUpgradeDelayConstant {
    private readonly _chain: Chain

    constructor(ctx: ChainContext) {
        this._chain = ctx._chain
    }

    /**
     *  Delay before a domain runtime is upgraded.
     */
    get isV0() {
        return this._chain.getConstantTypeHash('Domains', 'DomainRuntimeUpgradeDelay') === 'b76f37d33f64f2d9b3234e29034ab4a73ee9da01a61ab139c27f8c841971e469'
    }

    /**
     *  Delay before a domain runtime is upgraded.
     */
    get asV0(): number {
        assert(this.isV0)
        return this._chain.getConstant('Domains', 'DomainRuntimeUpgradeDelay')
    }

    /**
     * Checks whether the constant is defined for the current chain version.
     */
    get isExists(): boolean {
        return this._chain.getConstantTypeHash('Domains', 'DomainRuntimeUpgradeDelay') != null
    }
}

export class DomainsDomainTxRangeAdjustmentIntervalConstant {
    private readonly _chain: Chain

    constructor(ctx: ChainContext) {
        this._chain = ctx._chain
    }

    /**
     *  Domain tx range is adjusted after every DomainTxRangeAdjustmentInterval blocks.
     */
    get isV0() {
        return this._chain.getConstantTypeHash('Domains', 'DomainTxRangeAdjustmentInterval') === '2e8052d0ae8d237ad263438f986208df52f4f0e9f529557036c3b179dfb42f21'
    }

    /**
     *  Domain tx range is adjusted after every DomainTxRangeAdjustmentInterval blocks.
     */
    get asV0(): bigint {
        assert(this.isV0)
        return this._chain.getConstant('Domains', 'DomainTxRangeAdjustmentInterval')
    }

    /**
     * Checks whether the constant is defined for the current chain version.
     */
    get isExists(): boolean {
        return this._chain.getConstantTypeHash('Domains', 'DomainTxRangeAdjustmentInterval') != null
    }
}

export class DomainsInitialDomainTxRangeConstant {
    private readonly _chain: Chain

    constructor(ctx: ChainContext) {
        this._chain = ctx._chain
    }

    /**
     *  Initial domain tx range value.
     */
    get isV0() {
        return this._chain.getConstantTypeHash('Domains', 'InitialDomainTxRange') === '2e8052d0ae8d237ad263438f986208df52f4f0e9f529557036c3b179dfb42f21'
    }

    /**
     *  Initial domain tx range value.
     */
    get asV0(): bigint {
        assert(this.isV0)
        return this._chain.getConstant('Domains', 'InitialDomainTxRange')
    }

    /**
     * Checks whether the constant is defined for the current chain version.
     */
    get isExists(): boolean {
        return this._chain.getConstantTypeHash('Domains', 'InitialDomainTxRange') != null
    }
}

export class DomainsMaxBundlesPerBlockConstant {
    private readonly _chain: Chain

    constructor(ctx: ChainContext) {
        this._chain = ctx._chain
    }

    /**
     *  The maximum bundle per block limit for all domain.
     */
    get isV0() {
        return this._chain.getConstantTypeHash('Domains', 'MaxBundlesPerBlock') === 'b76f37d33f64f2d9b3234e29034ab4a73ee9da01a61ab139c27f8c841971e469'
    }

    /**
     *  The maximum bundle per block limit for all domain.
     */
    get asV0(): number {
        assert(this.isV0)
        return this._chain.getConstant('Domains', 'MaxBundlesPerBlock')
    }

    /**
     * Checks whether the constant is defined for the current chain version.
     */
    get isExists(): boolean {
        return this._chain.getConstantTypeHash('Domains', 'MaxBundlesPerBlock') != null
    }
}

export class DomainsMaxDomainBlockSizeConstant {
    private readonly _chain: Chain

    constructor(ctx: ChainContext) {
        this._chain = ctx._chain
    }

    /**
     *  The maximum block size limit for all domain.
     */
    get isV0() {
        return this._chain.getConstantTypeHash('Domains', 'MaxDomainBlockSize') === 'b76f37d33f64f2d9b3234e29034ab4a73ee9da01a61ab139c27f8c841971e469'
    }

    /**
     *  The maximum block size limit for all domain.
     */
    get asV0(): number {
        assert(this.isV0)
        return this._chain.getConstant('Domains', 'MaxDomainBlockSize')
    }

    /**
     * Checks whether the constant is defined for the current chain version.
     */
    get isExists(): boolean {
        return this._chain.getConstantTypeHash('Domains', 'MaxDomainBlockSize') != null
    }
}

export class DomainsMaxDomainBlockWeightConstant {
    private readonly _chain: Chain

    constructor(ctx: ChainContext) {
        this._chain = ctx._chain
    }

    /**
     *  The maximum block weight limit for all domain.
     */
    get isV0() {
        return this._chain.getConstantTypeHash('Domains', 'MaxDomainBlockWeight') === 'c92b1d8d51239cdf34de2cc7cfa9141c62b02aaf420c1b8dfaf8d16d158d95b5'
    }

    /**
     *  The maximum block weight limit for all domain.
     */
    get asV0(): v0.Weight {
        assert(this.isV0)
        return this._chain.getConstant('Domains', 'MaxDomainBlockWeight')
    }

    /**
     * Checks whether the constant is defined for the current chain version.
     */
    get isExists(): boolean {
        return this._chain.getConstantTypeHash('Domains', 'MaxDomainBlockWeight') != null
    }
}

export class DomainsMaxDomainNameLengthConstant {
    private readonly _chain: Chain

    constructor(ctx: ChainContext) {
        this._chain = ctx._chain
    }

    /**
     *  The maximum domain name length limit for all domain.
     */
    get isV0() {
        return this._chain.getConstantTypeHash('Domains', 'MaxDomainNameLength') === 'b76f37d33f64f2d9b3234e29034ab4a73ee9da01a61ab139c27f8c841971e469'
    }

    /**
     *  The maximum domain name length limit for all domain.
     */
    get asV0(): number {
        assert(this.isV0)
        return this._chain.getConstant('Domains', 'MaxDomainNameLength')
    }

    /**
     * Checks whether the constant is defined for the current chain version.
     */
    get isExists(): boolean {
        return this._chain.getConstantTypeHash('Domains', 'MaxDomainNameLength') != null
    }
}

export class DomainsMaxNominatorsConstant {
    private readonly _chain: Chain

    constructor(ctx: ChainContext) {
        this._chain = ctx._chain
    }

    /**
     *  The maximum number of nominators for given operator.
     */
    get isV0() {
        return this._chain.getConstantTypeHash('Domains', 'MaxNominators') === 'b76f37d33f64f2d9b3234e29034ab4a73ee9da01a61ab139c27f8c841971e469'
    }

    /**
     *  The maximum number of nominators for given operator.
     */
    get asV0(): number {
        assert(this.isV0)
        return this._chain.getConstant('Domains', 'MaxNominators')
    }

    /**
     * Checks whether the constant is defined for the current chain version.
     */
    get isExists(): boolean {
        return this._chain.getConstantTypeHash('Domains', 'MaxNominators') != null
    }
}

export class DomainsMaxPendingStakingOperationConstant {
    private readonly _chain: Chain

    constructor(ctx: ChainContext) {
        this._chain = ctx._chain
    }

    /**
     *  The maximum number of pending staking operation that can perform upon epoch transition.
     */
    get isV0() {
        return this._chain.getConstantTypeHash('Domains', 'MaxPendingStakingOperation') === 'b76f37d33f64f2d9b3234e29034ab4a73ee9da01a61ab139c27f8c841971e469'
    }

    /**
     *  The maximum number of pending staking operation that can perform upon epoch transition.
     */
    get asV0(): number {
        assert(this.isV0)
        return this._chain.getConstant('Domains', 'MaxPendingStakingOperation')
    }

    /**
     * Checks whether the constant is defined for the current chain version.
     */
    get isExists(): boolean {
        return this._chain.getConstantTypeHash('Domains', 'MaxPendingStakingOperation') != null
    }
}

export class DomainsMinNominatorStakeConstant {
    private readonly _chain: Chain

    constructor(ctx: ChainContext) {
        this._chain = ctx._chain
    }

    /**
     *  Minimum nominator stake required to nominate and operator.
     */
    get isV0() {
        return this._chain.getConstantTypeHash('Domains', 'MinNominatorStake') === 'a73c503ad07b8dce07ffc3646a2c7aeacb1280015e3b79887f6a9b11dae120f1'
    }

    /**
     *  Minimum nominator stake required to nominate and operator.
     */
    get asV0(): bigint {
        assert(this.isV0)
        return this._chain.getConstant('Domains', 'MinNominatorStake')
    }

    /**
     * Checks whether the constant is defined for the current chain version.
     */
    get isExists(): boolean {
        return this._chain.getConstantTypeHash('Domains', 'MinNominatorStake') != null
    }
}

export class DomainsMinOperatorStakeConstant {
    private readonly _chain: Chain

    constructor(ctx: ChainContext) {
        this._chain = ctx._chain
    }

    /**
     *  Minimum operator stake required to become operator of a domain.
     */
    get isV0() {
        return this._chain.getConstantTypeHash('Domains', 'MinOperatorStake') === 'a73c503ad07b8dce07ffc3646a2c7aeacb1280015e3b79887f6a9b11dae120f1'
    }

    /**
     *  Minimum operator stake required to become operator of a domain.
     */
    get asV0(): bigint {
        assert(this.isV0)
        return this._chain.getConstant('Domains', 'MinOperatorStake')
    }

    /**
     * Checks whether the constant is defined for the current chain version.
     */
    get isExists(): boolean {
        return this._chain.getConstantTypeHash('Domains', 'MinOperatorStake') != null
    }
}

export class DomainsPalletIdConstant {
    private readonly _chain: Chain

    constructor(ctx: ChainContext) {
        this._chain = ctx._chain
    }

    /**
     *  The pallet-domains's pallet id.
     */
    get isV1() {
        return this._chain.getConstantTypeHash('Domains', 'PalletId') === 'c963e59c8e5b7d761234cd0f2cb1f219effb76c998fa93783afd994aed82a434'
    }

    /**
     *  The pallet-domains's pallet id.
     */
    get asV1(): Uint8Array {
        assert(this.isV1)
        return this._chain.getConstant('Domains', 'PalletId')
    }

    /**
     * Checks whether the constant is defined for the current chain version.
     */
    get isExists(): boolean {
        return this._chain.getConstantTypeHash('Domains', 'PalletId') != null
    }
}

export class DomainsStakeEpochDurationConstant {
    private readonly _chain: Chain

    constructor(ctx: ChainContext) {
        this._chain = ctx._chain
    }

    /**
     *  Domain epoch transition interval
     */
    get isV0() {
        return this._chain.getConstantTypeHash('Domains', 'StakeEpochDuration') === 'b76f37d33f64f2d9b3234e29034ab4a73ee9da01a61ab139c27f8c841971e469'
    }

    /**
     *  Domain epoch transition interval
     */
    get asV0(): number {
        assert(this.isV0)
        return this._chain.getConstant('Domains', 'StakeEpochDuration')
    }

    /**
     * Checks whether the constant is defined for the current chain version.
     */
    get isExists(): boolean {
        return this._chain.getConstantTypeHash('Domains', 'StakeEpochDuration') != null
    }
}

export class DomainsStakeWithdrawalLockingPeriodConstant {
    private readonly _chain: Chain

    constructor(ctx: ChainContext) {
        this._chain = ctx._chain
    }

    /**
     *  Minimum number of blocks after which any finalized withdrawals are released to nominators.
     */
    get isV0() {
        return this._chain.getConstantTypeHash('Domains', 'StakeWithdrawalLockingPeriod') === 'b76f37d33f64f2d9b3234e29034ab4a73ee9da01a61ab139c27f8c841971e469'
    }

    /**
     *  Minimum number of blocks after which any finalized withdrawals are released to nominators.
     */
    get asV0(): number {
        assert(this.isV0)
        return this._chain.getConstant('Domains', 'StakeWithdrawalLockingPeriod')
    }

    /**
     * Checks whether the constant is defined for the current chain version.
     */
    get isExists(): boolean {
        return this._chain.getConstantTypeHash('Domains', 'StakeWithdrawalLockingPeriod') != null
    }
}

export class DomainsSudoIdConstant {
    private readonly _chain: Chain

    constructor(ctx: ChainContext) {
        this._chain = ctx._chain
    }

    /**
     *  The sudo account id
     */
    get isV0() {
        return this._chain.getConstantTypeHash('Domains', 'SudoId') === 'cc28a7f7046ec4d0eb3419e4aa142bf25c25992e58d0e8646eb029c7c6b4c0c8'
    }

    /**
     *  The sudo account id
     */
    get asV0(): Uint8Array {
        assert(this.isV0)
        return this._chain.getConstant('Domains', 'SudoId')
    }

    /**
     * Checks whether the constant is defined for the current chain version.
     */
    get isExists(): boolean {
        return this._chain.getConstantTypeHash('Domains', 'SudoId') != null
    }
}

export class DomainsTreasuryAccountConstant {
    private readonly _chain: Chain

    constructor(ctx: ChainContext) {
        this._chain = ctx._chain
    }

    /**
     *  Treasury account.
     */
    get isV0() {
        return this._chain.getConstantTypeHash('Domains', 'TreasuryAccount') === 'cc28a7f7046ec4d0eb3419e4aa142bf25c25992e58d0e8646eb029c7c6b4c0c8'
    }

    /**
     *  Treasury account.
     */
    get asV0(): Uint8Array {
        assert(this.isV0)
        return this._chain.getConstant('Domains', 'TreasuryAccount')
    }

    /**
     * Checks whether the constant is defined for the current chain version.
     */
    get isExists(): boolean {
        return this._chain.getConstantTypeHash('Domains', 'TreasuryAccount') != null
    }
}

export class RewardsBlockRewardConstant {
    private readonly _chain: Chain

    constructor(ctx: ChainContext) {
        this._chain = ctx._chain
    }

    /**
     *  Fixed reward for block producer.
     */
    get isV0() {
        return this._chain.getConstantTypeHash('Rewards', 'BlockReward') === 'a73c503ad07b8dce07ffc3646a2c7aeacb1280015e3b79887f6a9b11dae120f1'
    }

    /**
     *  Fixed reward for block producer.
     */
    get asV0(): bigint {
        assert(this.isV0)
        return this._chain.getConstant('Rewards', 'BlockReward')
    }

    /**
     * Checks whether the constant is defined for the current chain version.
     */
    get isExists(): boolean {
        return this._chain.getConstantTypeHash('Rewards', 'BlockReward') != null
    }
}

export class RewardsVoteRewardConstant {
    private readonly _chain: Chain

    constructor(ctx: ChainContext) {
        this._chain = ctx._chain
    }

    /**
     *  Fixed reward for voter.
     */
    get isV0() {
        return this._chain.getConstantTypeHash('Rewards', 'VoteReward') === 'a73c503ad07b8dce07ffc3646a2c7aeacb1280015e3b79887f6a9b11dae120f1'
    }

    /**
     *  Fixed reward for voter.
     */
    get asV0(): bigint {
        assert(this.isV0)
        return this._chain.getConstant('Rewards', 'VoteReward')
    }

    /**
     * Checks whether the constant is defined for the current chain version.
     */
    get isExists(): boolean {
        return this._chain.getConstantTypeHash('Rewards', 'VoteReward') != null
    }
}

export class SubspaceBlockAuthoringDelayConstant {
    private readonly _chain: Chain

    constructor(ctx: ChainContext) {
        this._chain = ctx._chain
    }

    /**
     *  Number of slots between slot arrival and when corresponding block can be produced.
     * 
     *  Practically this means future proof of time proof needs to be revealed this many slots
     *  ahead before block can be authored even though solution is available before that.
     */
    get isV0() {
        return this._chain.getConstantTypeHash('Subspace', 'BlockAuthoringDelay') === '2e8052d0ae8d237ad263438f986208df52f4f0e9f529557036c3b179dfb42f21'
    }

    /**
     *  Number of slots between slot arrival and when corresponding block can be produced.
     * 
     *  Practically this means future proof of time proof needs to be revealed this many slots
     *  ahead before block can be authored even though solution is available before that.
     */
    get asV0(): bigint {
        assert(this.isV0)
        return this._chain.getConstant('Subspace', 'BlockAuthoringDelay')
    }

    /**
     * Checks whether the constant is defined for the current chain version.
     */
    get isExists(): boolean {
        return this._chain.getConstantTypeHash('Subspace', 'BlockAuthoringDelay') != null
    }
}

export class SubspaceConfirmationDepthKConstant {
    private readonly _chain: Chain

    constructor(ctx: ChainContext) {
        this._chain = ctx._chain
    }

    /**
     *  Depth `K` after which a block enters the recorded history (a global constant, as opposed
     *  to the client-dependent transaction confirmation depth `k`).
     */
    get isV0() {
        return this._chain.getConstantTypeHash('Subspace', 'ConfirmationDepthK') === 'b76f37d33f64f2d9b3234e29034ab4a73ee9da01a61ab139c27f8c841971e469'
    }

    /**
     *  Depth `K` after which a block enters the recorded history (a global constant, as opposed
     *  to the client-dependent transaction confirmation depth `k`).
     */
    get asV0(): number {
        assert(this.isV0)
        return this._chain.getConstant('Subspace', 'ConfirmationDepthK')
    }

    /**
     * Checks whether the constant is defined for the current chain version.
     */
    get isExists(): boolean {
        return this._chain.getConstantTypeHash('Subspace', 'ConfirmationDepthK') != null
    }
}

export class SubspaceEraDurationConstant {
    private readonly _chain: Chain

    constructor(ctx: ChainContext) {
        this._chain = ctx._chain
    }

    /**
     *  The amount of time, in blocks, that each era should last.
     *  NOTE: Currently it is not possible to change the era duration after
     *  the chain has started. Attempting to do so will brick block production.
     */
    get isV0() {
        return this._chain.getConstantTypeHash('Subspace', 'EraDuration') === 'b76f37d33f64f2d9b3234e29034ab4a73ee9da01a61ab139c27f8c841971e469'
    }

    /**
     *  The amount of time, in blocks, that each era should last.
     *  NOTE: Currently it is not possible to change the era duration after
     *  the chain has started. Attempting to do so will brick block production.
     */
    get asV0(): number {
        assert(this.isV0)
        return this._chain.getConstant('Subspace', 'EraDuration')
    }

    /**
     * Checks whether the constant is defined for the current chain version.
     */
    get isExists(): boolean {
        return this._chain.getConstantTypeHash('Subspace', 'EraDuration') != null
    }
}

export class SubspaceExpectedVotesPerBlockConstant {
    private readonly _chain: Chain

    constructor(ctx: ChainContext) {
        this._chain = ctx._chain
    }

    /**
     *  Number of votes expected per block.
     * 
     *  This impacts solution range for votes in consensus.
     */
    get isV0() {
        return this._chain.getConstantTypeHash('Subspace', 'ExpectedVotesPerBlock') === 'b76f37d33f64f2d9b3234e29034ab4a73ee9da01a61ab139c27f8c841971e469'
    }

    /**
     *  Number of votes expected per block.
     * 
     *  This impacts solution range for votes in consensus.
     */
    get asV0(): number {
        assert(this.isV0)
        return this._chain.getConstant('Subspace', 'ExpectedVotesPerBlock')
    }

    /**
     * Checks whether the constant is defined for the current chain version.
     */
    get isExists(): boolean {
        return this._chain.getConstantTypeHash('Subspace', 'ExpectedVotesPerBlock') != null
    }
}

export class SubspaceInitialSolutionRangeConstant {
    private readonly _chain: Chain

    constructor(ctx: ChainContext) {
        this._chain = ctx._chain
    }

    /**
     *  Initial solution range used for challenges during the very first era.
     */
    get isV0() {
        return this._chain.getConstantTypeHash('Subspace', 'InitialSolutionRange') === '2e8052d0ae8d237ad263438f986208df52f4f0e9f529557036c3b179dfb42f21'
    }

    /**
     *  Initial solution range used for challenges during the very first era.
     */
    get asV0(): bigint {
        assert(this.isV0)
        return this._chain.getConstant('Subspace', 'InitialSolutionRange')
    }

    /**
     * Checks whether the constant is defined for the current chain version.
     */
    get isExists(): boolean {
        return this._chain.getConstantTypeHash('Subspace', 'InitialSolutionRange') != null
    }
}

export class SubspaceMaxPiecesInSectorConstant {
    private readonly _chain: Chain

    constructor(ctx: ChainContext) {
        this._chain = ctx._chain
    }

    /**
     *  How many pieces one sector is supposed to contain (max)
     */
    get isV0() {
        return this._chain.getConstantTypeHash('Subspace', 'MaxPiecesInSector') === '32def12560ecd411fe2fc796552e97d0d5ee0ea10e059b3d8918c9e94dfdb334'
    }

    /**
     *  How many pieces one sector is supposed to contain (max)
     */
    get asV0(): number {
        assert(this.isV0)
        return this._chain.getConstant('Subspace', 'MaxPiecesInSector')
    }

    /**
     * Checks whether the constant is defined for the current chain version.
     */
    get isExists(): boolean {
        return this._chain.getConstantTypeHash('Subspace', 'MaxPiecesInSector') != null
    }
}

export class SubspaceMinSectorLifetimeConstant {
    private readonly _chain: Chain

    constructor(ctx: ChainContext) {
        this._chain = ctx._chain
    }

    /**
     *  Minimum lifetime of a plotted sector, measured in archived segment.
     */
    get isV0() {
        return this._chain.getConstantTypeHash('Subspace', 'MinSectorLifetime') === '2e8052d0ae8d237ad263438f986208df52f4f0e9f529557036c3b179dfb42f21'
    }

    /**
     *  Minimum lifetime of a plotted sector, measured in archived segment.
     */
    get asV0(): bigint {
        assert(this.isV0)
        return this._chain.getConstant('Subspace', 'MinSectorLifetime')
    }

    /**
     * Checks whether the constant is defined for the current chain version.
     */
    get isExists(): boolean {
        return this._chain.getConstantTypeHash('Subspace', 'MinSectorLifetime') != null
    }
}

export class SubspacePotEntropyInjectionDelayConstant {
    private readonly _chain: Chain

    constructor(ctx: ChainContext) {
        this._chain = ctx._chain
    }

    /**
     *  Delay after block, in slots, when entropy injection takes effect.
     */
    get isV0() {
        return this._chain.getConstantTypeHash('Subspace', 'PotEntropyInjectionDelay') === '2e8052d0ae8d237ad263438f986208df52f4f0e9f529557036c3b179dfb42f21'
    }

    /**
     *  Delay after block, in slots, when entropy injection takes effect.
     */
    get asV0(): bigint {
        assert(this.isV0)
        return this._chain.getConstant('Subspace', 'PotEntropyInjectionDelay')
    }

    /**
     * Checks whether the constant is defined for the current chain version.
     */
    get isExists(): boolean {
        return this._chain.getConstantTypeHash('Subspace', 'PotEntropyInjectionDelay') != null
    }
}

export class SubspacePotEntropyInjectionIntervalConstant {
    private readonly _chain: Chain

    constructor(ctx: ChainContext) {
        this._chain = ctx._chain
    }

    /**
     *  Interval, in blocks, between blockchain entropy injection into proof of time chain.
     */
    get isV0() {
        return this._chain.getConstantTypeHash('Subspace', 'PotEntropyInjectionInterval') === 'b76f37d33f64f2d9b3234e29034ab4a73ee9da01a61ab139c27f8c841971e469'
    }

    /**
     *  Interval, in blocks, between blockchain entropy injection into proof of time chain.
     */
    get asV0(): number {
        assert(this.isV0)
        return this._chain.getConstant('Subspace', 'PotEntropyInjectionInterval')
    }

    /**
     * Checks whether the constant is defined for the current chain version.
     */
    get isExists(): boolean {
        return this._chain.getConstantTypeHash('Subspace', 'PotEntropyInjectionInterval') != null
    }
}

export class SubspacePotEntropyInjectionLookbackDepthConstant {
    private readonly _chain: Chain

    constructor(ctx: ChainContext) {
        this._chain = ctx._chain
    }

    /**
     *  Interval, in entropy injection intervals, where to take entropy for injection from.
     */
    get isV0() {
        return this._chain.getConstantTypeHash('Subspace', 'PotEntropyInjectionLookbackDepth') === 'afecacff3b029831d50a478055aa405254e6579585f9617d2a2f34743b4aff83'
    }

    /**
     *  Interval, in entropy injection intervals, where to take entropy for injection from.
     */
    get asV0(): number {
        assert(this.isV0)
        return this._chain.getConstant('Subspace', 'PotEntropyInjectionLookbackDepth')
    }

    /**
     * Checks whether the constant is defined for the current chain version.
     */
    get isExists(): boolean {
        return this._chain.getConstantTypeHash('Subspace', 'PotEntropyInjectionLookbackDepth') != null
    }
}

export class SubspaceRecentHistoryFractionConstant {
    private readonly _chain: Chain

    constructor(ctx: ChainContext) {
        this._chain = ctx._chain
    }

    /**
     *  Fraction of pieces from the "recent history" (`recent_segments`) in each sector.
     */
    get isV0() {
        return this._chain.getConstantTypeHash('Subspace', 'RecentHistoryFraction') === 'ef51d55268ea048d2630ef91aec23cd3a982e0efd12a9169a7d12285ca9c59f4'
    }

    /**
     *  Fraction of pieces from the "recent history" (`recent_segments`) in each sector.
     */
    get asV0(): [bigint, bigint] {
        assert(this.isV0)
        return this._chain.getConstant('Subspace', 'RecentHistoryFraction')
    }

    /**
     * Checks whether the constant is defined for the current chain version.
     */
    get isExists(): boolean {
        return this._chain.getConstantTypeHash('Subspace', 'RecentHistoryFraction') != null
    }
}

export class SubspaceRecentSegmentsConstant {
    private readonly _chain: Chain

    constructor(ctx: ChainContext) {
        this._chain = ctx._chain
    }

    /**
     *  Number of latest archived segments that are considered "recent history".
     */
    get isV0() {
        return this._chain.getConstantTypeHash('Subspace', 'RecentSegments') === '2e8052d0ae8d237ad263438f986208df52f4f0e9f529557036c3b179dfb42f21'
    }

    /**
     *  Number of latest archived segments that are considered "recent history".
     */
    get asV0(): bigint {
        assert(this.isV0)
        return this._chain.getConstant('Subspace', 'RecentSegments')
    }

    /**
     * Checks whether the constant is defined for the current chain version.
     */
    get isExists(): boolean {
        return this._chain.getConstantTypeHash('Subspace', 'RecentSegments') != null
    }
}

export class SubspaceSlotProbabilityConstant {
    private readonly _chain: Chain

    constructor(ctx: ChainContext) {
        this._chain = ctx._chain
    }

    /**
     *  How often in slots slots (on average, not counting collisions) will have a block.
     * 
     *  Expressed as a rational where the first member of the tuple is the
     *  numerator and the second is the denominator. The rational should
     *  represent a value between 0 and 1.
     */
    get isV0() {
        return this._chain.getConstantTypeHash('Subspace', 'SlotProbability') === 'ef51d55268ea048d2630ef91aec23cd3a982e0efd12a9169a7d12285ca9c59f4'
    }

    /**
     *  How often in slots slots (on average, not counting collisions) will have a block.
     * 
     *  Expressed as a rational where the first member of the tuple is the
     *  numerator and the second is the denominator. The rational should
     *  represent a value between 0 and 1.
     */
    get asV0(): [bigint, bigint] {
        assert(this.isV0)
        return this._chain.getConstant('Subspace', 'SlotProbability')
    }

    /**
     * Checks whether the constant is defined for the current chain version.
     */
    get isExists(): boolean {
        return this._chain.getConstantTypeHash('Subspace', 'SlotProbability') != null
    }
}

export class SystemBlockHashCountConstant {
    private readonly _chain: Chain

    constructor(ctx: ChainContext) {
        this._chain = ctx._chain
    }

    /**
     *  Maximum number of block number to block hash mappings to keep (oldest pruned first).
     */
    get isV0() {
        return this._chain.getConstantTypeHash('System', 'BlockHashCount') === 'b76f37d33f64f2d9b3234e29034ab4a73ee9da01a61ab139c27f8c841971e469'
    }

    /**
     *  Maximum number of block number to block hash mappings to keep (oldest pruned first).
     */
    get asV0(): number {
        assert(this.isV0)
        return this._chain.getConstant('System', 'BlockHashCount')
    }

    /**
     * Checks whether the constant is defined for the current chain version.
     */
    get isExists(): boolean {
        return this._chain.getConstantTypeHash('System', 'BlockHashCount') != null
    }
}

export class SystemBlockLengthConstant {
    private readonly _chain: Chain

    constructor(ctx: ChainContext) {
        this._chain = ctx._chain
    }

    /**
     *  The maximum length of a block (in bytes).
     */
    get isV0() {
        return this._chain.getConstantTypeHash('System', 'BlockLength') === '9aacf667c67dbae172e6d30e5f4026086c8a56d9ebfe50dfdcca3fe40a9f55ca'
    }

    /**
     *  The maximum length of a block (in bytes).
     */
    get asV0(): v0.BlockLength {
        assert(this.isV0)
        return this._chain.getConstant('System', 'BlockLength')
    }

    /**
     * Checks whether the constant is defined for the current chain version.
     */
    get isExists(): boolean {
        return this._chain.getConstantTypeHash('System', 'BlockLength') != null
    }
}

export class SystemBlockWeightsConstant {
    private readonly _chain: Chain

    constructor(ctx: ChainContext) {
        this._chain = ctx._chain
    }

    /**
     *  Block & extrinsics weights: base values and limits.
     */
    get isV0() {
        return this._chain.getConstantTypeHash('System', 'BlockWeights') === 'fa5692d9032f25a42ae01892fea053f75130751d1302a6b4db45a7a98a9d0760'
    }

    /**
     *  Block & extrinsics weights: base values and limits.
     */
    get asV0(): v0.BlockWeights {
        assert(this.isV0)
        return this._chain.getConstant('System', 'BlockWeights')
    }

    /**
     * Checks whether the constant is defined for the current chain version.
     */
    get isExists(): boolean {
        return this._chain.getConstantTypeHash('System', 'BlockWeights') != null
    }
}

export class SystemDbWeightConstant {
    private readonly _chain: Chain

    constructor(ctx: ChainContext) {
        this._chain = ctx._chain
    }

    /**
     *  The weight of runtime database operations the runtime can invoke.
     */
    get isV0() {
        return this._chain.getConstantTypeHash('System', 'DbWeight') === 'f2b1a28b00823bafa34a2cd3123e2e54de1b56f53266976a0fa1bbffc1833341'
    }

    /**
     *  The weight of runtime database operations the runtime can invoke.
     */
    get asV0(): v0.RuntimeDbWeight {
        assert(this.isV0)
        return this._chain.getConstant('System', 'DbWeight')
    }

    /**
     * Checks whether the constant is defined for the current chain version.
     */
    get isExists(): boolean {
        return this._chain.getConstantTypeHash('System', 'DbWeight') != null
    }
}

export class SystemSS58PrefixConstant {
    private readonly _chain: Chain

    constructor(ctx: ChainContext) {
        this._chain = ctx._chain
    }

    /**
     *  The designated SS58 prefix of this chain.
     * 
     *  This replaces the "ss58Format" property declared in the chain spec. Reason is
     *  that the runtime should know about the prefix in order to make use of it as
     *  an identifier of the chain.
     */
    get isV0() {
        return this._chain.getConstantTypeHash('System', 'SS58Prefix') === '32def12560ecd411fe2fc796552e97d0d5ee0ea10e059b3d8918c9e94dfdb334'
    }

    /**
     *  The designated SS58 prefix of this chain.
     * 
     *  This replaces the "ss58Format" property declared in the chain spec. Reason is
     *  that the runtime should know about the prefix in order to make use of it as
     *  an identifier of the chain.
     */
    get asV0(): number {
        assert(this.isV0)
        return this._chain.getConstant('System', 'SS58Prefix')
    }

    /**
     * Checks whether the constant is defined for the current chain version.
     */
    get isExists(): boolean {
        return this._chain.getConstantTypeHash('System', 'SS58Prefix') != null
    }
}

export class SystemVersionConstant {
    private readonly _chain: Chain

    constructor(ctx: ChainContext) {
        this._chain = ctx._chain
    }

    /**
     *  Get the chain's current version.
     */
    get isV0() {
        return this._chain.getConstantTypeHash('System', 'Version') === 'd382dbbcc7760cd6518839a3223d6b3e27dbdc4d62041d536c52561cd482a48b'
    }

    /**
     *  Get the chain's current version.
     */
    get asV0(): v0.RuntimeVersion {
        assert(this.isV0)
        return this._chain.getConstant('System', 'Version')
    }

    /**
     * Checks whether the constant is defined for the current chain version.
     */
    get isExists(): boolean {
        return this._chain.getConstantTypeHash('System', 'Version') != null
    }
}

export class TimestampMinimumPeriodConstant {
    private readonly _chain: Chain

    constructor(ctx: ChainContext) {
        this._chain = ctx._chain
    }

    /**
     *  The minimum period between blocks.
     * 
     *  Be aware that this is different to the *expected* period that the block production
     *  apparatus provides. Your chosen consensus system will generally work with this to
     *  determine a sensible block time. For example, in the Aura pallet it will be double this
     *  period on default settings.
     */
    get isV0() {
        return this._chain.getConstantTypeHash('Timestamp', 'MinimumPeriod') === '2e8052d0ae8d237ad263438f986208df52f4f0e9f529557036c3b179dfb42f21'
    }

    /**
     *  The minimum period between blocks.
     * 
     *  Be aware that this is different to the *expected* period that the block production
     *  apparatus provides. Your chosen consensus system will generally work with this to
     *  determine a sensible block time. For example, in the Aura pallet it will be double this
     *  period on default settings.
     */
    get asV0(): bigint {
        assert(this.isV0)
        return this._chain.getConstant('Timestamp', 'MinimumPeriod')
    }

    /**
     * Checks whether the constant is defined for the current chain version.
     */
    get isExists(): boolean {
        return this._chain.getConstantTypeHash('Timestamp', 'MinimumPeriod') != null
    }
}

export class TransactionFeesBlockchainHistorySizeConstant {
    private readonly _chain: Chain

    constructor(ctx: ChainContext) {
        this._chain = ctx._chain
    }

    /**
     *  How big is the history of the blockchain in archived state (thus includes erasure
     *  coding, but not replication).
     */
    get isV0() {
        return this._chain.getConstantTypeHash('TransactionFees', 'BlockchainHistorySize') === 'a73c503ad07b8dce07ffc3646a2c7aeacb1280015e3b79887f6a9b11dae120f1'
    }

    /**
     *  How big is the history of the blockchain in archived state (thus includes erasure
     *  coding, but not replication).
     */
    get asV0(): bigint {
        assert(this.isV0)
        return this._chain.getConstant('TransactionFees', 'BlockchainHistorySize')
    }

    /**
     * Checks whether the constant is defined for the current chain version.
     */
    get isExists(): boolean {
        return this._chain.getConstantTypeHash('TransactionFees', 'BlockchainHistorySize') != null
    }
}

export class TransactionFeesCreditSupplyConstant {
    private readonly _chain: Chain

    constructor(ctx: ChainContext) {
        this._chain = ctx._chain
    }

    /**
     *  How many credits there is in circulation.
     */
    get isV0() {
        return this._chain.getConstantTypeHash('TransactionFees', 'CreditSupply') === 'a73c503ad07b8dce07ffc3646a2c7aeacb1280015e3b79887f6a9b11dae120f1'
    }

    /**
     *  How many credits there is in circulation.
     */
    get asV0(): bigint {
        assert(this.isV0)
        return this._chain.getConstant('TransactionFees', 'CreditSupply')
    }

    /**
     * Checks whether the constant is defined for the current chain version.
     */
    get isExists(): boolean {
        return this._chain.getConstantTypeHash('TransactionFees', 'CreditSupply') != null
    }
}

export class TransactionFeesMinReplicationFactorConstant {
    private readonly _chain: Chain

    constructor(ctx: ChainContext) {
        this._chain = ctx._chain
    }

    /**
     *  Minimum desired number of replicas of the blockchain to be stored by the network,
     *  impacts storage fees.
     */
    get isV0() {
        return this._chain.getConstantTypeHash('TransactionFees', 'MinReplicationFactor') === '32def12560ecd411fe2fc796552e97d0d5ee0ea10e059b3d8918c9e94dfdb334'
    }

    /**
     *  Minimum desired number of replicas of the blockchain to be stored by the network,
     *  impacts storage fees.
     */
    get asV0(): number {
        assert(this.isV0)
        return this._chain.getConstant('TransactionFees', 'MinReplicationFactor')
    }

    /**
     * Checks whether the constant is defined for the current chain version.
     */
    get isExists(): boolean {
        return this._chain.getConstantTypeHash('TransactionFees', 'MinReplicationFactor') != null
    }
}

export class TransactionFeesTotalSpacePledgedConstant {
    private readonly _chain: Chain

    constructor(ctx: ChainContext) {
        this._chain = ctx._chain
    }

    /**
     *  How much space there is on the network.
     */
    get isV0() {
        return this._chain.getConstantTypeHash('TransactionFees', 'TotalSpacePledged') === 'a73c503ad07b8dce07ffc3646a2c7aeacb1280015e3b79887f6a9b11dae120f1'
    }

    /**
     *  How much space there is on the network.
     */
    get asV0(): bigint {
        assert(this.isV0)
        return this._chain.getConstant('TransactionFees', 'TotalSpacePledged')
    }

    /**
     * Checks whether the constant is defined for the current chain version.
     */
    get isExists(): boolean {
        return this._chain.getConstantTypeHash('TransactionFees', 'TotalSpacePledged') != null
    }
}

export class TransactionPaymentOperationalFeeMultiplierConstant {
    private readonly _chain: Chain

    constructor(ctx: ChainContext) {
        this._chain = ctx._chain
    }

    /**
     *  A fee multiplier for `Operational` extrinsics to compute "virtual tip" to boost their
     *  `priority`
     * 
     *  This value is multiplied by the `final_fee` to obtain a "virtual tip" that is later
     *  added to a tip component in regular `priority` calculations.
     *  It means that a `Normal` transaction can front-run a similarly-sized `Operational`
     *  extrinsic (with no tip), by including a tip value greater than the virtual tip.
     * 
     *  ```rust,ignore
     *  // For `Normal`
     *  let priority = priority_calc(tip);
     * 
     *  // For `Operational`
     *  let virtual_tip = (inclusion_fee + tip) * OperationalFeeMultiplier;
     *  let priority = priority_calc(tip + virtual_tip);
     *  ```
     * 
     *  Note that since we use `final_fee` the multiplier applies also to the regular `tip`
     *  sent with the transaction. So, not only does the transaction get a priority bump based
     *  on the `inclusion_fee`, but we also amplify the impact of tips applied to `Operational`
     *  transactions.
     */
    get isV0() {
        return this._chain.getConstantTypeHash('TransactionPayment', 'OperationalFeeMultiplier') === 'afecacff3b029831d50a478055aa405254e6579585f9617d2a2f34743b4aff83'
    }

    /**
     *  A fee multiplier for `Operational` extrinsics to compute "virtual tip" to boost their
     *  `priority`
     * 
     *  This value is multiplied by the `final_fee` to obtain a "virtual tip" that is later
     *  added to a tip component in regular `priority` calculations.
     *  It means that a `Normal` transaction can front-run a similarly-sized `Operational`
     *  extrinsic (with no tip), by including a tip value greater than the virtual tip.
     * 
     *  ```rust,ignore
     *  // For `Normal`
     *  let priority = priority_calc(tip);
     * 
     *  // For `Operational`
     *  let virtual_tip = (inclusion_fee + tip) * OperationalFeeMultiplier;
     *  let priority = priority_calc(tip + virtual_tip);
     *  ```
     * 
     *  Note that since we use `final_fee` the multiplier applies also to the regular `tip`
     *  sent with the transaction. So, not only does the transaction get a priority bump based
     *  on the `inclusion_fee`, but we also amplify the impact of tips applied to `Operational`
     *  transactions.
     */
    get asV0(): number {
        assert(this.isV0)
        return this._chain.getConstant('TransactionPayment', 'OperationalFeeMultiplier')
    }

    /**
     * Checks whether the constant is defined for the current chain version.
     */
    get isExists(): boolean {
        return this._chain.getConstantTypeHash('TransactionPayment', 'OperationalFeeMultiplier') != null
    }
}

export class Utilitybatched_calls_limitConstant {
    private readonly _chain: Chain

    constructor(ctx: ChainContext) {
        this._chain = ctx._chain
    }

    /**
     *  The limit on the number of batched calls.
     */
    get isV0() {
        return this._chain.getConstantTypeHash('Utility', 'batched_calls_limit') === 'b76f37d33f64f2d9b3234e29034ab4a73ee9da01a61ab139c27f8c841971e469'
    }

    /**
     *  The limit on the number of batched calls.
     */
    get asV0(): number {
        assert(this.isV0)
        return this._chain.getConstant('Utility', 'batched_calls_limit')
    }

    /**
     * Checks whether the constant is defined for the current chain version.
     */
    get isExists(): boolean {
        return this._chain.getConstantTypeHash('Utility', 'batched_calls_limit') != null
    }
}

export class VestingMinVestedTransferConstant {
    private readonly _chain: Chain

    constructor(ctx: ChainContext) {
        this._chain = ctx._chain
    }

    /**
     *  The minimum amount transferred to call `vested_transfer`.
     */
    get isV0() {
        return this._chain.getConstantTypeHash('Vesting', 'MinVestedTransfer') === 'a73c503ad07b8dce07ffc3646a2c7aeacb1280015e3b79887f6a9b11dae120f1'
    }

    /**
     *  The minimum amount transferred to call `vested_transfer`.
     */
    get asV0(): bigint {
        assert(this.isV0)
        return this._chain.getConstant('Vesting', 'MinVestedTransfer')
    }

    /**
     * Checks whether the constant is defined for the current chain version.
     */
    get isExists(): boolean {
        return this._chain.getConstantTypeHash('Vesting', 'MinVestedTransfer') != null
    }
}
