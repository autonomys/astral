import { OperatorStatus } from "../model";
import type { CtxBlock, CtxExtrinsic } from "../processor";
import {
  createOperator,
  getOrCreateDomain,
  getOrCreateOperator,
} from "../storage";
import { events } from "../types";
import { getCallSigner } from "../utils";
import { Cache } from "../utils/cache";

export function processRegisterOperator(
  cache: Cache,
  block: CtxBlock,
  extrinsic: CtxExtrinsic
) {
  const owner = getCallSigner(extrinsic.call);
  const domainId = extrinsic.call?.args.domainId;

  const operatorRegisteredEvent = extrinsic.events.find(
    (e) => e.name === events.domains.operatorRegistered.name
  );

  const operatorId = operatorRegisteredEvent
    ? Number(operatorRegisteredEvent.args.operatorId)
    : 0;

  if (operatorRegisteredEvent) {
    const operator = createOperator(cache, block, {
      domain: getOrCreateDomain(cache, block, domainId),
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

    cache.operators.set(operator.id, operator);
  }

  return cache;
}

export function processDeregisterOperator(
  cache: Cache,
  block: CtxBlock,
  extrinsic: CtxExtrinsic
) {
  const operatorId = Number(extrinsic.call?.args.operatorId);

  const operator = getOrCreateOperator(cache, block, operatorId);
  const operatorDeregisteredEvent = extrinsic.events.find(
    (e) => e.name === events.domains.operatorDeregistered.name
  );

  if (operatorDeregisteredEvent) {
    operator.currentTotalStake = BigInt(0);
    operator.currentStorageFeeDeposit = BigInt(0);
    operator.status = OperatorStatus.DEREGISTERED;

    cache.operators.set(operator.id, operator);
  }

  return cache;
}
