import type { ApiDecoration } from "@polkadot/api/types";
import type { Store } from "@subsquid/typeorm-store";
import { Nominator, NominatorStatus, OperatorStatus } from "../model";
import type { Ctx, CtxBlock, CtxEvent, CtxExtrinsic } from "../processor";
import {
  getOrCreateDeposit,
  getOrCreateNominator,
  getOrCreateOperator,
} from "../storage";
import { events } from "../types";
import { appendOrArray, getBlockNumber } from "../utils";

export async function processOperatorNominatedEvent(
  ctx: Ctx<Store>,
  apiAt: ApiDecoration<"promise">,
  block: CtxBlock,
  extrinsic: CtxExtrinsic,
  event: CtxEvent
) {
  const operatorId = Number(event.args.operatorId);

  const storageFeeDepositedEvent = extrinsic.events.find(
    (e) => e.name === events.domains.storageFeeDeposited.name
  );

  const shares = extrinsic.call
    ? BigInt(extrinsic.call.args.shares)
    : BigInt(0);
  const amount = extrinsic.call
    ? BigInt(extrinsic.call.args.amount)
    : BigInt(0);
  const storageFeeDeposit = storageFeeDepositedEvent
    ? BigInt(storageFeeDepositedEvent.args.amount)
    : BigInt(0);

  const operator = await getOrCreateOperator(ctx, block, operatorId);
  const nominator = await getOrCreateNominator(
    ctx,
    block,
    extrinsic,
    operator,
    {
      shares,
    }
  );
  const deposit = await getOrCreateDeposit(ctx, block, extrinsic, operator, {
    amount,
    storageFeeDeposit,
  });

  operator.totalDeposits += deposit.amount;

  const operatorNominators = appendOrArray(operator.nominators, nominator);
  operator.nominators = operatorNominators;
  operator.nominatorsCount = operatorNominators.length;

  const operatorDeposits = appendOrArray(operator.deposits, deposit);
  operator.deposits = operatorDeposits;
  operator.depositsCount = operatorDeposits.length;

  operator.updatedAt = getBlockNumber(block);

  await ctx.store.save(operator);

  nominator.totalDeposits += deposit.amount;

  const nominatorDeposits = appendOrArray(nominator.deposits, deposit);
  nominator.deposits = nominatorDeposits;
  nominator.depositsCount = nominatorDeposits.length;

  nominator.updatedAt = getBlockNumber(block);

  await ctx.store.save(nominator);
}

export async function processOperatorSlashedEvent(
  ctx: Ctx<Store>,
  apiAt: ApiDecoration<"promise">,
  block: CtxBlock,
  extrinsic: CtxExtrinsic,
  event: CtxEvent
) {
  const operatorId = Number(event.args.operatorId);
  const operator = await getOrCreateOperator(ctx, block, operatorId);

  operator.currentTotalStake = BigInt(0);
  operator.currentStorageFeeDeposit = BigInt(0);
  operator.status = OperatorStatus.SLASHED;
  operator.updatedAt = getBlockNumber(block);

  await ctx.store.save(operator);

  const nominators = await ctx.store.findBy(Nominator, { operator });
  for (const nominator of nominators) {
    nominator.status = NominatorStatus.SLASHED;
    nominator.updatedAt = getBlockNumber(block);

    await ctx.store.save(nominator);
  }
}

export async function processOperatorTaxCollectedEvent(
  ctx: Ctx<Store>,
  apiAt: ApiDecoration<"promise">,
  block: CtxBlock,
  extrinsic: CtxExtrinsic,
  event: CtxEvent
) {
  const operatorId = Number(event.args.operatorId);
  const operator = await getOrCreateOperator(ctx, block, operatorId);

  operator.totalTaxCollected =
    operator.totalTaxCollected + BigInt(event.args.tax);
  operator.updatedAt = getBlockNumber(block);

  await ctx.store.save(operator);
}
