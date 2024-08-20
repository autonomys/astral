import type { ApiPromise } from "@autonomys/auto-utils";
import type { CtxBlock, CtxEvent, CtxExtrinsic } from "../processor";
import { events } from "../types";
import { Cache } from "../utils/cache";

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
    default:
      return cache;
  }
}
