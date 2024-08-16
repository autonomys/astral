import { randomUUID } from "crypto";
import {
  Domain,
  Operator,
  OperatorStatus,
  Stats,
  StatsPerDomain,
  StatsPerOperator,
} from "../model";
import type { CtxBlock } from "../processor";
import { getBlockNumber, getTimestamp } from "../utils";
import {
  AllTimeHighSharePriceKey,
  AllTimeHighStakedKey,
  Cache,
} from "../utils/cache";

export const createStatsPerOperator = (
  cache: Cache,
  block: CtxBlock,
  domain: Domain,
  operator: Operator
): StatsPerOperator => {
  const nominators = Array.from(cache.nominators.values()).filter(
    (o) => o.domainId === domain.id
  );
  const deposits = Array.from(cache.deposits.values()).filter(
    (o) => o.domainId === domain.id
  );
  const withdrawals = Array.from(cache.withdrawals.values()).filter(
    (o) => o.domainId === domain.id
  );

  const allTimeHighStakedKey: AllTimeHighStakedKey = `allTimeHighStaked:${domain.id}:${operator.id}`;
  const allTimeHighSharePriceKey: AllTimeHighSharePriceKey = `allTimeHighSharePrice:${domain.id}:${operator.id}`;

  let allTimeHighStaked = BigInt(
    cache.internalKeyStore.get(allTimeHighStakedKey) || "0"
  );
  let allTimeHighSharePrice = BigInt(
    cache.internalKeyStore.get(allTimeHighSharePriceKey) || "0"
  );

  if (operator.currentTotalStake > allTimeHighStaked) {
    allTimeHighStaked = operator.currentTotalStake;
    cache.internalKeyStore.set(
      allTimeHighStakedKey,
      allTimeHighStaked.toString()
    );
    cache.isModified = true;
  }

  if (operator.currentSharePrice > allTimeHighSharePrice) {
    allTimeHighSharePrice = operator.currentSharePrice;
    cache.internalKeyStore.set(
      allTimeHighSharePriceKey,
      allTimeHighSharePrice.toString()
    );
    cache.isModified = true;
  }

  return new StatsPerOperator({
    id: randomUUID(),
    domainId: domain.id,
    operatorId: operator.id,
    blockNumber: getBlockNumber(block),
    totalStaked: operator.currentTotalStake,
    totalShares: operator.currentTotalShares,
    totalTaxCollected: operator.totalTaxCollected,
    totalRewardsCollected: operator.totalRewardsCollected,
    totalDeposits: operator.totalDeposits,
    totalWithdrawals: BigInt(0),
    currentSharePrice: operator.currentSharePrice,
    allTimeHighStaked,
    allTimeHighSharePrice,
    nominatorsCount: nominators.length,
    depositsCount: deposits.length,
    withdrawalsCount: withdrawals.length,
    timestamp: getTimestamp(block),
  });
};

export const createStatsPerDomain = (
  cache: Cache,
  block: CtxBlock,
  domain: Domain
): StatsPerDomain => {
  const operators = Array.from(cache.operators.values()).filter(
    (o) => o.domainId === domain.id
  );
  const nominators = Array.from(cache.nominators.values()).filter(
    (o) => o.domainId === domain.id
  );
  const deposits = Array.from(cache.deposits.values()).filter(
    (o) => o.domainId === domain.id
  );
  const withdrawals = Array.from(cache.withdrawals.values()).filter(
    (o) => o.domainId === domain.id
  );
  const activeOperatorsCount = operators.filter(
    (operator) => operator.status === OperatorStatus.REGISTERED
  ).length;
  const slashedOperatorsCount = operators.filter(
    (operator) => operator.status === OperatorStatus.SLASHED
  ).length;

  const allTimeHighStakedKey: AllTimeHighStakedKey = `allTimeHighStaked:${domain.id}`;
  let allTimeHighStaked = BigInt(
    cache.internalKeyStore.get(allTimeHighStakedKey) || "0"
  );

  if (domain.currentTotalStake > allTimeHighStaked) {
    allTimeHighStaked = domain.currentTotalStake;
    cache.internalKeyStore.set(
      allTimeHighStakedKey,
      allTimeHighStaked.toString()
    );
    cache.isModified = true;
  }

  return new StatsPerDomain({
    id: randomUUID(),
    domainId: domain.id,
    totalStaked: domain.currentTotalStake,
    totalTaxCollected: domain.totalTaxCollected,
    totalRewardsCollected: domain.totalRewardsCollected,
    totalDeposits: domain.totalDeposits,
    totalWithdrawals: BigInt(0),
    allTimeHighStaked,
    operatorsCount: operators.length,
    activeOperatorsCount,
    slashedOperatorsCount,
    nominatorsCount: nominators.length,
    depositsCount: deposits.length,
    withdrawalsCount: withdrawals.length,
    blockNumber: getBlockNumber(block),
    timestamp: getTimestamp(block),
  });
};

export const createStats = (cache: Cache, block: CtxBlock): Stats => {
  const operators = Array.from(cache.operators.values());

  const activeOperatorsCount = operators.filter(
    (operator) => operator.status === OperatorStatus.REGISTERED
  ).length;
  const slashedOperatorsCount = operators.filter(
    (operator) => operator.status === OperatorStatus.SLASHED
  ).length;

  const totalStaked = operators.reduce(
    (total, operator) => total + operator.currentTotalStake,
    BigInt(0)
  );
  const totalDeposits = operators.reduce(
    (total, operator) => total + operator.totalDeposits,
    BigInt(0)
  );
  const totalTaxCollected = operators.reduce(
    (total, operator) => total + operator.totalTaxCollected,
    BigInt(0)
  );
  const totalRewardsCollected = operators.reduce(
    (total, operator) => total + operator.totalRewardsCollected,
    BigInt(0)
  );

  const allTimeHighStakedKey: AllTimeHighStakedKey = "allTimeHighStaked:global";
  let allTimeHighStaked = BigInt(
    cache.internalKeyStore.get(allTimeHighStakedKey) || "0"
  );

  if (totalStaked > allTimeHighStaked) {
    allTimeHighStaked = totalStaked;
    cache.internalKeyStore.set(
      allTimeHighStakedKey,
      allTimeHighStaked.toString()
    );
    cache.isModified = true;
  }

  return new Stats({
    id: randomUUID(),
    totalStaked,
    totalTaxCollected,
    totalRewardsCollected,
    totalDeposits,
    totalWithdrawals: BigInt(0),
    allTimeHighStaked,
    domainsCount: cache.domains.size,
    operatorsCount: operators.length,
    activeOperatorsCount,
    slashedOperatorsCount,
    nominatorsCount: cache.nominators.size,
    depositsCount: cache.deposits.size,
    withdrawalsCount: cache.withdrawals.size,
    blockNumber: getBlockNumber(block),
    timestamp: getTimestamp(block),
  });
};
