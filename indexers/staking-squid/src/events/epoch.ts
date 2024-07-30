import { operators as getOperators } from "@autonomys/auto-consensus";
import type { ApiDecoration } from "@polkadot/api/types";
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
  apiAt: ApiDecoration<"promise">,
  block: CtxBlock,
  extrinsic: CtxExtrinsic,
  event: CtxEvent
) {
  const domainId = Number(event.args.domainId);
  const domain = getOrCreateDomain(cache, block, domainId);
  const completedEpoch = Number(event.args.completedEpochIndex);

  const operatorsAll = await getOperators(apiAt);
  const allOperators = operatorsAll.filter(
    (o) => o.operatorDetails.currentDomainId === BigInt(domainId)
  );

  for (const operator of allOperators) {
    const op = getOrCreateOperator(
      cache,
      block,
      extrinsic,
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
    const statsPerDomain = createStatsPerDomain(
      cache,
      block,
      domain,
      domain.domainId
    );
    cache.statsPerDomain.set(statsPerDomain.id, statsPerDomain);
  }
  const operators = Array.from(cache.operators.values());
  for (const operator of operators) {
    const statsPerOperator = createStatsPerOperator(block, operator);
    cache.statsPerOperator.set(statsPerOperator.id, statsPerOperator);
  }

  return cache;
}
