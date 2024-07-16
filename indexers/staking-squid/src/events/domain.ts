import type { Store } from "@subsquid/typeorm-store";
import type { ProcessorContext } from "../processor";
import { createDomain } from "../storage/domain";

export async function processDomainInstantiatedEvent(
  ctx: ProcessorContext<Store>,
  block: ProcessorContext<Store>["blocks"][0],
  extrinsic: ProcessorContext<Store>["blocks"][0]["extrinsics"][0],
  event: ProcessorContext<Store>["blocks"][0]["extrinsics"][0]["events"][0]
) {
  await createDomain(ctx, block, {
    domainId: Number(event.args.domainId || 0),
    completedEpoch: Number(event.args.completedEpochIndex || 0),
  });
}
