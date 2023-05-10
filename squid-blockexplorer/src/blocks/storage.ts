import { SubstrateBlock } from '@subsquid/substrate-processor';

import { Context } from '../processor';
import { SystemDigestStorage } from '../types/storage';

export function digestStorageFactory(ctx: Context, header: SubstrateBlock) {
  return new SystemDigestStorage(ctx, header);
}
