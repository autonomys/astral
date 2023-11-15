import { SubstrateBlock } from '@subsquid/substrate-processor';
import { Account } from '../model';
import { Context } from '../processor';
import { BalanceStorage } from './storage';
import { encodeId } from '../blocks/utils';


export function saveAccountsFactory(ctx: Context, storage: BalanceStorage) {
  return async function saveAccounts(header: SubstrateBlock, accountIds: Buffer[]) {
    const accounts: Account[] = [];

    for (let i = 0; i < accountIds.length; i++) {
      const id = encodeId(accountIds[i]);
      const balance = await storage.getBalance(header, accountIds[i]);

      if (!balance) {
        ctx.log.warn(`No balance for account id: ${id}`);
        continue;
      }

      const total = balance.free + balance.reserved;
      // check if there is an existing account created earlier (i.e. when processing blocks)
      const existingAccount = await ctx.store.get(Account, id);

      const account = new Account({
        ...existingAccount,
        id,
        free: balance.free,
        reserved: balance.reserved,
        total,
        updatedAt: BigInt(header.height),
      });

      accounts.push(account);
    }

    if (accounts.length) {
      await ctx.store.save(accounts);
    }

    ctx.log
      .child('accounts')
      .info(`updated: ${accounts.length}`);
  };
}
