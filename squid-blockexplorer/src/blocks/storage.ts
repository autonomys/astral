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
    const { client } = ctx._chain;
    // SubspaceRecordsRoot is a hash map and in order to get count of items (segments)
    // we need to get size of the map and size of the item in the map
    // and then calculate count of items
    const storageHash = getStorageHash('Subspace', 'RecordsRoot');

    const totalSize = (await client.call('state_getStorageSizeAt', [
      storageHash,
      header.hash
    ])) as number;

    if (totalSize === 0 || !totalSize) return BigInt(0);

    const keys = (await client.call('state_getKeysPagedAt', [
      storageHash,
      1,
      null,
      header.hash
    ])) as string[];

    const keySize = (await client.call('state_getStorageSizeAt', [
      keys[0],
      header.hash
    ])) as number;

    const segmentsCount = totalSize / keySize;

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
