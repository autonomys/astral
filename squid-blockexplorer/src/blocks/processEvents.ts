import { EventItem } from '../processor';
import { Block, Event, RewardEvent, Account } from '../model';
import { ExtrinsicsMap, CallsMap } from './types';

export function processEventsFactory(getOrCreateAccount: (blockHeight: bigint, accountId: string) => Promise<Account>) {
  return async function processEvents(
    extrinsicsMap: ExtrinsicsMap,
    callsMap: CallsMap,
    eventItems: EventItem[],
    block: Block,
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

      const genericEvent = new Event({
        ...item.event,
        block,
        extrinsic,
        call,
        timestamp: block.timestamp,
      });

      // additional handling for reward events
      if (item.name === 'Rewards.BlockReward' || item.name === 'Rewards.VoteReward') {
        const address = item.event.args?.voter || item.event.args?.blockAuthor;
        const account = await getOrCreateAccount(block.height, address);
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

      events.push(genericEvent);
    }

    return [events, rewardEvents];
  };
}
