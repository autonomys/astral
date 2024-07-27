import { parseOperator } from "@autonomys/auto-consensus";
import type { ApiDecoration } from "@polkadot/api/types";
import type { CtxBlock, CtxEvent } from "../processor";
import {
  createDomain,
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
  apiAt: ApiDecoration<"promise">,
  block: CtxBlock,
  event: CtxEvent
) {
  const domainId = Number(event.args.domainId);
  const domain = getOrCreateDomain(cache, block, domainId);
  const completedEpoch = Number(event.args.completedEpochIndex);

  if (!domain) {
    const domain = createDomain(block, { domainId, completedEpoch });
    cache.domains.set(domain.id, domain);
  } else {
    domain.completedEpoch = Number(event.args.completedEpochIndex);
    domain.updatedAt = getBlockNumber(block);

    cache.domains.set(domain.id, domain);
  }

  const operatorsAll = await apiAt.query.domains.operators.entries();
  const allOperators = (operatorsAll as unknown as any[]).map((o) =>
    parseOperator(o)
  );
  for (const operator of allOperators) {
    const op = getOrCreateOperator(
      cache,
      block,
      parseInt(operator.operatorId.toString())
    );
    op.currentEpochRewards = operator.operatorDetails.currentEpochRewards;
    op.currentTotalShares = operator.operatorDetails.currentTotalShares;
    op.currentTotalStake = operator.operatorDetails.currentTotalStake;
    op.currentStorageFeeDeposit =
      operator.operatorDetails.totalStorageFeeDeposit;
    op.rawStatus = JSON.stringify(operator.operatorDetails.status);
    op.updatedAt = getBlockNumber(block);

    cache.operators.set(op.id, op);
  }

  // Stats on epoch transition
  const stats = createStats(cache, block);
  cache.stats.set(stats.id, stats);

  const domains = Array.from(cache.domains.values());
  for (const domain of domains) {
    const statsPerDomain = createStatsPerDomain(cache, block, domain);
    cache.statsPerDomain.set(statsPerDomain.id, statsPerDomain);
  }
  const operators = Array.from(cache.operators.values());
  for (const operator of operators) {
    const statsPerOperator = createStatsPerOperator(block, operator);
    cache.statsPerOperator.set(statsPerOperator.id, statsPerOperator);
  }

  return cache;
}
