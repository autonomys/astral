import tap from 'tap';
import { BalanceStorage } from '../../balances/storage';
import { accountIdU8, contextMock } from '../../mocks/mocks';
import BlockHeaderMock from '../../mocks/BlockHeader.json';
import { BalancesAccountStorage, SystemAccountStorage } from '../../types/storage';
import { Balance } from '../../balances/types';

const systemAccountBalance: Balance = {
  free: BigInt(60),
  reserved: BigInt(30),
};

const defaultStorageDependencies = {
  ctx: contextMock,
  createSystemAccountStorage: () => ({
    isExists: false,
    asV3: {
      get: () => Promise.resolve(undefined),
    }
  } as unknown as SystemAccountStorage),
  createBalanceAccountStorage: () => ({
    isExists: false,
    asV3: {
      get: () => Promise.resolve(undefined),
    }
  } as unknown as BalancesAccountStorage),
};

tap.test('getBalance should return balance for given account id from SystemAccountStorage if storage exists', async (t) => {
  const dependencies = {
    ...defaultStorageDependencies,
    createSystemAccountStorage: () => ({
      isExists: true,
      asV3: {
        get: () => Promise.resolve({ data: systemAccountBalance }),
      }
    } as unknown as SystemAccountStorage),
  };

  const storage = new BalanceStorage(dependencies);

  const result = await storage.getBalance(BlockHeaderMock, accountIdU8);

  t.same(result, systemAccountBalance);

  t.end();
});

tap.test('getBalance should return balance for given account id from BalancesAccountStorage if storage exists', async (t) => {
  const dependencies = {
    ...defaultStorageDependencies,
    createSystemAccountStorage: () => ({
      isExists: false,
      asV3: {
        get: () => Promise.resolve(undefined),
      }
    } as unknown as SystemAccountStorage),
    createBalanceAccountStorage: () => ({
      isExists: true,
      asV3: {
        get: () => Promise.resolve(systemAccountBalance),
      }
    } as unknown as BalancesAccountStorage),
  };

  const storage = new BalanceStorage(dependencies);

  const result = await storage.getBalance(BlockHeaderMock, accountIdU8);

  t.same(result, systemAccountBalance);

  t.end();
});

tap.test('getBalance should return undefined if none of storages exist', async (t) => {
  const storage = new BalanceStorage(defaultStorageDependencies);

  const result = await storage.getBalance(BlockHeaderMock, accountIdU8);

  t.equal(result, undefined);

  t.end();
});

