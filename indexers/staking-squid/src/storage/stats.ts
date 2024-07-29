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
import { Cache } from "../utils/cache";

export const createStatsPerOperator = (
  block: CtxBlock,
  operator: Operator
): StatsPerOperator => {
  const statsPerOperator = new StatsPerOperator({
    id: randomUUID(),
    domain: operator.domain,
    operator: operator,
    totalStaked: operator.currentTotalStake,
    totalFees: BigInt(0),
    totalDeposits: operator.totalDeposits,
    totalWithdrawals: BigInt(0),
    allTimeHighStaked: BigInt(0),
    nominatorsCount: operator.nominatorsCount,
    depositsCount: operator.depositsCount,
    withdrawalsCount: operator.withdrawalsCount,
    blockNumber: getBlockNumber(block),
    timestamp: getTimestamp(block),
  });

  return statsPerOperator;
};

export const createStatsPerDomain = (
  cache: Cache,
  block: CtxBlock,
  domain: Domain,
  domainId: number
): StatsPerDomain => {
  const operators = Array.from(cache.operators.values()).filter(
    (n) => n.domain.domainId === domainId
  );
  const nominatorsCount = operators.reduce(
    (total, operator) => total + operator.nominatorsCount,
    0
  );
  const depositsCount = operators.reduce(
    (total, operator) => total + operator.depositsCount,
    0
  );
  const withdrawalsCount = operators.reduce(
    (total, operator) => total + operator.withdrawalsCount,
    0
  );

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

  const statsPerDomain = new StatsPerDomain({
    id: randomUUID(),
    domain,
    totalStaked,
    totalFees: BigInt(0),
    totalDeposits,
    totalWithdrawals: BigInt(0),
    allTimeHighStaked: BigInt(0),
    operatorsCount: operators.length,
    activeOperatorsCount,
    slashedOperatorsCount,
    nominatorsCount,
    depositsCount,
    withdrawalsCount,
    blockNumber: getBlockNumber(block),
    timestamp: getTimestamp(block),
  });

  return statsPerDomain;
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

  const stats = new Stats({
    id: randomUUID(),
    totalStaked,
    totalFees: BigInt(0),
    totalDeposits,
    totalWithdrawals: BigInt(0),
    allTimeHighStaked: BigInt(0),
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

  return stats;
};
