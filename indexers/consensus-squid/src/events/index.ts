import type { ApiPromise } from "@autonomys/auto-utils";
import type { CtxBlock, CtxEvent, CtxExtrinsic } from "../processor";
import { getOrCreateEvent, getOrCreateEventModuleName } from "../storage";
import { Cache } from "../utils/cache";

export async function processEvents(
  cache: Cache,
  api: ApiPromise,
  block: CtxBlock,
  extrinsic: CtxExtrinsic
) {
  for (let event of extrinsic.events) {
    const _event = getOrCreateEvent(cache, block, event.id, {
      name: event.name,
    });
    cache.events.set(_event.id, _event);

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
  const _eventModuleName = getOrCreateEventModuleName(cache, block, event.id, {
    name: event.name,
  });
  cache.eventModuleNames.set(_eventModuleName.id, _eventModuleName);

  switch (event.name) {
    default:
      return cache;
  }
}
