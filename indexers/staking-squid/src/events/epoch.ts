import { operators as getOperators } from "@autonomys/auto-consensus";
import type { ApiPromise } from "@autonomys/auto-utils";
import { NominatorStatus, OperatorStatus } from "../model";
import type { CtxBlock, CtxEvent, CtxExtrinsic } from "../processor";
import {
  createStats,
  createStatsPerDomain,
  createStatsPerOperator,
  getOrCreateDomain,
  getOrCreateOperator,
} from "../storage";
import { getBlockNumber } from "../utils";
import { Cache } from "../utils/cache";

export async function processEpochTransitionEvent(
  cache: Cache,
  api: ApiPromise,
  block: CtxBlock,
  extrinsic: CtxExtrinsic,
  event: CtxEvent
) {
  const domainId = Number(event.args.domainId);
  const domain = getOrCreateDomain(cache, block, domainId);
  const completedEpoch = Number(event.args.completedEpochIndex);

  const apiAt = await api.at(block.header.hash);

  const operatorsAll = await getOperators(apiAt);
  const allOperators = operatorsAll.filter(
    (o) => o.operatorDetails.currentDomainId === BigInt(domainId)
  );

  for (const operator of allOperators) {
    const op = getOrCreateOperator(
      cache,
      block,
      parseInt(operator.operatorId.toString())
    );

    const rawStatus = JSON.stringify(operator.operatorDetails.status);
    op.currentEpochRewards = operator.operatorDetails.currentEpochRewards;
    op.currentTotalShares = operator.operatorDetails.currentTotalShares;
    op.currentTotalStake = operator.operatorDetails.currentTotalStake;
    op.currentStorageFeeDeposit =
      operator.operatorDetails.totalStorageFeeDeposit;
    op.rawStatus = rawStatus;
    op.updatedAt = getBlockNumber(block);

    cache.operators.set(op.id, op);

    try {
      const rawStatusKey = Object.keys(rawStatus);
      if (rawStatusKey[0] === "deregistered") {
        const unlockBlock = (
          rawStatus as unknown as {
            deregistered: { unlockAtConfirmedDomainBlockNumber: number };
          }
        ).deregistered.unlockAtConfirmedDomainBlockNumber;

        if (unlockBlock <= domain.lastDomainBlockNumber) {
          op.status = OperatorStatus.READY_TO_UNLOCK;
          cache.operators.set(op.id, op);
        }
      }
    } catch (e) {
      console.error("Error in processEpochTransitionEvent", e);
    }
  }

  domain.currentTotalStake = allOperators.reduce(
    (acc, o) => acc + o.operatorDetails.currentTotalStake,
    BigInt(0)
  );
  domain.currentStorageFeeDeposit = allOperators.reduce(
    (acc, o) => acc + o.operatorDetails.totalStorageFeeDeposit,
    BigInt(0)
  );

  domain.completedEpoch = completedEpoch;
  domain.updatedAt = getBlockNumber(block);

  cache.domains.set(domain.id, domain);

  // Stats on epoch transition
  const stats = createStats(cache, block);
  cache.stats.set(stats.id, stats);

  const domains = Array.from(cache.domains.values());
  for (const domain of domains) {
    const statsPerDomain = createStatsPerDomain(cache, block, domain);
    cache.statsPerDomain.set(statsPerDomain.id, statsPerDomain);

    const operators = Array.from(cache.operators.values()).filter(
      (o) => o.domainId === domain.id
    );
    for (const operator of operators) {
      const statsPerOperator = createStatsPerOperator(
        cache,
        block,
        domain,
        operator
      );
      cache.statsPerOperator.set(statsPerOperator.id, statsPerOperator);
    }
  }

  return cache;
}
