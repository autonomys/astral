import { SubstrateBlock } from "@subsquid/substrate-processor";
import { Operator } from "../model";
import { Context } from "../processor";
import { DomainsOperatorsStorage } from "../types/storage";

export function getOperatorsFactory(
  ctx: Context,
  storageFactory: (
    ctx: Context,
    header: SubstrateBlock
  ) => DomainsOperatorsStorage
) {
  return async function getOperators(header: SubstrateBlock) {
    const storage = storageFactory(ctx, header);
    const operators = await storage.asV1.getAll();

    return operators.map(
      (operator, index) =>
        new Operator({
          id: `${operator.currentDomainId}-${index}`,
          status: operator.status.__kind.toString(),
          signingKey: operator.signingKey.toString(),
          totalShares: operator.totalShares,
          currentEpochRewards: operator.currentEpochRewards,
          currentTotalStake: operator.currentTotalStake,
          nominationTax: operator.nominationTax,
          minimumNominatorStake: operator.minimumNominatorStake,
          nextDomainId: operator.nextDomainId,
          currentDomainId: operator.currentDomainId,
        })
    );
  };
}
