import {
  StoreWithCache,
  TypeormDatabaseWithCache,
} from "@belopash/typeorm-store";
import {
  getOrCreateOperator,
  processAccountRewards,
  processRewardEvent,
  updateEpochCompleted,
  updateOperatorFundsUnlocked,
  updateOperatorRewards,
  updateOperatorStake,
  updateOperatorStatus,
  updateWithdrewStake,
} from "./blocks/utils";
import {
  AccountReward,
  DomainEpoch,
  OperatorRewardEvent,
  RewardEvent,
} from "./model";
import { ProcessorContext, processor } from "./processor";
import { events } from "./types";

processor.run(
  new TypeormDatabaseWithCache({ supportHotBlocks: true }),
  async (ctx) => {
    let rewards = await getOperatorEvents(ctx);

    await ctx.store.save([...rewards.rewardEvents]);
    await ctx.store.save([...rewards.accountRewards]);
    await ctx.store.save([...rewards.operatorEvents]);
    await ctx.store.save([...rewards.domainEpochEvents]);
  }
);

type Rewards = {
  rewardEvents: RewardEvent[];
  accountRewards: AccountReward[];
  operatorEvents: OperatorRewardEvent[];
  domainEpochEvents: DomainEpoch[];
};

async function getOperatorEvents(
  ctx: ProcessorContext<StoreWithCache>
): Promise<Rewards> {
  const rewardEvents: RewardEvent[] = [];
  const accountRewards: AccountReward[] = [];
  const operatorEvents: OperatorRewardEvent[] = [];
  const domainEpochEvents: DomainEpoch[] = [];

  for (let block of ctx.blocks) {
    for (let event of block.events) {
      switch (event.name) {
        case events.domains.domainEpochCompleted.name:
          const domainEpochEvent = await updateEpochCompleted(
            block.header,
            event
          );
          domainEpochEvents.push(domainEpochEvent);
          break;
        case events.domains.operatorRegistered.name:
          const rec = events.domains.operatorRegistered.v0.decode(event);
          await getOrCreateOperator(ctx, block.header, rec.operatorId);
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
        case events.domains.fundsUnlocked.name:
          await updateOperatorFundsUnlocked(ctx, block.header, event);
          break;
        case events.rewards.blockReward.name:
        case events.rewards.voteReward.name:
          const rewardEvent = await processRewardEvent(
            ctx,
            block.header,
            event
          );
          rewardEvents.push(rewardEvent);

          // Update account rewards
          const accountRewardsEvent = await processAccountRewards(
            ctx,
            block.header,
            event
          );
          accountRewards.push(accountRewardsEvent);
          break;
        default:
          break;
      }
    }
  }

  return { rewardEvents, accountRewards, operatorEvents, domainEpochEvents };
}
