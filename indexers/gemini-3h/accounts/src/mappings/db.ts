import { Account, BalanceHistory, Reward, Transfer } from "../types";
import { dateEntry } from "./utils";

export async function createOrUpdateAndSaveAccount(
  accountId: string,
  blockNumber: bigint,
  nonce: bigint,
  free: bigint,
  reserved: bigint,
  total: bigint
): Promise<Account> {
  const id = accountId.toLowerCase();
  let account = await Account.get(id);
  if (!account) {
    account = Account.create({
      id,
      accountId,
      nonce,
      free,
      reserved,
      total,
      ...dateEntry(blockNumber),
    });
  } else {
    account.nonce = nonce;
    account.free = free;
    account.reserved = reserved;
    account.total = total;
    account.updatedAt = blockNumber;
  }
  await account.save();
  return account;
}

export async function createAndSaveBalanceHistory(
  accountId: string,
  blockNumber: bigint,
  free: bigint,
  reserved: bigint,
  total: bigint
): Promise<BalanceHistory> {
  const id = accountId.toLowerCase() + "-" + blockNumber.toString();
  const balanceHistory = BalanceHistory.create({
    id,
    accountId,
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
  const id = extrinsicId + "-" + eventId;
  let transfer = await Transfer.get(id);
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

export async function createAndSaveReward(
  blockHeight: bigint,
  blockHash: string,
  accountId: string,
  indexInBlock: bigint,
  rewardType: string,
  amount: bigint,
  timestamp: Date
): Promise<Reward> {
  const id =
    accountId + "-" + blockHeight.toString() + "-" + indexInBlock.toString();
  let reward = await Reward.get(id);
  if (!reward) {
    reward = Reward.create({
      id,
      blockHeight,
      blockHash,
      accountId,
      indexInBlock,
      rewardType,
      amount,
      timestamp,
    });
    await reward.save();
  }
  return reward;
}
