import type { Store } from "@subsquid/typeorm-store";
import { Nominator, OperatorStatus } from "../model";
import type { Ctx, CtxBlock, CtxExtrinsic } from "../processor";
import {
  createDeposit,
  createNominator,
  createOperator,
  getOrCreateOperator,
} from "../storage";
import { events } from "../types";
import { appendOrArray, getCallSigner } from "../utils";

export async function processRegisterOperator(
  ctx: Ctx<Store>,
  block: CtxBlock,
  extrinsic: CtxExtrinsic
) {
  const account = getCallSigner(extrinsic.call);
  const domainId = extrinsic.call?.args.domainId;

  const operatorRegisteredEvent = extrinsic.events.find(
    (e) => e.name === events.domains.operatorRegistered.name
  );
  const storageFeeDepositedEvent = extrinsic.events.find(
    (e) => e.name === events.domains.storageFeeDeposited.name
  );

  if (operatorRegisteredEvent) {
    const operator = await createOperator(ctx, block, {
      domainId,
      operatorId: Number(operatorRegisteredEvent.args.operatorId),
      signingKey: extrinsic.call?.args.config.signingKey,
      operatorOwner: account,
      minimumNominatorStake: BigInt(
        extrinsic.call?.args.config.minimumNominatorStake
      ),
      nominationTax: extrinsic.call?.args.config.nominationTax,
      pendingTotalStake: BigInt(extrinsic.call?.args.amount),
      pendingStorageFeeDeposit: storageFeeDepositedEvent
        ? BigInt(storageFeeDepositedEvent.args.amount)
        : BigInt(0),
    });

    const nominator = await createNominator(ctx, block, {
      account,
      operator,
    });

    const deposit = await createDeposit(ctx, block, {
      account,
      amount: extrinsic.call ? BigInt(extrinsic.call.args.amount) : BigInt(0),
      storageFeeDeposit: storageFeeDepositedEvent
        ? BigInt(storageFeeDepositedEvent.args.amount)
        : BigInt(0),
      operator,
      nominator,
      extrinsicHash: extrinsic.hash,
    });

    operator.deposits = [deposit];
    operator.nominators = [nominator];
    operator.depositsCount = 1;
    operator.nominatorsCount = 1;

    nominator.deposits = [deposit];

    await ctx.store.save(operator);
    await ctx.store.save(nominator);
  }
}

export async function processNominateOperator(
  ctx: Ctx<Store>,
  block: CtxBlock,
  extrinsic: CtxExtrinsic
) {
  const account = getCallSigner(extrinsic.call);
  const operatorId = Number(extrinsic.call?.args.operatorId);

  const operator = await getOrCreateOperator(ctx, block, operatorId);
  let nominator = await ctx.store.findOneBy(Nominator, { operator, account });
  const nominatorExist = !!nominator;

  const operatorNominatedEvent = extrinsic.events.find(
    (e) => e.name === events.domains.operatorNominated.name
  );
  const storageFeeDepositedEvent = extrinsic.events.find(
    (e) => e.name === events.domains.storageFeeDeposited.name
  );

  if (operatorNominatedEvent) {
    if (!nominator) {
      nominator = await createNominator(ctx, block, {
        account,
        operator,
      });
    }

    const deposit = await createDeposit(ctx, block, {
      account,
      amount: extrinsic.call ? BigInt(extrinsic.call.args.amount) : BigInt(0),
      storageFeeDeposit: storageFeeDepositedEvent
        ? BigInt(storageFeeDepositedEvent.args.amount)
        : BigInt(0),
      operator,
      nominator,
      extrinsicHash: extrinsic.hash,
    });

    operator.pendingTotalStake += BigInt(extrinsic.call?.args.amount);
    operator.pendingStorageFeeDeposit += storageFeeDepositedEvent
      ? BigInt(storageFeeDepositedEvent.args.amount)
      : BigInt(0);
    operator.deposits = appendOrArray(operator.deposits, deposit);
    operator.depositsCount++;

    if (!nominatorExist) {
      operator.nominators = appendOrArray(operator.nominators, nominator);
      operator.nominatorsCount++;
    }
    nominator.deposits = appendOrArray(nominator.deposits, deposit);

    await ctx.store.save(operator);
    await ctx.store.save(nominator);
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
    operator.pendingStorageFeeDeposit = BigInt(0);
    operator.pendingTotalStake = BigInt(0);
    operator.currentTotalStake = BigInt(0);
    operator.currentStorageFeeDeposit = BigInt(0);
    operator.status = OperatorStatus.DEREGISTERED;

    await ctx.store.save(operator);
  }
}

export async function processUnlockOperator(
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
    // To-Do: Update currentTotalStake, currentTotalShares, currentStorageFeeDeposit
    // operator.status = JSON.stringify({ unlocked: null });

    await ctx.store.save(operator);
  }
}
