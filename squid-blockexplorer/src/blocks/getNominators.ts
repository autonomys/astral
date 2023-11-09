import { SubstrateBlock } from "@subsquid/substrate-processor";
import { Nominator } from "../model";
import { Context } from "../processor";
import { DomainsNominatorsStorage } from "../types/storage";

export function getNominatorsFactory(
  ctx: Context,
  storageFactory: (
    ctx: Context,
    header: SubstrateBlock
  ) => DomainsNominatorsStorage
) {
  return async function getNominators(header: SubstrateBlock) {
    const storage = storageFactory(ctx, header);
    const nominatorsList = await storage.asV1.getAll();

    const nominators: Nominator[] = [];

    for (let i = 0; i < nominatorsList.length; i++) {
      const newNominator = new Nominator({
        ...nominatorsList[i],
      });

      nominators.push(newNominator);
    }

    return nominators;
  };
}
