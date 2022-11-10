import { Context } from './processor'
import { Account } from './model';

/**
 * Utility function to get error message from error
 * @param {unknown} error - can be instance of Error object or string
 * @returns {string} - error message
 */
 export function getErrorMessage(error: unknown): string | undefined {
  if (error instanceof Error) {
    return error.message;
  } else if (typeof error === 'string') {
    return error;
  } else {
    return;
  }
}

/**
 * Utility function to get account by given account ID, creates new account if there is none
 * @param {Context} ctx
 * @param {bigint} blockHeight
 * @param {String} accountId
 * @returns {Account}
 */
export async function getOrCreateAccount(ctx: Context, blockHeight: bigint, accountId: string): Promise<Account> {
  let account = await ctx.store.get(Account, accountId);

  if (!account) {
    account = new Account({
      id: accountId,
      updatedAt: blockHeight,
    })

    await ctx.store.insert(account)
  }

  return account
}
