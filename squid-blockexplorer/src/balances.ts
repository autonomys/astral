import * as ss58 from '@subsquid/ss58';
import {
  decodeHex,
  SubstrateBlock,
  SubstrateCall,
  toHex,
} from '@subsquid/substrate-processor';
import { Account } from './model';
import {
  BalancesBalanceSetEvent,
  BalancesDepositEvent,
  BalancesEndowedEvent,
  BalancesReservedEvent,
  BalancesReserveRepatriatedEvent,
  BalancesSlashedEvent,
  BalancesTransferEvent,
  BalancesUnreservedEvent,
  BalancesWithdrawEvent,
} from './types/events';
import { BalancesAccountStorage, SystemAccountStorage } from './types/storage';
import { Event, Block, ChainContext } from './types/support';
import config from './config';
import { Context, CallItem, EventItem } from './processor';

const SAVE_PERIOD = 12 * 60 * 60 * 1000;
let lastStateTimestamp: number | undefined;

interface Balance {
  free: bigint;
  reserved: bigint;
}

// TODO: should also include accounts with vested tokens (hardcoded in the chain config)
export async function processBalances(ctx: Context): Promise<void> {
  const accountIdsHex = new Set<string>();

  for (const block of ctx.blocks) {
    for (const item of block.items) {
      if (item.kind === 'call') {
        processBalancesCallItem(item, accountIdsHex);
      } else if (item.kind === 'event') {
        processBalancesEventItem(ctx, item, accountIdsHex);
      }
    }

    if (lastStateTimestamp == null) {
      lastStateTimestamp = 0;
    }
    if (block.header.timestamp - lastStateTimestamp >= SAVE_PERIOD) {
      const accountIdsU8 = [...accountIdsHex].map((id) => decodeHex(id));

      await saveAccounts(ctx, block.header, accountIdsU8);

      lastStateTimestamp = block.header.timestamp;
      accountIdsHex.clear();
    }
  }

  const block = ctx.blocks[ctx.blocks.length - 1];
  const accountIdsU8 = [...accountIdsHex].map((id) => decodeHex(id));

  await saveAccounts(ctx, block.header, accountIdsU8);
}

async function saveAccounts(
  ctx: Context,
  block: SubstrateBlock,
  accountIds: Uint8Array[]
) {
  const balances = await getBalances(ctx, block, accountIds);
  if (!balances) {
    ctx.log.warn('No balances');
    return;
  }

  const accounts: Account[] = [];

  for (let i = 0; i < accountIds.length; i++) {
    const id = encodeId(accountIds[i]);
    const balance = balances[i];

    if (!balance) continue;

    const total = balance.free + balance.reserved;
    // check if there is an existing account created earlier (i.e. when processing blocks)
    const existingAccount = await ctx.store.get(Account, id);

    const account = new Account({
      ...existingAccount,
      id,
      free: balance.free,
      reserved: balance.reserved,
      total,
      updatedAt: BigInt(block.height),
    });

    accounts.push(account);
  }

  await ctx.store.save(accounts);

  ctx.log
    .child('accounts')
    .info(`updated: ${accounts.length}`);
}

function processBalancesCallItem(
  item: CallItem,
  accountIdsHex: Set<string>
) {
  const call = item.call as SubstrateCall;
  if (call.parent != null) return;

  const id = getOriginAccountId(call.origin);
  if (id == null) return;

  accountIdsHex.add(id);
}

function processBalancesEventItem(
  ctx: Context,
  item: EventItem,
  accountIdsHex: Set<string>
) {
  switch (item.name as string) {
    case 'Balances.BalanceSet': {
      const account = getBalanceSetAccount(ctx, item.event);
      accountIdsHex.add(account);
      break;
    }
    case 'Balances.Endowed': {
      const account = getEndowedAccount(ctx, item.event);
      accountIdsHex.add(account);
      break;
    }
    case 'Balances.Deposit': {
      const account = getDepositAccount(ctx, item.event);
      accountIdsHex.add(account);
      break;
    }
    case 'Balances.Reserved': {
      const account = getReservedAccount(ctx, item.event);
      accountIdsHex.add(account);
      break;
    }
    case 'Balances.Unreserved': {
      const account = getUnreservedAccount(ctx, item.event);
      accountIdsHex.add(account);
      break;
    }
    case 'Balances.Withdraw': {
      const account = getWithdrawAccount(ctx, item.event);
      accountIdsHex.add(account);
      break;
    }
    case 'Balances.Slashed': {
      const account = getSlashedAccount(ctx, item.event);
      accountIdsHex.add(account);
      break;
    }
    case 'Balances.Transfer': {
      const accounts = getTransferAccounts(ctx, item.event);
      accountIdsHex.add(accounts[0]);
      accountIdsHex.add(accounts[1]);
      break;
    }
    case 'Balances.ReserveRepatriated': {
      const accounts = getReserveRepatriatedAccounts(ctx, item.event);
      accountIdsHex.add(accounts[0]);
      accountIdsHex.add(accounts[1]);
      break;
    }
  }
}

function getBalanceSetAccount(ctx: ChainContext, event: Event) {
  const data = new BalancesBalanceSetEvent(ctx, event);

  if (data.isV3) {
    return toHex(data.asV3.who);
  } else {
    throw new UnknownVersionError(data.constructor.name);
  }
}

function getTransferAccounts(ctx: ChainContext, event: Event) {
  const data = new BalancesTransferEvent(ctx, event);

  if (data.isV3) {
    return [toHex(data.asV3.from), toHex(data.asV3.to)];
  } else {
    throw new UnknownVersionError(data.constructor.name);
  }
}

function getEndowedAccount(ctx: ChainContext, event: Event) {
  const data = new BalancesEndowedEvent(ctx, event);

  if (data.isV3) {
    return toHex(data.asV3.account);
  } else {
    throw new UnknownVersionError(data.constructor.name);
  }
}

function getDepositAccount(ctx: ChainContext, event: Event) {
  const data = new BalancesDepositEvent(ctx, event);

  if (data.isV3) {
    return toHex(data.asV3.who);
  } else {
    throw new UnknownVersionError(data.constructor.name);
  }
}

function getReservedAccount(ctx: ChainContext, event: Event) {
  const data = new BalancesReservedEvent(ctx, event);

  if (data.isV3) {
    return toHex(data.asV3.who);
  } else {
    throw new UnknownVersionError(data.constructor.name);
  }
}

function getUnreservedAccount(ctx: ChainContext, event: Event) {
  const data = new BalancesUnreservedEvent(ctx, event);

  if (data.isV3) {
    return toHex(data.asV3.who);
  } else {
    throw new UnknownVersionError(data.constructor.name);
  }
}

function getWithdrawAccount(ctx: ChainContext, event: Event) {
  const data = new BalancesWithdrawEvent(ctx, event);

  if (data.isV3) {
    return toHex(data.asV3.who);
  } else {
    throw new UnknownVersionError(data.constructor.name);
  }
}

function getSlashedAccount(ctx: ChainContext, event: Event) {
  const data = new BalancesSlashedEvent(ctx, event);

  if (data.isV3) {
    return toHex(data.asV3.who);
  } else {
    throw new UnknownVersionError(data.constructor.name);
  }
}

function getReserveRepatriatedAccounts(ctx: ChainContext, event: Event) {
  const data = new BalancesReserveRepatriatedEvent(ctx, event);

  if (data.isV3) {
    return [toHex(data.asV3.from), toHex(data.asV3.to)];
  } else {
    throw new UnknownVersionError(data.constructor.name);
  }
}

async function getBalances(
  ctx: ChainContext,
  block: Block,
  accounts: Uint8Array[]
): Promise<(Balance | undefined)[] | undefined> {
  return (
    (await getSystemAccountBalances(ctx, block, accounts)) ||
    (await getBalancesAccountBalances(ctx, block, accounts))
  );
}

async function getBalancesAccountBalances(
  ctx: ChainContext,
  block: Block,
  accounts: Uint8Array[]
) {
  const storage = new BalancesAccountStorage(ctx, block);
  if (!storage.isExists) return undefined;

  const data = await ctx._chain.queryStorage(
    block.hash,
    'Balances',
    'Account',
    accounts.map((a) => [a])
  );

  return data.map((d) => ({ free: d.free, reserved: d.reserved }));
}

async function getSystemAccountBalances(
  ctx: ChainContext,
  block: Block,
  accounts: Uint8Array[]
) {
  const storage = new SystemAccountStorage(ctx, block);
  if (!storage.isExists) return undefined;

  const data = await ctx._chain.queryStorage(
    block.hash,
    'System',
    'Account',
    accounts.map((a) => [a])
  );

  return data.map((d) => ({ free: d.data.free, reserved: d.data.reserved }));
}

export class UnknownVersionError extends Error {
  constructor(name: string) {
    super(`There is no relevant version for ${name}`);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getOriginAccountId(origin: any) {
  if (
    origin &&
    origin.__kind === 'system' &&
    origin.value.__kind === 'Signed'
  ) {
    return origin.value.value;
  } else {
    return undefined;
  }
}

export function encodeId(id: Uint8Array) {
  return ss58.codec(config.prefix).encode(id);
}
