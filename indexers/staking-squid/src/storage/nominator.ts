import { Nominator, NominatorStatus, Operator } from "../model";
import type { CtxBlock, CtxExtrinsic } from "../processor";
import {
  getBlockNumber,
  getCallSigner,
  nominatorUID,
  operatorUID,
} from "../utils";
import { Cache } from "../utils/cache";
import { getOrCreateAccount } from "./account";
import { getOrCreateDomain } from "./domain";
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
  if (!props.domain)
    props.domain = getOrCreateDomain(cache, block, props.domainId || 0);
  if (!props.operator)
    props.operator = getOrCreateOperator(
      cache,
      block,
      extrinsic,
      props.operatorId || 0
    );

  const nominator = new Nominator({
    id: nominatorUID(props.operator.operatorId, address),
    domainId: props.domain.id,
    accountId: props.account.id,
    operatorId: props.operator.id,
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
  operatorId: number | string,
  props: Partial<Nominator> = {}
): Nominator => {
  const address = getCallSigner(extrinsic.call);
  const account = getOrCreateAccount(cache, block, address);
  const operator = cache.operators.get(
    typeof operatorId === "string" ? operatorId : operatorUID(operatorId)
  );
  const nominator = cache.nominators.get(
    typeof operatorId === "string"
      ? operatorId
      : nominatorUID(operatorId, address)
  );

  if (!nominator)
    return createNominator(cache, block, extrinsic, {
      account,
      operator,
      ...props,
    });

  return nominator;
};
