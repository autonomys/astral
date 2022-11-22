import tap from 'tap';
import { BALANCE_EVENTS } from '../../balances/constants';
import { processEventFactory, BalanceEventHandler } from '../../balances/processEvent';
import { contextMock, eventItemWithExtrinsic } from '../../mocks/mocks';
import { EventItem } from '../../processor';

const ACCOUNT_ID_FROM_EVENT = {
  Default: 'account id from other events',
  Endowed: 'account id from endowed event',
  Transfer: ['from account id', 'to account id'],
  ReserveRepatriated: ['first account id', 'second account id'],
};

const eventHandlerMock = {
  getEndowedAccount() {
    return ACCOUNT_ID_FROM_EVENT.Endowed;
  },
  getAccountFromEvent() {
    return ACCOUNT_ID_FROM_EVENT.Default;
  },
  getTransferAccounts() {
    return ACCOUNT_ID_FROM_EVENT.Transfer;
  },
  getReserveRepatriatedAccounts() {
    return ACCOUNT_ID_FROM_EVENT.ReserveRepatriated;
  },
} as unknown as BalanceEventHandler;

tap.test('processEvent should get account id from different Balance events and add it to id set', (t) => {
  const ids = new Set<string>();
  const processEvent = processEventFactory(eventHandlerMock);

  const eventNames = Object.values(BALANCE_EVENTS);
  const events = eventNames.map(name => ({
    ...eventItemWithExtrinsic,
    name
  } as EventItem));

  t.notOk(ids.has(ACCOUNT_ID_FROM_EVENT.Default));
  t.notOk(ids.has(ACCOUNT_ID_FROM_EVENT.Endowed));
  t.notOk(ids.has(ACCOUNT_ID_FROM_EVENT.Transfer[0]));
  t.notOk(ids.has(ACCOUNT_ID_FROM_EVENT.Transfer[1]));
  t.notOk(ids.has(ACCOUNT_ID_FROM_EVENT.ReserveRepatriated[0]));
  t.notOk(ids.has(ACCOUNT_ID_FROM_EVENT.ReserveRepatriated[1]));

  for (const event of events) {
    processEvent(event, ids);
  }

  t.ok(ids.has(ACCOUNT_ID_FROM_EVENT.Default));
  t.ok(ids.has(ACCOUNT_ID_FROM_EVENT.Endowed));
  t.ok(ids.has(ACCOUNT_ID_FROM_EVENT.Transfer[0]));
  t.ok(ids.has(ACCOUNT_ID_FROM_EVENT.Transfer[1]));
  t.ok(ids.has(ACCOUNT_ID_FROM_EVENT.ReserveRepatriated[0]));
  t.ok(ids.has(ACCOUNT_ID_FROM_EVENT.ReserveRepatriated[1]));

  t.end();
});

tap.test('processEvent should ignore non-Balance events', (t) => {
  const ids = new Set<string>();
  const processEvent = processEventFactory(eventHandlerMock);

  const eventItem = {
    ...eventItemWithExtrinsic,
    name: 'not a balance event name',
  } as EventItem;

  t.equal(ids.size, 0);

  processEvent(eventItem, ids);

  t.equal(ids.size, 0);

  t.end();
});

tap.test('should be able to create instance of BalanceEventHandler by providing context as parameter', (t) => {
  const eventHandler = new BalanceEventHandler(contextMock);
  t.ok(eventHandler);
  t.end();
});
