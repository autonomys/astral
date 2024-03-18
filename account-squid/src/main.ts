import * as ss58 from "@subsquid/ss58";
import { Store, TypeormDatabase } from "@subsquid/typeorm-store";
import assert from "assert";
import { In } from "typeorm";

import { PREFIX } from "./constants";
import { Account, Transfer } from "./model";
import { Block, ProcessorContext, processor } from "./processor";
import { events } from "./types";
import { balances, system } from "./types/storage";

processor.run(new TypeormDatabase({ supportHotBlocks: true }), async (ctx) => {
  let transferEvents: TransferEvent[] = getTransferEvents(ctx);

  let accounts: Map<string, Account> = await createAccounts(
    ctx,
    transferEvents
  );
  let transfers: Transfer[] = createTransfers(transferEvents, accounts);

  await ctx.store.upsert([...accounts.values()]);
  await ctx.store.insert(transfers);
});

interface TransferEvent {
  id: string;
  blockNumber: number;
  timestamp: Date;
  extrinsicHash?: string;
  from: string;
  to: string;
  amount: bigint;
  fee?: bigint;
}

function getTransferEvents(ctx: ProcessorContext<Store>): TransferEvent[] {
  const eventsList = [
    events.balances.transfer.v0.name,
    events.balances.withdraw.v0.name,
    events.balances.balanceSet.v0.name,
    events.balances.reserved.v0.name,
    events.balances.unreserved.v0.name,
    events.balances.burned.v0.name,
    events.balances.endowed.v0.name,
    events.balances.reserveRepatriated.v0.name,
    events.balances.restored.v0.name,
  ];

  // Filters and decodes the arriving events
  let transfers: TransferEvent[] = [];
  for (let block of ctx.blocks) {
    for (let event of block.events) {
      if (event.name == events.balances.transfer.name) {
        const rec = events.balances.transfer.v0.decode(event);

        assert(
          block.header.timestamp,
          `Got an undefined timestamp at block ${block.header.height}`
        );

        transfers.push({
          id: event.id,
          blockNumber: block.header.height,
          timestamp: new Date(block.header.timestamp),
          extrinsicHash: event.extrinsic?.hash,
          from: ss58.codec(PREFIX).encode(rec.from),
          to: ss58.codec(PREFIX).encode(rec.to),
          amount: rec.amount,
          fee: event.extrinsic?.fee || 0n,
        });
      }
    }
  }
  return transfers;
}

async function createAccounts(
  ctx: ProcessorContext<Store>,
  transferEvents: TransferEvent[]
): Promise<Map<string, Account>> {
  const accountIds = new Set<string>();
  for (let t of transferEvents) {
    accountIds.add(t.from);
    accountIds.add(t.to);
  }

  const accounts = await ctx.store
    .findBy(Account, { id: In([...accountIds]) })
    .then((accounts) => {
      return new Map(accounts.map((a) => [a.id, a]));
    });

  for (let t of transferEvents) {
    updateAccounts(t.from);
    updateAccounts(t.to);
  }

  function updateAccounts(id: string): void {
    const acc = accounts.get(id);
    if (acc == null) {
      accounts.set(id, new Account({ id }));
    }
  }

  return accounts;
}

async function getSystemAccountBalance(block: Block, accountId: string) {
  const accountInfo = await system.account.v0.get(block, accountId);

  if (accountInfo == null) {
    return undefined;
  }

  const { free, reserved } = accountInfo.data;

  return { free, reserved };
}

async function getBalancesAccountBalance(block: Block, accountId: string) {
  const balance = await balances.account.v0.get(block, accountId);

  if (balance == null) {
    return undefined;
  }

  const { free, reserved } = balance;

  return { free, reserved };
}

function createTransfers(
  transferEvents: TransferEvent[],
  accounts: Map<string, Account>
): Transfer[] {
  let transfers: Transfer[] = [];
  for (let t of transferEvents) {
    let { id, blockNumber, timestamp, extrinsicHash, amount, fee } = t;
    let from = accounts.get(t.from);
    let to = accounts.get(t.to);
    transfers.push(
      new Transfer({
        id,
        blockNumber,
        timestamp,
        extrinsicHash,
        from,
        to,
        amount,
        fee,
      })
    );
  }
  return transfers;
}
