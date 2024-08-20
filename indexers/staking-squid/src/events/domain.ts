import type { CtxBlock, CtxEvent } from "../processor";
import { getOrCreateDomain } from "../storage";
import { Cache } from "../utils/cache";

export function processDomainInstantiatedEvent(
  cache: Cache,
  block: CtxBlock,
  event: CtxEvent
) {
  const { domainId, completedEpochIndex } = event.args;
  const completedEpoch = Number(completedEpochIndex ?? 0);

  const domain = getOrCreateDomain(cache, block, domainId, {
    completedEpoch,
  });

  cache.domains.set(domain.id, domain);

  cache.isModified = true;

  return cache;
}
