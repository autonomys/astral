import type { CtxBlock, CtxEvent } from "../processor";
import { createDomain } from "../storage";
import { Cache } from "../utils/cache";

export function processDomainInstantiatedEvent(
  cache: Cache,
  block: CtxBlock,
  event: CtxEvent
) {
  const domain = createDomain(block, {
    domainId: Number(event.args.domainId || 0),
    completedEpoch: Number(event.args.completedEpochIndex || 0),
  });

  cache.domains.set(domain.id, domain);

  return cache;
}
