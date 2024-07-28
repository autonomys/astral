import { Operator, OperatorStatus } from "../model";
import type { CtxBlock, CtxExtrinsic } from "../processor";
import { getBlockNumber, getCallSigner, operatorUID } from "../utils";
import { Cache } from "../utils/cache";
import { getOrCreateAccount } from "./account";
import { getOrCreateDomain } from "./domain";

export const createOperator = (
  cache: Cache,
  block: CtxBlock,
  extrinsic: CtxExtrinsic,
  props: Partial<Operator>
): Operator => {
  if (!props.domain) props.domain = getOrCreateDomain(cache, block, 0);
  if (!props.account)
    props.account = getOrCreateAccount(
      cache,
      block,
      getCallSigner(extrinsic.call)
    );

  const operator = new Operator({
    id: operatorUID(props.operatorId || 0),
    operatorId: 0,
    signingKey: "0x",
    minimumNominatorStake: BigInt(0),
    nominationTax: 0,
    currentTotalStake: BigInt(0),
    currentStorageFeeDeposit: BigInt(0),
    currentEpochRewards: BigInt(0),
    currentTotalShares: BigInt(0),
    totalDeposits: BigInt(0),
    totalTaxCollected: BigInt(0),
    nominators: [],
    deposits: [],
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
  extrinsic: CtxExtrinsic,
  operatorId: number,
  props: Partial<Operator> = {}
): Operator => {
  const operator = cache.operators.get(operatorUID(operatorId));

  if (!operator)
    return createOperator(cache, block, extrinsic, {
      operatorId,
      ...props,
    });

  return operator;
};
