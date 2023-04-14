import tap from 'tap';
import { Extrinsic, Call } from '../../model';
import {
  parentCallItem,
  eventItemWithoutExtrinsic,
  eventItemWithExtrinsic,
  blockMock,
  extrinsicMock,
  parentCallMock,
  rewardEvent,
  getOrCreateAccountMock,
} from '../../mocks/mocks';
import { processEventsFactory } from '../../blocks/processEvents';

tap.test('processEvents should return a tuple including a list of Events and a list of RewardEvents', async (t) => {
  const extrinsicsMap = new Map<string, Extrinsic>();
  const callsMap = new Map<string, Call>();
  const processEvents = processEventsFactory(getOrCreateAccountMock);

  const eventItems = [
    eventItemWithoutExtrinsic,
    rewardEvent,
  ];

  const [events, rewardEvents] = await processEvents(extrinsicsMap, callsMap, eventItems, blockMock);
  t.equal(events.length, 1);
  t.equal(rewardEvents.length, 1);

  t.end();
});

tap.test('processEvents should map Event to a Block', async (t) => {
  const extrinsicsMap = new Map<string, Extrinsic>();
  const callsMap = new Map<string, Call>();
  const processEvents = processEventsFactory(getOrCreateAccountMock);

  const eventItems = [
    eventItemWithoutExtrinsic,
  ];

  const [eventsStored] = await processEvents(extrinsicsMap, callsMap, eventItems, blockMock);

  t.equal(eventsStored[0].block, blockMock);

  t.end();
});

tap.test('processEvents should map Event to Call and Extrinsic', async (t) => {
  const extrinsicsMap = new Map<string, Extrinsic>();
  const callsMap = new Map<string, Call>();
  const processEvents = processEventsFactory(getOrCreateAccountMock);

  extrinsicsMap.set(extrinsicMock.id, extrinsicMock);
  callsMap.set(parentCallItem.call.id, parentCallMock);

  const eventItems = [
    eventItemWithExtrinsic,
  ];

  const [eventsStored] = await processEvents(extrinsicsMap, callsMap, eventItems, blockMock);

  const savedExtrinsic = extrinsicsMap.get(extrinsicMock.id);

  t.equal(savedExtrinsic, eventsStored[0].extrinsic);

  t.end();
});
