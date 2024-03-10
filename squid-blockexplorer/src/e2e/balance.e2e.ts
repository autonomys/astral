/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as dotenv from 'dotenv';
import tap from 'tap';
import { GraphQLClient } from 'graphql-request';
import { ApiPromise, WsProvider, Keyring } from '@polkadot/api';
import type { KeyringPair } from '@polkadot/keyring/types';

import { queryBalance, querySquidHeight } from './queries';
import { submitTxAndWaitForBlockHash, wait } from './utils';
import { AccountBalance, SquidStatusResponse, AccountBalanceResponse } from './types';

dotenv.config();

const keyring = new Keyring({ type: 'sr25519', ss58Format: 2254 });
const wsProvider = new WsProvider(process.env.CHAIN_RPC_ENDPOINT as string);
const squidClient = new GraphQLClient(process.env.SQUID_GRAPHQL_ENDPOINT as string);

let rpcApi: ApiPromise;
let ALICE: KeyringPair | undefined;
let BOB: KeyringPair | undefined;
const AMOUNT = 10n ** 18n;

tap.teardown(async () => {
  await rpcApi.disconnect();
});

tap.before(async () => {
  rpcApi = await ApiPromise.create({ provider: wsProvider });

  // assign account keypairs
  ALICE = keyring.addFromUri('//Alice');
  BOB = keyring.addFromUri('//Bob');

  // send inial transfer from ALICE to BOB to trigger squid indexing for these accounts
  // (squid only adds account after a call, in this case balances.transfer)
  const blockHash = await submitTxAndWaitForBlockHash(rpcApi, ALICE, BOB.address, AMOUNT);
  const txBlockNumber = (await rpcApi.rpc.chain.getHeader(blockHash)).number.toNumber();

  // wait for the block to be processed by the squid
  for (; ;) {
    // get current squid status height (latest block height)
    const { height: squidHeight } = (await squidClient.request(querySquidHeight) as SquidStatusResponse).squidStatus;
    console.log(`Waiting for the squid to catch up... ${squidHeight}/${txBlockNumber}`);
    if (squidHeight >= txBlockNumber) break;
    await wait(1000);
  }
});

tap.test('account balances should update after transfer', async (t) => {
  // get initial account balances from the squid
  const { total: initAliceBalance }: AccountBalance = (await squidClient.request(queryBalance, { id: ALICE!.address }) as AccountBalanceResponse).accountById;
  const { total: initBobBalance }: AccountBalance = (await squidClient.request(queryBalance, { id: BOB!.address }) as AccountBalanceResponse).accountById;

  // send a transfer from Alice to Bob
  const blockHash = await submitTxAndWaitForBlockHash(rpcApi, ALICE!, BOB!.address, AMOUNT);
  const txBlockNumber = (await rpcApi.rpc.chain.getHeader(blockHash)).number.toNumber();

  // wait for the block to be processed by the squid
  for (; ;) {
    // get current squid status height (latest block height)
    const { height: squidHeight } = (await squidClient.request(querySquidHeight) as SquidStatusResponse).squidStatus;
    console.log(`Waiting for the squid to catch up... ${squidHeight}/${txBlockNumber}`);
    if (squidHeight >= txBlockNumber) break;
    await wait(1000);
  }

  // get updated account balances from the squid
  const { total: postAliceBalance }: AccountBalance = (await squidClient.request(queryBalance, { id: ALICE!.address }) as AccountBalanceResponse).accountById;
  const { total: postBobBalance }: AccountBalance = (await squidClient.request(queryBalance, { id: BOB!.address }) as AccountBalanceResponse).accountById;

  // check that the balances are updated correctly
  t.equal(BigInt(initAliceBalance - postAliceBalance), AMOUNT);
  t.equal(BigInt(postBobBalance - initBobBalance), AMOUNT);
});

