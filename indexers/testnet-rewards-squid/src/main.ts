import { TypeormDatabase } from "@subsquid/typeorm-store";
import type { CtxBlock, CtxEvent } from "./processor";
import { processor } from "./processor";
import { events } from "./types";
import { hexToAccount, logBlock } from "./utils";
import { Cache, load, save } from "./utils/cache";

processor.run(new TypeormDatabase({ supportHotBlocks: true }), async (ctx) => {
  let cache: Cache = await load(ctx);
  logBlock(ctx.blocks);
  for (let block of ctx.blocks) {
    for (let event of block.events) {
      switch (event.name) {
        case events.rewards.voteReward.name:
          cache = processOperatorRewardedEvent(cache, block, event);
          break;
        case events.rewards.blockReward.name:
          cache = processOperatorRewardedEvent(cache, block, event);
          break;
        case events.domains.operatorRewarded.name:
          cache = processOperatorRewardedEvent(cache, block, event);
          break;
        default:
          break;
      }
    }
  }

  await save(ctx, cache);
});

export function processFarmerVoteRewardEvent(
  cache: Cache,
  block: CtxBlock,
  event: CtxEvent
) {
  const accountId = hexToAccount(event.args.voter);
  const reward = BigInt(event.args.reward);

  console.log(event);

  return cache;
}

export function processFarmerBlockRewardEvent(
  cache: Cache,
  block: CtxBlock,
  event: CtxEvent
) {
  const accountId = hexToAccount(event.args.blockAuthor);
  const reward = BigInt(event.args.reward);

  console.log(event);

  return cache;
}

export function processOperatorRewardedEvent(
  cache: Cache,
  block: CtxBlock,
  event: CtxEvent
) {
  const operatorId = String(event.args.operatorId) ?? "0";

  console.log(event);

  return cache;
}
