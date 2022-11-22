import tap from 'tap';
import sinon from 'sinon';
import { saveAccountsFactory } from '../../balances/saveAccounts';
import { contextMock, accountIdU8 } from '../../mocks/mocks';
import BlockHeaderMock from '../../mocks/BlockHeader.json';
import { BalanceStorage } from '../../balances/storage';

const balanceStorageMock = {
  getBalance() {
    return Promise.resolve({
      free: BigInt(10),
      reserved: BigInt(11),
    })
  }
} as unknown as BalanceStorage;

tap.afterEach(function () {
  sinon.restore();
});

tap.test('saveAccounts should get balances for given account ids', async (t) => {
  const getBalanceSpy = sinon.spy(balanceStorageMock, 'getBalance');
  const saveAccounts = saveAccountsFactory(contextMock, balanceStorageMock);

  await saveAccounts(BlockHeaderMock, [accountIdU8]);

  t.ok(getBalanceSpy.calledOnce);
  // checking if getBalances was called with expected args: header and account ids
  t.equal(getBalanceSpy.firstCall.firstArg, BlockHeaderMock);
  t.equal(getBalanceSpy.firstCall.lastArg, accountIdU8);

  t.end();
});

tap.test('saveAccounts should create Account instances for given account ids and save them', async (t) => {
  const storeSaveSpy = sinon.spy(contextMock.store, 'save');
  const saveAccounts = saveAccountsFactory(contextMock, balanceStorageMock);

  await saveAccounts(BlockHeaderMock, [accountIdU8]);

  t.ok(storeSaveSpy.calledOnce);

  t.end();
});

tap.test('saveAccounts should not save anything if there are no balances', async (t) => {
  const storageNoBalance = {
    getBalance() {
      return Promise.resolve(undefined);
    }
  } as unknown as BalanceStorage;

  const getBalanceSpy = sinon.spy(storageNoBalance, 'getBalance');
  const storeSaveSpy = sinon.spy(contextMock.store, 'save');
  const saveAccounts = saveAccountsFactory(contextMock, storageNoBalance);

  await saveAccounts(BlockHeaderMock, [accountIdU8]);

  t.ok(getBalanceSpy.calledOnce);
  t.ok(storeSaveSpy.notCalled);

  t.end();
});
