import type { ApiDecoration } from "@polkadot/api/types";
import type { Store } from "@subsquid/typeorm-store";
import { processEvents } from "../events";
import type { ProcessorContext } from "../processor";
import { calls } from "../types";
import { processDeregisterOperator, processRegisterOperator } from "./operator";

export async function processExtrinsics(
  ctx: ProcessorContext<Store>,
  apiAt: ApiDecoration<"promise">,
  block: ProcessorContext<Store>["blocks"][0],
  extrinsics: ProcessorContext<Store>["blocks"][0]["extrinsics"]
) {
  for (let extrinsic of extrinsics) {
    await processExtrinsic(ctx, apiAt, block, extrinsic);
  }
}

export async function processExtrinsic(
  ctx: ProcessorContext<Store>,
  apiAt: ApiDecoration<"promise">,
  block: ProcessorContext<Store>["blocks"][0],
  extrinsic: ProcessorContext<Store>["blocks"][0]["extrinsics"][0]
) {
  switch (extrinsic.call?.name) {
    case calls.domains.registerOperator.name:
      return await processRegisterOperator(ctx, apiAt, block, extrinsic);

    case calls.domains.nominateOperator.name:
      break;

    case calls.domains.deregisterOperator.name:
      return await processDeregisterOperator(ctx, apiAt, block, extrinsic);

    case calls.domains.withdrawStake.name:
      break;

    case calls.domains.unlockOperator.name:
      break;

    case calls.domains.unlockFunds.name:
    case calls.domains.unlockNominator.name:
      break;
    default:
      return await processEvents(ctx, apiAt, block, extrinsic);
  }
}
