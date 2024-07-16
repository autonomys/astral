import type { Store } from "@subsquid/typeorm-store";
import { randomUUID } from "crypto";
import { emptyNominator } from "../assets/nominator";
import { emptyOperator } from "../assets/operator";
import { Deposit, Nominator, Operator } from "../model";
import type { ProcessorContext } from "../processor";
import { getOrCreateOperator } from "../storage/operator";
import { events } from "../types";
import { getCallSigner } from "../utils/account";

export async function processRegisterOperator(
  ctx: ProcessorContext<Store>,
  block: ProcessorContext<Store>["blocks"][0],
  extrinsic: ProcessorContext<Store>["blocks"][0]["extrinsics"][0]
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
    const operator = new Operator({
      ...emptyOperator,
      id: randomUUID(),
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
      status: JSON.stringify({ registered: null }),
      updatedAt: block.header.height,
    });

    await ctx.store.insert(operator);

    const nominator = new Nominator({
      ...emptyNominator,
      id: randomUUID(),
      account,
      operator,
      status: JSON.stringify({ pending: null }),
      updatedAt: block.header.height,
    });

    await ctx.store.insert(nominator);

    const deposit = new Deposit({
      id: randomUUID(),
      blockNumber: block.header.height,
      account,
      amount: extrinsic.call ? BigInt(extrinsic.call.args.amount) : BigInt(0),
      storageFeeDeposit: storageFeeDepositedEvent
        ? BigInt(storageFeeDepositedEvent.args.amount)
        : BigInt(0),
      operator,
      nominator,
      timestamp: new Date(block.header.timestamp || 0),
      extrinsicHash: extrinsic.hash,
      status: JSON.stringify({ pending: null }),
    });

    await ctx.store.insert(deposit);

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
  ctx: ProcessorContext<Store>,
  block: ProcessorContext<Store>["blocks"][0],
  extrinsic: ProcessorContext<Store>["blocks"][0]["extrinsics"][0]
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
      nominator = new Nominator({
        ...emptyNominator,
        id: randomUUID(),
        account,
        operator,
        status: JSON.stringify({ pending: null }),
        updatedAt: block.header.height,
      });

      await ctx.store.insert(nominator);
    }

    const deposit = new Deposit({
      id: randomUUID(),
      blockNumber: block.header.height,
      account,
      amount: extrinsic.call ? BigInt(extrinsic.call.args.amount) : BigInt(0),
      storageFeeDeposit: storageFeeDepositedEvent
        ? BigInt(storageFeeDepositedEvent.args.amount)
        : BigInt(0),
      operator,
      nominator,
      timestamp: new Date(block.header.timestamp || 0),
      extrinsicHash: extrinsic.hash,
      status: JSON.stringify({ pending: null }),
    });

    await ctx.store.insert(deposit);

    operator.pendingTotalStake += BigInt(extrinsic.call?.args.amount);
    operator.pendingStorageFeeDeposit += storageFeeDepositedEvent
      ? BigInt(storageFeeDepositedEvent.args.amount)
      : BigInt(0);
    operator.deposits = [deposit];
    operator.depositsCount++;

    if (!nominatorExist) {
      operator.nominators = [nominator];
      operator.nominatorsCount++;
    }
    nominator.deposits = [deposit];

    await ctx.store.save(operator);
    await ctx.store.save(nominator);
  }
}

export async function processDeregisterOperator(
  ctx: ProcessorContext<Store>,
  block: ProcessorContext<Store>["blocks"][0],
  extrinsic: ProcessorContext<Store>["blocks"][0]["extrinsics"][0]
) {
  const operatorId = Number(extrinsic.call?.args.operatorId);

  const operator = await getOrCreateOperator(ctx, block, operatorId);
  const operatorDeregisteredEvent = extrinsic.events.find(
    (e) => e.name === events.domains.operatorDeregistered.name
  );

  if (operatorDeregisteredEvent) {
    operator.status = JSON.stringify({ deregistered: null });

    await ctx.store.save(operator);
  }
}

export async function processUnlockOperator(
  ctx: ProcessorContext<Store>,
  block: ProcessorContext<Store>["blocks"][0],
  extrinsic: ProcessorContext<Store>["blocks"][0]["extrinsics"][0]
) {
  const operatorId = Number(extrinsic.call?.args.operatorId);

  const operator = await getOrCreateOperator(ctx, block, operatorId);
  const operatorDeregisteredEvent = extrinsic.events.find(
    (e) => e.name === events.domains.operatorDeregistered.name
  );

  if (operatorDeregisteredEvent) {
    // To-Do: Update currentTotalStake, currentTotalShares, currentStorageFeeDeposit
    operator.status = JSON.stringify({ unlocked: null });

    await ctx.store.save(operator);
  }
}
