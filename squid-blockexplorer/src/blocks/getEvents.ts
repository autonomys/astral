import { EventItem } from '../processor';
import { Block, Event } from '../model';
import { ExtrinsicsMap, CallsMap } from './types';

export async function getEvents(
  extrinsicsMap: ExtrinsicsMap, 
  callsMap: CallsMap, 
  eventItems: EventItem[], 
  block: Block,
) {
  return eventItems.map(item => {
    // some events may not have associated extrinsic / call 
    // i.e. TransactionFees.StorageFeesEscrowChange
    let extrinsic = null;
    let call = null;

    if (item.event.extrinsic) {
      extrinsic = extrinsicsMap.get(item.event.extrinsic.id);
      call = callsMap.get(item.event.extrinsic.call.id);
    }

    return new Event({
      ...item.event,
      block,
      extrinsic,
      call,
      timestamp: block.timestamp,
    });
  });
}
