import {
  StoreWithCache,
  TypeormDatabaseWithCache,
} from "@belopash/typeorm-store";
import {
  TransferEvent,
  callIsValid,
  encodeId,
  ensureAccountsExist,
  handleEndowedEvent,
  handleRepatriatedEvent,
  isBalanceUpdateEvent,
} from "./account/utils";
import { Account, Transfer } from "./model";
import {
  Block,
  BlockHeader,
  Event,
  ProcessorContext,
  processor,
} from "./processor";
import { events, storage } from "./types";

processor.run(
  new TypeormDatabaseWithCache({ supportHotBlocks: true }),
  async (ctx) => {
    const transfers: Transfer[] = [];
    const accountsToUpdate = new Set<string>();

    const blocksLength = ctx.blocks.length;

    for (let block of ctx.blocks) {
      gatherAccountsToUpdateFromCalls(block, accountsToUpdate);
      await processEvents(ctx, block, accountsToUpdate, transfers);
    }

    const updatedAccounts = await updateAccounts(
      ctx,
      ctx.blocks[blocksLength - 1].header,
      Array.from(accountsToUpdate)
    );

    await ctx.store.upsert(updatedAccounts);
    await ctx.store.insert(transfers);

    ctx.log.child("accounts").info(`updated: ${updatedAccounts?.length}`);
    ctx.log.child("transfers").info(`updated: ${transfers.length}`);
  }
);

function gatherAccountsToUpdateFromCalls(
  block: Block,
  accountsToUpdate: Set<string>
) {
  for (let call of block.calls) {
    if (callIsValid(call)) {
      const accountId = call.origin.value.value;
      accountsToUpdate.add(accountId);
    }
  }
}

async function processEvents(
  ctx: ProcessorContext<StoreWithCache>,
  block: Block,
  accountsToUpdate: Set<string>,
  transfers: Transfer[]
) {
  for (let event of block.events) {
    switch (event.name) {
      case events.balances.transfer.name:
        await handleTransferEvent(
          block.header,
          event,
          ctx,
          accountsToUpdate,
          transfers
        );
        break;
      case events.balances.reserveRepatriated.v0.name:
        handleRepatriatedEvent(event, accountsToUpdate);
        break;
      case events.balances.endowed.v0.name:
        handleEndowedEvent(event, accountsToUpdate);
        break;
      default:
        if (isBalanceUpdateEvent(event)) accountsToUpdate.add(event.args.who);
        break;
    }
  }
}

async function handleTransferEvent(
  header: BlockHeader,
  event: Event,
  ctx: ProcessorContext<StoreWithCache>,
  accountsToUpdate: Set<string>,
  transfers: Transfer[]
) {
  const transferEvent = getTransferEvent(header, event);
  const accounts = await ensureAccountsExist(ctx, [
    transferEvent.from,
    transferEvent.to,
  ]);

  transfers.push(
    new Transfer({
      id: event.id,
      blockNumber: header.height,
      timestamp: new Date(header.timestamp || 0),
      extrinsicHash: event.extrinsic?.hash,
      from: accounts.get(transferEvent.from),
      to: accounts.get(transferEvent.to),
      amount: transferEvent.amount,
      fee: event.extrinsic?.fee || 0n,
    })
  );

  accountsToUpdate.add(transferEvent.from);
  accountsToUpdate.add(transferEvent.to);
}

function getTransferEvent(header: BlockHeader, event: Event): TransferEvent {
  const rec = events.balances.transfer.v0.decode(event);

  const transfer = {
    id: event.id,
    blockNumber: header.height,
    timestamp: new Date(header.timestamp || 0),
    extrinsicHash: event.extrinsic?.hash,
    from: encodeId(rec.from),
    to: encodeId(rec.to),
    amount: rec.amount,
    fee: event.extrinsic?.fee || 0n,
  };

  return transfer;
}

async function getAccountBalance(header: BlockHeader, accountId: string) {
  let balance = await getBalancesAccountBalance(header, accountId);

  if (balance == null) {
    balance = await getSystemAccountBalance(header, accountId);
  }

  return balance;
}

async function updateAccounts(
  ctx: ProcessorContext<StoreWithCache>,
  header: BlockHeader,
  accountIds: string[]
) {
  const accounts: Account[] = [];

  for (let i = 0; i < accountIds.length; i++) {
    const accountId = accountIds[i];
    const id = encodeId(accountId);
    const balance = await getAccountBalance(header, accountId);

    if (!balance) {
      ctx.log.warn(`No balance for account id: ${id}`);
      continue;
    }

    const total = balance.free + balance.reserved;
    // check if there is an existing account created earlier (i.e. when processing blocks)
    const existingAccount = await ctx.store.get(Account, id);

    // update account nonce if it exists
    const accountInfo = await storage.system.account.v0.get(header, accountId);

    const account = new Account({
      ...existingAccount,
      id,
      free: balance.free,
      reserved: balance.reserved,
      total,
      updatedAtBlock: header.height,
      nonce: accountInfo?.nonce,
    });

    accounts.push(account);
  }

  return accounts;
}

async function getSystemAccountBalance(header: BlockHeader, accountId: string) {
  const accountInfo = await storage.system.account.v0.get(header, accountId);

  if (accountInfo == null) {
    return undefined;
  }

  const { free, reserved } = accountInfo.data;

  return { free, reserved };
}

async function getBalancesAccountBalance(
  header: BlockHeader,
  accountId: string
) {
  const balance = await storage.balances.account.v0.get(header, accountId);

  if (balance == null) {
    return undefined;
  }

  const { free, reserved } = balance;

  return { free, reserved };
}
