import tap from 'tap';
import { SubspaceRecordsRootStorage, SubspaceSolutionRangesStorage } from '../../types/storage';
import BlockHeaderMock from '../../mocks/BlockHeader.json';
import { calcSpacePledged, calcHistorySize } from '../../blocks/utils';
import {
  contextMock,
  solutionRangesStorageFactoryMock,
  SOLUTION_RANGES,
  SEGMENTS_COUNT,
} from '../../mocks/mocks';
import { solutionRangesStorageFactory, historySizeStorageFactory, getSpacePledgedFactory, getHistorySizeFactory } from '../../blocks/storage';

tap.test('solutionRangesStorageFactory should create instance of SubspaceSolutionRangesStorage', (t) => {
  const result = solutionRangesStorageFactory(contextMock, BlockHeaderMock);

  t.type(result, SubspaceSolutionRangesStorage);

  t.end();
});

tap.test('historySizeStorageFactory should create instance of SubspaceRecordsRootStorage', (t) => {
  const result = historySizeStorageFactory(contextMock, BlockHeaderMock);

  t.type(result, SubspaceRecordsRootStorage);

  t.end();
});

tap.test('getSpacePledgedFactory should create getSpacePledged method, which returns space pledged (bigint)', async (t) => {
  const getSpacePledged = getSpacePledgedFactory(contextMock, solutionRangesStorageFactoryMock);

  const result = await getSpacePledged(BlockHeaderMock);
  const expected = calcSpacePledged(SOLUTION_RANGES);

  t.type(result, 'bigint');
  t.equal(result, expected);

  t.end();
});

tap.test('getHistorySizeFactory should create getHistorySize method, which returns history size (bigint)', async (t) => {
  const getHistorySize = getHistorySizeFactory(contextMock);

  const result = await getHistorySize(BlockHeaderMock);
  const expected = calcHistorySize(SEGMENTS_COUNT);

  t.type(result, 'bigint');
  t.equal(result, expected);

  t.end();
});
