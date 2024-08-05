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
  return new StatsPerOperator({
    id: randomUUID(),
    domainId: domain.id,
    operatorId: operator.id,
    totalStaked: operator.currentTotalStake,
    totalFees: BigInt(0),
    totalDeposits: operator.totalDeposits,
    totalWithdrawals: BigInt(0),
    allTimeHighStaked: BigInt(0),
    nominatorsCount: nominators.length,
    depositsCount: deposits.length,
    withdrawalsCount: withdrawals.length,
    blockNumber: getBlockNumber(block),
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

  return new StatsPerDomain({
    id: randomUUID(),
    domainId: domain.id,
    totalStaked: domain.currentTotalStake,
    totalFees: BigInt(0),
    totalDeposits: domain.totalDeposits,
    totalWithdrawals: BigInt(0),
    allTimeHighStaked: BigInt(0),
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
