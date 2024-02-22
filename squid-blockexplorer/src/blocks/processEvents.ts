import { SubstrateBlock } from "@subsquid/substrate-processor";
import {
  Account,
  AccountRewards,
  Block,
  Event,
  Nominator,
  Operator,
  OperatorRewards,
  RewardEvent,
} from "../model";
import { Context, EventItem } from "../processor";
import { CallsMap, ExtrinsicsMap } from "./types";

export function processEventsFactory(
  ctx: Context,
  getOrCreateAccount: (
    header: SubstrateBlock,
    accountId: string
  ) => Promise<Account>,
  addEventModuleName: (name: string) => Promise<void>,
  getOrCreateOperator: (operatorId: bigint) => Promise<Operator | undefined>,
  getOrCreateNominators: (operator: Operator) => Promise<Nominator[]>,
  getOrCreateAccountRewards: (
    header: SubstrateBlock,
    account: Account
  ) => Promise<AccountRewards>,
  getOrCreateOperatorRewards: (
    header: SubstrateBlock,
    operator: Operator
  ) => Promise<OperatorRewards>
) {
  async function getExtrinsicAndCallFromEventItem(
    eventItem: EventItem,
    extrinsicsMap: ExtrinsicsMap,
    callsMap: CallsMap
  ) {
    let extrinsic = null;
    let call = null;

    if (eventItem.event.extrinsic) {
      extrinsic = extrinsicsMap.get(eventItem.event.extrinsic.id);
      call = callsMap.get(eventItem.event.extrinsic.call.id);
    }

    return { extrinsic, call };
  }

  async function processEventBasedOnName(
    eventItem: EventItem,
    header: SubstrateBlock,
    block: Block,
    extrinsic: any,
    call: any
  ) {
    await addEventModuleName(eventItem.event.name);

    switch (eventItem.name) {
      case "Domains.OperatorRegistered":
      case "Domains.OperatorDeregistered":
      case "Domains.OperatorSlashed":
        await createOrUpdateOperator(eventItem);
        return null;
      case "Domains.OperatorRewarded":
        return await processOperatorRewardedEvent(
          eventItem,
          header,
          block,
          extrinsic,
          call
        );
      case "Rewards.BlockReward":
      case "Rewards.VoteReward":
        return await processRewardEvent(
          eventItem,
          header,
          block,
          extrinsic,
          call
        );
      default:
        return null;
    }
  }

  async function createOrUpdateOperator(eventItem: EventItem){
    const operatorId = BigInt(eventItem.event.args?.operatorId);
    await getOrCreateOperator(operatorId);
  }

  async function processOperatorRewardedEvent(
    eventItem: EventItem,
    header: SubstrateBlock,
    block: Block,
    extrinsic: any,
    call: any
  ) {
    const operatorId = BigInt(eventItem.event.args?.operatorId);
    const operator = await getOrCreateOperator(operatorId);
    if (!operator) return;

    const operatorRewards = await getOrCreateOperatorRewards(header, operator);
    const rewardAmount = BigInt(eventItem.event.args?.reward);

    const updatedOperatorRewards = new OperatorRewards({
      ...operatorRewards,
      amount: operatorRewards.amount
        ? operatorRewards.amount + rewardAmount
        : rewardAmount,
      updatedAt: BigInt(header.height),
    });

    await ctx.store.save(updatedOperatorRewards);

    const nominators = await getOrCreateNominators(operator);
    const nominatorsLength = nominators.length;

    if (
      nominatorsLength === 1 &&
      nominators[0].account.id === operator.operatorOwner
    ) {
      const account = await getOrCreateAccount(header, operator.operatorOwner);
      const rewardEvent = new RewardEvent({
        ...eventItem.event,
        block,
        extrinsic,
        call,
        timestamp: block.timestamp,
        account: account,
        amount: rewardAmount,
      });

      const accountRewards = await getOrCreateAccountRewards(header, account);

      const updatedReward = new AccountRewards({
        ...accountRewards,
        account,
        operator: rewardAmount,
        amount: accountRewards.amount
          ? accountRewards.amount + rewardAmount
          : rewardAmount,
        updatedAt: BigInt(header.height),
      });

      await ctx.store.save(updatedReward);

      return rewardEvent;
    } else {
      // add tax amount to operator owner
      if (operator.operatorOwner) {
        const rewardTax = operator.nominationTax
          ? BigInt(operator.nominationTax / 100)
          : BigInt(0);

        const ownerAccount = await getOrCreateAccount(
          header,
          operator.operatorOwner
        );

        const nominationTaxAmount = rewardAmount * rewardTax;

        const rewardEvent = new RewardEvent({
          ...eventItem.event,
          block,
          extrinsic,
          call,
          timestamp: block.timestamp,
          account: ownerAccount,
          amount: nominationTaxAmount,
        });

        await ctx.store.save(rewardEvent);
      }

      for (const nominator of nominators) {
        const account = await getOrCreateAccount(header, nominator.account.id);
        const accountRewards = await getOrCreateAccountRewards(header, account);
        const rewardDetails = calculateNominatorReward(
          eventItem,
          operator,
          nominator,
          accountRewards
        );

        if (rewardDetails.operatorReward) {
          const updatedReward = new AccountRewards({
            ...accountRewards,
            account,
            operator: rewardDetails.operatorReward,
            amount: rewardDetails.accountRewardAmount,
            updatedAt: BigInt(header.height),
          });

          await ctx.store.save(updatedReward);
        }

        const rewardEvent = new RewardEvent({
          ...eventItem.event,
          block,
          extrinsic,
          call,
          timestamp: block.timestamp,
          account: nominator.account,
          amount: rewardDetails.nominatorReward,
        });

        return rewardEvent;
      }
    }
  }

  function calculateNominatorReward(
    eventItem: EventItem,
    operator: Operator,
    nominator: Nominator,
    accountRewards: AccountRewards
  ) {
    const rewardTax = operator.nominationTax
      ? BigInt(operator.nominationTax / 100)
      : BigInt(0);
    const rewardAmount = BigInt(eventItem.event.args.reward);
    const reward = rewardAmount - rewardAmount * rewardTax;
    const totalShares = operator.totalShares
      ? BigInt(operator.totalShares)
      : BigInt(0);
    const nominatorShares = nominator.shares
      ? BigInt(nominator.shares)
      : BigInt(0);
    const nominatorReward = reward * (nominatorShares / totalShares);
    const accountRewardAmount = accountRewards.amount
      ? nominatorReward + accountRewards.amount
      : nominatorReward;
    const operatorReward = accountRewards.operator
      ? nominatorReward + accountRewards.operator
      : nominatorReward;

    return { nominatorReward, accountRewardAmount, operatorReward };
  }

  async function processRewardEvent(
    eventItem: EventItem,
    header: SubstrateBlock,
    block: Block,
    extrinsic: any,
    call: any
  ) {
    const address =
      eventItem.event.args?.voter || eventItem.event.args?.blockAuthor;
    const account = await getOrCreateAccount(header, address);
    const accountRewards = await getOrCreateAccountRewards(header, account);
    const rewardType =
      eventItem.name === "Rewards.BlockReward" ? "block" : "vote";
    const reward = BigInt(eventItem.event.args.reward);
    const updatedAccountRewards = updateAccountRewards(
      accountRewards,
      reward,
      rewardType,
      header
    );

    if (updatedAccountRewards) {
      await ctx.store.save(updatedAccountRewards);
    }

    const rewardEvent = new RewardEvent({
      ...eventItem.event,
      block,
      extrinsic,
      call,
      timestamp: block.timestamp,
      account,
      amount: reward,
    });

    return rewardEvent;
  }

  function updateAccountRewards(
    accountRewards: AccountRewards,
    reward: bigint,
    rewardType: "block" | "vote",
    header: SubstrateBlock
  ) {
    const currentTypeBalance = accountRewards[rewardType];
    const rewardAmount = currentTypeBalance
      ? reward + currentTypeBalance
      : reward;
    const accountRewardAmount = accountRewards.amount
      ? reward + accountRewards.amount
      : reward;

    if (!rewardAmount) return null;

    return new AccountRewards({
      ...accountRewards,
      account: accountRewards.account,
      [rewardType]: rewardAmount,
      amount: accountRewardAmount,
      updatedAt: BigInt(header.height),
    });
  }

  return async function processEvents(
    extrinsicsMap: ExtrinsicsMap,
    callsMap: CallsMap,
    eventItems: EventItem[],
    block: Block,
    header: SubstrateBlock
  ): Promise<[Event[], RewardEvent[]]> {
    const events: Event[] = [];
    const rewardEvents: RewardEvent[] = [];

    for (const eventItem of eventItems) {
      const { extrinsic, call } = await getExtrinsicAndCallFromEventItem(
        eventItem,
        extrinsicsMap,
        callsMap
      );

      const rewardEvent = await processEventBasedOnName(
        eventItem,
        header,
        block,
        extrinsic,
        call
      );

      if (rewardEvent) {
        rewardEvents.push(rewardEvent);
      }

      const genericEvent = new Event({
        ...eventItem.event,
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
