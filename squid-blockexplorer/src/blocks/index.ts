import { Context } from '../processor';
import { ProcessBlocksDependencies } from './types';
import {
  getHistorySizeFactory,
  getSpacePledgedFactory,
  solutionRangesStorageFactory,
  digestStorageFactory,
} from './storage';
import { getOrCreateAccountFactory, processCalls, processExtrinsicsFactory } from './processCalls';
import { getEvents } from './getEvents';
import { getLogsFactory } from './getLogs';
export { processBlocksFactory } from "./processBlocks";

export function createProcessBlocksDependencies(ctx: Context): ProcessBlocksDependencies {
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
  };
}
