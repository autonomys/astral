import * as dotenv from 'dotenv';
import tap from 'tap';
import { GraphQLClient } from 'graphql-request';
import { ApiPromise, WsProvider } from '@polkadot/api';
import type { SignedBlock } from '@polkadot/types/interfaces/runtime';
import type { EventRecord } from "@polkadot/types/interfaces/system";

import { snakeToCamel } from './utils';
import { queryBlocks, queryEvents, queryExtrinsics, querySquidHeight } from './queries';

dotenv.config({ path: '.env.e2e' });

const wsProvider = new WsProvider(process.env.CHAIN_RPC_ENDPOINT as string);
const squidClient = new GraphQLClient(process.env.SQUID_GRAPHQL_ENDPOINT as string);

// block numbers to check are generated randomly below
const blockNumbers: number[] = [];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let blocksFromSquid: any[];
let blocksFromRpc: SignedBlock[];
let rpcApi: ApiPromise;

tap.before(async () => {
  rpcApi = await ApiPromise.create({ provider: wsProvider });

  // get current squid status height (latest block height)
  const { height: squidHeight } = (await squidClient.request(querySquidHeight)).squidStatus;

  // generate 5 random block numbers within range of squid height
  for (let i = 0; i < 5; i++) {
    blockNumbers.push(Math.floor(Math.random() * squidHeight));
  }

  // fetch blocks from rpc
  blocksFromRpc = await Promise.all(blockNumbers.map(async height => {
    const hash = await rpcApi.rpc.chain.getBlockHash(height);
    const block = await rpcApi.rpc.chain.getBlock(hash);
    return block;
  }));

  // fetch blocks from squid
  blocksFromSquid = await Promise.all(blockNumbers.map(async height => {
    const response = await squidClient.request(queryBlocks, { height });
    return response.blocks[0];
  }));
});

tap.teardown(async () => {
  await rpcApi.disconnect();
});

tap.test('compare block headers', async (t) => {
  blocksFromSquid.forEach((block, index) => {
    const { header } = (blocksFromRpc[index]).block;
    t.equal(block.hash, header.hash.toString(), `block #${block.height} block hash ok`);
    t.equal(block.height, header.number.toString(), `block #${block.height} block number ok`);
    t.equal(block.stateRoot, header.stateRoot.toString(), `block #${block.height} state root ok`);
    // Comparing digest log items:
    // squid retrieves blocks from the storage, but 'Seal' log is not stored in the storage, because it is not part of the runtime:
    // https://github.com/paritytech/substrate/blob/0ba251c9388452c879bfcca425ada66f1f9bc802/primitives/runtime/src/generic/digest.rs#L96
    // therefore we expect 1 log item difference
    // TODO: find a way to query 'Seal' log items if it's critical for us
    t.equal(block.logs.length + 1, header.digest.logs.length, `block #${block.height} log items count ok`);
  });
});

tap.test('compare block extrinsics', async (t) => {
  await Promise.all(blockNumbers.map(async (height, index) => {
    const { extrinsics: squidExtrinsics } = await squidClient.request(queryExtrinsics, { height });
    const { extrinsics: rpcExtrinsics } = (blocksFromRpc[index]).block;

    squidExtrinsics.forEach((extrinsic: { hash: string, name: string }, index: number) => {
      const refExtrinsic = rpcExtrinsics[index];

      t.equal(
        extrinsic.hash,
        refExtrinsic.hash.toString(),
        `extrinsic #${extrinsic.hash} hash ok`,
      );

      t.equal(
        // method names in the squid extrinsics are snake_case, while extrinsics from the RPC have camelCase method names
        snakeToCamel(extrinsic.name.toLowerCase()),
        `${refExtrinsic.method.section.toString()}.${refExtrinsic.method.method.toString()}`,
        `extrinsic #${extrinsic.hash} name ok`,
      );
    });
  }));
});

tap.test('compare block events', async (t) => {
  await Promise.all(blockNumbers.map(async (height) => {
    const { events: squidEvents } = await squidClient.request(queryEvents, { height });
    const blockHash = await rpcApi.rpc.chain.getBlockHash(height);
    const blockApi = await rpcApi.at(blockHash);
    const rpcEvents = (await blockApi.query.system.events()) as unknown as EventRecord[];

    t.equal(squidEvents.length, rpcEvents.length, `block #${height} events count ok`);

    // compare rpcEvents and squidEvents names
    const rpcEventNames = rpcEvents.map(({ event }) => `${event.section.toString()}.${event.method.toString()}`.toLowerCase()).sort();
    const squidEventNames = squidEvents.map((event: { name: string }) => event.name.toLowerCase()).sort();
    t.same(rpcEventNames, squidEventNames, `block #${height} events names ok`);
  }));
});
