import {
  StoreWithCache,
  TypeormDatabaseWithCache,
} from "@belopash/typeorm-store";
import {
  createOperator,
  processRewardEvent,
  updateEpochCompleted,
  updateOperatorRewards,
  updateOperatorStake,
  updateOperatorStatus,
  updateWithdrewStake,
} from "./blocks/utils";
import { OperatorRewardEvent, RewardEvent } from "./model";
import { ProcessorContext, processor } from "./processor";
import { events } from "./types";

processor.run(
  new TypeormDatabaseWithCache({ supportHotBlocks: true }),
  async (ctx) => {
    let rewards = await getOperatorEvents(ctx);

    await ctx.store.save([...rewards.operatorEvents]);
    await ctx.store.save([...rewards.rewardEvents]);
  }
);

type Rewards = {
  rewardEvents: RewardEvent[];
  operatorEvents: OperatorRewardEvent[];
};

async function getOperatorEvents(
  ctx: ProcessorContext<StoreWithCache>
): Promise<Rewards> {
  const rewardEvents: RewardEvent[] = [];
  const operatorEvents: OperatorRewardEvent[] = [];

  for (let block of ctx.blocks) {
    for (let event of block.events) {
      switch (event.name) {
        case events.domains.domainEpochCompleted.name:
          await updateEpochCompleted(ctx, block.header, event);
        case events.domains.operatorRegistered.name:
          await createOperator(ctx, block.header, event);
          break;
        case events.domains.operatorDeregistered.name:
          const operatorDeregistered =
            events.domains.operatorDeregistered.v0.decode(event);
          await updateOperatorStatus(
            ctx,
            operatorDeregistered.operatorId,
            block.header
          );
          break;
        case events.domains.operatorSlashed.name:
          const operatorSlashed =
            events.domains.operatorSlashed.v0.decode(event);
          await updateOperatorStatus(
            ctx,
            operatorSlashed.operatorId,
            block.header
          );
          break;
        case events.domains.storageFeeDeposited.name:
          await updateOperatorStake(ctx, block.header, event);
          break;
        case events.domains.withdrewStake.name:
          await updateWithdrewStake(ctx, block.header, event);
          break;
        case events.domains.operatorRewarded.name:
          const operatorRewardEvents = await updateOperatorRewards(
            ctx,
            block,
            event
          );
          operatorEvents.push(...operatorRewardEvents);
          break;
        case events.rewards.blockReward.name:
        case events.rewards.voteReward.name:
          const rewardEvent = await processRewardEvent(
            ctx,
            block.header,
            event
          );
          rewardEvents.push(rewardEvent);
          break;
        default:
          break;
      }
    }
  }

  return { rewardEvents, operatorEvents };
}
