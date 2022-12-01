import tap from 'tap';
import { getLogsFactory, decodeLog } from '../../blocks/getLogs';
import { digestStorageFactoryMock, contextMock, blockMock, digestLogs } from '../../mocks/mocks';
import BlockHeaderMock from '../../mocks/BlockHeader.json';
import { Log } from '../../model';
import { toHex } from '@subsquid/substrate-processor';

tap.test('getLogs should return list of Logs', async (t) => {
  const getLogs = getLogsFactory(contextMock, digestStorageFactoryMock);

  const logs = await getLogs(BlockHeaderMock, blockMock);

  t.equal(logs.length, digestLogs.length);
  t.type(logs[0], Log);

  t.end();
});

tap.test('getLogs should map Log to a Block', async (t) => {
  const getLogs = getLogsFactory(contextMock, digestStorageFactoryMock);

  const logs = await getLogs(BlockHeaderMock, blockMock);

  logs.forEach(item => {
    t.equal(item.block, blockMock);
  });

  t.end();
});


tap.test('decodeLog should return "null" if log item has no value', (t) => {
  const value = null;
  const result = decodeLog(value);

  t.equal(result, null);
  t.end();
});

tap.test('decodeLog should return log item value as JSON', (t) => {
  const engine = 'SUB_';
  const data = Buffer.from('random log data');

  // PreRuntime, Consensus, Seal logs have following structure: [engine, data] (both are Uint8Array)
  const valueAsArrayOfBuffers = [
    Buffer.from(engine),
    data,
  ];

  t.same(
    decodeLog(valueAsArrayOfBuffers),
    {
      engine,
      data: toHex(data),
    },
  );

  // Other logs may have just data as Uint8Array
  t.same(
    decodeLog(data),
    {
      data: toHex(data),
    },
  );

  t.end();
});
