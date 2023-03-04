import { ApiPromise, WsProvider } from "@polkadot/api";
import { Context } from '../processor';
import { ProcessBlocksDependencies } from './types';
import {
  getHistorySizeFactory,
  getSpacePledgedFactory,
  solutionRangesStorageFactory,
  digestStorageFactory,
  getBlockAuthorFactory,
} from './storage';
import { getOrCreateAccountFactory, processCalls, processExtrinsicsFactory } from './processCalls';
import { getEvents } from './getEvents';
import { getLogsFactory } from './getLogs';
export { processBlocksFactory } from "./processBlocks";

export async function createProcessBlocksDependencies(ctx: Context): Promise<ProcessBlocksDependencies> {
  const types = {
    Solution: {
      public_key: 'AccountId32',
      reward_address: 'AccountId32',
    },
    SubPreDigest: {
      slot: 'u64',
      solution: 'Solution',
    }
  };

  const provider = new WsProvider(process.env.CHAIN_RPC_ENDPOINT);
  const api = await ApiPromise.create({ provider, types });
  const getBlockAuthor = getBlockAuthorFactory(ctx, api);
  const getSpacePledged = getSpacePledgedFactory(ctx, solutionRangesStorageFactory);
  const getHistorySize = getHistorySizeFactory(ctx);
  const getOrCreateAccount = getOrCreateAccountFactory(ctx);
  const processExtrinsics = processExtrinsicsFactory(getOrCreateAccount);
  const getLogs = getLogsFactory(ctx, digestStorageFactory);

  return {
    getSpacePledged,
    getHistorySize,
    processExtrinsics,
    processCalls,
    getEvents,
    getLogs,
    getBlockAuthor
  };
}
