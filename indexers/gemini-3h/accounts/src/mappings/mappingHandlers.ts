import { SubstrateEvent } from "@subql/types";
import { Account, Transfer } from "../types";

export async function handleTransferEvent(
  event: SubstrateEvent
): Promise<void> {
  logger.info(
    `New ${event.event.section}.${
      event.event.method
    } event found at block ${event.block.block.header.number.toString()}`
  );
  const {
    event: {
      data: [_from, _to, _amount],
    },
  } = event;
  const from = _from.toString();
  const to = _to.toString();
  const amount = BigInt(_amount.toString());
  console.log("event.extrinsic", event.extrinsic);
  // const fee = BigInt(event.extrinsic?.extrinsic?.fee ?? 0);
  const blockNumber = event.block.block.header.number.toNumber();
  const timestamp = Number(event.block.timestamp) * 1000;

  const accountSender = await checkAndGetAccount(from, blockNumber);
  accountSender.nonce = BigInt(accountSender.nonce.toString());
  accountSender.free = accountSender.free;
  accountSender.reserved = accountSender.reserved;
  accountSender.total = accountSender.free + accountSender.reserved;
  accountSender.updatedAt = blockNumber;

  const accountReceiver = await checkAndGetAccount(to, blockNumber);
  accountReceiver.nonce = BigInt(accountReceiver.nonce.toString());
  accountReceiver.free = accountReceiver.free;
  accountReceiver.reserved = accountReceiver.reserved;
  accountReceiver.total = accountReceiver.free + accountReceiver.reserved;
  accountReceiver.updatedAt = blockNumber;

  const transfer = await checkAndGetTransfer(
    blockNumber + "-" + event.event.index.toString(),
    event.extrinsic?.extrinsic.hash.toString() ?? "",
    event.event.index.toString(),
    from,
    to,
    amount,
    BigInt(0),
    event.extrinsic?.success ?? false,
    BigInt(timestamp),
    new Date(timestamp),
    blockNumber
  );

  await Promise.all([
    accountSender.save(),
    accountReceiver.save(),
    transfer.save(),
  ]);
}

async function checkAndGetAccount(
  id: string,
  blockNumber: number
): Promise<Account> {
  let account = await Account.get(id.toLowerCase());
  if (!account) {
    account = Account.create({
      id: id.toLowerCase(),
      nonce: BigInt(0),
      free: BigInt(0),
      reserved: BigInt(0),
      total: BigInt(0),
      createdAt: blockNumber,
      updatedAt: blockNumber,
    });
  }
  return account;
}

async function checkAndGetTransfer(
  id: string,
  extrinsicId: string,
  eventId: string,
  from: string,
  to: string,
  value: bigint,
  fee: bigint,
  success: boolean,
  timestamp: bigint,
  date: Date,
  createdAt: number
): Promise<Transfer> {
  let transfer = await Transfer.get(id);
  if (!transfer) {
    transfer = Transfer.create({
      id: id,
      extrinsicId: extrinsicId,
      eventId: eventId,
      from: from,
      to: to,
      value: value,
      fee: fee,
      success: success,
      timestamp: timestamp,
      date: date,
      createdAt: createdAt,
    });
  }
  return transfer;
}
