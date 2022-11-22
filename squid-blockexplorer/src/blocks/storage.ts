import { SubstrateBlock } from '@subsquid/substrate-processor';
import { Context } from '../processor';
import { SubspaceRecordsRootStorage, SubspaceSolutionRangesStorage } from '../types/storage';
import { calcHistorySize, calcSpacePledged } from './utils';

export function solutionRangesStorageFactory(ctx: Context, header: SubstrateBlock) {
  return new SubspaceSolutionRangesStorage(ctx, header);
}

export function historySizeStorageFactory(ctx: Context, header: SubstrateBlock) {
  return new SubspaceRecordsRootStorage(ctx, header);
}

export function getSpacePledgedFactory(ctx: Context, storageFactory: (ctx: Context, header: SubstrateBlock) => SubspaceSolutionRangesStorage) {
  return async function getSpacePledged(header: SubstrateBlock) {
    const storage = storageFactory(ctx, header);
    const solutionRange = (await storage.getAsV3()).current;
    return calcSpacePledged(solutionRange);
  }
}

export function getHistorySizeFactory(ctx: Context, storageFactory: (ctx: Context, header: SubstrateBlock) => SubspaceRecordsRootStorage) {
  return async function getHistorySize(header: SubstrateBlock) {
    const storage = storageFactory(ctx, header);
    const segmentsCount = (await storage.getAllAsV3()).length;
    return calcHistorySize(segmentsCount);
  }
}
