import { Context, EventItem } from "../processor";
import {
  Block,
  Event,
  RewardEvent,
  Account,
  Operator,
  Nominator,
} from "../model";
import { ExtrinsicsMap, CallsMap } from "./types";
import { SubstrateBlock } from "@subsquid/substrate-processor";

export function processEventsFactory(
  ctx: Context,
  getOrCreateAccount: (
    header: SubstrateBlock,
    accountId: string
  ) => Promise<Account>,
  addEventModuleName: (name: string) => Promise<void>,
  getOrCreateOperator: (operatorId: bigint) => Promise<Operator | undefined>,
  getOrCreateNominators: (operator: Operator) => Promise<Nominator[]>
) {
  return async function processEvents(
    extrinsicsMap: ExtrinsicsMap,
    callsMap: CallsMap,
    eventItems: EventItem[],
    block: Block,
    header: SubstrateBlock
  ): Promise<[Event[], RewardEvent[]]> {
    const events: Event[] = [];
    const rewardEvents: RewardEvent[] = [];

    for (const item of eventItems) {
      // some events may not have associated extrinsic / call
      // i.e. TransactionFees.StorageFeesEscrowChange
      let extrinsic = null;
      let call = null;

      if (item.event.extrinsic) {
        extrinsic = extrinsicsMap.get(item.event.extrinsic.id);
        call = callsMap.get(item.event.extrinsic.call.id);
      }

      if (item.name === "Domains.OperatorRewarded") {
        const operatorId = BigInt(item.event.args?.operatorId);
        const operator = await getOrCreateOperator(operatorId);
        if (operator) {
          const nominators = await getOrCreateNominators(operator);
          const nominatorsLength = nominators.length;

          for (let i = 0; i < nominatorsLength; i++) {
            const nominator = nominators[i];

            // calculate final reward based on shares and nomination tax
            const rewardTax = operator.nominationTax
              ? BigInt(operator.nominationTax)
              : BigInt(0);
            const rewardAmount = BigInt(item.event.args.reward);
            const reward =
              rewardAmount - (rewardAmount * rewardTax) / BigInt(10000);
            const totalShares = operator.totalShares
              ? BigInt(operator.totalShares)
              : BigInt(0);
            const nominatorShares = nominator.shares
              ? BigInt(nominator.shares)
              : BigInt(0);
            const nominatorReward = (reward * nominatorShares) / totalShares;

            const rewardEvent = new RewardEvent({
              ...item.event,
              block,
              extrinsic,
              call,
              timestamp: block.timestamp,
              account: nominator.account,
              amount: nominatorReward,
            });
            rewardEvents.push(rewardEvent);
          }
        }
      }

      // it is necessary to save rewards as both separate entity and generic event
      // separate entity - to be able to query rewards by account faster
      // generic event - to be able to query all events with pagination and filtering on Events page
      if (
        item.name === "Rewards.BlockReward" ||
        item.name === "Rewards.VoteReward"
      ) {
        const address = item.event.args?.voter || item.event.args?.blockAuthor;
        const account = await getOrCreateAccount(header, address);

        if (item.name === "Rewards.BlockReward") {
          const blockRewardAmount = account.blockRewardsTotal
            ? BigInt(item.event.args.reward) + account.blockRewardsTotal
            : BigInt(item.event.args.reward);

          if (blockRewardAmount) {
            const updatedAccount = new Account({
              ...account,
              blockRewardsTotal: blockRewardAmount,
              updatedAt: BigInt(header.height),
            });

            await ctx.store.save(updatedAccount);
          }
        }

        if (item.name === "Rewards.VoteReward") {
          const voteRewardAmount = account.voteRewardsTotal
            ? BigInt(item.event.args.reward) + account.voteRewardsTotal
            : BigInt(item.event.args.reward);

          if (voteRewardAmount) {
            const updatedAccount = new Account({
              ...account,
              voteRewardsTotal: voteRewardAmount,
              updatedAt: BigInt(header.height),
            });

            await ctx.store.save(updatedAccount);
          }
        }

        const rewardEvent = new RewardEvent({
          ...item.event,
          block,
          extrinsic,
          call,
          timestamp: block.timestamp,
          account,
          amount: item.event.args.reward,
        });

        rewardEvents.push(rewardEvent);
      }

      await addEventModuleName(item.event.name);

      const genericEvent = new Event({
        ...item.event,
        block,
        extrinsic,
        call,
        timestamp: block.timestamp,
      });

      events.push(genericEvent);
    }

    return [events, rewardEvents];
  };
}
