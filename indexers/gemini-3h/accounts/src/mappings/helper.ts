import { balance } from "@autonomys/auto-consensus";
import { createAndSaveBalanceHistory } from "./db";

export const updateAccountBalance = async (
  accountId: string,
  blockNumber: bigint
) => {
  const _balance = await balance(api as any, accountId);

  await createAndSaveBalanceHistory(
    accountId,
    blockNumber,
    _balance.free,
    _balance.reserved,
    _balance.free + _balance.reserved
  );

  return _balance;
};
