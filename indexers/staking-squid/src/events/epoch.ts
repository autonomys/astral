import { operators as getOperators } from "@autonomys/auto-consensus";
import type { ApiPromise } from "@autonomys/auto-utils";
import {
  DepositStatus,
  DomainRuntime,
  NominatorStatus,
  OperatorStatus,
  WithdrawalStatus,
} from "../model";
import type { CtxBlock, CtxEvent, CtxExtrinsic } from "../processor";
import {
  createStats,
  createStatsPerDomain,
  createStatsPerOperator,
  getOrCreateAccount,
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
  const { domainId, completedEpochIndex } = event.args;
  const domain = getOrCreateDomain(cache, block, domainId);
  const completedEpoch = Number(completedEpochIndex);
  const currentBlockNumber = getBlockNumber(block);

  const apiAt = await api.at(block.header.hash);
  const [domainRegistry, operatorsAll] = await Promise.all([
    apiAt.query.domains.domainRegistry.entries(),
    getOperators(apiAt),
  ]);

  const parsedDomains = domainRegistry.map((domain) => ({
    domainId: (domain[0].toHuman() as string[])[0],
    ...(domain[1].toJSON() as Omit<
      {
        domainId: string;
        ownerAccountId: string;
        domainConfig: {
          domainName: string;
          runtimeId: number;
          operatorAllowList: {
            operators: string[];
          };
        };
        domainRuntimeInfo: object;
      },
      "domainId"
    >),
  }));

  const allOperators = operatorsAll.filter(
    (o) => o.operatorDetails.currentDomainId === BigInt(domainId)
  );

  for (const pDomain of parsedDomains) {
    const accountId = pDomain.ownerAccountId;
    const _domain = getOrCreateDomain(cache, block, Number(pDomain.domainId));

    cache.accounts.set(accountId, getOrCreateAccount(cache, block, accountId));

    _domain.accountId = accountId;
    _domain.name = pDomain.domainConfig.domainName;
    _domain.runtimeId = pDomain.domainConfig.runtimeId;

    const stringifiedRuntime = JSON.stringify(pDomain.domainRuntimeInfo);
    _domain.runtime = stringifiedRuntime.includes("AutoId")
      ? DomainRuntime.AutoId
      : DomainRuntime.EVM;
    _domain.runtimeInfo = stringifiedRuntime;
    _domain.updatedAt = currentBlockNumber;

    cache.domains.set(_domain.id, _domain);
  }

  for (const operator of allOperators) {
    const op = getOrCreateOperator(cache, block, Number(operator.operatorId));

    const {
      currentEpochRewards,
      currentTotalShares,
      currentTotalStake,
      totalStorageFeeDeposit,
      status,
    } = operator.operatorDetails;

    const rawStatus = JSON.stringify(status);
    op.currentEpochRewards = currentEpochRewards;
    op.currentTotalShares = currentTotalShares;
    op.currentTotalStake = currentTotalStake;
    op.currentStorageFeeDeposit = totalStorageFeeDeposit;
    op.rawStatus = rawStatus;
    op.updatedAt = currentBlockNumber;

    cache.operators.set(op.id, op);

    try {
      const _status = JSON.parse(rawStatus) as {
        registered?: null;
        deregistered?: {
          domainEpoch: [number, number];
          unlockAtConfirmedDomainBlockNumber: number;
        };
      };

      if (
        _status.deregistered &&
        _status.deregistered.unlockAtConfirmedDomainBlockNumber <=
          domain.lastDomainBlockNumber
      ) {
        op.status = OperatorStatus.READY_TO_UNLOCK;
        cache.operators.set(op.id, op);

        Array.from(cache.nominators.values())
          .filter(
            (n) =>
              n.status === NominatorStatus.STAKING && n.operatorId === op.id
          )
          .forEach((n) => {
            n.status = NominatorStatus.READY_TO_UNLOCK;
            n.updatedAt = currentBlockNumber;
            cache.nominators.set(n.id, n);
          });

        Array.from(cache.withdrawals.values())
          .filter(
            (w) =>
              w.status === WithdrawalStatus.PENDING && w.domainId === domain.id
          )
          .forEach((w) => {
            w.status = WithdrawalStatus.READY;
            cache.withdrawals.set(w.id, w);
          });
      }
    } catch (e) {
      console.error(
        "Error parsing operator status in processEpochTransitionEvent",
        e
      );
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
  domain.updatedAt = currentBlockNumber;

  cache.domains.set(domain.id, domain);

  Array.from(cache.operators.values())
    .filter(
      (o) => o.status === OperatorStatus.REGISTERED && o.domainId === domain.id
    )
    .forEach((o) => {
      o.activeEpochCount++;
      o.updatedAt = currentBlockNumber;
      cache.operators.set(o.id, o);
    });

  Array.from(cache.operators.values())
    .filter(
      (o) => o.status === OperatorStatus.PENDING && o.domainId === domain.id
    )
    .forEach((o) => {
      o.status = OperatorStatus.REGISTERED;
      o.updatedAt = currentBlockNumber;
      cache.operators.set(o.id, o);
    });

  Array.from(cache.nominators.values())
    .filter(
      (n) => n.status === NominatorStatus.PENDING && n.domainId === domain.id
    )
    .forEach((n) => {
      n.status = NominatorStatus.STAKING;
      n.updatedAt = currentBlockNumber;
      cache.nominators.set(n.id, n);
    });

  Array.from(cache.deposits.values())
    .filter(
      (d) => d.status === DepositStatus.PENDING && d.domainId === domain.id
    )
    .forEach((d) => {
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
