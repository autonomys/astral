import tap from 'tap';
import { Extrinsic, Call, Account } from '../../model';
import {
  parentCallItem,
  childCallItem,
  callItemWithSignature,
  callsItems,
  getOrCreateAccountMock,
  blockMock,
  extrinsicMock,
  parentCallMock,
} from '../../mocks/mocks';
import { processCalls, processExtrinsicsFactory } from '../../blocks/processCalls';

tap.test('processExtrinsics should save Extrinsics and Calls to extrinsics map and calls map respectively', async (t) => {
  const extrinsicsMap = new Map<string, Extrinsic>();
  const callsMap = new Map<string, Call>();
  const processExtrinsics = processExtrinsicsFactory(getOrCreateAccountMock);

  t.equal(extrinsicsMap.size, 0);
  t.equal(callsMap.size, 0);

  await processExtrinsics(extrinsicsMap, callsMap, callsItems, blockMock);

  t.equal(extrinsicsMap.size, callsItems.length); // 2
  t.equal(callsMap.size, callsItems.length); // 2

  t.end();
});

tap.test('processExtrinsics should map Extrinsics and Calls to a Block', async (t) => {
  const extrinsicsMap = new Map<string, Extrinsic>();
  const callsMap = new Map<string, Call>();
  const processExtrinsics = processExtrinsicsFactory(getOrCreateAccountMock);

  const calls = [
    callItemWithSignature,
  ];

  await processExtrinsics(extrinsicsMap, callsMap, calls, blockMock);

  t.equal(extrinsicsMap.get(callItemWithSignature.extrinsic.id)?.block, blockMock);
  t.equal(callsMap.get(callItemWithSignature.call.id)?.block, blockMock);

  t.end();
});

tap.test('processExtrinsics should add signer (Account) and signature if original extrinsic has signature', async (t) => {
  const extrinsicsMap = new Map<string, Extrinsic>();
  const callsMap = new Map<string, Call>();
  const processExtrinsics = processExtrinsicsFactory(getOrCreateAccountMock);

  const calls = [
    callItemWithSignature,
  ];

  await processExtrinsics(extrinsicsMap, callsMap, calls, blockMock);

  const savedExtrinsic = extrinsicsMap.get(callItemWithSignature.extrinsic.id);

  t.type(savedExtrinsic?.signature, 'string');
  t.type(savedExtrinsic?.signer, Account);

  t.end();
});

tap.test('processExtrinsics should not add signer (Account) and signature if original extrinsic has no signature', async (t) => {
  const extrinsicsMap = new Map<string, Extrinsic>();
  const callsMap = new Map<string, Call>();
  const processExtrinsics = processExtrinsicsFactory(getOrCreateAccountMock);

  const calls = [
    parentCallItem,
  ];

  await processExtrinsics(extrinsicsMap, callsMap, calls, blockMock);

  const savedExtrinsic = extrinsicsMap.get(callItemWithSignature.extrinsic.id);

  t.notOk(savedExtrinsic?.signature);
  t.notOk(savedExtrinsic?.signer);

  t.end();
});

tap.test('processCalls should save child Calls to calls map', async (t) => {
  const extrinsicsMap = new Map<string, Extrinsic>();
  const callsMap = new Map<string, Call>();

  extrinsicsMap.set(extrinsicMock.id, extrinsicMock);
  callsMap.set(parentCallItem.call.id, parentCallMock);

  const calls = [
    childCallItem,
  ];

  t.equal(callsMap.size, 1); // already has parent call

  await processCalls(extrinsicsMap, callsMap, calls, blockMock);

  t.equal(callsMap.size, 2); // parent + child

  t.end();
});

tap.test('processCalls should map child Calls to Extrinsics and Block', async (t) => {
  const extrinsicsMap = new Map<string, Extrinsic>();
  const callsMap = new Map<string, Call>();

  extrinsicsMap.set(extrinsicMock.id, extrinsicMock);
  callsMap.set(parentCallItem.call.id, parentCallMock);

  const calls = [
    childCallItem,
  ];

  await processCalls(extrinsicsMap, callsMap, calls, blockMock);

  t.equal(callsMap.get(childCallItem.call.id)?.block, blockMock);
  t.equal(callsMap.get(childCallItem.call.id)?.extrinsic, extrinsicMock);

  t.end();
});
