import type { Store } from "@subsquid/typeorm-store";
import { randomUUID } from "crypto";
import { emptyNominator } from "../assets/nominator";
import { Domain } from "../model";
import type { ProcessorContext } from "../processor";

export async function processDomainInstantiatedEvent(
  ctx: ProcessorContext<Store>,
  block: ProcessorContext<Store>["blocks"][0],
  extrinsic: ProcessorContext<Store>["blocks"][0]["extrinsics"][0],
  event: ProcessorContext<Store>["blocks"][0]["extrinsics"][0]["events"][0]
) {
  const domain = new Domain({
    ...emptyNominator,
    id: randomUUID(),
    domainId: Number(event.args.domainId),
    completedEpoch: Number(event.args.completedEpochIndex),
    updatedAt: block.header.height,
  });

  await ctx.store.insert(domain);
}
