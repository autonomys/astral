import { Context } from '../processor'
import { ProcessBlocksDependencies } from './types';
import {
  getHistorySizeFactory,
  getSpacePledgedFactory,
  solutionRangesStorageFactory,
} from './storage';
import { getOrCreateAccountFactory, processCalls, processExtrinsicsFactory } from './processCalls';
import { processEvents, } from './processEvents';
export { processBlocksFactory } from "./processBlocks";

export function createProcessBlocksDependencies(ctx: Context): ProcessBlocksDependencies {
  const getSpacePledged = getSpacePledgedFactory(ctx, solutionRangesStorageFactory);
  const getHistorySize = getHistorySizeFactory(ctx);
  const getOrCreateAccount = getOrCreateAccountFactory(ctx);
  const processExtrinsics = processExtrinsicsFactory(getOrCreateAccount);

  return {
    getSpacePledged,
    getHistorySize,
    processExtrinsics,
    processCalls,
    processEvents,
  }
}
