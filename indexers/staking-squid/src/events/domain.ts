import type { ApiDecoration } from "@polkadot/api/types";
import type { Store } from "@subsquid/typeorm-store";
import type { Ctx, CtxBlock, CtxEvent, CtxExtrinsic } from "../processor";
import { createDomain } from "../storage";

export async function processDomainInstantiatedEvent(
  ctx: Ctx<Store>,
  apiAt: ApiDecoration<"promise">,
  block: CtxBlock,
  extrinsic: CtxExtrinsic,
  event: CtxEvent
) {
  await createDomain(ctx, block, {
    domainId: Number(event.args.domainId || 0),
    completedEpoch: Number(event.args.completedEpochIndex || 0),
  });
}
