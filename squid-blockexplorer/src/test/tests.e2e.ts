// extrinsics
// calls
// events
// balances
import * as dotenv from 'dotenv';
import tap from 'tap';
import { GraphQLClient, gql } from 'graphql-request';
import { ApiPromise, WsProvider } from '@polkadot/api';
import type { SignedBlock } from '@polkadot/types/interfaces/runtime';

dotenv.config();

const wsProvider = new WsProvider(process.env.CHAIN_RPC_ENDPOINT);

const blockNumbers = [
  1500,
  15_539,
  80_453,
  543_435,
  // 1_281_609,
];

const queryBlocks = gql`
  query Blocks($height:BigInt) {
    blocks(limit: 1, where: {height_eq: $height}) {
      hash
      height
      id
      parentHash
      spacePledged
      specId
      stateRoot
      logs(limit: 100) {
        kind
      }
    }
  }
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let blocksFromSquid: any[];
let blocksFromRpc: SignedBlock[];
let api: ApiPromise;
// TODO: move to an env var
const client = new GraphQLClient('https://squid.gemini-2a.subspace.network/graphql');

tap.before(async () => {
  api = await ApiPromise.create({ provider: wsProvider });

  blocksFromSquid = await Promise.all(blockNumbers.map(async height => {
    const response = await client.request(queryBlocks, { height });
    return response.blocks[0];
  }));

  blocksFromRpc = await Promise.all(blockNumbers.map(async height => {
    const hash = await api.rpc.chain.getBlockHash(height);
    const block = await api.rpc.chain.getBlock(hash);
    return block;
  }));
});


tap.test('compare block headers', async (t) => {
  blocksFromSquid.forEach((block, index) => {
    const refBlockHeader = (blocksFromRpc[index]).block.header;
    t.equal(block.hash, refBlockHeader.hash.toString(), `block #${block.height} block hash ok`);
    t.equal(block.height, refBlockHeader.number.toString(), `block #${block.height} block number ok`);
    t.equal(block.stateRoot, refBlockHeader.stateRoot.toString(), `block #${block.height} state root ok`);
    // Comparing digest log items:
    // squid retrieves blocks from the storage, but 'Seal' log is not stored in the storage, because it is not part of the runtime:
    // https://github.com/paritytech/substrate/blob/0ba251c9388452c879bfcca425ada66f1f9bc802/primitives/runtime/src/generic/digest.rs#L96
    // therefore we expect 1 log item difference
    // TODO: find a way to query 'Seal' log items if it's critical for us
    t.equal(block.logs.length + 1, refBlockHeader.digest.logs.length, `block #${block.height} log items count ok`);
  });

  t.end();
});
