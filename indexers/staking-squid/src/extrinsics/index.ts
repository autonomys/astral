import type { ApiPromise } from "@autonomys/auto-utils";
import { processEvents } from "../events";
import type { CtxBlock, CtxExtrinsic } from "../processor";
import { calls } from "../types";
import { Cache } from "../utils/cache";
import { processDeregisterOperator, processRegisterOperator } from "./operator";

export async function processExtrinsics(
  cache: Cache,
  api: ApiPromise,
  block: CtxBlock,
  extrinsics: CtxExtrinsic[]
) {
  for (let extrinsic of extrinsics) {
    cache = await processExtrinsic(cache, api, block, extrinsic);
  }
  return cache;
}

export async function processExtrinsic(
  cache: Cache,
  api: ApiPromise,
  block: CtxBlock,
  extrinsic: CtxExtrinsic
) {
  console.log("extrinsic", extrinsic.call?.name);
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
    default:
      return await processEvents(cache, api, block, extrinsic);
  }
}
