import tap from 'tap';
import { createBlock, createCall, createExtrinsic } from '../../blocks/utils';
import { Block, Call, Extrinsic } from '../../model';
import BlockHeaderMock from '../../mocks/BlockHeader.json';
import { callItemWithSignature } from '../../mocks/mocks';

const spacePledged = BigInt(1);
const blockchainSize = BigInt(2);

tap.test('createBlock should create instance of a Block', (t) => {
  const result = createBlock(BlockHeaderMock, spacePledged, blockchainSize);

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
  })
  t.end();
});

tap.test('createCall should create instance of Call without parent Call', (t) => {
  const block = createBlock(BlockHeaderMock, spacePledged, blockchainSize);
  const extrinsic = createExtrinsic(callItemWithSignature, block, null, null);
  const result = createCall(callItemWithSignature, block, extrinsic, null);
  t.type(result, Call);
  t.end();
});

tap.todo('createCall should create instance of Call with parent Call');

tap.test('createExtrinsic should create instance of Extrinsic without signature', (t) => {
  const block = createBlock(BlockHeaderMock, spacePledged, blockchainSize);
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
  })
  t.end();
});

tap.todo('createExtrinsic should create instance of Extrinsic with signature');

