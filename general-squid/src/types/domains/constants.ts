import {sts, Block, Bytes, Option, Result, ConstantType, RuntimeCtx} from '../support'
import * as v0 from '../v0'
import * as v1 from '../v1'

export const confirmationDepthK =  {
    /**
     *  Same with `pallet_subspace::Config::ConfirmationDepthK`.
     */
    v0: new ConstantType(
        'Domains.ConfirmationDepthK',
        sts.number()
    ),
}

export const domainRuntimeUpgradeDelay =  {
    /**
     *  Delay before a domain runtime is upgraded.
     */
    v0: new ConstantType(
        'Domains.DomainRuntimeUpgradeDelay',
        sts.number()
    ),
}

export const blockTreePruningDepth =  {
    /**
     *  The block tree pruning depth.
     */
    v0: new ConstantType(
        'Domains.BlockTreePruningDepth',
        sts.number()
    ),
}

export const maxDomainBlockSize =  {
    /**
     *  The maximum block size limit for all domain.
     */
    v0: new ConstantType(
        'Domains.MaxDomainBlockSize',
        sts.number()
    ),
}

export const maxDomainBlockWeight =  {
    /**
     *  The maximum block weight limit for all domain.
     */
    v0: new ConstantType(
        'Domains.MaxDomainBlockWeight',
        v0.Weight
    ),
}

export const maxBundlesPerBlock =  {
    /**
     *  The maximum bundle per block limit for all domain.
     */
    v0: new ConstantType(
        'Domains.MaxBundlesPerBlock',
        sts.number()
    ),
}

export const maxDomainNameLength =  {
    /**
     *  The maximum domain name length limit for all domain.
     */
    v0: new ConstantType(
        'Domains.MaxDomainNameLength',
        sts.number()
    ),
}

export const domainInstantiationDeposit =  {
    /**
     *  The amount of fund to be locked up for the domain instance creator.
     */
    v0: new ConstantType(
        'Domains.DomainInstantiationDeposit',
        sts.bigint()
    ),
}

export const initialDomainTxRange =  {
    /**
     *  Initial domain tx range value.
     */
    v0: new ConstantType(
        'Domains.InitialDomainTxRange',
        sts.bigint()
    ),
}

export const domainTxRangeAdjustmentInterval =  {
    /**
     *  Domain tx range is adjusted after every DomainTxRangeAdjustmentInterval blocks.
     */
    v0: new ConstantType(
        'Domains.DomainTxRangeAdjustmentInterval',
        sts.bigint()
    ),
}

export const minOperatorStake =  {
    /**
     *  Minimum operator stake required to become operator of a domain.
     */
    v0: new ConstantType(
        'Domains.MinOperatorStake',
        sts.bigint()
    ),
}

export const minNominatorStake =  {
    /**
     *  Minimum nominator stake required to nominate and operator.
     */
    v0: new ConstantType(
        'Domains.MinNominatorStake',
        sts.bigint()
    ),
}

export const stakeWithdrawalLockingPeriod =  {
    /**
     *  Minimum number of blocks after which any finalized withdrawals are released to nominators.
     */
    v0: new ConstantType(
        'Domains.StakeWithdrawalLockingPeriod',
        sts.number()
    ),
}

export const stakeEpochDuration =  {
    /**
     *  Domain epoch transition interval
     */
    v0: new ConstantType(
        'Domains.StakeEpochDuration',
        sts.number()
    ),
}

export const treasuryAccount =  {
    /**
     *  Treasury account.
     */
    v0: new ConstantType(
        'Domains.TreasuryAccount',
        v0.AccountId32
    ),
}

export const maxPendingStakingOperation =  {
    /**
     *  The maximum number of pending staking operation that can perform upon epoch transition.
     */
    v0: new ConstantType(
        'Domains.MaxPendingStakingOperation',
        sts.number()
    ),
}

export const maxNominators =  {
    /**
     *  The maximum number of nominators for given operator.
     */
    v0: new ConstantType(
        'Domains.MaxNominators',
        sts.number()
    ),
}

export const sudoId =  {
    /**
     *  The sudo account id
     */
    v0: new ConstantType(
        'Domains.SudoId',
        v0.AccountId32
    ),
}

export const palletId =  {
    /**
     *  The pallet-domains's pallet id.
     */
    v1: new ConstantType(
        'Domains.PalletId',
        v1.PalletId
    ),
}
