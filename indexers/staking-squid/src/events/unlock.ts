import type { CtxBlock, CtxEvent, CtxExtrinsic } from "../processor";
import { getBlockNumber, getCallSigner } from "../utils";
import { Cache } from "../utils/cache";

export function processOperatorUnlockedEvent(
  cache: Cache,
  block: CtxBlock,
  extrinsic: CtxExtrinsic,
  event: CtxEvent
) {
  const { operatorId } = event.args;
  const operatorIdNum = Number(operatorId);
  const address = getCallSigner(extrinsic.call);
  const blockNumber = getBlockNumber(block);

  cache.isModified = true;

  return cache;
}

export function processFundsUnlockedEvent(
  cache: Cache,
  block: CtxBlock,
  extrinsic: CtxExtrinsic,
  event: CtxEvent
) {
  const { operatorId, nominatorId, amount } = event.args;
  const operatorIdNum = Number(operatorId);
  const nominatorIdNum = Number(nominatorId);
  const address = getCallSigner(extrinsic.call);
  const blockNumber = getBlockNumber(block);
  const amountBigInt = BigInt(amount);

  cache.isModified = true;

  return cache;
}

export function processNominatedStakedUnlockedEvent(
  cache: Cache,
  block: CtxBlock,
  extrinsic: CtxExtrinsic,
  event: CtxEvent
) {
  const { operatorId, nominatorId, unlockedAmount } = event.args;
  const operatorIdNum = Number(operatorId);
  const nominatorIdNum = Number(nominatorId);
  const address = getCallSigner(extrinsic.call);
  const blockNumber = getBlockNumber(block);
  const unlockedAmountBigInt = BigInt(unlockedAmount);

  cache.isModified = true;

  return cache;
}

export function processNominatorUnlockedEvent(
  cache: Cache,
  block: CtxBlock,
  extrinsic: CtxExtrinsic,
  event: CtxEvent
) {
  const { operatorId, nominatorId } = event.args;
  const operatorIdNum = Number(operatorId);
  const nominatorIdNum = Number(nominatorId);
  const address = getCallSigner(extrinsic.call);
  const blockNumber = getBlockNumber(block);

  cache.isModified = true;

  return cache;
}

export function processStorageFeeUnlockedEvent(
  cache: Cache,
  block: CtxBlock,
  extrinsic: CtxExtrinsic,
  event: CtxEvent
) {
  const { operatorId, nominatorId, storageFee } = event.args;
  const operatorIdNum = Number(operatorId);
  const nominatorIdNum = Number(nominatorId);
  const address = getCallSigner(extrinsic.call);
  const blockNumber = getBlockNumber(block);
  const storageFeeBigInt = BigInt(storageFee);

  cache.isModified = true;

  return cache;
}
