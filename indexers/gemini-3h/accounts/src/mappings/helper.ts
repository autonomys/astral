import { account } from "@autonomys/auto-consensus";
import { createAndSaveBalanceHistory } from "./db";

export const updateAccountBalance = async (
  accountId: string,
  blockNumber: bigint
) => {
  const _account = await account(api as any, accountId);
  const { free, reserved } = _account.data;

  await createAndSaveBalanceHistory(
    accountId,
    blockNumber,
    free,
    reserved,
    free + reserved
  );

  return _account;
};
