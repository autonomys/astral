import { Context } from '../processor';
import { ProcessBlocksDependencies } from './types';
import {
  digestStorageFactory,
} from './storage';
import { processCalls, processExtrinsicsFactory } from './processCalls';
import { processEventsFactory } from './processEvents';
import { getLogsFactory } from './getLogs';
export { processBlocksFactory } from "./processBlocks";
import { getOrCreateAccountFactory, addExtrinsicModuleNameFactory, addEventModuleNameFactory } from './utils';

export function createProcessBlocksDependencies(ctx: Context): ProcessBlocksDependencies {
  const getOrCreateAccount = getOrCreateAccountFactory(ctx);
  const addEventModuleName = addEventModuleNameFactory(ctx);
  const addExtrinsicModuleName = addExtrinsicModuleNameFactory(ctx);
  const processExtrinsics = processExtrinsicsFactory(getOrCreateAccount, addExtrinsicModuleName);
  const processEvents = processEventsFactory(getOrCreateAccount, addEventModuleName);
  const getLogs = getLogsFactory(ctx, digestStorageFactory);

  return {
    processExtrinsics,
    processCalls,
    processEvents,
    getLogs,
  };
}
