import * as ss58 from "@subsquid/ss58";
import config from "../config";
import { SubstrateBlock } from "@subsquid/substrate-processor";
import { Operator } from "../model";
import { Context } from "../processor";
import { DomainsOperatorsStorage } from "../types/storage";

function encodeId(id: Uint8Array) {
  return ss58.codec(config.prefix).encode(id);
}

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
      const id = encodeId(operatorsList[i].signingKey);

      // check if there is an existing account created earlier (i.e. when processing blocks)
      const existingOperator = await ctx.store.get(Operator, id);

      const operator = new Operator({
        ...existingOperator,
        id: id,
        status: operatorsList[i].status.__kind.toString(),
        signingKey: operatorsList[i].signingKey.toString(),
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
