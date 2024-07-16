import type { Store } from "@subsquid/typeorm-store";
import { processEvents } from "../events";
import type { ProcessorContext } from "../processor";
import { calls } from "../types";
import {
  processDeregisterOperator,
  processNominateOperator,
  processRegisterOperator,
  processUnlockOperator,
} from "./operator";
import { processWithdrawStake } from "./withdraw";

export async function processExtrinsics(
  ctx: ProcessorContext<Store>,
  block: ProcessorContext<Store>["blocks"][0],
  extrinsics: ProcessorContext<Store>["blocks"][0]["extrinsics"]
) {
  for (let extrinsic of extrinsics) {
    await processExtrinsic(ctx, block, extrinsic);
  }
}

export async function processExtrinsic(
  ctx: ProcessorContext<Store>,
  block: ProcessorContext<Store>["blocks"][0],
  extrinsic: ProcessorContext<Store>["blocks"][0]["extrinsics"][0]
) {
  switch (extrinsic.call?.name) {
    case calls.domains.registerOperator.name:
      return await processRegisterOperator(ctx, block, extrinsic);

    case calls.domains.nominateOperator.name:
      return await processNominateOperator(ctx, block, extrinsic);

    case calls.domains.deregisterOperator.name:
      return await processDeregisterOperator(ctx, block, extrinsic);

    case calls.domains.withdrawStake.name:
      return await processWithdrawStake(ctx, block, extrinsic);

    case calls.domains.unlockOperator.name:
      return await processUnlockOperator(ctx, block, extrinsic);

    case calls.domains.unlockFunds.name:
    case calls.domains.unlockNominator.name:
      break;
    default:
      return await processEvents(ctx, block, extrinsic);
  }
}
