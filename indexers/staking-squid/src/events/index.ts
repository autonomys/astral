import type { ApiPromise } from "@autonomys/auto-utils";
import type { CtxBlock, CtxEvent, CtxExtrinsic } from "../processor";
import { events } from "../types";
import { Cache } from "../utils/cache";
import { processBundleStoredEvent } from "./bundle";
import { processDomainInstantiatedEvent } from "./domain";
import { processEpochTransitionEvent } from "./epoch";
import {
  processOperatorNominatedEvent,
  processOperatorRewardedEvent,
  processOperatorSlashedEvent,
  processOperatorTaxCollectedEvent,
} from "./operator";
import {
  processFundsUnlockedEvent,
  processNominatedStakedUnlockedEvent,
  processOperatorUnlockedEvent,
} from "./unlock";
import { processWithdrewStakeEvent } from "./withdraw";

export async function processEvents(
  cache: Cache,
  api: ApiPromise,
  block: CtxBlock,
  extrinsic: CtxExtrinsic
) {
  for (let event of extrinsic.events) {
    cache = await processEvent(cache, api, block, extrinsic, event);
  }
  return cache;
}

async function processEvent(
  cache: Cache,
  api: ApiPromise,
  block: CtxBlock,
  extrinsic: CtxExtrinsic,
  event: CtxEvent
) {
  switch (event.name) {
    // new domain
    case events.domains.domainInstantiated.name:
      return processDomainInstantiatedEvent(cache, block, event);

    // epoch transition
    case events.domains.domainEpochCompleted.name:
    case events.domains.forceDomainEpochTransition.name:
      return await processEpochTransitionEvent(
        cache,
        api,
        block,
        extrinsic,
        event
      );

    // operator and nomination
    case events.domains.operatorNominated.name:
      return processOperatorNominatedEvent(cache, block, extrinsic, event);

    // deposit and stake
    case events.domains.withdrewStake.name:
      return processWithdrewStakeEvent(cache, block, extrinsic, event);

    // bundle
    case events.domains.bundleStored.name:
      return processBundleStoredEvent(cache, block, extrinsic, event);

    // unlock
    case events.domains.operatorUnlocked.name:
      return processOperatorUnlockedEvent(cache, block, extrinsic, event);
    case events.domains.fundsUnlocked.name:
      return processFundsUnlockedEvent(cache, block, extrinsic, event);
    case events.domains.nominatedStakedUnlocked.name:
      return processNominatedStakedUnlockedEvent(
        cache,
        block,
        extrinsic,
        event
      );

    // rewards and slashing
    case events.domains.operatorRewarded.name:
      return processOperatorRewardedEvent(cache, block, extrinsic, event);
    case events.domains.operatorSlashed.name:
      return processOperatorSlashedEvent(cache, block, extrinsic, event);

    // tax
    case events.domains.operatorTaxCollected.name:
      return processOperatorTaxCollectedEvent(cache, block, extrinsic, event);

    default:
      return cache;
  }
}
