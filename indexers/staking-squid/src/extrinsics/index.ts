import type { ApiDecoration } from "@polkadot/api/types";
import { processEvents } from "../events";
import type { CtxBlock, CtxExtrinsic } from "../processor";
import { calls } from "../types";
import { Cache } from "../utils/cache";
import { processDeregisterOperator, processRegisterOperator } from "./operator";

export async function processExtrinsics(
  cache: Cache,
  apiAt: ApiDecoration<"promise">,
  block: CtxBlock,
  extrinsics: CtxExtrinsic[]
) {
  for (let extrinsic of extrinsics) {
    cache = await processExtrinsic(cache, apiAt, block, extrinsic);
  }
  return cache;
}

export async function processExtrinsic(
  cache: Cache,
  apiAt: ApiDecoration<"promise">,
  block: CtxBlock,
  extrinsic: CtxExtrinsic
) {
  switch (extrinsic.call?.name) {
    case calls.domains.registerOperator.name:
      return processRegisterOperator(cache, block, extrinsic);

    case calls.domains.deregisterOperator.name:
      return processDeregisterOperator(cache, block, extrinsic);

    case calls.domains.nominateOperator.name:
    case calls.domains.withdrawStake.name:
    case calls.domains.unlockOperator.name:
    case calls.domains.unlockFunds.name:
    case calls.domains.unlockNominator.name:
      return cache;
    default:
      return await processEvents(cache, apiAt, block, extrinsic);
  }
}
