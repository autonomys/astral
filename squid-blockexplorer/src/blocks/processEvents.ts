import { EventItem } from '../processor';
import { Block, Event } from '../model';
import { ExtrinsicsMap, CallsMap } from './types';

export async function processEvents(
  extrinsicsMap: ExtrinsicsMap, 
  callsMap: CallsMap, 
  events: Event[], 
  eventItems: EventItem[], 
  block: Block,
) {
  for (const item of eventItems) {
    // some events may not have associated extrinsic / call 
    // i.e. TransactionFees.StorageFeesEscrowChange
    let extrinsic = null;
    let call = null;

    if (item.event.extrinsic) {
      extrinsic = extrinsicsMap.get(item.event.extrinsic.id);
      call = callsMap.get(item.event.extrinsic.call.id);
    }

    const event = new Event({
      ...item.event,
      block,
      extrinsic,
      call,
      timestamp: block.timestamp,
    });

    events.push(event);
  }
}
