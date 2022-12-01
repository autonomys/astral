import tap from 'tap';
import sinon from 'sinon';
import { processBlocksFactory } from '../../blocks/processBlocks';
import { Context } from '../../processor';
import {
  contextMock,
  callsItems,
  eventItemWithExtrinsic,
  parentCallItem,
} from '../../mocks/mocks';
import BlockHeaderMock from '../../mocks/BlockHeader.json';

tap.test('processBlocks should process blocks and items from the Context and save them to store', async (t) => {
  const processBlocks = processBlocksFactory({
    getSpacePledged: () => Promise.resolve(BigInt(1)),
    getHistorySize: () => Promise.resolve(BigInt(2)),
    processExtrinsics: () => Promise.resolve(),
    processCalls: () => Promise.resolve(),
    getEvents: () => Promise.resolve([]),
    getLogs: () => Promise.resolve([]),
  });

  const blocks = [
    {
      header: {
        ...BlockHeaderMock,
        id: 'first block id',
        height: 10,
      },
      items: callsItems,
    },
    {
      header: {
        ...BlockHeaderMock,
        id: 'second block id',
        height: 11,
      },
      items: [
        eventItemWithExtrinsic,
        parentCallItem,
      ]
    }
  ];

  const context = {
    ...contextMock,
    blocks,
  } as Context;

  const saveSpy = sinon.spy(context.store, 'save');

  await processBlocks(context);

  // expect store.save method calls: blocks, extrinsics, calls, events, logs
  t.equal(saveSpy.callCount, 5);

  // check stored block ids against block ids in the context
  const storedBlocks = saveSpy.firstCall.firstArg;
  t.equal(storedBlocks[0].id, blocks[0].header.id);
  t.equal(storedBlocks[1].id, blocks[1].header.id);

  t.end();
});
