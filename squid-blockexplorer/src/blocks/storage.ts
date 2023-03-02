import { SubstrateBlock } from '@subsquid/substrate-processor';
import { ApiPromise } from "@polkadot/api";

import { Context } from '../processor';
import { SystemDigestStorage, SubspaceSolutionRangesStorage, } from '../types/storage';
import { calcHistorySize, calcSpacePledged, getStorageHash, decodeLog } from './utils';
import { Account } from '../model';
import { SubPreDigest } from './types';
import { DigestItem_PreRuntime } from '../types/v0';

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

export function getBlockAuthorFactory(ctx: Context, api: ApiPromise) {
  return async function getBlockAuthor(header: SubstrateBlock): Promise<Account | undefined> {
    if (header.height === 0) return; // genesis block does not have logs
    const storage = digestStorageFactory(ctx, header);
    const digest = await storage.asV0.get();
    const preRuntimeRaw = digest.logs.find((digestItem) => digestItem.__kind === 'PreRuntime');
    const value = decodeLog((preRuntimeRaw as DigestItem_PreRuntime).value);
    const type: SubPreDigest = api.registry.createType('SubPreDigest', value?.data);
    const rewardAddress = type.solution.reward_address.toString();
    return new Account({ id: rewardAddress });
  };
}
