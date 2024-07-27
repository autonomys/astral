import { Operator, OperatorStatus } from "../model";
import type { CtxBlock } from "../processor";
import { getBlockNumber, operatorUID } from "../utils";
import { Cache } from "../utils/cache";
import { getOrCreateDomain } from "./domain";

export const createOperator = (
  cache: Cache,
  block: CtxBlock,
  props: Partial<Operator>
): Operator => {
  if (props.domain) props.domain = getOrCreateDomain(cache, block, 0);

  const operator = new Operator({
    id: operatorUID(props.domain?.domainId || 0, props.signingKey || "0x"),
    operatorId: 0,
    signingKey: "0x",
    owner: "st",
    minimumNominatorStake: BigInt(0),
    nominationTax: 0,
    currentTotalStake: BigInt(0),
    currentStorageFeeDeposit: BigInt(0),
    currentEpochRewards: BigInt(0),
    currentTotalShares: BigInt(0),
    totalDeposits: BigInt(0),
    totalTaxCollected: BigInt(0),
    deposits: [],
    nominators: [],
    withdrawals: [],
    operatorRewards: [],
    operatorFees: [],
    rawStatus: JSON.stringify({}),
    status: OperatorStatus.PENDING,
    nominatorsCount: 0,
    depositsCount: 0,
    withdrawalsCount: 0,
    bundleCount: 0,
    lastBundleAt: 0,
    ...props,
    createdAt: getBlockNumber(block),
    updatedAt: getBlockNumber(block),
  });

  return operator;
};

export const getOrCreateOperator = (
  cache: Cache,
  block: CtxBlock,
  operatorId: number,
  props: Partial<Operator> = {}
): Operator => {
  const operator = cache.operators.get(
    operatorUID(props.domain?.domainId || 0 || 0, props.signingKey || "0x")
  );

  if (!operator)
    return createOperator(cache, block, {
      operatorId,
      ...props,
    });

  return operator;
};
