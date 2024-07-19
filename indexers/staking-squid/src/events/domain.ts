import type { ApiPromise } from "@autonomys/auto-utils";
import type { Store } from "@subsquid/typeorm-store";
import type { Ctx, CtxBlock, CtxEvent, CtxExtrinsic } from "../processor";
import { createDomain } from "../storage";

export async function processDomainInstantiatedEvent(
  ctx: Ctx<Store>,
  api: ApiPromise,
  block: CtxBlock,
  extrinsic: CtxExtrinsic,
  event: CtxEvent
) {
  await createDomain(ctx, block, {
    domainId: Number(event.args.domainId || 0),
    completedEpoch: Number(event.args.completedEpochIndex || 0),
  });
}
