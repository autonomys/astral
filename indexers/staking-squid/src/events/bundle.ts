import type { ApiDecoration } from "@polkadot/api/types";
import type { Store } from "@subsquid/typeorm-store";
import type { Ctx, CtxBlock, CtxEvent, CtxExtrinsic } from "../processor";
import { getOrCreateDomain, getOrCreateOperator } from "../storage";
import { getBlockNumber } from "../utils";

export async function processBundleStoredEvent(
  ctx: Ctx<Store>,
  apiAt: ApiDecoration<"promise">,
  block: CtxBlock,
  extrinsic: CtxExtrinsic,
  event: CtxEvent
) {
  const domainId = Number(event.args.domainId);
  const operatorId = Number(event.args.bundleAuthor);
  const lastDomainBlockNumber = Number(
    extrinsic.call?.args[0].value.sealed_header.header.receipt
      .domain_block_number
  );
  const domain = await getOrCreateDomain(ctx, block, domainId);
  const operator = await getOrCreateOperator(ctx, block, operatorId);

  domain.lastOperatorBundleProduced = operator;
  domain.lastDomainBlockNumber = lastDomainBlockNumber;
  domain.updatedAt = getBlockNumber(block);

  await ctx.store.save(domain);

  operator.bundleCount++;
  operator.lastBundleAt = getBlockNumber(block);
  operator.updatedAt = getBlockNumber(block);

  await ctx.store.save(operator);
}
