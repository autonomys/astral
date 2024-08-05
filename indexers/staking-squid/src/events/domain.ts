import type { CtxBlock, CtxEvent } from "../processor";
import { getOrCreateDomain } from "../storage";
import { Cache } from "../utils/cache";

export function processDomainInstantiatedEvent(
  cache: Cache,
  block: CtxBlock,
  event: CtxEvent
) {
  const domainId = Number(event.args.domainId || 0);
  const domain = getOrCreateDomain(cache, block, domainId, {
    completedEpoch: Number(event.args.completedEpochIndex || 0),
  });

  cache.domains.set(domain.id, domain);

  return cache;
}
