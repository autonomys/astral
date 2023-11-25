import tap from 'tap';
import { SubspaceSolutionRangesStorage } from '../../types/storage';
import BlockHeaderMock from '../../mocks/BlockHeader.json';
import { calcHistorySize } from '../../blocks/utils';
import {
  contextMock,
  transactionFeesCollectedStorageMock,
} from '../../mocks/mocks';
import { solutionRangesStorageFactory, getSpacePledgedFactory, getHistorySizeFactory } from '../../blocks/storage';

tap.test('solutionRangesStorageFactory should create instance of SubspaceSolutionRangesStorage', (t) => {
  const result = solutionRangesStorageFactory(contextMock, BlockHeaderMock);

  t.type(result, SubspaceSolutionRangesStorage);

  t.end();
});

tap.test('getSpacePledgedFactory should create getSpacePledged method, which returns space pledged (bigint)', async (t) => {
  const getSpacePledged = getSpacePledgedFactory(contextMock, transactionFeesCollectedStorageMock);

  const result = await getSpacePledged(BlockHeaderMock);

  t.type(result, 'bigint');
  t.equal(result, 123n);

  t.end();
});

tap.test('getHistorySizeFactory should create getHistorySize method, which returns history size (bigint)', async (t) => {
  const getHistorySize = getHistorySizeFactory(contextMock);

  const result = await getHistorySize(BlockHeaderMock);
  const expected = calcHistorySize(0);

  t.type(result, 'bigint');
  t.equal(result, expected);

  t.end();
});