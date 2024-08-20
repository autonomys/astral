import type { ApiPromise } from "@autonomys/auto-utils";
import { processEvents } from "../events";
import type { CtxBlock, CtxExtrinsic } from "../processor";
import { calls } from "../types";
import { Cache } from "../utils/cache";

export async function processExtrinsics(
  cache: Cache,
  api: ApiPromise,
  block: CtxBlock,
  extrinsics: CtxExtrinsic[]
) {
  for (let extrinsic of extrinsics) {
    cache = await processExtrinsic(cache, api, block, extrinsic);
  }
  return cache;
}

export async function processExtrinsic(
  cache: Cache,
  api: ApiPromise,
  block: CtxBlock,
  extrinsic: CtxExtrinsic
) {
  switch (extrinsic.call?.name) {
    default:
      return await processEvents(cache, api, block, extrinsic);
  }
}
