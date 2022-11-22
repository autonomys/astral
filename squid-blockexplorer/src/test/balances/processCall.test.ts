import tap from 'tap';
import { processCall } from '../../balances/processCall';
import { callItemWithSignature, childCallItem } from '../../mocks/mocks';

tap.test('processCall should add account id to set of ids', async (t) => {
  const ids = new Set<string>();

  t.equal(ids.size, 0);

  processCall(callItemWithSignature, ids);

  t.equal(ids.size, 1);

  const callWithDifferentOriginAccountId = {
    ...callItemWithSignature,
    call: {
      ...callItemWithSignature.call,
      origin: {
        value: {
          value: "DIFFERENT ORIGIN ID",
          __kind: 'Signed',
        },
        __kind: 'system',
      }
    }
  }

  processCall(callWithDifferentOriginAccountId, ids);

  t.equal(ids.size, 2);

  t.end();
});

tap.test('processCall should ignore child calls', async (t) => {
  const ids = new Set<string>();

  t.equal(ids.size, 0);

  processCall(childCallItem, ids);

  t.equal(ids.size, 0);

  t.end();
});

tap.test('processCall should ignore call if call has no origin account id', async (t) => {
  const ids = new Set<string>();

  const callWithoutOrigin = {
    ...callItemWithSignature,
    call: {
      ...callItemWithSignature.call,
      origin: undefined
    }
  }

  t.equal(ids.size, 0);

  processCall(callWithoutOrigin, ids);

  t.equal(ids.size, 0);

  t.end();
});
