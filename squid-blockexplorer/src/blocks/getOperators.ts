import { SubstrateBlock } from "@subsquid/substrate-processor";
import { Operator } from "../model";
import { Context } from "../processor";
import { DomainsOperatorsStorage } from "../types/storage";
import { encodeId } from "./utils";

export function getOperatorsFactory(
  ctx: Context,
  storageFactory: (
    ctx: Context,
    header: SubstrateBlock
  ) => DomainsOperatorsStorage
) {
  return async function getOperators(header: SubstrateBlock) {
    const storage = storageFactory(ctx, header);
    const operatorsList = await storage.asV1.getAll();

    const operators: Operator[] = [];

    for (let i = 0; i < operatorsList.length; i++) {
      const signingKey = encodeId(operatorsList[i].signingKey);

      // check if there is an existing account created earlier (i.e. when processing blocks)
      const existingOperator = await ctx.store.get(Operator, signingKey);

      const operator = new Operator({
        ...existingOperator,
        id: `${operatorsList[i].currentDomainId}-${signingKey}`,
        status: operatorsList[i].status.__kind.toString(),
        signingKey: signingKey,
        totalShares: operatorsList[i].totalShares,
        currentEpochRewards: operatorsList[i].currentEpochRewards,
        currentTotalStake: operatorsList[i].currentTotalStake,
        nominationTax: operatorsList[i].nominationTax,
        minimumNominatorStake: operatorsList[i].minimumNominatorStake,
        nextDomainId: operatorsList[i].nextDomainId,
        currentDomainId: operatorsList[i].currentDomainId,
      });

      operators.push(operator);
    }

    return operators;
  };
}
