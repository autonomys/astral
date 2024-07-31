import { Operator, OperatorStatus } from "../model";
import type { CtxBlock } from "../processor";
import { getBlockNumber, operatorUID } from "../utils";
import { Cache } from "../utils/cache";

export const createOperator = (
  block: CtxBlock,
  operatorId: number | string,
  props: Partial<Operator>
): Operator =>
  new Operator({
    id: typeof operatorId === "string" ? operatorId : operatorUID(operatorId),
    sortId: typeof operatorId === "string" ? parseInt(operatorId) : operatorId,
    signingKey: "0x",
    minimumNominatorStake: BigInt(0),
    nominationTax: 0,
    currentTotalStake: BigInt(0),
    currentStorageFeeDeposit: BigInt(0),
    currentEpochRewards: BigInt(0),
    currentTotalShares: BigInt(0),
    totalDeposits: BigInt(0),
    totalTaxCollected: BigInt(0),
    rawStatus: JSON.stringify({}),
    status: OperatorStatus.PENDING,
    lastBundleAt: 0,
    ...props,
    createdAt: getBlockNumber(block),
    updatedAt: getBlockNumber(block),
  });

export const getOrCreateOperator = (
  cache: Cache,
  block: CtxBlock,
  operatorId: number | string,
  props: Partial<Operator> = {}
): Operator => {
  const operator = cache.operators.get(
    typeof operatorId === "string" ? operatorId : operatorUID(operatorId)
  );

  if (!operator) return createOperator(block, operatorId, props);

  return operator;
};
