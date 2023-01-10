import * as dotenv from 'dotenv';
import tap from 'tap';
import { GraphQLClient } from 'graphql-request';
import { ApiPromise, WsProvider, Keyring } from '@polkadot/api';

import { queryBalance, querySquidHeight } from './queries';
import { submitTxAndWaitForBlockHash, wait } from './utils';

dotenv.config({ path: '.env.e2e' });

const keyring = new Keyring({ type: 'sr25519', ss58Format: 2254 });
const wsProvider = new WsProvider(process.env.CHAIN_RPC_ENDPOINT as string);
const squidClient = new GraphQLClient(process.env.SQUID_GRAPHQL_ENDPOINT as string);

console.log(`Squid GraphQL endpoint: ${process.env.SQUID_GRAPHQL_ENDPOINT}`);

let rpcApi: ApiPromise;

interface AccountBalance {
  total: number;
  free: number;
  reserved: number;
  updatedAt: number;
}

tap.before(async () => {
  rpcApi = await ApiPromise.create({ provider: wsProvider });
});

tap.teardown(async () => {
  await rpcApi.disconnect();
});

tap.test('account balances should update', async (t) => {
  const AMOUNT = 10n ** 18n;

  // get account keypairs
  const ALICE = keyring.addFromUri('//Alice');
  const BOB = keyring.addFromUri('//Bob');

  // get initial account balances from the squid
  const { free: initAliceSquidBalance }: AccountBalance = (await squidClient.request(queryBalance, { id: ALICE.address })).accountById;
  const { free: initBobSquidBalance }: AccountBalance = (await squidClient.request(queryBalance, { id: BOB.address })).accountById;

  // send a transfer from Alice to Bob
  const blockHash = await submitTxAndWaitForBlockHash(rpcApi, ALICE, BOB.address, AMOUNT);
  const { number } = await rpcApi.rpc.chain.getHeader(blockHash);

  // wait for the block to be processed by the squid
  for (; ;) {
    // get current squid status height (latest block height)
    const { height: squidHeight } = (await squidClient.request(querySquidHeight)).squidStatus;

    console.log(`Waiting for the squid to catch up... ${squidHeight}/${number.toNumber()}`);

    if (squidHeight >= number.toNumber()) break;

    await wait(1000);
  }

  // get updated account balances from the squid
  const { free: postAliceSquidBalance }: AccountBalance = (await squidClient.request(queryBalance, { id: ALICE.address })).accountById;
  const { free: postBobSquidBalance }: AccountBalance = (await squidClient.request(queryBalance, { id: BOB.address })).accountById;

  // check that the balances are updated correctly
  t.equal(BigInt(initAliceSquidBalance - postAliceSquidBalance), AMOUNT);
  t.equal(BigInt(postBobSquidBalance - initBobSquidBalance), AMOUNT);
});

