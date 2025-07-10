import { EventRecord } from '@autonomys/auto-utils';

export const groupEventsFromBatchAll = (events: EventRecord[]): EventRecord[][] => {
  const result: EventRecord[][] = [];
  let currentGroup: EventRecord[] = [];

  for (const event of events) {
    if (event.event.section === 'utility' && event.event.method === 'ItemCompleted') {
      if (currentGroup.length > 0) {
        result.push(currentGroup);
        currentGroup = [];
      }
    } else currentGroup.push(event);
  }

  if (currentGroup.length > 0) result.push(currentGroup);

  return result;
};
