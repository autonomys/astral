import { Domain } from "../model";
import type { CtxBlock } from "../processor";
import { getBlockNumber } from "../utils";
import { Cache } from "../utils/cache";

export const createDomain = (
  block: CtxBlock,
  props: Partial<Domain>
): Domain => {
  const domain = new Domain({
    id: props.domainId?.toString() || "0",
    domainId: 0,
    completedEpoch: 0,
    lastDomainBlockNumber: 0,
    ...props,
    createdAt: getBlockNumber(block),
    updatedAt: getBlockNumber(block),
  });

  return domain;
};

export const getOrCreateDomain = (
  cache: Cache,
  block: CtxBlock,
  domainId: number,
  props: Partial<Domain> = {}
): Domain => {
  const domain = cache.domains.get(props.domainId?.toString() || "0");

  if (!domain) return createDomain(block, { domainId, ...props });

  return domain;
};
