import tap from 'tap';
import { Extrinsic, Call, Event } from '../../model';
import {
  parentCallItem,
  eventItemWithoutExtrinsic,
  eventItemWithExtrinsic,
  blockMock,
  extrinsicMock,
  parentCallMock,
} from '../../mocks/mocks';
import { processEvents } from '../../blocks/processEvents';

tap.test('processEvents should create instances of Event and push into events list', async (t) => {
  const eventsStored: Event[] = [];
  const extrinsicsMap = new Map<string, Extrinsic>();
  const callsMap = new Map<string, Call>();

  const eventItems = [
    eventItemWithoutExtrinsic,
  ];

  t.equal(eventsStored.length, 0);

  await processEvents(extrinsicsMap, callsMap, eventsStored, eventItems, blockMock);

  t.equal(eventsStored.length, eventItems.length);

  t.end();
});

tap.test('processEvents should map Event to a Block', async (t) => {
  const eventsStored: Event[] = [];
  const extrinsicsMap = new Map<string, Extrinsic>();
  const callsMap = new Map<string, Call>();

  const eventItems = [
    eventItemWithoutExtrinsic,
  ];

  await processEvents(extrinsicsMap, callsMap, eventsStored, eventItems, blockMock);

  t.equal(eventsStored[0].block, blockMock);

  t.end();
});

tap.test('processEvents should map Event to Call and Extrinsic', async (t) => {
  const eventsStored: Event[] = [];
  const extrinsicsMap = new Map<string, Extrinsic>();
  const callsMap = new Map<string, Call>();

  extrinsicsMap.set(extrinsicMock.id, extrinsicMock);
  callsMap.set(parentCallItem.call.id, parentCallMock);

  const eventItems = [
    eventItemWithExtrinsic,
  ];

  await processEvents(extrinsicsMap, callsMap, eventsStored, eventItems, blockMock);

  const savedExtrinsic = extrinsicsMap.get(extrinsicMock.id);

  t.equal(savedExtrinsic, eventsStored[0].extrinsic);

  t.end();
});
