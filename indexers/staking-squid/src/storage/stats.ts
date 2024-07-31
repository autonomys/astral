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
  domain: Domain,
  operator: Operator
): StatsPerOperator => {
  return new StatsPerOperator({
    id: randomUUID(),
    domainId: domain.id,
    operatorId: operator.id,
    totalStaked: operator.currentTotalStake,
    totalFees: BigInt(0),
    totalDeposits: operator.totalDeposits,
    totalWithdrawals: BigInt(0),
    allTimeHighStaked: BigInt(0),
    blockNumber: getBlockNumber(block),
    timestamp: getTimestamp(block),
  });
};

export const createStatsPerDomain = (
  block: CtxBlock,
  domain: Domain
): StatsPerDomain => {
  return new StatsPerDomain({
    id: randomUUID(),
    domainId: domain.id,
    totalStaked: domain.currentTotalStake,
    totalFees: BigInt(0),
    totalDeposits: domain.totalDeposits,
    totalWithdrawals: BigInt(0),
    allTimeHighStaked: BigInt(0),
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

  return new Stats({
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
};
