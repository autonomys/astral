import type { ApiPromise } from "@autonomys/auto-utils";
import type { Store } from "@subsquid/typeorm-store";
import type { ProcessorContext } from "../processor";
import { events } from "../types";
import { processBundleStoredEvent } from "./bundle";
import { processDomainInstantiatedEvent } from "./domain";
import { processEpochTransitionEvent } from "./epoch";
import {
  processOperatorSlashedEvent,
  processOperatorTaxCollectedEvent,
} from "./operator";

export async function processEvents(
  ctx: ProcessorContext<Store>,
  api: ApiPromise,
  block: ProcessorContext<Store>["blocks"][0],
  extrinsic: ProcessorContext<Store>["blocks"][0]["extrinsics"][0]
) {
  for (let event of extrinsic.events) {
    await processEvent(ctx, api, block, extrinsic, event);
  }
}

async function processEvent(
  ctx: ProcessorContext<Store>,
  api: ApiPromise,
  block: ProcessorContext<Store>["blocks"][0],
  extrinsic: ProcessorContext<Store>["blocks"][0]["extrinsics"][0],
  event: ProcessorContext<Store>["blocks"][0]["extrinsics"][0]["events"][0]
) {
  switch (event.name) {
    // new domain
    case events.domains.domainInstantiated.name:
      return await processDomainInstantiatedEvent(
        ctx,
        api,
        block,
        extrinsic,
        event
      );

    // epoch transition
    case events.domains.domainEpochCompleted.name:
    case events.domains.forceDomainEpochTransition.name:
      return await processEpochTransitionEvent(
        ctx,
        api,
        block,
        extrinsic,
        event
      );

    // bundle
    case events.domains.bundleStored.name:
      return await processBundleStoredEvent(ctx, api, block, extrinsic, event);

    // rewards and slashing
    case events.domains.operatorRewarded.name:
      break;

    case events.domains.operatorSlashed.name:
      return await processOperatorSlashedEvent(
        ctx,
        api,
        block,
        extrinsic,
        event
      );

    // fees
    case events.domains.operatorTaxCollected.name:
      return await processOperatorTaxCollectedEvent(
        ctx,
        block,
        extrinsic,
        event
      );

    default:
      break;
  }
}
