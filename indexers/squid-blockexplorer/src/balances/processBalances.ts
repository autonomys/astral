import { decodeHex } from '@subsquid/substrate-processor';
import { Context } from '../processor';
import { ProcessBalancesDependencies } from './types';

// save period for updating accounts (performance reasons), copied from the example repo
// TODO: investigate if it affects performance in our case and consider removing or changing value
const SAVE_PERIOD = 12 * 60 * 60 * 1000;
let lastStateTimestamp: null | number = null;

// TODO: should also include accounts with vested tokens (hardcoded in the chain config)
export function processBalancesFactory({
  processCall,
  processEvent,
  saveAccounts,
}: ProcessBalancesDependencies) {
  return async function processBalances(ctx: Context) {
    const accountIdsHex = new Set<string>();

    for (const block of ctx.blocks) {
      for (const item of block.items) {
        if (item.kind === 'call') {
          processCall(item, accountIdsHex);
        } else if (item.kind === 'event') {
          processEvent(item, accountIdsHex);
        }
      }

      if (lastStateTimestamp == null) {
        lastStateTimestamp = 0;
      }
      if (block.header.timestamp - lastStateTimestamp >= SAVE_PERIOD) {
        const accountIdsU8 = [...accountIdsHex].map((id) => decodeHex(id));

        await saveAccounts(block.header, accountIdsU8);

        lastStateTimestamp = block.header.timestamp;
        accountIdsHex.clear();
      }
    }

    const block = ctx.blocks[ctx.blocks.length - 1];
    const accountIdsU8 = [...accountIdsHex].map((id) => decodeHex(id));

    await saveAccounts(block.header, accountIdsU8);
  };
}
