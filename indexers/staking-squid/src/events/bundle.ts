import type { CtxBlock, CtxEvent, CtxExtrinsic } from "../processor";
import { getOrCreateDomain, getOrCreateOperator } from "../storage";
import { getBlockNumber } from "../utils";
import { Cache } from "../utils/cache";

export function processBundleStoredEvent(
  cache: Cache,
  block: CtxBlock,
  extrinsic: CtxExtrinsic,
  event: CtxEvent
) {
  const domainId = Number(event.args.domainId);
  const operatorId = Number(event.args.bundleAuthor);
  const lastDomainBlockNumber = Number(
    extrinsic.call?.args.opaqueBundle.sealedHeader.header.receipt
      .domainBlockNumber
  );
  const domain = getOrCreateDomain(cache, block, domainId);
  const operator = getOrCreateOperator(cache, block, operatorId);

  domain.lastOperatorBundleProduced = operator;
  domain.lastDomainBlockNumber = lastDomainBlockNumber;
  domain.updatedAt = getBlockNumber(block);

  cache.domains.set(domain.id, domain);

  operator.bundleCount++;
  operator.lastBundleAt = getBlockNumber(block);
  operator.updatedAt = getBlockNumber(block);

  cache.operators.set(operator.id, operator);
}
