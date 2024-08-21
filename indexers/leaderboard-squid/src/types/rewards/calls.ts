import {sts, Block, Bytes, Option, Result, CallType, RuntimeCtx} from '../support'
import * as v3 from '../v3'

export const updateIssuanceParams =  {
    name: 'Rewards.update_issuance_params',
    /**
     * See [`Pallet::update_issuance_params`].
     */
    v3: new CallType(
        'Rewards.update_issuance_params',
        sts.struct({
            proposerSubsidyPoints: sts.array(() => v3.RewardPoint),
            voterSubsidyPoints: sts.array(() => v3.RewardPoint),
        })
    ),
}
