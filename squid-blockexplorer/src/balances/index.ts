import { Context } from "../processor";
import { ProcessBalancesDependencies } from './types';
import { processCall } from './processCall';
import { saveAccountsFactory } from './saveAccounts';
import { BalanceStorage, createBalanceAccountStorage, createSystemAccountStorage } from "./storage";
import { processEventFactory, BalanceEventHandler } from './processEvent';
export { processBalancesFactory } from "./processBalances";

export function createProcessBalancesDependencies(ctx: Context): ProcessBalancesDependencies {
  const eventHandler = new BalanceEventHandler(ctx);
  const balanceStorage = new BalanceStorage({ ctx, createBalanceAccountStorage, createSystemAccountStorage });
  const processEvent = processEventFactory(eventHandler);
  const saveAccounts = saveAccountsFactory(ctx, balanceStorage);

  return {
    processCall,
    processEvent,
    saveAccounts,
  }
}
