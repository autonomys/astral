import { SubstrateBlock } from '@subsquid/substrate-processor';
import { toHex } from '@subsquid/util-internal-hex';
import { Block, Log } from "../model";
import { Context } from "../processor";
import { SystemDigestStorage } from '../types/storage';

function decodeLog(value: null | Uint8Array | Uint8Array[]) {
  if (!value) return null;

  if (Array.isArray(value)) {
    return {
      engine: value[0].toString(),
      data: toHex(value[1]),
    };
  }

  return toHex(value);
}

export function getLogsFactory(ctx: Context, storageFactory: (ctx: Context, header: SubstrateBlock) => SystemDigestStorage) {
  return async function getLogs(header: SubstrateBlock, block: Block) {
    const storage = storageFactory(ctx, header);
    const digest = await storage.getAsV3();

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
