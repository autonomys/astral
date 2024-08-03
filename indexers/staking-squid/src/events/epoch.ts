import { operators as getOperators } from "@autonomys/auto-consensus";
import type { ApiPromise } from "@autonomys/auto-utils";
import { DepositStatus, NominatorStatus, OperatorStatus } from "../model";
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
      const _status = JSON.parse(rawStatus) as unknown as {
        registered?: null;
        deregistered?: {
          domainEpoch: [number, number];
          unlockAtConfirmedDomainBlockNumber: number;
        };
      };
      if (
        Object.keys(JSON.parse(rawStatus))[0] === "deregistered" &&
        _status.deregistered &&
        _status.deregistered.unlockAtConfirmedDomainBlockNumber <=
          domain.lastDomainBlockNumber
      ) {
        op.status = OperatorStatus.READY_TO_UNLOCK;
        cache.operators.set(op.id, op);
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

  Array.from(cache.operators.values())
    .filter(
      (o) => o.status === OperatorStatus.REGISTERED && o.domainId === domain.id
    )
    .map((o) => {
      ++o.activeEpochCount;
      o.updatedAt = getBlockNumber(block);
      cache.operators.set(o.id, o);
    });

  // Switch Pending to Active
  Array.from(cache.operators.values())
    .filter(
      (o) => o.status === OperatorStatus.PENDING && o.domainId === domain.id
    )
    .map((o) => {
      o.status = OperatorStatus.REGISTERED;
      o.updatedAt = getBlockNumber(block);
      cache.operators.set(o.id, o);
    });
  Array.from(cache.nominators.values())
    .filter(
      (n) => n.status === NominatorStatus.PENDING && n.domainId === domain.id
    )
    .map((n) => {
      n.status = NominatorStatus.STAKING;
      n.updatedAt = getBlockNumber(block);
      cache.nominators.set(n.id, n);
    });
  Array.from(cache.deposits.values())
    .filter(
      (d) => d.status === DepositStatus.PENDING && d.domainId === domain.id
    )
    .map((d) => {
      d.status = DepositStatus.DEPOSITED;
      cache.deposits.set(d.id, d);
    });

  // Stats on epoch transition
  const stats = createStats(cache, block);
  cache.stats.set(stats.id, stats);

  const statsPerDomain = createStatsPerDomain(cache, block, domain);
  cache.statsPerDomain.set(statsPerDomain.id, statsPerDomain);

  const operators = Array.from(cache.operators.values()).filter(
    (o) => o.domainId === domain.id && o.status === OperatorStatus.REGISTERED
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

  return cache;
}
