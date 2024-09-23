import { Account, BalanceHistory, Transfer } from "../types";

export async function createAndSaveAccountIfNotExists(
  accountId: string,
  blockNumber: bigint,
  nonce: bigint,
  free: bigint,
  reserved: bigint,
  total: bigint
): Promise<Account> {
  const id = accountId.toLowerCase();
  const accounts = await Account.getByAccountId(id);
  let account = accounts ? accounts[0] : undefined;
  if (!account) {
    account = Account.create({
      id,
      accountId: id,
      nonce,
      free,
      reserved,
      total,
      createdAt: blockNumber,
      updatedAt: blockNumber,
    });
    await account.save();
  }
  return account;
}

export async function createAndSaveBalanceHistory(
  accountId: string,
  blockNumber: bigint,
  free: bigint,
  reserved: bigint,
  total: bigint
): Promise<BalanceHistory> {
  const id = accountId.toLowerCase();
  const balanceHistory = BalanceHistory.create({
    id,
    accountId: id,
    free,
    reserved,
    total,
    createdAt: blockNumber,
  });
  await balanceHistory.save();
  return balanceHistory;
}

export async function createAndSaveTransfer(
  blockNumber: bigint,
  extrinsicId: string,
  eventId: string,
  from: string,
  to: string,
  value: bigint,
  fee: bigint,
  success: boolean,
  timestamp: bigint,
  date: Date
): Promise<Transfer> {
  const id = blockNumber + "-" + extrinsicId.toLowerCase();
  const transfers = await Transfer.getByExtrinsicId(id);
  let transfer = transfers ? transfers[0] : undefined;
  if (!transfer) {
    transfer = Transfer.create({
      id,
      extrinsicId,
      eventId,
      from,
      to,
      value,
      fee,
      success,
      timestamp,
      date,
      createdAt: blockNumber,
    });
    await transfer.save();
  }
  return transfer;
}
