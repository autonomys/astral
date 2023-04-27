import { SubstrateBlock } from '@subsquid/substrate-processor';
import { Block, Log } from "../model";
import { Context } from "../processor";
import { SystemDigestStorage } from '../types/storage';
import { decodeLog } from './utils';

export function getLogsFactory(ctx: Context, storageFactory: (ctx: Context, header: SubstrateBlock) => SystemDigestStorage) {
  return async function getLogs(header: SubstrateBlock, block: Block) {
    const storage = storageFactory(ctx, header);
    const digest = await storage.asV1.get();

    return digest.logs.map((log, index) => new Log({
      id: `${block.id}-${index}`,
      kind: log.__kind,
      // uncast to access 'value' prop, which is not present on all DigestItems
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      value: decodeLog((log as any).value),
      block,
    }));
  };
}
