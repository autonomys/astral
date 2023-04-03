import { EventItem } from '../processor';
import { Block, Event, RewardEvent } from '../model';
import { ExtrinsicsMap, CallsMap } from './types';

/**
 * Get events from block items
 * @param extrinsicsMap
 * @param callsMap
 * @param eventItems
 * @param block
 * @returns [events, rewardEvents]
 *  */
export async function getEvents(
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

    // handle Block and Vote rewards
    if (item.name === 'Rewards.BlockReward' || item.name === 'Rewards.VoteReward') {
      rewardEvents.push(new RewardEvent({
        ...item.event,
        block,
        extrinsic,
        call,
        timestamp: block.timestamp,
        address: item.event.args?.voter || item.event.args?.blockAuthor,
        amount: item.event.args.reward,
      }));
    } else {
      // handle rest of the events
      events.push(new Event({
        ...item.event,
        block,
        extrinsic,
        call,
        timestamp: block.timestamp,
      }));
    }

  }

  return [events, rewardEvents];
}
