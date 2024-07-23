import type { Store } from "@subsquid/typeorm-store";
import { randomUUID } from "crypto";
import { Domain } from "../model";
import type { Ctx, CtxBlock } from "../processor";
import { getBlockNumber } from "../utils";

export const createDomain = async (
  ctx: Ctx<Store>,
  block: CtxBlock,
  props: Partial<Domain>
): Promise<Domain> => {
  const domain = new Domain({
    id: randomUUID(),
    domainId: 0,
    completedEpoch: 0,
    ...props,
    createdAt: getBlockNumber(block),
    updatedAt: getBlockNumber(block),
  });

  await ctx.store.insert(domain);

  const domainsCount = await ctx.store.count(Domain);
  ctx.log.child("domains").info(`count: ${domainsCount}`);

  return domain;
};

export const getOrCreateDomain = async (
  ctx: Ctx<Store>,
  block: CtxBlock,
  domainId: number,
  props: Partial<Domain> = {}
): Promise<Domain> => {
  const domain = await ctx.store.findOneBy(Domain, { domainId });

  if (!domain) return await createDomain(ctx, block, { domainId, ...props });

  return domain;
};
