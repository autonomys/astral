import { ApiPromise } from "@polkadot/api";
import { Context } from '../processor';
import { ProcessBlocksDependencies } from './types';
import {
  getHistorySizeFactory,
  getSpacePledgedFactory,
  solutionRangesStorageFactory,
  digestStorageFactory,
  getBlockAuthorFactory,
} from './storage';
import { processCalls, processExtrinsicsFactory } from './processCalls';
import { processEventsFactory } from './processEvents';
import { getLogsFactory } from './getLogs';
export { processBlocksFactory } from "./processBlocks";
import { getOrCreateAccountFactory } from './utils';

export function createProcessBlocksDependencies(ctx: Context, api: ApiPromise): ProcessBlocksDependencies {
  const getBlockAuthor = getBlockAuthorFactory(ctx, api);
  const getSpacePledged = getSpacePledgedFactory(ctx, solutionRangesStorageFactory);
  const getHistorySize = getHistorySizeFactory(ctx);
  const getOrCreateAccount = getOrCreateAccountFactory(ctx);
  const processExtrinsics = processExtrinsicsFactory(getOrCreateAccount);
  const processEvents = processEventsFactory(getOrCreateAccount);
  const getLogs = getLogsFactory(ctx, digestStorageFactory);

  return {
    getSpacePledged,
    getHistorySize,
    processExtrinsics,
    processCalls,
    processEvents,
    getLogs,
    getBlockAuthor
  };
}
