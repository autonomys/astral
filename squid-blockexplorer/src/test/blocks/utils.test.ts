import tap from 'tap';
import { createBlock, createCall, createExtrinsic } from '../../blocks/utils';
import { Account, Block, Call, Extrinsic } from '../../model';
import BlockHeaderMock from '../../mocks/BlockHeader.json';
import { callItemWithSignature, contextMock } from '../../mocks/mocks';
import { getOrCreateAccountFactory } from '../../blocks/utils';
import { Context } from '../../processor';

const spacePledged = BigInt(1);
const blockchainSize = BigInt(2);

tap.test('getOrCreateAccount should get Account if store has one', async (t) => {
  const accountId = 'random account id';

  const contextWithAccount = {
    ...contextMock,
    store: {
      ...contextMock.store,
      get: () => Promise.resolve(new Account({ id: accountId })),
    }
  } as unknown as Context;

  const getOrCreateAccount = getOrCreateAccountFactory(contextWithAccount);

  const result = await getOrCreateAccount(BigInt(1), accountId);

  t.equal(result.id, accountId);

  t.end();
});

tap.test('getOrCreateAccount should create new Account if store has none', async (t) => {
  const accountId = 'new account id';

  const getOrCreateAccount = getOrCreateAccountFactory(contextMock);

  const result = await getOrCreateAccount(BigInt(1), accountId);

  t.equal(result.id, accountId);

  t.end();
});

tap.test('createBlock should create instance of a Block', (t) => {
  const result = createBlock({
    header: BlockHeaderMock, 
    extrinsicsCount: 2,
    eventsCount: 5,
  });

  t.type(result, Block);
  t.has(result, {
    id: BlockHeaderMock.id,
    height: BlockHeaderMock.height,
    timestamp: new Date(BlockHeaderMock.timestamp),
    hash: BlockHeaderMock.hash,
    parentHash: BlockHeaderMock.parentHash,
    specId: BlockHeaderMock.specId,
    stateRoot: BlockHeaderMock.stateRoot,
    spacePledged,
    blockchainSize,
  });
  t.end();
});

tap.test('createCall should create instance of Call without parent Call', (t) => {
  const block = createBlock({
    header: BlockHeaderMock, 
    extrinsicsCount: 2,
    eventsCount: 5,
  });
  const extrinsic = createExtrinsic(callItemWithSignature, block, null, null);
  const result = createCall(callItemWithSignature, block, extrinsic, null);
  t.type(result, Call);
  t.end();
});

tap.todo('createCall should create instance of Call with parent Call');

tap.test('createExtrinsic should create instance of Extrinsic without signature', (t) => {
  const block = createBlock({
    header: BlockHeaderMock, 
    extrinsicsCount: 2,
    eventsCount: 5,
  });
  const result = createExtrinsic(callItemWithSignature, block, null, null);

  t.type(result, Extrinsic);
  t.has(result, {
    id: callItemWithSignature.extrinsic.id,
    timestamp: new Date(BlockHeaderMock.timestamp),
    hash: callItemWithSignature.extrinsic.hash,
    indexInBlock: callItemWithSignature.extrinsic.indexInBlock,
    name: callItemWithSignature.name,
    signer: null,
    signature: null,
    error: null,
    tip: null,
    success: callItemWithSignature.extrinsic.success,
    block,
    pos: callItemWithSignature.extrinsic.pos,
  });
  t.end();
});

tap.todo('createExtrinsic should create instance of Extrinsic with signature');

