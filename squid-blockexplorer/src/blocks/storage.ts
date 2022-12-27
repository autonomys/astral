import { SubstrateBlock } from '@subsquid/substrate-processor';
import { Context } from '../processor';
import { SystemDigestStorage, SubspaceSolutionRangesStorage,  } from '../types/storage';
import { calcHistorySize, calcSpacePledged, getStorageHash } from './utils';

export function solutionRangesStorageFactory(ctx: Context, header: SubstrateBlock) {
  return new SubspaceSolutionRangesStorage(ctx, header);
}

export function digestStorageFactory(ctx: Context, header: SubstrateBlock) {
  return new SystemDigestStorage(ctx, header);
}

export function getSpacePledgedFactory(ctx: Context, storageFactory: (ctx: Context, header: SubstrateBlock) => SubspaceSolutionRangesStorage) {
  return async function getSpacePledged(header: SubstrateBlock) {
    const storage = storageFactory(ctx, header);
    const solutionRange = (await storage.asV0.get()).current;
    return calcSpacePledged(solutionRange);
  };
}

export function getHistorySizeFactory(ctx: Context) {
  return async function getHistorySize(header: SubstrateBlock) {
    const storageHash = getStorageHash('Subspace', 'RecordsRoot');
    // SubspaceRecordsRoot is a hash map and we need a count of items (segments)
    // SubspaceRecordsRootStorage generated type unfortunately does not provide method to get count, 
    // it has getAllAsV3 method, which returns all items and is too expensive,
    // instead we're querying state using client.call API
    const segmentsCount = (await ctx._chain.client.call('state_getKeys', [storageHash, header.hash])).length;
    return calcHistorySize(segmentsCount);
  };
}
