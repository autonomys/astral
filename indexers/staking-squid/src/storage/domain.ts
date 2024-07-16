import type { Store } from "@subsquid/typeorm-store";
import { randomUUID } from "crypto";
import { emptyDomain } from "../assets";
import { Domain } from "../model";
import type { ProcessorContext } from "../processor";

export const createDomain = async (
  ctx: ProcessorContext<Store>,
  block: ProcessorContext<Store>["blocks"][0],
  props: Partial<Domain>
): Promise<Domain> => {
  const domain = new Domain({
    ...emptyDomain,
    ...props,
    id: randomUUID(),
    updatedAt: block.header.height,
  });

  await ctx.store.insert(domain);

  return domain;
};

export const getOrCreateDomain = async (
  ctx: ProcessorContext<Store>,
  block: ProcessorContext<Store>["blocks"][0],
  domainId: number
): Promise<Domain> => {
  const domain = await ctx.store.findOneBy(Domain, { domainId });

  if (!domain) return await createDomain(ctx, block, { domainId });

  return domain;
};
