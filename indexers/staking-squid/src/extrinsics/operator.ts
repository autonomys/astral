import type { Store } from "@subsquid/typeorm-store";
import { OperatorStatus } from "../model";
import type { Ctx, CtxBlock, CtxExtrinsic } from "../processor";
import { createOperator, getOrCreateOperator } from "../storage";
import { events } from "../types";
import { getCallSigner } from "../utils";

export async function processRegisterOperator(
  ctx: Ctx<Store>,
  block: CtxBlock,
  extrinsic: CtxExtrinsic
) {
  const owner = getCallSigner(extrinsic.call);
  const domainId = extrinsic.call?.args.domainId;

  const operatorRegisteredEvent = extrinsic.events.find(
    (e) => e.name === events.domains.operatorRegistered.name
  );
  const storageFeeDepositedEvent = extrinsic.events.find(
    (e) => e.name === events.domains.storageFeeDeposited.name
  );

  const operatorId = operatorRegisteredEvent
    ? Number(operatorRegisteredEvent.args.operatorId)
    : 0;

  if (operatorRegisteredEvent) {
    const operator = await createOperator(ctx, block, {
      domainId,
      operatorId,
      signingKey: extrinsic.call?.args.config.signingKey,
      owner,
      minimumNominatorStake: BigInt(
        extrinsic.call?.args.config.minimumNominatorStake
      ),
      nominationTax: extrinsic.call?.args.config.nominationTax,
      totalDeposits: extrinsic.call
        ? BigInt(extrinsic.call.args.amount)
        : BigInt(0),
    });

    await ctx.store.save(operator);
  }
}

export async function processDeregisterOperator(
  ctx: Ctx<Store>,
  block: CtxBlock,
  extrinsic: CtxExtrinsic
) {
  const operatorId = Number(extrinsic.call?.args.operatorId);

  const operator = await getOrCreateOperator(ctx, block, operatorId);
  const operatorDeregisteredEvent = extrinsic.events.find(
    (e) => e.name === events.domains.operatorDeregistered.name
  );

  if (operatorDeregisteredEvent) {
    operator.currentTotalStake = BigInt(0);
    operator.currentStorageFeeDeposit = BigInt(0);
    operator.status = OperatorStatus.DEREGISTERED;

    await ctx.store.save(operator);
  }
}
