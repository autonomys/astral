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
} from '../../mocks/mocks';
import { getEvents } from '../../blocks/getEvents';

tap.test('getEvents should return a tuple including a list of Events and a list of RewardEvents', async (t) => {
  const extrinsicsMap = new Map<string, Extrinsic>();
  const callsMap = new Map<string, Call>();

  const eventItems = [
    eventItemWithoutExtrinsic,
    rewardEvent,
  ];

  const [events, rewardEvents] = await getEvents(extrinsicsMap, callsMap, eventItems, blockMock);
  t.equal(events.length, 1);
  t.equal(rewardEvents.length, 1);

  t.end();
});

tap.test('getEvents should map Event to a Block', async (t) => {
  const extrinsicsMap = new Map<string, Extrinsic>();
  const callsMap = new Map<string, Call>();

  const eventItems = [
    eventItemWithoutExtrinsic,
  ];

  const [eventsStored] = await getEvents(extrinsicsMap, callsMap, eventItems, blockMock);

  t.equal(eventsStored[0].block, blockMock);

  t.end();
});

tap.test('getEvents should map Event to Call and Extrinsic', async (t) => {
  const extrinsicsMap = new Map<string, Extrinsic>();
  const callsMap = new Map<string, Call>();

  extrinsicsMap.set(extrinsicMock.id, extrinsicMock);
  callsMap.set(parentCallItem.call.id, parentCallMock);

  const eventItems = [
    eventItemWithExtrinsic,
  ];

  const [eventsStored] = await getEvents(extrinsicsMap, callsMap, eventItems, blockMock);

  const savedExtrinsic = extrinsicsMap.get(extrinsicMock.id);

  t.equal(savedExtrinsic, eventsStored[0].extrinsic);

  t.end();
});
