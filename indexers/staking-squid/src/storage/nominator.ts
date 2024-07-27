import { Nominator, NominatorStatus, Operator } from "../model";
import type { CtxBlock, CtxExtrinsic } from "../processor";
import { getBlockNumber, getCallSigner, nominatorUID } from "../utils";
import { Cache } from "../utils/cache";
import { getOrCreateAccount } from "./account";
import { getOrCreateOperator } from "./operator";

export const createNominator = (
  cache: Cache,
  block: CtxBlock,
  extrinsic: CtxExtrinsic,
  props: Partial<Nominator>
): Nominator => {
  const address = getCallSigner(extrinsic.call);
  if (!props.account)
    props.account = props.account = getOrCreateAccount(cache, block, address);
  if (!props.operator)
    props.operator = getOrCreateOperator(cache, block, extrinsic, 0);
  if (!props.domain) props.domain = props.operator.domain;

  const nominator = new Nominator({
    id: nominatorUID(props.operator.operatorId, address),
    shares: BigInt(0),
    deposits: [],
    withdrawals: [],
    depositsCount: 0,
    withdrawalsCount: 0,
    totalDeposits: BigInt(0),
    status: NominatorStatus.PENDING,
    ...props,
    createdAt: getBlockNumber(block),
    updatedAt: getBlockNumber(block),
  });

  return nominator;
};

export const getOrCreateNominator = (
  cache: Cache,
  block: CtxBlock,
  extrinsic: CtxExtrinsic,
  operator: Operator,
  props: Partial<Nominator> = {}
): Nominator => {
  const address = getCallSigner(extrinsic.call);
  const account = getOrCreateAccount(cache, block, address);
  const nominator = cache.nominators.get(
    nominatorUID(operator.operatorId, address)
  );

  if (!nominator)
    return createNominator(cache, block, extrinsic, {
      account,
      operator,
      ...props,
    });

  return nominator;
};
